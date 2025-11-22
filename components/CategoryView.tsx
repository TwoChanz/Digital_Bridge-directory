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
import type { Tool } from "@/lib/supabase"

interface CategoryViewProps {
  category: {
    name: string
    description: string
    slug: string
  }
  tools: Tool[]
  platforms: string[]
}

export default function CategoryView({ category, tools, platforms }: CategoryViewProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("sponsored")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])
  const [selectedPricing, setSelectedPricing] = useState<string[]>([])
  const [filtersOpen, setFiltersOpen] = useState(false)

  // Get available platforms from tools data
  const availablePlatforms = platforms.length > 0 ? platforms : ["Windows", "Mac", "Linux", "Web", "iOS", "Android"]

  const filteredTools = tools.filter((tool) => {
    const matchesSearch =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (tool.description?.toLowerCase().includes(searchQuery.toLowerCase()) || false) ||
      (tool.tags?.some((tagObj: any) => tagObj.tag.name.toLowerCase().includes(searchQuery.toLowerCase())) || false)

    const matchesPlatform =
      selectedPlatforms.length === 0 ||
      selectedPlatforms.some((platform) =>
        tool.platforms?.some((p: any) => p.platform.name === platform)
      )

    const matchesPricing =
      selectedPricing.length === 0 ||
      (tool.pricing_type && selectedPricing.includes(tool.pricing_type))

    return matchesSearch && matchesPlatform && matchesPricing
  })

  const sortedTools = [...filteredTools].sort((a, b) => {
    switch (sortBy) {
      case "sponsored":
        if (a.sponsored && !b.sponsored) return -1
        if (!a.sponsored && b.sponsored) return 1
        return (b.rating || 0) - (a.rating || 0)
      case "rating":
        return (b.rating || 0) - (a.rating || 0)
      case "newest":
        return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime()
      case "most-viewed":
        return (b.view_count || 0) - (a.view_count || 0)
      default:
        return 0
    }
  })

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <li>
              <Link href="/" className="hover:text-gray-700 dark:hover:text-gray-300">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/" className="hover:text-gray-700 dark:hover:text-gray-300">
                Categories
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 dark:text-white">{category.name}</li>
          </ol>
        </nav>

        {/* Category Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{category.name}</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{category.description}</p>
          <Badge variant="secondary" className="dark:bg-gray-700 dark:text-gray-300">
            {tools.length} tools available
          </Badge>
        </div>

        {/* Search and Filters */}
        <div className="mb-6">
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search tools, tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => setFiltersOpen(!filtersOpen)} className="lg:hidden dark:border-gray-700 dark:text-gray-300">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48 dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                  <SelectItem value="sponsored">Sponsored First</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="most-viewed">Most Viewed</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex border rounded-md dark:border-gray-700">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="dark:hover:bg-gray-700"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="dark:hover:bg-gray-700"
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
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg dark:text-white">Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Platform Filter */}
                <div>
                  <h3 className="font-medium mb-3 dark:text-white">Platform</h3>
                  <div className="space-y-2">
                    {availablePlatforms.map((platform) => (
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
                        <label htmlFor={platform} className="text-sm dark:text-gray-300">
                          {platform}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing Filter */}
                <div>
                  <h3 className="font-medium mb-3 dark:text-white">Pricing</h3>
                  <div className="space-y-2">
                    {[
                      { value: "free", label: "Free" },
                      { value: "freemium", label: "Freemium" },
                      { value: "paid", label: "Paid" },
                      { value: "custom", label: "Custom" },
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
                        <label htmlFor={pricing.value} className="text-sm dark:text-gray-300">
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
              <p className="text-gray-600 dark:text-gray-300">
                Showing {sortedTools.length} of {tools.length} tools
              </p>
            </div>

            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {sortedTools.map((tool) => (
                  <Card key={tool.id} className="hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <img
                            src={tool.logo_url || "/placeholder.svg"}
                            alt={`${tool.name} logo`}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <CardTitle className="text-lg flex items-center gap-2 dark:text-white">
                              {tool.name}
                              {tool.verified && (
                                <Badge variant="secondary" className="text-xs dark:bg-gray-700 dark:text-gray-300">
                                  Verified
                                </Badge>
                              )}
                            </CardTitle>
                            <div className="flex items-center space-x-1 mt-1">
                              <div className="flex text-yellow-400">
                                {Array.from({ length: 5 }, (_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-3 w-3 ${i < Math.floor(tool.rating || 0) ? "fill-current" : ""}`}
                                  />
                                ))}
                              </div>
                              <span className="text-xs text-gray-600 dark:text-gray-400">({tool.review_count || 0})</span>
                            </div>
                          </div>
                        </div>
                        {tool.sponsored && (
                          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                            Sponsored
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="mb-4 line-clamp-3 dark:text-gray-400">
                        {tool.short_description || tool.description}
                      </CardDescription>

                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {tool.pricing_details || tool.pricing_type}
                        </span>
                        <div className="flex gap-1">
                          {tool.platforms?.slice(0, 2).map((p: any) => (
                            <Badge key={p.platform.id} variant="outline" className="text-xs dark:border-gray-600 dark:text-gray-300">
                              {p.platform.name}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {tool.tags?.slice(0, 3).map((tagObj: any) => (
                          <Badge key={tagObj.tag.id} variant="outline" className="text-xs dark:border-gray-600 dark:text-gray-300">
                            {tagObj.tag.name}
                          </Badge>
                        ))}
                        {(tool.tags?.length || 0) > 3 && (
                          <Badge variant="outline" className="text-xs dark:border-gray-600 dark:text-gray-300">
                            +{(tool.tags?.length || 0) - 3}
                          </Badge>
                        )}
                      </div>

                      <Button asChild className="w-full">
                        <Link href={`/tool/${tool.slug}`}>
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
                  <Card key={tool.id} className="hover:shadow-md transition-shadow dark:bg-gray-800 dark:border-gray-700">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <img
                          src={tool.logo_url || "/placeholder.svg"}
                          alt={`${tool.name} logo`}
                          className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-xl font-semibold flex items-center gap-2 dark:text-white">
                                {tool.name}
                                {tool.verified && (
                                  <Badge variant="secondary" className="text-xs dark:bg-gray-700 dark:text-gray-300">
                                    Verified
                                  </Badge>
                                )}
                                {tool.sponsored && (
                                  <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                                    Sponsored
                                  </Badge>
                                )}
                              </h3>
                              <div className="flex items-center space-x-2 mt-1">
                                <div className="flex items-center space-x-1">
                                  <div className="flex text-yellow-400">
                                    {Array.from({ length: 5 }, (_, i) => (
                                      <Star
                                        key={i}
                                        className={`h-4 w-4 ${i < Math.floor(tool.rating || 0) ? "fill-current" : ""}`}
                                      />
                                    ))}
                                  </div>
                                  <span className="text-sm text-gray-600 dark:text-gray-400">
                                    {tool.rating || 0} ({tool.review_count || 0} reviews)
                                  </span>
                                </div>
                                <span className="text-sm text-gray-400">•</span>
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                  {(tool.view_count || 0).toLocaleString()} views
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                                {tool.pricing_details || tool.pricing_type}
                              </div>
                              <div className="flex gap-1">
                                {tool.platforms?.slice(0, 3).map((p: any) => (
                                  <Badge key={p.platform.id} variant="outline" className="text-xs dark:border-gray-600 dark:text-gray-300">
                                    {p.platform.name}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>

                          <p className="text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                            {tool.short_description || tool.description}
                          </p>

                          <div className="flex items-center justify-between">
                            <div className="flex flex-wrap gap-1">
                              {tool.tags?.slice(0, 4).map((tagObj: any) => (
                                <Badge key={tagObj.tag.id} variant="outline" className="text-xs dark:border-gray-600 dark:text-gray-300">
                                  {tagObj.tag.name}
                                </Badge>
                              ))}
                              {(tool.tags?.length || 0) > 4 && (
                                <Badge variant="outline" className="text-xs dark:border-gray-600 dark:text-gray-300">
                                  +{(tool.tags?.length || 0) - 4}
                                </Badge>
                              )}
                            </div>

                            <Button asChild>
                              <Link href={`/tool/${tool.slug}`}>
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
                <p className="text-gray-500 dark:text-gray-400 mb-4">No tools found matching your criteria.</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedPlatforms([])
                    setSelectedPricing([])
                  }}
                  className="dark:border-gray-700 dark:text-gray-300"
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
