# CLAUDE.md – AI Assistant Guide

**Project:** Digital Blueprint / Digital Bridge – Construction Technology Directory
**Last Updated:** 2025-11-22

---

## 1. Project Overview

Digital Blueprint is a curated directory platform for AEC (Architecture, Engineering, Construction) industry digital tools. It helps construction professionals discover, compare, and choose from hundreds of construction technology tools including BIM software, drone mapping, AR/VR, estimating platforms, and more.

**Live URL**: constructiveblueprint.com (referenced in analytics)

### Key Features
- 🔍 Filterable tech directory with categories, tags, and tool cards
- 🧩 Supabase-powered backend (PostgreSQL + Storage)
- 📊 Plausible event tracking (views, clicks, CTA)
- 🌘 Full dark mode + responsive layout
- 📝 Community tool submission form

### Goal for AI Assistants
Maintain a clean, type-safe Next.js 15 codebase, keep database + UI in sync, and preserve the directory's UX, SEO, and dark-mode experience.

---

## 2. Tech Stack

### 2.1 Core Framework
- **Next.js 15.2.4** (App Router) - React framework with server components
- **React 19** - UI library
- **TypeScript 5** - Type safety (strict mode enabled)
- **Node.js** 18.x or higher

### 2.2 UI & Styling
- **Tailwind CSS 3.4.17** - Utility-first CSS
- **ShadCN UI** - Component library built on Radix UI primitives
- **Lucide React** - Icon library
- **next-themes** - Dark mode support

### 2.3 Backend & Data
- **Supabase** - PostgreSQL database + authentication + storage
  - Connection configured via environment variables
  - Database schema in `scripts/001-create-database.sql`
  - Seed data in `scripts/002-seed-data.sql`

### 2.4 Analytics
- **Plausible Analytics** - Privacy-focused web analytics
  - Domain: constructiveblueprint.com
  - Events tracked in `lib/analytics.ts`

### 2.5 Package Manager
- **pnpm** - Fast, disk-efficient package manager
  - **AI Rule:** Always use `pnpm` commands (not npm/yarn) in instructions

### 2.6 Important Root Files
- `package.json` - Scripts, dependencies, engines
- `tsconfig.json` - TypeScript strictness + path aliases (`@/*`)
- `tailwind.config.ts` - Tailwind theme, content globs, color tokens
- `components.json` - ShadCN UI generator config
- `tools.json` - Source data for seeding the tools directory
- `README.md` - Human-facing project overview
- `CLAUDE.md` - This file (AI assistant instructions)

---

## 3. Directory Structure

### 3.1 File Structure Overview

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
│   │   └── page.tsx              # Tool submission form (Client Component)
│   └── pricing/
│       └── page.tsx              # Pricing/listing tiers page
│
├── components/
│   ├── ui/                       # ShadCN UI primitives (40+ components)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── badge.tsx
│   │   ├── form.tsx
│   │   ├── select.tsx
│   │   ├── toast.tsx
│   │   └── ... (more)
│   ├── theme-provider.tsx        # Next-themes wrapper
│   └── ThemeToggle.tsx           # Dark/light mode toggle (CRITICAL)
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
│   ├── 001-create-database.sql   # Database schema (PRIMARY SOURCE)
│   ├── 002-seed-data.sql         # Sample/seed data
│   └── import-tools.ts           # Tool import script (reads tools.json)
│
├── public/                       # Static assets
├── styles/                       # Additional style files
├── tools.json                    # Tool data for import
├── tailwind.config.ts            # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
└── next.config.mjs               # Next.js configuration
```

### 3.2 app/ – Next.js App Router

**AI Guidelines:**
- Use **App Router conventions**: `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`
- Prefer **Server Components** for data fetching
- Only mark with `'use client'` when needed:
  - Forms and interactions
  - Theme toggles
  - State management (useState, useEffect)
  - Browser APIs (window, document)

**Key Files:**
- `app/layout.tsx` - Root layout, wraps app in theme provider
- `app/page.tsx` - Homepage (lines 23-72: category definitions, lines 74-111: featured listings)
- `app/tool/[id]/page.tsx` - Dynamic route for individual tool details
- `app/submit/page.tsx` - Form for user submissions

### 3.3 components/ – Shared UI

**Top-level components:**
- `theme-provider.tsx` - Integrates next-themes for dark/light mode
- `ThemeToggle.tsx` - UI control to switch themes (**CRITICAL - DO NOT BREAK**)

**ShadCN UI Library** (`components/ui/*`):
- Follow ShadCN patterns and Tailwind styling
- Provide generic building blocks: inputs, buttons, dropdowns, etc.
- **DO NOT edit** these directly unless explicitly requested

**Custom Components (follow these patterns):**
- Use **PascalCase** filenames (e.g., `ToolCard.tsx`)
- Co-locate in `components/` directory
- Use **Tailwind** + ShadCN primitives, not raw inline styles

### 3.4 lib/ – Logic & Utilities

**Existing files:**
- `lib/analytics.ts` - Analytics integration (Plausible)
  - Use helper functions; **do not inline analytics** in components
- `lib/utils.ts` - Utility functions including `cn()` for class merging

**AI Rule:**
> Prefer to **add logic in lib/** rather than stuffing complex logic directly into page.tsx or components.

**Likely additional patterns:**
- `lib/db.ts` or `lib/supabase.ts` - Database client
- `lib/tools.ts` - Helper functions for fetching/filtering tools
- `lib/validators.ts` - Input validation, schemas

### 3.5 hooks/ – React Hooks

**Existing files:**
- `use-toast.ts` - Toast notifications
- `use-mobile.tsx` - Mobile detection
- `useHasMounted.ts` - Hydration-safe mounting

**AI Rule:**
> If you need reusable React hooks, put them here. Keep hooks small, focused, and **client-only** where appropriate.

### 3.6 scripts/ – Database & Tooling

**Files:**
- `001-create-database.sql` - Creates all DB tables (**PRIMARY SCHEMA SOURCE**)
- `002-seed-data.sql` - Seeds the database with initial data
- `import-tools.ts` - Reads from `tools.json` and imports into DB

**AI Rule:**
> When changing database structure:
> - **DO NOT edit existing SQL migrations** in ways that break deployed DBs
> - Instead, add **new** migration files (e.g., `003-add-feature.sql`)
> - Keep older migrations intact
> - Keep `tools.json` and DB schema in sync

### 3.7 tools.json – Tool Data Source

JSON data describing tools with fields:
- `id`, `name`, `slug`
- `category`, `tags`
- `platforms`
- `pricing`, `websiteUrl`, `description`

**AI Rule:**
> - Preserve structure of `tools.json`
> - If you add fields, update:
>   - DB schema (`001-create-database.sql` or new migration)
>   - `import-tools.ts`
>   - TypeScript types in `lib/*` or components

---

## 4. Database Schema

**Primary Source:** `scripts/001-create-database.sql` (read this file directly before modifying)

### 4.1 Core Tables

**categories**
- `id` SERIAL PRIMARY KEY
- `slug` VARCHAR(100) UNIQUE NOT NULL
- `name` VARCHAR(100) NOT NULL
- `description` TEXT
- `icon` VARCHAR(50)
- `color` VARCHAR(20)
- `created_at`, `updated_at` TIMESTAMP

Categories include: "BIM Software", "Drone Mapping", "AR/VR", "Estimating", "Project Management", "Field Tools"

**tools**
- `id` SERIAL PRIMARY KEY
- `slug` VARCHAR(100) UNIQUE NOT NULL
- `name` VARCHAR(200) NOT NULL
- `tagline` VARCHAR(300)
- `description` TEXT
- `short_description` VARCHAR(500)
- `website_url` VARCHAR(500)
- `logo_url` VARCHAR(500)
- `hero_image_url` VARCHAR(500)
- `category_id` INTEGER REFERENCES categories(id)
- `pricing_type` VARCHAR(50) - free, freemium, paid, custom
- `pricing_details` VARCHAR(200)
- `rating` DECIMAL(3,2) DEFAULT 0
- `review_count` INTEGER DEFAULT 0
- `view_count` INTEGER DEFAULT 0
- `verified` BOOLEAN DEFAULT FALSE
- `sponsored` BOOLEAN DEFAULT FALSE
- `featured` BOOLEAN DEFAULT FALSE
- `status` VARCHAR(20) DEFAULT 'pending' - pending, approved, rejected
- `company_id` INTEGER REFERENCES companies(id)
- `created_at`, `updated_at` TIMESTAMP

**platforms**
- `id` SERIAL PRIMARY KEY
- `name` VARCHAR(50) UNIQUE NOT NULL
- `icon` VARCHAR(50)

Examples: "Web", "iOS", "Android", "Windows", "Desktop"

**tool_platforms** (junction table)
- `tool_id` INTEGER REFERENCES tools(id) ON DELETE CASCADE
- `platform_id` INTEGER REFERENCES platforms(id) ON DELETE CASCADE
- PRIMARY KEY (tool_id, platform_id)

**tags**
- `id` SERIAL PRIMARY KEY
- `name` VARCHAR(50) UNIQUE NOT NULL
- `slug` VARCHAR(50) UNIQUE NOT NULL

**tool_tags** (junction table)
- `tool_id` INTEGER REFERENCES tools(id) ON DELETE CASCADE
- `tag_id` INTEGER REFERENCES tags(id) ON DELETE CASCADE
- PRIMARY KEY (tool_id, tag_id)

**pricing_tiers**
- `id` SERIAL PRIMARY KEY
- `tool_id` INTEGER REFERENCES tools(id) ON DELETE CASCADE
- `name` VARCHAR(100) NOT NULL
- `price` VARCHAR(50)
- `period` VARCHAR(50)
- `features` TEXT[] - Array of features
- `popular` BOOLEAN DEFAULT FALSE
- `sort_order` INTEGER DEFAULT 0

**features**
- `id` SERIAL PRIMARY KEY
- `tool_id` INTEGER REFERENCES tools(id) ON DELETE CASCADE
- `description` TEXT NOT NULL
- `sort_order` INTEGER DEFAULT 0

**screenshots**
- `id` SERIAL PRIMARY KEY
- `tool_id` INTEGER REFERENCES tools(id) ON DELETE CASCADE
- `image_url` VARCHAR(500) NOT NULL
- `alt_text` VARCHAR(200)
- `sort_order` INTEGER DEFAULT 0

**companies**
- `id` SERIAL PRIMARY KEY
- `name` VARCHAR(200) NOT NULL
- `website` VARCHAR(500)
- `founded_year` INTEGER
- `employees` VARCHAR(50)
- `headquarters` VARCHAR(200)
- `created_at` TIMESTAMP

**tool_submissions**
- `id` SERIAL PRIMARY KEY
- `tool_name` VARCHAR(200) NOT NULL
- `category` VARCHAR(100)
- `website_url` VARCHAR(500)
- `description` TEXT
- `short_description` VARCHAR(500)
- `pricing_type` VARCHAR(50)
- `pricing_details` VARCHAR(200)
- `platforms` TEXT[] - Array of platform names
- `tags` TEXT[] - Array of tag names
- `features` TEXT[] - Array of features
- `company_name` VARCHAR(200)
- `contact_email` VARCHAR(200)
- `logo_file_path` VARCHAR(500)
- `screenshot_file_paths` TEXT[]
- `status` VARCHAR(20) DEFAULT 'pending'
- `submitted_at`, `reviewed_at` TIMESTAMP
- `reviewer_notes` TEXT

**blog_posts**
- `id` SERIAL PRIMARY KEY
- `slug` VARCHAR(200) UNIQUE NOT NULL
- `title` VARCHAR(300) NOT NULL
- `excerpt` TEXT
- `content` TEXT
- `category` VARCHAR(100)
- `author` VARCHAR(100)
- `author_bio` TEXT
- `featured_image_url` VARCHAR(500)
- `published` BOOLEAN DEFAULT FALSE
- `featured` BOOLEAN DEFAULT FALSE
- `view_count` INTEGER DEFAULT 0
- `read_time_minutes` INTEGER
- `published_at`, `created_at`, `updated_at` TIMESTAMP

**analytics**
- `id` SERIAL PRIMARY KEY
- `tool_id` INTEGER REFERENCES tools(id) ON DELETE CASCADE
- `event_type` VARCHAR(50) NOT NULL - view, click, demo_request, etc.
- `user_agent` TEXT
- `ip_address` INET
- `referrer` VARCHAR(500)
- `created_at` TIMESTAMP

### 4.2 Database Indexes

Created for better performance:
- `idx_tools_category` ON tools(category_id)
- `idx_tools_status` ON tools(status)
- `idx_tools_featured` ON tools(featured)
- `idx_tools_sponsored` ON tools(sponsored)
- `idx_tool_tags_tool` ON tool_tags(tool_id)
- `idx_tool_tags_tag` ON tool_tags(tag_id)
- `idx_analytics_tool` ON analytics(tool_id)
- `idx_analytics_created` ON analytics(created_at)
- `idx_blog_posts_published` ON blog_posts(published)
- `idx_blog_posts_category` ON blog_posts(category)

### 4.3 Schema Modification Rules

**If you need to extend schema:**
1. Add a **new migration** SQL file in `scripts/` (e.g., `003-add-clarity-score.sql`)
2. Update any seeding or import scripts if necessary
3. Update TypeScript types/queries and UI
4. **NEVER** destructively modify existing migrations

---

## 5. Development Workflow

### 5.1 Local Setup

**Step-by-step instructions:**

```bash
# 1. Clone repository
git clone <repo-url>
cd Digital_Bridge-directory

# 2. Install dependencies
pnpm install

# 3. Set up environment variables
# Create .env.local with the following:
```

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...

# Analytics
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=constructiveblueprint.com

# Optional (for import script)
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...
```

```bash
# 4. Create database
# Run SQL migration against your Postgres instance:
psql "$DATABASE_URL" -f scripts/001-create-database.sql

# 5. Seed data
psql "$DATABASE_URL" -f scripts/002-seed-data.sql
# OR use the import script:
pnpm ts-node scripts/import-tools.ts

# 6. Start development server
pnpm dev
# Opens at http://localhost:3000
```

### 5.2 Common Scripts

From `package.json`:
- `pnpm dev` - Start Next.js dev server
- `pnpm build` - Production build
- `pnpm start` - Start built app
- `pnpm lint` - Run ESLint

### 5.3 Importing Tools from JSON

```bash
# Requires Supabase service role key (not anon key)
SUPABASE_URL=<url> SUPABASE_SERVICE_ROLE_KEY=<key> node scripts/import-tools.ts
```

**This script:**
- Reads `tools.json`
- Upserts categories, platforms, tags, pricing tiers
- Links tools to categories, tags, platforms via junction tables
- Handles duplicates via slug-based upsert

---

## 6. Key Conventions & Patterns

### 6.1 TypeScript & Imports

**Configuration:**
- Use **TypeScript everywhere**
- Follow configured **strict mode** in `tsconfig.json`
- Target: ES6
- Strict type checking enabled

**Path Aliases:**
Use aliases from `tsconfig.json` and `components.json`:
- `@/components/...`
- `@/lib/...`
- `@/hooks/...`
- `@/app/...`
- `@/ui/...` (for ShadCN components)

**Examples:**
```typescript
import { Button } from '@/components/ui/button'
import { logEvent } from '@/lib/analytics'
import { useToast } from '@/hooks/use-toast'
```

**AI Rule:**
> Never regress typing. Do not replace inferred/explicit types with `any` unless absolutely necessary and justified with comments.

### 6.2 Component Patterns

**Server Components (Default):**
- Default for all components in `app/` directory
- No `"use client"` directive needed
- Can fetch data directly
- Cannot use hooks or browser APIs

**Client Components:**
Use `"use client"` directive for:
- Forms and interactive components
- Theme switching
- State management (useState, useEffect)
- Browser APIs (window, document)
- Hooks from react or custom hooks

**Example:**
```tsx
// app/page.tsx
"use client"

import { useState } from 'react'
import { useTheme } from 'next-themes'

export default function HomePage() {
  const [search, setSearch] = useState('')
  const { theme } = useTheme()
  // ...
}
```

**Component Naming:**
- Use **PascalCase** for React component files
- Keep components small and composable
- Follow existing patterns in the codebase

### 6.3 Styling & Themes

**Tailwind CSS:**
- Use **Tailwind utility classes** for styling
- Avoid inline `style` objects or custom CSS unless already used
- Leverage ShadCN UI building blocks

**Dark Mode:**
- Controlled by `ThemeProvider` (from `components/theme-provider.tsx` + next-themes)
- Theme toggle handled by `components/ThemeToggle.tsx`
- Use class-based dark mode with `dark:` prefix

**Examples:**
```tsx
className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
className="border-gray-200 dark:border-gray-700"
className="hover:bg-gray-100 dark:hover:bg-gray-700"
```

**cn() Utility:**
Use for merging Tailwind classes (imported from `@/lib/utils`):
```tsx
import { cn } from '@/lib/utils'

<div className={cn(
  "base-classes",
  condition && "conditional-classes",
  className
)} />
```

**Responsive Design:**
- Mobile-first approach
- Breakpoints: `sm:`, `md:`, `lg:`, `xl:`

**AI Rules:**
> - Always test modifications in **both dark and light themes**
> - Do not break the theme toggle or global theming logic
> - Use Tailwind utilities > custom CSS

### 6.4 Data Fetching

**Next.js App Router patterns:**
- Data fetched directly in `page.tsx` for Server Components
- For client-side fetching, use `useSWR` or similar only if necessary
- Avoid duplicating queries - consolidate shared logic into `lib/` functions

**Example Supabase pattern:**
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

### 6.5 Analytics

**Use `lib/analytics.ts`:**
```typescript
import { logEvent } from '@/lib/analytics'

// Usage
logEvent('Tool Viewed', { tool_id: '123', tool_name: 'Revit' })
logEvent('Submit Tool')
logEvent('Blog CTA Click')
logEvent('Affiliate Click', { url: 'https://example.com' })
```

**Key Events:**
- `Tool Viewed` - Tool page loaded
- `Submit Tool` - Form submission
- `Blog CTA Click` - Blog navigation
- `Affiliate Click` - Outbound affiliate links

**AI Rule:**
> Do not hardcode analytics calls in components if a helper exists. Respect privacy and do not add invasive analytics patterns.

### 6.6 Dynamic Routes

**Pattern:**
- Category: `app/category/[slug]/page.tsx`
- Tool: `app/tool/[id]/page.tsx`

**Access params:**
```typescript
export default function ToolPage({
  params
}: {
  params: { id: string }
}) {
  // Use params.id
}
```

---

## 7. How to Perform Common Tasks (for AI Assistants)

### 7.1 Add a New Tool Manually

**Steps:**
1. Extend the **tools type** (if using TS types in `lib/tools.ts`)
2. Add the new tool:
   - **Via Database (preferred):**
     ```sql
     INSERT INTO tools (slug, name, tagline, short_description, website_url, logo_url, category_id, pricing_type, pricing_details)
     VALUES ('tool-slug', 'Tool Name', 'Tagline', 'Description', 'https://...', 'https://...', 1, 'paid', 'From $99/mo');
     ```
   - **Via JSON + re-run import (for dev):**
     - Add to `tools.json`
     - Run `pnpm ts-node scripts/import-tools.ts`

3. Ensure the tool:
   - Has a **unique slug**
   - Has valid category, tags, platforms references

4. Confirm:
   - Appears on the main listing
   - Filters correctly by category/tags/platform
   - Opens the detail page at `/tool/[id or slug]`

### 7.2 Add a New Category/Filter

**Steps:**
1. Update **DB table** categories:
   ```sql
   INSERT INTO categories (slug, name, description, icon, color)
   VALUES ('new-category', 'New Category', 'Description here', 'icon-name', 'bg-blue-500');
   ```

2. Update **Frontend** in `app/page.tsx` (lines 23-72):
   - Add category object with id, name, icon, description, count, color
   - Import icon from `lucide-react`

3. **TypeScript:**
   - Update any Category enums/types

4. **Navigation:**
   - Add to footer links (lines 467-489 in `app/page.tsx`)

5. **Test:**
   - Filtering by the new category correctly limits the tool list

### 7.3 Add a New Page

**Steps:**
1. Create new file: `app/resources/page.tsx`
2. Implement page as a server component by default:
   ```tsx
   export default function ResourcesPage() {
     return (
       <div>
         {/* Content */}
       </div>
     )
   }
   ```
3. Add navigation link in header/footer
4. Ensure page has proper **metadata** for SEO:
   ```tsx
   export const metadata = {
     title: 'Resources - Digital Blueprint',
     description: '...'
   }
   ```

### 7.4 Add a New UI Component

**For custom components:**
```bash
# Create in components/ (not components/ui/)
# Example: components/ToolCard.tsx
```

**For ShadCN components:**
```bash
# Use ShadCN CLI
npx shadcn-ui@latest add <component-name>
# Or manually copy from ShadCN docs
```

---

## 8. AI Assistant Operating Checklist

Whenever an AI assistant (Claude, Cursor, etc.) is asked to modify this repo, follow this checklist:

### 8.1 Read First
- [ ] Read `CLAUDE.md` (this file)
- [ ] Read `README.md`
- [ ] Read relevant files for the requested change:
  - `app/...` for pages/routes
  - `components/...` for UI
  - `lib/...` for logic
  - `scripts/...` for database

### 8.2 Identify Scope
- [ ] Which pages/components are affected?
- [ ] Which DB tables or scripts (if any)?
- [ ] Is this a breaking change?
- [ ] Does this affect existing user data?

### 8.3 Preserve Critical Elements
- [ ] **TypeScript typings** - No regression to `any`
- [ ] **Dark mode behavior** - Test both themes
- [ ] **Routing and SEO metadata** - Maintain URL structure
- [ ] **ShadCN component patterns** - Follow existing patterns
- [ ] **Theme toggle** - Do not break `ThemeToggle.tsx`

### 8.4 When Editing DB-Related Files
- [ ] Confirm impact on `001-create-database.sql`
- [ ] Check `002-seed-data.sql`
- [ ] Verify `tools.json` compatibility
- [ ] Update `import-tools.ts` if needed
- [ ] Avoid destructive schema changes
- [ ] Create new migration files instead of editing old ones

### 8.5 When Making Changes
- [ ] Keep diffs focused and minimal
- [ ] Prefer small, targeted changes over massive refactors
- [ ] Explain what you changed and why in natural language
- [ ] Update comments if logic changes
- [ ] Update TypeScript types if data structures change

### 8.6 Run/Recommend Checks
- [ ] `pnpm lint` - ESLint check
- [ ] `pnpm build` - Production build test
- [ ] TypeScript compilation (implicit in build)
- [ ] Visual test in browser (dev mode)
- [ ] Test dark mode toggle

### 8.7 Document
- [ ] If you introduce new patterns or conventions:
  - Update this `CLAUDE.md` (if stable)
  - Or add to `README.md` / comments as appropriate
- [ ] Update environment variable documentation if needed
- [ ] Update database schema section if tables change

---

## 9. Troubleshooting & Gotchas

### 9.1 Hydration / Server vs Client Mismatches

**Symptoms:**
- Error: "Hydration failed because the initial UI does not match what was rendered on the server"
- Mismatched content between server and client

**Commonly caused by:**
- Using `window` or browser APIs in Server Components
- Unstable keys or conditional rendering mismatches
- Theme-dependent rendering without proper client component setup

**Fix:**
1. Convert component to **Client Component** (`'use client'`)
2. Or isolate browser-only logic into a tiny client component wrapper
3. Use `useHasMounted` hook for client-only rendering:
   ```tsx
   import { useHasMounted } from '@/hooks/useHasMounted'

   export default function Component() {
     const mounted = useHasMounted()

     if (!mounted) return null

     // Client-only code here
   }
   ```

### 9.2 Dark Mode Flicker

**Symptoms:**
- Flash of wrong theme on page load
- Theme switches between light and dark during hydration

**Fix:**
- Ensure `ThemeProvider` is configured with:
  - `attribute="class"`
  - `defaultTheme="system"` or specific theme
  - `suppressHydrationWarning` on `<html>` tag
- Confirm in `app/layout.tsx`:
  ```tsx
  <html lang="en" suppressHydrationWarning>
  ```
- Check that `<html>` or `<body>` has the correct class binding
- Theme stored in localStorage
- `ThemeProvider` handles SSR safely

### 9.3 Missing Tools or Categories

**Symptoms:**
- Certain tools don't appear in listings
- Categories show no tools
- Filters don't work

**Check:**
- [ ] DB seed (`002-seed-data.sql`) ran successfully
- [ ] `tools.json` contains the expected data
- [ ] Filtering logic (category/tag filter conditions)
- [ ] Tool `status` field is set to `'approved'` (not `'pending'`)
- [ ] Category relationships in `tool_categories` junction table

**Debug:**
```typescript
// Check what's being fetched
const { data, error } = await supabase
  .from('tools')
  .select('*, categories(*)')
  .eq('status', 'approved')

console.log('Fetched tools:', data)
console.log('Error:', error)
```

### 9.4 Supabase Connection Issues

**Symptoms:**
- Cannot fetch data
- "Failed to fetch" errors
- Authentication errors

**Check:**
- [ ] Verify environment variables in `.env.local`
- [ ] Check CORS settings in Supabase dashboard
- [ ] Ensure RLS (Row Level Security) policies allow public read
- [ ] Verify API keys are correct (anon key for client, service role for server)

### 9.5 Build Errors

**Common causes:**
- TypeScript errors
- Missing dependencies
- Corrupted cache

**Fix:**
```bash
# Clear .next folder
rm -rf .next

# Reinstall dependencies
rm -rf node_modules pnpm-lock.yaml
pnpm install

# Check TypeScript errors
pnpm build
```

---

## 10. When Updating This File

If you (or an AI assistant) significantly modify:
- ✏️ The **database schema**
- 🗂️ The **routing structure** (new major pages, restructuring app/)
- 🎨 **Core styling / theming**
- 📥 **Tool import / scripts**
- 🔧 **Build or deployment process**

**Then:**
1. Update this `CLAUDE.md` to reflect the new structure and rules
2. Adjust relevant sections:
   - **Section 3**: Directory Structure
   - **Section 4**: Database Schema
   - **Section 5**: Development Workflow
   - **Section 6**: Key Conventions
   - **Section 7**: Common Tasks
3. Update the "Last Updated" date at the top
4. Document the changes in a commit message
5. Consider updating `README.md` if user-facing changes

---

## 11. Code Quality Standards

### 11.1 TypeScript
- ✅ No `any` types (use proper typing or `unknown` with type guards)
- ✅ Explicit return types for functions
- ✅ Use interfaces for objects, types for unions
- ✅ Leverage TypeScript strict mode

### 11.2 React
- ✅ Prefer functional components
- ✅ Use hooks properly (don't break rules of hooks)
- ✅ Keep components focused and single-purpose
- ✅ Extract reusable logic to custom hooks

### 11.3 Next.js
- ✅ Use App Router patterns (not Pages Router)
- ✅ Prefer Server Components when possible
- ✅ Use `'use client'` sparingly and intentionally
- ✅ Implement proper metadata for SEO

### 11.4 Styling
- ✅ Tailwind utilities > custom CSS
- ✅ Use `cn()` for class merging
- ✅ Follow mobile-first responsive design
- ✅ Test both dark and light themes

### 11.5 Accessibility
- ✅ Include ARIA labels where appropriate
- ✅ Use semantic HTML
- ✅ Ensure keyboard navigation works
- ✅ Maintain sufficient color contrast

### 11.6 Performance
- ✅ Optimize images (use Next.js Image component)
- ✅ Lazy load when appropriate
- ✅ Minimize client-side JavaScript
- ✅ Use React Server Components for non-interactive content

---

## 12. Environment Variables

Required in `.env.local`:

```env
# Supabase (REQUIRED)
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...

# Analytics (REQUIRED for production)
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=constructiveblueprint.com

# Optional (for import script only)
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...
```

**Security Notes:**
- `NEXT_PUBLIC_*` variables are exposed to the browser
- Service role key should NEVER be used in client-side code
- Keep `.env.local` in `.gitignore`

---

## 13. Deployment

**Platform:** Vercel (recommended for Next.js)

**Configuration:**
- **Build Command:** `pnpm build`
- **Output Directory:** `.next`
- **Install Command:** `pnpm install`
- **Node Version:** 18.x or higher
- **Environment Variables:** Set in Vercel dashboard (same as `.env.local`)

**Deployment Checklist:**
- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] Build succeeds locally
- [ ] Dark mode works
- [ ] Analytics configured
- [ ] Custom domain setup (if applicable)

---

## 14. Roadmap & Future Features

Based on README.md:
- [ ] 🔗 Affiliate Link Auto-Enrichment via MindPal
- [ ] 🧠 AI-Generated Tool Descriptions
- [ ] 📤 CSV/JSON Export of all Tools
- [ ] 📥 Newsletter Signup Integration
- [ ] 🌎 Internationalization (i18n)

---

## 15. Additional Resources

- [Next.js App Router Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [ShadCN UI](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Plausible Analytics](https://plausible.io/docs)
- [Radix UI](https://www.radix-ui.com/docs/primitives)
- [Lucide Icons](https://lucide.dev)

---

## 16. Questions & Support

For codebase questions:
1. ✅ Check this `CLAUDE.md` file
2. ✅ Review `README.md` for project overview
3. ✅ Examine existing code patterns
4. ✅ Read inline comments in key files

**Key files to understand the project:**
- `app/page.tsx` - Homepage structure and featured content
- `app/layout.tsx` - Root layout and theme configuration
- `scripts/001-create-database.sql` - Complete database schema
- `lib/analytics.ts` - Event tracking implementation
- `components.json` - ShadCN configuration

---

**Last Updated:** November 22, 2025
**Maintainer:** Six1Five Studio
**License:** MIT
