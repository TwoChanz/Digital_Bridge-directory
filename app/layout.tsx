import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Digital Blueprint - AEC Technology Directory",
  description:
    "Discover the best digital construction tools and services. From BIM software to drone mapping, find and compare 35+ AEC technology solutions across 6 categories.",
  keywords: ["BIM software", "construction technology", "drone mapping", "AR VR construction", "estimating software", "project management", "field tools", "AEC technology"],
  authors: [{ name: "Digital Blueprint" }],
  creator: "Digital Blueprint",
  publisher: "Digital Blueprint",
  metadataBase: new URL("https://constructiveblueprint.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://constructiveblueprint.com",
    title: "Digital Blueprint - AEC Technology Directory",
    description: "Find the best BIM, drone mapping, AR/VR, estimating, project management & field tools for construction. 35+ tools, expert reviews.",
    siteName: "Digital Blueprint",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Digital Blueprint - The AEC Technology Directory",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Blueprint - AEC Technology Directory",
    description: "Find the best BIM, drone mapping, AR/VR, estimating, project management & field tools for construction.",
    images: ["/og-image.svg"],
    creator: "@digitalblueprint",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* ✅ Plausible Analytics Script */}
        <script
          defer
          data-domain="constructiveblueprint.com"
          src="https://plausible.io/js/script.js"
        ></script>
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
