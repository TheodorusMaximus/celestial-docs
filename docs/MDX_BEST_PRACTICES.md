# MDX Best Practices for Mathematical Symbols

## The Problem

MDX (Markdown + JSX) interprets `<` and `>` as JSX tag delimiters, which causes parsing errors when used in mathematical contexts.

## Solutions

### 1. Use HTML Entities (Recommended)

Instead of raw symbols, use HTML entities:

```mdx
<!-- ❌ Bad - causes parsing errors -->
Performance: >10 FPS
Budget: <$5K

<!-- ✅ Good - uses HTML entities -->
Performance: &gt; 10 FPS
Budget: &lt; $5K
```

### 2. Use Code Spans

Wrap mathematical expressions in backticks:

```mdx
<!-- ✅ Good for inline math -->
Performance: `> 10 FPS`
Budget: `< $5K`
```

### 3. Use Math Components

For complex expressions, use our math components:

```mdx
import { mathPatterns } from '@/components/math';

<!-- ✅ Good for reusable patterns -->
<span dangerouslySetInnerHTML={{ __html: mathPatterns.greaterThan('10 FPS') }} />
```

### 4. Escape in Mermaid Diagrams

In Mermaid diagrams, always use HTML entities within quotes:

```mermaid
graph TD
    A["Performance: &gt; 10 FPS"]
    B["Budget: &lt; $5K"]
```

## Common HTML Entities

| Symbol | Entity | Description |
|--------|--------|-------------|
| >      | `&gt;` | Greater than |
| <      | `&lt;` | Less than |
| ≥      | `&ge;` | Greater than or equal |
| ≤      | `&le;` | Less than or equal |
| ±      | `&plusmn;` | Plus-minus |
| ×      | `&times;` | Multiplication |
| ÷      | `&divide;` | Division |

## Automated Fixing

Use our symbol fixer script:

```bash
node fix-mdx-symbols-better.js
```

This script automatically converts problematic symbols to HTML entities while preserving their visual appearance.

## Prevention

1. **Always preview**: Test MDX files in development before committing
2. **Use linting**: The build process will catch these errors early
3. **Follow patterns**: Use established patterns from existing files
4. **Use components**: Leverage reusable math components for consistency
