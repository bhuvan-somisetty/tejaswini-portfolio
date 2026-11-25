'use client';

import dynamic from 'next/dynamic';
import { biography, credentials, specializations } from '@/lib/content';
import SectionHeading from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Motion';
import { credentialIcons } from '@/components/ui/Icons';
import TiltCard from '@/components/ui/TiltCard';

const DnaScene = dynamic(() => import('@/components/three/DnaScene'), { ssr: false });

function SpecialtyMarquee() {
  const row = [...specializations, ...specializations];
  return (
    <div className="mt-24 md:mt-32">
      <Reveal>
        <div className="shell mb-6 flex items-center gap-3">
          <span className="h-px w-10 bg-tangerine/50" />
          <h3 className="eyebrow">Areas of specialization</h3>
        </div>
      </Reveal>
      <div className="marquee-wrap relative overflow-hidden border-y border-line py-7 [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
        <ul className="marquee" aria-label="Areas of specialization">
          {row.map((s, i) => (
            <li
              key={i}
              aria-hidden={i >= specializations.length}
              className="flex shrink-0 items-center gap-10 pr-10 font-display text-4xl text-ice/90 md:text-6xl"
            >
              <span className={i % 2 ? 'italic text-ice-2/70' : ''}>{s}</span>
              <span className="text-2xl text-tangerine md:text-3xl">✦</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function AboutSection() {
  const [lead, ...rest] = biography;
  return (
    <section id="about" className="section">
      <div className="shell">
        <SectionHeading index="01" label="Biography & Dossier" title="Rooted in the clinic," accent="driven by evidence." />

        <div className="grid items-stretch gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="font-display text-[26px] leading-[1.3] text-ice md:text-[32px]">{lead}</p>
            </Reveal>
            {rest.map((p, i) => (
              <Reveal key={i} delay={0.1 + i * 0.08}>
                <p className="mt-6 text-[15px] leading-[1.85] text-ice-2/85">{p}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15} className="lg:col-span-5">
            <div className="glass relative h-[420px] overflow-hidden rounded-[28px] md:h-full md:min-h-[460px]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgb(47_111_209/0.25),transparent_60%)]" />
              <DnaScene />
              <div className="absolute inset-x-6 bottom-6 flex items-end justify-between">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-tangerine/90">Doctor of Pharmacy</div>
                  <div className="font-display text-2xl text-ice">Pharm.D</div>
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-mist">Class of 2026</div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Dossier */}
        <div className="mt-16 md:mt-24">
          <Reveal>
            <div className="mb-8 flex items-center gap-3">
              <span className="h-px w-10 bg-tangerine/50" />
              <h3 className="eyebrow">Clinical dossier</h3>
            </div>
          </Reveal>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {credentials.map((c, i) => {
              const Icon = credentialIcons[c.icon];
              return (
                <Reveal as="li" key={c.label} delay={i * 0.06}>
                  <TiltCard max={6} className="glass rounded-3xl">
                    <div className="flex h-full items-start gap-4 p-6">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-tangerine/30 bg-tangerine/10 text-tangerine">
                        <Icon className="h-5 w-5" strokeWidth={1.6} />
                      </span>
                      <div>
                        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-mist">{c.label}</div>
                        <div className="mt-1.5 text-[15px] font-semibold text-ice">{c.value}</div>
                      </div>
                    </div>
                  </TiltCard>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>

      <SpecialtyMarquee />
    </section>
  );
}
