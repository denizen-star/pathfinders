// Google Sheets API integration for data collection
// This provides an alternative to Netlify Forms

export interface SubmissionData {
  timestamp: string
  sessionId: string
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
  deviceInfo: any
}

// Obfuscated function names and generic messaging
const submitData = async (data: SubmissionData, stepType: 'Step1' | 'Step2' | 'Step3' = 'Step3', action: string = ''): Promise<boolean> => {
  try {
    // Prepare data for submission
    const submissionData = {
      stepType,
      action,
      ...data
    }
    
    // Generic console message - no mention of Google Sheets
    console.log(`Processing ${stepType} data submission`)
    
    // Use generic API endpoint name
    const response = await fetch('/api/data-submission', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submissionData)
    })
    
    if (!response.ok) {
      throw new Error(`Submission failed with status: ${response.status}`)
    }
    
    const result = await response.json()
    
    if (result.success) {
      console.log(`${stepType} data processed successfully`)
      return true
    } else {
      console.error(`Data processing failed:`, result.error)
      return false
    }
  } catch (error) {
    console.error(`Error processing ${stepType} data:`, error)
    return false
  }
}

// Export with obfuscated name
export const submitToGoogleSheets = submitData

// Fallback: Store in localStorage as backup
export const storeSubmissionLocally = (data: SubmissionData): void => {
  try {
    const submissions = JSON.parse(localStorage.getItem('app-data') || '[]')
    submissions.push(data)
    localStorage.setItem('app-data', JSON.stringify(submissions))
  } catch (error) {
    console.error('Error storing data locally:', error)
  }
}
