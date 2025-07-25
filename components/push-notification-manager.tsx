"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Bell, BellOff, Send, Key, Sparkles } from "lucide-react"

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/")

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

export function PushNotificationManager() {
  const [isSupported, setIsSupported] = useState(false)
  const [subscription, setSubscription] = useState<PushSubscription | null>(null)
  const [message, setMessage] = useState("New student enrollment: John Doe has been enrolled in Grade 10A")
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>("default")
  const { toast } = useToast()

  useEffect(() => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      setIsSupported(true)
      setNotificationPermission(Notification.permission)
      registerServiceWorker()
    }
  }, [])

  async function registerServiceWorker() {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js", {
        scope: "/",
        updateViaCache: "none",
      })

      await navigator.serviceWorker.ready
      const sub = await registration.pushManager.getSubscription()
      setSubscription(sub)
    } catch (error) {
      console.error("Service worker registration failed:", error)
    }
  }

  async function requestNotificationPermission() {
    if ("Notification" in window) {
      const permission = await Notification.requestPermission()
      setNotificationPermission(permission)
      return permission === "granted"
    }
    return false
  }

  async function subscribeToPush() {
    try {
      const hasPermission = await requestNotificationPermission()
      if (!hasPermission) {
        toast({
          title: "Permission Denied",
          description: "Please allow notifications to enable push notifications.",
          variant: "destructive",
        })
        return
      }

      const registration = await navigator.serviceWorker.ready
      const vapidPublicKey = "BEl62iUYgUivxIkv69yViEuiBIa40HI80NM9LdNnC_NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN"

      try {
        const sub = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
        })

        setSubscription(sub)
        toast({
          title: "Notifications Enabled",
          description: "You will now receive push notifications from the school system.",
        })
      } catch (subscribeError) {
        console.error("Push subscription failed:", subscribeError)
        setSubscription({} as PushSubscription)
        toast({
          title: "Local Notifications Enabled",
          description: "Demo notifications will work locally. Push notifications require a valid server setup.",
        })
      }
    } catch (error) {
      console.error("Push subscription failed:", error)
      toast({
        title: "Subscription Failed",
        description: "Could not enable push notifications. This is a demo implementation.",
        variant: "destructive",
      })
    }
  }

  async function unsubscribeFromPush() {
    if (subscription && typeof subscription.unsubscribe === "function") {
      await subscription.unsubscribe()
    }
    setSubscription(null)
    toast({
      title: "Notifications Disabled",
      description: "You will no longer receive push notifications.",
    })
  }

  async function sendTestNotification() {
    if (!subscription) {
      toast({
        title: "Not Subscribed",
        description: "Please enable notifications first.",
        variant: "destructive",
      })
      return
    }

    if ("Notification" in window && Notification.permission === "granted") {
      const notification = new Notification("AI-SchoolOS™", {
        body: message,
        icon: "/icon-192x192.png",
        badge: "/icon-192x192.png",
        tag: "school-notification",
        requireInteraction: false,
        silent: false,
        vibrate: [200, 100, 200],
        data: {
          url: "/",
          timestamp: Date.now(),
        },
      })

      setTimeout(() => {
        notification.close()
      }, 5000)

      notification.onclick = (event) => {
        event.preventDefault()
        window.focus()
        notification.close()
      }

      toast({
        title: "Notification Sent!",
        description: "Demo notification has been sent successfully.",
      })
      setMessage("")
    } else {
      toast({
        title: "Permission Required",
        description: "Please grant notification permission first.",
        variant: "destructive",
      })
    }
  }

  if (!isSupported) {
    return (
      <Card className="card-gradient border-yellow-500/30 bg-gradient-to-r from-yellow-500/10 to-orange-500/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-300">
            <Bell className="h-5 w-5" />
            Push Notifications
          </CardTitle>
          <CardDescription className="text-yellow-200">
            Push notifications are not supported in this browser.
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card className="card-gradient border-blue-500/30 bg-gradient-to-r from-blue-500/10 to-purple-500/10 electric-glow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-300">
          <Sparkles className="h-5 w-5" />
          Push Notifications Demo
        </CardTitle>
        <CardDescription className="text-blue-200">
          Enable notifications to receive important school updates and alerts.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 text-sm">
          <Key className="h-4 w-4 text-blue-400" />
          <span className="text-white">Permission Status: </span>
          <span
            className={`font-medium ${
              notificationPermission === "granted"
                ? "text-green-400"
                : notificationPermission === "denied"
                  ? "text-red-400"
                  : "text-yellow-400"
            }`}
          >
            {notificationPermission}
          </span>
        </div>

        {subscription ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-green-400">
              <Bell className="h-4 w-4" />
              <span className="text-sm font-medium">Notifications are enabled</span>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notification-message" className="text-white">
                Test Notification Message
              </Label>
              <Input
                id="notification-message"
                placeholder="Enter notification message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400"
              />
            </div>

            <div className="flex gap-2">
              <Button
                onClick={sendTestNotification}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0"
              >
                <Send className="h-4 w-4" />
                Send Notification
              </Button>
              <Button
                variant="outline"
                onClick={unsubscribeFromPush}
                className="flex items-center gap-2 bg-slate-800/50 border-slate-600 text-white hover:bg-slate-700/50"
              >
                <BellOff className="h-4 w-4" />
                Disable
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-blue-200">
              Enable push notifications to receive real-time updates about student activities, attendance alerts, and
              important announcements.
            </p>

            {notificationPermission === "denied" && (
              <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-md">
                <p className="text-sm text-red-300">
                  Notifications are blocked. Please enable them in your browser settings and refresh the page.
                </p>
              </div>
            )}

            <Button
              onClick={subscribeToPush}
              className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white border-0"
              disabled={notificationPermission === "denied"}
            >
              <Bell className="h-4 w-4" />
              Enable Notifications
            </Button>
          </div>
        )}

        <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-md">
          <p className="text-xs text-blue-300">
            <strong>Demo Note:</strong> This is a demonstration of local notifications. In a production environment, you
            would need to set up proper VAPID keys and a push notification server.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
