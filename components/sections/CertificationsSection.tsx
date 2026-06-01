'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] },
  }),
};

const certifications = [
  {
    title: 'Ethics Review of Health Research',
    issuer: 'Healthcare Research Authority',
    status: 'Professional',
    icon: '⚖️',
    color: '#2dd4bf',
    desc: 'Research ethics, ethical review processes, and responsible conduct of health research.',
  },
  {
    title: 'Scientific Writing in Health Research',
    issuer: 'Academic Medical Consortium',
    status: 'Advanced',
    icon: '✍️',
    color: '#60a5fa',
    desc: 'Scientific communication, research writing, manuscript preparation, and academic publication.',
  },
  {
    title: 'AI in Women’s Health',
    issuer: 'Healthcare Innovation Summit',
    status: 'Participation',
    icon: '🤖',
    color: '#a78bfa',
    desc: 'Artificial Intelligence applications in women\'s health and future healthcare innovations.',
  },
  {
    title: 'Medical Coding Certification',
    issuer: 'E-Cell IIT Hyderabad · Skill Duniya',
    status: 'Certified',
    icon: '🔢',
    color: '#f43f5e',
    desc: 'Medical coding fundamentals, healthcare documentation, and coding systems (ICD/CPT).',
  },
];

const conferenceBullets = [
  'International academic exposure',
  'Professional networking',
  'Current healthcare developments',
  'Learning from healthcare experts',
];

const workshops = [
  'Clinical Pharmacy',
  'Pharmacovigilance',
  'Healthcare Quality',
  'Medication Safety',
  'AI in Healthcare',
  'Research Methodology',
  'Emerging Healthcare Technologies',
];

export default function CertificationsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="certifications" className="section-padding scroll-mt-24" ref={ref}>
      <div className="container">
        <div className="section-divider mb-20" />

        {/* Centered Chapter Heading */}
        <div className="text-center w-full max-w-3xl mx-auto mb-5 flex flex-col items-center">
          <motion.span
            custom={0} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
            className="eyebrow block mb-4"
          >
            Credentials &amp; Milestones
          </motion.span>
          <motion.h2
            custom={1} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
            className="display-lg text-white font-extrabold tracking-tight uppercase"
          >
            CERTIFICATIONS &amp; ACHIEVEMENTS
          </motion.h2>
        </div>

        {/* Certifications grid (Merged into one grid to keep spacing uniform and spacious) */}
        <div className="grid sm:grid-cols-2 gap-8 lg:gap-10">
          {certifications.map((c, i) => (
            <motion.div
              key={c.title}
              custom={i + 2} variants={fadeUp}
              initial="hidden" animate={inView ? 'visible' : 'hidden'}
              className="relative card p-8 flex flex-col items-center justify-between h-full border border-[#2dd4bf]/15 bg-[#0f0f1a]/20 shadow-[0_4px_25px_rgba(0,0,0,0.15)] transition-all duration-300 hover:scale-[1.01]"
            >
              <span className="text-[8px] font-mono text-[#475569]/70 absolute top-3 right-3 font-bold tracking-widest select-none">[CRED.CERT // AUTH.0{i+1}]</span>
              <div className="flex flex-col items-center text-center w-full">
                {/* Glowing Icon Container */}
                <div className="w-12 h-12 rounded-xl bg-[#2dd4bf]/10 border border-[#2dd4bf]/20 flex items-center justify-center text-xl mb-4 shadow-[0_0_15px_rgba(45,212,191,0.1)]">
                  {c.icon}
                </div>
                {/* Title */}
                <h4 className="text-white text-xs font-bold font-mono uppercase tracking-tight text-center mb-1">{c.title}</h4>
                {/* Issuer */}
                <p className="text-[#94a3b8] text-[10px] text-center mb-3">{c.issuer}</p>
                {/* Status Tag */}
                <div className="flex justify-center mb-4">
                  <span className="tag tag-teal text-[9px] font-semibold py-0.5 px-2 bg-[#2dd4bf]/10 text-[#2dd4bf] border-[#2dd4bf]/20">
                    {c.status}
                  </span>
                </div>
                {/* Description */}
                <p className="text-[#cbd5e1] text-xs leading-relaxed text-center">{c.desc}</p>
              </div>
            </motion.div>
          ))}

          {/* 1. Conferences & Academic Events card */}
          <motion.div
            custom={6} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
            className="relative card p-8 border border-[#2dd4bf]/15 bg-[#0f0f1a]/20 shadow-[0_4px_25px_rgba(0,0,0,0.15)] flex flex-col justify-between"
          >
            <span className="text-[8px] font-mono text-[#475569]/70 absolute top-3 right-3 font-bold tracking-widest select-none">[CONF.ACD // IPCON.26]</span>
            <div>
              <span className="text-[#475569] text-[9px] font-mono font-bold tracking-widest block mb-6 text-center">
                CONFERENCES &amp; ACADEMIC EVENTS
              </span>
              <div className="flex flex-col items-center justify-center mb-6 text-center">
                <span className="text-2xl mb-2">🌐</span>
                <div>
                  <h4 className="text-white text-sm font-bold font-mono uppercase tracking-tight">
                    IPCON International Conference
                  </h4>
                  <p className="text-[#2dd4bf] text-[10px] font-mono mt-1">International Pharmacy Conference (IPCON)</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 mt-6 max-w-md mx-auto">
                {conferenceBullets.map((bullet, idx) => (
                  <div key={idx} className="flex items-center justify-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2dd4bf] flex-shrink-0 animate-pulse" />
                    <span className="text-[#cbd5e1] text-[11px] font-semibold text-center sm:text-left">{bullet}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* 2. Seminars & Workshops */}
          <motion.div
            custom={7} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
            className="relative card p-8 border border-[#2dd4bf]/15 bg-[#0f0f1a]/20 shadow-[0_4px_25px_rgba(0,0,0,0.15)] flex flex-col justify-between"
          >
            <span className="text-[8px] font-mono text-[#475569]/70 absolute top-3 right-3 font-bold tracking-widest select-none">[SEM.WKS // 07.CLN]</span>
            <div>
              <span className="text-[#475569] text-[9px] font-mono font-bold tracking-widest block mb-6 text-center">
                SEMINARS &amp; WORKSHOPS
              </span>
              <div className="flex flex-wrap gap-2.5 justify-center mt-6">
                {workshops.map((w, idx) => (
                  <span
                    key={idx}
                    className="tag text-[10px] py-2 px-3 bg-white/[0.015] border-white/[0.04] text-[#cbd5e1] font-semibold"
                  >
                    {w}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>


      </div>
    </section>
  );
}
