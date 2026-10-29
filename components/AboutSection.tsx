'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

function DecorativeHatchPattern({ className = '' }: { className?: string }) {
  return (
    <svg
      width="179"
      height="325"
      viewBox="0 0 179 325"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none text-white/30 dark:text-zinc-400/35 ${className}`}
      aria-hidden="true"
    >
      <path d="M283.138 337L-2 51.8625V50.6875L284.312 337H283.138Z" fill="currentColor" />
      <path d="M259.329 337L-2 75.6709V74.4958L260.504 337H259.329Z" fill="currentColor" />
      <path d="M235.521 337L-2 99.4792V98.3042L236.696 337H235.521Z" fill="currentColor" />
      <path d="M211.712 337L-2 123.288V122.113L212.887 337H211.712Z" fill="currentColor" />
      <path d="M187.904 337L-2 147.096V145.921L189.079 337H187.904Z" fill="currentColor" />
      <path d="M164.096 337L-2 170.904V169.729L165.271 337H164.096Z" fill="currentColor" />
      <path d="M140.287 337L-2 194.712V193.537L141.462 337H140.287Z" fill="currentColor" />
      <path d="M116.479 337L-2 218.521V217.346L117.654 337H116.479Z" fill="currentColor" />
      <path d="M92.6708 337L-2 242.329V241.154L93.8458 337H92.6708Z" fill="currentColor" />
      <path d="M68.8625 337L-2 266.138V264.963L70.0375 337H68.8625Z" fill="currentColor" />
      <path d="M45.0542 337L-2 289.946V288.771L46.2292 337H45.0542Z" fill="currentColor" />
      <path d="M21.2458 337L-2 313.754V312.579L22.4208 337H21.2458Z" fill="currentColor" />
      <path d="M306.946 337L-2 28.0542V26.8792L308.121 337H306.946Z" fill="currentColor" />
      <path d="M330.754 337L-2 4.2458V3.0708L331.929 337H330.754Z" fill="currentColor" />
      <path d="M354.562 337L-2 -19.5625V-20.7375L355.737 337H354.562Z" fill="currentColor" />
      <path d="M378.371 337L-2 -43.3708V-44.5458L379.546 337H378.371Z" fill="currentColor" />
      <path d="M402.179 337L-2 -67.1791V-68.3541L403.354 337H402.179Z" fill="currentColor" />
      <path d="M425.988 337L-2 -90.9875V-92.1625L427.163 337H425.988Z" fill="currentColor" />
      <path d="M449.796 337L-2 -114.796V-115.971L450.971 337H449.796Z" fill="currentColor" />
      <path d="M473.604 337L-2 -138.604V-139.779L474.779 337H473.604Z" fill="currentColor" />
      <path d="M-2 -163H-1.4125L498 336.412V337H497.412L-2 -162.413V-163Z" fill="currentColor" />
      <path d="M22.3957 -163L498 312.604V313.779L21.2207 -163H22.3957Z" fill="currentColor" />
      <path d="M46.2043 -163L498 288.796V289.971L45.0293 -163H46.2043Z" fill="currentColor" />
      <path d="M70.0129 -163L498 264.988V266.163L68.8379 -163H70.0129Z" fill="currentColor" />
      <path d="M93.8205 -163L498 241.179V242.354L92.6455 -163H93.8205Z" fill="currentColor" />
      <path d="M117.629 -163L498 217.371V218.546L116.454 -163H117.629Z" fill="currentColor" />
      <path d="M141.438 -163L498 193.562V194.737L140.263 -163H141.438Z" fill="currentColor" />
      <path d="M165.246 -163L498 169.754V170.929L164.071 -163H165.246Z" fill="currentColor" />
      <path d="M271.054 337L-2 63.9459V62.7709L272.229 337H271.054Z" fill="currentColor" />
      <path d="M247.246 337L-2 87.7541V86.5791L248.421 337H247.246Z" fill="currentColor" />
      <path d="M223.438 337L-2 111.562V110.387L224.613 337H223.438Z" fill="currentColor" />
      <path d="M199.629 337L-2 135.371V134.196L200.804 337H199.629Z" fill="currentColor" />
      <path d="M175.821 337L-2 159.179V158.004L176.996 337H175.821Z" fill="currentColor" />
      <path d="M152.012 337L-2 182.988V181.812L153.188 337H152.012Z" fill="currentColor" />
      <path d="M128.204 337L-2 206.796V205.621L129.379 337H128.204Z" fill="currentColor" />
      <path d="M104.396 337L-2 230.604V229.429L105.571 337H104.396Z" fill="currentColor" />
      <path d="M80.5875 337L-2 254.413V253.238L81.7625 337H80.5875Z" fill="currentColor" />
      <path d="M56.7792 337L-2 278.221V277.046L57.9542 337H56.7792Z" fill="currentColor" />
      <path d="M32.9708 337L-2 302.029V300.854L34.1458 337H32.9708Z" fill="currentColor" />
      <path d="M9.1625 337L-2 325.837V324.662L10.3375 337H9.1625Z" fill="currentColor" />
      <path d="M294.862 337L-2 40.1375V38.9625L296.037 337H294.862Z" fill="currentColor" />
      <path d="M318.671 337L-2 16.3292V15.1542L319.846 337H318.671Z" fill="currentColor" />
      <path d="M342.479 337L-2 -7.47917V-8.65417L343.654 337H342.479Z" fill="currentColor" />
      <path d="M366.288 337L-2 -31.2875V-32.4625L367.463 337H366.288Z" fill="currentColor" />
      <path d="M390.096 337L-2 -55.0959V-56.2709L391.271 337H390.096Z" fill="currentColor" />
      <path d="M413.904 337L-2 -78.9042V-80.0792L415.079 337H413.904Z" fill="currentColor" />
      <path d="M437.713 337L-2 -102.712V-103.887L438.888 337H437.713Z" fill="currentColor" />
      <path d="M461.521 337L-2 -126.521V-127.696L462.696 337H461.521Z" fill="currentColor" />
      <path d="M485.329 337L-2 -150.329V-151.504L486.504 337H485.329Z" fill="currentColor" />
      <path d="M10.3127 -163L498 324.688V325.863L9.1377 -163H10.3127Z" fill="currentColor" />
      <path d="M34.1213 -163L498 300.879V302.054L32.9463 -163H34.1213Z" fill="currentColor" />
      <path d="M57.9289 -163L498 277.071V278.246L56.7539 -163H57.9289Z" fill="currentColor" />
      <path d="M81.7375 -163L498 253.263V254.438L80.5625 -163H81.7375Z" fill="currentColor" />
      <path d="M105.546 -163L498 229.454V230.629L104.371 -163H105.546Z" fill="currentColor" />
      <path d="M129.354 -163L498 205.646V206.821L128.179 -163H129.354Z" fill="currentColor" />
      <path d="M153.162 -163L498 181.838V183.013L151.987 -163H153.162Z" fill="currentColor" />
      <path d="M176.971 -163L498 158.029V159.204L175.796 -163H176.971Z" fill="currentColor" />
    </svg>
  );
}

export default function AboutSection() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about-studio24"
      className="w-full bg-transparent py-14 sm:py-20 lg:py-24 pb-28 sm:pb-36 lg:pb-44 relative overflow-hidden"
    >
      <div className="max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 xl:gap-14 items-center">
          
          {/* ========================================================
              Left Column: Exact Reference Image Box & Hover Interaction
              (.pxl-image-box .pxl-image-box3)
              ======================================================== */}
          <div className="lg:col-span-5 xl:col-span-5 flex items-center justify-center w-full">
            <div
              className="relative w-full max-w-[320px] xs:max-w-[360px] sm:max-w-[400px] lg:max-w-[430px] xl:max-w-[460px] cursor-pointer group select-none transition-all duration-500 ease-in-out"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={() => setIsHovered((prev) => !prev)}
            >
              <div className="relative w-full">

                {/* Decorative Hatched Pattern 1: reveal-one (Bottom-Left) */}
                <div
                  className={`absolute -left-3 sm:-left-5 -bottom-16 sm:-bottom-20 z-[1] transition-all duration-500 ease-in-out ${
                    isHovered
                      ? 'opacity-0 translate-x-5 -translate-y-24'
                      : 'opacity-100 translate-x-0 translate-y-0'
                  }`}
                  style={{ width: '130px', height: '235px' }}
                >
                  <DecorativeHatchPattern className="w-full h-full object-contain" />
                </div>

                {/* Decorative Hatched Pattern 2: reveal-two (Top-Right) */}
                <div
                  className={`absolute -right-3 sm:-right-5 top-5 sm:top-7 z-[1] transition-all duration-500 ease-in-out ${
                    isHovered
                      ? 'opacity-0 -translate-x-5'
                      : 'opacity-100 translate-x-0'
                  }`}
                  style={{ width: '130px', height: '235px' }}
                >
                  <DecorativeHatchPattern className="w-full h-full object-contain" />
                </div>

                {/* Back Image (item--back): Bedroom with Floral Wall Mural
                    Normal: pr-16 sm:pr-20
                    Hover: pr-0 (smoothly expands to 100% full width) */}
                <div
                  className={`relative z-[2] transition-all duration-500 ease-in-out ${
                    isHovered ? 'pr-0' : 'pr-14 sm:pr-20'
                  }`}
                >
                  <div className="relative w-full aspect-[736/885] overflow-hidden rounded-[2px] shadow-[0_15px_40px_rgba(0,0,0,0.7)] border border-white/10 bg-[#121214]">
                    <Image
                      src="/studio24-about-back.jpg"
                      alt="Studio24 Interior Architecture Bedroom Design"
                      fill
                      priority
                      sizes="(max-width: 1024px) 85vw, 40vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    />
                  </div>
                </div>

                {/* Front Image (item--front): Master Bedroom with Ring Chandelier
                    Normal: opacity-100 translate-y-0 scale-100
                    Hover: opacity-0 -translate-y-5 scale-50 */}
                <div
                  className={`absolute right-0 bottom-[-55px] xs:bottom-[-68px] sm:bottom-[-85px] lg:bottom-[-95px] pl-14 sm:pl-20 z-[3] w-full transition-all duration-500 ease-in-out ${
                    isHovered
                      ? 'opacity-0 -translate-y-5 scale-50 pointer-events-none'
                      : 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
                  }`}
                >
                  <div className="relative w-full aspect-[735/900] overflow-hidden rounded-[2px] shadow-[0_25px_50px_rgba(0,0,0,0.85)] border border-white/15 bg-[#121214]">
                    <Image
                      src="/studio24-about-front.jpg"
                      alt="Studio24 Luxury Suite Master Bedroom Design"
                      fill
                      priority
                      sizes="(max-width: 1024px) 75vw, 35vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* ========================================================
              Right Column: Harmonized Narrative & Masked Text Reveal
              (SplitText / skewInRight)
              ======================================================== */}
          <div className="lg:col-span-7 xl:col-span-7 flex flex-col justify-center">
            
            {/* Eyebrow Subtitle */}
            <div className="overflow-hidden mb-2 sm:mb-2.5">
              <p
                className={`text-xs sm:text-[13px] text-zinc-300 font-medium tracking-normal transition-all duration-700 ease-out ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: '100ms' }}
              >
                Best Interior Designer in Lucknow
              </p>
            </div>

            {/* Main Title: ABOUT STUDIO24 (Masked slide-up + skew reveal) */}
            <div className="overflow-hidden mb-4 sm:mb-5">
              <h2
                className={`font-sans text-3xl sm:text-4xl lg:text-[40px] xl:text-[44px] leading-none text-white tracking-tight font-bold uppercase transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isVisible
                    ? 'opacity-100 translate-y-0 [clip-path:inset(0_0_0_0)]'
                    : 'opacity-0 translate-y-full [clip-path:inset(0_0_0_100%)]'
                }`}
                style={{ transitionDelay: '200ms' }}
              >
                ABOUT STUDIO24
              </h2>
            </div>

            {/* First Paragraph */}
            <div className="overflow-hidden mb-6 sm:mb-7">
              <p
                className={`text-[13.5px] sm:text-[14.5px] lg:text-[15px] text-zinc-300 leading-relaxed font-normal max-w-xl transition-all duration-700 ease-out ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-6'
                }`}
                style={{ transitionDelay: '300ms' }}
              >
                Studio24 projects are a testament to the power of good design and a deep understanding of space aesthetics. If you have refined taste and are looking for interior design in Lucknow, your search ends here.
              </p>
            </div>

            {/* Second Heading: LET’S CREATE YOUR DREAM SPACE (Masked 2-line split reveal) */}
            <div className="overflow-hidden mb-4 sm:mb-5">
              <h3 className="font-sans text-2xl sm:text-3xl lg:text-[34px] xl:text-[38px] leading-[1.15] text-white tracking-tight font-bold uppercase">
                <span className="block overflow-hidden">
                  <span
                    className={`block transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isVisible
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-full'
                    }`}
                    style={{ transitionDelay: '400ms' }}
                  >
                    LET’S CREATE YOUR
                  </span>
                </span>
                <span className="block overflow-hidden">
                  <span
                    className={`block transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isVisible
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-full'
                    }`}
                    style={{ transitionDelay: '520ms' }}
                  >
                    DREAM SPACE
                  </span>
                </span>
              </h3>
            </div>

            {/* Second Paragraph */}
            <div className="overflow-hidden mb-3.5 sm:mb-4">
              <p
                className={`text-[13.5px] sm:text-[14.5px] lg:text-[15px] text-zinc-300 leading-relaxed font-normal max-w-xl transition-all duration-700 ease-out ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-6'
                }`}
                style={{ transitionDelay: '600ms' }}
              >
                Gomti Nagar is one of the most developed and modern areas in Lucknow, and designing spaces here requires a deep understanding of contemporary styles and urban living needs. As an best interior designers in Gomti Nagar Lucknow, we create designs that perfectly match the premium lifestyle of this locality.
              </p>
            </div>

            {/* Third Paragraph */}
            <div className="overflow-hidden mb-6 sm:mb-8">
              <p
                className={`text-[13.5px] sm:text-[14.5px] lg:text-[15px] text-zinc-300 leading-relaxed font-normal max-w-xl transition-all duration-700 ease-out ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-6'
                }`}
                style={{ transitionDelay: '700ms' }}
              >
                When it comes to creating stunning, functional, and personalized spaces, choosing the Best Interior Designers in Gomti Nagar can make all the difference. Studio24 by Shreya has established itself as a leading name in the field, offering innovative design solutions for both homes and offices across Lucknow. With a perfect balance of creativity and practicality, WorthSpace is redefining interiors in Gomti Nagar.
              </p>
            </div>

            {/* Founder & Signature Unit */}
            <div
              className={`flex items-center justify-between gap-4 max-w-xl transition-all duration-700 ease-out ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: '800ms' }}
            >
              {/* S24 Monogram & Founder Label */}
              <div className="flex items-center gap-3 sm:gap-3.5">
                <div className="relative w-8 h-8 sm:w-10 sm:h-10 shrink-0">
                  <Image
                    src="/Studio24_Favicon_White.webp"
                    alt="Studio24 Monogram"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="font-sans text-sm sm:text-base text-white font-bold tracking-tight leading-tight">
                    Shreya Gupta
                  </span>
                  <span className="font-sans text-xs sm:text-[13px] text-zinc-400 font-normal leading-tight mt-0.5">
                    Founder
                  </span>
                </div>
              </div>

              {/* Founder Signature Image */}
              <div className="relative w-28 sm:w-32 md:w-36 h-9 sm:h-10 md:h-11 shrink-0 select-none">
                <Image
                  src="/shreya-gupta-studio24-150x49.webp"
                  alt="Shreya Gupta Signature"
                  fill
                  className="object-contain object-right"
                  priority
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
