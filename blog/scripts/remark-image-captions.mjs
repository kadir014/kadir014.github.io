// A standalone Markdown image's optional title becomes its visible caption.
export default function remarkImageCaptions() {
  const processor = this;
  return (tree) => {
    function visit(node) {
      if (node.type === 'paragraph' && node.children?.length === 1) {
        const image = node.children[0];
        if (image.type === 'image' && image.title) {
          const caption = image.title;
          const parsed = processor.parse(caption);
          // Keep captions inline, while allowing links, emphasis, and inline HTML.
          const children = parsed.children.length === 1 && parsed.children[0].type === 'paragraph'
            ? parsed.children[0].children
            : [{ type: 'text', value: caption }];
          image.title = null;
          node.data = { ...node.data, hName: 'figure' };
          node.children.push({
            type: 'paragraph',
            data: { hName: 'figcaption' },
            children,
          });
        }
      }
      node.children?.forEach(visit);
    }
    visit(tree);
  };
}
