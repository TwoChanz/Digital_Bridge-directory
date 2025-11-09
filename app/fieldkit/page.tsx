import React from 'react'
import Link from 'next/link'
import { Building2, Scan, Drone, Satellite, Zap, Wrench } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const categories = [
  {
    name: 'Scanners',
    slug: 'scanners',
    description: 'Terrestrial, handheld, and mobile 3D scanners for precise reality capture',
    icon: Scan,
    color: 'bg-blue-500',
    count: 12
  },
  {
    name: 'Drones',
    slug: 'drones',
    description: 'UAVs and payloads for aerial mapping and photogrammetry',
    icon: Drone,
    color: 'bg-green-500',
    count: 8
  },
  {
    name: 'GNSS',
    slug: 'gnss',
    description: 'Base/rover units and handheld RTK systems for precise positioning',
    icon: Satellite,
    color: 'bg-purple-500',
    count: 6
  },
  {
    name: 'LiDAR',
    slug: 'lidar',
    description: 'Mobile and drone LiDAR sensors for high-density point clouds',
    icon: Zap,
    color: 'bg-orange-500',
    count: 4
  },
  {
    name: 'Accessories',
    slug: 'accessories',
    description: 'ND filters, tripods, protective cases, and field gear',
    icon: Wrench,
    color: 'bg-gray-500',
    count: 15
  }
]

export default function FieldKitPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Building2 className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold">Digital Blueprint</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-gray-600 hover:text-gray-900">
                Software
              </Link>
              <Link href="/fieldkit" className="text-blue-600 font-medium">
                FieldKit
              </Link>
              <Link href="/pricing" className="text-gray-600 hover:text-gray-900">
                Pricing
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge variant="outline" className="mb-4">
              🧰 FieldKit by Digital Blueprint
            </Badge>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Your Reality Capture
              <span className="text-blue-600"> Hardware Directory</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Discover, compare, and find the best field gear for AEC professionals. 
              From 3D scanners to drones, GNSS to accessories — all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="#categories">Browse Hardware</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/fieldkit/roi-calculator">ROI Calculator</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section id="categories" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Hardware Categories
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our curated collection of field gear across five key categories
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => {
              const IconComponent = category.icon
              return (
                <Card key={category.slug} className="hover:shadow-lg transition-shadow cursor-pointer group">
                  <Link href={`/fieldkit/${category.slug}`}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className={`p-3 rounded-lg ${category.color} text-white`}>
                          {IconComponent && <IconComponent className="h-6 w-6" />}
                        </div>
                        <Badge variant="secondary">{category.count} items</Badge>
                      </div>
                      <CardTitle className="group-hover:text-blue-600 transition-colors">
                        {category.name}
                      </CardTitle>
                      <CardDescription>{category.description}</CardDescription>
                    </CardHeader>
                  </Link>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Need Help Choosing the Right Gear?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Our team at Six1Five Studio can help you select and deploy the perfect hardware for your project.
          </p>
          <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-slate-900">
            Get Expert Consultation
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Building2 className="h-6 w-6 text-blue-600" />
                <span className="font-bold">FieldKit</span>
              </div>
              <p className="text-gray-600 text-sm">
                The hardware directory for AEC professionals
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Categories</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                {categories.map((category) => (
                  <li key={category.slug}>
                    <Link href={`/fieldkit/${category.slug}`} className="hover:text-blue-600">
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Resources</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/fieldkit/roi-calculator" className="hover:text-blue-600">ROI Calculator</Link></li>
                <li><Link href="/fieldkit/guides" className="hover:text-blue-600">Buying Guides</Link></li>
                <li><Link href="/fieldkit/reviews" className="hover:text-blue-600">Expert Reviews</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Company</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/about" className="hover:text-blue-600">About</Link></li>
                <li><Link href="/contact" className="hover:text-blue-600">Contact</Link></li>
                <li><Link href="/submit" className="hover:text-blue-600">Submit Hardware</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-gray-600">
            <p>&copy; 2024 Digital Blueprint. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
