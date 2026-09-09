import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseDocument } from 'yaml';
import MarkdownIt from 'markdown-it';

const markdown = new MarkdownIt();
const expectedSkills = ['design-research', 'interface-design'];
const ignoredDirectories = new Set(['.git', 'node_modules', 'work', 'research', 'artifacts', '.agents', '.codex', '.claude', '.cursor']);

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map(async entry => {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) return ignoredDirectories.has(entry.name) ? [] : walk(full);
    return entry.isFile() ? [full] : [];
  }));
  return files.flat();
}

function within(parent, child) {
  const relative = path.relative(parent, child);
  return relative === '' || (!relative.startsWith(`..${path.sep}`) && relative !== '..' && !path.isAbsolute(relative));
}

function destinations(tokens) {
  return tokens.flatMap(token => {
    const own = token.type === 'link_open' ? token.attrGet('href') : token.type === 'image' ? token.attrGet('src') : null;
    return [...(own ? [own] : []), ...destinations(token.children ?? [])];
  });
}

export async function validate(root) {
  root = path.resolve(root);
  const errors = [];
  const files = await walk(root);
  const skillFiles = files.filter(file => path.basename(file) === 'SKILL.md');
  const expected = expectedSkills.map(name => path.join(root, 'skills', name, 'SKILL.md')).sort();
  if (JSON.stringify([...skillFiles].sort()) !== JSON.stringify(expected)) {
    errors.push('Expected exactly skills/design-research/SKILL.md and skills/interface-design/SKILL.md; no extra or nested skills.');
  }
  for (const file of skillFiles) {
    const relative = path.relative(root, file);
    const text = await readFile(file, 'utf8');
    const match = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/.exec(text);
    if (!match) {
      errors.push(`${relative}: missing YAML frontmatter`);
      continue;
    }
    const document = parseDocument(match[1], { uniqueKeys: true });
    if (document.errors.length) {
      errors.push(`${relative}: invalid YAML: ${document.errors.map(error => error.message).join('; ')}`);
      continue;
    }
    const data = document.toJS();
    if (!data || typeof data !== 'object' || Array.isArray(data)) {
      errors.push(`${relative}: frontmatter must be a mapping`);
      continue;
    }
    if (typeof data.name !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(data.name) || data.name.length > 64 || data.name !== path.basename(path.dirname(file))) {
      errors.push(`${relative}: name must be lowercase kebab-case, at most 64 characters, and match its folder`);
    }
    if (typeof data.description !== 'string' || !data.description.trim() || data.description.length > 1024) {
      errors.push(`${relative}: description must be a nonempty string of at most 1024 characters`);
    }
    if (data.license !== 'MIT') errors.push(`${relative}: expected MIT license declaration`);
    if (data.metadata?.internal === true || data.metadata?.internal === 'true') errors.push(`${relative}: skill must remain publicly discoverable`);
    if (/\b(?:TODO|TBD|FIXME)\b|\[INSERT[^\]]*\]/.test(text)) errors.push(`${relative}: unfinished placeholder`);
    for (const notice of ['LICENSE', 'NOTICE.md']) {
      if (!files.includes(path.join(path.dirname(file), notice))) errors.push(`${relative}: missing portable ${notice}`);
    }
    const uiFile = path.join(path.dirname(file), 'agents', 'openai.yaml');
    if (files.includes(uiFile)) {
      const ui = parseDocument(await readFile(uiFile, 'utf8'), { uniqueKeys: true });
      if (ui.errors.length) errors.push(`${relative}: invalid agents/openai.yaml`);
      else if (ui.toJS()?.policy?.allow_implicit_invocation === false) errors.push(`${relative}: automatic discovery must remain enabled`);
    }
  }
  for (const file of files.filter(file => file.endsWith('.md'))) {
    const text = await readFile(file, 'utf8');
    const body = text.replace(/^---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/, '');
    for (const href of destinations(markdown.parse(body, {}))) {
      if (/^[a-z][a-z\d+.-]*:/i.test(href) || href.startsWith('//') || href.startsWith('#')) continue;
      let local;
      try { local = decodeURIComponent(href.split(/[?#]/)[0]); }
      catch { errors.push(`${path.relative(root, file)}: invalid URL encoding in ${href}`); continue; }
      const target = path.resolve(path.dirname(file), local);
      if (!within(root, target)) {
        errors.push(`${path.relative(root, file)}: relative link escapes repository: ${href}`);
        continue;
      }
      const skillRoot = skillFiles.map(skill => path.dirname(skill)).find(directory => within(directory, file));
      if (skillRoot && !within(skillRoot, target)) errors.push(`${path.relative(root, file)}: link leaves independently installable skill: ${href}`);
      try { await stat(target); }
      catch { errors.push(`${path.relative(root, file)}: broken local link: ${href}`); }
    }
  }
  return errors;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const root = process.argv[2] ?? fileURLToPath(new URL('..', import.meta.url));
  const errors = await validate(root);
  if (errors.length) {
    console.error(errors.join('\n'));
    process.exitCode = 1;
  } else console.log('Validated two discoverable, independently installable skills and all local file links.');
}
