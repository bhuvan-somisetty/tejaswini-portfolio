'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] },
  }),
};

const links = [
  {
    label: 'Email',
    value: 'tejaswinisomisetty22@gmail.com',
    href: 'mailto:tejaswinisomisetty22@gmail.com',
    icon: '✉',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/tejaswini-somisetty',
    href: 'https://www.linkedin.com/in/tejaswini-somisetty',
    icon: '⌁',
  },
  {
    label: 'Location',
    value: 'Bengaluru, Karnataka, India',
    href: null,
    icon: '◎',
  },
];

const availability = [
  'Clinical Research Associate Positions',
  'Hospital Pharmacy Residency',
  'Healthcare Quality & Accreditation',
  'Pharmacovigilance & Drug Safety Roles',
  'Academic & Teaching Positions',
];

export default function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="contact" className="section-padding scroll-mt-24" ref={ref}>
      <div className="container">
        <div className="section-divider mb-20" />

        {/* Centered Chapter Heading */}
        <div className="text-center w-full max-w-3xl mx-auto mb-5 flex flex-col items-center">
          <motion.span
            custom={0} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
            className="eyebrow block mb-4"
          >
            Communication Channel
          </motion.span>
          <motion.h2
            custom={1} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
            className="display-lg text-white font-extrabold tracking-tight uppercase"
          >
            CONTACT
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* ── Left Column: Contact Links ── */}
          <div className="text-left flex flex-col justify-between h-full min-h-[300px]">
            <div>
              <motion.p
                custom={2} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
                className="text-[#cbd5e1] text-sm leading-[1.8] mb-10"
              >
                Doctor of Pharmacy candidate seeking to contribute to clinical pharmacy, pharmacotherapy research, and hospital quality management. Get in touch to discuss research collaborations or clinical vacancies.
              </motion.p>

              {/* Contact links with generous margin-bottom (mb-16 / 64px spacing) */}
              <div className="flex flex-col gap-6 mb-16">
                {links.map((l, i) => (
                  <motion.div
                    key={l.label}
                    custom={i + 3} variants={fadeUp}
                    initial="hidden" animate={inView ? 'visible' : 'hidden'}
                    className="flex items-center gap-4"
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-base flex-shrink-0 font-mono"
                      style={{
                        background: 'rgba(45,212,191,0.07)',
                        border: '1px solid rgba(45,212,191,0.15)',
                        color: '#2dd4bf',
                      }}
                    >
                      {l.icon}
                    </div>
                    <div>
                      <div className="text-[#475569] text-[0.65rem] tracking-wider uppercase mb-0.5 font-bold font-mono">{l.label}</div>
                      {l.href ? (
                        <a
                          href={l.href}
                          target={l.href.startsWith('http') ? '_blank' : undefined}
                          rel="noopener noreferrer"
                          className="text-[#f1f5f9] text-xs hover:text-[#2dd4bf] transition-colors font-semibold"
                        >
                          {l.value}
                        </a>
                      ) : (
                        <span className="text-[#f1f5f9] text-xs font-semibold">{l.value}</span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Direct Send message CTA with mt-12 lg:mt-16 for additional breathing space */}
            <motion.div
              custom={6} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
              className="mt-12 lg:mt-16"
            >
              <a
                href="mailto:tejaswinisomisetty22@gmail.com"
                className="btn-primary inline-flex text-xs py-3.5 px-7 uppercase font-bold tracking-wider"
              >
                Send a Message
              </a>
            </motion.div>
          </div>

          {/* ── Right Column: Academic Availability ── */}
          <motion.div
            custom={7} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          >
            <div className="relative card p-8 border border-[#2dd4bf]/20 bg-[#0f0f1a]/50 text-center flex flex-col items-center">
              <span className="text-[8px] font-mono text-[#475569]/70 absolute top-3 right-3 font-bold tracking-widest select-none">[SCOPE // ACTIVE]</span>
              <span className="text-[#2dd4bf] text-[9px] tracking-widest uppercase font-mono font-bold block mb-4 text-center">
                PROFESSIONAL SCOPE
              </span>
              
              <h3 className="text-white font-bold text-sm mb-2 uppercase tracking-tight text-center">Focus Clinical Areas</h3>
              <p className="text-[#cbd5e1] text-xs mb-6 text-center">Completing Pharm.D studies in mid-2026 · Available for full-time roles</p>

              <div className="flex flex-col gap-3 items-center justify-center">
                {availability.map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2 + i * 0.05, duration: 0.5 }}
                    className="flex items-center justify-center gap-3 text-center"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2dd4bf] flex-shrink-0 animate-pulse" />
                    <span className="text-[#cbd5e1] text-xs font-semibold">{item}</span>
                  </motion.div>
                ))}
              </div>

              <div className="section-divider my-6 w-full" />

              <div className="text-[#94a3b8] text-[10px] leading-relaxed font-semibold text-center">
                Bengaluru, India · Willing to relocate for clinical pharmacy or safety roles.
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
