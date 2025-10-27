import type { Root, Element } from 'hast';

const visit = require('unist-util-visit').visit;

const FILE_RE = /\.(pdf|docx?|xlsx?|pptx?|zip|rar|7z|csv|txt)$/i;
const HOST_RE = /(drive\.google\.com|dropbox\.com|docs\.google\.com|onedrive\.live\.com)/i;

export default function rehypeDownloadMap() {
  return (tree: Root) => {
    visit(tree, 'element', (node: Element, index?: number, parent?: any) => {
      if (typeof index !== 'number' || !parent || !parent.children || node.tagName !== 'a') {
        return;
      }

      const href = String(node.properties?.href || '');
      const isMarked = 'data-download' in (node.properties || {});
      const isFile = FILE_RE.test(href) || HOST_RE.test(href);

      if (!(isMarked || isFile)) return;

      const titleText =
        (Array.isArray(node.children) &&
          node.children
            .map((c: any) => (c.type === 'text' ? c.value : ''))
            .join(' ')
            .trim()) ||
        'Download';

      parent.children[index] = {
        type: 'element',
        tagName: 'div',
        properties: {
          'data-component': 'DownloadBox',
          'data-title': titleText,
          'data-href': href,
        },
        children: [],
      };
    });
  };
}
