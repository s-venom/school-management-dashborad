"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { PushNotificationManager } from "@/components/push-notification-manager"
import { Badge } from "@/components/ui/badge"
import { Bell, Send, Users, Calendar, AlertTriangle, CheckCircle, Sparkles, Clock } from "lucide-react"

const notifications = [
  {
    id: 1,
    title: "Parent-Teacher Meeting Reminder",
    message: "Don't forget about the upcoming parent-teacher meeting scheduled for tomorrow at 10:00 AM.",
    type: "reminder",
    priority: "high",
    recipients: 45,
    sent: true,
    timestamp: "2 hours ago",
  },
  {
    id: 2,
    title: "Low Attendance Alert",
    message: "Class 8B has shown consistently low attendance this week. Please review and take necessary action.",
    type: "alert",
    priority: "urgent",
    recipients: 12,
    sent: true,
    timestamp: "4 hours ago",
  },
  {
    id: 3,
    title: "New Student Enrollment",
    message: "Welcome John Doe to Grade 10A. Please ensure all necessary documentation is completed.",
    type: "info",
    priority: "normal",
    recipients: 8,
    sent: false,
    timestamp: "1 day ago",
  },
  {
    id: 4,
    title: "Fee Payment Reminder",
    message: "Monthly fee payment is due in 3 days. Please remind parents to complete payments on time.",
    type: "reminder",
    priority: "normal",
    recipients: 234,
    sent: true,
    timestamp: "2 days ago",
  },
]

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "urgent":
      return "from-red-500/20 to-orange-500/10 border-red-500/30 text-red-300"
    case "high":
      return "from-orange-500/20 to-yellow-500/10 border-orange-500/30 text-orange-300"
    case "normal":
      return "from-blue-500/20 to-purple-500/10 border-blue-500/30 text-blue-300"
    default:
      return "from-slate-500/20 to-slate-400/10 border-slate-500/30 text-slate-300"
  }
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case "alert":
      return AlertTriangle
    case "reminder":
      return Calendar
    case "info":
      return Bell
    default:
      return Bell
  }
}

const notificationStats = [
  { title: "Total Sent", value: "1,247", color: "from-blue-500 to-purple-500", icon: Send },
  { title: "Pending", value: "23", color: "from-yellow-500 to-orange-500", icon: Clock },
  { title: "Recipients", value: "2,891", color: "from-green-500 to-blue-500", icon: Users },
  { title: "Success Rate", value: "98.5%", color: "from-purple-500 to-pink-500", icon: CheckCircle },
]

export default function NotificationsPage() {
  return (
    <div className="min-h-screen gradient-bg">
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-slate-600 bg-slate-900/80 backdrop-blur-sm px-4">
          <SidebarTrigger className="-ml-1 text-white hover:bg-blue-500/20" />
          <div className="flex flex-1 items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold text-white">Notifications</h1>
              <p className="text-sm text-blue-300">Manage push notifications and alerts</p>
            </div>
            <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 electric-glow">
              <Send className="h-4 w-4" />
              Create Notification
            </Button>
          </div>
        </header>

        <div className="flex-1 space-y-6 p-4 md:p-6">
          {/* Notification Statistics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {notificationStats.map((stat) => (
              <Card key={stat.title} className="card-gradient border-slate-600 electric-glow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white">{stat.title}</CardTitle>
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${stat.color} bg-opacity-20`}>
                    <stat.icon className="h-4 w-4 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Push Notification Demo */}
          <PushNotificationManager />

          {/* Notification History */}
          <Card className="card-gradient border-slate-600">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Sparkles className="h-5 w-5 text-blue-400" />
                Notification History
              </CardTitle>
              <CardDescription className="text-slate-300">
                Recent notifications sent to students, teachers, and parents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.map((notification) => {
                  const IconComponent = getTypeIcon(notification.type)
                  return (
                    <div
                      key={notification.id}
                      className={`p-4 rounded-lg border transition-all hover:scale-[1.01] bg-gradient-to-r ${getPriorityColor(notification.priority)}`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3 flex-1">
                          <div className="p-2 rounded-full bg-slate-800/50">
                            <IconComponent className="h-4 w-4" />
                          </div>
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium text-white">{notification.title}</h3>
                              <Badge
                                className={
                                  notification.priority === "urgent"
                                    ? "bg-red-500/30 text-red-300 border-red-500/50"
                                    : notification.priority === "high"
                                      ? "bg-orange-500/30 text-orange-300 border-orange-500/50"
                                      : "bg-blue-500/30 text-blue-300 border-blue-500/50"
                                }
                              >
                                {notification.priority}
                              </Badge>
                            </div>
                            <p className="text-sm text-slate-200">{notification.message}</p>
                            <div className="flex items-center gap-4 text-xs text-slate-400">
                              <span className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                {notification.recipients} recipients
                              </span>
                              <span>{notification.timestamp}</span>
                              <div className="flex items-center gap-1">
                                {notification.sent ? (
                                  <>
                                    <CheckCircle className="h-3 w-3 text-green-400" />
                                    <span className="text-green-400">Sent</span>
                                  </>
                                ) : (
                                  <>
                                    <div className="h-3 w-3 rounded-full bg-yellow-500 animate-pulse" />
                                    <span className="text-yellow-400">Pending</span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-slate-400 hover:text-white hover:bg-slate-700/50"
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="card-gradient border-red-500/30 hover:border-red-500/50 transition-all cursor-pointer group">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2 text-white">
                  <AlertTriangle className="h-4 w-4 text-red-400" />
                  Emergency Alert
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-300 mb-3">Send urgent notifications to all users immediately</p>
                <Button className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white border-0">
                  Send Emergency Alert
                </Button>
              </CardContent>
            </Card>

            <Card className="card-gradient border-blue-500/30 hover:border-blue-500/50 transition-all cursor-pointer group">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2 text-white">
                  <Calendar className="h-4 w-4 text-blue-400" />
                  Event Reminder
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-300 mb-3">Schedule reminders for upcoming events and meetings</p>
                <Button
                  variant="outline"
                  className="w-full bg-slate-800/50 border-slate-600 text-white hover:bg-blue-500/20 hover:border-blue-500/50"
                >
                  Schedule Reminder
                </Button>
              </CardContent>
            </Card>

            <Card className="card-gradient border-green-500/30 hover:border-green-500/50 transition-all cursor-pointer group">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2 text-white">
                  <Users className="h-4 w-4 text-green-400" />
                  Bulk Notification
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-300 mb-3">Send notifications to specific groups or classes</p>
                <Button
                  variant="outline"
                  className="w-full bg-slate-800/50 border-slate-600 text-white hover:bg-green-500/20 hover:border-green-500/50"
                >
                  Create Bulk Message
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </div>
  )
}
