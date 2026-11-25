import { MaskText, Reveal } from './Motion';

/** Numbered section heading: mono index, serif title with an italic accent phrase. */
export default function SectionHeading({
  index,
  label,
  title,
  accent,
  intro,
  align = 'left',
}: {
  index: string;
  label: string;
  title: string;
  accent?: string;
  intro?: string;
  align?: 'left' | 'center';
}) {
  const center = align === 'center';
  return (
    <div className={`mb-14 md:mb-20 ${center ? 'text-center mx-auto max-w-3xl' : 'max-w-4xl'}`}>
      <Reveal>
        <div className={`flex items-center gap-3 mb-6 ${center ? 'justify-center' : ''}`}>
          <span className="font-mono text-[11px] text-tangerine tracking-[0.2em]">{index}</span>
          <span className="h-px w-10 bg-tangerine/50" />
          <span className="eyebrow">{label}</span>
        </div>
      </Reveal>
      <h2 className="font-display text-[44px] leading-[1.02] sm:text-6xl md:text-7xl tracking-[-0.01em] text-ice">
        <MaskText text={title} />
        {accent && (
          <>
            {' '}
            <MaskText text={accent} className="italic text-gradient" delay={0.15} />
          </>
        )}
      </h2>
      {intro && (
        <Reveal delay={0.2}>
          <p className={`mt-6 text-ice-2/80 text-[15px] md:text-base leading-relaxed max-w-2xl ${center ? 'mx-auto' : ''}`}>
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}
