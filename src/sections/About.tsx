'use client';

import GlobeImage from '@/assets/images/journey.png';
import { ABOUT_IMAGES } from '@/constants/aboutImages';
import { useAboutData } from '@/hooks/usePortfolio';
import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export const AboutSection = () => {
  const { profile, experiences, loading, error } = useAboutData();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [groupHovered, setGroupHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [cards, setCards] = useState(ABOUT_IMAGES.slice());
  // framer-motion controls for the top card
  const topControls = useAnimation();
  const [dragX, setDragX] = useState(0);
  const swipeThreshold = 120; // px

  const handleDragEnd = async (offsetX: number, velocityX: number) => {
    const dir = offsetX > 0 ? 1 : -1;
    const passed = Math.abs(offsetX) > swipeThreshold || Math.abs(velocityX) > 500;
    const animDistance = dir * (window.innerWidth + 300);

    if (passed) {
      // fly off
      await topControls.start({
        x: animDistance,
        rotate: dir * 30,
        transition: { duration: 0.36, ease: [0.22, 1, 0.36, 1] },
      });
      // reorder based on direction: right -> next, left -> previous
      setCards((prev) => {
        const copy = [...prev];
        if (dir > 0) {
          const first = copy.shift();
          if (first) copy.push(first);
        } else {
          const last = copy.pop();
          if (last) copy.unshift(last);
        }
        return copy;
      });
      // reset transform instantly
      await topControls.set({ x: 0, rotate: 0 });
    } else {
      // snap back with spring
      await topControls.start({ x: 0, rotate: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } });
    }
    setDragX(0);
  };

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
                    : `flex justify-center items-end transition-all duration-700 ${
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
                  const isTop = layer === 0;
                  const isHoveredCard = hoveredCard === idx;
                  const applyHover = !isMobile && isHoveredCard;

                  // base visual offsets for stack
                  const baseY = layer * 10;
                  const baseScale = 1 - layer * 0.02;
                  const baseRotate = (layer - (total - 1) / 2) * 6;

                  // compute drag-influenced transforms for underlying cards
                  const progress = Math.min(Math.abs(dragX) / swipeThreshold, 1);
                  const dir = dragX === 0 ? 1 : Math.sign(dragX);
                  const staggerFactor = Math.max(0, 1 - layer * 0.22);
                  const eased = progress * staggerFactor;
                  const revealX = 18;
                  const revealY = 8;

                  const animX = isTop ? 0 : dir * eased * layer * revealX;
                  const animY = isTop ? 0 : -eased * layer * revealY;
                  const animRotate = isTop ? 0 : dir * eased * (layer * 2);
                  const animScale = isTop ? 1 : 1 - layer * 0.015 + eased * 0.02;

                  // When on mobile we render an outer wrapper that centers via CSS (left:50% + translateX(-50%)).
                  // The inner motion.div will animate an x offset relative to that centered origin so
                  // the card remains visually centered baseline while being draggable.
                  if (isMobile) {
                    return (
                      <div
                        key={idx}
                        style={{
                          position: 'absolute',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          zIndex: 100 + idx,
                        }}
                      >
                        <motion.div
                          className="relative w-56 md:w-48 h-72 md:h-60 flex-shrink-0 cursor-pointer"
                          layout={false}
                          drag={isTop ? 'x' : undefined}
                          dragElastic={0.2}
                          dragConstraints={{ left: 0, right: 0 }}
                          onDrag={(e, info) => {
                            if (!isTop) return;
                            setDragX(info.offset.x);
                          }}
                          onDragEnd={(e, info) => {
                            if (!isTop) return;
                            handleDragEnd(info.offset.x, info.velocity.x);
                          }}
                          whileDrag={isTop ? { scale: 1.02 } : undefined}
                          animate={
                            isTop
                              ? topControls
                              : { x: animX, y: baseY + animY, rotateY: animRotate + baseRotate, scale: animScale }
                          }
                          transition={isTop ? undefined : { type: 'spring', stiffness: 300, damping: 30 }}
                          style={{ position: 'relative' }}
                        >
                          <div
                            className={`relative w-full h-full rounded-2xl overflow-hidden border-2 border-gray-800/50 shadow-2xl transition-all duration-300`}
                          >
                            <Image
                              src={src}
                              alt={`About image ${idx + 1}`}
                              fill
                              className={`object-cover transition-all duration-700 ${applyHover ? 'scale-110 brightness-110' : 'scale-100 brightness-75'}`}
                            />
                            <div
                              className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-500 ${applyHover ? 'opacity-90' : 'opacity-50'}`}
                            />
                            <div
                              className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/30 to-white/0 transition-transform duration-700"
                              style={{ transform: applyHover ? 'translateX(100%)' : 'translateX(-100%)' }}
                            />
                          </div>
                        </motion.div>
                      </div>
                    );
                  }

                  // Desktop / tablet: allow hover to bring card visually forward
                  const zIndex = isHoveredCard ? 2000 : 100 + idx;
                  return (
                    <motion.div
                      key={idx}
                      className="relative w-56 md:w-48 h-72 md:h-60 flex-shrink-0 cursor-pointer"
                      style={{ zIndex }}
                      layout={false}
                      drag={isTop ? 'x' : undefined}
                      dragElastic={0.2}
                      dragConstraints={{ left: 0, right: 0 }}
                      onDrag={(e, info) => {
                        if (!isTop) return;
                        setDragX(info.offset.x);
                      }}
                      onDragEnd={(e, info) => {
                        if (!isTop) return;
                        handleDragEnd(info.offset.x, info.velocity.x);
                      }}
                      onMouseEnter={() => !isMobile && setHoveredCard(idx)}
                      onMouseLeave={() => !isMobile && setHoveredCard(null)}
                      whileDrag={isTop ? { scale: 1.02 } : undefined}
                      animate={
                        isTop
                          ? topControls
                          : { x: animX, y: baseY + animY, rotateY: animRotate + baseRotate, scale: animScale }
                      }
                      transition={isTop ? undefined : { type: 'spring', stiffness: 300, damping: 30 }}
                    >
                      <div
                        className={`relative w-full h-full rounded-2xl overflow-hidden border-2 border-gray-800/50 shadow-2xl transition-all duration-500 hover:border-emerald-500/50 hover:shadow-emerald-500/30`}
                      >
                        <Image
                          src={src}
                          alt={`About image ${idx + 1}`}
                          fill
                          className={`object-cover transition-all duration-700 ${applyHover ? 'scale-110 brightness-110' : 'scale-100 brightness-75'}`}
                        />
                        {/* Gradient overlay */}
                        <div
                          className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-500 ${applyHover ? 'opacity-90' : 'opacity-50'}`}
                        />
                        {/* Shine effect */}
                        <div
                          className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/30 to-white/0 transition-transform duration-700"
                          style={{
                            transform: applyHover ? 'translateX(100%)' : 'translateX(-100%)',
                          }}
                        />
                      </div>
                    </motion.div>
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
