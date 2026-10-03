import type { ReactNode } from "react";
import Reveal from "./Reveal";

export default function SectionHead({ n, label, children, intro, id, as: Tag = "h2" }: { n?: string; label: string; children: ReactNode; intro?: ReactNode; id?: string; as?: "h2" | "h3" }) {
  return (
    <Reveal className="sh">
      <p className="sh-k">{n && <span className="n">{n}</span>}<span className="bar" aria-hidden="true" /><span>{label}</span></p>
      <Tag className="t-h2" id={id}>{children}</Tag>
      {intro && <p className="sh-intro">{intro}</p>}
    </Reveal>
  );
}
