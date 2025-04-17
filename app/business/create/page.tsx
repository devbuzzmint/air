"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { TiptapEditor } from "@/components/ui/tiptap"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { AlertCircle, HelpCircle, RefreshCw, Send } from 'lucide-react'

const contentTypes = [
  { id: 'blog-600', name: 'Blog Post (up to 600 words)', credits: 138 },
  { id: 'feature-1k', name: 'Feature Article (up to 1k words)', credits: 230 },
  { id: 'thought-2k', name: 'Thought Leadership (up to 2k words)', credits: 460 },
  { id: 'listicle-800', name: 'Listicle (800 words)', credits: 184 },
  { id: 'video-1', name: 'Video Script (up to 1 min)', credits: 69 },
  { id: 'video-3', name: 'Video Script (up to 3 min)', credits: 138 },
  { id: 'video-5', name: 'Video Script (up to 5 min)', credits: 207 },
  { id: 'social-200', name: 'Support Copy (up to 200 words)', credits: 46 },
  { id: 'social-400', name: 'Social Blog (up to 400 words)', credits: 92 },
  { id: 'white-1k', name: 'White Paper (up to 1k words)', credits: 230 },
  { id: 'white-3k', name: 'White Paper (up to 3k words)', credits: 690 },
  { id: 'white-5k', name: 'White Paper (up to 5k words)', credits: 1150 }
]

const contentLanguages = [
  { id: 'en-uk', name: 'English UK' },
  { id: 'en-us', name: 'English US' }
]

const formFields = {
  authorName: {
    label: "Author Name",
    placeholder: "Enter author name",
    tooltip: "Enter the name of the person you want this piece to be authored by - for example: John Smith, CEO, Smithco Industries"
  },
  industry: {
    label: "Industry",
    placeholder: "Enter industry",
    tooltip: "Enter the industry vertical you wish to address with this content. EG Retail banking in the UK"
  },
  geographicRegion: {
    label: "Geographic Region",
    placeholder: "Enter geographic region",
    tooltip: "What is the geographic region of your audience? EG. US business decision makers"
  },
  trendingTopic: {
    label: "Timely Topic",
    placeholder: "Enter topic",
    tooltip: "What is the topic you wish this content to address? Be as descriptive as possible"
  },
  targetAudience: {
    label: "Target Audience",
    placeholder: "Enter target audience",
    tooltip: "Who are you trying to reach with this content? Be as detailed as possible. EG - C-suite audiences in financial services in the UK"
  },
  audienceReaction: {
    label: "Audience Reaction",
    placeholder: "Enter desired reaction",
    tooltip: "What do you want your audience to feel? EG: challenge their assumptions, inspire confidence in your product"
  },
  audienceAction: {
    label: "Audience Action",
    placeholder: "Enter desired action",
    tooltip: "What do you want your audience to take after interacting with this content? EG; Download report, Book a sales call..."
  },
  keywords: {
    label: "Keywords",
    placeholder: "Enter keywords",
    tooltip: "List all keywords and phrases you want to rank for. Eg: Manufacturing trends, industrial development, infrastructure issues..."
  },
  whatNotToInclude: {
    label: "What Not to Include",
    placeholder: "Enter exclusions",
    tooltip: "What should we omit from your article? EG. Do not include data from our competitor SmithCo, Do not include data from outside the UK"
  },
  tone: {
    label: "Tone of Content",
    placeholder: "Enter content tone",
    tooltip: "Enter what you want your content to feel like. EG: bold, trustworthy, authoritative, empathic"
  },
  callToAction: {
    label: "Call to Action",
    placeholder: "Enter call to action",
    tooltip: "What do your want your audience to do next? EG: Click here to discover more, Sign up for our webinar on this topic..."
  },
  additionalInfo: {
    label: "Additional Information",
    placeholder: "Enter additional information",
    tooltip: "This is the most important field. Please enter here everything you would like included in this content. EG - Quotes from stakeholders, Relevant Data"
  }
}

export default function CreatePage() {
  const router = useRouter()
  const [activeStep, setActiveStep] = useState('details')
  const [error, setError] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState("")
  const [editedContent, setEditedContent] = useState("")
  const [editorNotes, setEditorNotes] = useState("")
  const [showGenerateDialog, setShowGenerateDialog] = useState(false)
  const [formData, setFormData] = useState({
    taskName: '',
    contentType: '',
    deadline: '',
    authorName: '',
    industry: '',
    geographicRegion: '',
    contentLanguage: '',
    trendingTopic: '',
    targetAudience: '',
    audienceAction: '',
    keywords: '',
    whatNotToInclude: '',
    tone: '',
    audienceReaction: '',
    callToAction: '',
    additionalInfo: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleNext = () => {
    if (!formData.taskName || !formData.contentType || !formData.deadline) {
      setError('Please fill in all required fields')
      return
    }
    setError('')
    setActiveStep('prompt')
  }

  const handleGenerateClick = () => {
    const requiredFields = [
      'authorName',
      'industry',
      'geographicRegion',
      'contentLanguage',
      'trendingTopic',
      'targetAudience',
      'audienceAction',
      'keywords',
      'tone',
      'audienceReaction',
      'callToAction'
    ]

    const missingFields = requiredFields.filter(field => !formData[field])
    if (missingFields.length > 0) {
      setError('Please fill in all required prompt fields')
      return
    }

    setShowGenerateDialog(true)
  }

  const handleGenerate = async () => {
    setIsGenerating(true)
    setError('')
    setShowGenerateDialog(false)

    try {
      // Simulate API call to generate content
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Example generated content with italicized input fields
      const content = `# ${formData.taskName}

## Introduction
In today's rapidly evolving ${formData.industry} landscape, organizations across ${formData.geographicRegion} are facing unprecedented challenges and opportunities. This comprehensive analysis, authored by ${formData.authorName}, explores the critical implications of ${formData.trendingTopic} for ${formData.targetAudience}.

## Market Overview
The current state of ${formData.industry} presents unique challenges:

- Rapid technological advancement
- Shifting consumer preferences
- Regulatory changes
- Competitive pressures

## Key Trends
Recent developments in ${formData.trendingTopic} have highlighted several important trends:

1. Digital Transformation
   - Impact on traditional business models
   - New opportunities for innovation
   - Integration challenges

2. Market Dynamics
   - Changing competitive landscape
   - Emerging market segments
   - Strategic partnerships

3. Future Outlook
   - Industry projections
   - Growth opportunities
   - Risk factors

## Strategic Implications
For ${formData.targetAudience}, these developments present several key considerations:

- Operational efficiency
- Market positioning
- Innovation strategy
- Risk management

## Recommendations
To succeed in this evolving landscape, organizations should:

1. Evaluate current capabilities
2. Develop comprehensive strategies
3. Invest in key technologies
4. Build strategic partnerships

## Conclusion
As the ${formData.industry} continues to evolve, organizations that embrace these changes while maintaining a focus on ${formData.audienceAction} will be best positioned for success.

## Call to Action
${formData.callToAction}`

      setGeneratedContent(content)
      setEditedContent(content)
      setActiveStep('review')
    } catch (error) {
      setError('Failed to generate content. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleSubmitToNetwork = async () => {
    setIsGenerating(true)
    setError('')

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      router.push('/business/jobs')
    } catch (error) {
      setError('Failed to submit job. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleSaveAndExit = () => {
    router.push('/business/jobs')
  }

  const getSelectedContentType = () => {
    return contentTypes.find(type => type.id === formData.contentType)
  }

  const LabelWithTooltip = ({ label, tooltip }: { label: string, tooltip: string }) => (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium">{label}</span>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
          </TooltipTrigger>
          <TooltipContent className="max-w-[300px]">
            <p>{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )

  const renderFormField = (key: string, field: any) => {
    const isTextarea = ['additionalInfo', 'whatNotToInclude'].includes(key)
    const Component = isTextarea ? Textarea : Input
    
    return (
      <div key={key}>
        <LabelWithTooltip label={field.label} tooltip={field.tooltip} />
        <Component
          name={key}
          value={formData[key]}
          onChange={handleChange}
          placeholder={field.placeholder}
          className={`bg-muted mt-2 ${isTextarea ? 'min-h-[100px]' : ''}`}
        />
      </div>
    )
  }

  return (
    <div className="p-8 gradient-bg min-h-screen">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">Create New Job</h1>
          <Button variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
        </div>

        <Tabs value={activeStep} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="prompt">Prompt</TabsTrigger>
            <TabsTrigger value="review">Review</TabsTrigger>
          </TabsList>

          <TabsContent value="details">
            <Card className="dark-card">
              <div className="p-6">
                <form className="space-y-4">
                  {error && (
                    <div className="bg-destructive/10 text-destructive p-3 rounded-lg flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" />
                      <p className="text-sm">{error}</p>
                    </div>
                  )}

                  <div>
                    <label className="text-sm font-medium block mb-2">Job Name</label>
                    <Input
                      name="taskName"
                      value={formData.taskName}
                      onChange={handleChange}
                      placeholder="Enter a memorable name so you can find this project in your task list"
                      className="bg-muted"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium block mb-2">Content Type</label>
                    <Select value={formData.contentType} onValueChange={(value) => handleSelectChange('contentType', value)}>
                      <SelectTrigger className="bg-muted">
                        <SelectValue placeholder="Select content type" />
                      </SelectTrigger>
                      <SelectContent className="max-h-[300px]" position="popper">
                        {contentTypes.map(type => (
                          <SelectItem key={type.id} value={type.id} className="py-3">
                            <div className="flex justify-between items-center w-full gap-4">
                              <span className="flex-1">{type.name}</span>
                              <span className="text-primary font-medium whitespace-nowrap">
                                {type.credits} credits
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium block mb-2">Deadline</label>
                    <Input
                      name="deadline"
                      type="date"
                      value={formData.deadline}
                      onChange={handleChange}
                      className="bg-muted"
                      required
                    />
                  </div>
                </form>

                <div className="flex justify-between mt-6">
                  <Button variant="outline" size="sm" onClick={handleSaveAndExit}>
                    Save & Exit
                  </Button>
                  <Button onClick={handleNext}>Prompt Template</Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="prompt">
            <Card className="dark-card">
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Prompt Template</h2>
                <p className="text-muted-foreground mb-6">
                  Fill in the fields below to customize your prompt template
                </p>

                {error && (
                  <div className="bg-destructive/10 text-destructive p-3 rounded-lg flex items-center gap-2 mb-6">
                    <AlertCircle className="h-4 w-4" />
                    <p className="text-sm">{error}</p>
                  </div>
                )}

                <div className="space-y-4">
                  {Object.entries(formFields).map(([key, field]) => {
                    // Render fields in specific order
                    if (key === 'whatNotToInclude' || key === 'callToAction' || key === 'additionalInfo') {
                      return null // These will be rendered separately
                    }
                    return renderFormField(key, field)
                  })}

                  <div>
                    <label className="text-sm font-medium block mb-2">Content Language</label>
                    <Select 
                      value={formData.contentLanguage} 
                      onValueChange={(value) => handleSelectChange('contentLanguage', value)}
                    >
                      <SelectTrigger className="bg-muted">
                        <SelectValue placeholder="Select content language" />
                      </SelectTrigger>
                      <SelectContent>
                        {contentLanguages.map(lang => (
                          <SelectItem key={lang.id} value={lang.id}>
                            {lang.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Render What Not to Include after keywords */}
                  {renderFormField('whatNotToInclude', formFields.whatNotToInclude)}

                  {/* Render Call to Action before Additional Info */}
                  {renderFormField('callToAction', formFields.callToAction)}

                  {/* Render Additional Info last */}
                  {renderFormField('additionalInfo', formFields.additionalInfo)}
                </div>

                <div className="flex justify-between gap-4 mt-6">
                  <div className="flex gap-4">
                    <Button variant="outline" size="sm" onClick={handleSaveAndExit}>
                      Save & Exit
                    </Button>
                    <Button variant="outline" onClick={() => setActiveStep('details')}>
                      Back
                    </Button>
                  </div>
                  <Button 
                    onClick={handleGenerateClick}
                    disabled={isGenerating}
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      'Generate'
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="review">
            <Card className="dark-card">
              <div className="p-6">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-semibold">Job Details</h2>
                    <div className="mt-4 space-y-4">
                      <div>
                        <h3 className="font-medium">Job Name</h3>
                        <p className="text-muted-foreground">{formData.taskName}</p>
                      </div>
                      <div>
                        <h3 className="font-medium">Content Type</h3>
                        <div className="flex justify-between items-center text-muted-foreground">
                          <p>{getSelectedContentType()?.name}</p>
                          <p className="text-primary font-medium">{getSelectedContentType()?.credits} credits</p>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium">Deadline</h3>
                        <p className="text-muted-foreground">{formData.deadline}</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-border pt-6">
                    <h2 className="text-2xl font-semibold mb-4">Generated Content</h2>
                    <Button 
                      variant="outline" 
                      className="mb-4"
                      onClick={() => {
                        const editor = document.querySelector('[contenteditable="true"]')
                        if (editor) {
                          editor.setAttribute('contenteditable', 'true')
                          editor.focus()
                        }
                      }}
                    >
                      Edit Content
                    </Button>
                    <TiptapEditor 
                      content={editedContent} 
                      onChange={setEditedContent}
                    />
                  </div>

                  <div>
                    <h2 className="text-2xl font-semibold mb-4">Notes for Editor</h2>
                    <Textarea
                      value={editorNotes}
                      onChange={(e) => setEditorNotes(e.target.value)}
                      placeholder="Please describe here anything that will help the editor optimise your content..."
                      className="bg-muted min-h-[150px]"
                    />
                  </div>

                  {error && (
                    <div className="bg-destructive/10 text-destructive p-3 rounded-lg flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" />
                      <p className="text-sm">{error}</p>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <Button variant="outline" size="sm" onClick={handleSaveAndExit}>
                      Save & Exit
                    </Button>
                    <Button
                      onClick={handleSubmitToNetwork}
                      disabled={isGenerating}
                    >
                      {isGenerating ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Submit to Network
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={showGenerateDialog} onOpenChange={setShowGenerateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Generation</DialogTitle>
            <DialogDescription>
              Are you ready to generate content using the provided prompt? You will be charged {getSelectedContentType()?.credits} credits for this generation.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowGenerateDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleGenerate} disabled={isGenerating}>
              {isGenerating ? "Generating..." : "Confirm & Generate"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}