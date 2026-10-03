# QA report — v2.0

Everything below was **actually run** against the production build (`next build` + `next start`) in the authoring environment:
Linux, Node 22.22, Chromium (Playwright 1.56), with the shipped self-hosted fonts.

## Not run
- Lighthouse and the full axe-core rule set (not available). The browser checks below cover a subset with hand-written rules.
- Safari, Firefox and real devices (Chromium desktop and mobile emulation only).
- Online re-verification of facts (see CONTENT-NOTES.md, "Before publishing").

## Static checks — PASS
| Check | Result |
|---|---|
| `npm ci` | OK |
| `npm run typecheck` | 0 errors |
| `npm run lint` | 0 problems (ESLint 9, next/core-web-vitals + next/typescript, including React-compiler hook rules) |
| `npm run check` | 0 colour literals outside tokens · 50 contrast pairs (light, dark, night bands), 0 failures, lowest 4.91:1 |
| `npm run build` | 17/17 static routes; `.next/static` ≈ 1 MB |

## Page × width matrix — 100 runs, 0 failures (`scripts/qa/matrix.py`)
9 routes + 404 × widths 1920, 1440, 1280, 1180, 1024, 768, 480, 390, 360, 320. A run passes only with: no horizontal overflow;
exactly one `h1`; no duplicate ids; `alt` on every image; a name on every link/button; no skipped heading level; no visible text
under 11 px; every reveal element revealed after scrolling; touch targets ≥ 24 × 24 px (WCAG 2.2 AA 2.5.8; primary controls are
40–50 px); desktop nav never within 8 px of brand or theme control (measured 188–376 px / 30 px); 0 console errors.

## Interaction tests — 38/38 PASS (`scripts/qa/interact.py`)
Mobile menu (focus in, Tab trap, inert page, current page, Esc, navigation, resize) · skip link · theme toggle (switches,
persists across reload, toggles back) · header scrolled state with 0 px layout shift · back-to-top with progress and focus ·
client navigation re-runs reveals · concept-map node opens the archive filtered to 6 governance outputs · archive: all 28, search
"Sundarbans" → 2, empty state, clear, "Book chapters" → 5, chapters ∩ technology → 1, restored after reload, deep link
`?place=rural&sort=old` → 3 oldest-first, copy reference (exact string, ends with the DOI), 2026 ordered by online date ·
locations: marker click and keyboard Enter select a place, update the URL and panel; `?place=stmartin` deep link · journey
course list expands · contact copies the email · external links use `noopener` · reduced motion hides nothing · with all JS
chunks blocked the page shows everything and all 28 records are in the HTML · 64 internal links, anchors and 12 assets
resolve · unknown routes return 404.

## Content checks — PASS
- `scripts/qa/dossier_check.py`: all 28 titles and 11 DOIs, plus dates, names, interests and profile URLs from the dossier,
  found on the site; forbidden phrases, metrics and a personal phone number absent. 95 checks, 0 failures.
- `scripts/qa/content_diff.py`: every v1.5.1 text node (484) searched across the new site; the strings not found verbatim are
  listed and explained in CONTENT-NOTES.md (labels, formats and summaries replaced by fuller dossier text).

## Visual review
Full-page screenshots reviewed at 1440 and 390 px for every route, plus dark theme (home, publications, locations), the timeline at
both sizes and the mobile menu. Issues found and fixed during review: hyphenated name breaking across lines, overlapping concept-map
and timeline labels, featured-grid orphan, collaborator card layout, background contour layers taking layout space, a hidden data
table and the filter selects widening the page on phones, chart labels too small on phones (charts now scroll horizontally there),
and a React 19 hydration error caused by a multi-part SVG `<title>`.
