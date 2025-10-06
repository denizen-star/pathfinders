import { NextResponse } from 'next/server'
import { readFileSync, existsSync } from 'fs'
import { join } from 'path'

export async function GET() {
  try {
    const masterFile = join(process.cwd(), 'data-collection', 'step2', 'all-step2-submissions.json')
    
    if (!existsSync(masterFile)) {
      return NextResponse.json({ data: [] })
    }
    
    const data = readFileSync(masterFile, 'utf8')
    const submissions = JSON.parse(data)
    
    return NextResponse.json({ data: submissions })
  } catch (error) {
    console.error('Error reading step2 data:', error)
    return NextResponse.json({ 
      error: 'Failed to read step2 data' 
    }, { status: 500 })
  }
}
