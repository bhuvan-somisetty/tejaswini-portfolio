'use client';

import { motion } from 'framer-motion';

interface PillProps {
  x?: string;
  y?: string;
  delay?: number;
  size?: 'sm' | 'md' | 'lg';
  rotation?: number;
  color?: string;
}

function Pill({ x = '10%', y = '20%', delay = 0, size = 'md', rotation = 0, color = '#00F5D4' }: PillProps) {
  const dims = { sm: { w: 36, h: 16 }, md: { w: 52, h: 22 }, lg: { w: 70, h: 28 } }[size];

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: x, top: y }}
      animate={{
        y: [-12, 12, -12],
        x: [-6, 6, -6],
        rotate: [rotation - 5, rotation + 5, rotation - 5],
      }}
      transition={{ duration: 7 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
    >
      <svg width={dims.w} height={dims.h} viewBox={`0 0 ${dims.w} ${dims.h}`} fill="none"
        style={{ filter: `drop-shadow(0 0 8px ${color}60)` }}>
        {/* Left half */}
        <rect
          x={0} y={0}
          width={dims.w / 2} height={dims.h}
          rx={dims.h / 2}
          fill={color}
          opacity={0.7}
        />
        {/* Right half */}
        <rect
          x={dims.w / 2} y={0}
          width={dims.w / 2} height={dims.h}
          rx={dims.h / 2}
          fill="#8B5CF6"
          opacity={0.6}
        />
        {/* Center line */}
        <line
          x1={dims.w / 2} y1={2}
          x2={dims.w / 2} y2={dims.h - 2}
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="1"
        />
        {/* Shine */}
        <ellipse
          cx={dims.w * 0.25} cy={dims.h * 0.3}
          rx={dims.w * 0.12} ry={dims.h * 0.15}
          fill="rgba(255,255,255,0.3)"
        />
      </svg>
    </motion.div>
  );
}

function Capsule({ x = '80%', y = '30%', delay = 0, color = '#38BDF8' }: PillProps) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: x, top: y }}
      animate={{
        y: [-15, 10, -15],
        rotate: [30, 50, 30],
        opacity: [0.6, 0.9, 0.6],
      }}
      transition={{ duration: 9 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
    >
      <svg width="24" height="60" viewBox="0 0 24 60" fill="none"
        style={{ filter: `drop-shadow(0 0 6px ${color}80)` }}>
        <rect x={2} y={2} width={20} height={56} rx={10} fill={color} opacity={0.5} />
        <rect x={2} y={2} width={20} height={28} rx={10} fill={color} opacity={0.3} />
        <ellipse cx={12} cy={12} rx={4} ry={6} fill="rgba(255,255,255,0.2)" />
      </svg>
    </motion.div>
  );
}

export default function PillsAndCapsules() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <Pill x="5%" y="15%" delay={0} size="md" rotation={-20} color="#00F5D4" />
      <Pill x="88%" y="20%" delay={1.5} size="sm" rotation={30} color="#38BDF8" />
      <Pill x="15%" y="75%" delay={0.8} size="lg" rotation={15} color="#8B5CF6" />
      <Pill x="75%" y="65%" delay={2} size="sm" rotation={-35} color="#22D3EE" />
      <Capsule x="92%" y="45%" delay={0.5} color="#00F5D4" />
      <Capsule x="3%" y="50%" delay={1.2} color="#8B5CF6" />
      <Capsule x="50%" y="85%" delay={0.3} color="#38BDF8" />
    </div>
  );
}
