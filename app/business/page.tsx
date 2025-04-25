"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

const jobs = [
  {
    clientName: "Veriff",
    workType: "Blog Post",
    status: "Submitted to Network",
    deadline: "30/03/2024",
    credits: 138
  },
  {
    clientName: "London Writings Club",
    workType: "Newsletter",
    status: "Ready for Review",
    deadline: "01/02/2025",
    credits: 138
  },
  {
    clientName: "HumAI - Healthcare",
    workType: "Article",
    status: "Submitted to Network",
    deadline: "21/02/2025",
    credits: 230
  },
  {
    clientName: "APEX Lawyers",
    workType: "Brochure",
    status: "Completed",
    deadline: "23/02/2025",
    credits: 184
  },
  {
    clientName: "OBO Logistics",
    workType: "Newsletter",
    status: "With Editor",
    deadline: "01/02/2025",
    credits: 138
  },
  {
    clientName: "Simmonds Food",
    workType: "Article",
    status: "Draft",
    deadline: "26/03/2025",
    credits: 230
  }
]

export default function BusinessDashboard() {
  const totalCredits = 2500
  const remainingCredits = 1930
  const usedCredits = totalCredits - remainingCredits
  const creditPercentage = (remainingCredits / totalCredits) * 100

  // Sort jobs by deadline (closest first)
  const sortedJobs = [...jobs].sort((a, b) => {
    const dateA = new Date(a.deadline.split('/').reverse().join('-')).getTime()
    const dateB = new Date(b.deadline.split('/').reverse().join('-')).getTime()
    return dateA - dateB
  })

  return (
    <div className="p-8 gradient-bg min-h-screen">
      <div className="max-w-[1400px] mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">Hello, Jane</h1>
          <img 
            src="/fintech-logo.png" 
            alt="Fintech" 
            className="h-8"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="dark-card">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">All Jobs</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-4 text-sm text-muted-foreground pb-2">
                    <div>Client Name</div>
                    <div>Work Type</div>
                    <div>Status</div>
                    <div>Deadline</div>
                  </div>
                  {sortedJobs.map((job, i) => (
                    <div key={i} className="grid grid-cols-4 text-sm py-2 border-t border-border">
                      <div>{job.clientName}</div>
                      <div>{job.workType}</div>
                      <div>
                        <span className={`status-badge ${
                          job.status === 'Ready for Review' ? 'status-review' :
                          job.status === 'Submitted to Network' ? 'status-submitted' :
                          job.status === 'With Editor' ? 'status-with-editor' :
                          job.status === 'Draft' ? 'status-draft' :
                          'status-completed'
                        }`}>
                          {job.status}
                        </span>
                      </div>
                      <div>{job.deadline}</div>
                    </div>
                  ))}
                </div>
                <Link href="/business/jobs">
                  <Button variant="link" className="text-primary mt-4">View More</Button>
                </Link>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="dark-card">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Job Counter</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted p-4 rounded-lg text-center">
                    <div className="text-3xl font-bold text-blue-500">8</div>
                    <div className="text-sm text-muted-foreground mt-1">Open Jobs</div>
                  </div>
                  <div className="bg-muted p-4 rounded-lg text-center">
                    <div className="text-3xl font-bold text-yellow-500">3</div>
                    <div className="text-sm text-muted-foreground mt-1">Ready for Review</div>
                  </div>
                  <div className="bg-muted p-4 rounded-lg text-center">
                    <div className="text-3xl font-bold text-green-500">3</div>
                    <div className="text-sm text-muted-foreground mt-1">With Editor</div>
                  </div>
                  <div className="bg-muted p-4 rounded-lg text-center">
                    <div className="text-3xl font-bold text-gray-500">2</div>
                    <div className="text-sm text-muted-foreground mt-1">Drafts</div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="dark-card">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Monthly Credit Overview</h2>
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="relative inline-flex items-center justify-center">
                      <svg className="w-32 h-32">
                        <circle
                          className="text-muted stroke-current"
                          strokeWidth="8"
                          stroke="currentColor"
                          fill="transparent"
                          r="58"
                          cx="64"
                          cy="64"
                        />
                        <circle
                          className="text-primary stroke-current"
                          strokeWidth="8"
                          strokeLinecap="round"
                          stroke="currentColor"
                          fill="transparent"
                          r="58"
                          cx="64"
                          cy="64"
                          strokeDasharray={`${2 * Math.PI * 58}`}
                          strokeDashoffset={`${2 * Math.PI * 58 * (1 - creditPercentage / 100)}`}
                          transform="rotate(-90 64 64)"
                        />
                      </svg>
                      <div className="absolute text-center">
                        <div className="text-2xl font-bold">1930</div>
                        <div className="w-8 h-px bg-white mx-auto my-1"></div>
                        <div className="text-sm text-muted-foreground">2500</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-sm">
                      Credits renew on <span style={{ color: "#ABFF2E" }}>27/04/2025</span>
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}