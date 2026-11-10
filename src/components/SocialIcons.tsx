import { socials, ui } from '../data/profile';
import { Icon } from './Icon';

/** LinkedIn + GitHub square icon buttons (header, mobile menu, hero). */
export function SocialIcons({ onNavigate }: { readonly onNavigate?: () => void }) {
  return (
    <>
      {socials.map((s) => (
        <a
          key={s.id}
          className="icon-btn"
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${s.name} ${ui.opensInNewTab}`}
          onClick={onNavigate}
        >
          <Icon name={s.id} />
        </a>
      ))}
    </>
  );
}
