"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Download, ChevronDown, ChevronUp, FileText } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for invoices
const MOCK_INVOICES = [
  {
    id: "INV-001",
    date: new Date(2023, 4, 15),
    amount: 950.00,
    status: "Paid",
    items: [
      { description: "API Credits (500,000)", amount: 570.00 },
      { description: "Premium Support", amount: 230.00 },
      { description: "Custom Templates (5)", amount: 150.00 }
    ]
  },
  {
    id: "INV-002",
    date: new Date(2023, 3, 15),
    amount: 720.00,
    status: "Paid",
    items: [
      { description: "API Credits (300,000)", amount: 340.00 },
      { description: "Premium Support", amount: 230.00 },
      { description: "Custom Templates (2)", amount: 150.00 }
    ]
  },
  {
    id: "INV-003",
    date: new Date(2023, 2, 15),
    amount: 1140.00,
    status: "Paid",
    items: [
      { description: "API Credits (800,000)", amount: 910.00 },
      { description: "Premium Support", amount: 230.00 }
    ]
  },
]

// Mock data for usage
const MONTHLY_USAGE = [
  { month: "May 2023", apiCalls: 450000, storage: 15, cost: 950.00 },
  { month: "April 2023", apiCalls: 280000, storage: 12, cost: 720.00 },
  { month: "March 2023", apiCalls: 750000, storage: 20, cost: 1140.00 },
]

export default function BusinessAdminBillingPage() {
  const [expandedInvoice, setExpandedInvoice] = useState<string | null>(null)
  const [selectedYear, setSelectedYear] = useState("2023")
  
  const toggleInvoiceDetails = (invoiceId: string) => {
    if (expandedInvoice === invoiceId) {
      setExpandedInvoice(null)
    } else {
      setExpandedInvoice(invoiceId)
    }
  }

  const handleDownloadInvoice = (invoiceId: string) => {
    // In a real application, this would trigger a download of the invoice PDF
    console.log(`Downloading invoice ${invoiceId}`)
    alert(`Invoice ${invoiceId} is being downloaded`)
  }

  return (
    <div className="p-8 gradient-bg min-h-screen">
      <div className="max-w-[1400px] mx-auto space-y-8">
        <h1 className="text-2xl font-bold">THIS IS THE NEW VERSION</h1>
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">Billing</h1>
          <div className="flex items-center gap-4">
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2025">2025</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="invoices" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
            <TabsTrigger value="usage">Usage</TabsTrigger>
            <TabsTrigger value="payment">Payment Method</TabsTrigger>
          </TabsList>
          
          {/* Invoices Tab */}
          <TabsContent value="invoices" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Invoices</CardTitle>
                <CardDescription>View and download your past invoices.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {MOCK_INVOICES.map(invoice => (
                    <div key={invoice.id} className="border rounded-lg overflow-hidden">
                      <div 
                        className="flex justify-between items-center p-4 cursor-pointer hover:bg-[#0E1232] hover:text-white group transition-colors"
                        onClick={() => toggleInvoiceDetails(invoice.id)}
                      >
                        <div className="flex items-center gap-2">
                          <FileText className="h-5 w-5 text-slate-400 group-hover:text-white" />
                          <div>
                            <h3 className="font-medium">{invoice.id}</h3>
                            <p className="text-sm text-slate-500 group-hover:text-gray-200">{format(invoice.date, 'MMMM d, yyyy')}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="font-semibold">£{invoice.amount.toFixed(2)}</p>
                            <span className="text-sm px-2 py-1 bg-[#A9FD2D] text-black rounded">
                              {invoice.status}
                            </span>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDownloadInvoice(invoice.id)
                            }}
                            title="Download Invoice"
                            className="group-hover:text-white"
                          >
                            <Download className="h-5 w-5" />
                          </Button>
                          {expandedInvoice === invoice.id ? 
                            <ChevronUp className="h-5 w-5" /> : 
                            <ChevronDown className="h-5 w-5" />
                          }
                        </div>
                      </div>
                      
                      {expandedInvoice === invoice.id && (
                        <div className="p-4 border-t bg-[#000A26] text-white">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead className="text-white">Description</TableHead>
                                <TableHead className="text-right text-white">Amount</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {invoice.items.map((item, idx) => (
                                <TableRow key={idx}>
                                  <TableCell className="text-white">{item.description}</TableCell>
                                  <TableCell className="text-right text-white">£{item.amount.toFixed(2)}</TableCell>
                                </TableRow>
                              ))}
                              <TableRow>
                                <TableCell className="font-bold text-white">Total</TableCell>
                                <TableCell className="text-right font-bold text-white">£{invoice.amount.toFixed(2)}</TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Usage Tab */}
          <TabsContent value="usage" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Usage</CardTitle>
                <CardDescription>View your usage and cost breakdown by month.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Month</TableHead>
                      <TableHead>API Calls</TableHead>
                      <TableHead>Storage (GB)</TableHead>
                      <TableHead className="text-right">Total Cost</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {MONTHLY_USAGE.map((usage, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{usage.month}</TableCell>
                        <TableCell>{usage.apiCalls.toLocaleString()}</TableCell>
                        <TableCell>{usage.storage} GB</TableCell>
                        <TableCell className="text-right font-medium">£{usage.cost.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Payment Method Tab */}
          <TabsContent value="payment" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>Manage your payment methods and billing information.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="bg-slate-100 p-2 rounded">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect width="32" height="32" rx="4" fill="#F7FAFC"/>
                          <path d="M22 11H10C9.44772 11 9 11.4477 9 12V20C9 20.5523 9.44772 21 10 21H22C22.5523 21 23 20.5523 23 20V12C23 11.4477 22.5523 11 22 11Z" stroke="#4A5568" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M9 15H23" stroke="#4A5568" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Visa ending in 4242</p>
                        <p className="text-sm text-slate-500">Expires 04/2025</p>
                      </div>
                    </div>
                    <div>
                      <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">Default</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-center">
                    <Button>
                      Add Payment Method
                    </Button>
                  </div>
                  
                  <div className="mt-6 border-t pt-6">
                    <h3 className="font-medium mb-4">Billing Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-slate-500">Billing Email</p>
                        <p>billing@yourcompany.com</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Billing Address</p>
                        <p>42 High Street<br/>Flat 3<br/>London, SW1A 1AA</p>
                      </div>
                    </div>
                    <Button variant="outline" className="mt-4">
                      Update Billing Information
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}