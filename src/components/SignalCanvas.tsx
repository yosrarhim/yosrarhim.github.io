import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

/*
 * HERO — illustrative sensor signal through a sliding window.
 * Port of the original vanilla canvas: same deterministic generator (seed 7),
 * same drawing, 40 samples/s. Runs only while visible, the tab is shown and
 * motion is allowed; otherwise one static frame is drawn.
 */

export type MachineState = 'NORMAL' | 'WARNING' | 'CRITICAL';

export interface Readout {
  readonly p: string;
  readonly state: MachineState;
}

const N = 320; // samples on screen
const LEAD = 18; // samples between the window's leading edge and the right border
const SAMPLES_PER_SECOND = 40;
const INITIAL_P = 0.03;

const COLORS = {
  line: 'rgba(233,230,222,0.82)',
  grid: 'rgba(233,230,222,0.07)',
  axis: 'rgba(233,230,222,0.22)',
  accent: '#00e0c6',
  warn: '#f2b84b',
  crit: '#ff5d5d',
  muted: 'rgba(156,162,171,0.9)',
} as const;

const stateOf = (p: number): MachineState => (p >= 0.7 ? 'CRITICAL' : p >= 0.4 ? 'WARNING' : 'NORMAL');
const colorOf = (s: MachineState): string => (s === 'CRITICAL' ? COLORS.crit : s === 'WARNING' ? COLORS.warn : COLORS.accent);
const formatP = (p: number): string => Math.max(0, Math.min(0.99, p)).toFixed(2);

export const initialReadout: Readout = { p: formatP(INITIAL_P), state: stateOf(Math.max(0, Math.min(0.99, INITIAL_P))) };

interface SignalCanvasProps {
  readonly ariaLabel: string;
  /** Length of the sliding window, in samples. */
  readonly windowSize: number;
  /** Called when the displayed probability or state changes. */
  readonly onReadout: (readout: Readout) => void;
}

interface Controller {
  setReduced: (reduced: boolean) => void;
}

export function SignalCanvas({ ariaLabel, windowSize, onReadout }: SignalCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const onReadoutRef = useRef(onReadout);
  const controllerRef = useRef<Controller | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    onReadoutRef.current = onReadout;
  }, [onReadout]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    let disposed = false;
    let w = 0;
    let h = 0;
    let t = 0; // sample clock
    const buf = new Float32Array(N);
    const prob = new Float32Array(N);
    let pSmooth = INITIAL_P;
    let running = false;
    let raf = 0;
    let last = 0;
    let acc = 0;
    let visible = false;
    let reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Deterministic pseudo-random for reproducible frames
    let seed = 7;
    const rnd = () => {
      seed = (seed * 16807) % 2147483647;
      return seed / 2147483647;
    };
    const gauss = () => {
      let s = 0;
      for (let i = 0; i < 4; i++) s += rnd();
      return (s - 2) / 0.58;
    };

    // Degradation episodes: slow drift then burst, then recovery (illustrative only)
    const anomaly = (k: number) => {
      const period = 900;
      const x = k % period;
      if (x < 520) return 0;
      if (x < 760) return (x - 520) / 240; // degradation ramp
      if (x < 820) return 1; // fault
      return Math.max(0, 1 - (x - 820) / 40); // maintenance reset
    };
    const sample = (k: number) => {
      const a = anomaly(k);
      const base = 0.42 * Math.sin(k * 0.21) + 0.22 * Math.sin(k * 0.053 + 1.3) + 0.08 * gauss();
      const fault = a * (0.55 * Math.sin(k * 0.93) + 0.35 * gauss());
      return { v: base * (1 + 0.6 * a) + fault, a };
    };
    // Map latent degradation to a probability through a logistic, like a calibrated classifier would
    const score = (a: number) => 1 / (1 + Math.exp(-9 * (a - 0.55)));

    for (let i = 0; i < N; i++) {
      const s = sample(i);
      buf[i] = s.v;
      prob[i] = score(s.a);
    }
    t = N;

    const draw = () => {
      if (!w) return;
      ctx.clearRect(0, 0, w, h);
      const padL = 14;
      const padR = 14;
      const top = 18;
      const sigH = h * 0.6;
      const sigMid = top + sigH / 2;
      const pTop = top + sigH + 26;
      const pH = h - pTop - 16;
      const dx = (w - padL - padR) / (N - 1);

      // grid
      ctx.strokeStyle = COLORS.grid;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let gx = padL; gx <= w - padR + 0.5; gx += (w - padL - padR) / 10) {
        ctx.moveTo(Math.round(gx) + 0.5, top);
        ctx.lineTo(Math.round(gx) + 0.5, h - 16);
      }
      for (let i = 0; i <= 4; i++) {
        const gy = Math.round(top + (sigH / 4) * i) + 0.5;
        ctx.moveTo(padL, gy);
        ctx.lineTo(w - padR, gy);
      }
      ctx.stroke();

      // sliding window
      const wx0 = padL + (N - windowSize - LEAD) * dx;
      const wx1 = padL + (N - LEAD) * dx;
      const st = stateOf(pSmooth);
      const c = colorOf(st);
      ctx.fillStyle = st === 'NORMAL' ? 'rgba(0,224,198,0.07)' : st === 'WARNING' ? 'rgba(242,184,75,0.08)' : 'rgba(255,93,93,0.09)';
      ctx.fillRect(wx0, top - 8, wx1 - wx0, sigH + 16);
      ctx.strokeStyle = c;
      ctx.lineWidth = 1;
      ctx.strokeRect(Math.round(wx0) + 0.5, top - 8 + 0.5, Math.round(wx1 - wx0), sigH + 16);
      ctx.fillStyle = c;
      ctx.font = '500 10px "Geist Mono", ui-monospace, monospace';
      ctx.fillText(`WINDOW · ${windowSize}`, wx0 + 6, top + 4);

      // signal
      const traceSignal = () => {
        ctx.beginPath();
        for (let i = 0; i < N; i++) {
          const x = padL + i * dx;
          const y = sigMid - (buf[i] ?? 0) * (sigH * 0.38);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      };
      ctx.lineWidth = 1.25;
      ctx.strokeStyle = COLORS.line;
      traceSignal();
      // highlight inside window
      ctx.save();
      ctx.beginPath();
      ctx.rect(wx0, top - 8, wx1 - wx0, sigH + 16);
      ctx.clip();
      ctx.strokeStyle = c;
      ctx.lineWidth = 1.5;
      traceSignal();
      ctx.restore();

      // probability track
      ctx.strokeStyle = COLORS.axis;
      ctx.beginPath();
      ctx.moveTo(padL, pTop + pH + 0.5);
      ctx.lineTo(w - padR, pTop + pH + 0.5);
      ctx.stroke();
      // thresholds
      for (const [v, col] of [[0.7, COLORS.crit], [0.4, COLORS.warn]] as const) {
        const yy = Math.round(pTop + pH - v * pH) + 0.5;
        ctx.setLineDash([3, 4]);
        ctx.strokeStyle = col;
        ctx.globalAlpha = 0.6;
        ctx.beginPath();
        ctx.moveTo(padL, yy);
        ctx.lineTo(w - padR, yy);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.globalAlpha = 1;
      }
      ctx.fillStyle = COLORS.muted;
      ctx.font = '10px "Geist Mono", ui-monospace, monospace';
      ctx.fillText('p(failure)', padL, pTop - 8);
      ctx.lineWidth = 1.25;
      ctx.strokeStyle = COLORS.accent;
      ctx.beginPath();
      for (let i = 0; i < N; i++) {
        const x = padL + i * dx;
        const y = pTop + pH - (prob[i] ?? 0) * pH;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      // cursor
      const cx = padL + (N - LEAD) * dx;
      const cy = pTop + pH - pSmooth * pH;
      ctx.fillStyle = c;
      ctx.beginPath();
      ctx.arc(cx, cy, 3, 0, Math.PI * 2);
      ctx.fill();
    };

    const step = () => {
      buf.copyWithin(0, 1);
      prob.copyWithin(0, 1);
      const s = sample(t++);
      buf[N - 1] = s.v;
      prob[N - 1] = score(s.a);
      // window score = probability at the window's leading edge
      pSmooth += ((prob[N - LEAD] ?? 0) - pSmooth) * 0.25;
    };

    let shown = initialReadout;
    const updateReadout = () => {
      const p = formatP(pSmooth);
      const state = stateOf(Math.max(0, Math.min(0.99, pSmooth)));
      if (p === shown.p && state === shown.state) return;
      shown = { p, state };
      onReadoutRef.current(shown);
    };

    const loop = (now: number) => {
      if (!running) return;
      const dt = Math.min(64, now - (last || now));
      last = now;
      acc += dt;
      const msPerSample = 1000 / SAMPLES_PER_SECOND;
      while (acc >= msPerSample) {
        step();
        acc -= msPerSample;
      }
      draw();
      updateReadout();
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || reducedMotion) return;
      running = true;
      last = 0;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };
    const sync = () => {
      if (visible && !document.hidden && !reducedMotion) start();
      else stop();
    };

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = Math.max(1, Math.round(r.width));
      h = Math.max(1, Math.round(r.height));
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? false;
      sync();
    });
    visibility.observe(canvas);
    document.addEventListener('visibilitychange', sync);
    void document.fonts.ready.then(() => {
      if (!disposed) draw();
    });
    resize();

    controllerRef.current = {
      setReduced: (value) => {
        reducedMotion = value;
        sync();
      },
    };

    return () => {
      disposed = true;
      controllerRef.current = null;
      stop();
      resizeObserver.disconnect();
      visibility.disconnect();
      document.removeEventListener('visibilitychange', sync);
    };
  }, [windowSize]);

  // Declared after the engine so it applies to the controller created above.
  useEffect(() => {
    controllerRef.current?.setReduced(reduced);
  }, [reduced]);

  return <canvas ref={canvasRef} id="signal" role="img" aria-label={ariaLabel} />;
}
