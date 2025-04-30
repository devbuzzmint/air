"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Clock, Send } from "lucide-react"
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
    id: "7",
    title: "Business Fraud Article",
    client: "Veriff",
    clientLogo: "/veriff-logo.png",
    description: "Essential steps for financial services SMBs to protect against business fraud",
    deadline: "2024-03-30",
    type: "Blog Post",
    credits: 138,
    status: "For Review",
    prompt: "Create an informative article about business fraud protection for financial services SMBs",
    generatedContent: `# Business Fraud Protection: 3 Essential Steps Every Financial Services SMB Must Take Now

By Chris Hooper, Brand Director, Veriff

A few weeks ago, I spoke with a small business owner who runs a boutique financial services firm in Chicago. He was visibly shaken. Overnight, a fraudster had accessed his client portal and impersonated a customer, and initiated a bogus transaction. "We thought we were covered," he told me. "We had two-factor authentication and encrypted data. But it wasn't enough."

Stories like his are becoming all too common. According to the FBI's Internet Crime Report, U.S. businesses lost over $10 billion to cybercrime in 2022, with small and midsize businesses (SMBs) being particularly vulnerable. And the financial services space? A prime target.

This article is a wake-up call for SMBs in financial services. Business fraud protection isn't just a nice-to-have; it's a must-have. Here are three key steps every SMB should take to reduce their risk and reclaim control.

1. Know Who You're Dealing With: Upgrade Your Identity Verification

"At Veriff, we believe knowing your customer isn't just about compliance—it's your first line of defense against fraud," says Chris Hooper, Brand Director at Veriff.

For too many SMBs, identity verification is a static process done at onboarding. But today's fraudsters are sophisticated. They use deepfakes, stolen credentials, and synthetic identities to sneak past legacy systems. If your ID checks are outdated, they're not protecting you.

Modern business fraud protection starts with dynamic, AI-powered identity verification. Look for solutions that can:

- Detect deepfake videos and manipulated images
- Verify documents in real time
- Match faces to ID with biometric precision

This isn't about slowing down your onboarding process—it's about building trust at speed.

2. Think Like a Fraudster: Run a Digital Risk Audit

Online fraud doesn't happen by accident. It happens when we leave gaps in our digital armour. One of the smartest things a business leader can do is take a step back and assess their vulnerabilities.

Start by asking:`
  },
  {
    id: "1",
    title: "API Documentation",
    client: "Fintech",
    clientLogo: "/fintech-logo.png",
    description: "Write technical documentation for payment processing API",
    deadline: "2024-03-01",
    type: "Technical Documentation",
    credits: 1500,
    status: "With Editor",
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
    title: "Investment Platform Launch",
    client: "Fintech",
    clientLogo: "/fintech-logo.png",
    description: "Develop content strategy for new investment platform launch",
    deadline: "2024-03-10",
    type: "Social Media Post",
    credits: 800,
    status: "Submitted to Network",
    prompt: "Write a professional press release announcing our new payment gateway solution...",
    generatedContent: "Draft content for press release..."
  },
  {
    id: "3",
    title: "Digital Banking Trends Report",
    client: "Fintech",
    clientLogo: "/fintech-logo.png",
    description: "Create a comprehensive report on emerging digital banking trends and their impact on the financial sector",
    deadline: "2024-03-15",
    type: "White Paper",
    credits: 1200,
    status: "Draft",
    prompt: "Create a comprehensive financial report covering Q1 2024 results...",
    generatedContent: ""
  },
  {
    id: "4",
    title: "Social Media Campaign",
    client: "Fintech",
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
    client: "Fintech",
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
    client: "Fintech",
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
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedJob, setSelectedJob] = useState<typeof initialJobs[0] | null>(null)
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = typeFilter === "all" || job.type === typeFilter
    const matchesStatus = statusFilter === "all" || job.status === statusFilter
    
    return matchesSearch && matchesType && matchesStatus
  })

  const handleViewDetails = (job: typeof initialJobs[0]) => {
    setSelectedJob(job)
    setShowDetailsDialog(true)
  }

  return (
    <div className="p-8 bg-[#070c1c] min-h-screen">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-4xl font-bold text-white">My Jobs</h1>
          </div>
          <Button className="bg-[#c1ff00] hover:bg-[#b2ee00] text-black font-semibold">
            Create Job
          </Button>
        </div>

        <div className="bg-[#1a1e37] rounded-xl shadow-sm border border-[#282f52] mb-6">
          <div className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search jobs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-[#131729] border-[#282f52]"
                />
              </div>
              <div className="flex gap-4">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px] bg-[#131729] border-[#282f52]">
                    <SelectValue placeholder="All Statuses" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1e37] border-[#282f52]">
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Submitted to Network">Submitted to Network</SelectItem>
                    <SelectItem value="With Editor">With Editor</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-[180px] bg-[#131729] border-[#282f52]">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1e37] border-[#282f52]">
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
              className="bg-[#1a1e37] p-6 rounded-lg border border-[#282f52] hover:border-[#c1ff00]/50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg text-white">{job.title}</h3>
                    <Badge variant={job.status === "Submitted to Network" ? "secondary" : 
                           job.status === "Draft" ? "outline" : 
                           job.status === "With Editor" ? "secondary" : "outline"} 
                           className={`${job.status === "Submitted to Network" ? "bg-orange-500/20 text-orange-400" : 
                                        job.status === "Draft" ? "bg-blue-500/20 text-blue-400" :
                                        job.status === "With Editor" ? "bg-purple-500/20 text-purple-400" : 
                                        "bg-primary/10 text-primary"}`}>
                      {job.status}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mt-2">{job.description}</p>
                </div>
                <div className="text-right">
                  <img 
                    src="/fintech-logo.png" 
                    alt="Fintech" 
                    className="h-8 w-auto object-contain mb-2"
                  />
                </div>
              </div>

              <div className="mt-4 flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>Due: {job.deadline}</span>
                </div>
                <Badge variant="secondary" className="bg-[#282f52] text-gray-300">{job.type}</Badge>
              </div>

              <div className="mt-4 flex gap-2">
                <Button variant="outline" className="border-[#282f52] hover:bg-[#282f52] text-white" 
                  onClick={() => handleViewDetails(job)}>
                  View Details
                </Button>
                {job.status === "Draft" && (
                  <Button className="bg-[#c1ff00] hover:bg-[#b2ee00] text-black font-semibold">
                    <Send className="h-4 w-4 mr-2" /> Submit to Network
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto bg-[#1a1e37] border-[#282f52] text-white">
            {selectedJob && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-white">{selectedJob.title}</DialogTitle>
                </DialogHeader>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2 text-white">Description</h3>
                    <p className="text-muted-foreground">{selectedJob.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-1 text-gray-300">Client</h4>
                      <p className="text-white">{selectedJob.client}</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1 text-gray-300">Payment</h4>
                      <p className="text-[#c1ff00] font-semibold">{selectedJob.credits} credits</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1 text-gray-300">Type</h4>
                      <p className="text-white">{selectedJob.type}</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1 text-gray-300">Deadline</h4>
                      <p className="text-white">{selectedJob.deadline}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2 text-white">Prompt</h3>
                    <div className="bg-[#131729] rounded-lg p-4">
                      <pre className="text-sm whitespace-pre-wrap font-mono text-gray-300">
                        {selectedJob.prompt}
                      </pre>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2 text-white">Generated Content</h3>
                    <div className="bg-[#131729] rounded-lg p-4">
                      <pre className="text-sm whitespace-pre-wrap font-mono text-gray-300">
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