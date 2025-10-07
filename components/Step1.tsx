'use client'

import { useState } from 'react'
import { FormData } from '../app/page'
import { submitToGoogleSheets, storeSubmissionLocally, SubmissionData } from '../lib/googleSheets'

interface Step1Props {
  formData: Partial<FormData>
  updateFormData: (data: Partial<FormData>) => void
  nextStep: () => void
  sessionId: string
  deviceInfo: any
}

export default function Step1({ formData, updateFormData, nextStep, sessionId, deviceInfo }: Step1Props) {
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

  return (
    <div className="bg-gradient-card rounded-2xl shadow-medium p-8 border border-neutral-100">
      {/* Enhanced Hero Section */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-brand">
            <img 
              src="/logo-p.png" 
              alt="Pathfinders Logo" 
              className="w-10 h-10 filter brightness-0 invert"
            />
          </div>
          <div className="text-left">
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Pathfinders
            </h1>
            <p className="text-lg font-medium text-neutral-600">
              Connect • Create • Grow
            </p>
          </div>
        </div>
      </div>

      {/* Enhanced Content Section */}
      <div className="mb-8">
        <div className="bg-primary-50 rounded-xl p-6 mb-6 border border-primary-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white text-sm">🚀</span>
            </div>
            <h2 className="text-xl font-bold text-primary-800">
              Try Networking with Intelligence
            </h2>
          </div>
          <p className="text-neutral-700 leading-relaxed">
            We believe we can create meaningful professional connections 
            by matching people based on FSA, a few indicators, and the right activities
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Enhanced Form Section */}
        <div className="bg-neutral-50 rounded-xl p-6 border border-neutral-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white text-sm">🗺️</span>
            </div>
            <h3 className="text-lg font-semibold text-neutral-800">
              Step 1: Your Location
            </h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="postalCode" className="block text-sm font-semibold text-neutral-700 mb-2">
                Enter 3 first digits of your Postal Code (FSA)
              </label>
              <div className="bg-white rounded-lg border-2 border-neutral-200 focus-within:border-primary-500 focus-within:ring-4 focus-within:ring-primary-100 transition-all duration-200">
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
                  className="w-full px-4 py-3 text-lg font-medium text-center border-0 rounded-lg focus:outline-none focus:ring-0"
                />
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm text-neutral-600">💡 Example:</span>
                <span className="text-sm font-medium text-neutral-700">M6J 2Y7 → M6J</span>
              </div>
              {error && (
                <p className="text-accent-600 text-sm mt-2 font-medium">{error}</p>
              )}
            </div>
          </div>
        </div>

        {/* Enhanced Info Section */}
        <div className="bg-secondary-50 rounded-xl p-6 border border-secondary-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white text-sm">🎯</span>
            </div>
            <h4 className="text-lg font-semibold text-secondary-800">
              Why This Matters
            </h4>
          </div>
          <p className="text-secondary-700 leading-relaxed mb-3">
            We're looking for just 20 people to participate in our first networking event.
            This is a small experiment limited to our co-working space community.
          </p>
          <ul className="text-sm text-secondary-600 space-y-1">
            <li>• Geographic matching for local connections</li>
            <li>• Relevant networking events in your area</li>
            <li>• Community insights and distribution</li>
          </ul>
        </div>

        {/* Enhanced Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-primary text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-brand hover:shadow-strong focus:outline-none focus:ring-4 focus:ring-primary-200 transition-all duration-200 disabled:bg-neutral-400 disabled:cursor-not-allowed disabled:shadow-none"
        >
          {isSubmitting ? 'Saving...' : 'Continue →'}
        </button>
      </form>

      {/* Enhanced Privacy Section */}
      <div className="mt-8 bg-neutral-50 rounded-xl p-6 border border-neutral-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-success-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm">🔒</span>
          </div>
          <h4 className="text-lg font-semibold text-neutral-800">
            Your Privacy Matters
          </h4>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <span className="text-success-500 text-sm mt-1">✓</span>
            <p className="text-sm font-medium text-primary-600">
              Your information will never be used for marketing purposes.
            </p>
          </div>
          
          <p className="text-sm text-neutral-600 leading-relaxed">
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
    </div>
  )
}
