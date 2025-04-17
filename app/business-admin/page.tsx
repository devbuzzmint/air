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
  ArrowUpRight
} from "lucide-react"

const businessUsers = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah@company.com",
    role: "Content Manager",
    activeJobs: 3,
    creditsUsed: 250
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael@company.com",
    role: "Marketing Lead",
    activeJobs: 2,
    creditsUsed: 300
  },
  {
    id: "3",
    name: "Emma Davis",
    email: "emma@company.com",
    role: "Product Manager",
    activeJobs: 1,
    creditsUsed: 150
  },
  {
    id: "4",
    name: "James Wilson",
    email: "james@company.com",
    role: "Technical Writer",
    activeJobs: 2,
    creditsUsed: 400
  },
  {
    id: "5",
    name: "Lisa Anderson",
    email: "lisa@company.com",
    role: "Content Strategist",
    activeJobs: 1,
    creditsUsed: 200
  },
  {
    id: "6",
    name: "David Thompson",
    email: "david@company.com",
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
    title: "Product Launch Campaign",
    user: "Michael Chen",
    type: "Marketing Copy",
    status: "Review",
    credits: 300
  },
  {
    id: "3",
    title: "Technical Documentation",
    user: "James Wilson",
    type: "Documentation",
    status: "Completed",
    credits: 400
  },
  {
    id: "4",
    title: "Social Media Strategy",
    user: "Lisa Anderson",
    type: "Social Media",
    status: "In Progress",
    credits: 200
  },
  {
    id: "5",
    title: "API Documentation",
    user: "Emma Davis",
    type: "Technical Writing",
    status: "Review",
    credits: 150
  },
  {
    id: "6",
    title: "Email Campaign",
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
            <h1 className="text-4xl font-bold">Business Admin Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Manage your business users, jobs, and credits
            </p>
          </div>
          <img 
            src="/fintech-logo.png" 
            alt="Company Logo" 
            className="h-8"
          />
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
                <h3 className="font-semibold">Credits Overview</h3>
                <CreditCard className="h-5 w-5 text-primary" />
              </div>
              <p className="text-3xl font-bold mt-4">£{remainingCredits}</p>
              <div className="mt-2">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Usage</span>
                  <span>£{usedCredits}/£{totalCredits}</span>
                </div>
                <Progress value={creditPercentage} className="h-2" />
              </div>
              <Link href="/business-admin/credits">
                <Button variant="link" className="text-primary p-0 mt-4">
                  Manage Credits
                </Button>
              </Link>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="dark-card">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Recent Jobs</h2>
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
                      <div>£{job.credits}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            <Card className="dark-card">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Business Users</h2>
                  <Link href="/business-admin/users">
                    <Button variant="outline" size="sm">Manage Users</Button>
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
                      <div>£{user.creditsUsed}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="dark-card">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
                <div className="space-y-3">
                  {quickLinks.map((link) => (
                    <Link key={link.title} href={link.href}>
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors">
                        <div className={`p-2 rounded-lg bg-card ${link.color}`}>
                          <link.icon className="h-4 w-4" />
                        </div>
                        <span className="font-medium">{link.title}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </Card>

            <Card className="dark-card">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Credit Usage</h2>
                <div className="space-y-4">
                  <div className="bg-muted p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">This Month</span>
                      <span className="font-medium">£850</span>
                    </div>
                    <Progress value={75} className="h-1" />
                  </div>
                  <div className="bg-muted p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">Last Month</span>
                      <span className="font-medium">£650</span>
                    </div>
                    <Progress value={60} className="h-1" />
                  </div>
                  <Link href="/business-admin/credits">
                    <Button className="w-full">
                      View Credit Details
                    </Button>
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