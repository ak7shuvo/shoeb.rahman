import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { profile } from "../lib/data";

const PHOTO = "/images/portrait/portrait.jpg";
const hasPhoto = fs.existsSync(path.join(process.cwd(), "public", PHOTO));
const RING = "TOURISM · GOVERNANCE · COMMUNITIES · DESTINATIONS · RESILIENCE · ";

/** Portrait inside an instrument-style lens: tick ring, slow-turning text ring, coordinate labels. */
export default function Lens({ priority = false }: { priority?: boolean }) {
  const ticks = Array.from({ length: 120 }, (_, i) => i);
  return (
    <div className="lens-wrap">
      <div className="lens">
        <svg className="lens-ring" viewBox="0 0 400 400" aria-hidden="true">
          <defs><path id="lens-txt" d="M200 200 m-188 0 a188 188 0 1 1 376 0 a188 188 0 1 1 -376 0" /></defs>
          <circle cx="200" cy="200" r="199" fill="none" stroke="currentColor" strokeOpacity=".25" />
          {ticks.map((i) => {
            const a = (i / ticks.length) * Math.PI * 2;
            const long = i % 10 === 0;
            const r1 = 176, r2 = long ? 166 : 171;
            return <line key={i} x1={200 + Math.cos(a) * r1} y1={200 + Math.sin(a) * r1} x2={200 + Math.cos(a) * r2} y2={200 + Math.sin(a) * r2} stroke="currentColor" strokeOpacity={long ? 0.7 : 0.35} />;
          })}
          <g className="spin">
            <text fill="currentColor" style={{ fontFamily: "var(--f-mono)", fontSize: 10.5, letterSpacing: 2.2 }}>
              <textPath href="#lens-txt" textLength="1170" lengthAdjust="spacing">{RING + RING}</textPath>
            </text>
          </g>
        </svg>
        <div className="lens-photo">
          {hasPhoto
            ? <Image src={PHOTO} alt={`Portrait of ${profile.name}`} fill priority={priority} sizes="(max-width: 1000px) 80vw, 400px" style={{ objectPosition: "50% 30%" }} />
            : <span className="lens-mono" aria-hidden="true">MSR</span>}
        </div>
      </div>
      <p className="lens-label l1"><strong>University of Dhaka</strong>{profile.coordinates}</p>
      <p className="lens-label l2"><span>PhD</span><strong>Lincoln University, NZ</strong></p>
    </div>
  );
}
