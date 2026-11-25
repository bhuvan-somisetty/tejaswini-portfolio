'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import ThesisViewer from '@/components/ui/ThesisViewer';

const THESIS_TITLE =
  'A Prospective Observational Study on Compliance with WHO AWaRe Classification in Prescribing Antibiotics in Critical Care Units at a Tertiary Care Hospital';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] },
  }),
};

const researchMethodology = [
  { step: '01', name: 'Literature Review', detail: 'Reviewed WHO, ICMR and published ICU studies on antibiotic use and resistance.' },
  { step: '02', name: 'Data Collection', detail: 'Enrolled 200 ICU and HICU patients prospectively using a structured data collection form.' },
  { step: '03', name: 'Data Documentation', detail: 'Recorded 341 antibiotics with culture, susceptibility, ADR and IV-to-oral details.' },
  { step: '04', name: 'Research Analysis', detail: 'Classified drugs by WHO AWaRe 2023/2025; chi-square, Fisher’s exact and t-tests.' },
  { step: '05', name: 'Report Preparation', detail: 'Wrote and submitted the dissertation to RGUHS for the Pharm.D degree.' },
];

const awareResults = [
  { name: 'Access', pct: 6.74, color: '#2dd4bf' },
  { name: 'Watch', pct: 70.09, color: '#fbbf24' },
  { name: 'Reserve', pct: 23.17, color: '#f43f5e' },
];

const studyStats = [
  { val: '200', label: 'ICU & HICU patients' },
  { val: '341', label: 'Antibiotics assessed' },
  { val: '5.0%', label: 'Patients with an ADR' },
  { val: '6.5%', label: 'IV-to-oral conversion' },
  { val: '8.5%', label: 'Therapeutic duplication' },
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
      'Patient Counselling',
      'Drug Information Services',
      'Clinical Documentation',
      'Patient Monitoring',
    ],
  },
  {
    title: 'Healthcare Quality',
    icon: '📋',
    skills: [
      'Clinical Audit Support',
      'Documentation Review',
      'Compliance Monitoring',
      'Quality Indicator Assessment',
      'Patient Safety Practices',
      'Quality Improvement Activities',
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
      'Evidence-Based Medicine',
      'Research Analysis',
    ],
  },
  {
    title: 'Technical Skills',
    icon: '💻',
    skills: [
      'Microsoft Word / Excel',
      'Microsoft PowerPoint',
      'Medical Documentation',
      'Healthcare Data Mgmt',
      'Medical Coding (ICD-10)',
    ],
  },
];

const strengths = [
  'Analytical Thinking',
  'Communication Skills',
  'Team Collaboration',
  'Attention to Detail',
  'Adaptability',
  'Problem Solving',
  'Professionalism',
  'Time Management',
  'Leadership Potential',
];

export default function ResearchSection() {
  const [thesisOpen, setThesisOpen] = useState(false);

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
              RESEARCH &amp; THESIS
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
            <h3 className="text-white font-bold text-lg md:text-xl leading-snug text-center" style={{ margin: "0 0 12px" }}>
              {THESIS_TITLE}
            </h3>
            <p className="text-[#94a3b8] text-[11px] font-mono text-center" style={{ margin: "0 0 20px" }}>
              Pharm.D Dissertation · Rajiv Gandhi University of Health Sciences · Guide: Dr. Balakeshwa Ramaiah, HOD, Dept. of Pharmacy Practice
            </p>

            {/* Study Description */}
            <p className="text-[#cbd5e1] text-xs md:text-sm leading-relaxed text-center max-w-3xl" style={{ margin: "0 auto 28px" }}>
              Assessed whether antibiotic prescribing in the ICU and HICU of a tertiary care teaching hospital followed the WHO AWaRe (Access, Watch, Reserve) classification, and evaluated prescribing appropriateness, the microbiological and resistance profile, adverse drug reactions, IV-to-oral conversion and therapeutic duplication.
            </p>

            {/* View Thesis */}
            <div className="flex justify-center" style={{ marginBottom: 40 }}>
              <button
                onClick={() => setThesisOpen(true)}
                className="btn-primary text-xs tracking-wider uppercase py-3.5 px-7 font-bold cursor-pointer"
              >
                View Full Thesis
              </button>
            </div>

            {/* Key Findings */}
            <div className="border-t border-white/[0.04]" style={{ paddingTop: 32, marginBottom: 40 }}>
              <span className="text-[#475569] text-[9px] font-mono font-bold tracking-widest block text-center" style={{ marginBottom: 40 }}>
                KEY FINDINGS
              </span>

              {/* AWaRe distribution vs WHO 60% Access target */}
              <div className="max-w-3xl" style={{ margin: "0 auto" }}>
                <div className="relative">
                  <div className="flex h-4 w-full rounded-full overflow-hidden border border-white/[0.06]">
                    {awareResults.map(r => (
                      <motion.div
                        key={r.name}
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${r.pct}%` } : { width: 0 }}
                        transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        style={{ backgroundColor: r.color }}
                        title={`${r.name}: ${r.pct}%`}
                      />
                    ))}
                  </div>
                  <div className="absolute -top-1.5 -bottom-1.5 w-px bg-white/70" style={{ left: '60%' }} />
                  <span className="absolute -top-6 text-[9px] font-mono text-white/80 -translate-x-1/2 whitespace-nowrap" style={{ left: '60%' }}>
                    WHO target: ≥60% Access
                  </span>
                </div>
                <div className="flex flex-wrap justify-center gap-x-6 gap-y-2" style={{ marginTop: 16 }}>
                  {awareResults.map(r => (
                    <div key={r.name} className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: r.color }} />
                      <span className="text-[#cbd5e1] text-[11px] font-semibold">{r.name}</span>
                      <span className="text-white text-[11px] font-mono font-bold">{r.pct}%</span>
                    </div>
                  ))}
                </div>
                <p className="text-[#94a3b8] text-[11px] leading-relaxed text-center" style={{ marginTop: 16 }}>
                  Access antibiotics made up only 6.74% of prescriptions, far below the WHO target. Klebsiella pneumoniae and E. coli were the main isolates, with high resistance to early-generation cephalosporins and ampicillin and emerging colistin resistance.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3" style={{ marginTop: 32 }}>
                {studyStats.map(s => (
                  <div key={s.label} className="card-subtle text-center border border-[#2dd4bf]/10 last:col-span-2 sm:last:col-span-1" style={{ padding: 16 }}>
                    <div className="text-white text-lg font-bold tracking-tight">{s.val}</div>
                    <div className="text-[#94a3b8] text-[9px] font-mono font-bold uppercase tracking-wider mt-1 leading-tight">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

          {/* Visual Blueprints Grid */}
          <div className="grid lg:grid-cols-12 gap-8 text-left mt-8 pt-8 border-t border-white/[0.04]">
            
            {/* Left: Research Activities Pathway Diagram */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <span className="text-[#475569] text-[9px] font-mono font-bold tracking-widest block mb-4 text-center">
                RESEARCH METHODOLOGY
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

        {/* Professional Strengths */}
        <motion.div
          custom={6} variants={fadeUp}
          initial="hidden" animate={skillsInView ? 'visible' : 'hidden'}
          className="text-center" style={{ marginTop: 48 }}
        >
          <span className="text-[#475569] text-[9px] font-mono font-bold tracking-widest block" style={{ marginBottom: 16 }}>
            PROFESSIONAL STRENGTHS
          </span>
          <div className="flex flex-wrap gap-2.5 justify-center max-w-3xl" style={{ margin: "0 auto" }}>
            {strengths.map(s => (
              <span key={s} className="tag text-[10px] py-1.5 px-3 bg-white/[0.015] text-[#cbd5e1] font-semibold">
                {s}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>

    <ThesisViewer open={thesisOpen} onClose={() => setThesisOpen(false)} title={THESIS_TITLE} />
  </>
  );
}
