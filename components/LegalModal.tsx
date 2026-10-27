'use client';

import React from 'react';
import { X } from 'lucide-react';

interface LegalModalProps {
  type: 'terms' | 'condition' | 'policy' | null;
  onClose: () => void;
}

export default function LegalModal({ type, onClose }: LegalModalProps) {
  if (!type) return null;

  const contentMap = {
    terms: {
      title: 'Terms of Engagement',
      body: [
        'Studio24 by Shreya operates as a luxury interior architecture and turnkey execution atelier based in Gomti Nagar, Lucknow.',
        'All client project milestones, 2D layout schematics, 3D visualisations, and physical execution timelines are governed by mutual agreement signed prior to site mobilization.',
        'Turnkey deliverables adhere to the itemized Bill of Quantities (BOQ). Any client-requested alterations or additions during on-site execution are documented and agreed via written change orders.',
      ],
    },
    condition: {
      title: 'Project Conditions & Warranty',
      body: [
        'All bespoke joinery, modular hardware, and factory-pressed cabinetry carry standard manufacturer warranties alongside Studio24 site supervision assurance.',
        'Site access and necessary municipal/society permissions for construction and renovation in Lucknow must be facilitated by the property owner before structural civil mobilization.',
        'Milestone payments correspond directly to verified on-site progress stages (Civil, Joinery, Electrical/False Ceiling, Finishing, Handover).',
      ],
    },
    policy: {
      title: 'Client Privacy & Data Policy',
      body: [
        'Studio24 respects the absolute confidentiality and privacy of our patrons. Floor plans, personal contact numbers, property addresses, and private residential images are never shared with unauthorized third parties.',
        'Client consultation inquiries submitted through this portal are exclusively used by our design concierge to contact you regarding your requested architectural and interior design project.',
        'Photography of completed residences for editorial monographs or portfolio publication is undertaken only with explicit written homeowner consent.',
      ],
    },
  };

  const current = contentMap[type];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
    >
      <div className="relative w-full max-w-lg bg-surface-charcoal border border-white/20 p-5 sm:p-8 shadow-2xl max-h-[88vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center border border-white/20 text-white hover:text-primary hover:border-white transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 id="legal-modal-title" className="font-sans text-lg sm:text-2xl font-semibold text-white mb-4 pr-10">
          {current.title}
        </h3>

        <div className="space-y-3 text-xs sm:text-sm text-[#c5c5cb] font-light leading-relaxed">
          {current.body.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-3 min-h-[44px] bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-colors cursor-pointer text-center"
          >
            Acknowledge
          </button>
        </div>
      </div>
    </div>
  );
}
