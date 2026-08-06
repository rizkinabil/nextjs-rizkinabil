import { SectionHeader } from '@/components/SectionHeader';
import { getTestimonialsByTypeServer } from '@/lib/server-data';
import { TestimonialsCarousel } from './TestimonialsCarousel';

export async function TestimonialsSection() {
  const [linkedinEntries, guestbookEntries] = await Promise.all([
    getTestimonialsByTypeServer('linkedin'),
    getTestimonialsByTypeServer('guestbook'),
  ]);

  return (
    <section className="relative py-16 lg:py-24 overflow-hidden" id="testimonials">
      {/* Gradient transition matching Projects section tone */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#020817] to-transparent pointer-events-none" />

      <div className="container relative z-10">
        <SectionHeader
          eyeBrow="Recommendations"
          title="What People Say About Me"
          description="Don't just take my word for it. See what people have to say about my work."
        />

        {/* Backdrop — glass-etched serif typography */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-[130px] pointer-events-none select-none flex justify-center w-full"
        >
          <p
            style={{
              fontFamily: '"Georgia", "Times New Roman", serif',
              fontSize: 'clamp(80px, 16vw, 220px)',
              fontStyle: 'italic',
              fontWeight: 300,
              letterSpacing: '-0.03em',
              lineHeight: 1,
              background: 'linear-gradient(180deg, rgba(255,255,255,0.052) 0%, rgba(255,255,255,0.008) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            &#8220;Testimonials&#8221;
          </p>
        </div>

        <TestimonialsCarousel
          linkedinEntries={linkedinEntries}
          guestbookEntries={guestbookEntries}
          linkedinUrl="https://www.linkedin.com/in/rizkinabilaufa/"
        />
      </div>
    </section>
  );
}
