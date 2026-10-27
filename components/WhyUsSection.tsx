import React from 'react';
import {
  Infinity as InfinityIcon,
  Clock,
  Hammer,
  Sliders,
  Box,
  CheckCircle2,
} from 'lucide-react';

const pillars = [
  {
    number: '01',
    icon: InfinityIcon,
    title: 'End-to-End Service',
    desc: 'Our atelier shoulders the complete lifecycle from architectural layouts and civil alterations to curtains and styling cushions. You enjoy a single point of accountability.',
    topOffset: 'top-20 sm:top-24',
    zIndex: 'z-[1]',
  },
  {
    number: '02',
    icon: Clock,
    title: 'On-Time Delivery Guarantee',
    desc: 'We value client schedules. Standard residential packages (2BHK/3BHK) maintain strict 45-to-90 day milestone schedules backed by dedicated site project managers.',
    topOffset: 'top-24 sm:top-28',
    zIndex: 'z-[2]',
  },
  {
    number: '03',
    icon: Hammer,
    title: 'Expert Craftsmanship',
    desc: 'With seasoned master joiners, certified civil masons, and factory-pressed edge-banding machinery, we guarantee flawless hairline joins and longevity.',
    topOffset: 'top-28 sm:top-32',
    zIndex: 'z-[3]',
  },
  {
    number: '04',
    icon: Sliders,
    title: 'Tailored Solutions',
    desc: 'No cookie-cutter templates. We prioritize your family habits, spiritual shrines, and lifestyle routines to build spaces that are undeniably unique to you.',
    topOffset: 'top-32 sm:top-36',
    zIndex: 'z-[4]',
  },
  {
    number: '05',
    icon: Box,
    title: 'Space Planning & 3D Previews',
    desc: 'Inspect photorealistic 3D renders and detailed technical elevations before single brick moves. Complete material swatches approved before procurement.',
    topOffset: 'top-36 sm:top-40',
    zIndex: 'z-[5]',
  },
  {
    number: '06',
    icon: CheckCircle2,
    title: 'Attention To Detail',
    desc: 'From shadowline architectural reveals to quiet acoustic damper hinges and premium hardware finishes, our millimeter focus ensures zero compromise.',
    topOffset: 'top-40 sm:top-44',
    zIndex: 'z-[6]',
  },
];

export default function WhyUsSection() {
  return (
    <section id="why-studio24" className="w-full bg-transparent py-14 sm:py-20 md:py-28 lg:py-32 relative border-t border-white/10">
      <div className="w-full px-margin-mobile md:px-margin-tablet lg:px-8 xl:px-margin relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-16">
          <div className="flex items-center gap-3 mb-3">
            <span className="font-label-eyebrow text-label-eyebrow text-[#A6A182] uppercase tracking-[0.25em] font-semibold text-xs sm:text-sm">
              UNCOMPROMISING STANDARDS
            </span>
            <span className="h-px w-8 bg-[#A6A182]/50" />
          </div>

          <h2 className="font-sans text-2xl sm:text-4xl lg:text-[42px] xl:text-[46px] leading-[1.22] sm:leading-[1.24] text-white tracking-tight font-semibold mb-3 sm:mb-4">
            Why We Are the Best Interior Designer Company in Gomti Nagar
          </h2>

          <p className="text-[15px] sm:text-[17px] text-[#c5c5cb] font-light leading-relaxed">
            Rooted in craft discipline, transparent costs, and uncompromising site supervision.
          </p>
        </div>

        {/* Box Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 relative">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`relative sm:sticky ${item.topOffset} lg:static ${item.zIndex} lg:z-auto bg-[#141418] border border-white/10 hover:border-white/40 transition-all duration-300 p-5 xs:p-6 sm:p-7 md:p-8 rounded-none shadow-[0_12px_40px_rgba(0,0,0,0.7)] group flex flex-col justify-between overflow-hidden`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <div>
                  <div className="flex items-center justify-between mb-5 sm:mb-6">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-none bg-white/[0.04] border border-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black group-hover:scale-105 transition-all duration-300 shadow-md">
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                    </div>
                    <span className="font-mono text-xs sm:text-sm text-[#A6A182] tracking-widest font-semibold group-hover:text-white transition-colors">
                      {item.number}
                    </span>
                  </div>
                  <h3 className="font-sans font-semibold text-lg sm:text-xl md:text-[22px] text-white mb-2.5 sm:mb-3 tracking-tight group-hover:text-white transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-[14px] sm:text-[15px] md:text-[16px] text-[#c5c5cb] font-light leading-relaxed">
                    {item.desc}
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
