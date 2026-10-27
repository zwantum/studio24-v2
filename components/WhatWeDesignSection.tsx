import React from 'react';
import {
  Landmark,
  Building,
  Home,
  Bed,
  Briefcase,
  ShoppingBag,
  Utensils,
  Hotel,
  Sparkles,
  Stethoscope,
  PartyPopper,
  LayoutGrid,
} from 'lucide-react';

const spaces = [
  {
    icon: Landmark,
    title: 'Luxury Homes',
    desc: 'Bespoke residential',
  },
  {
    icon: Building,
    title: '3 & 4 BHK Apartments',
    desc: 'Modern family living',
  },
  {
    icon: Home,
    title: 'Villas & Bungalows',
    desc: 'Premium standalones',
  },
  {
    icon: Bed,
    title: 'Studio Apartments',
    desc: 'Compact luxury',
  },
  {
    icon: Briefcase,
    title: 'Corporate Offices',
    desc: 'Professional workspaces',
  },
  {
    icon: ShoppingBag,
    title: 'Retail Showrooms',
    desc: 'Branded retail spaces',
  },
  {
    icon: Utensils,
    title: 'Restaurants & Cafés',
    desc: 'Hospitality interiors',
  },
  {
    icon: Hotel,
    title: 'Boutique Hotels',
    desc: 'Premium guest experience',
  },
  {
    icon: Sparkles,
    title: 'Salons & Spas',
    desc: 'Wellness interiors',
  },
  {
    icon: Stethoscope,
    title: 'Clinics',
    desc: 'Medical interiors',
  },
  {
    icon: PartyPopper,
    title: 'Banquets',
    desc: 'Event spaces',
  },
  {
    icon: LayoutGrid,
    title: 'Mixed-Use Spaces',
    desc: 'Custom solutions',
  },
];

export default function WhatWeDesignSection() {
  return (
    <section id="what-we-design" className="w-full bg-transparent py-14 sm:py-20 lg:py-24 relative overflow-hidden">
      {/* Subtle Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-72 rounded-full bg-white/[0.02] blur-[140px] pointer-events-none" />

      <div className="w-full px-margin-mobile md:px-margin-tablet lg:px-8 xl:px-margin relative z-10 text-center flex flex-col items-center">
        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-3 mb-3 sm:mb-4">
          <span className="font-label-eyebrow text-label-eyebrow text-[#A6A182] uppercase tracking-[0.25em] font-semibold text-xs sm:text-sm">
            WHAT WE DESIGN
          </span>
        </div>

        {/* Main Heading */}
        <h2 className="font-sans text-2xl sm:text-3xl md:text-4xl lg:text-[44px] leading-tight text-white tracking-tight font-semibold max-w-4xl mx-auto mb-4 sm:mb-5">
          Twelve types of spaces, one delivery standard
        </h2>

        {/* Description */}
        <p className="text-[14px] sm:text-[15.5px] md:text-[16.5px] text-[#c5c5cb] leading-relaxed font-light max-w-3xl mx-auto mb-10 sm:mb-14">
          Residential, commercial, hospitality. Studio24 delivers turnkey interiors across twelve project categories, each handled with the same attention to brief, timeline, and material discipline.
        </p>

        {/* 12 Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-4 lg:gap-5 w-full text-left">
          {spaces.map((space, idx) => {
            const Icon = space.icon;
            return (
              <div
                key={idx}
                className="p-4 sm:p-5 bg-surface-charcoal border border-white/[0.08] hover:border-[#A6A182]/50 hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-all duration-300 flex items-center gap-4 group cursor-default"
              >
                <div className="w-12 h-12 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center shrink-0 group-hover:border-[#A6A182]/40 group-hover:bg-[#A6A182]/10 transition-colors">
                  <Icon className="w-6 h-6 text-[#A6A182] group-hover:scale-110 transition-transform" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-sans font-medium text-[16px] text-white tracking-tight leading-tight group-hover:text-primary transition-colors truncate">
                    {space.title}
                  </h3>
                  <p className="font-sans font-light text-[12.5px] text-[#9ca3af] mt-1 leading-snug">
                    {space.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
