import type { IconName } from '../data/types';

/** Inline SVG sprite, rendered once at the top of the page. */
export function IconSprite() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <symbol id="i-arrow" viewBox="0 0 16 16"><path d="M1 8h13M9 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.4" /></symbol>
      <symbol id="i-ext" viewBox="0 0 16 16"><path d="M4 12 12 4M5.5 4H12v6.5" fill="none" stroke="currentColor" strokeWidth="1.4" /></symbol>
      <symbol id="i-down" viewBox="0 0 16 16"><path d="M8 1v11M3.5 7.5 8 12l4.5-4.5M2 15h12" fill="none" stroke="currentColor" strokeWidth="1.4" /></symbol>
      <symbol id="i-plus" viewBox="0 0 16 16"><path d="M8 1v14M1 8h14" fill="none" stroke="currentColor" strokeWidth="1.4" /></symbol>
      <symbol id="i-copy" viewBox="0 0 16 16"><path d="M5 5h9v9H5zM2 11V2h9" fill="none" stroke="currentColor" strokeWidth="1.3" /></symbol>
      <symbol id="i-lock" viewBox="0 0 16 16"><path d="M3.5 7h9v7.5h-9zM5.5 7V4.8a2.5 2.5 0 0 1 5 0V7" fill="none" stroke="currentColor" strokeWidth="1.3" /></symbol>
      <symbol id="i-mail" viewBox="0 0 16 16"><path d="M1.5 3.5h13v9h-13zM1.5 4l6.5 5 6.5-5" fill="none" stroke="currentColor" strokeWidth="1.3" /></symbol>
      <symbol id="i-linkedin" viewBox="0 0 24 24"><path fill="currentColor" d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" /></symbol>
      <symbol id="i-github" viewBox="0 0 24 24"><path fill="currentColor" d="M12 .3a12 12 0 0 0-3.8 23.38c.6.12.83-.26.83-.57L9 21.07c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.08-.74.09-.73.09-.73 1.2.09 1.83 1.24 1.83 1.24 1.07 1.83 2.81 1.3 3.5 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18a4.65 4.65 0 0 1 1.23 3.22c0 4.61-2.8 5.63-5.48 5.92.42.36.81 1.1.81 2.22l-.01 3.29c0 .31.2.69.82.57A12 12 0 0 0 12 .3" /></symbol>
    </svg>
  );
}

export function Icon({ name }: { readonly name: IconName }) {
  return (
    <svg aria-hidden="true">
      <use href={`#i-${name}`} />
    </svg>
  );
}
