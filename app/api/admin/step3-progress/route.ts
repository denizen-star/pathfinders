import { NextResponse } from 'next/server'
import { readFileSync, existsSync } from 'fs'
import { join } from 'path'

export async function GET() {
  try {
    const masterFile = join(process.cwd(), 'data-collection', 'step3-progress', 'all-step3-progress.json')
    
    if (!existsSync(masterFile)) {
      return NextResponse.json({ data: [] })
    }
    
    const data = readFileSync(masterFile, 'utf8')
    const progress = JSON.parse(data)
    
    return NextResponse.json({ data: progress })
  } catch (error) {
    console.error('Error reading step3 progress data:', error)
    return NextResponse.json({ 
      error: 'Failed to read step3 progress data' 
    }, { status: 500 })
  }
}
