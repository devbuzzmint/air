"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const availableJobs = [
  {
    clientName: "Quantum Technologies",
    workType: "Technical Blog",
    status: "New",
    deadline: "15/04/2025",
    payment: 27.60
  },
  {
    clientName: "Green Earth Initiative",
    workType: "Newsletter",
    status: "New",
    deadline: "18/04/2025",
    payment: 27.60
  },
  {
    clientName: "Metro Finance",
    workType: "White Paper",
    status: "New",
    deadline: "20/04/2025",
    payment: 138.00
  }
]

const myJobs = [
  {
    clientName: "London Writings Club",
    workType: "Newsletter",
    status: "To do",
    deadline: "01/02/2025",
    payment: 27.60
  },
  {
    clientName: "HumAI - Healthcare",
    workType: "Article",
    status: "With client",
    deadline: "21/02/2025",
    payment: 46.00
  },
  {
    clientName: "APEX Lawyers",
    workType: "Social Post",
    status: "To do",
    deadline: "23/02/2025",
    payment: 9.20
  },
  {
    clientName: "OBO Logistics",
    workType: "Newsletter",
    status: "Completed",
    deadline: "01/02/2025",
    payment: 27.60
  },
  {
    clientName: "Simmonds Food",
    workType: "Article",
    status: "Completed",
    deadline: "26/03/2025",
    payment: 46.00
  }
]

const earnings = [
  {
    month: "March 2025",
    amount: "2,340",
    status: "Completed"
  },
  {
    month: "February 2025",
    amount: "3,120",
    status: "Completed"
  },
  {
    month: "January 2025",
    amount: "2,860",
    status: "Completed"
  }
]

export default function EditorDashboard() {
  return (
    <div className="p-8 gradient-bg min-h-screen">
      <div className="max-w-[1400px] mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold">Hello, Tom</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="dark-card">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Available Jobs</h2>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-4 text-sm text-muted-foreground pb-2">
                    <div>Client Name</div>
                    <div>Work Type</div>
                    <div>Status</div>
                    <div>Deadline</div>
                  </div>
                  {availableJobs.map((job, i) => (
                    <div key={i} className="grid grid-cols-4 text-sm py-2 border-t border-border">
                      <div>{job.clientName}</div>
                      <div>{job.workType}</div>
                      <div>
                        <span className="status-badge bg-pink-500/20 text-pink-500">
                          {job.status}
                        </span>
                      </div>
                      <div>{job.deadline}</div>
                    </div>
                  ))}
                </div>
                <Link href="/search">
                  <Button variant="link" className="text-primary mt-4">View More</Button>
                </Link>
              </div>
            </Card>

            <Card className="dark-card">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">My Jobs</h2>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-4 text-sm text-muted-foreground pb-2">
                    <div>Client Name</div>
                    <div>Work Type</div>
                    <div>Status</div>
                    <div>Deadline</div>
                  </div>
                  {myJobs.map((job, i) => (
                    <div key={i} className="grid grid-cols-4 text-sm py-2 border-t border-border">
                      <div>{job.clientName}</div>
                      <div>{job.workType}</div>
                      <div>
                        <span className={`status-badge ${
                          job.status === 'To do' ? 'bg-yellow-500/20 text-yellow-500' :
                          job.status === 'With client' ? 'bg-blue-500/20 text-blue-500' :
                          'bg-green-500/20 text-green-500'
                        }`}>
                          {job.status}
                        </span>
                      </div>
                      <div>{job.deadline}</div>
                    </div>
                  ))}
                </div>
                <Link href="/editor/jobs">
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
                    <div className="text-3xl font-bold text-yellow-500">6</div>
                    <div className="text-sm text-muted-foreground mt-1">Open Jobs</div>
                  </div>
                  <div className="bg-muted p-4 rounded-lg text-center">
                    <div className="text-3xl font-bold text-yellow-500">3</div>
                    <div className="text-sm text-muted-foreground mt-1">To do</div>
                  </div>
                  <div className="bg-muted p-4 rounded-lg text-center">
                    <div className="text-3xl font-bold text-blue-500">3</div>
                    <div className="text-sm text-muted-foreground mt-1">With client</div>
                  </div>
                  <div className="bg-muted p-4 rounded-lg text-center">
                    <div className="text-3xl font-bold text-green-500">1</div>
                    <div className="text-sm text-muted-foreground mt-1">Completed</div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="dark-card">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">My Earnings</h2>
                <div className="space-y-4">
                  {earnings.map((earning, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-t border-border">
                      <div className="text-sm">{earning.month}</div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">£{earning.amount}</span>
                        <span className="status-badge bg-green-500/20 text-green-500">
                          {earning.status}
                        </span>
                      </div>
                    </div>
                  ))}
                  <div className="pt-4 border-t border-border">
                    <div className="flex justify-between items-center">
                      <div className="font-medium">Total Earnings</div>
                      <div className="text-xl font-bold">£12,560</div>
                    </div>
                  </div>
                  <Link href="/editor/earnings">
                    <Button variant="link" className="text-primary">View More</Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}