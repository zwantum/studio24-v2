import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getHomepageBlogPosts } from '@/lib/blogData';

// Resilient default dispatches shown if database is cold or empty
const FALLBACK_ARTICLES = [
  {
    date: 'August 10, 2026',
    title: 'Bedroom Interior Design Ideas for a Calm and Premium Feel',
    desc: 'Discover how acoustic zoning, calibrated warm lux levels, and organic linen textiles transform urban bedrooms into sanctuaries of stillness.',
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80',
    alt: 'Minimalist calm bedroom interior design by Studio24 Lucknow',
    slug: 'bedroom-interior-design-lucknow',
    category: 'Interior',
  },
  {
    date: 'August 4, 2026',
    title: 'Small Home Interior Design Ideas for Compact Spaces',
    desc: 'Unlocking square footage in 2BHK urban footprints: custom pocket joinery, floating consoles, and luminous tonal finishes that double visual breadth.',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
    alt: 'Small modern apartment interior design in Lucknow by Studio24',
    slug: 'small-home-interior-design-ideas-lucknow',
    category: 'Interior',
  },
  {
    date: 'July 28, 2026',
    title: 'Luxury Home Interior Design in Lucknow: The Complete Experience',
    desc: 'A critical buyer guide on structural civil overhauls versus soft decorative styling, budget breakdowns, and timeline realities in Lucknow.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    alt: 'Luxury home renovation before and after architectural comparison in Gomti Nagar',
    slug: 'luxury-home-interior-design-in-lucknow',
    category: 'Commercial',
  },
];

export default async function BlogSection() {
  // Query ONLY the 3 latest cards with ONLY minimal metadata (no content body)
  const dbPosts = await getHomepageBlogPosts(3);

  const displayArticles =
    dbPosts.length > 0
      ? dbPosts.map((post) => ({
          date: post.published_at
            ? new Date(post.published_at).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })
            : 'Recent Dispatch',
          title: post.title,
          desc: post.excerpt || 'Read this architectural and interior design perspective by Studio 24.',
          image:
            post.featured_image?.url ||
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
          alt: post.title,
          slug: post.slug,
          category: post.categories?.[0]?.name || 'Interior',
        }))
      : FALLBACK_ARTICLES;

  return (
    <section id="journal-monograph" className="w-full bg-transparent py-space-2xl md:py-space-3xl relative border-t border-border-champagne-subtle">
      <div className="w-full px-margin-mobile md:px-margin-tablet lg:px-8 xl:px-margin relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-space-xl">
          <div>
            <span className="font-label-eyebrow text-label-eyebrow text-[#A6A182] uppercase tracking-[0.25em] font-semibold">
              Monograph &amp; Journal
            </span>
            <h2 className="font-sans text-3xl sm:text-4xl lg:text-[42px] text-white font-semibold tracking-tight mt-2">
              Read Latest Design Insights
            </h2>
          </div>
          <Link
            href="/blog"
            prefetch={true}
            className="inline-flex items-center gap-2 font-label-button text-label-button text-white uppercase tracking-wider hover:text-zinc-300 transition-colors"
          >
            <span>View All Monograph Entries</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
          {displayArticles.map((item, idx) => (
            <Link
              key={item.slug || idx}
              href={`/blog/${item.slug}`}
              prefetch={true}
              className="group bg-surface-charcoal border border-border-champagne-subtle hover:border-white/30 transition-all overflow-hidden flex flex-col"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-surface-container-low">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  loading="lazy"
                  unoptimized={item.image.startsWith('http')}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-5 sm:p-6 md:p-8 flex flex-col justify-between flex-1">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between text-[#A6A182] font-label-caption text-label-caption">
                    <span>{item.date}</span>
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 bg-white/[0.04] border border-white/10 text-zinc-300">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="font-sans text-lg sm:text-[19px] font-semibold text-white group-hover:text-zinc-300 transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant font-light line-clamp-3">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-border-champagne-subtle flex items-center justify-between font-label-button text-label-button text-white uppercase">
                  <span>Read Dispatch</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
