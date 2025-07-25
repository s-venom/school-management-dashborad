"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { useToast } from "@/hooks/use-toast"
import {
  GraduationCap,
  UserCheck,
  BookOpen,
  TrendingUp,
  TrendingDown,
  Calendar,
  Bell,
  AlertCircle,
  Clock,
  DollarSign,
  Sparkles,
} from "lucide-react"
import { PushNotificationManager } from "@/components/push-notification-manager"
import { InstallPrompt } from "@/components/install-prompt"
import Link from "next/link"

const stats = [
  {
    title: "Total Students",
    value: "1,234",
    change: "+12%",
    trend: "up",
    icon: GraduationCap,
    color: "text-green-400",
    bgColor: "from-green-500/20 to-blue-500/10",
  },
  {
    title: "Active Teachers",
    value: "89",
    change: "+3%",
    trend: "up",
    icon: UserCheck,
    color: "text-blue-400",
    bgColor: "from-blue-500/20 to-purple-500/10",
  },
  {
    title: "Total Classes",
    value: "24",
    change: "0%",
    trend: "neutral",
    icon: BookOpen,
    color: "text-purple-400",
    bgColor: "from-purple-500/20 to-pink-500/10",
  },
  {
    title: "Monthly Revenue",
    value: "$45,230",
    change: "+8%",
    trend: "up",
    icon: DollarSign,
    color: "text-orange-400",
    bgColor: "from-orange-500/20 to-red-500/10",
  },
]

const recentActivities = [
  {
    id: 1,
    type: "enrollment",
    message: "New student John Doe enrolled in Grade 10",
    time: "2 minutes ago",
    icon: GraduationCap,
    status: "success",
  },
  {
    id: 2,
    type: "attendance",
    message: "Attendance marked for Class 9A - 28/30 present",
    time: "15 minutes ago",
    icon: Calendar,
    status: "info",
  },
  {
    id: 3,
    type: "payment",
    message: "Fee payment received from Sarah Wilson",
    time: "1 hour ago",
    icon: DollarSign,
    status: "success",
  },
  {
    id: 4,
    type: "alert",
    message: "Low attendance alert for Class 8B",
    time: "2 hours ago",
    icon: AlertCircle,
    status: "warning",
  },
]

const upcomingEvents = [
  {
    id: 1,
    title: "Parent-Teacher Meeting",
    date: "Tomorrow, 10:00 AM",
    type: "meeting",
    attendees: 45,
  },
  {
    id: 2,
    title: "Science Fair",
    date: "Dec 15, 2024",
    type: "event",
    attendees: 200,
  },
  {
    id: 3,
    title: "Winter Break Starts",
    date: "Dec 20, 2024",
    type: "holiday",
    attendees: null,
  },
]

export default function Dashboard() {
  const { toast } = useToast()
  const [attendanceData, setAttendanceData] = useState(85)

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      setAttendanceData((prev) => prev + (Math.random() - 0.5) * 2)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleQuickAction = (action: string) => {
    toast({
      title: "Action Triggered",
      description: `${action} functionality would be implemented here.`,
    })
  }

  return (
    <SidebarInset className="gradient-bg">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b border-slate-600 bg-slate-900/80 backdrop-blur-sm px-4">
        <SidebarTrigger className="-ml-1 text-white hover:bg-blue-500/20" />
        <div className="flex flex-1 items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-white">Dashboard</h1>
            <p className="text-sm text-blue-300">Welcome back, Admin!</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="animate-pulse-glow bg-gradient-to-r from-green-500 to-blue-500 text-white border-0">
              <div className="h-2 w-2 rounded-full bg-green-400 mr-2 animate-pulse"></div>
              System Online
            </Badge>
            <Link href="/landing">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 electric-glow">
                <Sparkles className="h-4 w-4 mr-2" />
                View Landing
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="flex-1 space-y-6 p-4 md:p-6 overflow-auto">
        {/* PWA Install Prompt */}
        <InstallPrompt />

        {/* Push Notification Manager */}
        <PushNotificationManager />

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card
              key={stat.title}
              className={`card-gradient transition-all duration-300 hover:scale-[1.02] electric-glow border-slate-600`}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">{stat.title}</CardTitle>
                <div className={`p-2 rounded-lg bg-gradient-to-r ${stat.bgColor}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="flex items-center text-xs text-slate-300">
                  {stat.trend === "up" ? (
                    <TrendingUp className="h-3 w-3 text-green-400 mr-1" />
                  ) : stat.trend === "down" ? (
                    <TrendingDown className="h-3 w-3 text-red-400 mr-1" />
                  ) : null}
                  <span
                    className={stat.trend === "up" ? "text-green-400" : stat.trend === "down" ? "text-red-400" : ""}
                  >
                    {stat.change}
                  </span>
                  <span className="ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Attendance Overview */}
          <Card className="md:col-span-2 card-gradient border-slate-600">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Calendar className="h-5 w-5 text-blue-400" />
                Today's Attendance Overview
              </CardTitle>
              <CardDescription className="text-slate-300">
                Real-time attendance tracking across all classes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-white">Overall Attendance</span>
                <span className="text-sm text-blue-300">{Math.round(attendanceData)}%</span>
              </div>
              <Progress value={attendanceData} className="h-3 bg-slate-700" />

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-300">Present</span>
                    <span className="font-medium text-green-400">1,045</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-300">Absent</span>
                    <span className="font-medium text-red-400">189</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-300">Late</span>
                    <span className="font-medium text-yellow-400">23</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-300">Excused</span>
                    <span className="font-medium text-blue-400">12</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="card-gradient border-slate-600">
            <CardHeader>
              <CardTitle className="text-white">Quick Actions</CardTitle>
              <CardDescription className="text-slate-300">Frequently used functions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start transition-all hover:scale-[1.02] bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-slate-600 text-white hover:bg-blue-500/20 hover:border-blue-500/50"
                onClick={() => handleQuickAction("Add New Student")}
              >
                <GraduationCap className="h-4 w-4 mr-2 text-blue-400" />
                Add New Student
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start transition-all hover:scale-[1.02] bg-gradient-to-r from-green-500/10 to-blue-500/10 border-slate-600 text-white hover:bg-green-500/20 hover:border-green-500/50"
                onClick={() => handleQuickAction("Mark Attendance")}
              >
                <Calendar className="h-4 w-4 mr-2 text-green-400" />
                Mark Attendance
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start transition-all hover:scale-[1.02] bg-gradient-to-r from-orange-500/10 to-red-500/10 border-slate-600 text-white hover:bg-orange-500/20 hover:border-orange-500/50"
                onClick={() => handleQuickAction("Send Announcement")}
              >
                <Bell className="h-4 w-4 mr-2 text-orange-400" />
                Send Announcement
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start transition-all hover:scale-[1.02] bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-slate-600 text-white hover:bg-purple-500/20 hover:border-purple-500/50"
                onClick={() => handleQuickAction("Generate Report")}
              >
                <TrendingUp className="h-4 w-4 mr-2 text-purple-400" />
                Generate Report
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Recent Activities */}
          <Card className="card-gradient border-slate-600">
            <CardHeader>
              <CardTitle className="text-white">Recent Activities</CardTitle>
              <CardDescription className="text-slate-300">Latest updates from your school</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-700/50 transition-colors border border-slate-700/50"
                  >
                    <div
                      className={`p-2 rounded-full ${
                        activity.status === "success"
                          ? "bg-green-500/20 text-green-400"
                          : activity.status === "warning"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-blue-500/20 text-blue-400"
                      }`}
                    >
                      <activity.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium text-white">{activity.message}</p>
                      <p className="text-xs text-slate-400 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card className="card-gradient border-slate-600">
            <CardHeader>
              <CardTitle className="text-white">Upcoming Events</CardTitle>
              <CardDescription className="text-slate-300">Important dates and events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-slate-700/50 hover:bg-slate-700/30 transition-all"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-white">{event.title}</p>
                      <p className="text-xs text-slate-400">{event.date}</p>
                    </div>
                    <div className="text-right">
                      <Badge
                        className={`${
                          event.type === "meeting"
                            ? "bg-blue-500/20 text-blue-300 border-blue-500/30"
                            : event.type === "event"
                              ? "bg-purple-500/20 text-purple-300 border-purple-500/30"
                              : "bg-orange-500/20 text-orange-300 border-orange-500/30"
                        }`}
                      >
                        {event.type}
                      </Badge>
                      {event.attendees && <p className="text-xs text-slate-400 mt-1">{event.attendees} attendees</p>}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SidebarInset>
  )
}
