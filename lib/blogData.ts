import { blogClient } from './blogClient';
import { supabase } from './supabase';
import { unstable_cache } from 'next/cache';
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

export interface PaginatedPostsResult {
  posts: Studio24Post[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasMore: boolean;
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

// ---------------------------------------------------------------------------
// In-Memory Fast Cache (guarantees <1ms responses across requests & dev mode)
// ---------------------------------------------------------------------------
const memoryCache = new Map<string, { data: any; expiresAt: number }>();
const DEFAULT_TTL_MS = 60 * 1000; // 60 seconds

function getFromMemoryCache<T>(key: string): T | null {
  const item = memoryCache.get(key);
  if (item && item.expiresAt > Date.now()) {
    return item.data as T;
  }
  return null;
}

function setMemoryCache<T>(key: string, data: T, ttlMs = DEFAULT_TTL_MS): void {
  memoryCache.set(key, { data, expiresAt: Date.now() + ttlMs });
}

// ---------------------------------------------------------------------------
// Schema Check Cache (Only uses zwantum blog_posts if table exists AND has rows)
// ---------------------------------------------------------------------------
let zwantumSchemaState: boolean | null = null;
let lastZwantumCheck = 0;
const SCHEMA_CHECK_TTL = 5 * 60 * 1000; // 5 minutes

async function isZwantumSchemaAvailable(): Promise<boolean> {
  const now = Date.now();
  if (zwantumSchemaState !== null && now - lastZwantumCheck < SCHEMA_CHECK_TTL) {
    return zwantumSchemaState;
  }
  try {
    const { data, error } = await supabase.from('blog_posts').select('id').limit(1);
    // ONLY consider active if it actually contains rows to prevent failing 6-table join waterfall
    zwantumSchemaState = !error && Array.isArray(data) && data.length > 0;
  } catch {
    zwantumSchemaState = false;
  }
  lastZwantumCheck = now;
  return zwantumSchemaState;
}

// ---------------------------------------------------------------------------
// Homepage Cards Getter (Pulls ONLY 3 latest rows with ONLY card fields)
// ---------------------------------------------------------------------------
async function fetchHomepageBlogPostsFromDb(limit = 3): Promise<Studio24Post[]> {
  const cacheKey = `homepage_posts_${limit}`;
  const cached = getFromMemoryCache<Studio24Post[]>(cacheKey);
  if (cached) return cached;

  try {
    // Only select minimal fields needed for the 3 homepage cards (NO heavy content body)
    const { data, error } = await supabase
      .from('posts')
      .select('id, title, slug, excerpt, image, author, category, date, readtime')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error || !data) return [];
    const posts = data.map(normalizeLegacyPost);
    setMemoryCache(cacheKey, posts, 5 * 60 * 1000); // 5 min cache
    return posts;
  } catch (err) {
    console.error('Failed to load homepage posts:', err);
    return [];
  }
}

export async function getHomepageBlogPosts(limit = 3): Promise<Studio24Post[]> {
  const getCached = unstable_cache(
    () => fetchHomepageBlogPostsFromDb(limit),
    [`studio24-homepage-posts-${limit}`],
    {
      revalidate: 300,
      tags: ['blog-posts', 'homepage-posts'],
    }
  );
  return getCached();
}

// ---------------------------------------------------------------------------
// Database-Level Paginated Query (Only requested page, NO large content)
// ---------------------------------------------------------------------------
export async function getPaginatedBlogPosts({
  page = 1,
  limit = 6,
  category = 'all',
  query = '',
}: {
  page?: number;
  limit?: number;
  category?: string;
  query?: string;
} = {}): Promise<PaginatedPostsResult> {
  const cacheKey = `paginated_p${page}_l${limit}_c${category.toLowerCase()}_q${query.toLowerCase()}`;
  const cached = getFromMemoryCache<PaginatedPostsResult>(cacheKey);
  if (cached) return cached;

  const hasZwantum = await isZwantumSchemaAvailable();

  if (hasZwantum) {
    try {
      const zwPosts = await blogClient.posts.list({
        status: 'published',
        page,
        limit,
        search: query || undefined,
      });
      if (zwPosts && zwPosts.data && zwPosts.data.length > 0) {
        const result: PaginatedPostsResult = {
          posts: zwPosts.data as unknown as Studio24Post[],
          total: zwPosts.total || zwPosts.data.length,
          page,
          limit,
          totalPages: zwPosts.totalPages || Math.ceil((zwPosts.total || zwPosts.data.length) / limit),
          hasMore: page < (zwPosts.totalPages || 1),
        };
        setMemoryCache(cacheKey, result);
        return result;
      }
    } catch (err) {
      // Fall through to legacy posts table
    }
  }

  // Legacy Supabase `posts` table with DATABASE-LEVEL LIMIT & OFFSET
  try {
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    // Fast selective query: EXCLUDES the large `content` field
    let dbQuery = supabase
      .from('posts')
      .select('id, title, slug, excerpt, image, author, category, tags, date, created_at, readtime', {
        count: 'exact',
      })
      .order('created_at', { ascending: false });

    // Category filter pushed down to PostgreSQL (matches both slug & raw title)
    if (category && category !== 'all') {
      const cleanCat = category.replace(/-/g, ' ').trim();
      dbQuery = dbQuery.or(`category.ilike.%${cleanCat}%,category.ilike.%${category}%`);
    }

    // Search query pushed down to PostgreSQL
    if (query) {
      dbQuery = dbQuery.or(`title.ilike.%${query}%,excerpt.ilike.%${query}%`);
    }

    // LIMIT & OFFSET via range
    dbQuery = dbQuery.range(from, to);

    const { data, count, error } = await dbQuery;
    if (error || !data) {
      console.error('Error fetching paginated posts:', error);
      return { posts: [], total: 0, page, limit, totalPages: 1, hasMore: false };
    }

    const posts = data.map(normalizeLegacyPost);
    const total = count || 0;
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const result: PaginatedPostsResult = {
      posts,
      total,
      page,
      limit,
      totalPages,
      hasMore: page < totalPages,
    };

    setMemoryCache(cacheKey, result);
    return result;
  } catch (err) {
    console.error('Failed to query paginated posts:', err);
    return { posts: [], total: 0, page, limit, totalPages: 1, hasMore: false };
  }
}

// ---------------------------------------------------------------------------
// Distinct Categories Getter (Pulls ONLY category column, ~100 bytes)
// ---------------------------------------------------------------------------
export async function getBlogCategories(
  providedPosts?: Studio24Post[]
): Promise<{ name: string; slug: string; count: number }[]> {
  const cacheKey = 'blog_categories_list';
  if (!providedPosts) {
    const cached = getFromMemoryCache<{ name: string; slug: string; count: number }[]>(cacheKey);
    if (cached) return cached;
  }

  const categoryMap = new Map<string, { name: string; slug: string; count: number }>();

  if (providedPosts && providedPosts.length > 0) {
    for (const post of providedPosts) {
      const cat = post.categories?.[0];
      const name = cat?.name || 'Architecture & Interiors';
      const slug = cat?.slug || 'architecture-interiors';
      if (categoryMap.has(slug)) {
        categoryMap.get(slug)!.count += 1;
      } else {
        categoryMap.set(slug, { name, slug, count: 1 });
      }
    }
  } else {
    try {
      // Extremely lightweight query: only downloads the `category` text column
      const { data, error } = await supabase.from('posts').select('category');
      if (!error && data) {
        for (const row of data) {
          const catName = (row.category || 'Architecture & Interiors').trim();
          const slug = catName.toLowerCase().replace(/\s+/g, '-');
          if (categoryMap.has(slug)) {
            categoryMap.get(slug)!.count += 1;
          } else {
            categoryMap.set(slug, { name: catName, slug, count: 1 });
          }
        }
      }
    } catch (err) {
      console.error('Failed to fetch category counts:', err);
    }
  }

  const list = Array.from(categoryMap.values()).sort((a, b) => b.count - a.count);
  setMemoryCache(cacheKey, list, 5 * 60 * 1000); // Cache categories for 5 mins
  return list;
}

// ---------------------------------------------------------------------------
// All Posts Getter (Maintained for RSS, Sitemap & Admin)
// ---------------------------------------------------------------------------
async function fetchAllBlogPostsFromDb(): Promise<Studio24Post[]> {
  const cacheKey = 'all_blog_posts_full';
  const cached = getFromMemoryCache<Studio24Post[]>(cacheKey);
  if (cached) return cached;

  const hasZwantum = await isZwantumSchemaAvailable();

  if (hasZwantum) {
    try {
      const zwPosts = await blogClient.posts.list({
        status: 'published',
        limit: 100,
      });
      if (zwPosts && zwPosts.data && zwPosts.data.length > 0) {
        const posts = zwPosts.data as unknown as Studio24Post[];
        setMemoryCache(cacheKey, posts);
        return posts;
      }
    } catch (err) {
      // Continue to legacy fallback
    }
  }

  try {
    const { data, error } = await supabase
      .from('posts')
      .select('id, title, slug, excerpt, image, author, category, tags, date, created_at, readtime')
      .order('created_at', { ascending: false });

    if (error || !data) {
      return [];
    }

    const posts = data.map(normalizeLegacyPost);
    setMemoryCache(cacheKey, posts);
    return posts;
  } catch (err) {
    console.error('Failed to load all posts:', err);
    return [];
  }
}

export const getAllBlogPosts = unstable_cache(
  fetchAllBlogPostsFromDb,
  ['studio24-all-blog-posts'],
  {
    revalidate: 60,
    tags: ['blog-posts'],
  }
);

// ---------------------------------------------------------------------------
// Single Post Getter (With full content for reader page)
// ---------------------------------------------------------------------------
async function fetchBlogPostBySlugFromDb(slug: string): Promise<Studio24Post | null> {
  const cacheKey = `single_post_${slug}`;
  const cached = getFromMemoryCache<Studio24Post>(cacheKey);
  if (cached) return cached;

  const hasZwantum = await isZwantumSchemaAvailable();

  if (hasZwantum) {
    try {
      const zwPost = await blogClient.posts.getBySlug(slug);
      if (zwPost) {
        const post = zwPost as Studio24Post;
        setMemoryCache(cacheKey, post);
        return post;
      }
    } catch (err) {
      // Continue to fallback
    }
  }

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

    const post = normalizeLegacyPost(data);
    setMemoryCache(cacheKey, post);
    return post;
  } catch (err) {
    console.error('Failed to load post by slug:', slug, err);
    return null;
  }
}

export async function getBlogPostBySlug(slug: string): Promise<Studio24Post | null> {
  const getCachedPost = unstable_cache(
    () => fetchBlogPostBySlugFromDb(slug),
    [`studio24-blog-post-${slug}`],
    {
      revalidate: 60,
      tags: ['blog-posts', `blog-post-${slug}`],
    }
  );
  return getCachedPost();
}
