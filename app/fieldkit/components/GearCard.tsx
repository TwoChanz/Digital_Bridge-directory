import React from 'react'
import Link from 'next/link'
import { Star, ExternalLink, Shield, Zap } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Gear } from '@/types'

interface GearCardProps {
  gear: Gear
  showCategory?: boolean
}

export default function GearCard({ gear, showCategory = false }: GearCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            {gear.imageUrl && (
              <img
                src={gear.imageUrl}
                alt={`${gear.brand} ${gear.model}`}
                className="w-12 h-12 object-contain rounded-lg bg-gray-50"
              />
            )}
            <div>
              <h3 className="font-semibold text-lg group-hover:text-blue-600 transition-colors">
                {gear.brand} {gear.model}
              </h3>
              <p className="text-sm text-gray-600">{gear.shortDescription}</p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            {gear.verified && (
              <Badge variant="secondary" className="text-xs">
                <Shield className="w-3 h-3 mr-1" />
                Verified
              </Badge>
            )}
            {gear.sponsored && (
              <Badge variant="default" className="text-xs">
                <Zap className="w-3 h-3 mr-1" />
                Sponsored
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Rating and Reviews */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="ml-1 text-sm font-medium">{gear.rating}</span>
            </div>
            <span className="text-sm text-gray-500">({gear.reviewCount} reviews)</span>
          </div>
          {showCategory && (
            <Badge variant="outline" className="text-xs">
              {gear.category}
            </Badge>
          )}
        </div>

        {/* Key Specifications */}
        {gear.specifications && Object.keys(gear.specifications).length > 0 && (
          <div className="space-y-1">
            {Object.entries(gear.specifications).slice(0, 3).map(([key, value]) => (
              <div key={key} className="flex justify-between text-sm">
                <span className="text-gray-600 capitalize">{key.replace('_', ' ')}:</span>
                <span className="font-medium">{value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Tags */}
        {gear.tags && gear.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {gear.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {gear.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{gear.tags.length - 3} more
              </Badge>
            )}
          </div>
        )}

        {/* Pricing */}
        <div className="flex items-center justify-between pt-2 border-t">
          <div>
            <span className="text-lg font-bold text-gray-900">{gear.pricing}</span>
            <Badge variant="outline" className="ml-2 text-xs">
              {gear.pricingType}
            </Badge>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1" asChild>
            <Link href={`/fieldkit/gear/${gear.slug}`}>
              View Details
            </Link>
          </Button>
          <Button size="sm" className="flex-1" asChild>
            <Link 
              href={gear.affiliateUrl || gear.website} 
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="w-4 h-4 mr-1" />
              {gear.linkType === 'Affiliate' ? 'Buy Now' : 'Visit Site'}
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
