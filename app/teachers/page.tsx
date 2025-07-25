"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Plus, MoreHorizontal, Mail, Phone, Edit, Trash2, UserCheck, BookOpen, Star } from "lucide-react"

const teachers = [
  {
    id: 1,
    name: "Dr. Sarah Mitchell",
    email: "sarah.mitchell@school.edu",
    phone: "+1 (555) 123-4567",
    subject: "Mathematics",
    experience: "8 years",
    status: "Active",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4.8,
    classes: 5,
  },
  {
    id: 2,
    name: "Prof. James Wilson",
    email: "james.wilson@school.edu",
    phone: "+1 (555) 234-5678",
    subject: "Physics",
    experience: "12 years",
    status: "Active",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4.9,
    classes: 4,
  },
  {
    id: 3,
    name: "Ms. Emily Chen",
    email: "emily.chen@school.edu",
    phone: "+1 (555) 345-6789",
    subject: "English Literature",
    experience: "6 years",
    status: "On Leave",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4.7,
    classes: 3,
  },
  {
    id: 4,
    name: "Mr. David Rodriguez",
    email: "david.rodriguez@school.edu",
    phone: "+1 (555) 456-7890",
    subject: "Chemistry",
    experience: "10 years",
    status: "Active",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4.6,
    classes: 6,
  },
  {
    id: 5,
    name: "Dr. Lisa Thompson",
    email: "lisa.thompson@school.edu",
    phone: "+1 (555) 567-8901",
    subject: "Biology",
    experience: "15 years",
    status: "Active",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4.9,
    classes: 4,
  },
]

const departmentStats = [
  { department: "Science", teachers: 25, color: "from-blue-500 to-purple-500" },
  { department: "Mathematics", teachers: 18, color: "from-green-500 to-blue-500" },
  { department: "Languages", teachers: 22, color: "from-purple-500 to-pink-500" },
  { department: "Arts", teachers: 15, color: "from-orange-500 to-red-500" },
]

export default function TeachersPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredTeachers = teachers.filter(
    (teacher) =>
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.subject.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen gradient-bg">
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-slate-600 bg-slate-900/80 backdrop-blur-sm px-4">
          <SidebarTrigger className="-ml-1 text-white hover:bg-blue-500/20" />
          <div className="flex flex-1 items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold text-white">Teachers</h1>
              <p className="text-sm text-blue-300">Manage teaching staff and faculty</p>
            </div>
            <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 electric-glow">
              <Plus className="h-4 w-4" />
              Add Teacher
            </Button>
          </div>
        </header>

        <div className="flex-1 space-y-6 p-4 md:p-6">
          {/* Department Statistics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {departmentStats.map((stat) => (
              <Card key={stat.department} className="card-gradient border-slate-600 electric-glow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white">{stat.department}</CardTitle>
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${stat.color} bg-opacity-20`}>
                    <BookOpen className="h-4 w-4 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{stat.teachers}</div>
                  <p className="text-xs text-slate-300">Teachers</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Search and Filters */}
          <Card className="card-gradient border-slate-600">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <UserCheck className="h-5 w-5 text-blue-400" />
                Faculty Directory
              </CardTitle>
              <CardDescription className="text-slate-300">Search and manage all teaching staff</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search teachers by name, email, or subject..."
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

          {/* Teachers Table */}
          <Card className="card-gradient border-slate-600">
            <CardHeader>
              <CardTitle className="text-white">All Teachers ({filteredTeachers.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border border-slate-600 overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-600 hover:bg-slate-800/50">
                      <TableHead className="text-slate-300">Teacher</TableHead>
                      <TableHead className="text-slate-300">Contact</TableHead>
                      <TableHead className="text-slate-300">Subject</TableHead>
                      <TableHead className="text-slate-300">Performance</TableHead>
                      <TableHead className="text-slate-300">Status</TableHead>
                      <TableHead className="text-right text-slate-300">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTeachers.map((teacher) => (
                      <TableRow key={teacher.id} className="border-slate-600 hover:bg-slate-800/30">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10 ring-2 ring-blue-500/30">
                              <AvatarImage src={teacher.avatar || "/placeholder.svg"} />
                              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                                {teacher.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-white">{teacher.name}</div>
                              <div className="text-sm text-slate-400">{teacher.experience} experience</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm text-white">
                              <Mail className="h-3 w-3 text-blue-400" />
                              {teacher.email}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-400">
                              <Phone className="h-3 w-3 text-green-400" />
                              {teacher.phone}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/30">
                            {teacher.subject}
                          </Badge>
                          <div className="text-sm text-slate-400 mt-1">{teacher.classes} classes</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-white font-medium">{teacher.rating}</span>
                          </div>
                          <div className="text-sm text-slate-400">Rating</div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={
                              teacher.status === "Active"
                                ? "bg-green-500/20 text-green-300 border-green-500/30"
                                : "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
                            }
                          >
                            {teacher.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                className="h-8 w-8 p-0 text-slate-400 hover:text-white hover:bg-slate-700/50"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-slate-800 border-slate-600 text-white">
                              <DropdownMenuItem className="flex items-center gap-2 hover:bg-slate-700">
                                <Edit className="h-4 w-4" />
                                Edit Teacher
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center gap-2 hover:bg-slate-700">
                                <Mail className="h-4 w-4" />
                                Send Message
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center gap-2 text-red-400 hover:bg-red-500/20">
                                <Trash2 className="h-4 w-4" />
                                Remove Teacher
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </div>
  )
}
