"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function LoginPage() {
  const router = useRouter()

  const handleBusinessLogin = () => {
    router.push('/business')
  }

  const handleEditorLogin = () => {
    router.push('/editor')
  }

  const handleBusinessAdminLogin = () => {
    router.push('/business-admin')
  }

  return (
    <div className="min-h-screen flex items-center justify-center gradient-bg p-4">
      <div className="w-full max-w-[400px] bg-[#191942] p-8 rounded-lg space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">
            <span className="text-primary">AI</span> Refine
          </h1>
          <h2 className="text-2xl font-semibold mt-8 mb-2">Sign in to your account</h2>
        </div>

        <div className="space-y-4">
          <div>
            <Input
              type="email"
              placeholder="Email address"
              className="bg-muted"
            />
          </div>
          <div>
            <Input
              type="password"
              placeholder="Password"
              className="bg-muted"
            />
          </div>
          <Button className="w-full" size="lg">
            Sign in
          </Button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-[#191942] px-2 text-muted-foreground">
              Test Accounts
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="font-medium">Business Admin Account</h3>
                <p className="text-sm text-muted-foreground">admin@airefine.com</p>
              </div>
              <Button
                variant="link"
                className="text-primary"
                onClick={handleBusinessAdminLogin}
              >
                Use Account
              </Button>
            </div>
          </div>

          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="font-medium">Business Account</h3>
                <p className="text-sm text-muted-foreground">business@airefine.com</p>
              </div>
              <Button
                variant="link"
                className="text-primary"
                onClick={handleBusinessLogin}
              >
                Use Account
              </Button>
            </div>
          </div>

          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="font-medium">Editor Account</h3>
                <p className="text-sm text-muted-foreground">editor@airefine.com</p>
              </div>
              <Button
                variant="link"
                className="text-primary"
                onClick={handleEditorLogin}
              >
                Use Account
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}