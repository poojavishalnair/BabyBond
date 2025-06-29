import React, { useState } from 'react'
import { ArrowLeft, Baby, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface BabyInfoStepProps {
  onNext: (data: any) => void
  onBack: () => void
  isFirstStep: boolean
  currentStep: number
  totalSteps: number
}

export function BabyInfoStep({ onNext, onBack }: BabyInfoStepProps) {
  const [isPregnant, setIsPregnant] = useState<boolean | null>(null)
  const [dueDate, setDueDate] = useState('')
  const [birthDate, setBirthDate] = useState('')

  const handleNext = () => {
    if (isPregnant === null) return

    const data = {
      isPregnant,
      ...(isPregnant 
        ? { babyDueDate: dueDate ? new Date(dueDate) : undefined }
        : { babyBirthDate: birthDate ? new Date(birthDate) : undefined }
      )
    }

    onNext(data)
  }

  const isValid = isPregnant !== null && (
    (isPregnant && dueDate) || (!isPregnant && birthDate)
  )

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={onBack} className="mr-4">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <div className="flex space-x-2">
              <div className="w-8 h-2 bg-baby-pink-400 rounded"></div>
              <div className="w-8 h-2 bg-baby-pink-400 rounded"></div>
              <div className="w-8 h-2 bg-gray-200 rounded"></div>
              <div className="w-8 h-2 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>

        <div className="text-center mb-8">
          <Baby className="w-16 h-16 text-baby-pink-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Tell us about your baby
          </h2>
          <p className="text-gray-600">
            This helps us provide age-appropriate activities
          </p>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Card 
              className={`cursor-pointer transition-all ${
                isPregnant === true 
                  ? 'ring-2 ring-baby-pink-400 bg-baby-pink-50' 
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => setIsPregnant(true)}
            >
              <CardContent className="p-4 text-center">
                <Calendar className="w-8 h-8 text-baby-pink-400 mx-auto mb-2" />
                <h3 className="font-semibold">Expecting</h3>
                <p className="text-sm text-gray-600">I'm pregnant</p>
              </CardContent>
            </Card>

            <Card 
              className={`cursor-pointer transition-all ${
                isPregnant === false 
                  ? 'ring-2 ring-baby-pink-400 bg-baby-pink-50' 
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => setIsPregnant(false)}
            >
              <CardContent className="p-4 text-center">
                <Baby className="w-8 h-8 text-baby-pink-400 mx-auto mb-2" />
                <h3 className="font-semibold">New Parent</h3>
                <p className="text-sm text-gray-600">Baby is here</p>
              </CardContent>
            </Card>
          </div>

          {isPregnant === true && (
            <div className="animate-fade-in">
              <Label htmlFor="dueDate">When is your baby due?</Label>
              <Input
                id="dueDate"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="mt-1"
              />
            </div>
          )}

          {isPregnant === false && (
            <div className="animate-fade-in">
              <Label htmlFor="birthDate">When was your baby born?</Label>
              <Input
                id="birthDate"
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                max={new Date().toISOString().split('T')[0]}
                className="mt-1"
              />
            </div>
          )}
        </div>

        <Button 
          onClick={handleNext}
          disabled={!isValid}
          className="w-full mt-8 bg-baby-pink-500 hover:bg-baby-pink-600 disabled:opacity-50"
        >
          Continue
        </Button>
      </div>
    </div>
  )
}