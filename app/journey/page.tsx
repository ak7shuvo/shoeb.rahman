import type { Metadata } from "next";
import Masthead from "../../components/Masthead";
import SectionHead from "../../components/SectionHead";
import Reveal from "../../components/Reveal";
import Gantt from "../../components/Gantt";
import { pageMetadata } from "../../lib/site";
import { awards, education, engagement, positions, service } from "../../lib/data";

export const metadata: Metadata = pageMetadata(
  "Academic Journey",
  "Education and career of Dr. Muhammad Shoeb-Ur-Rahman: BBA and MBA at the University of Dhaka, PhD at Lincoln University, New Zealand, and Lecturer to Associate Professor at the University of Dhaka.",
  "/journey"
);

type Item = { when: string; sort: number; kind: string; title: string; org: string; body?: React.ReactNode };

export default function Journey() {
  const items: Item[] = [
    ...positions.map((p) => ({ when: `${p.start} – ${p.end ?? "present"}`, sort: p.startYear, kind: "Position", title: p.title, org: [p.org, p.unit].filter(Boolean).join(" · "), body: p.detail ? <ul className="tags" style={{ marginTop: 8 }}>{p.detail.map((d) => <li className="tag" key={d}>{d}</li>)}</ul> : undefined })),
    ...education.map((e) => ({ when: `${e.start} – ${e.end}`, sort: e.startYear, kind: e.level, title: e.degree, org: e.org, body: (
      <>
        {"thesis" in e && e.thesis && <p style={{ marginTop: 8 }}><span className="meta">Dissertation · </span><em>{e.thesis}</em></p>}
        {"note" in e && e.note && <p style={{ marginTop: 8, color: "var(--ink-2)" }}>{e.note}</p>}
        {"courses" in e && e.courses && <details className="more"><summary>{("coursesLabel" in e && e.coursesLabel) || "Major areas"} ({e.courses.length})</summary><ul>{e.courses.map((c) => <li key={c}>{c}</li>)}</ul></details>}
      </>
    ) })),
    ...awards.map((a) => ({ when: a.year, sort: Number(a.year) + 0.5, kind: "Award", title: a.title, org: a.org, body: <p style={{ marginTop: 8, color: "var(--ink-2)" }}>{a.text}</p> })),
    ...engagement.map((e) => ({ when: e.date, sort: 2023.25, kind: "Invited engagement", title: e.title, org: "University of Wollongong, Australia", body: <p style={{ marginTop: 8, color: "var(--ink-2)" }}>{e.text}</p> })),
    ...service.map((s) => ({ when: `From ${s.since}`, sort: s.since.includes("2010") ? 2010.42 : 2013.92, kind: "Service", title: s.title, org: s.org, body: <p style={{ marginTop: 8, color: "var(--ink-2)" }}>{s.text}</p> })),
  ].sort((a, b) => b.sort - a.sort);

  return (
    <>
      <Masthead n="06" label="Journey" path="/journey" title={<>From management studies to <em>tourism scholarship.</em></>}
        lead="Education, academic positions, recognition and service on one timeline, with dates exactly as recorded in the official University of Dhaka CV and profile."
        stats={[{ label: "At the University of Dhaka", value: "Since 2013" }, { label: "Associate Professor", value: "Since 2020" }, { label: "PhD, Lincoln University", value: "2019" }]} />
      <section className="section" aria-labelledby="j1">
        <div className="wrap">
          <SectionHead n="01" label="Timeline" id="j1">Twenty-eight years <em>at a glance.</em></SectionHead>
          <Gantt />
        </div>
      </section>
      <section className="section band-2" aria-labelledby="j2">
        <div className="wrap">
          <SectionHead n="02" label="Chronology" id="j2" intro="Newest first.">The full <em>record.</em></SectionHead>
          <ol className="jlist">
            {items.map((it, i) => (
              <Reveal as="li" key={it.title + it.when} className="jitem" delay={(i % 3) * 50}>
                <div><p className="when">{it.when}</p><p className="meta kind">{it.kind}</p></div>
                <div><h3>{it.title}</h3><p className="org">{it.org}</p>{it.body}</div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
