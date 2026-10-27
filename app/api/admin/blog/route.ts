import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth';
import { getAllBlogPosts } from '@/lib/blogData';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const posts = await getAllBlogPosts();

    // Check if blog_posts table exists
    let hasZwantumSchema = false;
    try {
      const { data, error } = await supabase.from('blog_posts').select('id').limit(1);
      if (!error) {
        hasZwantumSchema = true;
      }
    } catch {
      hasZwantumSchema = false;
    }

    return NextResponse.json({
      posts,
      total: posts.length,
      hasZwantumSchema,
    });
  } catch (err: any) {
    console.error('Error fetching admin blog posts:', err);
    return NextResponse.json(
      { error: err.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
