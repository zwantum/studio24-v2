import { NextResponse } from 'next/server';
import { getAllBlogPosts } from '@/lib/blogData';

export async function GET() {
  const posts = await getAllBlogPosts();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://staging.studio24byshreya.com';

  const sitemapItems = posts
    .map((post) => {
      const lastMod = post.updated_at || post.created_at || new Date().toISOString();
      return `
  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${new Date(lastMod).toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
    })
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/blog</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  ${sitemapItems}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}
