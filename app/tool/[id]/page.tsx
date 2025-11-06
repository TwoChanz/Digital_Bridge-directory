"use client"

import { use, useEffect } from "react"
import { logEvent } from "@/lib/analytics"
import { Star, Play, Calendar, Users, Globe, CheckCircle, ArrowRight, Building2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data
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
    description: `Autodesk Revit is a building information modeling (BIM) software for architects, landscape architects, structural engineers, mechanical, electrical, and plumbing (MEP) engineers, designers and contractors...`,
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

export default function ToolPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const tool = toolData[id as keyof typeof toolData]

  useEffect(() => {
    if (tool) {
      logEvent("Tool Viewed", { tool: tool.name })
    }
  }, [tool])

  if (!tool) return <div>Tool not found</div>

  return (
    <div className="min-h-screen bg-background">
      {/* ...everything else stays the same... */}
    </div>
  )
}
