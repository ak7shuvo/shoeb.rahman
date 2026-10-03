import localFont from "next/font/local";

// v2.0 type system — self-hosted (SIL Open Font License), so builds never depend on Google Fonts.
// Display · Instrument Serif: a high-contrast condensed serif for names, headlines and large numerals.
export const display = localFont({
  src: [
    { path: "./fonts/instrument-serif-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/instrument-serif-latin-400-italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-display",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

// Reading · Source Serif 4 (variable weight): the body voice — biography, summaries, long-form text.
// Latin-extended glyphs (e.g. "ă", "ţ" in Romanian journal names) come from public/fonts via unicode-range in globals.css.
export const text = localFont({
  src: [
    { path: "./fonts/source-serif-4-latin-wght-normal.woff2", weight: "200 900", style: "normal" },
    { path: "./fonts/source-serif-4-latin-wght-italic.woff2", weight: "200 900", style: "italic" },
  ],
  variable: "--font-text",
  display: "swap",
  fallback: ["Iowan Old Style", "Georgia", "serif"],
});

// Instrument · IBM Plex Mono: navigation, labels, metadata, controls — the "observatory" voice.
export const mono = localFont({
  src: [
    { path: "./fonts/ibm-plex-mono-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/ibm-plex-mono-latin-500-normal.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-mono",
  display: "swap",
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
});
