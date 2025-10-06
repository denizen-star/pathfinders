import { NextRequest, NextResponse } from 'next/server'
import { writeFileSync, existsSync, readFileSync } from 'fs'
import { join } from 'path'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    // Add timestamp and session tracking
    const step2Data = {
      ...data,
      step: 2,
      submittedAt: new Date().toISOString(),
      ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    }

    // For Netlify deployment, we'll just log the data instead of writing to files
    console.log('Step 2 Data Received:', JSON.stringify(step2Data, null, 2))

    // TODO: In production, save to database
    
    return NextResponse.json({ 
      success: true, 
      message: 'Step 2 data received successfully',
      sessionId: step2Data.sessionId
    })
  } catch (error) {
    console.error('Error processing step 2 data:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to process step 2 data' 
    }, { status: 500 })
  }
}
