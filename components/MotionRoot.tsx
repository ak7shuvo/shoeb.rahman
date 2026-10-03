"use client";
import { useEffect } from "react";

/**
 * The only scroll-linked client module: reveals ([data-reveal], [data-draw], [data-grow], [data-grow-x]
 * receive .is-in once), subtle parallax ([data-parallax]) and reading progress ([data-scroll-progress]).
 * Skipped under prefers-reduced-motion; pages render fully without it.
 */
// Rendered from app/template.tsx, after the page content, so its effect runs only once the page subtree has
// hydrated (classes and transforms are never applied to markup React has not yet claimed). The template remounts
// on every navigation, which re-runs the scan.
export default function MotionRoot() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("motion-ready");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let io: IntersectionObserver | undefined;
    let frame = 0;
    let parallax: HTMLElement[] = [];
    let progress: HTMLElement[] = [];
    const SEL = "[data-reveal]:not(.is-in),[data-draw]:not(.is-in),[data-grow]:not(.is-in),[data-grow-x]:not(.is-in)";

    const scan = () => {
      const els = Array.from(document.querySelectorAll<HTMLElement>(SEL));
      if (reduce || !("IntersectionObserver" in window)) {
        els.forEach((el) => el.classList.add("is-in"));
      } else {
        io?.disconnect();
        io = new IntersectionObserver((entries) => {
          for (const e of entries) if (e.isIntersecting) { e.target.classList.add("is-in"); io?.unobserve(e.target); }
        }, { rootMargin: "0px 0px -8% 0px", threshold: 0.06 });
        els.forEach((el) => io!.observe(el));
      }
      parallax = reduce ? [] : Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
      progress = Array.from(document.querySelectorAll<HTMLElement>("[data-scroll-progress]"));
    };

    const update = () => {
      frame = 0;
      const vh = window.innerHeight || 1;
      const max = Math.max(1, document.documentElement.scrollHeight - vh);
      const p = Math.min(1, Math.max(0, window.scrollY / max)).toFixed(4);
      progress.forEach((el) => el.style.setProperty("--scroll", p));
      const wide = window.innerWidth >= 760;
      for (const el of parallax) {
        if (!wide) { el.style.transform = ""; continue; }
        const r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) continue;
        const speed = parseFloat(el.dataset.parallax || "0");
        el.style.transform = `translate3d(0, ${((r.top + r.height / 2 - vh / 2) * speed).toFixed(1)}px, 0)`;
      }
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };

    const start = requestAnimationFrame(() => { scan(); update(); });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(start);
      cancelAnimationFrame(frame);
      io?.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return null;
}
