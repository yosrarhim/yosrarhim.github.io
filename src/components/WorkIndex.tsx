import type { CSSProperties } from 'react';
import { alsoOnGitHub, projects, workIntro, workSection, type Project } from '../data/projects';
import { Icon } from './Icon';
import { Reveal } from './Reveal';
import { RichText } from './RichText';
import { SectionHead } from './SectionHead';
import { Tags } from './Tags';

const AFTER_SCHEMATIC: CSSProperties = { marginTop: 20 };
const { labels } = workIntro;

/** §03 — expandable project index (native <details>, keyboard accessible). */
export function WorkIndex() {
  return (
    <section className="section on-paper" id="work" aria-labelledby="work-title">
      <div className="container">
        <SectionHead {...workSection} />
        <div className="grid work__intro">
          <Reveal as="h2" className="h2" id="work-title">
            <RichText text={workIntro.title} />
          </Reveal>
          <Reveal as="p" delay=".1s">
            {workIntro.body}
          </Reveal>
        </div>

        <div className="index">
          {projects.map((project) => (
            <ProjectEntry key={project.idx} project={project} />
          ))}
        </div>

        <Reveal as="p" className="also">
          {alsoOnGitHub.map((segment) =>
            typeof segment === 'string' ? (
              segment
            ) : (
              <a className="link" href={segment.href} target="_blank" rel="noopener noreferrer" key={segment.href}>
                {segment.label}
              </a>
            ),
          )}
        </Reveal>
      </div>
    </section>
  );
}

function ProjectEntry({ project }: { readonly project: Project }) {
  const { schematic } = project;
  return (
    <Reveal as="details" className="entry">
      <summary className="entry__row">
        <span className="entry__idx mono">{project.idx}</span>
        <h3 className="entry__name">{project.name}</h3>
        <span className="entry__kind">{project.kind}</span>
        <span className="entry__src mono">{project.source}</span>
        <span className="entry__plus" aria-hidden="true">
          <Icon name="plus" />
        </span>
      </summary>
      <div className="entry__body">
        <div className="entry__col">
          <h4 className="mono">{labels.problem}</h4>
          <p>{project.problem}</p>
          <h4 className="mono">{labels.approach}</h4>
          <p>{project.approach}</p>
        </div>
        <div className="entry__col2">
          {schematic ? (
            <>
              <h4 className="mono">{schematic.heading}</h4>
              <div className="schematic" role="img" aria-label={schematic.ariaLabel}>
                {schematic.steps.map((step, i) => (
                  <SchematicStep key={step} label={step} first={i === 0} />
                ))}
              </div>
            </>
          ) : null}
          <h4 className="mono" style={schematic ? AFTER_SCHEMATIC : undefined}>
            {labels.stack}
          </h4>
          <Tags items={project.stack} />
          <div className="entry__links">
            {project.repository ? (
              <a className="btn btn--ghost" href={project.repository} target="_blank" rel="noopener noreferrer">
                {labels.repository} <Icon name="ext" />
              </a>
            ) : (
              <span className="tag">{labels.notPublic}</span>
            )}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/** "→" separator followed by a step box (no separator before the first). */
function SchematicStep({ label, first }: { readonly label: string; readonly first: boolean }) {
  return (
    <>
      {first ? null : <i>→</i>}
      <span>{label}</span>
    </>
  );
}
