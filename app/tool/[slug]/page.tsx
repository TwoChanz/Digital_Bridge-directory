import { use } from "react"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { Star, ExternalLink, CheckCircle, ArrowRight, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { SearchButton } from "@/components/search-button"
import { CompareButton } from "@/components/compare-button"
import { AffiliateCtaButton } from "@/components/affiliate-cta-button"
import { fetchToolBySlug, fetchToolsByCategory } from "@/lib/data-supabase"
import { getToolLogoUrl, buildAffiliateUrl, getCtaButtonText } from "@/lib/helpers"
import type { Tool } from "@/types"

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const tool = await fetchToolBySlug(slug)

  if (!tool) {
    return {
      title: "Tool Not Found",
    }
  }

  const title = `${tool.name} - ${tool.category} | Digital Blueprint`
  const description =
    tool.tagline ||
    tool.description.slice(0, 160) ||
    `${tool.name} - ${tool.category} tool for AEC professionals`

  return {
    title,
    description,
    keywords: [tool.name, tool.category, ...tool.tags, "AEC", "construction technology"],
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://digitalblueprint.com/tool/${tool.slug}`,
      images: [
        {
          url: getToolLogoUrl(tool.logoUrl, tool.website),
          width: 1200,
          height: 630,
          alt: `${tool.name} logo`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [getToolLogoUrl(tool.logoUrl, tool.website)],
    },
  }
}

export default async function ToolDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = use(params)
  const tool = await fetchToolBySlug(slug)

  if (!tool) {
    notFound()
  }

  // Fetch related tools from the same category
  const relatedTools = (await fetchToolsByCategory(tool.categorySlug))
    .filter((t) => t.slug !== tool.slug)
    .slice(0, 3)

  const affiliateLink = tool.affiliateUrl
    ? buildAffiliateUrl(tool.affiliateUrl, tool.slug)
    : buildAffiliateUrl(tool.website, tool.slug)

  // JSON-LD structured data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    description: tool.description,
    applicationCategory: tool.category,
    offers: {
      "@type": "Offer",
      price: tool.pricing,
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: tool.rating,
      reviewCount: tool.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    operatingSystem: tool.platforms.join(", "),
    url: tool.website,
  }

  return (
    <div className="min-h-screen bg-background">
      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-gray-900/95 dark:supports-[backdrop-filter]:bg-gray-900/60 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Building2 className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">Digital Blueprint</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/categories" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                Categories
              </Link>
              <Link href="/blog" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                Blog
              </Link>
              <Link href="/submit" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                Submit Tool
              </Link>
              <SearchButton />
            </nav>
          </div>
        </div>
      </header>

      {/* Breadcrumbs */}
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span>/</span>
            <Link href="/categories" className="hover:text-foreground">
              Categories
            </Link>
            <span>/</span>
            <Link
              href={`/category/${tool.categorySlug}`}
              className="hover:text-foreground"
            >
              {tool.category}
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium">{tool.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <div className="border-b bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-[auto_1fr_auto] gap-8 items-start">
            {/* Logo */}
            <div className="flex-shrink-0">
              <div className="w-24 h-24 relative rounded-lg overflow-hidden border bg-white">
                <Image
                  src={getToolLogoUrl(tool.logoUrl, tool.website)}
                  alt={`${tool.name} logo`}
                  fill
                  className="object-contain p-2"
                />
              </div>
            </div>

            {/* Info */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                {tool.verified && (
                  <Badge variant="secondary" className="gap-1">
                    <CheckCircle className="h-3 w-3" />
                    Verified
                  </Badge>
                )}
                {tool.sponsored && <Badge variant="default">Sponsored</Badge>}
                {tool.linkType && (
                  <Badge variant="outline">{tool.linkType} Link</Badge>
                )}
              </div>

              <h1 className="text-4xl font-bold mb-2">{tool.name}</h1>

              {tool.tagline && (
                <p className="text-xl text-muted-foreground mb-4">
                  {tool.tagline}
                </p>
              )}

              <div className="flex items-center gap-4 mb-4">
                {/* Rating */}
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{tool.rating}</span>
                  <span className="text-muted-foreground text-sm">
                    ({tool.reviewCount} reviews)
                  </span>
                </div>

                {/* Pricing Type */}
                <Badge variant="secondary" className="capitalize">
                  {tool.pricingType}
                </Badge>

                {/* Views */}
                {tool.views && tool.views > 0 && (
                  <span className="text-sm text-muted-foreground">
                    {tool.views.toLocaleString()} views
                  </span>
                )}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {tool.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col gap-3 min-w-[200px]">
              <AffiliateCtaButton
                href={affiliateLink}
                toolName={tool.name}
                toolSlug={tool.slug}
                linkType={tool.linkType}
                buttonText={getCtaButtonText(tool.linkType)}
                variant="primary"
                size="lg"
              />

              <CompareButton
                toolSlug={tool.slug}
                toolName={tool.name}
                variant="outline"
                size="lg"
                showDropdown
              />

              <div className="text-center text-sm text-muted-foreground">
                <div className="font-semibold text-foreground">
                  {tool.pricing}
                </div>
                {tool.commission && (
                  <div className="text-xs mt-1">
                    Earn {tool.commission} commission
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-[1fr_300px] gap-12">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Description */}
            <section>
              <h2 className="text-2xl font-bold mb-4">About {tool.name}</h2>
              <div className="prose dark:prose-invert max-w-none">
                {tool.description.split("\n\n").map((paragraph, i) => (
                  <p
                    key={i}
                    className="text-muted-foreground leading-relaxed mb-4"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>

            <Separator />

            {/* Platforms */}
            {tool.platforms.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-4">
                  Available Platforms
                </h2>
                <div className="flex flex-wrap gap-2">
                  {tool.platforms.map((platform) => (
                    <Badge
                      key={platform}
                      variant="secondary"
                      className="text-base px-4 py-2"
                    >
                      {platform}
                    </Badge>
                  ))}
                </div>
              </section>
            )}

            <Separator />

            {/* Related Tools */}
            {relatedTools.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-4">
                  Similar {tool.category} Tools
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {relatedTools.map((related) => (
                    <Link key={related.slug} href={`/tool/${related.slug}`}>
                      <Card className="h-full hover:shadow-lg transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3 mb-3">
                            <div className="w-12 h-12 relative rounded border flex-shrink-0 bg-white">
                              <Image
                                src={getToolLogoUrl(
                                  related.logoUrl,
                                  related.website
                                )}
                                alt={`${related.name} logo`}
                                fill
                                className="object-contain p-1"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold line-clamp-1">
                                {related.name}
                              </h3>
                              <div className="flex items-center gap-1 text-sm">
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                <span>{related.rating}</span>
                              </div>
                            </div>
                          </div>
                          {related.tagline && (
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {related.tagline}
                            </p>
                          )}
                          <div className="mt-3 text-sm font-semibold text-primary">
                            {related.pricing}
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Sidebar */}
          <aside className="space-y-6">
            {/* Quick Info Card */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Pricing</h3>
                  <p className="text-2xl font-bold">{tool.pricing}</p>
                  <p className="text-sm text-muted-foreground capitalize">
                    {tool.pricingType} plan
                  </p>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-2">Category</h3>
                  <Link
                    href={`/category/${tool.categorySlug}`}
                    className="text-primary hover:underline"
                  >
                    {tool.category}
                  </Link>
                </div>

                {tool.commission && (
                  <>
                    <Separator />
                    <div>
                      <h3 className="font-semibold mb-2">Affiliate Program</h3>
                      <p className="text-sm text-muted-foreground">
                        Earn {tool.commission} commission
                      </p>
                      {tool.cookieDays && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {tool.cookieDays} cookie duration
                        </p>
                      )}
                    </div>
                  </>
                )}

                <Separator />

                <AffiliateCtaButton
                  href={affiliateLink}
                  toolName={tool.name}
                  toolSlug={tool.slug}
                  linkType={tool.linkType}
                  buttonText={`Visit ${tool.name}`}
                  variant="sidebar"
                  size="default"
                />

                {tool.linkType === "Affiliate" && (
                  <p className="text-xs text-muted-foreground text-center">
                    This is an affiliate link. We may earn a commission.
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Back to Category */}
            <Link href={`/category/${tool.categorySlug}`}>
              <Button variant="outline" className="w-full">
                ← Back to {tool.category}
              </Button>
            </Link>
          </aside>
        </div>
      </div>
    </div>
  )
}
