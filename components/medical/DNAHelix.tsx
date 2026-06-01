'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function DNAHelix() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let angle = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const points = 20;
      const amplitude = 30;
      const spacing = canvas.height / points;

      for (let i = 0; i < points; i++) {
        const t = (i / points) * Math.PI * 4 + angle;
        const y = i * spacing + spacing / 2;

        // Left strand
        const lx = cx + Math.sin(t) * amplitude;
        // Right strand
        const rx = cx + Math.sin(t + Math.PI) * amplitude;

        const depth = (Math.sin(t) + 1) / 2; // 0 to 1

        // Base pair connections
        ctx.beginPath();
        ctx.moveTo(lx, y);
        ctx.lineTo(rx, y);
        ctx.strokeStyle = `rgba(34,211,238,${0.15 + depth * 0.1})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Left nucleotide
        ctx.beginPath();
        ctx.arc(lx, y, 3 + depth * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,245,212,${0.5 + depth * 0.5})`;
        ctx.fill();

        // Right nucleotide
        ctx.beginPath();
        ctx.arc(rx, y, 3 + (1 - depth) * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139,92,246,${0.5 + (1 - depth) * 0.5})`;
        ctx.fill();
      }

      // Backbone strands
      ctx.beginPath();
      for (let i = 0; i < points; i++) {
        const t = (i / points) * Math.PI * 4 + angle;
        const y = i * spacing + spacing / 2;
        const x = cx + Math.sin(t) * amplitude;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.strokeStyle = 'rgba(0,245,212,0.4)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.beginPath();
      for (let i = 0; i < points; i++) {
        const t = (i / points) * Math.PI * 4 + angle;
        const y = i * spacing + spacing / 2;
        const x = cx + Math.sin(t + Math.PI) * amplitude;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.strokeStyle = 'rgba(139,92,246,0.4)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      angle += 0.015;
      frameRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(frameRef.current);
  }, [mounted]);

  return (
    <motion.canvas
      ref={canvasRef}
      width={100}
      height={400}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="absolute right-0 top-1/2 -translate-y-1/2 opacity-70"
    />
  );
}
