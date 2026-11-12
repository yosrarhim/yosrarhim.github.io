import { hero, links, ui } from '../data/profile';
import { cssVars } from '../lib/style';
import { Icon } from './Icon';
import { RichText } from './RichText';
import { SocialIcons } from './SocialIcons';
import { SystemStack } from './SystemStack';

/** Load-in choreography: each `data-hero` element fades in after `--d` once `body.is-loaded` is set. */
const delay = (d: string) => cssVars({ '--d': d });

export function Hero() {
  return (
    <section className="hero on-dark blueprint" aria-labelledby="hero-title">
      <div className="container hero__meta mono" data-hero="" style={delay('.1s')}>
        <span>{hero.edition}</span>
        <span>{hero.location}</span>
        <span className="hero__status">
          <span className="pulse" aria-hidden="true" />
          {hero.status}
        </span>
      </div>

      <div className="container grid hero__body">
        <div className="hero__text">
          <p className="hero__kicker mono" data-hero="" style={delay('.2s')}>{hero.kicker}</p>
          <h1 className="hero__name" id="hero-title">
            <span className="line"><span style={delay('.25s')}>{hero.firstName}</span></span>
            <span className="line"><span style={delay('.38s')}><em>{hero.lastName}</em></span></span>
          </h1>
          <p className="hero__headline" data-hero="" style={delay('.6s')}>
            <RichText text={hero.headline} />
          </p>
          <p className="hero__intro" data-hero="" style={delay('.7s')}>
            <RichText text={hero.intro} />
          </p>
          <div className="hero__actions" data-hero="" style={delay('.8s')}>
            <a className="btn btn--primary" href={hero.primaryCta.href}>
              {hero.primaryCta.label} <Icon name="arrow" />
            </a>
            <a className="btn btn--ghost" href={links.cv} target="_blank" rel="noopener">
              {ui.downloadCv} <span className="sr-only">{ui.pdfInNewTab}</span>
              <Icon name="down" />
            </a>
            <SocialIcons />
          </div>
        </div>

        <figure className="hero__figure" data-hero="" style={delay('.55s')}>
          <SystemStack />
          <figcaption className="figcaption mono">
            <b>{hero.stack.figure}</b>
            <span>{hero.stack.caption}</span>
          </figcaption>
        </figure>
      </div>

      <div className="container" data-hero="" style={delay('.9s')}>
        <ul className="hero__domains mono">
          {hero.domains.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
