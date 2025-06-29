import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { OnboardingFlow } from '@/components/onboarding/OnboardingFlow'
import { Dashboard } from '@/components/dashboard/Dashboard'
import { ActivityDetail } from '@/components/activities/ActivityDetail'
import { Calendar } from '@/components/scheduling/Calendar'
import { Settings } from '@/components/settings/Settings'
import { Progress } from '@/components/progress/Progress'
import { Layout } from '@/components/common/Layout'
import { LoadingScreen } from '@/components/common/LoadingScreen'
import { useUserProfile } from '@/hooks/useUserProfile'
import { useOfflineSync } from '@/hooks/useOfflineSync'
import { initializeDatabase } from '@/services/database'
import { ErrorBoundary } from '@/components/common/ErrorBoundary'

function App() {
  const [isInitialized, setIsInitialized] = useState(false)
  const [initError, setInitError] = useState<string | null>(null)
  const { userProfile, isLoading: profileLoading } = useUserProfile()
  const { isOnline, syncStatus } = useOfflineSync()

  useEffect(() => {
    const initApp = async () => {
      try {
        await initializeDatabase()
        setIsInitialized(true)
      } catch (error) {
        console.error('Failed to initialize app:', error)
        setInitError('Failed to initialize the app. Please refresh and try again.')
      }
    }

    initApp()
  }, [])

  if (initError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-baby-pink-50">
        <div className="text-center p-6">
          <h1 className="text-2xl font-bold text-destructive mb-4">Initialization Error</h1>
          <p className="text-muted-foreground mb-4">{initError}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
          >
            Refresh App
          </button>
        </div>
      </div>
    )
  }

  if (!isInitialized || profileLoading) {
    return <LoadingScreen />
  }

  const isOnboarded = userProfile?.isOnboarded

  return (
    <ErrorBoundary>
      <Router>
        <div className="min-h-screen bg-baby-pink-50">
          {/* Offline indicator */}
          {!isOnline && (
            <div className="bg-yellow-500 text-white text-center py-2 text-sm">
              You're offline. Changes will sync when connection is restored.
            </div>
          )}

          {/* Sync status indicator */}
          {syncStatus === 'syncing' && (
            <div className="bg-blue-500 text-white text-center py-2 text-sm">
              Syncing data...
            </div>
          )}

          <Routes>
            {!isOnboarded ? (
              <Route path="*" element={<OnboardingFlow />} />
            ) : (
              <Route path="/" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="activity/:id" element={<ActivityDetail />} />
                <Route path="calendar" element={<Calendar />} />
                <Route path="progress" element={<Progress />} />
                <Route path="settings" element={<Settings />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
            )}
          </Routes>

          <Toaster />
        </div>
      </Router>
    </ErrorBoundary>
  )
}

export default App