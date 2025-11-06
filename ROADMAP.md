# 🧭 Digital Blueprint — Improvement & Implementation Roadmap

A comprehensive development and feature enhancement plan for **Digital Blueprint**, the AEC technology directory built by **Six1Five Studio**.

---

## 🧱 1. Core Fixes

### 1.1 Categories 404 Fix
**Goal:** Ensure all category links route correctly and dynamically render filtered tool lists.

**Tasks**
- [ ] Create `/categories/index.tsx` (or `/app/categories/page.tsx`).
- [ ] Generate category data from Supabase or local CSV (`tools_merged_affiliates.csv`).
- [ ] Add individual route: `/categories/[slug]/page.tsx`.
- [ ] Implement a default `not-found.tsx` or fallback layout.
- [ ] Use Next.js `<Link>` for category navigation (avoid hard refreshes).
- [ ] Add meta titles & descriptions for each category page (SEO).

---

## ⚙️ 2. Dynamic Data Integration

### 2.1 Tools Data Model
**Goal:** Store tool data centrally with affiliate and logo fields.

**Supabase Schema**
```sql
CREATE TABLE tools (
  id uuid primary key default gen_random_uuid(),
  tool text,
  category text,
  website text,
  affiliate_url text,
  link_type text,
  logo_url text,
  commission text,
  cookie_days text,
  verified boolean default false,
  created_at timestamp default now()
);
```

**Tasks**
- [ ] Import `tools_merged_affiliates.csv` into Supabase.
- [ ] Set up automatic updates (GitHub Action, CRON, or manual upload).
- [ ] Enable row-level security and public API for client-side read access.

---

## 🧩 3. Tool Card Enhancements

### 3.1 Add Logo & Affiliate Links
**Goal:** Display company logos, CTA buttons, and verification tiers.

**Tasks**
- [ ] Add `logo_url` support in `ToolCard.tsx`.
- [ ] Use Clearbit fallback: `https://logo.clearbit.com/${domain}`.
- [ ] Add CTA button logic:
  ```tsx
  <a href={affiliateUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
    {linkType === "Affiliate" ? "Join Program" :
     linkType === "Partner" ? "View Partner Page" :
     "Visit Tool"}
  </a>
  ```
- [ ] Add `Verified`, `Pro`, or `Sponsored` badges using tier data.
- [ ] Ensure dark/light theme compatibility.

---

## 🗂️ 4. Category Page Design

**Goal:** Showcase filtered tools per category.

**Tasks**
- [ ] Fetch and filter tools by `categorySlug`.
- [ ] Display tools in grid format (3–4 cards per row).
- [ ] Add search bar, platform filters (Mac, Windows, Free/Paid).
- [ ] Include tool counts and pagination for large datasets.
- [ ] Add `Breadcrumbs` → Home / Category / Tool.
- [ ] Create consistent header and subheader descriptions.

---

## 💡 5. Homepage Improvements

### 5.1 Category Grid
- [ ] Link each category tile to `/categories/[slug]`.
- [ ] Display tool count dynamically (`{tools.length} tools`).
- [ ] Add hover animation or subtle scaling effect.

### 5.2 Latest Insights Section
- [ ] Auto-fetch latest blog posts from CMS or Markdown files.
- [ ] Display category tag, read time, and cover image.
- [ ] Link each post to `/blog/[slug]`.

---

## 🪙 6. Monetization & Partner Program

### 6.1 Listing Plans (Pricing Page)
- [ ] Tie "Verified Pro" and "Sponsored Elite" tiers to database flags.
- [ ] Add Stripe integration for monthly/yearly billing.
- [ ] Implement "Submit Tool" form with pricing selection.

### 6.2 Affiliate Tracking
- [ ] Append UTM parameters to all outbound affiliate links:
  `?utm_source=digitalblueprint&utm_medium=referral`.
- [ ] Add click tracking via PostHog or Supabase analytics.
- [ ] Log metrics in Supabase (`clicks`, `views`, `conversion_estimate`).

---

## 📈 7. SEO, Analytics & Performance

### 7.1 SEO Enhancements
- [ ] Add OpenGraph and Twitter meta tags for all pages.
- [ ] Include structured data (`SoftwareApplication` schema).
- [ ] Generate sitemap and robots.txt automatically.
- [ ] Optimize load times with image lazy loading & CDN caching.

### 7.2 Analytics
- [ ] Integrate PostHog or Google Analytics 4.
- [ ] Create dashboard for impressions and affiliate click tracking.
- [ ] Monitor engagement by category and search term.

---

## 🧠 8. Automation & Data Enrichment

### 8.1 Comet Workflow
- [ ] Use Comet to recheck affiliate programs quarterly.
- [ ] Auto-update `Commission %`, `Cookie Days`, and program URLs.
- [ ] Fetch company taglines, descriptions, and logos.

### 8.2 Data Enrichment Script
- [ ] Node or Python script to reprocess CSV and sync with Supabase.
- [ ] Cron job to refresh Clearbit logos every 30 days.

---

## 🎨 9. UX/UI Enhancements

**Tasks**
- [ ] Add subtle gradient accent backgrounds for each category.
- [ ] Improve card shadows, spacing, and responsive breakpoints.
- [ ] Create "Empty State" UI when no tools match a search.
- [ ] Add toast or modal when users copy affiliate links or submit tools.
- [ ] Implement skeleton loaders for improved perceived speed.

---

## 📬 10. Blog & Substack Integration

**Goal:** Strengthen content authority via educational articles.

**Tasks**
- [ ] Connect Substack RSS feed to `/blog`.
- [ ] Auto-sync featured articles and read times.
- [ ] Add newsletter subscription banner on category and tool pages.
- [ ] Include "Related Posts" by category under each article.

---

## 🧰 11. Admin & Submission Features

### 11.1 Submit Tool Form
- [ ] Build `/submit-tool` page with form validation.
- [ ] Allow users to select category, upload logo, add affiliate link.
- [ ] Store submissions in Supabase for manual approval.

### 11.2 Admin Dashboard
- [ ] Create `/admin` route for managing listings.
- [ ] CRUD interface for tool records and verification flags.
- [ ] Analytics overview: clicks, views, conversion rate, category popularity.

---

## 🧑‍💻 12. Developer Quality & Maintenance

**Tasks**
- [ ] Add TypeScript types for all data models.
- [ ] Document API routes (`/api/tools`, `/api/categories`).
- [ ] Add unit tests for core data utilities.
- [ ] Version control: tag releases by milestone (v1.1, v1.2…).
- [ ] Maintain a CHANGELOG.md.

---

## 🚀 13. Future Expansions

**Ideas**
- [ ] Add comparison charts (e.g., Revit vs Archicad vs Vectorworks).
- [ ] Integrate AI-powered search (e.g., "Which BIM tool fits my workflow?").
- [ ] Add "Top Rated" and "Trending Tools" sections.
- [ ] Enable community reviews or verified testimonials.
- [ ] Introduce affiliate leaderboard for top-performing partners.
- [ ] Develop a Chrome extension that previews affiliate scores.

---

## 🗓️ 14. Suggested Implementation Timeline

| Phase | Focus | Deliverables | Est. Duration |
|-------|--------|--------------|---------------|
| **Phase 1** | Core Fixes & Category Routing | Working `/categories` pages, affiliate tool cards | 2 weeks |
| **Phase 2** | Supabase Integration | Dynamic data loading, verified tiers, admin tools | 3 weeks |
| **Phase 3** | SEO + Monetization | UTM, analytics, partner dashboard | 2 weeks |
| **Phase 4** | UX & Content Growth | Blog integration, automation scripts | 2–3 weeks |

---

## 🧾 Summary

**Primary Goals**
- Make all routes functional and dynamic
- Improve UX/UI consistency
- Automate affiliate enrichment
- Enable monetization via listing tiers
- Enhance SEO and analytics for organic growth

---

**Authored by:**
**Six1Five Studio — Digital Blueprint Initiative**
*Mapping the Future of Construction Technology*
