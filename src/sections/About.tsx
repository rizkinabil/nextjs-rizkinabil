'use client';

import { ABOUT_IMAGES } from '@/constants/aboutImages';
import { useAboutData } from '@/hooks/usePortfolio';
import Image from 'next/image';
import { useState } from 'react';

export const AboutSection = () => {
  const { profile, experiences, highlights, loading, error } = useAboutData();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [groupHovered, setGroupHovered] = useState(false);

  // Loading state
  if (loading) {
    return (
      <div className="py-20 bg-gray-950 min-h-[80vh] flex items-center justify-center">
        <div className="text-white">Loading profile...</div>
      </div>
    );
  }

  // Error state
  if (error || !profile) {
    return (
      <div className="py-20 bg-gray-950 min-h-[80vh] flex items-center justify-center">
        <div className="text-red-400">{error || 'Profile not found'}</div>
      </div>
    );
  }

  return (
    <div className="relative py-20 min-h-[80vh] overflow-hidden">
      {/* Multiple Background highlights */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Top center highlight */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.4) 0%, transparent 70%)',
          }}
        />
        {/* Left side highlight */}
        <div
          className="absolute top-1/3 left-0 w-[600px] h-[500px] opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, transparent 60%)',
          }}
        />
        {/* Right side highlight */}
        <div
          className="absolute bottom-1/4 right-0 w-[700px] h-[600px] opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.35) 0%, transparent 65%)',
          }}
        />
      </div>

      <div className="container max-w-5xl mx-auto px-2 md:px-6 relative z-10">
        <div className="flex flex-col gap-8 mt-24">
          <div className="flex-1 min-w-0">
            <div className="mb-24 text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight font-serif">
                The journey of me
              </h1>
              <p className="text-white/70 text-base max-w-2xl mx-auto leading-relaxed">
                Hey, I&apos;m Nabil! I build software that scales both technically and across borders. From dashboards
                used by top management to enterprise systems supporting international operations, I&apos;ve spent my
                career bridging the gap between beautiful interfaces and scalable architecture. I&apos;m all about
                writing code that&apos;s not just functional, but maintainable, and performant. Currently collaborating
                with Korean dev teams at Hyundai AutoEver, I&apos;m living proof that good communication and clean code
                go hand in hand.
              </p>
            </div>

            {/* Curved Image Cards - Piled -> Spread on hover */}
            <div className="relative mb-32 flex justify-center items-center" style={{ perspective: '1000px' }}>
              <div
                className={`flex justify-center items-end transition-all duration-500 ${
                  groupHovered ? 'gap-6 md:gap-8' : '-space-x-8 md:-space-x-10'
                }`}
                onMouseEnter={() => setGroupHovered(true)}
                onMouseLeave={() => {
                  setGroupHovered(false);
                  setHoveredCard(null);
                }}
              >
                {ABOUT_IMAGES.map((src, idx) => {
                  const totalCards = ABOUT_IMAGES.length;
                  const middleIndex = Math.floor(totalCards / 2);
                  const offset = idx - middleIndex;

                  // Calculate rotation and translation for curve effect
                  const rotateY = offset * 8; // degrees
                  const baseTranslateZ = -Math.abs(offset) * 20; // pixels (3D depth)
                  const spreadGap = 8; // px when group is hovered
                  const smallOverlap = 12; // px overlap when not hovered
                  const translateX = groupHovered ? offset * spreadGap : offset * smallOverlap;
                  const translateZ = hoveredCard === idx ? 50 : baseTranslateZ;
                  const scale = hoveredCard === idx ? 1.08 : 1 - Math.abs(offset) * 0.04;
                  const isHovered = hoveredCard === idx;
                  const baseZ = idx + 1; // pile order: card 1 -> z-index 1, etc.
                  const zIndex = isHovered ? 1000 : baseZ;
                  // staggered transition delay for nicer spread animation
                  const transitionDelay = `${Math.abs(offset) * 40}ms`;

                  return (
                    <div
                      key={idx}
                      className="relative w-32 md:w-48 h-40 md:h-60 flex-shrink-0 cursor-pointer transition-all duration-500"
                      style={{
                        transform: `translateX(${translateX}px) rotateY(${isHovered ? 0 : rotateY}deg) translateZ(${translateZ}px) translateY(${isHovered ? -18 : 0}px) scale(${scale})`,
                        transformStyle: 'preserve-3d',
                        zIndex,
                        transitionDelay,
                      }}
                      onMouseEnter={() => setHoveredCard(idx)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      <div
                        className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-gray-800/50 shadow-2xl
                                    transition-all duration-500 hover:border-emerald-500/50 hover:shadow-emerald-500/30"
                      >
                        <Image
                          src={src}
                          alt={`About image ${idx + 1}`}
                          fill
                          className={`object-cover transition-all duration-700 ${
                            isHovered ? 'scale-110 brightness-110' : 'scale-100 brightness-75'
                          }`}
                        />
                        {/* Gradient overlay */}
                        <div
                          className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent
                                    transition-opacity duration-500 ${isHovered ? 'opacity-90' : 'opacity-50'}`}
                        />
                        {/* Shine effect */}
                        <div
                          className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/30 to-white/0 transition-transform duration-700"
                          style={{
                            transform: isHovered ? 'translateX(100%)' : 'translateX(-100%)',
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="text-center mb-16">
              <span className="block text-emerald-400 font-semibold text-xs uppercase tracking-widest mb-3">
                MY EXPERIENCES
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white font-serif">Where I&apos;ve Been Employed</h2>
            </div>

            {/* New Experience Layout - Horizontal */}
            <div className="mb-20 space-y-12">
              {experiences.map((exp, idx) => (
                <div
                  key={idx}
                  className="group border-b border-gray-800/30 pb-12 last:border-b-0 transition-all duration-300 hover:border-emerald-500/20"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                    {/* Left: Job Title and Company */}
                    <div className="md:w-1/3">
                      <h3 className="text-xl font-semibold text-white mb-1 group-hover:text-emerald-400 transition-colors duration-300">
                        Product Designer, <span className="text-emerald-400">{exp.company}</span>
                      </h3>
                      <p className="text-xs text-gray-500 italic">
                        {exp.period} / {exp.location}
                      </p>
                    </div>

                    {/* Right: Description */}
                    <div className="md:w-2/3">
                      <p className="text-sm text-white/70 leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
