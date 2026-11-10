import { useEffect, useState, type RefObject } from 'react';
import { links, navAliases, navigation, person, spiedSectionIds, ui } from '../data/profile';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { cx } from '../lib/style';
import { Icon } from './Icon';
import { SocialIcons } from './SocialIcons';

const headerNav = navigation.filter((item) => item.inHeader);

interface HeaderProps {
  readonly menuOpen: boolean;
  readonly onToggleMenu: () => void;
  readonly toggleRef: RefObject<HTMLButtonElement | null>;
}

export function Header({ menuOpen, onToggleMenu, toggleRef }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const active = useScrollSpy(spiedSectionIds, navAliases);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={cx('site-header', scrolled && 'is-scrolled')} id="top">
      <div className="container">
        <a className="brand" href="#top" aria-label={`${person.name} — ${ui.backToTop}`}>
          <span className="brand__mark" aria-hidden="true">{person.initials}</span>
          <span className="brand__name">
            {person.name} <span className="brand__role mono">{person.brandRole}</span>
          </span>
        </a>

        <nav className="nav" aria-label={ui.primaryNav}>
          <ul className="nav__list mono">
            {headerNav.map((item) => (
              <li key={item.id}>
                <a className="nav__link" href={`#${item.id}`} aria-current={active === item.id ? 'true' : undefined}>
                  <span>{item.num}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="nav__social">
            <SocialIcons />
          </div>
          <a className="btn btn--ghost nav__cv" href={links.cv} target="_blank" rel="noopener">
            {ui.cvShort} <Icon name="down" />
          </a>
        </nav>

        <button
          ref={toggleRef}
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? ui.closeMenu : ui.openMenu}
          onClick={onToggleMenu}
        >
          <span className="menu-toggle__bars" aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
