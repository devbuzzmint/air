"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  PlayCircle,
  ClipboardList,
  DollarSign,
  Search,
  Settings2
} from "lucide-react"

const editorGuides = [
  {
    id: "1",
    title: "Finding and Accepting Jobs",
    description: "Learn how to browse, evaluate, and accept content editing jobs",
    category: "Jobs",
    readTime: "6 min",
    videoUrl: "https://example.com/videos/finding-jobs",
    icon: Search
  },
  {
    id: "2",
    title: "Content Review Process",
    description: "Master the content review and feedback workflow",
    category: "Workflow",
    readTime: "8 min",
    videoUrl: "https://example.com/videos/review-process",
    icon: ClipboardList
  },
  {
    id: "3",
    title: "Maximizing Your Earnings",
    description: "Tips and strategies for optimizing your editing work and income",
    category: "Earnings",
    readTime: "7 min",
    videoUrl: "https://example.com/videos/maximizing-earnings",
    icon: DollarSign
  },
  {
    id: "4",
    title: "Profile and Settings",
    description: "Guide to managing your editor profile and account settings",
    category: "Settings",
    readTime: "5 min",
    videoUrl: "https://example.com/videos/profile-settings",
    icon: Settings2
  }
]

export default function EditorGuidesPage() {
  return (
    <div className="p-8 gradient-bg min-h-screen">
      <div className="max-w-[1400px] mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold">How to Guides</h1>
          <p className="text-muted-foreground mt-2">
            Everything you need to know about being an AIRefine editor
          </p>
        </div>

        <div className="grid gap-6">
          {editorGuides.map((guide) => {
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
                      <div className="flex items-center gap-2 mb-2">
                        <h2 className="text-xl font-semibold">{guide.title}</h2>
                        <Badge variant="secondary" className="bg-muted">
                          {guide.category}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground">{guide.description}</p>
                      <div className="flex items-center gap-6 mt-4">
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