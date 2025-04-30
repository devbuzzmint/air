"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"
import { Settings, LogOut, PoundSterling } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { NotificationsDialog } from "./notifications"
import { format } from "date-fns"

export function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const isBusinessSection = pathname.startsWith('/business')
  const today = format(new Date(), "EEEE, do MMMM yyyy")

  const handleLogout = () => {
    router.push('/')
  }

  return (
    <div className="h-16 border-b border-border bg-[#191C44]/95 backdrop-blur supports-[backdrop-filter]:bg-[#191C44]/60 px-8">
      <div className="flex h-16 items-center justify-between">
        <div className="flex items-center space-x-6">
          <p className="text-sm text-muted-foreground">
            {today}
          </p>
        </div>

        <div className="flex items-center gap-8">
          <NotificationsDialog />
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <LogOut className="h-5 w-5" />
          </Button>
          <Avatar className="h-8 w-8">
            <AvatarImage 
              src={
                pathname.startsWith('/business-admin')
                  ? "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=150&h=150&auto=format&fit=crop"
                  : isBusinessSection
                ? "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&h=150&auto=format&fit=crop"
                : "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&h=150&auto=format&fit=crop"
              } 
            />
            <AvatarFallback>{isBusinessSection ? "JD" : "TJ"}</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  )
}