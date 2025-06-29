import React from 'react'
import { Heart } from 'lucide-react'

export function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-baby-pink-50 to-baby-blue-50 flex items-center justify-center">
      <div className="text-center">
        <div className="relative mb-8">
          <Heart className="w-16 h-16 text-baby-pink-400 animate-bounce-gentle mx-auto" />
          <div className="absolute inset-0 w-16 h-16 text-baby-pink-200 animate-pulse mx-auto">
            <Heart className="w-16 h-16" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-baby-pink-600 mb-2">
          BabyBond
        </h1>
        
        <p className="text-baby-pink-500 mb-6">
          Your Baby's Development Companion
        </p>
        
        <div className="flex justify-center space-x-1">
          <div className="w-2 h-2 bg-baby-pink-400 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-baby-pink-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-baby-pink-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
        
        <p className="text-sm text-baby-pink-400 mt-4">
          Preparing your personalized experience...
        </p>
      </div>
    </div>
  )
}