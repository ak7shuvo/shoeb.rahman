import { awards, education, engagement, positions, service } from "../lib/data";
import ScrollToEnd from "./ScrollToEnd";

const Y0 = 1998, Y1 = 2026.75; // through October 2026 (the dossier cut-off month)
const W = 1000, L = 130, R = 20;
const x = (y: number) => L + ((y - Y0) / (Y1 - Y0)) * (W - L - R);

type Span = { a: number; b: number; label: string; cls?: string; open?: boolean };
const short = (s: string) => s.replace("Lecturer and Program Coordinator of BBA Program", "Lecturer & BBA Coordinator").replace(" — Tourism Management", "").replace(" — Tourism and Hospitality Management", "").replace(" — Management Studies", "");

/** Education and career on one time axis. All dates are the dossier's; open-ended service roles are drawn dashed. */
export default function Gantt() {
  const lanes: { label: string; spans: Span[] }[] = [
    { label: "Education", spans: education.map((e) => ({ a: e.startYear, b: e.endYear, label: short(e.degree), cls: "edu" })) },
    { label: "Univ. of Dhaka", spans: positions.filter((p) => p.org === "University of Dhaka").map((p) => ({ a: p.startYear, b: p.endYear ?? Y1, label: p.title, cls: p.current ? "now" : "" })) },
    { label: "Earlier roles", spans: positions.filter((p) => p.org !== "University of Dhaka").map((p) => ({ a: p.startYear, b: p.endYear ?? Y1, label: p.org === "Green University of Bangladesh" ? "Green University" : "Consultant", cls: "other" })) },
    { label: "Service", spans: [
      { a: 2010.42, b: Y1, label: `${service[1].org} · since ${service[1].since}`, cls: "other", open: true },
      { a: 2013.92, b: Y1, label: `${service[0].org} · since ${service[0].since}`, cls: "other", open: true },
    ] },
  ];
  const marks = [
    ...awards.map((a) => ({ y: Number(a.year) + 0.5, label: a.title.replace("New Zealand Commonwealth Scholarship 2014", "NZ Commonwealth Scholarship").replace(" Award", "") })),
    { y: 2023.25, label: "Wollongong (invited)" },
  ];
  const laneH = 46, top = 34;
  const H = top + lanes.length * laneH + 78;
  const years = Array.from({ length: 29 }, (_, i) => Y0 + i).filter((y) => y % 2 === 0);

  return (
    <figure className="gantt-fig" aria-labelledby="g-cap">
      <ScrollToEnd className="gantt" label="Career timeline (scrolls horizontally)">
      <div className="gantt-inner" data-grow-x="">
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-labelledby="g-t">
          <title id="g-t">Timeline of education, positions, service and recognition, 1998 to 2026. The same information is listed below the chart.</title>
          <defs>
            <linearGradient id="now-grad" x1="0" x2="1"><stop offset="0" stopColor="var(--delta)" /><stop offset="1" stopColor="var(--silt)" /></linearGradient>
          </defs>
          {years.map((y) => (
            <g key={y}>
              <line className="tick" x1={x(y)} x2={x(y)} y1={top - 10} y2={H - 50} />
              <text className="yr" x={x(y)} y={top - 16} textAnchor="middle">{y}</text>
            </g>
          ))}
          {lanes.map((ln, li) => {
            const y = top + li * laneH + 8;
            return (
              <g key={ln.label}>
                <text className="lane-l" x={0} y={y + 17}>{ln.label}</text>
                {ln.spans.map((s, k) => {
                  const w = Math.max(x(s.b) - x(s.a), 3);
                  const inside = w > s.label.length * 7.1 + 14;
                  const yy = ln.label === "Service" ? y + (k ? 14 : -4) : y;
                  const hh = ln.label === "Service" ? 12 : 26;
                  return (
                    <g key={k}>
                      <rect className={`span grow-x ${s.cls ?? ""}`} style={{ "--i": li * 2 + k, transformOrigin: `${x(s.a)}px 0`, ...(s.open ? { opacity: 0.45 } : {}) } as React.CSSProperties} x={x(s.a)} y={yy} width={w} height={hh} rx={hh / 2} strokeDasharray={s.open ? "4 3" : undefined} />
                      {ln.label === "Service"
                        ? <text className="span-o" x={x(s.a) + 8} y={yy + hh / 2 + 4} style={{ fill: "var(--ink)" }}>{s.label}</text>
                        : inside
                          ? <text className="span-t" x={x(s.a) + 10} y={yy + 17}>{s.label}</text>
                          : ln.label === "Earlier roles"
                            ? <text className="span-o" x={k % 2 ? x(s.a) - 6 : x(s.b) + 6} y={yy + 17} textAnchor={k % 2 ? "end" : "start"}>{s.label}</text>
                            : <text className="span-o" x={x(s.a) + w / 2} y={yy + 42} textAnchor="middle">{s.label}</text>}
                    </g>
                  );
                })}
              </g>
            );
          })}
          {(() => {
            const y = top + lanes.length * laneH + 30;
            return (
              <g>
                <text className="lane-l" x={0} y={y + 4}>Recognition</text>
                {marks.map((m, i) => (
                  <g key={m.label}>
                    <path className="award" d={`M${x(m.y)} ${y - 6} l6 6 -6 6 -6 -6Z`} />
                    <text className="award-t" x={x(m.y) + (i === 0 ? 8 : 0)} y={y + (m.label.startsWith("ESD") ? -12 : 22)} textAnchor={i === 0 ? "end" : "middle"}>{m.label}</text>
                  </g>
                ))}
              </g>
            );
          })()}
          <line className="today" x1={x(Y1)} x2={x(Y1)} y1={top - 10} y2={H - 50} />
        </svg>
      </div>
      </ScrollToEnd>
      <figcaption id="g-cap" className="viz-note">Dates from the official University of Dhaka CV and profile. Dashed bars: service roles recorded with a start date only ({engagement[0].date} engagement shown as a marker).</figcaption>
      <p className="gantt-hint meta">← Scroll sideways for earlier years</p>
    </figure>
  );
}
