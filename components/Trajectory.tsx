import Link from "next/link";
import { phases, pubById, projects } from "../lib/data";
import { phaseSpan } from "../lib/format";
import Reveal from "./Reveal";

/** The six research phases from the dossier; spans are derived from each phase's representative works. */
export default function Trajectory({ detailed = false }: { detailed?: boolean }) {
  return (
    <ol className="traj">
      {phases.map((ph, i) => (
        <Reveal as="li" key={ph.n} className="phase" delay={(i % 6) * 80}>
          <span className="meta">Phase {ph.n} · {phaseSpan(ph)}</span>
          <span className="pn t-num" aria-hidden="true">{String(ph.n).padStart(2, "0")}</span>
          <h3>{ph.title}</h3>
          <ul className="tags" aria-label="Key concepts">{ph.concepts.map((c) => <li className="tag" key={c}>{c}</li>)}</ul>
          {detailed && (
            <p className="rep">
              Representative: {ph.pubs.map((id, k) => (
                <span key={id}>{k > 0 ? "; " : ""}<Link href={`/publications#${id}`}>{pubById[id].title.split(":")[0]}</Link> ({pubById[id].year})</span>
              ))}
              {"project" in ph && ph.project ? <span>; <Link href="/projects">{projects[0].title.split(":")[0]}</Link> (project, from 2025)</span> : null}
            </p>
          )}
        </Reveal>
      ))}
    </ol>
  );
}
