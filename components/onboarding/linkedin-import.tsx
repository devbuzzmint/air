"use client"

import { useState } from "react"
import { Linkedin, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

type LinkedInImportProps = {
  onImportSuccess: (data: {
    firstName: string;
    lastName: string;
    email?: string;
    experience?: string;
  }) => void;
}

export function LinkedInImport({ onImportSuccess }: LinkedInImportProps) {
  const [isImporting, setIsImporting] = useState(false)

  const handleImport = () => {
    setIsImporting(true)
    
    // Simulate API call to LinkedIn
    setTimeout(() => {
      // Mock imported data
      const importedData = {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        experience: "5-10"
      }
      
      onImportSuccess(importedData)
      setIsImporting(false)
    }, 2000)
  }

  return (
    <div className="border rounded-md p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-[#0077B5] rounded-md flex items-center justify-center">
            <Linkedin className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="font-medium">Import from LinkedIn</h3>
            <p className="text-sm text-muted-foreground">
              Quickly fill your application with LinkedIn profile data
            </p>
          </div>
        </div>
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleImport}
          disabled={isImporting}
        >
          {isImporting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Importing...
            </>
          ) : (
            "Import Profile"
          )}
        </Button>
      </div>
    </div>
  )
} 