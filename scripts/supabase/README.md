# Supabase Setup Guide

This directory contains SQL scripts and tools for setting up your Supabase database.

## Quick Setup

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Wait for database provisioning (2-3 minutes)

### 2. Run Database Schema
1. Open your Supabase project dashboard
2. Go to **SQL Editor**
3. Copy and paste contents of `001-create-tables.sql`
4. Click **Run** to execute

This will create:
- `categories` table
- `tools` table
- `tags` table
- `platforms` table
- `tool_tags` junction table
- `tool_platforms` junction table
- Indexes for performance
- Row Level Security policies (public read access)

### 3. Configure Environment Variables
1. In Supabase dashboard, go to **Settings** → **API**
2. Copy your **Project URL** and **anon/public key**
3. Create `.env.local` in project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Optional: For import script only
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 4. Import Data (Optional)
If you want to populate the database with existing tool data:

```bash
npm run import-tools
```

Or run the import script manually:
```bash
npx tsx scripts/import-tools.ts
```

## Database Schema Overview

### Categories
- Stores tool categories (BIM, Drone Mapping, etc.)
- Each tool belongs to one category

### Tools
- Main tools table with all tool information
- Links to category via `category_id`
- Contains pricing, ratings, verification status

### Tags & Platforms
- Many-to-many relationships with tools
- Allows flexible filtering and categorization

### Junction Tables
- `tool_tags`: Links tools to multiple tags
- `tool_platforms`: Links tools to multiple platforms

## Security

- **Row Level Security (RLS)** is enabled on all tables
- Public read access is allowed for all tables
- Write access requires service role key (for admin/import only)

## Switching Between Mock Data and Supabase

The app automatically detects Supabase configuration:

- **Supabase configured**: Fetches live data from database
- **No Supabase**: Falls back to mock data in `lib/data.ts`

This allows development without Supabase setup.
