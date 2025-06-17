import { Calendar, Clock, User, ArrowRight, TrendingUp, Building2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const featuredPost = {
  title: "The Future of Construction Technology: 2025 Trends and Predictions",
  excerpt:
    "Explore the cutting-edge technologies that will reshape the construction industry in 2025, from AI-powered project management to advanced reality capture solutions.",
  category: "Industry Insights",
  author: "Sarah Chen",
  date: "2025-01-15",
  readTime: "12 min read",
  image: "/placeholder.svg?height=400&width=800",
  slug: "future-construction-technology-2025",
}

const blogPosts = [
  {
    title: "Top 5 Scan-to-BIM Platforms for 2025",
    excerpt:
      "Compare the leading reality capture to BIM conversion tools and find the best fit for your workflow. We analyze features, pricing, and real-world performance.",
    category: "BIM Software",
    author: "Mike Rodriguez",
    date: "2025-01-12",
    readTime: "8 min read",
    image: "/placeholder.svg?height=200&width=300",
    slug: "top-scan-to-bim-platforms-2025",
  },
  {
    title: "Best BIM Tools for Small Architecture Firms",
    excerpt:
      "Affordable BIM solutions that don't compromise on features. Perfect for smaller teams looking to implement BIM workflows without breaking the budget.",
    category: "BIM Software",
    author: "Lisa Park",
    date: "2025-01-10",
    readTime: "6 min read",
    image: "/placeholder.svg?height=200&width=300",
    slug: "best-bim-tools-small-firms",
  },
  {
    title: "Reality Capture Workflows: Traditional vs NeRF Technology",
    excerpt:
      "Understanding the differences between traditional photogrammetry and Neural Radiance Fields for construction documentation and modeling.",
    category: "Reality Capture",
    author: "David Kim",
    date: "2025-01-08",
    readTime: "10 min read",
    image: "/placeholder.svg?height=200&width=300",
    slug: "reality-capture-workflows-nerf",
  },
  {
    title: "Construction Project Management Software Comparison 2025",
    excerpt:
      "In-depth analysis of the top project management platforms for construction teams, including Procore, Autodesk Construction Cloud, and emerging alternatives.",
    category: "Project Management",
    author: "Jennifer Walsh",
    date: "2025-01-05",
    readTime: "15 min read",
    image: "/placeholder.svg?height=200&width=300",
    slug: "project-management-software-comparison",
  },
  {
    title: "Drone Mapping for Construction: Complete Guide",
    excerpt:
      "Everything you need to know about implementing drone mapping in your construction projects, from equipment selection to data processing workflows.",
    category: "Drone Mapping",
    author: "Alex Thompson",
    date: "2025-01-03",
    readTime: "12 min read",
    image: "/placeholder.svg?height=200&width=300",
    slug: "drone-mapping-construction-guide",
  },
  {
    title: "AR/VR in Construction: Beyond the Hype",
    excerpt:
      "Real-world applications of augmented and virtual reality in construction, with case studies from leading firms and practical implementation advice.",
    category: "AR/VR",
    author: "Rachel Green",
    date: "2024-12-28",
    readTime: "9 min read",
    image: "/placeholder.svg?height=200&width=300",
    slug: "ar-vr-construction-applications",
  },
  {
    title: "Cost Estimation Software: Accuracy vs Speed",
    excerpt:
      "Balancing precision and efficiency in construction cost estimation. We review the latest tools and methodologies for accurate project bidding.",
    category: "Estimating",
    author: "Tom Wilson",
    date: "2024-12-25",
    readTime: "7 min read",
    image: "/placeholder.svg?height=200&width=300",
    slug: "cost-estimation-software-review",
  },
  {
    title: "Digital Twins in Construction: Implementation Strategies",
    excerpt:
      "How to successfully implement digital twin technology in construction projects, from planning to maintenance phases.",
    category: "Digital Twins",
    author: "Maria Santos",
    date: "2024-12-22",
    readTime: "11 min read",
    image: "/placeholder.svg?height=200&width=300",
    slug: "digital-twins-construction-implementation",
  },
  {
    title: "Mobile Apps for Construction Field Teams",
    excerpt:
      "Essential mobile applications that improve productivity and communication for construction workers in the field.",
    category: "Field Tools",
    author: "Chris Johnson",
    date: "2024-12-20",
    readTime: "5 min read",
    image: "/placeholder.svg?height=200&width=300",
    slug: "mobile-apps-construction-field-teams",
  },
]

const categories = [
  { name: "All Posts", count: 45, active: true },
  { name: "BIM Software", count: 12 },
  { name: "Project Management", count: 8 },
  { name: "Drone Mapping", count: 6 },
  { name: "AR/VR", count: 5 },
  { name: "Reality Capture", count: 4 },
  { name: "Estimating", count: 4 },
  { name: "Field Tools", count: 3 },
  { name: "Industry Insights", count: 3 },
]

export default function BlogPage() {
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
              <Link
                href="/categories"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                Categories
              </Link>
              <Link href="/blog" className="text-gray-900 font-medium dark:text-white">
                Blog
              </Link>
              <Link
                href="/submit"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                Submit Tool
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Construction Tech Insights</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Expert guides, industry analysis, and the latest trends in construction technology. Stay ahead with
            actionable insights from industry professionals.
          </p>
        </div>

        {/* Substack Promotional Banner */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">📬 Subscribe to Digital Blueprint</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto leading-relaxed">
              Get the latest AEC insights from the founder of Six1Five Studio — exploring LiDAR, BIM, AI, and digital
              workflows in construction.
            </p>
            <Button
              asChild
              size="lg"
              className="mb-3 hover:bg-opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"
            >
              <a
                href="https://substack.com/@digitalblueprint"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center"
              >
                Read on Substack
                <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </Button>
            <p className="text-sm text-gray-600 dark:text-gray-400 italic">
              Join 5,000+ construction professionals reading weekly insights.
            </p>
          </div>
        </div>

        {/* Featured Post */}
        <div className="mb-12">
          <Card className="overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img
                  src={featuredPost.image || "/placeholder.svg"}
                  alt={featuredPost.title}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8">
                <Badge className="mb-4">{featuredPost.category}</Badge>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                  {featuredPost.title}
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">{featuredPost.excerpt}</p>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>{featuredPost.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(featuredPost.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{featuredPost.readTime}</span>
                    </div>
                  </div>
                </div>
                <Button asChild>
                  <Link href={`/blog/${featuredPost.slug}`}>
                    Read Full Article
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Categories */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <Link
                        key={category.name}
                        href={`/blog/category/${category.name.toLowerCase().replace(/\s+/g, "-")}`}
                        className={`flex items-center justify-between p-2 rounded-lg transition-colors ${
                          category.active ? "bg-blue-50 text-blue-700" : "hover:bg-gray-50 text-gray-700"
                        }`}
                      >
                        <span className="text-sm font-medium">{category.name}</span>
                        <Badge variant="secondary" className="text-xs">
                          {category.count}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Popular Posts */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Popular This Week
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {blogPosts.slice(0, 3).map((post, index) => (
                      <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
                        <div className="flex space-x-3">
                          <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-bold text-blue-600">{index + 1}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 line-clamp-2">
                              {post.title}
                            </h4>
                            <div className="flex items-center space-x-2 mt-1 text-xs text-gray-500">
                              <span>{post.readTime}</span>
                              <span>•</span>
                              <span>{new Date(post.date).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Latest Articles</h2>
              <p className="text-gray-600">Stay updated with the latest in construction technology</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 max-w-6xl mx-auto">
              {blogPosts.map((post) => (
                <Card
                  key={post.slug}
                  className="hover:shadow-lg transition-shadow group dark:bg-gray-800 dark:border-gray-700 dark:hover:shadow-xl"
                >
                  <div className="aspect-video overflow-hidden rounded-t-lg">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="dark:border-gray-600 dark:text-gray-300">
                        {post.category}
                      </Badge>
                      <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                        <Clock className="h-3 w-3" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors dark:text-white">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4 line-clamp-3 dark:text-gray-300">{post.excerpt}</CardDescription>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center space-x-1">
                          <User className="h-3 w-3" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(post.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>

                    <Button
                      asChild
                      variant="outline"
                      className="w-full hover:bg-gray-100 dark:hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"
                    >
                      <Link href={`/blog/${post.slug}`}>
                        Read Full Article
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button
                variant="outline"
                size="lg"
                className="hover:bg-gray-100 dark:hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"
              >
                Load More Articles
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
