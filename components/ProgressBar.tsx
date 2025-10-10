interface ProgressBarProps {
  currentStep: number
  totalSteps: number
}

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progressPercentage = (currentStep / totalSteps) * 100

  const getStepIcon = (step: number) => {
    switch (step) {
      case 1: return '🗺️'
      case 2: return '👤'
      case 3: return '📝'
      case 4: return '🎉'
      default: return '📍'
    }
  }

  const getStepLabel = (step: number) => {
    switch (step) {
      case 1: return 'Location'
      case 2: return 'Contact'
      case 3: return 'Profile'
      case 4: return 'Complete'
      default: return 'Step'
    }
  }

  return (
    <div className="mb-8">
      {/* Rainbow gradient divider at top */}
      <div className="rainbow-gradient mb-6"></div>
      
      {/* Step indicator with icons */}
      <div className="flex justify-between items-center mb-4">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
          <div key={step} className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
              step <= currentStep 
                ? 'btn-primary' 
                : 'bg-gray-700 text-gray-400'
            }`}>
              {step < currentStep ? '✓' : getStepIcon(step)}
            </div>
            <span className={`text-xs mt-2 font-medium ${
              step <= currentStep ? 'gradient-text' : 'text-gray-500'
            }`}>
              {getStepLabel(step)}
            </span>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold gradient-text">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-sm text-gray-400">
          {Math.round(progressPercentage)}% Complete
        </span>
      </div>
      <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
        <div
          className="btn-primary h-2 transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    </div>
  )
}
