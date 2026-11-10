import { links, navigation, ui } from '../data/profile';
import { Icon } from './Icon';
import { SocialIcons } from './SocialIcons';

interface MobileMenuProps {
  readonly open: boolean;
  /** Called when any link is followed, to close the menu. */
  readonly onNavigate: () => void;
}

/** Full-screen menu below 921px. `inert` keeps it out of the tab order while closed. */
export function MobileMenu({ open, onNavigate }: MobileMenuProps) {
  return (
    <nav className="mobile-menu" id="mobile-menu" aria-label={ui.mobileNav} inert={!open}>
      <ul className="mobile-menu__list">
        {navigation.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`} onClick={onNavigate}>
              <span>{item.num}</span>
              {item.mobileLabel ?? item.label}
            </a>
          </li>
        ))}
      </ul>
      <div className="mobile-menu__foot">
        <a className="btn btn--primary" href={links.cv} target="_blank" rel="noopener" onClick={onNavigate}>
          {ui.downloadCv} <Icon name="down" />
        </a>
        <SocialIcons onNavigate={onNavigate} />
      </div>
    </nav>
  );
}
