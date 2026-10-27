import React from 'react';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote:
      'Studio24 brought our vision to life with elegant designs and meticulous attention to detail. Shreya Gupta and her team turned our house into a dream home!',
    author: 'Ajit Sharma',
    location: 'Gomti Nagar, Lucknow',
  },
  {
    quote:
      'Shreya’s expertise at Studio24 transformed our office into a stunning yet functional space. Highly professional and creative! Our clients are mesmerized every time they visit.',
    author: 'Ragini Yadav',
    location: 'Gorakhpur / Lucknow Corporate',
  },
  {
    quote:
      "Studio24's innovative ideas and seamless execution made renovating our space completely stress-free and enjoyable. Thank you, Shreya - bahut achha kaam kiya hai aapne!",
    author: 'Sujal Agarwal',
    location: 'Delhi & Gomti Nagar Resident',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="w-full bg-transparent py-14 sm:py-20 md:py-28 relative border-t border-border-champagne-subtle">
      <div className="w-full px-margin-mobile md:px-margin-tablet lg:px-8 xl:px-margin relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div>
            <span className="font-label-eyebrow text-label-eyebrow text-[#A6A182] uppercase tracking-[0.25em] font-semibold text-xs sm:text-sm">
              Client Testimonials
            </span>
            <h2 className="font-sans text-2xl sm:text-4xl lg:text-[42px] text-white font-semibold tracking-tight mt-2">
              What Our Patrons Say
            </h2>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7 lg:gap-8">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="p-5 xs:p-6 sm:p-7 md:p-8 bg-surface-charcoal border border-border-champagne-subtle flex flex-col justify-between"
            >
              <div className="space-y-4">
                <Quote className="w-8 h-8 text-[#A6A182]" />
                <p className="font-body-lg text-white/90 font-light leading-relaxed">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-border-champagne-subtle flex items-center justify-between">
                <div>
                  <h4 className="font-sans text-base font-semibold text-white">{item.author}</h4>
                  <p className="font-label-caption text-label-caption text-zinc-400">{item.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
