"use client";
import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "./Icons";

/** Copies text with visible + announced feedback; falls back to execCommand where the Clipboard API is unavailable. */
export default function CopyButton({ text, label, done = "Copied", className = "link copy" }: { text: string; label: string; done?: string; className?: string }) {
  const [state, setState] = useState<"idle" | "done" | "fail">("idle");
  const t = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(t.current), []);
  const copy = async () => {
    let ok = false;
    try { if (navigator.clipboard?.writeText) { await navigator.clipboard.writeText(text); ok = true; } } catch { ok = false; }
    if (!ok) {
      try {
        const ta = document.createElement("textarea");
        ta.value = text; ta.setAttribute("readonly", ""); ta.style.position = "fixed"; ta.style.opacity = "0";
        document.body.appendChild(ta); ta.select(); ok = document.execCommand("copy"); ta.remove();
      } catch { ok = false; }
    }
    setState(ok ? "done" : "fail");
    clearTimeout(t.current);
    t.current = setTimeout(() => setState("idle"), 2200);
  };
  return (
    <button type="button" className={className} data-state={state} onClick={copy}>
      <span>{state === "done" ? done : state === "fail" ? "Copy unavailable" : label}</span>
      {state === "done" ? <Check className="ar" /> : <Copy className="ar" />}
      <span className="sr" role="status">{state === "done" ? `${done} to clipboard` : state === "fail" ? "Copy failed" : ""}</span>
    </button>
  );
}
