'use client';

import ArrowDown from '@/assets/icons/arrow-down.svg';
import auroraHero from '@/assets/images/aurora-hero.png';
import { FirefliesLayer } from '@/components/FirefliesLayer';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

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
        <FirefliesLayer count={5} />
      </motion.div>

      {/* Content */}
      <motion.div className="container relative flex flex-col items-center text-center mt-6" style={{ y: contentY }}>
        <div className="bg-gray-950/70 border border-gray-800/70 px-4 py-1.5 inline-flex items-center gap-3 rounded-full backdrop-blur">
          <span className="animate-pulse bg-emerald-400 size-2.5 rounded-full" />
          <span className="text-sm font-medium text-white/80">React, Java</span>
        </div>

        <div className="max-w-xl mt-6">
          <h1 className="font-serif text-6xl md:text-5xl">Hello, I&apos;m Nabil!</h1>
          <p className="mt-4 text-white/70 md:text-lg">
            Delivering high-impact solutions through software fundamentals. I use mental models to build scalable
            architecture and interfaces that offer better experience.
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
