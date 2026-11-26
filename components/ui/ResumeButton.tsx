'use client';

import { useCallback, useState, type CSSProperties } from 'react';
import { FileText } from 'lucide-react';
import { resumeDoc } from '@/lib/content';
import DocViewer from './DocViewer';

const LETTERS = 'Resume'.split('');

/** "RESUME" link that opens the resume in the page viewer, like the thesis. */
export default function ResumeButton({ className = '' }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const onClose = useCallback(() => setOpen(false), []);

  return (
    <>
      <button onClick={() => setOpen(true)} aria-label="View resume" aria-haspopup="dialog" className={`resume-btn ${className}`}>
        <span className="roll" aria-hidden>
          {LETTERS.map((c, i) => (
            <span key={i} data-c={c} style={{ '--i': i } as CSSProperties}>
              {c}
            </span>
          ))}
        </span>
        <FileText className="resume-icon h-[1.25em] w-[1.25em] shrink-0" strokeWidth={1.75} aria-hidden />
      </button>
      <DocViewer open={open} onClose={onClose} doc={resumeDoc} />
    </>
  );
}
