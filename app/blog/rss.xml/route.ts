import { NextResponse } from 'next/server';
import { getAllBlogPosts } from '@/lib/blogData';

export async function GET() {
  const posts = await getAllBlogPosts();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://staging.studio24byshreya.com';

  const rssItems = posts
    .map((post) => {
      const pubDate = post.published_at ? new Date(post.published_at).toUTCString() : new Date().toUTCString();
      const cleanExcerpt = (post.excerpt || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
      const cleanTitle = post.title
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

      return `
    <item>
      <title>${cleanTitle}</title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid>${baseUrl}/blog/${post.slug}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${cleanExcerpt}</description>
      <author>${post.author?.name || 'Shreya'}</author>
    </item>`;
    })
    .join('');

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Studio 24 Architectural Perspectives &amp; Dispatches</title>
    <link>${baseUrl}/blog</link>
    <description>Curated essays on luxury interior architecture, Vastu principles, and turn-key execution in Lucknow.</description>
    <language>en</language>
    <atom:link href="${baseUrl}/blog/rss.xml" rel="self" type="application/rss+xml" />
    ${rssItems}
  </channel>
</rss>`;

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}
