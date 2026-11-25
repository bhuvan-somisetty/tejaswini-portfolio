'use client';

import { useState } from 'react';
import { ArrowUpRight, Check, Mail, MapPin, Phone } from 'lucide-react';
import { contactIntro, profile } from '@/lib/content';
import SectionHeading from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Motion';
import { LinkedInIcon } from '@/components/ui/Icons';

const links = [
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}`, icon: Mail },
  { label: 'Phone', value: profile.phoneDisplay, href: profile.phoneHref, icon: Phone },
  { label: 'LinkedIn', value: profile.linkedinDisplay, href: profile.linkedin, icon: LinkedInIcon },
  { label: 'Location', value: profile.city, href: null, icon: MapPin },
];

export default function ContactSection() {
  const [copied, setCopied] = useState(false);

  const sendMessage = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Clipboard can be blocked; the mail app still opens below.
    }
    window.location.href = `mailto:${profile.email}`;
  };

  return (
    <section id="contact" className="section">
      <div className="shell">
        <SectionHeading index="07" label="Communication Channel" title="Let’s advance patient care," accent="together." intro={contactIntro} />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="min-w-0 lg:col-span-9">
            <ul className="border-t border-line">
              {links.map((l, i) => {
                const Icon = l.icon;
                const row = (
                  <>
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-ice/12 text-ice-2 transition-colors duration-500 group-hover:border-gold/50 group-hover:text-gold">
                      <Icon className="h-[18px] w-[18px]" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-mist">{l.label}</span>
                      <span className="mt-1 block truncate font-display text-[22px] text-ice sm:text-[28px]">{l.value}</span>
                    </span>
                    {l.href && (
                      <ArrowUpRight className="h-5 w-5 shrink-0 text-mist transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-gold" />
                    )}
                  </>
                );
                return (
                  <Reveal as="li" key={l.label} delay={i * 0.07} className="border-b border-line">
                    {l.href ? (
                      <a
                        href={l.href}
                        target={l.href.startsWith('http') ? '_blank' : undefined}
                        rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="group flex items-center gap-5 py-6"
                      >
                        {row}
                      </a>
                    ) : (
                      <div className="group flex items-center gap-5 py-6">{row}</div>
                    )}
                  </Reveal>
                );
              })}
            </ul>

            <Reveal delay={0.2}>
              <button
                onClick={sendMessage}
                className="group mt-10 inline-flex items-center gap-2.5 rounded-full bg-accent px-8 py-4 text-sm font-semibold text-ink transition-colors hover:bg-accent-soft"
              >
                {copied ? <Check className="h-4 w-4" /> : <Mail className="h-4 w-4" />}
                {copied ? 'Email copied!' : 'Send a message'}
              </button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
