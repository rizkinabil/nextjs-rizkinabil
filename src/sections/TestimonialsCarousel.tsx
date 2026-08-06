'use client';

import { GuestBookForm } from '@/components/GuestBookForm';
import { Testimonial } from '@/types/frontend.types';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, MessageSquarePlus, PenLine } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

// ─── Crosshatch grid — visible presence, masked to corner ─────────────────────

function GridLines() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 rounded-2xl overflow-hidden"
      style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
        `,
        backgroundSize: '28px 28px',
        WebkitMaskImage: 'radial-gradient(ellipse 85% 75% at 100% 0%, black 10%, transparent 68%)',
        maskImage: 'radial-gradient(ellipse 85% 75% at 100% 0%, black 10%, transparent 68%)',
      }}
    />
  );
}

// ─── Shared nav arrows ─────────────────────────────────────────────────────────

function NavArrows({
  idx,
  total,
  onPrev,
  onNext,
}: {
  idx: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div className="flex items-center gap-0.5">
      <button
        onClick={onPrev}
        disabled={idx === 0}
        aria-label="Previous"
        className="p-1 rounded-md text-white/20 hover:text-white/55 hover:bg-white/5 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
      >
        <ArrowLeft className="w-3 h-3" />
      </button>
      <button
        onClick={onNext}
        disabled={idx === total - 1}
        aria-label="Next"
        className="p-1 rounded-md text-white/20 hover:text-white/55 hover:bg-white/5 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
      >
        <ArrowRight className="w-3 h-3" />
      </button>
    </div>
  );
}

// ─── Featured LinkedIn card ────────────────────────────────────────────────────

function LinkedInFeaturedCard({ entries, linkedinUrl }: { entries: Testimonial[]; linkedinUrl: string }) {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(0);

  const total = entries.length;
  const current = entries[idx] ?? null;

  function go(delta: number) {
    const next = idx + delta;
    if (next < 0 || next >= total) return;
    setDir(delta);
    setIdx(next);
  }

  // Auto-advance every 8 s, resets when idx changes (manual or auto)
  useEffect(() => {
    if (total <= 1) return;
    const id = setInterval(() => {
      setDir(1);
      setIdx((prev) => (prev + 1) % total);
    }, 8000);
    return () => clearInterval(id);
  }, [idx, total]);

  if (!current) {
    return (
      <div className="h-full flex flex-col items-center justify-center gap-3 p-6 rounded-2xl bg-[#0d0d0d] border border-white/[0.07] min-h-[240px]">
        <LinkedInIcon className="w-6 h-6 text-white/10" />
        <p className="text-xs text-white/20">No recommendations yet</p>
        <a
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] font-medium text-[#0A66C2]/60 hover:text-[#0A66C2] transition-colors"
        >
          Be the first to recommend →
        </a>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col p-5 rounded-2xl bg-[#0d0d0d] border border-white/[0.07] overflow-hidden h-full min-h-[240px]">
      <GridLines />

      {/* Decorative open-quote — large, LinkedIn blue, partially clipped */}
      <div
        aria-hidden
        className="absolute -top-6 -right-2 select-none pointer-events-none"
        style={{
          fontSize: '170px',
          fontFamily: '"Georgia", "Times New Roman", serif',
          fontStyle: 'italic',
          lineHeight: 1,
          color: 'rgba(10, 102, 194, 0.15)',
        }}
      >
        &#x275D;
      </div>

      {/* Header */}
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-1.5">
          <LinkedInIcon className="w-3 h-3 text-[#0A66C2]" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/30">
            LinkedIn Recommendation
          </span>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[10px] font-medium text-white/20 hover:text-[#0A66C2] transition-colors"
          >
            <LinkedInIcon className="w-2.5 h-2.5" />
            Recommend me
          </a>
          {total > 1 && <NavArrows idx={idx} total={total} onPrev={() => go(-1)} onNext={() => go(1)} />}
        </div>
      </div>

      {/* Quote + Author */}
      <AnimatePresence mode="wait" initial={false} custom={dir}>
        <motion.div
          key={idx}
          custom={dir}
          initial={{ opacity: 0, x: dir * 14 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: dir * -14 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="flex flex-col flex-1 relative z-10 mt-5"
        >
          <p className="flex-1 text-[13.5px] leading-[1.85] text-white/60 font-light">{current.text}</p>

          <div className="flex items-center gap-2.5 mt-5 pt-4 border-t border-white/[0.06]">
            <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 ring-1 ring-white/10 bg-white/5">
              <Image
                src={current.avatar}
                alt={current.name}
                width={32}
                height={32}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white leading-tight">{current.name}</p>
              <p className="text-[11px] text-white/30 mt-0.5 truncate">{current.position}</p>
            </div>
            {total > 1 && (
              <span className="text-[10px] text-white/15 shrink-0 tabular-nums">
                {idx + 1}/{total}
              </span>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ─── Avatar cluster card ──────────────────────────────────────────────────────

function AvatarClusterCard({ entries, total }: { entries: Testimonial[]; total: number }) {
  const shown = entries.slice(0, 7);

  return (
    <div className="relative flex flex-col justify-between p-4 rounded-2xl bg-[#0d0d0d] border border-white/[0.07] overflow-hidden">
      <GridLines />

      <div className="flex items-end pt-1 pb-3 relative z-10">
        {shown.map((entry, i) => (
          <motion.div
            key={entry.id}
            style={{ marginLeft: i === 0 ? 0 : -12, zIndex: shown.length - i }}
            animate={{ y: [0, -5, 0] }}
            transition={{
              duration: 2.5 + i * 0.4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.2,
            }}
          >
            <div className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-[#0d0d0d] bg-white/5">
              <Image
                src={entry.avatar}
                alt={entry.name}
                width={36}
                height={36}
                className="object-cover w-full h-full"
              />
            </div>
          </motion.div>
        ))}
        {entries.length > 7 && (
          <div
            className="w-9 h-9 rounded-full ring-2 ring-[#0d0d0d] bg-white/[0.06] flex items-center justify-center text-[10px] text-white/35 font-medium"
            style={{ marginLeft: -12, zIndex: 0 }}
          >
            +{entries.length - 7}
          </div>
        )}
      </div>

      <div className="relative z-10">
        <p className="text-xl font-bold text-white tabular-nums">{total}</p>
        <p className="text-[10px] text-white/25 mt-0.5 tracking-[0.1em]">People Recommendation</p>
      </div>
    </div>
  );
}

// ─── Guest Book card ──────────────────────────────────────────────────────────

function GuestBookCard({ entries, onOpenForm }: { entries: Testimonial[]; onOpenForm: () => void }) {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(0);

  const total = entries.length;
  const current = entries[idx] ?? null;

  function go(delta: number) {
    const next = idx + delta;
    if (next < 0 || next >= total) return;
    setDir(delta);
    setIdx(next);
  }

  // Auto-advance every 5 s (shorter than LinkedIn — guest book entries are briefer)
  useEffect(() => {
    if (total <= 1) return;
    const id = setInterval(() => {
      setDir(1);
      setIdx((prev) => (prev + 1) % total);
    }, 5000);
    return () => clearInterval(id);
  }, [idx, total]);

  return (
    <div className="relative flex flex-col flex-1 p-4 rounded-2xl bg-[#0d0d0d] border border-white/[0.07] overflow-hidden min-h-[200px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 relative z-10">
        <div className="flex items-center gap-1.5">
          <PenLine className="w-3 h-3 text-emerald-400" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/30">Guest Book</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenForm}
            className="flex items-center gap-1 text-[10px] font-medium text-white/20 hover:text-emerald-400 transition-colors"
          >
            <MessageSquarePlus className="w-2.5 h-2.5" />
            Leave a message
          </button>
          {total > 1 && <NavArrows idx={idx} total={total} onPrev={() => go(-1)} onNext={() => go(1)} />}
        </div>
      </div>

      {current ? (
        <>
          {/* Decorative open-quote — emerald tinted */}
          <div
            aria-hidden
            className="absolute -top-5 -right-1 select-none pointer-events-none"
            style={{
              fontSize: '130px',
              fontFamily: '"Georgia", "Times New Roman", serif',
              fontStyle: 'italic',
              lineHeight: 1,
              color: 'rgba(52, 211, 153, 0.12)',
            }}
          >
            &#x275D;
          </div>

          <AnimatePresence mode="wait" initial={false} custom={dir}>
            <motion.div
              key={idx}
              custom={dir}
              initial={{ opacity: 0, x: dir * 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -12 }}
              transition={{ duration: 0.16, ease: 'easeOut' }}
              className="flex flex-col flex-1 relative z-10"
            >
              <p className="flex-1 text-[13px] leading-[1.8] text-white/50 font-light">{current.text}</p>
              <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/[0.06]">
                <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 ring-1 ring-white/10 bg-white/5">
                  <Image
                    src={current.avatar}
                    alt={current.name}
                    width={28}
                    height={28}
                    className="object-cover w-full h-full"
                    unoptimized={current.type === 'guestbook'}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-white leading-tight">{current.name}</p>
                  <p className="text-[11px] text-white/30 mt-0.5 truncate">{current.position}</p>
                </div>
                {total > 1 && (
                  <span className="text-[10px] text-white/15 shrink-0 tabular-nums">
                    {idx + 1}/{total}
                  </span>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-2.5 relative z-10">
          <motion.div
            animate={{ scale: [1, 1.07, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-8 h-8 rounded-lg bg-emerald-400/10 border border-emerald-400/15 flex items-center justify-center"
          >
            <MessageSquarePlus className="w-4 h-4 text-emerald-400/50" />
          </motion.div>
          <p className="text-xs text-white/20">No messages yet</p>
          <button
            onClick={onOpenForm}
            className="text-[11px] font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            Be the first →
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function TestimonialsCarousel({
  linkedinEntries,
  guestbookEntries,
  linkedinUrl,
}: {
  linkedinEntries: Testimonial[];
  guestbookEntries: Testimonial[];
  linkedinUrl: string;
}) {
  const [showForm, setShowForm] = useState(false);
  const hasLinkedIn = linkedinEntries.length > 0;

  useEffect(() => {
    if (window.location.hash === '#guestbook') {
      setShowForm(true);
    }
  }, []);

  return (
    <motion.div
      className="mt-10 lg:mt-14"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <div className="lg:col-span-2">
          <LinkedInFeaturedCard entries={linkedinEntries} linkedinUrl={linkedinUrl} />
        </div>

        <div id="guestbook" className="flex flex-col gap-3">
          {hasLinkedIn && (
            <AvatarClusterCard
              entries={linkedinEntries}
              total={linkedinEntries.length + guestbookEntries.length}
            />
          )}
          <div className="flex flex-col flex-1">
            <GuestBookCard entries={guestbookEntries} onOpenForm={() => setShowForm(true)} />
          </div>
        </div>
      </div>

      {showForm && <GuestBookForm onClose={() => setShowForm(false)} />}
    </motion.div>
  );
}
