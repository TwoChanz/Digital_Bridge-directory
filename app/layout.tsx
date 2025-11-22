import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Digital Blueprint - Construction Technology Directory",
  description:
    "Discover the best digital construction tools and services. From BIM software to drone mapping, find and compare construction technology solutions.",
  generator: "v0.dev",
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
      <body className="font-sans">
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
