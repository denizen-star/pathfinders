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
  communication: string
  interests: string[]
  challenges: string[]
  additionalInfo: string
  deviceInfo: any
}

export const submitToGoogleSheets = async (data: SubmissionData): Promise<boolean> => {
  try {
    // This would be your Google Apps Script web app URL
    const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE'
    
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors', // Required for Google Apps Script
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    
    return true // Assume success with no-cors
  } catch (error) {
    console.error('Error submitting to Google Sheets:', error)
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
