#!/usr/bin/env node

/**
 * Surgical MDX Symbol Fixer
 * 
 * Only fixes mathematical symbols that are actually causing MDX parsing errors,
 * while preserving Mermaid diagrams and other valid content.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to process a single file
function processFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    let changeCount = 0;
    
    // Split content into lines for processing
    const lines = content.split('\n');
    let inMermaidBlock = false;
    let inCodeBlock = false;
    
    const processedLines = lines.map((line, index) => {
      // Track code blocks
      if (line.trim().startsWith('```') || line.trim().startsWith('`mermaid')) {
        inMermaidBlock = line.includes('mermaid');
        inCodeBlock = !inCodeBlock;
        return line;
      }
      
      // Skip processing inside code blocks and Mermaid diagrams
      if (inCodeBlock || inMermaidBlock) {
        return line;
      }
      
      let processedLine = line;
      
      // Only fix mathematical symbols that are NOT inside JSX attributes
      // and NOT inside quoted strings
      
      // Pattern 1: Fix standalone mathematical expressions (not in quotes or JSX)
      if (!line.includes('className=') && !line.includes('"') && !line.includes("'")) {
        // Replace > followed by space and number/percentage
        const gtMatches = processedLine.match(/(\s|^)>(\s*)(\d+(?:\.\d+)?(?:%|[A-Za-z]+)?)/g);
        if (gtMatches) {
          processedLine = processedLine.replace(/(\s|^)>(\s*)(\d+(?:\.\d+)?(?:%|[A-Za-z]+)?)/g, '$1over $3');
          modified = true;
          changeCount += gtMatches.length;
        }
        
        // Replace < followed by space and number/percentage
        const ltMatches = processedLine.match(/(\s|^)<(\s*)(\d+(?:\.\d+)?(?:%|[A-Za-z]+)?)/g);
        if (ltMatches) {
          processedLine = processedLine.replace(/(\s|^)<(\s*)(\d+(?:\.\d+)?(?:%|[A-Za-z]+)?)/g, '$1under $3');
          modified = true;
          changeCount += ltMatches.length;
        }
        
        // Replace mathematical symbols
        const symbolReplacements = [
          { from: /≥(\s*)(\d+(?:\.\d+)?(?:%|[A-Za-z]+)?)/g, to: '$2 or more' },
          { from: /≤(\s*)(\d+(?:\.\d+)?(?:%|[A-Za-z]+)?)/g, to: '$2 or less' },
        ];
        
        symbolReplacements.forEach(({ from, to }) => {
          const matches = processedLine.match(from);
          if (matches) {
            processedLine = processedLine.replace(from, to);
            modified = true;
            changeCount += matches.length;
          }
        });
      }
      
      return processedLine;
    });
    
    if (modified) {
      const newContent = processedLines.join('\n');
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log(`✅ Fixed ${changeCount} mathematical expressions in: ${filePath}`);
      return changeCount;
    } else {
      console.log(`⚪ No problematic expressions found in: ${filePath}`);
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
  console.log('🔧 Surgical MDX Symbol Fixer - Targeted Fixes Only\n');
  
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
  console.log(`   Total expressions fixed: ${totalChanges}`);
  
  if (totalChanges > 0) {
    console.log('\n✨ Problematic mathematical expressions fixed!');
    console.log('   Mermaid diagrams and JSX content preserved.');
  } else {
    console.log('\n✅ No problematic expressions found!');
  }
}

// Run the script
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { processFile, findMdxFiles };
