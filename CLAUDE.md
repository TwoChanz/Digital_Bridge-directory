# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Digital Blueprint** is a curated directory platform for AEC (Architecture, Engineering, Construction) industry digital tools. Built with Next.js 15, it features a filterable tech directory, Supabase backend integration (planned), and Plausible Analytics tracking.

## Development Commands

```bash
# Install dependencies (uses pnpm)
pnpm install

# Run development server
pnpm dev
# Opens at http://localhost:3000

# Build for production
pnpm build

# Start production server
pnpm start

# Run linter
pnpm lint
```

## Architecture & Key Patterns

### App Structure (Next.js App Router)
- **App Router**: Uses Next.js 15 App Router with React 19
- **Route organization**: `app/` directory contains routes
  - Dynamic routes: `app/category/[slug]/page.tsx`, `app/tool/[id]/page.tsx`
  - Special files: `layout.tsx` (root layout), `loading.tsx` (loading states), `head.tsx`

### Data Layer
- **Supabase integration**: Phase 2 completed - backend configured with automatic fallback
  - `lib/supabase.ts`: Supabase client initialization with TypeScript types
  - `lib/data-supabase.ts`: Data fetching functions with automatic fallback to mock data
  - `lib/data.ts`: Centralized mock data (35 tools across 6 categories)
  - `scripts/supabase/001-create-tables.sql`: Complete database schema
  - Schema includes: `categories`, `tools`, `tags`, `platforms` and junction tables (`tool_tags`, `tool_platforms`)
  - Environment variables configured in `.env.local`
- **Current state**: App uses mock data until database schema is run in Supabase SQL Editor
- **Automatic fallback**: If Supabase is not configured, app automatically uses mock data from `lib/data.ts`

### Component Architecture
- **UI Components**: ShadCN UI library components in `components/ui/`
  - Radix UI primitives with custom styling
  - Utilities: `lib/utils.ts` contains `cn()` helper for className merging
- **Theme System**:
  - Uses `next-themes` for dark mode
  - `ThemeProvider` wraps app in `app/layout.tsx`
  - `ThemeToggle` component for switching themes

### Analytics
- **Plausible Analytics**:
  - Script loaded in `app/layout.tsx`
  - Domain: `constructiveblueprint.com`
  - Custom events tracked via `lib/analytics.ts` → `logEvent()` function
  - Events: `Tool Viewed`, `Submit Tool`, `Blog CTA Click`, `Affiliate Click`

### Styling
- **Tailwind CSS**: Configured via `tailwind.config.ts`
- **Dark mode**: Class-based strategy with full component support
- **Design system**: ShadCN UI provides consistent component patterns

## Important Technical Considerations

### Data Import Script
- `scripts/import-tools.ts` requires `SUPABASE_SERVICE_ROLE_KEY` (not just anon key) to bypass RLS
- Uses `upsert` strategy to prevent duplicate entries
- Handles relationships: categories, tags, platforms, pricing tiers

### Static Data Structure
- Tools data in `tools.json` is meant to be imported to Supabase
- Each tool includes: slug, name, tagline, description, URLs (website, affiliate, logo), category, tags, platforms, pricing tiers

### Environment Variables
Required in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=constructiveblueprint.com
```
For data import script, also needs:
```
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## Current Status & Next Steps

### Completed (Phase 1 & 2)
- TypeScript types defined in `types/index.ts`
- Centralized data layer with 35 production tools
- Category routing and dynamic pages
- Affiliate link tracking with UTM parameters
- Clearbit logo integration
- Next.js 15 compatibility fixes (React.use() for params/searchParams)
- Supabase client configuration and data layer
- Database schema with RLS policies
- Automatic fallback to mock data

### Pending
- **Database initialization**: Run `scripts/supabase/001-create-tables.sql` in Supabase SQL Editor
- **Data import**: Optionally import existing tools to Supabase database
- **Frontend migration**: Update components to use `lib/data-supabase.ts` instead of `lib/data.ts`
- **Phase 3+**: SEO optimization, blog integration, monetization features (see ROADMAP.md)
