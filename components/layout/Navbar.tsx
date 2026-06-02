'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { href: '#about',           label: 'About' },
  { href: '#experience',      label: 'Experience' },
  { href: '#command-center',  label: 'Clinical' },
  { href: '#research',        label: 'Research' },
  { href: '#skills',          label: 'Skills' },
  { href: '#certifications',  label: 'Certifications' },
  { href: '#contact',         label: 'Contact' },
];

const NAV_OFFSET = 72; // height of the fixed navbar (h-16 = 64px) + small breathing room

function scrollTo(id: string) {
  const el = document.querySelector(id) as HTMLElement | null;
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
  window.scrollTo({ top, behavior: 'smooth' });
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      className="fixed top-0 inset-x-0 z-50"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div
        className="transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(9,9,15,0.88)' : 'transparent',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
        }}
      >
        <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between h-16">
          {/* Wordmark */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-white font-semibold text-sm tracking-tight hover:text-[#2dd4bf] transition-colors"
          >
            Tejaswini<span className="text-[#2dd4bf]">.</span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-[#64748b] text-sm hover:text-[#f1f5f9] transition-colors duration-200"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="mailto:tejaswinisomisetty22@gmail.com"
              className="btn-primary py-2.5 px-5 rounded-lg text-xs tracking-wider font-bold relative group overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#07111e] group-hover:bg-white animate-pulse" />
                Get in Touch
              </span>
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-[#64748b] hover:text-white transition-colors p-2"
            aria-label="Toggle menu"
          >
            <div className="flex flex-col gap-1.5">
              <motion.span
                className="block w-5 h-[1.5px] bg-current rounded"
                animate={{ rotate: open ? 45 : 0, y: open ? 6 : 0 }}
              />
              <motion.span
                className="block w-5 h-[1.5px] bg-current rounded"
                animate={{ opacity: open ? 0 : 1 }}
              />
              <motion.span
                className="block w-5 h-[1.5px] bg-current rounded"
                animate={{ rotate: open ? -45 : 0, y: open ? -6 : 0 }}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden"
            style={{
              background: 'rgba(9,9,15,0.96)',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <div className="container mx-auto px-6 py-6 flex flex-col gap-5">
              {navLinks.map(link => (
                <button
                  key={link.href}
                  onClick={() => {
                    // Close the menu first, then scroll on the next frames so the
                    // menu-collapse re-render can't interrupt the smooth scroll (mobile).
                    setOpen(false);
                    requestAnimationFrame(() =>
                      requestAnimationFrame(() => scrollTo(link.href))
                    );
                  }}
                  className="text-[#94a3b8] text-sm text-left hover:text-white transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <a
                href="mailto:tejaswinisomisetty22@gmail.com"
                className="btn-primary mt-2 py-2.5 px-4 rounded-lg text-xs text-center font-bold relative group overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#07111e] group-hover:bg-white animate-pulse" />
                  Get in Touch
                </span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
