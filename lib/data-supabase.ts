import { supabase, isSupabaseConfigured } from './supabase'
import type { Category, Tool } from '@/types'
import { categories as mockCategories, tools as mockTools } from './data'

/**
 * Fetch all categories from Supabase or fallback to mock data
 */
export async function fetchCategories(): Promise<Category[]> {
  if (!isSupabaseConfigured()) {
    console.log('Using mock categories data')
    return mockCategories
  }

  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name')

    if (error) throw error

    // Transform Supabase data to match our Category type
    const categories: Category[] = data.map((cat: any) => ({
      id: cat.slug, // Use slug as id for consistency with mock data
      name: cat.name,
      slug: cat.slug,
      description: cat.description,
      color: cat.color || 'bg-blue-500',
      icon: cat.icon,
      count: 0, // Will be calculated from tools
    }))

    // Count tools per category
    const { data: toolsData } = await supabase
      .from('tools')
      .select('category_id')

    if (toolsData) {
      const counts: Record<string, number> = {}
      toolsData.forEach((tool: any) => {
        counts[tool.category_id] = (counts[tool.category_id] || 0) + 1
      })

      categories.forEach((cat) => {
        // Find category ID by slug
        const dbCat = data.find((d: any) => d.slug === cat.slug)
        if (dbCat) {
          cat.count = counts[dbCat.id] || 0
        }
      })
    }

    return categories
  } catch (error) {
    console.error('Error fetching categories from Supabase:', error)
    return mockCategories
  }
}

/**
 * Fetch tools by category from Supabase or fallback to mock data
 */
export async function fetchToolsByCategory(categorySlug: string): Promise<Tool[]> {
  if (!isSupabaseConfigured()) {
    console.log('Using mock tools data')
    return mockTools.filter((tool) => tool.categorySlug === categorySlug)
  }

  try {
    // First get the category ID
    const { data: categories, error: catError } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', categorySlug)
      .single()

    if (catError) throw catError
    if (!categories) return []

    // Get tools with tags and platforms
    const { data: toolsData, error: toolsError } = await supabase
      .from('tools')
      .select(`
        *,
        tool_tags (
          tags (name, slug)
        ),
        tool_platforms (
          platforms (name, slug)
        )
      `)
      .eq('category_id', categories.id)
      .order('sponsored', { ascending: false })
      .order('rating', { ascending: false })

    if (toolsError) throw toolsError
    if (!toolsData) return []

    // Transform to Tool type
    const tools: Tool[] = toolsData.map((tool: any) => ({
      id: tool.id,
      name: tool.name,
      slug: tool.slug,
      tagline: tool.tagline,
      description: tool.description,
      shortDescription: tool.short_description,
      website: tool.website,
      affiliateUrl: tool.affiliate_url,
      linkType: tool.link_type,
      logoUrl: tool.logo_url,
      rating: tool.rating,
      reviewCount: tool.review_count,
      pricing: tool.pricing,
      pricingType: tool.pricing_type,
      platforms: tool.tool_platforms?.map((tp: any) => tp.platforms.name) || [],
      tags: tool.tool_tags?.map((tt: any) => tt.tags.name) || [],
      category: '', // Will be filled from cache if needed
      categorySlug,
      verified: tool.verified,
      sponsored: tool.sponsored,
      views: tool.views,
      commission: tool.commission,
      cookieDays: tool.cookie_days,
    }))

    return tools
  } catch (error) {
    console.error('Error fetching tools from Supabase:', error)
    return mockTools.filter((tool) => tool.categorySlug === categorySlug)
  }
}

/**
 * Fetch a single tool by slug
 */
export async function fetchToolBySlug(slug: string): Promise<Tool | undefined> {
  if (!isSupabaseConfigured()) {
    return mockTools.find((tool) => tool.slug === slug)
  }

  try {
    const { data: tool, error } = await supabase
      .from('tools')
      .select(`
        *,
        categories (name, slug),
        tool_tags (
          tags (name, slug)
        ),
        tool_platforms (
          platforms (name, slug)
        )
      `)
      .eq('slug', slug)
      .single()

    if (error) throw error
    if (!tool) return undefined

    return {
      id: tool.id,
      name: tool.name,
      slug: tool.slug,
      tagline: tool.tagline,
      description: tool.description,
      shortDescription: tool.short_description,
      website: tool.website,
      affiliateUrl: tool.affiliate_url,
      linkType: tool.link_type,
      logoUrl: tool.logo_url,
      rating: tool.rating,
      reviewCount: tool.review_count,
      pricing: tool.pricing,
      pricingType: tool.pricing_type,
      platforms: tool.tool_platforms?.map((tp: any) => tp.platforms.name) || [],
      tags: tool.tool_tags?.map((tt: any) => tt.tags.name) || [],
      category: tool.categories?.name || '',
      categorySlug: tool.categories?.slug || '',
      verified: tool.verified,
      sponsored: tool.sponsored,
      views: tool.views,
      commission: tool.commission,
      cookieDays: tool.cookie_days,
    }
  } catch (error) {
    console.error('Error fetching tool from Supabase:', error)
    return mockTools.find((tool) => tool.slug === slug)
  }
}

/**
 * Fetch platform statistics
 */
export async function fetchStats(): Promise<{
  totalTools: number
  totalCategories: number
  totalViews: number
}> {
  if (!isSupabaseConfigured()) {
    return {
      totalTools: mockTools.length,
      totalCategories: mockCategories.length,
      totalViews: mockTools.reduce((sum, tool) => sum + tool.views, 0),
    }
  }

  try {
    // Get total tools count
    const { count: toolsCount } = await supabase
      .from('tools')
      .select('*', { count: 'exact', head: true })

    // Get total categories count
    const { count: categoriesCount } = await supabase
      .from('categories')
      .select('*', { count: 'exact', head: true })

    // Get total views
    const { data: viewsData } = await supabase
      .from('tools')
      .select('views')

    const totalViews = viewsData?.reduce((sum, tool) => sum + (tool.views || 0), 0) || 0

    return {
      totalTools: toolsCount || 0,
      totalCategories: categoriesCount || 0,
      totalViews,
    }
  } catch (error) {
    console.error('Error fetching stats from Supabase:', error)
    return {
      totalTools: mockTools.length,
      totalCategories: mockCategories.length,
      totalViews: mockTools.reduce((sum, tool) => sum + tool.views, 0),
    }
  }
}

/**
 * Fetch a single category by slug
 */
export async function fetchCategoryBySlug(slug: string): Promise<Category | undefined> {
  if (!isSupabaseConfigured()) {
    return mockCategories.find((cat) => cat.slug === slug);
  }

  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) throw error;
    if (!data) return undefined;

    return {
      id: data.id,
      name: data.name,
      slug: data.slug,
      description: data.description,
      color: data.color || 'bg-blue-500',
      icon: data.icon,
      count: 0, // Count can be calculated separately if needed
    };
  } catch (error) {
    console.error('Error fetching category from Supabase:', error);
    return mockCategories.find((cat) => cat.slug === slug);
  }
}

/**
 * Fetch all tools
 */
export async function fetchAllTools(): Promise<Tool[]> {
  if (!isSupabaseConfigured()) {
    return mockTools
  }

  try {
    const { data: toolsData, error } = await supabase
      .from('tools')
      .select(`
        *,
        categories (name, slug),
        tool_tags (
          tags (name, slug)
        ),
        tool_platforms (
          platforms (name, slug)
        )
      `)
      .order('sponsored', { ascending: false })
      .order('rating', { ascending: false })

    if (error) throw error
    if (!toolsData) return []

    const tools: Tool[] = toolsData.map((tool: any) => ({
      id: tool.id,
      name: tool.name,
      slug: tool.slug,
      tagline: tool.tagline,
      description: tool.description,
      shortDescription: tool.short_description,
      website: tool.website,
      affiliateUrl: tool.affiliate_url,
      linkType: tool.link_type,
      logoUrl: tool.logo_url,
      rating: tool.rating,
      reviewCount: tool.review_count,
      pricing: tool.pricing,
      pricingType: tool.pricing_type,
      platforms: tool.tool_platforms?.map((tp: any) => tp.platforms.name) || [],
      tags: tool.tool_tags?.map((tt: any) => tt.tags.name) || [],
      category: tool.categories?.name || '',
      categorySlug: tool.categories?.slug || '',
      verified: tool.verified,
      sponsored: tool.sponsored,
      views: tool.views,
      commission: tool.commission,
      cookieDays: tool.cookie_days,
    }))

    return tools
  } catch (error) {
    console.error('Error fetching all tools from Supabase:', error)
    return mockTools
  }
}
