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
    // Your Google Apps Script web app URL
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx6TTUlhdbp7Tn6MzUv4vc272tNgntGcSHuNWbvT03Li870hIB4chagWqxiUEDNLhkQ/exec'
    
    // Convert arrays to strings for Google Sheets
    const formattedData = {
      ...data,
      primaryGoal: Array.isArray(data.primaryGoal) ? data.primaryGoal.join('; ') : data.primaryGoal,
      connectionTypes: Array.isArray(data.connectionTypes) ? data.connectionTypes.join('; ') : data.connectionTypes,
      workEnvironment: Array.isArray(data.workEnvironment) ? data.workEnvironment.join('; ') : data.workEnvironment,
      collaborationPreferences: Array.isArray(data.collaborationPreferences) ? data.collaborationPreferences.join('; ') : data.collaborationPreferences,
      networkingWindow: Array.isArray(data.networkingWindow) ? data.networkingWindow.join('; ') : data.networkingWindow,
      dayOfWeek: Array.isArray(data.dayOfWeek) ? data.dayOfWeek.join('; ') : data.dayOfWeek,
      interests: Array.isArray(data.interests) ? data.interests.join('; ') : data.interests,
      challenges: Array.isArray(data.challenges) ? data.challenges.join('; ') : data.challenges,
      deviceInfo: JSON.stringify(data.deviceInfo || {})
    }
    
    console.log('Submitting to Google Sheets:', formattedData)
    
    // Use form data instead of JSON for better compatibility
    const formData = new FormData()
    Object.entries(formattedData).forEach(([key, value]) => {
      formData.append(key, String(value))
    })
    
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors', // Required for Google Apps Script
      body: formData
    })
    
    console.log('Google Sheets submission completed')
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
