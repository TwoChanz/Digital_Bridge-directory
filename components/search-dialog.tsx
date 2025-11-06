"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search, Command } from "lucide-react"
import Fuse from "fuse.js"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import type { Tool } from "@/types"

interface SearchDialogProps {
  tools: Tool[]
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SearchDialog({ tools, open, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Tool[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const router = useRouter()

  // Configure Fuse.js for fuzzy search
  const fuse = new Fuse(tools, {
    keys: [
      { name: "name", weight: 3 },
      { name: "tagline", weight: 2 },
      { name: "description", weight: 1 },
      { name: "tags", weight: 1.5 },
      { name: "category", weight: 1 },
    ],
    threshold: 0.3,
    includeScore: true,
  })

  // Search on query change
  useEffect(() => {
    if (query.trim() === "") {
      setResults([])
      setSelectedIndex(0)
      return
    }

    const searchResults = fuse.search(query)
    setResults(searchResults.map((result) => result.item).slice(0, 10))
    setSelectedIndex(0)
  }, [query])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return

      if (e.key === "ArrowDown") {
        e.preventDefault()
        setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1))
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        setSelectedIndex((prev) => Math.max(prev - 1, 0))
      } else if (e.key === "Enter" && results[selectedIndex]) {
        e.preventDefault()
        handleSelectTool(results[selectedIndex])
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [open, results, selectedIndex])

  const handleSelectTool = (tool: Tool) => {
    router.push(`/tool/${tool.slug}`)
    onOpenChange(false)
    setQuery("")
    setResults([])
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[600px] p-0">
        <DialogHeader className="p-4 pb-0">
          <DialogTitle className="sr-only">Search tools</DialogTitle>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tools, categories, or tags..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 h-12 text-base"
              autoFocus
            />
          </div>
        </DialogHeader>

        {/* Results */}
        <div className="overflow-y-auto max-h-[400px] p-2">
          {query && results.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No tools found for &quot;{query}&quot;
            </div>
          )}

          {results.length > 0 && (
            <div className="space-y-1">
              {results.map((tool, index) => (
                <button
                  key={tool.id}
                  onClick={() => handleSelectTool(tool)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    index === selectedIndex
                      ? "bg-muted"
                      : "hover:bg-muted/50"
                  }`}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded border bg-white flex-shrink-0 overflow-hidden">
                      <img
                        src={tool.logoUrl || "/placeholder.svg"}
                        alt={tool.name}
                        className="w-full h-full object-contain p-1"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm mb-1">
                        {tool.name}
                      </div>
                      {tool.tagline && (
                        <div className="text-xs text-muted-foreground line-clamp-1 mb-2">
                          {tool.tagline}
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {tool.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {tool.pricing}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t p-3 text-xs text-muted-foreground flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                ↑↓
              </kbd>
              Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                ↵
              </kbd>
              Select
            </span>
            <span className="flex items-center gap-1">
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                ESC
              </kbd>
              Close
            </span>
          </div>
          <div className="text-[10px]">
            {results.length > 0 && `${results.length} results`}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
