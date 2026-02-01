'use client';

import GlobeImage from '@/assets/images/journey.png';
import { ABOUT_IMAGES } from '@/constants/aboutImages';
import { useAboutData } from '@/hooks/usePortfolio';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export const AboutSection = () => {
  const { profile, experiences, loading, error } = useAboutData();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [groupHovered, setGroupHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [cards, setCards] = useState(ABOUT_IMAGES.slice());
  const dragState = useRef({
    active: false,
    startX: 0,
    dx: 0,
  });
  const [, forceRerender] = useState(0); // used to trigger render for drag updates

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

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

      <div className="container max-w-5xl mx-auto px-2 md:px-6 relative">
        <div className="flex flex-col gap-8 mt-24 px-4">
          <div className="flex-1 min-w-0">
            <div className="mb-24 text-center">
              <Image src={GlobeImage} alt="Globe" className="mx-auto mb-8 rounded-lg" width={160} />
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight font-serif">
                The journey of me
              </h1>
              <p className="text-white/70 text-base max-w-2xl mx-auto leading-relaxed">
                I build software that scales both technically and across borders. From dashboards used by top management
                to enterprise systems supporting international operations, I&apos;ve spent my career bridging the gap
                between beautiful interfaces and scalable architecture. I&apos;m all about writing code that&apos;s not
                just functional, but maintainable, and performant. Currently collaborating with Korean dev teams,
                I&apos;m living proof that good communication and clean code go hand in hand.
              </p>
            </div>

            {/* Curved Image Cards - Piled -> Spread on hover */}
            <div className="relative mb-32 flex justify-center items-center" style={{ perspective: '1000px' }}>
              <div
                className={
                  isMobile
                    ? 'relative w-full h-72 flex items-center justify-center'
                    : `flex justify-center items-end transition-all duration-500 ${
                        groupHovered ? 'gap-6 md:gap-8' : '-space-x-8 md:-space-x-10'
                      }`
                }
                onMouseEnter={() => !isMobile && setGroupHovered(true)}
                onMouseLeave={() => {
                  if (!isMobile) {
                    setGroupHovered(false);
                    setHoveredCard(null);
                  }
                }}
              >
                {cards.map((src, idx) => {
                  const total = cards.length;
                  const layer = total - idx - 1; // 0 = top card

                  // Responsive placement: arc on desktop, swipe-stack on both
                  let rotateY = (layer - (total - 1) / 2) * 6; // gentler rotate based on layer
                  let translateZ = -layer * 14; // depth per layer
                  let translateX = 0;
                  let translateY = 0;
                  let scale = 1 - layer * 0.02;
                  let isTop = layer === 0;
                  let isHoveredCard = hoveredCard === idx;
                  const isHovered = isHoveredCard;
                  let zIndex = 100 + idx;
                  let transitionDelay = `${layer * 40}ms`;

                  // If user is dragging, top card follows pointer and underlying cards open progressively
                  if (dragState.current.active) {
                    const dx = dragState.current.dx;
                    const threshold = 120;
                    const progress = Math.min(Math.abs(dx) / threshold, 1);
                    const dir = dx === 0 ? 1 : Math.sign(dx);

                    if (isTop) {
                      translateX = dx;
                      rotateY = dx / 20; // rotate as you drag
                      zIndex = 1000;
                      scale = 1.02;
                      transitionDelay = '0ms';
                    } else {
                      // underlying cards open progressively based on drag progress
                      const revealX = 18; // horizontal reveal per layer
                      const revealY = 8; // vertical lift per layer
                      const layerOffset = layer; // distance from top
                      const staggerFactor = Math.max(0, 1 - layerOffset * 0.22);
                      const eased = progress * staggerFactor;
                      translateX = dir * eased * layerOffset * revealX;
                      translateY = -eased * layerOffset * revealY;
                      rotateY = dir * eased * (layerOffset * 2);
                      scale = 1 - layer * 0.015 + eased * 0.02;
                      transitionDelay = `${layerOffset * 40}ms`;
                    }
                  }

                  return (
                    <div
                      key={idx}
                      className="relative w-56 md:w-48 h-72 md:h-60 flex-shrink-0 cursor-pointer transition-all duration-500"
                      style={{
                        position: isMobile ? ('absolute' as const) : undefined,
                        left: isMobile ? '50%' : undefined,
                        transform: isMobile
                          ? `translateX(calc(-50% + ${translateX}px)) rotateY(${isHovered ? 0 : rotateY}deg) translateZ(${translateZ}px) translateY(${
                              layer * 10 + translateY + (isHovered ? -18 : 0)
                            }px) scale(${scale})`
                          : `translateX(${translateX}px) rotateY(${isHovered ? 0 : rotateY}deg) translateZ(${translateZ}px) translateY(${isHovered ? -18 : 0}px) scale(${scale})`,
                        transformStyle: 'preserve-3d',
                        zIndex,
                        transitionDelay,
                      }}
                      ref={(el) => {
                        cardRefs.current[idx] = el;
                      }}
                      onMouseEnter={() => !isMobile && setHoveredCard(idx)}
                      onMouseLeave={() => !isMobile && setHoveredCard(null)}
                      onClick={() => {
                        if (isMobile) {
                          setHoveredCard((prev) => (prev === idx ? null : idx));
                          // scroll selected card into view
                          setTimeout(() => {
                            cardRefs.current[idx]?.scrollIntoView({
                              behavior: 'smooth',
                              inline: 'center',
                              block: 'nearest',
                            });
                          }, 80);
                        }
                      }}
                      onPointerDown={(e: any) => {
                        if (!isTop) return;
                        dragState.current.active = true;
                        dragState.current.startX = e.clientX ?? (e.touches && e.touches[0]?.clientX) ?? 0;
                        dragState.current.dx = 0;
                        try {
                          e.currentTarget.setPointerCapture?.(e.pointerId);
                        } catch {}
                      }}
                      onPointerMove={(e: any) => {
                        if (!dragState.current.active || !isTop) return;
                        const clientX = e.clientX ?? (e.touches && e.touches[0]?.clientX) ?? 0;
                        dragState.current.dx = clientX - dragState.current.startX;
                        forceRerender((n) => n + 1);
                      }}
                      onPointerUp={(e: any) => {
                        if (!dragState.current.active || !isTop) return;
                        dragState.current.active = false;
                        const dx = dragState.current.dx;
                        const threshold = 120;
                        if (Math.abs(dx) > threshold) {
                          const direction = dx > 0 ? 1 : -1;
                          dragState.current.dx = direction * (window.innerWidth + 200);
                          forceRerender((n) => n + 1);
                          setTimeout(() => {
                            setCards((prev) => {
                              const copy = [...prev];
                              const swiped = copy.pop();
                              if (swiped) copy.unshift(swiped);
                              return copy;
                            });
                            dragState.current.dx = 0;
                            forceRerender((n) => n + 1);
                          }, 300);
                        } else {
                          dragState.current.dx = 0;
                          forceRerender((n) => n + 1);
                        }
                      }}
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
                        {exp.job}, <span className="text-emerald-400">{exp.company}</span>
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
