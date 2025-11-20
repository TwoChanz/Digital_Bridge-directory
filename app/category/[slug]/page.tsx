import { fetchCategoryBySlug, fetchToolsByCategory } from "@/lib/data-supabase";
import { notFound } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getToolLogoUrl, buildAffiliateUrl } from "@/lib/helpers";
import { Star, CheckCircle } from "lucide-react";

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const category = await fetchCategoryBySlug(params.slug);

  if (!category) {
    notFound();
  }

  const tools = await fetchToolsByCategory(category.slug);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
      <p className="text-lg text-gray-600 mb-8">{category.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => {
          const affiliateLink = tool.affiliateUrl
            ? buildAffiliateUrl(tool.affiliateUrl, tool.slug)
            : buildAffiliateUrl(tool.website, tool.slug);

          return (
            <Card
              key={tool.slug}
              className="hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 relative rounded border flex-shrink-0 bg-white">
                      <Image
                        src={getToolLogoUrl(tool.logo_url, tool.website)}
                        alt={`${tool.name} logo`}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        {tool.name}
                        {tool.verified && (
                          <Badge variant="secondary" className="text-xs">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </CardTitle>
                      <p className="text-sm text-gray-500">{tool.category}</p>
                    </div>
                  </div>
                  {tool.sponsored && (
                    <Badge className="bg-yellow-100 text-yellow-800">
                      Sponsored
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4 line-clamp-2">
                  {tool.tagline || tool.description}
                </CardDescription>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{tool.rating}</span>
                    <span className="text-sm text-gray-600">({tool.review_count})</span>
                  </div>
                  <span className="text-sm font-medium">{tool.pricing}</span>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {tool.tags?.slice(0, 3).map((tag: any) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Button
                  asChild
                  className="w-full"
                >
                  <Link href={`/tool/${tool.slug}`}>View Tool</Link>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}