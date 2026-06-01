'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const words = "Advancing patient care through clinical excellence, research, healthcare quality innovation, and evidence-based medicine.".split(' ');

export default function MissionSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section ref={sectionRef} className="relative py-40 overflow-hidden">
      {/* Dramatic galaxy backdrop */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] rounded-full"
          style={{
            background: 'radial-gradient(ellipse, rgba(0,245,212,0.04) 0%, rgba(56,189,248,0.02) 30%, transparent 70%)',
          }}
        />
        {/* Animated aurora rings */}
        {[400, 600, 800].map((size, i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2 rounded-full border"
            style={{
              width: size,
              height: size,
              marginLeft: -size / 2,
              marginTop: -size / 2,
              borderColor: `rgba(0,245,212,${0.05 - i * 0.015})`,
            }}
            animate={{ rotate: 360 * (i % 2 === 0 ? 1 : -1) }}
            transition={{ duration: 20 + i * 10, repeat: Infinity, ease: 'linear' }}
          />
        ))}
      </div>

      {/* Floating particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: ['#00F5D4', '#38BDF8', '#8B5CF6'][i % 3],
          }}
          animate={{
            y: [-20, 20, -20],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 3 + (i % 4),
            repeat: Infinity,
            delay: i * 0.3,
          }}
        />
      ))}

      <div className="container mx-auto px-6 lg:px-12 relative z-10 text-center">
        {/* Mission label */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-10"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[#00F5D4] text-xs tracking-[0.5em] uppercase"
            style={{ background: 'rgba(0,245,212,0.08)', border: '1px solid rgba(0,245,212,0.2)' }}>
            ✦ Mission & Vision ✦
          </span>
        </motion.div>

        {/* Cinematic quote */}
        <div className="max-w-5xl mx-auto mb-16">
          <div
            className="text-4xl lg:text-6xl xl:text-7xl font-bold leading-tight"
            style={{ letterSpacing: '-0.02em' }}
          >
            {words.map((word, i) => (
              <motion.span
                key={i}
                className="inline-block mr-[0.3em]"
                initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
                animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                transition={{ duration: 0.6, delay: i * 0.06 }}
                style={{
                  color: ['clinical', 'excellence', 'research', 'quality', 'innovation', 'evidence-based', 'medicine'].some(k => word.toLowerCase().includes(k))
                    ? '#00F5D4'
                    : '#ffffff',
                  textShadow: ['clinical', 'excellence', 'research', 'quality', 'innovation'].some(k => word.toLowerCase().includes(k))
                    ? '0 0 40px rgba(0,245,212,0.3)'
                    : 'none',
                }}
              >
                {word}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Vision statement */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-[#94A3B8] text-xl max-w-2xl mx-auto mb-16 leading-relaxed"
        >
          To contribute to safer and more effective healthcare systems through clinical pharmacy practice,
          continuous learning, and compassionate patient care.
        </motion.p>

        {/* Pillars */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
        >
          {[
            { icon: '⚕', label: 'Clinical Excellence', color: '#00F5D4' },
            { icon: '🔬', label: 'Research Innovation', color: '#38BDF8' },
            { icon: '🛡', label: 'Patient Safety', color: '#8B5CF6' },
            { icon: '📊', label: 'Quality Care', color: '#22D3EE' },
          ].map((pillar, i) => (
            <motion.div
              key={i}
              className="p-5 rounded-2xl flex flex-col items-center gap-3"
              style={{
                background: `${pillar.color}08`,
                border: `1px solid ${pillar.color}25`,
              }}
              animate={{ y: [-4, 4, -4] }}
              transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-3xl">{pillar.icon}</span>
              <span className="text-xs text-center" style={{ color: pillar.color }}>{pillar.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Signature line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.4 }}
          className="mt-20"
        >
          <div className="w-24 h-[1px] mx-auto mb-4"
            style={{ background: 'linear-gradient(90deg, transparent, #00F5D4, transparent)' }} />
          <p className="text-[#475569] text-sm tracking-widest">TEJASWINI SOMISETTY · PHARM.D CANDIDATE</p>
        </motion.div>
      </div>
    </section>
  );
}
