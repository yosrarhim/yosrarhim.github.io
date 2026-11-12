import { useEffect, useState } from 'react';
import { hero } from '../data/profile';
import { useInView } from '../hooks/useInView';
import { usePageVisible } from '../hooks/usePageVisible';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { cssVars, cx } from '../lib/style';

const { stack } = hero;
const pad = (n: number) => String(n).padStart(2, '0');

/**
 * Hero panel: the four layers of a system — sense, connect, learn, deliver —
 * with the tools I use for each. The active layer cycles while the panel is on
 * screen and the tab is visible; with reduced motion every layer is shown statically.
 */
export function SystemStack() {
  const reduced = useReducedMotion();
  const pageVisible = usePageVisible();
  const [ref, inView] = useInView<HTMLDivElement>();
  const [step, setStep] = useState(0);
  const animate = inView && pageVisible && !reduced;

  useEffect(() => {
    if (!animate) return;
    const timer = window.setInterval(() => setStep((s) => (s + 1) % stack.layers.length), stack.stepMs);
    return () => window.clearInterval(timer);
  }, [animate]);

  const current = stack.layers[step] ?? stack.layers[0];

  return (
    <div className="instrument ticks" ref={ref}>
      <div className="instrument__bar mono">
        <span>
          <b>{stack.label}</b> {stack.title}
        </span>
        <span>{stack.status}</span>
      </div>

      <ol className={cx('stack', reduced && 'stack--static')} style={cssVars({ '--step': `${stack.stepMs}ms` })}>
        {stack.layers.map((layer, i) => (
          <li className={cx('stack__layer', i === step && 'is-active')} key={layer.verb}>
            <span className="stack__node" aria-hidden="true" />
            <span className="stack__idx mono">{pad(i + 1)}</span>
            <div>
              <p className="stack__name">
                <b>{layer.verb}</b> <span>{layer.domain}</span>
              </p>
              <p className="stack__tools mono">{layer.tools.join(' · ')}</p>
            </div>
          </li>
        ))}
      </ol>

      {/* Decorative live readout (the list above carries the content). */}
      <dl className="instrument__readout" aria-hidden="true">
        <div>
          <dt className="mono">{stack.readout.step}</dt>
          <dd>
            {pad(step + 1)}/{pad(stack.layers.length)}
          </dd>
        </div>
        <div>
          <dt className="mono">{stack.readout.layer}</dt>
          <dd>{current.verb}</dd>
        </div>
        <div>
          <dt className="mono">{stack.readout.domain}</dt>
          <dd className="state">{current.short}</dd>
        </div>
      </dl>
    </div>
  );
}
