'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Minus, Plus, X } from 'lucide-react';
import { useSmoothScroll } from '@/components/providers/SmoothScroll';
import { EASE } from './Motion';

// The thesis is served as one image per page (public/thesis/page-NNN.webp),
// never as a PDF, so the browser shows no download or print toolbar.
const PAGE_COUNT = 112;
const PAGE_W = 1100;
const PAGE_H = 1556;
const pages = Array.from({ length: PAGE_COUNT }, (_, i) => `/thesis/page-${String(i + 1).padStart(3, '0')}.webp`);

const ZOOMS = [0.6, 0.8, 1, 1.25, 1.5];

interface ThesisViewerProps {
  open: boolean;
  onClose: () => void;
  title: string;
}

const iconBtn =
  'grid h-9 w-9 place-items-center rounded-full border border-ice/10 text-ice-2 transition-colors hover:border-accent/50 hover:text-ice disabled:pointer-events-none disabled:opacity-30';

export default function ThesisViewer({ open, onClose, title }: ThesisViewerProps) {
  const [page, setPage] = useState(1);
  const [zoomIdx, setZoomIdx] = useState(2);
  const scrollRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const { stop, start } = useSmoothScroll();

  // Pause page scrolling, focus the close button, handle Esc and block save/print shortcuts.
  useEffect(() => {
    if (!open) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const root = document.documentElement;
    stop();
    root.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.ctrlKey || e.metaKey) && ['s', 'p'].includes(e.key.toLowerCase())) e.preventDefault();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      root.style.overflow = '';
      start();
      previousFocus?.focus();
    };
  }, [open, onClose, stop, start]);

  // Track which page is in view for the page counter.
  useEffect(() => {
    if (!open) return;
    const root = scrollRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) setPage(Number((entry.target as HTMLElement).dataset.page));
        }
      },
      { root, rootMargin: '-45% 0px -45% 0px' }
    );
    root.querySelectorAll('[data-page]').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [open, zoomIdx]);

  const goTo = (n: number) => {
    const target = Math.min(Math.max(n, 1), PAGE_COUNT);
    scrollRef.current?.querySelector(`[data-page="${target}"]`)?.scrollIntoView({ block: 'start' });
  };

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`Thesis: ${title}`}
          className="thesis-viewer fixed inset-0 z-[150] flex select-none flex-col bg-ink/95 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
          onContextMenu={e => e.preventDefault()}
        >
          {/* Toolbar */}
          <div className="flex h-16 shrink-0 items-center justify-between gap-3 border-b border-line bg-ink-2/90 px-4 sm:px-6">
            <div className="min-w-0">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">Pharm.D thesis · view only</div>
              <div className="truncate font-display text-[17px] text-ice">{title}</div>
            </div>

            <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
              <button onClick={() => goTo(page - 1)} disabled={page <= 1} aria-label="Previous page" className={iconBtn}>
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="w-16 text-center font-mono text-[11px] tabular-nums text-ice-2" aria-live="polite">
                {page} / {PAGE_COUNT}
              </span>
              <button onClick={() => goTo(page + 1)} disabled={page >= PAGE_COUNT} aria-label="Next page" className={iconBtn}>
                <ChevronRight className="h-4 w-4" />
              </button>

              <span className="mx-1 hidden h-5 w-px bg-line sm:block" />

              <button
                onClick={() => setZoomIdx(z => Math.max(z - 1, 0))}
                disabled={zoomIdx === 0}
                aria-label="Zoom out"
                className={`${iconBtn} hidden sm:grid`}
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="hidden w-11 text-center font-mono text-[11px] tabular-nums text-ice-2 sm:block">
                {Math.round(ZOOMS[zoomIdx] * 100)}%
              </span>
              <button
                onClick={() => setZoomIdx(z => Math.min(z + 1, ZOOMS.length - 1))}
                disabled={zoomIdx === ZOOMS.length - 1}
                aria-label="Zoom in"
                className={`${iconBtn} hidden sm:grid`}
              >
                <Plus className="h-4 w-4" />
              </button>

              <button
                ref={closeRef}
                onClick={onClose}
                aria-label="Close thesis"
                className="ml-1 inline-flex h-9 items-center gap-1.5 rounded-full bg-accent px-4 text-[13px] font-semibold text-ink transition-colors hover:bg-accent-soft sm:ml-2"
              >
                Close <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Pages */}
          <div ref={scrollRef} data-lenis-prevent className="flex-1 overflow-y-auto overscroll-contain px-3 py-6 sm:px-6">
            <div className="mx-auto flex flex-col gap-4" style={{ maxWidth: `${Math.round(820 * ZOOMS[zoomIdx])}px` }}>
              {pages.map((src, i) => (
                <div
                  key={src}
                  data-page={i + 1}
                  className="relative w-full overflow-hidden rounded-md bg-white shadow-[0_20px_60px_rgba(0,0,0,0.55)]"
                  style={{ aspectRatio: `${PAGE_W} / ${PAGE_H}` }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={`Thesis page ${i + 1} of ${PAGE_COUNT}`}
                    width={PAGE_W}
                    height={PAGE_H}
                    loading={i < 2 ? 'eager' : 'lazy'}
                    decoding="async"
                    draggable={false}
                    className="pointer-events-none h-full w-full object-contain"
                  />
                </div>
              ))}
              <p className="py-4 text-center font-mono text-[10px] text-fog">
                © Rajiv Gandhi University of Health Sciences, Karnataka · View only
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
