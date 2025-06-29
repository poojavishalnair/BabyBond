import { useState, useEffect } from 'react'
import { isOnline, onOnlineStatusChange } from '@/lib/pwa'
import { getSyncQueue, removeSyncQueueItem, addToSyncQueue } from '@/services/database'
import { SyncQueueItem } from '@/types'

export function useOfflineSync() {
  const [isOnlineState, setIsOnlineState] = useState(isOnline())
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'error'>('idle')
  const [pendingItems, setPendingItems] = useState<SyncQueueItem[]>([])

  useEffect(() => {
    // Listen for online/offline changes
    const cleanup = onOnlineStatusChange(setIsOnlineState)
    
    // Load pending sync items
    loadPendingItems()

    return cleanup
  }, [])

  useEffect(() => {
    // When coming back online, attempt to sync
    if (isOnlineState && pendingItems.length > 0) {
      syncPendingItems()
    }
  }, [isOnlineState, pendingItems.length])

  const loadPendingItems = async () => {
    try {
      const items = await getSyncQueue()
      setPendingItems(items)
    } catch (error) {
      console.error('Failed to load pending sync items:', error)
    }
  }

  const addToSync = async (item: Omit<SyncQueueItem, 'id' | 'timestamp' | 'retryCount'>) => {
    const syncItem: SyncQueueItem = {
      ...item,
      id: Date.now().toString(),
      timestamp: new Date(),
      retryCount: 0,
      maxRetries: 3
    }

    try {
      await addToSyncQueue(syncItem)
      setPendingItems(prev => [...prev, syncItem])
      
      // If online, try to sync immediately
      if (isOnlineState) {
        syncPendingItems()
      }
    } catch (error) {
      console.error('Failed to add item to sync queue:', error)
    }
  }

  const syncPendingItems = async () => {
    if (!isOnlineState || pendingItems.length === 0) return

    setSyncStatus('syncing')

    try {
      // Sort by priority and timestamp
      const sortedItems = [...pendingItems].sort((a, b) => {
        const priorityOrder = { high: 3, medium: 2, low: 1 }
        const aPriority = priorityOrder[a.priority]
        const bPriority = priorityOrder[b.priority]
        
        if (aPriority !== bPriority) {
          return bPriority - aPriority
        }
        
        return a.timestamp.getTime() - b.timestamp.getTime()
      })

      const syncPromises = sortedItems.map(item => syncItem(item))
      await Promise.allSettled(syncPromises)
      
      // Reload pending items to get updated state
      await loadPendingItems()
      setSyncStatus('idle')
    } catch (error) {
      console.error('Sync failed:', error)
      setSyncStatus('error')
    }
  }

  const syncItem = async (item: SyncQueueItem): Promise<void> => {
    try {
      // In a real app, this would make API calls to sync data
      // For now, we'll simulate successful sync and remove from queue
      console.log('Syncing item:', item)
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 100))
      
      // Remove from sync queue on success
      await removeSyncQueueItem(item.id)
    } catch (error) {
      console.error('Failed to sync item:', item.id, error)
      
      // Increment retry count
      item.retryCount++
      
      if (item.retryCount >= item.maxRetries) {
        // Remove failed items that have exceeded max retries
        await removeSyncQueueItem(item.id)
      } else {
        // Update the item in the queue with new retry count
        await addToSyncQueue(item)
      }
      
      throw error
    }
  }

  const forcSync = () => {
    if (isOnlineState) {
      syncPendingItems()
    }
  }

  return {
    isOnline: isOnlineState,
    syncStatus,
    pendingItemsCount: pendingItems.length,
    addToSync,
    forceSync: forcSync
  }
}