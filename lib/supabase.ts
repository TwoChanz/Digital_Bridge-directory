import { createClient } from '@supabase/supabase-js'

// Supabase client configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables are not set. Using mock data.')
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
  },
})

// Database types for TypeScript
export type Database = {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string
          color: string | null
          icon: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description: string
          color?: string | null
          icon?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string
          color?: string | null
          icon?: string | null
          created_at?: string
        }
      }
      tools: {
        Row: {
          id: string
          name: string
          slug: string
          tagline: string | null
          description: string
          short_description: string | null
          website: string
          affiliate_url: string | null
          link_type: string | null
          logo_url: string | null
          rating: number
          review_count: number
          pricing: string
          pricing_type: string
          category_id: string
          verified: boolean
          sponsored: boolean
          views: number
          commission: string | null
          cookie_days: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          tagline?: string | null
          description: string
          short_description?: string | null
          website: string
          affiliate_url?: string | null
          link_type?: string | null
          logo_url?: string | null
          rating?: number
          review_count?: number
          pricing: string
          pricing_type: string
          category_id: string
          verified?: boolean
          sponsored?: boolean
          views?: number
          commission?: string | null
          cookie_days?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          tagline?: string | null
          description?: string
          short_description?: string | null
          website?: string
          affiliate_url?: string | null
          link_type?: string | null
          logo_url?: string | null
          rating?: number
          review_count?: number
          pricing?: string
          pricing_type?: string
          category_id?: string
          verified?: boolean
          sponsored?: boolean
          views?: number
          commission?: string | null
          cookie_days?: string | null
          created_at?: string
        }
      }
      tags: {
        Row: {
          id: string
          name: string
          slug: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          created_at?: string
        }
      }
      platforms: {
        Row: {
          id: string
          name: string
          slug: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          created_at?: string
        }
      }
      tool_tags: {
        Row: {
          tool_id: string
          tag_id: string
          created_at: string
        }
        Insert: {
          tool_id: string
          tag_id: string
          created_at?: string
        }
        Update: {
          tool_id?: string
          tag_id?: string
          created_at?: string
        }
      }
      tool_platforms: {
        Row: {
          tool_id: string
          platform_id: string
          created_at: string
        }
        Insert: {
          tool_id: string
          platform_id: string
          created_at?: string
        }
        Update: {
          tool_id?: string
          platform_id?: string
          created_at?: string
        }
      }
      gear_categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string
          color: string | null
          icon: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description: string
          color?: string | null
          icon?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string
          color?: string | null
          icon?: string | null
          created_at?: string
        }
      }
      gear: {
        Row: {
          id: string
          name: string
          slug: string
          brand: string
          model: string
          description: string
          short_description: string | null
          website: string
          affiliate_url: string | null
          link_type: string | null
          image_url: string | null
          rating: number
          review_count: number
          pricing: string
          pricing_type: string
          category_id: string
          verified: boolean
          sponsored: boolean
          views: number
          commission: string | null
          cookie_days: string | null
          specifications: any
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          brand: string
          model: string
          description: string
          short_description?: string | null
          website: string
          affiliate_url?: string | null
          link_type?: string | null
          image_url?: string | null
          rating?: number
          review_count?: number
          pricing: string
          pricing_type: string
          category_id: string
          verified?: boolean
          sponsored?: boolean
          views?: number
          commission?: string | null
          cookie_days?: string | null
          specifications?: any
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          brand?: string
          model?: string
          description?: string
          short_description?: string | null
          website?: string
          affiliate_url?: string | null
          link_type?: string | null
          image_url?: string | null
          rating?: number
          review_count?: number
          pricing?: string
          pricing_type?: string
          category_id?: string
          verified?: boolean
          sponsored?: boolean
          views?: number
          commission?: string | null
          cookie_days?: string | null
          specifications?: any
          created_at?: string
        }
      }
      gear_tags: {
        Row: {
          gear_id: string
          tag_id: string
          created_at: string
        }
        Insert: {
          gear_id: string
          tag_id: string
          created_at?: string
        }
        Update: {
          gear_id?: string
          tag_id?: string
          created_at?: string
        }
      }
    }
  }
}

/**
 * Check if Supabase is configured
 */
export function isSupabaseConfigured(): boolean {
  return !!(supabaseUrl && supabaseAnonKey)
}
