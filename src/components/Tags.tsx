import { cx } from '../lib/style';

export function Tags({ items, className }: { readonly items: readonly string[]; readonly className?: string }) {
  return (
    <div className={cx(className, 'tags')}>
      {items.map((tag) => (
        <span className="tag" key={tag}>
          {tag}
        </span>
      ))}
    </div>
  );
}
