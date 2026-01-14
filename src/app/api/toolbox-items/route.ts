import { NextResponse } from 'next/server';
import { getToolboxItems } from '@/lib/database-service';

export async function GET() {
  try {
    const items = await getToolboxItems();
    return NextResponse.json(items);
  } catch (error) {
    console.error('Toolbox Items API Error:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch toolbox items',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}