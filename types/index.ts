export interface Tool {
  id: string
  name: string
  slug: string
  tagline?: string
  description: string
  shortDescription?: string
  website: string
  affiliateUrl?: string
  linkType?: "Affiliate" | "Partner" | "Direct"
  logoUrl: string
  rating: number
  reviewCount: number
  pricing: string
  pricingType: "free" | "freemium" | "paid" | "custom"
  platforms: string[]
  tags: string[]
  category: string
  categorySlug: string
  verified: boolean
  sponsored: boolean
  views: number
  commission?: string
  cookieDays?: string
  createdAt?: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string
  icon?: string
  color?: string
  count: number
}

export interface Tag {
  id: string
  name: string
  slug: string
}

export interface Platform {
  id: string
  name: string
  slug: string
}

export interface PricingTier {
  id: string
  name: string
  slug: string
}

export interface Gear {
  id: string
  name: string
  slug: string
  brand: string
  model: string
  description: string
  shortDescription?: string
  website: string
  affiliateUrl?: string
  linkType?: "Affiliate" | "Partner" | "Direct"
  imageUrl: string
  rating: number
  reviewCount: number
  pricing: string
  pricingType: "free" | "freemium" | "paid" | "custom"
  category: "scanners" | "drones" | "gnss" | "lidar" | "accessories"
  categorySlug: string
  verified: boolean
  sponsored: boolean
  views: number
  commission?: string
  cookieDays?: string
  specifications: Record<string, any>
  tags: string[]
  createdAt?: string
}

export interface GearCategory {
  id: string
  name: string
  slug: string
  description: string
  icon?: string
  color?: string
  count: number
}
