"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Clock, AlertTriangle, X } from "lucide-react"
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
import { Textarea } from "@/components/ui/textarea"
import { differenceInHours, parseISO } from "date-fns"

const contentTypes = [
  "Blog Post",
  "Newsletter",
  "Video Script",
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
    title: "Video Script Series",
    client: "HSBC",
    clientLogo: "/hsbc-logo.png",
    description: "Create a series of video scripts about emerging tech trends",
    deadline: "2024-03-10",
    type: "Video Script",
    payment: 27.60,
    status: "With client",
    prompt: "Write a series of 3 video scripts covering AI, blockchain, and IoT trends...",
    generatedContent: "Draft content for video series..."
  },
  {
    id: "2",
    title: "Social Media Campaign",
    client: "SAP",
    clientLogo: "/sap-logo.png",
    description: "Create engaging social media posts for product launch",
    deadline: "2024-03-01",
    type: "Social Post",
    payment: 18.40,
    status: "To do",
    prompt: "Create a series of social media posts highlighting key features...",
    generatedContent: "Social media post drafts..."
  },
  {
    id: "3",
    title: "Technical White Paper",
    client: "Toshiba",
    clientLogo: "/toshiba-logo.png",
    description: "Create a detailed white paper on emerging semiconductor technologies",
    deadline: "2024-03-20",
    type: "White Paper",
    payment: 138.00,
    status: "Completed",
    prompt: "Write a comprehensive white paper on semiconductor advancements...",
    generatedContent: "White paper draft content..."
  },
  {
    id: "4",
    title: "Marketing Campaign Content",
    client: "Nike",
    clientLogo: "/nike-logo.png",
    description: "Create engaging content for the new product launch campaign",
    deadline: "2024-03-15",
    type: "Marketing Copy",
    payment: 92.00,
    status: "To do",
    prompt: "Write compelling marketing copy for the new product launch...",
    generatedContent: "Marketing content drafts..."
  }
]

export default function EditorJobsPage() {
  const router = useRouter()
  const [jobs, setJobs] = useState(initialJobs)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [selectedJob, setSelectedJob] = useState<typeof initialJobs[0] | null>(null)
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)
  const [showClaimDialog, setShowClaimDialog] = useState(false)
  const [showCompleteDialog, setShowCompleteDialog] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [completionForm, setCompletionForm] = useState({
    content: "",
    notes: "",
    sources: ""
  })

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || job.status === statusFilter
    const matchesType = typeFilter === "all" || job.type === typeFilter
    
    return matchesSearch && matchesStatus && matchesType
  }).sort((a, b) => {
    // Define the priority order for statuses
    const statusPriority: Record<string, number> = {
      "To do": 1,
      "With client": 2,
      "Completed": 3
    }
    
    // First sort by status priority
    const statusDiff = statusPriority[a.status] - statusPriority[b.status]
    if (statusDiff !== 0) return statusDiff
    
    // If status is the same, sort by deadline (earlier first)
    return new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "To do":
        return "bg-yellow-500/20 text-yellow-500"
      case "With client":
        return "bg-blue-500/20 text-blue-500"
      case "Completed":
        return "bg-green-500/20 text-green-500"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const isUrgent = (deadline: string) => {
    const deadlineDate = parseISO(deadline)
    const hoursRemaining = differenceInHours(deadlineDate, new Date())
    return hoursRemaining <= 24
  }

  const handleViewDetails = (job: typeof initialJobs[0]) => {
    setSelectedJob(job)
    setShowDetailsDialog(true)
  }

  const handleClaimJob = (job: typeof initialJobs[0]) => {
    setSelectedJob(job)
    setShowClaimDialog(true)
  }

  const handleCompleteJob = (job: typeof initialJobs[0]) => {
    setSelectedJob(job)
    setCompletionForm({ content: "", notes: "", sources: "" })
    setShowCompleteDialog(true)
  }

  const handleSubmitCompletion = () => {
    if (!completionForm.content.trim()) {
      setError("Please add your completed content")
      return
    }

    setShowCompleteDialog(false)
    setShowConfirmDialog(true)
  }

  const handleConfirmSubmission = async () => {
    setIsSubmitting(true)
    setError("")

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setJobs(prev => prev.map(job => 
        job.id === selectedJob?.id ? { ...job, status: "Completed" } : job
      ))
      setShowConfirmDialog(false)
    } catch (error) {
      setError("Failed to submit completion. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const confirmClaimJob = async () => {
    setIsSubmitting(true)
    setError("")

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Remove job from available jobs
      setJobs(jobs.filter(j => j.id !== selectedJob?.id))
      setShowClaimDialog(false)
      
      // Redirect to my jobs
      router.push('/editor/jobs')
    } catch (error) {
      setError("Failed to claim job. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="p-8 gradient-bg min-h-screen">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold">My Jobs</h1>
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
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="To do">To do</SelectItem>
                    <SelectItem value="With client">With client</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>

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
                    <p className="text-sm text-muted-foreground">Client: {job.client}</p>
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
                    £{job.payment.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  {isUrgent(job.deadline) ? (
                    <>
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                      <span className="text-red-500 font-medium">Due: {job.deadline}</span>
                    </>
                  ) : (
                    <>
                      <Clock className="h-4 w-4" />
                      <span>Due: {job.deadline}</span>
                    </>
                  )}
                </div>
                <Badge variant="secondary">{job.type}</Badge>
                <Badge className={getStatusColor(job.status)}>{job.status}</Badge>
              </div>

              <div className="mt-4 flex gap-2">
                <Button variant="secondary" onClick={() => handleViewDetails(job)}>
                  View Details
                </Button>
                {job.status === "Ready for Review" && (
                  <Button onClick={() => router.push(`/editor/jobs/${job.id}`)}>
                    Review Content
                  </Button>
                )}
                {job.status === "To do" && (
                  <Button 
                    onClick={() => handleCompleteJob(job)}
                    className="bg-[#ABFF2E] text-black hover:bg-[#ABFF2E]/90"
                  >
                    Work on Job
                  </Button>
                )}
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
                      <p className="text-primary font-semibold">£{selectedJob.payment.toFixed(2)}</p>
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
                        {selectedJob.generatedContent}
                      </pre>
                    </div>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        <Dialog open={showClaimDialog} onOpenChange={setShowClaimDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Claim Job</DialogTitle>
              <DialogDescription>
                Are you sure you want to claim this job? You can only have 5 active jobs at a time.
              </DialogDescription>
            </DialogHeader>

            {error && (
              <div className="bg-destructive/10 text-destructive p-3 rounded-lg">
                {error}
              </div>
            )}

            <DialogFooter>
              <Button variant="outline" onClick={() => setShowClaimDialog(false)}>
                Cancel
              </Button>
              <Button onClick={confirmClaimJob} disabled={isSubmitting}>
                {isSubmitting ? "Claiming..." : "Confirm & Claim"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={showCompleteDialog} onOpenChange={setShowCompleteDialog}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Submit & Complete Job</DialogTitle>
              <DialogDescription>
                Submit your work for client review. Please ensure all content meets the requirements.
              </DialogDescription>
            </DialogHeader>

            {error && (
              <div className="bg-destructive/10 text-destructive p-3 rounded-lg flex items-center gap-2 mb-4">
                <AlertTriangle className="h-4 w-4" />
                <p className="text-sm text-red-500">{error}</p>
              </div>
            )}

            <div className="space-y-6">
              {selectedJob && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Job Details</h3>
                  </div>
                  <div className="bg-muted p-4 rounded-lg space-y-2">
                    <p><span className="text-muted-foreground">Title:</span> {selectedJob.title}</p>
                    <p><span className="text-muted-foreground">Client:</span> {selectedJob.client}</p>
                    <p><span className="text-muted-foreground">Type:</span> {selectedJob.type}</p>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Content</h3>
                  <div className="flex gap-2">
                    <Button 
                      className="bg-[#ABFF2E] text-black hover:bg-[#ABFF2E]/90"
                      onClick={() => {
                        if (selectedJob) {
                          setCompletionForm(prev => ({
                            ...prev,
                            content: selectedJob.generatedContent
                          }))
                        }
                      }}
                    >
                      Load Original Content
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => {
                        if (selectedJob) {
                          const blob = new Blob([selectedJob.generatedContent], { type: 'text/plain' });
                          const url = window.URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = `${selectedJob.title.toLowerCase().replace(/\s+/g, '-')}-original.txt`;
                          document.body.appendChild(a);
                          a.click();
                          document.body.removeChild(a);
                          window.URL.revokeObjectURL(url);
                        }
                      }}
                    >
                      Download as .txt
                    </Button>
                  </div>
                </div>
                <Textarea
                  value={completionForm.content}
                  onChange={(e) => setCompletionForm(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Paste or type your content here..."
                  className="min-h-[200px] bg-muted"
                />
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Sources</h3>
                <Textarea
                  value={completionForm.sources}
                  onChange={(e) => setCompletionForm(prev => ({ ...prev, sources: e.target.value }))}
                  placeholder="List any sources, references, or citations used..."
                  className="min-h-[100px] bg-muted"
                />
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Notes for Client</h3>
                <Textarea
                  value={completionForm.notes}
                  onChange={(e) => setCompletionForm(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Add any notes or context for the client..."
                  className="min-h-[100px] bg-muted"
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setShowCompleteDialog(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleSubmitCompletion}
                disabled={isSubmitting}
                className="bg-[#ABFF2E] text-black hover:bg-[#ABFF2E]/90"
              >
                Submit & Complete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Submission</DialogTitle>
              <DialogDescription>
                Please review your submission carefully. Once submitted, this content will be sent to the client for final review and cannot be modified.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 my-4">
              <p className="text-muted-foreground">
                By confirming, you acknowledge that:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>The work meets all client requirements</li>
                <li>You have included all necessary sources and references</li>
                <li>The content is ready for client review</li>
              </ul>
            </div>

            {error && (
              <div className="bg-destructive/10 text-destructive p-3 rounded-lg">
                {error}
              </div>
            )}

            <DialogFooter>
              <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
                Review Again
              </Button>
              <Button 
                onClick={handleConfirmSubmission}
                disabled={isSubmitting}
                className="bg-[#ABFF2E] text-black hover:bg-[#ABFF2E]/90"
              >
                {isSubmitting ? "Submitting..." : "Confirm & Submit"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}