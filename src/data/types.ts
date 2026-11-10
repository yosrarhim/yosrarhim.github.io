/**
 * Shared content types.
 *
 * `Rich` strings support a tiny inline syntax rendered by <RichText />:
 *   **strong**   *emphasis*   _{subscript}   `code`   ==highlight==   \n (line break)
 */
export type Rich = string;

export interface SectionMeta {
  readonly num: string;
  readonly label: string;
  readonly note: string;
}

export interface Link {
  readonly label: string;
  readonly href: string;
}

/** A term / value pair rendered in a <dl>. */
export interface Spec {
  readonly term: string;
  readonly value: Rich;
}

/** Inline sentence made of plain text and links. */
export type InlineSegment = string | Link;

export type IconName = 'arrow' | 'ext' | 'down' | 'plus' | 'copy' | 'lock' | 'mail' | 'linkedin' | 'github';
