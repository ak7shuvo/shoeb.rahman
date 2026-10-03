"use client";
import { useEffect, useState } from "react";
import { ArrowUp } from "./Icons";

/** Floating back-to-top with a reading-progress ring (ring value is written by MotionRoot). */
export default function BackToTop() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    let raf = 0, last = false;
    const check = () => { raf = 0; const next = window.scrollY > window.innerHeight * 0.9; if (next !== last) { last = next; setOn(next); } };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(check); };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { cancelAnimationFrame(raf); window.removeEventListener("scroll", onScroll); };
  }, []);
  const go = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    document.getElementById("main")?.focus({ preventScroll: true });
  };
  return (
    <button type="button" className={`to-top${on ? " is-on" : ""}`} onClick={go} aria-label="Back to top" tabIndex={on ? 0 : -1} aria-hidden={on ? undefined : true} data-scroll-progress="">
      <svg className="ring" viewBox="0 0 52 52" aria-hidden="true"><circle cx="26" cy="26" r="24" /></svg>
      <ArrowUp />
    </button>
  );
}
