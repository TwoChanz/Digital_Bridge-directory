'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { Building2, Scan, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import GearCard from '../components/GearCard'
import FilterPanel from '../components/FilterPanel'
import type { Gear } from '@/types'

// Mock data for scanners - in production this would come from your API/database
const mockScanners: Gear[] = [
  {
    id: '1',
    name: 'BLK360',
    slug: 'leica-blk360',
    brand: 'Leica',
    model: 'BLK360',
    description: 'Ultra-compact laser scanner with integrated HDR imaging for fast, accurate reality capture',
    shortDescription: 'Compact laser scanner with HDR imaging',
    website: 'https://leica-geosystems.com/products/laser-scanners/scanners/blk360',
    affiliateUrl: 'https://example.com/affiliate/leica-blk360',
    linkType: 'Affiliate',
    imageUrl: '/images/gear/leica-blk360.jpg',
    rating: 4.8,
    reviewCount: 127,
    pricing: '$18,000',
    pricingType: 'paid',
    category: 'scanners',
    categorySlug: 'scanners',
    verified: true,
    sponsored: false,
    views: 1250,
    commission: '3%',
    cookieDays: '30',
    specifications: {
      accuracy: '4mm @ 10m',
      range: '60m',
      scan_speed: '360,000 pts/sec',
      weight: '1kg'
    },
    tags: ['terrestrial', 'compact', 'hdr', 'point-cloud'],
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'RTC360',
    slug: 'leica-rtc360',
    brand: 'Leica',
    model: 'RTC360',
    description: 'High-performance 3D laser scanner with real-time registration and automatic leveling',
    shortDescription: 'High-performance scanner with real-time registration',
    website: 'https://leica-geosystems.com/products/laser-scanners/scanners/rtc360',
    affiliateUrl: 'https://example.com/affiliate/leica-rtc360',
    linkType: 'Affiliate',
    imageUrl: '/images/gear/leica-rtc360.jpg',
    rating: 4.9,
    reviewCount: 89,
    pricing: '$65,000',
    pricingType: 'paid',
    category: 'scanners',
    categorySlug: 'scanners',
    verified: true,
    sponsored: true,
    views: 980,
    commission: '3%',
    cookieDays: '30',
    specifications: {
      accuracy: '1.9mm @ 10m',
      range: '130m',
      scan_speed: '2M pts/sec',
      weight: '5.35kg'
    },
    tags: ['terrestrial', 'high-accuracy', 'real-time', 'professional'],
    createdAt: '2024-01-10'
  },
  {
    id: '3',
    name: 'POP 2',
    slug: 'revopoint-pop2',
    brand: 'Revopoint',
    model: 'POP 2',
    description: 'Affordable handheld 3D scanner perfect for small objects and detailed scanning',
    shortDescription: 'Affordable handheld scanner for detailed work',
    website: 'https://www.revopoint3d.com/pop-2/',
    affiliateUrl: 'https://example.com/affiliate/revopoint-pop2',
    linkType: 'Affiliate',
    imageUrl: '/images/gear/revopoint-pop2.jpg',
    rating: 4.3,
    reviewCount: 234,
    pricing: '$569',
    pricingType: 'paid',
    category: 'scanners',
    categorySlug: 'scanners',
    verified: false,
    sponsored: false,
    views: 1890,
    commission: '5%',
    cookieDays: '30',
    specifications: {
      accuracy: '0.05mm',
      range: '0.15-0.8m',
      scan_speed: '18 fps',
      weight: '195g'
    },
    tags: ['handheld', 'affordable', 'detailed', 'portable'],
    createdAt: '2024-01-20'
  }
]

export default function ScannersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedPricingTypes, setSelectedPricingTypes] = useState<string[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  // Extract unique values for filters
  const availableBrands = useMemo(() => {
    return Array.from(new Set(mockScanners.map(scanner => scanner.brand))).sort()
  }, [])

  const availableTags = useMemo(() => {
    return Array.from(new Set(mockScanners.flatMap(scanner => scanner.tags))).sort()
  }, [])

  // Filter scanners based on current filters
  const filteredScanners = useMemo(() => {
    return mockScanners.filter(scanner => {
      const matchesSearch = searchQuery === '' || 
        scanner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scanner.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scanner.description.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(scanner.brand)
      const matchesPricing = selectedPricingTypes.length === 0 || selectedPricingTypes.includes(scanner.pricingType)
      const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => scanner.tags.includes(tag))

      return matchesSearch && matchesBrand && matchesPricing && matchesTags
    })
  }, [searchQuery, selectedBrands, selectedPricingTypes, selectedTags])

  const handleBrandChange = (brand: string, checked: boolean) => {
    if (checked) {
      setSelectedBrands([...selectedBrands, brand])
    } else {
      setSelectedBrands(selectedBrands.filter(b => b !== brand))
    }
  }

  const handlePricingTypeChange = (type: string, checked: boolean) => {
    if (checked) {
      setSelectedPricingTypes([...selectedPricingTypes, type])
    } else {
      setSelectedPricingTypes(selectedPricingTypes.filter(t => t !== type))
    }
  }

  const handleTagChange = (tag: string, checked: boolean) => {
    if (checked) {
      setSelectedTags([...selectedTags, tag])
    } else {
      setSelectedTags(selectedTags.filter(t => t !== tag))
    }
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedBrands([])
    setSelectedPricingTypes([])
    setSelectedTags([])
  }

  const activeFiltersCount = selectedBrands.length + selectedPricingTypes.length + selectedTags.length

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

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link href="/fieldkit" className="hover:text-blue-600">FieldKit</Link>
          <span>/</span>
          <span className="text-gray-900">Scanners</span>
        </div>

        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/fieldkit">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to FieldKit
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <Scan className="w-8 h-8 mr-3 text-blue-600" />
                3D Scanners
              </h1>
              <p className="text-gray-600 mt-1">
                Terrestrial, handheld, and mobile 3D scanners for precise reality capture
              </p>
            </div>
          </div>
          <Badge variant="outline" className="text-lg px-3 py-1">
            {filteredScanners.length} scanners
          </Badge>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <FilterPanel
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedBrands={selectedBrands}
              onBrandChange={handleBrandChange}
              selectedPricingTypes={selectedPricingTypes}
              onPricingTypeChange={handlePricingTypeChange}
              selectedTags={selectedTags}
              onTagChange={handleTagChange}
              availableBrands={availableBrands}
              availableTags={availableTags}
              onClearFilters={clearFilters}
              activeFiltersCount={activeFiltersCount}
            />
          </div>

          {/* Scanners Grid */}
          <div className="lg:col-span-3">
            {filteredScanners.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {filteredScanners.map((scanner) => (
                  <GearCard key={scanner.id} gear={scanner} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Scan className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No scanners found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters or search terms
                </p>
                <Button variant="outline" onClick={clearFilters}>
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
