#!/usr/bin/env node

/**
 * Better MDX Symbol Fixer
 * 
 * Uses HTML entities instead of word replacements to preserve
 * mathematical symbols while avoiding MDX parsing conflicts.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// HTML entity replacements - preserves the mathematical meaning
const entityReplacements = [
  // Greater than and less than symbols
  { pattern: /([^<>=!])>([^<>=])/g, replacement: '$1&gt;$2' },
  { pattern: /([^<>=!])<([^<>=\/])/g, replacement: '$1&lt;$2' },
  
  // Mathematical symbols
  { pattern: /≥/g, replacement: '&ge;' },
  { pattern: /≤/g, replacement: '&le;' },
  { pattern: /±/g, replacement: '&plusmn;' },
  
  // Specific patterns in Mermaid diagrams (more targeted)
  { pattern: /"([^"]*?)\s*>\s*(\d+[%\w]*?)([^"]*?)"/g, replacement: '"$1 &gt; $2$3"' },
  { pattern: /"([^"]*?)\s*<\s*(\d+[%\w]*?)([^"]*?)"/g, replacement: '"$1 &lt; $2$3"' },
  { pattern: /"([^"]*?)\s*≥\s*(\d+[%\w]*?)([^"]*?)"/g, replacement: '"$1 &ge; $2$3"' },
  { pattern: /"([^"]*?)\s*≤\s*(\d+[%\w]*?)([^"]*?)"/g, replacement: '"$1 &le; $2$3"' },
];

// Function to process a single file
function processFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    let changeCount = 0;
    
    // Apply all replacement patterns
    entityReplacements.forEach(({ pattern, replacement }) => {
      const matches = content.match(pattern);
      if (matches) {
        content = content.replace(pattern, replacement);
        modified = true;
        changeCount += matches.length;
      }
    });
    
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Fixed ${changeCount} symbols in: ${filePath}`);
      return changeCount;
    } else {
      console.log(`⚪ No symbols to fix in: ${filePath}`);
      return 0;
    }
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return 0;
  }
}

// Function to recursively find all .mdx files
function findMdxFiles(dir) {
  let results = [];
  
  try {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        results = results.concat(findMdxFiles(filePath));
      } else if (file.endsWith('.mdx')) {
        results.push(filePath);
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error.message);
  }
  
  return results;
}

// Main execution
function main() {
  console.log('🔧 Better MDX Symbol Fixer - Using HTML Entities\n');
  
  const docsDir = path.join(__dirname, 'src', 'content', 'docs');
  
  if (!fs.existsSync(docsDir)) {
    console.error('❌ Docs directory not found:', docsDir);
    process.exit(1);
  }
  
  const mdxFiles = findMdxFiles(docsDir);
  
  if (mdxFiles.length === 0) {
    console.log('⚠️  No .mdx files found in docs directory');
    process.exit(0);
  }
  
  console.log(`📄 Found ${mdxFiles.length} .mdx files\n`);
  
  let totalChanges = 0;
  let filesModified = 0;
  
  mdxFiles.forEach(file => {
    const changes = processFile(file);
    if (changes > 0) {
      filesModified++;
      totalChanges += changes;
    }
  });
  
  console.log('\n🎉 Summary:');
  console.log(`   Files processed: ${mdxFiles.length}`);
  console.log(`   Files modified: ${filesModified}`);
  console.log(`   Total symbols converted: ${totalChanges}`);
  
  if (totalChanges > 0) {
    console.log('\n✨ All mathematical symbols converted to HTML entities!');
    console.log('   This preserves the visual appearance while avoiding MDX conflicts.');
  } else {
    console.log('\n✅ No symbols found that needed conversion!');
  }
}

// Run the script
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { processFile, findMdxFiles, entityReplacements };
