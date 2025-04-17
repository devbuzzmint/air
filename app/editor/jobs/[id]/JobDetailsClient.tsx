"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { format } from "date-fns"
import { Clock, DollarSign, FileText, MessageSquare, Send, AlertCircle } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

export default function JobDetailsClient({ job }: { job: any }) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("details")
  const [revisionNote, setRevisionNote] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const handleSubmitRevision = async () => {
    if (!revisionNote.trim()) {
      setError("Please add a revision note")
      return
    }

    setIsSubmitting(true)
    setError("")
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      router.push('/editor/jobs')
    } catch (error) {
      setError("Failed to submit revision. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="p-8 gradient-bg min-h-screen">
      <div className="max-w-[1400px] mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold">{job.title}</h1>
            <p className="text-muted-foreground mt-2">Client: {job.client}</p>
          </div>
          <Button variant="outline" onClick={() => router.push('/editor/jobs')}>
            Back to Jobs
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2">
            <Card className="bg-card border-border">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="p-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="details">Job Details</TabsTrigger>
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="submit">Submit Work</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="mt-6 space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3">Description</h3>
                    <p className="text-muted-foreground">{job.description}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-3">Requirements</h3>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      {job.requirements.map((req: string, index: number) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <div className="flex items-center gap-2 text-primary mb-1">
                        <DollarSign className="h-4 w-4" />
                        <span className="font-semibold">{job.credits} credits</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Payment for completion</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <div className="flex items-center gap-2 text-primary mb-1">
                        <Clock className="h-4 w-4" />
                        <span className="font-semibold">~{job.estimatedHours} hours</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Estimated time</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="content" className="mt-6">
                  <div className="bg-muted rounded-lg p-6">
                    <pre className="text-sm whitespace-pre-wrap font-mono">
                      {job.generatedContent}
                    </pre>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-3">Client Comments</h3>
                    <div className="space-y-4">
                      {job.comments.map((comment: any) => (
                        <div key={comment.id} className="p-4 bg-muted rounded-lg">
                          <p>{comment.text}</p>
                          <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                            <span>{comment.user}</span>
                            <span>•</span>
                            <span>{format(new Date(comment.timestamp), "MMM d, h:mm a")}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="submit" className="mt-6">
                  <div className="space-y-6">
                    {error && (
                      <div className="bg-destructive/10 text-destructive p-3 rounded-lg flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" />
                        <p className="text-sm">{error}</p>
                      </div>
                    )}

                    <div>
                      <h3 className="text-lg font-medium mb-3">Submit for Review</h3>
                      <p className="text-muted-foreground mb-4">
                        Add any notes or comments about your revisions before submitting.
                      </p>
                      <Textarea
                        value={revisionNote}
                        onChange={(e) => setRevisionNote(e.target.value)}
                        placeholder="Add your revision notes here..."
                        className="bg-muted min-h-[200px]"
                      />
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button variant="secondary" onClick={() => setActiveTab("content")}>
                        Back to Content
                      </Button>
                      <Button onClick={handleSubmitRevision} disabled={isSubmitting}>
                        <Send className="h-4 w-4 mr-2" />
                        {isSubmitting ? "Submitting..." : "Submit for Review"}
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-card border-border">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Job Status</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-muted-foreground mb-2">Current Status</p>
                    <Badge className={
                      job.status === "Available"
                        ? "bg-primary/20 text-primary"
                        : job.status === "In Progress"
                        ? "bg-blue-500/20 text-blue-500"
                        : "bg-green-500/20 text-green-500"
                    }>
                      {job.status}
                    </Badge>
                  </div>

                  <div>
                    <p className="text-muted-foreground mb-2">Deadline</p>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <p>{job.deadline}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="bg-card border-border">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Resources</h2>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Original Documentation
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Contact Client
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}