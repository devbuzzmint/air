"use client"

import Link from "next/link"
import { ArrowLeft, UserPlus, Users, Mail, CheckCircle2, ShieldCheck } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function AddingUsersGuide() {
  return (
    <div className="p-8 gradient-bg min-h-screen">
      <div className="max-w-[1000px] mx-auto space-y-8">
        <div className="flex items-center gap-2 mb-6">
          <Link href="/business-admin/guides">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Adding New Users</h1>
        </div>

        <div className="aspect-video relative rounded-xl overflow-hidden">
          <img 
            src="https://placehold.co/1920x1080.png?text=Adding+Users+Tutorial" 
            alt="Adding Users Tutorial" 
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Button className="gap-2 text-lg px-6 py-6" size="lg">
              <span>Watch Tutorial</span>
            </Button>
          </div>
        </div>

        <Card className="p-6 bg-card border-border">
          <div className="prose prose-invert max-w-none">
            <h2 className="flex items-center gap-2 text-2xl font-semibold mb-4">
              <UserPlus className="h-6 w-6 text-primary" />
              Overview
            </h2>
            <p>
              As a business administrator, you have the ability to add new users to your AIRefine account. 
              New users will be able to create and manage content jobs using your organization's allocated credits. 
              This guide walks you through the process of adding new users and setting appropriate permissions.
            </p>

            <h2 className="flex items-center gap-2 text-2xl font-semibold mt-8 mb-4">
              <Users className="h-6 w-6 text-primary" />
              Step 1: Navigate to User Management
            </h2>
            <p>
              From your Business Admin Dashboard, click on the "Users" tab in the left sidebar, or use 
              the quick link labeled "Add User" on your dashboard.
            </p>
            <div className="bg-muted/20 p-4 rounded-lg mt-4 border border-border">
              <p className="text-sm text-muted-foreground">
                <strong>Pro Tip:</strong> You can also access the Users page directly by navigating to: <span className="bg-muted px-2 py-1 rounded">yourdomain.airefine.com/business-admin/users</span>
              </p>
            </div>

            <h2 className="flex items-center gap-2 text-2xl font-semibold mt-8 mb-4">
              <UserPlus className="h-6 w-6 text-primary" />
              Step 2: Add a New User
            </h2>
            <p>
              On the Users page, click the "Add User" button in the top-right corner. 
              This will open a form where you can enter the new user's details.
            </p>
            <p>Required information includes:</p>
            <ul>
              <li><strong>Full Name:</strong> The user's full name</li>
              <li><strong>Email Address:</strong> Their business email address (this will be their login ID)</li>
              <li><strong>Role:</strong> Select a role from the dropdown (Content Manager, Marketing, etc.)</li>
              <li><strong>Initial Credit Allocation:</strong> The number of credits to assign to this user</li>
            </ul>

            <h2 className="flex items-center gap-2 text-2xl font-semibold mt-8 mb-4">
              <Mail className="h-6 w-6 text-primary" />
              Step 3: Send Invitation
            </h2>
            <p>
              After filling out the user details, click "Send Invitation". This will send an email 
              to the new user with instructions on how to set up their account.
            </p>
            <div className="bg-muted/20 p-4 rounded-lg mt-4 border border-border">
              <p className="text-sm text-muted-foreground">
                <strong>Note:</strong> The invitation link will expire after 7 days. If a user doesn't accept within that timeframe, 
                you'll need to resend the invitation from the Users management page.
              </p>
            </div>

            <h2 className="flex items-center gap-2 text-2xl font-semibold mt-8 mb-4">
              <ShieldCheck className="h-6 w-6 text-primary" />
              Step 4: Set Permissions
            </h2>
            <p>
              Once a user accepts their invitation, you can set their specific permissions:
            </p>
            <ul>
              <li><strong>Job Creation:</strong> Allow users to create new content jobs</li>
              <li><strong>Credit Management:</strong> Allow users to allocate their own credits</li>
              <li><strong>Template Access:</strong> Select which templates they can access</li>
              <li><strong>Job Visibility:</strong> Determine if they can see only their jobs or all company jobs</li>
            </ul>
            <p>
              To configure these permissions, click on the user's name in the Users list, then select the "Permissions" tab.
            </p>

            <h2 className="flex items-center gap-2 text-2xl font-semibold mt-8 mb-4">
              <CheckCircle2 className="h-6 w-6 text-primary" />
              Step 5: Verification and Onboarding
            </h2>
            <p>
              After a user has been added successfully:
            </p>
            <ul>
              <li>Their status will change from "Pending" to "Active" in your Users list</li>
              <li>They will appear in your organization's user count</li>
              <li>You can track their credit usage and job activity from the dashboard</li>
            </ul>
            <p>
              Consider scheduling a brief onboarding session to help new users get familiar with AIRefine.
            </p>

            <div className="bg-primary/10 p-6 rounded-lg mt-8 border border-primary/20">
              <h3 className="text-xl font-semibold mb-2">Troubleshooting</h3>
              <p className="mb-4">Common issues when adding new users:</p>
              <ul>
                <li><strong>User didn't receive invitation:</strong> Check spam folders or resend the invitation</li>
                <li><strong>Error adding user:</strong> Ensure the email address isn't already in use</li>
                <li><strong>User can't access certain features:</strong> Review their permission settings</li>
              </ul>
              <p className="mt-4">
                If you continue to experience issues, please contact support at <span className="text-primary">support@airefine.com</span>
              </p>
            </div>
          </div>
        </Card>

        <div className="flex justify-between mt-8">
          <Link href="/business-admin/guides">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Guides
            </Button>
          </Link>
          <Link href="/business-admin/guides/allocating-credits">
            <Button className="gap-2">
              Next Guide: Allocating Credits
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
} 