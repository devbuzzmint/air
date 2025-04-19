"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Calendar, Clock, Loader2, Camera, UserCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"

const formSchema = z.object({
  interviewDate: z.date({
    required_error: "Please select a date for your interview.",
  }),
  interviewTime: z.string({
    required_error: "Please select a time slot.",
  }),
  fullName: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  documentType: z.enum(["passport", "drivingLicense", "idCard"], {
    required_error: "Please select a document type.",
  }),
  consentToVerification: z.boolean().refine(val => val === true, {
    message: "You must consent to identity verification.",
  })
})

// Generate available time slots
const generateTimeSlots = () => {
  const slots = []
  for (let hour = 9; hour <= 17; hour++) {
    const hourStr = hour.toString().padStart(2, '0')
    slots.push(`${hourStr}:00`)
    if (hour < 17) {
      slots.push(`${hourStr}:30`)
    }
  }
  return slots
}

const timeSlots = generateTimeSlots()

export default function InterviewPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      consentToVerification: false,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      console.log(values)
      setIsSubmitting(false)
      router.push("/onboarding/editor/portal")
    }, 1500)
  }

  return (
    <div className="container py-10">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">Schedule Your Interview</h1>
          <p className="text-muted-foreground">
            Select a convenient time for your 15-minute video interview and complete identity verification.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>Interview Scheduling</span>
              </CardTitle>
              <CardDescription>
                Choose a date and time for your 15-minute interview with our team
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="interviewDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Interview Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <Calendar className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <CalendarComponent
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) => 
                                  date < new Date() || 
                                  date > new Date(new Date().setDate(new Date().getDate() + 14)) ||
                                  date.getDay() === 0 || 
                                  date.getDay() === 6
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormDescription>
                            Available Monday to Friday, next 2 weeks
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="interviewTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Time Slot</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a time slot" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {timeSlots.map((slot) => (
                                <SelectItem key={slot} value={slot}>
                                  {slot}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormDescription>All times are in your local timezone</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="bg-muted p-4 rounded-md flex items-start gap-4">
                    <Camera className="h-5 w-5 mt-0.5 text-primary" />
                    <div>
                      <h3 className="font-medium mb-1">Video Interview Details</h3>
                      <p className="text-sm text-muted-foreground">
                        Your 15-minute interview will be conducted via Zoom. You'll receive a link via email after scheduling.
                        Please ensure you have a stable internet connection, functioning camera and microphone.
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                      <UserCheck className="h-5 w-5" />
                      <span>Identity Verification</span>
                    </h3>
                    
                    <p className="text-sm text-muted-foreground mb-4">
                      To ensure the security of our platform, we require identity verification. 
                      You'll need to provide a government-issued ID and take a selfie during the onboarding process.
                    </p>

                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Legal Name</FormLabel>
                            <FormControl>
                              <Input placeholder="As it appears on your ID" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="documentType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>ID Document Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select document type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="passport">Passport</SelectItem>
                                <SelectItem value="drivingLicense">Driving License</SelectItem>
                                <SelectItem value="idCard">National ID Card</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Select the type of document you'll use for verification
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="consentToVerification"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>
                                Consent to Identity Verification
                              </FormLabel>
                              <FormDescription>
                                I consent to providing my ID document and a selfie for identity verification purposes.
                                I understand that my information will be handled securely in accordance with the privacy policy.
                              </FormDescription>
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Scheduling Interview...
                      </>
                    ) : (
                      "Schedule Interview"
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 