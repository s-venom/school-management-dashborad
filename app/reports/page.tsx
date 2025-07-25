"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Progress } from "@/components/ui/progress"
import { BarChart3, Download, FileText, TrendingUp, Users, Calendar, DollarSign } from "lucide-react"

const reportTypes = [
  {
    title: "Student Performance Report",
    description: "Comprehensive academic performance analysis",
    icon: TrendingUp,
    color: "from-blue-500 to-purple-500",
    lastGenerated: "2 hours ago",
    status: "ready",
  },
  {
    title: "Attendance Summary",
    description: "Monthly attendance statistics and trends",
    icon: Calendar,
    color: "from-green-500 to-blue-500",
    lastGenerated: "1 day ago",
    status: "ready",
  },
  {
    title: "Financial Report",
    description: "Fee collection and expense analysis",
    icon: DollarSign,
    color: "from-orange-500 to-red-500",
    lastGenerated: "3 days ago",
    status: "generating",
  },
  {
    title: "Staff Performance",
    description: "Teacher evaluation and feedback summary",
    icon: Users,
    color: "from-purple-500 to-pink-500",
    lastGenerated: "1 week ago",
    status: "ready",
  },
]

const recentReports = [
  {
    id: 1,
    name: "Q4 Academic Performance Report",
    type: "Academic",
    generatedBy: "System",
    date: "Dec 10, 2024",
    size: "2.4 MB",
    downloads: 45,
  },
  {
    id: 2,
    name: "November Attendance Summary",
    type: "Attendance",
    generatedBy: "Admin",
    date: "Dec 1, 2024",
    size: "1.8 MB",
    downloads: 23,
  },
  {
    id: 3,
    name: "Fee Collection Report - Nov",
    type: "Financial",
    generatedBy: "System",
    date: "Nov 30, 2024",
    size: "3.1 MB",
    downloads: 67,
  },
  {
    id: 4,
    name: "Teacher Evaluation Summary",
    type: "Staff",
    generatedBy: "Principal",
    date: "Nov 25, 2024",
    size: "1.2 MB",
    downloads: 12,
  },
]

const reportStats = [
  { title: "Reports Generated", value: "156", color: "from-blue-500 to-purple-500", icon: FileText },
  { title: "Total Downloads", value: "2,847", color: "from-green-500 to-blue-500", icon: Download },
  { title: "Active Reports", value: "23", color: "from-purple-500 to-pink-500", icon: BarChart3 },
  { title: "Scheduled Reports", value: "8", color: "from-orange-500 to-red-500", icon: Calendar },
]

export default function ReportsPage() {
  return (
    <div className="min-h-screen gradient-bg">
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-slate-600 bg-slate-900/80 backdrop-blur-sm px-4">
          <SidebarTrigger className="-ml-1 text-white hover:bg-blue-500/20" />
          <div className="flex flex-1 items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold text-white">Reports</h1>
              <p className="text-sm text-blue-300">Generate and manage school reports</p>
            </div>
            <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 electric-glow">
              <FileText className="h-4 w-4" />
              Generate Report
            </Button>
          </div>
        </header>

        <div className="flex-1 space-y-6 p-4 md:p-6">
          {/* Report Statistics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {reportStats.map((stat) => (
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

          {/* Report Types */}
          <Card className="card-gradient border-slate-600">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <BarChart3 className="h-5 w-5 text-blue-400" />
                Available Reports
              </CardTitle>
              <CardDescription className="text-slate-300">Generate comprehensive school reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {reportTypes.map((report, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg border border-slate-600 hover:border-blue-500/50 transition-all bg-slate-800/30"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg bg-gradient-to-r ${report.color} bg-opacity-20`}>
                          <report.icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-medium text-white">{report.title}</h3>
                          <p className="text-sm text-slate-400">{report.description}</p>
                        </div>
                      </div>
                      <Badge
                        className={
                          report.status === "ready"
                            ? "bg-green-500/20 text-green-300 border-green-500/30"
                            : "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
                        }
                      >
                        {report.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-400">Last: {report.lastGenerated}</span>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-slate-800/50 border-slate-600 text-white hover:bg-slate-700/50"
                        >
                          Preview
                        </Button>
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-blue-300 hover:bg-blue-500/30"
                          disabled={report.status === "generating"}
                        >
                          {report.status === "generating" ? "Generating..." : "Generate"}
                        </Button>
                      </div>
                    </div>
                    {report.status === "generating" && (
                      <div className="mt-3">
                        <Progress value={65} className="h-2 bg-slate-700" />
                        <p className="text-xs text-slate-400 mt-1">Processing... 65% complete</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Reports */}
          <Card className="card-gradient border-slate-600">
            <CardHeader>
              <CardTitle className="text-white">Recent Reports</CardTitle>
              <CardDescription className="text-slate-300">Recently generated and downloaded reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReports.map((report) => (
                  <div
                    key={report.id}
                    className="flex items-center justify-between p-4 rounded-lg border border-slate-600 hover:bg-slate-800/30 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-blue-500/20">
                        <FileText className="h-5 w-5 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-white">{report.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-slate-400">
                          <span>Generated by {report.generatedBy}</span>
                          <span>{report.date}</span>
                          <span>{report.size}</span>
                          <span>{report.downloads} downloads</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/30">
                        {report.type}
                      </Badge>
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-slate-800/50 border-slate-600 text-white hover:bg-slate-700/50"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </div>
  )
}
