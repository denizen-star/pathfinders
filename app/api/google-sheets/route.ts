import { NextRequest, NextResponse } from 'next/server'

// Environment variable for the Google Apps Script URL
const GOOGLE_SCRIPT_URL = process.env.GOOGLE_APPS_SCRIPT_URL

export async function POST(request: NextRequest) {
  try {
    // Determine which Google Apps Script URL to use
    let scriptUrl: string
    
    if (!GOOGLE_SCRIPT_URL) {
      console.error('GOOGLE_APPS_SCRIPT_URL environment variable is not set')
      console.log('Available environment variables:', Object.keys(process.env).filter(key => key.includes('GOOGLE')))
      
      // For development, use the hardcoded URL as fallback
      scriptUrl = 'https://script.google.com/macros/s/AKfycbxP8H-qh4r4uEN5Ea2xBXa__YjXFlJ30h7F4_kebDna3HEMlbz_WqG8H8pWBRhp2rSx/exec'
      console.log('Using fallback Google Apps Script URL for development')
    } else {
      scriptUrl = GOOGLE_SCRIPT_URL
    }

    // Get the request data
    const data = await request.json()
    
    // Basic validation
    if (!data.stepType || !data.sessionId) {
      return NextResponse.json({ 
        success: false, 
        error: 'Missing required fields: stepType and sessionId' 
      }, { status: 400 })
    }

    // Add server-side timestamp and IP tracking
    const submissionData = {
      ...data,
      serverTimestamp: new Date().toISOString(),
      ipAddress: request.headers.get('x-forwarded-for') || 
                 request.headers.get('x-real-ip') || 
                 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown'
    }

    // Convert arrays to strings for Google Sheets compatibility
    const formattedData = {
      ...submissionData,
      primaryGoal: Array.isArray(submissionData.primaryGoal) ? 
        submissionData.primaryGoal.join('; ') : submissionData.primaryGoal,
      connectionTypes: Array.isArray(submissionData.connectionTypes) ? 
        submissionData.connectionTypes.join('; ') : submissionData.connectionTypes,
      workEnvironment: Array.isArray(submissionData.workEnvironment) ? 
        submissionData.workEnvironment.join('; ') : submissionData.workEnvironment,
      collaborationPreferences: Array.isArray(submissionData.collaborationPreferences) ? 
        submissionData.collaborationPreferences.join('; ') : submissionData.collaborationPreferences,
      networkingWindow: Array.isArray(submissionData.networkingWindow) ? 
        submissionData.networkingWindow.join('; ') : submissionData.networkingWindow,
      dayOfWeek: Array.isArray(submissionData.dayOfWeek) ? 
        submissionData.dayOfWeek.join('; ') : submissionData.dayOfWeek,
      interests: Array.isArray(submissionData.interests) ? 
        submissionData.interests.join('; ') : submissionData.interests,
      challenges: Array.isArray(submissionData.challenges) ? 
        submissionData.challenges.join('; ') : submissionData.challenges,
      communication: Array.isArray(submissionData.communication) ? 
        submissionData.communication.join('; ') : submissionData.communication,
      deviceInfo: JSON.stringify(submissionData.deviceInfo || {})
    }

    // Create FormData for Google Apps Script
    const formData = new FormData()
    Object.entries(formattedData).forEach(([key, value]) => {
      formData.append(key, String(value))
    })

    // Make the request to Google Apps Script
    const response = await fetch(scriptUrl, {
      method: 'POST',
      body: formData
    })

    if (!response.ok) {
      throw new Error(`Google Apps Script responded with status: ${response.status}`)
    }

    // Try to get the response text (Google Apps Script returns JSON)
    let responseData
    try {
      responseData = await response.json()
    } catch {
      // If response is not JSON, assume success
      responseData = { success: true }
    }

    console.log(`Google Sheets ${submissionData.stepType} submission completed for session: ${submissionData.sessionId}`)
    
    return NextResponse.json({ 
      success: true, 
      message: `${submissionData.stepType} data submitted successfully`,
      sessionId: submissionData.sessionId,
      googleResponse: responseData
    })

  } catch (error) {
    console.error('Error submitting to Google Sheets:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to submit data to Google Sheets' 
    }, { status: 500 })
  }
}

// Optional: Add a GET endpoint for health checks
export async function GET() {
  const hasEnvVar = !!GOOGLE_SCRIPT_URL
  const fallbackUrl = 'https://script.google.com/macros/s/AKfycbxP8H-qh4r4uEN5Ea2xBXa__YjXFlJ30h7F4_kebDna3HEMlbz_WqG8H8pWBRhp2rSx/exec'
  
  return NextResponse.json({ 
    status: 'Google Sheets API endpoint is running',
    configured: hasEnvVar,
    usingFallback: !hasEnvVar,
    message: hasEnvVar ? 'Using environment variable' : 'Using fallback URL for development'
  })
}
