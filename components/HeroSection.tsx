import React from 'react';
import Image from 'next/image';
import { ArrowRight, ArrowDown } from 'lucide-react';

export default function HeroSection() {
  return (
    <section
      id="hero-section"
      className="relative w-full min-h-[75vh] md:min-h-[520px] md:max-h-[680px] lg:min-h-[580px] lg:max-h-[740px] xl:min-h-[85vh] xl:max-h-none flex items-center justify-center -mt-20 pt-24 pb-12 sm:pt-28 sm:pb-14 md:pt-24 md:pb-14 lg:pt-28 lg:pb-16 overflow-hidden bg-transparent"
    >
      {/* Background Image with Cinematic Dark Vignette & Overlays */}
      <div className="absolute inset-0 z-0 select-none">
        <Image
          src="/home-09-slider-01-dark.webp"
          alt="Studio24 Luxury Interior Architecture Lucknow"
          fill
          priority
          className="object-cover object-center pointer-events-none"
        />
        <div className="absolute inset-0 bg-black/40 md:bg-black/35 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e10] via-transparent to-black/60 pointer-events-none" />
      </div>

      {/* Ambient Atmospheric Lighting */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-96 rounded-full bg-white/[0.04] blur-[140px] pointer-events-none z-[1]" />

      {/* Hero Content Center Stage */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-margin-mobile md:px-margin-tablet lg:px-8 xl:px-margin flex flex-col items-center justify-center pt-6 sm:pt-8 md:pt-6 lg:pt-8">
        {/* Main Hero Brand Title */}
        <h1 className="font-sans font-bold text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[104px] tracking-tight text-white uppercase leading-none drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
          STUDIO24
        </h1>

        {/* Hero Subtitle */}
        <p className="font-sans font-medium text-base sm:text-xl md:text-2xl lg:text-3xl text-white/95 tracking-wide mt-3 sm:mt-4 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
          Transforming Spaces, Crafting Dreams
        </p>

        {/* Hero Description */}
        <p className="font-sans font-light text-xs sm:text-sm md:text-base lg:text-[17px] text-[#c5c5cb] max-w-2xl mx-auto leading-relaxed mt-3 sm:mt-5 drop-shadow-[0_1px_8px_rgba(0,0,0,0.85)]">
          Bespoke architectural sanctums, turnkey residential estates, and prestigious corporate ateliers across Gomti Nagar, Lucknow.
        </p>

        {/* Action CTAs: Single line on laptops and tabs, stacked on mobile */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-5 mt-6 sm:mt-9 w-full max-w-sm sm:max-w-none mx-auto px-2 relative z-20">
          <a
            href="#consultation-booking"
            className="w-full sm:w-auto px-6 sm:px-8 md:px-9 py-3.5 bg-white text-black font-semibold text-xs md:text-sm uppercase tracking-wider sm:tracking-widest hover:bg-zinc-200 transition-all duration-300 shadow-[0_4px_25px_rgba(255,255,255,0.15)] flex items-center justify-center gap-2 group text-center relative z-20 min-h-[44px] whitespace-nowrap shrink-0"
          >
            <span className="whitespace-nowrap">Book Consultation</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform shrink-0" />
          </a>
          <a
            href="#portfolio-curation"
            className="w-full sm:w-auto px-6 sm:px-8 md:px-9 py-3.5 bg-[#0e0e10]/80 backdrop-blur-sm border border-white/25 text-white font-semibold text-xs md:text-sm uppercase tracking-wider sm:tracking-widest hover:border-white hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center gap-2 group text-center shadow-lg relative z-20 min-h-[44px] whitespace-nowrap shrink-0"
          >
            <span className="whitespace-nowrap">Explore Portfolio</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform shrink-0" />
          </a>
        </div>
      </div>
    </section>
  );
}
