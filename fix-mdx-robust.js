#!/usr/bin/env node

/**
 * Robust MDX fixer for CelestialDocs
 * Fixes MDX parsing issues while preserving Mermaid diagrams and other content
 */

import fs from 'fs';
import path from 'path';

function fixMDXContent(content) {
  const lines = content.split('\n');
  const result = [];
  let inCodeBlock = false;
  let inMermaidBlock = false;
  let codeBlockType = '';

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    
    // Track code blocks
    if (line.trim().startsWith('```')) {
      if (!inCodeBlock) {
        inCodeBlock = true;
        codeBlockType = line.trim().substring(3);
        inMermaidBlock = codeBlockType === 'mermaid';
      } else {
        inCodeBlock = false;
        inMermaidBlock = false;
        codeBlockType = '';
      }
      result.push(line);
      continue;
    }

    // Skip processing inside code blocks (preserve as-is)
    if (inCodeBlock) {
      result.push(line);
      continue;
    }

    // Fix comparison operators outside of code blocks
    // This handles cases like "<10ms", ">93%", "<200ms", etc.
    line = line.replace(/([^`]|^)(<)(\d+(?:\.\d+)?(?:ms|fps|mbps|gb|mb|kb|%|w|°c|tops))/gi, '$1&lt;$3');
    line = line.replace(/([^`]|^)(>)(\d+(?:\.\d+)?(?:ms|fps|mbps|gb|mb|kb|%|w|°c|tops))/gi, '$1&gt;$3');
    
    // Fix standalone < and > that might be interpreted as JSX
    // But preserve them in obvious contexts like arrows (-->, <--, etc.)
    line = line.replace(/(?<!--)(<)(?!\w*\/?>|!--|br\/?>)/g, '&lt;');
    line = line.replace(/(?<!<\/?\w*)>(?!-)/g, '&gt;');
    
    // Fix specific patterns that commonly cause issues
    line = line.replace(/\b(\d+)\s*<\s*(\w+)/g, '$1 &lt; $2');
    line = line.replace(/\b(\w+)\s*>\s*(\d+)/g, '$1 &gt; $2');
    
    result.push(line);
  }

  return result.join('\n');
}

function processFile(filePath) {
  try {
    console.log(`Processing: ${filePath}`);
    
    const content = fs.readFileSync(filePath, 'utf8');
    const fixedContent = fixMDXContent(content);
    
    // Only write if content changed
    if (content !== fixedContent) {
      // Create backup
      const backupPath = `${filePath}.backup-${Date.now()}`;
      fs.writeFileSync(backupPath, content, 'utf8');
      console.log(`   Backup created: ${backupPath}`);
      
      // Write fixed content
      fs.writeFileSync(filePath, fixedContent, 'utf8');
      console.log(`   ✅ Fixed MDX parsing issues`);
    } else {
      console.log(`   ℹ️  No changes needed`);
    }
    
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
}

function findMDXFiles(directory) {
  const mdxFiles = [];
  
  function scanDirectory(dir) {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        scanDirectory(fullPath);
      } else if (item.endsWith('.mdx')) {
        mdxFiles.push(fullPath);
      }
    }
  }
  
  scanDirectory(directory);
  return mdxFiles;
}

// Main execution
const args = process.argv.slice(2);
const targetPath = args[0] || 'src/content/docs';

if (!fs.existsSync(targetPath)) {
  console.error(`Path not found: ${targetPath}`);
  process.exit(1);
}

console.log('🔧 Robust MDX Fixer for CelestialDocs');
console.log('=====================================');

const stat = fs.statSync(targetPath);

if (stat.isFile()) {
  if (targetPath.endsWith('.mdx')) {
    processFile(targetPath);
  } else {
    console.error('File must have .mdx extension');
  }
} else if (stat.isDirectory()) {
  const mdxFiles = findMDXFiles(targetPath);
  
  if (mdxFiles.length === 0) {
    console.log('No .mdx files found');
  } else {
    console.log(`Found ${mdxFiles.length} MDX file(s)\n`);
    mdxFiles.forEach(processFile);
  }
}

console.log('\n✨ MDX fixing complete!');
