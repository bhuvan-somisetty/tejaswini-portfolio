'use client';

import { useCallback, useState } from 'react';
import SmoothScroll from '@/components/providers/SmoothScroll';
import Background from '@/components/layout/Background';
import Preloader from '@/components/layout/Preloader';
import Navbar from '@/components/layout/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import ExpertiseSection from '@/components/sections/ExpertiseSection';
import ResearchSection from '@/components/sections/ResearchSection';
import SkillsSection from '@/components/sections/SkillsSection';
import CertificationsSection from '@/components/sections/CertificationsSection';
import ContactSection from '@/components/sections/ContactSection';
import FooterSection from '@/components/sections/FooterSection';

export default function HomePage() {
  const [ready, setReady] = useState(false);
  const onDone = useCallback(() => setReady(true), []);

  return (
    <SmoothScroll>
      <Preloader onDone={onDone} />
      <Background />
      <Navbar show={ready} />
      <div className="relative z-10">
        <main>
          <HeroSection ready={ready} />
          <AboutSection />
          <ExperienceSection />
          <ExpertiseSection />
          <ResearchSection />
          <SkillsSection />
          <CertificationsSection />
          <ContactSection />
        </main>
        <FooterSection />
      </div>
    </SmoothScroll>
  );
}
