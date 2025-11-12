'use client';

import ArrowDown from '@/assets/icons/arrow-down.svg';
import auroraHero from '@/assets/images/aurora-hero.png';
import memojiImage from '@/assets/images/memoji-nabil.png';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

type OrbitDotProps = {
  size: number; // diameter ring (px) — samain dengan hero-ring
  speed?: number; // durasi putar (detik)
  delay?: number; // jeda awal (detik)
  className?: string; // styling ekstra buat dot
};

const OrbitDot = ({ size, speed = 10, delay = 0, className }: OrbitDotProps) => (
  <motion.div
    className="absolute left-1/2 top-1/2"
    style={{ width: size, height: size }}
    animate={{ rotate: 360 }}
    transition={{ repeat: Infinity, ease: 'linear', duration: speed, delay }}
  >
    {/* Dot diletakkan di sisi atas lingkaran */}
    <div className="absolute left-1/2 -translate-x-1/2 -top-1">
      <div
        className={'size-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(52,211,153,0.8)] ' + (className ?? '')}
      />
    </div>
  </motion.div>
);

/** Optional: efek ping halus dari pusat */
const CenterPing = () => (
  <motion.div
    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-300/20"
    style={{ width: 8, height: 8 }}
    animate={{ scale: [1, 8], opacity: [0.6, 0] }}
    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}
  />
);

export const HeroSection = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const skyY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const orbitY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 20]);

  return (
    <section ref={ref} className="relative overflow-hidden py-28 md:py-40 lg:py-52 min-h-screen">
      {/* BG aurora */}
      <motion.div className="absolute inset-0 -z-20" style={{ y: skyY }}>
        <Image src={auroraHero} alt="Aurora background" fill priority className="object-cover" />
      </motion.div>

      {/* Rings + orbit (radar-ish) */}
      <motion.div
        className="absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_80%,transparent)]"
        style={{ y: orbitY }}
      >
        {/* ring statis */}
        <div className="size-[620px] hero-ring" />
        <div className="size-[820px] hero-ring" />
        <div className="size-[1020px] hero-ring" />

        {/* sinyal yang mengorbit di tiap ring */}
        <OrbitDot size={620} speed={9} />
        <OrbitDot size={620} speed={9} delay={1.5} className="size-1.5 opacity-70" />

        <OrbitDot size={820} speed={12} />
        <OrbitDot size={820} speed={12} delay={2.2} className="size-1.5 opacity-70" />

        <OrbitDot size={1020} speed={16} />
        <OrbitDot size={1020} speed={16} delay={3.1} className="size-1.5 opacity-60" />

        {/* ping opsional di pusat */}
        <CenterPing />
      </motion.div>

      {/* Content */}
      <motion.div className="container relative flex flex-col items-center text-center" style={{ y: contentY }}>
        <Image src={memojiImage} className="size-[100px]" alt="memoji nabil" />

        <div className="bg-gray-950/70 border border-gray-800/70 px-4 py-1.5 inline-flex items-center gap-3 rounded-full mt-4 backdrop-blur">
          <span className="animate-pulse bg-emerald-400 size-2.5 rounded-full" />
          <span className="text-sm font-medium text-white/80">Available for freelance projects</span>
        </div>

        <div className="max-w-xl mt-6">
          <h1 className="font-serif text-3xl md:text-5xl">Building calm, thoughtful digital experiences.</h1>
          <p className="mt-4 text-white/70 md:text-lg">
            I design and develop interfaces that feel as calm as this sky, but still ship fast for real product teams.
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center mt-8 gap-4">
          <button className="inline-flex items-center gap-2 border border-white/20 bg-white/5 hover:bg-white/10 px-6 h-12 rounded-xl text-sm font-semibold">
            <span>Explore my work</span>
            <ArrowDown className="size-4" />
          </button>
          <button className="inline-flex items-center gap-2 bg-white text-gray-900 h-12 px-6 rounded-xl text-sm font-semibold">
            <span>👋</span>
            <span>Let&apos;s connect</span>
          </button>
        </div>
      </motion.div>
    </section>
  );
};
