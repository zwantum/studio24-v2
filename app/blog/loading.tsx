import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-[#09090b] text-[#ECE7DE] font-sans antialiased">
      <Navbar />

      <main className="pt-32 pb-24">
        {/* Header Skeleton */}
        <section className="px-4 sm:px-6 md:px-12 max-w-7xl mx-auto mb-12 sm:mb-16">
          <div className="flex items-center gap-2 mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-[#A6A182]/50 animate-pulse" />
            <div className="h-3 w-32 bg-white/[0.06] rounded animate-pulse" />
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/[0.08] pb-8 sm:pb-10">
            <div>
              <div className="h-10 sm:h-14 w-80 sm:w-96 max-w-full bg-white/[0.08] rounded animate-pulse mb-3" />
              <div className="h-4 w-64 sm:w-80 bg-white/[0.04] rounded animate-pulse" />
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              <div className="h-8 w-32 bg-white/[0.03] border border-white/10 rounded animate-pulse" />
              <div className="h-8 w-36 bg-white/[0.03] border border-white/10 rounded animate-pulse" />
            </div>
          </div>

          {/* Category Filter Pills Skeleton */}
          <div className="flex items-center gap-2 py-4 sm:py-6 border-b border-white/[0.06] overflow-x-hidden">
            <div className="h-9 w-28 bg-[#A6A182]/20 rounded border border-[#A6A182]/30 animate-pulse shrink-0" />
            <div className="h-9 w-36 bg-white/[0.04] rounded border border-white/[0.06] animate-pulse shrink-0" />
            <div className="h-9 w-40 bg-white/[0.04] rounded border border-white/[0.06] animate-pulse shrink-0" />
            <div className="h-9 w-28 bg-white/[0.04] rounded border border-white/[0.06] animate-pulse shrink-0" />
          </div>
        </section>

        {/* Featured Post Skeleton */}
        <section className="px-4 sm:px-6 md:px-12 max-w-7xl mx-auto mb-12 sm:mb-16">
          <div className="bg-[#121215] border border-white/[0.08] overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              <div className="lg:col-span-7 aspect-[16/10] lg:aspect-auto min-h-[220px] sm:min-h-[300px] bg-white/[0.03] animate-pulse" />
              <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="h-4 w-24 bg-[#A6A182]/20 rounded animate-pulse" />
                  <div className="h-7 w-4/5 bg-white/[0.08] rounded animate-pulse" />
                  <div className="h-4 w-full bg-white/[0.04] rounded animate-pulse" />
                  <div className="h-4 w-2/3 bg-white/[0.04] rounded animate-pulse" />
                </div>
                <div className="pt-6 border-t border-white/[0.08] flex justify-between">
                  <div className="h-3 w-28 bg-white/[0.04] rounded animate-pulse" />
                  <div className="h-3 w-20 bg-[#A6A182]/20 rounded animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3-Card Grid Skeleton */}
        <section className="px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-[#121215] border border-white/[0.08] overflow-hidden flex flex-col">
                <div className="aspect-[16/10] bg-white/[0.03] animate-pulse" />
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2.5">
                    <div className="h-3 w-24 bg-white/[0.04] rounded animate-pulse" />
                    <div className="h-5 w-5/6 bg-white/[0.08] rounded animate-pulse" />
                    <div className="h-3 w-full bg-white/[0.03] rounded animate-pulse" />
                    <div className="h-3 w-3/4 bg-white/[0.03] rounded animate-pulse" />
                  </div>
                  <div className="pt-4 border-t border-white/[0.06] flex justify-between">
                    <div className="h-3 w-20 bg-white/[0.03] rounded animate-pulse" />
                    <div className="h-3 w-16 bg-[#A6A182]/20 rounded animate-pulse" />
                  </div>
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

