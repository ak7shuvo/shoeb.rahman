import type { Metadata } from "next";
import Link from "next/link";
import Masthead from "../../components/Masthead";
import SectionHead from "../../components/SectionHead";
import Reveal from "../../components/Reveal";
import Lens from "../../components/Lens";
import { ExtLink } from "../../components/ExtLink";
import { pageMetadata } from "../../lib/site";
import { awards, education, engagement, interests, positions, profile, profileLinks, service } from "../../lib/data";
import { ArrowRight } from "../../components/Icons";

export const metadata: Metadata = pageMetadata(
  "About",
  `${profile.role} · ${profile.department} · ${profile.institution}. PhD in Tourism Management, Lincoln University, New Zealand.`,
  "/about"
);

export default function About() {
  const phd = education[0];
  return (
    <>
      <Masthead n="07" label="About" path="/about" title={profile.name}
        lead={`${profile.role} · ${profile.department} · ${profile.faculty} · ${profile.institution}`}
        toc={[{ href: "#profile", label: "Academic profile" }, { href: "#doctorate", label: "Doctoral research" }, { href: "#positions", label: "Positions" }, { href: "#recognition", label: "Awards & engagement" }, { href: "#profiles", label: "Scholarly profiles" }]} />

      <section className="section" id="profile" aria-labelledby="a1">
        <div className="wrap grid grid-5-7">
          <div className="sticky-col"><Lens /></div>
          <div className="stack" style={{ "--gap": "1.75rem" } as React.CSSProperties}>
            <SectionHead n="01" label="Academic profile" id="a1">A researcher of tourism as a <em>social and institutional</em> system.</SectionHead>
            <Reveal delay={100} className="prose stack">
              {profile.bio.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
            </Reveal>
            <Reveal delay={140}>
              <p className="meta">Research interests · University of Dhaka profile</p>
              <ul className="interests">{interests.map((i) => <li key={i}>{i}</li>)}</ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section band-night on-night" id="doctorate" aria-labelledby="a2" style={{ overflow: "hidden" }}>
        <div className="topo" aria-hidden="true" />
        <div className="wrap grid grid-5-7" style={{ position: "relative" }}>
          <SectionHead n="02" label="Doctoral research" id="a2">{phd.degree}, <em>{phd.org}.</em></SectionHead>
          <Reveal delay={100} className="stack" style={{ "--gap": "1.25rem" } as React.CSSProperties}>
            <p className="meta">{phd.start} – {phd.end} · {phd.level}</p>
            <blockquote className="t-h3" style={{ fontWeight: 400, fontStyle: "italic", color: "var(--on-night)", fontSize: "clamp(1.4rem,1.1rem + 1.2vw,2.1rem)", lineHeight: 1.3 }}>“{phd.thesis}”</blockquote>
            <p>{phd.note}</p>
            <p>Funded by the New Zealand Commonwealth Scholarship 2014 (award year 2015), administered by the New Zealand Ministry of Foreign Affairs and Trade; the thesis was listed for the Dean&apos;s List in 2019.</p>
          </Reveal>
        </div>
      </section>

      <section className="section" id="positions" aria-labelledby="a3">
        <div className="wrap">
          <div className="sh-row">
            <SectionHead n="03" label="Positions" id="a3">Academic <em>career.</em></SectionHead>
            <Reveal><Link className="btn btn-ghost" href="/journey"><span>Journey timeline</span><ArrowRight className="ar" /></Link></Reveal>
          </div>
          <ol className="jlist">
            {positions.map((p, i) => (
              <Reveal as="li" key={p.title + p.start} className="jitem" delay={(i % 3) * 50}>
                <p className="when">{p.start} – {p.end ?? "present"}</p>
                <div><h3>{p.title}</h3><p className="org">{[p.org, p.unit].filter(Boolean).join(" · ")}</p></div>
              </Reveal>
            ))}
            {education.slice(1, 3).map((e, i) => (
              <Reveal as="li" key={e.degree} className="jitem" delay={(i % 3) * 50}>
                <p className="when">{e.start} – {e.end}</p>
                <div><p className="meta kind">Education · {e.level}</p><h3>{e.degree}</h3><p className="org">{e.org}</p></div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section band-2" id="recognition" aria-labelledby="a4">
        <div className="wrap">
          <SectionHead n="04" label="Awards & engagement" id="a4" intro="A concise record of doctoral excellence and international academic recognition.">Recognition.</SectionHead>
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
          <div className="awards">
            {engagement.map((e) => (
              <Reveal key={e.title} className="card"><span className="meta">Invited engagement · {e.date}</span><h3 className="t-h3">{e.title}</h3><p>{e.text}</p></Reveal>
            ))}
            {service.map((s, i) => (
              <Reveal key={s.title} delay={(i + 1) * 80} className="card"><span className="meta">Service · from {s.since}</span><h3 className="t-h3">{s.title}, {s.org}</h3><p>{s.text}</p></Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="profiles" aria-labelledby="a5">
        <div className="wrap">
          <SectionHead n="05" label="Academic links" id="a5">Primary <em>profiles.</em></SectionHead>
          <div className="profiles">
            {profileLinks.map((l, i) => (
              <Reveal key={l.key} delay={(i % 4) * 60} style={{ display: "grid" }}>
                <a className="card card-hover profile-card" href={l.href} target="_blank" rel="noopener noreferrer">
                  <span className="pl">{l.label}</span><span className="ar" aria-hidden="true">↗</span>
                  <span className="meta">{l.note}</span><span className="sr"> (opens in a new tab)</span>
                </a>
              </Reveal>
            ))}
          </div>
          <p className="viz-note" style={{ marginTop: "1.5rem" }}>The University of Dhaka profile and official CV are the institutional sources for this site. <ExtLink className="link" href={profileLinks[1].href}>Official CV (PDF)</ExtLink></p>
        </div>
      </section>
    </>
  );
}
