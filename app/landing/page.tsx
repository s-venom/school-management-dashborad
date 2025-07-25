"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import {
  ArrowRight,
  CheckCircle,
  Users,
  BarChart3,
  Zap,
  Shield,
  MessageSquare,
  Star,
  Play,
  Sparkles,
  Target,
  Bot,
} from "lucide-react"

const stats = [
  { value: "2,000+", label: "Schools Trust Us", color: "text-green-400" },
  { value: "28hrs", label: "Saved Per Week", color: "text-blue-400" },
  { value: "11,400", label: "Reports Generated", color: "text-orange-400" },
  { value: "99.9%", label: "Uptime Guaranteed", color: "text-purple-400" },
]

const testimonials = [
  {
    name: "Principal Sharma",
    role: "St. Mary's International",
    content: "Loving the new daily report summary! This dashboard literally runs my school.",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
  },
  {
    name: "Dr. Patel",
    role: "Greenwood Academy",
    content: "Admin tasks feel like cheating. It's that fast. Never going back to manual records.",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
  },
  {
    name: "Ms. Johnson",
    role: "Tech Valley School",
    content: "Reports build themselves. Attendance, fees, timetables — all done before morning tea.",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
  },
]

const features = [
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    description: "Live dashboards that update every second",
    color: "text-blue-400",
  },
  {
    icon: Users,
    title: "Custom User Roles",
    description: "Perfect permissions for every staff member",
    color: "text-green-400",
  },
  {
    icon: MessageSquare,
    title: "WhatsApp/Email Auto-Updates",
    description: "Parents get instant notifications automatically",
    color: "text-orange-400",
  },
  {
    icon: Shield,
    title: "Live Behavior Tracking",
    description: "Monitor teacher and student activities in real-time",
    color: "text-purple-400",
  },
]

const painPoints = [
  "Manual attendance taking 2+ hours daily",
  "Lost paperwork and missing records",
  "Parents calling for updates constantly",
  "Staff scheduling chaos every week",
  "Report card generation nightmare",
  "Fee collection tracking mess",
]

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.3),transparent_50%)]" />
        <div
          className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl transition-all duration-1000"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-purple-600">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold">AI-SchoolOS™</h1>
            <p className="text-xs text-blue-300">Not a tool. Your digital principal.</p>
          </div>
        </div>
        <Link href="/">
          <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25">
            🔵 Launch Demo
          </Button>
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-20 text-center">
        <div
          className={`max-w-6xl mx-auto transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Hook Copy */}
          <div className="mb-8">
            <Badge className="mb-4 bg-green-500/20 text-green-300 border-green-500/30 px-4 py-2 text-sm">
              <Target className="w-4 h-4 mr-2" />
              For Principals, Admin Heads & IT Officers
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              If you run a school,{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                this dashboard
              </span>{" "}
              will run it for you
            </h1>
            <p className="text-xl md:text-2xl text-blue-200 mb-8 max-w-3xl mx-auto">
              <span className="line-through text-gray-500">without hiring extra staff</span>
              <br />
              <span className="text-green-400 font-semibold">— without the chaos, paperwork, or headaches</span>
            </p>
          </div>

          {/* Primary CTA */}
          <div className="mb-12">
            <Link href="/">
              <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 text-lg rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25 group">
                Start Free Demo – No Setup, Just Control
                <Zap className="ml-2 h-5 w-5 group-hover:animate-pulse" />
              </Button>
            </Link>
            <p className="text-sm text-blue-300 mt-3">No login. No email. Full access. Brain = 🧨</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`transition-all duration-500 delay-${index * 100} ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                }`}
              >
                <div className="text-3xl md:text-4xl font-bold mb-2">
                  <span className={stat.color}>{stat.value}</span>
                </div>
                <div className="text-sm text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pattern Interrupt - Chaos to Order Animation */}
      <section className="relative z-10 px-6 py-20 bg-gradient-to-r from-red-900/20 to-green-900/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                <span className="text-red-400">Stop This Chaos</span>
                <br />
                <span className="text-green-400">Start This Control</span>
              </h2>
              <div className="space-y-4">
                {painPoints.map((pain, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-red-900/20 border border-red-500/30 rounded-lg transition-all duration-300 hover:bg-red-900/30"
                  >
                    <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                    <span className="text-red-200 line-through">{pain}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <Card className="bg-gradient-to-br from-green-900/40 to-blue-900/40 border-green-500/30 p-6">
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-green-300 font-semibold">AI-Powered Automation</span>
                  </div>
                  {[
                    "✅ Auto reports generated",
                    "✅ Instant attendance alerts",
                    "✅ 1-click parent messages",
                    "✅ Smart fee tracking",
                    "✅ Real-time dashboards",
                    "✅ Zero paperwork chaos",
                  ].map((feature, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-3 transition-all duration-500 delay-${index * 200} ${
                        isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-5"
                      }`}
                    >
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-green-200">{feature}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Meet Your New{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Admin Assistant
              </span>
            </h2>
            <p className="text-xl text-blue-200 mb-4">24/7 AI. No leaves. No excuses.</p>
            <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30 px-4 py-2">
              <Bot className="w-4 h-4 mr-2" />
              Powered by Advanced AI
            </Badge>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card
                key={feature.title}
                className={`bg-slate-800/50 border-slate-700 hover:border-blue-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl group cursor-pointer ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6 text-center">
                  <div
                    className={`inline-flex p-3 rounded-full bg-slate-700 mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-white">{feature.title}</h3>
                  <p className="text-gray-300 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative z-10 px-6 py-20 bg-gradient-to-r from-purple-900/20 to-blue-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">Why Schools Never Go Back After This</h2>

          <div className="relative">
            <Card className="bg-slate-800/50 border-slate-700 p-8 transition-all duration-500">
              <CardContent>
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-xl md:text-2xl text-white mb-6 italic">
                  "{testimonials[currentTestimonial].content}"
                </blockquote>
                <div className="flex items-center justify-center gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={testimonials[currentTestimonial].avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {testimonials[currentTestimonial].name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <div className="font-semibold text-white">{testimonials[currentTestimonial].name}</div>
                    <div className="text-blue-300 text-sm">{testimonials[currentTestimonial].role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial ? "bg-blue-400 scale-125" : "bg-gray-600"
                  }`}
                  onClick={() => setCurrentTestimonial(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Demo Preview */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            What if your reports{" "}
            <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              built themselves?
            </span>
          </h2>
          <p className="text-xl text-blue-200 mb-12">Timetables, attendance, fees — all done before morning tea.</p>

          <div className="relative group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
            <Card className="relative bg-slate-800/80 border-slate-600 p-8 rounded-2xl group-hover:scale-105 transition-all duration-300">
              <CardContent>
                <div className="flex items-center justify-center mb-6">
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center group-hover:animate-pulse">
                      <Play className="w-8 h-8 text-white ml-1" />
                    </div>
                    <div className="absolute inset-0 bg-blue-500/30 rounded-full animate-ping" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">See It In Action</h3>
                <p className="text-gray-300 mb-6">Watch how our AI transforms chaos into control in just 15 seconds</p>
                <Link href="/">
                  <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-3 rounded-full transition-all duration-300 hover:scale-105">
                    Launch Interactive Demo
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 px-6 py-20 bg-gradient-to-r from-blue-900/40 to-purple-900/40">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Your school deserves better.{" "}
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              It's time.
            </span>
          </h2>
          <p className="text-xl text-blue-200 mb-8">Join 2,000+ schools that chose control over chaos</p>

          <div className="space-y-4">
            <Link href="/">
              <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-12 py-4 text-xl rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/25 group">
                Launch Now – Full Power for Free
                <Sparkles className="ml-3 h-6 w-6 group-hover:animate-spin" />
              </Button>
            </Link>
            <p className="text-sm text-gray-400">No credit card. No setup time. Just pure school management power.</p>
          </div>

          {/* Trust Badges */}
          <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              Govt Schools
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              Private Trusts
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              International Academies
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-12 border-t border-slate-700">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-2xl font-bold text-white mb-4">
            "We didn't build this for schools. We built it for school heroes."
          </p>
          <p className="text-blue-300">– AI-SchoolOS™</p>
        </div>
      </footer>

      {/* Floating Chat Bot */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group">
          <MessageSquare className="w-6 h-6 group-hover:animate-bounce" />
          <span className="absolute -top-2 -left-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
            1
          </span>
        </Button>
        <div className="absolute bottom-16 right-0 bg-slate-800 text-white p-3 rounded-lg shadow-lg max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="text-sm">Need help automating fees? Ask AI Setup Bot 🤖</p>
        </div>
      </div>
    </div>
  )
}
