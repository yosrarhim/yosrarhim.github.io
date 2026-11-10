import { useCallback, useState, type RefCallback } from 'react';

export interface InViewOptions {
  readonly rootMargin?: string;
  readonly threshold?: number;
  /** Stop observing after the first intersection. */
  readonly once?: boolean;
}

/**
 * Observe one element with IntersectionObserver.
 * Returns a ref callback to attach and whether the element is in view.
 */
export function useInView<T extends Element = HTMLElement>({
  rootMargin = '0px',
  threshold = 0,
  once = false,
}: InViewOptions = {}): [RefCallback<T>, boolean] {
  const [inView, setInView] = useState(false);

  const ref = useCallback<RefCallback<T>>(
    (el) => {
      if (!el) return;
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              setInView(true);
              if (once) observer.disconnect();
            } else if (!once) {
              setInView(false);
            }
          }
        },
        { rootMargin, threshold },
      );
      observer.observe(el);
      return () => observer.disconnect();
    },
    [rootMargin, threshold, once],
  );

  return [ref, inView];
}
