'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { domains, milestones } from '@/lib/content';
import SectionHeading from '@/components/ui/SectionHeading';
import { EASE, Reveal } from '@/components/ui/Motion';
import { domainIcons } from '@/components/ui/Icons';
import TiltCard from '@/components/ui/TiltCard';

export default function ExpertiseSection() {
  const [activeId, setActiveId] = useState(domains[0].id);
  const active = domains.find(d => d.id === activeId) ?? domains[0];
  const ActiveIcon = domainIcons[active.icon];

  return (
    <section id="expertise" className="section">
      <div className="shell">
        <SectionHeading
          index="03"
          label="Clinical Competence Mapping"
          title="Healthcare"
          accent="expertise."
          intro="Eight practice domains, each with the clinical action workflow followed on the wards."
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Domain selector */}
          <Reveal className="min-w-0 lg:col-span-4">
            <div role="tablist" aria-label="Clinical specialties" className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
              {domains.map((d, i) => {
                const Icon = domainIcons[d.icon];
                const on = d.id === activeId;
                return (
                  <button
                    key={d.id}
                    role="tab"
                    id={`tab-${d.id}`}
                    aria-selected={on}
                    aria-controls="domain-panel"
                    onClick={() => setActiveId(d.id)}
                    className={`group relative flex shrink-0 items-center gap-3 rounded-2xl px-4 py-3.5 text-left transition-colors duration-500 ${
                      on ? 'text-ice' : 'text-mist hover:text-ice'
                    }`}
                  >
                    {on && (
                      <motion.span
                        layoutId="domain-active"
                        className="absolute inset-0 rounded-2xl border border-accent/30 bg-accent/[0.08]"
                        transition={{ duration: 0.55, ease: EASE }}
                      />
                    )}
                    <span className="relative font-mono text-[10px] text-fog">0{i + 1}</span>
                    <Icon className={`relative h-4 w-4 ${on ? 'text-accent' : ''}`} strokeWidth={1.7} />
                    <span className="relative whitespace-nowrap text-[14px] font-semibold">{d.title}</span>
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* Workflow panel */}
          <Reveal delay={0.1} className="min-w-0 lg:col-span-8">
            <TiltCard max={3} className="glass min-h-[460px] overflow-hidden rounded-[32px]">
              <div id="domain-panel" role="tabpanel" aria-labelledby={`tab-${active.id}`} className="relative p-7 md:p-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.id}
                    initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
                    transition={{ duration: 0.5, ease: EASE }}
                  >
                    <div className="flex items-start justify-between gap-6">
                      <div>
                        <span className="eyebrow text-gold">Practice domain</span>
                        <h3 className="mt-3 font-display text-4xl leading-tight text-ice md:text-5xl">{active.title}</h3>
                      </div>
                      <span className="grid h-16 w-16 shrink-0 place-items-center rounded-3xl border border-accent/30 bg-gradient-to-br from-accent/20 to-transparent text-accent">
                        <ActiveIcon className="h-7 w-7" strokeWidth={1.5} />
                      </span>
                    </div>
                    <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-ice-2/85">{active.description}</p>

                    <div className="mt-9">
                      <span className="eyebrow">Clinical action workflow</span>
                      <ol className="relative mt-5 grid gap-4 sm:grid-cols-2">
                        {active.workflow.map((step, i) => (
                          <motion.li
                            key={step.title}
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.12 + i * 0.07, ease: EASE }}
                            className="rounded-2xl border border-line bg-ice/[0.025] p-5 transition-colors duration-500 hover:border-accent/30"
                          >
                            <div className="flex items-center gap-3">
                              <span className="grid h-7 w-7 place-items-center rounded-full border border-accent/40 font-mono text-[10px] text-accent">
                                0{i + 1}
                              </span>
                              <h4 className="text-[14.5px] font-semibold text-ice">{step.title}</h4>
                            </div>
                            <p className="mt-2.5 text-[13.5px] leading-relaxed text-ice-2/80">{step.desc}</p>
                          </motion.li>
                        ))}
                      </ol>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </TiltCard>
          </Reveal>
        </div>

        {/* Milestones */}
        <ul className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {milestones.map((m, i) => (
            <Reveal as="li" key={m.term} delay={i * 0.07}>
              <div className="h-full rounded-3xl border border-line bg-ice/[0.02] p-6 transition-colors duration-500 hover:border-accent/30">
                <div className="font-serif text-2xl italic text-accent-soft md:text-3xl">{m.term}</div>
                <div className="mt-2 text-[13px] font-semibold leading-snug text-ice-2">{m.label}</div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
