"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, Send, Search, Plus, Users, Mail, Phone } from "lucide-react"

const conversations = [
  {
    id: 1,
    name: "Parent Group - Grade 10A",
    lastMessage: "Thank you for the update about the science fair!",
    timestamp: "2 min ago",
    unread: 3,
    type: "group",
    avatar: "/placeholder.svg?height=40&width=40",
    participants: 28,
  },
  {
    id: 2,
    name: "Mrs. Johnson",
    lastMessage: "Could we schedule a meeting to discuss Alice's progress?",
    timestamp: "15 min ago",
    unread: 1,
    type: "individual",
    avatar: "/placeholder.svg?height=40&width=40",
    participants: 1,
  },
  {
    id: 3,
    name: "Teacher Staff Group",
    lastMessage: "Meeting rescheduled to 3 PM tomorrow",
    timestamp: "1 hour ago",
    unread: 0,
    type: "group",
    avatar: "/placeholder.svg?height=40&width=40",
    participants: 15,
  },
  {
    id: 4,
    name: "Mr. Davis",
    lastMessage: "The chemistry lab equipment has arrived",
    timestamp: "2 hours ago",
    unread: 0,
    type: "individual",
    avatar: "/placeholder.svg?height=40&width=40",
    participants: 1,
  },
  {
    id: 5,
    name: "Parent Group - Grade 11B",
    lastMessage: "Field trip permission forms are due Friday",
    timestamp: "3 hours ago",
    unread: 2,
    type: "group",
    avatar: "/placeholder.svg?height=40&width=40",
    participants: 25,
  },
]

const messages = [
  {
    id: 1,
    sender: "You",
    content: "Good morning everyone! Just a reminder that the science fair is scheduled for next Friday.",
    timestamp: "9:30 AM",
    isOwn: true,
  },
  {
    id: 2,
    sender: "Mrs. Johnson",
    content: "Thank you for the reminder! Alice is very excited about presenting her project!",
    timestamp: "9:35 AM",
    isOwn: false,
  },
  {
    id: 3,
    sender: "Mr. Smith",
    content: "Will there be parking available for parents who want to attend?",
    timestamp: "9:40 AM",
    isOwn: false,
  },
  {
    id: 4,
    sender: "You",
    content:
      "Yes, the main parking lot will be reserved for visitors. We'll also have volunteer guides to help direct everyone.",
    timestamp: "9:45 AM",
    isOwn: true,
  },
]

const messageStats = [
  { title: "Total Messages", value: "1,247", color: "from-blue-500 to-purple-500", icon: MessageSquare },
  { title: "Active Chats", value: "23", color: "from-green-500 to-blue-500", icon: Users },
  { title: "Unread", value: "6", color: "from-orange-500 to-red-500", icon: Mail },
  { title: "Response Rate", value: "94%", color: "from-purple-500 to-pink-500", icon: Send },
]

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0])
  const [newMessage, setNewMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredConversations = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, this would send the message
      setNewMessage("")
    }
  }

  return (
    <div className="min-h-screen gradient-bg">
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-slate-600 bg-slate-900/80 backdrop-blur-sm px-4">
          <SidebarTrigger className="-ml-1 text-white hover:bg-blue-500/20" />
          <div className="flex flex-1 items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold text-white">Messages</h1>
              <p className="text-sm text-blue-300">Communicate with parents, teachers, and staff</p>
            </div>
            <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 electric-glow">
              <Plus className="h-4 w-4" />
              New Message
            </Button>
          </div>
        </header>

        <div className="flex-1 p-4 md:p-6">
          {/* Message Statistics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
            {messageStats.map((stat) => (
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

          {/* Messages Interface */}
          <div className="grid gap-6 lg:grid-cols-3 h-[calc(100vh-280px)]">
            {/* Conversations List */}
            <Card className="card-gradient border-slate-600">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <MessageSquare className="h-5 w-5 text-blue-400" />
                  Conversations
                </CardTitle>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search conversations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1 max-h-96 overflow-y-auto">
                  {filteredConversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      className={`p-3 cursor-pointer transition-colors hover:bg-slate-700/50 ${
                        selectedConversation.id === conversation.id ? "bg-blue-500/20 border-r-2 border-blue-500" : ""
                      }`}
                      onClick={() => setSelectedConversation(conversation)}
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 ring-2 ring-blue-500/30">
                          <AvatarImage src={conversation.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                            {conversation.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-white truncate">{conversation.name}</h3>
                            <div className="flex items-center gap-2">
                              {conversation.unread > 0 && (
                                <Badge className="bg-red-500 text-white text-xs px-2 py-1">{conversation.unread}</Badge>
                              )}
                              <span className="text-xs text-slate-400">{conversation.timestamp}</span>
                            </div>
                          </div>
                          <p className="text-sm text-slate-400 truncate">{conversation.lastMessage}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge
                              className={
                                conversation.type === "group"
                                  ? "bg-purple-500/20 text-purple-300 border-purple-500/30"
                                  : "bg-green-500/20 text-green-300 border-green-500/30"
                              }
                            >
                              {conversation.type === "group" ? "Group" : "Individual"}
                            </Badge>
                            <span className="text-xs text-slate-500">{conversation.participants} participants</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Chat Interface */}
            <div className="lg:col-span-2 flex flex-col">
              <Card className="card-gradient border-slate-600 flex-1 flex flex-col">
                <CardHeader className="border-b border-slate-600">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 ring-2 ring-blue-500/30">
                        <AvatarImage src={selectedConversation.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                          {selectedConversation.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium text-white">{selectedConversation.name}</h3>
                        <p className="text-sm text-slate-400">{selectedConversation.participants} participants</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-slate-800/50 border-slate-600 text-white hover:bg-slate-700/50"
                      >
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-slate-800/50 border-slate-600 text-white hover:bg-slate-700/50"
                      >
                        <Mail className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="flex-1 p-4 overflow-y-auto">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div key={message.id} className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            message.isOwn
                              ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                              : "bg-slate-700 text-white"
                          }`}
                        >
                          {!message.isOwn && <p className="text-xs text-slate-300 mb-1">{message.sender}</p>}
                          <p className="text-sm">{message.content}</p>
                          <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>

                <div className="p-4 border-t border-slate-600">
                  <div className="flex items-center gap-2">
                    <Textarea
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-1 bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 resize-none"
                      rows={2}
                      onKeyPress={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault()
                          handleSendMessage()
                        }
                      }}
                    />
                    <Button
                      onClick={handleSendMessage}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0"
                      disabled={!newMessage.trim()}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </SidebarInset>
    </div>
  )
}
