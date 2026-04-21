import { GiscusComments } from '@/components/GiscusComments';
import { Footer } from '@/sections/Footer';
import { Header } from '@/sections/Header';
import { getAllPosts, getPostBySlug } from '@/lib/blog';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return {};

  return {
    title: `${post.title} | Rizki Nabil Aufa`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
    },
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />

      <article className="pt-32 pb-24 px-4">
        <div className="container max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors mb-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to blog
          </Link>

          <header className="mb-12 space-y-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif text-white leading-tight">
              {post.title}
            </h1>

            <div className="flex items-center gap-4 flex-wrap">
              {post.date && (
                <time dateTime={post.date} className="text-sm text-white/40">
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
                      className="text-xs px-2 py-0.5 rounded-full bg-emerald-400/10 border border-emerald-400/20 text-emerald-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </header>

          <div className="prose prose-invert prose-emerald max-w-none prose-headings:font-serif prose-a:text-emerald-400 prose-a:no-underline hover:prose-a:underline prose-code:text-emerald-300 prose-pre:bg-gray-950 prose-pre:border prose-pre:border-gray-800">
            <MDXRemote source={post.content} />
          </div>

          <GiscusComments />
        </div>
      </article>

      <Footer />
    </div>
  );
}
