'use client'

import { useState, useEffect } from 'react'
import { FormData } from '../app/page'

interface Step4Props {
  formData: Partial<FormData>
  prevStep: () => void
  sessionId: string
  deviceInfo: any
}

export default function Step4({ formData, prevStep, sessionId, deviceInfo }: Step4Props) {
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Step4 is now just a confirmation page - data submission happens in previous steps
  useEffect(() => {
    // Mark as submitted immediately since this is just a thank you page
    setIsSubmitted(true)
  }, [])
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 text-center">
      <div className="mb-6">
        <div className="flex justify-center mb-4">
          <img 
            src="/logo.jpeg" 
            alt="Pathfinders Logo" 
            className="h-16 w-auto"
          />
        </div>
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-pathfinders-blue mb-2">
          Thank You!
        </h1>
        <p className="text-gray-600">
          Your information has been successfully submitted.
        </p>
      </div>

      {/* Review Information Section */}
      <div className="text-left space-y-4 mb-6 bg-gray-50 rounded-lg p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-3 text-center">Your Submission Summary</h2>
        
        <div className="border-b pb-3">
          <h3 className="font-medium text-gray-800 mb-1">Location</h3>
          <p className="text-sm text-gray-600">{formData.postalCode}</p>
        </div>

        <div className="border-b pb-3">
          <h3 className="font-medium text-gray-800 mb-1">Contact Information</h3>
          <p className="text-sm text-gray-600">{formData.name}</p>
          <p className="text-sm text-gray-600">{formData.email}</p>
        </div>

        <div className="border-b pb-3">
          <h3 className="font-medium text-gray-800 mb-1">Professional Background</h3>
          <p className="text-sm text-gray-600">
            <strong>Industry:</strong> {formData.industry}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Education:</strong> {formData.educationLevel}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Job Level:</strong> {formData.jobFunctionLevel}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Company Size:</strong> {formData.companySize}
          </p>
          {formData.experience && (
            <p className="text-sm text-gray-600">
              <strong>Experience:</strong> {formData.experience}
            </p>
          )}
          {formData.communication && (
            <p className="text-sm text-gray-600">
              <strong>Communication Style:</strong> {formData.communication}
            </p>
          )}
        </div>

        <div className="border-b pb-3">
          <h3 className="font-medium text-gray-800 mb-1">Networking Goals</h3>
          {formData.primaryGoal && (
            <p className="text-sm text-gray-600">
              <strong>Primary Goal:</strong> {Array.isArray(formData.primaryGoal) ? formData.primaryGoal.join(', ') : formData.primaryGoal}
            </p>
          )}
          {formData.connectionTypes && (
            <p className="text-sm text-gray-600">
              <strong>Connection Types:</strong> {Array.isArray(formData.connectionTypes) ? formData.connectionTypes.join(', ') : formData.connectionTypes}
            </p>
          )}
        </div>

        <div className="border-b pb-3">
          <h3 className="font-medium text-gray-800 mb-1">Preferences</h3>
          {formData.workEnvironment && (
            <p className="text-sm text-gray-600">
              <strong>Work Environment:</strong> {Array.isArray(formData.workEnvironment) ? formData.workEnvironment.join(', ') : formData.workEnvironment}
            </p>
          )}
          {formData.collaborationPreferences && (
            <p className="text-sm text-gray-600">
              <strong>Collaboration Style:</strong> {Array.isArray(formData.collaborationPreferences) ? formData.collaborationPreferences.join(', ') : formData.collaborationPreferences}
            </p>
          )}
          {formData.networkingWindow && (
            <p className="text-sm text-gray-600">
              <strong>Best Time:</strong> {Array.isArray(formData.networkingWindow) ? formData.networkingWindow.join(', ') : formData.networkingWindow}
            </p>
          )}
          {formData.dayOfWeek && (
            <p className="text-sm text-gray-600">
              <strong>Best Days:</strong> {Array.isArray(formData.dayOfWeek) ? formData.dayOfWeek.join(', ') : formData.dayOfWeek}
            </p>
          )}
        </div>

        {Array.isArray(formData.interests) && formData.interests.length > 0 && (
          <div className="border-b pb-3">
            <h3 className="font-medium text-gray-800 mb-1">Professional Interests</h3>
            <p className="text-sm text-gray-600">
              <strong>Main Interests:</strong> {formData.interests.join(', ')}
            </p>
          </div>
        )}

        {Array.isArray(formData.challenges) && formData.challenges.length > 0 && (
          <div className="border-b pb-3">
            <h3 className="font-medium text-gray-800 mb-1">Professional Challenges</h3>
            <p className="text-sm text-gray-600">
              <strong>Current Challenges:</strong> {formData.challenges.join(', ')}
            </p>
          </div>
        )}

        {formData.additionalInfo && (
          <div>
            <h3 className="font-medium text-gray-800 mb-1">Additional Information</h3>
            <p className="text-sm text-gray-600">{formData.additionalInfo}</p>
          </div>
        )}
      </div>

      <div className="bg-blue-50 rounded-lg p-4 mb-6">
        <h2 className="font-semibold text-pathfinders-blue mb-2">
          What Happens Next?
        </h2>
        <div className="text-sm text-gray-700 space-y-2">
          <p>
            • We'll analyze your responses and identify potential matches
          </p>
          <p>
            • You'll receive an email summary of your potential connections within 48 hours
          </p>
          <p>
            • If selected, we'll contact you within 2 weeks for a 15-minute networking event
          </p>
          <p>
            • Only 20 participants will be selected for our first event
          </p>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-gray-800 mb-2">
          Your Privacy Promise
        </h3>
        <p className="text-sm text-gray-600">
          We pledge not to share or use your information for marketing purposes. 
          This is purely an experiment to test our networking assumptions.
        </p>
      </div>

      <div className="text-xs text-gray-500">
        <p>
          Questions? Contact us at hello@pathfinders.com
        </p>
      </div>

      {/* Hidden Netlify Form for Data Collection */}
      <form
        id="netlify-form"
        name="pathfinders-submission"
        method="POST"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        style={{ display: 'none' }}
      >
        <input type="hidden" name="form-name" value="pathfinders-submission" />
        <input type="hidden" name="bot-field" />
        
        {/* Basic Info */}
        <input type="hidden" name="session-id" value={sessionId} />
        <input type="hidden" name="postal-code" value={formData.postalCode || ''} />
        <input type="hidden" name="name" value={formData.name || ''} />
        <input type="hidden" name="email" value={formData.email || ''} />
        
        {/* Device Info */}
        <input type="hidden" name="device-info" value={JSON.stringify(deviceInfo)} />
        <input type="hidden" name="submitted-at" value={new Date().toISOString()} />
        
        {/* Questionnaire Answers */}
        <input type="hidden" name="industry" value={formData.industry || ''} />
        <input type="hidden" name="education-level" value={formData.educationLevel || ''} />
        <input type="hidden" name="job-function-level" value={formData.jobFunctionLevel || ''} />
        <input type="hidden" name="company-size" value={formData.companySize || ''} />
        <input type="hidden" name="primary-goal" value={JSON.stringify(formData.primaryGoal || [])} />
        <input type="hidden" name="connection-types" value={JSON.stringify(formData.connectionTypes || [])} />
        <input type="hidden" name="work-environment" value={JSON.stringify(formData.workEnvironment || [])} />
        <input type="hidden" name="collaboration-preferences" value={JSON.stringify(formData.collaborationPreferences || [])} />
        <input type="hidden" name="networking-window" value={JSON.stringify(formData.networkingWindow || [])} />
        <input type="hidden" name="day-of-week" value={JSON.stringify(formData.dayOfWeek || [])} />
        <input type="hidden" name="experience" value={formData.experience || ''} />
        <input type="hidden" name="communication" value={formData.communication || ''} />
        <input type="hidden" name="interests" value={JSON.stringify(formData.interests || [])} />
        <input type="hidden" name="challenges" value={JSON.stringify(formData.challenges || [])} />
        <input type="hidden" name="additional-info" value={formData.additionalInfo || ''} />
      </form>
    </div>
  )
}
