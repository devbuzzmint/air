"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, UserPlus, MoreVertical, CreditCard } from "lucide-react"
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

const users = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah@company.com",
    role: "Content Manager",
    status: "Active",
    creditsUsed: 250,
    totalCredits: 500,
    activeJobs: 3
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael@company.com",
    role: "Marketing Lead",
    status: "Active",
    creditsUsed: 300,
    totalCredits: 600,
    activeJobs: 2
  },
  {
    id: "3",
    name: "Emma Davis",
    email: "emma@company.com",
    role: "Product Manager",
    status: "Active",
    creditsUsed: 150,
    totalCredits: 400,
    activeJobs: 1
  },
  {
    id: "4",
    name: "James Wilson",
    email: "james@company.com",
    role: "Technical Writer",
    status: "Active",
    creditsUsed: 400,
    totalCredits: 700,
    activeJobs: 2
  },
  {
    id: "5",
    name: "Lisa Anderson",
    email: "lisa@company.com",
    role: "Content Strategist",
    status: "Active",
    creditsUsed: 200,
    totalCredits: 450,
    activeJobs: 1
  },
  {
    id: "6",
    name: "David Thompson",
    email: "david@company.com",
    role: "Marketing Specialist",
    status: "Active",
    creditsUsed: 200,
    totalCredits: 450,
    activeJobs: 1
  }
]

const roles = [
  "Content Manager",
  "Marketing Lead",
  "Product Manager",
  "Technical Writer",
  "Content Strategist"
]

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [selectedUser, setSelectedUser] = useState<typeof users[0] | null>(null)
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    
    return matchesSearch && matchesRole
  })

  const handleViewDetails = (user: typeof users[0]) => {
    setSelectedUser(user)
    setShowDetailsDialog(true)
  }

  return (
    <div className="p-8 gradient-bg min-h-screen">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold">User Management</h1>
          <Button>
            <UserPlus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>

        <div className="bg-card rounded-xl shadow-sm border border-border mb-6">
          <div className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-muted"
                />
              </div>
              <div className="flex gap-4">
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="w-[180px] bg-muted">
                    <SelectValue placeholder="Filter by role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    {roles.map((role) => (
                      <SelectItem key={role} value={role}>{role}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          {filteredUsers.map((user) => (
            <Card key={user.id} className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{user.name}</h3>
                  <p className="text-muted-foreground">{user.email}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="secondary">{user.role}</Badge>
                    <Badge className="bg-green-500/20 text-green-500">
                      {user.status}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="mt-2">
                    <span className="text-sm text-muted-foreground">Credits: </span>
                    <span className="font-medium">{user.creditsUsed}</span>
                    <span className="text-muted-foreground">/{user.totalCredits}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <Button variant="secondary" onClick={() => handleViewDetails(user)}>
                  View Details
                </Button>
                <Button variant="outline">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Adjust Credits
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
          <DialogContent className="max-w-3xl">
            {selectedUser && (
              <>
                <DialogHeader>
                  <DialogTitle>User Details</DialogTitle>
                </DialogHeader>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-1">Name</h4>
                      <p>{selectedUser.name}</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Email</h4>
                      <p>{selectedUser.email}</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Role</h4>
                      <p>{selectedUser.role}</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Status</h4>
                      <Badge className="bg-green-500/20 text-green-500">
                        {selectedUser.status}
                      </Badge>
                    </div>
                  </div>

                  <div className="bg-muted p-6 rounded-lg">
                    <h3 className="text-lg font-medium mb-4">Credit Overview</h3>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <h4 className="text-sm text-muted-foreground mb-1">Total Credits</h4>
                        <div className="text-2xl font-semibold">{selectedUser.totalCredits}</div>
                      </div>
                      <div>
                        <h4 className="text-sm text-muted-foreground mb-1">Used Credits</h4>
                        <div className="text-2xl font-semibold">{selectedUser.creditsUsed}</div>
                      </div>
                      <div>
                        <h4 className="text-sm text-muted-foreground mb-1">Remaining</h4>
                        <div className="text-2xl font-semibold">
                          {selectedUser.totalCredits - selectedUser.creditsUsed}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Active Jobs</h3>
                    <p className="text-muted-foreground">
                      Currently working on {selectedUser.activeJobs} jobs
                    </p>
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