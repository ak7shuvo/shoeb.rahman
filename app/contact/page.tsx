import type { Metadata } from "next";
import Masthead from "../../components/Masthead";
import SectionHead from "../../components/SectionHead";
import Reveal from "../../components/Reveal";
import CopyButton from "../../components/CopyButton";
import { pageMetadata } from "../../lib/site";
import { profile, profileLinks } from "../../lib/data";
import { Mail } from "../../components/Icons";

export const metadata: Metadata = pageMetadata(
  "Contact",
  "For academic communication, research collaboration, teaching engagement or scholarly enquiries, contact Dr. Muhammad Shoeb-Ur-Rahman at the University of Dhaka.",
  "/contact"
);

export default function Contact() {
  return (
    <>
      <Masthead n="08" label="Contact" path="/contact" title={<>Let’s connect through <em>research.</em></>}
        lead="For academic communication, research collaboration, teaching engagement or scholarly enquiries, use the institutional contact details below." />
      <section className="section" aria-labelledby="c1">
        <div className="wrap">
          <Reveal className="contact-hero on-night">
            <div className="topo" aria-hidden="true" />
            <p className="sh-k"><span className="n">01</span><span className="bar" aria-hidden="true" style={{ transform: "none" }} /><span id="c1">Institutional email</span></p>
            <a className="email-big" href={`mailto:${profile.email}`}>{profile.email}</a>
            <div className="btn-row" style={{ marginTop: "2rem" }}>
              <a className="btn btn-light" href={`mailto:${profile.email}`}><Mail /><span>Write an email</span></a>
              <CopyButton text={profile.email} label="Copy address" className="btn btn-ghost-light copy" />
            </div>
          </Reveal>
        </div>
      </section>
      <section className="section band-2" aria-labelledby="c2" style={{ paddingTop: "var(--space)" }}>
        <div className="wrap grid grid-4-8">
          <div className="stack" style={{ "--gap": "1.5rem" } as React.CSSProperties}>
            <SectionHead n="02" label="Institutional address" id="c2">University of <em>Dhaka.</em></SectionHead>
            <Reveal delay={80}>
              <address className="addr">{profile.department}<br />{profile.faculty}<br />{profile.institution}<br />{profile.location}</address>
              <p className="viz-note" style={{ marginTop: 12 }}>Only institutional contact details are published here.</p>
            </Reveal>
          </div>
          <div>
            <p className="meta">Scholarly profiles</p>
            <div className="profiles" style={{ marginTop: "1rem", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))" }}>
              {profileLinks.map((l, i) => (
                <Reveal key={l.key} delay={(i % 4) * 60} style={{ display: "grid" }}>
                  <a className="card card-hover profile-card" href={l.href} target="_blank" rel="noopener noreferrer">
                    <span className="pl">{l.label}</span><span className="ar" aria-hidden="true">↗</span>
                    <span className="meta">{l.note}</span><span className="sr"> (opens in a new tab)</span>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
