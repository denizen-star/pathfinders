import { NextRequest, NextResponse } from 'next/server'
import { writeFileSync, existsSync, readFileSync } from 'fs'
import { join } from 'path'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    // Add timestamp and session tracking
    const step3Data = {
      ...data,
      step: 3,
      submittedAt: new Date().toISOString(),
      ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    }

    // Create step3 directory if it doesn't exist
    const step3Dir = join(process.cwd(), 'data-collection', 'step3')
    if (!existsSync(step3Dir)) {
      require('fs').mkdirSync(step3Dir, { recursive: true })
    }

    // Save individual submission
    const filename = `step3-${step3Data.sessionId}-${Date.now()}.json`
    const filepath = join(step3Dir, filename)
    writeFileSync(filepath, JSON.stringify(step3Data, null, 2))

    // Update master step3 file
    const masterFile = join(step3Dir, 'all-step3-submissions.json')
    let allSubmissions = []
    
    if (existsSync(masterFile)) {
      const existingData = readFileSync(masterFile, 'utf8')
      allSubmissions = JSON.parse(existingData)
    }
    
    allSubmissions.push(step3Data)
    writeFileSync(masterFile, JSON.stringify(allSubmissions, null, 2))

    // Also save to the original submissions folder for backward compatibility
    const submissionsDir = join(process.cwd(), 'submissions')
    if (!existsSync(submissionsDir)) {
      require('fs').mkdirSync(submissionsDir, { recursive: true })
    }

    const finalSubmission = {
      ...step3Data,
      id: step3Data.sessionId
    }

    const finalFilename = `submission-${finalSubmission.id}-${Date.now()}.json`
    const finalFilepath = join(submissionsDir, finalFilename)
    writeFileSync(finalFilepath, JSON.stringify(finalSubmission, null, 2))

    // Update master submissions file
    const finalMasterFile = join(submissionsDir, 'all-submissions.json')
    let finalSubmissions = []
    
    if (existsSync(finalMasterFile)) {
      const existingData = readFileSync(finalMasterFile, 'utf8')
      finalSubmissions = JSON.parse(existingData)
    }
    
    finalSubmissions.push(finalSubmission)
    writeFileSync(finalMasterFile, JSON.stringify(finalSubmissions, null, 2))

    return NextResponse.json({ 
      success: true, 
      message: 'Step 3 data submitted successfully',
      id: finalSubmission.id,
      sessionId: step3Data.sessionId
    })
  } catch (error) {
    console.error('Error saving step 3 submission:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to save step 3 submission' 
    }, { status: 500 })
  }
}

export async function GET() {
  try {
    const masterFile = join(process.cwd(), 'submissions', 'all-submissions.json')
    
    if (!existsSync(masterFile)) {
      return NextResponse.json({ submissions: [] })
    }
    
    const data = readFileSync(masterFile, 'utf8')
    const submissions = JSON.parse(data)
    
    return NextResponse.json({ submissions })
  } catch (error) {
    console.error('Error reading submissions:', error)
    return NextResponse.json({ 
      error: 'Failed to read submissions' 
    }, { status: 500 })
  }
}
