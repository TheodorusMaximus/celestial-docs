import { visit } from 'unist-util-visit';

/**
 * Remark plugin to transform Mermaid code blocks into Mermaid components
 * This allows ```mermaid blocks to be rendered as interactive diagrams
 */
export function remarkMermaid() {
  return (tree) => {
    visit(tree, 'code', (node, index, parent) => {
      if (node.lang === 'mermaid') {
        // Transform the code block into a JSX component
        const mermaidComponent = {
          type: 'mdxJsxFlowElement',
          name: 'MermaidBlock',
          attributes: [
            {
              type: 'mdxJsxAttribute',
              name: 'code',
              value: node.value
            }
          ],
          children: []
        };

        // Replace the code block with our component
        parent.children[index] = mermaidComponent;
      }
    });
  };
}
