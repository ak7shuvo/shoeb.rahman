"use client";
import { useSyncExternalStore } from "react";

// The URL query string as a tiny external store. Filters read from it during render (no effects, no
// hydration mismatch: the server snapshot is the empty query) and write to it with replaceState.
const EVT = "msr:urlchange";

function subscribe(cb: () => void) {
  window.addEventListener("popstate", cb);
  window.addEventListener(EVT, cb);
  return () => { window.removeEventListener("popstate", cb); window.removeEventListener(EVT, cb); };
}

export function useSearch(): URLSearchParams {
  const s = useSyncExternalStore(subscribe, () => window.location.search, () => "");
  return new URLSearchParams(s);
}

export function setParams(updates: Record<string, string | null>) {
  const url = new URL(window.location.href);
  for (const [k, v] of Object.entries(updates)) {
    if (v == null || v === "") url.searchParams.delete(k);
    else url.searchParams.set(k, v);
  }
  window.history.replaceState(window.history.state, "", `${url.pathname}${url.search}${url.hash}`);
  window.dispatchEvent(new Event(EVT));
}
