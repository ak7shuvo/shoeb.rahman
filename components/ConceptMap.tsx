import Link from "next/link";

type N = { id: string; label: string; x: number; y: number; href: string; kind?: "root" | "pillar" | "chain" };

// Structure follows the dossier's core concept map (§16). Each node opens the archive filtered to that idea.
const nodes: N[] = [
  { id: "root", label: "TOURISM STUDIES", x: 500, y: 40, href: "/publications", kind: "root" },
  { id: "sus", label: "SUSTAINABILITY", x: 170, y: 150, href: "/publications?theme=sustainable", kind: "pillar" },
  { id: "gov", label: "GOVERNANCE", x: 500, y: 150, href: "/publications?theme=governance", kind: "pillar" },
  { id: "dest", label: "DESTINATION DEVELOPMENT", x: 830, y: 150, href: "/publications?theme=destination", kind: "pillar" },
  { id: "eco", label: "Ecotourism", x: 68, y: 262, href: "/publications?q=ecotourism" },
  { id: "rur1", label: "Rural tourism", x: 184, y: 262, href: "/publications?q=rural" },
  { id: "sdg", label: "SDGs", x: 290, y: 262, href: "/publications?q=SDGs" },
  { id: "com", label: "Co-management", x: 418, y: 262, href: "/publications?q=co-management" },
  { id: "soc", label: "Social capital", x: 562, y: 262, href: "/publications?q=social+capital" },
  { id: "cri", label: "Crisis & resilience", x: 728, y: 262, href: "/publications?theme=crisis" },
  { id: "rur2", label: "Rural tourism", x: 850, y: 330, href: "/publications?q=rural" },
  { id: "urb", label: "Urban tourism", x: 934, y: 262, href: "/publications?q=urban" },
  { id: "wb", label: "Community wellbeing", x: 418, y: 352, href: "/publications?q=wellbeing", kind: "chain" },
  { id: "liv", label: "Sustainable livelihoods", x: 418, y: 432, href: "/publications?q=livelihood", kind: "chain" },
  { id: "pol", label: "Destination policy", x: 418, y: 512, href: "/publications?theme=policy", kind: "chain" },
  { id: "tech", label: "Smart tourism / tech", x: 418, y: 592, href: "/publications?theme=technology", kind: "chain" },
  { id: "ecg", label: "Ecological governance", x: 418, y: 672, href: "/publications?q=ecologically", kind: "chain" },
];
const edges: [string, string][] = [
  ["root", "sus"], ["root", "gov"], ["root", "dest"],
  ["sus", "eco"], ["sus", "rur1"], ["sus", "sdg"],
  ["gov", "com"], ["gov", "soc"],
  ["dest", "cri"], ["dest", "rur2"], ["dest", "urb"],
  ["com", "wb"], ["wb", "liv"], ["liv", "pol"], ["pol", "tech"], ["tech", "ecg"],
];
const by = Object.fromEntries(nodes.map((n) => [n.id, n]));
const width = (n: N) => Math.max(90, n.label.length * (n.kind === "root" || n.kind === "pillar" ? 8.6 : 7.6) + 28);

export default function ConceptMap() {
  return (
    <figure className="cmap">
      <div className="cmap-svg" data-draw="">
        <svg viewBox="0 0 1000 710" role="group" aria-label="Concept map of the research. Each concept links to matching publications.">
          {edges.map(([a, b]) => {
            const A = by[a], B = by[b];
            const my = (A.y + B.y) / 2;
            const d = `M${A.x} ${A.y + 17} C${A.x} ${my}, ${B.x} ${my}, ${B.x} ${B.y - 17}`;
            return <path key={a + b} className="edge draw" d={d} style={{ "--len": 400 } as React.CSSProperties} />;
          })}
          {nodes.map((n) => {
            const w = width(n);
            return (
              <Link key={n.id} href={n.href} className={`node${n.kind ? " " + n.kind : ""}`}>
                <rect x={n.x - w / 2} y={n.y - 17} width={w} height={34} rx={17} />
                <text x={n.x} y={n.y + 4} textAnchor="middle">{n.label}</text>
              </Link>
            );
          })}
        </svg>
      </div>
      <div className="cmap-list">
        {nodes.filter((n) => n.kind === "pillar").map((p) => (
          <div key={p.id} className="card">
            <Link className="link" href={p.href}><span>{p.label}</span></Link>
            <div className="tags">{edges.filter(([a]) => a === p.id).map(([, b]) => <Link key={b} className="tag" href={by[b].href}>{by[b].label}</Link>)}</div>
          </div>
        ))}
        <div className="card">
          <span className="meta">From co-management</span>
          <div className="tags">{["wb", "liv", "pol", "tech", "ecg"].map((id) => <Link key={id} className="tag" href={by[id].href}>{by[id].label}</Link>)}</div>
        </div>
      </div>
      <figcaption className="viz-note">After the dossier&apos;s core concept map. Select a concept to open the matching publications.</figcaption>
    </figure>
  );
}
