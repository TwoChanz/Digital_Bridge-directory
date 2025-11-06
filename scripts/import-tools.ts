#!/usr/bin/env tsx
/**
 * Import tools data from lib/data.ts to Supabase
 *
 * Prerequisites:
 * 1. Run scripts/supabase/001-create-tables.sql in Supabase SQL Editor
 * 2. Set SUPABASE_SERVICE_ROLE_KEY in .env.local
 *
 * Usage:
 *   npm run import-tools
 *   or
 *   npx tsx scripts/import-tools.ts
 */

import { createClient } from '@supabase/supabase-js'
import { categories, tools } from '../lib/data'
import type { Database } from '../lib/supabase'

// Load environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Error: Missing environment variables')
  console.error('Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local')
  process.exit(1)
}

// Create Supabase client with service role key (bypasses RLS)
const supabase = createClient<Database>(supabaseUrl, supabaseServiceKey)

interface ImportStats {
  categories: number
  tools: number
  tags: number
  platforms: number
  toolTags: number
  toolPlatforms: number
}

const stats: ImportStats = {
  categories: 0,
  tools: 0,
  tags: 0,
  platforms: 0,
  toolTags: 0,
  toolPlatforms: 0,
}

async function importCategories() {
  console.log('\n📁 Importing categories...')

  for (const category of categories) {
    const { data, error } = await supabase
      .from('categories')
      .upsert({
        slug: category.slug,
        name: category.name,
        description: category.description,
        color: category.color,
        icon: category.icon,
      }, {
        onConflict: 'slug',
      })
      .select()
      .single()

    if (error) {
      console.error(`  ❌ Error importing category ${category.name}:`, error.message)
    } else {
      console.log(`  ✓ ${category.name}`)
      stats.categories++
    }
  }

  console.log(`✓ Imported ${stats.categories} categories`)
}

async function getCategoryIdBySlug(slug: string): Promise<string | null> {
  const { data, error } = await supabase
    .from('categories')
    .select('id')
    .eq('slug', slug)
    .single()

  if (error || !data) {
    console.error(`  ❌ Could not find category with slug: ${slug}`)
    return null
  }

  return data.id
}

async function getOrCreateTag(tagName: string): Promise<string | null> {
  const slug = tagName.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')

  const { data, error } = await supabase
    .from('tags')
    .upsert({
      name: tagName,
      slug: slug,
    }, {
      onConflict: 'slug',
    })
    .select('id')
    .single()

  if (error || !data) {
    console.error(`  ❌ Error creating tag ${tagName}:`, error?.message)
    return null
  }

  stats.tags++
  return data.id
}

async function getOrCreatePlatform(platformName: string): Promise<string | null> {
  const slug = platformName.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')

  const { data, error } = await supabase
    .from('platforms')
    .upsert({
      name: platformName,
      slug: slug,
    }, {
      onConflict: 'slug',
    })
    .select('id')
    .single()

  if (error || !data) {
    console.error(`  ❌ Error creating platform ${platformName}:`, error?.message)
    return null
  }

  stats.platforms++
  return data.id
}

async function importTools() {
  console.log('\n🔧 Importing tools...')

  for (const tool of tools) {
    // Get category ID
    const categoryId = await getCategoryIdBySlug(tool.categorySlug)
    if (!categoryId) {
      console.error(`  ❌ Skipping ${tool.name}: category not found`)
      continue
    }

    // Insert/update tool
    const { data: toolData, error: toolError } = await supabase
      .from('tools')
      .upsert({
        slug: tool.slug,
        name: tool.name,
        tagline: tool.tagline,
        description: tool.description,
        short_description: tool.shortDescription,
        website: tool.website,
        affiliate_url: tool.affiliateUrl,
        link_type: tool.linkType,
        logo_url: tool.logoUrl,
        rating: tool.rating,
        review_count: tool.reviewCount,
        pricing: tool.pricing,
        pricing_type: tool.pricingType,
        category_id: categoryId,
        verified: tool.verified,
        sponsored: tool.sponsored,
        views: tool.views,
        commission: tool.commission,
        cookie_days: tool.cookieDays,
      }, {
        onConflict: 'slug',
      })
      .select('id')
      .single()

    if (toolError || !toolData) {
      console.error(`  ❌ Error importing tool ${tool.name}:`, toolError?.message)
      continue
    }

    const toolId = toolData.id
    console.log(`  ✓ ${tool.name}`)
    stats.tools++

    // Import tags
    if (tool.tags && tool.tags.length > 0) {
      for (const tagName of tool.tags) {
        const tagId = await getOrCreateTag(tagName)
        if (tagId) {
          const { error: tagError } = await supabase
            .from('tool_tags')
            .upsert({
              tool_id: toolId,
              tag_id: tagId,
            }, {
              onConflict: 'tool_id,tag_id',
            })

          if (!tagError) {
            stats.toolTags++
          }
        }
      }
    }

    // Import platforms
    if (tool.platforms && tool.platforms.length > 0) {
      for (const platformName of tool.platforms) {
        const platformId = await getOrCreatePlatform(platformName)
        if (platformId) {
          const { error: platformError } = await supabase
            .from('tool_platforms')
            .upsert({
              tool_id: toolId,
              platform_id: platformId,
            }, {
              onConflict: 'tool_id,platform_id',
            })

          if (!platformError) {
            stats.toolPlatforms++
          }
        }
      }
    }
  }

  console.log(`✓ Imported ${stats.tools} tools`)
}

async function printSummary() {
  console.log('\n' + '='.repeat(50))
  console.log('📊 Import Summary')
  console.log('='.repeat(50))
  console.log(`Categories:     ${stats.categories}`)
  console.log(`Tools:          ${stats.tools}`)
  console.log(`Tags:           ${stats.tags}`)
  console.log(`Platforms:      ${stats.platforms}`)
  console.log(`Tool-Tag links: ${stats.toolTags}`)
  console.log(`Tool-Platform:  ${stats.toolPlatforms}`)
  console.log('='.repeat(50))
  console.log('✅ Import completed successfully!')
  console.log('\nNext steps:')
  console.log('1. Visit your Supabase dashboard to verify the data')
  console.log('2. The app will now automatically use live Supabase data')
  console.log('3. Continue with Phase 3 of the roadmap')
}

async function main() {
  console.log('🚀 Starting Supabase data import...')
  console.log(`📍 Supabase URL: ${supabaseUrl}`)

  try {
    // Test connection
    const { error: testError } = await supabase.from('categories').select('id').limit(1)
    if (testError) {
      console.error('\n❌ Database connection test failed')
      console.error('Make sure you have run scripts/supabase/001-create-tables.sql first!')
      console.error('Error:', testError.message)
      process.exit(1)
    }

    await importCategories()
    await importTools()
    await printSummary()

  } catch (error) {
    console.error('\n❌ Import failed:', error)
    process.exit(1)
  }
}

// Run the import
main()
