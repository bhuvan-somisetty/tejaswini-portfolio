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

const researchMethodology = [
  { step: '01', name: 'Literature Review', detail: 'Appraising global guidelines and critical care AMR studies.' },
  { step: '02', name: 'Data Collection', detail: 'Prospective screening of inpatient prescription charts.' },
  { step: '03', name: 'WHO Benchmarking', detail: 'Evaluating drug use compliance against AWaRe criteria.' },
  { step: '04', name: 'Intervention Plan', detail: 'Designing de-escalation protocols to combat resistance.' },
];

const awareFramework = [
  { name: 'Access Classification', desc: 'First-line options with lower resistance potential.', drugs: 'Amoxicillin, Ampicillin, Cephalexin', color: '#2dd4bf', glow: 'rgba(45, 212, 191, 0.1)' },
  { name: 'Watch Classification', desc: 'Restricted options with higher resistance potential.', drugs: 'Ciprofloxacin, Azithromycin, Ceftriaxone', color: '#fbbf24', glow: 'rgba(251, 191, 36, 0.1)' },
  { name: 'Reserve Classification', desc: 'Last-resort options for multi-drug resistant strains.', drugs: 'Colistin, Linezolid, Polymyxin B', color: '#f43f5e', glow: 'rgba(244, 63, 94, 0.1)' },
];

const expertiseTags = [
  'Antibiotic Stewardship',
  'Rational Drug Use',
  'Evidence-Based Medicine',
  'Clinical Research',
  'Healthcare Outcomes',
];

const skillCategories = [
  {
    title: 'Clinical Skills',
    icon: '🏥',
    skills: [
      'Medication Review',
      'Prescription Assessment',
      'ADR Monitoring',
      'Medication Reconciliation',
    ],
  },
  {
    title: 'Healthcare Quality',
    icon: '📋',
    skills: [
      'Clinical Audit Support',
      'Documentation Review',
      'Compliance Monitoring',
    ],
  },
  {
    title: 'Research Skills',
    icon: '🔬',
    skills: [
      'Literature Review',
      'Data Collection',
      'Scientific Writing',
      'Research Documentation',
    ],
  },
  {
    title: 'Technical Skills',
    icon: '💻',
    skills: [
      'Microsoft Word / Excel',
      'PowerPoint Bulletins',
      'Medical Documentation',
      'Healthcare Data Mgmt',
      'Medical Coding (ICD-10)',
    ],
  },
];

export default function ResearchSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const skillsRef = useRef(null);
  const skillsInView = useInView(skillsRef, { once: true, margin: '-80px' });

  return (
    <>
      <section id="research" className="section-padding scroll-mt-24" ref={ref}>
        <div className="container">
          <div className="section-divider mb-20" />

          {/* Centered Chapter Heading */}
          <div className="text-center w-full max-w-3xl mx-auto mb-5 flex flex-col items-center">
            <motion.span
              custom={0} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
              className="eyebrow block mb-4"
            >
              Clinical Studies &amp; Audits
            </motion.span>
            <motion.h2
              custom={1} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
              className="display-lg text-white font-extrabold tracking-tight uppercase"
            >
              RESEARCH &amp; PUBLICATIONS
            </motion.h2>
          </div>

          {/* Cinematic Research Card */}
          <motion.div
            custom={2} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
            className="relative card p-8 border border-[#2dd4bf]/20 bg-[#0f0f1a]/30 shadow-[0_20px_50px_rgba(0,0,0,0.5)] mb-14"
          >
            <span className="text-[8px] font-mono text-[#475569]/70 absolute top-3 right-3 font-bold tracking-widest select-none">[RES.DOC // WHO.AWARE]</span>
            {/* Metadata badges */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 mb-6 text-center">
              <span className="tag text-[9px] font-semibold py-1 px-3 bg-violet-500/10 border-violet-500/25 text-violet-400">
                PROSPECTIVE OBSERVATIONAL STUDY
              </span>
              <span className="tag text-[9px] font-semibold py-1 px-3 bg-[#2dd4bf]/10 border-[#2dd4bf]/25 text-[#2dd4bf]">
                WHO AWARE CLASSIFICATION
              </span>
              <span className="tag text-[9px] font-semibold py-1 px-3 bg-rose-500/10 border-rose-500/25 text-rose-400">
                CRITICAL CARE
              </span>
              <span className="text-[#334155] text-xs font-mono">Bengaluru, India</span>
            </div>

            {/* Research Title */}
            <h3 className="text-white font-bold text-lg md:text-xl leading-snug mb-4 text-center">
              Compliance with WHO AWaRe Classification in Prescribing Antibiotics in Critical Care Units at a Tertiary Care Hospital
            </h3>

            {/* Study Description */}
            <p className="text-[#cbd5e1] text-xs md:text-sm leading-relaxed mb-8 text-center max-w-3xl mx-auto">
              Analyzing antibiotic prescribing patterns in critical care, assessing compliance with the WHO AWaRe (Access, Watch, Reserve) classification framework to identify opportunities for improving rational antibiotic use and combating antimicrobial resistance in ICU settings.
            </p>

          {/* Visual Blueprints Grid */}
          <div className="grid lg:grid-cols-12 gap-8 text-left mt-8 pt-8 border-t border-white/[0.04]">
            
            {/* Left: Research Activities Pathway Diagram */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <span className="text-[#475569] text-[9px] font-mono font-bold tracking-widest block mb-4 text-center">
                RESEARCH METHODOLOGY BLUEPRINT
              </span>
              
              <div className="flex flex-col gap-4 relative">
                <div className="absolute left-[13px] top-4 bottom-4 w-[1px] bg-gradient-to-b from-[#a78bfa]/40 to-transparent" />
                
                {researchMethodology.map((meth, idx) => (
                  <div key={idx} className="flex gap-4 items-start relative z-10">
                    <div className="w-6 h-6 rounded-full bg-[#0f0f1a] border border-[#a78bfa]/30 flex items-center justify-center text-[8px] text-[#a78bfa] font-mono font-bold flex-shrink-0">
                      {meth.step}
                    </div>
                    <div>
                      <h4 className="text-white text-xs font-bold font-mono tracking-tight uppercase">{meth.name}</h4>
                      <p className="text-[#cbd5e1] text-[10px] leading-relaxed mt-0.5">{meth.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: WHO AWaRe Classification Graphic */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <span className="text-[#475569] text-[9px] font-mono font-bold tracking-widest block mb-4 text-center">
                WHO AWARE CLASSIFICATION FRAMEWORK
              </span>
              
              <div className="flex flex-col gap-3">
                {awareFramework.map((aware, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border flex flex-col gap-1 text-left transition-all duration-300 hover:scale-[1.01]"
                    style={{
                      borderColor: `${aware.color}25`,
                      background: `linear-gradient(135deg, ${aware.color}03, transparent)`,
                      boxShadow: `0 4px 20px ${aware.glow}`
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: aware.color }} />
                      <h4 className="text-xs font-bold font-mono uppercase" style={{ color: aware.color }}>{aware.name}</h4>
                    </div>
                    <p className="text-[#cbd5e1] text-[10px] leading-normal">{aware.desc}</p>
                    <div className="text-[9px] font-mono text-[#475569] mt-1 font-bold">
                      EXAMPLES: <span className="text-[#94a3b8]">{aware.drugs}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Bottom tag list */}
          <div className="border-t border-white/[0.04] pt-6 mt-8 flex flex-wrap items-center justify-center gap-3">
            <span className="text-[#475569] text-[9px] font-mono font-bold uppercase tracking-wider mr-2">RESEARCH EXPERTISE</span>
            <div className="flex flex-wrap gap-2.5 justify-center">
              {expertiseTags.map((tag, idx) => (
                <span key={idx} className="tag text-[9px] py-1 px-3 bg-white/[0.015] text-[#94a3b8]">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>

    {/* Dedicated Skills Section */}
    <section id="skills" className="section-padding scroll-mt-24" ref={skillsRef}>
      <div className="container">
        {/* Centered Skills & Competencies Chapter Heading */}
        <div className="mb-5 text-center flex flex-col items-center">
          <motion.span
            custom={0.5} variants={fadeUp} initial="hidden" animate={skillsInView ? 'visible' : 'hidden'}
            className="eyebrow block mb-4"
          >
            Verified Skillsets
          </motion.span>
          <motion.h2
            custom={1} variants={fadeUp} initial="hidden" animate={skillsInView ? 'visible' : 'hidden'}
            className="display-lg text-white font-extrabold tracking-tight uppercase"
          >
            SKILLS &amp; COMPETENCIES
          </motion.h2>
        </div>

        {/* Skills Directory Card Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {skillCategories.map((cat, idx) => (
            <motion.div
              key={idx}
              custom={idx + 2} variants={fadeUp}
              initial="hidden" animate={skillsInView ? 'visible' : 'hidden'}
              className="relative card p-6 flex flex-col border border-[#2dd4bf]/15 bg-[#0f0f1a]/20 shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:border-[#2dd4bf]/40 transition-all duration-300"
            >
              <span className="text-[8px] font-mono text-[#475569]/75 absolute top-2 right-2 font-bold select-none">[SKL.SEC // 0{idx+1}]</span>
              <div>
                {/* Header Centered */}
                <div className="flex items-center justify-center gap-3 mb-5 pb-3 border-b border-white/[0.04]">
                  <span className="text-lg">{cat.icon}</span>
                  <h3 className="text-white text-xs font-bold tracking-tight uppercase font-mono">{cat.title}</h3>
                </div>

                {/* Skills list centered */}
                <div className="flex flex-col gap-2.5 items-center">
                  {cat.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-2.5 text-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2dd4bf]/40 flex-shrink-0" />
                      <span className="text-[#cbd5e1] text-xs font-medium leading-tight">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </>
  );
}
