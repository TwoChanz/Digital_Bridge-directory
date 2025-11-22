# CLAUDE.md - AI Assistant Guide

**Digital Blueprint** - Construction Technology Directory

Last Updated: 2025-11-22

---

## Project Overview

Digital Blueprint is a curated directory platform for AEC (Architecture, Engineering, Construction) industry digital tools. It helps construction professionals discover, compare, and choose from hundreds of construction technology tools including BIM software, drone mapping, AR/VR, estimating platforms, and more.

**Live URL**: constructiveblueprint.com (referenced in analytics)

---

## Tech Stack

### Core Framework
- **Next.js 15.2.4** (App Router) - React framework with server components
- **React 19** - UI library
- **TypeScript 5** - Type safety

### UI & Styling
- **Tailwind CSS 3.4.17** - Utility-first CSS
- **ShadCN UI** - Component library built on Radix UI
- **Lucide React** - Icon library
- **next-themes** - Dark mode support

### Backend & Data
- **Supabase** - PostgreSQL database + authentication + storage
  - Connection configured via environment variables
  - Database schema in `scripts/001-create-database.sql`
  - Seed data in `scripts/002-seed-data.sql`

### Analytics
- **Plausible Analytics** - Privacy-focused web analytics
  - Domain: constructiveblueprint.com
  - Events tracked in `lib/analytics.ts`

### Package Manager
- **pnpm** - Fast, disk-efficient package manager

---

## Architecture & File Structure

```
/
├── app/                          # Next.js 15 App Router
│   ├── layout.tsx                # Root layout with theme provider
│   ├── page.tsx                  # Homepage with categories, featured tools
│   ├── globals.css               # Global styles + Tailwind directives
│   ├── head.tsx                  # HTML head config
│   ├── loading.tsx               # Loading UI
│   ├── blog/
│   │   └── page.tsx              # Blog listing page
│   ├── category/
│   │   └── [slug]/
│   │       ├── page.tsx          # Dynamic category pages
│   │       └── loading.tsx       # Category loading state
│   ├── tool/
│   │   └── [id]/
│   │       └── page.tsx          # Individual tool detail pages
│   ├── submit/
│   │   └── page.tsx              # Tool submission form
│   └── pricing/
│       └── page.tsx              # Pricing/listing tiers page
│
├── components/
│   ├── ui/                       # ShadCN UI primitives
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── badge.tsx
│   │   ├── form.tsx
│   │   └── ... (40+ components)
│   ├── theme-provider.tsx        # Next-themes wrapper
│   └── ThemeToggle.tsx           # Dark/light mode toggle
│
├── lib/
│   ├── utils.ts                  # Utility functions (cn, etc.)
│   └── analytics.ts              # Plausible event tracking
│
├── hooks/
│   ├── use-toast.ts              # Toast notification hook
│   ├── use-mobile.tsx            # Mobile detection hook
│   └── useHasMounted.ts          # Hydration-safe mounting
│
├── scripts/
│   ├── 001-create-database.sql   # Database schema
│   ├── 002-seed-data.sql         # Sample/seed data
│   └── import-tools.ts           # Tool import script (Supabase)
│
├── public/                       # Static assets
├── styles/                       # Additional style files
├── tools.json                    # Tool data for import
├── components.json               # ShadCN config
├── tailwind.config.ts            # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
└── next.config.mjs               # Next.js configuration
```

---

## Database Schema

### Core Tables

**categories**
- `id`, `slug`, `name`, `description`, `icon`, `color`
- Categories like "BIM Software", "Drone Mapping", "AR/VR"

**tools**
- `id`, `slug`, `name`, `tagline`, `description`, `short_description`
- `website_url`, `logo_url`, `hero_image_url`
- `category_id` (FK to categories)
- `pricing_type`, `pricing_details`
- `rating`, `review_count`, `view_count`
- `verified`, `sponsored`, `featured` (boolean flags)
- `status` ('pending', 'approved', 'rejected')
- `company_id` (FK to companies)

**platforms**
- `id`, `name`, `icon`
- e.g., "Web", "iOS", "Android", "Windows"

**tool_platforms** (junction table)
- Many-to-many: tools ↔ platforms

**tags**
- `id`, `name`, `slug`

**tool_tags** (junction table)
- Many-to-many: tools ↔ tags

**pricing_tiers**
- `id`, `tool_id`, `name`, `price`, `period`, `features[]`, `popular`, `sort_order`

**features**
- `id`, `tool_id`, `description`, `sort_order`

**screenshots**
- `id`, `tool_id`, `image_url`, `alt_text`, `sort_order`

**companies**
- `id`, `name`, `website`, `founded_year`, `employees`, `headquarters`

**tool_submissions**
- Pending submissions from the submit form
- Fields: `tool_name`, `category`, `website_url`, `description`, etc.
- `status` ('pending', 'approved', 'rejected')

**blog_posts**
- `id`, `slug`, `title`, `excerpt`, `content`, `category`, `author`
- `published`, `featured`, `view_count`, `read_time_minutes`

**analytics**
- `id`, `tool_id`, `event_type`, `user_agent`, `ip_address`, `referrer`
- Tracks views, clicks, demo requests

### Database Indexes
- Created on: `category_id`, `status`, `featured`, `sponsored`, `tool_tags`, `analytics.created_at`

---

## Key Conventions & Patterns

### TypeScript Configuration
- **Path Alias**: `@/*` maps to project root
  - Example: `@/components/ui/button`
  - Example: `@/lib/analytics`
- **Target**: ES6
- **Strict mode**: Enabled

### Component Patterns

#### Client Components
- Use `"use client"` directive for:
  - Interactive components (buttons, forms)
  - Theme switching
  - State management (useState, useEffect)
  - Browser APIs (window, document)
- Example: `app/page.tsx` (uses theme toggle, state)

#### Server Components (Default)
- Default for all components in `app/` directory
- No `"use client"` directive needed
- Can fetch data directly
- Cannot use hooks or browser APIs

### Styling Conventions
- **Tailwind utility classes** preferred
- **Dark mode**: class-based (`dark:` prefix)
  - Example: `dark:bg-gray-900 dark:text-white`
- **cn() utility**: Merge Tailwind classes
  - Imported from `@/lib/utils`
- **Responsive**: Mobile-first approach
  - Breakpoints: `sm:`, `md:`, `lg:`, `xl:`

### UI Component Library (ShadCN)
- All UI components in `components/ui/`
- Based on Radix UI primitives
- **Do not edit** ShadCN components directly
- Customize via Tailwind classes or wrapper components
- Icon library: Lucide React
- Config: `components.json`

### Analytics Events
Tracked via `lib/analytics.ts` → Plausible:

```typescript
import { logEvent } from '@/lib/analytics'

// Usage
logEvent('Tool Viewed', { tool_id: '123', tool_name: 'Revit' })
logEvent('Submit Tool')
logEvent('Blog CTA Click')
logEvent('Affiliate Click', { url: 'https://example.com' })
```

**Key Events**:
- `Tool Viewed` - Tool page loaded
- `Submit Tool` - Form submission
- `Blog CTA Click` - Blog navigation
- `Affiliate Click` - Outbound affiliate links

---

## Development Workflows

### Local Setup

```bash
# Clone repository
git clone <repo-url>
cd digital-blueprint

# Install dependencies
pnpm install

# Environment variables (.env.local)
NEXT_PUBLIC_SUPABASE_URL=your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=constructiveblueprint.com

# Run development server
pnpm dev
# Opens at http://localhost:3000

# Build for production
pnpm build

# Start production server
pnpm start

# Linting
pnpm lint
```

### Database Setup

1. **Create database**: Run `scripts/001-create-database.sql` in Supabase SQL editor
2. **Seed data**: Run `scripts/002-seed-data.sql`
3. **Import tools**: Use `scripts/import-tools.ts` with `tools.json`

### Importing Tools from JSON

```bash
# Requires Supabase service role key (not anon key)
SUPABASE_URL=<url> SUPABASE_SERVICE_ROLE_KEY=<key> node scripts/import-tools.ts
```

This script:
- Reads `tools.json`
- Upserts categories, platforms, tags, pricing tiers
- Links tools to categories, tags, platforms via junction tables
- Handles duplicates via slug-based upsert

---

## Adding New Features

### Adding a New Page

1. Create file in `app/` directory (e.g., `app/about/page.tsx`)
2. Use Server Component by default (async function)
3. For interactivity, add `"use client"` directive
4. Update navigation in `app/page.tsx` header/footer

### Adding a New UI Component

**For custom components**:
```bash
# Create in components/ (not components/ui/)
# Example: components/ToolCard.tsx
```

**For ShadCN components**:
```bash
# Use ShadCN CLI (if available)
npx shadcn-ui@latest add <component-name>
# Or manually copy from ShadCN docs
```

### Adding a New Category

1. **Database**: Insert into `categories` table
   ```sql
   INSERT INTO categories (slug, name, description, icon, color)
   VALUES ('new-category', 'New Category', 'Description here', 'icon-name', 'bg-color-500');
   ```

2. **Frontend**: Update hardcoded categories in `app/page.tsx` (lines 23-72)
   - Add category object with id, name, icon, description, count, color
   - Import icon from `lucide-react`

3. **Navigation**: Add to footer links (lines 467-489 in `app/page.tsx`)

### Adding a New Tool

**Via Database**:
```sql
INSERT INTO tools (slug, name, tagline, short_description, website_url, logo_url, category_id, pricing_type, pricing_details)
VALUES (...);
```

**Via JSON Import**:
1. Add tool object to `tools.json`
2. Run `scripts/import-tools.ts`

**Via Submission Form**:
- Navigate to `/submit`
- Fill form → Creates record in `tool_submissions`
- Admin review required

---

## Critical Notes for AI Assistants

### DO NOT Modify
- **ShadCN UI components** in `components/ui/` (unless explicitly requested)
- **Next.js config** without understanding implications
- **Database schema** without migration strategy

### ALWAYS
- **Read existing code** before making changes
- **Preserve TypeScript types** and strict mode compliance
- **Test dark mode** when changing UI (use `dark:` classes)
- **Use path aliases** (`@/...`) for imports
- **Follow mobile-first** responsive design
- **Track analytics events** for user interactions
- **Use existing UI components** before creating new ones

### Code Quality Standards
- **TypeScript**: No `any` types (use proper typing)
- **React**: Prefer functional components
- **Next.js**: Use App Router patterns (not Pages Router)
- **Styling**: Tailwind utilities > custom CSS
- **Accessibility**: Include ARIA labels, semantic HTML
- **Performance**: Optimize images, lazy load when appropriate

### Common Tasks

**Fetching from Supabase** (example pattern):
```typescript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Fetch tools
const { data, error } = await supabase
  .from('tools')
  .select('*')
  .eq('status', 'approved')
  .order('created_at', { ascending: false })
```

**Dynamic Routes**:
- Category: `app/category/[slug]/page.tsx`
- Tool: `app/tool/[id]/page.tsx`
- Access params via: `{ params }: { params: { slug: string } }`

**Theme Awareness**:
```tsx
// Check dark mode
import { useTheme } from 'next-themes'
const { theme } = useTheme()

// Apply dark styles
className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
```

---

## Environment Variables

Required in `.env.local`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...

# Analytics
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=constructiveblueprint.com

# Optional (for import script)
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...
```

---

## Deployment

- **Platform**: Vercel (recommended for Next.js)
- **Build Command**: `pnpm build`
- **Output Directory**: `.next`
- **Install Command**: `pnpm install`
- **Node Version**: 18.x or higher
- **Environment Variables**: Set in Vercel dashboard

---

## Roadmap & Future Features

Based on README.md:
- Affiliate Link Auto-Enrichment via MindPal
- AI-Generated Tool Descriptions
- CSV/JSON Export of all Tools
- Newsletter Signup Integration
- Internationalization (i18n)

---

## Troubleshooting

### Hydration Errors
- Use `useHasMounted` hook for client-only rendering
- Check `suppressHydrationOnChange` on `<html>` tag

### Dark Mode Flicker
- Theme stored in localStorage
- `ThemeProvider` handles SSR safely
- Use `defaultTheme="system"` in layout.tsx

### Supabase Connection
- Verify environment variables
- Check CORS settings in Supabase dashboard
- Ensure RLS (Row Level Security) policies allow public read

### Build Errors
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `pnpm install`
- Check TypeScript errors: `pnpm build`

---

## Git Branching Strategy

- **Main Branch**: Production-ready code
- **Feature Branches**: `claude/<feature-name>-<session-id>`
  - Example: `claude/claude-md-miaen9tgy4pcllh2-01CCWck8kpotcciNVz3gMV4U`
- Always create commits with clear, descriptive messages
- Push to feature branch, then create PR to main

---

## Additional Resources

- [Next.js App Router Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [ShadCN UI](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Plausible Analytics](https://plausible.io/docs)

---

## Questions & Support

For codebase questions:
1. Check this CLAUDE.md file
2. Review README.md for project overview
3. Examine existing code patterns
4. Read inline comments in key files

**Key files to understand the project**:
- `app/page.tsx` - Homepage structure
- `app/layout.tsx` - Root layout and theme
- `scripts/001-create-database.sql` - Database schema
- `lib/analytics.ts` - Event tracking
- `components.json` - ShadCN configuration

---

**Last Updated**: November 22, 2025
**Maintainer**: Six1Five Studio
**License**: MIT
