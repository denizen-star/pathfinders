import { NextResponse } from 'next/server'
import { readFileSync, existsSync } from 'fs'
import { join } from 'path'

// Production safety check - block admin API access in production
if (process.env.NODE_ENV === 'production') {
  throw new Error('Admin API access is not available in production environment')
}

export async function GET() {
  try {
    const masterFile = join(process.cwd(), 'data-collection', 'step1', 'all-step1-submissions.json')
    
    if (!existsSync(masterFile)) {
      return NextResponse.json({ data: [] })
    }
    
    const data = readFileSync(masterFile, 'utf8')
    const submissions = JSON.parse(data)
    
    return NextResponse.json({ data: submissions })
  } catch (error) {
    console.error('Error reading step1 data:', error)
    return NextResponse.json({ 
      error: 'Failed to read step1 data' 
    }, { status: 500 })
  }
}
