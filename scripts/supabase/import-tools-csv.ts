// scripts/supabase/import-tools-csv.ts
// Usage: pnpm tsx scripts/supabase/import-tools-csv.ts
// Requires: SUPABASE_URL, SUPABASE_SERVICE_ROLE set in .env.local or shell
import fs from 'node:fs';
import path from 'node:path';
import { createClient } from '@supabase/supabase-js';

type Row = {
  slug: string;
  name: string;
  short_description?: string;
  category_slug?: string;
  website_url?: string;

  // monetization (optional)
  link_type?: 'Direct' | 'Affiliate' | 'Partner';
  affiliate_url?: string;
  commission_pct?: string; // as string in CSV
  cookie_days?: string;

  // media (optional)
  logo_url?: string;
  og_image_url?: string;
  screenshot_urls?: string; // JSON array as string
};

function parseCSV(src: string): Row[] {
  const raw = fs.readFileSync(src, 'utf8').trim();
  const [headerLine, ...lines] = raw.split(/\r?\n/);
  const headers = headerLine.split(',').map(h => h.trim());
  return lines.map((line) => {
    const cols = line.split(',').map(c => c.trim());
    const obj: any = {};
    headers.forEach((h, i) => (obj[h] = cols[i] ?? ''));
    return obj as Row;
  });
}

async function main() {
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE;
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE) {
    console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE in env');
    process.exit(1);
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE);
  const file = path.join(process.cwd(), 'data', 'tools.csv');
  if (!fs.existsSync(file)) {
    console.error(`Missing CSV: ${file}`);
    process.exit(1);
  }

  const rows = parseCSV(file);
  console.log(`Importing ${rows.length} tools from CSV...`);

  // Map category slug → id (cache)
  const { data: cats, error: catErr } = await supabase.from('categories').select('id, slug');
  if (catErr) throw catErr;
  const catMap = new Map((cats || []).map(c => [c.slug, c.id]));

  for (const r of rows) {
    const commission = r.commission_pct ? Number(r.commission_pct) : null;
    const cookie = r.cookie_days ? Number(r.cookie_days) : null;
    const screenshots = r.screenshot_urls ? JSON.parse(r.screenshot_urls) : null;
    const category_id = r.category_slug ? (catMap.get(r.category_slug) ?? null) : null;

    // Upsert by slug
    const payload: any = {
      slug: r.slug,
      name: r.name,
      short_description: r.short_description || null,
      website_url: r.website_url || null,
      category_id,

      link_type: r.link_type || 'Direct',
      affiliate_url: r.affiliate_url || null,
      commission_pct: commission,
      cookie_days: cookie,

      logo_url: r.logo_url || null,
      og_image_url: r.og_image_url || null,
      screenshot_urls: screenshots,
    };

    const { error } = await supabase.from('tools').upsert(payload, { onConflict: 'slug' });
    if (error) {
      console.error(`Upsert failed for ${r.slug}:`, error.message);
    } else {
      console.log(`Upserted: ${r.slug}`);
    }
  }

  console.log('Done.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
