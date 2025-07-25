"use client"

import {
  BookOpen,
  Calendar,
  GraduationCap,
  Home,
  MessageSquare,
  Settings,
  Users,
  UserCheck,
  BarChart3,
  Bell,
  CreditCard,
  Shield,
  Sparkles,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Students",
    url: "/students",
    icon: GraduationCap,
    badge: "1,234",
  },
  {
    title: "Teachers",
    url: "/teachers",
    icon: UserCheck,
    badge: "89",
  },
  {
    title: "Classes",
    url: "/classes",
    icon: BookOpen,
    badge: "24",
  },
  {
    title: "Attendance",
    url: "/attendance",
    icon: Calendar,
  },
  {
    title: "Messages",
    url: "/messages",
    icon: MessageSquare,
    badge: "12",
  },
  {
    title: "Reports",
    url: "/reports",
    icon: BarChart3,
  },
  {
    title: "Notifications",
    url: "/notifications",
    icon: Bell,
    badge: "5",
  },
]

const adminItems = [
  {
    title: "User Management",
    url: "/admin/users",
    icon: Users,
  },
  {
    title: "System Settings",
    url: "/admin/settings",
    icon: Settings,
  },
  {
    title: "Security",
    url: "/admin/security",
    icon: Shield,
  },
  {
    title: "Billing",
    url: "/admin/billing",
    icon: CreditCard,
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar variant="inset" className="border-r border-slate-600 bg-gradient-to-b from-slate-900 to-blue-900">
      <SidebarHeader className="border-b border-slate-600 bg-gradient-to-r from-slate-800/50 to-slate-700/50">
        <div className="flex items-center gap-3 px-3 py-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 electric-glow">
            <Sparkles className="h-7 w-7 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-white">AI-SchoolOS™</span>
            <span className="text-xs text-blue-300">Your digital principal</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-gradient-to-b from-slate-900/95 to-blue-900/95">
        <SidebarGroup>
          <SidebarGroupLabel className="text-blue-300 font-semibold">Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    className="transition-all duration-200 hover:scale-[1.02] hover:bg-blue-500/20 data-[active=true]:bg-gradient-to-r data-[active=true]:from-blue-500/30 data-[active=true]:to-purple-500/20 data-[active=true]:electric-glow"
                  >
                    <Link href={item.url} className="flex items-center gap-3 text-white">
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                      {item.badge && (
                        <Badge className="ml-auto text-xs bg-gradient-to-r from-green-500 to-blue-500 text-white border-0">
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-orange-300 font-semibold">Administration</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    className="transition-all duration-200 hover:scale-[1.02] hover:bg-orange-500/20 data-[active=true]:bg-gradient-to-r data-[active=true]:from-orange-500/30 data-[active=true]:to-red-500/20"
                  >
                    <Link href={item.url} className="flex items-center gap-3 text-white">
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-slate-600 bg-gradient-to-r from-slate-800/50 to-slate-700/50">
        <div className="flex items-center gap-3 px-3 py-3">
          <Avatar className="h-10 w-10 ring-2 ring-blue-500/50">
            <AvatarImage src="/placeholder.svg?height=40&width=40" />
            <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold">
              AD
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col flex-1 min-w-0">
            <span className="text-sm font-semibold text-white truncate">Admin User</span>
            <span className="text-xs text-blue-300 truncate">admin@school.edu</span>
          </div>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
