import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const services = [
  {
    number: '01',
    title: 'Interior Design',
    desc: 'Specializing in 2BHK, 3BHK, and luxury bungalows. We focus on modular kitchens, smart wardrobes, and ergonomic living areas.',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
    alt: 'Interior Design - Luxury Living Room by Studio24 Lucknow',
  },
  {
    number: '02',
    title: 'Home Interior Design',
    desc: 'Get furniture that fits perfectly. We provide custom-made sofas, dining tables, and lighting solutions tailored to your room’s dimensions.',
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80',
    alt: 'Home Interior Design - Master Bedroom Sanctuary by Studio24 Lucknow',
  },
  {
    number: '03',
    title: 'Commercial & Office Spaces',
    desc: 'Creating productive work environments in Lucknow’s business districts that boost employee morale and impress clients.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    alt: 'Commercial & Office Spaces - Executive Boardroom Atelier by Studio24 Lucknow',
  },
];

export default function ServicesSection() {
  return (
    <section id="architectural-services" className="w-full bg-transparent py-12 md:py-16 lg:py-20 relative overflow-hidden">
      {/* SVG Definitions for Architectural Wavy Top Cards */}
      <svg className="absolute w-0 h-0" aria-hidden="true" focusable="false">
        <defs>
          <clipPath id="service-wave-top" clipPathUnits="objectBoundingBox">
            <path d="M 0,0.07 C 0.25,0.09 0.45,0.02 0.72,0.005 C 0.88,-0.005 0.95,0.015 1,0.035 L 1,1 L 0,1 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Ambient Atmospheric Lighting */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[150px] pointer-events-none" />

      <div className="w-full px-margin-mobile md:px-margin-tablet lg:px-8 xl:px-margin relative z-10">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center">
          {/* Left Info Column */}
          <div className="xl:col-span-4 flex flex-col justify-center py-2 xl:py-4">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8 xl:block items-end">
              <div className="lg:col-span-5 xl:col-span-12">
                {/* Eyebrow with subtle #A6A182 accent line */}
                <div className="flex items-center gap-3 mb-3 sm:mb-4">
                  <span className="font-label-eyebrow text-label-eyebrow text-[#A6A182] uppercase tracking-[0.25em] font-semibold">
                    OUR SERVICES
                  </span>
                  <span className="h-px w-8 bg-[#A6A182]/50" />
                </div>

                {/* Main Heading */}
                <h2 className="font-sans text-2xl sm:text-3xl md:text-4xl lg:text-[36px] xl:text-[44px] leading-[1.22] text-white tracking-tight font-semibold mb-4 lg:mb-0 xl:mb-6">
                  Design Solutions<br className="hidden sm:inline lg:hidden xl:inline" /> for Every Space
                </h2>
              </div>

              <div className="lg:col-span-7 xl:col-span-12">
                {/* Description */}
                <div className="space-y-3.5 mb-5 lg:mb-5 xl:mb-8">
                  <p className="text-[15px] sm:text-[16px] xl:text-[17px] text-white leading-relaxed font-light">
                    Studio24 by Shreya help create Classy and Contemporary Home interior designs, house exteriors designs,
                    Office interior designs and residential interior designs in Lucknow with a one stop solution for all
                    your interior needs.
                  </p>
                  <p className="text-[15px] sm:text-[16px] xl:text-[17px] text-white leading-relaxed font-light">
                    Our professional interior designers and interior decorators always focus on offering innovative
                    interior design ideas at pocket friendly budgets which makes us Lucknow’s best home interior
                    designers. If you are looking for the best interior designer in Lucknow, Studio24 by Shreya is the
                    answer.
                  </p>
                </div>

                {/* CTA Link */}
                <div>
                  <a
                    href="#consultation-booking"
                    className="group inline-flex items-center gap-2.5 text-[12px] sm:text-[13px] text-white hover:text-zinc-300 font-medium uppercase tracking-[0.22em] transition-all duration-300"
                  >
                    <span className="border-b border-white/40 group-hover:border-white pb-0.5 transition-colors">
                      View All Services
                    </span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Area: 3 Architectural Wavy Cards */}
          <div className="xl:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-5 lg:gap-6 items-start">
            {services.map((item, idx) => (
              <div
                key={idx}
                className="group relative flex flex-col justify-end transition-transform duration-500 hover:-translate-y-1.5"
              >
                <div
                  className="relative w-full aspect-[4/3.2] sm:aspect-[3/4.2] xl:aspect-[3/4.6] overflow-hidden rounded-b-xl shadow-2xl bg-surface-charcoal border-b border-x border-border-champagne-subtle/30"
                  style={{
                    clipPath: 'url(#service-wave-top)',
                    WebkitClipPath: 'url(#service-wave-top)',
                  }}
                >
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
                  />

                  {/* Gradient Overlay & Content */}
                  <div className="absolute inset-x-0 bottom-0 pt-20 sm:pt-24 pb-5 sm:pb-6 px-5 sm:px-7 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end">
                    <span className="font-headline-xl text-3xl sm:text-4xl lg:text-5xl font-sans text-[#A6A182] font-semibold mb-1 select-none tracking-tight">
                      {item.number}
                    </span>
                    <h3 className="font-body-lg text-base sm:text-lg lg:text-[19px] font-medium text-white leading-snug">
                      {item.title}
                    </h3>

                    {/* Smooth Reveal on Desktop Hover, Visible by Default on Mobile Touch */}
                    <div className="grid grid-rows-[1fr] sm:grid-rows-[0fr] sm:group-hover:grid-rows-[1fr] transition-all duration-500 ease-out">
                      <div className="overflow-hidden">
                        <p className="font-body-sm text-[12.5px] sm:text-[13px] lg:text-[14px] leading-relaxed text-white/80 font-light pt-2">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
