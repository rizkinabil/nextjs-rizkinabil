'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, Loader2, X } from 'lucide-react';
import { useState } from 'react';

interface Props {
  onClose: () => void;
}

type State = 'idle' | 'submitting' | 'success' | 'error';

export function GuestBookForm({ onClose }: Props) {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [company, setCompany] = useState('');
  const [text, setText] = useState('');
  const [email, setEmail] = useState('');
  const [state, setState] = useState<State>('idle');

  const MAX = 500;
  const remaining = MAX - text.length;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;
    setState('submitting');
    try {
      const res = await fetch('/api/guestbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, position, company, text, email }),
      });
      if (!res.ok) throw new Error();
      setState('success');
    } catch {
      setState('error');
    }
  }

  const inputCls =
    'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/25 outline-none focus:border-emerald-400/50 focus:bg-white/[0.07] transition-all';

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Panel */}
        <motion.div
          className="relative w-full max-w-md bg-gray-950 border border-white/10 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden"
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.97 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
            <div>
              <h2 className="text-base font-semibold text-white">Leave a Message</h2>
              <p className="text-xs text-white/40 mt-0.5">Your feedback will appear after review</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="text-white/30 hover:text-white/60 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Success state */}
          {state === 'success' ? (
            <motion.div
              className="flex flex-col items-center gap-3 px-6 py-12 text-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="w-12 h-12 rounded-full bg-emerald-400/10 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-emerald-400" />
              </div>
              <p className="text-white font-medium">Thanks for your message!</p>
              <p className="text-sm text-white/40">It&apos;ll appear here once reviewed.</p>
              <button
                onClick={onClose}
                className="mt-2 text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                Close
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className="block text-xs text-white/40 mb-1.5 font-medium uppercase tracking-wider">
                    Name <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className={inputCls}
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/40 mb-1.5 font-medium uppercase tracking-wider">
                    Role / Title
                  </label>
                  <input
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    placeholder="e.g. Product Manager"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/40 mb-1.5 font-medium uppercase tracking-wider">
                    Company
                  </label>
                  <input
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Acme Corp"
                    className={inputCls}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs text-white/40 font-medium uppercase tracking-wider">
                    Message <span className="text-emerald-400">*</span>
                  </label>
                  <span className={`text-xs ${remaining < 50 ? 'text-amber-400' : 'text-white/20'}`}>
                    {remaining} left
                  </span>
                </div>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value.slice(0, MAX))}
                  placeholder="Share your experience working with me..."
                  rows={4}
                  className={`${inputCls} resize-none`}
                  required
                />
              </div>

              <div>
                <label className="block text-xs text-white/40 mb-1.5 font-medium uppercase tracking-wider">
                  Email <span className="text-white/20">(optional)</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="For your avatar (never shown publicly)"
                  className={inputCls}
                />
              </div>

              {state === 'error' && (
                <p className="text-xs text-red-400">Something went wrong. Please try again.</p>
              )}

              <div className="flex justify-end gap-3 pt-1">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm text-white/40 hover:text-white/60 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={state === 'submitting' || !name.trim() || !text.trim()}
                  className="flex items-center gap-2 px-5 py-2 text-sm font-medium bg-emerald-500 text-white rounded-xl hover:bg-emerald-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {state === 'submitting' && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  {state === 'submitting' ? 'Sending…' : 'Send Message'}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
