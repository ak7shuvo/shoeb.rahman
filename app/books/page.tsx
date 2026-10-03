import type { Metadata } from "next";
import Link from "next/link";
import Masthead from "../../components/Masthead";
import SectionHead from "../../components/SectionHead";
import Reveal from "../../components/Reveal";
import PubItem from "../../components/PubItem";
import { ExtLink } from "../../components/ExtLink";
import CopyButton from "../../components/CopyButton";
import { pageMetadata } from "../../lib/site";
import { links, publications, pubById } from "../../lib/data";
import { reference } from "../../lib/format";

export const metadata: Metadata = pageMetadata(
  "Books & Chapters",
  "Tourism Policy and Planning in Bangladesh (Springer, 2020), edited by Muhammad Shoeb-Ur-Rahman and Azizul Hassan, and book chapters with Routledge, Springer and IGI Global.",
  "/books"
);

const book = pubById["policy-planning-book"];
const chapters = publications.filter((p) => p.type === "chapter").sort((a, b) => b.year - a.year);
const conference = publications.filter((p) => p.type === "conference");

export default function Books() {
  return (
    <>
      <Masthead n="03" label="Books" path="/books" title={<>Books, chapters and <em>proceedings.</em></>}
        lead="A flagship edited volume on tourism policy and planning in Bangladesh, chapters in Routledge, Springer and IGI Global books, and a peer-reviewed CAUTHE conference paper."
        stats={[{ label: "Edited book", value: 1 }, { label: "Book chapters", value: chapters.length }, { label: "Conference papers", value: conference.length }]} />

      <section className="section" aria-labelledby="b1">
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
            <SectionHead n="01" label="Edited volume · Springer 2020" id="b1">{book.title}</SectionHead>
            <Reveal delay={100} className="prose stack">
              <p className="meta">Editors: Muhammad Shoeb-Ur-Rahman &amp; Azizul Hassan</p>
              <p>{book.summary}</p>
              <div className="tags">{book.keywords?.map((k) => <span className="tag" key={k}>{k}</span>)}</div>
              <p className="pub-detail">DOI {book.doi}</p>
              <div className="btn-row">
                <ExtLink className="btn" href={links.springerBook}>Springer page</ExtLink>
                <ExtLink className="btn btn-ghost" href={`https://doi.org/${book.doi}`} context={book.title}>DOI</ExtLink>
                <CopyButton text={reference(book)} label="Copy reference" className="btn btn-ghost copy" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section band-2" aria-labelledby="b2">
        <div className="wrap">
          <SectionHead n="02" label="Book chapters" id="b2" intro="Contributions to edited books on tourism in Bangladesh and Asia.">Chapters in <em>edited books.</em></SectionHead>
          <div style={{ marginTop: "clamp(2rem,4vw,3rem)" }}>{chapters.map((p) => <Reveal key={p.id}><PubItem p={p} /></Reveal>)}</div>
        </div>
      </section>

      <section className="section" aria-labelledby="b3">
        <div className="wrap">
          <SectionHead n="03" label="Conference proceedings" id="b3">Peer-reviewed <em>proceedings.</em></SectionHead>
          <div style={{ marginTop: "clamp(2rem,4vw,3rem)" }}>{conference.map((p) => <Reveal key={p.id}><PubItem p={p} /></Reveal>)}</div>
          <p style={{ marginTop: "2rem" }}><Link className="link" href="/publications"><span>Search the full archive</span></Link></p>
        </div>
      </section>
    </>
  );
}
