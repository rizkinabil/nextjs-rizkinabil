import { SectionHeader } from '@/components/SectionHeader';
import { Footer } from '@/sections/Footer';
import { Header } from '@/sections/Header';
import { getAllPosts } from '@/lib/blog';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog | Rizki Nabil Aufa',
  description: 'Articles on software engineering, TypeScript, React, and frontend architecture.',
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />

      <section className="relative pt-32 pb-20 px-4">
        <div className="container max-w-4xl mx-auto">
          <SectionHeader
            eyeBrow="Writing"
            title="Blog"
            description="Thoughts on software engineering, architecture, and lessons from the field."
          />
        </div>
      </section>

      <section className="pb-24 px-4">
        <div className="container max-w-4xl mx-auto">
          {posts.length === 0 ? (
            <p className="text-center text-white/50 py-20">No posts yet. Check back soon.</p>
          ) : (
            <ul className="divide-y divide-gray-800" role="list">
              {posts.map((post) => (
                <li key={post.slug} className="group py-8 first:pt-0">
                  <Link href={`/blog/${post.slug}`} className="block space-y-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-lg">
                    <div className="flex items-start justify-between gap-4">
                      <h2 className="text-xl font-semibold text-white group-hover:text-emerald-400 transition-colors leading-snug">
                        {post.title}
                      </h2>
                      <ArrowUpRight className="size-5 text-white/30 group-hover:text-emerald-400 flex-shrink-0 mt-0.5 transition-colors" aria-hidden="true" />
                    </div>

                    {post.excerpt && (
                      <p className="text-white/60 text-sm leading-relaxed">{post.excerpt}</p>
                    )}

                    <div className="flex items-center gap-4">
                      {post.date && (
                        <time
                          dateTime={post.date}
                          className="text-xs text-white/40"
                        >
                          {new Date(post.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </time>
                      )}
                      {post.tags.length > 0 && (
                        <div className="flex gap-2 flex-wrap" aria-label="Tags">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/50"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
