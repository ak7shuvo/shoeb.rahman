import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import Masthead from "../../components/Masthead";
import SectionHead from "../../components/SectionHead";
import ResearchMap from "../../components/ResearchMap";
import { pageMetadata } from "../../lib/site";
import { caseSites, places, pubById } from "../../lib/data";
import { locationCounts, pubsFor } from "../../lib/format";

export const metadata: Metadata = pageMetadata(
  "Research Locations",
  "Research contexts in Bangladesh: the Chittagong Hill Tracts, the Sundarbans, Dhaka, St. Martin's Island, rural Bangladesh and national-scale studies, with the publications linked to each.",
  "/locations"
);

export default function Locations() {
  const panels = Object.fromEntries(places.map((p) => {
    const list = pubsFor.location(p.id);
    return [p.id, (
      <div className="card" key={p.id}>
        <span className="meta">{p.role}</span>
        <h2 className="t-h3">{p.name}</h2>
        {p.note && <p>{p.note}</p>}
        <div className="tags">{p.topics.map((t) => <span className="tag" key={t}>{t}</span>)}</div>
        <h3 className="meta" style={{ marginTop: 10 }}>{list.length} linked {list.length === 1 ? "output" : "outputs"}</h3>
        <ul>{list.map((x) => <li className="mini-pub" key={x.id}><span className="meta">{x.year} · {x.venue}</span><Link href={`/publications#${x.id}`}>{x.title}</Link>{x.setting && <span className="pub-setting">{x.setting}</span>}</li>)}</ul>
        <Link className="link" href={`/publications?place=${p.id}`}><span>Filter the archive by this place</span></Link>
      </div>
    )];
  }));
  return (
    <>
      <Masthead n="05" label="Locations" path="/locations" title={<>Places in the <em>research.</em></>}
        lead="Geographic contexts associated with the published work. They are places of study, not permanent research stations; marker positions are indicative."
        stats={[{ label: "Research contexts", value: places.length }, { label: "Named case sites", value: caseSites.length }, { label: "Place-linked outputs", value: new Set(places.flatMap((p) => pubsFor.location(p.id).map((x) => x.id))).size }]} />
      <section className="section" aria-labelledby="l1">
        <div className="wrap">
          <SectionHead n="01" label="Interactive map" id="l1" intro="Select a marker or a place to see the research themes and publications linked to it.">Bangladesh, <em>as studied.</em></SectionHead>
          <div style={{ marginTop: "clamp(2rem,4vw,3rem)" }}>
            <Suspense>
              <ResearchMap
                places={places.map((p) => ({ id: p.id, name: p.name, role: p.role, point: p.point, count: locationCounts[p.id] ?? 0 }))}
                cases={caseSites.map((c) => ({ ...c, name: `${c.name} (${pubById[c.pub].year})`, href: `/publications#${c.pub}` }))}
                panels={panels}
              />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}
