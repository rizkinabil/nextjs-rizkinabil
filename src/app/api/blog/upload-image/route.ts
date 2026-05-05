import { supabaseAdmin } from '@/config/supabase';
import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

const BUCKET = 'blog-images';
const MAX_SIZE = 1 * 1024 * 1024; // 1MB for each photo upload

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    if (!file.type.startsWith('image/')) return NextResponse.json({ error: 'File must be an image' }, { status: 400 });
    if (file.size > MAX_SIZE) return NextResponse.json({ error: 'File too large (max 1MB)' }, { status: 400 });

    const ext = file.name.split('.').pop() ?? 'jpg';
    const filePath = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { error: uploadError } = await supabaseAdmin.storage
      .from(BUCKET)
      .upload(filePath, file, { contentType: file.type });

    if (uploadError) throw uploadError;

    const {
      data: { publicUrl },
    } = supabaseAdmin.storage.from(BUCKET).getPublicUrl(filePath);

    return NextResponse.json({ url: publicUrl });
  } catch (error) {
    console.error('Image upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
