"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LineChart } from "@/components/ui/chart"
import { PoundSterling, Download, Calendar, ArrowUpRight } from "lucide-react"

const earningsData = [
  { month: "Jan", amount: 2500 },
  { month: "Feb", amount: 2800 },
  { month: "Mar", amount: 3200 },
  { month: "Apr", amount: 2900 },
  { month: "May", amount: 3500 },
  { month: "Jun", amount: 3800 }
]

const recentPayments = [
  {
    id: "1",
    date: "2024-02-20",
    amount: 450,
    status: "Paid",
    jobs: 3
  },
  {
    id: "2",
    date: "2024-02-15",
    amount: 600,
    status: "Paid",
    jobs: 4
  },
  {
    id: "3",
    date: "2024-02-10",
    amount: 300,
    status: "Processing",
    jobs: 2
  },
  {
    id: "4",
    date: "2024-02-05",
    amount: 750,
    status: "Paid",
    jobs: 5
  }
]

export default function EditorEarningsPage() {
  return (
    <div className="p-8 gradient-bg min-h-screen">
      <div className="max-w-[1400px] mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold">Earnings</h1>
            <p className="text-muted-foreground mt-2">Track your earnings and payment history</p>
          </div>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Download Statement
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="dark-card">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Total Earnings</h3>
                <PoundSterling className="h-5 w-5 text-primary" />
              </div>
              <p className="text-3xl font-bold mt-4">£18,700</p>
              <div className="flex items-center gap-2 mt-2 text-sm">
                <ArrowUpRight className="h-4 w-4 text-green-500" />
                <span className="text-green-500">12%</span>
                <span className="text-muted-foreground">vs last month</span>
              </div>
            </div>
          </Card>

          <Card className="dark-card">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">This Month</h3>
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <p className="text-3xl font-bold mt-4">£3,800</p>
              <p className="text-sm text-muted-foreground mt-2">From 24 completed jobs</p>
            </div>
          </Card>

          <Card className="dark-card">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Pending</h3>
                <PoundSterling className="h-5 w-5 text-primary" />
              </div>
              <p className="text-3xl font-bold mt-4">£750</p>
              <p className="text-sm text-muted-foreground mt-2">From 5 jobs in progress</p>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2 dark-card">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Earnings Overview</h2>
              <div className="h-[300px]">
                <LineChart
                  data={earningsData}
                  categories={["amount"]}
                  index="month"
                  colors={["primary"]}
                  valueFormatter={(value) => `£${value}`}
                  className="h-full"
                />
              </div>
            </div>
          </Card>

          <Card className="dark-card">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Payments</h2>
              <div className="space-y-4">
                {recentPayments.map((payment) => (
                  <div
                    key={payment.id}
                    className="flex items-center justify-between py-2 border-b border-border last:border-0"
                  >
                    <div>
                      <p className="font-medium">£{payment.amount}</p>
                      <p className="text-sm text-muted-foreground">
                        {payment.jobs} jobs • {payment.date}
                      </p>
                    </div>
                    <Badge
                      variant="secondary"
                      className={
                        payment.status === "Paid"
                          ? "bg-green-500/20 text-green-500"
                          : "bg-yellow-500/20 text-yellow-500"
                      }
                    >
                      {payment.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}