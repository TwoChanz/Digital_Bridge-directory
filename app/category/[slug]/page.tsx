"use client"

import { useState } from "react"
import { Search, Filter, Grid, List, Star, ExternalLink } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

// Mock data - in real app, this would come from your database
const tools = [
  {
    id: "revit",
    name: "Autodesk Revit",
    description: "Industry-leading BIM software for architectural design, MEP engineering, and structural engineering.",
    logo: "/placeholder.svg?height=60&width=60",
    rating: 4.5,
    reviewCount: 1250,
    pricing: "From $290/month",
    pricingType: "paid",
    platforms: ["Windows"],
    tags: ["BIM", "Architecture", "MEP", "Structural", "Revit"],
    verified: true,
    sponsored: true,
    views: 15420,
    category: "BIM Software",
  },
  {
    id: "archicad",
    name: "ARCHICAD",
    description: "Powerful BIM software solution for architects with advanced design and documentation capabilities.",
    logo: "/placeholder.svg?height=60&width=60",
    rating: 4.3,
    reviewCount: 890,
    pricing: "From $270/month",
    pricingType: "paid",
    platforms: ["Windows", "Mac"],
    tags: ["BIM", "Architecture", "Design", "Documentation"],
    verified: true,
    sponsored: false,
    views: 8930,
    category: "BIM Software",
  },
  {
    id: "tekla",
    name: "Tekla Structures",
    description:
      "Advanced structural BIM software for steel and concrete detailing with precise modeling capabilities.",
    logo: "/placeholder.svg?height=60&width=60",
    rating: 4.4,
    reviewCount: 650,
    pricing: "Custom pricing",
    pricingType: "paid",
    platforms: ["Windows"],
    tags: ["BIM", "Structural", "Steel", "Concrete", "Detailing"],
    verified: true,
    sponsored: false,
    views: 6750,
    category: "BIM Software",
  },
  {
    id: "freecad",
    name: "FreeCAD",
    description:
      "Open-source parametric 3D CAD modeler with BIM capabilities for architectural and engineering projects.",
    logo: "/placeholder.svg?height=60&width=60",
    rating: 3.8,
    reviewCount: 420,
    pricing: "Free",
    pricingType: "free",
    platforms: ["Windows", "Mac", "Linux"],
    tags: ["BIM", "Open Source", "CAD", "Parametric"],
    verified: false,
    sponsored: false,
    views: 3240,
    category: "BIM Software",
  },
  {
    id: "vectorworks",
    name: "Vectorworks Architect",
    description: "Comprehensive BIM and CAD software for architects with advanced rendering and documentation tools.",
    logo: "/placeholder.svg?height=60&width=60",
    rating: 4.2,
    reviewCount: 780,
    pricing: "From $299/month",
    pricingType: "paid",
    platforms: ["Windows", "Mac"],
    tags: ["BIM", "Architecture", "CAD", "Rendering"],
    verified: true,
    sponsored: false,
    views: 5680,
    category: "BIM Software",
  },
  {
    id: "allplan",
    name: "Allplan",
    description:
      "Professional BIM software for architects and engineers with integrated design and construction workflows.",
    logo: "/placeholder.svg?height=60&width=60",
    rating: 4.1,
    reviewCount: 340,
    pricing: "From $199/month",
    pricingType: "paid",
    platforms: ["Windows"],
    tags: ["BIM", "Architecture", "Engineering", "Construction"],
    verified: true,
    sponsored: false,
    views: 4120,
    category: "BIM Software",
  },
]

const categories = {
  "bim-software": {
    name: "BIM Software",
    description: "Building Information Modeling tools for design, documentation, and collaboration",
    count: 45,
  },
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("sponsored")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])
  const [selectedPricing, setSelectedPricing] = useState<string[]>([])
  const [filtersOpen, setFiltersOpen] = useState(false)

  const category = categories[params.slug as keyof typeof categories]

  if (!category) {
    return <div>Category not found</div>
  }

  const filteredTools = tools.filter((tool) => {
    const matchesSearch =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesPlatform =
      selectedPlatforms.length === 0 || selectedPlatforms.some((platform) => tool.platforms.includes(platform))

    const matchesPricing = selectedPricing.length === 0 || selectedPricing.includes(tool.pricingType)

    return matchesSearch && matchesPlatform && matchesPricing
  })

  const sortedTools = [...filteredTools].sort((a, b) => {
    switch (sortBy) {
      case "sponsored":
        if (a.sponsored && !b.sponsored) return -1
        if (!a.sponsored && b.sponsored) return 1
        return b.rating - a.rating
      case "rating":
        return b.rating - a.rating
      case "newest":
        return b.views - a.views // Using views as proxy for newest
      case "most-viewed":
        return b.views - a.views
      default:
        return 0
    }
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-blue-600 rounded"></div>
              <span className="text-2xl font-bold">ConstructTech</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/categories" className="text-gray-600 hover:text-gray-900">
                Categories
              </Link>
              <Link href="/blog" className="text-gray-600 hover:text-gray-900">
                Blog
              </Link>
              <Link href="/submit" className="text-gray-600 hover:text-gray-900">
                Submit Tool
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-gray-700">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/categories" className="hover:text-gray-700">
                Categories
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900">{category.name}</li>
          </ol>
        </nav>

        {/* Category Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{category.name}</h1>
          <p className="text-gray-600 mb-4">{category.description}</p>
          <Badge variant="secondary">{category.count} tools available</Badge>
        </div>

        {/* Search and Filters */}
        <div className="mb-6">
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search tools, tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => setFiltersOpen(!filtersOpen)} className="lg:hidden">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sponsored">Sponsored First</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="most-viewed">Most Viewed</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex border rounded-md">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <div className={`w-64 space-y-6 ${filtersOpen ? "block" : "hidden lg:block"}`}>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Platform Filter */}
                <div>
                  <h3 className="font-medium mb-3">Platform</h3>
                  <div className="space-y-2">
                    {["Windows", "Mac", "Linux"].map((platform) => (
                      <div key={platform} className="flex items-center space-x-2">
                        <Checkbox
                          id={platform}
                          checked={selectedPlatforms.includes(platform)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedPlatforms([...selectedPlatforms, platform])
                            } else {
                              setSelectedPlatforms(selectedPlatforms.filter((p) => p !== platform))
                            }
                          }}
                        />
                        <label htmlFor={platform} className="text-sm">
                          {platform}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing Filter */}
                <div>
                  <h3 className="font-medium mb-3">Pricing</h3>
                  <div className="space-y-2">
                    {[
                      { value: "free", label: "Free" },
                      { value: "paid", label: "Paid" },
                    ].map((pricing) => (
                      <div key={pricing.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={pricing.value}
                          checked={selectedPricing.includes(pricing.value)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedPricing([...selectedPricing, pricing.value])
                            } else {
                              setSelectedPricing(selectedPricing.filter((p) => p !== pricing.value))
                            }
                          }}
                        />
                        <label htmlFor={pricing.value} className="text-sm">
                          {pricing.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="flex-1">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-gray-600">
                Showing {sortedTools.length} of {category.count} tools
              </p>
            </div>

            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {sortedTools.map((tool) => (
                  <Card key={tool.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <img
                            src={tool.logo || "/placeholder.svg"}
                            alt={`${tool.name} logo`}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <CardTitle className="text-lg flex items-center gap-2">
                              {tool.name}
                              {tool.verified && (
                                <Badge variant="secondary" className="text-xs">
                                  Verified
                                </Badge>
                              )}
                            </CardTitle>
                            <div className="flex items-center space-x-1 mt-1">
                              <div className="flex text-yellow-400">
                                {Array.from({ length: 5 }, (_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-3 w-3 ${i < Math.floor(tool.rating) ? "fill-current" : ""}`}
                                  />
                                ))}
                              </div>
                              <span className="text-xs text-gray-600">({tool.reviewCount})</span>
                            </div>
                          </div>
                        </div>
                        {tool.sponsored && <Badge className="bg-yellow-100 text-yellow-800">Sponsored</Badge>}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="mb-4 line-clamp-3">{tool.description}</CardDescription>

                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-medium text-gray-900">{tool.pricing}</span>
                        <div className="flex gap-1">
                          {tool.platforms.map((platform) => (
                            <Badge key={platform} variant="outline" className="text-xs">
                              {platform}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-4">
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

                      <Button asChild className="w-full">
                        <Link href={`/tool/${tool.id}`}>
                          View Tool
                          <ExternalLink className="h-4 w-4 ml-2" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {sortedTools.map((tool) => (
                  <Card key={tool.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <img
                          src={tool.logo || "/placeholder.svg"}
                          alt={`${tool.name} logo`}
                          className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-xl font-semibold flex items-center gap-2">
                                {tool.name}
                                {tool.verified && (
                                  <Badge variant="secondary" className="text-xs">
                                    Verified
                                  </Badge>
                                )}
                                {tool.sponsored && <Badge className="bg-yellow-100 text-yellow-800">Sponsored</Badge>}
                              </h3>
                              <div className="flex items-center space-x-2 mt-1">
                                <div className="flex items-center space-x-1">
                                  <div className="flex text-yellow-400">
                                    {Array.from({ length: 5 }, (_, i) => (
                                      <Star
                                        key={i}
                                        className={`h-4 w-4 ${i < Math.floor(tool.rating) ? "fill-current" : ""}`}
                                      />
                                    ))}
                                  </div>
                                  <span className="text-sm text-gray-600">
                                    {tool.rating} ({tool.reviewCount} reviews)
                                  </span>
                                </div>
                                <span className="text-sm text-gray-400">•</span>
                                <span className="text-sm text-gray-600">{tool.views.toLocaleString()} views</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-semibold text-gray-900 mb-1">{tool.pricing}</div>
                              <div className="flex gap-1">
                                {tool.platforms.map((platform) => (
                                  <Badge key={platform} variant="outline" className="text-xs">
                                    {platform}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>

                          <p className="text-gray-600 mb-3 line-clamp-2">{tool.description}</p>

                          <div className="flex items-center justify-between">
                            <div className="flex flex-wrap gap-1">
                              {tool.tags.slice(0, 4).map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                              {tool.tags.length > 4 && (
                                <Badge variant="outline" className="text-xs">
                                  +{tool.tags.length - 4}
                                </Badge>
                              )}
                            </div>

                            <Button asChild>
                              <Link href={`/tool/${tool.id}`}>
                                View Tool
                                <ExternalLink className="h-4 w-4 ml-2" />
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {sortedTools.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">No tools found matching your criteria.</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedPlatforms([])
                    setSelectedPricing([])
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
