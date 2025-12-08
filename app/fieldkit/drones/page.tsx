'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { Building2, Plane, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import GearCard from '../components/GearCard'
import FilterPanel from '../components/FilterPanel'
import type { Gear } from '@/types'

// Mock data for drones
const mockDrones: Gear[] = [
  {
    id: '4',
    name: 'Mavic 3 Enterprise',
    slug: 'dji-mavic-3-enterprise',
    brand: 'DJI',
    model: 'Mavic 3 Enterprise',
    description: 'Professional drone with advanced imaging capabilities and enterprise-grade features for mapping and inspection',
    shortDescription: 'Professional mapping drone with enterprise features',
    website: 'https://enterprise.dji.com/mavic-3-enterprise',
    affiliateUrl: 'https://example.com/affiliate/dji-mavic-3-enterprise',
    linkType: 'Affiliate',
    imageUrl: '/images/gear/dji-mavic-3-enterprise.jpg',
    rating: 4.7,
    reviewCount: 156,
    pricing: '$5,170',
    pricingType: 'paid',
    category: 'drones',
    categorySlug: 'drones',
    verified: true,
    sponsored: true,
    views: 2340,
    commission: '2%',
    cookieDays: '30',
    specifications: {
      flight_time: '45 min',
      max_range: '15 km',
      camera: '20MP 4/3 CMOS',
      rtk_support: 'Yes',
      weight: '915g'
    },
    tags: ['mapping', 'rtk', 'enterprise', 'inspection'],
    createdAt: '2024-01-12'
  },
  {
    id: '5',
    name: 'Phantom 4 RTK',
    slug: 'dji-phantom-4-rtk',
    brand: 'DJI',
    model: 'Phantom 4 RTK',
    description: 'High-precision mapping drone with built-in RTK module for centimeter-level accuracy',
    shortDescription: 'High-precision RTK mapping drone',
    website: 'https://enterprise.dji.com/phantom-4-rtk',
    affiliateUrl: 'https://example.com/affiliate/dji-phantom-4-rtk',
    linkType: 'Affiliate',
    imageUrl: '/images/gear/dji-phantom-4-rtk.jpg',
    rating: 4.8,
    reviewCount: 203,
    pricing: '$15,000',
    pricingType: 'paid',
    category: 'drones',
    categorySlug: 'drones',
    verified: true,
    sponsored: false,
    views: 1890,
    commission: '2%',
    cookieDays: '30',
    specifications: {
      flight_time: '30 min',
      max_range: '7 km',
      camera: '20MP 1" CMOS',
      rtk_accuracy: '1cm + 1ppm',
      weight: '1391g'
    },
    tags: ['rtk', 'mapping', 'surveying', 'high-accuracy'],
    createdAt: '2024-01-08'
  },
  {
    id: '6',
    name: 'WingtraOne GEN II',
    slug: 'wingtra-wingtraone-gen2',
    brand: 'Wingtra',
    model: 'WingtraOne GEN II',
    description: 'VTOL fixed-wing drone for large-area mapping with exceptional efficiency and accuracy',
    shortDescription: 'VTOL fixed-wing for large-area mapping',
    website: 'https://wingtra.com/mapping-drone-wingtraone/',
    affiliateUrl: 'https://example.com/affiliate/wingtra-gen2',
    linkType: 'Partner',
    imageUrl: '/images/gear/wingtra-gen2.jpg',
    rating: 4.9,
    reviewCount: 67,
    pricing: '$38,000',
    pricingType: 'paid',
    category: 'drones',
    categorySlug: 'drones',
    verified: true,
    sponsored: false,
    views: 890,
    commission: '1%',
    cookieDays: '30',
    specifications: {
      flight_time: '59 min',
      coverage: '400 ha/flight',
      camera: '42MP full-frame',
      rtk_support: 'Yes',
      weight: '3.3kg'
    },
    tags: ['vtol', 'large-area', 'fixed-wing', 'professional'],
    createdAt: '2024-01-05'
  }
]

export default function DronesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedPricingTypes, setSelectedPricingTypes] = useState<string[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const availableBrands = useMemo(() => {
    return Array.from(new Set(mockDrones.map(drone => drone.brand))).sort()
  }, [])

  const availableTags = useMemo(() => {
    return Array.from(new Set(mockDrones.flatMap(drone => drone.tags))).sort()
  }, [])

  const filteredDrones = useMemo(() => {
    return mockDrones.filter(drone => {
      const matchesSearch = searchQuery === '' || 
        drone.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        drone.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        drone.description.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(drone.brand)
      const matchesPricing = selectedPricingTypes.length === 0 || selectedPricingTypes.includes(drone.pricingType)
      const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => drone.tags.includes(tag))

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
          <span className="text-gray-900">Drones</span>
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
                <Plane className="w-8 h-8 mr-3 text-green-600" />
                Mapping Drones
              </h1>
              <p className="text-gray-600 mt-1">
                UAVs and payloads for aerial mapping and photogrammetry
              </p>
            </div>
          </div>
          <Badge variant="outline" className="text-lg px-3 py-1">
            {filteredDrones.length} drones
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

          {/* Drones Grid */}
          <div className="lg:col-span-3">
            {filteredDrones.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {filteredDrones.map((drone) => (
                  <GearCard key={drone.id} gear={drone} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Plane className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No drones found</h3>
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
