import { NextResponse } from 'next/server';
import { getExperiences } from '@/lib/database-service';

export async function GET() {
  try {
    const experiences = await getExperiences();
    return NextResponse.json(experiences);
  } catch (error) {
    console.error('Experiences API Error:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch experiences',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}