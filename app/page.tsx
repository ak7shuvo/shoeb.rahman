import type { Metadata } from "next";
import Link from "next/link";
import { profile, links, featured, projects, awards, places, caseSites, pubById, publications, themes } from "../lib/data";
import { firstYear, lastYear, locationCounts, pubsFor } from "../lib/format";
import Lens from "../components/Lens";
import Reveal from "../components/Reveal";
import SectionHead from "../components/SectionHead";
import Trajectory from "../components/Trajectory";
import ThemeIndex from "../components/ThemeIndex";
import OutputChart from "../components/OutputChart";
import Gantt from "../components/Gantt";
import ResearchMap from "../components/ResearchMap";
import JsonLd from "../components/JsonLd";
import { Authors } from "../components/PubItem";
import { ExtLink } from "../components/ExtLink";
import { ArrowRight } from "../components/Icons";
import { BASE_URL } from "../lib/site";

export const metadata: Metadata = { alternates: { canonical: "/" } };

const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  honorificPrefix: "Dr.",
  jobTitle: profile.role,
  url: BASE_URL,
  image: `${BASE_URL}/images/portrait/portrait.jpg`,
  email: `mailto:${profile.email}`,
  worksFor: { "@type": "CollegeOrUniversity", name: profile.institution, department: { "@type": "Organization", name: profile.department } },
  alumniOf: [{ "@type": "CollegeOrUniversity", name: "Lincoln University" }, { "@type": "CollegeOrUniversity", name: "University of Dhaka" }],
  knowsAbout: ["Sustainable Tourism", "Tourism Governance", "Tourism Policy", "Destination Development", "Crisis and Resilience in Tourism Systems", "Sociology of Tourism", "Tourism Management"],
  identifier: { "@type": "PropertyValue", propertyID: "ORCID", value: profile.orcid },
  sameAs: [links.orcid, links.scholar, links.linkedin, links.du, links.academia, links.rg],
};

const project = projects[0];
const book = pubById["policy-planning-book"];
const mapPlaces = places.map((p) => ({ id: p.id, name: p.name, role: p.role, point: p.point, count: locationCounts[p.id] ?? 0 }));
const mapCases = caseSites.map((c) => ({ ...c, href: `/publications#${c.pub}` }));
const panels = Object.fromEntries(
  places.map((p) => {
    const list = pubsFor.location(p.id).slice(0, 3);
    return [p.id, (
      <div key={p.id} className="card">
        <span className="meta">{p.role}</span>
        <h3 className="t-h3">{p.name}</h3>
        <div className="tags">{p.topics.map((t) => <span className="tag" key={t}>{t}</span>)}</div>
        {list.length > 0 && <ul>{list.map((x) => <li className="mini-pub" key={x.id}><span className="meta">{x.year}</span><Link href={`/publications#${x.id}`}>{x.title}</Link></li>)}</ul>}
        <Link className="link" href={`/locations?place=${p.id}`}><span>Open on the locations page</span><ArrowRight className="ar" /></Link>
      </div>
    )];
  })
);

export default function Home() {
  return (
    <>
      <JsonLd data={person} />

      {/* ── Hero ── */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="topo topo-fade" aria-hidden="true" data-parallax="-0.04" />
        <div className="wrap">
          <div className="hero-grid">
            <div>
              <p className="hero-k meta enter">
                <span className="dot" aria-hidden="true" />
                <span>{profile.role}</span><span aria-hidden="true">·</span>
                <span>Tourism and Hospitality Management</span><span aria-hidden="true">·</span>
                <span>{profile.institution}</span>
              </p>
              <h1 id="hero-title" className="t-mega">
                <span className="ln"><span className="pre" style={{ "--d": "60ms" } as React.CSSProperties}>Dr. Muhammad</span></span>
                <span className="ln"><span style={{ "--d": "140ms" } as React.CSSProperties}>Shoeb-Ur-Rahman</span></span>
              </h1>
              <p className="statement enter" style={{ "--d": "320ms" } as React.CSSProperties}>{profile.heroStatement}</p>
              <p className="t-lead enter" style={{ "--d": "400ms", marginBottom: "2rem" } as React.CSSProperties}>
                <strong style={{ color: "var(--ink)", fontWeight: 600 }}>{profile.name}</strong> is an Associate Professor of Tourism and Hospitality Management at the University of Dhaka. His research connects sustainable tourism and destination development with governance, community wellbeing, social and cultural capital, policy, resilience and emerging smart-tourism practices.
              </p>
              <div className="btn-row enter" style={{ "--d": "480ms" } as React.CSSProperties}>
                <Link className="btn" href="/research"><span>Explore research</span><ArrowRight className="ar" /></Link>
                <Link className="btn btn-ghost" href="/publications"><span>View publications</span></Link>
              </div>
            </div>
            <div className="enter" style={{ "--d": "200ms" } as React.CSSProperties}>
              <Lens priority />
            </div>
          </div>

          <dl className="readout" aria-label="This archive at a glance">
            <Reveal><dt className="sr">Outputs</dt><dd><span className="v t-num">{publications.length}</span><span className="l">Outputs in this archive</span><span className="s meta">Articles · book · chapters · proceedings</span></dd></Reveal>
            <Reveal delay={80}><dt className="sr">Years</dt><dd><span className="v t-num">{firstYear}–{String(lastYear).slice(2)}</span><span className="l">Years of publication</span><span className="s meta">Earliest to latest listed</span></dd></Reveal>
            <Reveal delay={160}><dt className="sr">Contexts</dt><dd><span className="v t-num">{places.length}</span><span className="l">Research contexts</span><span className="s meta">From the Hill Tracts to St. Martin&apos;s</span></dd></Reveal>
            <Reveal delay={240}><dt className="sr">Since</dt><dd><span className="v t-num">2013</span><span className="l">At the University of Dhaka</span><span className="s meta">Associate Professor since 2020</span></dd></Reveal>
          </dl>
        </div>
      </section>

      {/* ── 01 Statement + trajectory ── */}
      <section className="section band-2" aria-labelledby="s1">
        <div className="wrap">
          <div className="grid grid-5-7">
            <SectionHead n="01" label="Research statement" id="s1">A research practice shaped around <em>destinations</em> and the people who live in them.</SectionHead>
            <Reveal delay={120} className="prose stack">
              <p className="t-lead" style={{ color: "var(--ink)" }}>{profile.oneLine}</p>
              <p>{profile.long}</p>
              <p>{profile.trajectory}</p>
              <p><Link className="link" href="/research"><span>Read the research overview</span><ArrowRight className="ar" /></Link></p>
            </Reveal>
          </div>
          <Trajectory />
        </div>
      </section>

      {/* ── 02 Ecosystem ── */}
      <section className="section" aria-labelledby="s2">
        <div className="wrap">
          <div className="sh-row">
            <SectionHead n="02" label="Research ecosystem" id="s2" intro={`${themes.length - 1} research strands drawn from the dossier's clusters and the official DU research interests, plus the early interdisciplinary work. Bars show how many outputs in this archive carry each tag; select a strand to open those works.`}>
              From sustainability to <em>smart destinations.</em>
            </SectionHead>
          </div>
          <ThemeIndex />
        </div>
      </section>

      {/* ── 03 Featured research ── */}
      <section className="section band-2" aria-labelledby="s3">
        <div className="wrap">
          <div className="sh-row">
            <SectionHead n="03" label="Featured research" id="s3">Recent and <em>foundational</em> work.</SectionHead>
            <Reveal><Link className="btn btn-ghost" href="/publications"><span>All publications</span><ArrowRight className="ar" /></Link></Reveal>
          </div>
          <div className="feat-grid">
            {featured.map((p, i) => (
              <Reveal key={p.id} delay={(i % 3) * 80} style={{ display: "grid" }}>
                <article className="card card-hover feat">
                  <span className="card-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                  <span className="meta">{p.year}{p.online ? ` · online ${p.online}` : ""}</span>
                  <h3 className="ft">{p.title}</h3>
                  <p className="fv">{p.venue}</p>
                  {p.setting && <p className="pub-setting">{p.setting}</p>}
                  {i < 2 && p.summary && <p>{p.summary}</p>}
                  <Authors names={p.authors} />
                  <div className="card-foot">
                    {p.doi && <ExtLink className="link" href={`https://doi.org/${p.doi}`} context={p.title}>DOI</ExtLink>}
                    <Link className="link" href={`/publications#${p.id}`}><span>In the archive</span></Link>
                  </div>
                </article>
              </Reveal>
            ))}
            <Reveal delay={160} style={{ display: "grid" }}>
              <article className="card feat feat-project on-night">
                <span className="status live">{project.status} · from {project.start}</span>
                <h3 className="ft">{project.title}</h3>
                <p className="fv">Funded by the {project.funder}</p>
                <p>{project.investigators.map((x) => `${x.role}: ${x.name}`).join(" · ")}</p>
                <div className="card-foot" style={{ borderColor: "var(--line-night)" }}><Link className="link" href="/projects"><span>Project details</span><ArrowRight className="ar" /></Link></div>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 04 Places ── */}
      <section className="section" aria-labelledby="s4">
        <div className="wrap">
          <SectionHead n="04" label="Research locations" id="s4" intro="Places that appear in the published research — contexts of study, not permanent research stations.">
            From the Hill Tracts to <em>the coral island.</em>
          </SectionHead>
          <div style={{ marginTop: "clamp(2rem,4vw,3rem)" }}>
            <ResearchMap compact places={mapPlaces} cases={mapCases} panels={panels} />
          </div>
        </div>
      </section>

      {/* ── 05 Output ── */}
      <section className="section band-2" aria-labelledby="s5">
        <div className="wrap grid grid-4-8">
          <SectionHead n="05" label="Scholarly record" id="s5" intro="Outputs from 2012 to 2026, from early work on ecotourism and green economics to the 2026 governance and resilience papers.">
            The record <em>over time.</em>
          </SectionHead>
          <Reveal delay={120}><OutputChart /></Reveal>
        </div>
      </section>

      {/* ── 06 Journey + awards ── */}
      <section className="section" aria-labelledby="s6">
        <div className="wrap">
          <div className="sh-row">
            <SectionHead n="06" label="Academic journey" id="s6" intro="From management studies to tourism scholarship, doctoral research and destination governance.">From management studies to <em>tourism scholarship.</em></SectionHead>
            <Reveal><Link className="btn btn-ghost" href="/journey"><span>Full journey</span><ArrowRight className="ar" /></Link></Reveal>
          </div>
          <Gantt />
          <div className="awards">
            {awards.map((a, i) => (
              <Reveal key={a.title} delay={i * 80} className="card award">
                <span className="yr t-num">{a.year}</span>
                <h3 className="t-h3">{a.title}</h3>
                <p className="meta">{a.org}</p>
                <p>{a.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 07 Book ── */}
      <section className="section band-2" aria-labelledby="s7">
        <div className="wrap book-feature">
          <Reveal className="book" aria-hidden="true">
            <div className="book-body">
              <div className="topo" />
              <span className="bk">Springer · 2020</span>
              <span className="bt">Tourism Policy and Planning in Bangladesh</span>
              <span className="bk">Eds. Shoeb-Ur-Rahman &amp; Hassan</span>
            </div>
            <div className="book-shadow" />
          </Reveal>
          <div className="stack" style={{ "--gap": "1.25rem" } as React.CSSProperties}>
            <SectionHead n="07" label="Edited volume" id="s7">{book.title}</SectionHead>
            <Reveal delay={100} className="prose stack">
              <p className="meta">Edited by Muhammad Shoeb-Ur-Rahman &amp; Azizul Hassan · {book.publisher} · {book.year}</p>
              <p>{book.summary}</p>
              <div className="btn-row">
                <ExtLink className="btn" href={links.springerBook}>Springer page</ExtLink>
                <Link className="btn btn-ghost" href="/books"><span>Books &amp; chapters</span></Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 08 Contact ── */}
      <section className="section" aria-labelledby="s8">
        <div className="wrap">
          <Reveal className="contact-hero on-night">
            <div className="topo" aria-hidden="true" />
            <p className="sh-k"><span className="n">08</span><span className="bar" aria-hidden="true" style={{ transform: "none" }} /><span>Academic correspondence</span></p>
            <h2 className="t-h2" id="s8" style={{ marginTop: "1rem", maxWidth: "20ch" }}>Research, teaching and <em>destination development.</em></h2>
            <a className="email-big" href={`mailto:${profile.email}`}>{profile.email}</a>
            <p style={{ marginTop: "1rem" }}>{profile.department} · {profile.faculty} · {profile.institution}</p>
            <div className="btn-row" style={{ marginTop: "2rem" }}>
              <Link className="btn btn-light" href="/contact"><span>Contact &amp; profiles</span><ArrowRight className="ar" /></Link>
              <ExtLink className="btn btn-ghost-light" href={links.du}>DU profile</ExtLink>
              <ExtLink className="btn btn-ghost-light" href={links.orcid}>ORCID</ExtLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
