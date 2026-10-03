import { publications, phases, projects, SELF, type Publication, type PubType, type ThemeId, type LocationId } from "./data";

/** "Vol. 30(11), 2665–2685" style detail line, built only from fields that exist. */
export function detailLine(p: Publication): string {
  const parts: string[] = [];
  if (p.type === "chapter") {
    if (p.editors) parts.push(`Eds. ${p.editors}`);
    if (p.publisher) parts.push(p.publisher);
    if (p.chapter) parts.push(`Ch. ${p.chapter}`);
  } else if (p.type === "book") {
    if (p.publisher) parts.push(p.publisher);
  }
  const vi = [p.volume && `Vol. ${p.volume}`, p.issue && `(${p.issue})`].filter(Boolean).join(" ");
  if (vi) parts.push(vi.replace(" (", "("));
  if (p.pages) parts.push(`pp. ${p.pages}`);
  if (p.articleNo) parts.push(`Art. ${p.articleNo}`);
  return parts.join(" · ");
}

export const doiUrl = (doi: string) => `https://doi.org/${doi}`;

export function primaryLink(p: Publication): string | undefined {
  return p.doi ? doiUrl(p.doi) : p.url;
}

/** Plain reference string. Author names are kept exactly as recorded (no reformatting that could introduce errors). */
export function reference(p: Publication): string {
  const authors = p.authors.length > 1 ? `${p.authors.slice(0, -1).join(", ")} & ${p.authors[p.authors.length - 1]}` : p.authors[0];
  const role = p.type === "book" ? " (Eds.)" : "";
  let where = "";
  if (p.type === "chapter") where = ` In ${p.editors ? `${p.editors} (Eds.), ` : ""}${p.venue}${p.pages ? ` (pp. ${p.pages})` : ""}. ${p.publisher ?? ""}.`;
  else if (p.type === "book") where = ` ${p.publisher ?? p.venue}.`;
  else {
    const vol = p.volume ? `, ${p.volume}` : "";
    const iss = p.issue ? `(${p.issue})` : "";
    const pages = p.pages ? `, ${p.pages}` : "";
    where = ` ${p.venue}${vol}${iss}${pages}.`;
  }
  const link = primaryLink(p);
  const title = /[.!?]$/.test(p.title) ? p.title : `${p.title}.`;
  return `${authors}${role} (${p.year}). ${title}${where}${link ? ` ${link}` : ""}`.replace(/\s+\./g, ".").replace(/\.\./g, ".");
}

export const isSelf = (name: string) => name === SELF;

export function searchText(p: Publication): string {
  return [p.title, p.venue, p.publisher, p.setting, p.year, ...(p.authors ?? []), ...(p.keywords ?? []), p.summary, p.doi]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

export const years = publications.map((p) => p.year);
export const firstYear = Math.min(...years);
export const lastYear = Math.max(...years);

export function countBy<T extends string>(pick: (p: Publication) => T[]): Record<T, number> {
  const out = {} as Record<T, number>;
  for (const p of publications) for (const k of pick(p)) out[k] = (out[k] ?? 0) + 1;
  return out;
}

export const typeCounts = countBy<PubType>((p) => [p.type]);
export const themeCounts = countBy<ThemeId>((p) => p.themes);
export const locationCounts = countBy<LocationId>((p) => p.locations ?? []);

export const pubsFor = {
  theme: (t: ThemeId) => publications.filter((p) => p.themes.includes(t)).sort((a, b) => b.year - a.year),
  location: (l: LocationId) => publications.filter((p) => p.locations?.includes(l)).sort((a, b) => b.year - a.year),
  author: (names: readonly string[]) => publications.filter((p) => p.authors.some((a) => names.includes(a))),
};

/** Year span of a trajectory phase, derived from its representative works (and project start, where listed). */
export function phaseSpan(ph: (typeof phases)[number]): string {
  const ys: number[] = ph.pubs.map((id) => publications.find((p) => p.id === id)!.year);
  if ("project" in ph && ph.project) {
    const pr = projects.find((x) => x.id === ph.project);
    if (pr) ys.push(Number(pr.start.slice(-4)));
  }
  const a = Math.min(...ys), b = Math.max(...ys);
  return a === b ? String(a) : `${a}–${b}`;
}

const online = (p: Publication) => (p.online ? Date.parse(p.online) || 0 : 0);
/** Newest year first; within a year, later online-first dates first, then featured works, then title. */
export const sortedPubs = [...publications].sort((a, b) => b.year - a.year || online(b) - online(a) || (a.featured ?? 99) - (b.featured ?? 99) || a.title.localeCompare(b.title));
