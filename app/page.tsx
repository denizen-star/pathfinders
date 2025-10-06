'use client'

import { useState, useEffect } from 'react'
import Step1 from '../components/Step1'
import Step2 from '../components/Step2'
import Step3 from '../components/Step3'
import Step4 from '../components/Step4'
import ProgressBar from '../components/ProgressBar'
import { generateSessionId, getDeviceInfo } from '../lib/deviceInfo'

export interface FormData {
  postalCode: string
  name: string
  email: string
  industry: string
  educationLevel: string
  jobFunctionLevel: string
  companySize: string
  primaryGoal: string[]
  connectionTypes: string[]
  workEnvironment: string[]
  collaborationPreferences: string[]
  networkingWindow: string[]
  dayOfWeek: string[]
  experience: string
  communication: string[]
  interests: string[]
  challenges: string[]
  additionalInfo: string
}

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<Partial<FormData>>({})
  const [sessionId, setSessionId] = useState<string>('')
  const [deviceInfo, setDeviceInfo] = useState<any>(null)

  // Generate session ID and get device info on mount
  useEffect(() => {
    const newSessionId = generateSessionId()
    setSessionId(newSessionId)
    setDeviceInfo(getDeviceInfo())
  }, [])

  // Save form data to localStorage on every change
  useEffect(() => {
    localStorage.setItem('pathfinders-form-data', JSON.stringify(formData))
    localStorage.setItem('pathfinders-session-id', sessionId)
  }, [formData, sessionId])

  // Load form data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('pathfinders-form-data')
    const savedSessionId = localStorage.getItem('pathfinders-session-id')
    
    if (savedData) {
      setFormData(JSON.parse(savedData))
    }
    
    if (savedSessionId) {
      setSessionId(savedSessionId)
    } else {
      const newSessionId = generateSessionId()
      setSessionId(newSessionId)
    }
  }, [])

  const updateFormData = (newData: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...newData }))
  }

  const nextStep = () => {
    setCurrentStep(prev => prev + 1)
    // Scroll to top when navigating between main steps
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const prevStep = () => {
    setCurrentStep(prev => prev - 1)
    // Scroll to top when navigating between main steps
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const skipToSummary = () => {
    setCurrentStep(4)
    // Scroll to top when skipping to summary
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 formData={formData} updateFormData={updateFormData} nextStep={nextStep} sessionId={sessionId} deviceInfo={deviceInfo} />
      case 2:
        return <Step2 formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} skipToSummary={skipToSummary} sessionId={sessionId} deviceInfo={deviceInfo} />
      case 3:
        return <Step3 formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} skipToSummary={skipToSummary} sessionId={sessionId} deviceInfo={deviceInfo} />
      case 4:
        return <Step4 formData={formData} prevStep={prevStep} sessionId={sessionId} deviceInfo={deviceInfo} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-md">
        <ProgressBar currentStep={currentStep} totalSteps={4} />
        {renderStep()}
      </div>
    </div>
  )
}
