import { useCallback, useState, type RefCallback } from 'react';

/*
 * One shared IntersectionObserver for every `[data-reveal]` element
 * (same options as the original vanilla script). Each element is revealed
 * once, then unobserved.
 */
const OPTIONS: IntersectionObserverInit = { rootMargin: '0px 0px -8% 0px', threshold: 0.08 };

const onReveal = new Map<Element, () => void>();
let shared: IntersectionObserver | null = null;

function observer(): IntersectionObserver {
  shared ??= new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      onReveal.get(entry.target)?.();
      onReveal.delete(entry.target);
      shared?.unobserve(entry.target);
    }
  }, OPTIONS);
  return shared;
}

/** Returns a ref callback and `true` once the element has scrolled into view. */
export function useReveal<T extends Element = HTMLElement>(): [RefCallback<T>, boolean] {
  const [revealed, setRevealed] = useState(false);

  const ref = useCallback<RefCallback<T>>((el) => {
    if (!el) return;
    const io = observer();
    onReveal.set(el, () => setRevealed(true));
    io.observe(el);
    return () => {
      onReveal.delete(el);
      io.unobserve(el);
    };
  }, []);

  return [ref, revealed];
}
