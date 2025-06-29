import { Workbox } from 'workbox-window'

let wb: Workbox | null = null

export function registerSW() {
  if ('serviceWorker' in navigator) {
    wb = new Workbox('/sw.js')

    wb.addEventListener('controlling', () => {
      window.location.reload()
    })

    wb.addEventListener('waiting', () => {
      // Show update available notification
      if (confirm('New version available! Click OK to update.')) {
        wb?.messageSkipWaiting()
      }
    })

    wb.register()
  }
}

export function updateSW() {
  if (wb) {
    wb.messageSkipWaiting()
  }
}

// PWA installation
let deferredPrompt: any = null

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault()
  deferredPrompt = e
})

export function canInstall(): boolean {
  return deferredPrompt !== null
}

export async function installPWA(): Promise<boolean> {
  if (!deferredPrompt) {
    return false
  }

  deferredPrompt.prompt()
  const { outcome } = await deferredPrompt.userChoice
  deferredPrompt = null
  
  return outcome === 'accepted'
}

// Offline detection
export function isOnline(): boolean {
  return navigator.onLine
}

export function onOnlineStatusChange(callback: (isOnline: boolean) => void) {
  const handleOnline = () => callback(true)
  const handleOffline = () => callback(false)

  window.addEventListener('online', handleOnline)
  window.addEventListener('offline', handleOffline)

  return () => {
    window.removeEventListener('online', handleOnline)
    window.removeEventListener('offline', handleOffline)
  }
}

// Background sync
export function requestBackgroundSync(tag: string) {
  if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
    navigator.serviceWorker.ready.then((registration) => {
      return registration.sync.register(tag)
    })
  }
}

// Push notifications
export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if ('Notification' in window) {
    return await Notification.requestPermission()
  }
  return 'denied'
}

export function showNotification(title: string, options?: NotificationOptions) {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(title, {
      icon: '/pwa-192x192.png',
      badge: '/pwa-192x192.png',
      ...options
    })
  }
}

// Storage management
export async function getStorageEstimate() {
  if ('storage' in navigator && 'estimate' in navigator.storage) {
    return await navigator.storage.estimate()
  }
  return null
}

export async function requestPersistentStorage(): Promise<boolean> {
  if ('storage' in navigator && 'persist' in navigator.storage) {
    return await navigator.storage.persist()
  }
  return false
}