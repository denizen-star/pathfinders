import { NextRequest, NextResponse } from 'next/server'
import { writeFileSync, existsSync, readFileSync } from 'fs'
import { join } from 'path'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    // Add timestamp and session tracking
    const step3ProgressData = {
      ...data,
      step: 3,
      progressType: 'question-progress',
      submittedAt: new Date().toISOString(),
      ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    }

    // Create step3-progress directory if it doesn't exist
    const step3ProgressDir = join(process.cwd(), 'data-collection', 'step3-progress')
    if (!existsSync(step3ProgressDir)) {
      require('fs').mkdirSync(step3ProgressDir, { recursive: true })
    }

    // Save individual progress entry
    const filename = `step3-progress-${step3ProgressData.sessionId}-q${step3ProgressData.questionNumber}-${Date.now()}.json`
    const filepath = join(step3ProgressDir, filename)
    writeFileSync(filepath, JSON.stringify(step3ProgressData, null, 2))

    // Update master step3-progress file (organized by session)
    const sessionFile = join(step3ProgressDir, `session-${step3ProgressData.sessionId}.json`)
    let sessionData = []
    
    if (existsSync(sessionFile)) {
      const existingData = readFileSync(sessionFile, 'utf8')
      sessionData = JSON.parse(existingData)
    }
    
    // Update or add this question's progress
    const existingQuestionIndex = sessionData.findIndex((item: any) => item.questionNumber === step3ProgressData.questionNumber)
    if (existingQuestionIndex >= 0) {
      sessionData[existingQuestionIndex] = step3ProgressData
    } else {
      sessionData.push(step3ProgressData)
    }
    
    // Sort by question number
    sessionData.sort((a: any, b: any) => a.questionNumber - b.questionNumber)
    
    writeFileSync(sessionFile, JSON.stringify(sessionData, null, 2))

    // Also update the master progress file
    const masterFile = join(step3ProgressDir, 'all-step3-progress.json')
    let allProgress = []
    
    if (existsSync(masterFile)) {
      const existingData = readFileSync(masterFile, 'utf8')
      allProgress = JSON.parse(existingData)
    }
    
    allProgress.push(step3ProgressData)
    writeFileSync(masterFile, JSON.stringify(allProgress, null, 2))

    return NextResponse.json({ 
      success: true, 
      message: 'Step 3 progress saved successfully'
    })
  } catch (error) {
    console.error('Error saving step 3 progress:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to save step 3 progress' 
    }, { status: 500 })
  }
}
