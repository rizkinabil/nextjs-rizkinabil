import { NextResponse } from 'next/server'
import { getToolboxItems } from '@/lib/database-service'

export async function GET() {
  try {
    const items = await getToolboxItems()
    return NextResponse.json(items)
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch toolbox items' }, 
      { status: 500 }
    )
  }
}