'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { navLinks, profile } from '@/lib/content';
import { useSmoothScroll } from '@/components/providers/SmoothScroll';
import { EASE } from '@/components/ui/Motion';

export default function Navbar({ show }: { show: boolean }) {
  const { scrollTo, stop, start } = useSmoothScroll();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    // Highlight the section that crosses the middle of the screen.
    const io = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    ['hero', ...navLinks.map(l => l.id)].forEach(id => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => {
      window.removeEventListener('scroll', onScroll);
      io.disconnect();
    };
  }, []);

  // Freeze page scroll while the mobile menu is open; Esc closes it.
  useEffect(() => {
    if (!open) return;
    stop();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      start();
      window.removeEventListener('keydown', onKey);
    };
  }, [open, stop, start]);

  const go = (id: string) => {
    setOpen(false);
    // Let the menu release the scroll lock before scrolling.
    requestAnimationFrame(() => requestAnimationFrame(() => scrollTo(id)));
  };

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-[90] flex justify-center px-3 pt-3 md:pt-5"
        initial={{ y: -90, opacity: 0 }}
        animate={show ? { y: 0, opacity: 1 } : undefined}
        transition={{ duration: 1, delay: 0.3, ease: EASE }}
      >
        <nav
          aria-label="Main"
          className={`flex w-full max-w-[1180px] items-center justify-between rounded-full py-2 pl-3 pr-2 transition-all duration-700 sm:pl-4 ${
            scrolled || open ? 'border border-ice/10 bg-ink-2 shadow-[0_18px_40px_-18px_rgb(0_0_0/0.8)]' : 'border border-transparent'
          }`}
        >
          <button onClick={() => go('hero')} className="flex items-center gap-2.5" aria-label="Back to top">
            <span className="grid h-9 w-9 place-items-center rounded-full border border-accent/50 font-display text-[15px] text-accent">
              TS
            </span>
            <span className="hidden font-display text-lg tracking-tight text-ice sm:block">
              {profile.firstName}
              <span className="text-accent">.</span>
            </span>
          </button>

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map(link => (
              <li key={link.id}>
                <button
                  onClick={() => go(link.id)}
                  className={`relative rounded-full px-3.5 py-2 text-[13px] transition-colors duration-300 ${
                    active === link.id ? 'text-ice' : 'text-mist hover:text-ice'
                  }`}
                  aria-current={active === link.id ? 'true' : undefined}
                >
                  {active === link.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full border border-ice/10 bg-ice/[0.07]"
                      transition={{ duration: 0.5, ease: EASE }}
                    />
                  )}
                  <span className="relative">{link.label}</span>
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={`mailto:${profile.email}`}
              className="group hidden items-center gap-1.5 rounded-full bg-accent px-4 py-2.5 text-[13px] font-semibold text-ink transition-colors hover:bg-accent-soft sm:inline-flex"
            >
              Get in touch
              <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <button
              onClick={() => setOpen(o => !o)}
              className="grid h-10 w-10 place-items-center rounded-full border border-ice/10 lg:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <span className="relative block h-3 w-5">
                <motion.span
                  className="absolute left-0 top-0 h-px w-5 bg-ice"
                  animate={open ? { rotate: 45, y: 5.5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                />
                <motion.span
                  className="absolute bottom-0 left-0 h-px w-5 bg-ice"
                  animate={open ? { rotate: -45, y: -5.5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                />
              </span>
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-[80] flex flex-col justify-between bg-ink/95 px-6 pb-10 pt-28 backdrop-blur-xl lg:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <ul className="flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.15 + i * 0.05, ease: EASE }}
                >
                  <button
                    onClick={() => go(link.id)}
                    className="flex w-full items-baseline gap-4 py-1.5 text-left font-display text-[38px] leading-tight text-ice"
                  >
                    <span className="font-mono text-[11px] text-accent">0{i + 1}</span>
                    {link.label}
                  </button>
                </motion.li>
              ))}
            </ul>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent py-4 text-sm font-semibold text-ink"
            >
              Get in touch <ArrowUpRight className="h-4 w-4" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
