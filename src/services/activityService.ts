import { 
  ActivityTemplate, 
  UserProfile, 
  ScheduledActivity, 
  WeeklyPlan,
  ActivityHistory,
  GeneratedContent
} from '@/types'
import { 
  getAllActivityTemplates,
  getActivityTemplatesByAgeGroup,
  saveScheduledActivity,
  getScheduledActivities,
  saveWeeklyPlan,
  getWeeklyPlan,
  saveActivityHistory,
  getActivityHistory,
  saveGeneratedContent,
  getGeneratedContent
} from '@/services/database'
import { allActivityTemplates } from '@/data/activityTemplates'
import { generateId, calculatePregnancyWeek, calculateBabyAge, getRandomElement, shuffleArray } from '@/lib/utils'

export class ActivityService {
  private static instance: ActivityService
  private templates: ActivityTemplate[] = []

  private constructor() {}

  static getInstance(): ActivityService {
    if (!ActivityService.instance) {
      ActivityService.instance = new ActivityService()
    }
    return ActivityService.instance
  }

  async initialize(): Promise<void> {
    try {
      // Try to load from database first
      this.templates = await getAllActivityTemplates()
      
      // If no templates in database, seed with default templates
      if (this.templates.length === 0) {
        await this.seedActivityTemplates()
        this.templates = allActivityTemplates
      }
    } catch (error) {
      console.error('Failed to initialize activity service:', error)
      // Fallback to in-memory templates
      this.templates = allActivityTemplates
    }
  }

  private async seedActivityTemplates(): Promise<void> {
    const { saveActivityTemplate } = await import('@/services/database')
    
    for (const template of allActivityTemplates) {
      try {
        await saveActivityTemplate(template)
      } catch (error) {
        console.error('Failed to save activity template:', template.id, error)
      }
    }
  }

  getTemplatesByAgeGroup(ageGroup: string): ActivityTemplate[] {
    return this.templates.filter(template => template.ageGroup === ageGroup)
  }

  getTemplatesByPreferences(
    ageGroup: string,
    preferences: {
      activityType: string
      timeAvailability: string
      contentPreferences: string[]
    }
  ): ActivityTemplate[] {
    let filtered = this.getTemplatesByAgeGroup(ageGroup)

    // Filter by time availability
    const maxDuration = this.getMaxDurationForAvailability(preferences.timeAvailability)
    filtered = filtered.filter(template => template.duration <= maxDuration)

    // Filter by content preferences
    if (preferences.contentPreferences.length > 0) {
      filtered = filtered.filter(template => 
        preferences.contentPreferences.includes(template.type)
      )
    }

    // Sort by activity type preference
    if (preferences.activityType === 'science') {
      filtered.sort((a, b) => {
        const aScience = a.benefits.some(benefit => 
          benefit.toLowerCase().includes('development') || 
          benefit.toLowerCase().includes('brain') ||
          benefit.toLowerCase().includes('motor')
        )
        const bScience = b.benefits.some(benefit => 
          benefit.toLowerCase().includes('development') || 
          benefit.toLowerCase().includes('brain') ||
          benefit.toLowerCase().includes('motor')
        )
        return bScience ? 1 : aScience ? -1 : 0
      })
    }

    return filtered
  }

  private getMaxDurationForAvailability(availability: string): number {
    switch (availability) {
      case 'busy': return 10
      case 'moderate': return 20
      case 'flexible': return 60
      default: return 20
    }
  }

  async generateWeeklyPlan(userProfile: UserProfile): Promise<WeeklyPlan> {
    const now = new Date()
    const weekStart = new Date(now)
    weekStart.setDate(now.getDate() - now.getDay()) // Start of current week
    weekStart.setHours(0, 0, 0, 0)

    // Check if we already have a plan for this week
    const existingPlan = await getWeeklyPlan(weekStart)
    if (existingPlan) {
      return existingPlan
    }

    // Determine age group
    let ageGroup: string
    if (userProfile.isPregnant && userProfile.babyDueDate) {
      ageGroup = 'prenatal'
    } else if (userProfile.babyBirthDate) {
      const age = calculateBabyAge(userProfile.babyBirthDate)
      if (age.months === 0) {
        ageGroup = 'newborn'
      } else if (age.months <= 3) {
        ageGroup = '0-3months'
      } else if (age.months <= 6) {
        ageGroup = '3-6months'
      } else {
        ageGroup = '6-12months'
      }
    } else {
      ageGroup = 'prenatal' // Default
    }

    // Get suitable activities
    const suitableActivities = this.getTemplatesByPreferences(ageGroup, {
      activityType: userProfile.preferences.activityType,
      timeAvailability: userProfile.preferences.timeAvailability,
      contentPreferences: userProfile.preferences.contentPreferences
    })

    if (suitableActivities.length === 0) {
      throw new Error('No suitable activities found for user preferences')
    }

    // Generate scheduled activities for the week
    const scheduledActivities: ScheduledActivity[] = []
    const activitiesPerDay = this.getActivitiesPerDay(userProfile.preferences.timeAvailability)
    
    for (let day = 0; day < 7; day++) {
      const dayDate = new Date(weekStart)
      dayDate.setDate(weekStart.getDate() + day)
      
      // Skip past days
      if (dayDate < now) continue

      const dayActivities = shuffleArray(suitableActivities).slice(0, activitiesPerDay)
      
      dayActivities.forEach((template, index) => {
        const scheduledTime = new Date(dayDate)
        scheduledTime.setHours(9 + (index * 3), 0, 0, 0) // Space activities throughout the day

        scheduledActivities.push({
          id: generateId(),
          activityId: template.id,
          scheduledDate: scheduledTime,
          completed: false,
          rescheduled: false,
          reminderSent: false,
          createdAt: new Date()
        })
      })
    }

    const weeklyPlan: WeeklyPlan = {
      id: generateId(),
      weekStartDate: weekStart,
      activities: scheduledActivities,
      generatedDate: new Date(),
      customized: false
    }

    // Save the plan
    await saveWeeklyPlan(weeklyPlan)

    // Save individual scheduled activities
    for (const activity of scheduledActivities) {
      await saveScheduledActivity(activity)
    }

    return weeklyPlan
  }

  private getActivitiesPerDay(timeAvailability: string): number {
    switch (timeAvailability) {
      case 'busy': return 1
      case 'moderate': return 2
      case 'flexible': return 3
      default: return 2
    }
  }

  async getTodaysActivities(): Promise<ScheduledActivity[]> {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    const tomorrow = new Date(today)
    tomorrow.setDate(today.getDate() + 1)

    const allScheduled = await getScheduledActivities()
    return allScheduled.filter(activity => {
      const activityDate = new Date(activity.scheduledDate)
      return activityDate >= today && activityDate < tomorrow
    })
  }

  async completeActivity(
    activityId: string, 
    duration: number, 
    engagement: 'low' | 'medium' | 'high',
    notes?: string,
    rating?: number
  ): Promise<void> {
    // Mark scheduled activity as completed
    const scheduledActivities = await getScheduledActivities()
    const scheduledActivity = scheduledActivities.find(sa => sa.activityId === activityId)
    
    if (scheduledActivity) {
      scheduledActivity.completed = true
      await saveScheduledActivity(scheduledActivity)
    }

    // Add to activity history
    const history: ActivityHistory = {
      id: generateId(),
      activityId,
      completedDate: new Date(),
      duration,
      babyEngagement: engagement,
      parentNotes: notes,
      rating
    }

    await saveActivityHistory(history)
  }

  async getActivityHistory(): Promise<ActivityHistory[]> {
    return await getActivityHistory()
  }

  async generatePersonalizedContent(
    activityId: string, 
    userProfile: UserProfile
  ): Promise<GeneratedContent | null> {
    // Check if we already have generated content for this activity
    const existingContent = await getGeneratedContent(activityId)
    const validContent = existingContent.filter(content => 
      new Date(content.expiryDate) > new Date()
    )

    if (validContent.length > 0) {
      return getRandomElement(validContent)
    }

    // Generate new content using local templates
    const template = this.templates.find(t => t.id === activityId)
    if (!template) return null

    const personalizedContent = this.generateLocalContent(template, userProfile)
    
    const generatedContent: GeneratedContent = {
      id: generateId(),
      activityId,
      contentType: 'instructions',
      data: personalizedContent,
      generatedDate: new Date(),
      expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      culturalContext: userProfile.preferences.culturalPreferences[0] || 'general',
      language: userProfile.language,
      personalized: true
    }

    await saveGeneratedContent(generatedContent)
    return generatedContent
  }

  private generateLocalContent(template: ActivityTemplate, userProfile: UserProfile): any {
    // Simple template-based content generation
    const babyName = userProfile.isPregnant ? 'your little one' : 'your baby'
    const parentName = 'Mom' // Could be customized based on user input

    // Personalize instructions
    const personalizedInstructions = template.instructions.map(instruction => 
      instruction
        .replace(/baby/gi, babyName)
        .replace(/your child/gi, babyName)
    )

    // Add encouraging messages based on activity type
    const encouragement = this.getEncouragementMessage(template.type, userProfile.preferences.activityType)

    return {
      title: template.title,
      personalizedInstructions,
      encouragement,
      tips: template.tips,
      benefits: template.benefits,
      estimatedDuration: template.duration
    }
  }

  private getEncouragementMessage(activityType: string, preferenceType: string): string {
    const messages = {
      stories: [
        "Reading to your baby helps build language skills from the very beginning!",
        "Your voice is the most beautiful sound your baby knows.",
        "Every story you share creates lasting memories and bonds."
      ],
      songs: [
        "Singing to your baby promotes brain development and emotional bonding.",
        "Don't worry about being perfect - your baby loves your voice!",
        "Music helps regulate emotions and creates joyful moments together."
      ],
      movement: [
        "Gentle movement helps develop your baby's motor skills and coordination.",
        "Moving together strengthens your bond and promotes healthy development.",
        "Every gentle stretch and movement supports your baby's growth."
      ],
      educational: [
        "These activities support your baby's cognitive development in fun ways.",
        "Learning happens naturally through play and interaction.",
        "You're giving your baby the best start through loving engagement."
      ],
      sensory: [
        "Sensory experiences help build important neural pathways.",
        "Your baby is discovering the world through safe, loving exploration.",
        "These gentle activities support healthy sensory development."
      ],
      meditation: [
        "Taking time for mindfulness benefits both you and your baby.",
        "Peaceful moments together create a foundation of calm and security.",
        "Your relaxed state helps your baby feel safe and loved."
      ]
    }

    const typeMessages = messages[activityType as keyof typeof messages] || messages.educational
    return getRandomElement(typeMessages)
  }

  getActivityTemplate(id: string): ActivityTemplate | undefined {
    return this.templates.find(template => template.id === id)
  }

  async rescheduleActivity(activityId: string, newDate: Date): Promise<void> {
    const scheduledActivities = await getScheduledActivities()
    const activity = scheduledActivities.find(sa => sa.id === activityId)
    
    if (activity) {
      activity.scheduledDate = newDate
      activity.rescheduled = true
      await saveScheduledActivity(activity)
    }
  }

  async getUpcomingActivities(days: number = 7): Promise<ScheduledActivity[]> {
    const now = new Date()
    const futureDate = new Date()
    futureDate.setDate(now.getDate() + days)

    const allScheduled = await getScheduledActivities()
    return allScheduled
      .filter(activity => {
        const activityDate = new Date(activity.scheduledDate)
        return activityDate >= now && activityDate <= futureDate && !activity.completed
      })
      .sort((a, b) => new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime())
  }
}

// Export singleton instance
export const activityService = ActivityService.getInstance()