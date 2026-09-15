// Count article prose before syntax highlighting and equation rendering.
// Markdown syntax, URLs, code, equations, and image metadata are excluded.
export default function remarkWordCount() {
  return (tree, file) => {
    const text = [];
    function visit(node) {
      if (node.type === 'text') text.push(node.value);
      if (node.children) node.children.forEach(visit);
    }
    visit(tree);
    const segments = new Intl.Segmenter('en', { granularity: 'word' }).segment(text.join(' '));
    const wordCount = [...segments].filter((segment) => segment.isWordLike).length;
    file.data.astro ??= {};
    file.data.astro.frontmatter ??= {};
    file.data.astro.frontmatter.wordCount = wordCount;
  };
}
