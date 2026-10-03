import type { Metadata } from "next";
import Masthead from "../../components/Masthead";
import SectionHead from "../../components/SectionHead";
import Reveal from "../../components/Reveal";
import { pageMetadata } from "../../lib/site";
import { engagement, projects, service } from "../../lib/data";

export const metadata: Metadata = pageMetadata(
  "Projects",
  "Research and academic engagement beyond the publication list: a UGC-funded smart tourism destination project, invited teaching for the University of Wollongong and service roles.",
  "/projects"
);

export default function Projects() {
  const p = projects[0];
  return (
    <>
      <Masthead n="04" label="Projects" path="/projects" title={<>Research and academic engagement beyond the <em>publication list.</em></>}
        lead="Projects are presented according to the supplied dossier. Specific technologies, datasets, findings and completion claims are intentionally not added where they were not verified." />

      <section className="section" aria-labelledby="p1">
        <div className="wrap">
          <Reveal className="project on-night">
            <div className="topo" aria-hidden="true" />
            <div className="stack" style={{ "--gap": "1.25rem" } as React.CSSProperties}>
              <span className="status live" style={{ color: "var(--on-night)", borderColor: "var(--line-night-strong)" }}>{p.status}</span>
              <h2 className="ft" id="p1">{p.title}</h2>
              <p>{p.statusNote} {p.source}</p>
              <div className="bridge" aria-label="How the project connects established and emerging research">
                <div><p className="meta" style={{ marginBottom: 8 }}>Established work</p><ul>{p.bridges.from.map((x) => <li key={x}>{x}</li>)}</ul></div>
                <span className="arrow" aria-hidden="true">→</span>
                <div className="to"><p className="meta" style={{ marginBottom: 8 }}>Emerging direction</p><ul>{p.bridges.to.map((x) => <li key={x}>{x}</li>)}</ul></div>
              </div>
            </div>
            <dl>
              <div><dt>Funding source</dt><dd>{p.funder}</dd></div>
              <div><dt>Project start</dt><dd>{p.start}</dd></div>
              <div><dt>Status</dt><dd>{p.status} — completion date not verified</dd></div>
              {p.investigators.map((x) => <div key={x.role}><dt>{x.role}</dt><dd>{x.name}</dd></div>)}
              <div><dt>Source</dt><dd>University of Dhaka faculty profile</dd></div>
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="section band-2" aria-labelledby="p2">
        <div className="wrap grid grid-6-6">
          <div>
            <SectionHead n="02" label="Invited engagement" id="p2">International <em>teaching.</em></SectionHead>
            {engagement.map((e) => (
              <Reveal key={e.title} className="card" style={{ marginTop: "2rem" }}>
                <span className="meta">{e.date}</span>
                <h3 className="t-h3">{e.title}</h3>
                <p>{e.text}</p>
              </Reveal>
            ))}
          </div>
          <div>
            <SectionHead n="03" label="Service & volunteer roles" id="p3">Beyond the <em>university.</em></SectionHead>
            {service.map((s, i) => (
              <Reveal key={s.title} delay={i * 80} className="card" style={{ marginTop: i ? "1rem" : "2rem" }}>
                <span className="meta">From {s.since}</span>
                <h3 className="t-h3">{s.title}</h3>
                <p className="pub-venue">{s.org}</p>
                <p>{s.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
