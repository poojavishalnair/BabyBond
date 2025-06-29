import React from 'react'
import { Heart, Sparkles, Shield, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface WelcomeStepProps {
  onNext: (data: any) => void
  isFirstStep: boolean
  currentStep: number
  totalSteps: number
}

export function WelcomeStep({ onNext }: WelcomeStepProps) {
  const features = [
    {
      icon: Heart,
      title: "Personalized Activities",
      description: "Tailored to your baby's development stage and your preferences"
    },
    {
      icon: Sparkles,
      title: "Science-Based Content",
      description: "Activities backed by child development research"
    },
    {
      icon: Shield,
      title: "100% Offline",
      description: "Works perfectly without internet connection"
    },
    {
      icon: Zap,
      title: "Quick & Easy",
      description: "5-20 minute activities that fit your busy schedule"
    }
  ]

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <Heart className="w-20 h-20 text-baby-pink-400 mx-auto mb-4 animate-bounce-gentle" />
          <h1 className="text-4xl font-bold text-baby-pink-600 mb-2">
            Welcome to BabyBond
          </h1>
          <p className="text-baby-pink-500 text-lg">
            Your Baby's Development Companion
          </p>
        </div>

        <div className="space-y-4 mb-8">
          {features.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex items-start space-x-3 text-left">
              <Icon className="w-6 h-6 text-baby-pink-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-800">{title}</h3>
                <p className="text-sm text-gray-600">{description}</p>
              </div>
            </div>
          ))}
        </div>

        <Button 
          onClick={() => onNext({})}
          className="w-full bg-baby-pink-500 hover:bg-baby-pink-600 text-white py-3 text-lg"
        >
          Get Started
        </Button>

        <p className="text-xs text-gray-500 mt-4">
          Takes less than 2 minutes to set up
        </p>
      </div>
    </div>
  )
}