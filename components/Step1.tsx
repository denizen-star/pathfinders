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
        communication: '',
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
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="text-left mb-8">
        <div className="flex items-center gap-3 mb-3">
          <img 
            src="/logo-p.png" 
            alt="Pathfinders Logo" 
            className="w-10 h-10"
          />
          <h1 className="text-3xl font-bold text-pathfinders-blue">
            Pathfinders
          </h1>
        </div>
        <p className="text-gray-600 text-lg">
          Connect. Create. Grow.
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">
          Join Our Networking Experiment
        </h2>
        <div className="text-sm text-gray-600 space-y-2">
          <p>
            We're testing a simple assumption: can we create meaningful professional connections 
            by matching people based on their background and goals?
          </p>
          <p>
            This is a small experiment limited to our co-working space community. 
            We're looking for just 20 people to participate in our first networking event.
          </p>
          <p className="font-medium text-pathfinders-blue">
            Your information will never be used for marketing purposes.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-2">
            Canadian Postal Code (FSA)*
          </label>
          <p className="text-sm text-gray-600 mb-2">
            Enter 3 first digits of your Postal Code or "FSA"<br />
            (eg. M6J 2Y7 you will enter M6J)
          </p>
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
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pathfinders-blue ${
              error ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {error && (
            <p className="text-red-500 text-sm mt-1">{error}</p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            We only need the first 3 characters (Forward Sortation Area)
          </p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-pathfinders-blue text-white py-3 px-4 rounded-md font-medium hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Saving...' : 'Continue'}
        </button>
      </form>

      <div className="mt-6 text-xs text-gray-500 text-center">
        <p>
          By continuing, you agree that this is an experimental networking project 
          and your data will only be used for matching purposes.
        </p>
      </div>
    </div>
  )
}
