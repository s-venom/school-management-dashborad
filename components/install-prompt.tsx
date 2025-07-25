"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, X, Sparkles } from "lucide-react"

export function InstallPrompt() {
  const [isIOS, setIsIOS] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    setIsIOS(/iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream)
    setIsStandalone(window.matchMedia("(display-mode: standalone)").matches)

    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowPrompt(true)
    }

    window.addEventListener("beforeinstallprompt", handler)
    return () => window.removeEventListener("beforeinstallprompt", handler)
  }, [])

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      if (outcome === "accepted") {
        setDeferredPrompt(null)
        setShowPrompt(false)
      }
    }
  }

  if (isStandalone || (!isIOS && !showPrompt)) {
    return null
  }

  return (
    <Card className="card-gradient border-green-500/30 bg-gradient-to-r from-green-500/10 to-blue-500/10 electric-glow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-green-300">
            <Sparkles className="h-5 w-5" />
            Install AI-SchoolOS™ App
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowPrompt(false)}
            className="text-green-400 hover:text-green-300 hover:bg-green-500/20"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <CardDescription className="text-green-200">
          Install our app for a better experience with offline access and push notifications.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isIOS ? (
          <div className="space-y-3">
            <p className="text-sm text-green-200">To install this app on your iOS device:</p>
            <ol className="text-sm text-green-200 space-y-1 list-decimal list-inside">
              <li>
                Tap the share button <span className="font-mono bg-green-500/20 px-1 rounded text-green-300">⎋</span>
              </li>
              <li>
                Select "Add to Home Screen"{" "}
                <span className="font-mono bg-green-500/20 px-1 rounded text-green-300">➕</span>
              </li>
              <li>Tap "Add" to confirm</li>
            </ol>
          </div>
        ) : (
          <Button
            onClick={handleInstall}
            className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white border-0"
          >
            <Download className="h-4 w-4" />
            Install App
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
