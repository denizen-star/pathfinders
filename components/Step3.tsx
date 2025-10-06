'use client'

import { useState, useEffect } from 'react'
import { FormData } from '@/app/page'

interface Step3Props {
  formData: Partial<FormData>
  updateFormData: (data: Partial<FormData>) => void
  nextStep: () => void
  prevStep: () => void
  skipToSummary: () => void
  sessionId: string
  deviceInfo: any
}

export default function Step3({ formData, updateFormData, nextStep, prevStep, skipToSummary, sessionId, deviceInfo }: Step3Props) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Partial<FormData>>({
    industry: formData.industry || '',
    educationLevel: formData.educationLevel || '',
    jobFunctionLevel: formData.jobFunctionLevel || '',
    companySize: formData.companySize || '',
    primaryGoal: formData.primaryGoal || [],
    connectionTypes: formData.connectionTypes || [],
    workEnvironment: formData.workEnvironment || [],
    collaborationPreferences: formData.collaborationPreferences || [],
    networkingWindow: formData.networkingWindow || [],
    dayOfWeek: formData.dayOfWeek || [],
    experience: formData.experience || '',
    communication: formData.communication || '',
    interests: formData.interests || [],
    challenges: formData.challenges || [],
    additionalInfo: formData.additionalInfo || ''
  })

  const questions = [
    {
      id: 'industry',
      type: 'dropdown',
      label: '1. What industry do you work in?',
      options: [
        'Arts', 'Business', 'Civil Service', 'Creative Arts', 'Education',
        'Executive', 'Finance', 'Government', 'Healthcare', 'Law',
        'Marketing', 'Medicine', 'NGO', 'Professional', 'Public Sector',
        'Retail', 'Science', 'Service', 'Student', 'Tech', 'Trade'
      ]
    },
    {
      id: 'educationLevel',
      type: 'dropdown',
      label: '2. What is your education level?',
      options: ['Graduate', 'Bachelor\'s', 'Some College', 'Professional', 'High School']
    },
    {
      id: 'jobFunctionLevel',
      type: 'dropdown',
      label: '3. What is your job function level?',
      options: [
        'Junior IC', 'Mid-level IC', 'Senior IC', 'Manager', 'Senior Manager',
        'Director', 'VP', 'C-Suite', 'Founder'
      ]
    },
    {
      id: 'companySize',
      type: 'select',
      label: '4. What size company do you work for?',
      options: ['1-10', '11-50', '50-200', '200-500', '500+']
    },
    {
      id: 'primaryGoal',
      type: 'multi-select',
      label: '5. What is your primary goal for networking?',
      maxSelections: 5,
      options: [
        'Build Community', 'Business Development', 'Career Advancement', 'Career Transition',
        'Collaborate on Projects', 'Creative Collaboration', 'Cultural Integration',
        'Establish Network', 'Find Co-founder', 'Find Mentor', 'Gain Clients',
        'Investment Opportunities', 'Job Opportunities', 'Market Expansion',
        'Professional Development', 'Secure Funding', 'Skill Development',
        'Strategic Partnerships', 'Thought Leadership'
      ]
    },
    {
      id: 'connectionTypes',
      type: 'multi-select',
      label: '6. What types of connections are you looking for? (Select all that apply)',
      maxSelections: 5,
      options: [
        'C-Suite Exec', 'Career Coach', 'Co-founder', 'Community Leader',
        'Creative Professional', 'Domain Expert', 'Industry Influencer',
        'Investor/VC', 'Manager/Leader', 'Mentor', 'Peer Professional',
        'Potential Client', 'Strategic Partner', 'Thought Leader'
      ]
    },
    {
      id: 'workEnvironment',
      type: 'multi-select',
      label: '7. What type of work environment do you prefer?',
      maxSelections: 2,
      options: [
        'Collaborative Space', 'Creative Space', 'Hybrid', 'Private Office',
        'Quiet/Focused', 'Social/Dynamic', 'Structured Environment'
      ]
    },
    {
      id: 'collaborationPreferences',
      type: 'multi-select',
      label: '8. What collaboration preferences do you have? (Select all that apply)',
      maxSelections: 3,
      options: [
        'Collaborative Workshops', 'Creative Brainstorms', 'Cultural Exchange Sessions',
        'Dynamic Sessions', 'Flexible Collaboration', 'Impromptu Brainstorms',
        'Planned Collaboration', 'Social Collaboration', 'Strategic Sessions',
        'Structured Meetings'
      ]
    },
    {
      id: 'networkingWindow',
      type: 'multi-select',
      label: '9. What time window works best for networking?',
      options: ['Early Morning', 'Lunch', 'Post-Work', 'Evening', 'Late Evening']
    },
    {
      id: 'dayOfWeek',
      type: 'multi-select',
      label: '10. What day of the week works best for networking?',
      options: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    },
    {
      id: 'experience',
      type: 'select',
      label: '11. How many years of professional experience do you have?',
      options: ['0-2 years', '3-5 years', '6-10 years', '11-15 years', '16+ years']
    },
    {
      id: 'communication',
      type: 'select',
      label: '12. What is your preferred communication style?',
      options: ['Direct', 'Diplomatic', 'Analytical', 'Creative', 'Supportive']
    },
    {
      id: 'interests',
      type: 'multi-select',
      label: '13. What are your main professional interests? (Select up to 3)',
      maxSelections: 3,
      options: [
        'Technology Innovation', 'Business Strategy', 'Creative Arts', 'Data Science',
        'Sustainability', 'Leadership', 'Entrepreneurship', 'Research', 'Design',
        'Finance', 'Healthcare', 'Education', 'Social Impact'
      ]
    },
    {
      id: 'challenges',
      type: 'multi-select',
      label: '14. What is your biggest professional challenge right now?',
      maxSelections: 3,
      options: [
        'Finding the right opportunities', 'Building a network', 'Skill development',
        'Work-life balance', 'Industry transition', 'Leadership growth',
        'Finding mentors', 'Building confidence'
      ]
    },
    {
      id: 'additionalInfo',
      type: 'textarea',
      label: '15. Any additional information you\'d like to share? (Optional)',
      placeholder: 'Tell us anything else that might help us find great matches for you...'
    }
  ]

  const handleAnswer = (questionId: string, value: any) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
  }

  const saveStep3Data = async (questionNumber: number, questionData: any) => {
    try {
      const step3Data = {
        sessionId,
        deviceInfo,
        questionNumber,
        questionId: questionData.id,
        questionLabel: questionData.label,
        answer: answers[questionData.id as keyof FormData],
        postalCode: formData.postalCode,
        name: formData.name,
        email: formData.email,
        ...answers // Include all current answers
      }
      
      await fetch('/api/step3-progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(step3Data),
      })
    } catch (error) {
      console.error('Error saving step 3 progress:', error)
      // Don't block user flow for progress saving errors
    }
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Final submission - submit to Netlify form
      updateFormData(answers)
      nextStep()
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    } else {
      prevStep()
    }
  }

  const currentQ = questions[currentQuestion]
  const currentAnswer = answers[currentQ.id as keyof FormData]

  const isAnswerValid = () => {
    if (currentQ.type === 'multi-select') {
      return Array.isArray(currentAnswer) && currentAnswer.length > 0
    }
    return currentAnswer && currentAnswer !== ''
  }

  const handleMultiSelect = (option: string) => {
    const currentValues = Array.isArray(currentAnswer) ? currentAnswer : []
    const maxSelections = currentQ.maxSelections || Infinity
    
    if (currentValues.includes(option)) {
      // Remove option if already selected
      const newValues = currentValues.filter(v => v !== option)
      handleAnswer(currentQ.id, newValues)
    } else if (currentValues.length < maxSelections) {
      // Add option if under max limit
      const newValues = [...currentValues, option]
      handleAnswer(currentQ.id, newValues)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-pathfinders-blue mb-2">
          Quick Questionnaire
        </h1>
        <p className="text-sm text-gray-600">
          Question {currentQuestion + 1} of {questions.length}
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">
          {currentQ.label}
        </h2>
        <div className="text-sm text-gray-600 mb-4">
          <p>
            If you complete this questionnaire, we'll contact you for a short 
            15-minute networking event within the next 2 weeks based on our predictions.
          </p>
        </div>

        <div className="space-y-3">
          {currentQ.type === 'dropdown' && (
            <div>
              <select
                value={currentAnswer || ''}
                onChange={(e) => handleAnswer(currentQ.id, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pathfinders-blue text-sm"
              >
                <option value="">Select an option...</option>
                {currentQ.options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          )}

          {currentQ.type === 'select' && (
            <div className="space-y-2">
              {currentQ.options?.map((option) => (
                <label key={option} className="flex items-center">
                  <input
                    type="radio"
                    name={currentQ.id}
                    value={option}
                    checked={currentAnswer === option}
                    onChange={(e) => handleAnswer(currentQ.id, e.target.value)}
                    className="mr-3 text-pathfinders-blue focus:ring-pathfinders-blue"
                  />
                  <span className="text-sm">{option}</span>
                </label>
              ))}
            </div>
          )}

          {currentQ.type === 'multi-select' && (
            <div className="space-y-2">
              {currentQ.maxSelections && (
                <p className="text-xs text-gray-500 mb-2">
                  Select up to {currentQ.maxSelections} option{currentQ.maxSelections > 1 ? 's' : ''}
                  {Array.isArray(currentAnswer) && currentAnswer.length > 0 && (
                    <span className="ml-2 font-medium">
                      ({currentAnswer.length}/{currentQ.maxSelections} selected)
                    </span>
                  )}
                </p>
              )}
              {currentQ.options?.map((option) => {
                const isSelected = Array.isArray(currentAnswer) && currentAnswer.includes(option)
                const canSelect = !isSelected && (!currentQ.maxSelections || (Array.isArray(currentAnswer) && currentAnswer.length < currentQ.maxSelections))
                
                return (
                  <label 
                    key={option} 
                    className={`flex items-center p-2 rounded-md transition-colors ${
                      isSelected ? 'bg-blue-50 border border-blue-200' : 
                      canSelect ? 'hover:bg-gray-50' : 'opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleMultiSelect(option)}
                      disabled={!canSelect && !isSelected}
                      className="mr-3 text-pathfinders-blue focus:ring-pathfinders-blue"
                    />
                    <span className="text-sm">{option}</span>
                  </label>
                )
              })}
            </div>
          )}

          {currentQ.type === 'textarea' && (
            <textarea
              value={currentAnswer || ''}
              onChange={(e) => handleAnswer(currentQ.id, e.target.value)}
              placeholder={currentQ.placeholder}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pathfinders-blue text-sm"
            />
          )}
        </div>
      </div>

      <div className="flex space-x-2">
        <button
          type="button"
          onClick={handlePrevious}
          className="flex-1 bg-gray-300 text-gray-700 py-3 px-4 rounded-md font-medium hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
        >
          {currentQuestion === 0 ? 'Back' : 'Previous'}
        </button>
        <button
          type="button"
          onClick={skipToSummary}
          className="flex-1 bg-pathfinders-orange text-white py-3 px-4 rounded-md font-medium hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors"
        >
          Skip
        </button>
        <button
          type="button"
          onClick={handleNext}
          disabled={!isAnswerValid()}
          className="flex-1 bg-pathfinders-blue text-white py-3 px-4 rounded-md font-medium hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
        </button>
      </div>

      <div className="mt-6 text-xs text-gray-500 text-center">
        <p>
          Your responses help us create better matches for meaningful networking connections.
        </p>
      </div>
    </div>
  )
}
