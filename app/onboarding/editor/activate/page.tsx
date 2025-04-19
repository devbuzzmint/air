"use client"

import { EditorActivation } from "@/components/onboarding/editor-activation"

export default function ActivatePage() {
  // In a real app, this data would come from the user's profile in the database
  const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    appliedDate: "January 15, 2024",
    completedDate: "January 25, 2024"
  }

  return (
    <div className="container py-10">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">Activate Your Editor Account</h1>
          <p className="text-muted-foreground">
            You're almost there! Review your application journey and activate your account.
          </p>
        </div>

        <EditorActivation userData={userData} />
      </div>
    </div>
  )
} 