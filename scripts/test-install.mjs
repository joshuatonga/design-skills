import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtemp, readFile, readdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { stripVTControlCharacters } from 'node:util';

const root = fileURLToPath(new URL('..', import.meta.url));
const cli = path.join(root, 'node_modules/skills/bin/cli.mjs');
// An optional public source exercises the same tests after publication.
const source = process.argv[2] ?? root;
const names = ['design-research', 'interface-design'];
const env = { ...process.env, DISABLE_TELEMETRY: '1', DO_NOT_TRACK: '1', NO_COLOR: '1', CI: '1' };

async function filesUnder(directory, prefix = '') {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async entry => {
    const relative = path.join(prefix, entry.name);
    return entry.isDirectory() ? filesUnder(path.join(directory, entry.name), relative) : [relative];
  }));
  return nested.flat().sort();
}

function run(args, cwd) {
  try {
    return stripVTControlCharacters(execFileSync(process.execPath, [cli, ...args], {
      cwd, env, encoding: 'utf8', timeout: 120_000, maxBuffer: 4 * 1024 * 1024,
      stdio: ['ignore', 'pipe', 'pipe'],
    }));
  } catch (error) {
    throw new Error(`Skills CLI failed: ${error.message}\n${error.stdout ?? ''}\n${error.stderr ?? ''}`);
  }
}

const temp = await mkdtemp(path.join(tmpdir(), 'design-skills-install-'));
try {
  const listing = run(['add', source, '--list'], temp);
  assert.match(listing, /Found 2 skills\b/, 'installer must discover exactly two skills');
  for (const name of names) assert.ok(listing.includes(name), `listing must include ${name}`);
  console.log('Installer discovers exactly two skills.');

  for (const selected of [[names[0]], [names[1]], names]) {
    const project = await mkdtemp(path.join(temp, 'project-'));
    execFileSync('git', ['init', '--quiet'], { cwd: project });
    run(['add', source, '--skill', ...selected, '--agent', 'codex', '--copy', '--yes'], project);
    const installedRoot = path.join(project, '.agents/skills');
    const installed = (await readdir(installedRoot)).sort();
    assert.deepEqual(installed, [...selected].sort(), 'only requested skills may be installed');
    for (const name of selected) {
      const original = path.join(root, 'skills', name);
      const destination = path.join(installedRoot, name);
      const originalFiles = await filesUnder(original);
      assert.deepEqual(await filesUnder(destination), originalFiles, `${name}: all references, metadata, and notices must travel`);
      for (const file of originalFiles) assert.deepEqual(
        await readFile(path.join(destination, file)),
        await readFile(path.join(original, file)),
        `${name}/${file}: installed content differs`,
      );
    }
    console.log(`Verified project installation: ${selected.join(' + ')}.`);
  }
} finally {
  await rm(temp, { recursive: true, force: true });
}
