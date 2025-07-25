const CACHE_NAME = "school-admin-v1"
const urlsToCache = ["/", "/manifest.json", "/icon-192x192.png", "/icon-512x512.png"]

// Install event
self.addEventListener("install", (event) => {
  console.log("Service Worker installing...")
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache")
      return cache.addAll(urlsToCache)
    }),
  )
  // Force the waiting service worker to become the active service worker
  self.skipWaiting()
})

// Activate event
self.addEventListener("activate", (event) => {
  console.log("Service Worker activating...")
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("Deleting old cache:", cacheName)
            return caches.delete(cacheName)
          }
        }),
      )
    }),
  )
  // Ensure the service worker takes control immediately
  self.clients.claim()
})

// Fetch event
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached version or fetch from network
      if (response) {
        return response
      }
      return fetch(event.request).catch(() => {
        // Return a fallback page if both cache and network fail
        if (event.request.destination === "document") {
          return caches.match("/")
        }
      })
    }),
  )
})

// Push event - for demo purposes
self.addEventListener("push", (event) => {
  console.log("Push event received:", event)

  let notificationData = {
    title: "School Management System",
    body: "New notification from School Admin",
    icon: "/icon-192x192.png",
    badge: "/icon-192x192.png",
    tag: "school-notification",
    requireInteraction: false,
    vibrate: [200, 100, 200],
    data: {
      url: "/",
      timestamp: Date.now(),
    },
    actions: [
      {
        action: "view",
        title: "View Details",
        icon: "/icon-192x192.png",
      },
      {
        action: "dismiss",
        title: "Dismiss",
        icon: "/icon-192x192.png",
      },
    ],
  }

  // If push event has data, use it
  if (event.data) {
    try {
      const pushData = event.data.json()
      notificationData = { ...notificationData, ...pushData }
    } catch (e) {
      notificationData.body = event.data.text()
    }
  }

  event.waitUntil(self.registration.showNotification(notificationData.title, notificationData))
})

// Notification click event
self.addEventListener("notificationclick", (event) => {
  console.log("Notification clicked:", event)

  event.notification.close()

  if (event.action === "view" || !event.action) {
    // Open the app or focus existing window
    event.waitUntil(
      clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
        // Check if there's already a window/tab open with the target URL
        for (const client of clientList) {
          if (client.url === self.location.origin + "/" && "focus" in client) {
            return client.focus()
          }
        }
        // If no window/tab is open, open a new one
        if (clients.openWindow) {
          return clients.openWindow("/")
        }
      }),
    )
  }
  // If action is 'dismiss', just close the notification (already done above)
})

// Background sync (for future use)
self.addEventListener("sync", (event) => {
  console.log("Background sync:", event.tag)
  if (event.tag === "background-sync") {
    event.waitUntil(
      // Perform background sync operations
      Promise.resolve(),
    )
  }
})

// Handle service worker messages
self.addEventListener("message", (event) => {
  console.log("Service Worker received message:", event.data)

  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting()
  }
})
