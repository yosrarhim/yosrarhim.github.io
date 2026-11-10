import { useEffect, useState } from 'react';

/**
 * Track which section crosses the middle band of the viewport.
 * `aliases` maps sections without their own nav link to the link to highlight.
 * Like the original script, the last active link stays active until another
 * observed section enters the band.
 */
export function useScrollSpy(
  sectionIds: readonly string[],
  aliases: Readonly<Record<string, string>> = {},
  rootMargin = '-45% 0px -50% 0px',
): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const id = entry.target.id;
          setActive(aliases[id] ?? id);
        }
      },
      { rootMargin },
    );
    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [sectionIds, aliases, rootMargin]);

  return active;
}
