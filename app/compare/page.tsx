"use client"

import { use, useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import {
  Building2,
  Star,
  CheckCircle,
  X,
  Plus,
  ExternalLink,
  ArrowRight,
  ChevronDown,
  DollarSign,
  Users,
  Award,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { SearchButton } from "@/components/search-button"
import { ThemeToggle } from "@/components/theme-toggle"
import { getToolLogoUrl, buildAffiliateUrl } from "@/lib/helpers"
import type { Tool } from "@/types"

export default function ComparePage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [tools, setTools] = useState<Tool[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTools = async () => {
      const toolSlugs = searchParams.get("tools")?.split(",") || []

      if (toolSlugs.length === 0) {
        setLoading(false)
        return
      }

      try {
        // Fetch tools from API
        const fetchedTools = await Promise.all(
          toolSlugs.map(async (slug) => {
            const res = await fetch(`/api/tools/${slug}`)
            if (!res.ok) return null
            return res.json()
          })
        )

        setTools(fetchedTools.filter((t): t is Tool => t !== null))
      } catch (error) {
        console.error("Error fetching tools:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTools()
  }, [searchParams])

  const removeTool = (slug: string) => {
    const currentSlugs = searchParams.get("tools")?.split(",") || []
    const newSlugs = currentSlugs.filter((s) => s !== slug)

    if (newSlugs.length === 0) {
      router.push("/compare")
    } else {
      router.push(`/compare?tools=${newSlugs.join(",")}`)
    }
  }

  const comparisonRows = [
    {
      title: "Overview",
      items: [
        { label: "Name", render: (tool: Tool) => tool.name },
        { label: "Category", render: (tool: Tool) => tool.category },
        { label: "Description", render: (tool: Tool) => tool.tagline || tool.shortDescription },
      ],
    },
    {
      title: "Pricing & Rating",
      items: [
        { label: "Pricing", render: (tool: Tool) => tool.pricing },
        { label: "Pricing Type", render: (tool: Tool) => <Badge variant="secondary" className="capitalize">{tool.pricingType}</Badge> },
        {
          label: "Rating",
          render: (tool: Tool) => (
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{tool.rating}</span>
              <span className="text-sm text-muted-foreground">({tool.reviewCount})</span>
            </div>
          )
        },
      ],
    },
    {
      title: "Features",
      items: [
        { label: "Verified", render: (tool: Tool) => tool.verified ? <CheckCircle className="h-5 w-5 text-green-500" /> : <X className="h-5 w-5 text-gray-300" /> },
        { label: "Sponsored", render: (tool: Tool) => tool.sponsored ? <CheckCircle className="h-5 w-5 text-green-500" /> : <X className="h-5 w-5 text-gray-300" /> },
        {
          label: "Platforms",
          render: (tool: Tool) => (
            <div className="flex flex-wrap gap-1">
              {tool.platforms.slice(0, 3).map((platform) => (
                <Badge key={platform} variant="outline" className="text-xs">
                  {platform}
                </Badge>
              ))}
              {tool.platforms.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{tool.platforms.length - 3}
                </Badge>
              )}
            </div>
          )
        },
        {
          label: "Tags",
          render: (tool: Tool) => (
            <div className="flex flex-wrap gap-1">
              {tool.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {tool.tags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{tool.tags.length - 3}
                </Badge>
              )}
            </div>
          )
        },
      ],
    },
    {
      title: "Affiliate Info",
      items: [
        { label: "Commission", render: (tool: Tool) => tool.commission || "N/A" },
        { label: "Cookie Duration", render: (tool: Tool) => tool.cookieDays || "N/A" },
        { label: "Link Type", render: (tool: Tool) => <Badge variant="outline">{tool.linkType}</Badge> },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
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
              <ThemeToggle />
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-foreground">
                Home
              </Link>
            </li>
            <li>/</li>
            <li className="text-foreground font-medium">Compare Tools</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Compare Tools</h1>
          <p className="text-xl text-muted-foreground">
            Compare construction technology tools side-by-side to find the best fit for your needs
          </p>
        </div>

        {/* Empty State */}
        {!loading && tools.length === 0 && (
          <Card className="p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold mb-2">No Tools Selected</h2>
              <p className="text-muted-foreground mb-6">
                Start by searching for tools you want to compare. Use the search button (Cmd+K) or browse categories.
              </p>
              <div className="flex gap-3 justify-center">
                <SearchButton />
                <Button variant="outline" asChild>
                  <Link href="/categories">Browse Categories</Link>
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-muted-foreground mt-4">Loading tools...</p>
          </div>
        )}

        {/* Comparison Table */}
        {!loading && tools.length > 0 && (
          <div className="space-y-6">
            {/* Tool Headers */}
            <div className="grid gap-4" style={{ gridTemplateColumns: `200px repeat(${tools.length}, 1fr)` }}>
              <div></div>
              {tools.map((tool) => {
                const affiliateLink = tool.affiliateUrl
                  ? buildAffiliateUrl(tool.affiliateUrl, tool.slug)
                  : buildAffiliateUrl(tool.website, tool.slug)

                return (
                  <Card key={tool.slug} className="relative">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 h-6 w-6"
                      onClick={() => removeTool(tool.slug)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <CardHeader className="text-center pb-3">
                      <div className="w-16 h-16 relative rounded border mx-auto mb-3 bg-white">
                        <Image
                          src={getToolLogoUrl(tool.logoUrl, tool.website)}
                          alt={`${tool.name} logo`}
                          fill
                          className="object-contain p-2"
                        />
                      </div>
                      <CardTitle className="text-lg">{tool.name}</CardTitle>
                      <div className="flex justify-center gap-1 mt-2">
                        {tool.verified && (
                          <Badge variant="secondary" className="text-xs">
                            Verified
                          </Badge>
                        )}
                        {tool.sponsored && (
                          <Badge className="text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                            Sponsored
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <Button asChild className="w-full" size="sm">
                        <Link href={`/tool/${tool.slug}`}>
                          View Details
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Link>
                      </Button>
                      <Button asChild variant="outline" className="w-full mt-2" size="sm">
                        <Link href={affiliateLink} target="_blank" rel="noopener noreferrer">
                          Visit Site
                          <ExternalLink className="h-4 w-4 ml-2" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Comparison Rows */}
            {comparisonRows.map((section) => (
              <div key={section.title} className="space-y-1">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                  {section.title}
                </h3>
                {section.items.map((item) => (
                  <div
                    key={item.label}
                    className="grid gap-4 items-center py-3 border-b last:border-0"
                    style={{ gridTemplateColumns: `200px repeat(${tools.length}, 1fr)` }}
                  >
                    <div className="font-medium text-sm">{item.label}</div>
                    {tools.map((tool) => (
                      <div key={tool.slug} className="text-sm">
                        {item.render(tool)}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}

            {/* Add More Tools */}
            <Card className="p-6 text-center border-dashed">
              <h3 className="font-semibold mb-2">Compare More Tools</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Add another tool to this comparison
              </p>
              <SearchButton />
            </Card>
          </div>
        )}

        {/* Tips Section */}
        {!loading && tools.length > 0 && (
          <Card className="mt-8 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Award className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                Comparison Tips
              </h3>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Click "View Details" to see full tool information and user reviews</li>
                <li>• Use "Visit Site" to explore the tool's official website</li>
                <li>• Click the X button on any tool card to remove it from comparison</li>
                <li>• Share this comparison by copying the URL</li>
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
