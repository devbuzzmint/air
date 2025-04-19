"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { 
  LayoutDashboard, 
  FileText,
  BookOpen,
  PlusCircle,
  Search,
  Receipt,
  Users,
  CreditCard,
  DollarSign,
  PoundSterling
} from "lucide-react"

// Business user navigation items
const businessItems = [
  {
    title: "Dashboard",
    href: "/business",
    icon: LayoutDashboard
  },
  {
    title: "My Jobs",
    href: "/business/jobs",
    icon: FileText
  },
  {
    title: "Guides",
    href: "/business/guides",
    icon: BookOpen
  }
]

// Editor navigation items
const editorItems = [
  {
    title: "Dashboard",
    href: "/editor",
    icon: LayoutDashboard
  },
  {
    title: "My Jobs",
    href: "/editor/jobs",
    icon: FileText
  },
  {
    title: "Available Jobs",
    href: "/search",
    icon: Search
  },
  {
    title: "Earnings",
    href: "/editor/earnings",
    icon: Receipt
  },
  {
    title: "Guides",
    href: "/editor/guides",
    icon: BookOpen
  }
]

// Business Admin navigation items
const businessAdminItems = [
  {
    title: "Dashboard",
    href: "/business-admin",
    icon: LayoutDashboard
  },
  {
    title: "All Jobs",
    href: "/business-admin/jobs",
    icon: FileText
  },
  {
    title: "Users",
    href: "/business-admin/users",
    icon: Users
  },
  {
    title: "Manage Credits",
    href: "/business-admin/credits",
    icon: CreditCard
  },
  {
    title: "Billing",
    href: "/business-admin/billing",
    icon: PoundSterling
  },
  {
    title: "Guides",
    href: "/business-admin/guides",
    icon: BookOpen
  }
]

export function Sidebar() {
  const pathname = usePathname()
  const isBusinessAdmin = pathname.startsWith('/business-admin')
  const isBusinessSection = pathname.startsWith('/business')
  const navigationItems = isBusinessAdmin 
    ? businessAdminItems 
    : isBusinessSection 
    ? businessItems 
    : editorItems

  return (
    <div className="flex h-screen flex-col bg-[#192544] border-r border-border/40">
      <div className="p-6">
        <Link href={isBusinessAdmin ? "/business-admin" : isBusinessSection ? "/business" : "/editor"} className="flex items-center">
          <span className="text-2xl font-bold">
            <span className="text-primary">AI</span>Refine
          </span>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 px-4">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-colors",
                isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{item.title}</span>
            </Link>
          )
        })}
      </nav>

      <div className="p-4">
        <Link
          href={isBusinessAdmin ? "/business-admin/create" : isBusinessSection ? "/business/create" : "/search"}
          className={cn(
            "flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-primary-foreground hover:bg-primary/90"
          )}
        >
          <PlusCircle className="h-4 w-4" />
          <span>{isBusinessAdmin || isBusinessSection ? "Create Job" : "Find Jobs"}</span>
        </Link>
      </div>
    </div>
  )
}