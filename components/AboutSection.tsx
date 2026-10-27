import React from 'react';
import Image from 'next/image';

const stats = [
  { value: '35+', title: 'Projects', subtitle: 'Completed' },
  { value: '8+', title: 'Cities Served', subtitle: 'Across UP' },
  { value: '10+', title: 'Years of', subtitle: 'Experience' },
  { value: '50+', title: 'Happy', subtitle: 'Clients' },
];

export default function AboutSection() {
  return (
    <section id="about-studio24" className="w-full bg-transparent py-14 sm:py-20 lg:py-24 relative overflow-hidden">
      {/* Ambient Atmospheric Lighting */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="w-full px-margin-mobile md:px-margin-tablet lg:px-8 xl:px-margin relative z-10">
        {/* Main Grid: 5-col / 7-col balanced distribution on large tab, 6/6 on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-12 items-center">
          {/* Left Column: Reference Layout */}
          <div className="lg:col-span-5 xl:col-span-6 flex items-center justify-center lg:justify-start w-full">
            <div className="relative w-full max-w-[340px] xs:max-w-[420px] sm:max-w-[500px] md:max-w-[540px] lg:max-w-[480px] xl:max-w-[600px] h-[280px] xs:h-[350px] sm:h-[440px] md:h-[500px] lg:h-[500px] xl:h-[570px]">
              {/* Refined Lining Grid 1: Top-Right */}
              <div
                className="absolute -top-2 sm:-top-3 right-0 sm:right-2 w-16 sm:w-28 lg:w-32 xl:w-40 h-16 sm:h-28 lg:h-32 xl:h-40 border border-white/15 pointer-events-none select-none z-0"
                style={{
                  background:
                    'repeating-linear-gradient(45deg, rgba(255,255,255,0.18), rgba(255,255,255,0.18) 1px, transparent 1px, transparent 7px)',
                }}
              />

              {/* Refined Lining Grid 2: Bottom-Left */}
              <div
                className="absolute -bottom-2 sm:-bottom-3 -left-1 sm:left-0 w-16 sm:w-28 lg:w-32 xl:w-40 h-16 sm:h-28 lg:h-32 xl:h-40 border border-white/15 pointer-events-none select-none z-0"
                style={{
                  background:
                    'repeating-linear-gradient(45deg, rgba(255,255,255,0.18), rgba(255,255,255,0.18) 1px, transparent 1px, transparent 7px)',
                }}
              />

              {/* Back Image: Tall Vertical Architectural Interior */}
              <div className="absolute top-0 left-0 w-[62%] sm:w-[60%] h-[84%] sm:h-[82%] overflow-hidden shadow-2xl z-10 border border-white/10 group">
                <Image
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85"
                  alt="Studio24 Bespoke Architecture & Living"
                  fill
                  className="object-cover object-[center_65%] transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 60vw, 30vw"
                />
              </div>

              {/* Front Image: Master Bedroom Suite */}
              <div className="absolute bottom-0 right-0 w-[80%] sm:w-[78%] h-[75%] sm:h-[73%] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.95)] z-20 border-4 border-[#0e0e10] group">
                <Image
                  src="https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=85"
                  alt="Studio24 Luxury Master Bedroom Interior"
                  fill
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 80vw, 40vw"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Harmonized Narrative & Headings */}
          <div className="lg:col-span-7 xl:col-span-6 flex flex-col justify-center">
            {/* Eyebrow with subtle #A6A182 accent line */}
            <div className="flex items-center gap-3 mb-2.5 sm:mb-3.5">
              <span className="font-label-eyebrow text-label-eyebrow text-[#A6A182] uppercase tracking-[0.25em] font-semibold text-[11px] sm:text-xs md:text-sm">
                Best Interior Designer in Lucknow
              </span>
              <span className="h-px w-8 bg-[#A6A182]/50" />
            </div>

            {/* Main Title */}
            <h2 className="font-sans text-2xl sm:text-3xl md:text-4xl lg:text-[32px] xl:text-[44px] leading-tight text-white tracking-tight font-semibold mb-3 sm:mb-4">
              About Studio24
            </h2>

            {/* First Paragraph */}
            <p className="text-[14px] sm:text-[15px] xl:text-[17px] text-[#c5c5cb] leading-relaxed font-light mb-3 sm:mb-4 lg:mb-3 xl:mb-5">
              Studio24 projects are a testament to the power of good design and a deep understanding of space aesthetics. If you have refined taste and are looking for interior design in Lucknow, your search ends here.
            </p>

            {/* Second Heading */}
            <h3 className="font-sans text-xl sm:text-2xl md:text-3xl lg:text-[23px] xl:text-[34px] leading-snug text-white tracking-tight font-semibold mb-2 sm:mb-3 mt-1">
              Let’s Create Your Dream Space
            </h3>

            {/* Second Paragraph */}
            <p className="text-[14px] sm:text-[15px] xl:text-[17px] text-[#c5c5cb] leading-relaxed font-light mb-2.5 sm:mb-3">
              Gomti Nagar is one of the most developed and modern areas in Lucknow, and designing spaces here requires a deep understanding of contemporary styles and urban living needs. As an best interior designers in Gomti Nagar Lucknow, we create designs that perfectly match the premium lifestyle of this locality.
            </p>

            {/* Third Paragraph */}
            <p className="text-[14px] sm:text-[15px] xl:text-[17px] text-[#c5c5cb] leading-relaxed font-light mb-4 sm:mb-6">
              When it comes to creating stunning, functional, and personalized spaces, choosing the Best Interior Designers in Gomti Nagar can make all the difference. Studio24 by Shreya has established itself as a leading name in the field, offering innovative design solutions for both homes and offices across Lucknow. With a perfect balance of creativity and practicality, Studio24 is redefining interiors in Gomti Nagar.
            </p>

            {/* Founder Signature Unit */}
            <div className="pt-4 sm:pt-5 border-t border-white/10 flex items-center justify-between flex-wrap gap-3 sm:gap-6">
              {/* S24 Logo & Founder Info */}
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex items-baseline font-sans font-bold text-2xl sm:text-3xl md:text-4xl text-white tracking-tighter select-none">
                  <span>S</span>
                  <span className="text-xl sm:text-2xl md:text-3xl text-[#A6A182] font-bold">24</span>
                </div>
                <div className="h-7 sm:h-8 w-px bg-white/20" />
                <div className="flex flex-col">
                  <span className="font-sans text-[15px] sm:text-[17px] md:text-[18px] text-white font-medium">Shreya Gupta</span>
                  <span className="font-sans text-[10px] sm:text-xs text-[#A6A182] tracking-[0.18em] uppercase font-semibold mt-0.5">
                    Founder
                  </span>
                </div>
              </div>

              {/* Calligraphic Handwritten Signature */}
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-[38px] xl:text-[42px] text-white/60 select-none tracking-wide signature-font">
                Shreya Gupta
              </div>
            </div>
          </div>
        </div>

        {/* Milestone Stats Row */}
        <div className="mt-14 sm:mt-16 lg:mt-20 pt-10 sm:pt-12 border-t border-white/10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-8 sm:gap-y-6 lg:gap-6 xl:gap-8 items-center">
            {stats.map((stat, idx) => (
              <div key={idx} className="flex items-center gap-2.5 sm:gap-4">
                <span className="font-sans text-[26px] xs:text-[28px] sm:text-4xl lg:text-[42px] xl:text-[46px] text-white font-semibold leading-none shrink-0 tracking-tight">
                  {stat.value}
                </span>
                <div className="flex flex-col justify-center">
                  <span className="font-sans text-[11px] sm:text-[13px] lg:text-[14px] font-semibold text-white uppercase tracking-wider leading-tight">
                    {stat.title}
                  </span>
                  <span className="font-sans text-[10px] sm:text-[13px] text-[#a1a1aa] font-light leading-snug mt-0.5 sm:mt-1">
                    {stat.subtitle}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
