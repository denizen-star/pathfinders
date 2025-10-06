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

    // Create step2 directory if it doesn't exist
    const step2Dir = join(process.cwd(), 'data-collection', 'step2')
    if (!existsSync(step2Dir)) {
      require('fs').mkdirSync(step2Dir, { recursive: true })
    }

    // Save individual submission
    const filename = `step2-${step2Data.sessionId}-${Date.now()}.json`
    const filepath = join(step2Dir, filename)
    writeFileSync(filepath, JSON.stringify(step2Data, null, 2))

    // Update master step2 file
    const masterFile = join(step2Dir, 'all-step2-submissions.json')
    let allSubmissions = []
    
    if (existsSync(masterFile)) {
      const existingData = readFileSync(masterFile, 'utf8')
      allSubmissions = JSON.parse(existingData)
    }
    
    allSubmissions.push(step2Data)
    writeFileSync(masterFile, JSON.stringify(allSubmissions, null, 2))

    return NextResponse.json({ 
      success: true, 
      message: 'Step 2 data saved successfully',
      sessionId: step2Data.sessionId
    })
  } catch (error) {
    console.error('Error saving step 2 data:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to save step 2 data' 
    }, { status: 500 })
  }
}
