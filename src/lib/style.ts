import type { CSSProperties } from 'react';

/** Join class names, skipping falsy values. Returns `undefined` when empty. */
export function cx(...classes: ReadonlyArray<string | false | null | undefined>): string | undefined {
  const value = classes.filter(Boolean).join(' ');
  return value === '' ? undefined : value;
}

/** Spacing below the large section titles (§04, §05, §07), as in the original markup. */
export const TITLE_SPACING: CSSProperties = { marginBottom: 'clamp(40px,5vw,64px)' };

type CustomProperty = `--${string}`;

/** Inline style with CSS custom properties (e.g. `--d`, `--v`, `--grow`). */
export function cssVars(vars: Partial<Record<CustomProperty, string | number>>, base?: CSSProperties): CSSProperties {
  return { ...base, ...vars } as CSSProperties;
}
