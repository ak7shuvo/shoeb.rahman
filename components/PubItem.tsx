import { Fragment } from "react";
import type { Publication } from "../lib/data";
import { placeById, themeById, typeLabel } from "../lib/data";
import { detailLine, isSelf, primaryLink, reference } from "../lib/format";
import { ExtLink } from "./ExtLink";
import CopyButton from "./CopyButton";
import { Pin } from "./Icons";
import Link from "next/link";

export function Authors({ names }: { names: string[] }) {
  return (
    <p className="pub-authors">
      {names.map((n, i) => (
        <Fragment key={n + i}>
          {isSelf(n) ? <span className="me">{n}</span> : n}
          {i < names.length - 2 ? ", " : i === names.length - 2 ? " & " : ""}
        </Fragment>
      ))}
    </p>
  );
}

/** One publication record: every visible field comes from lib/data.ts; nothing is computed except formatting. */
export default function PubItem({ p, headingLevel = 3, showYear = true }: { p: Publication; headingLevel?: 2 | 3 | 4; showYear?: boolean }) {
  const H = `h${headingLevel}` as "h2" | "h3" | "h4";
  const href = primaryLink(p);
  const detail = detailLine(p);
  return (
    <article className={`pub t-${p.type}`} id={p.id}>
      <div className="pub-side">
        {showYear && <span className="pub-year t-num">{p.year}</span>}
        <span className="meta pub-type">{typeLabel[p.type]}</span>
      </div>
      <div className="stack" style={{ "--gap": ".6rem" } as React.CSSProperties}>
        <H className="pub-title">{href ? <a href={href} target="_blank" rel="noopener noreferrer">{p.title}<span className="sr"> (opens in a new tab)</span></a> : p.title}</H>
        <Authors names={p.authors} />
        <p><span className="pub-venue">{p.venue}</span>{detail && <span className="pub-detail"> · {detail}</span>}</p>
        {(p.online || p.setting) && (
          <p className="pub-actions">
            {p.setting && <span className="pub-setting"><Pin />{p.setting}</span>}
            {p.online && <span className="pub-online">Published online {p.online}</span>}
          </p>
        )}
        {p.summary && <p className="pub-summary">{p.summary}</p>}
        {p.method && <p className="pub-detail">Method · {p.method}</p>}
        {p.contribution && <p className="pub-detail">Documented contribution · {p.contribution.join(", ")}</p>}
        {p.note && <p className="pub-detail">{p.note}</p>}
        <div className="tags" aria-label="Themes">
          {p.themes.map((t) => <Link className="tag" key={t} href={`/publications?theme=${t}`}>{themeById[t].short}</Link>)}
          {p.locations?.map((l) => <Link className="tag" key={l} href={`/locations?place=${l}`}>{placeById[l].name}</Link>)}
        </div>
        <div className="pub-actions">
          {p.doi && <ExtLink className="link" href={`https://doi.org/${p.doi}`} context={p.title}>DOI {p.doi}</ExtLink>}
          {!p.doi && p.url && <ExtLink className="link" href={p.url} context={p.title}>Record</ExtLink>}
          <CopyButton text={reference(p)} label="Copy reference" />
        </div>
      </div>
    </article>
  );
}
