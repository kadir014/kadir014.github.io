import { defineConfig } from 'astro/config';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { unified } from '@astrojs/markdown-remark';
import remarkWordCount from './scripts/remark-word-count.mjs';

export default defineConfig({
  site: 'https://lucysir.me',
  base: '/blog',
  trailingSlash: 'always',
  output: 'static',
  markdown: {
    processor: unified({ remarkPlugins: [remarkMath, remarkWordCount], rehypePlugins: [rehypeKatex] }),
    shikiConfig: { themes: { light: 'github-light', dark: 'github-dark' } },
  },
});
