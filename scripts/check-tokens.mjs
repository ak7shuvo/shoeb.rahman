// Dependency-free design-system guard. Run: npm run check
//  1. Colour literals in globals.css must appear only inside custom-property declarations (tokens).
//  2. WCAG 2.2 contrast for the text/background token pairs the site uses, in light and dark themes.
import fs from "node:fs";

const css = fs.readFileSync(new URL("../app/globals.css", import.meta.url), "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
let fail = 0;

// 1 — literals outside tokens (print block and keyframes excepted: they cannot use themed tokens reliably)
const body = css.replace(/@media print\{[\s\S]*$/, "").replace(/@keyframes ping\{[^}]*\}[^}]*\}/, "");
const offenders = [];
for (const decl of body.split(/[;{}]/)) {
  const d = decl.trim();
  if (!d || d.startsWith("--") || d.startsWith("@") || d.startsWith("src:")) continue;
  const m = d.match(/#[0-9a-f]{3,8}\b|rgba?\(/i);
  if (m && d.includes(":")) offenders.push(d.slice(0, 90));
}
console.log(offenders.length ? `colour literals outside tokens (${offenders.length}):\n  ${offenders.join("\n  ")}` : "colour literals outside tokens: none");
if (offenders.length) fail++;

// 2 — contrast
const block = (sel) => { const i = css.indexOf(sel); const s = css.indexOf("{", i); return css.slice(s + 1, css.indexOf("}", s)); };
const toks = (txt) => Object.fromEntries([...txt.matchAll(/--([\w-]+):\s*(#[0-9a-f]{6}|rgba?\([^)]*\))/gi)].map((m) => [m[1], m[2]]));
const light = toks(block(":root{"));
const dark = { ...light, ...toks(block(':root[data-theme="dark"]{')) };
const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const parse = (v) => (v.startsWith("#") ? { c: hex(v), a: 1 } : (() => { const n = v.match(/[\d.]+/g).map(Number); return { c: n.slice(0, 3), a: n[3] ?? 1 }; })());
const lum = ([r, g, b]) => { const f = (x) => { x /= 255; return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
const ratio = (fg, bg) => { const B = parse(bg).c; const F = parse(fg); const c = F.c.map((x, i) => Math.round(x * F.a + B[i] * (1 - F.a))); const [a, b] = [lum(c), lum(B)].sort((p, q) => q - p); return (a + 0.05) / (b + 0.05); };
const pairs = [
  ["ink", "paper", 4.5], ["ink", "paper-2", 4.5], ["ink", "card", 4.5],
  ["ink-2", "paper", 4.5], ["ink-2", "paper-2", 4.5], ["ink-2", "card", 4.5],
  ["ink-3", "paper", 4.5], ["ink-3", "paper-2", 4.5], ["ink-3", "card", 4.5],
  ["delta", "paper", 4.5], ["delta", "paper-2", 4.5], ["delta", "card", 4.5], ["delta", "delta-soft", 4.5],
  ["silt", "paper", 4.5], ["silt", "card", 4.5], ["silt", "paper-2", 4.5],
  ["paper", "ink", 4.5], ["paper", "delta", 4.5],
  ["ink", "land", 4.5], ["ink-2", "water", 4.5], ["ink", "water", 4.5],
];
const nightPairs = [["on-night", "night", 4.5], ["on-night-2", "night", 4.5], ["on-night-2", "night-2", 4.5], ["aqua", "night", 4.5], ["aqua", "night-2", 4.5], ["ember", "night", 4.5], ["night", "aqua", 4.5], ["night", "on-night", 4.5]];
let low = 99;
for (const [name, t] of [["light", light], ["dark", dark]]) {
  console.log(`\ncontrast · ${name}`);
  for (const [f, b, min] of name === "light" ? [...pairs, ...nightPairs] : pairs) {
    const r = ratio(t[f], t[b]); low = Math.min(low, r);
    const ok = r >= min; if (!ok) fail++;
    console.log(`${ok ? "PASS" : "FAIL"} ${r.toFixed(2).padStart(5)}:1 (min ${min})  ${f} on ${b}`);
  }
}
console.log(`\nlowest ratio: ${low.toFixed(2)}:1 · failures: ${fail}`);
process.exit(fail ? 1 : 0);
