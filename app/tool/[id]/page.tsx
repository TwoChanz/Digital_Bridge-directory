import { Star, Play, Calendar, Users, Globe, CheckCircle, ArrowRight, Building2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data - in real app, this would come from your database
const toolData = {
  revit: {
    id: "revit",
    name: "Autodesk Revit",
    tagline: "Industry-leading BIM software for architectural design and documentation",
    category: "BIM Software",
    logo: "/placeholder.svg?height=120&width=120",
    heroImage: "/placeholder.svg?height=400&width=800",
    rating: 4.5,
    reviewCount: 1250,
    verified: true,
    sponsored: true,
    website: "https://www.autodesk.com/products/revit",
    description: `Autodesk Revit is a building information modeling (BIM) software for architects, landscape architects, structural engineers, mechanical, electrical, and plumbing (MEP) engineers, designers and contractors. The original software was developed by Charles River Software, founded in 1997, renamed Revit Technology Corporation in 2000, and acquired by Autodesk in 2002.

Revit allows users to design a building and structure and its components in 3D, annotate the model with 2D drafting elements, and access building information from the building model's database. Revit is 4D BIM capable with tools to plan and track various stages in the building's lifecycle, from concept to construction and later maintenance and/or demolition.`,
    features: [
      "3D architectural design and modeling",
      "MEP (Mechanical, Electrical, Plumbing) design",
      "Structural engineering tools",
      "Collaborative design workflows",
      "Parametric modeling capabilities",
      "Construction documentation",
      "Rendering and visualization",
      "Cloud collaboration with BIM 360",
      "Family creation and customization",
      "Interoperability with other Autodesk products",
    ],
    platforms: ["Windows"],
    pricing: {
      tiers: [
        {
          name: "Monthly",
          price: "$290",
          period: "per month",
          features: ["Full Revit access", "Cloud storage", "Support"],
        },
        {
          name: "Annual",
          price: "$2,310",
          period: "per year",
          features: ["Full Revit access", "Cloud storage", "Priority support", "Save 33%"],
          popular: true,
        },
        {
          name: "3-Year",
          price: "$6,235",
          period: "3 years",
          features: ["Full Revit access", "Cloud storage", "Priority support", "Best value"],
        },
      ],
    },
    screenshots: [
      "/placeholder.svg?height=300&width=500",
      "/placeholder.svg?height=300&width=500",
      "/placeholder.svg?height=300&width=500",
      "/placeholder.svg?height=300&width=500",
    ],
    tags: ["BIM", "Architecture", "MEP", "Structural", "Revit", "3D Modeling", "Construction"],
    companyInfo: {
      name: "Autodesk",
      founded: "1982",
      employees: "10,000+",
      headquarters: "San Rafael, California",
    },
    stats: {
      users: "2M+",
      projects: "10M+",
      countries: "190+",
    },
  },
}

const similarTools = [
  {
    id: "archicad",
    name: "ARCHICAD",
    description: "Powerful BIM software solution for architects",
    logo: "/placeholder.svg?height=60&width=60",
    rating: 4.3,
    pricing: "From $270/month",
    tags: ["BIM", "Architecture"],
  },
  {
    id: "tekla",
    name: "Tekla Structures",
    description: "Advanced structural BIM software",
    logo: "/placeholder.svg?height=60&width=60",
    rating: 4.4,
    pricing: "Custom pricing",
    tags: ["BIM", "Structural"],
  },
  {
    id: "vectorworks",
    name: "Vectorworks Architect",
    description: "Comprehensive BIM and CAD software",
    logo: "/placeholder.svg?height=60&width=60",
    rating: 4.2,
    pricing: "From $299/month",
    tags: ["BIM", "Architecture"],
  },
]

export default function ToolPage({ params }: { params: { id: string } }) {
  const tool = toolData[params.id as keyof typeof toolData]

  if (!tool) {
    return <div>Tool not found</div>
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Building2 className="h-8 w-8 text-blue-600" />
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
            <li>
              <Link href={`/category/bim-software`} className="hover:text-gray-700">
                {tool.category}
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900">{tool.name}</li>
          </ol>
        </nav>

        {/* Hero Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <div className="flex items-start space-x-4 mb-6">
                <img
                  src={tool.logo || "/placeholder.svg"}
                  alt={`${tool.name} logo`}
                  className="w-24 h-24 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold text-gray-900">{tool.name}</h1>
                    {tool.verified && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <CheckCircle className="h-3 w-3" />
                        Verified
                      </Badge>
                    )}
                    {tool.sponsored && <Badge className="bg-yellow-100 text-yellow-800">Sponsored</Badge>}
                  </div>
                  <p className="text-xl text-gray-600 mb-3">{tool.tagline}</p>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center space-x-1">
                      <div className="flex text-yellow-400">
                        {Array.from({ length: 5 }, (_, i) => (
                          <Star key={i} className={`h-5 w-5 ${i < Math.floor(tool.rating) ? "fill-current" : ""}`} />
                        ))}
                      </div>
                      <span className="text-lg font-medium">{tool.rating}</span>
                      <span className="text-gray-600">({tool.reviewCount.toLocaleString()} reviews)</span>
                    </div>
                    <Badge variant="outline">{tool.category}</Badge>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {tool.tags.slice(0, 5).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-sm">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Sidebar */}
            <div className="lg:w-80">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle className="text-center">Get Started</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900 mb-1">{tool.pricing.tiers[1].price}</div>
                    <div className="text-gray-600">{tool.pricing.tiers[1].period}</div>
                  </div>

                  <div className="space-y-2">
                    <Button size="lg" className="w-full" asChild>
                      <a href={tool.website} target="_blank" rel="noopener noreferrer">
                        <Globe className="h-4 w-4 mr-2" />
                        Visit Website
                      </a>
                    </Button>
                    <Button size="lg" variant="outline" className="w-full">
                      <Play className="h-4 w-4 mr-2" />
                      Try Demo
                    </Button>
                    <Button size="lg" variant="outline" className="w-full">
                      <Calendar className="h-4 w-4 mr-2" />
                      Book Demo
                    </Button>
                  </div>

                  <Separator />

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Platforms:</span>
                      <div className="flex gap-1">
                        {tool.platforms.map((platform) => (
                          <Badge key={platform} variant="outline" className="text-xs">
                            {platform}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Company:</span>
                      <span className="font-medium">{tool.companyInfo.name}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="mb-8">
          <img
            src={tool.heroImage || "/placeholder.svg"}
            alt={`${tool.name} interface`}
            className="w-full h-96 object-cover rounded-xl border"
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="pricing">Pricing</TabsTrigger>
                <TabsTrigger value="screenshots">Screenshots</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About {tool.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none">
                      {tool.description.split("\n\n").map((paragraph, index) => (
                        <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Company Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Company</div>
                        <div className="font-medium">{tool.companyInfo.name}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Founded</div>
                        <div className="font-medium">{tool.companyInfo.founded}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Employees</div>
                        <div className="font-medium">{tool.companyInfo.employees}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Headquarters</div>
                        <div className="font-medium">{tool.companyInfo.headquarters}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="features" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Key Features</CardTitle>
                    <CardDescription>Comprehensive capabilities that make {tool.name} a leading choice</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3">
                      {tool.features.map((feature, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="pricing" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-3">
                  {tool.pricing.tiers.map((tier, index) => (
                    <Card key={index} className={tier.popular ? "border-blue-500 border-2" : ""}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{tier.name}</CardTitle>
                          {tier.popular && <Badge className="bg-blue-500">Most Popular</Badge>}
                        </div>
                        <div className="text-3xl font-bold">
                          {tier.price}
                          <span className="text-lg font-normal text-gray-600">/{tier.period.split(" ")[1]}</span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {tier.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-center space-x-2">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <Button className="w-full mt-4" variant={tier.popular ? "default" : "outline"}>
                          Choose Plan
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="screenshots" className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  {tool.screenshots.map((screenshot, index) => (
                    <div key={index} className="aspect-video overflow-hidden rounded-lg border">
                      <img
                        src={screenshot || "/placeholder.svg"}
                        alt={`${tool.name} screenshot ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Usage Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Active Users</span>
                    </div>
                    <span className="font-semibold">{tool.stats.users}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Building2 className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Projects Created</span>
                    </div>
                    <span className="font-semibold">{tool.stats.projects}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Globe className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Countries</span>
                    </div>
                    <span className="font-semibold">{tool.stats.countries}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Similar Tools */}
            <Card>
              <CardHeader>
                <CardTitle>Similar Tools</CardTitle>
                <CardDescription>Other tools you might be interested in</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {similarTools.map((similarTool) => (
                    <div
                      key={similarTool.id}
                      className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <img
                        src={similarTool.logo || "/placeholder.svg"}
                        alt={`${similarTool.name} logo`}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-sm truncate">{similarTool.name}</h4>
                          <div className="flex items-center space-x-1">
                            <Star className="h-3 w-3 text-yellow-400 fill-current" />
                            <span className="text-xs text-gray-600">{similarTool.rating}</span>
                          </div>
                        </div>
                        <p className="text-xs text-gray-600 mb-2 line-clamp-2">{similarTool.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex gap-1">
                            {similarTool.tags.slice(0, 2).map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs px-1 py-0">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <Link
                            href={`/tool/${similarTool.id}`}
                            className="text-xs text-blue-600 hover:text-blue-800 flex items-center"
                          >
                            View <ArrowRight className="h-3 w-3 ml-1" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
