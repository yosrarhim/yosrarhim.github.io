import type { CSSProperties } from 'react';
import {
  architecture,
  caseIntro,
  caseSection,
  contribution,
  decisions,
  federated,
  localModel,
  problemApproach,
  results,
} from '../data/edgeSense';
import { useGrow } from '../hooks/useGrow';
import { cssVars } from '../lib/style';
import { ArchitectureDiagram } from './ArchitectureDiagram';
import { Icon } from './Icon';
import { ResultsChart } from './ResultsChart';
import { Reveal } from './Reveal';
import { RichText } from './RichText';
import { SectionHead } from './SectionHead';
import { Tags } from './Tags';

const H3_GAP: CSSProperties = { marginTop: 10 };
const ROUNDS_INTRO: CSSProperties = { maxWidth: '60ch', marginBottom: 24 };

/** Numbered sub-heading inside the case study: "03  System architecture   Fig. 02". */
function BlockHead({ num, title, note }: { readonly num: string; readonly title: string; readonly note?: string }) {
  return (
    <Reveal className="block-head">
      <span className="mono">{num}</span>
      <h3 className="h3">{title}</h3>
      {note ? <span className="mono muted">{note}</span> : null}
    </Reveal>
  );
}

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

        {/* Problem / approach */}
        <div className="case__block grid case__pa">
          {problemApproach.map((arg, i) => (
            <Reveal key={arg.kicker} delay={i > 0 ? '.1s' : undefined}>
              <p className="mono accent">{arg.kicker}</p>
              <h3 className="h3" style={H3_GAP}>{arg.title}</h3>
              <p>
                <RichText text={arg.body} />
              </p>
            </Reveal>
          ))}
        </div>

        {/* Architecture */}
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

        <FederatedStrategy />

        {/* Local model */}
        <div className="case__block">
          <BlockHead {...localModel.block} />
          <div className="grid model">
            <Reveal as="ol" className="pipe model__pipe">
              {localModel.pipeline.map((step) => (
                <li key={step.title}>
                  <div>
                    <b>
                      <RichText text={step.title} />
                    </b>
                    <span>
                      <RichText text={step.detail} />
                    </span>
                    {step.thresholds ? (
                      <span className="thresholds">
                        {step.thresholds.map((t) => (
                          <span className={`thr thr--${t.level}`} key={t.level}>
                            {t.label}
                          </span>
                        ))}
                      </span>
                    ) : null}
                  </div>
                </li>
              ))}
            </Reveal>
            <Reveal as="dl" className="model__spec" delay=".1s">
              {localModel.spec.map((spec) => (
                <div className="spec" key={spec.term}>
                  <dt className="mono">{spec.term}</dt>
                  <dd>{spec.value}</dd>
                </div>
              ))}
            </Reveal>
          </div>
        </div>

        {/* Results */}
        <div className="case__block">
          <BlockHead {...results.block} />
          <div className="grid results">
            <Reveal className="results__key">
              <dl className="kpi">
                {results.kpis.map((kpi) => (
                  <div key={kpi.term}>
                    <dt className="mono">{kpi.term}</dt>
                    <dd>
                      {kpi.value}
                      <small>{kpi.detail}</small>
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="results__note">{results.note}</p>
            </Reveal>
            <ResultsChart />
          </div>
        </div>

        {/* Decisions */}
        <div className="case__block">
          <BlockHead {...decisions.block} />
          <Reveal className="decisions">
            {decisions.items.map((d) => (
              <article className="decision" key={d.id}>
                <p className="mono">{d.id}</p>
                <h4>{d.title}</h4>
                <p>
                  <RichText text={d.body} />
                </p>
              </article>
            ))}
          </Reveal>
        </div>

        {/* Contribution */}
        <div className="case__block">
          <BlockHead {...contribution.block} />
          <div className="grid contrib">
            <Reveal as="ul" className="checklist contrib__list">
              {contribution.items.map((item) => (
                <li key={item}>
                  <span>
                    <RichText text={item} />
                  </span>
                </li>
              ))}
            </Reveal>
            <Reveal className="contrib__stack" delay=".1s">
              {contribution.stack.map((group) => (
                <div className="stack-group" key={group.group}>
                  <span className="mono">{group.group}</span>
                  <Tags items={group.tags} />
                </div>
              ))}
            </Reveal>
          </div>
          <Reveal as="p" className="case__disclaimer">
            <Icon name="lock" />
            <span>{contribution.disclaimer}</span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** Rotating machine profiles per round + sample-weighted FedAvg. */
function FederatedStrategy() {
  const { table, fedavg } = federated;
  const [weightsRef, growStyle] = useGrow<HTMLUListElement>();
  return (
    <div className="case__block">
      <BlockHead {...federated.block} />
      <div className="grid fl">
        <Reveal className="fl__rounds">
          <p className="muted" style={ROUNDS_INTRO}>
            <RichText text={federated.intro} />
          </p>
          <table className="table table--rounds">
            <caption>{table.caption}</caption>
            <thead>
              <tr>
                {table.columns.map((col) => (
                  <th scope="col" key={col}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {table.rows.map((row) => (
                <tr key={row.round}>
                  <th scope="row">{row.round}</th>
                  {row.cells.map((cell, i) => (
                    <td data-label={table.columns[i + 1]} key={cell.machine}>
                      {cell.machine}
                      <small>{cell.profile}</small>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        <Reveal className="fl__fedavg" delay=".1s">
          <div className="formula ticks">
            <p className="mono muted">{fedavg.label}</p>
            <p className="formula__eq" role="img" aria-label={fedavg.formulaAriaLabel}>
              <i>W</i><sub>global</sub> = <span className="frac"><span>Σ <i>n</i><sub>k</sub> · <i>W</i><sub>k</sub></span><span>Σ <i>n</i><sub>k</sub></span></span>
            </p>
            <ul className="weights" id="weights" ref={weightsRef} style={growStyle}>
              {fedavg.weights.map((wt) => (
                <li key={wt.site}>
                  <span>{wt.site}</span>
                  <span className="bar">
                    <i style={cssVars({ '--w': wt.share })} />
                  </span>
                  <span>{wt.samples}</span>
                </li>
              ))}
            </ul>
            <p>
              <RichText text={fedavg.note} />
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
