import type { ComponentPropsWithoutRef, CSSProperties, ElementType } from 'react';
import { useReveal } from '../hooks/useReveal';
import { cssVars, cx } from '../lib/style';

type RevealProps<T extends ElementType> = {
  /** Element to render — no wrapper is added, so grid layouts are untouched. */
  readonly as?: T;
  /** Stagger delay, written to `--d` (e.g. ".1s"). */
  readonly delay?: string;
  readonly className?: string;
  readonly style?: CSSProperties;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'className' | 'style'>;

/**
 * Any element marked `data-reveal`: it fades/slides in (CSS) once it has
 * scrolled into view, when `.is-in` is added.
 */
export function Reveal<T extends ElementType = 'div'>({ as, delay, className, style, ...rest }: RevealProps<T>) {
  const Tag: ElementType = as ?? 'div';
  const [ref, revealed] = useReveal();
  return (
    <Tag
      {...rest}
      ref={ref}
      data-reveal=""
      className={cx(className, revealed && 'is-in')}
      style={delay ? cssVars({ '--d': delay }, style) : style}
    />
  );
}
