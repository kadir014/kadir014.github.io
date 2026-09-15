import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
const [slug, suppliedTitle] = process.argv.slice(2);
if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
  console.error('Usage: npm run new -- my-post "My post title"\nUse lowercase letters, numbers, and hyphens for the slug.');
  process.exit(1);
}
const title = suppliedTitle || slug.replaceAll('-', ' ');
const date = new Date().toISOString().slice(0, 10);
const directory = fileURLToPath(new URL('../posts/', import.meta.url));
await mkdir(directory, { recursive: true });
const file = fileURLToPath(new URL(`../posts/${slug}.md`, import.meta.url));
const content = `---\ntitle: ${JSON.stringify(title)}\ndescription: ""\ndate: ${date}\nslug: ${slug}\ntags: []\ndraft: true\n---\n\n`;
try {
  await writeFile(file, content, { flag: 'wx' });
  console.log(`Created posts/${slug}.md as a draft. Set draft: false when ready.`);
} catch (error) {
  if (error.code === 'EEXIST') { console.error(`posts/${slug}.md already exists; nothing was overwritten.`); process.exit(1); }
  throw error;
}
