import { createClient } from '@supabase/supabase-js'

// Supabase client for browser/client-side usage
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Supabase URL or Anon Key not found. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local'
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Type definitions for database tables
export type Tool = {
  id: number
  slug: string
  name: string
  tagline?: string
  description?: string
  short_description?: string
  website_url?: string
  logo_url?: string
  hero_image_url?: string
  category_id?: number
  pricing_type?: 'free' | 'freemium' | 'paid' | 'custom'
  pricing_details?: string
  rating?: number
  review_count?: number
  view_count?: number
  verified?: boolean
  sponsored?: boolean
  featured?: boolean
  status?: 'pending' | 'approved' | 'rejected'
  company_id?: number
  created_at?: string
  updated_at?: string
}

export type Category = {
  id: number
  slug: string
  name: string
  description?: string
  icon?: string
  color?: string
  created_at?: string
  updated_at?: string
}

export type Platform = {
  id: number
  name: string
  icon?: string
}

export type Tag = {
  id: number
  name: string
  slug: string
}

export type BlogPost = {
  id: number
  slug: string
  title: string
  excerpt?: string
  content?: string
  category?: string
  author?: string
  author_bio?: string
  featured_image_url?: string
  published?: boolean
  featured?: boolean
  view_count?: number
  read_time_minutes?: number
  published_at?: string
  created_at?: string
  updated_at?: string
}
