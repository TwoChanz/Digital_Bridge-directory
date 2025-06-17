"use client"

import { useState } from "react"
import { Check, Building2, Star, Crown, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

const plans = [
  {
    id: "free",
    name: "Free Listing",
    icon: Building2,
    description: "Get started with a basic listing",
    monthlyPrice: 0,
    yearlyPrice: 0,
    color: "border-gray-200",
    buttonVariant: "outline" as const,
    buttonText: "Get Started Free",
    popular: false,
    features: [
      "Basic tool listing",
      "Company information",
      "Contact details",
      "Category placement",
      "Basic search visibility",
      "Standard support",
    ],
    limitations: ["No verification badge", "No sponsored placement", "Limited visibility", "No analytics dashboard"],
  },
  {
    id: "verified",
    name: "Verified Pro",
    icon: Star,
    description: "Build trust with verification",
    monthlyPrice: 29,
    yearlyPrice: 290, // 2 months free
    color: "border-blue-500",
    buttonVariant: "default" as const,
    buttonText: "Start Verified",
    popular: true,
    features: [
      "Everything in Free",
      "✓ Verified badge",
      "Priority search ranking",
      "Enhanced listing features",
      "Logo and screenshots",
      "Basic analytics dashboard",
      "Priority support",
      "Social media promotion",
    ],
    limitations: [],
  },
  {
    id: "sponsored",
    name: "Sponsored Elite",
    icon: Crown,
    description: "Maximum visibility and features",
    monthlyPrice: 79,
    yearlyPrice: 790, // 2 months free
    color: "border-yellow-500",
    buttonVariant: "default" as const,
    buttonText: "Go Elite",
    popular: false,
    features: [
      "Everything in Verified Pro",
      "🏆 Sponsored placement",
      "Featured on homepage",
      "Top category positioning",
      "Advanced analytics",
      "Lead generation tools",
      "Custom CTA buttons",
      "Dedicated account manager",
      "Monthly performance reports",
      "Social media amplification",
    ],
    limitations: [],
  },
]

const faqs = [
  {
    question: "How long does verification take?",
    answer:
      "Verification typically takes 2-3 business days. We review your company information, website, and tool details to ensure authenticity.",
  },
  {
    question: "Can I upgrade or downgrade my plan?",
    answer:
      "Yes, you can change your plan at any time. Upgrades take effect immediately, while downgrades take effect at the next billing cycle.",
  },
  {
    question: "What's included in sponsored placement?",
    answer:
      "Sponsored listings appear at the top of search results, category pages, and may be featured on the homepage. You'll also get priority in our newsletter and social media mentions.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, contact us for a full refund.",
  },
  {
    question: "Can I submit multiple tools?",
    answer:
      "Yes! Each plan covers one tool listing. For multiple tools, you can purchase additional listings at a 20% discount.",
  },
]

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Building2 className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold">Digital Blueprint</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/categories" className="text-gray-600 hover:text-gray-900">
                Categories
              </Link>
              <Link href="/blog" className="text-gray-600 hover:text-gray-900">
                Blog
              </Link>
              <Link href="/pricing" className="text-gray-900 font-medium">
                Pricing
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Choose Your <span className="text-blue-600">Visibility Plan</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Get your construction technology tool in front of thousands of potential customers. From basic listings to
            premium sponsored placements, we have a plan that fits your needs.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <Label htmlFor="billing-toggle" className={`text-lg ${!isYearly ? "font-semibold" : ""}`}>
              Monthly
            </Label>
            <Switch id="billing-toggle" checked={isYearly} onCheckedChange={setIsYearly} />
            <Label htmlFor="billing-toggle" className={`text-lg ${isYearly ? "font-semibold" : ""}`}>
              Yearly
            </Label>
            <Badge className="bg-green-100 text-green-800 ml-2">Save 17%</Badge>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative ${plan.color} ${plan.popular ? "border-2 scale-105" : "border"} transition-all hover:shadow-lg`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-600 text-white px-4 py-1">Most Popular</Badge>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div className={`p-3 rounded-full ${plan.popular ? "bg-blue-100" : "bg-gray-100"}`}>
                    <plan.icon className={`h-8 w-8 ${plan.popular ? "text-blue-600" : "text-gray-600"}`} />
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <CardDescription className="text-gray-600">{plan.description}</CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                {/* Pricing */}
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                    {plan.monthlyPrice > 0 && (
                      <span className="text-lg font-normal text-gray-600">/{isYearly ? "year" : "month"}</span>
                    )}
                  </div>
                  {isYearly && plan.monthlyPrice > 0 && (
                    <p className="text-sm text-green-600">Save ${plan.monthlyPrice * 12 - plan.yearlyPrice} per year</p>
                  )}
                </div>

                {/* Features */}
                <div className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Limitations */}
                {plan.limitations.length > 0 && (
                  <div className="space-y-2 mb-6 pt-4 border-t border-gray-200">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Not Included:</p>
                    {plan.limitations.map((limitation, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="h-5 w-5 mt-0.5 flex-shrink-0 flex items-center justify-center">
                          <div className="h-1 w-3 bg-gray-300 rounded"></div>
                        </div>
                        <span className="text-sm text-gray-500">{limitation}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* CTA Button */}
                <Button variant={plan.buttonVariant} className="w-full" size="lg" asChild>
                  <Link href={plan.id === "free" ? "/submit" : `/submit?plan=${plan.id}`}>
                    {plan.buttonText}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-blue-50 rounded-2xl p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Join Successful Construction Tech Companies</h2>
            <p className="text-gray-600">
              Companies using Digital Blueprint see significant increases in leads and brand visibility
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Listed Tools</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">50K+</div>
              <div className="text-gray-600">Monthly Visitors</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">85%</div>
              <div className="text-gray-600">Lead Increase</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">24h</div>
              <div className="text-gray-600">Average Response</div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
          <p className="text-gray-600 mb-8">
            Have questions? Contact our team at{" "}
            <a href="mailto:hello@digitalblueprint.com" className="text-blue-600 hover:underline">
              hello@digitalblueprint.com
            </a>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/submit">Start Free Listing</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
