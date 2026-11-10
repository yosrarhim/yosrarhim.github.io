import { profile } from '../data/profile';
import { Reveal } from './Reveal';
import { RichText } from './RichText';
import { SectionHead } from './SectionHead';
import { Trajectory } from './Trajectory';

export function Profile() {
  const { portrait } = profile;
  return (
    <section className="section on-paper" id="profile" aria-labelledby="profile-title">
      <div className="container">
        <SectionHead {...profile.section} />

        <div className="grid">
          <Reveal as="figure" className="profile__portrait">
            <div className="portrait">
              <picture>
                <source type="image/webp" srcSet={portrait.webpSrcSet} sizes={portrait.sizes} />
                <img
                  src={portrait.src}
                  srcSet={portrait.jpgSrcSet}
                  sizes={portrait.sizes}
                  width={portrait.width}
                  height={portrait.height}
                  alt={portrait.alt}
                  loading="lazy"
                  decoding="async"
                />
              </picture>
            </div>
            <figcaption className="figcaption mono">
              <b>{portrait.figure}</b>
              <span>{portrait.caption}</span>
            </figcaption>
          </Reveal>

          <div className="profile__body">
            <h2 className="sr-only" id="profile-title">{profile.title}</h2>
            <Reveal as="p" className="profile__statement">
              <RichText text={profile.statement} />
            </Reveal>

            <Reveal className="profile__prose" delay=".1s">
              {profile.prose.map((paragraph) => (
                <p key={paragraph}>
                  <RichText text={paragraph} />
                </p>
              ))}
            </Reveal>

            <Reveal as="dl" className="facts" delay=".2s">
              {profile.facts.map((fact) => (
                <div key={fact.term}>
                  <dt className="mono">{fact.term}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </Reveal>
          </div>
        </div>

        <Trajectory />
      </div>
    </section>
  );
}
