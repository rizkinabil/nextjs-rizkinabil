'use client';

import { useUmami } from '@/hooks/useUmami';
import { Profile } from '@/types/frontend.types';
import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import { useState } from 'react';

export const ContactBanner = ({ profile }: { profile: Profile }) => {
  const { track } = useUmami();
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="mt-8 mb-24"
    >
      {/* Outer wrapper is relative + handles hover for both the card and the CV button below */}
      <div
        className="relative"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Gradient card — no overflow-hidden so the CV button isn't clipped at the bottom */}
        <div
          className="rounded-2xl px-8 py-10 md:px-12 md:py-12"
          style={{
            background: 'linear-gradient(to right, #071510, #0a2b1c, #047857, #6ee7b7)',
          }}
        >
          {/* Subtle radial glow on the bright end */}
          <div
            className="absolute right-0 inset-y-0 w-1/2 rounded-r-2xl pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at 80% 50%, rgba(110,231,183,0.15) 0%, transparent 70%)',
            }}
          />

          <div className="relative flex flex-col md:flex-row md:items-center gap-8">
            {/* Left: heading + subtitle */}
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-bold text-white font-serif leading-snug">
                Let&apos;s Connect and Create Something Amazing!
              </h2>
              <p className="text-white/55 text-sm mt-2">
                Reach out to me for collaborations, inquiries, or just to say hello.
              </p>
            </div>

            {/* Right: contact button (always visible) + CV button (reveals on hover) */}
            <div className="shrink-0 relative self-start md:self-auto">
              {/* Layer 1 — Contact me, always on top */}
              <motion.a
                href={`mailto:${profile.email}`}
                onClick={() => track('contact_click', { method: 'email' })}
                className="relative z-10 inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gray-950/90 text-white font-semibold text-sm hover:bg-gray-800 transition-colors whitespace-nowrap"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Contact me</span>
                <ArrowRight className="size-4" />
              </motion.a>

              {/* Layer 2 — Download CV, slides out below on hover */}
              <motion.a
                href="/cv.pdf"
                download
                onClick={() => track('cv_download')}
                className="absolute left-0 right-0 top-[calc(100%+6px)] inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 border border-white/25 text-white text-sm font-semibold overflow-hidden whitespace-nowrap"
                initial={{ opacity: 0, y: -10 }}
                animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                style={{ pointerEvents: hovered ? 'auto' : 'none' }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Shimmer sweep — runs continuously, only visible when parent is shown */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                  animate={{ x: ['-100%', '220%'] }}
                  transition={{
                    duration: 1.4,
                    repeat: Infinity,
                    repeatDelay: 1.8,
                    ease: 'easeInOut',
                  }}
                />
                <Download className="size-4 text-emerald-300 shrink-0" />
                <span>Download CV</span>
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
