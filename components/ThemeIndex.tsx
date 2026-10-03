import Link from "next/link";
import { themes } from "../lib/data";
import { themeCounts } from "../lib/format";
import Reveal from "./Reveal";

/** Research themes with the number of archive outputs tagged to each (a navigation aid, not a metric). */
export default function ThemeIndex({ limit }: { limit?: number }) {
  const list = limit ? themes.slice(0, limit) : themes;
  const max = Math.max(...themes.map((t) => themeCounts[t.id] ?? 0));
  return (
    <div className="theme-index" data-grow-x="">
      {list.map((t, i) => {
        const n = themeCounts[t.id] ?? 0;
        return (
          <Reveal key={t.id} delay={(i % 4) * 60}>
            <Link className="theme-row" href={`/publications?theme=${t.id}`}>
              <span className="tn" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              <span className="tt">{t.title}</span>
              <span className="td">{t.description}</span>
              <span className="meter" aria-label={`${n} outputs tagged`}>
                <span className="track"><span className="fill grow-x" style={{ width: `${(n / max) * 100}%`, "--i": i } as React.CSSProperties} /></span>
                <span className="v">{n}</span>
              </span>
            </Link>
          </Reveal>
        );
      })}
    </div>
  );
}
