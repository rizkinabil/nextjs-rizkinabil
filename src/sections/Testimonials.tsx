'use client';

import { motion } from 'framer-motion';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { Card } from '@/components/Card';
import { SectionHeader } from '@/components/SectionHeader';
import { useTestimonials } from '@/hooks/usePortfolio';
import { cn } from '@/utils/cn';

export const TestimonialsSection = () => {
  const contentCardRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const { data: testimonials, loading: testimonialsLoading, error: testimonialFailed } = useTestimonials();

  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);

  const handleScroll = (direction: 'left' | 'right') => {
    const container = scrollRef.current;
    if (!container) return;

    const STEP = 320;
    const delta = direction === 'left' ? -STEP : STEP;

    container.scrollBy({ left: delta, behavior: 'smooth' });
  };

  // auto-scroll logic
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const STEP = 320; // how far the scroll will move (px)
    const INTERVAL = 3000; // interval in (ms)

    const id = setInterval(() => {
      if (isHovered) return;

      const maxScroll = container.scrollWidth - container.clientWidth;

      if (container.scrollLeft + STEP >= maxScroll - 10) {
        // back to start in loop
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: STEP, behavior: 'smooth' });
      }
    }, INTERVAL);

    return () => clearInterval(id);
  }, [isHovered]);

  useEffect(() => {
    const checkOverflow = () => {
      if (contentCardRef.current) {
        // Check if the actual content height is greater than the limit
        const hasOverflow = contentCardRef.current.offsetHeight > 200;
        setIsOverflowing(hasOverflow);
      }
    };

    checkOverflow();
    // Re-check on window resize in case layout shifts
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [contentCardRef]);

  if (testimonialsLoading) {
    console.log('loading here');
    return (
      <div className="py-16 lg:py-24">
        <div className="container">
          <SectionHeader
            eyeBrow="Recommendations"
            title="What Peoples Say About Me"
            description="Don't just take my word for it. See what peoples have to say about my work."
          />
          <div className="mt-16 lg:mt-24 flex justify-center">
            <p>Loading...</p>
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
              <div className="flex gap-8 flex-none pr-8 animate-scroll hover:[animation-play-state:paused] cursor-pointer">
                {testimonials?.map((testimonial, index) => (
                  <motion.div
                    key={`${testimonial.name}-${index}`}
                    whileHover={{ rotate: -3, scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="flex-shrink-0"
                  >
                    <Card
                      className="max-w-xs md:max-w-md md:p-8 transition-transform bg-[#020817]/70 border border-white/10 backdrop-blur-xl"
                      source={testimonial.source}
                    >
                      <div className="flex gap-4 items-center">
                        <div className="size-14 bg-muted rounded-full inline-flex items-center justify-center flex-shrink-0 overflow-hidden">
                          <Image src={testimonial.avatar} alt={testimonial.name} className="size-full" />
                        </div>
                        <div>
                          <div className="font-semibold">{testimonial.name}</div>
                          <div
                            ref={contentCardRef}
                            className="text-sm text-muted-foreground truncate overflow-hidden whitespace-nowrap w-64"
                          >
                            {testimonial.position}
                          </div>
                          {/* Expand/Collapse Toggle */}
                          {isOverflowing && (
                            <button
                              onClick={() => setIsExpanded(!isExpanded)}
                              className="mt-4 flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white transition-colors"
                            >
                              <span>{isExpanded ? 'Show Less' : 'Read More'}</span>
                              <ChevronDown className={cn('w-4 h-4 transition-transform', isExpanded && 'rotate-180')} />
                            </button>
                          )}
                        </div>
                      </div>
                      <p className="mt-4 md:mt-6 text-sm md:text-base text-muted-foreground">{testimonial.text}</p>
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
