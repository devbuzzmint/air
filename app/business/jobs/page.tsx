"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Send, ThumbsUp, ThumbsDown, MessageSquare, RefreshCw } from "lucide-react"
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
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import confetti from 'canvas-confetti'

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
    id: "8",
    title: "Business Fraud Article",
    description: "Essential steps for financial services SMBs to protect against business fraud",
    status: "Submitted to Network",
    deadline: "2024-03-30",
    type: "Blog Post",
    credits: 138,
    promptAnswers: {
      authorName: "Chris Hooper, Brand Director, Veriff",
      industry: "Financial Services Security",
      geographicRegion: "Global",
      contentLanguage: "en-us",
      trendingTopic: "Business Fraud Protection",
      targetAudience: "Financial services SMBs and security decision-makers",
      audienceAction: "Implement enhanced fraud protection measures",
      keywords: "fraud protection, identity verification, financial security, SMB security",
      tone: "Authoritative and informative",
      audienceReaction: "Feel empowered to take action against fraud",
      callToAction: "Upgrade your fraud protection measures today"
    },
    generatedContent: `# Business Fraud Protection: 3 Essential Steps Every Financial Services SMB Must Take Now\n\nA few weeks ago, I spoke with a small business owner who runs a boutique financial services firm in Chicago. He was visibly shaken. Overnight, a fraudster had accessed his client portal and impersonated a customer, and initiated a bogus transaction. \"We thought we were covered,\" he told me. \"We had two-factor authentication and encrypted data. But it wasn't enough.\"\n\nStories like his are becoming all too common. According to the FBI's Internet Crime Report, U.S. businesses lost over $10 billion to cybercrime in 2022, with small and midsize businesses (SMBs) being particularly vulnerable. And the financial services space? A prime target.\n\nThis article is a wake-up call for SMBs in financial services. Business fraud protection isn't just a nice-to-have; it's a must-have. Here are three key steps every SMB should take to reduce their risk and reclaim control.\n\n1. Know Who You're Dealing With: Upgrade Your Identity Verification\n\nFor too many SMBs, identity verification is a static process done at onboarding. But today's fraudsters are sophisticated. They use deepfakes, stolen credentials, and synthetic identities to sneak past legacy systems. If your ID checks are outdated, they're not protecting you.\n\nModern business fraud protection starts with dynamic, AI-powered identity verification. Look for solutions that can:\n\n- Detect deepfake videos and manipulated images\n- Verify documents in real time\n- Match faces to ID with biometric precision\n\nThis isn't about slowing down your onboarding process—it's about building trust at speed.\n\n2. Think Like a Fraudster: Run a Digital Risk Audit\n\nOnline fraud doesn't happen by accident. It happens when we leave gaps in our digital armour. One of the smartest things a business leader can do is take a step back and assess their vulnerabilities.\n\nStart by asking:`
  },
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
    generatedContent: `# The Evolution of Cryptocurrency Markets: A 2024 Analysis

By Sarah Chen, Head of Digital Assets Research

> "The cryptocurrency market is no longer just about retail traders - it's becoming an integral part of institutional investment strategies." - BlackRock CEO Larry Fink

## Market Overview

According to **recent data from CoinGecko**, the global cryptocurrency market cap reached **$2.1 trillion in January 2024**, marking a significant recovery from the previous year. This resurgence has been driven by several key factors:

• Increased institutional adoption, with **over $20 billion** in Bitcoin ETF inflows
• Growing regulatory clarity across major markets
• Enhanced infrastructure for institutional investors
• Rising corporate treasury investments

## Key Market Developments

### Institutional Adoption

The landscape of cryptocurrency investment has evolved dramatically. Consider these developments:

• **78% of institutional investors** now view cryptocurrencies as a legitimate asset class
• Traditional banks have expanded their digital asset services by **156% since 2022**
• Corporate treasury holdings of Bitcoin increased by **200% year-over-year**

> "2024 marks a turning point where digital assets have become too significant for major financial institutions to ignore." - Goldman Sachs Digital Assets Report

### Regulatory Progress

Significant strides have been made in regulatory frameworks:

• The SEC's approval of spot Bitcoin ETFs
• EU's comprehensive MiCA regulation implementation
• Enhanced clarity on stablecoin regulations
• Standardized reporting requirements for crypto exchanges

## Market Trends and Analysis

### Current Market Dynamics

The market has shown several notable trends:

• **Institutional trading volumes up 245%** [Source: Coinbase Institutional](https://institutional.coinbase.com)
• DeFi protocols reaching **$48 billion in TVL**
• Layer 2 solutions processing **over 2 million transactions daily**
• Stablecoin market cap exceeding **$100 billion**

### Investment Flows

We're seeing significant shifts in investment patterns:

• ETF products attracting **$4.2 billion in Q1 2024**
• Institutional derivatives trading volume up **167%**
• Corporate treasury allocations increasing by **2.3x**

> "The integration of digital assets into traditional finance is happening faster than anyone anticipated." - Christine Lagarde, ECB President

## Future Outlook

Several key trends are likely to shape the market:

• Further institutional adoption through regulated products
• Enhanced infrastructure for institutional custody
• Continued regulatory clarity across major jurisdictions
• Integration with traditional finance systems

### Key Opportunities

Investors should watch for:

• Emerging regulatory frameworks in key markets
• New institutional-grade products and services
• Infrastructure development opportunities
• Strategic partnership possibilities

## Conclusion

The cryptocurrency market has entered a new phase of maturity, characterized by:

• Robust institutional participation
• Clearer regulatory frameworks
• Enhanced market infrastructure
• Growing mainstream adoption

[View detailed market data on CoinGecko](https://www.coingecko.com)
[Read the full BlackRock report](https://www.blackrock.com/digital-assets)
[Explore institutional insights](https://www.coinbase.com/institutional)`
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
  const [showReviewDialog, setShowReviewDialog] = useState(false)
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false)
  const [feedbackMessage, setFeedbackMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isApproved, setIsApproved] = useState(false)
  const [showFeedbackInput, setShowFeedbackInput] = useState(false)

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || job.status === statusFilter
    const matchesType = typeFilter === "all" || job.type === typeFilter
    
    return matchesSearch && matchesStatus && matchesType
  }).sort((a, b) => {
    // Prioritize Business Fraud Article
    if (a.title === "Business Fraud Article") return -1
    if (b.title === "Business Fraud Article") return 1
    
    // Then sort by status priority
    const statusPriority: Record<string, number> = {
      "Ready for Review": 1,
      "Submitted to Network": 2,
      "With Editor": 3,
      "Draft": 4,
      "Completed": 5
    }
    
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

  const handleViewDetails = (job: typeof jobs[0]) => {
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

  const handleReviewContent = (job: typeof jobs[0]) => {
    setSelectedJob(job)
    setShowReviewDialog(true)
  }

  const handleFeedback = (isPositive: boolean) => {
    if (isPositive) {
      setIsApproved(true)
    } else {
      setShowFeedbackDialog(true)
    }
  }

  const handleReviewDialogChange = (open: boolean) => {
    if (!open) {
      setIsApproved(false)
    }
    setShowReviewDialog(open)
  }

  const handleSubmitFeedback = async () => {
    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      setShowFeedbackDialog(false)
      setShowReviewDialog(false)
      setFeedbackMessage("")
      // You could add a success toast here
    } catch (error) {
      // Handle error
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCompleteJob = async () => {
    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      // Update job status to completed
      setJobs(prev => prev.map(job => 
        job.id === selectedJob?.id ? { ...job, status: "Completed" } : job
      ))
      setShowReviewDialog(false)
      // You could add a success toast here
    } catch (error) {
      // Handle error
    } finally {
      setIsSubmitting(false)
    }
  }

  // Function to trigger confetti
  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    })
  }

  // Function to download content
  const downloadContent = () => {
    if (!selectedJob) return
    
    const element = document.createElement("a")
    const file = new Blob([selectedJob.generatedContent], {type: 'text/plain'})
    element.href = URL.createObjectURL(file)
    element.download = `${selectedJob.title.replace(/\s+/g, '-').toLowerCase()}.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const handleCompleteAndDownload = async () => {
    setIsSubmitting(true)
    try {
      await handleCompleteJob()
      downloadContent()
      triggerConfetti()
      setTimeout(() => {
        setShowReviewDialog(false)
      }, 1000)
    } catch (error) {
      console.error('Error completing job:', error)
    } finally {
      setIsSubmitting(false)
    }
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
                  <Button variant="default" onClick={() => handleReviewContent(job)}>
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
                        <div className="text-white space-y-6">
                          {selectedJob?.generatedContent.split('\n\n').map((paragraph, index) => {
                            // Main heading
                            if (paragraph.startsWith('# ')) {
                              return (
                                <h1 key={index} className="text-2xl font-bold text-[#c1ff00] mb-6 border-b border-[#282f52] pb-4">
                                  {paragraph.replace('# ', '')}
                                </h1>
                              )
                            }
                            // Subheading
                            if (paragraph.startsWith('## ')) {
                              return (
                                <h2 key={index} className="text-xl font-semibold text-[#c1ff00] mb-4">
                                  {paragraph.replace('## ', '')}
                                </h2>
                              )
                            }
                            // Subheading level 3
                            if (paragraph.startsWith('### ')) {
                              return (
                                <h3 key={index} className="text-lg font-semibold text-[#c1ff00] mb-3">
                                  {paragraph.replace('### ', '')}
                                </h3>
                              )
                            }
                            // Pull quotes
                            if (paragraph.startsWith('> ')) {
                              return (
                                <blockquote key={index} className="border-l-4 border-[#c1ff00] pl-4 my-6 bg-[#0f1320] p-6 rounded-r">
                                  <p className="italic text-[#c1ff00] text-lg mb-2">
                                    {paragraph.replace('> ', '')}
                                  </p>
                                </blockquote>
                              )
                            }
                            // Bullet points
                            if (paragraph.startsWith('• ')) {
                              return (
                                <ul key={index} className="space-y-3 my-4 ml-4">
                                  {paragraph.split('\n• ').map((item, itemIndex) => (
                                    <li key={itemIndex} className="text-white flex items-start">
                                      <span className="text-[#c1ff00] mr-2 text-xl">•</span>
                                      <span className="text-gray-300" dangerouslySetInnerHTML={{ 
                                        __html: item.replace('• ', '')
                                          .replace(/\*\*(.*?)\*\*/g, '<span class="font-bold text-white">$1</span>')
                                          .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-[#c1ff00] hover:underline">$1</a>')
                                      }} />
                                    </li>
                                  ))}
                                </ul>
                              )
                            }
                            // Regular paragraph with bold and links
                            return (
                              <p key={index} className="text-gray-300 leading-relaxed mb-4" dangerouslySetInnerHTML={{ 
                                __html: paragraph
                                  .replace(/\*\*(.*?)\*\*/g, '<span class="font-bold text-white">$1</span>')
                                  .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-[#c1ff00] hover:underline">$1</a>')
                              }} />
                            )
                          })}
                        </div>
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

        <Dialog open={showReviewDialog} onOpenChange={handleReviewDialogChange}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Content for Review</DialogTitle>
              <DialogDescription>
                Please review the content and provide your feedback
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col h-full">
              {/* Scrollable content area with fixed height */}
              <div className="relative my-4">
                <div className="bg-muted p-6 rounded-lg overflow-y-auto max-h-[60vh]">
                  <div className="prose prose-invert max-w-none">
                    <div className="text-white space-y-6">
                      {selectedJob?.generatedContent.split('\n\n').map((paragraph, index) => {
                        // Main heading
                        if (paragraph.startsWith('# ')) {
                          return (
                            <h1 key={index} className="text-2xl font-bold text-[#c1ff00] mb-6 border-b border-[#282f52] pb-4">
                              {paragraph.replace('# ', '')}
                            </h1>
                          )
                        }
                        // Subheading
                        if (paragraph.startsWith('## ')) {
                          return (
                            <h2 key={index} className="text-xl font-semibold text-[#c1ff00] mb-4">
                              {paragraph.replace('## ', '')}
                            </h2>
                          )
                        }
                        // Subheading level 3
                        if (paragraph.startsWith('### ')) {
                          return (
                            <h3 key={index} className="text-lg font-semibold text-[#c1ff00] mb-3">
                              {paragraph.replace('### ', '')}
                            </h3>
                          )
                        }
                        // Pull quotes
                        if (paragraph.startsWith('> ')) {
                          return (
                            <blockquote key={index} className="border-l-4 border-[#c1ff00] pl-4 my-6 bg-[#0f1320] p-6 rounded-r">
                              <p className="italic text-[#c1ff00] text-lg mb-2">
                                {paragraph.replace('> ', '')}
                              </p>
                            </blockquote>
                          )
                        }
                        // Bullet points
                        if (paragraph.startsWith('• ')) {
                          return (
                            <ul key={index} className="space-y-3 my-4 ml-4">
                              {paragraph.split('\n• ').map((item, itemIndex) => (
                                <li key={itemIndex} className="text-white flex items-start">
                                  <span className="text-[#c1ff00] mr-2 text-xl">•</span>
                                  <span className="text-gray-300" dangerouslySetInnerHTML={{ 
                                    __html: item.replace('• ', '')
                                      .replace(/\*\*(.*?)\*\*/g, '<span class="font-bold text-white">$1</span>')
                                      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-[#c1ff00] hover:underline">$1</a>')
                                  }} />
                                </li>
                              ))}
                            </ul>
                          )
                        }
                        // Regular paragraph with bold and links
                        return (
                          <p key={index} className="text-gray-300 leading-relaxed mb-4" dangerouslySetInnerHTML={{ 
                            __html: paragraph
                              .replace(/\*\*(.*?)\*\*/g, '<span class="font-bold text-white">$1</span>')
                              .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-[#c1ff00] hover:underline">$1</a>')
                          }} />
                        )
                      })}
                    </div>
                  </div>
                </div>

                {/* Feedback input area as overlay */}
                {showFeedbackInput && (
                  <div className="absolute bottom-0 left-0 right-0 bg-[#0f1320] p-6 rounded-lg border border-[#282f52] shadow-xl">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold mb-2 text-white">Send Feedback to Account Manager</h3>
                      <p className="text-muted-foreground text-sm">
                        Please provide details about why the content needs revision
                      </p>
                    </div>
                    <Textarea
                      placeholder="Enter your feedback here..."
                      value={feedbackMessage}
                      onChange={(e) => setFeedbackMessage(e.target.value)}
                      className="min-h-[100px] bg-[#131729] border-[#282f52] focus:border-[#c1ff00]"
                    />
                  </div>
                )}
              </div>

              {/* Fixed buttons at bottom */}
              <div className="border-t border-border pt-4 mt-2 space-y-4">
                <div className="flex justify-center gap-4">
                  <Button
                    variant={isApproved ? "default" : "outline"}
                    size="lg"
                    className={`w-32 ${isApproved ? "bg-[#ABFF2E] text-black hover:bg-[#ABFF2E]/90" : ""}`}
                    onClick={() => {
                      setIsApproved(!isApproved)
                      setShowFeedbackInput(false)
                      setFeedbackMessage("")
                    }}
                  >
                    <ThumbsUp className={`mr-2 h-5 w-5 ${isApproved ? "fill-current" : ""}`} />
                    Approve
                  </Button>
                  <Button
                    variant={showFeedbackInput ? "default" : "outline"}
                    size="lg"
                    className="w-32"
                    onClick={() => {
                      setShowFeedbackInput(!showFeedbackInput)
                      setIsApproved(false)
                    }}
                  >
                    <ThumbsDown className="mr-2 h-5 w-5" />
                    Reject
                  </Button>
                </div>

                <div className="flex justify-center">
                  <Button 
                    className="bg-[#ABFF2E] text-black hover:bg-[#ABFF2E]/90 w-64"
                    onClick={handleCompleteAndDownload}
                    disabled={(!isApproved && !feedbackMessage) || isSubmitting}
                  >
                    {isSubmitting ? (
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="mr-2 h-4 w-4" />
                    )}
                    Complete and Download
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={showFeedbackDialog} onOpenChange={setShowFeedbackDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Send Feedback to Account Manager</DialogTitle>
              <DialogDescription>
                Please provide details about why the content needs revision
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 my-4">
              <Textarea
                placeholder="Enter your feedback here..."
                value={feedbackMessage}
                onChange={(e) => setFeedbackMessage(e.target.value)}
                className="min-h-[150px]"
              />
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowFeedbackDialog(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmitFeedback}
                disabled={isSubmitting || !feedbackMessage.trim()}
              >
                Send Feedback
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}