import { useState, useEffect } from 'react'
import { UserProfile } from '@/types'
import { getUserProfile, saveUserProfile, getAllUserProfiles } from '@/services/database'

const DEFAULT_USER_ID = 'default-user'

export function useUserProfile() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadUserProfile()
  }, [])

  const loadUserProfile = async () => {
    try {
      setIsLoading(true)
      setError(null)

      // Try to get existing profile
      let profile = await getUserProfile(DEFAULT_USER_ID)
      
      // If no profile exists, check if there are any profiles
      if (!profile) {
        const allProfiles = await getAllUserProfiles()
        if (allProfiles.length > 0) {
          profile = allProfiles[0] // Use the first profile found
        }
      }

      setUserProfile(profile)
    } catch (err) {
      console.error('Failed to load user profile:', err)
      setError('Failed to load user profile')
    } finally {
      setIsLoading(false)
    }
  }

  const updateUserProfile = async (updates: Partial<UserProfile>) => {
    try {
      setError(null)
      
      const updatedProfile: UserProfile = userProfile ? {
        ...userProfile,
        ...updates,
        updatedAt: new Date()
      } : {
        id: DEFAULT_USER_ID,
        isPregnant: false,
        preferences: {
          activityType: 'balanced',
          timeAvailability: 'moderate',
          culturalPreferences: [],
          contentPreferences: [],
          reminderSettings: {
            enabled: true,
            frequency: 'daily',
            preferredTimes: ['09:00', '15:00'],
            quietHours: {
              start: '22:00',
              end: '07:00'
            }
          },
          language: 'en'
        },
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        language: 'en',
        isOnboarded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        ...updates
      }

      await saveUserProfile(updatedProfile)
      setUserProfile(updatedProfile)
      
      return updatedProfile
    } catch (err) {
      console.error('Failed to update user profile:', err)
      setError('Failed to update user profile')
      throw err
    }
  }

  const createUserProfile = async (profileData: Partial<UserProfile>) => {
    const newProfile: UserProfile = {
      id: DEFAULT_USER_ID,
      isPregnant: false,
      preferences: {
        activityType: 'balanced',
        timeAvailability: 'moderate',
        culturalPreferences: [],
        contentPreferences: [],
        reminderSettings: {
          enabled: true,
          frequency: 'daily',
          preferredTimes: ['09:00', '15:00'],
          quietHours: {
            start: '22:00',
            end: '07:00'
          }
        },
        language: 'en'
      },
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      language: 'en',
      isOnboarded: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      ...profileData
    }

    return await updateUserProfile(newProfile)
  }

  const completeOnboarding = async () => {
    if (!userProfile) {
      throw new Error('No user profile to complete onboarding')
    }

    return await updateUserProfile({
      isOnboarded: true
    })
  }

  return {
    userProfile,
    isLoading,
    error,
    updateUserProfile,
    createUserProfile,
    completeOnboarding,
    refreshProfile: loadUserProfile
  }
}