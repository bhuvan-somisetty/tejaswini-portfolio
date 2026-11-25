'use client';

import { Globe } from 'lucide-react';
import { certifications, conference, workshops } from '@/lib/content';
import SectionHeading from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Motion';
import { certIcons } from '@/components/ui/Icons';
import TiltCard from '@/components/ui/TiltCard';

export default function CertificationsSection() {
  return (
    <section id="certifications" className="section">
      <div className="shell">
        <SectionHeading index="06" label="Credentials & Milestones" title="Certifications &" accent="achievements." />

        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {certifications.map((c, i) => {
            const Icon = certIcons[c.icon];
            return (
              <Reveal as="li" key={c.title} delay={(i % 3) * 0.08}>
                <TiltCard max={7} className="glass h-full overflow-hidden rounded-[28px]">
                  <div className="relative flex h-full flex-col p-7">
                    <div className="flex items-start justify-between gap-4">
                      <span className="grid h-12 w-12 place-items-center rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/20 to-transparent text-accent">
                        <Icon className="h-5 w-5" strokeWidth={1.6} />
                      </span>
                      <span className="rounded-full border border-ice/12 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ice-2">
                        {c.status}
                      </span>
                    </div>
                    <h3 className="mt-6 font-display text-[26px] leading-tight text-ice">{c.title}</h3>
                    <p className="mt-1.5 font-mono text-[11px] text-mist">{c.issuer}</p>
                    <p className="mt-4 text-[14px] leading-relaxed text-ice-2/85">{c.desc}</p>
                  </div>
                </TiltCard>
              </Reveal>
            );
          })}

          {/* Conference */}
          <Reveal as="li" delay={0.16}>
            <TiltCard max={7} className="h-full overflow-hidden rounded-[28px] border border-accent/25 bg-gradient-to-br from-accent/[0.12] via-ink-2/80 to-ink-2/80">
              <div className="relative flex h-full flex-col p-7">
                <div className="flex items-start justify-between gap-4">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent text-ink">
                    <Globe className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  <span className="rounded-full border border-accent/40 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
                    {conference.role}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-[26px] leading-tight text-ice">{conference.name}</h3>
                <p className="mt-1.5 font-mono text-[11px] text-mist">{conference.full}</p>
                <ul className="mt-4 grid gap-2">
                  {conference.outcomes.map(o => (
                    <li key={o} className="flex items-center gap-3 text-[14px] text-ice-2/90">
                      <span className="h-1 w-1 rounded-full bg-accent" />
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
            </TiltCard>
          </Reveal>
        </ul>

        {/* Seminars & workshops */}
        <Reveal>
          <div className="glass mt-6 flex flex-col gap-6 rounded-[28px] p-7 md:flex-row md:items-center md:p-9">
            <div className="md:w-64 md:shrink-0">
              <h3 className="font-display text-3xl text-ice">
                Seminars &amp; <span className="font-serif italic text-accent-soft">workshops</span>
              </h3>
              <p className="mt-1.5 text-[13px] text-mist">Academic sessions attended on</p>
            </div>
            <ul className="flex flex-wrap gap-2.5">
              {workshops.map(w => (
                <li key={w} className="chip text-[13.5px]">
                  {w}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
