"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { 
  CheckCircle2, 
  ArrowRight, 
  User, 
  FileText, 
  Calendar, 
  Clock, 
  Briefcase,
  Bell
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

type EditorActivationProps = {
  userData: {
    name: string;
    email: string;
    appliedDate: string;
    completedDate: string;
  }
}

export function EditorActivation({ userData }: EditorActivationProps) {
  const router = useRouter()
  const [isActivating, setIsActivating] = useState(false)
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false
  })

  const handleActivate = () => {
    setIsActivating(true)
    
    // Simulate API call
    setTimeout(() => {
      router.push("/editor")
    }, 2000)
  }

  const steps = [
    {
      id: 1,
      title: "Application Submitted",
      date: userData.appliedDate,
      icon: FileText,
      isCompleted: true
    },
    {
      id: 2,
      title: "Skill Assessment Passed",
      date: "2 days after application",
      icon: CheckCircle2,
      isCompleted: true
    },
    {
      id: 3,
      title: "Interview Completed",
      date: "4 days after application",
      icon: Calendar,
      isCompleted: true
    },
    {
      id: 4,
      title: "Training Completed",
      date: userData.completedDate,
      icon: Clock,
      isCompleted: true
    },
    {
      id: 5,
      title: "Account Activation",
      date: "Today",
      icon: User,
      isCompleted: false
    }
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Congratulations, {userData.name}!</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              You've successfully completed all the requirements to become an AIRefine editor. 
              Review your journey below and activate your account to start accepting jobs.
            </p>
            
            <div className="my-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-between">
                  {steps.map((step) => (
                    <div key={step.id} className="flex flex-col items-center">
                      <div 
                        className={`h-10 w-10 rounded-full flex items-center justify-center relative z-10 
                          ${step.isCompleted 
                            ? "bg-green-100 text-green-700 border border-green-500" 
                            : "bg-blue-100 text-blue-700 border border-blue-500"}`}
                      >
                        {step.isCompleted ? (
                          <CheckCircle2 className="h-5 w-5" />
                        ) : (
                          <step.icon className="h-5 w-5" />
                        )}
                      </div>
                      <div className="text-center mt-2">
                        <p className="text-sm font-medium">{step.title}</p>
                        <p className="text-xs text-muted-foreground">{step.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="rounded-lg border p-4 space-y-4">
              <div className="flex items-start gap-3">
                <Briefcase className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Ready to start working</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Your profile will be active to receive job assignments once activated. 
                    You can set your availability and expertise in your editor dashboard.
                  </p>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex items-start gap-3">
                <Bell className="h-5 w-5 text-primary mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-medium">Notification preferences</h3>
                  <p className="text-sm text-muted-foreground mt-1 mb-3">
                    Choose how you'd like to be notified about new job opportunities.
                  </p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-notifications" className="flex items-center gap-2">
                        <span>Email notifications</span>
                      </Label>
                      <Switch
                        id="email-notifications"
                        checked={notifications.email}
                        onCheckedChange={(checked: boolean) => 
                          setNotifications(prev => ({ ...prev, email: checked }))
                        }
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="push-notifications" className="flex items-center gap-2">
                        <span>Push notifications</span>
                      </Label>
                      <Switch
                        id="push-notifications"
                        checked={notifications.push}
                        onCheckedChange={(checked: boolean) => 
                          setNotifications(prev => ({ ...prev, push: checked }))
                        }
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="sms-notifications" className="flex items-center gap-2">
                        <span>SMS notifications</span>
                      </Label>
                      <Switch
                        id="sms-notifications"
                        checked={notifications.sms}
                        onCheckedChange={(checked: boolean) => 
                          setNotifications(prev => ({ ...prev, sms: checked }))
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Button 
        className="w-full" 
        size="lg" 
        onClick={handleActivate} 
        disabled={isActivating}
      >
        {isActivating ? "Activating your account..." : "Activate Editor Account"}
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  )
} 