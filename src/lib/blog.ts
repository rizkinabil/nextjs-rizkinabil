import { getBlogPostBySlug, getPublishedBlogPosts } from './database-service';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  tags: string[];
  published: boolean;
  created_at: string;
}

export interface BlogPostWithContent extends BlogPost {
  content: object | null;
}

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const posts = await getPublishedBlogPosts();
    return posts.map((p) => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      tags: p.tags ?? [],
      published: p.published,
      created_at: p.created_at,
    }));
  } catch {
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPostWithContent | null> {
  try {
    const post = await getBlogPostBySlug(slug);
    if (!post || !post.published) return null;
    return {
      id: post.id,
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      tags: post.tags ?? [],
      published: post.published,
      created_at: post.created_at,
      content: post.content as object | null,
    };
  } catch {
    return null;
  }
}
