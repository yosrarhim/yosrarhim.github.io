import { useEffect, useRef, useState } from 'react';
import { contact } from '../data/profile';
import { Footer } from './Footer';
import { Icon } from './Icon';
import { Reveal } from './Reveal';
import { RichText } from './RichText';
import { SectionHead } from './SectionHead';

const { copy } = contact;

/** §08 — e-mail with copy button, channels, then the footer. */
export function Contact() {
  const [copyLabel, setCopyLabel] = useState<string>(copy.idle);
  const resetTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(resetTimer.current), []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopyLabel(copy.done);
    } catch {
      setCopyLabel(copy.failed);
    }
    window.clearTimeout(resetTimer.current);
    resetTimer.current = window.setTimeout(() => setCopyLabel(copy.idle), copy.resetAfterMs);
  };

  return (
    <section className="section on-dark blueprint contact" id="contact" aria-labelledby="contact-title">
      <div className="container">
        <SectionHead {...contact.section} />
        <Reveal as="h2" className="contact__big" id="contact-title">
          <RichText text={contact.heading} />
        </Reveal>

        <Reveal className="contact__mail" delay=".1s">
          <a className="link" href={`mailto:${contact.email}`} id="email">
            {contact.email}
          </a>
          <button className="copy mono" type="button" id="copy-email" data-email={contact.email} onClick={() => void copyEmail()}>
            <Icon name="copy" />
            <span>{copyLabel}</span>
          </button>
        </Reveal>

        <Reveal className="channels" delay=".15s">
          {contact.channels.map((channel) => (
            <a
              className="channel"
              href={channel.href}
              key={channel.href}
              target={channel.newTab ? '_blank' : undefined}
              rel={channel.newTab === 'external' ? 'noopener noreferrer' : channel.newTab === 'internal' ? 'noopener' : undefined}
            >
              <span className="mono">
                {channel.label} <Icon name={channel.icon} />
              </span>
              <b>{channel.value}</b>
            </a>
          ))}
        </Reveal>

        <Footer />
      </div>
    </section>
  );
}
