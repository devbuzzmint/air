"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  CreditCard,
  Users,
  ArrowUpRight,
  Check,
  ChevronRight,
  Download
} from "lucide-react"

const pricingPlans = [
  {
    name: "Bronze",
    credits: 2563,
    price: 2500,
    features: [
      "Up to 5 users",
      "Up to 5 bespoke prompt templates", 
      "Dedicated account manager",
      "User and corporate dashboards",
      "Avg 15 pieces of editorial content"
    ]
  },
  {
    name: "Silver", 
    credits: 5250,
    price: 5000,
    features: [
      "Up to 10 users",
      "Up to 10 bespoke prompt templates",
      "Dedicated account manager", 
      "User and corporate dashboards",
      "Avg 30 pieces of editorial content"
    ]
  },
  {
    name: "Gold",
    credits: 11000,
    price: 10000,
    features: [
      "Up to 20 users",
      "Up to 20 bespoke prompt templates",
      "Dedicated account manager",
      "User and corporate dashboards",
      "Avg 63 pieces of editorial content"
    ]
  }
]

const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "Content Manager",
    allocated: 2000,
    used: 1200
  },
  {
    name: "Michael Chen",
    role: "Marketing Lead",
    allocated: 3000,
    used: 2100
  },
  {
    name: "Emma Davis",
    role: "Product Manager",
    allocated: 1500,
    used: 800
  },
  {
    name: "James Wilson",
    role: "Technical Writer",
    allocated: 2500,
    used: 1600
  },
  {
    name: "Lisa Anderson",
    role: "Content Strategist",
    allocated: 1800,
    used: 900
  },
  {
    name: "David Thompson",
    role: "Marketing Specialist",
    allocated: 1700,
    used: 850
  }
]

const monthlyUsage = [
  { month: "January", credits: 8500 },
  { month: "February", credits: 9200 },
  { month: "March", credits: 7800 },
  { month: "April", credits: 10500 },
  { month: "May", credits: 9800 },
  { month: "June", credits: 11200 }
]

export default function BusinessAdminCreditsPage() {
  const totalCredits = 5250
  const usedCredits = 3800
  const remainingCredits = totalCredits - usedCredits
  const creditPercentage = (usedCredits / totalCredits) * 100

  return (
    <div className="p-8 gradient-bg min-h-screen">
      <div className="max-w-[1400px] mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold">Manage Credits</h1>
            <p className="text-muted-foreground mt-2">
              Monitor and manage your organization's credit usage
            </p>
          </div>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Download Report
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="dark-card lg:col-span-2">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Current Plan</h2>
              <div className="flex items-start justify-between mb-6">
                <div>
                  <Badge className="bg-primary/20 text-primary mb-2">Silver</Badge>
                  <p className="text-3xl font-bold">£{5000}<span className="text-sm text-muted-foreground">/month</span></p>
                </div>
                <Button>Upgrade Plan</Button>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Credits Usage</span>
                    <span>{usedCredits} / {totalCredits}</span>
                  </div>
                  <Progress value={creditPercentage} className="h-2" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">Total Credits</p>
                    <p className="text-2xl font-bold mt-1">{totalCredits}</p>
                  </div>
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">Used Credits</p>
                    <p className="text-2xl font-bold mt-1">{usedCredits}</p>
                  </div>
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">Remaining</p>
                    <p className="text-2xl font-bold mt-1">{remainingCredits}</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="dark-card">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Monthly Trend</h2>
              <div className="space-y-4">
                {monthlyUsage.map((month, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm">{month.month}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{month.credits}</span>
                      {index === monthlyUsage.length - 1 && (
                        <ArrowUpRight className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="dark-card lg:col-span-2">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Team Allocation</h2>
                <Button variant="outline" size="sm">
                  <Users className="h-4 w-4 mr-2" />
                  Manage Team
                </Button>
              </div>
              <div className="space-y-4">
                {teamMembers.map((member, index) => (
                  <div key={index} className="bg-muted p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <p className="font-medium">{member.name}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        Adjust <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Usage</span>
                        <span>{member.used} / {member.allocated}</span>
                      </div>
                      <Progress 
                        value={(member.used / member.allocated) * 100} 
                        className="h-2" 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <div className="space-y-6">
            <Card className="dark-card">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Purchase Credits
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Users className="h-4 w-4 mr-2" />
                    Adjust Allocations
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export Usage Report
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="dark-card">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Available Plans</h2>
                <div className="space-y-4">
                  {pricingPlans.map((plan, index) => (
                    <div key={index} className="bg-muted p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">{plan.name}</h3>
                        <Badge variant="secondary">
                          {typeof plan.credits === 'number' 
                            ? plan.credits
                            : plan.credits}
                        </Badge>
                      </div>
                      <p className="text-2xl font-bold mb-2">
                        £{plan.price}<span className="text-sm text-muted-foreground">/month</span>
                      </p>
                      <ul className="space-y-2">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                            <Check className="h-4 w-4 mr-2 text-primary" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}