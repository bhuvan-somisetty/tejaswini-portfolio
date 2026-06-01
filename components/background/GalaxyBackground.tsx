'use client';

import { useEffect, useRef } from 'react';

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let time = 0;

    interface Star {
      x: number; y: number;
      size: number; opacity: number;
      twinkleSpeed: number; twinkleOffset: number;
    }

    interface Nebula {
      x: number; y: number;
      r: number;
      color1: string; color2: string;
      vx: number; vy: number;
    }

    interface MoleculeNode {
      x: number; y: number;
      vx: number; vy: number;
      r: number;
      color: string;
    }

    let stars: Star[] = [];
    let nebulae: Nebula[] = [];
    let molecules: MoleculeNode[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // 200 stars max on desktop for subtle feel
      const count = window.innerWidth > 1280 ? 200 : window.innerWidth > 768 ? 120 : 60;
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.2 + 0.3,
        opacity: Math.random() * 0.3 + 0.05,
        twinkleSpeed: Math.random() * 0.4 + 0.1,
        twinkleOffset: Math.random() * Math.PI * 2,
      }));

      // Refined soft nebulae
      nebulae = [
        {
          x: canvas.width * 0.2,
          y: canvas.height * 0.3,
          r: Math.min(canvas.width, canvas.height) * 0.6,
          color1: 'rgba(45, 212, 191, 0.025)', // Faint teal
          color2: 'rgba(0, 0, 0, 0)',
          vx: 0.05, vy: 0.03
        },
        {
          x: canvas.width * 0.8,
          y: canvas.height * 0.7,
          r: Math.min(canvas.width, canvas.height) * 0.7,
          color1: 'rgba(167, 139, 250, 0.02)', // Faint purple
          color2: 'rgba(0, 0, 0, 0)',
          vx: -0.04, vy: -0.02
        }
      ];

      // Subtle floating molecules (just 8 nodes linked by lines)
      molecules = Array.from({ length: 8 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 2 + 2,
        color: Math.random() > 0.5 ? 'rgba(45, 212, 191, 0.15)' : 'rgba(167, 139, 250, 0.12)'
      }));
    };

    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      time += 0.003;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Draw scientific grid system (low opacity)
      ctx.strokeStyle = 'rgba(45, 212, 191, 0.015)';
      ctx.lineWidth = 0.5;
      const gridSize = 100;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // 2. Draw soft medical HUD telemetry circles (NASA Mission Control style)
      ctx.strokeStyle = 'rgba(45, 212, 191, 0.02)';
      ctx.fillStyle = 'rgba(45, 212, 191, 0.02)';
      ctx.lineWidth = 0.75;
      
      // Top-right HUD Circle
      const hudX1 = canvas.width * 0.85;
      const hudY1 = canvas.height * 0.25;
      ctx.beginPath();
      ctx.arc(hudX1, hudY1, 140, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(hudX1, hudY1, 60, 0, Math.PI * 2);
      ctx.stroke();
      
      // Rotating ticks inside HUD
      ctx.save();
      ctx.translate(hudX1, hudY1);
      ctx.rotate(time * 0.1);
      ctx.beginPath();
      ctx.moveTo(-130, 0); ctx.lineTo(-145, 0);
      ctx.moveTo(130, 0); ctx.lineTo(145, 0);
      ctx.moveTo(0, -130); ctx.lineTo(0, -145);
      ctx.moveTo(0, 130); ctx.lineTo(0, 145);
      ctx.stroke();
      ctx.restore();

      // Bottom-left HUD Circle
      const hudX2 = canvas.width * 0.15;
      const hudY2 = canvas.height * 0.75;
      ctx.beginPath();
      ctx.arc(hudX2, hudY2, 100, 0, Math.PI * 2);
      ctx.stroke();
      ctx.save();
      ctx.translate(hudX2, hudY2);
      ctx.rotate(-time * 0.07);
      ctx.beginPath();
      ctx.moveTo(-90, 0); ctx.lineTo(-105, 0);
      ctx.moveTo(90, 0); ctx.lineTo(105, 0);
      ctx.stroke();
      ctx.restore();

      // 3. Draw soft drifting nebulae
      nebulae.forEach(n => {
        n.x += n.vx;
        n.y += n.vy;

        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;

        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r);
        grad.addColorStop(0, n.color1);
        grad.addColorStop(1, n.color2);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // 4. Draw floating molecular structure in the background
      molecules.forEach((m, idx) => {
        m.x += m.vx;
        m.y += m.vy;

        if (m.x < 0 || m.x > canvas.width) m.vx *= -1;
        if (m.y < 0 || m.y > canvas.height) m.vy *= -1;

        // Draw connections to nearby molecular nodes
        for (let j = idx + 1; j < molecules.length; j++) {
          const other = molecules[j];
          const dist = Math.hypot(m.x - other.x, m.y - other.y);
          if (dist < 220) {
            ctx.strokeStyle = `rgba(45, 212, 191, ${0.03 * (1 - dist / 220)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(m.x, m.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        }

        // Draw node
        ctx.fillStyle = m.color;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // 5. Draw twinkling stars
      stars.forEach(s => {
        const twinkle = 0.5 + 0.5 * Math.sin(time * s.twinkleSpeed + s.twinkleOffset);
        ctx.globalAlpha = s.opacity * twinkle;
        ctx.fillStyle = '#cbd5e1';
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="star-canvas"
    />
  );
}
