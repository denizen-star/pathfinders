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
    // Scroll to top when component loads
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  // Determine what content to show based on user's progress
  const getNextStepsContent = () => {
    const hasFSA = formData.postalCode && formData.postalCode.trim() !== ''
    const hasName = formData.name && formData.name.trim() !== ''
    const hasEmail = formData.email && formData.email.trim() !== ''
    const hasStep3Data = formData.industry || formData.primaryGoal?.length || formData.interests?.length

    // Case 1: Step 3 complete (highest priority - if they reached finish button)
    // This means they completed the full form and should see the original content
    if (hasStep3Data) {
      return {
        title: "Buckle up! Here's your networking adventure roadmap! 🚀",
        items: [
          "🎯 We'll play matchmaker with your responses",
          "📧 Your networking crystal ball arrives next week (with voting powers!)",
          "☎️ If you're chosen, we'll call to book your 15-minute networking magic!",
          "🏆 Only 20 lucky winners get VIP access to our first event!"
        ]
      }
    }

    // Case 2: No FSA (they skipped at the very beginning)
    if (!hasFSA) {
      return {
        title: "Aw, shucks! You're leaving us so soon? 😢",
        items: [
          "We're bummed you didn't stick around to see the magic! ✨",
          "Maybe next time you'll join our networking adventure? 🤝"
        ]
      }
    }

    // Case 3: FSA and/or full name (no email address)
    if (!hasEmail && (hasFSA || hasName)) {
      return {
        title: "Nice moves! 🎯 You're getting the inside scoop cehck the boards for:",
        items: [
          "📍 Networking scene",
          "🎪 Cool events happening", 
          "🔮 Community vibes and preferences"
        ]
      }
    }

    // Case 4: Full Name and Email address (but incomplete Step 3)
    if (hasEmail && hasName && !hasStep3Data) {
      return {
        title: "Wait, don't go! 🛑 You were SO close to the finish line! 🏁",
        items: [
          "We'll send you some networking superpowers via email! 💪",
          "Think of it as your personalized networking cheat sheet! 📋"
        ]
      }
    }

    // Default fallback (shouldn't reach here normally)
    return {
      title: "Buckle up! Here's your networking adventure roadmap! 🚀",
      items: [
        "🎯 We'll model your responses for matches",
        "📧 Your networking ideas arrive next week (with voting powers!)",
        "☎️ If you're chosen, we'll email to book your 15-minute networking magic!",
        "🏆 Only 20 lucky winners get VIP access to our first event!"
      ]
    }
  }

  const nextStepsContent = getNextStepsContent()
  return (
    <div className="dark-glassmorphism p-8 md:p-10 text-center">
      {/* Hero Section */}
      <div className="mb-10">
        <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-green-500/30">
          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div className="flex items-center justify-center gap-6 mb-6">
          <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/30">
            <img 
              src="/logo-p.png" 
              alt="Pathfinders Logo" 
              className="w-12 h-12 rounded-lg"
            />
          </div>
          <div className="text-left">
            <h1 className="text-3xl font-bold gradient-text">
              Potential Unlocked
            </h1>
            <p className="text-xl font-medium text-gray-300">
              Thank You for Participating
            </p>
          </div>
        </div>
      </div>

      {/* Review Information Section */}
      <div className="text-left space-y-6 mb-8 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-white">Your Submission Summary</h2>
        </div>
        
        <div className="border-b border-white/10 pb-4">
          <h3 className="font-semibold text-gray-300 mb-2">📍 Location</h3>
          <p className="text-gray-400">{formData.postalCode}</p>
        </div>

        <div className="border-b border-white/10 pb-4">
          <h3 className="font-semibold text-gray-300 mb-2">📞 Contact Information</h3>
          <p className="text-gray-400">{formData.name}</p>
          <p className="text-gray-400">{formData.email}</p>
        </div>

        <div className="border-b border-white/10 pb-4">
          <h3 className="font-semibold text-gray-300 mb-2">💼 Professional Background</h3>
          <p className="text-gray-400">
            <strong className="text-gray-300">Industry:</strong> {formData.industry}
          </p>
          <p className="text-gray-400">
            <strong className="text-gray-300">Education:</strong> {formData.educationLevel}
          </p>
          <p className="text-gray-400">
            <strong className="text-gray-300">Job Level:</strong> {formData.jobFunctionLevel}
          </p>
          <p className="text-gray-400">
            <strong className="text-gray-300">Company Size:</strong> {formData.companySize}
          </p>
          {formData.experience && (
            <p className="text-gray-400">
              <strong className="text-gray-300">Experience:</strong> {formData.experience}
            </p>
          )}
          {formData.communication && (
            <p className="text-gray-400">
              <strong className="text-gray-300">Communication Style:</strong> {formData.communication}
            </p>
          )}
        </div>

        <div className="border-b border-white/10 pb-4">
          <h3 className="font-semibold text-gray-300 mb-2">🎯 Networking Goals</h3>
          {formData.primaryGoal && (
            <p className="text-gray-400">
              <strong className="text-gray-300">Primary Goal:</strong> {Array.isArray(formData.primaryGoal) ? formData.primaryGoal.join(', ') : formData.primaryGoal}
            </p>
          )}
          {formData.connectionTypes && (
            <p className="text-gray-400">
              <strong className="text-gray-300">Connection Types:</strong> {Array.isArray(formData.connectionTypes) ? formData.connectionTypes.join(', ') : formData.connectionTypes}
            </p>
          )}
        </div>

        <div className="border-b border-white/10 pb-4">
          <h3 className="font-semibold text-gray-300 mb-2">⚙️ Preferences</h3>
          {formData.workEnvironment && (
            <p className="text-gray-400">
              <strong className="text-gray-300">Work Environment:</strong> {Array.isArray(formData.workEnvironment) ? formData.workEnvironment.join(', ') : formData.workEnvironment}
            </p>
          )}
          {formData.collaborationPreferences && (
            <p className="text-gray-400">
              <strong className="text-gray-300">Collaboration Style:</strong> {Array.isArray(formData.collaborationPreferences) ? formData.collaborationPreferences.join(', ') : formData.collaborationPreferences}
            </p>
          )}
          {formData.networkingWindow && (
            <p className="text-gray-400">
              <strong className="text-gray-300">Best Time:</strong> {Array.isArray(formData.networkingWindow) ? formData.networkingWindow.join(', ') : formData.networkingWindow}
            </p>
          )}
          {formData.dayOfWeek && (
            <p className="text-gray-400">
              <strong className="text-gray-300">Best Days:</strong> {Array.isArray(formData.dayOfWeek) ? formData.dayOfWeek.join(', ') : formData.dayOfWeek}
            </p>
          )}
        </div>

        {Array.isArray(formData.interests) && formData.interests.length > 0 && (
          <div className="border-b border-white/10 pb-4">
            <h3 className="font-semibold text-gray-300 mb-2">💡 Professional Interests</h3>
            <p className="text-gray-400">
              <strong className="text-gray-300">Main Interests:</strong> {formData.interests.join(', ')}
            </p>
          </div>
        )}

        {Array.isArray(formData.challenges) && formData.challenges.length > 0 && (
          <div className="border-b border-white/10 pb-4">
            <h3 className="font-semibold text-gray-300 mb-2">🚧 Professional Challenges</h3>
            <p className="text-gray-400">
              <strong className="text-gray-300">Current Challenges:</strong> {formData.challenges.join(', ')}
            </p>
          </div>
        )}

        {formData.additionalInfo && (
          <div>
            <h3 className="font-semibold text-gray-300 mb-2">📝 Additional Information</h3>
            <p className="text-gray-400">{formData.additionalInfo}</p>
          </div>
        )}
      </div>

      <div className="bg-gradient-to-r from-cyan-500/10 to-blue-600/10 border border-cyan-500/30 rounded-2xl p-6 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold gradient-text">
            {nextStepsContent.title}
          </h2>
        </div>
        <div className="text-gray-300 space-y-3">
          {nextStepsContent.items.map((item, index) => (
            <p key={index} className="flex items-start gap-3">
              <span className="text-cyan-400 mt-1">•</span>
              <span>{item}</span>
            </p>
          ))}
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white">
            Your Privacy Promise
          </h3>
        </div>
        <p className="text-gray-400 leading-relaxed">
          We pledge not to share or use your information for marketing purposes. 
          This is purely an experiment to test our networking assumptions.
        </p>
      </div>

      <div className="text-center">
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
          <p className="text-sm text-gray-400">
            Questions? Contact us at <span className="text-cyan-400 font-medium">hello@pathfinders.com</span>
          </p>
        </div>
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
