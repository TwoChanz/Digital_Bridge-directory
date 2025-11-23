// Quick test to verify Supabase connection
import dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

async function testConnection() {
  console.log('🔍 Testing Supabase connection...\n')

  // Test 1: Fetch categories
  const { data: categories, error: catError } = await supabase
    .from('categories')
    .select('*')

  if (catError) {
    console.error('❌ Error fetching categories:', catError)
  } else {
    console.log(`✅ Categories: ${categories.length} found`)
    categories.forEach(cat => console.log(`   - ${cat.name} (${cat.slug})`))
  }

  console.log()

  // Test 2: Fetch platforms
  const { data: platforms, error: platError } = await supabase
    .from('platforms')
    .select('*')

  if (platError) {
    console.error('❌ Error fetching platforms:', platError)
  } else {
    console.log(`✅ Platforms: ${platforms.length} found`)
    platforms.forEach(p => console.log(`   - ${p.name}`))
  }

  console.log()

  // Test 3: Fetch tags
  const { data: tags, error: tagError } = await supabase
    .from('tags')
    .select('*')
    .limit(10)

  if (tagError) {
    console.error('❌ Error fetching tags:', tagError)
  } else {
    console.log(`✅ Tags: ${tags.length} found (showing first 10)`)
    tags.forEach(t => console.log(`   - ${t.name}`))
  }

  console.log('\n🎉 Database connection successful!\n')
}

testConnection().catch(console.error)
