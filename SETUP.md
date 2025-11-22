# Digital Blueprint - Setup Guide

## Prerequisites

- [x] Node.js 18.x or higher ✅ (v22.21.1 installed)
- [x] pnpm package manager ✅ (v10.23.0 installed)
- [ ] Supabase account (create at https://supabase.com)
- [ ] Plausible Analytics account (optional, for production)

## Local Development Setup

### 1. Dependencies ✅ COMPLETED

```bash
pnpm install
```

**Status:** Dependencies installed successfully (274 packages)

### 2. Environment Variables

#### Create Supabase Project

1. Go to https://supabase.com and create a free account
2. Create a new project
3. Wait for the project to be provisioned (~2 minutes)
4. Navigate to Project Settings > API

#### Configure .env.local

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Update `.env.local` with your actual values:

```env
# Get these from Supabase Project Settings > API
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# For production analytics
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=constructiveblueprint.com

# Optional: For running import scripts (Project Settings > API > service_role key)
# WARNING: Never expose this in client-side code!
# SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 3. Database Setup

#### Option A: Using Supabase SQL Editor (Recommended)

1. Open Supabase Dashboard > SQL Editor
2. Create a new query
3. Copy contents of `scripts/001-create-database.sql`
4. Run the query to create all tables
5. Create another query with `scripts/002-seed-data.sql`
6. Run to seed initial data

#### Option B: Using psql Command Line

```bash
# Get your database connection string from Supabase
# Project Settings > Database > Connection string > URI

# Run migrations
psql "postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres" \
  -f scripts/001-create-database.sql

# Seed data
psql "postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres" \
  -f scripts/002-seed-data.sql
```

#### Option C: Import Tools from JSON

```bash
# Set environment variables
export SUPABASE_URL="https://xxxxxxxxxxxxx.supabase.co"
export SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# Run import script
pnpm ts-node scripts/import-tools.ts
```

### 4. Run Development Server

```bash
pnpm dev
```

Open http://localhost:3000 in your browser.

### 5. Build for Production

```bash
pnpm build
```

**Status:** Build successful ✅

## Database Schema

The database includes the following tables:

- **categories** - Tool categories (BIM, Drone Mapping, AR/VR, etc.)
- **tools** - Main tools directory
- **platforms** - Supported platforms (Web, iOS, Android, etc.)
- **tags** - Tool tags for filtering
- **tool_platforms** - Junction table for tools ↔ platforms
- **tool_tags** - Junction table for tools ↔ tags
- **pricing_tiers** - Pricing information
- **features** - Tool features
- **screenshots** - Tool screenshots
- **companies** - Company information
- **tool_submissions** - Pending tool submissions
- **blog_posts** - Blog content
- **analytics** - Event tracking

See `scripts/001-create-database.sql` for complete schema.

## Troubleshooting

### Build Errors

If you encounter build errors:

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules
pnpm install

# Rebuild
pnpm build
```

### Supabase Connection Issues

1. Verify environment variables in `.env.local`
2. Check Supabase project is running (not paused)
3. Ensure RLS (Row Level Security) policies allow public read access
4. Check API keys are correct

### Dark Mode Issues

- Theme toggle is in `components/ThemeToggle.tsx`
- Theme provider configured in `app/layout.tsx`
- Uses `next-themes` with localStorage persistence

## Next Steps

1. ✅ Local environment setup
2. ⏳ Supabase database configuration
3. ⏳ Database migrations
4. Test the application
5. Deploy to Vercel

## Support

- Check `CLAUDE.md` for detailed codebase documentation
- Check `README.md` for project overview
- Review existing code patterns in `app/` and `components/`

---

**Last Updated:** 2025-11-22
