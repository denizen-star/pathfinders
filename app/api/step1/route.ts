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

    // Create step1 directory if it doesn't exist
    const step1Dir = join(process.cwd(), 'data-collection', 'step1')
    if (!existsSync(step1Dir)) {
      require('fs').mkdirSync(step1Dir, { recursive: true })
    }

    // Save individual submission
    const filename = `step1-${step1Data.sessionId}-${Date.now()}.json`
    const filepath = join(step1Dir, filename)
    writeFileSync(filepath, JSON.stringify(step1Data, null, 2))

    // Update master step1 file
    const masterFile = join(step1Dir, 'all-step1-submissions.json')
    let allSubmissions = []
    
    if (existsSync(masterFile)) {
      const existingData = readFileSync(masterFile, 'utf8')
      allSubmissions = JSON.parse(existingData)
    }
    
    allSubmissions.push(step1Data)
    writeFileSync(masterFile, JSON.stringify(allSubmissions, null, 2))

    return NextResponse.json({ 
      success: true, 
      message: 'Step 1 data saved successfully',
      sessionId: step1Data.sessionId
    })
  } catch (error) {
    console.error('Error saving step 1 data:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to save step 1 data' 
    }, { status: 500 })
  }
}
