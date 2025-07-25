"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Search, Plus, BookOpen, Users, Clock, Calendar, MapPin } from "lucide-react"

const classes = [
  {
    id: 1,
    name: "Mathematics 10A",
    teacher: "Dr. Sarah Mitchell",
    students: 28,
    capacity: 30,
    schedule: "Mon, Wed, Fri - 9:00 AM",
    room: "Room 201",
    subject: "Mathematics",
    grade: "10",
    avatar: "/placeholder.svg?height=40&width=40",
    attendance: 92,
  },
  {
    id: 2,
    name: "Physics 11B",
    teacher: "Prof. James Wilson",
    students: 25,
    capacity: 30,
    schedule: "Tue, Thu - 10:30 AM",
    room: "Lab 105",
    subject: "Physics",
    grade: "11",
    avatar: "/placeholder.svg?height=40&width=40",
    attendance: 88,
  },
  {
    id: 3,
    name: "English Literature 12A",
    teacher: "Ms. Emily Chen",
    students: 22,
    capacity: 25,
    schedule: "Mon, Wed, Fri - 2:00 PM",
    room: "Room 301",
    subject: "English",
    grade: "12",
    avatar: "/placeholder.svg?height=40&width=40",
    attendance: 95,
  },
  {
    id: 4,
    name: "Chemistry 11A",
    teacher: "Mr. David Rodriguez",
    students: 30,
    capacity: 30,
    schedule: "Tue, Thu, Fri - 11:00 AM",
    room: "Lab 203",
    subject: "Chemistry",
    grade: "11",
    avatar: "/placeholder.svg?height=40&width=40",
    attendance: 90,
  },
  {
    id: 5,
    name: "Biology 10B",
    teacher: "Dr. Lisa Thompson",
    students: 26,
    capacity: 28,
    schedule: "Mon, Wed - 1:00 PM",
    room: "Lab 104",
    subject: "Biology",
    grade: "10",
    avatar: "/placeholder.svg?height=40&width=40",
    attendance: 94,
  },
]

const classStats = [
  { title: "Total Classes", value: "24", color: "from-blue-500 to-purple-500", icon: BookOpen },
  { title: "Active Students", value: "687", color: "from-green-500 to-blue-500", icon: Users },
  { title: "Avg Attendance", value: "91.8%", color: "from-purple-500 to-pink-500", icon: Calendar },
  { title: "Capacity Used", value: "85.2%", color: "from-orange-500 to-red-500", icon: Clock },
]

export default function ClassesPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredClasses = classes.filter(
    (cls) =>
      cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.teacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.subject.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen gradient-bg">
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-slate-600 bg-slate-900/80 backdrop-blur-sm px-4">
          <SidebarTrigger className="-ml-1 text-white hover:bg-blue-500/20" />
          <div className="flex flex-1 items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold text-white">Classes</h1>
              <p className="text-sm text-blue-300">Manage class schedules and assignments</p>
            </div>
            <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 electric-glow">
              <Plus className="h-4 w-4" />
              Create Class
            </Button>
          </div>
        </header>

        <div className="flex-1 space-y-6 p-4 md:p-6">
          {/* Class Statistics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {classStats.map((stat) => (
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

          {/* Search and Filters */}
          <Card className="card-gradient border-slate-600">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <BookOpen className="h-5 w-5 text-blue-400" />
                Class Directory
              </CardTitle>
              <CardDescription className="text-slate-300">Search and manage all classes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search classes by name, teacher, or subject..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400"
                  />
                </div>
                <Button variant="outline" className="bg-slate-800/50 border-slate-600 text-white hover:bg-slate-700/50">
                  Filter
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Classes Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredClasses.map((cls) => (
              <Card
                key={cls.id}
                className="card-gradient border-slate-600 hover:scale-[1.02] transition-all electric-glow"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 ring-2 ring-blue-500/30">
                        <AvatarImage src={cls.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                          {cls.teacher
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg text-white">{cls.name}</CardTitle>
                        <p className="text-sm text-slate-400">{cls.teacher}</p>
                      </div>
                    </div>
                    <Badge className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/30">
                      Grade {cls.grade}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-slate-300">
                      <Users className="h-4 w-4 text-blue-400" />
                      <span>
                        {cls.students}/{cls.capacity} students
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-300">
                      <MapPin className="h-4 w-4 text-green-400" />
                      <span>{cls.room}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-300 col-span-2">
                      <Clock className="h-4 w-4 text-orange-400" />
                      <span>{cls.schedule}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-300">Capacity</span>
                      <span className="text-white">{Math.round((cls.students / cls.capacity) * 100)}%</span>
                    </div>
                    <Progress value={(cls.students / cls.capacity) * 100} className="h-2 bg-slate-700" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-300">Attendance</span>
                      <span className="text-white">{cls.attendance}%</span>
                    </div>
                    <Progress value={cls.attendance} className="h-2 bg-slate-700" />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      size="sm"
                      className="flex-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-blue-300 hover:bg-blue-500/30"
                    >
                      View Details
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 bg-slate-800/50 border-slate-600 text-white hover:bg-slate-700/50"
                    >
                      Edit Class
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </SidebarInset>
    </div>
  )
}
