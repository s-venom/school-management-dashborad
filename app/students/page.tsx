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
import { Search, Plus, MoreHorizontal, Mail, Phone, Edit, Trash2, Users, GraduationCap } from "lucide-react"

const students = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice.johnson@email.com",
    phone: "+1 (555) 123-4567",
    grade: "10A",
    status: "Active",
    avatar: "/placeholder.svg?height=40&width=40",
    gpa: "3.8",
    attendance: "95%",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob.smith@email.com",
    phone: "+1 (555) 234-5678",
    grade: "9B",
    status: "Active",
    avatar: "/placeholder.svg?height=40&width=40",
    gpa: "3.6",
    attendance: "92%",
  },
  {
    id: 3,
    name: "Carol Davis",
    email: "carol.davis@email.com",
    phone: "+1 (555) 345-6789",
    grade: "11A",
    status: "Inactive",
    avatar: "/placeholder.svg?height=40&width=40",
    gpa: "3.9",
    attendance: "88%",
  },
  {
    id: 4,
    name: "David Wilson",
    email: "david.wilson@email.com",
    phone: "+1 (555) 456-7890",
    grade: "10B",
    status: "Active",
    avatar: "/placeholder.svg?height=40&width=40",
    gpa: "3.7",
    attendance: "97%",
  },
  {
    id: 5,
    name: "Emma Brown",
    email: "emma.brown@email.com",
    phone: "+1 (555) 567-8901",
    grade: "9A",
    status: "Active",
    avatar: "/placeholder.svg?height=40&width=40",
    gpa: "4.0",
    attendance: "99%",
  },
]

const gradeStats = [
  { grade: "Grade 9", students: 245, color: "from-blue-500 to-purple-500" },
  { grade: "Grade 10", students: 298, color: "from-green-500 to-blue-500" },
  { grade: "Grade 11", students: 267, color: "from-purple-500 to-pink-500" },
  { grade: "Grade 12", students: 234, color: "from-orange-500 to-red-500" },
]

export default function StudentsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.grade.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen gradient-bg">
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-slate-600 bg-slate-900/80 backdrop-blur-sm px-4">
          <SidebarTrigger className="-ml-1 text-white hover:bg-blue-500/20" />
          <div className="flex flex-1 items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold text-white">Students</h1>
              <p className="text-sm text-blue-300">Manage student records and information</p>
            </div>
            <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 electric-glow">
              <Plus className="h-4 w-4" />
              Add Student
            </Button>
          </div>
        </header>

        <div className="flex-1 space-y-6 p-4 md:p-6">
          {/* Grade Statistics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {gradeStats.map((stat) => (
              <Card key={stat.grade} className="card-gradient border-slate-600 electric-glow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white">{stat.grade}</CardTitle>
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${stat.color} bg-opacity-20`}>
                    <Users className="h-4 w-4 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{stat.students}</div>
                  <p className="text-xs text-slate-300">Total Students</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Search and Filters */}
          <Card className="card-gradient border-slate-600">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <GraduationCap className="h-5 w-5 text-blue-400" />
                Student Directory
              </CardTitle>
              <CardDescription className="text-slate-300">Search and manage all student records</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search students by name, email, or grade..."
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

          {/* Students Table */}
          <Card className="card-gradient border-slate-600">
            <CardHeader>
              <CardTitle className="text-white">All Students ({filteredStudents.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border border-slate-600 overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-600 hover:bg-slate-800/50">
                      <TableHead className="text-slate-300">Student</TableHead>
                      <TableHead className="text-slate-300">Contact</TableHead>
                      <TableHead className="text-slate-300">Grade</TableHead>
                      <TableHead className="text-slate-300">Performance</TableHead>
                      <TableHead className="text-slate-300">Status</TableHead>
                      <TableHead className="text-right text-slate-300">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.map((student) => (
                      <TableRow key={student.id} className="border-slate-600 hover:bg-slate-800/30">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10 ring-2 ring-blue-500/30">
                              <AvatarImage src={student.avatar || "/placeholder.svg"} />
                              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                                {student.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-white">{student.name}</div>
                              <div className="text-sm text-slate-400">ID: {student.id.toString().padStart(4, "0")}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm text-white">
                              <Mail className="h-3 w-3 text-blue-400" />
                              {student.email}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-400">
                              <Phone className="h-3 w-3 text-green-400" />
                              {student.phone}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/30">
                            {student.grade}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="text-sm text-white">GPA: {student.gpa}</div>
                            <div className="text-sm text-slate-400">Attendance: {student.attendance}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={
                              student.status === "Active"
                                ? "bg-green-500/20 text-green-300 border-green-500/30"
                                : "bg-red-500/20 text-red-300 border-red-500/30"
                            }
                          >
                            {student.status}
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
                                Edit Student
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center gap-2 hover:bg-slate-700">
                                <Mail className="h-4 w-4" />
                                Send Message
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center gap-2 text-red-400 hover:bg-red-500/20">
                                <Trash2 className="h-4 w-4" />
                                Delete Student
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
