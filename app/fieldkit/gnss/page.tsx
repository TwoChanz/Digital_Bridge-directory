'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { Building2, Satellite, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import GearCard from '../components/GearCard'
import FilterPanel from '../components/FilterPanel'
import type { Gear } from '@/types'

// Mock data for GNSS equipment
const mockGNSS: Gear[] = [
  {
    id: '7',
    name: 'GS18 T',
    slug: 'leica-gs18-t',
    brand: 'Leica',
    model: 'GS18 T',
    description: 'Revolutionary GNSS RTK rover with tilt compensation technology for faster, more efficient surveying',
    shortDescription: 'GNSS RTK rover with tilt compensation',
    website: 'https://leica-geosystems.com/products/gnss-systems/receivers/leica-gs18-t',
    affiliateUrl: 'https://example.com/affiliate/leica-gs18-t',
    linkType: 'Affiliate',
    imageUrl: '/images/gear/leica-gs18-t.jpg',
    rating: 4.9,
    reviewCount: 89,
    pricing: '$28,000',
    pricingType: 'paid',
    category: 'gnss',
    categorySlug: 'gnss',
    verified: true,
    sponsored: true,
    views: 1450,
    commission: '3%',
    cookieDays: '30',
    specifications: {
      accuracy: '3mm + 0.1ppm',
      tilt_range: '30°',
      battery_life: '35 hours',
      channels: '555',
      weight: '1.25kg'
    },
    tags: ['rtk', 'tilt-compensation', 'surveying', 'professional'],
    createdAt: '2024-01-14'
  },
  {
    id: '8',
    name: 'R12i',
    slug: 'trimble-r12i',
    brand: 'Trimble',
    model: 'R12i',
    description: 'Integrated GNSS receiver with advanced multipath rejection and long-range RTK capabilities',
    shortDescription: 'Integrated GNSS with multipath rejection',
    website: 'https://geospatial.trimble.com/products-and-solutions/r12i',
    affiliateUrl: 'https://example.com/affiliate/trimble-r12i',
    linkType: 'Partner',
    imageUrl: '/images/gear/trimble-r12i.jpg',
    rating: 4.7,
    reviewCount: 124,
    pricing: '$22,500',
    pricingType: 'paid',
    category: 'gnss',
    categorySlug: 'gnss',
    verified: true,
    sponsored: false,
    views: 980,
    commission: '2%',
    cookieDays: '30',
    specifications: {
      accuracy: '3mm + 0.1ppm',
      rtk_range: '60+ km',
      battery_life: '26 hours',
      channels: '440',
      weight: '1.1kg'
    },
    tags: ['rtk', 'long-range', 'multipath', 'surveying'],
    createdAt: '2024-01-11'
  },
  {
    id: '9',
    name: 'Arrow 100',
    slug: 'eos-arrow-100',
    brand: 'EOS',
    model: 'Arrow 100',
    description: 'Lightweight, affordable GNSS receiver perfect for GIS data collection and mapping applications',
    shortDescription: 'Lightweight GNSS for GIS data collection',
    website: 'https://eos-gnss.com/product/arrow-series/arrow-100/',
    affiliateUrl: 'https://example.com/affiliate/eos-arrow-100',
    linkType: 'Affiliate',
    imageUrl: '/images/gear/eos-arrow-100.jpg',
    rating: 4.4,
    reviewCount: 167,
    pricing: '$2,995',
    pricingType: 'paid',
    category: 'gnss',
    categorySlug: 'gnss',
    verified: false,
    sponsored: false,
    views: 1230,
    commission: '4%',
    cookieDays: '30',
    specifications: {
      accuracy: '1m autonomous',
      battery_life: '14 hours',
      channels: '184',
      connectivity: 'Bluetooth',
      weight: '200g'
    },
    tags: ['gis', 'lightweight', 'affordable', 'bluetooth'],
    createdAt: '2024-01-18'
  }
]

export default function GNSSPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedPricingTypes, setSelectedPricingTypes] = useState<string[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const availableBrands = useMemo(() => {
    return Array.from(new Set(mockGNSS.map(gnss => gnss.brand))).sort()
  }, [])

  const availableTags = useMemo(() => {
    return Array.from(new Set(mockGNSS.flatMap(gnss => gnss.tags))).sort()
  }, [])

  const filteredGNSS = useMemo(() => {
    return mockGNSS.filter(gnss => {
      const matchesSearch = searchQuery === '' || 
        gnss.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        gnss.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        gnss.description.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(gnss.brand)
      const matchesPricing = selectedPricingTypes.length === 0 || selectedPricingTypes.includes(gnss.pricingType)
      const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => gnss.tags.includes(tag))

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
          <span className="text-gray-900">GNSS</span>
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
                <Satellite className="w-8 h-8 mr-3 text-purple-600" />
                GNSS Systems
              </h1>
              <p className="text-gray-600 mt-1">
                Base/rover units and handheld RTK systems for precise positioning
              </p>
            </div>
          </div>
          <Badge variant="outline" className="text-lg px-3 py-1">
            {filteredGNSS.length} systems
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

          {/* GNSS Grid */}
          <div className="lg:col-span-3">
            {filteredGNSS.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {filteredGNSS.map((gnss) => (
                  <GearCard key={gnss.id} gear={gnss} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Satellite className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No GNSS systems found</h3>
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
