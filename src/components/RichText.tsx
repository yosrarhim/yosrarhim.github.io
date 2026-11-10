import type { ReactNode } from 'react';
import type { Rich } from '../data/types';

/*
 * Renders the tiny inline markup used in src/data (no HTML strings, no innerHTML):
 *   **strong**   *em*   _{sub}   `code`   ==highlight==   \n → <br />
 * Tokens do not nest; that is all the content needs.
 */
const TOKEN = /(\*\*[^*]+\*\*|\*[^*]+\*|_\{[^}]+\}|`[^`]+`|==[^=]+==|\n)/g;

/** Same colour as the original inline `<span style="color:var(--text-d)">`. */
const HIGHLIGHT = { color: 'var(--text-d)' } as const;

interface RichTextProps {
  readonly text: Rich;
  /** Element used for `**…**`. Some styles target `<b>` specifically. */
  readonly strong?: 'strong' | 'b';
}

export function RichText({ text, strong: Strong = 'strong' }: RichTextProps) {
  const nodes: ReactNode[] = text.split(TOKEN).map((part, i) => {
    if (part === '') return null;
    if (part === '\n') return <br key={i} />;
    if (part.startsWith('**') && part.endsWith('**')) return <Strong key={i}>{part.slice(2, -2)}</Strong>;
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) return <em key={i}>{part.slice(1, -1)}</em>;
    if (part.startsWith('_{') && part.endsWith('}')) return <sub key={i}>{part.slice(2, -1)}</sub>;
    if (part.startsWith('`') && part.endsWith('`')) return <code key={i}>{part.slice(1, -1)}</code>;
    if (part.startsWith('==') && part.endsWith('==')) return <span key={i} style={HIGHLIGHT}>{part.slice(2, -2)}</span>;
    return part;
  });
  return <>{nodes}</>;
}
