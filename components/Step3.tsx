'use client'

import { useState, useEffect } from 'react'
import { FormData } from '../app/page'
import { submitToGoogleSheets, storeSubmissionLocally, SubmissionData } from '../lib/googleSheets'

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
  const [currentCategory, setCurrentCategory] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [answers, setAnswers] = useState<Partial<FormData>>({
    industry: formData.industry || '',
    educationLevel: formData.educationLevel || '',
    jobFunctionLevel: formData.jobFunctionLevel || '',
    companySize: formData.companySize || '50-200', // Default to middle option
    primaryGoal: formData.primaryGoal || [],
    connectionTypes: formData.connectionTypes || [],
    workEnvironment: formData.workEnvironment || [],
    collaborationPreferences: formData.collaborationPreferences || [],
    networkingWindow: formData.networkingWindow || [],
    dayOfWeek: formData.dayOfWeek || [],
    experience: formData.experience || '6-10 years', // Default to middle option
    communication: formData.communication || '',
    interests: formData.interests || [],
    challenges: formData.challenges || [],
    additionalInfo: formData.additionalInfo || ''
  })

  const categories = [
    {
      title: 'Professional Background & Experience',
      questions: [
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
          type: 'slider',
          label: '4. What size company do you work for?',
          min: 1,
          max: 5,
          step: 1,
          labels: ['1-10', '11-50', '50-200', '200-500', '500+'],
          default: 3
        },
        {
          id: 'experience',
          type: 'slider',
          label: '5. How many years of professional experience do you have?',
          min: 1,
          max: 5,
          step: 1,
          labels: ['0-2 years', '3-5 years', '6-10 years', '11-15 years', '16+ years'],
          default: 3
        }
      ]
    },
    {
      title: 'Networking Goals & Needs',
      questions: [
        {
          id: 'primaryGoal',
          type: 'multi-select',
          label: '6. What is your primary goal for networking?',
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
          label: '7. What types of connections are you looking for? (Select all that apply)',
          maxSelections: 5,
          options: [
            'C-Suite Exec', 'Career Coach', 'Co-founder', 'Community Leader',
            'Creative Professional', 'Domain Expert', 'Industry Influencer',
            'Investor/VC', 'Manager/Leader', 'Mentor', 'Peer Professional',
            'Potential Client', 'Strategic Partner', 'Thought Leader'
          ]
        },
        {
          id: 'interests',
          type: 'multi-select',
          label: '8. What are your main professional interests? (Select up to 3)',
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
          label: '9. What is your biggest professional challenge right now?',
          maxSelections: 3,
          options: [
            'Finding the right opportunities', 'Building a network', 'Skill development',
            'Work-life balance', 'Industry transition', 'Leadership growth',
            'Finding mentors', 'Building confidence'
          ]
        }
      ]
    },
    {
      title: 'Environmental & Style Preferences',
      questions: [
        {
          id: 'workEnvironment',
          type: 'multi-select',
          label: '10. What type of work environment do you prefer?',
          maxSelections: 2,
          options: [
            'Collaborative Space', 'Creative Space', 'Hybrid', 'Private Office',
            'Quiet/Focused', 'Social/Dynamic', 'Structured Environment'
          ]
        },
        {
          id: 'collaborationPreferences',
          type: 'multi-select',
          label: '11. What collaboration preferences do you have? (Select all that apply)',
          maxSelections: 3,
          options: [
            'Collaborative Workshops', 'Creative Brainstorms', 'Cultural Exchange Sessions',
            'Dynamic Sessions', 'Flexible Collaboration', 'Impromptu Brainstorms',
            'Planned Collaboration', 'Social Collaboration', 'Strategic Sessions',
            'Structured Meetings'
          ]
        },
        {
          id: 'communication',
          type: 'select',
          label: '12. What is your preferred communication style?',
          options: ['Direct', 'Diplomatic', 'Analytical', 'Creative', 'Supportive']
        },
        {
          id: 'networkingWindow',
          type: 'multi-select',
          label: '13. What time window works best for networking?',
          options: ['Early Morning', 'Lunch', 'Post-Work', 'Evening', 'Late Evening']
        },
        {
          id: 'dayOfWeek',
          type: 'multi-select',
          label: '14. What day of the week works best for networking?',
          options: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
        }
      ]
    }
  ]

  const additionalQuestion = {
    id: 'additionalInfo',
    type: 'textarea',
    label: '15. Any additional information you\'d like to share? (Optional)',
    placeholder: 'Tell us anything else that might help us find great matches for you...'
  }

  const handleAnswer = (questionId: string, value: any) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
  }

  // Check if current category is complete
  const isCurrentCategoryComplete = () => {
    const currentCategoryQuestions = categories[currentCategory].questions
    return currentCategoryQuestions.every(question => {
      const answer = answers[question.id as keyof FormData]
      if (question.type === 'multi-select') {
        return Array.isArray(answer) && answer.length > 0
      }
      if (question.type === 'slider') {
        return answer && answer !== ''
      }
      return answer && answer !== ''
    })
  }

  const handleNext = async () => {
    if (currentCategory < categories.length - 1) {
      setCurrentCategory(currentCategory + 1)
    } else {
      // Final submission - submit to Google Sheets
      setIsSubmitting(true)
      
      try {
        // Prepare Step 3 data for Google Sheets
        const step3Data: SubmissionData = {
          timestamp: new Date().toISOString(),
          sessionId,
          deviceInfo,
          postalCode: formData.postalCode || '',
          name: formData.name || '',
          email: formData.email || '',
          industry: answers.industry || '',
          educationLevel: answers.educationLevel || '',
          jobFunctionLevel: answers.jobFunctionLevel || '',
          companySize: answers.companySize || '',
          primaryGoal: answers.primaryGoal || [],
          connectionTypes: answers.connectionTypes || [],
          workEnvironment: answers.workEnvironment || [],
          collaborationPreferences: answers.collaborationPreferences || [],
          networkingWindow: answers.networkingWindow || [],
          dayOfWeek: answers.dayOfWeek || [],
          experience: answers.experience || '',
          communication: answers.communication || '',
          interests: answers.interests || [],
          challenges: answers.challenges || [],
          additionalInfo: answers.additionalInfo || ''
        }
        
        // Submit to Google Sheets (Step 3 - Finish)
        const success = await submitToGoogleSheets(step3Data, 'Step3', 'Finish')
        if (!success) {
          storeSubmissionLocally(step3Data)
        }
        
        // Update form data and proceed to next step
        updateFormData(answers)
        nextStep()
      } catch (error) {
        console.error('Error submitting Step 3 data:', error)
        // Still proceed to next step even if submission fails
        updateFormData(answers)
        nextStep()
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const handlePrevious = () => {
    if (currentCategory > 0) {
      setCurrentCategory(currentCategory - 1)
    } else {
      prevStep()
    }
  }

  const handleSkip = async () => {
    setIsSubmitting(true)
    
    try {
      // Prepare Step 3 data for Google Sheets (Skip action)
      const step3Data: SubmissionData = {
        timestamp: new Date().toISOString(),
        sessionId,
        deviceInfo,
        postalCode: formData.postalCode || '',
        name: formData.name || '',
        email: formData.email || '',
        industry: answers.industry || '',
        educationLevel: answers.educationLevel || '',
        jobFunctionLevel: answers.jobFunctionLevel || '',
        companySize: answers.companySize || '',
        primaryGoal: answers.primaryGoal || [],
        connectionTypes: answers.connectionTypes || [],
        workEnvironment: answers.workEnvironment || [],
        collaborationPreferences: answers.collaborationPreferences || [],
        networkingWindow: answers.networkingWindow || [],
        dayOfWeek: answers.dayOfWeek || [],
        experience: answers.experience || '',
        communication: answers.communication || '',
        interests: answers.interests || [],
        challenges: answers.challenges || [],
        additionalInfo: answers.additionalInfo || ''
      }
      
      // Submit to Google Sheets (Step 3 - Skip)
      const success = await submitToGoogleSheets(step3Data, 'Step3', 'Skip')
      if (!success) {
        storeSubmissionLocally(step3Data)
      }
      
      // Update form data and skip to summary
      updateFormData(answers)
      skipToSummary()
    } catch (error) {
      console.error('Error submitting Step 3 skip data:', error)
      // Still skip to summary even if submission fails
      updateFormData(answers)
      skipToSummary()
    } finally {
      setIsSubmitting(false)
    }
  }

  const currentCategoryData = categories[currentCategory]
  const isLastCategory = currentCategory === categories.length - 1

  const handleMultiSelect = (questionId: string, option: string, maxSelections: number) => {
    const currentValues = Array.isArray(answers[questionId as keyof FormData]) ? answers[questionId as keyof FormData] as string[] : []
    
    if (currentValues.includes(option)) {
      // Remove option if already selected
      const newValues = currentValues.filter(v => v !== option)
      handleAnswer(questionId, newValues)
    } else if (currentValues.length < maxSelections) {
      // Add option if under max limit
      const newValues = [...currentValues, option]
      handleAnswer(questionId, newValues)
    }
  }

  const renderQuestion = (question: any) => {
    const currentAnswer = answers[question.id as keyof FormData]
    
    return (
      <div key={question.id} className="mb-6">
        <h3 className="text-sm font-medium text-gray-800 mb-3">
          {question.label}
        </h3>
        
        {question.type === 'dropdown' && (
          <select
            value={currentAnswer || ''}
            onChange={(e) => handleAnswer(question.id, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pathfinders-blue text-sm"
          >
            <option value="">Select an option...</option>
            {question.options?.map((option: string) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        )}

        {question.type === 'select' && (
          <div className="space-y-2">
            {question.options?.map((option: string) => (
              <label key={option} className="flex items-center">
                <input
                  type="radio"
                  name={question.id}
                  value={option}
                  checked={currentAnswer === option}
                  onChange={(e) => handleAnswer(question.id, e.target.value)}
                  className="mr-3 text-pathfinders-blue focus:ring-pathfinders-blue"
                />
                <span className="text-sm">{option}</span>
              </label>
            ))}
          </div>
        )}

        {question.type === 'slider' && (
          <div className="space-y-4">
            <div className="relative">
              <input
                type="range"
                min={question.min}
                max={question.max}
                step={question.step}
                value={question.labels?.indexOf(currentAnswer as string) + 1 || question.default}
                onChange={(e) => {
                  const index = parseInt(e.target.value) - 1
                  const selectedLabel = question.labels[index]
                  handleAnswer(question.id, selectedLabel)
                }}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${((parseInt(question.labels?.indexOf(currentAnswer as string) + 1 || question.default) - 1) / (question.max - 1)) * 100}%, #E5E7EB ${((parseInt(question.labels?.indexOf(currentAnswer as string) + 1 || question.default) - 1) / (question.max - 1)) * 100}%, #E5E7EB 100%)`
                }}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                {question.labels?.map((label: string, index: number) => (
                  <span key={label} className="text-center" style={{ width: `${100 / question.labels.length}%` }}>
                    {label}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-center">
              <span className="text-sm font-medium text-pathfinders-blue">
                Selected: {currentAnswer || question.labels?.[question.default - 1]}
              </span>
            </div>
          </div>
        )}

        {question.type === 'multi-select' && (
          <div className="space-y-4">
            {/* Selection Counter - Prominent Display */}
            <div className="bg-gray-50 rounded-lg p-3 border">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-700">
                    {Array.isArray(currentAnswer) ? currentAnswer.length : 0}
                    {question.maxSelections ? ` of ${question.maxSelections}` : ''} selected
                  </span>
                  {question.maxSelections && (
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-pathfinders-blue h-2 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${Math.min(((Array.isArray(currentAnswer) ? currentAnswer.length : 0) / question.maxSelections) * 100, 100)}%` 
                        }}
                      />
                    </div>
                  )}
                </div>
                {Array.isArray(currentAnswer) && currentAnswer.length > 0 && (
                  <button
                    type="button"
                    onClick={() => handleAnswer(question.id, [])}
                    className="text-xs text-gray-500 hover:text-gray-700 underline"
                  >
                    Clear all
                  </button>
                )}
              </div>
              {question.maxSelections && Array.isArray(currentAnswer) && currentAnswer.length >= question.maxSelections * 0.8 && (
                <div className="mt-2 text-xs text-orange-600 font-medium">
                  {currentAnswer.length >= question.maxSelections ? 
                    "Maximum selections reached" : 
                    "Approaching selection limit"
                  }
                </div>
              )}
            </div>

            {/* Grid Layout for Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {question.options?.map((option: string, index: number) => {
                const isSelected = Array.isArray(currentAnswer) && currentAnswer.includes(option)
                const canSelect = !isSelected && (!question.maxSelections || (Array.isArray(currentAnswer) && currentAnswer.length < question.maxSelections))
                
                // Color coding based on question type and option
                const getOptionColor = (questionId: string, option: string, isSelected: boolean) => {
                  if (!isSelected) return 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                  
                  const colorMap: { [key: string]: string } = {
                    // Primary Goals - Blue tones
                    'primaryGoal': 'bg-blue-100 border-blue-300 text-blue-800',
                    // Connection Types - Green tones  
                    'connectionTypes': 'bg-green-100 border-green-300 text-green-800',
                    // Interests - Purple tones
                    'interests': 'bg-purple-100 border-purple-300 text-purple-800',
                    // Challenges - Orange tones
                    'challenges': 'bg-orange-100 border-orange-300 text-orange-800',
                    // Work Environment - Teal tones
                    'workEnvironment': 'bg-teal-100 border-teal-300 text-teal-800',
                    // Collaboration Preferences - Indigo tones
                    'collaborationPreferences': 'bg-indigo-100 border-indigo-300 text-indigo-800',
                    // Networking Window - Pink tones
                    'networkingWindow': 'bg-pink-100 border-pink-300 text-pink-800',
                    // Day of Week - Yellow tones
                    'dayOfWeek': 'bg-yellow-100 border-yellow-300 text-yellow-800'
                  }
                  return colorMap[questionId] || 'bg-blue-100 border-blue-300 text-blue-800'
                }
                
                
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleMultiSelect(question.id, option, question.maxSelections || Infinity)}
                    disabled={!canSelect && !isSelected}
                    className={`
                      flex items-center justify-between px-4 py-3 rounded-full border-2 transition-all duration-200 
                      ${getOptionColor(question.id, option, isSelected)}
                      ${canSelect || isSelected ? 'cursor-pointer hover:scale-105' : 'opacity-50 cursor-not-allowed'}
                      ${isSelected ? 'ring-2 ring-offset-1' : ''}
                    `}
                  >
                    <span className="text-sm font-medium">{option}</span>
                    {isSelected && <span className="text-lg font-bold">✓</span>}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {question.type === 'textarea' && (
          <textarea
            value={currentAnswer || ''}
            onChange={(e) => handleAnswer(question.id, e.target.value)}
            placeholder={question.placeholder}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pathfinders-blue text-sm"
          />
        )}
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3B82F6;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3B82F6;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        
        .slider:focus {
          outline: none;
        }
        
        .slider:focus::-webkit-slider-thumb {
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
        }
        
        .slider:focus::-moz-range-thumb {
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
        }
      `}</style>
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-pathfinders-blue mb-2">
          Quick Questionnaire
        </h1>
        <p className="text-sm text-gray-600">
          Category {currentCategory + 1} of {categories.length}: {currentCategoryData.title}
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">
          {currentCategoryData.title}
        </h2>
        <div className="text-sm text-gray-600 mb-4">
          <p>
            If you complete this questionnaire, we'll contact you for a short 
            15-minute networking event within the next 2 weeks based on our predictions.
          </p>
        </div>

        <div className="space-y-4">
          {currentCategoryData.questions.map(renderQuestion)}
        </div>
      </div>

      <div className="flex space-x-2">
        <button
          type="button"
          onClick={handlePrevious}
          disabled={isSubmitting}
          className="flex-1 bg-gray-300 text-gray-700 py-3 px-4 rounded-md font-medium hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors disabled:bg-gray-200 disabled:cursor-not-allowed"
        >
          {currentCategory === 0 ? 'Back' : 'Previous'}
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
          type="button"
          onClick={handleNext}
          disabled={!isCurrentCategoryComplete() || isSubmitting}
          className="flex-1 bg-pathfinders-blue text-white py-3 px-4 rounded-md font-medium hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Saving...' : (isLastCategory ? 'Finish' : 'Next')}
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
