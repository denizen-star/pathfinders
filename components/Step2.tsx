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
    <div className="dark-glassmorphism p-8 md:p-10">
      {/* Enhanced Hero Section */}
      <div className="text-center mb-10">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center bg-gradient-to-br from-cyan-500 to-blue-600 shadow-2xl">
            <img 
              src="/logo-p.png" 
              alt="Pathfinders Logo" 
              className="w-12 h-12 rounded-lg"
            />
          </div>
          <div className="text-left">
            <h1 className="text-5xl font-black gradient-text">
              Perspective
            </h1>
            <p className="text-lg font-medium text-gray-300">
              Your Networking Profile
            </p>
          </div>
        </div>
      </div>


      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Enhanced Form Section */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-600">
              <span className="text-white text-xl">📝</span>
            </div>
            <h3 className="text-xl font-bold text-white">
              Step 2: Contact Information
            </h3>
          </div>
          
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-300 mb-3">
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
                className="form-input w-full px-6 py-4 text-lg font-medium rounded-xl focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-3">
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
                className="form-input w-full px-6 py-4 text-lg font-medium rounded-xl focus:outline-none"
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                <p className="text-red-400 text-sm font-medium">{error}</p>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Button Section */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            type="button"
            onClick={prevStep}
            disabled={isSubmitting}
            className="btn-secondary flex-1 py-4 px-6 rounded-xl font-semibold focus:outline-none focus:ring-4 focus:ring-gray-500/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← Back
          </button>
          <button
            type="button"
            onClick={handleSkip}
            disabled={isSubmitting}
            className="btn-muted flex-1 py-4 px-6 rounded-xl font-semibold focus:outline-none focus:ring-4 focus:ring-gray-400/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Saving...' : 'Skip →'}
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary flex-1 py-4 px-6 rounded-xl font-bold focus:outline-none focus:ring-4 focus:ring-cyan-500/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:transform-none"
          >
            {isSubmitting ? 'Saving...' : 'Continue →'}
          </button>
        </div>
      {/* Enhanced Content Section */}
      <div className="mb-10">
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-600">
              <span className="text-white text-xl">👤</span>
            </div>
            <h2 className="text-xl text-center font-bold gradient-text">
              Get a glimpse into your networking style!
            </h2>
          </div>
          <p className="text-gray-300 leading-relaxed text-lg text-center">
            With your email address, you'll opt-in to receive a personalized summary next week. 
            With exclusive, high-level analysis of the personality traits that your response 
            suggest with our most broad model. This self-insight is the first step toward 
            understanding how you can best connect with colleagues.
          </p>
        </div>
      </div>

        {/* Enhanced Privacy Notice - Moved after buttons */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-r from-green-500 to-emerald-600">
              <span className="text-white text-xl">🔒</span>
            </div>
            <h4 className="text-xl font-bold gradient-text text-center">
              Privacy Promise
            </h4>
          </div>
          <p className="text-gray-300 font-semibold text-base text-center">
            Your email will only be used for this experiment and match summaries.
          </p>
        </div>
      </form>

      {/* Enhanced Footer */}
      <div className="mt-8 text-center">
        <p className="text-xs text-gray-500">
          © 2024 Pathfinders. All rights reserved.
        </p>
      </div>
    </div>
  )
}
