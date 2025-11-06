/**
 * Get logo URL with Clearbit fallback
 * @param logoUrl - Custom logo URL from database
 * @param websiteUrl - Tool's website URL for Clearbit fallback
 * @returns Logo URL to display
 */
export function getToolLogoUrl(logoUrl: string | undefined, websiteUrl: string): string {
  // If custom logo exists and is not a placeholder, use it
  if (logoUrl && !logoUrl.includes('placeholder')) {
    return logoUrl
  }

  // Extract domain from website URL for Clearbit
  try {
    const domain = new URL(websiteUrl).hostname.replace('www.', '')
    return `https://logo.clearbit.com/${domain}`
  } catch (error) {
    // Fallback to placeholder if URL parsing fails
    return '/placeholder.svg?height=60&width=60'
  }
}

/**
 * Build affiliate URL with UTM tracking parameters
 * @param baseUrl - Tool's website or affiliate URL
 * @param toolSlug - Unique tool identifier for tracking
 * @returns URL with UTM parameters appended
 */
export function buildAffiliateUrl(baseUrl: string, toolSlug: string): string {
  if (!baseUrl) return ''

  try {
    const url = new URL(baseUrl)

    // Add UTM parameters for tracking
    url.searchParams.set('utm_source', 'digitalblueprint')
    url.searchParams.set('utm_medium', 'referral')
    url.searchParams.set('utm_campaign', toolSlug)

    return url.toString()
  } catch (error) {
    // If URL parsing fails, return original
    return baseUrl
  }
}

/**
 * Get CTA button text based on link type
 * @param linkType - Type of link (Affiliate, Partner, Direct)
 * @returns Button text
 */
export function getCtaButtonText(linkType?: string): string {
  switch (linkType) {
    case 'Affiliate':
      return 'Join Program'
    case 'Partner':
      return 'View Partner Page'
    default:
      return 'Visit Tool'
  }
}

/**
 * Format pricing display
 * @param pricing - Pricing string
 * @param pricingType - Type of pricing (free, freemium, paid, custom)
 * @returns Formatted pricing display
 */
export function formatPricing(pricing: string, pricingType: string): string {
  if (pricingType === 'free') {
    return 'Free'
  }
  if (pricingType === 'freemium') {
    return `Free + ${pricing}`
  }
  return pricing
}

/**
 * Get badge variant based on link type
 * @param linkType - Type of link
 * @returns Badge color class
 */
export function getLinkTypeBadgeColor(linkType?: string): string {
  switch (linkType) {
    case 'Affiliate':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    case 'Partner':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
  }
}

/**
 * Format commission display
 * @param commission - Commission percentage or amount
 * @returns Formatted commission string
 */
export function formatCommission(commission?: string): string {
  if (!commission) return ''

  // If it's already formatted with %, return as is
  if (commission.includes('%')) {
    return commission
  }

  // If it's a number, add %
  const num = parseFloat(commission)
  if (!isNaN(num)) {
    return `${num}%`
  }

  return commission
}

/**
 * Get domain from URL
 * @param url - Full URL
 * @returns Domain name
 */
export function getDomain(url: string): string {
  try {
    const domain = new URL(url).hostname.replace('www.', '')
    return domain
  } catch {
    return ''
  }
}
