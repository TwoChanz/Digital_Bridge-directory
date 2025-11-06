"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { GitCompareArrows, Check, X } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

interface CompareButtonProps {
  toolSlug: string
  toolName: string
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
  showDropdown?: boolean
}

export function CompareButton({
  toolSlug,
  toolName,
  variant = "outline",
  size = "default",
  showDropdown = false,
}: CompareButtonProps) {
  const router = useRouter()
  const [compareList, setCompareList] = useState<string[]>([])
  const [isInComparison, setIsInComparison] = useState(false)

  useEffect(() => {
    // Load comparison list from localStorage
    const stored = localStorage.getItem("compareTools")
    if (stored) {
      try {
        const list = JSON.parse(stored)
        setCompareList(list)
        setIsInComparison(list.includes(toolSlug))
      } catch (e) {
        console.error("Error parsing compare list:", e)
      }
    }
  }, [toolSlug])

  const addToCompare = () => {
    const newList = [...compareList, toolSlug]
    localStorage.setItem("compareTools", JSON.stringify(newList))
    setCompareList(newList)
    setIsInComparison(true)
  }

  const removeFromCompare = () => {
    const newList = compareList.filter((slug) => slug !== toolSlug)
    localStorage.setItem("compareTools", JSON.stringify(newList))
    setCompareList(newList)
    setIsInComparison(false)
  }

  const goToComparison = () => {
    if (compareList.length > 0) {
      router.push(`/compare?tools=${compareList.join(",")}`)
    }
  }

  const clearComparison = () => {
    localStorage.removeItem("compareTools")
    setCompareList([])
    setIsInComparison(false)
  }

  if (!showDropdown) {
    // Simple button mode
    if (isInComparison) {
      return (
        <Button variant="secondary" size={size} onClick={removeFromCompare}>
          <Check className="h-4 w-4 mr-2" />
          In Comparison
        </Button>
      )
    }

    return (
      <Button variant={variant} size={size} onClick={addToCompare}>
        <GitCompareArrows className="h-4 w-4 mr-2" />
        Compare
      </Button>
    )
  }

  // Dropdown mode with comparison list
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} size={size}>
          <GitCompareArrows className="h-4 w-4 mr-2" />
          Compare
          {compareList.length > 0 && (
            <Badge variant="secondary" className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center">
              {compareList.length}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <div className="px-2 py-1.5 text-sm font-semibold">Comparison List</div>
        <DropdownMenuSeparator />

        {compareList.length === 0 ? (
          <div className="px-2 py-6 text-center text-sm text-muted-foreground">
            No tools added yet
          </div>
        ) : (
          <>
            {compareList.map((slug) => (
              <DropdownMenuItem key={slug} className="flex items-center justify-between">
                <span className="truncate flex-1">{slug === toolSlug ? toolName : slug}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    const newList = compareList.filter((s) => s !== slug)
                    localStorage.setItem("compareTools", JSON.stringify(newList))
                    setCompareList(newList)
                    if (slug === toolSlug) setIsInComparison(false)
                  }}
                  className="ml-2 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={goToComparison} className="font-semibold">
              <GitCompareArrows className="h-4 w-4 mr-2" />
              Compare ({compareList.length})
            </DropdownMenuItem>
            <DropdownMenuItem onClick={clearComparison} className="text-destructive">
              <X className="h-4 w-4 mr-2" />
              Clear All
            </DropdownMenuItem>
          </>
        )}

        {!isInComparison && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={addToCompare} className="font-semibold text-primary">
              Add "{toolName}" to comparison
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
