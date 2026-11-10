import { trajectory } from '../data/profile';
import { useGrow } from '../hooks/useGrow';
import { Reveal } from './Reveal';

/** Electronics → Embedded systems → AI → Intelligent systems. */
export function Trajectory() {
  const [trackRef, growStyle] = useGrow<HTMLOListElement>();
  return (
    <Reveal className="trajectory">
      <div className="trajectory__title">
        <h3 className="h3">{trajectory.title}</h3>
        <p className="mono muted">{trajectory.note}</p>
      </div>
      <ol className="trajectory__track" id="trajectory" ref={trackRef} style={growStyle}>
        {trajectory.stages.map((stage) => (
          <li className="stage" key={stage.label}>
            <div className="stage__dot" aria-hidden="true" />
            <p className="stage__idx mono">{stage.label}</p>
            <h4 className="stage__name">{stage.name}</h4>
            <ul className="stage__list">
              {stage.items.map((item) => (
                <li key={item.text}>
                  <time>{item.year}</time>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </Reveal>
  );
}
