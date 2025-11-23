import { notFound } from "next/navigation"
import { Star, Globe, CheckCircle, Building2, ExternalLink } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getTool, getTools } from "@/lib/tools"
import ThemeToggle from "@/components/ThemeToggle"
import ToolViewTracker from "@/components/ToolViewTracker"

export default async function ToolPage({ params }: { params: { id: string } }) {
  // Fetch tool data from Supabase
  const tool = await getTool(params.id)

  if (!tool) {
    notFound()
  }

  // Fetch similar tools from the same category
  const allTools = await getTools()
  const similarTools = allTools
    .filter(t => t.category?.id === tool.category?.id && t.id !== tool.id)
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-background">
      {/* Analytics Tracker */}
      <ToolViewTracker toolName={tool.name} />

      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-gray-900/95 dark:supports-[backdrop-filter]:bg-gray-900/60 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Building2 className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">Digital Blueprint</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                Categories
              </Link>
              <Link href="/blog" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                Blog
              </Link>
              <Link href="/submit" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                Submit Tool
              </Link>
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <li>
              <Link href="/" className="hover:text-gray-700 dark:hover:text-gray-300">Home</Link>
            </li>
            <li>/</li>
            <li>
              <Link href={`/category/${tool.category?.slug}`} className="hover:text-gray-700 dark:hover:text-gray-300">
                {tool.category?.name}
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 dark:text-white">{tool.name}</li>
          </ol>
        </nav>

        {/* Hero Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <img
              src={tool.logo_url || "/placeholder.svg"}
              alt={`${tool.name} logo`}
              className="w-32 h-32 rounded-2xl shadow-lg object-cover"
            />
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white">{tool.name}</h1>
                    {tool.verified && (
                      <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                    {tool.sponsored && (
                      <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                        Sponsored
                      </Badge>
                    )}
                  </div>
                  <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
                    {tool.tagline || tool.short_description}
                  </p>
                  <div className="flex items-center gap-6 mb-4 flex-wrap">
                    <div className="flex items-center space-x-1">
                      <div className="flex text-yellow-400">
                        {Array.from({ length: 5 }, (_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${i < Math.floor(tool.rating || 0) ? "fill-current" : ""}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {tool.rating || 0} ({tool.review_count || 0} reviews)
                      </span>
                    </div>
                    <Separator orientation="vertical" className="h-6" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {(tool.view_count || 0).toLocaleString()} views
                    </span>
                    <Separator orientation="vertical" className="h-6" />
                    <Badge variant="outline" className="dark:border-gray-600 dark:text-gray-300">
                      {tool.category?.name}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 flex-wrap">
                <Button size="lg" asChild className="bg-blue-600 hover:bg-blue-700">
                  <a href={tool.website_url || "#"} target="_blank" rel="noopener noreferrer">
                    <Globe className="h-5 w-5 mr-2" />
                    Visit Website
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="dark:border-gray-600 dark:text-gray-300">
                  Request Demo
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        {tool.hero_image_url && (
          <div className="mb-8 rounded-xl overflow-hidden shadow-xl">
            <img src={tool.hero_image_url} alt={`${tool.name} hero`} className="w-full h-96 object-cover" />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="dark:bg-gray-800">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="pricing">Pricing</TabsTrigger>
                <TabsTrigger value="screenshots">Screenshots</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <Card className="dark:bg-gray-800 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="dark:text-white">About {tool.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                      {tool.description || "No description available."}
                    </p>
                    <Separator className="my-6" />
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">Platforms</h4>
                        <div className="flex flex-wrap gap-2">
                          {tool.platforms?.map((p: any) => (
                            <Badge key={p.platform.id} variant="outline" className="dark:border-gray-600 dark:text-gray-300">
                              {p.platform.name}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">Tags</h4>
                        <div className="flex flex-wrap gap-2">
                          {tool.tags?.map((t: any) => (
                            <Badge key={t.tag.id} variant="secondary" className="dark:bg-gray-700 dark:text-gray-300">
                              {t.tag.name}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="features" className="mt-6">
                <Card className="dark:bg-gray-800 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="dark:text-white">Key Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {tool.features && tool.features.length > 0 ? (
                      <ul className="space-y-3">
                        {tool.features.map((feature: any) => (
                          <li key={feature.id} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 dark:text-gray-300">{feature.description}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500 dark:text-gray-400">No features listed yet.</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="pricing" className="mt-6">
                <Card className="dark:bg-gray-800 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="dark:text-white">Pricing Plans</CardTitle>
                    <CardDescription className="dark:text-gray-400">
                      {tool.pricing_details || tool.pricing_type || "Contact for pricing"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {tool.pricing_tiers && tool.pricing_tiers.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {tool.pricing_tiers.map((tier: any) => (
                          <Card
                            key={tier.id}
                            className={tier.popular ? "border-blue-500 dark:border-blue-400 border-2" : "dark:bg-gray-700 dark:border-gray-600"}
                          >
                            <CardHeader>
                              <CardTitle className="text-lg dark:text-white">{tier.name}</CardTitle>
                              {tier.popular && <Badge className="w-fit bg-blue-500 text-white">Most Popular</Badge>}
                            </CardHeader>
                            <CardContent>
                              <div className="mb-4">
                                <span className="text-3xl font-bold text-gray-900 dark:text-white">{tier.price}</span>
                                {tier.period && <span className="text-gray-600 dark:text-gray-400 ml-2">/{tier.period}</span>}
                              </div>
                              <ul className="space-y-2">
                                {tier.features?.map((feature: string, idx: number) => (
                                  <li key={idx} className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 dark:text-gray-400">Contact vendor for pricing information.</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="screenshots" className="mt-6">
                <Card className="dark:bg-gray-800 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="dark:text-white">Screenshots</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {tool.screenshots && tool.screenshots.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {tool.screenshots.map((screenshot: any) => (
                          <div key={screenshot.id} className="rounded-lg overflow-hidden border dark:border-gray-700">
                            <img
                              src={screenshot.image_url}
                              alt={screenshot.alt_text || `${tool.name} screenshot`}
                              className="w-full h-64 object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 dark:text-gray-400">No screenshots available yet.</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Company Info */}
            {tool.company && (
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-lg dark:text-white">Company</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Name</span>
                    <p className="font-medium text-gray-900 dark:text-white">{tool.company.name}</p>
                  </div>
                  {tool.company.founded_year && (
                    <div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Founded</span>
                      <p className="font-medium text-gray-900 dark:text-white">{tool.company.founded_year}</p>
                    </div>
                  )}
                  {tool.company.employees && (
                    <div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Employees</span>
                      <p className="font-medium text-gray-900 dark:text-white">{tool.company.employees}</p>
                    </div>
                  )}
                  {tool.company.headquarters && (
                    <div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Headquarters</span>
                      <p className="font-medium text-gray-900 dark:text-white">{tool.company.headquarters}</p>
                    </div>
                  )}
                  {tool.company.website && (
                    <Button variant="outline" className="w-full dark:border-gray-600 dark:text-gray-300" asChild>
                      <a href={tool.company.website} target="_blank" rel="noopener noreferrer">
                        <Globe className="h-4 w-4 mr-2" />
                        Company Website
                      </a>
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Similar Tools */}
            {similarTools.length > 0 && (
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-lg dark:text-white">Similar Tools</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {similarTools.map((similar) => (
                    <Link key={similar.id} href={`/tool/${similar.slug}`}>
                      <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <img
                          src={similar.logo_url || "/placeholder.svg"}
                          alt={`${similar.name} logo`}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 dark:text-white truncate">{similar.name}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                            {similar.short_description || similar.description}
                          </p>
                          <div className="flex items-center mt-1">
                            <Star className="h-3 w-3 text-yellow-400 fill-current" />
                            <span className="text-xs text-gray-600 dark:text-gray-400 ml-1">{similar.rating || 0}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
