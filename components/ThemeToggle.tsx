"use client";
import { useSyncExternalStore } from "react";
import { Moon, Sun } from "./Icons";

type Mode = "light" | "dark";
const KEY = "msr-theme";
const EVT = "msr:theme";

function read(): Mode {
  const set = document.documentElement.dataset.theme;
  if (set === "light" || set === "dark") return set;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function subscribe(cb: () => void) {
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  mq.addEventListener("change", cb);
  window.addEventListener(EVT, cb);
  return () => { mq.removeEventListener("change", cb); window.removeEventListener(EVT, cb); };
}

/** Light / dark switch. The choice is remembered per browser (try/catch: storage may be unavailable). */
export default function ThemeToggle() {
  const mode = useSyncExternalStore(subscribe, read, () => null);
  const toggle = () => {
    const next: Mode = read() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem(KEY, next); } catch { /* storage unavailable */ }
    window.dispatchEvent(new Event(EVT));
  };
  const label = mode === "dark" ? "Switch to light theme" : "Switch to dark theme";
  return (
    <button type="button" className="icon-btn" onClick={toggle} aria-label={label} title={label}>
      {mode === "dark" ? <Sun /> : <Moon />}
    </button>
  );
}
