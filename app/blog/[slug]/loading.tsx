import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function BlogPostLoading() {
  return (
    <div className="min-h-screen bg-[#09090b] text-[#ECE7DE] font-sans antialiased">
      <Navbar />

      <main className="pt-28 sm:pt-36 pb-24">
        {/* Article Header Container */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Back link & Category pill */}
          <div className="flex items-center justify-between mb-8 sm:mb-12 border-b border-white/[0.06] pb-4">
            <div className="h-4 w-32 bg-white/[0.05] rounded animate-pulse" />
            <div className="h-6 w-24 bg-[#A6A182]/20 border border-[#A6A182]/30 rounded animate-pulse" />
          </div>

          {/* Title Skeleton */}
          <div className="space-y-4 mb-8">
            <div className="h-10 sm:h-14 md:h-16 w-11/12 bg-white/[0.08] rounded animate-pulse" />
            <div className="h-10 sm:h-14 md:h-16 w-4/5 bg-white/[0.08] rounded animate-pulse" />
          </div>

          {/* Subtitle / Excerpt Skeleton */}
          <div className="space-y-2 mb-8">
            <div className="h-4 w-full bg-white/[0.04] rounded animate-pulse" />
            <div className="h-4 w-3/4 bg-white/[0.04] rounded animate-pulse" />
          </div>

          {/* Author & Meta Row */}
          <div className="flex items-center justify-between py-4 border-y border-white/[0.08] mb-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/[0.06] animate-pulse" />
              <div className="space-y-1.5">
                <div className="h-3.5 w-28 bg-white/[0.06] rounded animate-pulse" />
                <div className="h-3 w-36 bg-white/[0.03] rounded animate-pulse" />
              </div>
            </div>
            <div className="h-4 w-24 bg-white/[0.04] rounded animate-pulse" />
          </div>

          {/* Featured Hero Image Skeleton */}
          <div className="relative aspect-[16/9] w-full bg-zinc-900 border border-white/[0.08] overflow-hidden mb-12">
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-800/80 to-zinc-900 animate-pulse" />
          </div>

          {/* Article Prose Skeleton */}
          <div className="space-y-6 max-w-3xl mx-auto">
            <div className="space-y-2.5">
              <div className="h-4 w-full bg-white/[0.05] rounded animate-pulse" />
              <div className="h-4 w-11/12 bg-white/[0.05] rounded animate-pulse" />
              <div className="h-4 w-full bg-white/[0.05] rounded animate-pulse" />
              <div className="h-4 w-4/5 bg-white/[0.05] rounded animate-pulse" />
            </div>

            <div className="h-8 w-2/3 bg-white/[0.07] rounded animate-pulse pt-4" />

            <div className="space-y-2.5">
              <div className="h-4 w-full bg-white/[0.04] rounded animate-pulse" />
              <div className="h-4 w-10/12 bg-white/[0.04] rounded animate-pulse" />
              <div className="h-4 w-full bg-white/[0.04] rounded animate-pulse" />
              <div className="h-4 w-3/4 bg-white/[0.04] rounded animate-pulse" />
            </div>

            <div className="p-6 bg-white/[0.02] border-l-2 border-[#A6A182]/50 my-8 space-y-2">
              <div className="h-4 w-5/6 bg-white/[0.06] rounded animate-pulse" />
              <div className="h-4 w-2/3 bg-white/[0.06] rounded animate-pulse" />
            </div>

            <div className="space-y-2.5">
              <div className="h-4 w-full bg-white/[0.04] rounded animate-pulse" />
              <div className="h-4 w-11/12 bg-white/[0.04] rounded animate-pulse" />
              <div className="h-4 w-4/5 bg-white/[0.04] rounded animate-pulse" />
            </div>
          </div>
        </article>

        {/* Related Articles Skeleton Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 mt-20 pt-16 border-t border-white/[0.08]">
          <div className="h-6 w-48 bg-white/[0.08] rounded animate-pulse mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-[#121215] border border-white/[0.08] overflow-hidden flex flex-col">
                <div className="aspect-[16/10] bg-zinc-900 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-800/80 to-zinc-900 animate-pulse" />
                </div>
                <div className="p-5 space-y-3">
                  <div className="h-3 w-20 bg-white/[0.04] rounded animate-pulse" />
                  <div className="h-5 w-5/6 bg-white/[0.07] rounded animate-pulse" />
                  <div className="h-3 w-full bg-white/[0.03] rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

