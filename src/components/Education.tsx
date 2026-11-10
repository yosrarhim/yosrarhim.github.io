import type { CSSProperties } from 'react';
import {
  certificates,
  certificationsLabels,
  degrees,
  educationSection,
  educationTitle,
  languages,
  languagesTitle,
} from '../data/education';
import { TITLE_SPACING } from '../lib/style';
import { Icon } from './Icon';
import { Reveal } from './Reveal';
import { SectionHead } from './SectionHead';

const LANGS_TITLE: CSSProperties = { marginTop: 14 };

/** §07 — degrees, certificates (with PDFs) and languages. */
export function Education() {
  return (
    <section className="section on-paper" id="education" aria-labelledby="edu-title">
      <div className="container">
        <SectionHead {...educationSection} />
        <Reveal as="h2" className="h2" id="edu-title" style={TITLE_SPACING}>
          {educationTitle}
        </Reveal>

        <div className="grid edu">
          <div className="edu__degrees">
            {degrees.map((degree) => (
              <Reveal as="article" className="degree" key={degree.title}>
                <time>{degree.period}</time>
                <div>
                  <span className="mono">{degree.level}</span>
                  <h3>{degree.title}</h3>
                  <p>{degree.school}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal as="aside" className="edu__side" delay=".1s" aria-label={certificationsLabels.aside}>
            <p className="side-title mono">{certificationsLabels.title}</p>
            <ul className="certs">
              {certificates.map((cert) => (
                <li className="cert" key={cert.name}>
                  <span className="cert__name">{cert.name}</span>
                  <span className="cert__meta mono">{cert.issuer}</span>
                  {cert.pdf ? (
                    <a className="cert__link mono" href={cert.pdf} target="_blank" rel="noopener">
                      {certificationsLabels.view} <Icon name="ext" />
                      <span className="sr-only">{certificationsLabels.viewSuffix}</span>
                    </a>
                  ) : (
                    <span className="cert__link cert__link--none mono">{certificationsLabels.onRequest}</span>
                  )}
                </li>
              ))}
            </ul>

            <div className="langs">
              <p className="side-title mono" style={LANGS_TITLE}>
                {languagesTitle}
              </p>
              {languages.map((lang) => (
                <div className="lang" key={lang.name}>
                  <span>{lang.name}</span>
                  <span>{lang.level}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
