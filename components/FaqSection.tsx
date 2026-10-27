'use client';

import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: 'What makes Studio24 different from other interior designers in Lucknow?',
    answer:
      'Studio24 by Shreya combines bespoke architectural planning with strict turnkey discipline. Unlike freelance decorators or fragmented contractors, we provide full in-house 3D photorealistic renderings, transparent itemized BOQs with zero hidden costs, seasoned on-site supervision, and a formal 45-to-90 day milestone delivery guarantee for homes across Gomti Nagar and Lucknow.',
  },
  {
    question: 'How much does interior design cost in Lucknow?',
    answer:
      'Costs vary according to spatial layout and chosen finishes. Turnkey complete home packages start around ₹1.99 Lakhs for compact residences, while standard to luxury 3BHK turnkey interior executions generally range between ₹2.5 Lakhs and ₹4.5 Lakhs. Pure architectural 2D/3D design consultation fees typically range between ₹40 to ₹150 per sq. ft.',
  },
  {
    question: 'How long does a typical interior project take?',
    answer:
      'A typical residential turnkey project (2BHK/3BHK) maintains a strict timeline of 45 to 90 days. This schedule encompasses architectural revisions, civil changes, electrical rewiring, false ceilings, off-site factory joinery, on-site installation, and final decorative styling.',
  },
  {
    question: 'Do you only work in Lucknow?',
    answer:
      'While our primary atelier and flagship projects are based in Gomti Nagar, Indira Nagar, Hazratganj, and throughout Lucknow, we also undertake select high-end turnkey residential and commercial commissions across Uttar Pradesh.',
  },
  {
    question: 'Do you handle only design or also execution?',
    answer:
      'We handle both complete architectural design and full end-to-end execution. From initial spatial layouts, civil alterations, and modular cabinetry to custom lighting and soft furnishings, you enjoy a single point of accountability throughout the entire project.',
  },
  {
    question: 'Can I see a 3D visualisation before execution?',
    answer:
      'Yes, absolutely. We create high-resolution 3D visualisations and technical elevations before any work begins on-site. This gives you complete clarity to review and approve every color palette, lighting scheme, and joinery detail beforehand.',
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq-section" className="w-full bg-transparent py-14 sm:py-20 md:py-28 lg:py-32 relative border-t border-white/10">
      <div className="w-full px-margin-mobile md:px-margin-tablet lg:px-8 xl:px-margin max-w-4xl mx-auto relative z-10">
        {/* Centered Section Header */}
        <div className="text-center mb-10 sm:mb-16">
          <span className="font-label-eyebrow text-label-eyebrow text-[#A6A182] uppercase tracking-[0.25em] font-semibold text-xs sm:text-sm block mb-3">
            FAQ
          </span>

          <h2 className="font-sans text-2xl sm:text-4xl lg:text-[46px] leading-[1.2] text-white tracking-tight font-semibold mb-3 sm:mb-4">
            Common questions, answered
          </h2>

          <p className="text-[14px] sm:text-[16px] text-[#c5c5cb] font-light">
            If you don&apos;t see your question here,{' '}
            <a
              href="https://wa.me/919324241800?text=Hello%20Studio24%20by%20Shreya,%20I%20have%20a%20question%20regarding%20interior%20design%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-white underline underline-offset-4 transition-colors"
            >
              drop us a message on WhatsApp
            </a>
            .
          </p>
        </div>

        {/* Centered Accordion List */}
        <div className="w-full border-t border-white/10 divide-y divide-white/10" id="faq-accordion">
          {faqs.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="faq-item py-4 sm:py-6">
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="faq-toggle w-full min-h-[44px] py-1 flex items-center justify-between text-left group cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                  id={`faq-question-${idx}`}
                >
                  <span className="font-sans font-medium text-[15px] sm:text-[18px] text-white group-hover:text-primary transition-colors pr-4 sm:pr-6">
                    {item.question}
                  </span>
                  <span
                    className={`faq-icon text-primary shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-45' : 'rotate-0'
                    }`}
                  >
                    <Plus className="w-5 h-5 sm:w-6 sm:h-6" />
                  </span>
                </button>
                {isOpen && (
                  <div
                    id={`faq-answer-${idx}`}
                    role="region"
                    aria-labelledby={`faq-question-${idx}`}
                    className="faq-content pt-4 text-[15px] sm:text-[15.5px] text-[#c5c5cb] font-light leading-relaxed animate-in fade-in-50 duration-200"
                  >
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
