import React, { useState } from 'react'
import { WelcomeStep } from './WelcomeStep'
import { BabyInfoStep } from './BabyInfoStep'
import { PreferencesStep } from './PreferencesStep'
import { CompletionStep } from './CompletionStep'
import { useUserProfile } from '@/hooks/useUserProfile'
import { activityService } from '@/services/activityService'

const steps = [
  { id: 'welcome', component: WelcomeStep },
  { id: 'baby-info', component: BabyInfoStep },
  { id: 'preferences', component: PreferencesStep },
  { id: 'completion', component: CompletionStep }
]

export function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(0)
  const [onboardingData, setOnboardingData] = useState<any>({})
  const { createUserProfile, completeOnboarding } = useUserProfile()

  const handleNext = (stepData: any) => {
    setOnboardingData(prev => ({ ...prev, ...stepData }))
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleComplete = async () => {
    try {
      // Create user profile with onboarding data
      await createUserProfile({
        ...onboardingData,
        isOnboarded: true
      })

      // Initialize activity service
      await activityService.initialize()

      // Generate initial weekly plan
      const profile = await createUserProfile(onboardingData)
      await activityService.generateWeeklyPlan(profile)

      // Complete onboarding
      await completeOnboarding()
    } catch (error) {
      console.error('Failed to complete onboarding:', error)
    }
  }

  const CurrentStepComponent = steps[currentStep].component

  return (
    <div className="min-h-screen bg-gradient-to-br from-baby-pink-50 to-baby-blue-50">
      <CurrentStepComponent
        onNext={handleNext}
        onBack={handleBack}
        onComplete={handleComplete}
        data={onboardingData}
        isFirstStep={currentStep === 0}
        isLastStep={currentStep === steps.length - 1}
        currentStep={currentStep}
        totalSteps={steps.length}
      />
    </div>
  )
}