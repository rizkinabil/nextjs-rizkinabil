import { createNewsletterSubscriber } from '@/lib/database-service';
import { NextRequest, NextResponse } from 'next/server';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: 'Valid email address is required' }, { status: 400 });
    }

    const { alreadySubscribed } = await createNewsletterSubscriber(email.toLowerCase().trim());

    if (alreadySubscribed) {
      return NextResponse.json({ message: 'You are already subscribed!' }, { status: 409 });
    }

    return NextResponse.json({ message: 'Successfully subscribed!' }, { status: 201 });
  } catch (error) {
    console.error('Newsletter API Error:', error);
    return NextResponse.json(
      {
        error: 'Failed to subscribe',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
