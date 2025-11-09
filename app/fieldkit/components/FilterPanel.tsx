import React from 'react'
import { Search, Filter, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

interface FilterPanelProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  selectedBrands: string[]
  onBrandChange: (brand: string, checked: boolean) => void
  selectedPricingTypes: string[]
  onPricingTypeChange: (type: string, checked: boolean) => void
  selectedTags: string[]
  onTagChange: (tag: string, checked: boolean) => void
  availableBrands: string[]
  availableTags: string[]
  onClearFilters: () => void
  activeFiltersCount: number
}

const pricingTypes = [
  { value: 'free', label: 'Free' },
  { value: 'freemium', label: 'Freemium' },
  { value: 'paid', label: 'Paid' },
  { value: 'custom', label: 'Custom Pricing' }
]

export default function FilterPanel({
  searchQuery,
  onSearchChange,
  selectedBrands,
  onBrandChange,
  selectedPricingTypes,
  onPricingTypeChange,
  selectedTags,
  onTagChange,
  availableBrands,
  availableTags,
  onClearFilters,
  activeFiltersCount
}: FilterPanelProps) {
  return (
    <div className="space-y-6">
      {/* Search */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <Search className="w-5 h-5 mr-2" />
            Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search gear, brands, models..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Active Filters
                <Badge variant="secondary" className="ml-2">
                  {activeFiltersCount}
                </Badge>
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearFilters}
                className="text-red-600 hover:text-red-700"
              >
                <X className="w-4 h-4 mr-1" />
                Clear All
              </Button>
            </div>
          </CardHeader>
        </Card>
      )}

      {/* Brands Filter */}
      <Card>
        <Collapsible defaultOpen>
          <CollapsibleTrigger asChild>
            <CardHeader className="pb-3 cursor-pointer hover:bg-gray-50">
              <CardTitle className="text-lg">Brands</CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="space-y-3">
              {availableBrands.map((brand) => (
                <div key={brand} className="flex items-center space-x-2">
                  <Checkbox
                    id={`brand-${brand}`}
                    checked={selectedBrands.includes(brand)}
                    onCheckedChange={(checked) => onBrandChange(brand, checked as boolean)}
                  />
                  <Label htmlFor={`brand-${brand}`} className="text-sm">
                    {brand}
                  </Label>
                </div>
              ))}
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Pricing Type Filter */}
      <Card>
        <Collapsible defaultOpen>
          <CollapsibleTrigger asChild>
            <CardHeader className="pb-3 cursor-pointer hover:bg-gray-50">
              <CardTitle className="text-lg">Pricing</CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="space-y-3">
              {pricingTypes.map((pricing) => (
                <div key={pricing.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`pricing-${pricing.value}`}
                    checked={selectedPricingTypes.includes(pricing.value)}
                    onCheckedChange={(checked) => onPricingTypeChange(pricing.value, checked as boolean)}
                  />
                  <Label htmlFor={`pricing-${pricing.value}`} className="text-sm">
                    {pricing.label}
                  </Label>
                </div>
              ))}
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Tags Filter */}
      {availableTags.length > 0 && (
        <Card>
          <Collapsible>
            <CollapsibleTrigger asChild>
              <CardHeader className="pb-3 cursor-pointer hover:bg-gray-50">
                <CardTitle className="text-lg">Tags</CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="space-y-3">
                {availableTags.slice(0, 10).map((tag) => (
                  <div key={tag} className="flex items-center space-x-2">
                    <Checkbox
                      id={`tag-${tag}`}
                      checked={selectedTags.includes(tag)}
                      onCheckedChange={(checked) => onTagChange(tag, checked as boolean)}
                    />
                    <Label htmlFor={`tag-${tag}`} className="text-sm">
                      {tag}
                    </Label>
                  </div>
                ))}
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>
      )}
    </div>
  )
}
