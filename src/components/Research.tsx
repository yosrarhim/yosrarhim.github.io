import type { ReactNode } from 'react';
import { researchIntro, researchSection, topics, type TopicGlyph } from '../data/research';
import { cx } from '../lib/style';
import { Reveal } from './Reveal';
import { RichText } from './RichText';
import { SectionHead } from './SectionHead';

/** Stagger within each row of three cards. */
const ROW_DELAYS = [undefined, '.05s', '.1s'] as const;

/** §06 — research interests (interests, not completed research). */
export function Research() {
  return (
    <section className="section on-dark section--tight" id="research" aria-labelledby="research-title">
      <div className="container">
        <SectionHead {...researchSection} />
        <div className="grid research__intro">
          <Reveal as="h2" className="h2" id="research-title">
            <RichText text={researchIntro.title} />
          </Reveal>
          <Reveal className="prose" delay=".1s">
            <p>{researchIntro.body}</p>
          </Reveal>
        </div>

        <div className="topics">
          {topics.map((topic, i) => (
            <Reveal as="article" className="topic" delay={ROW_DELAYS[i % 3]} key={topic.idx}>
              <div className="topic__head mono">
                <span>{topic.idx}</span>
                <Glyph name={topic.glyph} />
              </div>
              <h3>{topic.title}</h3>
              <p className="topic__q">{topic.question}</p>
              <p className={cx('topic__link', topic.link.next && 'topic__link--next')}>
                <b>{topic.link.label}</b>
                {topic.link.text}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Line glyphs drawn on a 44×44 grid. */
function Glyph({ name }: { readonly name: TopicGlyph }) {
  return (
    <svg className="topic__glyph" viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
      {GLYPHS[name]}
    </svg>
  );
}

const GLYPHS: Readonly<Record<TopicGlyph, ReactNode>> = {
  federated: (
    <>
      <circle cx="22" cy="22" r="4" />
      <circle cx="7" cy="8" r="3" />
      <circle cx="37" cy="8" r="3" />
      <circle cx="22" cy="39" r="3" />
      <path d="M9.5 10l9.5 9M34.5 10L25 19M22 26v10" />
    </>
  ),
  chip: (
    <>
      <rect x="11" y="11" width="22" height="22" />
      <rect x="17" y="17" width="10" height="10" />
      <path d="M16 11V5M22 11V5M28 11V5M16 39v-6M22 39v-6M28 39v-6M11 16H5M11 22H5M11 28H5M39 16h-6M39 22h-6M39 28h-6" />
    </>
  ),
  signal: (
    <>
      <path d="M4 22h8l4-10 6 20 5-14 3 4h10" />
      <circle cx="40" cy="22" r="2" />
    </>
  ),
  target: (
    <>
      <circle cx="22" cy="22" r="15" />
      <circle cx="22" cy="22" r="6" />
      <path d="M22 4v6M22 34v6M4 22h6M34 22h6" />
    </>
  ),
  network: (
    <>
      <circle cx="8" cy="12" r="3" />
      <circle cx="8" cy="32" r="3" />
      <circle cx="22" cy="8" r="3" />
      <circle cx="22" cy="22" r="3" />
      <circle cx="22" cy="36" r="3" />
      <circle cx="36" cy="22" r="3" />
      <path d="M11 12l8-4M11 12l8 10M11 32l8-10M11 32l8 4M25 8l8 13M25 22h8M25 36l8-13" />
    </>
  ),
  bolt: <path d="M24 4L10 24h11l-3 16 16-22H23z" />,
};
