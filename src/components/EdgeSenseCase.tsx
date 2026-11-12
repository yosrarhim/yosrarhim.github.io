import { architecture, caseIntro, caseSection, contribution, results } from '../data/edgeSense';
import { ArchitectureDiagram } from './ArchitectureDiagram';
import { Icon } from './Icon';
import { Reveal } from './Reveal';
import { RichText } from './RichText';
import { SectionHead } from './SectionHead';

/** Numbered sub-heading inside the case study: "01  How it works   Fig. 02". */
function BlockHead({ num, title, note }: { readonly num: string; readonly title: string; readonly note?: string }) {
  return (
    <Reveal className="block-head">
      <span className="mono">{num}</span>
      <h3 className="h3">{title}</h3>
      {note ? <span className="mono muted">{note}</span> : null}
    </Reveal>
  );
}

/** §02 — featured project, kept short: what it is, how it works, results, my role. */
export function EdgeSenseCase() {
  return (
    <section className="section on-dark blueprint" id="edge-sense-ai" aria-labelledby="case-title">
      <div className="container">
        <SectionHead {...caseSection} />

        <div className="grid case__intro">
          <Reveal className="case__title">
            <p className="case__label mono">
              <span className="pulse" aria-hidden="true" />
              {caseIntro.label}
            </p>
            <h2 className="case__name" id="case-title">
              <RichText text={caseIntro.name} />
            </h2>
            <p className="case__sub">{caseIntro.sub}</p>
          </Reveal>
          <Reveal as="dl" className="case__meta" delay=".1s">
            {caseIntro.meta.map((spec) => (
              <div className="spec" key={spec.term}>
                <dt className="mono">{spec.term}</dt>
                <dd>{spec.value}</dd>
              </div>
            ))}
          </Reveal>
        </div>

        <div className="case__block">
          <BlockHead {...architecture.block} />
          <ArchitectureDiagram />
          <Reveal as="p" className="figcaption mono">
            <b>{architecture.figure}</b>
            <span>
              <RichText text={architecture.caption} />
            </span>
          </Reveal>
        </div>

        <div className="case__block grid case__outcome">
          <div className="case__results">
            <BlockHead {...results.block} />
            <Reveal as="dl" className="kpi">
              {results.kpis.map((kpi) => (
                <div key={kpi.term}>
                  <dt className="mono">{kpi.term}</dt>
                  <dd>
                    {kpi.value}
                    <small>{kpi.detail}</small>
                  </dd>
                </div>
              ))}
            </Reveal>
          </div>

          <div className="case__role">
            <BlockHead {...contribution.block} />
            <Reveal as="ul" className="checklist">
              {contribution.items.map((item) => (
                <li key={item}>
                  <span>
                    <RichText text={item} />
                  </span>
                </li>
              ))}
            </Reveal>
            <Reveal as="p" className="case__disclaimer">
              <Icon name="lock" />
              <span>{contribution.disclaimer}</span>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
