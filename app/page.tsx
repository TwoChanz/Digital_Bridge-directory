import {
  Search,
  Plus,
  TrendingUp,
  Users,
  Wrench,
  Building2,
  DrillIcon as Drone,
  Glasses,
  Calculator,
  FileText,
  Star,
  CheckCircle,
  Award,
  Shield,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SearchButton } from "@/components/search-button"
import { ThemeToggle } from "@/components/theme-toggle"
import { fetchCategories, fetchAllTools, fetchStats } from "@/lib/data-supabase"
import { getToolLogoUrl, buildAffiliateUrl } from "@/lib/helpers"

// Icon mapping for categories
const categoryIcons: Record<string, any> = {
  "bim-software": Building2,
  "drone-mapping": Drone,
  "ar-vr": Glasses,
  "estimating": Calculator,
  "project-management": FileText,
  "field-tools": Wrench,
}

const blogPosts = [
  {
    title: "Top 5 Scan-to-BIM Platforms for 2025",
    excerpt: "Compare the leading reality capture to BIM conversion tools and find the best fit for your workflow.",
    category: "BIM Software",
    readTime: "8 min read",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    title: "Best BIM Tools for Small Firms",
    excerpt:
      "Affordable BIM solutions that don't compromise on features for smaller architecture and engineering firms.",
    category: "BIM Software",
    readTime: "6 min read",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    title: "Reality Capture Workflows: RC vs NeRF",
    excerpt: "Understanding the differences between traditional reality capture and Neural Radiance Fields.",
    category: "Drone Mapping",
    readTime: "10 min read",
    image: "/placeholder.svg?height=200&width=300",
  },
]

const testimonials = [
  {
    quote: "Digital Blueprint helped us discover the perfect BIM solution for our mid-size firm. The comparison tools saved us weeks of research.",
    author: "Sarah Chen",
    role: "BIM Manager",
    company: "Architectural Design Partners",
    rating: 5,
  },
  {
    quote: "As a construction tech consultant, I recommend Digital Blueprint to all my clients. It's the most comprehensive directory in the industry.",
    author: "Michael Rodriguez",
    role: "ConTech Consultant",
    company: "BuildTech Advisors",
    rating: 5,
  },
  {
    quote: "The platform makes it easy to compare tools side-by-side. We found three new tools that transformed our workflow.",
    author: "Jennifer Park",
    role: "Project Director",
    company: "Metro Construction Group",
    rating: 5,
  },
]

export default async function HomePage() {
  // Fetch data from Supabase
  const [categories, tools, stats] = await Promise.all([
    fetchCategories(),
    fetchAllTools(),
    fetchStats(),
  ])

  // Get featured tools (sponsored first, then top-rated)
  const featuredTools = tools
    .filter((tool) => tool.sponsored || tool.rating >= 4.3)
    .slice(0, 6)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-gray-900/95 dark:supports-[backdrop-filter]:bg-gray-900/60 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/logo.svg"
                alt="Digital Blueprint"
                width={200}
                height={48}
                className="h-10 w-auto text-gray-900 dark:text-white"
                priority
              />
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                href="/categories"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                Categories
              </Link>
              <Link href="/blog" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                Blog
              </Link>
              <Link
                href="/submit"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                Submit Tool
              </Link>
            </nav>
            <div className="flex items-center space-x-2">
              <SearchButton />
              <ThemeToggle />
              <Button
                asChild
                className="hover:bg-opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"
              >
                <Link href="/pricing">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your Tool
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-16">
        <div className="container mx-auto px-4 text-center">
          {/* Trust Badges */}
          <div className="flex justify-center gap-4 mb-6">
            <Badge variant="secondary" className="gap-1">
              <Shield className="h-3 w-3" />
              Verified Tools
            </Badge>
            <Badge variant="secondary" className="gap-1">
              <Award className="h-3 w-3" />
              Industry Trusted
            </Badge>
            <Badge variant="secondary" className="gap-1">
              <TrendingUp className="h-3 w-3" />
              Updated Daily
            </Badge>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Discover the Best
            <span className="text-blue-600 dark:text-blue-400"> Digital Construction</span> Tools
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Find, compare, and choose from curated construction technology tools and services. From BIM software to
            drone mapping, we've got you covered.
          </p>

          {/* Search Bar - Placeholder  */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5" />
              <Input
                type="text"
                placeholder='Press Ctrl+K or Cmd+K to search...'
                className="pl-12 pr-4 py-4 text-lg border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                readOnly
              />
              <kbd className="absolute right-4 top-1/2 transform -translate-y-1/2 px-3 py-1.5 text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm">
                <span className="text-xs">⌘K</span>
              </kbd>
            </div>
          </div>

          {/* Stats - Real Data from Supabase */}
          <div className="flex justify-center space-x-8 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center">
              <Wrench className="h-4 w-4 mr-1" />
              <span className="font-semibold">{stats.totalTools}+ Tools</span>
            </div>
            <div className="flex items-center">
              <Building2 className="h-4 w-4 mr-1" />
              <span className="font-semibold">{stats.totalCategories} Categories</span>
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              <span className="font-semibold">{(stats.totalViews / 1000).toFixed(0)}K+ Views</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Browse by Category</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Explore construction technology tools organized by specialty and use case
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {categories.map((category) => {
              const Icon = categoryIcons[category.slug] || Building2
              return (
                <Link key={category.id} href={`/category/${category.slug}`}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full dark:bg-gray-800 dark:border-gray-700 dark:hover:shadow-xl">
                    <CardHeader className="pb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${category.color} flex-shrink-0`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <CardTitle className="text-lg dark:text-white truncate">{category.name}</CardTitle>
                          <Badge variant="secondary" className="dark:bg-gray-700 dark:text-gray-300 mt-1">
                            {category.count} tools
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="dark:text-gray-400 text-sm leading-relaxed">
                        {category.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Featured Tools</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Top-rated and sponsored construction technology solutions
              </p>
            </div>
            <Button
              variant="outline"
              asChild
              className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"
            >
              <Link href="/categories">View All Tools</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
            {featuredTools.map((tool) => {
              const affiliateLink = tool.affiliateUrl
                ? buildAffiliateUrl(tool.affiliateUrl, tool.slug)
                : buildAffiliateUrl(tool.website, tool.slug)

              return (
                <Card
                  key={tool.slug}
                  className="hover:shadow-lg transition-shadow dark:bg-gray-900 dark:border-gray-700 dark:hover:shadow-xl"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 relative rounded border flex-shrink-0 bg-white">
                          <Image
                            src={getToolLogoUrl(tool.logoUrl, tool.website)}
                            alt={`${tool.name} logo`}
                            fill
                            className="object-contain p-1"
                          />
                        </div>
                        <div>
                          <CardTitle className="text-lg flex items-center gap-2 dark:text-white">
                            {tool.name}
                            {tool.verified && (
                              <Badge variant="secondary" className="text-xs dark:bg-gray-700 dark:text-gray-300">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Verified
                              </Badge>
                            )}
                          </CardTitle>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{tool.category}</p>
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
                    <CardDescription className="mb-4 dark:text-gray-400 line-clamp-2">
                      {tool.tagline || tool.description}
                    </CardDescription>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{tool.rating}</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">({tool.reviewCount})</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{tool.pricing}</span>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {tool.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs dark:border-gray-600 dark:text-gray-300">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <Button
                      asChild
                      className="w-full hover:bg-opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"
                    >
                      <Link href={`/tool/${tool.slug}`}>View Tool</Link>
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Trusted by Industry Professionals</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              See what construction technology leaders are saying about Digital Blueprint
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <CardDescription className="text-base dark:text-gray-300 leading-relaxed">
                    "{testimonial.quote}"
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border-t dark:border-gray-700 pt-4">
                    <p className="font-semibold text-gray-900 dark:text-white">{testimonial.author}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">{testimonial.company}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Latest Insights</h2>
              <p className="text-gray-600 dark:text-gray-300">Expert guides and industry analysis</p>
            </div>
            <Button
              variant="outline"
              asChild
              className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"
            >
              <Link href="/blog">View All Posts</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow dark:bg-gray-900 dark:border-gray-700 dark:hover:shadow-xl"
              >
                <div className="aspect-video overflow-hidden rounded-t-lg bg-gray-200 dark:bg-gray-700">
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <FileText className="h-16 w-16" />
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="dark:border-gray-600 dark:text-gray-300">
                      {post.category}
                    </Badge>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{post.readTime}</span>
                  </div>
                  <CardTitle className="text-lg leading-tight dark:text-white">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="dark:text-gray-400">{post.excerpt}</CardDescription>
                  <Button
                    variant="ghost"
                    className="mt-4 p-0 h-auto font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                  >
                    Read More →
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 dark:bg-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to List Your Tool?</h2>
          <p className="text-xl mb-8 text-blue-100 dark:text-blue-200 max-w-2xl mx-auto">
            Join hundreds of construction technology companies reaching thousands of potential customers
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              asChild
              className="dark:bg-white dark:text-blue-800 dark:hover:bg-gray-100 hover:bg-opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
            >
              <Link href="/pricing">
                <Plus className="h-5 w-5 mr-2" />
                Submit Your Tool
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-blue-600 dark:border-blue-200 dark:hover:bg-blue-200 dark:hover:text-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Link href="/" className="inline-block mb-4">
                <Image
                  src="/logo.svg"
                  alt="Digital Blueprint"
                  width={180}
                  height={44}
                  className="h-9 w-auto brightness-0 invert"
                />
              </Link>
              <p className="text-gray-400 dark:text-gray-500">
                Digital Blueprint — Mapping the Future of Construction Technology
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Categories</h3>
              <ul className="space-y-2 text-gray-400 dark:text-gray-500">
                {categories.slice(0, 4).map((category) => (
                  <li key={category.slug}>
                    <Link href={`/category/${category.slug}`} className="hover:text-white dark:hover:text-gray-300">
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400 dark:text-gray-500">
                <li>
                  <Link href="/blog" className="hover:text-white dark:hover:text-gray-300">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/submit" className="hover:text-white dark:hover:text-gray-300">
                    Submit Tool
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white dark:hover:text-gray-300">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white dark:hover:text-gray-300">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400 dark:text-gray-500">
                <li>
                  <Link href="/privacy" className="hover:text-white dark:hover:text-gray-300">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white dark:hover:text-gray-300">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 dark:border-gray-700 mt-8 pt-8 text-center text-gray-400 dark:text-gray-500">
            <p>&copy; 2025 Six1Five Studio. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
