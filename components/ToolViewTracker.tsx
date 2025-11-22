"use client"

import { useEffect } from "react"
import { logEvent } from "@/lib/analytics"

interface ToolViewTrackerProps {
  toolName: string
}

export default function ToolViewTracker({ toolName }: ToolViewTrackerProps) {
  useEffect(() => {
    logEvent("Tool Viewed", { tool: toolName })
  }, [toolName])

  return null
}
