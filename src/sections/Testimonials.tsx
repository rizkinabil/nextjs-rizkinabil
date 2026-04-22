import { SectionHeader } from '@/components/SectionHeader';
import { getTestimonialsServer } from '@/lib/server-data';
import { TestimonialsCarousel } from './TestimonialsCarousel';

export async function TestimonialsSection() {
  const testimonials = await getTestimonialsServer();

  return (
    <div className="py-16 lg:py-24">
      <div className="mx-5">
        <SectionHeader
          eyeBrow="Recommendations"
          title="What People Say About Me"
          description="Don't just take my word for it. See what people have to say about my work."
        />
        <TestimonialsCarousel testimonials={testimonials} />
      </div>
    </div>
  );
}
