'use client';

import { motion } from 'framer-motion';

interface Node {
  x: number;
  y: number;
  label?: string;
  color: string;
  size: number;
}

const nodes: Node[] = [
  { x: 50, y: 50, color: '#00F5D4', size: 10, label: 'C' },
  { x: 80, y: 30, color: '#38BDF8', size: 8 },
  { x: 75, y: 65, color: '#8B5CF6', size: 7 },
  { x: 30, y: 35, color: '#22D3EE', size: 9 },
  { x: 20, y: 65, color: '#00F5D4', size: 6 },
  { x: 60, y: 80, color: '#38BDF8', size: 7 },
  { x: 90, y: 55, color: '#8B5CF6', size: 5 },
];

const bonds = [
  [0, 1], [0, 2], [0, 3], [1, 6], [2, 5], [3, 4], [4, 5],
];

export default function MoleculeFloat({ scale = 1 }: { scale?: number }) {
  const w = 110 * scale;
  const h = 110 * scale;

  return (
    <motion.div
      animate={{ y: [-8, 8, -8], rotate: [0, 3, -3, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      style={{ width: w, height: h }}
    >
      <svg viewBox="0 0 110 110" width={w} height={h} fill="none">
        {/* Bonds */}
        {bonds.map(([a, b], i) => {
          const na = nodes[a], nb = nodes[b];
          return (
            <motion.line
              key={i}
              x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="1.5"
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 3 + i * 0.3, repeat: Infinity }}
            />
          );
        })}

        {/* Orbit rings around center */}
        <motion.ellipse
          cx="50" cy="50" rx="35" ry="12"
          stroke="rgba(0,245,212,0.15)"
          strokeWidth="1"
          fill="none"
          animate={{ rotateX: [0, 360] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />

        {/* Nodes */}
        {nodes.map((n, i) => (
          <motion.g key={i}>
            <motion.circle
              cx={n.x} cy={n.y} r={n.size + 4}
              fill={n.color}
              opacity={0.1}
              animate={{ r: [n.size + 3, n.size + 8, n.size + 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity }}
            />
            <circle
              cx={n.x} cy={n.y} r={n.size}
              fill={n.color}
              opacity={0.85}
              style={{ filter: `drop-shadow(0 0 4px ${n.color})` }}
            />
            {n.label && (
              <text
                x={n.x} y={n.y + 4}
                textAnchor="middle"
                fontSize="8"
                fill="white"
                fontWeight="bold"
              >
                {n.label}
              </text>
            )}
          </motion.g>
        ))}
      </svg>
    </motion.div>
  );
}
