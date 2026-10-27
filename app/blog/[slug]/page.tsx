import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import { getBlogPostBySlug, getAllBlogPosts, type Studio24Post } from '@/lib/blogData';
import BlogPostReader from '@/components/BlogPostReader';
import {
  Clock,
  Calendar,
  ArrowLeft,
  Share2,
  Bookmark,
  Check,
  ArrowRight,
  MessageCircle,
} from 'lucide-react';
import '@/styles/zwantum-blog.css';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60; // ISR cache revalidation

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Article Not Found | Studio 24 by Shreya',
      description: 'The requested architectural dispatch could not be located.',
    };
  }

  const title = `${post.title} | Studio 24 Perspectives`;
  const description =
    post.excerpt ||
    'Architectural and interior design insights by Studio 24 by Shreya, Lucknow.';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: post.published_at || post.created_at,
      authors: [post.author?.name || 'Shreya'],
      images: post.featured_image?.url
        ? [
            {
              url: post.featured_image.url,
              alt: post.featured_image.alt_text || post.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: post.featured_image?.url ? [post.featured_image.url] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Related posts (from same category, excluding current)
  const allPosts = await getAllBlogPosts();
  const categorySlug = post.categories?.[0]?.slug;
  const relatedPosts = allPosts
    .filter((p) => p.slug !== post.slug && (!categorySlug || p.categories?.[0]?.slug === categorySlug))
    .slice(0, 3);

  // Article JSON-LD Schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.published_at || post.created_at,
    dateModified: post.updated_at || post.created_at,
    author: {
      '@type': 'Person',
      name: post.author?.name || 'Shreya',
      jobTitle: 'Principal Architect & Interior Designer',
      worksFor: {
        '@type': 'Organization',
        name: 'Studio 24 by Shreya',
      },
    },
    publisher: {
      '@type': 'Organization',
      name: 'Studio 24 by Shreya',
      logo: {
        '@type': 'ImageObject',
        url: 'https://staging.studio24byshreya.com/logo.png',
      },
    },
    image: post.featured_image?.url || undefined,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://staging.studio24byshreya.com/blog/${post.slug}`,
    },
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-[#ECE7DE] selection:bg-[#A6A182] selection:text-black font-sans antialiased">
      {/* Structured SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navbar />

      <main className="pt-32 pb-24">
        {/* Breadcrumb & Navigation */}
        {/* Breadcrumb & Navigation */}
        <div className="px-4 sm:px-6 md:px-12 max-w-4xl mx-auto mb-6 sm:mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-400 hover:text-[#A6A182] transition-colors min-h-[44px]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Library
          </Link>
        </div>

        {/* Article Header */}
        <article className="px-4 sm:px-6 md:px-12 max-w-4xl mx-auto">
          <header className="space-y-5 sm:space-y-6 border-b border-white/[0.08] pb-8 sm:pb-10">
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              <span className="px-3 py-1 text-[11px] font-mono uppercase tracking-widest bg-[#A6A182]/10 text-[#A6A182] border border-[#A6A182]/20">
                {post.categories?.[0]?.name || 'Interior Architecture'}
              </span>
              <span className="text-xs font-mono text-zinc-500 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {post.readtime_label || `${post.reading_time || 5} min read`}
              </span>
              <span className="text-xs font-mono text-zinc-500 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {post.published_at ? new Date(post.published_at).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                }) : 'Published'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-light text-white font-serif leading-[1.18] sm:leading-[1.15] tracking-tight">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="text-sm sm:text-lg text-zinc-300 font-sans leading-relaxed">
                {post.excerpt}
              </p>
            )}

            {/* Author Byline & Social Share */}
            <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-4 pt-4 border-t border-white/[0.06]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#18181b] border border-white/10 flex items-center justify-center font-serif text-sm text-[#A6A182]">
                  S
                </div>
                <div>
                  <p className="text-xs font-mono uppercase text-white tracking-wider">
                    {post.author?.name || 'Shreya'}
                  </p>
                  <p className="text-[11px] text-zinc-500 font-sans">
                    Principal Interior Architect, Studio 24
                  </p>
                </div>
              </div>

              {/* Share links with >=44px mobile touch targets */}
              <div className="flex items-center gap-2">
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                    `${post.title} - https://staging.studio24byshreya.com/blog/${post.slug}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center border border-white/10 hover:border-[#A6A182]/50 text-zinc-400 hover:text-[#A6A182] transition-colors"
                  title="Share via WhatsApp"
                  aria-label="Share via WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                    `https://staging.studio24byshreya.com/blog/${post.slug}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center border border-white/10 hover:border-[#A6A182]/50 text-zinc-400 hover:text-[#A6A182] transition-colors"
                  title="Share on LinkedIn"
                  aria-label="Share on LinkedIn"
                >
                  <Share2 className="w-4 h-4" />
                </a>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          {post.featured_image?.url && (
            <div className="my-8 sm:my-10 relative aspect-[16/10] overflow-hidden border border-white/[0.08] bg-zinc-900">
              <img
                src={post.featured_image.url}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Article Body Content */}
          <div className="my-8 sm:my-12">
            <BlogPostReader content={post.content} className="zw-blog-prose" />
          </div>

          {/* Article Footer with Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="pt-6 sm:pt-8 border-t border-white/[0.08] flex items-center gap-2 flex-wrap">
              <span className="text-xs font-mono uppercase text-zinc-500 mr-2">Discipline Tags:</span>
              {post.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="px-2.5 py-1 text-[11px] font-mono text-zinc-300 bg-white/[0.04] border border-white/10"
                >
                  #{tag.name}
                </span>
              ))}
            </div>
          )}

          {/* Consultation CTA Banner */}
          <div className="my-12 sm:my-16 p-6 xs:p-8 sm:p-12 border border-[#A6A182]/30 bg-[#121215] text-center space-y-3.5 sm:space-y-4">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#A6A182]">
              Atelier Consultation
            </span>
            <h3 className="text-xl sm:text-2xl font-serif text-white">
              Seeking architectural design for your home or office?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto font-sans leading-relaxed">
              Book a direct consultation with our principal design team in Lucknow.
              We provide comprehensive 3D visualization, turn-key carpentry, and site management.
            </p>
            <div className="pt-2 flex justify-center">
              <Link
                href="/#consultation-booking"
                className="w-full sm:w-auto min-h-[44px] justify-center inline-flex items-center gap-2 px-6 py-3.5 bg-[#A6A182] text-black font-mono text-xs uppercase tracking-wider font-semibold hover:bg-[#b8b394] transition-colors text-center"
              >
                Book Design Consultation
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </article>

        {/* Related Dispatches */}
        {relatedPosts.length > 0 && (
          <section className="px-4 sm:px-6 md:px-12 max-w-6xl mx-auto mt-16 sm:mt-20 pt-12 sm:pt-16 border-t border-white/[0.08]">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#A6A182]">
                  Further Reading
                </span>
                <h3 className="text-xl sm:text-2xl font-serif text-white mt-1">
                  Related Atelier Dispatches
                </h3>
              </div>
              <Link
                href="/blog"
                className="text-xs font-mono uppercase tracking-wider text-zinc-400 hover:text-white flex items-center gap-1.5"
              >
                All Articles <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((related) => (
                <Link
                  key={related.id}
                  href={`/blog/${related.slug}`}
                  className="group bg-[#121215] border border-white/[0.08] hover:border-[#A6A182]/50 p-6 flex flex-col justify-between transition-all duration-200"
                >
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#A6A182] block mb-2">
                      {related.categories?.[0]?.name || 'Interior'}
                    </span>
                    <h4 className="text-base font-serif text-white group-hover:text-[#A6A182] transition-colors leading-snug line-clamp-2">
                      {related.title}
                    </h4>
                    <p className="text-xs text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
                      {related.excerpt}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-white/[0.06] mt-6 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                    <span>{related.readtime_label || '5 min read'}</span>
                    <span className="text-[#A6A182] group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
