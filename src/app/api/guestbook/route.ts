import { createHash } from 'crypto';
import { supabaseAdmin } from '@/config/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { name, position, company, text, email } = await request.json();

    if (!name?.trim() || !text?.trim()) {
      return NextResponse.json({ error: 'Name and message are required' }, { status: 400 });
    }
    if (text.trim().length > 500) {
      return NextResponse.json({ error: 'Message must be 500 characters or less' }, { status: 400 });
    }

    const normalizedEmail = email?.trim().toLowerCase() || '';
    const hash = createHash('md5').update(normalizedEmail).digest('hex');
    const avatar = normalizedEmail
      ? `https://www.gravatar.com/avatar/${hash}?d=identicon&s=80`
      : `https://www.gravatar.com/avatar/${hash}?d=identicon&f=y&s=80`;

    const displayPosition = position?.trim()
      ? company?.trim()
        ? `${position.trim()} at ${company.trim()}`
        : position.trim()
      : company?.trim() || 'Guest';

    const { error } = await supabaseAdmin.from('testimonials').insert({
      name: name.trim(),
      position: displayPosition,
      avatar,
      text: text.trim(),
      type: 'guestbook',
      status: 'pending',
      is_active: true,
      email: normalizedEmail || null,
    });

    if (error) throw error;

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('Guestbook POST error:', error);
    return NextResponse.json({ error: 'Failed to submit' }, { status: 500 });
  }
}
