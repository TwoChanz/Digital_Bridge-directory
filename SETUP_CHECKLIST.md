# Supabase Setup Checklist

Follow these steps to activate your database and switch from mock data to live data.

## ✅ Prerequisites (Already Done)
- [x] Supabase project created (vmhsswmsxhdahnaqztlt.supabase.co)
- [x] Environment variables added to `.env.local`
- [x] Supabase client configured in `lib/supabase.ts`
- [x] Data layer created in `lib/data-supabase.ts`
- [x] Import script ready in `scripts/import-tools.ts`

## 🚀 Setup Steps (Do These Now)

### Step 1: Run Database Schema (5 minutes)

1. **Open Supabase Dashboard**
   - Go to: https://app.supabase.com
   - Select project: `vmhsswmsxhdahnaqztlt`

2. **Open SQL Editor**
   - Click "SQL Editor" in left sidebar
   - Click "New Query"

3. **Copy Schema File**
   - Open: `scripts/supabase/001-create-tables.sql`
   - Select all (Ctrl+A)
   - Copy (Ctrl+C)

4. **Run Schema**
   - Paste into SQL Editor
   - Click "Run" (or press Ctrl+Enter)
   - Wait for success message

**Expected Output:**
```
Success: No rows returned
```

**This creates:**
- ✓ 6 tables (categories, tools, tags, platforms, tool_tags, tool_platforms)
- ✓ Indexes for performance
- ✓ Row Level Security policies
- ✓ Automatic timestamp triggers

---

### Step 2: Get Service Role Key (2 minutes)

1. **Navigate to API Settings**
   - In Supabase dashboard: Settings → API
   - Scroll to "Project API keys"

2. **Copy Service Role Key**
   - Find "service_role" key (labeled "secret")
   - Click "Reveal" then "Copy"
   - ⚠️ **KEEP THIS SECRET!** Never commit to git

3. **Add to .env.local**
   - Open `.env.local` in your editor
   - Add this line:
   ```bash
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
   ```
   - Save the file

---

### Step 3: Import Data (1 minute)

1. **Run Import Script**
   ```bash
   npm run import-tools
   ```

2. **Watch Progress**
   You should see:
   ```
   🚀 Starting Supabase data import...
   📍 Supabase URL: https://vmhsswmsxhdahnaqztlt.supabase.co

   📁 Importing categories...
     ✓ BIM Software
     ✓ Project Management
     ✓ Drone Mapping
     ✓ AR/VR
     ✓ Estimating
     ✓ Field Tools
   ✓ Imported 6 categories

   🔧 Importing tools...
     ✓ Autodesk Revit
     ✓ Procore
     ... (35 total)
   ✓ Imported 35 tools

   ==================================================
   📊 Import Summary
   ==================================================
   Categories:     6
   Tools:          35
   Tags:           XX
   Platforms:      XX
   Tool-Tag links: XX
   Tool-Platform:  XX
   ==================================================
   ✅ Import completed successfully!
   ```

3. **Verify in Supabase**
   - Go to: Table Editor in Supabase dashboard
   - Check:
     - `categories` table → 6 rows
     - `tools` table → 35 rows
     - `tags` table → XX rows
     - `platforms` table → XX rows

---

### Step 4: Verify App is Using Live Data (1 minute)

1. **Check Browser Console**
   - Open your app: http://localhost:3000
   - Open DevTools (F12)
   - Go to Console tab
   - You should NOT see: "Using mock categories data"
   - If you see that message, Supabase isn't configured properly

2. **Test Category Pages**
   - Visit: http://localhost:3000/categories
   - Click on a category
   - Tools should load from Supabase
   - Check Network tab to see requests to Supabase

3. **Success Indicators**
   - No console warnings about mock data
   - Network requests to `vmhsswmsxhdahnaqztlt.supabase.co`
   - All 35 tools display correctly

---

## 🐛 Troubleshooting

### Import Script Fails with "Missing environment variables"
- **Solution:** Make sure `.env.local` has all three variables:
  ```bash
  NEXT_PUBLIC_SUPABASE_URL=https://vmhsswmsxhdahnaqztlt.supabase.co
  NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
  SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...
  ```

### Import Script Fails with "Database connection test failed"
- **Solution:** You haven't run the schema SQL yet. Go back to Step 1.

### App Still Shows Mock Data
- **Solution:**
  1. Verify `.env.local` has correct variables
  2. Restart dev server: `npm run dev`
  3. Hard refresh browser (Ctrl+Shift+R)

### SQL Editor Shows Errors
- **Solution:** Make sure you copied the ENTIRE schema file, from the first line to the last

---

## ✅ Once Complete

After all steps, you should have:
- [x] Database schema created in Supabase
- [x] 35 tools imported with all data
- [x] App using live Supabase data (not mock)
- [x] Ready to build new features

**Next:** Tool detail pages, search functionality, SEO optimization

---

## Quick Reference

**Project URL:** https://vmhsswmsxhdahnaqztlt.supabase.co
**Dashboard:** https://app.supabase.com/project/vmhsswmsxhdahnaqztlt
**Schema File:** `scripts/supabase/001-create-tables.sql`
**Import Script:** `npm run import-tools`

---

## Time Estimate

- Step 1 (Schema): 5 minutes
- Step 2 (Service Key): 2 minutes
- Step 3 (Import): 1 minute
- Step 4 (Verify): 1 minute

**Total: ~10 minutes**

Good luck! Let me know when you've completed these steps and I'll help with the next phase.
