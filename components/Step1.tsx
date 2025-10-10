'use client'

import { useState } from 'react'
import { FormData } from '../app/page'
import { submitToGoogleSheets, storeSubmissionLocally, SubmissionData } from '../lib/dataSubmission'

interface Step1Props {
  formData: Partial<FormData>
  updateFormData: (data: Partial<FormData>) => void
  nextStep: () => void
  skipToSummary: () => void
  sessionId: string
  deviceInfo: any
}

export default function Step1({ formData, updateFormData, nextStep, skipToSummary, sessionId, deviceInfo }: Step1Props) {
  const [postalCode, setPostalCode] = useState(formData.postalCode || '')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic validation for Canadian postal code FSA format (3 characters: letter-number-letter)
    const postalCodeRegex = /^[A-Za-z]\d[A-Za-z]$/
    
    if (!postalCode.trim()) {
      setError('Please enter your postal code')
      return
    }
    
    if (!postalCodeRegex.test(postalCode.trim())) {
      setError('Please enter a valid Canadian postal code (e.g., K1A, M5V)')
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Prepare Step 1 data for Google Sheets
      const step1Data: SubmissionData = {
        timestamp: new Date().toISOString(),
        sessionId,
        deviceInfo,
        postalCode: postalCode.trim().toUpperCase(),
        name: '',
        email: '',
        industry: '',
        educationLevel: '',
        jobFunctionLevel: '',
        companySize: '',
        primaryGoal: [],
        connectionTypes: [],
        workEnvironment: [],
        collaborationPreferences: [],
        networkingWindow: [],
        dayOfWeek: [],
        experience: '',
        communication: [],
        interests: [],
        challenges: [],
        additionalInfo: ''
      }
      
      // Submit to Google Sheets (Step 1)
      const success = await submitToGoogleSheets(step1Data, 'Step1', 'Continue')
      if (!success) {
        storeSubmissionLocally(step1Data)
      }
      
      // Save to form data and proceed
      updateFormData({ postalCode: postalCode.trim().toUpperCase() })
      nextStep()
    } catch (error) {
      console.error('Error submitting Step 1 data:', error)
      // Still proceed to next step even if submission fails
      updateFormData({ postalCode: postalCode.trim().toUpperCase() })
      nextStep()
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSkip = async () => {
    setIsSubmitting(true)
    
    try {
      // Prepare Step 1 data for Google Sheets (Skip action)
      const step1Data: SubmissionData = {
        timestamp: new Date().toISOString(),
        sessionId,
        deviceInfo,
        postalCode: postalCode.trim() || '',
        name: '',
        email: '',
        industry: '',
        educationLevel: '',
        jobFunctionLevel: '',
        companySize: '',
        primaryGoal: [],
        connectionTypes: [],
        workEnvironment: [],
        collaborationPreferences: [],
        networkingWindow: [],
        dayOfWeek: [],
        experience: '',
        communication: [],
        interests: [],
        challenges: [],
        additionalInfo: ''
      }
      
      // Submit to Google Sheets (Step 1 - Skip)
      const success = await submitToGoogleSheets(step1Data, 'Step1', 'Skip')
      if (!success) {
        storeSubmissionLocally(step1Data)
      }
      
      // Save current data and skip to summary
      updateFormData({ postalCode: postalCode.trim() })
      skipToSummary()
    } catch (error) {
      console.error('Error submitting Step 1 skip data:', error)
      // Still skip to summary even if submission fails
      updateFormData({ postalCode: postalCode.trim() })
      skipToSummary()
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="dark-glassmorphism p-8 md:p-10">
      {/* Enhanced Hero Section */}
      <div className="text-center mb-10">
        <div className="flex items-center justify-center gap-4 mb-6">

          <div className="text-center">
            <h1 className="text-5xl font-black gradient-text">
              Pathfinders
            </h1>
            <p className="text-lg font-medium text-gray-300">
              Connect • Create • Grow
            </p>
          </div>
        </div>
      </div>

      {/* Enhanced Content Section */}
      <div className="mb-10">
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/10">
          <div className="flex items-center gap-3 mb-4">


          </div>
          
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Enhanced Form Section */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-600">
              <span className="text-white text-xl">🗺️</span>
            </div>
            <h3 className="text-lg font-bold text-white">
              Step 1: Your Location
            </h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="postalCode" className="block text-sm font-semibold text-gray-300 mb-3">
                Home Postal Code First 3 Digits (FSA)
              </label>
              <input
                type="text"
                id="postalCode"
                value={postalCode}
                onChange={(e) => {
                  setPostalCode(e.target.value.toUpperCase())
                  setError('')
                }}
                placeholder="e.g., M6J"
                maxLength={3}
                className="form-input w-full px-6 py-4 text-2xl font-bold text-center rounded-xl focus:outline-none"
              />
              <div className="flex items-center gap-2 mt-3">
                <span className="text-sm text-gray-400">💡 Example:</span>
                </div>
                <div className="flex items-center gap-2 mt-3">

                <span className="text-sm font-medium text-gray-300">33 Bloor St E, Toronto, ON M4W 3H1 → M4W</span>
              </div>
              {error && (
                <p className="text-red-400 text-sm mt-3 font-medium bg-red-500/10 px-4 py-2 rounded-lg border border-red-500/20">{error}</p>
              )}
            </div>
          </div>
        </div>

        {/* Enhanced Button - Moved right after location section */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary w-full py-5 px-8 rounded-xl text-lg font-bold focus:outline-none focus:ring-4 focus:ring-cyan-500/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:transform-none"
        >
          {isSubmitting ? 'Saving...' : 'Continue →'}
        </button>
        <div className="mb-10">
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/10">
        <h2 className="text-2xl font-bold text-center gradient-text">
              Try Networking with Intelligence
            </h2>
          <p className="text-gray-300 leading-relaxed text-lg text-center">
            We believe we can create meaningful professional connections 
            by matching people based on FSA, a few indicators, and the right activities
          </p>
        </div>
      </div>
        {/* Enhanced Info Section */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-r from-yellow-500 to-orange-600">
              <span className="text-white text-xl">🎯</span>
            </div>
            <h4 className="text-xl font-bold gradient-text">
              Why This Matters
            </h4>
          </div>
          <p className="text-gray-300 leading-relaxed mb-4 text-base">
            We're looking for just 20 people to participate in our first networking event.
            This is a small experiment limited to a space/ community.
          </p>
          <ul className="text-sm text-gray-400 space-y-2">
          <li className="font-semibold text-gray-300">What you get with this first step? We will publish on boards:</li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400">•</span>
              <span>Geographic profile</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400">•</span>
              <span>Relevant networking events in your area</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400">•</span>
              <span>Community insights and preferences</span>
            </li>
          </ul>
        </div>
      </form>

      {/* Enhanced Privacy Section */}
      <div className="mt-8 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-r from-green-500 to-emerald-600">
            <span className="text-white text-xl">🔒</span>
          </div>
          <h4 className="text-xl font-bold gradient-text">
            Your Privacy Matters
          </h4>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <span className="text-green-400 text-lg mt-1">✓</span>
            <p className="text-base font-semibold text-gray-200">
              You can drop at any time. Your information will never be used for marketing purposes.
            </p>
          </div>
          
          <p className="text-sm text-gray-400 leading-relaxed">
            By continuing, you'll help us understand the local co-working ecosystem and 
            improve our model potential for accurate matches! We only collect the 
            first three digits of your postal code (FSA) to understand the general 
            geographic distribution of our co-working community. 
            This anonymous data helps ensure any future suggested networking events 
            are relevant to your needs, maximizing chances of deeper community connections 
            with nearby peers.
          </p>
        </div>
      </div>

      {/* Opt-out Button */}
      <div className="mt-8 text-center">
        <button
          type="button"
          onClick={handleSkip}
          disabled={isSubmitting}
          className="btn-muted py-3 px-6 rounded-xl text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Processing...' : 'Opt out of this experiment'}
        </button>
      </div>
    </div>
  )
}
