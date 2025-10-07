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
      {/* Step indicator with icons */}
      <div className="flex justify-between items-center mb-4">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
          <div key={step} className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
              step <= currentStep 
                ? 'bg-gradient-primary text-white shadow-brand' 
                : 'bg-neutral-200 text-neutral-500'
            }`}>
              {step < currentStep ? '✓' : getStepIcon(step)}
            </div>
            <span className={`text-xs mt-1 font-medium ${
              step <= currentStep ? 'text-primary-600' : 'text-neutral-400'
            }`}>
              {getStepLabel(step)}
            </span>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold text-primary-600">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-sm text-neutral-600">
          {Math.round(progressPercentage)}% Complete
        </span>
      </div>
      <div className="w-full bg-neutral-200 rounded-full h-3 shadow-soft">
        <div
          className="bg-gradient-primary h-3 rounded-full transition-all duration-500 ease-out shadow-soft"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    </div>
  )
}
