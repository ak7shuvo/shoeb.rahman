"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav } from "../lib/nav";
import { links, profile } from "../lib/data";
import ThemeToggle from "./ThemeToggle";

const DESKTOP = 1220; // keep in sync with the @media (min-width:1220px) rule for .nav in globals.css

export default function SiteHeader() {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLElement>(null);
  const isCurrent = (href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`));

  // Close the sheet when the route changes (adjusting state during render, per React guidance).
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) { setLastPath(pathname); setOpen(false); }

  useEffect(() => {
    let raf = 0;
    let last = false;
    const check = () => { raf = 0; const next = window.scrollY > 8; if (next !== last) { last = next; setScrolled(next); } };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(check); };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { cancelAnimationFrame(raf); window.removeEventListener("scroll", onScroll); };
  }, []);

  // Open sheet: focus moves in, Tab is contained, Esc closes and restores focus, the page behind is inert.
  useEffect(() => {
    if (!open) return;
    const behind = Array.from(document.querySelectorAll("main, footer, .strip, .to-top"));
    behind.forEach((el) => el.setAttribute("inert", ""));
    document.body.classList.add("menu-open");
    sheetRef.current?.querySelector<HTMLElement>("a[href]")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.preventDefault(); setOpen(false); btnRef.current?.focus(); return; }
      if (e.key !== "Tab" || !sheetRef.current) return;
      const stops = [btnRef.current, ...Array.from(sheetRef.current.querySelectorAll<HTMLElement>("a[href],button"))].filter(Boolean) as HTMLElement[];
      const first = stops[0], last = stops[stops.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    const onResize = () => { if (window.innerWidth >= DESKTOP) setOpen(false); };
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      behind.forEach((el) => el.removeAttribute("inert"));
      document.body.classList.remove("menu-open");
    };
  }, [open]);

  return (
    <>
      <div className="strip">
        <div className="wrap">
          <span><span className="hide-sm">{profile.department} · </span>{profile.institution}</span>
          <a href={links.orcid} target="_blank" rel="noopener noreferrer">ORCID {profile.orcid}<span className="sr"> (opens in a new tab)</span></a>
        </div>
      </div>
      <header className={`bar${scrolled ? " is-scrolled" : ""}`}>
        <div className="wrap">
          <Link className="brand" href="/" aria-current={pathname === "/" ? "page" : undefined}>
            <span className="brand-mark" aria-hidden="true">MSR</span>
            <span className="brand-name"><strong>Shoeb-Ur-Rahman</strong><small>Tourism · University of Dhaka</small></span>
            <span className="sr">{profile.name} — home</span>
          </Link>
          <nav className="nav" aria-label="Primary">
            {nav.map((l) => <Link key={l.href} href={l.href} aria-current={isCurrent(l.href) ? "page" : undefined}>{l.label}</Link>)}
          </nav>
          <ThemeToggle />
          <button ref={btnRef} type="button" className="menu-btn" aria-expanded={open} aria-controls="site-sheet" onClick={() => setOpen((o) => !o)}>
            <span className="lines" aria-hidden="true"><i /><i /></span>
            <span>{open ? "Close" : "Menu"}</span>
          </button>
        </div>
      </header>
      {open && (
        <nav id="site-sheet" ref={sheetRef} className="sheet" aria-label="Primary">
          <ol>
            {[{ href: "/", label: "Home", d: "Overview" }, ...nav].map((l, n) => (
              <li key={l.href}>
                <Link className="s-link" href={l.href} style={{ "--n": n } as React.CSSProperties} aria-current={isCurrent(l.href) ? "page" : undefined} onClick={() => { if (isCurrent(l.href)) setOpen(false); }}>
                  <span className="meta" aria-hidden="true">{String(n + 1).padStart(2, "0")}</span>
                  <span>{l.label}</span>
                  <span className="d">{l.d}</span>
                </Link>
              </li>
            ))}
          </ol>
          <div className="sheet-foot">
            <a className="btn btn-sm" href={`mailto:${profile.email}`}>{profile.email}</a>
          </div>
        </nav>
      )}
    </>
  );
}
