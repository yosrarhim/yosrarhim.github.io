import type { CSSProperties, RefCallback } from 'react';
import { cssVars } from '../lib/style';
import { useInView } from './useInView';

const GROWN = cssVars({ '--grow': 1, '--progress': 1 });

/**
 * One-shot "grow" for the trajectory line, FedAvg weights and result bars:
 * once 30% visible, sets `--grow` / `--progress` to 1 (children inherit them).
 */
export function useGrow<T extends Element = HTMLElement>(): [RefCallback<T>, CSSProperties | undefined] {
  const [ref, inView] = useInView<T>({ threshold: 0.3, once: true });
  return [ref, inView ? GROWN : undefined];
}
