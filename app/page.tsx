'use client';

import { useState } from 'react';
import Preloader from '@/components/layout/Preloader';
import Navbar from '@/components/layout/Navbar';
import StarField from '@/components/background/GalaxyBackground';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import HealthcareCommandCenter from '@/components/sections/HealthcareCommandCenter';
import ResearchSection from '@/components/sections/ResearchSection';
import CertificationsSection from '@/components/sections/CertificationsSection';
import ContactSection from '@/components/sections/ContactSection';
import FooterSection from '@/components/sections/FooterSection';

export default function HomePage() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <Preloader onComplete={() => setLoaded(true)} />

      {loaded && (
        <div className="relative min-h-screen">
          {/* Subtle starfield — barely visible */}
          <StarField />

          {/* Page content sits above */}
          <div className="relative z-10">
            <Navbar />
            <main>
              <HeroSection />
              <AboutSection />
              <ExperienceSection />
              <HealthcareCommandCenter />
              <ResearchSection />
              <CertificationsSection />
              <ContactSection />
            </main>
            <FooterSection />
          </div>
        </div>
      )}
    </>
  );
}
