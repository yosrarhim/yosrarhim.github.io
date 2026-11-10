import { results } from '../data/edgeSense';
import { useGrow } from '../hooks/useGrow';
import { cssVars } from '../lib/style';
import { Reveal } from './Reveal';

/** Fig. 03 — horizontal bars that grow once in view; dashed line = project target. */
export function ResultsChart() {
  const { chart } = results;
  const [barsRef, growStyle] = useGrow<HTMLDivElement>();
  return (
    <Reveal as="figure" className="results__chart" delay=".1s">
      <div className="bars" id="bars" role="img" aria-label={chart.ariaLabel} ref={barsRef} style={growStyle}>
        {chart.metrics.map((m) => (
          <div className="bars__row" key={m.label}>
            <span className="bars__label">{m.label}</span>
            <span className="bars__track">
              <span className="bars__fill" style={cssVars({ '--v': m.value })} />
              <span className="bars__target" />
            </span>
            <span className="bars__val">{m.display}</span>
          </div>
        ))}
        <div className="bars__axis" aria-hidden="true">
          <span />
          <div>
            {chart.axis.map((tick) => (
              <span key={tick}>{tick}</span>
            ))}
          </div>
          <span />
        </div>
      </div>
      <p className="bars__legend mono">
        <span>{chart.legend}</span>
      </p>
      <figcaption className="figcaption mono">
        <b>{chart.figure}</b>
        <span>{chart.caption}</span>
      </figcaption>
    </Reveal>
  );
}
