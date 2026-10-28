import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import BlogLibraryView from '@/components/BlogLibraryView';
import { getAllBlogPosts, getBlogCategories } from '@/lib/blogData';
import { ArrowRight } from 'lucide-react';

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

export default async function BlogIndexPage() {
  // 1. Fetch post summaries once (cached lightweight metadata, NO heavy content body)
  const allPosts = await getAllBlogPosts();

  // 2. Compute category counts in-memory (0ms)
  const categories = await getBlogCategories(allPosts);

  return (
    <div className="min-h-screen bg-[#09090b] text-[#ECE7DE] selection:bg-[#A6A182] selection:text-black font-sans antialiased">
      <Navbar />

      <main className="pt-32 pb-24">
        {/* Header Section */}
        <section className="px-4 sm:px-6 md:px-12 max-w-7xl mx-auto mb-6">
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
        </section>

        {/* 0ms Instant Client-Side Library View (Zero-latency category switching & pagination) */}
        <section className="px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
          <BlogLibraryView
            allPosts={allPosts}
            categories={categories}
          />
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
                  prefetch={true}
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
      <FloatingWhatsApp />
    </div>
  );
}
