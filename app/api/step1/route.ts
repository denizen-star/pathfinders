import { NextRequest, NextResponse } from 'next/server'
import { writeFileSync, existsSync, readFileSync } from 'fs'
import { join } from 'path'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    // Add timestamp and session tracking
    const step1Data = {
      ...data,
      step: 1,
      submittedAt: new Date().toISOString(),
      ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    }

    // For Netlify deployment, we'll just log the data instead of writing to files
    // In a production environment, you'd want to use a database or external storage
    console.log('Step 1 Data Received:', JSON.stringify(step1Data, null, 2))

    // TODO: In production, save to database (e.g., Supabase, MongoDB, etc.)
    // For now, we'll simulate successful save
    
    return NextResponse.json({ 
      success: true, 
      message: 'Step 1 data received successfully',
      sessionId: step1Data.sessionId
    })
  } catch (error) {
    console.error('Error processing step 1 data:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to process step 1 data' 
    }, { status: 500 })
  }
}
