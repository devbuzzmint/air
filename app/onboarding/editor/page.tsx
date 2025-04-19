"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LinkedInImport } from "@/components/onboarding/linkedin-import"
import { Separator } from "@/components/ui/separator"

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
  experienceLevel: z.enum(["1-2", "3-5", "5-10", "10+"]),
  resume: z.any().optional(),
  languageExpertise: z.array(z.string()).min(1, {
    message: "Please select at least one language.",
  }),
  writingExperience: z.string().min(100, {
    message: "Please provide at least 100 characters about your writing experience.",
  }),
  // Pre-screening questions
  editingStyle: z.enum(["substantive", "copyediting", "proofreading", "developmental"]),
  workingWithFeedback: z.string().min(50, {
    message: "Please provide at least 50 characters.",
  }),
  timeManagement: z.string().min(50, {
    message: "Please provide at least 50 characters.",
  }),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions.",
  }),
})

export default function EditorOnboardingPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      experienceLevel: undefined,
      writingExperience: "",
      languageExpertise: [],
      editingStyle: undefined,
      workingWithFeedback: "",
      timeManagement: "",
      acceptTerms: false,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      console.log(values)
      setIsSubmitting(false)
      router.push("/onboarding/editor/assessment")
    }, 1500)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0])
    }
  }

  const handleLinkedInImport = (data: { firstName: string; lastName: string; email?: string; experience?: string }) => {
    form.setValue("firstName", data.firstName)
    form.setValue("lastName", data.lastName)
    if (data.email) form.setValue("email", data.email)
    if (data.experience) form.setValue("experienceLevel", data.experience as any)
  }

  return (
    <div className="container py-10">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">Apply to become an Editor</h1>
          <p className="text-muted-foreground">
            Complete the application form below to start your journey as an AIRefine editor.
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Quick Import</CardTitle>
          </CardHeader>
          <CardContent>
            <LinkedInImport onImportSuccess={handleLinkedInImport} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Application Form</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="john@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="+1 (555) 123-4567" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="experienceLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Years of Experience</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your experience level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1-2">1-2 years</SelectItem>
                          <SelectItem value="3-5">3-5 years</SelectItem>
                          <SelectItem value="5-10">5-10 years</SelectItem>
                          <SelectItem value="10+">10+ years</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormItem className="flex flex-col">
                  <FormLabel>Resume/CV</FormLabel>
                  <Input 
                    type="file" 
                    accept=".pdf,.doc,.docx" 
                    onChange={handleFileChange}
                  />
                  <FormDescription>
                    Upload your resume or CV (PDF, DOC, or DOCX format)
                  </FormDescription>
                  {uploadedFile && (
                    <p className="text-sm text-green-600 mt-1">
                      Uploaded: {uploadedFile.name}
                    </p>
                  )}
                </FormItem>

                <Separator className="my-6" />

                <FormField
                  control={form.control}
                  name="languageExpertise"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel className="text-base">Language Expertise</FormLabel>
                        <FormDescription>
                          Select all languages you are proficient in.
                        </FormDescription>
                      </div>
                      {["English", "Spanish", "French", "German", "Chinese", "Japanese"].map((language) => (
                        <FormField
                          key={language}
                          control={form.control}
                          name="languageExpertise"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={language}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(language)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, language])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== language
                                            )
                                          )
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {language}
                                </FormLabel>
                              </FormItem>
                            )
                          }}
                        />
                      ))}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="writingExperience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Writing and Editing Experience</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your writing and editing experience, including any specialties or industries you're familiar with."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Separator className="my-6" />

                <div className="space-y-6">
                  <h3 className="text-lg font-medium">Pre-Screening Questions</h3>

                  <FormField
                    control={form.control}
                    name="editingStyle"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Which type of editing are you most experienced with?</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="substantive" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Substantive Editing (rewriting, reorganizing)
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="copyediting" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Copyediting (grammar, syntax, style)
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="proofreading" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Proofreading (final errors, formatting)
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="developmental" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Developmental Editing (structure, big-picture)
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="workingWithFeedback"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>How do you typically handle critical feedback on your work?</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your approach to receiving and implementing feedback..."
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="timeManagement"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>How do you manage tight deadlines and multiple projects?</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your time management strategies..."
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Separator className="my-6" />

                <FormField
                  control={form.control}
                  name="acceptTerms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          I accept the terms and conditions
                        </FormLabel>
                        <FormDescription>
                          By submitting this application, you agree to our terms and privacy policy.
                        </FormDescription>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 