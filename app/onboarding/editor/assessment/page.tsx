"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2, Clock, AlertCircle, CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Example assessment content
const assessmentContent = [
  {
    id: 1,
    title: "Technical Writing Correction",
    content: `The quantum computer uses qubits, witch can exist in multiple states simultenously due to a property caled quantum superposition. This allows quantum computers to procesd complex calculations much fastter than classical computers who use binary bits. However, quantum computers are still in their early stages of development, and many technical chalenges remain to be solved before they become widely accessable.`,
    instructions: "Correct all errors in grammar, spelling, and punctuation. Maintain the original tone and structure.",
    timeAllocation: 5, // minutes
  },
  {
    id: 2,
    title: "Tone Adjustment",
    content: `Hey folks! So I just wanted to let you know that our company totally crushed our sales targets this quarter. Like, we did SO MUCH BETTER than expected! It's super exciting, right?! Anyway, our CEO is pretty stoked about it and wants to thank everyone for their awesome work. You guys rock! Can't wait to see what amazing stuff we do next quarter. Peace out!`,
    instructions: "Rewrite this message to maintain the same information but use a professional business tone appropriate for a formal corporate announcement.",
    timeAllocation: 10, // minutes
  },
  {
    id: 3,
    title: "Factual Error Identification",
    content: `The Great Wall of China, completed in 1450 CE during the Tang Dynasty, is approximately 4,000 miles long and is the only man-made structure visible from space with the naked eye. It was primarily built to protect China from invasions by the Mongols led by Genghis Khan, who ruled during the 15th century. The wall is made primarily of brick and granite, and took over 2,000 years to complete, with millions of workers dying during its construction.`,
    instructions: "Identify all factual errors in this passage and explain the correct information.",
    timeAllocation: 15, // minutes
  }
]

export default function AssessmentPage() {
  const router = useRouter()
  const [currentTask, setCurrentTask] = useState(0)
  const [answers, setAnswers] = useState<{[key: number]: string}>({})
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [testCompleted, setTestCompleted] = useState(false)

  // Set timer when a new task is selected
  useEffect(() => {
    if (timeRemaining === null && assessmentContent[currentTask]) {
      setTimeRemaining(assessmentContent[currentTask].timeAllocation * 60)
    }
  }, [currentTask, timeRemaining])

  // Timer countdown
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null
    
    if (timeRemaining !== null && timeRemaining > 0 && !testCompleted) {
      timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1)
      }, 1000)
    } else if (timeRemaining === 0) {
      // Auto-submit when time runs out
      moveToNextTask()
    }
    
    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [timeRemaining, testCompleted])

  const handleAnswerChange = (taskId: number, value: string) => {
    setAnswers({
      ...answers,
      [taskId]: value
    })
  }

  const moveToNextTask = () => {
    if (currentTask < assessmentContent.length - 1) {
      setCurrentTask(currentTask + 1)
      setTimeRemaining(null) // Reset timer for next task
    } else {
      // Submit all answers
      submitAssessment()
    }
  }

  const submitAssessment = () => {
    setIsSubmitting(true)
    
    // Simulate API call to submit assessment
    setTimeout(() => {
      setIsSubmitting(false)
      setTestCompleted(true)
      
      // Wait a moment before redirecting
      setTimeout(() => {
        router.push("/onboarding/editor/interview")
      }, 3000)
    }, 2000)
  }

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  // If test is completed, show completion screen
  if (testCompleted) {
    return (
      <div className="container py-10">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-2xl">Assessment Completed</CardTitle>
              <CardDescription className="text-center">
                Thank you for completing the editing assessment
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center space-y-4">
              <CheckCircle2 className="h-16 w-16 text-green-500" />
              <p className="text-center">
                Your answers have been submitted successfully. We'll review your assessment and get back to you soon.
              </p>
              <p className="text-center text-muted-foreground">
                You'll now be redirected to schedule your interview.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const task = assessmentContent[currentTask]

  return (
    <div className="container py-10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">Editing Skills Assessment</h1>
          <p className="text-muted-foreground">
            Complete each task to the best of your ability within the time limit.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Tasks</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ul className="space-y-1">
                  {assessmentContent.map((task, index) => (
                    <li key={task.id} className="px-4 py-2 border-b last:border-0">
                      <div className="flex items-center gap-3">
                        <div 
                          className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-medium ${
                            currentTask === index 
                              ? 'bg-primary text-primary-foreground' 
                              : answers[task.id] 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-muted text-muted-foreground'
                          }`}
                        >
                          {index + 1}
                        </div>
                        <span className={`text-sm ${currentTask === index ? 'font-medium' : ''}`}>
                          {task.title}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{task.title}</CardTitle>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{timeRemaining !== null ? formatTime(timeRemaining) : '--:--'}</span>
                  </div>
                </div>
                <CardDescription>
                  Task {currentTask + 1} of {assessmentContent.length}
                </CardDescription>
                <Progress value={(currentTask / assessmentContent.length) * 100} className="mt-2" />
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Instructions</AlertTitle>
                  <AlertDescription>
                    {task.instructions}
                  </AlertDescription>
                </Alert>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Original Content:</h3>
                  <div className="p-4 bg-muted rounded-md">
                    <p className="whitespace-pre-wrap">{task.content}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Your Edit:</h3>
                  <Textarea 
                    placeholder="Enter your edited version here..."
                    className="min-h-[200px]"
                    value={answers[task.id] || ''}
                    onChange={(e) => handleAnswerChange(task.id, e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  disabled={currentTask === 0 || isSubmitting}
                  onClick={() => setCurrentTask(currentTask - 1)}
                >
                  Previous
                </Button>
                <Button 
                  onClick={moveToNextTask}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : currentTask === assessmentContent.length - 1 ? (
                    "Submit All"
                  ) : (
                    "Next Task"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 