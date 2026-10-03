import { publications, typeLabelPlural, type PubType } from "../lib/data";
import { firstYear, lastYear } from "../lib/format";
import ScrollToEnd from "./ScrollToEnd";

const ORDER: PubType[] = ["journal", "chapter", "book", "conference"];
const COLOR: Record<PubType, string> = { journal: "var(--delta)", chapter: "var(--silt)", book: "var(--ink)", conference: "var(--ink-3)" };

/**
 * Outputs per year in this archive, stacked by type. Counts are computed from lib/data.ts — they are not
 * citation metrics and not a claim about total output. A data table carries the same values for assistive tech.
 */
export default function OutputChart({ compact = false }: { compact?: boolean }) {
  const years = Array.from({ length: lastYear - firstYear + 1 }, (_, i) => firstYear + i);
  const rows = years.map((y) => ({ y, by: ORDER.map((t) => publications.filter((p) => p.year === y && p.type === t).length) }));
  const max = Math.max(...rows.map((r) => r.by.reduce((a, b) => a + b, 0)));
  const W = 900, H = compact ? 200 : 260, L = 28, B = 26, T = 10;
  const bw = (W - L) / years.length;
  const unit = (H - B - T) / Math.max(max, 1);
  const ticks = Array.from({ length: max + 1 }, (_, i) => i).filter((i) => i % (max > 6 ? 2 : 1) === 0);

  return (
    <figure className="viz">
      <ScrollToEnd className="viz-scroll" label="Outputs per year chart (scrolls horizontally on small screens)">
      <div className="viz-hover" data-grow="">
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-labelledby="oc-t oc-d">
          <title id="oc-t">{`Outputs per year in this archive, ${firstYear}–${lastYear}`}</title>
          <desc id="oc-d">Stacked bar chart of journal articles, book chapters, books and conference papers by year. The same values are listed in the table that follows.</desc>
          {ticks.map((t) => (
            <g key={t}>
              <line className="grid-l" x1={L} x2={W} y1={H - B - t * unit} y2={H - B - t * unit} />
              <text x={L - 8} y={H - B - t * unit + 4} textAnchor="end">{t}</text>
            </g>
          ))}
          {rows.map((r, i) => {
            let acc = 0;
            const total = r.by.reduce((a, b) => a + b, 0);
            const x = L + i * bw + bw * 0.18;
            const w = bw * 0.64;
            return (
              <g key={r.y} className="bar-col">
                <title>{`${r.y}: ${total} output${total === 1 ? "" : "s"}${total ? " — " + ORDER.map((t, k) => (r.by[k] ? `${r.by[k]} ${typeLabelPlural[t].toLowerCase()}` : "")).filter(Boolean).join(", ") : ""}`}</title>
                <rect x={L + i * bw} y={T} width={bw} height={H - B - T} fill="transparent" />
                {r.by.map((n, k) => {
                  if (!n) return null;
                  const h = n * unit;
                  acc += h;
                  return <rect key={k} className="bar-rect grow" style={{ "--i": i } as React.CSSProperties} x={x} y={H - B - acc} width={w} height={Math.max(h - 1.5, 1)} rx={2} fill={COLOR[ORDER[k]]} />;
                })}
                {total > 0 && <text x={x + w / 2} y={H - B - acc - 6} textAnchor="middle" style={{ fill: "var(--ink)" }}>{total}</text>}
                <text x={x + w / 2} y={H - 8} textAnchor="middle">{compact && i % 2 ? "" : `’${String(r.y).slice(2)}`}</text>
              </g>
            );
          })}
          <line className="axis" x1={L} x2={W} y1={H - B} y2={H - B} />
        </svg>
      </div>
      </ScrollToEnd>
      <figcaption>
        <div className="legend">{ORDER.map((t) => <span key={t} style={{ "--type": COLOR[t] } as React.CSSProperties}><i />{typeLabelPlural[t]}</span>)}</div>
        <p className="viz-note">Counts of the {publications.length} outputs listed in this archive (dossier, cut-off 30 Sep 2026). Not citation metrics. Online-first 2026 articles are counted in 2026.</p>
      </figcaption>
      <div className="sr"><table>
        <caption>Outputs per year by type</caption>
        <thead><tr><th scope="col">Year</th>{ORDER.map((t) => <th scope="col" key={t}>{typeLabelPlural[t]}</th>)}</tr></thead>
        <tbody>{rows.filter((r) => r.by.some(Boolean)).map((r) => <tr key={r.y}><th scope="row">{r.y}</th>{r.by.map((n, k) => <td key={k}>{n}</td>)}</tr>)}</tbody>
      </table></div>
    </figure>
  );
}
