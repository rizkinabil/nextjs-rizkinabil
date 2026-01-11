import { NextRequest, NextResponse } from 'next/server'
import { getProfile, updateProfile } from '@/lib/database-service'

export async function GET() {
  try {
    const profile = await getProfile()
    
    if (!profile) {
      return NextResponse.json(
        { error: 'Profile not found' }, 
        { status: 404 }
      )
    }
    
    return NextResponse.json(profile)
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch profile' }, 
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const profile = await updateProfile(body)
    return NextResponse.json(profile)
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Failed to update profile' }, 
      { status: 500 }
    )
  }
}