import { NextResponse } from 'next/server';
import { getHighlights } from '@/lib/database-service';

export async function GET() {
  try {
    const highlights = await getHighlights();
    return NextResponse.json(highlights);
  } catch (error) {
    console.error('Highlights API Error:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch highlights',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}