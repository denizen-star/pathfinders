'use client'

import { useState, useEffect } from 'react'
import { FormData } from '../app/page'
import { submitToGoogleSheets, storeSubmissionLocally, SubmissionData } from '../lib/dataSubmission'

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

  // Scroll to top when component loads
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

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
        communication: [],
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
        communication: [],
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
    <div className="bg-gradient-card rounded-2xl shadow-medium p-8 border border-neutral-100">
      {/* Enhanced Hero Section */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-brand">
            <img 
              src="/logo-p.png" 
              alt="Pathfinders Logo" 
              className="w-10 h-10 rounded-lg"
            />
          </div>
          <div className="text-left">
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Perspective
            </h1>
            <p className="text-lg font-medium text-neutral-600">
              Your Networking Profile
            </p>
          </div>
        </div>
      </div>

      {/* Enhanced Content Section */}
      <div className="mb-8">
        <div className="bg-secondary-50 rounded-xl p-6 mb-6 border border-secondary-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white text-sm">👤</span>
            </div>
            <h2 className="text-xl font-bold text-secondary-800">
              Get a glimpse into your networking style!
            </h2>
          </div>
          <p className="text-secondary-800 leading-relaxed">
            With your email address, you'll opt-in to receive a personalized summary next week. 
            With exclusive, high-level analysis of the personality traits that your response 
            suggest with our most broad model. This self-insight is the first step toward 
            understanding how you can best connect with colleagues.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Enhanced Form Section */}
        <div className="bg-neutral-50 rounded-xl p-6 border border-neutral-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white text-sm">📝</span>
            </div>
            <h3 className="text-lg font-semibold text-neutral-800">
              Step 2: Contact Information
            </h3>
          </div>
          
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-neutral-700 mb-2">
                Full Name*
              </label>
              <div className="bg-white rounded-lg border-2 border-neutral-200 focus-within:border-primary-500 focus-within:ring-4 focus-within:ring-primary-100 transition-all duration-200">
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value)
                    setError('')
                  }}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 text-lg font-medium border-0 rounded-lg focus:outline-none focus:ring-0"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-neutral-700 mb-2">
                Email Address*
              </label>
              <div className="bg-white rounded-lg border-2 border-neutral-200 focus-within:border-primary-500 focus-within:ring-4 focus-within:ring-primary-100 transition-all duration-200">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setError('')
                  }}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 text-lg font-medium border-0 rounded-lg focus:outline-none focus:ring-0"
                />
              </div>
            </div>

            {error && (
              <div className="bg-accent-50 border border-accent-200 rounded-lg p-3">
                <p className="text-accent-600 text-sm font-medium">{error}</p>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Button Section */}
        <div className="flex space-x-3">
          <button
            type="button"
            onClick={prevStep}
            disabled={isSubmitting}
            className="flex-1 bg-neutral-200 text-neutral-700 py-4 px-6 rounded-xl font-semibold hover:bg-neutral-300 focus:outline-none focus:ring-4 focus:ring-neutral-200 transition-all duration-200 disabled:bg-neutral-100 disabled:cursor-not-allowed"
          >
            ← Back
          </button>
          <button
            type="button"
            onClick={handleSkip}
            disabled={isSubmitting}
            className="flex-1 bg-gradient-to-r from-accent-500 to-accent-600 text-white py-4 px-6 rounded-xl font-semibold shadow-medium hover:shadow-strong focus:outline-none focus:ring-4 focus:ring-accent-200 transition-all duration-200 disabled:bg-neutral-400 disabled:cursor-not-allowed disabled:shadow-none"
          >
            {isSubmitting ? 'Saving...' : 'Skip →'}
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-gradient-primary text-white py-4 px-6 rounded-xl font-semibold shadow-brand hover:shadow-strong focus:outline-none focus:ring-4 focus:ring-primary-200 transition-all duration-200 disabled:bg-neutral-400 disabled:cursor-not-allowed disabled:shadow-none"
          >
            {isSubmitting ? 'Saving...' : 'Continue →'}
          </button>
        </div>

        {/* Enhanced Privacy Notice - Moved after buttons */}
        <div className="bg-primary-50 rounded-xl p-6 border border-primary-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-success-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm">🔒</span>
            </div>
            <h4 className="text-lg font-semibold text-primary-800">
              Privacy Promise
            </h4>
          </div>
          <p className="text-primary-700 font-medium">
            Your email will only be used for this experiment and match summaries.
          </p>
        </div>
      </form>

      {/* Enhanced Footer */}
      <div className="mt-8 text-center">
        <p className="text-xs text-neutral-500">
          © 2024 Pathfinders. All rights reserved.
        </p>
      </div>
    </div>
  )
}
