# Content notes — v2.0

## Source of truth
The supplied research dossier (verification cut-off **30 September 2026**), following its own hierarchy:
University of Dhaka profile and official CV → publisher / DOI pages → ORCID, Scholar, ResearchGate, Academia.
All facts are in `lib/data.ts`. Nothing was re-verified online for this build; the dossier was prepared three days before it.

## Checked automatically
`scripts/qa/dossier_check.py` (run against the built site): all **28 publication titles**, all **11 DOIs**, every career and
education date, the dissertation title, awards, the Wollongong engagement, the UGC project (funder, start date, investigators),
service roles, the seven official research interests and all profile URLs appear on the site; the dossier's forbidden phrases
("world-renowned", etc.), citation metrics and a personal phone number do not. 95 checks, 0 failures.

## Editorial decisions (no new facts)
- **Theme tags and place links** on each publication are navigation aids derived from that item's dossier entry (setting,
  keywords, themes). Items with no stated location are not placed on the map — e.g. *Destination repurposed* and *Beyond survival*
  ("an urban destination") are not attributed to a specific place.
- **"Destination Development"** is shown as its own strand because it is an official DU research interest and a dossier filter;
  the dossier's cluster labels A–F are shown on each strand. **"Environment & Development (early work)"** groups the 2012–2013
  green-economics, climate, energy and waste papers so they are not mislabelled as tourism research.
- **Phase years** are not given in the dossier; they are computed from each phase's representative works.
- **Counts** (outputs per year, per theme, per place, per collaborator) are counts of this archive, labelled as such. No citation
  metrics are shown.
- **Collaborator affiliations** are as recorded in the dossier (§20). Azizul Hassan is listed for shared outputs only, without an
  affiliation, because the dossier gives none.
- **Project role:** the dossier lists the PI and Co-I but not Dr. Rahman's role, so none is stated.
- **Book object** on Home/Books is an original typographic design, not the publisher's cover.
- **Map** marker positions are indicative (approximate regional centroids); St. Martin's Island is below the 1:50m coastline
  resolution and is shown as a marker only.
- **Privacy:** only the institutional email and address are published.

## v1.5.1 strings that changed
`scripts/qa/content_diff.py` rendered v1.5.1 and v2.0 and searched every v1.5.1 text node (484) across the whole new site.
Strings not found verbatim are UI labels or formats that were redesigned, or summaries replaced by fuller dossier text:
- Section labels ("01 / Research", "Selected scholarship", "Research in motion", "About / Profile" …) and button labels.
- Year ranges such as "2015–2019" → exact dates ("10 February 2015 – 29 May 2019").
- Short publication "case" labels ("Bangladesh · 500 respondents · IPA", "Innovation + SMEs" …) → the dossier's setting,
  method and keyword fields, which carry the same facts.
- One-line MBA/BBA summaries → the full course lists from the official CV.
- Short award / engagement lines → the dossier's fuller wording.
- The About paragraph "His scholarship explores …" duplicated the biography's second and third paragraphs and was removed.
- The publication-type filter "Research / Book-Chapter" and the decade select → type chips (journal, book, chapter, conference)
  plus theme, place and order filters.
- Statements reinstated after the first comparison: the trajectory sentence ("The research trajectory moves from …"), the journey
  line ("From management studies to tourism scholarship, doctoral research and destination governance."), and the cluster tags
  "Institutional response", "Stakeholders", "Destination intelligence", "Digital adoption".

## Before publishing
Re-check per dossier §31: exact DU title, project status/completion, any newly published or in-press papers, profile URLs, and
whether to display Google Scholar metrics (only with a retrieval date, if at all).
