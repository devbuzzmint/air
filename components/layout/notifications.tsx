"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { Bell } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"

// Business notifications
const businessNotifications = [
  {
    id: "1",
    type: "job_accepted",
    title: "Job Accepted",
    message: "Sarah Johnson has accepted your technical documentation job",
    date: "2024-02-20T10:30:00",
    read: false
  },
  {
    id: "2",
    type: "job_review",
    title: "Job Ready for Review",
    message: "AI Implementation Guide is ready for your review",
    date: "2024-02-19T15:45:00",
    read: false
  }
]

// Editor notifications
const editorNotifications = [
  {
    id: "1",
    type: "new_job",
    title: "New Job Available",
    message: "A new technical documentation job has been posted that matches your skills",
    date: "2024-02-20T10:30:00",
    read: false
  },
  {
    id: "2",
    type: "payment",
    title: "Payment Received",
    message: "Payment of £450 has been processed for 'AI Implementation Guide'",
    date: "2024-02-19T15:45:00",
    read: false
  },
  {
    id: "3",
    type: "completion",
    title: "Job Approved",
    message: "Client has signed off on 'Product Launch Blog Series'",
    date: "2024-02-18T09:15:00",
    read: true
  }
]

export function NotificationsDialog() {
  const pathname = usePathname()
  const isBusinessSection = pathname.startsWith('/business')
  
  const [isOpen, setIsOpen] = useState(false)
  const [localNotifications, setLocalNotifications] = useState(
    isBusinessSection ? businessNotifications : editorNotifications
  )
  const unreadCount = localNotifications.filter(n => !n.read).length

  const markAsRead = (id: string) => {
    setLocalNotifications(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    )
  }

  const markAllAsRead = () => {
    setLocalNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    )
  }

  const getNotificationIcon = (type: string) => {
    if (isBusinessSection) {
      switch (type) {
        case "job_accepted":
          return "✅"
        case "job_review":
          return "📝"
        default:
          return "📋"
      }
    } else {
      switch (type) {
        case "new_job":
          return "🎯"
        case "payment":
          return "💰"
        case "completion":
          return "✅"
        default:
          return "📝"
      }
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-xs flex items-center justify-center text-primary-foreground">
              {unreadCount}
            </span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Notifications</DialogTitle>
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                Mark all as read
              </Button>
            )}
          </div>
        </DialogHeader>
        <div className="space-y-4">
          {localNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg ${
                notification.read ? "bg-muted" : "bg-primary/5 border-l-2 border-primary"
              }`}
              onClick={() => markAsRead(notification.id)}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{getNotificationIcon(notification.type)}</span>
                  <h4 className="font-medium">{notification.title}</h4>
                </div>
                {!notification.read && (
                  <Badge variant="secondary" className="bg-primary/20 text-primary">
                    New
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {notification.message}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                {format(new Date(notification.date), "MMM d, h:mm a")}
              </p>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}