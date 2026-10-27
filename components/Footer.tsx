'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import LegalModal from './LegalModal';

export default function Footer() {
  const [legalModalType, setLegalModalType] = useState<'terms' | 'condition' | 'policy' | null>(null);

  return (
    <>
      <footer className="w-full bg-[#000000] text-white border-t border-white/10 relative z-10 overflow-hidden" id="site-footer">
        <div className="w-full min-h-[360px] lg:min-h-[420px] flex flex-col lg:flex-row items-stretch relative z-10">
          {/* Column 1: Vertical Architectural Wordmark */}
          <div className="hidden md:flex w-24 sm:w-28 lg:w-36 xl:w-44 border-b lg:border-b-0 lg:border-r border-white/10 items-center justify-center shrink-0 py-8 lg:py-0 select-none">
            <span
              className="font-sans font-bold text-5xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-tight text-[#1c1c22] select-none whitespace-nowrap"
              style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
            >
              Contact
            </span>
          </div>

          {/* Mobile fallback for Contact label */}
          <div className="md:hidden px-6 pt-8 pb-2 border-b border-white/10">
            <span className="font-sans font-bold text-3xl tracking-tight text-[#222228]">Contact</span>
          </div>

          {/* Column 2: Direct Contact Coordinates */}
          <div className="flex-1 max-w-xl px-6 sm:px-10 lg:px-12 xl:px-16 py-10 lg:py-16 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-center space-y-7">
            {/* Email */}
            <div>
              <span className="font-sans text-xs sm:text-[13px] text-[#A6A182] uppercase tracking-wider font-medium block mb-1.5">
                Email Address
              </span>
              <a
                href="mailto:interior@studio24byshreya.com"
                className="font-sans text-sm sm:text-base text-white/90 font-light hover:text-white transition-colors tracking-wide"
              >
                interior@studio24byshreya.com
              </a>
            </div>

            {/* Phone */}
            <div>
              <span className="font-sans text-xs sm:text-[13px] text-[#A6A182] uppercase tracking-wider font-medium block mb-1.5">
                Phone No
              </span>
              <a
                href="tel:+919324241800"
                className="font-sans text-sm sm:text-base text-white/90 font-light hover:text-white transition-colors tracking-wide"
              >
                +91 - 93 2424 1800
              </a>
            </div>

            {/* Office Address */}
            <div>
              <span className="font-sans text-xs sm:text-[13px] text-[#A6A182] uppercase tracking-wider font-medium block mb-1.5">
                Office Address
              </span>
              <address className="font-sans text-sm sm:text-base text-white/90 font-light leading-relaxed not-italic">
                5th Floor, Summit Building,
                <br />
                Vibhuti Khand, Gomti Nagar, Lucknow,
                <br />
                Uttar Pradesh - 226010
              </address>
            </div>
          </div>

          {/* Column 3: Architectural Grid Spacer (Visible on XL screens) */}
          <div className="hidden xl:block w-24 2xl:w-36 border-r border-white/10 shrink-0" />

          {/* Column 4: Brand Identity, Socials & Legal Coordinates */}
          <div className="flex-1 px-6 sm:px-10 lg:px-12 xl:px-16 py-10 lg:py-16 flex flex-col items-center justify-center text-center">
            {/* Brand Logo */}
            <Link href="/#hero-section" className="flex items-center justify-center select-none mb-7 group" aria-label="Studio24 Logo">
              <div className="relative h-10 md:h-12 w-32 md:w-40">
                <Image
                  src="/Studio24_Logo.webp"
                  alt="Studio24 by Shreya"
                  fill
                  className="object-contain transition-opacity group-hover:opacity-85"
                />
              </div>
            </Link>

            {/* Social Icons in Circles with >=44px mobile touch targets */}
            <div className="flex items-center justify-center gap-3 mb-6">
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Studio24 Facebook"
                className="w-11 h-11 sm:w-9 sm:h-9 min-w-[44px] sm:min-w-0 min-h-[44px] sm:min-h-0 rounded-full bg-[#242428] hover:bg-primary text-white hover:text-black flex items-center justify-center transition-all duration-300"
              >
                <svg className="w-4 h-4 sm:w-3.5 sm:h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.326v21.348C0 23.403.597 24 1.326 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.597 1.323-1.326V1.326C24 .597 23.403 0 22.675 0z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Studio24 Instagram"
                className="w-11 h-11 sm:w-9 sm:h-9 min-w-[44px] sm:min-w-0 min-h-[44px] sm:min-h-0 rounded-full bg-[#242428] hover:bg-primary text-white hover:text-black flex items-center justify-center transition-all duration-300"
              >
                <svg className="w-4 h-4 sm:w-3.5 sm:h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Studio24 YouTube"
                className="w-11 h-11 sm:w-9 sm:h-9 min-w-[44px] sm:min-w-0 min-h-[44px] sm:min-h-0 rounded-full bg-[#242428] hover:bg-primary text-white hover:text-black flex items-center justify-center transition-all duration-300"
              >
                <svg className="w-4 h-4 sm:w-3.5 sm:h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>

              {/* Pinterest */}
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Studio24 Pinterest"
                className="w-11 h-11 sm:w-9 sm:h-9 min-w-[44px] sm:min-w-0 min-h-[44px] sm:min-h-0 rounded-full bg-[#242428] hover:bg-primary text-white hover:text-black flex items-center justify-center transition-all duration-300"
              >
                <svg className="w-4 h-4 sm:w-3.5 sm:h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 0a12 12 0 0 0-4.37 23.18c-.02-.97.16-2.14.43-3.27l1.78-7.56s-.44-.88-.44-2.18c0-2.04 1.18-3.56 2.66-3.56 1.25 0 1.86.94 1.86 2.07 0 1.26-.8 3.14-1.22 4.89-.35 1.46.73 2.65 2.17 2.65 2.61 0 4.36-3.34 4.36-7.3 0-3.02-2.03-5.28-5.74-5.28-4.18 0-6.78 3.12-6.78 6.58 0 1.2.35 2.05.9 2.7.25.3.28.42.19.76-.06.26-.21.86-.27 1.11-.09.37-.36.5-.67.38-1.85-.76-2.7-2.79-2.7-5.07 0-3.77 3.18-8.31 9.5-8.31 5.08 0 8.43 3.68 8.43 7.64 0 5.23-2.91 9.14-7.2 9.14-1.44 0-2.8-.78-3.26-1.67l-.89 3.42c-.32 1.22-1.18 2.75-1.76 3.68A11.98 11.98 0 0 0 12 24c6.63 0 12-5.37 12-12S18.63 0 12 0z" />
                </svg>
              </a>
            </div>

            {/* Terms, Condition, Policy, Blog & Admin Portal Links */}
            <div className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 gap-y-2 mb-4">
              <Link
                href="/blog"
                className="min-h-[44px] flex items-center px-1 text-[11px] uppercase tracking-[0.24em] text-white/70 hover:text-primary transition-colors font-sans font-medium"
              >
                PERSPECTIVES
              </Link>
              <button
                type="button"
                onClick={() => setLegalModalType('terms')}
                className="min-h-[44px] flex items-center px-1 text-[11px] uppercase tracking-[0.24em] text-white/70 hover:text-primary transition-colors font-sans font-medium cursor-pointer"
              >
                TERMS
              </button>
              <button
                type="button"
                onClick={() => setLegalModalType('condition')}
                className="min-h-[44px] flex items-center px-1 text-[11px] uppercase tracking-[0.24em] text-white/70 hover:text-primary transition-colors font-sans font-medium cursor-pointer"
              >
                CONDITION
              </button>
              <button
                type="button"
                onClick={() => setLegalModalType('policy')}
                className="min-h-[44px] flex items-center px-1 text-[11px] uppercase tracking-[0.24em] text-white/70 hover:text-primary transition-colors font-sans font-medium cursor-pointer"
              >
                POLICY
              </button>
              <Link
                href="/admin"
                className="min-h-[44px] flex items-center px-1 text-[11px] uppercase tracking-[0.24em] text-[#A6A182]/80 hover:text-[#A6A182] transition-colors font-sans font-medium"
              >
                ADMIN
              </Link>
            </div>

            {/* Copyright Notice */}
            <p className="font-sans text-[11px] sm:text-xs text-white/40 font-light tracking-wide">
              &copy; Studio24 by Shreya {new Date().getFullYear()}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Interactive Modal */}
      <LegalModal type={legalModalType} onClose={() => setLegalModalType(null)} />
    </>
  );
}
