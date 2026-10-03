"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav } from "../lib/nav";
import { profile, profileLinks, sources } from "../lib/data";

export default function Footer() {
  const pathname = usePathname() || "/";
  const cur = (h: string) => (pathname === h ? "page" : undefined);
  const pages = [{ href: "/", label: "Home" }, ...nav.filter((n) => n.href !== "/contact")];
  return (
    <footer className="foot on-night">
      <div className="topo" aria-hidden="true" />
      <div className="wrap">
        <div className="foot-top">
          <div>
            <p className="foot-name">Muhammad <em>Shoeb-Ur-Rahman</em></p>
            <p style={{ marginTop: 18, maxWidth: "44ch" }}>{profile.role}, {profile.department}, {profile.faculty}, {profile.institution}.</p>
            <p style={{ marginTop: 18 }}><a href={`mailto:${profile.email}`}>{profile.email}</a></p>
          </div>
          <nav aria-label="Footer">
            <h2 className="meta">Portfolio</h2>
            <ul className="two">{pages.map((l) => <li key={l.href}><Link href={l.href} aria-current={cur(l.href)}>{l.label}</Link></li>)}</ul>
          </nav>
          <div>
            <h2 className="meta">Correspond</h2>
            <ul><li><Link href="/contact" aria-current={cur("/contact")}>Contact</Link></li><li><a href={`mailto:${profile.email}`}>Email</a></li></ul>
          </div>
          <div>
            <h2 className="meta">Scholarly profiles</h2>
            <ul className="two">{profileLinks.map((p) => <li key={p.key}><a href={p.href} target="_blank" rel="noopener noreferrer">{p.short} ↗<span className="sr"> (opens in a new tab)</span></a></li>)}</ul>
          </div>
        </div>
        <div className="foot-bottom">
          <span className="meta">© 2026 {profile.name}</span>
          <span className="meta">Content verified against the research dossier · cut-off {sources.cutoff}</span>
        </div>
      </div>
    </footer>
  );
}
