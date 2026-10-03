# Dr. Muhammad Shoeb-Ur-Rahman — Academic Portfolio · v2.0 "Field Observatory"

A custom academic portfolio for Dr. Muhammad Shoeb-Ur-Rahman, Associate Professor, Department of Tourism and Hospitality
Management, University of Dhaka. v2.0 is a ground-up redesign of v1.5.1: new information architecture (9 pages instead of 6),
a new design system, research visualisations built from the publication data, and a searchable archive with full metadata.

**Stack:** Next.js 16.3.1 (App Router, Turbopack) · React 19.2.8 · TypeScript · one global stylesheet · no UI or icon libraries.
Runtime dependencies are unchanged from v1.5.1 (`next`, `react`, `react-dom`); ESLint 9 + `eslint-config-next` were added as dev dependencies.

## Run it

Node **≥ 20.9** (CI and `.nvmrc` use 22).

```bash
npm ci
npm run dev                 # http://localhost:3000
```

Production:

```bash
cp .env.example .env.local  # set NEXT_PUBLIC_SITE_URL (see "Deploy")
npm run build
npm run start
```

Quality gates (all run in CI):

```bash
npm run typecheck   # tsc --noEmit
npm run lint        # ESLint 9, next/core-web-vitals + next/typescript
npm run check       # design-token guard + WCAG contrast for every text pair, light and dark
npm run verify      # all of the above + build
```

Fonts are **self-hosted** (`app/fonts/`, `public/fonts/`) through `next/font/local`, so builds never call Google Fonts.
(v1.5.1 fetched fonts from Google at build time and could not build offline.)

## Deploy

Unchanged from v1.5: set `NEXT_PUBLIC_SITE_URL` (no trailing slash) for Production, e.g. in Vercel → Settings → Environment
Variables, then redeploy. `lib/site.ts` resolves the origin (`NEXT_PUBLIC_SITE_URL` → `VERCEL_PROJECT_PRODUCTION_URL` →
`https://example.com` placeholder). Indexing is allowed only on a production deployment with a real URL; previews, `next dev`
and the placeholder are served `noindex` with a blocking `robots.txt`. Security headers are set in `next.config.ts`.

Post-deploy: `/robots.txt` lists the sitemap; `/sitemap.xml` lists 9 routes; `/og-image.png` is the 1200×630 social card;
view-source on `/` shows `Person` + `WebSite` JSON-LD and one canonical.

## Pages

| Route | Purpose |
|---|---|
| `/` | Hero with portrait lens; research statement and six-phase trajectory; research strands with archive counts; featured research + current project; interactive map preview; outputs-per-year chart; career timeline and awards; edited volume; contact |
| `/research` | Conceptual signature and official DU interests; eight research strands with questions, concepts and linked works; concept map (each node opens the filtered archive); trajectory; methods; collaborators |
| `/publications` | All 28 outputs with full author lists, venue, volume/issue/pages, online-first dates, settings, methods, DOI; search + type/theme/place filters + order, all mirrored in the URL; copy reference |
| `/books` | *Tourism Policy and Planning in Bangladesh* (Springer 2020), five book chapters, CAUTHE proceedings |
| `/projects` | UGC-funded smart tourism destination project (status shown as active/recent, no completion claimed); Wollongong engagement; service roles |
| `/locations` | Bangladesh map (Natural Earth 1:50m) with research contexts and named case sites; selection in `?place=` |
| `/journey` | Timeline chart 1998–2026 and full chronology (positions, degrees with course lists, awards, service) |
| `/about` | Biography, doctoral research, positions, recognition, scholarly profiles |
| `/contact` | Institutional email (copy button), institutional address, seven scholarly profiles |

## Editing content

**All facts live in `lib/data.ts`.** Pages never hard-code a date, title, author list or count; counts and year spans are computed
in `lib/format.ts`. To add a publication, append an object to `publications` with exact publisher metadata; it then appears in the
archive, charts, theme/place counts, filters and (if `featured`) on the home page. Rules carried from the dossier:

- Never invent publications, awards, grants, findings, citation counts, h-index, positions or affiliations.
- No "world-renowned"-style language. No citation metrics unless retrieved live and date-stamped.
- Use DOI links where available; prefer publisher metadata; keep online-first dates in `online`.
- Publish only institutional contact details (no residential address or personal phone).

`npm run check` and `scripts/qa/dossier_check.py` help keep this true.

## Portrait

`public/images/portrait/portrait.jpg` (square, face centred in the upper third) is shown in the lens on Home and About and is
used in the social card. Without the file the lens shows an MSR monogram. If you replace it, regenerate `public/og-image.png`
or swap in your own 1200×630 image.

## Design system

- **Palette** (tokens in `:root`, with a full dark theme): limestone paper `#F2F0E9`, estuary ink `#101B1D`, estuary teal
  `#0C565D` (primary accent), terracotta `#9A4120` (highlight), night `#0B1517` with aqua and ember accents. Every colour in
  `globals.css` is a token (checked), and all text pairs pass WCAG AA in both themes (lowest 4.91:1).
- **Type**: Instrument Serif (display), Source Serif 4 (reading, with a latin-extended subset for names such as
  "Universităţii"), IBM Plex Mono (navigation, labels, metadata). Fluid `clamp()` scale.
- **Motifs**: generated topographic contours (`public/topo.svg`, used as a theme-coloured mask), an instrument-style portrait
  lens, field-map markers, timeline rails.
- **Motion**: CSS transitions/keyframes driven by one client module (`components/MotionRoot.tsx`, mounted from
  `app/template.tsx` so it only touches hydrated markup): scroll reveals, chart growth, line drawing, gentle parallax, progress.
  Everything is off under `prefers-reduced-motion`; if scripts fail, a boot script stops hiding content after 2.5 s.
- **Theme**: light/dark toggle in the header, defaulting to the system preference; the choice is stored per browser.

## Project layout

```
app/            routes, layout, template, globals.css, fonts, icons, sitemap/robots/manifest
components/     Masthead, SectionHead, PubItem, PubExplorer, OutputChart, ThemeIndex, Trajectory, ConceptMap,
                ResearchMap, Gantt, Lens, SiteHeader, Footer, ThemeToggle, CopyButton, MotionRoot, BackToTop, …
lib/            data.ts (facts), format.ts (derived values), map.ts (projected geometry), site.ts (URL/indexing), nav.ts,
                url-state.ts (query-string store for filters)
public/         portrait, topo.svg, og-image.png, app icons, latin-ext fonts
scripts/        check-tokens.mjs (npm run check), build-map.mjs (regenerates lib/map.ts), qa/ (browser test harness)
```

See `CHANGELOG.md`, `QA-REPORT.md` and `CONTENT-NOTES.md`.
