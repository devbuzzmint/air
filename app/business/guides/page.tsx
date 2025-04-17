"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  PlayCircle,
  Sparkles,
  Filter,
  Users,
  HelpCircle
} from "lucide-react"

const businessGuides = [
  {
    id: "1",
    title: "Getting Started with AIRefine",
    description: "A comprehensive guide to using AIRefine for your content needs",
    readTime: "10 min",
    videoUrl: "https://example.com/videos/getting-started",
    icon: Sparkles
  },
  {
    id: "2",
    title: "Search and Filter Techniques",
    description: "Learn how to effectively search and filter your content to find exactly what you need",
    readTime: "8 min",
    videoUrl: "https://example.com/videos/search-filter",
    icon: Filter
  },
  {
    id: "3",
    title: "Working with Editors",
    description: "Best practices for collaborating with content editors",
    readTime: "12 min",
    videoUrl: "https://example.com/videos/editor-collaboration",
    icon: Users
  },
  {
    id: "4",
    title: "Frequently Asked Questions",
    description: "Common questions and answers about using AIRefine",
    readTime: "15 min",
    videoUrl: "https://example.com/videos/faq",
    icon: HelpCircle
  }
]

export default function BusinessGuidesPage() {
  return (
    <div className="p-8 gradient-bg min-h-screen">
      <div className="max-w-[1400px] mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold">How to Guides</h1>
          <p className="text-muted-foreground mt-2">
            Learn how to make the most of AIRefine for your business
          </p>
        </div>

        <div className="grid gap-6">
          {businessGuides.map((guide) => {
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