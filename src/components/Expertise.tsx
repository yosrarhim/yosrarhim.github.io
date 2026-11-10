import { domains, evidenceLabel, expertiseSection, expertiseTitle } from '../data/expertise';
import { TITLE_SPACING } from '../lib/style';
import { Reveal } from './Reveal';
import { RichText } from './RichText';
import { SectionHead } from './SectionHead';
import { Tags } from './Tags';

/** §05 — capabilities as a spec sheet; each row cites its evidence. */
export function Expertise() {
  return (
    <section className="section on-dark" id="expertise" aria-labelledby="expertise-title">
      <div className="container">
        <SectionHead {...expertiseSection} />
        <Reveal as="h2" className="h2" id="expertise-title" style={TITLE_SPACING}>
          <RichText text={expertiseTitle} />
        </Reveal>

        <div className="expertise">
          {domains.map((domain) => (
            <Reveal className="domain" key={domain.idx}>
              <span className="domain__idx mono">{domain.idx}</span>
              <h3 className="domain__name">{domain.name}</h3>
              <Tags className="domain__tools" items={domain.tools} />
              <p className="domain__proof">
                <b>{evidenceLabel}</b>
                {domain.evidence}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
