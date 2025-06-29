import { 
  UserProfile, 
  ActivityTemplate, 
  GeneratedContent, 
  ActivityHistory, 
  ScheduledActivity, 
  SyncQueueItem,
  WeeklyPlan,
  NotificationData,
  ErrorLog
} from '@/types'

const DB_NAME = 'BabyBondDB'
const DB_VERSION = 1

let db: IDBDatabase | null = null

export async function initializeDatabase(): Promise<void> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onerror = () => {
      reject(new Error('Failed to open database'))
    }

    request.onsuccess = () => {
      db = request.result
      resolve()
    }

    request.onupgradeneeded = (event) => {
      const database = (event.target as IDBOpenDBRequest).result

      // User Profiles
      if (!database.objectStoreNames.contains('userProfiles')) {
        const userStore = database.createObjectStore('userProfiles', { keyPath: 'id' })
        userStore.createIndex('isOnboarded', 'isOnboarded', { unique: false })
      }

      // Activity Templates
      if (!database.objectStoreNames.contains('activityTemplates')) {
        const activityStore = database.createObjectStore('activityTemplates', { keyPath: 'id' })
        activityStore.createIndex('ageGroup', 'ageGroup', { unique: false })
        activityStore.createIndex('type', 'type', { unique: false })
        activityStore.createIndex('duration', 'duration', { unique: false })
      }

      // Generated Content Cache
      if (!database.objectStoreNames.contains('generatedContent')) {
        const contentStore = database.createObjectStore('generatedContent', { keyPath: 'id' })
        contentStore.createIndex('activityId', 'activityId', { unique: false })
        contentStore.createIndex('expiryDate', 'expiryDate', { unique: false })
      }

      // Activity History
      if (!database.objectStoreNames.contains('activityHistory')) {
        const historyStore = database.createObjectStore('activityHistory', { keyPath: 'id' })
        historyStore.createIndex('activityId', 'activityId', { unique: false })
        historyStore.createIndex('completedDate', 'completedDate', { unique: false })
      }

      // Scheduled Activities
      if (!database.objectStoreNames.contains('scheduledActivities')) {
        const scheduleStore = database.createObjectStore('scheduledActivities', { keyPath: 'id' })
        scheduleStore.createIndex('scheduledDate', 'scheduledDate', { unique: false })
        scheduleStore.createIndex('completed', 'completed', { unique: false })
      }

      // Weekly Plans
      if (!database.objectStoreNames.contains('weeklyPlans')) {
        const planStore = database.createObjectStore('weeklyPlans', { keyPath: 'id' })
        planStore.createIndex('weekStartDate', 'weekStartDate', { unique: false })
      }

      // Sync Queue
      if (!database.objectStoreNames.contains('syncQueue')) {
        const syncStore = database.createObjectStore('syncQueue', { keyPath: 'id' })
        syncStore.createIndex('priority', 'priority', { unique: false })
        syncStore.createIndex('timestamp', 'timestamp', { unique: false })
      }

      // Notifications
      if (!database.objectStoreNames.contains('notifications')) {
        const notificationStore = database.createObjectStore('notifications', { keyPath: 'id' })
        notificationStore.createIndex('scheduledFor', 'scheduledFor', { unique: false })
        notificationStore.createIndex('sent', 'sent', { unique: false })
      }

      // Error Logs
      if (!database.objectStoreNames.contains('errorLogs')) {
        const errorStore = database.createObjectStore('errorLogs', { keyPath: 'id' })
        errorStore.createIndex('timestamp', 'timestamp', { unique: false })
      }
    }
  })
}

// Generic database operations
async function performTransaction<T>(
  storeName: string,
  mode: IDBTransactionMode,
  operation: (store: IDBObjectStore) => IDBRequest<T>
): Promise<T> {
  if (!db) {
    throw new Error('Database not initialized')
  }

  return new Promise((resolve, reject) => {
    const transaction = db!.transaction([storeName], mode)
    const store = transaction.objectStore(storeName)
    const request = operation(store)

    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

// User Profile operations
export async function saveUserProfile(profile: UserProfile): Promise<void> {
  await performTransaction('userProfiles', 'readwrite', (store) => 
    store.put(profile)
  )
}

export async function getUserProfile(id: string): Promise<UserProfile | null> {
  try {
    const result = await performTransaction('userProfiles', 'readonly', (store) => 
      store.get(id)
    )
    return result || null
  } catch {
    return null
  }
}

export async function getAllUserProfiles(): Promise<UserProfile[]> {
  return await performTransaction('userProfiles', 'readonly', (store) => 
    store.getAll()
  )
}

// Activity Template operations
export async function saveActivityTemplate(template: ActivityTemplate): Promise<void> {
  await performTransaction('activityTemplates', 'readwrite', (store) => 
    store.put(template)
  )
}

export async function getActivityTemplate(id: string): Promise<ActivityTemplate | null> {
  try {
    const result = await performTransaction('activityTemplates', 'readonly', (store) => 
      store.get(id)
    )
    return result || null
  } catch {
    return null
  }
}

export async function getAllActivityTemplates(): Promise<ActivityTemplate[]> {
  return await performTransaction('activityTemplates', 'readonly', (store) => 
    store.getAll()
  )
}

export async function getActivityTemplatesByAgeGroup(ageGroup: string): Promise<ActivityTemplate[]> {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error('Database not initialized'))
      return
    }

    const transaction = db.transaction(['activityTemplates'], 'readonly')
    const store = transaction.objectStore('activityTemplates')
    const index = store.index('ageGroup')
    const request = index.getAll(ageGroup)

    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

// Generated Content operations
export async function saveGeneratedContent(content: GeneratedContent): Promise<void> {
  await performTransaction('generatedContent', 'readwrite', (store) => 
    store.put(content)
  )
}

export async function getGeneratedContent(activityId: string): Promise<GeneratedContent[]> {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error('Database not initialized'))
      return
    }

    const transaction = db.transaction(['generatedContent'], 'readonly')
    const store = transaction.objectStore('generatedContent')
    const index = store.index('activityId')
    const request = index.getAll(activityId)

    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

export async function cleanExpiredContent(): Promise<void> {
  const now = new Date()
  
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error('Database not initialized'))
      return
    }

    const transaction = db.transaction(['generatedContent'], 'readwrite')
    const store = transaction.objectStore('generatedContent')
    const index = store.index('expiryDate')
    const request = index.openCursor(IDBKeyRange.upperBound(now))

    request.onsuccess = (event) => {
      const cursor = (event.target as IDBRequest).result
      if (cursor) {
        cursor.delete()
        cursor.continue()
      } else {
        resolve()
      }
    }

    request.onerror = () => reject(request.error)
  })
}

// Activity History operations
export async function saveActivityHistory(history: ActivityHistory): Promise<void> {
  await performTransaction('activityHistory', 'readwrite', (store) => 
    store.put(history)
  )
}

export async function getActivityHistory(): Promise<ActivityHistory[]> {
  return await performTransaction('activityHistory', 'readonly', (store) => 
    store.getAll()
  )
}

export async function getActivityHistoryByDate(startDate: Date, endDate: Date): Promise<ActivityHistory[]> {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error('Database not initialized'))
      return
    }

    const transaction = db.transaction(['activityHistory'], 'readonly')
    const store = transaction.objectStore('activityHistory')
    const index = store.index('completedDate')
    const range = IDBKeyRange.bound(startDate, endDate)
    const request = index.getAll(range)

    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

// Scheduled Activities operations
export async function saveScheduledActivity(activity: ScheduledActivity): Promise<void> {
  await performTransaction('scheduledActivities', 'readwrite', (store) => 
    store.put(activity)
  )
}

export async function getScheduledActivities(): Promise<ScheduledActivity[]> {
  return await performTransaction('scheduledActivities', 'readonly', (store) => 
    store.getAll()
  )
}

export async function getScheduledActivitiesByDate(date: Date): Promise<ScheduledActivity[]> {
  const startOfDay = new Date(date)
  startOfDay.setHours(0, 0, 0, 0)
  
  const endOfDay = new Date(date)
  endOfDay.setHours(23, 59, 59, 999)

  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error('Database not initialized'))
      return
    }

    const transaction = db.transaction(['scheduledActivities'], 'readonly')
    const store = transaction.objectStore('scheduledActivities')
    const index = store.index('scheduledDate')
    const range = IDBKeyRange.bound(startOfDay, endOfDay)
    const request = index.getAll(range)

    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

// Weekly Plans operations
export async function saveWeeklyPlan(plan: WeeklyPlan): Promise<void> {
  await performTransaction('weeklyPlans', 'readwrite', (store) => 
    store.put(plan)
  )
}

export async function getWeeklyPlan(weekStartDate: Date): Promise<WeeklyPlan | null> {
  try {
    const result = await performTransaction('weeklyPlans', 'readonly', (store) => {
      const index = store.index('weekStartDate')
      return index.get(weekStartDate)
    })
    return result || null
  } catch {
    return null
  }
}

// Sync Queue operations
export async function addToSyncQueue(item: SyncQueueItem): Promise<void> {
  await performTransaction('syncQueue', 'readwrite', (store) => 
    store.put(item)
  )
}

export async function getSyncQueue(): Promise<SyncQueueItem[]> {
  return await performTransaction('syncQueue', 'readonly', (store) => 
    store.getAll()
  )
}

export async function removeSyncQueueItem(id: string): Promise<void> {
  await performTransaction('syncQueue', 'readwrite', (store) => 
    store.delete(id)
  )
}

// Notification operations
export async function saveNotification(notification: NotificationData): Promise<void> {
  await performTransaction('notifications', 'readwrite', (store) => 
    store.put(notification)
  )
}

export async function getPendingNotifications(): Promise<NotificationData[]> {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error('Database not initialized'))
      return
    }

    const transaction = db.transaction(['notifications'], 'readonly')
    const store = transaction.objectStore('notifications')
    const index = store.index('sent')
    const request = index.getAll(false)

    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

// Error logging
export async function logError(error: ErrorLog): Promise<void> {
  await performTransaction('errorLogs', 'readwrite', (store) => 
    store.put(error)
  )
}

// Database maintenance
export async function clearOldData(): Promise<void> {
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  // Clean expired content
  await cleanExpiredContent()

  // Clean old error logs
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error('Database not initialized'))
      return
    }

    const transaction = db.transaction(['errorLogs'], 'readwrite')
    const store = transaction.objectStore('errorLogs')
    const index = store.index('timestamp')
    const request = index.openCursor(IDBKeyRange.upperBound(thirtyDaysAgo))

    request.onsuccess = (event) => {
      const cursor = (event.target as IDBRequest).result
      if (cursor) {
        cursor.delete()
        cursor.continue()
      } else {
        resolve()
      }
    }

    request.onerror = () => reject(request.error)
  })
}

export async function getDatabaseSize(): Promise<number> {
  if ('storage' in navigator && 'estimate' in navigator.storage) {
    const estimate = await navigator.storage.estimate()
    return estimate.usage || 0
  }
  return 0
}