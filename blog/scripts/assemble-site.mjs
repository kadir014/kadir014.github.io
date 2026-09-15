import { execFileSync } from 'node:child_process';
import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../../', import.meta.url));
const output = path.join(root, '_site');
// This script only clears its own generated directory inside the repository.
if (path.dirname(output) !== path.resolve(root) || path.basename(output) !== '_site') {
  throw new Error('Unexpected build destination');
}
const files = execFileSync('git', ['ls-files', '-z'], { cwd: root, encoding: 'utf8' }).split('\0').filter(Boolean);
// Unstaged deletions remain in Git's index, but must not be copied or restored.
const deleted = new Set(execFileSync('git', ['ls-files', '--deleted', '-z'], { cwd: root, encoding: 'utf8' }).split('\0').filter(Boolean));
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
for (const file of files) {
  if (deleted.has(file)) continue;
  // Preserve the existing tracked static site; do not publish blog source or tooling.
  if (file.startsWith('blog/') || file.startsWith('_site/') || file.split('/').some((part) => part.startsWith('.')) || /(^|\/)(AGENTS|README)\.md$/i.test(file)) continue;
  const destination = path.join(output, file);
  await mkdir(path.dirname(destination), { recursive: true });
  await cp(path.join(root, file), destination);
}
await cp(path.join(root, 'blog/dist'), path.join(output, 'blog'), { recursive: true });
await writeFile(path.join(output, '.nojekyll'), '');
console.log('Complete site assembled in _site/ (existing pages + generated blog).');
