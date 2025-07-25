"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Progress } from "@/components/ui/progress"
import { Calendar, Users, CheckCircle, XCircle, Clock, AlertTriangle } from "lucide-react"

const attendanceData = [
  {
    class: "Mathematics 10A",
    teacher: "Dr. Sarah Mitchell",
    total: 28,
    present: 26,
    absent: 2,
    late: 0,
    percentage: 92.9,
    status: "good",
  },
  {
    class: "Physics 11B",
    teacher: "Prof. James Wilson",
    total: 25,
    present: 22,
    absent: 2,
    late: 1,
    percentage: 88.0,
    status: "average",
  },
  {
    class: "English Literature 12A",
    teacher: "Ms. Emily Chen",
    total: 22,
    present: 21,
    absent: 1,
    late: 0,
    percentage: 95.5,
    status: "excellent",
  },
  {
    class: "Chemistry 11A",
    teacher: "Mr. David Rodriguez",
    total: 30,
    present: 27,
    absent: 3,
    late: 0,
    percentage: 90.0,
    status: "good",
  },
  {
    class: "Biology 10B",
    teacher: "Dr. Lisa Thompson",
    total: 26,
    present: 24,
    absent: 1,
    late: 1,
    percentage: 92.3,
    status: "good",
  },
]

const attendanceStats = [
  { title: "Overall Attendance", value: "91.7%", color: "from-green-500 to-blue-500", icon: CheckCircle },
  { title: "Present Today", value: "120", color: "from-blue-500 to-purple-500", icon: Users },
  { title: "Absent Today", value: "9", color: "from-red-500 to-orange-500", icon: XCircle },
  { title: "Late Arrivals", value: "2", color: "from-yellow-500 to-orange-500", icon: Clock },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "excellent":
      return "text-green-400 bg-green-500/20 border-green-500/30"
    case "good":
      return "text-blue-400 bg-blue-500/20 border-blue-500/30"
    case "average":
      return "text-yellow-400 bg-yellow-500/20 border-yellow-500/30"
    case "poor":
      return "text-red-400 bg-red-500/20 border-red-500/30"
    default:
      return "text-slate-400 bg-slate-500/20 border-slate-500/30"
  }
}

export default function AttendancePage() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])

  return (
    <div className="min-h-screen gradient-bg">
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-slate-600 bg-slate-900/80 backdrop-blur-sm px-4">
          <SidebarTrigger className="-ml-1 text-white hover:bg-blue-500/20" />
          <div className="flex flex-1 items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold text-white">Attendance</h1>
              <p className="text-sm text-blue-300">Track and manage student attendance</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-3 py-2 bg-slate-800/50 border border-slate-600 rounded-md text-white text-sm"
              />
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 electric-glow">
                Mark Attendance
              </Button>
            </div>
          </div>
        </header>

        <div className="flex-1 space-y-6 p-4 md:p-6">
          {/* Attendance Statistics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {attendanceStats.map((stat) => (
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

          {/* Today's Attendance Overview */}
          <Card className="card-gradient border-slate-600">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Calendar className="h-5 w-5 text-blue-400" />
                Today's Attendance Overview
              </CardTitle>
              <CardDescription className="text-slate-300">
                Real-time attendance tracking for {new Date(selectedDate).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {attendanceData.map((item, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-white">{item.class}</h3>
                        <p className="text-sm text-slate-400">{item.teacher}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                        <span className="text-white font-medium">{item.percentage.toFixed(1)}%</span>
                      </div>
                    </div>

                    <Progress value={item.percentage} className="h-2 bg-slate-700" />

                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-slate-400" />
                        <span className="text-slate-300">Total: {item.total}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span className="text-green-400">Present: {item.present}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <XCircle className="h-4 w-4 text-red-400" />
                        <span className="text-red-400">Absent: {item.absent}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-yellow-400" />
                        <span className="text-yellow-400">Late: {item.late}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Attendance Alerts */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="card-gradient border-red-500/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-300">
                  <AlertTriangle className="h-5 w-5" />
                  Low Attendance Alert
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                    <div>
                      <p className="font-medium text-white">Physics 11B</p>
                      <p className="text-sm text-red-300">Below 90% threshold</p>
                    </div>
                    <span className="text-red-400 font-bold">88.0%</span>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 text-red-300 hover:bg-red-500/30">
                    Send Alert to Parents
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="card-gradient border-green-500/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-300">
                  <CheckCircle className="h-5 w-5" />
                  Perfect Attendance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                    <div>
                      <p className="font-medium text-white">English Literature 12A</p>
                      <p className="text-sm text-green-300">Excellent attendance</p>
                    </div>
                    <span className="text-green-400 font-bold">95.5%</span>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 text-green-300 hover:bg-green-500/30">
                    Send Appreciation
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </div>
  )
}
