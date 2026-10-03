import type { ReactNode } from "react";
import { ArrowUpRight } from "./Icons";

/** External link: opens in a new tab with a safe rel, and says so to screen readers. */
export function ExtLink({ href, className, context, children, icon = true }: { href: string; className?: string; context?: string; children: ReactNode; icon?: boolean }) {
  return (
    <a className={className} href={href} target="_blank" rel="noopener noreferrer">
      <span>{children}</span>
      {icon && <ArrowUpRight size={14} className="ar" />}
      <span className="sr">{context ? ` for ${context}` : ""} (opens in a new tab)</span>
    </a>
  );
}
