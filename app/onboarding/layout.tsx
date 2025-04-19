"use client"

import React from "react"
import Link from "next/link"

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b bg-background">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold">
              <span className="text-primary">AI</span>Refine
            </span>
          </Link>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-center gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} AIRefine. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
} 