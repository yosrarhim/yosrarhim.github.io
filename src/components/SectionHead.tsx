import type { SectionMeta } from '../data/types';

/** Section header: §NN · label ───── note */
export function SectionHead({ num, label, note }: SectionMeta) {
  return (
    <header className="sec-head mono">
      <span className="sec-head__num">{num}</span>
      <span>{label}</span>
      <span className="sec-head__note">{note}</span>
    </header>
  );
}
