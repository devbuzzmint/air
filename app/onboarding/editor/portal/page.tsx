"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { 
  CheckCircle2, 
  Clock, 
  BookOpen, 
  FileText, 
  Play, 
  Award, 
  ListChecks, 
  Edit,
  ArrowRight,
  AlertCircle
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

// Mock data for onboarding steps
const onboardingSteps = [
  {
    id: 1,
    title: "Welcome to AIRefine",
    description: "Introduction to the platform and editor community",
    videoUrl: "#",
    duration: "5 min",
    completed: true,
  },
  {
    id: 2,
    title: "Platform Overview",
    description: "Learn how to navigate the editor dashboard and find jobs",
    videoUrl: "#",
    duration: "8 min",
    completed: true,
  },
  {
    id: 3,
    title: "Quality Standards",
    description: "Understanding our quality expectations and review process",
    videoUrl: "#",
    duration: "12 min",
    completed: false,
  },
  {
    id: 4,
    title: "Working with AI Content",
    description: "Best practices for editing AI-generated content",
    videoUrl: "#",
    duration: "15 min",
    completed: false,
  },
  {
    id: 5,
    title: "Feedback and Revisions",
    description: "How to handle client feedback and revision requests",
    videoUrl: "#",
    duration: "10 min",
    completed: false,
  },
]

// Mock data for sandbox tasks
const sandboxTasks = [
  {
    id: 1,
    title: "Basic Copyediting Task",
    description: "Edit a short article for grammar, spelling, and style",
    status: "completed",
    feedback: "Great job! Your edits improved readability while maintaining the original voice.",
    type: "Article",
    difficulty: "Easy",
  },
  {
    id: 2,
    title: "Tone Adjustment Task",
    description: "Adapt a casual blog post to a more professional tone",
    status: "in-progress",
    type: "Blog Post",
    difficulty: "Medium",
  },
  {
    id: 3,
    title: "Technical Content Editing",
    description: "Edit a technical white paper for clarity and accuracy",
    status: "pending",
    type: "White Paper",
    difficulty: "Hard",
  },
]

// Mock guides/resources data
const resourcesData = [
  {
    id: 1,
    title: "AIRefine Style Guide",
    description: "Our comprehensive style guide for all content types",
    category: "Style Guides",
    icon: BookOpen,
  },
  {
    id: 2,
    title: "Editing Checklists",
    description: "Standard checklists for different content formats",
    category: "Process",
    icon: ListChecks,
  },
  {
    id: 3,
    title: "Client Communication Templates",
    description: "Templates for common client interactions",
    category: "Communication",
    icon: FileText,
  },
]

export default function OnboardingPortalPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("training")
  
  // Calculate onboarding progress
  const completedSteps = onboardingSteps.filter(step => step.completed).length
  const totalSteps = onboardingSteps.length
  const progressPercentage = (completedSteps / totalSteps) * 100

  const handleActivation = () => {
    // In a real app, this would update the user's status in the database
    router.push("/editor")
  }

  return (
    <div className="container py-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Editor Onboarding Portal</h1>
            <p className="text-muted-foreground">
              Complete the training and trial tasks to activate your editor account.
            </p>
          </div>
          
          <div className="flex flex-col items-end">
            <p className="text-sm text-muted-foreground mb-2">Onboarding Progress</p>
            <div className="w-full md:w-64 flex items-center gap-2">
              <Progress value={progressPercentage} className="h-2" />
              <span className="text-sm font-medium">{Math.round(progressPercentage)}%</span>
            </div>
          </div>
        </div>

        {progressPercentage < 100 ? (
          <Alert className="mb-8">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Onboarding in progress</AlertTitle>
            <AlertDescription>
              Complete all training videos and trial tasks to activate your editor account.
            </AlertDescription>
          </Alert>
        ) : (
          <Alert className="mb-8 bg-green-50 text-green-800 border-green-200">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertTitle>Ready for activation</AlertTitle>
            <AlertDescription className="flex items-center justify-between">
              <span>You've completed all onboarding requirements and can now activate your account.</span>
              <Button onClick={handleActivation} size="sm" className="bg-green-600 hover:bg-green-700">
                Activate Account
              </Button>
            </AlertDescription>
          </Alert>
        )}
        
        <Tabs defaultValue="training" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="training">Training Videos</TabsTrigger>
            <TabsTrigger value="sandbox">Sandbox Tasks</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>
          
          <TabsContent value="training" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {onboardingSteps.map((step) => (
                <Card key={step.id} className={step.completed ? "border-green-200" : ""}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{step.title}</CardTitle>
                      {step.completed ? (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          <CheckCircle2 className="h-3 w-3 mr-1" /> Completed
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          <Clock className="h-3 w-3 mr-1" /> {step.duration}
                        </Badge>
                      )}
                    </div>
                    <CardDescription>{step.description}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button variant={step.completed ? "outline" : "default"} className="w-full">
                      {step.completed ? (
                        <>Rewatch Video <Play className="ml-2 h-4 w-4" /></>
                      ) : (
                        <>Watch Video <Play className="ml-2 h-4 w-4" /></>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="sandbox" className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              {sandboxTasks.map((task) => (
                <Card key={task.id} className={
                  task.status === "completed" 
                    ? "border-green-200" 
                    : task.status === "in-progress" 
                      ? "border-blue-200" 
                      : ""
                }>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg mb-1">{task.title}</CardTitle>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">{task.type}</Badge>
                          <Badge 
                            variant="outline" 
                            className={
                              task.difficulty === "Easy" 
                                ? "bg-green-50 text-green-700 border-green-200" 
                                : task.difficulty === "Medium" 
                                  ? "bg-yellow-50 text-yellow-700 border-yellow-200" 
                                  : "bg-red-50 text-red-700 border-red-200"
                            }
                          >
                            {task.difficulty}
                          </Badge>
                          <Badge 
                            variant="outline" 
                            className={
                              task.status === "completed" 
                                ? "bg-green-50 text-green-700 border-green-200" 
                                : task.status === "in-progress" 
                                  ? "bg-blue-50 text-blue-700 border-blue-200" 
                                  : "bg-gray-50 text-gray-700 border-gray-200"
                            }
                          >
                            {task.status === "completed" 
                              ? "Completed" 
                              : task.status === "in-progress" 
                                ? "In Progress" 
                                : "Pending"}
                          </Badge>
                        </div>
                        <CardDescription>{task.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  
                  {task.feedback && (
                    <CardContent>
                      <div className="bg-muted p-3 rounded-md">
                        <h4 className="text-sm font-medium mb-1">Feedback</h4>
                        <p className="text-sm text-muted-foreground">{task.feedback}</p>
                      </div>
                    </CardContent>
                  )}
                  
                  <CardFooter>
                    <Button 
                      variant={task.status === "completed" ? "outline" : "default"} 
                      className="w-full"
                      disabled={task.status === "pending"}
                    >
                      {task.status === "completed" 
                        ? <>View Task <FileText className="ml-2 h-4 w-4" /></> 
                        : task.status === "in-progress" 
                          ? <>Continue Editing <Edit className="ml-2 h-4 w-4" /></> 
                          : <>Start Task <ArrowRight className="ml-2 h-4 w-4" /></>}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="resources" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {resourcesData.map((resource) => {
                const Icon = resource.icon
                return (
                  <Card key={resource.id} className="hover:border-primary transition-colors">
                    <CardHeader className="pb-2">
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{resource.title}</CardTitle>
                          <Badge variant="outline" className="mt-1">{resource.category}</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm text-muted-foreground">{resource.description}</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        View Resource <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                )
              })}
            </div>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  <span>Performance Metrics & Incentives</span>
                </CardTitle>
                <CardDescription>
                  Learn how your work is evaluated and how to earn bonuses and premium assignments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Quality Score Components</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-muted p-3 rounded-md">
                        <h4 className="font-medium mb-1">Accuracy</h4>
                        <p className="text-sm text-muted-foreground">Factual correctness and attention to detail</p>
                      </div>
                      <div className="bg-muted p-3 rounded-md">
                        <h4 className="font-medium mb-1">Client Satisfaction</h4>
                        <p className="text-sm text-muted-foreground">Ratings and feedback from clients</p>
                      </div>
                      <div className="bg-muted p-3 rounded-md">
                        <h4 className="font-medium mb-1">Timeliness</h4>
                        <p className="text-sm text-muted-foreground">Meeting deadlines consistently</p>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Editor Levels</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="border p-3 rounded-md">
                        <h4 className="font-medium mb-1 flex items-center gap-2">
                          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Level 1</Badge>
                          <span>Associate Editor</span>
                        </h4>
                        <p className="text-sm text-muted-foreground">Entry level with standard assignments</p>
                      </div>
                      <div className="border p-3 rounded-md">
                        <h4 className="font-medium mb-1 flex items-center gap-2">
                          <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Level 2</Badge>
                          <span>Senior Editor</span>
                        </h4>
                        <p className="text-sm text-muted-foreground">Higher pay rates and priority assignments</p>
                      </div>
                      <div className="border p-3 rounded-md">
                        <h4 className="font-medium mb-1 flex items-center gap-2">
                          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Level 3</Badge>
                          <span>Expert Editor</span>
                        </h4>
                        <p className="text-sm text-muted-foreground">Premium rates and exclusive assignments</p>
                      </div>
                    </div>
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