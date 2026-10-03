"use client";
import { useState, type KeyboardEvent, type ReactNode } from "react";
import { setParams, useSearch } from "../lib/url-state";
import { MAP } from "../lib/map";

type P = { id: string; name: string; role: string; point?: [number, number]; count: number };
type C = { id: string; name: string; point: [number, number]; href: string };

/**
 * Bangladesh research-context map. Markers and the list are two views of the same selection; the selected
 * place is kept in ?place= so it can be linked. Detail panels are server-rendered and passed in.
 */
export default function ResearchMap({ places, cases, panels, compact = false }: { places: P[]; cases: C[]; panels: Record<string, ReactNode>; compact?: boolean }) {
  const [local, setLocal] = useState<string>(places[0].id);
  const fromUrl = useSearch().get("place");
  const sel = !compact && fromUrl && places.some((p) => p.id === fromUrl) ? fromUrl : local;

  const choose = (id: string) => {
    setLocal(id);
    if (!compact) setParams({ place: id });
  };
  const onKey = (id: string) => (e: KeyboardEvent) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); choose(id); } };
  const current = places.find((p) => p.id === sel)!;

  return (
    <div className="map-layout">
      <div className="map">
        <svg viewBox={`0 0 ${MAP.w} ${MAP.h}`} role="group" aria-label="Map of Bangladesh with research contexts">
          <path className="nb" d={MAP.neighbours} />
          {MAP.lat.map((l) => <g key={l.l}><line className="grat" x1={0} x2={MAP.w} y1={l.y} y2={l.y} /><text className="grat-t" x={4} y={l.y - 3}>{l.l}°N</text></g>)}
          {MAP.lon.map((l) => <g key={l.l}><line className="grat" y1={0} y2={MAP.h} x1={l.x} x2={l.x} /><text className="grat-t" x={l.x + 3} y={MAP.h - 6}>{l.l}°E</text></g>)}
          <path className="land" d={MAP.bangladesh} />
          <text className="sea-lbl" x={150} y={478}>BAY OF BENGAL</text>
          {cases.map((c) => (
            <g key={c.id} className="marker case" aria-hidden="true">
              <circle className="core" cx={c.point[0]} cy={c.point[1]} r={4} />
              <text className="lbl" x={c.point[0] - 8} y={c.point[1] - 8} textAnchor="end">{c.name}</text>
            </g>
          ))}
          {places.filter((p) => p.point).map((p) => {
            const [cx, cy] = p.point!;
            const left = cx > 300;
            return (
              <g key={p.id} className="marker" role="button" tabIndex={0} aria-pressed={sel === p.id} aria-label={`${p.name}: ${p.count} linked outputs`} onClick={() => choose(p.id)} onKeyDown={onKey(p.id)}>
                <circle className="halo" cx={cx} cy={cy} r={14} />
                <circle className="core" cx={cx} cy={cy} r={6.5} />
                <text className="lbl" x={left ? cx - 12 : cx + 12} y={cy + 4} textAnchor={left ? "end" : "start"}>{p.name}</text>
              </g>
            );
          })}
        </svg>
        <p className="viz-note" style={{ marginTop: 6 }}>Filled markers: research contexts. Open markers: named case sites in individual papers. Marker positions are indicative.</p>
      </div>
      <div>
        <div className="place-list" role="group" aria-label="Research contexts">
          {places.map((p) => (
            <button key={p.id} type="button" className="place-btn" aria-pressed={sel === p.id} onClick={() => choose(p.id)}>
              <span className={`pin${p.point ? "" : " none"}`} aria-hidden="true" />
              <span><strong>{p.name}</strong><span className="meta">{p.role}</span></span>
              <span className="c" aria-label={`${p.count} linked outputs`}>{p.count}</span>
            </button>
          ))}
        </div>
        <div>
          {places.map((p) => (
            <div key={p.id} className="place-panel" hidden={p.id !== sel}>
              {panels[p.id]}
            </div>
          ))}
        </div>
        <span className="sr" role="status">{current.name} selected</span>
      </div>
    </div>
  );
}
