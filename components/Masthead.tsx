import type { ReactNode } from "react";
import Link from "next/link";
import Reveal from "./Reveal";
import JsonLd from "./JsonLd";
import { BASE_URL } from "../lib/site";

type Stat = { label: string; value: ReactNode };

/** Inner-page masthead: breadcrumb, chapter number, title, lead and an optional figures / on-this-page panel. */
export default function Masthead({ n, label, path, title, lead, stats, toc }: { n: string; label: string; path: string; title: ReactNode; lead?: ReactNode; stats?: Stat[]; toc?: { href: string; label: string }[] }) {
  return (
    <header className="mast">
      <JsonLd data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: BASE_URL }, { "@type": "ListItem", position: 2, name: label, item: `${BASE_URL}${path}` }] }} />
      <div className="topo topo-fade" aria-hidden="true" />
      <div className="wrap mast-grid">
        <div>
          <nav className="crumbs meta" aria-label="Breadcrumb">
            <ol><li><Link href="/">Home</Link></li><li><span aria-current="page">{label}</span></li></ol>
          </nav>
          <p className="mast-no enter" style={{ "--d": "40ms" } as React.CSSProperties}><span className="t-num">№ {n}</span><span className="meta">{label}</span></p>
          <h1 className="t-h1 enter" style={{ "--d": "100ms" } as React.CSSProperties}>{title}</h1>
          {lead && <p className="t-lead enter" style={{ "--d": "180ms" } as React.CSSProperties}>{lead}</p>}
        </div>
        {(stats?.length || toc?.length) ? (
          <Reveal as="aside" delay={260} className="mast-aside" aria-label={stats?.length ? "At a glance" : "On this page"}>
            {stats?.length ? (
              <dl>{stats.map((s) => <div key={s.label}><dt className="meta">{s.label}</dt><dd>{s.value}</dd></div>)}</dl>
            ) : null}
            {toc?.length ? (
              <nav className="toc" aria-label="On this page"><p className="meta" style={{ marginBottom: 8 }}>On this page</p><ol>{toc.map((t) => <li key={t.href}><a href={t.href}>{t.label}</a></li>)}</ol></nav>
            ) : null}
          </Reveal>
        ) : null}
      </div>
    </header>
  );
}
