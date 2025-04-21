"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  CreditCard,
  FileText,
  PlusCircle,
  Receipt,
  UserPlus,
  ArrowUpRight,
  User,
  EyeIcon
} from "lucide-react"

// Mock data for job templates
const jobTemplates = [
  { id: 1, name: "API Documentation", count: 10 },
  { id: 2, name: "Financial Reports", count: 8 },
  { id: 3, name: "Marketing Content", count: 7 },
  { id: 4, name: "Technical Guides", count: 100 },
]

// Job status counts
const jobStatusCounts = [
  { status: "Submitted", count: 10, color: "bg-red-500 text-white" },
  { status: "With editor", count: 8, color: "bg-yellow-400 text-black" },
  { status: "Ready for review", count: 7, color: "bg-green-400 text-black" },
  { status: "Complete", count: 100, color: "bg-gray-500 text-white" },
]

const businessUsers = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah@fintechsolutions.com",
    role: "Content Manager",
    activeJobs: 3,
    creditsUsed: 250
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael@fintechsolutions.com",
    role: "Marketing Lead",
    activeJobs: 2,
    creditsUsed: 300
  },
  {
    id: "3",
    name: "Emma Davis",
    email: "emma@fintechsolutions.com",
    role: "Product Manager",
    activeJobs: 1,
    creditsUsed: 150
  },
  {
    id: "4",
    name: "James Wilson",
    email: "james@fintechsolutions.com",
    role: "Technical Writer",
    activeJobs: 2,
    creditsUsed: 400
  },
  {
    id: "5",
    name: "Lisa Anderson",
    email: "lisa@fintechsolutions.com",
    role: "Content Strategist",
    activeJobs: 1,
    creditsUsed: 200
  },
  {
    id: "6",
    name: "David Thompson",
    email: "david@fintechsolutions.com",
    role: "Marketing Specialist",
    activeJobs: 1,
    creditsUsed: 200
  }
]

const recentJobs = [
  {
    id: "1",
    title: "Q1 Financial Report",
    user: "Sarah Johnson",
    type: "White Paper",
    status: "In Progress",
    credits: 250
  },
  {
    id: "2",
    title: "Payment Gateway Launch",
    user: "Michael Chen",
    type: "Marketing Copy",
    status: "Review",
    credits: 300
  },
  {
    id: "3",
    title: "API Documentation",
    user: "James Wilson",
    type: "Documentation",
    status: "Completed",
    credits: 400
  },
  {
    id: "4",
    title: "Webinar Promotion",
    user: "Lisa Anderson",
    type: "Social Media",
    status: "In Progress",
    credits: 200
  },
  {
    id: "5",
    title: "Developer Guide",
    user: "Emma Davis",
    type: "Technical Writing",
    status: "Review",
    credits: 150
  },
  {
    id: "6",
    title: "Monthly Newsletter",
    user: "David Thompson",
    type: "Marketing",
    status: "In Progress",
    credits: 200
  }
]

const quickLinks = [
  {
    title: "Add User",
    href: "/business-admin/users",
    icon: UserPlus,
    color: "text-blue-500"
  },
  {
    title: "Create Job",
    href: "/business-admin/create",
    icon: PlusCircle,
    color: "text-green-500"
  },
  {
    title: "View Billing",
    href: "/business-admin/billing",
    icon: Receipt,
    color: "text-purple-500"
  }
]

export default function BusinessAdminDashboard() {
  const totalCredits = 5000
  const usedCredits = 1500 // Sum of all user credits used
  const remainingCredits = 3500 // Exactly 3500 as requested
  const creditPercentage = (usedCredits / totalCredits) * 100

  const activeJobs = businessUsers.reduce((total, user) => total + user.activeJobs, 0)

  return (
    <div className="p-8 gradient-bg min-h-screen">
      <div className="max-w-[1400px] mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold">Fintech Solutions</h1>
            <p className="text-muted-foreground mt-2">
              Business Admin Dashboard
            </p>
          </div>
          <img 
            src="/fintech-logo.png" 
            alt="Fintech Solutions Logo" 
            className="h-12"
          />
        </div>

        {/* Job Counters Section (New) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Job Types Counter */}
          <Card className="dark-card">
            <div className="p-6">
              <h3 className="font-semibold mb-4">Job Types Total Counter</h3>
              <div className="space-y-4">
                {jobTemplates.map((template) => (
                  <div key={template.id} className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-black text-white flex items-center justify-center font-bold">
                      {template.count}
                    </div>
                    <Link href={`/business-admin/jobs?template=${template.id}`} className="text-primary underline">
                      {template.name}
                    </Link>
                  </div>
                ))}
                <div className="mt-4 text-right">
                  <Link href="/business-admin/jobs">
                    <Button variant="outline" size="sm">View Jobs</Button>
                  </Link>
                </div>
              </div>
            </div>
          </Card>

          {/* Users & Spend */}
          <Card className="dark-card">
            <div className="p-6">
              <h3 className="font-semibold mb-4">Users & Spend</h3>
              <div className="space-y-4">
                {businessUsers.slice(0, 4).map((user) => (
                  <div key={user.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-black text-white flex items-center justify-center">
                        <User className="h-4 w-4" />
                      </div>
                      <span>{user.name}</span>
                    </div>
                    <span className="font-medium">{user.creditsUsed} credits</span>
                  </div>
                ))}
                <div className="mt-4 text-right">
                  <Link href="/business-admin/users">
                    <Button variant="outline" size="sm">Add/Remove</Button>
                  </Link>
                </div>
              </div>
            </div>
          </Card>

          {/* Job Status Counter */}
          <Card className="dark-card">
            <div className="p-6">
              <h3 className="font-semibold mb-4">Current Job Counter</h3>
              <div className="space-y-4">
                {jobStatusCounts.map((status, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className={`h-10 w-10 rounded-full ${status.color} flex items-center justify-center font-bold`}>
                      {status.count}
                    </div>
                    <Link href={`/business-admin/jobs?status=${status.status}`} className="text-primary underline">
                      {status.status}
                    </Link>
                  </div>
                ))}
                <div className="mt-4 text-right">
                  <Link href="/business-admin/jobs">
                    <Button variant="outline" size="sm">View Jobs</Button>
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="dark-card">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Total Users</h3>
                <Users className="h-5 w-5 text-primary" />
              </div>
              <p className="text-3xl font-bold mt-4">{businessUsers.length}</p>
              <div className="flex items-center gap-2 mt-2 text-sm">
                <ArrowUpRight className="h-4 w-4 text-green-500" />
                <span className="text-green-500">All Active</span>
                <span className="text-muted-foreground">users this month</span>
              </div>
            </div>
          </Card>

          <Card className="dark-card">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Active Jobs</h3>
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <p className="text-3xl font-bold mt-4">{activeJobs}</p>
              <div className="flex items-center gap-2 mt-2 text-sm">
                <ArrowUpRight className="h-4 w-4 text-green-500" />
                <span className="text-green-500">{recentJobs.filter(job => job.status === "In Progress").length} jobs</span>
                <span className="text-muted-foreground">in progress</span>
              </div>
            </div>
          </Card>

          <Card className="dark-card">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Credit Balance</h3>
                <CreditCard className="h-5 w-5 text-primary" />
              </div>
              <p className="text-3xl font-bold mt-4">{remainingCredits}</p>
              <div className="mt-2">
                <div className="flex items-center justify-between mb-1 text-sm">
                  <span>Used: {usedCredits}</span>
                  <span>Total: {totalCredits}</span>
                </div>
                <Progress value={creditPercentage} className="h-2" />
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickLinks.map((link, index) => (
            <Link href={link.href} key={index}>
              <Card className="dark-card h-full hover:border-primary/50 transition-colors cursor-pointer">
                <div className="p-6 flex items-center gap-4">
                  <div className={`h-12 w-12 rounded-full bg-card flex items-center justify-center ${link.color}`}>
                    <link.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{link.title}</h3>
                    <p className="text-sm text-muted-foreground">Quick access</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="dark-card">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Recent Fintech Jobs</h2>
                  <Link href="/business-admin/jobs">
                    <Button variant="outline" size="sm">View All</Button>
                  </Link>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-5 text-sm text-muted-foreground pb-2">
                    <div>Title</div>
                    <div>User</div>
                    <div>Type</div>
                    <div>Status</div>
                    <div>Credits</div>
                  </div>
                  {recentJobs.map((job) => (
                    <div key={job.id} className="grid grid-cols-5 text-sm py-2 border-t border-border">
                      <div>{job.title}</div>
                      <div>{job.user}</div>
                      <div>{job.type}</div>
                      <div>
                        <Badge
                          className={
                            job.status === "In Progress"
                              ? "bg-blue-500/20 text-blue-500"
                              : job.status === "Review"
                              ? "bg-yellow-500/20 text-yellow-500"
                              : "bg-green-500/20 text-green-500"
                          }
                        >
                          {job.status}
                        </Badge>
                      </div>
                      <div>{job.credits} credits</div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            <Card className="dark-card">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Fintech Team Members</h2>
                  <Link href="/business-admin/users">
                    <Button variant="outline" size="sm">Manage Team</Button>
                  </Link>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-5 text-sm text-muted-foreground pb-2">
                    <div>Name</div>
                    <div>Email</div>
                    <div>Role</div>
                    <div>Active Jobs</div>
                    <div>Credits Used</div>
                  </div>
                  {businessUsers.map((user) => (
                    <div key={user.id} className="grid grid-cols-5 text-sm py-2 border-t border-border">
                      <div>{user.name}</div>
                      <div>{user.email}</div>
                      <div>{user.role}</div>
                      <div>{user.activeJobs}</div>
                      <div>{user.creditsUsed} credits</div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="dark-card">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Content Stats</h2>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Technical Documentation</span>
                      <span className="font-medium">30%</span>
                    </div>
                    <Progress value={30} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Marketing Content</span>
                      <span className="font-medium">25%</span>
                    </div>
                    <Progress value={25} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Financial Reports</span>
                      <span className="font-medium">20%</span>
                    </div>
                    <Progress value={20} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Social Media</span>
                      <span className="font-medium">15%</span>
                    </div>
                    <Progress value={15} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Other</span>
                      <span className="font-medium">10%</span>
                    </div>
                    <Progress value={10} className="h-2" />
                  </div>
                </div>
              </div>
            </Card>

            <Card className="dark-card">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Activity</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <p className="text-sm">New job created by Sarah</p>
                    <span className="text-xs text-muted-foreground ml-auto">2h ago</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                    <p className="text-sm">API docs completed by James</p>
                    <span className="text-xs text-muted-foreground ml-auto">6h ago</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                    <p className="text-sm">Credit purchase approved</p>
                    <span className="text-xs text-muted-foreground ml-auto">1d ago</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                    <p className="text-sm">New user added to the team</p>
                    <span className="text-xs text-muted-foreground ml-auto">2d ago</span>
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