'use client';

import { motion } from 'framer-motion';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import Image, { StaticImageData } from 'next/image';
import { useEffect, useRef, useState } from 'react';

import memojiAvatar1 from '@/assets/images/memoji-avatar-1.png';
import memojiAvatar2 from '@/assets/images/memoji-avatar-2.png';
import memojiAvatar3 from '@/assets/images/memoji-avatar-3.png';
import memojiAvatar4 from '@/assets/images/memoji-avatar-4.png';
import memojiAvatar5 from '@/assets/images/memoji-avatar-5.png';

import { Card } from '@/components/Card';
import { SectionHeader } from '@/components/SectionHeader';
import { cn } from '@/lib/utils';

const testimonials: {
  name: string;
  position: string;
  text: string;
  source?: string;
  avatar: StaticImageData;
}[] = [
  {
    name: 'Lutfhi Iqbal',
    position:
      'IT Manager | IT Practitioner | Project Management | Dynamics 365 Technical Specialist | IT Governance Specialist | Digital Transformation',
    text: "You are most compassionate person, talented programmer i've ever known, you are also meticoulous on every single part of tasks, you're the guy Rizki, wish you best luck !",
    source: 'LinkedIn',
    avatar: memojiAvatar1,
  },
  {
    name: 'Faris Azizy',
    position: 'ERP Solution Architect | Odoo Certified | Former Intern Data Analyst @ Gojek, Tiket.com',
    text: "I had the pleasure of working with Rizki on a college project. He's a top-notch developer with a keen eye for detail and a commitment to excellence.",
    source: 'LinkedIn',
    avatar: memojiAvatar1,
  },
  {
    name: 'Rifqi Arrahim',
    position: 'Junior Manager at Bank Rakyat Indonesia',
    text: 'I would highly recommend Nabil for their exceptional leadership and decision-making abilities. They have a remarkable talent for analyzing complex situations and arriving at logical and sensible solutions, without being swayed by emotions. Throughout my time working with Nabil, I have seen them demonstrate a consistent level of professionalism and composure in high-pressure situations. They have an innate ability to lead their team effectively, while remaining focused on the task at hand.',
    source: 'LinkedIn',
    avatar: memojiAvatar2,
  },
  {
    name: 'Imam Prayoga',
    position: 'Data Scientist at PT Mitra Solusi Telematika | Data Science Enthusiast',
    text: 'When an organization/team needs someone who can maintain the stability and harmony of the organization, as well as being an important figure to motivate people, Rizki Nabil is the right person for all of it. Nabil is a person who can think critically under pressure while maintaining the enthusiasm of the people in it. It was an honor to be his partner',
    source: 'LinkedIn',
    avatar: memojiAvatar3,
  },
  {
    name: 'Muhammad Ihsan Adly',
    position: 'Project Engineer at SCBD Data Center',
    text: 'Nabil is a very cheerful person, easy to work with, a great leader, hard worker',
    source: 'LinkedIn',
    avatar: memojiAvatar4,
  },
  {
    name: 'Aditya Andar Rahim',
    position: 'Flutter Mobile Engineer at Dealls Jobs',
    text: "Rizki and I are in the same class in University. I see Rizki as a creative and problem-solver person. It's always great to discuss with Rizki.",
    source: 'LinkedIn',
    avatar: memojiAvatar5,
  },
];

export const TestimonialsSection = () => {
  const contentCardRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
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
                {testimonials.map((testimonial, index) => (
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
