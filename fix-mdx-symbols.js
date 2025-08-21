#!/usr/bin/env node

/**
 * MDX Symbol Fixer
 * 
 * This script fixes common MDX syntax issues with mathematical symbols
 * that cause parsing errors in Astro/MDX files.
 * 
 * Issues fixed:
 * - Greater than (>) symbols in text content
 * - Less than (<) symbols in text content  
 * - Greater than or equal (≥) symbols
 * - Less than or equal (≤) symbols
 * - Other mathematical symbols that conflict with JSX syntax
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define replacement patterns
const replacements = [
  // Mathematical comparison operators
  { pattern: /≥(\d+%)/g, replacement: '$1 or higher' },
  { pattern: /≥(\d+)/g, replacement: '$1+' },
  { pattern: /≤(\d+%)/g, replacement: '$1 or lower' },
  { pattern: /≤(\d+)/g, replacement: 'Up to $1' },
  
  // Greater than in text contexts (avoiding HTML tags)
  { pattern: />(\d+%)/g, replacement: 'Over $1' },
  { pattern: />(\d+)/g, replacement: 'Over $1' },
  { pattern: />99%/g, replacement: 'Over 99%' },
  { pattern: />95%/g, replacement: 'Over 95%' },
  { pattern: />90%/g, replacement: 'Over 90%' },
  { pattern: />85%/g, replacement: 'Over 85%' },
  { pattern: />80%/g, replacement: 'Over 80%' },
  { pattern: />70%/g, replacement: 'Over 70%' },
  
  // Fix specific patterns in Mermaid diagrams
  { pattern: /"([^"]*)<(\d+)([^"]*)"/, replacement: '"$1Under $2$3"' },
  { pattern: /"([^"]*)<(\d+[A-Za-z]+)([^"]*)"/, replacement: '"$1Under $2$3"' },
  { pattern: /"([^"]*)>(\d+)([^"]*)"/, replacement: '"$1Over $2$3"' },
  { pattern: /"([^"]*)>(\d+[A-Za-z%]+)([^"]*)"/, replacement: '"$1Over $2$3"' },
  
  // Less than in text contexts (avoiding HTML tags)
  { pattern: /<(\d+)ms/g, replacement: 'Under $1ms' },
  { pattern: /<(\d+)kg/g, replacement: 'Under $1kg' },
  { pattern: /<(\d+)K/g, replacement: 'Under $1K' },
  { pattern: /<(\d+)W/g, replacement: 'Under $1W' },
  { pattern: /<500ms/g, replacement: 'Sub-500ms' },
  { pattern: /<48/g, replacement: 'Under 48' },
  { pattern: /<10ms/g, replacement: 'Sub-10ms' },
  { pattern: /<50ms/g, replacement: 'Sub-50ms' },
  { pattern: /<100ms/g, replacement: 'Sub-100ms' },
  { pattern: /<5%/g, replacement: 'Under 5%' },
  
  // Specific common patterns in Mermaid diagrams and text
  { pattern: /\$(\d+)-(\d+)\/hour/g, replacement: '$$$1-$2/hour' },
  { pattern: /4096x3000 → 640x640/g, replacement: '4096x3000 to 640x640' },
  { pattern: /100m\+ cables/g, replacement: '100m+ cables' },
  
  // Fix any remaining problematic symbols in specific contexts
  { pattern: /Target: >(\d+)/g, replacement: 'Target: Over $1' },
  { pattern: /Latency: <(\d+)/g, replacement: 'Latency: Under $1' },
  { pattern: /AIR: ≥(\d+%)/g, replacement: 'AIR: $1+' },
  { pattern: /Uptime: >(\d+%)/g, replacement: 'Uptime: Over $1' },
];

// Function to process a single file
function processFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    let changeCount = 0;
    
    // Apply all replacement patterns
    replacements.forEach(({ pattern, replacement }) => {
      const matches = content.match(pattern);
      if (matches) {
        content = content.replace(pattern, replacement);
        modified = true;
        changeCount += matches.length;
      }
    });
    
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Fixed ${changeCount} issues in: ${filePath}`);
      return changeCount;
    } else {
      console.log(`⚪ No issues found in: ${filePath}`);
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
  console.log('🔧 MDX Symbol Fixer - Starting...\n');
  
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
  console.log(`   Total fixes applied: ${totalChanges}`);
  
  if (totalChanges > 0) {
    console.log('\n✨ All MDX symbol issues have been fixed!');
    console.log('   You can now run your build process to verify everything works.');
  } else {
    console.log('\n✅ No issues found - all files are clean!');
  }
}

// Run the script
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { processFile, findMdxFiles, replacements };
