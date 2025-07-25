import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "School Admin Dashboard",
  description: "Comprehensive school management system",
  manifest: "/manifest.json",
  themeColor: "#2563eb",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "School Admin",
  },
    generator: 'v0.dev'
}

function LayoutContent({ children }: { children: React.ReactNode }) {
  // This would normally use usePathname, but we'll handle it differently
  const isLandingPage = typeof window !== "undefined" && window.location.pathname === "/landing"

  if (isLandingPage) {
    return <>{children}</>
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1 overflow-hidden">{children}</main>
      </div>
    </SidebarProvider>
  )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <LayoutContent>{children}</LayoutContent>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
