import React from 'react';
import ArchitecturalBackgroundLines from '@/components/ArchitecturalBackgroundLines';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import OverviewSection from '@/components/OverviewSection';
import AboutSection from '@/components/AboutSection';
import WhatWeDesignSection from '@/components/WhatWeDesignSection';
import ServicesSection from '@/components/ServicesSection';
import PortfolioSection from '@/components/PortfolioSection';
import WhyUsSection from '@/components/WhyUsSection';
import ProcessSection from '@/components/ProcessSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import FaqSection from '@/components/FaqSection';
import BlogSection from '@/components/BlogSection';
import ConsultationSection from '@/components/ConsultationSection';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';

export default function HomePage() {
  return (
    <>
      {/* Background Falling Light Drop Streaks */}
      <ArchitecturalBackgroundLines />

      {/* Fixed Sticky Header Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main className="w-full pt-20 bg-transparent relative z-2">
        <div className="flex flex-col w-full text-on-surface relative z-2">
          {/* Section 1: Cinematic Hero */}
          <HeroSection />

          {/* Section 2: Best Interior Designers in Gomti Nagar Overview */}
          <OverviewSection />

          {/* Section 3: About Studio24 & Founder Spotlight */}
          <AboutSection />

          {/* Section 4: What We Design (12 Categories) */}
          <WhatWeDesignSection />

          {/* Section 5: Bespoke Services Showcase */}
          <ServicesSection />

          {/* Section 6: Featured Projects Curated Portfolio Carousel */}
          <PortfolioSection />

          {/* Section 7: Why Choose Studio24 (6 Pillars) */}
          <WhyUsSection />

          {/* Section 8: Turnkey Process Timeline */}
          <ProcessSection />

          {/* Section 9: Client Testimonials */}
          <TestimonialsSection />

          {/* Section 10: FAQ Accordion */}
          <FaqSection />

          {/* Section 11: Monograph & Journal */}
          <BlogSection />

          {/* Section 12: Consultation Booking Form & Studio Location */}
          <ConsultationSection />
        </div>
      </main>

      {/* Atelier Minimal Noir Grid Footer */}
      <Footer />

      {/* Concierge Floating WhatsApp Quick Connect */}
      <FloatingWhatsApp />
    </>
  );
}
