'use client';

import { motion } from 'framer-motion';

export default function ECGWave({ color = '#00F5D4', width = 400, height = 60 }: {
  color?: string;
  width?: number;
  height?: number;
}) {
  const pathD = `
    M0,${height / 2}
    L${width * 0.1},${height / 2}
    L${width * 0.15},${height / 2 - 5}
    L${width * 0.18},${height / 2}
    L${width * 0.22},${height / 2}
    L${width * 0.25},${height * 0.1}
    L${width * 0.28},${height * 0.9}
    L${width * 0.31},${height / 2}
    L${width * 0.35},${height / 2 - 8}
    L${width * 0.38},${height / 2}
    L${width * 0.45},${height / 2}
    L${width * 0.5},${height / 2}
    L${width * 0.55},${height / 2 - 5}
    L${width * 0.58},${height / 2}
    L${width * 0.62},${height / 2}
    L${width * 0.65},${height * 0.1}
    L${width * 0.68},${height * 0.9}
    L${width * 0.71},${height / 2}
    L${width * 0.75},${height / 2 - 8}
    L${width * 0.78},${height / 2}
    L${width},${height / 2}
  `;

  const pathLength = 1200; // approximate

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none">
      <motion.path
        d={pathD}
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        style={{
          filter: `drop-shadow(0 0 4px ${color})`,
          strokeDasharray: pathLength,
        }}
        animate={{
          strokeDashoffset: [pathLength, -pathLength],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      {/* Pulse dot */}
      <motion.circle
        r="3"
        fill={color}
        style={{ filter: `drop-shadow(0 0 6px ${color})` }}
        animate={{
          cx: [0, width],
          cy: [height / 2, height / 2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </svg>
  );
}
