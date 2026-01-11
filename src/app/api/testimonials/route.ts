import { createTestimonial, getTestimonials } from '@/lib/database-service';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const testimonials = await getTestimonials();

    // Format data for compatibility with existing components
    const formattedTestimonials = testimonials.map((testimonial) => ({
      id: testimonial.id,
      name: testimonial.name,
      position: testimonial.position,
      text: testimonial.text,
      source: testimonial.source,
      avatar: testimonial.avatar,
    }));

    return NextResponse.json(formattedTestimonials);
  } catch (error) {
    console.error('Testimonials API Error:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch testimonials',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const testimonial = await createTestimonial(body);
    return NextResponse.json(testimonial, { status: 201 });
  } catch (error) {
    console.error('Create testimonial API Error:', error);
    return NextResponse.json(
      {
        error: 'Failed to create testimonial',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
