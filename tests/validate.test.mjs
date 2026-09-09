import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { validate } from '../scripts/validate.mjs';

async function fixture(t) {
  const root = await mkdtemp(path.join(tmpdir(), 'design-skills-validator-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  for (const name of ['design-research', 'interface-design']) {
    const dir = path.join(root, 'skills', name);
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, 'SKILL.md'), `---\nname: ${name}\ndescription: A useful skill\nlicense: MIT\n---\n# Skill\n\n[Notice](NOTICE.md)\n`);
    await writeFile(path.join(dir, 'LICENSE'), 'MIT');
    await writeFile(path.join(dir, 'NOTICE.md'), 'Attribution');
  }
  return root;
}

test('accepts independently installable skills and resolved reference links', async t => {
  const root = await fixture(t);
  await writeFile(path.join(root, 'README.md'), '[Research](skills/design-research/SKILL.md)');
  assert.deepEqual(await validate(root), []);
});

test('rejects invalid YAML and missing required fields', async t => {
  const root = await fixture(t);
  const file = path.join(root, 'skills/design-research/SKILL.md');
  await writeFile(file, '---\nname: [broken\n---\nBody');
  assert.ok((await validate(root)).some(error => error.includes('invalid YAML')));
  await writeFile(file, '---\nname: design-research\nlicense: MIT\n---\nBody');
  assert.ok((await validate(root)).some(error => error.includes('description')));
});

test('rejects broken links and dependencies on a sibling skill', async t => {
  const root = await fixture(t);
  await writeFile(path.join(root, 'skills/design-research/NOTICE.md'), '[Missing](missing.md)\n[Sibling](../interface-design/SKILL.md)');
  const errors = await validate(root);
  assert.ok(errors.some(error => error.includes('broken local link')));
  assert.ok(errors.some(error => error.includes('leaves independently installable skill')));
});

test('rejects nested skills that would alter installer discovery', async t => {
  const root = await fixture(t);
  await mkdir(path.join(root, 'skills/design-research/nested'));
  await writeFile(path.join(root, 'skills/design-research/nested/SKILL.md'), '# Accidental extra skill');
  assert.ok((await validate(root)).some(error => error.includes('Expected exactly')));
});
