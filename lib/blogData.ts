import { blogClient } from './blogClient';
import { supabase } from './supabase';
import type { Post } from '@zwantum/blog/types';

export interface Studio24Post {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  content: any;
  content_html?: string | null;
  featured_image?: {
    id?: string;
    url: string;
    alt_text?: string;
    filename?: string;
    original_name?: string;
    mime_type?: string;
    file_size?: number;
    storage_provider?: string;
    storage_path?: string;
    created_at?: string;
    updated_at?: string;
  } | null;
  author?: {
    id?: string;
    name: string;
    slug?: string;
    email?: string;
    bio?: string;
    avatar_url?: string;
    is_active?: boolean;
    created_at?: string;
    updated_at?: string;
  } | null;
  categories?: {
    id: string;
    name: string;
    slug: string;
    display_order?: number;
    is_active?: boolean;
    post_count?: number;
    created_at?: string;
    updated_at?: string;
  }[];
  tags?: {
    id: string;
    name: string;
    slug: string;
  }[];
  status?: string;
  reading_time?: number;
  readtime_label?: string;
  published_at?: string | null;
  created_at?: string;
  updated_at?: string;
}

export function normalizeLegacyPost(row: any): Studio24Post {
  const catName = (row.category || 'Architecture & Interiors').trim();
  const tagsList = Array.isArray(row.tags) ? row.tags : [];

  return {
    id: row.id,
    title: row.title || 'Untitled Article',
    slug: row.slug || row.id,
    content: row.content || '',
    excerpt: row.excerpt || (row.content ? row.content.replace(/<[^>]*>/g, '').slice(0, 160) + '...' : ''),
    status: 'published',
    featured_image: row.image
      ? {
          url: row.image,
          alt_text: row.title,
        }
      : null,
    author: {
      name: row.author || 'Shreya (Principal Designer)',
    },
    categories: [
      {
        id: catName.toLowerCase().replace(/\s+/g, '-'),
        name: catName,
        slug: catName.toLowerCase().replace(/\s+/g, '-'),
      },
    ],
    tags: tagsList.map((t: string, idx: number) => ({
      id: String(idx + 1),
      name: t,
      slug: t.toLowerCase().replace(/\s+/g, '-'),
    })),
    published_at: row.date || row.created_at,
    created_at: row.created_at || new Date().toISOString(),
    updated_at: row.created_at || new Date().toISOString(),
    reading_time: parseInt(row.readtime) || 5,
    readtime_label: row.readtime || '5 min read',
  };
}

export async function getAllBlogPosts(): Promise<Studio24Post[]> {
  try {
    // 1. Try ZwantumBlog client
    const zwPosts = await blogClient.posts.list({
      status: 'published',
      limit: 100,
    });
    if (zwPosts && zwPosts.data && zwPosts.data.length > 0) {
      return zwPosts.data as unknown as Studio24Post[];
    }
  } catch (err) {
    // Schema table may not be migrated yet or in transition
    // Continue to legacy posts table fallback
  }

  // 2. Query legacy Supabase `posts` table
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data) {
      return [];
    }

    return data.map(normalizeLegacyPost);
  } catch (err) {
    console.error('Failed to load posts:', err);
    return [];
  }
}

export async function getBlogPostBySlug(slug: string): Promise<Studio24Post | null> {
  try {
    // 1. Try ZwantumBlog client
    const zwPost = await blogClient.posts.getBySlug(slug);
    if (zwPost) {
      return zwPost as Studio24Post;
    }
  } catch (err) {
    // Schema table may not be migrated yet
  }

  // 2. Query legacy Supabase `posts` table
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .limit(1)
      .maybeSingle();

    if (error || !data) {
      return null;
    }

    return normalizeLegacyPost(data);
  } catch (err) {
    console.error('Failed to load post by slug:', slug, err);
    return null;
  }
}

export async function getBlogCategories(): Promise<{ name: string; slug: string; count: number }[]> {
  const posts = await getAllBlogPosts();
  const categoryMap = new Map<string, { name: string; slug: string; count: number }>();

  for (const post of posts) {
    const cat = post.categories?.[0];
    const name = cat?.name || 'Architecture & Interiors';
    const slug = cat?.slug || 'architecture-interiors';

    if (categoryMap.has(slug)) {
      categoryMap.get(slug)!.count += 1;
    } else {
      categoryMap.set(slug, { name, slug, count: 1 });
    }
  }

  return Array.from(categoryMap.values()).sort((a, b) => b.count - a.count);
}
