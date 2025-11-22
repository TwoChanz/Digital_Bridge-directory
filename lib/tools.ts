import { supabase } from './supabase'
import type { Tool, Category } from './supabase'

/**
 * Fetch all tools from the database
 */
export async function getTools(categorySlug?: string) {
  try {
    let query = supabase
      .from('tools')
      .select(`
        *,
        category:categories(id, slug, name, icon, color),
        platforms:tool_platforms(platform:platforms(id, name, icon)),
        tags:tool_tags(tag:tags(id, name, slug))
      `)
      .eq('status', 'approved')

    if (categorySlug) {
      // Join with categories to filter by slug
      query = query.eq('category.slug', categorySlug)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching tools:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Exception fetching tools:', error)
    return []
  }
}

/**
 * Fetch a single tool by ID or slug
 */
export async function getTool(idOrSlug: string) {
  try {
    const { data, error } = await supabase
      .from('tools')
      .select(`
        *,
        category:categories(*),
        platforms:tool_platforms(platform:platforms(*)),
        tags:tool_tags(tag:tags(*)),
        pricing_tiers(*),
        features(*),
        screenshots(*),
        company:companies(*)
      `)
      .or(`id.eq.${idOrSlug},slug.eq.${idOrSlug}`)
      .eq('status', 'approved')
      .single()

    if (error) {
      console.error('Error fetching tool:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Exception fetching tool:', error)
    return null
  }
}

/**
 * Fetch all categories
 */
export async function getCategories() {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name')

    if (error) {
      console.error('Error fetching categories:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Exception fetching categories:', error)
    return []
  }
}

/**
 * Fetch a single category by slug
 */
export async function getCategory(slug: string) {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error) {
      console.error('Error fetching category:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Exception fetching category:', error)
    return null
  }
}

/**
 * Get tool count by category
 */
export async function getToolCountByCategory(categorySlug: string) {
  try {
    const { count, error } = await supabase
      .from('tools')
      .select('*', { count: 'exact', head: true })
      .eq('category.slug', categorySlug)
      .eq('status', 'approved')

    if (error) {
      console.error('Error fetching tool count:', error)
      return 0
    }

    return count || 0
  } catch (error) {
    console.error('Exception fetching tool count:', error)
    return 0
  }
}

/**
 * Search tools by query
 */
export async function searchTools(query: string) {
  try {
    const { data, error } = await supabase
      .from('tools')
      .select(`
        *,
        category:categories(*),
        platforms:tool_platforms(platform:platforms(*)),
        tags:tool_tags(tag:tags(*))
      `)
      .or(`name.ilike.%${query}%,description.ilike.%${query}%,tagline.ilike.%${query}%`)
      .eq('status', 'approved')
      .limit(20)

    if (error) {
      console.error('Error searching tools:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Exception searching tools:', error)
    return []
  }
}

/**
 * Increment tool view count
 */
export async function incrementToolViews(toolId: number) {
  try {
    const { error } = await supabase.rpc('increment_tool_views', {
      tool_id: toolId,
    })

    if (error) {
      console.error('Error incrementing views:', error)
    }
  } catch (error) {
    console.error('Exception incrementing views:', error)
  }
}

/**
 * Submit a new tool
 */
export async function submitTool(toolData: {
  tool_name: string
  category: string
  website_url: string
  description: string
  short_description?: string
  pricing_type?: string
  pricing_details?: string
  company_name?: string
  contact_email: string
  platforms?: string[]
  tags?: string[]
  features?: string[]
}) {
  try {
    const { data, error } = await supabase
      .from('tool_submissions')
      .insert([
        {
          ...toolData,
          status: 'pending',
          submitted_at: new Date().toISOString(),
        },
      ])
      .select()

    if (error) {
      console.error('Error submitting tool:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    console.error('Exception submitting tool:', error)
    return { success: false, error: 'Failed to submit tool' }
  }
}
