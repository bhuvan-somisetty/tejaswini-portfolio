'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const roles = [
  'Clinical Pharmacy Specialist',
  'Antibiotic Stewardship Researcher',
  'Healthcare Quality & Audit Lead',
  'Patient Safety Advocate',
  'Doctor of Pharmacy (Pharm.D)',
];

function useTypewriter(texts: string[]) {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[index];
    let t: ReturnType<typeof setTimeout>;
    if (!deleting && displayed.length < current.length) {
      t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 50);
    } else if (!deleting && displayed.length === current.length) {
      t = setTimeout(() => setDeleting(true), 2500);
    } else if (deleting && displayed.length > 0) {
      t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 25);
    } else {
      setDeleting(false);
      setIndex((index + 1) % texts.length);
    }
    return () => clearTimeout(t);
  }, [displayed, deleting, index, texts]);

  return displayed;
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

function ECGHeartWave() {
  return (
    <div className="w-full flex items-center justify-start h-8 overflow-hidden relative my-6">
      <svg className="w-80 h-8 opacity-75" viewBox="0 0 320 40" fill="none">
        <motion.path
          d="M 0 20 L 60 20 L 70 15 L 75 25 L 80 20 L 100 20 L 110 5 L 118 35 L 126 20 L 170 20 L 180 15 L 185 25 L 190 20 L 210 20 L 220 5 L 228 35 L 236 20 L 320 20"
          stroke="#2dd4bf"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="800"
          animate={{ strokeDashoffset: [800, -800] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
          style={{ filter: 'drop-shadow(0 0 6px rgba(45,212,191,0.6))' }}
        />
      </svg>
    </div>
  );
}

export default function HeroSection() {
  const role = useTypewriter(roles);
  const cardRef = useRef<HTMLDivElement>(null);
  const [mouseCoords, setMouseCoords] = useState({ x: 180, y: 180 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMouseCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center section-padding overflow-hidden scroll-mt-24">
      {/* Subtle background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle 800px at 50% 50%, rgba(45,212,191,0.02), transparent)',
        }}
      />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* ── Left Column: Personal Brand Identity with Generous Breathing Room ── */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Status Subtitle instead of dashboard badge */}
            <motion.div
              custom={0} variants={fadeUp} initial="hidden" animate="visible"
              className="mb-10 text-left"
            >
              <span className="text-[#2dd4bf] text-xs font-semibold tracking-[0.2em] uppercase font-mono italic">
                Future Clinical Scientist · 2026
              </span>
            </motion.div>

            {/* Wordmark Welcomer */}
            <motion.span
              custom={0.5} variants={fadeUp} initial="hidden" animate="visible"
              className="text-[#cbd5e1] text-xs font-semibold tracking-[0.25em] uppercase mb-6 block font-mono"
            >
              WELCOME TO THE RESEARCH PORTFOLIO OF
            </motion.span>

            {/* Name with generous vertical spacing */}
            <div className="mb-10">
              <motion.h1
                className="display-xl text-white tracking-tight leading-tight"
                custom={1} variants={fadeUp} initial="hidden" animate="visible"
              >
                TEJASWINI
              </motion.h1>
              <motion.h1
                className="display-xl gradient-teal tracking-tight leading-tight"
                custom={2} variants={fadeUp} initial="hidden" animate="visible"
              >
                SOMISETTY
              </motion.h1>
            </div>

            {/* Subtitle / Role */}
            <motion.div
              custom={3} variants={fadeUp} initial="hidden" animate="visible"
              className="mb-10 h-7"
            >
              <p className="text-white text-base font-semibold font-mono tracking-tight flex items-center">
                <span className="text-[#94a3b8] mr-2">Pharm.D</span>
                <span className="text-[#2dd4bf]">
                  {role}
                  <span className="animate-pulse ml-0.5">|</span>
                </span>
              </p>
            </motion.div>

            {/* ECG Pulse Animation with proper padding */}
            <motion.div custom={3.5} variants={fadeUp} initial="hidden" animate="visible" className="mb-10">
              <ECGHeartWave />
            </motion.div>

            {/* Bio Paragraph */}
            <motion.p
              custom={4} variants={fadeUp} initial="hidden" animate="visible"
              className="text-[#cbd5e1] text-sm leading-relaxed max-w-xl mb-12"
            >
              Doctor of Pharmacy (Pharm.D) candidate specializing in clinical research, antimicrobial stewardship, and patient-centered pharmacotherapy. Translating complex laboratory data and drug studies into safe hospital rounds and clinical interventions.
            </motion.p>

            {/* Career Philosophy Block (Cinematic Quote) with extra margin */}
            <motion.div
              custom={4.5} variants={fadeUp} initial="hidden" animate="visible"
              className="mb-14 p-8 rounded-xl bg-white/[0.01] border border-white/[0.05] max-w-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
            >
              <span className="text-[10px] font-semibold text-[#2dd4bf] uppercase tracking-wider block mb-2 font-mono">
                CLINICAL FOCUS
              </span>
              <p className="text-[#cbd5e1] text-xs leading-relaxed italic">
                &ldquo;Bridging the gap between molecular research and bedside clinical pharmacy to optimize drug safety and combat multi-drug resistant pathogens.&rdquo;
              </p>
            </motion.div>

            {/* Action Buttons with increased gap */}
            <motion.div
              custom={5} variants={fadeUp} initial="hidden" animate="visible"
              className="flex flex-wrap gap-6 mb-16"
            >
              <a
                href="#about"
                onClick={e => {
                  e.preventDefault();
                  document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-primary text-xs tracking-wider uppercase py-3.5 px-7 font-bold"
              >
                Explore Clinical Clerkships
              </a>
              <a
                href="#contact"
                onClick={e => {
                  e.preventDefault();
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-secondary text-xs tracking-wider uppercase py-3.5 px-7 font-bold"
              >
                Send Message
              </a>
            </motion.div>

            {/* Stats list with border spacing */}
            <motion.div
              custom={6} variants={fadeUp} initial="hidden" animate="visible"
              className="flex items-center gap-12 border-t border-white/[0.04] pt-12 w-full max-w-xl"
            >
              {[
                { val: '5+',  label: 'Certifications' },
                { val: 'ICU+', label: 'Clinical Areas' },
                { val: 'WHO',  label: 'AWaRe Research' },
              ].map((s, i) => (
                <div key={i}>
                  <div className="text-2xl font-bold text-white mb-0.5 tracking-tight">{s.val}</div>
                  <div className="text-[#475569] text-[9px] tracking-wider font-mono font-bold uppercase">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right Column: Cleaned Holographic Console (No Corner Text Clutter) ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex items-center justify-center relative min-h-[440px]"
          >
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              className="relative w-full max-w-[380px] rounded-2xl border border-[#2dd4bf]/20 bg-[#0f0f1a]/70 backdrop-blur-xl p-8 flex flex-col items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden"
              style={{
                background: `radial-gradient(circle 200px at ${mouseCoords.x}px ${mouseCoords.y}px, rgba(45, 212, 191, 0.05), rgba(13, 13, 23, 0.94))`
              }}
            >
              {/* Concentric rotating HUD circles */}
              <div className="relative w-64 h-64 flex items-center justify-center mb-6 mt-6">
                {/* Outer dashed circular sweep */}
                <motion.div
                  className="absolute inset-0 rounded-full border border-dashed border-[#2dd4bf]/25"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                />
                
                {/* Middle orbital tick ring */}
                <motion.div
                  className="absolute w-[85%] h-[85%] rounded-full border border-dotted border-[#a78bfa]/30"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                />

                {/* Concentric targeting crosshair circles */}
                <div className="absolute w-[72%] h-[72%] rounded-full border border-white/[0.04] flex items-center justify-center">
                  <div className="absolute w-[50%] h-[50%] rounded-full border border-[#2dd4bf]/20" />
                </div>

                {/* Central Healthcare Hologram */}
                <div className="absolute w-[60%] h-[60%] flex flex-col items-center justify-center bg-[#07111e]/30 rounded-full backdrop-blur-md">
                  {/* Glowing Caduceus Symbol in the center */}
                  <svg className="w-16 h-16 text-[#2dd4bf] drop-shadow-[0_0_8px_rgba(45,212,191,0.6)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    {/* Staff */}
                    <path d="M12 2v20" strokeLinecap="round" />
                    <circle cx="12" cy="2" r="1.5" fill="#2dd4bf" />
                    {/* Wings */}
                    <path d="M12 5.5c-4-2.5-8-1.5-10 1 3 1 7 1 10-1z" strokeLinecap="round" />
                    <path d="M12 5.5c4-2.5 8-1.5 10 1-3 1-7 1-10-1z" strokeLinecap="round" />
                    {/* Snakes */}
                    <path d="M12 18.5c-2.5-1.5-2.5-3.5 0-5s2.5-3.5 0-5" strokeLinecap="round" />
                    <path d="M12 18.5c2.5-1.5 2.5-3.5 0-5s-2.5-3.5 0-5" strokeLinecap="round" />
                  </svg>
                  
                  {/* PHARM.D in center */}
                  <span className="text-[10px] font-mono text-[#2dd4bf] font-bold tracking-[0.25em] mt-1.5 drop-shadow-[0_0_4px_rgba(45,212,191,0.5)]">
                    PHARM.D
                  </span>
                </div>

                {/* Animated diagnostic scanning sweep line */}
                <motion.div
                  className="absolute w-[50%] h-[1px] bg-gradient-to-r from-transparent to-[#2dd4bf]/40 origin-left left-1/2"
                  style={{ top: '50%' }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                />
              </div>

              {/* Centered label below console */}
              <div className="text-center w-full mt-4">
                <span className="text-[#2dd4bf] font-semibold text-xs tracking-widest block font-mono uppercase">
                  Clinical Research Hub
                </span>
                <span className="text-[#475569] text-[9px] uppercase tracking-widest font-mono font-bold mt-1 block">
                  Karnataka College of Pharmacy
                </span>
              </div>
            </div>
          </motion.div>
          
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
      >
        <span className="text-[#475569] text-[9px] tracking-[0.4em] uppercase font-mono">Scroll</span>
        <motion.div
          className="w-[1px] h-6"
          style={{ background: 'linear-gradient(180deg, #2dd4bf, transparent)' }}
          animate={{ opacity: [0.4, 1, 0.4], scaleY: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
}
