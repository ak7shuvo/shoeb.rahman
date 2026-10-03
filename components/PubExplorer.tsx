"use client";
import { useId, useMemo, useState, type ReactNode } from "react";
import { setParams, useSearch } from "../lib/url-state";
import { Search, X } from "./Icons";

export type Entry = { id: string; year: number; type: string; themes: string[]; places: string[]; text: string; node: ReactNode };
type Opt = { value: string; label: string };

/**
 * Searchable, filterable archive. Records are server-rendered and handed in as nodes; this shell only decides
 * which are visible and in what order. Every filter lives in the URL (?q=&type=&theme=&place=&sort=) so a
 * filtered view can be linked, bookmarked and restored on reload.
 */
export default function PubExplorer({ entries, types, themes, places }: { entries: Entry[]; types: Opt[]; themes: Opt[]; places: Opt[] }) {
  const sp = useSearch();
  const pick = (k: string, ok: string[], def: string) => { const v = sp.get(k); return v && ok.includes(v) ? v : def; };
  const q = (sp.get("q") ?? "").slice(0, 120);
  const type = pick("type", types.map((o) => o.value), "all");
  const theme = pick("theme", themes.map((o) => o.value), "all");
  const place = pick("place", places.map((o) => o.value), "all");
  const sort = pick("sort", ["new", "old"], "new") as "new" | "old";
  const [gen, setGen] = useState(0);
  const ids = { q: useId(), theme: useId(), place: useId(), sort: useId() };

  const update = (k: string, v: string, def: string, animate = true) => { setParams({ [k]: v === def ? null : v }); if (animate) setGen((g) => g + 1); };
  const setQ = (v: string) => update("q", v, "", false);
  const setType = (v: string) => update("type", v, "all");
  const setTheme = (v: string) => update("theme", v, "all");
  const setPlace = (v: string) => update("place", v, "all");
  const setSort = (v: "new" | "old") => update("sort", v, "new");
  const bump = () => setGen((g) => g + 1);

  const terms = q.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const match = (e: Entry) =>
    (type === "all" || e.type === type) &&
    (theme === "all" || e.themes.includes(theme)) &&
    (place === "all" || e.places.includes(place)) &&
    terms.every((t) => e.text.includes(t));

  const visible = entries.filter(match);
  const countType = (v: string) => entries.filter((e) => (v === "all" || e.type === v) && (theme === "all" || e.themes.includes(theme)) && (place === "all" || e.places.includes(place)) && terms.every((t) => e.text.includes(t))).length;

  const groups = useMemo(() => {
    const years = Array.from(new Set(entries.map((e) => e.year))).sort((a, b) => (sort === "new" ? b - a : a - b));
    return years.map((y) => ({ year: y, items: entries.filter((e) => e.year === y) }));
  }, [entries, sort]);
  const order = new Map(groups.flatMap((g) => g.items).filter(match).map((e, i) => [e.id, i]));

  const filtered = q.trim() !== "" || type !== "all" || theme !== "all" || place !== "all";
  const reset = () => { setParams({ q: null, type: null, theme: null, place: null }); bump(); };
  return (
    <div>
      <div className="explorer" role="search" aria-label="Search and filter publications">
        <div className="explorer-row">
          <div className="field">
            <label htmlFor={ids.q}><Search /><span className="sr">Search publications</span></label>
            <input id={ids.q} type="search" placeholder="Search title, author, journal, keyword…" value={q} onChange={(e) => setQ(e.target.value)} autoComplete="off" spellCheck={false} />
            {q && <button type="button" className="clear" onClick={() => setQ("")} aria-label="Clear search"><X /></button>}
          </div>
          <div className="field">
            <label htmlFor={ids.theme} className="meta">Theme</label>
            <select id={ids.theme} value={theme} onChange={(e) => setTheme(e.target.value)}>
              <option value="all">All themes</option>
              {themes.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <div className="field">
            <label htmlFor={ids.place} className="meta">Place</label>
            <select id={ids.place} value={place} onChange={(e) => setPlace(e.target.value)}>
              <option value="all">All places</option>
              {places.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <div className="field">
            <label htmlFor={ids.sort} className="meta">Order</label>
            <select id={ids.sort} value={sort} onChange={(e) => setSort(e.target.value as "new" | "old")}>
              <option value="new">Newest first</option>
              <option value="old">Oldest first</option>
            </select>
          </div>
        </div>
        <div className="btn-row" role="group" aria-label="Filter by type">
          {[{ value: "all", label: "All" }, ...types].map((o) => (
            <button key={o.value} type="button" className="chip" aria-pressed={type === o.value} onClick={() => setType(o.value)}>
              {o.label} <span className="c" aria-hidden="true">{countType(o.value)}</span>
            </button>
          ))}
        </div>
        <div className="result-bar">
          <p className="meta" role="status" aria-live="polite">Showing {visible.length} of {entries.length} outputs</p>
          {filtered && <button type="button" className="link" onClick={reset}><span>Clear all filters</span></button>}
        </div>
      </div>

      {visible.length === 0 && <p className="empty">No outputs match these filters. <button type="button" className="link" onClick={reset}><span>Clear filters</span></button></p>}

      <div>
        {groups.map((g) => {
          const shown = g.items.filter(match);
          return (
            <section key={g.year} className="year-group" hidden={shown.length === 0} aria-labelledby={`y-${g.year}`}>
              <h2 className="year-head" id={`y-${g.year}`}>{g.year}<span className="meta">{shown.length} {shown.length === 1 ? "output" : "outputs"}</span></h2>
              {g.items.map((e) => {
                const on = match(e);
                return (
                  <div key={gen > 0 ? `${e.id}-${gen}` : e.id} hidden={!on} className={gen > 0 && on ? "cell-in" : undefined} style={{ "--vi": Math.min(order.get(e.id) ?? 0, 10) } as React.CSSProperties}>
                    {e.node}
                  </div>
                );
              })}
            </section>
          );
        })}
      </div>
    </div>
  );
}
