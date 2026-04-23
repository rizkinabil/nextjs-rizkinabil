'use client';

import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const otpRef = useRef<HTMLInputElement>(null);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    const res = await fetch('/api/auth/send-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    if (!res.ok) {
      const data = await res.json();
      setErrorMsg(data.error || 'Failed to send code. Try again.');
      setStatus('error');
    } else {
      setStep('otp');
      setStatus('idle');
      setTimeout(() => otpRef.current?.focus(), 50);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    const supabase = createClient();
    const { error } = await supabase.auth.verifyOtp({
      email,
      token: otp.trim(),
      type: 'email',
    });

    if (error) {
      setErrorMsg('Invalid or expired code. Try again.');
      setStatus('error');
      setOtp('');
      setTimeout(() => otpRef.current?.focus(), 50);
    } else {
      router.push('/admin');
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold font-serif text-white">Admin Access</h1>
          <p className="mt-2 text-sm text-white/50">
            {step === 'email'
              ? 'Enter your email to receive a one-time code'
              : `Enter the 6-digit code sent to ${email}`}
          </p>
        </div>

        {step === 'email' ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-1.5">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                autoComplete="email"
                className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder:text-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400/50 transition-colors"
              />
            </div>

            {status === 'error' && (
              <p className="text-xs text-red-400" role="alert">{errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-500/50 disabled:cursor-not-allowed text-white rounded-lg text-sm font-semibold transition-colors"
            >
              {status === 'loading' ? 'Sending...' : 'Send code'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-white/70 mb-1.5">
                One-time code
              </label>
              <input
                id="otp"
                ref={otpRef}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                placeholder="123456"
                required
                autoComplete="one-time-code"
                className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder:text-white/30 text-sm tracking-[0.5em] text-center focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400/50 transition-colors"
              />
            </div>

            {status === 'error' && (
              <p className="text-xs text-red-400" role="alert">{errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={status === 'loading' || otp.length < 6}
              className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-500/50 disabled:cursor-not-allowed text-white rounded-lg text-sm font-semibold transition-colors"
            >
              {status === 'loading' ? 'Verifying...' : 'Verify code'}
            </button>

            <button
              type="button"
              onClick={() => { setStep('email'); setOtp(''); setStatus('idle'); setErrorMsg(''); }}
              className="w-full text-sm text-white/40 hover:text-white/70 transition-colors"
            >
              ← Use a different email
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
