import { NextRequest, NextResponse } from 'next/server';
import { getPaginatedBlogPosts } from '@/lib/blogData';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10) || 1);
  const limit = Math.min(24, Math.max(1, parseInt(searchParams.get('limit') || '6', 10) || 6));
  const category = searchParams.get('category') || 'all';
  const query = searchParams.get('q') || '';

  try {
    const result = await getPaginatedBlogPosts({
      page,
      limit,
      category,
      query,
    });

    return NextResponse.json(result, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    });
  } catch (err: any) {
    console.error('Error in /api/blog:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

