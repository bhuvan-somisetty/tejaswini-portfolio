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
    <div className={`mb-14 md:mb-20 ${center ? 'text-center mx-auto max-w-4xl' : 'max-w-5xl'}`}>
      <Reveal>
        <div className={`flex items-center gap-3 mb-6 ${center ? 'justify-center' : ''}`}>
          <span className="font-mono text-[11px] text-gold tracking-[0.2em]">{index}</span>
          <span className="h-px w-10 bg-gradient-to-r from-gold to-transparent" />
          <span className="eyebrow">{label}</span>
        </div>
      </Reveal>
      <h2 className="font-display text-[44px] leading-[1.02] tracking-[-0.01em] text-ice sm:text-6xl md:text-7xl">
        <MaskText text={title} />
        {accent && (
          <>
            {' '}
            <MaskText text={accent} className="italic" wordClassName="text-luxe pr-[0.04em]" delay={0.15} />
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
