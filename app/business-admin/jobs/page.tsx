"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Clock } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const contentTypes = [
  "Blog Post",
  "Newsletter",
  "Product Description",
  "White Paper",
  "Case Study",
  "Social Media Post",
  "Press Release",
  "Technical Documentation",
  "Email Campaign",
  "Landing Page"
]

// Updated jobs to only include Fintech company jobs
const initialJobs = [
  {
    id: "1",
    title: "Technical Documentation Update",
    client: "Fintech Solutions",
    clientLogo: "/fintech-logo.png",
    description: "Update existing technical documentation to reflect new features and improvements",
    deadline: "2024-03-15",
    type: "Technical Documentation",
    credits: 600,
    status: "Active",
    prompt: `Create comprehensive technical documentation for our updated API endpoints. Include:
- Authentication methods
- Endpoint specifications
- Request/response examples
- Error handling
- Best practices`,
    generatedContent: "Initial content for technical documentation..."
  },
  {
    id: "2",
    title: "Product Launch Announcement",
    client: "Fintech Solutions",
    clientLogo: "/fintech-logo.png",
    description: "Create a press release for our new payment gateway solution",
    deadline: "2024-03-12",
    type: "Press Release",
    credits: 400,
    status: "In Progress",
    prompt: "Write a professional press release announcing our new payment gateway solution...",
    generatedContent: "Draft content for press release..."
  },
  {
    id: "3",
    title: "Q1 Financial Report",
    client: "Fintech Solutions",
    clientLogo: "/fintech-logo.png",
    description: "Create a detailed financial report for Q1 2024",
    deadline: "2024-04-05",
    type: "White Paper",
    credits: 750,
    status: "Pending",
    prompt: "Create a comprehensive financial report covering Q1 2024 results...",
    generatedContent: ""
  },
  {
    id: "4",
    title: "Social Media Campaign",
    client: "Fintech Solutions",
    clientLogo: "/fintech-logo.png",
    description: "Develop a series of social media posts for our upcoming webinar",
    deadline: "2024-03-20",
    type: "Social Media Post",
    credits: 350,
    status: "Active",
    prompt: "Create 10 engaging social media posts to promote our upcoming webinar on financial technology trends...",
    generatedContent: "Initial social media content drafts..."
  },
  {
    id: "5",
    title: "Email Newsletter",
    client: "Fintech Solutions",
    clientLogo: "/fintech-logo.png",
    description: "Monthly newsletter highlighting new features and industry news",
    deadline: "2024-03-25",
    type: "Newsletter",
    credits: 450,
    status: "Pending",
    prompt: "Create our monthly newsletter featuring new product updates and key industry developments...",
    generatedContent: ""
  },
  {
    id: "6",
    title: "API Integration Guide",
    client: "Fintech Solutions",
    clientLogo: "/fintech-logo.png",
    description: "Technical guide for developers integrating with our payment API",
    deadline: "2024-04-10",
    type: "Technical Documentation",
    credits: 800,
    status: "Active",
    prompt: "Develop a comprehensive developer guide for integrating with our payment processing API...",
    generatedContent: "Initial draft of integration guide..."
  }
]

export default function BusinessAdminJobsPage() {
  const router = useRouter()
  const [jobs, setJobs] = useState(initialJobs)
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [selectedJob, setSelectedJob] = useState<typeof initialJobs[0] | null>(null)
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = typeFilter === "all" || job.type === typeFilter
    
    return matchesSearch && matchesType
  })

  const handleViewDetails = (job: typeof initialJobs[0]) => {
    setSelectedJob(job)
    setShowDetailsDialog(true)
  }

  return (
    <div className="p-8 gradient-bg min-h-screen">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-4xl font-bold">Fintech Solutions Jobs</h1>
            <p className="text-muted-foreground mt-1">
              Manage all content jobs for Fintech Solutions
            </p>
          </div>
          <Button onClick={() => router.push('/business-admin/create')}>
            Create Job
          </Button>
        </div>

        <div className="bg-card rounded-xl shadow-sm border border-border mb-6">
          <div className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search jobs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-muted"
                />
              </div>
              <div className="flex gap-4">
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-[180px] bg-muted">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {contentTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-card p-6 rounded-lg border border-border hover:border-primary/50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">{job.title}</h3>
                    <Badge variant="outline" className="bg-primary/10 text-primary">
                      {job.status}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mt-2">{job.description}</p>
                </div>
                <div className="text-right">
                  <img 
                    src={job.clientLogo} 
                    alt={job.client}
                    className="h-8 w-auto object-contain mb-2"
                  />
                  <span className="text-xl font-semibold text-primary">
                    £{job.credits}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>Due: {job.deadline}</span>
                </div>
                <Badge variant="secondary">{job.type}</Badge>
              </div>

              <div className="mt-4 flex gap-2">
                <Button variant="secondary" onClick={() => handleViewDetails(job)}>
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>

        <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            {selectedJob && (
              <>
                <DialogHeader>
                  <DialogTitle>{selectedJob.title}</DialogTitle>
                </DialogHeader>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Description</h3>
                    <p className="text-muted-foreground">{selectedJob.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-1">Client</h4>
                      <p>{selectedJob.client}</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Payment</h4>
                      <p className="text-primary font-semibold">£{selectedJob.credits}</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Type</h4>
                      <p>{selectedJob.type}</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Deadline</h4>
                      <p>{selectedJob.deadline}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Prompt</h3>
                    <div className="bg-muted rounded-lg p-4">
                      <pre className="text-sm whitespace-pre-wrap font-mono">
                        {selectedJob.prompt}
                      </pre>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Generated Content</h3>
                    <div className="bg-muted rounded-lg p-4">
                      <pre className="text-sm whitespace-pre-wrap font-mono">
                        {selectedJob.generatedContent || "No content generated yet"}
                      </pre>
                    </div>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}