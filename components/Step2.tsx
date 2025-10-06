'use client'

import { useState } from 'react'
import { FormData } from '../app/page'
import { submitToGoogleSheets, storeSubmissionLocally, SubmissionData } from '../lib/googleSheets'

interface Step2Props {
  formData: Partial<FormData>
  updateFormData: (data: Partial<FormData>) => void
  nextStep: () => void
  prevStep: () => void
  skipToSummary: () => void
  sessionId: string
  deviceInfo: any
}

export default function Step2({ formData, updateFormData, nextStep, prevStep, skipToSummary, sessionId, deviceInfo }: Step2Props) {
  const [name, setName] = useState(formData.name || '')
  const [email, setEmail] = useState(formData.email || '')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!name.trim()) {
      setError('Please enter your name')
      return
    }
    
    if (!email.trim()) {
      setError('Please enter your email address')
      return
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.trim())) {
      setError('Please enter a valid email address')
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Prepare Step 2 data for Google Sheets
      const step2Data: SubmissionData = {
        timestamp: new Date().toISOString(),
        sessionId,
        deviceInfo,
        postalCode: formData.postalCode || '',
        name: name.trim(),
        email: email.trim().toLowerCase(),
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
      
      // Submit to Google Sheets (Step 2)
      const success = await submitToGoogleSheets(step2Data, 'Step2', 'Continue')
      if (!success) {
        storeSubmissionLocally(step2Data)
      }
      
      // Save to form data and proceed
      updateFormData({ 
        name: name.trim(), 
        email: email.trim().toLowerCase() 
      })
      nextStep()
    } catch (error) {
      console.error('Error submitting Step 2 data:', error)
      // Still proceed to next step even if submission fails
      updateFormData({ 
        name: name.trim(), 
        email: email.trim().toLowerCase() 
      })
      nextStep()
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSkip = async () => {
    setIsSubmitting(true)
    
    try {
      // Prepare Step 2 data for Google Sheets (Skip action)
      const step2Data: SubmissionData = {
        timestamp: new Date().toISOString(),
        sessionId,
        deviceInfo,
        postalCode: formData.postalCode || '',
        name: name.trim() || '',
        email: email.trim().toLowerCase() || '',
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
      
      // Submit to Google Sheets (Step 2 - Skip)
      const success = await submitToGoogleSheets(step2Data, 'Step2', 'Skip')
      if (!success) {
        storeSubmissionLocally(step2Data)
      }
      
      // Save current data and skip to summary
      updateFormData({ 
        name: name.trim(), 
        email: email.trim().toLowerCase() 
      })
      skipToSummary()
    } catch (error) {
      console.error('Error submitting Step 2 skip data:', error)
      // Still skip to summary even if submission fails
      updateFormData({ 
        name: name.trim(), 
        email: email.trim().toLowerCase() 
      })
      skipToSummary()
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="text-center mb-6">
        <div className="flex justify-center mb-4">
          <img 
            src="/logo.jpeg" 
            alt="Pathfinders Logo" 
            className="h-12 w-auto"
          />
        </div>
        <h1 className="text-2xl font-bold text-pathfinders-blue mb-2">
          Let's Get to Know You
        </h1>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">
          Your Contact Information
        </h2>
        <div className="text-sm text-gray-600 space-y-2">
          <p>
            With your email address, we'll send you a summary of potential matches 
            we've identified based on your responses.
          </p>
          <p>
            This helps us understand who you might connect well with in our networking events.
          </p>
          <p className="font-medium text-pathfinders-blue">
            Your email will only be used for this experiment and match summaries.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Full Name*
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
              setError('')
            }}
            placeholder="Enter your full name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pathfinders-blue"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address*
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setError('')
            }}
            placeholder="Enter your email address"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pathfinders-blue"
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        <div className="flex space-x-2">
          <button
            type="button"
            onClick={prevStep}
            disabled={isSubmitting}
            className="flex-1 bg-gray-300 text-gray-700 py-3 px-4 rounded-md font-medium hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors disabled:bg-gray-200 disabled:cursor-not-allowed"
          >
            Back
          </button>
          <button
            type="button"
            onClick={handleSkip}
            disabled={isSubmitting}
            className="flex-1 bg-pathfinders-orange text-white py-3 px-4 rounded-md font-medium hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Saving...' : 'Skip'}
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-pathfinders-blue text-white py-3 px-4 rounded-md font-medium hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Saving...' : 'Continue'}
          </button>
        </div>
      </form>

      <div className="mt-6 text-xs text-gray-500 text-center">
        <p>
          Your information is securely stored locally and will be used solely for 
          matching purposes in our networking experiment.
        </p>
      </div>
    </div>
  )
}
