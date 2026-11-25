'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

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

export default function ThesisViewer({ open, onClose, title }: ThesisViewerProps) {
  const [page, setPage] = useState(1);
  const [zoomIdx, setZoomIdx] = useState(2);
  const scrollRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Lock page scroll, focus the close button, handle Esc and block save/print shortcuts.
  useEffect(() => {
    if (!open) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.ctrlKey || e.metaKey) && ['s', 'p'].includes(e.key.toLowerCase())) e.preventDefault();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [open, onClose]);

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
          className="thesis-viewer fixed inset-0 z-[100] flex flex-col bg-[#05050a]/95 backdrop-blur-md select-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onContextMenu={e => e.preventDefault()}
        >
          {/* Toolbar */}
          <div className="flex items-center justify-between gap-3 h-14 border-b border-white/[0.06] bg-[#09090f]/90 flex-shrink-0" style={{ padding: "0 16px" }}>
            <div className="min-w-0">
              <div className="text-[#2dd4bf] text-[9px] font-mono font-bold tracking-widest uppercase">Pharm.D Thesis</div>
              <div className="text-white text-xs font-semibold truncate">{title}</div>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
              <button
                onClick={() => goTo(page - 1)}
                disabled={page <= 1}
                aria-label="Previous page"
                className="w-8 h-8 rounded-lg border border-white/[0.08] text-[#cbd5e1] hover:text-white hover:border-[#2dd4bf]/40 disabled:opacity-30 disabled:pointer-events-none"
              >
                ‹
              </button>
              <span className="text-[#94a3b8] text-[11px] font-mono tabular-nums w-16 text-center" aria-live="polite">
                {page} / {PAGE_COUNT}
              </span>
              <button
                onClick={() => goTo(page + 1)}
                disabled={page >= PAGE_COUNT}
                aria-label="Next page"
                className="w-8 h-8 rounded-lg border border-white/[0.08] text-[#cbd5e1] hover:text-white hover:border-[#2dd4bf]/40 disabled:opacity-30 disabled:pointer-events-none"
              >
                ›
              </button>

              <span className="hidden sm:block w-px h-5 bg-white/[0.08]" />

              <button
                onClick={() => setZoomIdx(z => Math.max(z - 1, 0))}
                disabled={zoomIdx === 0}
                aria-label="Zoom out"
                className="hidden sm:block w-8 h-8 rounded-lg border border-white/[0.08] text-[#cbd5e1] hover:text-white hover:border-[#2dd4bf]/40 disabled:opacity-30 disabled:pointer-events-none"
              >
                −
              </button>
              <span className="hidden sm:block text-[#94a3b8] text-[11px] font-mono tabular-nums w-10 text-center">
                {Math.round(ZOOMS[zoomIdx] * 100)}%
              </span>
              <button
                onClick={() => setZoomIdx(z => Math.min(z + 1, ZOOMS.length - 1))}
                disabled={zoomIdx === ZOOMS.length - 1}
                aria-label="Zoom in"
                className="hidden sm:block w-8 h-8 rounded-lg border border-white/[0.08] text-[#cbd5e1] hover:text-white hover:border-[#2dd4bf]/40 disabled:opacity-30 disabled:pointer-events-none"
              >
                +
              </button>

              <button
                ref={closeRef}
                onClick={onClose}
                aria-label="Close thesis"
                style={{ padding: "0 12px", marginLeft: 4 }}
                className="h-8 rounded-lg border border-[#2dd4bf]/30 bg-[#2dd4bf]/10 text-[#2dd4bf] text-xs font-bold hover:bg-[#2dd4bf]/20 hover:text-white"
              >
                Close ✕
              </button>
            </div>
          </div>

          {/* Pages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto overscroll-contain" style={{ padding: "24px 12px" }}>
            <div
              className="flex flex-col gap-4"
              style={{ maxWidth: `${Math.round(820 * ZOOMS[zoomIdx])}px`, margin: "0 auto" }}
            >
              {pages.map((src, i) => (
                <div
                  key={src}
                  data-page={i + 1}
                  className="relative w-full bg-white rounded-sm shadow-[0_10px_40px_rgba(0,0,0,0.5)] overflow-hidden"
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
                    className="w-full h-full object-contain pointer-events-none"
                  />
                </div>
              ))}
              <p className="text-center text-[#475569] text-[10px] font-mono" style={{ padding: "16px 0" }}>
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
