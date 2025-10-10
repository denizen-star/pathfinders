'use client'

import { useState } from 'react'

interface Step0Props {
  nextStep: () => void
  skipToSummary: () => void
}

export default function Step0({ nextStep, skipToSummary }: Step0Props) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleContinue = async () => {
    setIsSubmitting(true)
    // Small delay for better UX
    setTimeout(() => {
      nextStep()
      setIsSubmitting(false)
    }, 500)
  }

  const handleSkip = async () => {
    setIsSubmitting(true)
    // Small delay for better UX
    setTimeout(() => {
      skipToSummary()
      setIsSubmitting(false)
    }, 500)
  }

  return (
    <div className="bg-black p-8 md:p-12 text-center min-h-screen">
      {/* Hero Section - Based on Reference Design */}
      <div className="mb-12">
        {/* Logo and Title */}
        <div className="flex items-center justify-center gap-6 mb-8">

          <div className="text-left">
            <h1 className="text-5xl font-black text-white mb-2">
              Pathfinders
            </h1>
            <p className="text-lg font-medium text-white">
              Intelligent Professional Networking
            </p>
          </div>
        </div>

        {/* Main Headline with Vibrant Colors */}
        <div className="mb-8">
          <h2 className="text-5xl md:text-6xl font-black mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
              SMART
            </span><br />
            <span className="text-white">CONNECTIONS</span><br />
            <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              START HERE
            </span>
          </h2>
        </div>



        {/* Stats Section with Yellow Numbers */}
        <div className="flex justify-center gap-12 mb-12">
          <div className="text-center">
            <div className="text-4xl font-black text-yellow-400 mb-2">20</div>
            <div className="text-lg font-medium text-white">Curated Spots</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black text-yellow-400 mb-2">3</div>
            <div className="text-lg font-medium text-white">Min Signup</div>
          </div>
        </div>
      </div>

      {/* Main CTA Button with Blue-Cyan Gradient */}
      <div className="mb-8">
        <button
          onClick={handleContinue}
          disabled={isSubmitting}
          className="bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-500 hover:to-blue-700 text-white px-12 py-5 rounded-xl text-xl font-bold focus:outline-none focus:ring-4 focus:ring-cyan-500/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
        >
          {isSubmitting ? 'Starting...' : 'Continue →'}
        </button>
      </div>
        {/* Subheading */}
        <div className="mb-12">
          <p className="text-2xl font-medium text-white leading-relaxed">
            Why waste time at random events?<br />
            Meet professionals matched to your goals.
          </p>
        </div>
      {/* Tagline */}
      <div className="mb-8">
        <p className="text-lg font-medium text-white">
          Exclusive • Pre-Matched • Intentional
        </p>
      </div>

      {/* Privacy Section */}
      <div className="mt-12 bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 max-w-2xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-green-500">
            <span className="text-white text-xl">🔒</span>
          </div>
          <h4 className="text-xl font-bold text-white">
            Your Privacy Matters
          </h4>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-start gap-3 justify-center">
            <span className="text-green-400 text-lg mt-1">✓</span>
            <p className="text-base font-semibold text-gray-200 text-center">
              You can drop at any time. Your information will never be used for marketing purposes.
            </p>
          </div>
          
          <p className="text-sm text-gray-400 leading-relaxed text-center">
            We only collect the first three digits of your postal code (FSA) to understand the general 
            geographic distribution of our co-working community. This anonymous data helps ensure any 
            future suggested networking events are relevant to your needs.
          </p>
        </div>
      </div>

      {/* Opt-out Button */}
      <div className="mt-8 text-center">
        <button
          type="button"
          onClick={handleSkip}
          disabled={isSubmitting}
          className="bg-gray-700 hover:bg-gray-600 text-gray-300 py-3 px-6 rounded-xl text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Processing...' : 'Opt out of this experiment'}
        </button>
      </div>

      {/* Footer */}
      <div className="mt-12 text-center">
        <p className="text-sm text-gray-500">
          © 2024 Pathfinders. All rights reserved.
        </p>
      </div>
    </div>
  )
}
