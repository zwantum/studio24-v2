'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

interface NavItem {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  { name: 'Home', href: '/#hero-section' },
  { name: 'Services', href: '/#architectural-services' },
  { name: 'Portfolio', href: '/#portfolio-curation' },
  { name: 'Why Us', href: '/#why-studio24' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/#consultation-booking' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero-section');
  const drawerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close drawer on click outside or escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setMobileMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [mobileMenuOpen]);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const item of navItems) {
        const id = item.href.replace('#', '');
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface-noir/85 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_1px_12px_rgba(0,0,0,0.5)]">
      <div className="h-16 sm:h-20 w-full px-margin-mobile md:px-margin-tablet lg:px-8 xl:px-margin flex items-center justify-between gap-2 sm:gap-4 lg:gap-6">
        {/* Brand Logo */}
        <Link href="/#hero-section" className="flex items-center shrink-0" aria-label="Studio24 by Shreya Home">
          <div className="relative h-7 sm:h-9 md:h-10 w-28 sm:w-36 md:w-40">
            <Image
              src="/Studio24_Logo.webp"
              alt="Studio24 by Shreya"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-3 xl:gap-6 2xl:gap-8" aria-label="Main Navigation">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.replace('#', '');
            return (
              <a
                key={item.name}
                href={item.href}
                className={`font-label-button text-[12.5px] xl:text-label-button uppercase transition-colors tracking-wider xl:tracking-widest whitespace-nowrap ${
                  isActive
                    ? 'text-primary font-medium border-b border-primary/50 pb-0.5'
                    : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                {item.name}
              </a>
            );
          })}
        </nav>

        {/* Right CTA and Mobile Toggle */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <a
            href="/#consultation-booking"
            className="inline-flex items-center justify-center px-3.5 sm:px-5 xl:px-6 py-2.5 min-h-[40px] sm:min-h-[44px] bg-white text-black font-semibold text-[11px] sm:text-xs uppercase tracking-wider transition-all hover:bg-zinc-200 shadow-[0_2px_15px_rgba(255,255,255,0.12)] shrink-0 whitespace-nowrap"
          >
            <span className="sm:hidden">Book Consult</span>
            <span className="hidden sm:inline">Book Consultation</span>
          </a>

          <button
            ref={buttonRef}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center border border-white/20 bg-white/[0.04] text-white hover:text-zinc-200 hover:border-white/40 transition-colors focus:outline-none focus:ring-1 focus:ring-white/50 shrink-0 cursor-pointer"
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          ref={drawerRef}
          className="lg:hidden bg-surface-noir/98 border-b border-white/10 backdrop-blur-2xl px-margin-mobile py-4 flex flex-col gap-1 shadow-2xl animate-in slide-in-from-top-2 duration-200 max-h-[calc(100vh-4rem)] overflow-y-auto"
          role="dialog"
          aria-label="Mobile Navigation"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.href.replace('#', '');
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`font-sans text-xs uppercase tracking-[0.2em] py-3.5 min-h-[44px] flex items-center border-b border-white/10 transition-colors ${
                  isActive ? 'text-white font-medium pl-1' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {item.name}
              </a>
            );
          })}
          <div className="pt-3 pb-1">
            <a
              href="/#consultation-booking"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center w-full min-h-[44px] py-3 bg-white text-black font-semibold text-xs uppercase tracking-widest hover:bg-zinc-200 transition-colors text-center"
            >
              Book Consultation
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
