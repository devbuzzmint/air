"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Send } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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

const initialJobs = [
  {
    id: "1",
    title: "Digital Banking Trends Report",
    description: "Create a comprehensive report on emerging digital banking trends and their impact on the financial sector",
    status: "Draft",
    deadline: "2024-03-15",
    type: "White Paper",
    credits: 690,
    promptAnswers: {
      authorName: "Sarah Johnson, Head of Digital Innovation, FinTech Solutions",
      industry: "Digital Banking and Financial Technology",
      geographicRegion: "United Kingdom and European Markets",
      contentLanguage: "en-uk",
      trendingTopic: "The Evolution of Digital Banking: 2024 and Beyond",
      targetAudience: "C-level executives and decision-makers in traditional banking and fintech sectors",
      audienceAction: "Understand and implement emerging digital banking technologies",
      keywords: "Digital banking, fintech innovation, mobile banking, open banking, AI in finance",
      tone: "Authoritative and forward-thinking",
      audienceReaction: "Feel informed and confident about digital banking trends",
      callToAction: "Download our comprehensive digital banking implementation guide"
    },
    generatedContent: `# The Evolution of Digital Banking: 2024 and Beyond

## Executive Summary
The digital banking landscape is undergoing unprecedented transformation, driven by technological innovation, changing consumer expectations, and regulatory evolution. This comprehensive report examines the key trends shaping the future of digital banking and their implications for financial institutions.

## Key Trends and Developments

### 1. AI-Powered Banking Solutions
Artificial Intelligence is revolutionizing digital banking through:
- Personalized financial insights and recommendations
- Advanced fraud detection and security measures
- Automated customer service with sophisticated chatbots
- Predictive analytics for risk assessment

### 2. Open Banking Evolution
The maturation of open banking is creating new opportunities:
- Enhanced API ecosystems
- Third-party service integration
- Improved customer data utilization
- Innovation in payment services

### 3. Mobile-First Banking
Mobile banking continues to evolve with:
- Biometric authentication advancements
- Augmented reality features
- Voice-activated banking services
- Seamless cross-platform experiences

## Market Impact and Opportunities

### For Traditional Banks
- Digital transformation strategies
- Legacy system modernization
- Competition with digital-only banks
- Customer experience enhancement

### For FinTech Companies
- Market expansion opportunities
- Partnership potential
- Innovation acceleration
- Regulatory compliance challenges

## Future Outlook
The digital banking sector is poised for continued growth and innovation, with:
- Increased adoption of blockchain technology
- Enhanced cybersecurity measures
- Greater focus on sustainable banking
- Improved financial inclusion initiatives

## Recommendations
Financial institutions should:
1. Invest in AI and machine learning capabilities
2. Strengthen digital security infrastructure
3. Develop comprehensive mobile banking strategies
4. Foster fintech partnerships and collaborations

## Conclusion
The digital banking landscape presents both challenges and opportunities. Success will depend on institutions' ability to adapt and innovate while maintaining security and customer trust.

Download our comprehensive digital banking implementation guide to learn more about executing these strategies in your organization.`
  },
  {
    id: "2",
    title: "Investment Platform Launch",
    description: "Develop content strategy for new investment platform launch",
    status: "Submitted to Network",
    deadline: "2024-03-10",
    type: "Social Media Post",
    credits: 46,
    promptAnswers: {
      authorName: "Marketing Team, Investment Solutions",
      industry: "Investment Management",
      geographicRegion: "Global Markets",
      contentLanguage: "en-us",
      trendingTopic: "Digital Investment Platforms",
      targetAudience: "Retail investors and financial advisors",
      audienceAction: "Sign up for the platform",
      keywords: "Investment platform, digital investing, portfolio management",
      tone: "Professional and approachable",
      audienceReaction: "Feel excited about the new platform",
      callToAction: "Join the waitlist for early access"
    },
    generatedContent: "Social media campaign content..."
  },
  {
    id: "3",
    title: "API Documentation",
    description: "Write technical documentation for payment processing API",
    status: "With Editor",
    deadline: "2024-03-01",
    type: "Technical Documentation",
    credits: 230,
    prompt: "Create comprehensive API documentation covering endpoints, authentication, and integration guides...",
    generatedContent: "API documentation draft..."
  },
  {
    id: "4",
    title: "Cryptocurrency Market Analysis",
    description: "Create an in-depth analysis of cryptocurrency market trends and institutional adoption",
    status: "Ready for Review",
    deadline: "2024-03-20",
    type: "White Paper",
    credits: 690,
    prompt: "Analyze current cryptocurrency market trends and institutional investment patterns...",
    generatedContent: "Cryptocurrency analysis draft..."
  },
  {
    id: "5",
    title: "Mobile App User Guide",
    description: "Develop comprehensive user documentation for new mobile banking app",
    status: "Draft",
    deadline: "2024-03-25",
    type: "Technical Documentation",
    credits: 230,
    prompt: "Create detailed user documentation for mobile banking features...",
    generatedContent: "Mobile app documentation draft..."
  },
  {
    id: "6",
    title: "Fintech Innovation Series",
    description: "Write a series of blog posts about innovations in financial technology",
    status: "With Editor",
    deadline: "2024-03-18",
    type: "Blog Post",
    credits: 138,
    prompt: "Create engaging blog posts about fintech innovations...",
    generatedContent: "Fintech innovation blog series draft..."
  },
  {
    id: "7",
    title: "Q1 Investor Newsletter",
    description: "Create Q1 2024 newsletter highlighting company achievements and financial updates",
    status: "Completed",
    deadline: "2024-02-28",
    type: "Newsletter",
    credits: 138,
    prompt: "Develop quarterly investor newsletter content...",
    generatedContent: "Q1 newsletter content..."
  },
  {
    id: "8",
    title: "Trading Platform Features",
    description: "Update product descriptions for new trading platform features",
    status: "Ready for Review",
    deadline: "2024-03-22",
    type: "Product Description",
    credits: 92,
    prompt: "Update trading platform feature descriptions...",
    generatedContent: "Updated feature descriptions..."
  },
  {
    id: "9",
    title: "Financial Education Campaign",
    description: "Develop content strategy for financial literacy campaign",
    status: "Draft",
    deadline: "2024-04-01",
    type: "Social Media Post",
    credits: 92,
    prompt: "Create financial education content strategy...",
    generatedContent: "Financial education campaign draft..."
  },
  {
    id: "10",
    title: "Blockchain Technology Report",
    description: "Write research paper on blockchain applications in financial services",
    status: "Submitted to Network",
    deadline: "2024-03-28",
    type: "White Paper",
    credits: 690,
    prompt: "Research and analyze blockchain technology in finance...",
    generatedContent: "Blockchain technology report draft..."
  }
]

export default function BusinessJobsPage() {
  const router = useRouter()
  const [jobs, setJobs] = useState(initialJobs)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [selectedJob, setSelectedJob] = useState<typeof initialJobs[0] | null>(null)
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || job.status === statusFilter
    const matchesType = typeFilter === "all" || job.type === typeFilter
    
    return matchesSearch && matchesStatus && matchesType
  }).sort((a, b) => {
    // Define the priority order for statuses
    const statusPriority: Record<string, number> = {
      "Ready for Review": 1,
      "With Editor": 2,
      "Draft": 3,
      "Submitted to Network": 4,
      "Completed": 5
    }
    
    // First sort by status priority
    const statusDiff = statusPriority[a.status] - statusPriority[b.status]
    if (statusDiff !== 0) return statusDiff
    
    // If status is the same, sort by deadline (earlier first)
    return new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
  })

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Ready for Review":
        return "bg-yellow-500/20 text-yellow-500"
      case "Submitted to Network":
        return "bg-amber-600/20 text-amber-600"
      case "With Editor":
        return "bg-purple-500/20 text-purple-500"
      case "Draft":
        return "bg-gray-500/20 text-gray-500"
      case "Completed":
        return "bg-green-500/20 text-green-500"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const handleViewDetails = (job: typeof initialJobs[0]) => {
    setSelectedJob(job)
    setShowDetailsDialog(true)
  }

  const handleSubmitToNetwork = (jobId: string) => {
    setJobs(prev => prev.map(job => 
      job.id === jobId
        ? { ...job, status: "Submitted to Network" }
        : job
    ))
    setShowDetailsDialog(false)
  }

  return (
    <div className="p-8 gradient-bg min-h-screen">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold">My Jobs</h1>
          <Button onClick={() => router.push('/business/create')}>Create Job</Button>
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
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px] bg-muted">
                    <SelectValue placeholder="All Statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="Ready for Review">Ready for Review</SelectItem>
                    <SelectItem value="Submitted to Network">Submitted to Network</SelectItem>
                    <SelectItem value="With Editor">With Editor</SelectItem>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-[180px] bg-muted">
                    <SelectValue placeholder="All Types" />
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
                  </div>
                  <p className="text-muted-foreground mt-2">{job.description}</p>
                </div>
                <div className="text-right">
                  <img 
                    src="/fintech-logo.png" 
                    alt="Fintech" 
                    className="h-8 w-auto object-contain mb-2"
                  />
                  <span className="text-xl font-semibold text-primary">
                    {job.credits} credits
                  </span>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-6 text-sm text-muted-foreground">
                <div>Due: {job.deadline}</div>
                <Badge variant="secondary">{job.type}</Badge>
                <Badge className={getStatusStyle(job.status)}>{job.status}</Badge>
              </div>

              <div className="mt-4 flex gap-2">
                <Button variant="secondary" onClick={() => handleViewDetails(job)}>
                  View Details
                </Button>
                {job.status === "Draft" && (
                  <Button onClick={() => handleSubmitToNetwork(job.id)}>
                    <Send className="h-4 w-4 mr-2" />
                    Submit to Network
                  </Button>
                )}
                {job.status === "Ready for Review" && (
                  <Button variant="default" onClick={() => handleViewDetails(job)}>
                    Review Content
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
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
                      <h4 className="font-medium mb-1">Status</h4>
                      <Badge className={getStatusStyle(selectedJob.status)}>
                        {selectedJob.status}
                      </Badge>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Credits</h4>
                      <p className="text-primary font-semibold">
                        {selectedJob.credits} credits
                      </p>
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

                  {selectedJob.promptAnswers && (
                    <div>
                      <h3 className="text-lg font-medium mb-4">Prompt Details</h3>
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium mb-1">Author</h4>
                          <p className="text-muted-foreground">{selectedJob.promptAnswers.authorName}</p>
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">Industry</h4>
                          <p className="text-muted-foreground">{selectedJob.promptAnswers.industry}</p>
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">Region</h4>
                          <p className="text-muted-foreground">{selectedJob.promptAnswers.geographicRegion}</p>
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">Language</h4>
                          <p className="text-muted-foreground">
                            {selectedJob.promptAnswers.contentLanguage === 'en-uk' ? 'English (UK)' : 'English (US)'}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">Topic</h4>
                          <p className="text-muted-foreground">{selectedJob.promptAnswers.trendingTopic}</p>
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">Target Audience</h4>
                          <p className="text-muted-foreground">{selectedJob.promptAnswers.targetAudience}</p>
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">Desired Action</h4>
                          <p className="text-muted-foreground">{selectedJob.promptAnswers.audienceAction}</p>
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">Keywords</h4>
                          <p className="text-muted-foreground">{selectedJob.promptAnswers.keywords}</p>
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">Tone</h4>
                          <p className="text-muted-foreground">{selectedJob.promptAnswers.tone}</p>
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">Desired Reaction</h4>
                          <p className="text-muted-foreground">{selectedJob.promptAnswers.audienceReaction}</p>
                        </div>
                        <div className="col-span-2">
                          <h4 className="font-medium mb-1">Call to Action</h4>
                          <p className="text-muted-foreground">{selectedJob.promptAnswers.callToAction}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div>
                    <h3 className="text-lg font-medium mb-2">Generated Content</h3>
                    <div className="bg-muted rounded-lg p-6">
                      <div className="prose prose-invert max-w-none">
                        <pre className="text-sm whitespace-pre-wrap font-mono">
                          {selectedJob.generatedContent}
                        </pre>
                      </div>
                    </div>
                  </div>

                  {selectedJob.status === "Draft" && (
                    <div className="flex justify-end">
                      <Button onClick={() => handleSubmitToNetwork(selectedJob.id)}>
                        <Send className="h-4 w-4 mr-2" />
                        Submit to Network
                      </Button>
                    </div>
                  )}
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}