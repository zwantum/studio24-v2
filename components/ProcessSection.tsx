import React from 'react';

const steps = [
  {
    number: '01',
    title: 'Consultation',
    desc: 'We explore your functional spatial requirements, family lifestyle aspirations, and budgetary boundaries during an in-depth Gomti Nagar atelier or on-site walkthrough.',
    highlight: false,
  },
  {
    number: '02',
    title: 'Space Planning',
    desc: 'Translating ideas into scaled 2D spatial layouts and immersive 3D photorealistic visualisations. Moodboards, veneer selections, and lighting schematics finalize.',
    highlight: false,
  },
  {
    number: '03',
    title: 'Execution',
    desc: 'Managing civil alterations, electrical rewiring, false ceilings, and factory modular fabrication under stringent weekly quality audit checklists by Shreya Gupta.',
    highlight: false,
  },
  {
    number: '04',
    title: 'Handover',
    desc: 'Pristine deep cleaning, staging of bespoke soft furnishings, lighting calibration, and presenting the turnkey sanctuary keys ready for immediate luxury living.',
    highlight: true,
  },
];

export default function ProcessSection() {
  return (
    <section id="our-process-section" className="w-full bg-transparent py-14 sm:py-20 md:py-28 lg:py-32 relative border-t border-white/10">
      <div className="w-full px-margin-mobile md:px-margin-tablet lg:px-8 xl:px-margin relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14 md:mb-16">
          <div className="max-w-2xl flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="font-label-eyebrow text-label-eyebrow text-[#A6A182] uppercase tracking-[0.25em] font-semibold text-xs sm:text-sm">
                PROTOCOL
              </span>
              <span className="h-px w-8 bg-[#A6A182]/50" />
            </div>
            <h2 className="font-sans text-2xl sm:text-4xl lg:text-[42px] xl:text-[46px] leading-[1.22] sm:leading-[1.24] text-white tracking-tight font-semibold">
              Our Turnkey Process
            </h2>
            <p className="text-[15px] sm:text-[17px] text-[#c5c5cb] font-light leading-relaxed">
              Meticulous planning blended with high-precision engineering ensures high-end architectural outcomes without friction.
            </p>
          </div>
        </div>

        {/* Process Timeline Progression */}
        <div className="relative pt-4">
          {/* Connecting horizontal timeline bar for desktop */}
          <div className="hidden lg:block absolute top-[20px] left-[20px] right-[20px] h-px bg-white/10 pointer-events-none" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 lg:gap-8 xl:gap-10 relative">
            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-col relative group">
                <div className="flex items-center justify-between mb-6 relative">
                  <div
                    className={`w-10 h-10 flex items-center justify-center font-semibold text-sm z-10 transition-transform duration-300 group-hover:scale-110 shadow-lg ${
                      step.highlight
                        ? 'bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.25)]'
                        : 'bg-[#141418] border border-white/20 text-[#A6A182] group-hover:bg-white group-hover:text-black'
                    }`}
                  >
                    {step.number}
                  </div>
                </div>
                <div className="border-t lg:border-t-0 border-white/10 pt-4 lg:pt-0 space-y-2">
                  <h3 className="font-sans font-medium text-xl sm:text-[22px] text-white group-hover:text-white transition-colors leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-[14.5px] sm:text-[15px] text-[#c5c5cb] font-light leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
