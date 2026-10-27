import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getAllBlogPosts, getBlogCategories } from '@/lib/blogData';
import { Clock, Calendar, ArrowRight, Tag, BookOpen, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Architectural Perspectives & Interior Dispatches | Studio 24 by Shreya',
  description:
    'Essays, technical insights, and design philosophy on luxury residential and commercial architecture, Vastu principles, and bespoke interior transformations in Lucknow.',
  openGraph: {
    title: 'Architectural Perspectives & Interior Dispatches | Studio 24 by Shreya',
    description:
      'Essays, technical insights, and design philosophy on luxury residential and commercial architecture.',
    type: 'website',
  },
};

export const revalidate = 60; // Refresh every 60s for serverless edge caching

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams?: Promise<{ category?: string; q?: string }>;
}) {
  const resolvedParams = searchParams ? await searchParams : {};
  const currentCategory = resolvedParams.category || 'all';
  const query = resolvedParams.q?.toLowerCase() || '';

  const allPosts = await getAllBlogPosts();
  const categories = await getBlogCategories();

  // Filter posts
  const filteredPosts = allPosts.filter((post) => {
    const matchesCategory =
      currentCategory === 'all' ||
      post.categories?.[0]?.slug.toLowerCase() === currentCategory.toLowerCase();

    const matchesQuery =
      !query ||
      post.title.toLowerCase().includes(query) ||
      (post.excerpt && post.excerpt.toLowerCase().includes(query));

    return matchesCategory && matchesQuery;
  });

  const featuredPost = filteredPosts[0];
  const remainingPosts = filteredPosts.slice(1);

  return (
    <div className="min-h-screen bg-[#09090b] text-[#ECE7DE] selection:bg-[#A6A182] selection:text-black font-sans antialiased">
      <Navbar />

      <main className="pt-32 pb-24">
        {/* Header Section */}
        <section className="px-4 sm:px-6 md:px-12 max-w-7xl mx-auto mb-12 sm:mb-16">
          <div className="flex items-center gap-2 mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-[#A6A182]" />
            <span className="text-xs font-mono tracking-widest text-[#A6A182] uppercase">
              The Atelier Library
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/[0.08] pb-8 sm:pb-10">
            <div>
              <h1 className="text-2xl sm:text-5xl lg:text-6xl font-light text-white font-serif tracking-tight leading-[1.15] sm:leading-[1.1]">
                Perspectives &<br />
                <span className="italic font-normal text-[#A6A182]">Architectural</span> Dispatches.
              </h1>
              <p className="mt-3 sm:mt-4 text-xs sm:text-base text-zinc-400 font-sans max-w-2xl leading-relaxed">
                Curated insights into spatial proportion, materiality, Vastu-aligned residential planning,
                and turn-key execution across Lucknow and North India.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-[11px] sm:text-xs font-mono text-zinc-500">
              <span className="px-3 py-1.5 border border-white/10 bg-white/[0.02]">
                {allPosts.length} Published Articles
              </span>
              <span className="px-3 py-1.5 border border-white/10 bg-white/[0.02]">
                ZwantumBlog Engine
              </span>
            </div>
          </div>

          {/* Category Filter Bar */}
          <div className="flex items-center gap-2 overflow-x-auto py-4 sm:py-6 border-b border-white/[0.06] -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none">
            <Link
              href="/blog"
              className={`px-3.5 sm:px-4 py-2 text-xs font-mono uppercase tracking-wider whitespace-nowrap min-h-[36px] flex items-center transition-all duration-200 ${
                currentCategory === 'all'
                  ? 'bg-[#A6A182] text-black font-medium'
                  : 'text-zinc-400 hover:text-white bg-white/[0.02] border border-white/[0.08] hover:border-white/20'
              }`}
            >
              All Dispatches ({allPosts.length})
            </Link>

            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/blog?category=${encodeURIComponent(cat.slug)}`}
                className={`px-3.5 sm:px-4 py-2 text-xs font-mono uppercase tracking-wider whitespace-nowrap min-h-[36px] flex items-center transition-all duration-200 ${
                  currentCategory.toLowerCase() === cat.slug.toLowerCase()
                    ? 'bg-[#A6A182] text-black font-medium'
                    : 'text-zinc-400 hover:text-white bg-white/[0.02] border border-white/[0.08] hover:border-white/20'
                }`}
              >
                {cat.name} ({cat.count})
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Hero Article */}
        {featuredPost && (
          <section className="px-4 sm:px-6 md:px-12 max-w-7xl mx-auto mb-12 sm:mb-16">
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group block relative bg-[#121215] border border-white/[0.08] hover:border-[#A6A182]/50 transition-all duration-300 overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                {/* Image */}
                <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto overflow-hidden bg-zinc-900 min-h-[220px] sm:min-h-[300px]">
                  {featuredPost.featured_image?.url ? (
                    <img
                      src={featuredPost.featured_image.url}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-zinc-900 text-zinc-600 font-mono text-xs">
                      STUDIO 24 ATELIER ARCHIVE
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent lg:hidden" />
                </div>

                {/* Content */}
                <div className="lg:col-span-5 p-5 xs:p-6 sm:p-10 lg:p-12 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider bg-[#A6A182]/10 text-[#A6A182] border border-[#A6A182]/20">
                        {featuredPost.categories?.[0]?.name || 'Featured'}
                      </span>
                      <span className="text-[11px] font-mono text-zinc-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {featuredPost.readtime_label || `${featuredPost.reading_time || 5} min read`}
                      </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif text-white group-hover:text-[#A6A182] transition-colors duration-200 leading-snug">
                      {featuredPost.title}
                    </h2>

                    <p className="mt-4 text-xs sm:text-sm text-zinc-400 font-sans line-clamp-3 leading-relaxed">
                      {featuredPost.excerpt}
                    </p>
                  </div>

                  <div className="pt-8 border-t border-white/[0.08] mt-8 flex items-center justify-between">
                    <span className="text-xs font-mono text-zinc-500">
                      By {featuredPost.author?.name || 'Shreya (Principal Designer)'}
                    </span>
                    <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#A6A182] group-hover:translate-x-1 transition-transform duration-200">
                      Read Dispatch <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* Remaining Articles Grid */}
        <section className="px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
          {remainingPosts.length === 0 ? (
            <div className="text-center py-12 sm:py-16 border border-white/[0.08] bg-[#121215] px-4">
              <BookOpen className="w-8 h-8 text-zinc-600 mx-auto mb-3" />
              <p className="text-sm font-serif text-zinc-300">No additional articles found.</p>
              <p className="text-xs font-mono text-zinc-500 mt-1">
                Try selecting another category above.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {remainingPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col bg-[#121215] border border-white/[0.08] hover:border-[#A6A182]/50 transition-all duration-300 overflow-hidden"
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-zinc-900">
                    {post.featured_image?.url ? (
                      <img
                        src={post.featured_image.url}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-zinc-900 text-zinc-600 font-mono text-xs">
                        STUDIO 24
                      </div>
                    )}
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider bg-black/80 backdrop-blur-sm text-zinc-300 border border-white/10">
                        {post.categories?.[0]?.name || 'Interior'}
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500 mb-2">
                        <span>{post.readtime_label || `${post.reading_time || 5} min read`}</span>
                        <span>•</span>
                        <span>
                          {post.published_at ? new Date(post.published_at).toLocaleDateString() : 'Dispatch'}
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-serif text-white group-hover:text-[#A6A182] transition-colors duration-200 leading-snug line-clamp-2">
                        {post.title}
                      </h3>

                      <p className="mt-2 text-xs text-zinc-400 font-sans line-clamp-2 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/[0.06] mt-6 flex items-center justify-between">
                      <span className="text-[11px] font-mono text-zinc-500 truncate max-w-[150px]">
                        {post.author?.name || 'Shreya'}
                      </span>
                      <span className="text-xs font-mono uppercase text-[#A6A182] flex items-center gap-1 group-hover:translate-x-1 transition-transform duration-200">
                        Read <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Private Consultation CTA */}
        <section className="px-4 sm:px-6 md:px-12 max-w-7xl mx-auto mt-16 sm:mt-24">
          <div className="relative border border-white/[0.1] bg-gradient-to-b from-[#141418] to-[#0d0d10] p-6 xs:p-8 sm:p-14 text-center overflow-hidden">
            <div className="max-w-2xl mx-auto relative z-10 space-y-3.5 sm:space-y-4">
              <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-[#A6A182] uppercase">
                Direct Atelier Engagement
              </span>
              <h2 className="text-xl sm:text-3xl md:text-4xl font-light font-serif text-white leading-snug">
                Ready to translate architectural clarity into your own home?
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
                Schedule a 45-minute private design consultation with Shreya at our Gomti Nagar atelier.
                We evaluate floor plans, material selections, and budgetary feasibility.
              </p>
              <div className="pt-3 sm:pt-4 flex justify-center">
                <Link
                  href="/#consultation-booking"
                  className="w-full sm:w-auto min-h-[44px] justify-center inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 bg-[#A6A182] text-black font-mono text-xs uppercase tracking-widest font-semibold hover:bg-[#b8b394] transition-all duration-200 shadow-lg text-center"
                >
                  Schedule Private Consultation
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
