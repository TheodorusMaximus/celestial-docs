#!/usr/bin/env node

/**
 * Final MDX Symbol Fixer
 * 
 * Uses backticks to wrap mathematical expressions, which MDX treats as code
 * and doesn't try to parse as JSX.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Backtick-based replacements
const backtickReplacements = [
  // Revert HTML entities first
  { pattern: /&gt;/g, replacement: '>' },
  { pattern: /&lt;/g, replacement: '<' },
  { pattern: /&ge;/g, replacement: '≥' },
  { pattern: /&le;/g, replacement: '≤' },
  { pattern: /&plusmn;/g, replacement: '±' },
  
  // Then wrap mathematical expressions in backticks
  // Pattern: operator followed by space and number/percentage
  { pattern: /(\s|^|>)(>|<|≥|≤)\s*(\d+(?:\.\d+)?(?:%|[A-Za-z]+)?)\b/g, replacement: '$1`$2 $3`' },
  
  // Pattern: "Over" or "Under" followed by number (from previous fixes)
  { pattern: /\b(Over|Under)\s+(\d+(?:\.\d+)?(?:%|[A-Za-z]+)?)\b/g, replacement: '`$1 $2`' },
  
  // Pattern: number followed by + (like "70%+", "85%+")
  { pattern: /\b(\d+(?:\.\d+)?%?)\+/g, replacement: '`$1+`' },
  
  // Pattern: "Sub-" followed by time units
  { pattern: /\bSub-(\d+(?:\.\d+)?[a-zA-Z]+)\b/g, replacement: '`<$1`' },
  
  // Fix Mermaid diagram content - don't wrap if already in quotes
  { pattern: /"([^"]*?)`([^`]*?)`([^"]*?)"/g, replacement: '"$1$2$3"' },
];

// Function to process a single file
function processFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    let changeCount = 0;
    
    // Apply all replacement patterns
    backtickReplacements.forEach(({ pattern, replacement }) => {
      const matches = content.match(pattern);
      if (matches) {
        content = content.replace(pattern, replacement);
        modified = true;
        changeCount += matches.length;
      }
    });
    
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Fixed ${changeCount} expressions in: ${filePath}`);
      return changeCount;
    } else {
      console.log(`⚪ No expressions to fix in: ${filePath}`);
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
  console.log('🔧 Final MDX Symbol Fixer - Using Backticks for Math\n');
  
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
  console.log(`   Total expressions wrapped: ${totalChanges}`);
  
  if (totalChanges > 0) {
    console.log('\n✨ All mathematical expressions wrapped in backticks!');
    console.log('   MDX will treat them as code and not try to parse as JSX.');
  } else {
    console.log('\n✅ No expressions found that needed wrapping!');
  }
}

// Run the script
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { processFile, findMdxFiles, backtickReplacements };
