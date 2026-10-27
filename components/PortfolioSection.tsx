'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { ArrowRight, ArrowLeft } from 'lucide-react';

interface Project {
  title: string;
  category: string;
  image: string;
}

const projects: Project[] = [
  {
    title: 'Modern Living Room',
    category: 'Home Interior',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85',
  },
  {
    title: 'Executive Corporate Suite',
    category: 'Commercial & Office',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=85',
  },
  {
    title: 'Master Suite Sanctuary',
    category: 'Home Interior',
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1600&q=85',
  },
  {
    title: 'Bespoke Culinary Studio',
    category: 'Modular Kitchen',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1600&q=85',
  },
  {
    title: 'Contemporary Dining Salon',
    category: 'Home Interior',
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1600&q=85',
  },
  {
    title: 'Architectural Villa Facade',
    category: 'House & Villa Exteriors',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
  },
];

// Helper to wrap slide items with clones for infinite visual flow
const clonedSlides = [
  { ...projects[4], realIndex: 4, key: 'clone-4' },
  { ...projects[5], realIndex: 5, key: 'clone-5' },
  ...projects.map((p, idx) => ({ ...p, realIndex: idx, key: `real-${idx}` })),
  { ...projects[0], realIndex: 0, key: 'clone-0' },
  { ...projects[1], realIndex: 1, key: 'clone-1' },
];

export default function PortfolioSection() {
  const [currentIndex, setCurrentIndex] = useState(2); // starts at real-0 (index 2)
  const [animate, setAnimate] = useState(true);
  const trackRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isTransitioningRef = useRef(false);

  const realCount = projects.length;

  const updatePosition = useCallback(() => {
    if (!trackRef.current || !wrapperRef.current) return;
    const slides = Array.from(trackRef.current.children) as HTMLElement[];
    const activeSlide = slides[currentIndex];
    if (!activeSlide) return;

    const wrapperWidth = wrapperRef.current.offsetWidth;
    const slideLeft = activeSlide.offsetLeft;
    const slideWidth = activeSlide.offsetWidth;
    const targetX = wrapperWidth / 2 - (slideLeft + slideWidth / 2);

    trackRef.current.style.transform = `translateX(${targetX}px)`;
  }, [currentIndex]);

  useEffect(() => {
    updatePosition();
    const handleResize = () => {
      setAnimate(false);
      updatePosition();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [updatePosition]);

  const handleNext = useCallback(() => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    setAnimate(true);
    setCurrentIndex((prev) => prev + 1);
  }, []);

  const handlePrev = useCallback(() => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    setAnimate(true);
    setCurrentIndex((prev) => prev - 1);
  }, []);

  const handleTransitionEnd = () => {
    isTransitioningRef.current = false;
    // Silent loop wrap
    if (currentIndex >= realCount + 2) {
      setAnimate(false);
      setCurrentIndex(currentIndex - realCount);
    } else if (currentIndex < 2) {
      setAnimate(false);
      setCurrentIndex(currentIndex + realCount);
    }
  };

  const startAutoplay = useCallback(() => {
    if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
    autoplayTimerRef.current = setInterval(() => {
      handleNext();
    }, 4500);
  }, [handleNext]);

  const pauseAutoplay = useCallback(() => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    startAutoplay();
    return () => pauseAutoplay();
  }, [startAutoplay, pauseAutoplay]);

  // Touch Swipe
  const touchStartXRef = useRef(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.changedTouches[0].screenX;
    pauseAutoplay();
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartXRef.current - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
    startAutoplay();
  };

  // 1-indexed counter
  let realIndex = (currentIndex - 2) % realCount;
  if (realIndex < 0) realIndex += realCount;

  return (
    <section id="portfolio-curation" className="w-full bg-transparent py-14 md:py-20 lg:py-24 relative overflow-hidden">
      {/* Ambient Atmospheric Lighting */}
      <div className="absolute -top-32 right-0 w-96 h-96 rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="w-full px-margin-mobile md:px-margin-tablet lg:px-8 xl:px-margin relative z-10 mb-10 md:mb-14">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="font-label-eyebrow text-label-eyebrow text-[#A6A182] uppercase tracking-[0.25em] font-semibold">
                FEATURED PROJECTS
              </span>
              <span className="h-px w-8 bg-[#A6A182]/50" />
            </div>
            <h2 className="font-sans text-3xl sm:text-4xl lg:text-[46px] xl:text-[50px] leading-[1.22] sm:leading-[1.24] text-white font-semibold tracking-tight">
              Our Work<br />Speaks for Itself
            </h2>
          </div>
          <div className="flex flex-col items-start lg:items-end gap-3.5 max-w-md">
            <p className="font-body-md text-sm sm:text-[17px] text-[#c5c5cb] font-light leading-relaxed lg:text-right">
              A collection of spaces designed with purpose, combining aesthetic sensibilities with practical solutions.
            </p>
            <a
              href="#consultation-booking"
              className="group inline-flex items-center gap-2 text-white hover:text-zinc-300 font-medium text-xs sm:text-sm uppercase tracking-widest transition-colors duration-300"
            >
              <span className="border-b border-white/40 group-hover:border-white pb-0.5 transition-colors">
                View All Projects
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
            </a>
          </div>
        </div>
      </div>

      {/* Carousel Viewport with Peek Left & Right Slides */}
      <div
        ref={wrapperRef}
        id="showcase-carousel-wrapper"
        className="relative w-full overflow-hidden select-none py-2"
        onMouseEnter={pauseAutoplay}
        onMouseLeave={startAutoplay}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          ref={trackRef}
          id="showcase-track"
          className="flex items-center will-change-transform"
          style={{
            transition: animate ? 'transform 700ms cubic-bezier(0.25, 1, 0.5, 1)' : 'none',
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {clonedSlides.map((slide, idx) => {
            const isActive = idx === currentIndex;
            return (
              <div
                key={slide.key}
                onClick={() => {
                  if (!isActive && !isTransitioningRef.current) {
                    setAnimate(true);
                    setCurrentIndex(idx);
                  }
                }}
                className={`showcase-slide shrink-0 w-[90vw] sm:w-[82vw] lg:w-[74vw] xl:w-[70vw] max-w-[1140px] aspect-[16/11] xs:aspect-[16/10] sm:aspect-[16/9] md:aspect-[1.85/1] rounded-xl sm:rounded-2xl overflow-hidden relative shadow-2xl transition-all duration-700 bg-surface-charcoal cursor-pointer ${
                  isActive ? 'scale-[1.02] sm:scale-[1.03] z-20 is-active' : 'scale-[0.82] sm:scale-[0.80] z-10'
                }`}
              >
                <Image
                  src={slide.image}
                  alt={`${slide.title} by Studio24 Lucknow`}
                  fill
                  className="object-cover pointer-events-none"
                  sizes="(max-width: 768px) 90vw, 75vw"
                />

                {/* Dimmer on peek slides */}
                <div
                  className={`slide-dimmer absolute inset-0 bg-black/45 transition-opacity duration-700 pointer-events-none ${
                    isActive ? 'opacity-0' : 'opacity-100'
                  }`}
                />

                {/* Content Overlay */}
                <div
                  className={`showcase-content absolute inset-0 transition-opacity duration-500 ${
                    isActive ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                  }`}
                >
                  <div className="absolute left-4 right-4 sm:left-auto sm:right-10 md:right-14 bottom-4 sm:bottom-8 md:bottom-10 flex flex-col items-start z-10 text-left">
                    <h3 className="font-sans font-medium text-lg xs:text-xl sm:text-2xl lg:text-[28px] text-white leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
                      {slide.title}
                    </h3>
                    <p className="font-sans font-light text-xs sm:text-sm text-gray-200 mt-1 drop-shadow-[0_1px_6px_rgba(0,0,0,0.85)]">
                      {slide.category}
                    </p>
                    <a
                      href="#consultation-booking"
                      className="w-11 h-11 rounded-full border border-primary/80 bg-black/50 backdrop-blur-md hover:bg-primary hover:text-surface-noir flex items-center justify-center text-white transition-all duration-300 mt-2.5 sm:mt-3 group/btn shadow-xl min-w-[44px] min-h-[44px]"
                      aria-label={`Explore ${slide.title}`}
                    >
                      <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Controls: Dynamic Counter and Navigation Buttons */}
      <div className="w-full px-margin-mobile md:px-margin-tablet lg:px-8 xl:px-margin mt-6 sm:mt-8 flex items-center justify-between sm:justify-end gap-6 relative z-10">
        <span
          id="showcase-counter"
          className="font-mono text-xs sm:text-sm text-gold-patina tracking-widest font-medium select-none"
        >
          {String(realIndex + 1).padStart(2, '0')} / {String(realCount).padStart(2, '0')}
        </span>
        <div className="flex items-center gap-3">
          <button
            id="showcase-prev-btn"
            onClick={handlePrev}
            className="w-11 h-11 rounded-full border border-border-champagne-subtle/50 hover:border-primary flex items-center justify-center text-white hover:bg-primary hover:text-surface-noir transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-white/50 cursor-pointer min-w-[44px] min-h-[44px]"
            aria-label="Previous Project"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            id="showcase-next-btn"
            onClick={handleNext}
            className="w-11 h-11 rounded-full border border-border-champagne-subtle/50 hover:border-primary flex items-center justify-center text-white hover:bg-primary hover:text-surface-noir transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-white/50 cursor-pointer min-w-[44px] min-h-[44px]"
            aria-label="Next Project"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
