"use client"

import { Button } from "@/components/ui/button"
import { logEvent } from "@/lib/analytics"
import { ExternalLink, ArrowRight } from "lucide-react"
import Link from "next/link"

interface AffiliateCtaButtonProps {
  href: string
  toolName: string
  toolSlug: string
  linkType?: "Affiliate" | "Partner" | "Direct"
  buttonText: string
  variant?: "primary" | "sidebar"
  size?: "default" | "lg"
  className?: string
}

export function AffiliateCtaButton({
  href,
  toolName,
  toolSlug,
  linkType = "Direct",
  buttonText,
  variant = "primary",
  size = "lg",
  className = "",
}: AffiliateCtaButtonProps) {
  const handleClick = () => {
    // Track affiliate/partner click in Plausible Analytics
    logEvent("Affiliate Click", {
      tool: toolName,
      toolSlug: toolSlug,
      linkType: linkType,
      source: variant === "sidebar" ? "tool-sidebar" : "tool-header",
    })
  }

  const Icon = variant === "sidebar" ? ArrowRight : ExternalLink

  return (
    <Link href={href} target="_blank" rel="noopener noreferrer" onClick={handleClick}>
      <Button size={size} className={`w-full gap-2 ${className}`}>
        {buttonText}
        <Icon className="h-4 w-4" />
      </Button>
    </Link>
  )
}
