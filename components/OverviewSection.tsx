import React from 'react';
import { Phone } from 'lucide-react';

export default function OverviewSection() {
  return (
    <section
      id="best-interior-designers-gomti-nagar"
      className="relative w-full bg-transparent py-12 sm:py-16 md:py-20 overflow-hidden"
    >
      {/* Subtle Ambient Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-72 rounded-full bg-white/[0.03] blur-[130px] pointer-events-none" />

      {/* Centered Container Content */}
      <div className="w-full px-margin-mobile md:px-margin-tablet lg:px-8 xl:px-margin relative z-10 text-center flex flex-col items-center">
        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-2.5 sm:gap-3 mb-3 sm:mb-4 px-2">
          <span className="font-label-eyebrow text-label-eyebrow text-[#A6A182] uppercase tracking-[0.15em] sm:tracking-[0.25em] font-semibold text-[10px] xs:text-[11px] sm:text-xs md:text-sm text-center leading-relaxed break-words">
            Studio24 by Shreya &bull; 8+ Years Experience &bull; Free Consultation
          </span>
        </div>

        {/* Main Heading */}
        <h2 className="font-sans text-2xl sm:text-3xl md:text-4xl lg:text-[42px] xl:text-[46px] leading-[1.22] sm:leading-[1.24] text-white tracking-tight font-semibold max-w-4xl mx-auto mb-4 sm:mb-6">
          Best Interior Designers in Gomti Nagar, Lucknow – Studio24 by Shreya
        </h2>

        {/* Descriptive Body Text */}
        <p className="text-[14px] sm:text-[16px] md:text-[17px] text-[#c5c5cb] leading-relaxed font-light max-w-4xl mx-auto mb-2">
          Studio24 by Shreya is one of the best interior designer company in Lucknow U.P, Incorporated in the year 2025. We provide interior &amp; exterior design services, and execution for residential and commercial projects in Lucknow and other nearby cities of Lko. We have the last 10 years Experience Persons, we have completed more than 285+ turnkey residential and commercial projects in Uttar Pradesh. Our principles are creativity and appropriate interior styles to maximize customer satisfaction keeping in mind the budget too. We are working with the Motto of TRANSFORMING SPACES..
        </p>

        {/* Action Prompt */}
        <p className="font-sans font-medium text-sm sm:text-base md:text-lg text-white mt-5 sm:mt-6 mb-4 sm:mb-5 tracking-wide">
          Book a Free Consultation Call Now!
        </p>

        {/* Signature Primary White CTA Button */}
        <div className="flex items-center justify-center w-full sm:w-auto px-4 sm:px-0">
          <a
            href="tel:+919324241800"
            className="w-full sm:w-auto min-h-[44px] px-8 sm:px-9 py-3.5 bg-white text-black font-semibold text-xs sm:text-sm uppercase tracking-widest hover:bg-zinc-200 transition-all duration-300 shadow-[0_4px_25px_rgba(255,255,255,0.15)] flex items-center justify-center gap-2.5 sm:gap-3 group"
          >
            <span>Call Now</span>
            <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
