# Changelog

## v2.0.0 — "Field Observatory" (complete redesign)

**Why:** v1.5.1 presented the record as six text pages of near-identical cards and an incomplete publication list (no authors,
volumes, pages or online-first dates; and no edited book). v2.0 rebuilds the site as a research
portfolio: every decision below serves credibility, discoverability or readability.

### Information architecture
- 6 → 9 pages: added **Books & Chapters**, **Research Locations** and **Academic Journey**, as the dossier's recommended structure (§25, §32).
- Home rebuilt around the dossier's homepage brief: hero, research statement + trajectory, research strands, featured research
  + current project, map, outputs over time, journey + awards, edited volume, contact.
- Every inner page has a breadcrumb, chapter number, lead, and either figures or an "On this page" index.

### Content (from the dossier; nothing invented)
- Publication archive expanded to the full dossier record: **28 outputs** (21 journal articles, 1 edited Springer book, 5 chapters,
  1 conference paper) with complete author lists (Dr. Rahman highlighted), venues, volume/issue/pages, editors, online-first dates,
  research settings, methods, documented contributions, keywords and all 11 DOIs.
- Added: the edited volume *Tourism Policy and Planning in Bangladesh* (Springer 2020); HSC/SSC; MBA/BBA course lists; position
  duties; service roles (Smile for Human Rights, Community Ecotourism); collaborators and shared-output counts; documented methods;
  research phases; research contexts; official interests; Academia and ResearchGate links.
- The smart-tourism project shows funder, start date and investigators exactly as listed, is labelled active/recent, and does not
  state Dr. Rahman's role (the source does not give it).
- v1.5.1 copy is preserved (see CONTENT-NOTES.md for the few strings that changed and why).

### Design system
- New palette (limestone paper, estuary teal, terracotta, night) with a complete **dark theme** and a header toggle; every colour is
  a token; all text pairs pass WCAG AA in both themes (`npm run check`).
- New type system: Instrument Serif · Source Serif 4 · IBM Plex Mono, **self-hosted** (builds no longer need Google Fonts), with
  a latin-extended subset for diacritics.
- Motifs: generated topographic contours, an instrument-style portrait lens, field-map markers, timeline rails.

### Research visualisation (all computed from `lib/data.ts`)
- Outputs per year, stacked by type (with an equivalent data table for screen readers).
- Research strands with archive counts, linking to the filtered archive.
- Six-phase trajectory with year spans derived from representative works.
- Concept map after the dossier's §16 (each node opens matching publications; card list on small screens).
- Bangladesh map from Natural Earth 1:50m with research contexts and case sites, selection kept in the URL.
- Career timeline 1998–2026 (education, positions, earlier roles, service, recognition), keyboard-scrollable on small screens.

### Interaction
- Publication explorer: full-text search (title, authors, venue, keywords, summary, DOI), type chips with live counts, theme and
  place filters, order, empty state, clear-all; every filter in the URL (linkable, survives reload); copy formatted reference.
- Copy email; floating back-to-top with progress; reading-progress line; accessible mobile sheet (focus trap, inert page, Esc,
  closes on resize/navigation); theme toggle persisted per browser.
- Motion: scroll reveals, chart growth, line drawing, gentle parallax; disabled for reduced motion; never hides content if JS fails.

### Engineering
- Stack and versions unchanged (Next 16.3.1, React 19.2.8, TypeScript). Dev-only additions: ESLint 9 + eslint-config-next.
- New scripts: `lint`, `check` (tokens + contrast), `verify`; CI runs typecheck, lint, check and build.
- URL-backed filter state via `useSyncExternalStore` (no effects, no hydration mismatch); motion mounted from `app/template.tsx`
  so it only touches hydrated markup.
- SEO: richer `Person` JSON-LD (ORCID identifier, affiliation, alumniOf, knowsAbout, image, sameAs ×6), `WebSite`, per-page
  `BreadcrumbList`; profile Open Graph type; static 1200×630 social card with the portrait; PNG/SVG/ICO icons; 9-route sitemap.
- Indexing logic, security headers and env-based URL resolution from v1.5 kept as they were.

## v1.5.1 and earlier
See the v1.5.1 README (deploy readiness, filters, metadata, typography and motion passes).
