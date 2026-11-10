import { experienceSection, experienceTitle, jobs, type Job } from '../data/experience';
import { TITLE_SPACING, cx } from '../lib/style';
import { Reveal } from './Reveal';
import { RichText } from './RichText';
import { SectionHead } from './SectionHead';
import { Tags } from './Tags';

/** §04 — experience ledger, most recent first. */
export function Experience() {
  return (
    <section className="section on-paper section--tight" id="experience" aria-labelledby="exp-title">
      <div className="container">
        <SectionHead {...experienceSection} />
        <Reveal as="h2" className="h2" id="exp-title" style={TITLE_SPACING}>
          <RichText text={experienceTitle} />
        </Reveal>

        <div className="ledger">
          {jobs.map((job) => (
            <JobEntry key={job.org} job={job} />
          ))}
        </div>
      </div>
    </section>
  );
}

function JobEntry({ job }: { readonly job: Job }) {
  return (
    <Reveal as="article" className={cx('job', job.caseStudy && 'job--featured')}>
      <p className="job__when mono">
        <time dateTime={job.when.datetime}>{job.when.label}</time>
        {job.type}
      </p>
      <div>
        <h3 className="job__org">{job.org}</h3>
        <p className="job__role">{job.role}</p>
        <p className="job__place mono">{job.place}</p>
        {job.caseStudy ? (
          <a className="job__flag mono link" href={job.caseStudy.href}>
            {job.caseStudy.label}
          </a>
        ) : null}
      </div>
      <div className="job__detail">
        <p className="job__project">{job.project}</p>
        <ul>
          {job.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
        {job.tags ? <Tags items={job.tags} /> : null}
      </div>
    </Reveal>
  );
}
