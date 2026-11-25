'use client';

import { ArrowUp } from 'lucide-react';
import { profile } from '@/lib/content';
import { useSmoothScroll } from '@/components/providers/SmoothScroll';
import { Reveal } from '@/components/ui/Motion';

export default function FooterSection() {
  const { scrollTo } = useSmoothScroll();
  return (
    <footer className="relative overflow-hidden border-t border-line pt-16">
      <div className="shell">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="font-display text-2xl text-ice">
              {profile.firstName}
              <span className="text-accent">.</span>
            </div>
            <div className="mt-1 text-[13px] text-mist">Pharm.D Candidate · Bengaluru, India</div>
          </div>
          <nav aria-label="Footer" className="flex flex-wrap items-center gap-6 text-[13px]">
            <a href={`mailto:${profile.email}`} className="text-ice-2 transition-colors hover:text-accent">
              Email
            </a>
            <a href={profile.phoneHref} className="text-ice-2 transition-colors hover:text-accent">
              Phone
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-ice-2 transition-colors hover:text-accent">
              LinkedIn
            </a>
            <button
              onClick={() => scrollTo('hero')}
              className="inline-flex items-center gap-1.5 rounded-full border border-ice/12 px-4 py-2 text-ice-2 transition-colors hover:border-accent/50 hover:text-ice"
            >
              Back to top <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </nav>
        </div>
      </div>

      <Reveal y={60}>
        <div
          aria-hidden
          className="mt-12 select-none whitespace-nowrap text-center font-display leading-[0.8] text-transparent [-webkit-text-stroke:1px_rgb(255_240_213/0.16)] text-[clamp(80px,19vw,300px)]"
        >
          Tejaswini <span className="italic">S.</span>
        </div>
      </Reveal>

      <div className="shell flex flex-col items-center justify-between gap-2 border-t border-line py-6 text-[12px] text-fog sm:flex-row">
        <span>© {new Date().getFullYear()} Tejaswini Somisetty</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em]">Clinical Pharmacy · Patient Safety · Research</span>
      </div>
    </footer>
  );
}
