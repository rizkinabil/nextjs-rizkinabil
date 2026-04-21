import type { Metadata } from 'next';

interface SEOProps {
  title: string;
  description: string;
  ogImage?: string;
  canonical?: string;
  keywords?: string[];
}
/**
 * @Function
 * a reusable component for generating SEO
 * on specific page
 **/
export function generateSEO(props: SEOProps): Metadata {
  return {
    title: `${props.title} | Rizki Nabil Aufa`,
    description: props.description,
    keywords: props.keywords || [],
    openGraph: {
      title: props.title,
      description: props.description,
      images: props.ogImage ? [props.ogImage] : ['/og-image.png'],
      type: 'website',
    },
    alternates: {
      canonical: props.canonical || 'https://yourwebsite.com',
    },
  };
}
