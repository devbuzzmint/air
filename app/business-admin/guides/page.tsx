"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  PlayCircle,
  UserPlus,
  CreditCard,
  Users,
  FileText,
  Receipt,
  Search,
  BarChart
} from "lucide-react"

const adminGuides = [
  {
    id: "1",
    title: "Adding New Users",
    description: "Learn how to add and onboard new team members to your AIRefine business account",
    readTime: "8 min",
    videoUrl: "https://example.com/videos/adding-users",
    icon: UserPlus
  },
  {
    id: "2",
    title: "Allocating Credits",
    description: "Master the process of purchasing and distributing credits to your team members",
    readTime: "10 min",
    videoUrl: "https://example.com/videos/credit-allocation",
    icon: CreditCard
  },
  {
    id: "3",
    title: "Managing Users",
    description: "Best practices for managing user accounts, permissions, and activity",
    readTime: "12 min",
    videoUrl: "https://example.com/videos/user-management",
    icon: Users
  },
  {
    id: "4",
    title: "Viewing and Tracking Jobs",
    description: "How to monitor, search, and analyze all jobs across your organization",
    readTime: "8 min",
    videoUrl: "https://example.com/videos/job-tracking",
    icon: FileText
  },
  {
    id: "5",
    title: "Understanding Billing",
    description: "A comprehensive guide to billing, invoices, and payment management",
    readTime: "15 min",
    videoUrl: "https://example.com/videos/billing-guide",
    icon: Receipt
  },
  {
    id: "6",
    title: "Advanced Search Techniques",
    description: "Powerful search strategies to find specific jobs, users, and content",
    readTime: "7 min",
    videoUrl: "https://example.com/videos/admin-search",
    icon: Search
  },
  {
    id: "7",
    title: "Analytics and Reporting",
    description: "How to generate and interpret reports on usage, costs, and productivity",
    readTime: "14 min",
    videoUrl: "https://example.com/videos/admin-analytics",
    icon: BarChart
  }
]

export default function BusinessAdminGuidesPage() {
  return (
    <div className="p-8 gradient-bg min-h-screen">
      <div className="max-w-[1400px] mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold">Admin Guides</h1>
          <p className="text-muted-foreground mt-2">
            Comprehensive guides to help you manage your AIRefine business account
          </p>
        </div>

        <div className="grid gap-6">
          {adminGuides.map((guide) => {
            const Icon = guide.icon

            return (
              <Card 
                key={guide.id} 
                className="bg-card border-border hover:border-primary/50 transition-colors"
              >
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold mb-2">{guide.title}</h2>
                      <p className="text-muted-foreground">{guide.description}</p>
                      
                      <div className="flex items-center gap-6 mt-6">
                        <p className="text-sm text-muted-foreground">
                          Read time: {guide.readTime}
                        </p>
                        <Button className="gap-2">
                          <PlayCircle className="h-4 w-4" />
                          Watch Tutorial
                        </Button>
                        <Button variant="link" className="text-primary p-0">
                          Read Guide
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}