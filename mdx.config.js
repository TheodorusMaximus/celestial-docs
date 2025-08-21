/**
 * MDX Configuration for better symbol handling
 * 
 * This configuration helps MDX handle mathematical symbols
 * and provides better error reporting.
 */

import { defineConfig } from '@mdx-js/mdx';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export default defineConfig({
  remarkPlugins: [
    remarkGfm,
    remarkMath,
    // Custom plugin to escape mathematical symbols
    () => (tree) => {
      const { visit } = require('unist-util-visit');
      
      visit(tree, 'text', (node) => {
        // Escape common mathematical symbols that conflict with JSX
        node.value = node.value
          .replace(/([^<>=!])>([^<>=])/g, '$1&gt;$2')
          .replace(/([^<>=!])<([^<>=\/])/g, '$1&lt;$2')
          .replace(/≥/g, '&ge;')
          .replace(/≤/g, '&le;')
          .replace(/±/g, '&plusmn;');
      });
    }
  ],
  rehypePlugins: [
    rehypeKatex
  ],
  providerImportSource: '@mdx-js/react'
});
