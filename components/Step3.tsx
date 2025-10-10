'use client'

import { useState, useEffect } from 'react'
import { FormData } from '../app/page'
import { submitToGoogleSheets, storeSubmissionLocally, SubmissionData } from '../lib/dataSubmission'

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
  const [industrySearch, setIndustrySearch] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [dropdownStates, setDropdownStates] = useState<{[key: string]: {isOpen: boolean, search: string}}>({})

  // Scroll to top when component loads
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  // Scroll to top when category changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentCategory])

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (!target.closest('.dropdown-container')) {
        // Close industry dropdown
        if (isDropdownOpen) {
          setIsDropdownOpen(false)
        }
        // Close all other dropdowns
        Object.keys(dropdownStates).forEach(questionId => {
          if (dropdownStates[questionId]?.isOpen) {
            setDropdownState(questionId, { isOpen: false })
          }
        })
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isDropdownOpen, dropdownStates])
  const [answers, setAnswers] = useState<Partial<FormData>>({
    industry: formData.industry || '',
    educationLevel: formData.educationLevel || '',
    jobFunctionLevel: formData.jobFunctionLevel || '',
    companySize: formData.companySize || '1-10', // Default to lowest option
    primaryGoal: formData.primaryGoal || [],
    connectionTypes: formData.connectionTypes || [],
    workEnvironment: formData.workEnvironment || [],
    collaborationPreferences: formData.collaborationPreferences || [],
    networkingWindow: formData.networkingWindow || [],
    dayOfWeek: formData.dayOfWeek || [],
    experience: formData.experience || '0-2 ', // Default to lowest option
    communication: Array.isArray(formData.communication) ? formData.communication : (formData.communication ? [formData.communication] : []),
    interests: formData.interests || [],
    challenges: formData.challenges || [],
    additionalInfo: formData.additionalInfo || ''
  })

  const categories = [
    {
      title: 'Professional Background & Experience (1/3)',
      questions: [
        {
          id: 'industry',
          type: 'searchable-dropdown',
          label: '1. What industry do you work in?',
          options: [
            'Arts', 'Business', 'Civil Service', 'Creative Arts', 'Education',
            'Executive', 'Finance', 'Government', 'Healthcare', 'Law',
            'Marketing', 'Medicine', 'NGO', 'Professional', 'Public Sector',
            'Retail', 'Science', 'Service', 'Student', 'Tech', 'Trade'
          ],
          placeholder: 'Search and select your industry...'
        },
        {
          id: 'educationLevel',
          type: 'single-select-pill',
          label: '2. What is your education level?',
          options: ['Graduate', 'Bachelor\'s', 'Some College', 'Professional', 'High School']
        },
        {
          id: 'jobFunctionLevel',
          type: 'single-select-pill',
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
          default: 1
        },
        {
          id: 'experience',
          type: 'slider',
          label: '5. How many years of professional experience do you have?',
          min: 1,
          max: 5,
          step: 1,
          labels: ['0-2 ', '3-5 ', '6-10 ', '11-15 ', '16+ yrs'],
          default: 1
        }
      ]
    },
    {
      title: 'Networking Goals & Needs (2/3)',
      questions: [
        {
          id: 'primaryGoal',
          type: 'multi-select-dropdown',
          label: '6. What is your primary goal for networking?',
          maxSelections: 5,
          options: [
            'Build Community', 'Business Development', 'Career Advancement', 'Career Transition',
            'Collaborate on Projects', 'Creative Collaboration', 'Cultural Integration',
            'Establish Network', 'Find Co-founder', 'Find Mentor', 'Gain Clients',
            'Investment Opportunities', 'Job Opportunities', 'Market Expansion',
            'Professional Development', 'Secure Funding', 'Skill Development',
            'Strategic Partnerships', 'Thought Leadership'
          ],
          placeholder: 'Search and select your networking goals...'
        },
        {
          id: 'connectionTypes',
          type: 'multi-select-dropdown',
          label: '7. What types of connections are you looking for? (Select all that apply)',
          maxSelections: 5,
          options: [
            'C-Suite Exec', 'Career Coach', 'Co-founder', 'Community Leader',
            'Creative Professional', 'Domain Expert', 'Industry Influencer',
            'Investor/VC', 'Manager/Leader', 'Mentor', 'Peer Professional',
            'Potential Client', 'Strategic Partner', 'Thought Leader'
          ],
          placeholder: 'Search and select connection types...'
        },
        {
          id: 'interests',
          type: 'multi-select-dropdown',
          label: '8. What are your main professional interests? (Select up to 3)',
          maxSelections: 3,
          options: [
            'Technology Innovation', 'Business Strategy', 'Creative Arts', 'Data Science',
            'Sustainability', 'Leadership', 'Entrepreneurship', 'Research', 'Design',
            'Finance', 'Healthcare', 'Education', 'Social Impact'
          ],
          placeholder: 'Search and select your interests...'
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
      title: 'Environmental & Style Preferences (3/3)',
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
          type: 'multi-select-dropdown',
          label: '11. What collaboration preferences do you have? (Select all that apply)',
          maxSelections: 3,
          options: [
            'Collaborative Workshops', 'Creative Brainstorms', 'Cultural Exchange Sessions',
            'Dynamic Sessions', 'Flexible Collaboration', 'Impromptu Brainstorms',
            'Planned Collaboration', 'Social Collaboration', 'Strategic Sessions',
            'Structured Meetings'
          ],
          placeholder: 'Search and select collaboration preferences...'
        },
        {
          id: 'communication',
          type: 'multi-select',
          label: '12. What is your preferred communication style? (Select up to 2)',
          maxSelections: 2,
          options: ['Direct', 'Diplomatic', 'Analytical', 'Creative', 'Supportive']
        },
        {
          id: 'networkingWindow',
          type: 'multi-select',
          label: '13. What time window works best for networking?',
          options: ['Early Morning', 'Lunch', 'Afternoon', 'Post-Work', 'Evening', 'Late Evening']
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

  // Helper functions for dropdown state management
  const getDropdownState = (questionId: string) => {
    return dropdownStates[questionId] || { isOpen: false, search: '' }
  }

  const setDropdownState = (questionId: string, updates: Partial<{isOpen: boolean, search: string}>) => {
    setDropdownStates(prev => ({
      ...prev,
      [questionId]: { ...getDropdownState(questionId), ...updates }
    }))
  }

  // Get count of answered questions in current category
  const getCurrentCategoryAnsweredCount = () => {
    const currentCategoryQuestions = categories[currentCategory].questions
    const allQuestions = isLastCategory ? [...currentCategoryQuestions, additionalQuestion] : currentCategoryQuestions
    
    let answeredCount = 0
    
    allQuestions.forEach(question => {
      const answer = answers[question.id as keyof FormData]
      if (question.type === 'multi-select' || question.type === 'multi-select-dropdown') {
        if (Array.isArray(answer) && answer.length > 0) {
          answeredCount++
        }
      } else if (question.type === 'slider' || question.type === 'single-select-pill' || question.type === 'searchable-dropdown') {
        if (answer && answer !== '') {
          answeredCount++
        }
      } else if (question.type === 'textarea') {
        // Textarea is optional, so don't count toward minimum
        return
      } else {
        if (answer && answer !== '') {
          answeredCount++
        }
      }
    })
    
    return answeredCount
  }

  // Check if current category has at least 3 questions answered
  const isCurrentCategoryComplete = () => {
    return getCurrentCategoryAnsweredCount() >= 3
  }

  const handleNext = async () => {
    if (currentCategory < categories.length - 1) {
      setCurrentCategory(currentCategory + 1)
      // Scroll to top when navigating to next category
      window.scrollTo({ top: 0, behavior: 'smooth' })
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
          communication: Array.isArray(answers.communication) ? answers.communication : [],
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
      // Scroll to top when navigating to previous category
      window.scrollTo({ top: 0, behavior: 'smooth' })
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
        communication: Array.isArray(answers.communication) ? answers.communication : [],
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
      <div key={question.id} className="mb-8">
        <h3 className="text-lg font-semibold text-white mb-4">
          {question.label}
        </h3>
        
        {question.type === 'dropdown' && (
          <select
            value={currentAnswer || ''}
            onChange={(e) => handleAnswer(question.id, e.target.value)}
            className="form-input w-full px-4 py-3 rounded-xl focus:outline-none text-base"
          >
            <option value="">Select an option...</option>
            {question.options?.map((option: string) => (
              <option key={option} value={option} className="bg-gray-800 text-white">
                {option}
              </option>
            ))}
          </select>
        )}

        {question.type === 'select' && (
          <div className="space-y-3">
            {question.options?.map((option: string) => (
              <label key={option} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name={question.id}
                  value={option}
                  checked={currentAnswer === option}
                  onChange={(e) => handleAnswer(question.id, e.target.value)}
                  className="mr-4 w-4 h-4 text-cyan-500 focus:ring-cyan-500 bg-gray-700 border-gray-600"
                />
                <span className="text-base text-gray-300">{option}</span>
              </label>
            ))}
          </div>
        )}

        {question.type === 'single-select-pill' && (
          <div className="space-y-6">
            {/* Selection Progress */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-base font-medium text-gray-300">
                  {currentAnswer ? '1 of 1 selected' : '0 of 1 selected'}
                </span>
                {currentAnswer && (
                  <button
                    type="button"
                    onClick={() => handleAnswer(question.id, '')}
                    className="text-sm text-gray-400 hover:text-gray-200 underline"
                  >
                    Clear selection
                  </button>
                )}
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2 mt-3">
                <div 
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${currentAnswer ? 100 : 0}%` 
                  }}
                />
              </div>
            </div>

            {/* Options Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {question.options?.map((option: string) => {
                const isSelected = currentAnswer === option
                
                // Color coding for single-select pills - consistent blue gradient for selected
                const getPillColor = (questionId: string, isSelected: boolean) => {
                  if (!isSelected) return 'bg-white/10 border-white/20 text-gray-300 hover:bg-white/20'
                  
                  // For selected pills, always return the blue gradient as per wireframe
                  return 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-blue-500 shadow-lg shadow-cyan-500/30'
                }
                
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleAnswer(question.id, option)}
                    className={`
                      flex items-center justify-between px-6 py-4 rounded-2xl border-2 transition-all duration-200 
                      ${getPillColor(question.id, isSelected)}
                      cursor-pointer hover:scale-105
                      ${isSelected ? 'ring-2 ring-cyan-500/50 ring-offset-2 ring-offset-black' : ''}
                    `}
                  >
                    <span className="text-base font-medium">{option}</span>
                    {isSelected && <span className="text-xl font-bold">✓</span>}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {question.type === 'searchable-dropdown' && (
          <div className="space-y-6">
            {/* Selection Progress */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-base font-medium text-gray-300">
                  {currentAnswer ? '1 of 1 selected' : '0 of 1 selected'}
                </span>
                {currentAnswer && (
                  <button
                    type="button"
                    onClick={() => {
                      handleAnswer(question.id, '')
                      setIndustrySearch('')
                      setIsDropdownOpen(false)
                    }}
                    className="text-sm text-cyan-400 hover:text-cyan-300 underline"
                  >
                    Clear selection
                  </button>
                )}
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2 mt-3">
                <div 
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${currentAnswer ? 100 : 0}%` 
                  }}
                />
              </div>
            </div>

            {/* Searchable Dropdown */}
            <div className="relative dropdown-container">
              {/* Dropdown Trigger */}
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="form-input w-full flex items-center justify-between px-6 py-4 rounded-xl focus:outline-none focus:ring-4 focus:ring-cyan-500/30 transition-all duration-200"
              >
                <span className={`text-base font-medium ${currentAnswer ? 'text-white' : 'text-gray-400'}`}>
                  {currentAnswer || question.placeholder}
                </span>
                <svg 
                  className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Content */}
              {isDropdownOpen && (
                <div className="absolute z-10 w-full mt-2 bg-gray-800/95 backdrop-blur-sm border border-white/20 rounded-xl shadow-2xl max-h-80 overflow-hidden">
                  {/* Search Input */}
                  <div className="p-4 border-b border-white/10">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        placeholder="Search industries..."
                        value={industrySearch}
                        onChange={(e) => setIndustrySearch(e.target.value)}
                        className="form-input w-full pl-9 pr-3 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-base"
                        autoFocus
                      />
                      {industrySearch && (
                        <button
                          type="button"
                          onClick={() => setIndustrySearch('')}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                          <svg className="h-4 w-4 text-gray-400 hover:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Options List - Shows ~5 options as standard */}
                  <div className="max-h-60 overflow-y-auto">
                    {(() => {
                      const filteredOptions = question.options?.filter((option: string) => 
                        option.toLowerCase().includes(industrySearch.toLowerCase())
                      ) || []
                      
                      if (filteredOptions.length === 0) {
                        return (
                          <div className="px-4 py-3 text-base text-gray-400 text-center">
                            No industries found matching "{industrySearch}"
                          </div>
                        )
                      }
                      
                      return filteredOptions.map((option: string) => {
                        const isSelected = currentAnswer === option
                        return (
                          <button
                            key={option}
                            type="button"
                            onClick={() => {
                              handleAnswer(question.id, option)
                              setIsDropdownOpen(false)
                              setIndustrySearch('')
                            }}
                            className={`w-full px-4 py-3 text-left text-base hover:bg-white/10 transition-colors duration-150 flex items-center justify-between ${
                              isSelected ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-cyan-300' : 'text-gray-300'
                            }`}
                          >
                            <span className="font-medium">{option}</span>
                            {isSelected && (
                              <svg className="h-4 w-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </button>
                        )
                      })
                    })()}
                  </div>
                </div>
              )}
            </div>

            {/* Selected Option Display */}
            {currentAnswer && (
              <div className="bg-gradient-to-r from-cyan-500/10 to-blue-600/10 border border-cyan-500/30 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <svg className="h-5 w-5 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-base font-semibold text-cyan-300">
                    Selected: {currentAnswer}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {question.type === 'slider' && (
          <div className="space-y-6">
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
                className="w-full h-3 bg-gray-800 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #00D4D4 0%, #0066FF ${((parseInt(question.labels?.indexOf(currentAnswer as string) + 1 || question.default) - 1) / (question.max - 1)) * 100}%, #374151 ${((parseInt(question.labels?.indexOf(currentAnswer as string) + 1 || question.default) - 1) / (question.max - 1)) * 100}%, #374151 100%)`
                }}
              />
              <div className="flex justify-between text-sm text-gray-400 mt-3">
                {question.labels?.map((label: string, index: number) => (
                  <span key={label} className="text-center" style={{ width: `${100 / question.labels.length}%` }}>
                    {label}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-center">
              <span className="text-lg font-semibold gradient-text">
                Selected: {currentAnswer || question.labels?.[question.default - 1]}
              </span>
            </div>
          </div>
        )}

        {question.type === 'multi-select-dropdown' && (
          <div className="space-y-6">
            {/* Selection Counter */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-base font-medium text-gray-300">
                    {Array.isArray(currentAnswer) ? currentAnswer.length : 0}
                    {question.maxSelections ? ` of ${question.maxSelections}` : ''} selected
                  </span>
                  {question.maxSelections && (
                    <div className="w-20 bg-gray-800 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-cyan-500 to-blue-600 h-2 rounded-full transition-all duration-300"
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
                    onClick={() => {
                      handleAnswer(question.id, [])
                      setDropdownState(question.id, { search: '' })
                    }}
                    className="text-sm text-cyan-400 hover:text-cyan-300 underline"
                  >
                    Clear all
                  </button>
                )}
              </div>
              {question.maxSelections && Array.isArray(currentAnswer) && currentAnswer.length >= question.maxSelections * 0.8 && (
                <div className="mt-3 text-sm text-orange-400 font-medium">
                  {currentAnswer.length >= question.maxSelections ? 
                    "Maximum selections reached" : 
                    "Approaching selection limit"
                  }
                </div>
              )}
            </div>

            {/* Searchable Dropdown */}
            <div className="relative dropdown-container">
              {/* Dropdown Trigger */}
              <button
                type="button"
                onClick={() => setDropdownState(question.id, { isOpen: !getDropdownState(question.id).isOpen })}
                className="form-input w-full flex items-center justify-between px-6 py-4 rounded-xl focus:outline-none focus:ring-4 focus:ring-cyan-500/30 transition-all duration-200"
              >
                <span className={`text-base font-medium ${Array.isArray(currentAnswer) && currentAnswer.length > 0 ? 'text-white' : 'text-gray-400'}`}>
                  {Array.isArray(currentAnswer) && currentAnswer.length > 0 
                    ? `${currentAnswer.length} selected` 
                    : question.placeholder}
                </span>
                <svg 
                  className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${getDropdownState(question.id).isOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Content */}
              {getDropdownState(question.id).isOpen && (
                <div className="absolute z-10 w-full mt-2 bg-gray-800/95 backdrop-blur-sm border border-white/20 rounded-xl shadow-2xl max-h-80 overflow-hidden">
                  {/* Search Input */}
                  <div className="p-4 border-b border-white/10">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        placeholder="Search options..."
                        value={getDropdownState(question.id).search}
                        onChange={(e) => setDropdownState(question.id, { search: e.target.value })}
                        className="form-input w-full pl-9 pr-3 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-base"
                        autoFocus
                      />
                      {getDropdownState(question.id).search && (
                        <button
                          type="button"
                          onClick={() => setDropdownState(question.id, { search: '' })}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                          <svg className="h-4 w-4 text-gray-400 hover:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Options List - Shows ~5 options as standard */}
                  <div className="max-h-60 overflow-y-auto">
                    {(() => {
                      const filteredOptions = question.options?.filter((option: string) => 
                        option.toLowerCase().includes(getDropdownState(question.id).search.toLowerCase())
                      ) || []
                      
                      if (filteredOptions.length === 0) {
                        return (
                          <div className="px-4 py-3 text-base text-gray-400 text-center">
                            No options found matching "{getDropdownState(question.id).search}"
                          </div>
                        )
                      }
                      
                      return filteredOptions.map((option: string) => {
                        const isSelected = Array.isArray(currentAnswer) && currentAnswer.includes(option)
                        const canSelect = !isSelected && (!question.maxSelections || (Array.isArray(currentAnswer) && currentAnswer.length < question.maxSelections))
                        
                        return (
                          <button
                            key={option}
                            type="button"
                            onClick={() => {
                              if (isSelected) {
                                // Remove option
                                const newValues = (currentAnswer as string[]).filter(v => v !== option)
                                handleAnswer(question.id, newValues)
                              } else if (canSelect) {
                                // Add option
                                const newValues = [...(currentAnswer as string[] || []), option]
                                handleAnswer(question.id, newValues)
                              }
                            }}
                            disabled={!canSelect && !isSelected}
                            className={`w-full px-4 py-3 text-left text-base hover:bg-white/10 transition-colors duration-150 flex items-center justify-between ${
                              isSelected ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-cyan-300' : canSelect ? 'text-gray-300' : 'text-gray-500 cursor-not-allowed'
                            }`}
                          >
                            <span className="font-medium">{option}</span>
                            {isSelected && (
                              <svg className="h-4 w-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </button>
                        )
                      })
                    })()}
                  </div>
                </div>
              )}
            </div>

            {/* Selected Options Display */}
            {Array.isArray(currentAnswer) && currentAnswer.length > 0 && (
              <div className="bg-gradient-to-r from-cyan-500/10 to-blue-600/10 border border-cyan-500/30 rounded-xl p-4">
                <div className="flex flex-wrap gap-3">
                  {currentAnswer.map((option: string) => (
                    <span
                      key={option}
                      className="inline-flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-cyan-300 text-sm font-medium rounded-xl border border-cyan-500/30"
                    >
                      {option}
                      <button
                        type="button"
                        onClick={() => {
                          const newValues = currentAnswer.filter(v => v !== option)
                          handleAnswer(question.id, newValues)
                        }}
                        className="hover:text-cyan-100 transition-colors"
                      >
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {question.type === 'multi-select' && (
          <div className="space-y-6">
            {/* Selection Counter - Prominent Display */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-base font-medium text-gray-300">
                    {Array.isArray(currentAnswer) ? currentAnswer.length : 0}
                    {question.maxSelections ? ` of ${question.maxSelections}` : ''} selected
                  </span>
                  {question.maxSelections && (
                    <div className="w-20 bg-gray-800 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-cyan-500 to-blue-600 h-2 rounded-full transition-all duration-300"
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
                    className="text-sm text-cyan-400 hover:text-cyan-300 underline"
                  >
                    Clear all
                  </button>
                )}
              </div>
              {question.maxSelections && Array.isArray(currentAnswer) && currentAnswer.length >= question.maxSelections * 0.8 && (
                <div className="mt-3 text-sm text-orange-400 font-medium">
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
                
                // Color coding for multi-select pills - consistent blue gradient for selected
                const getOptionColor = (questionId: string, option: string, isSelected: boolean) => {
                  if (!isSelected) return 'bg-white/10 border-white/20 text-gray-300 hover:bg-white/20'
                  
                  // For selected pills, always return the blue gradient as per wireframe
                  return 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-blue-500 shadow-lg shadow-cyan-500/30'
                }
                
                
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleMultiSelect(question.id, option, question.maxSelections || Infinity)}
                    disabled={!canSelect && !isSelected}
                    className={`
                      flex items-center justify-between px-6 py-4 rounded-2xl border-2 transition-all duration-200 
                      ${getOptionColor(question.id, option, isSelected)}
                      ${canSelect || isSelected ? 'cursor-pointer hover:scale-105' : 'opacity-50 cursor-not-allowed'}
                      ${isSelected ? 'ring-2 ring-cyan-500/50 ring-offset-2 ring-offset-black' : ''}
                    `}
                  >
                    <span className="text-base font-medium">{option}</span>
                    {isSelected && <span className="text-xl font-bold">✓</span>}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {question.type === 'textarea' && (
          <div className="space-y-6">
            <textarea
              value={currentAnswer || ''}
              onChange={(e) => handleAnswer(question.id, e.target.value)}
              placeholder={question.placeholder}
              rows={4}
              className="form-input w-full px-6 py-4 rounded-xl focus:outline-none focus:ring-4 focus:ring-cyan-500/30 text-base resize-none min-h-[120px]"
            />
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="dark-glassmorphism p-8 md:p-10">
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #00D4D4, #0066FF);
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 4px 8px rgba(0, 212, 212, 0.3);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #00D4D4, #0066FF);
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 4px 8px rgba(0, 212, 212, 0.3);
        }
        
        .slider:focus {
          outline: none;
        }
        
        .slider:focus::-webkit-slider-thumb {
          box-shadow: 0 0 0 3px rgba(0, 212, 212, 0.3);
        }
        
        .slider:focus::-moz-range-thumb {
          box-shadow: 0 0 0 3px rgba(0, 212, 212, 0.3);
        }
      `}</style>
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
            <h1 className="text-4xl font-black gradient-text">
              Profile Refinement
            </h1>
            <p className="text-lg font-medium text-gray-300">
              Your Professional Profile
            </p>
          </div>
        </div>
      </div>

      {/* Enhanced Current Section */}
      <div className="mb-10">
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600">
              <span className="text-white text-xl">📝</span>
            </div>
            <h2 className="text-xl font-bold gradient-text text-center">
              {currentCategoryData.title}
            </h2>
          </div>
          <div className="text-gray-300 text-base leading-relaxed space-y-2">
            <p className="font-semibold">
              Unlock curated, relevant networking opportunities!
            </p>
            <p className="text-gray-400">
              These 15 questions are key to building quality connections.
            </p>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <div className="space-y-8">
            {currentCategoryData.questions.map(renderQuestion)}
            {isLastCategory && renderQuestion(additionalQuestion)}
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        {/* Back Button - COMMENTED OUT - May re-enable later */}
        {/* <button
          type="button"
          onClick={handlePrevious}
          disabled={isSubmitting}
          className="btn-secondary flex-1 py-4 px-6 rounded-xl font-semibold focus:outline-none focus:ring-4 focus:ring-gray-500/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {currentCategory === 0 ? 'Back' : 'Previous'}
        </button> */}
        {/* Skip Button - COMMENTED OUT - May re-enable later */}
        {/* <button
          type="button"
          onClick={handleSkip}
          disabled={isSubmitting}
          className="btn-muted flex-1 py-4 px-6 rounded-xl font-semibold focus:outline-none focus:ring-4 focus:ring-gray-400/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Saving...' : 'Skip'}
        </button> */}
        <button
          type="button"
          onClick={handleNext}
          disabled={!isCurrentCategoryComplete() || isSubmitting}
          className="btn-primary flex-1 py-4 px-6 rounded-xl font-bold focus:outline-none focus:ring-4 focus:ring-cyan-500/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:transform-none"
        >
          {isSubmitting ? 'Saving...' : (isLastCategory ? 'Finish' : 'Next')}
        </button>
      </div>

      {/* Category Progress Indicator - Moved after buttons */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 mt-8 border border-white/10">
        <div className="flex items-center justify-between mb-3">
          <span className="text-base font-semibold text-gray-300">
            Current Section Progress
          </span>
          <span className="text-base font-bold gradient-text">
            {getCurrentCategoryAnsweredCount()}/{isLastCategory ? currentCategoryData.questions.length : currentCategoryData.questions.length} answered
          </span>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
          <div 
            className="btn-primary h-3 transition-all duration-500"
            style={{ 
              width: `${Math.min((getCurrentCategoryAnsweredCount() / (isLastCategory ? currentCategoryData.questions.length : currentCategoryData.questions.length)) * 100, 100)}%` 
            }}
          />
        </div>
        <div className="mt-3 text-sm">
          {getCurrentCategoryAnsweredCount() >= 3 ? (
            <span className="text-green-400 font-semibold">✓ Ready to proceed!</span>
          ) : (
            <span className="text-gray-400">Answer at least 3 questions in this category to continue</span>
          )}
        </div>
      </div>

      <div className="mt-8 text-sm text-gray-400 text-center bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
        <p className="mb-3">
          Using anonymized traits and FSAs, our model will predict matches with compatible peers for a 
          voluntary 15-minute introductory networking event within the next one to two weeks.
        </p>
        <p>
          Say goodbye to awkward, random mingling; we're focused on quality connections that align with your interests and professional style.
        </p>      
      </div>
    </div>
  )
}
