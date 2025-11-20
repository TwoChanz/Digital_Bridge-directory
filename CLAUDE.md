# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Digital Blueprint** is a curated directory platform for AEC (Architecture, Engineering, Construction) industry digital tools. Built with Next.js 15, it features a filterable tech directory, Supabase backend integration (planned), and Plausible Analytics tracking.

## Development Commands

```bash
# Install dependencies (npm or pnpm)
npm install
# or
pnpm install

# Run development server
npm run dev
# Opens at http://localhost:3000

# Build for production
npm run build

# Start production server
npm run start

# Run linter
npm run lint

# Import tools to Supabase (requires SERVICE_ROLE_KEY)
npm run import-tools

# Generate PNG favicons from SVG icon
npm run generate-favicons
```

## Architecture & Key Patterns

### App Structure (Next.js App Router)
- **App Router**: Uses Next.js 15 App Router with React 19
- **Route organization**: `app/` directory contains routes
  - Dynamic routes: `app/category/[slug]/page.tsx`, `app/tool/[slug]/page.tsx`
  - API routes: `app/api/tools/[slug]/route.ts`
  - Special files: `layout.tsx` (root layout), `loading.tsx` (loading states), `head.tsx`, `not-found.tsx`
  - Static routes: `/categories`, `/blog`, `/submit`, `/pricing`, `/compare`
- **Next.js 15 async pattern**: All params and searchParams are now async and require `React.use()` or `await` in Server Components
  - Example: `const params = await props.params` or `const params = use(props.params)`
- **Path aliases**: Uses `@/` prefix for imports (configured in tsconfig.json)
  - `@/components`, `@/lib`, `@/types`, `@/hooks`

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
  - Radix UI primitives with custom styling (Accordion, AlertDialog, Avatar, Button, Card, Checkbox, Dialog, DropdownMenu, etc.)
  - Utilities: `lib/utils.ts` contains `cn()` helper for className merging with tailwind-merge and clsx
  - Component config: `components.json` defines ShadCN setup (base color: neutral, CSS variables enabled)
- **Custom Components**:
  - `search-dialog.tsx`: Global search with Fuse.js fuzzy matching
  - `search-button.tsx`: Trigger for search dialog
  - `compare-button.tsx`: Tool comparison feature
  - `theme-toggle.tsx`: Dark/light mode switcher
- **Theme System**:
  - Uses `next-themes` for dark mode
  - `ThemeProvider` wraps app in `app/layout.tsx`
  - CSS variables defined in `app/globals.css` for light/dark themes

### Analytics
- **Plausible Analytics**:
  - Script loaded in `app/layout.tsx`
  - Domain: `constructiveblueprint.com`
  - Custom events tracked via `lib/analytics.ts` → `logEvent()` function
  - Events: `Tool Viewed`, `Submit Tool`, `Blog CTA Click`, `Affiliate Click`

### Styling
- **Tailwind CSS**: Configured via `tailwind.config.ts`
  - Custom colors, animations via `tailwindcss-animate`
  - Responsive breakpoints, container queries
- **Dark mode**: Class-based strategy (`dark:` prefix) with full component support
- **Design system**: ShadCN UI provides consistent component patterns
- **Global styles**: `app/globals.css` with CSS variables for theming

## Important Technical Considerations

### Data Import Script
- `scripts/import-tools.ts` requires `SUPABASE_SERVICE_ROLE_KEY` (not just anon key) to bypass RLS
- Run with: `npm run import-tools` (uses tsx for TypeScript execution)
- Uses `upsert` strategy to prevent duplicate entries
- Handles relationships: categories, tags, platforms, pricing tiers
- SQL schema files in `scripts/`:
  - `001-create-database.sql`: Initial table creation
  - `002-seed-data.sql`: Sample/seed data
  - `scripts/supabase/001-create-tables.sql`: Complete production schema with RLS policies

### Static Data Structure
- Tools data in `tools.json` (root) is meant to be imported to Supabase
- Each tool includes: slug, name, tagline, description, URLs (website, affiliate, logo), category, tags, platforms, pricing tiers
- TypeScript types defined in `types/index.ts`: Tool, Category, Tag, Platform, PricingTier interfaces

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

## Build Configuration

- **Next.js config** (`next.config.mjs`):
  - ESLint: ignored during builds (`ignoreDuringBuilds: true`)
  - TypeScript: build errors ignored (`ignoreBuildErrors: true`)
  - Images: unoptimized (no Next.js Image Optimization)
- **TypeScript** (`tsconfig.json`):
  - Target: ES6, strict mode enabled
  - Module resolution: bundler strategy
  - Path aliases: `@/*` maps to project root

## Key Helper Functions

- **`lib/helpers.ts`**: Utility functions for URL manipulation, slug generation, logo fetching
  - `getAffiliateUrl(tool)`: Adds UTM parameters to affiliate links
  - `getToolLogoUrl(website, logoUrl)`: Clearbit logo fallback logic
  - `slugify(text)`: Converts text to URL-safe slugs
- **`lib/analytics.ts`**: Plausible event tracking
  - `logEvent(eventName, props)`: Sends custom events to Plausible

## Current Status & Next Steps

### Completed (Phases 1-4) ✅
- **Phase 1 - Foundation**: TypeScript types, centralized data layer (35 tools), category routing, Next.js 15 compatibility
- **Phase 2 - Backend**: Supabase configuration, database schema with RLS, automatic fallback to mock data
- **Phase 3 - Monetization**:
  - Affiliate links for 13 tools (37% coverage, up from 8.6%)
  - Click tracking with Plausible Analytics (`AffiliateCtaButton` component)
  - Commission rates and cookie durations documented in `lib/data.ts`
- **Phase 4 - Visual Assets**:
  - Brand logo (`/public/logo.svg`) integrated in header/footer
  - Complete favicon system (SVG + PNG variants: icon-192, icon-512, apple-touch-icon, favicon.ico)
  - OpenGraph image (`/public/og-image.svg`) for social sharing
  - Category hero images (6 unique banners with color-coded gradients)
  - PWA manifest (`/public/site.webmanifest`) with shortcuts
  - Comprehensive SEO metadata in `app/layout.tsx`

### Pending
- **Screenshot Acquisition**: Contact top 15 vendors for product screenshots (see `VISUAL_ASSETS_GUIDE.md`)
- **Database initialization**: Run `scripts/supabase/001-create-tables.sql` in Supabase SQL Editor
- **Data import**: Run `npm run import-tools` after database setup
- **Frontend migration**: Update components to use `lib/data-supabase.ts` instead of `lib/data.ts`
- **Phase 5+**: Blog integration, comparison pages, advanced analytics (see ROADMAP.md)
