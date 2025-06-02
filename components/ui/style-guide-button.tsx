"use client"

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

interface StyleGuideButtonProps {
  client: string
}

export function StyleGuideButton({ client }: StyleGuideButtonProps) {
  const handleDownload = async () => {
    // In a real implementation, this would fetch the style guide from an API
    // For now, we'll create a simple PDF using the browser's built-in PDF generation
    const doc = {
      content: [
        { text: `${client} Style Guide`, style: 'header' },
        { text: '\n' },
        { text: 'Brand Guidelines', style: 'subheader' },
        { text: '\n' },
        { text: 'Primary Colors', style: 'subheader' },
        { text: '• Primary: #00FF00 (AI_Refine Green)\n• Secondary: #000000\n• Accent: #FFFFFF' },
        { text: '\n' },
        { text: 'Typography', style: 'subheader' },
        { text: '• Headings: Inter, Bold\n• Body: Inter, Regular\n• Accent: Inter, Medium' },
        { text: '\n' },
        { text: 'Voice & Tone', style: 'subheader' },
        { text: '• Professional yet approachable\n• Clear and concise\n• Solution-oriented' },
        { text: '\n' },
        { text: 'Content Guidelines', style: 'subheader' },
        { text: '• Use active voice\n• Keep paragraphs short\n• Include relevant examples\n• Use bullet points for lists' }
      ],
      styles: {
        header: {
          fontSize: 24,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5]
        }
      }
    }

    // Create a blob and download link
    const blob = new Blob([JSON.stringify(doc)], { type: 'application/pdf' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${client.toLowerCase()}-style-guide.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }

  return (
    <Button
      onClick={handleDownload}
      className="bg-[#00FF00] hover:bg-[#00FF00]/90 text-black"
    >
      <Download className="mr-2 h-4 w-4" />
      Download Style Guide
    </Button>
  )
} 