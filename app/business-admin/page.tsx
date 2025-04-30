"use client"

import { useState } from "react"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useRouter } from "next/navigation"

// Mock data for job templates
const jobTemplates = [
  { id: 1, name: "API Documentation", count: 10 },
  { id: 2, name: "Financial Reports", count: 8 },
  { id: 3, name: "Marketing Content", count: 7 },
  { id: 4, name: "Technical Guides", count: 100 },
]

// Job status counts
const jobStatusCounts = [
  { status: "Submitted to Network", count: 10 },
  { status: "With Editor", count: 8 },
  { status: "Ready for Review", count: 7 },
  { status: "Draft", count: 5 },
  { status: "Completed", count: 100 },
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
    title: "Digital Banking Trends Report",
    user: "Sarah Johnson",
    type: "White Paper",
    status: "Draft",
    credits: 1200
  },
  {
    id: "2",
    title: "Investment Platform Launch",
    user: "Michael Chen",
    type: "Social Media Post",
    status: "Submitted to Network",
    credits: 800
  },
  {
    id: "3",
    title: "API Documentation",
    user: "James Wilson",
    type: "Technical Documentation",
    status: "With Editor",
    credits: 1500
  },
  {
    id: "4",
    title: "Webinar Promotion",
    user: "Lisa Anderson",
    type: "Social Media",
    status: "Ready for Review",
    credits: 200
  },
  {
    id: "5",
    title: "Developer Guide",
    user: "Emma Davis",
    type: "Technical Writing",
    status: "In Progress",
    credits: 150
  },
  {
    id: "6",
    title: "Monthly Newsletter",
    user: "David Thompson",
    type: "Marketing",
    status: "Completed",
    credits: 200
  }
]

const quickLinks = [
  // Removed Add User, Create Job, View Billing
]

// Function to get status badge styling (consistent with business user account)
const getStatusStyle = (status: string) => {
  switch (status) {
    case "Review":
    case "Ready for review":
    case "Ready for Review":
      return "bg-yellow-500/20 text-yellow-500"
    case "Submitted":
    case "Submitted to Network":
      return "bg-amber-600/20 text-amber-600"
    case "With editor":
    case "With Editor":
      return "bg-purple-500/20 text-purple-500"
    case "In Progress":
      return "bg-blue-500/20 text-blue-500"
    case "Draft":
      return "bg-gray-500/20 text-gray-500"
    case "Complete":
    case "Completed":
      return "bg-green-500/20 text-green-500"
    default:
      return "bg-muted text-muted-foreground"
  }
}

// Job type data for the donut chart
const jobTypeData = [
  { label: "Newsletter", value: 26, color: "#A9FD2D" },
  { label: "Article", value: 5, color: "#00E0FF" },
  { label: "Brochure", value: 10, color: "#FFB800" },
  { label: "Social Post", value: 5, color: "#FF5C5C" },
]
const totalJobs = 46;
const otherValue = totalJobs - jobTypeData.reduce((sum, jt) => sum + jt.value, 0);
const chartData = otherValue > 0
  ? [...jobTypeData, { label: "Other", value: otherValue, color: "#8884d8" }]
  : jobTypeData;
const circumference = 2 * Math.PI * 25;
let offset = 0;

export default function BusinessAdminDashboard() {
  const totalCredits = 2500
  const remainingCredits = 1930
  const creditPercentage = (remainingCredits / totalCredits) * 100
  const [statusFilter, setStatusFilter] = useState("all")
  const router = useRouter()

  const activeJobs = businessUsers.reduce((total, user) => total + user.activeJobs, 0)
  
  const filteredJobs = recentJobs.filter(job => 
    statusFilter === "all" || job.status === statusFilter
  )

  return (
    <div className="p-8 gradient-bg min-h-screen">
      <div className="max-w-[1400px] mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold">Hello, Sarah</h1>
            <p className="text-muted-foreground mt-2">
              Business Admin Dashboard
            </p>
          </div>
          <img 
            src="/fintech-logo.png" 
            alt="Fintech Solutions Logo" 
            className="h-14"
          />
        </div>

        {/* Job Counters Section (New) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Job Types Counter */}
          <Card className="dark-card cursor-pointer" onClick={() => router.push('/business-admin/jobs')}>
            <div className="p-5">
              <h3 className="font-semibold mb-3">Job Ratio</h3>
              <div className="flex items-center gap-8">
                {/* Dynamic Donut Chart SVG */}
                <svg width="140" height="140" viewBox="0 0 56 56">
                  <circle cx="28" cy="28" r="25" fill="none" stroke="#222A44" strokeWidth="6"/>
                  {chartData.map((jt, i) => {
                    const dash = (jt.value / totalJobs) * circumference;
                    const dashArray = `${dash} ${circumference - dash}`;
                    const el = (
                      <circle
                        key={jt.label}
                        cx="28" cy="28" r="25"
                        fill="none"
                        stroke={jt.color}
                        strokeWidth="6"
                        strokeDasharray={dashArray}
                        strokeDashoffset={offset}
                        style={{ transition: 'stroke-dasharray 0.3s' }}
                      />
                    );
                    offset -= dash;
                    return el;
                  })}
                </svg>
                {/* Legend */}
                <div>
                  <div className="text-lg font-bold">{totalJobs}</div>
                  <div className="text-xs text-muted-foreground mb-2">Totals Jobs</div>
                  <div className="flex flex-col gap-1">
                    {chartData.map(jt => (
                      <span key={jt.label} className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: jt.color }}></span>
                        {jt.label} / {jt.value}
                      </span>
                    ))}
              </div>
                  <div className="mt-3">
                    <span className="text-primary underline cursor-pointer" onClick={e => { e.stopPropagation(); router.push('/business-admin/jobs'); }}>More Jobs</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Users Card */}
          <Card className="dark-card">
            <div className="p-5">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold">Users</h3>
                <Link href="/business-admin/users">
                  <Button variant="outline" size="sm">View/Manage Users</Button>
                </Link>
              </div>
              <div className="space-y-3 mt-4">
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
                {businessUsers.length > 4 && (
                  <p className="text-xs text-muted-foreground text-center pt-2">
                    + {businessUsers.length - 4} more users...
                  </p>
                )}
              </div>
            </div>
          </Card>

          {/* Credit Overview */}
          <Card className="dark-card">
            <div className="p-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold">Credit Usage Overview</h3>
              </div>
              <div className="flex flex-col items-center space-y-6">
                <div className="relative inline-flex items-center justify-center">
                  <svg className="w-48 h-48 -rotate-90 transform">
                    <circle
                      className="text-[#191C44] stroke-current"
                      strokeWidth="4"
                      stroke="currentColor"
                      fill="transparent"
                      r="70"
                      cx="96"
                      cy="96"
                    />
                    <circle
                      className="text-[#ABFF2E] stroke-current"
                      strokeWidth="4"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                      r="70"
                      cx="96"
                      cy="96"
                      strokeDasharray={`${2 * Math.PI * 70}`}
                      strokeDashoffset={`${2 * Math.PI * 70 * (1 - creditPercentage / 100)}`}
                    />
                  </svg>
                  <div className="absolute text-center">
                    <div className="text-4xl font-bold">1930</div>
                    <div className="w-12 h-px bg-white mx-auto my-2"></div>
                    <div className="text-lg text-muted-foreground">2500</div>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm">
                    Credits renew on <span className="text-[#ABFF2E]">27/04/2025</span>
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Links Section - removed */}

        {/* Job Status Counter Section */}
        <Card className="dark-card">
          <div className="p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Job Status Counter</h3>
              <Link href="/business-admin/jobs?status=all">
                <Button variant="outline" size="sm">View All Jobs</Button>
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {jobStatusCounts.map((statusCount) => (
                <Link key={statusCount.status} href={`/business-admin/jobs?status=${statusCount.status.replace(/ /g, '-')}`}>
                  <div className="bg-muted p-4 rounded-lg text-center hover:bg-muted/80 transition-colors">
                    <div className="text-3xl font-bold text-primary">
                      {statusCount.count}
                    </div>
                    <div className={`text-xs font-medium mt-1 ${getStatusStyle(statusCount.status)} px-2 py-0.5 rounded-full inline-block`}>
                      {statusCount.status}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Card>

        {/* Recent Jobs Section */}
        <Card className="dark-card">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Recent Jobs</h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Filter by status:</span>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px] bg-muted">
                    <SelectValue placeholder="All Statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Submitted to Network">Submitted to Network</SelectItem>
                    <SelectItem value="With Editor">With Editor</SelectItem>
                    <SelectItem value="Ready for Review">Ready for Review</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-5 text-sm text-muted-foreground pb-2 font-medium">
                <div>Job Title</div>
                <div>Submitted By</div>
                <div>Type</div>
                <div>Status</div>
                <div className="text-right">Credits</div>
              </div>
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <div key={job.id} className="grid grid-cols-5 text-sm py-3 border-t border-border items-center">
                    <div className="font-medium text-white">{job.title}</div>
                    <div>{job.user}</div>
                    <div>{job.type}</div>
                    <div>
                      <Badge className={getStatusStyle(job.status)}>{job.status}</Badge>
                    </div>
                    <div className="text-right font-medium text-primary">{job.credits}</div>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted-foreground py-4">No jobs match the current filter.</p>
              )}
            </div>
            <Link href="/business-admin/jobs">
              <Button variant="link" className="text-primary mt-4">View All Jobs</Button>
            </Link>
          </div>
        </Card>

        {/* Fintech Team Members Section - removed */}

      </div>
    </div>
  )
}