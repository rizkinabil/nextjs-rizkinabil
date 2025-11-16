'use client';

import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import memojiAvatar1 from '@/assets/images/memoji-avatar-1.png';
import memojiAvatar2 from '@/assets/images/memoji-avatar-2.png';
import memojiAvatar3 from '@/assets/images/memoji-avatar-3.png';
import memojiAvatar4 from '@/assets/images/memoji-avatar-4.png';
import memojiAvatar5 from '@/assets/images/memoji-avatar-5.png';

import { Card } from '@/components/Card';
import { SectionHeader } from '@/components/SectionHeader';

const testimonials = [
  {
    name: 'Alex Turner',
    position: 'Marketing Manager @ TechStartups',
    text: "Alex was instrumental in transforming our website into a powerful marketing tool. His attention to detail and ability to understand our brand is exceptional. We're thrilled with the results!",
    avatar: memojiAvatar1,
  },
  {
    name: 'Olivia Green',
    position: 'Head of Design @ GreenLeaf',
    text: 'Working with Alex was a pleasure. His expertise in frontend development brought our designs to life in a way we never imagined. The website has exceeded our expectations.',
    avatar: memojiAvatar2,
  },
  {
    name: 'Daniel White',
    position: 'CEO @ InnovateCo',
    text: "Alex's ability to create seamless user experiences is unmatched. Our website has seen a significant increase in conversions since launching the new design. We couldn't be happier.",
    avatar: memojiAvatar3,
  },
  {
    name: 'Emily Carter',
    position: 'Product Manager @ GlobalTech',
    text: "Alex is a true frontend wizard. He took our complex product and transformed it into an intuitive and engaging user interface. We're already seeing positive feedback from our customers.",
    avatar: memojiAvatar4,
  },
  {
    name: 'Michael Brown',
    position: 'Director of IT @ MegaCorp',
    text: "Alex's work on our website has been nothing short of exceptional. He's a talented developer who is also a great communicator. We highly recommend him.",
    avatar: memojiAvatar5,
  },
];

export const TestimonialsSection = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  // auto-scroll logic
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const STEP = 320; // seberapa jauh sekali jalan (px)
    const INTERVAL = 3000; // ms

    const id = setInterval(() => {
      if (isHovered) return;

      const maxScroll = container.scrollWidth - container.clientWidth;

      if (container.scrollLeft + STEP >= maxScroll - 10) {
        // balik ke awal biar looping
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: STEP, behavior: 'smooth' });
      }
    }, INTERVAL);

    return () => clearInterval(id);
  }, [isHovered]);

  const handleScroll = (direction: 'left' | 'right') => {
    const container = scrollRef.current;
    if (!container) return;

    const STEP = 320;
    const delta = direction === 'left' ? -STEP : STEP;

    container.scrollBy({ left: delta, behavior: 'smooth' });
  };

  return (
    <div className="py-16 lg:py-24">
      <div className="container">
        <SectionHeader
          eyeBrow="Happy Clients"
          title="What Clients Say About Me"
          description="Don't just take my word for it. See what my clients have to say about my work."
        />

        <motion.div
          className="mt-16 lg:mt-24"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative">
            {/* tombol kiri */}
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

            {/* tombol kanan */}
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
              <div className="flex gap-8 flex-none pr-8 animate-scroll">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={`${testimonial.name}-${index}`}
                    whileHover={{ rotate: -3, scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="flex-shrink-0"
                  >
                    <Card className="max-w-xs md:max-w-md md:p-8 transition-transform bg-[#020817]/70 border border-white/10 backdrop-blur-xl">
                      <div className="flex gap-4 items-center">
                        <div className="size-14 bg-muted rounded-full inline-flex items-center justify-center flex-shrink-0 overflow-hidden">
                          <Image src={testimonial.avatar} alt={testimonial.name} className="size-full" />
                        </div>
                        <div>
                          <div className="font-semibold">{testimonial.name}</div>
                          <div className="text-sm text-muted-foreground">{testimonial.position}</div>
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
