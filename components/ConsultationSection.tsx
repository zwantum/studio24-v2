'use client';

import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function ConsultationSection() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    serviceType: 'Full Turnkey Residential',
    propertyConfig: '3BHK Apartment (1,500 - 2,400 sq.ft)',
    locationBudget: '',
    notes: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [successData, setSuccessData] = useState<{ fullName: string; serviceType: string } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (status === 'error') setStatus('idle');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side quick checks
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      setStatus('error');
      setErrorMessage('Please enter your full name (minimum 2 characters).');
      return;
    }

    const cleanPhone = formData.phone.trim().replace(/[\s-]/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      setStatus('error');
      setErrorMessage('Please enter a valid 10-digit phone number.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.error || 'Failed to submit consultation request.');
      }

      setSuccessData(result.data);
      setStatus('success');
      setFormData({
        fullName: '',
        phone: '',
        serviceType: 'Full Turnkey Residential',
        propertyConfig: '3BHK Apartment (1,500 - 2,400 sq.ft)',
        locationBudget: '',
        notes: '',
      });
    } catch (err: unknown) {
      setStatus('error');
      setErrorMessage(
        err instanceof Error ? err.message : 'An unexpected error occurred. Please try again or call us directly.'
      );
    }
  };

  return (
    <section id="consultation-booking" className="w-full bg-transparent py-14 sm:py-20 md:py-28 relative">
      <div className="w-full px-margin-mobile md:px-margin-tablet lg:px-8 xl:px-margin relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12">
          {/* Atelier Contact Info & Map Card */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="flex flex-col gap-4">
              <span className="font-label-eyebrow text-label-eyebrow text-[#A6A182] uppercase tracking-[0.25em] font-semibold">
                Connect With Us
              </span>
              <h2 className="font-sans text-2xl sm:text-3xl lg:text-[42px] text-white font-semibold tracking-tight leading-tight">
                Let’s Discuss Your Project
              </h2>
              <p className="font-body-md text-sm sm:text-base text-on-surface-variant font-light leading-relaxed">
                Have questions or ready to bring your dream space to life? Reach out to our design concierge for
                tailored guidance and an in-person studio appointment.
              </p>
              <div className="space-y-3.5 pt-2 sm:pt-4 font-body-sm text-body-sm">
                <div className="flex items-start gap-3 p-3.5 sm:p-4 bg-surface-charcoal border border-border-champagne-subtle">
                  <MapPin className="w-5 h-5 text-[#A6A182] mt-0.5 shrink-0" />
                  <div>
                    <span className="text-white font-medium block">Office Address:</span>
                    <span className="text-[#c5c5cb]">
                      5th Floor, Summit Building, Vibhuti Khand, Gomti Nagar, Lucknow, UP - 226010
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3.5 sm:p-4 bg-surface-charcoal border border-border-champagne-subtle">
                  <Phone className="w-5 h-5 text-[#A6A182] shrink-0" />
                  <div>
                    <span className="text-white font-medium block">Direct Studio Line:</span>
                    <a className="text-white hover:underline" href="tel:+919324241800">
                      +91 9324241800
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3.5 sm:p-4 bg-surface-charcoal border border-border-champagne-subtle">
                  <Mail className="w-5 h-5 text-[#A6A182] shrink-0" />
                  <div>
                    <span className="text-white font-medium block">Inquiry Email:</span>
                    <a className="text-[#c5c5cb] hover:text-white" href="mailto:interior@studio24byshreya.com">
                      interior@studio24byshreya.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Studio Location Interactive Google Map Frame */}
            <div className="mt-6 sm:mt-8">
              <span className="font-label-caption text-label-caption text-[#A6A182] uppercase mb-2 block text-xs">
                Studio Atelier Location
              </span>
              <div className="w-full h-48 sm:h-56 border border-border-champagne-subtle relative overflow-hidden bg-surface-charcoal">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.2047144740227!2d81.0120606!3d26.8652363!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x81b870923d596069%3A0x6071e05e2577c8a5!2sStudio24%20by%20Shreya!5e0!3m2!1sen!2sin!4v1792654000251!5m2!1sen!2sin"
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="Studio24 by Shreya Google Map Location"
                />
              </div>
            </div>
          </div>

          {/* Consultation Booking Form Card */}
          <div className="lg:col-span-7 bg-surface-charcoal p-4 xs:p-6 sm:p-8 md:p-12 border border-border-champagne-subtle shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 sm:pb-6 border-b border-border-champagne-subtle mb-5 sm:mb-8">
              <h3 className="font-sans text-base xs:text-lg sm:text-xl md:text-2xl font-semibold text-white">
                Request Complimentary Consultation
              </h3>
              <span className="font-label-caption text-label-caption text-[#A6A182] uppercase tracking-widest text-[10px] sm:text-xs">
                Step 01 / 02
              </span>
            </div>

            {status === 'success' && successData ? (
              <div className="py-8 text-center space-y-4 animate-in fade-in-50">
                <div className="w-16 h-16 mx-auto rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white">
                  <CheckCircle2 className="w-8 h-8 text-[#A6A182]" />
                </div>
                <h4 className="font-sans text-2xl font-semibold text-white">Consultation Request Confirmed</h4>
                <p className="text-zinc-300 text-sm max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="text-white font-medium">{successData.fullName}</span>. Studio24 design
                  concierge has logged your inquiry for{' '}
                  <span className="text-white font-medium">{successData.serviceType}</span> and will reach out to you
                  within 24 hours.
                </p>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="px-6 py-2.5 bg-white text-black text-xs font-semibold uppercase tracking-wider hover:bg-zinc-200 transition-colors cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form className="space-y-6" id="consultation-form" onSubmit={handleSubmit}>
                {status === 'error' && (
                  <div className="p-3 bg-red-950/40 border border-red-500/30 text-red-200 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="fullName"
                      className="font-label-caption text-label-caption uppercase tracking-wider text-zinc-300 font-medium text-xs"
                    >
                      Your Full Name *
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-white/20 focus:border-white py-2.5 text-white text-base md:text-body-md focus:outline-none placeholder:text-zinc-500 transition-colors"
                      placeholder="e.g. Vikramaditya Singh"
                      required
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="phone"
                      className="font-label-caption text-label-caption uppercase tracking-wider text-zinc-300 font-medium text-xs"
                    >
                      Phone Number *
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-white/20 focus:border-white py-2.5 text-white text-base md:text-body-md focus:outline-none placeholder:text-zinc-500 transition-colors"
                      placeholder="+91 98765 43210"
                      required
                      type="tel"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="serviceType"
                      className="font-label-caption text-label-caption uppercase tracking-wider text-zinc-300 font-medium text-xs"
                    >
                      Service Type *
                    </label>
                    <select
                      id="serviceType"
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleChange}
                      className="w-full bg-surface-charcoal border-b border-white/20 focus:border-white py-2.5 text-white text-base md:text-body-md focus:outline-none transition-colors"
                    >
                      <option className="bg-surface-noir" value="Full Turnkey Residential">
                        Full Turnkey Residential
                      </option>
                      <option className="bg-surface-noir" value="Modular Kitchen & Wardrobes">
                        Modular Kitchen &amp; Wardrobes
                      </option>
                      <option className="bg-surface-noir" value="Commercial Office Atelier">
                        Commercial Office Atelier
                      </option>
                      <option className="bg-surface-noir" value="Complete Home Renovation">
                        Complete Home Renovation
                      </option>
                      <option className="bg-surface-noir" value="Design & 3D Consultation Only">
                        Design &amp; 3D Consultation Only
                      </option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="propertyConfig"
                      className="font-label-caption text-label-caption uppercase tracking-wider text-zinc-300 font-medium text-xs"
                    >
                      Property Configuration *
                    </label>
                    <select
                      id="propertyConfig"
                      name="propertyConfig"
                      value={formData.propertyConfig}
                      onChange={handleChange}
                      className="w-full bg-surface-charcoal border-b border-white/20 focus:border-white py-2.5 text-white text-base md:text-body-md focus:outline-none transition-colors"
                    >
                      <option className="bg-surface-noir" value="3BHK Apartment (1,500 - 2,400 sq.ft)">
                        3BHK Apartment (1,500 - 2,400 sq.ft)
                      </option>
                      <option className="bg-surface-noir" value="2BHK Apartment (900 - 1,400 sq.ft)">
                        2BHK Apartment (900 - 1,400 sq.ft)
                      </option>
                      <option className="bg-surface-noir" value="Luxury Duplex / Penthouse (3,000+ sq.ft)">
                        Luxury Duplex / Penthouse (3,000+ sq.ft)
                      </option>
                      <option className="bg-surface-noir" value="Independent Villa / Bungalow">
                        Independent Villa / Bungalow
                      </option>
                      <option className="bg-surface-noir" value="Commercial Corporate Space">
                        Commercial Corporate Space
                      </option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="locationBudget"
                    className="font-label-caption text-label-caption uppercase tracking-wider text-zinc-300 font-medium text-xs"
                  >
                    Location in Lucknow / Budget Vision
                  </label>
                  <input
                    id="locationBudget"
                    name="locationBudget"
                    value={formData.locationBudget}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-white/20 focus:border-white py-2.5 text-white text-base md:text-body-md focus:outline-none placeholder:text-zinc-500 transition-colors"
                    placeholder="e.g. Gomti Nagar Phase 2, Budget around ₹10 - 15 Lakhs"
                    type="text"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="notes"
                    className="font-label-caption text-label-caption uppercase tracking-wider text-zinc-300 font-medium text-xs"
                  >
                    Project Details / Architectural Notes
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-white/20 focus:border-white py-2.5 text-white text-base md:text-body-md focus:outline-none placeholder:text-zinc-500 transition-colors resize-none"
                    placeholder="Describe your design aspirations, preferred aesthetics, timeline expectations..."
                    rows={3}
                  />
                </div>

                <div className="pt-3 sm:pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <button
                    disabled={status === 'loading'}
                    className="w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 bg-white text-black font-semibold text-xs sm:text-sm uppercase tracking-widest min-h-[44px] hover:bg-zinc-200 transition-all shadow-[0_4px_25px_rgba(255,255,255,0.15)] flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                    type="submit"
                  >
                    {status === 'loading' ? (
                      <>
                        <span>Submitting...</span>
                        <Loader2 className="w-4 h-4 animate-spin" />
                      </>
                    ) : (
                      <>
                        <span>Confirm Consultation Call</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                  <span className="font-label-caption text-label-caption text-zinc-400 text-center sm:text-right text-[11px] sm:text-xs">
                    100% Free Initial Assessment • Zero Obligation
                  </span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
