import { useEffect, useRef, useState } from 'react';
import { architecture, type BomTarget, type Highlight, type RoundAction } from '../data/edgeSense';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { cx } from '../lib/style';
import { Icon } from './Icon';
import { Reveal } from './Reveal';
import { RichText } from './RichText';

/*
 * Fig. 02 — inspect components, or simulate one federated round.
 * Highlight / step / narration live in React state; the travelling packets are
 * drawn imperatively inside a <g> React never renders children into.
 */

const SVG_NS = 'http://www.w3.org/2000/svg';
/** Text offsets inside zones and nodes (same geometry as the original drawing). */
const ZONE_LABEL = { dx: 14, dy: 22 } as const;
const NODE_TEXT = { dx: 14, titleDy: 26, detailDy: 46 } as const;

const { round } = architecture;

const easeInOutQuad = (k: number) => (k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2);

/** setTimeout as a promise that resolves early when the round is cancelled. */
function wait(ms: number, signal: AbortSignal): Promise<void> {
  return new Promise((resolve) => {
    if (signal.aborted) {
      resolve();
      return;
    }
    const onAbort = () => {
      window.clearTimeout(timer);
      resolve();
    };
    const timer = window.setTimeout(() => {
      signal.removeEventListener('abort', onAbort);
      resolve();
    }, ms);
    signal.addEventListener('abort', onAbort, { once: true });
  });
}

/** Move one glowing dot along each path, in parallel. */
function animatePackets(paths: readonly SVGPathElement[], ms: number, layer: SVGGElement, signal: AbortSignal): Promise<void> {
  return new Promise((resolve) => {
    if (signal.aborted) {
      resolve();
      return;
    }
    const dots = paths.map(() => {
      const dot = document.createElementNS(SVG_NS, 'circle');
      dot.setAttribute('r', '4');
      dot.setAttribute('class', 'packet');
      layer.appendChild(dot);
      return dot;
    });
    const lengths = paths.map((p) => p.getTotalLength());
    let t0 = 0;
    let raf = 0;

    const finish = () => {
      cancelAnimationFrame(raf);
      for (const dot of dots) dot.remove();
      signal.removeEventListener('abort', finish);
      resolve();
    };
    const tick = (now: number) => {
      if (!t0) t0 = now;
      const k = Math.min(1, (now - t0) / ms);
      const e = easeInOutQuad(k);
      paths.forEach((path, i) => {
        const pt = path.getPointAtLength((lengths[i] ?? 0) * e);
        dots[i]?.setAttribute('cx', String(pt.x));
        dots[i]?.setAttribute('cy', String(pt.y));
      });
      if (k < 1) raf = requestAnimationFrame(tick);
      else finish();
    };

    signal.addEventListener('abort', finish, { once: true });
    raf = requestAnimationFrame(tick);
  });
}

export function ArchitectureDiagram() {
  const reduced = useReducedMotion();
  const reducedRef = useRef(reduced);
  const svgRef = useRef<SVGSVGElement>(null);
  const packetsRef = useRef<SVGGElement>(null);
  const roundRef = useRef<AbortController | null>(null);

  const [selected, setSelected] = useState<BomTarget | null>(null);
  const [highlight, setHighlight] = useState<Highlight | null>(null);
  const [step, setStep] = useState(-1);
  const [narration, setNarration] = useState(round.idle);
  const [running, setRunning] = useState(false);
  const [completedRounds, setCompletedRounds] = useState(0);

  useEffect(() => {
    reducedRef.current = reduced;
  }, [reduced]);

  // Cancel a running round when the diagram unmounts.
  useEffect(() => () => roundRef.current?.abort(), []);

  const stopRound = () => {
    roundRef.current?.abort();
    roundRef.current = null;
    setRunning(false);
    setStep(-1);
  };

  const select = (target: BomTarget) => {
    stopRound();
    if (selected === target) {
      setSelected(null);
      setHighlight(null);
      return;
    }
    setSelected(target);
    setHighlight(architecture.relations[target]);
  };

  const perform = (action: RoundAction, signal: AbortSignal): Promise<void> => {
    const reduce = reducedRef.current;
    if (action.type === 'wait') {
      return wait(reduce ? Math.min(action.ms, round.reducedMaxWaitMs) : action.ms, signal);
    }
    const svg = svgRef.current;
    const layer = packetsRef.current;
    const paths = action.paths
      .map((id) => svg?.querySelector<SVGPathElement>(`#${id}`))
      .filter((p): p is SVGPathElement => p != null);
    if (reduce || !layer || paths.length === 0) return wait(round.reducedPacketMs, signal);
    return animatePackets(paths, action.ms, layer, signal);
  };

  const runRound = async () => {
    if (roundRef.current) return;
    const controller = new AbortController();
    roundRef.current = controller;
    const { signal } = controller;
    setSelected(null);
    setRunning(true);

    for (const [i, s] of round.steps.entries()) {
      if (signal.aborted) return;
      setStep(i);
      setHighlight(s);
      setNarration(s.text);
      for (const action of s.actions) {
        await perform(action, signal);
        if (signal.aborted) return;
      }
    }

    roundRef.current = null;
    setNarration(round.complete);
    setHighlight(null);
    setRunning(false);
    setCompletedRounds((n) => n + 1);
  };

  const activeNodes = new Set(highlight?.nodes);
  const activeEdges = new Set(highlight?.edges);

  return (
    <Reveal as="figure" className="arch" id="arch" data-dim={highlight ? 'true' : 'false'}>
      <div className="arch__stage">
        <svg ref={svgRef} className="arch__svg" viewBox={architecture.viewBox} role="img" aria-labelledby="arch-t arch-d">
          <title id="arch-t">{architecture.title}</title>
          <desc id="arch-d">{architecture.description}</desc>
          <defs>
            <marker id="ah" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path className="arrow" d="M0 0 8 4 0 8z" />
            </marker>
          </defs>

          {architecture.zones.map((z) => (
            <g className="zone" key={z.label}>
              <rect x={z.x} y={z.y} width={z.w} height={z.h} />
              <text x={z.x + ZONE_LABEL.dx} y={z.y + ZONE_LABEL.dy}>{z.label}</text>
            </g>
          ))}

          {/* edges are drawn before nodes */}
          {architecture.edges.map((edge) => (
            <g className={cx('edge', activeEdges.has(edge.key) && 'is-active')} data-edge={edge.key} key={edge.key}>
              {edge.paths.map((p) => (
                <path key={p.id} id={p.id} d={p.d} markerStart={p.arrowStart ? 'url(#ah)' : undefined} markerEnd="url(#ah)" />
              ))}
              <text x={edge.label.x} y={edge.label.y}>{edge.label.text}</text>
            </g>
          ))}

          {architecture.nodes.map((n) => (
            <g className={cx('node', n.dashed && 'is-dashed', activeNodes.has(n.key) && 'is-active')} data-node={n.key} key={n.title}>
              <rect x={n.x} y={n.y} width={n.w} height={n.h} />
              <text className="t1" x={n.x + NODE_TEXT.dx} y={n.y + NODE_TEXT.titleDy}>{n.title}</text>
              <text className="t2" x={n.x + NODE_TEXT.dx} y={n.y + NODE_TEXT.detailDy}>{n.detail}</text>
            </g>
          ))}

          <g id="packets" ref={packetsRef} />
        </svg>
        <p className="arch__mobile-note">{architecture.mobileNote}</p>
        <div className="arch__controls">
          <button className="btn btn--ghost" type="button" id="round-btn" disabled={running} onClick={() => void runRound()}>
            {completedRounds > 0 ? round.againLabel : round.startLabel} <Icon name="arrow" />
          </button>
          <ol className="arch__steps" aria-hidden="true">
            {round.steps.map((s, j) => (
              <li key={s.text} className={j <= step ? 'is-on' : undefined} />
            ))}
          </ol>
          <p className="arch__narr" id="round-narr" aria-live="polite">
            <RichText text={narration} strong="b" />
          </p>
        </div>
      </div>

      <div className="arch__side">
        <p className="arch__side-head mono">{architecture.sideHead}</p>
        <ul className="bom">
          {architecture.bom.map((item) => (
            <li key={item.target}>
              <button type="button" data-target={item.target} aria-pressed={selected === item.target} onClick={() => select(item.target)}>
                <span className="idx">{item.idx}</span>
                <span>
                  <span className="nm">
                    {/* one text node "Name " before <small>, as in the original markup */}
                    {item.tag ? `${item.name} ` : item.name}
                    {item.tag ? <small>{item.tag}</small> : null}
                  </span>
                  <span className="ds">{item.description}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}
