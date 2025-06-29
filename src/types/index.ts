export interface UserProfile {
  id: string
  babyDueDate?: Date
  babyBirthDate?: Date
  isPregnant: boolean
  preferences: UserPreferences
  timezone: string
  language: string
  isOnboarded: boolean
  createdAt: Date
  updatedAt: Date
}

export interface UserPreferences {
  activityType: 'science' | 'religious' | 'balanced' | 'gentle'
  timeAvailability: 'busy' | 'moderate' | 'flexible' // 5-10min, 10-20min, 20+min
  culturalPreferences: string[]
  contentPreferences: ContentType[]
  reminderSettings: ReminderSettings
  language: string
}

export interface ReminderSettings {
  enabled: boolean
  frequency: 'daily' | 'weekly' | 'custom'
  preferredTimes: string[] // HH:MM format
  quietHours: {
    start: string
    end: string
  }
}

export type ContentType = 'stories' | 'songs' | 'movement' | 'educational' | 'sensory' | 'meditation'

export interface ActivityTemplate {
  id: string
  title: string
  description: string
  instructions: string[]
  type: ContentType
  ageGroup: 'prenatal' | 'newborn' | '0-3months' | '3-6months' | '6-12months'
  duration: number // minutes
  difficulty: 'easy' | 'medium' | 'hard'
  culturalVariants?: CulturalVariant[]
  prerequisites?: string[]
  benefits: string[]
  materials?: string[]
  tips?: string[]
  imageUrl?: string
  audioUrl?: string
  createdAt: Date
}

export interface CulturalVariant {
  culture: string
  title?: string
  description?: string
  instructions?: string[]
  materials?: string[]
  tips?: string[]
}

export interface GeneratedContent {
  id: string
  activityId: string
  contentType: 'story' | 'song' | 'meditation' | 'instructions'
  data: any
  generatedDate: Date
  expiryDate: Date
  culturalContext?: string
  language: string
  personalized: boolean
}

export interface ActivityHistory {
  id: string
  activityId: string
  completedDate: Date
  duration: number
  babyEngagement: 'low' | 'medium' | 'high'
  parentNotes?: string
  photos?: string[]
  rating?: number
}

export interface ScheduledActivity {
  id: string
  activityId: string
  scheduledDate: Date
  completed: boolean
  rescheduled: boolean
  reminderSent: boolean
  adaptedContent?: any
  createdAt: Date
}

export interface WeeklyPlan {
  id: string
  weekStartDate: Date
  activities: ScheduledActivity[]
  generatedDate: Date
  customized: boolean
}

export interface SyncQueueItem {
  id: string
  action: 'create' | 'update' | 'delete'
  entityType: 'activity' | 'progress' | 'schedule' | 'profile'
  data: any
  timestamp: Date
  priority: 'low' | 'medium' | 'high'
  retryCount: number
  maxRetries: number
}

export interface AppState {
  isOnline: boolean
  lastSync: Date | null
  syncInProgress: boolean
  notificationPermission: NotificationPermission
  installPromptAvailable: boolean
  currentWeek?: number
  currentBabyAge?: {
    months: number
    weeks: number
    days: number
  }
}

export interface ProgressStats {
  totalActivitiesCompleted: number
  currentStreak: number
  longestStreak: number
  averageRating: number
  weeklyGoal: number
  weeklyProgress: number
  favoriteActivityTypes: ContentType[]
  totalTimeSpent: number // minutes
  milestones: Milestone[]
}

export interface Milestone {
  id: string
  title: string
  description: string
  achievedDate: Date
  type: 'streak' | 'completion' | 'engagement' | 'time'
  icon: string
}

export interface NotificationData {
  id: string
  title: string
  body: string
  type: 'reminder' | 'milestone' | 'update' | 'encouragement'
  scheduledFor: Date
  sent: boolean
  data?: any
}

export interface OnboardingStep {
  id: string
  title: string
  description: string
  component: string
  completed: boolean
  required: boolean
}

export interface ErrorLog {
  id: string
  error: string
  stack?: string
  timestamp: Date
  userAgent: string
  url: string
  userId?: string
}