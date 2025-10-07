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

export const submitToGoogleSheets = async (data: SubmissionData, stepType: 'Step1' | 'Step2' | 'Step3' = 'Step3', action: string = ''): Promise<boolean> => {
  try {
    // Prepare data for submission
    const submissionData = {
      stepType,
      action,
      ...data
    }
    
    console.log(`Submitting ${stepType} data to Google Sheets via secure API`)
    
    // Use the secure API route instead of calling Google Apps Script directly
    const response = await fetch('/api/google-sheets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submissionData)
    })
    
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`)
    }
    
    const result = await response.json()
    
    if (result.success) {
      console.log(`Google Sheets ${stepType} submission completed successfully`)
      return true
    } else {
      console.error(`Google Sheets submission failed:`, result.error)
      return false
    }
  } catch (error) {
    console.error(`Error submitting ${stepType} data to Google Sheets:`, error)
    return false
  }
}

// Fallback: Store in localStorage as backup
export const storeSubmissionLocally = (data: SubmissionData): void => {
  try {
    const submissions = JSON.parse(localStorage.getItem('pathfinders-submissions') || '[]')
    submissions.push(data)
    localStorage.setItem('pathfinders-submissions', JSON.stringify(submissions))
  } catch (error) {
    console.error('Error storing submission locally:', error)
  }
}
