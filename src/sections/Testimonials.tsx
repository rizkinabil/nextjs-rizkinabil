'use client';

import { motion } from 'framer-motion';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { Card } from '@/components/Card';
import { SectionHeader } from '@/components/SectionHeader';
import { Spinner } from '@/components/Spinner';
import { useTestimonials } from '@/hooks/usePortfolio';
import { cn } from '@/utils/cn';

export const TestimonialsSection = () => {
  const COLLAPSED_PX = 56; // collapsed preview height (~3.5rem)
  const scrollRef = useRef<HTMLDivElement | null>(null);
  // Toggle automatic sliding (set to false to disable auto-slide)
  const AUTO_SLIDE = false;
  const { data: testimonials, loading: testimonialsLoading, error: testimonialFailed } = useTestimonials();

  const [isHovered, setIsHovered] = useState(false);
  // per-card expand state handled via expandedIndex
  const [overflowMap, setOverflowMap] = useState<Record<number, boolean>>({});
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const contentRefs = useRef<Record<number, HTMLParagraphElement | null>>({});
  const [isScrollable, setIsScrollable] = useState(false);
  const [cardStep, setCardStep] = useState<number | null>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    const container = scrollRef.current;
    if (!container) return;

    const STEP = cardStep ?? 320;
    const delta = direction === 'left' ? -STEP : STEP;

    container.scrollBy({ left: delta, behavior: 'smooth' });
  };

  // auto-scroll logic
  useEffect(() => {
    if (!AUTO_SLIDE) return; // auto-slide disabled

    const container = scrollRef.current;
    if (!container || !isScrollable) return;

    const INTERVAL = 3000; // interval in (ms)

    const id = setInterval(() => {
      if (isHovered) return;

      const maxScroll = container.scrollWidth - container.clientWidth;
      const STEP = cardStep ?? 320;

      if (container.scrollLeft + STEP >= maxScroll - 4) {
        // smoothly go back to start
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: STEP, behavior: 'smooth' });
      }
    }, INTERVAL);

    return () => clearInterval(id);
  }, [isHovered, isScrollable, cardStep, AUTO_SLIDE]);

  // Check per-card overflow (for the testimonial text) and whether the list is scrollable.
  useEffect(() => {
    const check = () => {
      const container = scrollRef.current;
      if (!container) return;

      // is horizontally scrollable?
      setIsScrollable(container.scrollWidth > container.clientWidth + 1);

      // compute card step using the first child width + gap (fallback to 320)
      const inner = container.firstElementChild as HTMLElement | null;
      if (inner && inner.children.length > 0) {
        const first = inner.children[0] as HTMLElement;
        const style = window.getComputedStyle(inner);
        const gap = parseFloat(style.gap || '0') || 32;
        const step = Math.round(first.getBoundingClientRect().width + gap);
        setCardStep(step);
      } else {
        setCardStep(320);
      }

      // For each testimonial text element, determine if it would overflow a collapsed height.
      const COLLAPSED_PX = 56; // ~3.5rem, approx two lines
      const map: Record<number, boolean> = {};
      testimonials?.forEach((t, idx) => {
        const el = contentRefs.current[idx];
        if (!el) {
          map[idx] = false;
          return;
        }
        // if full scrollHeight exceeds the collapsed visible height, mark as overflowing
        map[idx] = el.scrollHeight > COLLAPSED_PX + 1;
      });
      setOverflowMap(map);
    };

    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [testimonials]);

  if (testimonialsLoading) {
    return (
      <div className="py-16 lg:py-24">
        <div className="container">
          <SectionHeader
            eyeBrow="Recommendations"
            title="What Peoples Say About Me"
            description="Don't just take my word for it. See what peoples have to say about my work."
          />
          <div className="mt-16 lg:mt-24 flex justify-center">
            <div className="flex flex-col items-center gap-4">
              <Spinner size="xl" variant="orbit" label="Loading testimonials..." />
              <p className="text-white/60 text-sm font-medium animate-pulse">Loading testimonials...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (testimonialFailed) {
    return (
      <div className="py-16 lg:py-24">
        <div className="container">
          <SectionHeader
            eyeBrow="Recommendations"
            title="What Peoples Say About Me"
            description="Don't just take my word for it. See what peoples have to say about my work."
          />
          <div className="mt-16 lg:mt-24 flex justify-center">
            {/* <ErrorMessage
               message="Failed to load testimonials. Please try again later."
               onRetry={() => window.location.reload()}
             /> */}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 lg:py-24">
      <div className="container">
        <SectionHeader
          eyeBrow="Recommendations"
          title="What Peoples Say About Me"
          description="Don't just take my word for it. See what peoples have to say about my work."
        />

        <motion.div
          className="mt-16 lg:mt-24"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative">
            {isScrollable && (
              <button
                type="button"
                onClick={() => handleScroll('left')}
                className="
                  hidden md:flex
                  absolute left-0 top-1/2 -translate-y-1/2 z-10
                  h-10 w-10 rounded-full
                  bg-[#020817]/80 border border-white/20
                  items-center justify-center
                  hover:bg-white/10 transition
                "
              >
                <ChevronLeft className="size-5 text-white" />
              </button>
            )}

            {isScrollable && (
              <button
                type="button"
                onClick={() => handleScroll('right')}
                className="
                  hidden md:flex
                  absolute right-0 top-1/2 -translate-y-1/2 z-10
                  h-10 w-10 rounded-full
                  bg-[#020817]/80 border border-white/20
                  items-center justify-center
                  hover:bg-white/10 transition
                "
              >
                <ChevronRight className="size-5 text-white" />
              </button>
            )}

            {/* area scroll */}
            <div
              ref={scrollRef}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="
                flex overflow-x-auto py-4
                [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]
                hide-scrollbar
              "
            >
              <div className="flex gap-8 flex-none pr-8 hover:[animation-play-state:paused] cursor-pointer">
                {testimonials?.map((testimonial, index) => (
                  <motion.div
                    key={`${testimonial.name}-${index}`}
                    whileHover={{ rotate: -3, scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="flex-shrink-0"
                  >
                    <Card
                      className="p-6 w-80 md:w-96 md:p-8 transition-transform bg-[#020817]/70 border border-white/10 backdrop-blur-xl"
                      source={testimonial.source}
                    >
                      <div className="flex gap-4 items-center">
                        <div className="size-14 bg-muted rounded-full inline-flex items-center justify-center flex-shrink-0 overflow-hidden">
                          <Image src={testimonial.avatar} alt={testimonial.name} width={56} height={56} />
                        </div>
                        <div>
                          <div className="font-semibold">{testimonial.name}</div>
                          <div className="text-sm text-muted-foreground">{testimonial.position}</div>
                        </div>
                      </div>
                      <p
                        ref={(el) => {
                          contentRefs.current[index] = el;
                        }}
                        className="mt-4 md:mt-6 text-sm md:text-base text-muted-foreground"
                        style={{
                          maxHeight: expandedIndex === index ? undefined : `${COLLAPSED_PX}px`,
                          overflow: 'hidden',
                          transition: 'max-height 300ms ease',
                        }}
                      >
                        {testimonial.text}
                      </p>

                      {/* Expand/Collapse Toggle (per-card) */}
                      {overflowMap[index] && (
                        <button
                          onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                          className="mt-4 flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white transition-colors"
                        >
                          <span>{expandedIndex === index ? 'Show Less' : 'Read More'}</span>
                          <ChevronDown
                            className={cn('w-4 h-4 transition-transform', expandedIndex === index && 'rotate-180')}
                          />
                        </button>
                      )}
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
