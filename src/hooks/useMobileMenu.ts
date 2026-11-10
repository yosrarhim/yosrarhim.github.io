import { useCallback, useEffect, useRef, useState, type RefObject } from 'react';

/** Above this width the desktop navigation is shown and the menu must close. */
const DESKTOP_QUERY = '(min-width: 921px)';

export interface MobileMenu {
  readonly open: boolean;
  readonly toggle: () => void;
  readonly close: () => void;
  readonly toggleRef: RefObject<HTMLButtonElement | null>;
}

/**
 * Full-screen mobile menu state. Mirrors the original behaviour:
 * `body.menu-open` + scroll lock, Escape closes and returns focus to the
 * toggle, and the menu closes when the viewport grows to desktop width.
 */
export function useMobileMenu(): MobileMenu {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const toggle = useCallback(() => setOpen((v) => !v), []);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY);
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return { open, toggle, close, toggleRef };
}
