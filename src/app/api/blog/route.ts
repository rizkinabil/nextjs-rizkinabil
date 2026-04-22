import { createBlogPost, getBlogPosts, getPublishedBlogPosts } from '@/lib/database-service';
import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const admin = searchParams.get('admin') === 'true';

    if (admin) {
      const supabase = await createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

      const posts = await getBlogPosts();
      return NextResponse.json(posts);
    }

    const posts = await getPublishedBlogPosts();
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Blog API GET Error:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const { title, slug, excerpt, content, tags, published } = body;

    if (!title || !slug) {
      return NextResponse.json({ error: 'Title and slug are required' }, { status: 400 });
    }

    const post = await createBlogPost({ title, slug, excerpt, content, tags, published });
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('Blog API POST Error:', error);
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}
