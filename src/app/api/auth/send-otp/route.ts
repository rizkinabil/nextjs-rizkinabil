import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { email } = await request.json();

  if (!email || typeof email !== 'string') {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  // Validate against admin whitelist before calling Supabase
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
  if (!ADMIN_EMAIL || email.toLowerCase().trim() !== ADMIN_EMAIL.toLowerCase()) {
    // Generic message — don't reveal which emails are valid
    return NextResponse.json({ error: 'This email is not authorized.' }, { status: 403 });
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { shouldCreateUser: false },
  });

  if (error) {
    console.error('OTP send error:', error.message);
    return NextResponse.json({ error: 'Failed to send code. Try again.' }, { status: 500 });
  }

  return NextResponse.json({ message: 'Code sent' }, { status: 200 });
}
