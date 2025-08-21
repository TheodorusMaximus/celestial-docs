#!/usr/bin/env node

/**
 * MDX Validation Script for CelestialDocs
 * Detects potential MDX parsing issues before build
 */

import fs from 'fs';
import path from 'path';

class MDXValidator {
  constructor() {
    this.issues = [];
    this.warnings = [];
  }

  validateContent(content, filePath) {
    const lines = content.split('\n');
    let inCodeBlock = false;
    let codeBlockType = '';
    let lineNumber = 0;

    for (const line of lines) {
      lineNumber++;
      
      // Track code blocks
      if (line.trim().startsWith('```')) {
        if (!inCodeBlock) {
          inCodeBlock = true;
          codeBlockType = line.trim().substring(3);
        } else {
          inCodeBlock = false;
          codeBlockType = '';
        }
        continue;
      }

      // Skip validation inside code blocks
      if (inCodeBlock) continue;

      // Check for potential JSX parsing issues
      this.checkJSXIssues(line, lineNumber, filePath);
      this.checkComparisonOperators(line, lineNumber, filePath);
      this.checkUnescapedCharacters(line, lineNumber, filePath);
    }
  }

  checkJSXIssues(line, lineNumber, filePath) {
    // Check for < followed by alphanumeric (potential invalid JSX)
    const jsxPattern = /<[a-zA-Z0-9]/g;
    const matches = [...line.matchAll(jsxPattern)];
    
    for (const match of matches) {
      const context = line.substring(Math.max(0, match.index - 10), match.index + 20);
      
      // Skip if it looks like a valid HTML/JSX tag
      if (/<[a-zA-Z][a-zA-Z0-9]*(\s|>|\/)/g.test(line.substring(match.index))) {
        continue;
      }
      
      // Skip if it's in a code span
      if (this.isInCodeSpan(line, match.index)) {
        continue;
      }
      
      this.issues.push({
        type: 'jsx-parsing',
        file: filePath,
        line: lineNumber,
        column: match.index + 1,
        message: `Potential JSX parsing issue: "${match[0]}" might be interpreted as invalid JSX`,
        context: context.trim(),
        suggestion: 'Consider escaping with &lt; or wrapping in code spans with backticks'
      });
    }
  }

  checkComparisonOperators(line, lineNumber, filePath) {
    // Check for comparison operators that might cause issues
    const patterns = [
      { regex: /<\s*\d+(?:\.\d+)?(?:ms|fps|mbps|gb|mb|kb|%|w|°c|tops)/gi, op: '<' },
      { regex: />\s*\d+(?:\.\d+)?(?:ms|fps|mbps|gb|mb|kb|%|w|°c|tops)/gi, op: '>' }
    ];

    for (const { regex, op } of patterns) {
      const matches = [...line.matchAll(regex)];
      
      for (const match of matches) {
        if (this.isInCodeSpan(line, match.index)) continue;
        
        this.warnings.push({
          type: 'comparison-operator',
          file: filePath,
          line: lineNumber,
          column: match.index + 1,
          message: `Comparison operator "${op}" with units might cause parsing issues`,
          context: match[0],
          suggestion: `Consider escaping as &${op === '<' ? 'lt' : 'gt'}; or using code spans`
        });
      }
    }
  }

  checkUnescapedCharacters(line, lineNumber, filePath) {
    // Check for other potentially problematic characters
    const problematicPatterns = [
      { regex: /\{[^}]*(?:\n|$)/g, char: '{', message: 'Unmatched opening brace' },
      { regex: /[^{]*\}/g, char: '}', message: 'Unmatched closing brace' }
    ];

    for (const { regex, char, message } of problematicPatterns) {
      if (this.isInCodeSpan(line, 0)) continue;
      
      const matches = [...line.matchAll(regex)];
      for (const match of matches) {
        this.warnings.push({
          type: 'unescaped-character',
          file: filePath,
          line: lineNumber,
          column: match.index + 1,
          message: message,
          context: match[0].trim(),
          suggestion: 'Ensure braces are properly matched or escaped'
        });
      }
    }
  }

  isInCodeSpan(line, position) {
    // Check if position is within backticks (code span)
    const beforePosition = line.substring(0, position);
    const backtickCount = (beforePosition.match(/`/g) || []).length;
    return backtickCount % 2 === 1;
  }

  validateFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      this.validateContent(content, filePath);
    } catch (error) {
      this.issues.push({
        type: 'file-error',
        file: filePath,
        message: `Error reading file: ${error.message}`
      });
    }
  }

  generateReport() {
    console.log('\n📋 MDX Validation Report');
    console.log('========================\n');

    if (this.issues.length === 0 && this.warnings.length === 0) {
      console.log('✅ No issues found! Your MDX files look good.\n');
      return true;
    }

    if (this.issues.length > 0) {
      console.log('🚨 Critical Issues (will cause build failures):');
      console.log('-'.repeat(50));
      
      for (const issue of this.issues) {
        console.log(`\n📍 ${issue.file}:${issue.line}:${issue.column || 0}`);
        console.log(`   ${issue.message}`);
        if (issue.context) {
          console.log(`   Context: "${issue.context}"`);
        }
        if (issue.suggestion) {
          console.log(`   💡 Suggestion: ${issue.suggestion}`);
        }
      }
      console.log('\n');
    }

    if (this.warnings.length > 0) {
      console.log('⚠️  Warnings (might cause issues):');
      console.log('-'.repeat(50));
      
      for (const warning of this.warnings) {
        console.log(`\n📍 ${warning.file}:${warning.line}:${warning.column || 0}`);
        console.log(`   ${warning.message}`);
        if (warning.context) {
          console.log(`   Context: "${warning.context}"`);
        }
        if (warning.suggestion) {
          console.log(`   💡 Suggestion: ${warning.suggestion}`);
        }
      }
      console.log('\n');
    }

    console.log(`Summary: ${this.issues.length} critical issues, ${this.warnings.length} warnings\n`);
    
    if (this.issues.length > 0) {
      console.log('🔧 Run "node fix-mdx-robust.js <file>" to automatically fix many of these issues.\n');
    }

    return this.issues.length === 0;
  }
}

function findMDXFiles(directory) {
  const mdxFiles = [];
  
  function scanDirectory(dir) {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory() && !item.startsWith('.')) {
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
  console.error(`❌ Path not found: ${targetPath}`);
  process.exit(1);
}

console.log('🔍 MDX Validator for CelestialDocs');
console.log('==================================');

const validator = new MDXValidator();
const stat = fs.statSync(targetPath);

if (stat.isFile()) {
  if (targetPath.endsWith('.mdx')) {
    console.log(`Validating file: ${targetPath}`);
    validator.validateFile(targetPath);
  } else {
    console.error('❌ File must have .mdx extension');
    process.exit(1);
  }
} else if (stat.isDirectory()) {
  const mdxFiles = findMDXFiles(targetPath);
  
  if (mdxFiles.length === 0) {
    console.log('ℹ️  No .mdx files found');
    process.exit(0);
  }

  console.log(`Found ${mdxFiles.length} MDX file(s) to validate`);
  
  for (const file of mdxFiles) {
    validator.validateFile(file);
  }
}

const isValid = validator.generateReport();
process.exit(isValid ? 0 : 1);
