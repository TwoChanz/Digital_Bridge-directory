import { notFound } from "next/navigation"
import { Building2 } from "lucide-react"
import Link from "next/link"
import { getCategory, getToolsByCategory, getPlatforms } from "@/lib/tools"
import CategoryView from "@/components/CategoryView"
import ThemeToggle from "@/components/ThemeToggle"
import { Button } from "@/components/ui/button"

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  // Fetch data from Supabase
  const category = await getCategory(params.slug)

  if (!category) {
    notFound()
  }

  const tools = await getToolsByCategory(params.slug)
  const platforms = await getPlatforms()

  // Extract unique platform names from tools for the filter
  const platformNames = platforms.map(p => p.name)

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
              <Link href="/" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                Categories
              </Link>
              <Link href="/blog" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                Blog
              </Link>
              <Link href="/submit" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                Submit Tool
              </Link>
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Category View Component */}
      <CategoryView
        category={{
          name: category.name,
          description: category.description || "",
          slug: category.slug,
        }}
        tools={tools}
        platforms={platformNames}
      />
    </div>
  )
}
