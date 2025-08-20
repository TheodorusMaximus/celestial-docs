# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CelestialDocs is an Astro-based documentation template with React components, TypeScript, and Tailwind CSS. The project uses PNPM as its package manager (required).

## Essential Commands

```bash
# Development
pnpm dev          # Start dev server on localhost:4321
pnpm build        # Type check and build static site
pnpm preview      # Preview production build

# Direct Astro access
pnpm astro        # Access Astro CLI commands
```

## Architecture & Code Structure

### Technology Stack
- **Astro 4.16** - Static site generator, primary framework
- **React 18.3** - Interactive components (`.tsx` files in components/)
- **TypeScript** - Type safety throughout
- **Tailwind CSS** - Styling framework
- **MDX** - Enhanced markdown with component support
- **Shadcn/ui** - Component library in `src/components/ui/`

### Key Directories
- `src/content/docs/` - Documentation MDX files (content goes here)
- `src/components/` - Reusable components (core/, docs/, home/, ui/)
- `src/config.ts` - Site configuration (navigation, features, social)
- `src/content/config.ts` - Content schema definitions
- `src/lib/types.ts` - TypeScript type definitions
- `public/` - Static assets

### Content Management
Documentation files in `src/content/docs/` use MDX with frontmatter:
```yaml
---
title: "Page Title"
description: "Description"
author: "Author Name"
publishDate: 2024-01-01
tags: ["tag1", "tag2"]
draft: false
showBreadcrumbs: true
showTableOfContents: true
showNavigationLinks: true
---
```

### Component Patterns
- Astro components (`.astro`) for static content and layouts
- React components (`.tsx`) for interactive features
- Mix components in MDX files using imports
- Shadcn components in `src/components/ui/` follow Radix UI patterns

### Configuration Files
- `astro.config.mjs` - Build configuration and integrations
- `tailwind.config.mjs` - Design system configuration
- `components.json` - Shadcn UI settings
- `tsconfig.json` - TypeScript with path aliases (@/* → src/*)

### Deployment
GitHub Pages deployment via `.github/workflows/deploy.yml`:
- Triggered on push to main branch
- Uses PNPM and Node 20
- Deploys to celestialdocs.hyperoot.dev

## Development Guidelines

### Adding Documentation
1. Create MDX files in `src/content/docs/`
2. Update navigation in `src/config.ts` if needed
3. Use existing components from `src/components/`

### Component Development
- Check existing components in `src/components/` before creating new ones
- Follow existing patterns for Astro vs React component usage
- Use Tailwind classes for styling
- Import Shadcn components from `@/components/ui/`

### Code Quality
- TypeScript will check types during `pnpm build`
- Prettier is configured for code formatting
- No ESLint or test framework currently configured

### Important Notes
- Always use PNPM (not npm or yarn)
- Static assets go in `public/` directory
- Search functionality uses Fuse.js (automatically indexes content)
- Dark/light theme switching is built-in
- Code highlighting uses Shiki with Catppuccin themes