import type { Metadata } from "next";
import Link from "next/link";
import Masthead from "../../components/Masthead";
import SectionHead from "../../components/SectionHead";
import Reveal from "../../components/Reveal";
import Trajectory from "../../components/Trajectory";
import ConceptMap from "../../components/ConceptMap";
import { pageMetadata } from "../../lib/site";
import { collaborators, interests, methods, profile, themes } from "../../lib/data";
import { pubsFor, themeCounts } from "../../lib/format";
import { ArrowRight } from "../../components/Icons";

export const metadata: Metadata = pageMetadata(
  "Research",
  "The research examines how destinations, communities, institutions and tourism systems interact—with particular attention to governance, wellbeing, sustainability, crisis and resilience in Bangladesh.",
  "/research"
);

const initials = (n: string) => n.replace(/^(Md\.?|Dr\.?)\s+/, "").split(/\s+/).filter((w) => /^[A-Z]/.test(w)).slice(0, 2).map((w) => w[0]).join("");

export default function Research() {
  return (
    <>
      <Masthead
        n="01" label="Research" path="/research"
        title={<>Tourism as a social, institutional and <em>environmental</em> system.</>}
        lead="The research examines how destinations, communities, institutions and tourism systems interact—with particular attention to governance, wellbeing, sustainability, crisis and resilience in Bangladesh."
        toc={[
          { href: "#signature", label: "Conceptual signature" },
          { href: "#themes", label: "Research themes" },
          { href: "#map", label: "Concept map" },
          { href: "#trajectory", label: "Trajectory" },
          { href: "#methods", label: "Methods" },
          { href: "#network", label: "Collaborators" },
        ]}
      />

      <section className="section" id="signature" aria-labelledby="r1">
        <div className="wrap grid grid-5-7">
          <div className="stack" style={{ "--gap": "1.5rem" } as React.CSSProperties}>
            <SectionHead n="01" label="Conceptual signature" id="r1">Co-management, capitals and <em>community wellbeing.</em></SectionHead>
            <Reveal delay={80}>
              <p className="meta">Official research interests · University of Dhaka profile</p>
              <ul className="interests">{interests.map((i) => <li key={i}>{i}</li>)}</ul>
            </Reveal>
          </div>
          <Reveal delay={120} className="prose stack">
            <p className="t-lead" style={{ color: "var(--ink)" }}>{profile.signature}</p>
            <p>Co-management is a major research signature, though not the only subject he studies: the record ranges from ecotourism and rural tourism to urban crisis governance, ecologically critical areas and smart tourism.</p>
          </Reveal>
        </div>
      </section>

      <section className="section band-2" id="themes" aria-labelledby="r2">
        <div className="wrap">
          <SectionHead n="02" label="Research themes" id="r2" intro="Clusters A–F from the dossier, destination development (an official DU interest) and the early interdisciplinary papers, each with its core questions or concepts and the outputs tagged to it in this archive.">{themes.length} strands, one <em>through-line.</em></SectionHead>
          <div className="chapters" style={{ marginTop: "clamp(2rem,4vw,3rem)" }}>
            {themes.map((t, i) => {
              const list = pubsFor.theme(t.id);
              return (
                <Reveal key={t.id} delay={(i % 2) * 80} style={{ display: "grid" }}>
                  <article className="card" id={`theme-${t.id}`}>
                    <span className="card-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                    <span className="meta">{t.cluster ? `${t.cluster} · ` : ""}{themeCounts[t.id] ?? 0} outputs in this archive</span>
                    <h3 className="t-h3">{t.title}</h3>
                    <p>{t.description}</p>
                    {t.questions && <ul className="stack" style={{ "--gap": ".35rem" } as React.CSSProperties}>{t.questions.map((q) => <li key={q} style={{ fontStyle: "italic", color: "var(--ink)" }}>{q}</li>)}</ul>}
                    <div className="tags">{t.concepts.map((c) => <span className="tag" key={c}>{c}</span>)}</div>
                    <ul>{list.slice(0, 3).map((p) => <li className="mini-pub" key={p.id}><span className="meta">{p.year}</span><Link href={`/publications#${p.id}`}>{p.title}</Link></li>)}</ul>
                    <div className="card-foot"><Link className="link" href={`/publications?theme=${t.id}`}><span>All {list.length} in the archive</span><ArrowRight className="ar" /></Link></div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section" id="map" aria-labelledby="r3">
        <div className="wrap">
          <SectionHead n="03" label="Concept map" id="r3" intro="Three pillars and the chain of ideas that runs from co-management to ecological governance.">How the ideas <em>connect.</em></SectionHead>
          <ConceptMap />
        </div>
      </section>

      <section className="section band-2" id="trajectory" aria-labelledby="r4">
        <div className="wrap">
          <SectionHead n="04" label="Research trajectory" id="r4" intro={`${profile.trajectory} Phase years are taken from each phase's representative works.`}>Six phases, <em>2012 to 2026.</em></SectionHead>
          <Trajectory detailed />
        </div>
      </section>

      <section className="section" id="methods" aria-labelledby="r5">
        <div className="wrap">
          <SectionHead n="05" label="Methods" id="r5" intro="Approaches documented across the published work. No other methods are claimed.">Mostly qualitative, <em>field-based</em> inquiry.</SectionHead>
          <ol className="methods">{methods.map((m) => <li key={m}>{m}</li>)}</ol>
        </div>
      </section>

      <section className="section band-2" id="network" aria-labelledby="r6">
        <div className="wrap">
          <SectionHead n="06" label="Scholarly network" id="r6" intro="Repeated collaborators in the publication record. Affiliations are as recorded in the dossier; the number is co-authored outputs in this archive.">Collaboration across <em>Bangladesh and New Zealand.</em></SectionHead>
          <div className="network">
            {collaborators.map((c, i) => (
              <Reveal key={c.name} delay={(i % 3) * 70} className="card person">
                <span className="av" aria-hidden="true">{initials(c.name)}</span>
                <strong>{c.name}</strong>
                <span className="meta">{c.affiliation ?? "Co-author and co-editor"}</span>
                <div className="tags">{c.topics.map((t) => <span className="tag" key={t}>{t}</span>)}</div>
                <span className="co t-num" aria-label={`${pubsFor.author(c.match).length} co-authored outputs`}>{pubsFor.author(c.match).length}<span className="meta" style={{ marginLeft: 8 }}>shared outputs</span></span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
