import type { Metadata } from 'next';
import { Calistoga, Inter } from 'next/font/google';

import { twMerge } from 'tailwind-merge';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const calistoga = Calistoga({ subsets: ['latin'], variable: '--font-serif', weight: ['400'] });

export const metadata: Metadata = {
  title: 'Rizki Nabil Aufa | Software Engineer',
  description:
    'Software Engineer specializing in React, Next.js, Java Springboot, and TypeScript. Building scalable web applications.',
  keywords: ['React', 'Next.js', 'TypeScript', 'Java Springboot', 'Software Engineer', 'Web Developer'],
  authors: [{ name: 'Rizki Nabil Aufa' }],
  creator: 'Rizki Nabil Aufa',
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    title: 'Rizki Nabil Aufa | Software Engineer',
    description:
      'Software Engineer passionate about solving problems and delivering impactful solutions through technology.',
    images: ['/og-image.png'],
    url: 'https://rizkinabil.vercel.app',
    siteName: 'Rizki Nabil Aufa',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rizki Nabil Aufa | Software Engineer',
    description: 'Software Engineer specializing in React, Next.js, Java Springboot, and TypeScript.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://rizkinabil.vercel.app',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* JSON-LD Structured Data for Person Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Rizki Nabil Aufa',
              jobTitle: 'Software Engineer',
              description: 'Software Engineer specializing in React, Next.js, Java, and TypeScript.',
              url: 'https://rizkinabil.vercel.app',
              email: 'rizukinbr@gmail.com',
              image: 'https://rizkinabil.vercel.app/profile-image.jpg',
              sameAs: [
                'https://linkedin.com/in/rizkinabilaufa',
                'https://github.com/rizkinabil',
                'https://x.com/rizkinabil_',
              ],
              knowsAbout: ['React', 'Next.js', 'TypeScript', 'Java', 'Web Development'],
            }),
          }}
        />

        {/* Optional: Organization Schema if you want to emphasize professionalism */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Rizki Nabil Aufa',
              url: 'https://rizkinabil.vercel.app',
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: 'https://yourwebsite.com/search?q={search_term_string}',
                },
                query_input: 'required name=search_term_string',
              },
            }),
          }}
        />
      </head>
      <body className={twMerge(inter.variable, calistoga.variable, 'bg-gray-900 text-white antialiased font-sans')}>
        {children}
      </body>
    </html>
  );
}
