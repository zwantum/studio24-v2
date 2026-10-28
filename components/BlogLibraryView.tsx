'use client';

import React, { useState, useMemo, useEffect, useTransition } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Studio24Post } from '@/lib/blogData';
import { Clock, ArrowRight, ArrowLeft, BookOpen, Loader2 } from 'lucide-react';

interface BlogCategory {
  name: string;
  slug: string;
  count: number;
}

interface BlogLibraryViewProps {
  allPosts: Studio24Post[];
  categories: BlogCategory[];
  initialCategory?: string;
  initialQuery?: string;
  initialPage?: number;
}

const POSTS_PER_PAGE = 6;

// ---------------------------------------------------------------------------
// 1. Progressive Image Component with Luxury Shimmer Skeleton & Fade-In
// ---------------------------------------------------------------------------
function ProgressiveBlogImage({
  src,
  alt,
  fill = false,
  priority = false,
  sizes,
  className = '',
}: {
  src: string;
  alt: string;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // External images (Supabase, Unsplash, etc.) load directly from CDN (unoptimized)
  // to avoid Next.js image-optimizer 400 errors and server-side transcoding latency
  const isExternal = src.startsWith('http://') || src.startsWith('https://');

  return (
    <div className="relative w-full h-full overflow-hidden bg-zinc-950">
      {/* Shimmer Skeleton Placeholder */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-zinc-900 via-zinc-800/70 to-zinc-900 animate-pulse" />
      )}

      {hasError ? (
        <div className="w-full h-full flex items-center justify-center bg-zinc-900 text-zinc-600 font-mono text-xs">
          STUDIO 24 ATELIER
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill={fill}
          priority={priority}
          sizes={sizes}
          unoptimized={isExternal}
          onLoad={() => setIsLoaded(true)}
          onError={(e) => {
            console.error('Failed to load image:', src, e);
            setHasError(true);
          }}
          className={`${className} transition-opacity duration-500 ease-out ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// 2. Luxury Hero Article Skeleton
// ---------------------------------------------------------------------------
function BlogHeroSkeleton() {
  return (
    <div className="mb-12 sm:mb-16 bg-[#121215] border border-white/[0.08] overflow-hidden animate-pulse">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto min-h-[220px] sm:min-h-[300px] bg-zinc-900 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-800/60 to-zinc-900" />
        </div>
        <div className="lg:col-span-5 p-5 xs:p-6 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="h-4 w-24 bg-[#A6A182]/20 rounded" />
            <div className="h-8 sm:h-10 w-11/12 bg-white/[0.08] rounded" />
            <div className="h-8 sm:h-10 w-3/4 bg-white/[0.08] rounded" />
            <div className="space-y-2 pt-2">
              <div className="h-3.5 w-full bg-white/[0.04] rounded" />
              <div className="h-3.5 w-5/6 bg-white/[0.04] rounded" />
              <div className="h-3.5 w-2/3 bg-white/[0.04] rounded" />
            </div>
          </div>
          <div className="pt-8 border-t border-white/[0.08] flex items-center justify-between">
            <div className="h-3 w-32 bg-white/[0.05] rounded" />
            <div className="h-3 w-24 bg-[#A6A182]/20 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 3. Luxury Grid Card Skeleton
// ---------------------------------------------------------------------------
function BlogCardSkeleton() {
  return (
    <div className="flex flex-col bg-[#121215] border border-white/[0.08] overflow-hidden animate-pulse">
      <div className="relative aspect-[16/10] overflow-hidden bg-zinc-900">
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-800/60 to-zinc-900" />
        <div className="absolute top-3 left-3">
          <div className="h-4 w-16 bg-white/[0.08] rounded" />
        </div>
      </div>
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="h-3 w-16 bg-white/[0.05] rounded" />
            <div className="h-3 w-3 bg-white/[0.05] rounded-full" />
            <div className="h-3 w-20 bg-white/[0.05] rounded" />
          </div>
          <div className="h-5 w-4/5 bg-white/[0.08] rounded" />
          <div className="h-5 w-3/5 bg-white/[0.08] rounded" />
          <div className="space-y-1.5 pt-1">
            <div className="h-3 w-full bg-white/[0.04] rounded" />
            <div className="h-3 w-5/6 bg-white/[0.04] rounded" />
          </div>
        </div>
        <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
          <div className="h-3 w-24 bg-white/[0.05] rounded" />
          <div className="h-3 w-14 bg-[#A6A182]/20 rounded" />
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 4. Main Interactive Blog Library View
// ---------------------------------------------------------------------------
export default function BlogLibraryView({
  allPosts,
  categories,
  initialCategory = 'all',
  initialQuery = '',
  initialPage = 1,
}: BlogLibraryViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [visibleCount, setVisibleCount] = useState<number>(POSTS_PER_PAGE);

  // Switching state for tactile spinner & skeleton response
  const [isSwitchingCategory, setIsSwitchingCategory] = useState(false);
  const [switchingTargetSlug, setSwitchingTargetSlug] = useState<string | null>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Synchronize with URL search params on client mount and browser back/forward buttons
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const syncFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      const cat = params.get('category');
      const q = params.get('q');
      const pageStr = params.get('page');
      const p = pageStr ? parseInt(pageStr, 10) : 1;

      if (cat) {
        setSelectedCategory(cat);
      } else if (!initialCategory || initialCategory === 'all') {
        setSelectedCategory('all');
      }

      if (q !== null) {
        setSearchQuery(q);
      }

      if (!isNaN(p) && p >= 1) {
        setCurrentPage(p);
      }
    };

    syncFromUrl();

    window.addEventListener('popstate', syncFromUrl);
    return () => window.removeEventListener('popstate', syncFromUrl);
  }, [initialCategory]);

  // Instant in-memory filtering algorithm (0ms execution time)
  const filteredPosts = useMemo(() => {
    const cat = selectedCategory.toLowerCase().trim();
    const q = searchQuery.toLowerCase().trim();

    return allPosts.filter((post) => {
      // 1. Category Matching
      let matchesCat = cat === 'all';
      if (!matchesCat) {
        const postCat = post.categories?.[0];
        if (postCat) {
          const rawCatName = (postCat.name || '').toLowerCase();
          const rawCatSlug = (postCat.slug || '').toLowerCase();
          const targetClean = cat.replace(/-/g, ' ');

          matchesCat =
            rawCatSlug === cat ||
            rawCatName === targetClean ||
            rawCatSlug.includes(cat) ||
            rawCatName.includes(targetClean) ||
            targetClean.includes(rawCatName);
        }
      }

      // 2. Query Matching
      const matchesQ =
        !q ||
        post.title.toLowerCase().includes(q) ||
        (post.excerpt ? post.excerpt.toLowerCase().includes(q) : false);

      return matchesCat && matchesQ;
    });
  }, [allPosts, selectedCategory, searchQuery]);

  // Featured Hero post is always the 1st match
  const featuredPost = filteredPosts[0];
  const remainingPosts = filteredPosts.slice(1);

  // Pagination metrics
  const totalRemaining = remainingPosts.length;
  const totalPages = Math.max(1, Math.ceil(totalRemaining / POSTS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);

  // Current page posts
  const startIndex = (safePage - 1) * POSTS_PER_PAGE;
  const paginatedGridPosts = remainingPosts.slice(
    startIndex,
    Math.min(startIndex + visibleCount, totalRemaining)
  );

  const hasMoreInPage = startIndex + visibleCount < totalRemaining;

  // Ultra-responsive category switch handler with instant spinner & skeleton feedback
  const handleCategorySelect = (categorySlug: string) => {
    if (categorySlug === selectedCategory && !isSwitchingCategory) return;

    setSwitchingTargetSlug(categorySlug);
    setIsSwitchingCategory(true);

    startTransition(() => {
      setSelectedCategory(categorySlug);
      setCurrentPage(1);
      setVisibleCount(POSTS_PER_PAGE);

      // Shallow update browser URL without making a server request
      if (typeof window !== 'undefined') {
        const url = new URL(window.location.href);
        if (categorySlug === 'all') {
          url.searchParams.delete('category');
        } else {
          url.searchParams.set('category', categorySlug);
        }
        url.searchParams.delete('page');
        window.history.replaceState({}, '', url.toString());
      }

      // Micro-transition (140ms) gives instant visual acknowledgment without blocking
      setTimeout(() => {
        setIsSwitchingCategory(false);
        setSwitchingTargetSlug(null);
      }, 140);
    });
  };

  // Instant page change handler (with quick smooth scroll to top of dispatches)
  const handlePageChange = (pageNum: number) => {
    setIsSwitchingCategory(true);

    startTransition(() => {
      setCurrentPage(pageNum);
      setVisibleCount(POSTS_PER_PAGE);

      if (typeof window !== 'undefined') {
        const url = new URL(window.location.href);
        if (pageNum > 1) {
          url.searchParams.set('page', String(pageNum));
        } else {
          url.searchParams.delete('page');
        }
        window.history.replaceState({}, '', url.toString());
      }

      setTimeout(() => {
        setIsSwitchingCategory(false);
      }, 120);
    });
  };

  // Smooth Load More handler with tactile spinner
  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + POSTS_PER_PAGE);
      setIsLoadingMore(false);
    }, 180);
  };

  return (
    <div>
      {/* Category Filter Pills Bar with Instant Micro-Spinners */}
      <div className="flex items-center gap-2 overflow-x-auto py-4 sm:py-6 border-b border-white/[0.06] -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none mb-12 sm:mb-16">
        {/* All Dispatches Button */}
        <button
          type="button"
          onClick={() => handleCategorySelect('all')}
          className={`px-3.5 sm:px-4 py-2 text-xs font-mono uppercase tracking-wider whitespace-nowrap min-h-[36px] flex items-center gap-2 transition-all duration-150 cursor-pointer ${
            selectedCategory === 'all'
              ? 'bg-[#A6A182] text-black font-semibold shadow-[0_2px_12px_rgba(166,161,130,0.3)]'
              : 'text-zinc-400 hover:text-white bg-white/[0.02] border border-white/[0.08] hover:border-white/20'
          }`}
        >
          {isSwitchingCategory && switchingTargetSlug === 'all' ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin text-black" />
          ) : (
            selectedCategory === 'all' && (
              <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0" />
            )
          )}
          <span>All Dispatches ({allPosts.length})</span>
        </button>

        {/* Dynamic Category Buttons */}
        {categories.map((cat) => {
          const isSelected =
            selectedCategory.toLowerCase() === cat.slug.toLowerCase() ||
            selectedCategory.toLowerCase().replace(/-/g, ' ') === cat.name.toLowerCase();
          const isTarget = switchingTargetSlug === cat.slug;

          return (
            <button
              key={cat.slug}
              type="button"
              onClick={() => handleCategorySelect(cat.slug)}
              className={`px-3.5 sm:px-4 py-2 text-xs font-mono uppercase tracking-wider whitespace-nowrap min-h-[36px] flex items-center gap-2 transition-all duration-150 cursor-pointer ${
                isSelected
                  ? 'bg-[#A6A182] text-black font-semibold shadow-[0_2px_12px_rgba(166,161,130,0.3)]'
                  : 'text-zinc-400 hover:text-white bg-white/[0.02] border border-white/[0.08] hover:border-white/20'
              }`}
            >
              {isSwitchingCategory && isTarget ? (
                <Loader2 className={`w-3.5 h-3.5 animate-spin ${isSelected ? 'text-black' : 'text-[#A6A182]'}`} />
              ) : (
                isSelected && <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0" />
              )}
              <span>
                {cat.name} ({cat.count})
              </span>
            </button>
          );
        })}
      </div>

      {/* SKELETON DISPLAY WHILE SWITCHING TABS */}
      {isSwitchingCategory ? (
        <div className="space-y-12 sm:space-y-16 animate-in fade-in-50 duration-150">
          <BlogHeroSkeleton />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <BlogCardSkeleton key={i} />
            ))}
          </div>
        </div>
      ) : (
        <>
          {/* Featured Hero Article with Progressive Image */}
          {featuredPost && (
            <section className="mb-12 sm:mb-16 animate-in fade-in-50 duration-200">
              <Link
                href={`/blog/${featuredPost.slug}`}
                prefetch={true}
                className="group block relative bg-[#121215] border border-white/[0.08] hover:border-[#A6A182]/50 transition-all duration-300 overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                  {/* Hero Image */}
                  <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto overflow-hidden bg-zinc-900 min-h-[220px] sm:min-h-[300px]">
                    {featuredPost.featured_image?.url ? (
                      <ProgressiveBlogImage
                        src={featuredPost.featured_image.url}
                        alt={featuredPost.title}
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 58vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-zinc-900 text-zinc-600 font-mono text-xs">
                        STUDIO 24 ATELIER ARCHIVE
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent lg:hidden pointer-events-none" />
                  </div>

                  {/* Hero Content */}
                  <div className="lg:col-span-5 p-5 xs:p-6 sm:p-10 lg:p-12 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <span className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider bg-[#A6A182]/10 text-[#A6A182] border border-[#A6A182]/20">
                          {featuredPost.categories?.[0]?.name || 'Featured'}
                        </span>
                        <span className="text-[11px] font-mono text-zinc-500">
                          {featuredPost.published_at
                            ? new Date(featuredPost.published_at).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              })
                            : 'Dispatch'}
                        </span>
                        <span className="text-[11px] font-mono text-zinc-500 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-[#A6A182]" />
                          {featuredPost.readtime_label || `${featuredPost.reading_time || 5} min read`}
                        </span>
                      </div>

                      <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif text-white group-hover:text-[#A6A182] transition-colors duration-200 leading-tight">
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

          {/* Grid of Remaining Articles */}
          <section>
            {filteredPosts.length === 0 ? (
              <div className="text-center py-12 sm:py-16 border border-white/[0.08] bg-[#121215] px-4">
                <BookOpen className="w-8 h-8 text-zinc-600 mx-auto mb-3" />
                <p className="text-sm font-serif text-zinc-300">No dispatches found in this category.</p>
                <button
                  type="button"
                  onClick={() => handleCategorySelect('all')}
                  className="mt-4 px-4 py-2 text-xs font-mono uppercase tracking-wider bg-[#A6A182] text-black font-semibold hover:bg-[#b8b394] transition-colors cursor-pointer"
                >
                  View All Dispatches
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {paginatedGridPosts.map((post) => (
                    <Link
                      key={post.id}
                      href={`/blog/${post.slug}`}
                      prefetch={true}
                      className="group flex flex-col bg-[#121215] border border-white/[0.08] hover:border-[#A6A182]/50 transition-all duration-300 overflow-hidden"
                    >
                      {/* Thumbnail with Shimmer Skeleton */}
                      <div className="relative aspect-[16/10] overflow-hidden bg-zinc-900">
                        {post.featured_image?.url ? (
                          <ProgressiveBlogImage
                            src={post.featured_image.url}
                            alt={post.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-zinc-900 text-zinc-600 font-mono text-xs">
                            STUDIO 24
                          </div>
                        )}
                        <div className="absolute top-3 left-3 z-10">
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
                              {post.published_at
                                ? new Date(post.published_at).toLocaleDateString()
                                : 'Dispatch'}
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

                {/* Instant Controls Bar */}
                <div className="mt-12 sm:mt-16 pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="text-xs font-mono text-zinc-400">
                    Showing <span className="text-white font-medium">{paginatedGridPosts.length}</span> of{' '}
                    <span className="text-white font-medium">{totalRemaining}</span> perspectives
                  </div>

                  {/* Tactile Load More Button with Spinner */}
                  {hasMoreInPage && (
                    <button
                      type="button"
                      disabled={isLoadingMore}
                      onClick={handleLoadMore}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/10 hover:border-[#A6A182]/50 text-xs font-mono uppercase tracking-widest font-medium transition-all duration-200 cursor-pointer disabled:opacity-60"
                    >
                      {isLoadingMore ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin text-[#A6A182]" />
                          <span>Revealing Perspectives...</span>
                        </>
                      ) : (
                        <>
                          <span>Load More Dispatches</span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#A6A182]" />
                        </>
                      )}
                    </button>
                  )}

                  {/* Instant Page Switching */}
                  {totalPages > 1 && (
                    <div className="flex items-center gap-2">
                      {safePage > 1 ? (
                        <button
                          type="button"
                          onClick={() => handlePageChange(safePage - 1)}
                          className="px-3.5 py-2 text-xs font-mono uppercase tracking-wider text-zinc-300 hover:text-white bg-white/[0.03] border border-white/10 hover:border-[#A6A182]/50 transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          <ArrowLeft className="w-3.5 h-3.5" /> Prev
                        </button>
                      ) : (
                        <span className="px-3.5 py-2 text-xs font-mono uppercase tracking-wider text-zinc-600 bg-white/[0.01] border border-white/[0.05] cursor-not-allowed flex items-center gap-1.5">
                          <ArrowLeft className="w-3.5 h-3.5" /> Prev
                        </span>
                      )}

                      <div className="flex items-center gap-1 px-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                          const isActive = pageNum === safePage;
                          return (
                            <button
                              key={pageNum}
                              type="button"
                              onClick={() => handlePageChange(pageNum)}
                              className={`w-8 h-8 flex items-center justify-center text-xs font-mono transition-all cursor-pointer ${
                                isActive
                                  ? 'bg-[#A6A182] text-black font-semibold'
                                  : 'text-zinc-400 hover:text-white hover:bg-white/[0.05] border border-transparent hover:border-white/10'
                              }`}
                            >
                              {String(pageNum).padStart(2, '0')}
                            </button>
                          );
                        })}
                      </div>

                      {safePage < totalPages ? (
                        <button
                          type="button"
                          onClick={() => handlePageChange(safePage + 1)}
                          className="px-3.5 py-2 text-xs font-mono uppercase tracking-wider text-zinc-300 hover:text-white bg-white/[0.03] border border-white/10 hover:border-[#A6A182]/50 transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          Next <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <span className="px-3.5 py-2 text-xs font-mono uppercase tracking-wider text-zinc-600 bg-white/[0.01] border border-white/[0.05] cursor-not-allowed flex items-center gap-1.5">
                          Next <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </>
            )}
          </section>
        </>
      )}
    </div>
  );
}
