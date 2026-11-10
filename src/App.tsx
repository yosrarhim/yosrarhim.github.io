import { ui } from './data/profile';
import { useMobileMenu } from './hooks/useMobileMenu';
import { Contact } from './components/Contact';
import { EdgeSenseCase } from './components/EdgeSenseCase';
import { Education } from './components/Education';
import { Experience } from './components/Experience';
import { Expertise } from './components/Expertise';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { IconSprite } from './components/Icon';
import { MobileMenu } from './components/MobileMenu';
import { Profile } from './components/Profile';
import { Research } from './components/Research';
import { WorkIndex } from './components/WorkIndex';

export function App() {
  // `html.js` and the hero load-in (`body.is-loaded`) are set by inline scripts in
  // index.html so they apply to the pre-rendered HTML before this bundle loads.
  const menu = useMobileMenu();

  return (
    <>
      <IconSprite />
      <a className="skip-link" href="#main">{ui.skipToContent}</a>
      <Header menuOpen={menu.open} onToggleMenu={menu.toggle} toggleRef={menu.toggleRef} />
      <MobileMenu open={menu.open} onNavigate={menu.close} />
      <main id="main">
        <Hero />
        <Profile />
        <EdgeSenseCase />
        <WorkIndex />
        <Experience />
        <Expertise />
        <Research />
        <Education />
        <Contact />
      </main>
    </>
  );
}
