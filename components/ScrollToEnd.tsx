"use client";
import { useEffect, useRef, type ReactNode } from "react";

/** Horizontal scroll region that opens scrolled to its most recent (right-hand) end; keyboard-scrollable. */
export default function ScrollToEnd({ label, className, children }: { label: string; className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { const el = ref.current; if (el && el.scrollWidth > el.clientWidth) el.scrollLeft = el.scrollWidth; }, []);
  return <div ref={ref} className={className} tabIndex={0} role="region" aria-label={label}>{children}</div>;
}
