import { NextRequest, NextResponse } from 'next/server'

// Obfuscated environment variable reference
const EXTERNAL_API_URL = process.env.GOOGLE_APPS_SCRIPT_URL

export async function POST(request: NextRequest) {
  try {
    // Determine which external API URL to use
    let apiUrl: string
    
    if (!EXTERNAL_API_URL) {
      // Silent fallback - no console logs that reveal Google integration
      apiUrl = 'https://script.google.com/macros/s/AKfycbxP8H-qh4r4uEN5Ea2xBXa__YjXFlJ30h7F4_kebDna3HEMlbz_WqG8H8pWBRhp2rSx/exec'
    } else {
      apiUrl = EXTERNAL_API_URL
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

    // Make the request to external API
    const response = await fetch(apiUrl, {
      method: 'POST',
      body: formData
    })

    if (!response.ok) {
      throw new Error(`External API responded with status: ${response.status}`)
    }

    // Try to get the response text
    let responseData
    try {
      responseData = await response.json()
    } catch {
      // If response is not JSON, assume success
      responseData = { success: true }
    }

    // Generic success logging - no mention of Google Sheets
    console.log(`Data processing completed for session: ${submissionData.sessionId}`)
    
    return NextResponse.json({ 
      success: true, 
      message: `${submissionData.stepType} data processed successfully`,
      sessionId: submissionData.sessionId,
      response: responseData
    })

  } catch (error) {
    console.error('Error processing data submission:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to process data submission' 
    }, { status: 500 })
  }
}

// Optional: Add a GET endpoint for health checks
export async function GET() {
  const hasEnvVar = !!EXTERNAL_API_URL
  
  return NextResponse.json({ 
    status: 'Data submission API endpoint is running',
    configured: hasEnvVar,
    message: hasEnvVar ? 'Using environment configuration' : 'Using development configuration'
  })
}
