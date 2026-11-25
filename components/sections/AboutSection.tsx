'use client';

import dynamic from 'next/dynamic';
import { ArrowRight } from 'lucide-react';
import { biography, clinicalFocus, credentials, heroBio, heroStats, specializations } from '@/lib/content';
import SectionHeading from '@/components/ui/SectionHeading';
import { CountUp, Reveal } from '@/components/ui/Motion';
import { useSmoothScroll } from '@/components/providers/SmoothScroll';
import { credentialIcons } from '@/components/ui/Icons';
import TiltCard from '@/components/ui/TiltCard';

const CapsuleScene = dynamic(() => import('@/components/three/HeroScene'), { ssr: false });

function SpecialtyMarquee() {
  const row = [...specializations, ...specializations];
  return (
    <div className="mt-24 md:mt-32">
      <Reveal>
        <div className="shell mb-6 flex items-center gap-3">
          <span className="h-px w-10 bg-accent/50" />
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
              <span className={i % 2 ? 'font-serif italic text-ice-2/70' : ''}>{s}</span>
              <span className="text-2xl text-gold md:text-3xl">✦</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function AboutSection() {
  const [lead, ...rest] = biography;
  const { scrollTo } = useSmoothScroll();
  return (
    <section id="about" className="section pt-10 md:pt-16">
      <div className="shell">
        <SectionHeading index="01" label="Biography & Dossier" title="Rooted in the clinic," accent="driven by evidence." />

        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="min-w-0 lg:col-span-7">
            <Reveal>
              <p className="font-serif text-[28px] leading-[1.25] text-ice md:text-[36px]">{heroBio}</p>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-6 text-[15px] leading-[1.85] text-ice-2/85">{lead}</p>
            </Reveal>
            {rest.map((p, i) => (
              <Reveal key={i} delay={0.1 + i * 0.08}>
                <p className="mt-6 text-[15px] leading-[1.85] text-ice-2/85">{p}</p>
              </Reveal>
            ))}

            <Reveal delay={0.2}>
              <blockquote className="mt-10 border-l-2 border-gold/70 pl-5">
                <span className="eyebrow mb-2 block text-gold">Clinical focus</span>
                <p className="font-serif text-xl italic leading-snug text-ice sm:text-2xl">&ldquo;{clinicalFocus}&rdquo;</p>
              </blockquote>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="mt-10 flex flex-wrap gap-3">
                <button
                  onClick={() => scrollTo('experience')}
                  className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-accent-soft"
                >
                  Explore clinical clerkships
                  <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
                </button>
                <button
                  onClick={() => scrollTo('contact')}
                  className="inline-flex items-center gap-2 rounded-full border border-ice/15 px-6 py-3.5 text-sm font-semibold text-ice transition-colors hover:border-ice/40 hover:bg-ice/5"
                >
                  Send message
                </button>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <dl className="mt-12 grid max-w-xl grid-cols-3 gap-6 border-t border-line pt-8">
                {heroStats.map(s => (
                  <div key={s.label} className="flex flex-col">
                    <dt className="order-last mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-mist">{s.label}</dt>
                    <dd className="font-display text-4xl text-ice sm:text-5xl">
                      <CountUp value={s.value} suffix={s.suffix} />
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="min-w-0 lg:col-span-5">
            <div className="glass relative h-[420px] overflow-hidden rounded-[28px] lg:sticky lg:top-28 lg:h-[560px]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgb(255_73_61/0.18),transparent_60%)]" />
              <CapsuleScene small />
              <div className="absolute inset-x-6 bottom-6">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent/90">Doctor of Pharmacy</div>
                  <div className="font-display text-3xl text-ice">Pharm.D</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Dossier */}
        <div className="mt-16 md:mt-24">
          <Reveal>
            <div className="mb-8 flex items-center gap-3">
              <span className="h-px w-10 bg-accent/50" />
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
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-accent/30 bg-accent/10 text-accent">
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
