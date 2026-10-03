import type { Metadata } from "next";
import { Suspense } from "react";
import Masthead from "../../components/Masthead";
import PubItem from "../../components/PubItem";
import PubExplorer, { type Entry } from "../../components/PubExplorer";
import OutputChart from "../../components/OutputChart";
import Reveal from "../../components/Reveal";
import { pageMetadata } from "../../lib/site";
import { places, publications, themes, typeLabelPlural, type PubType } from "../../lib/data";
import { searchText, sortedPubs, typeCounts, firstYear, lastYear } from "../../lib/format";

export const metadata: Metadata = pageMetadata(
  "Publications",
  "Searchable archive of journal articles, an edited Springer volume, book chapters and conference papers by Dr. Muhammad Shoeb-Ur-Rahman, with DOI links where documented.",
  "/publications"
);

const TYPES: PubType[] = ["journal", "book", "chapter", "conference"];

export default function Publications() {
  const entries: Entry[] = sortedPubs.map((p) => ({
    id: p.id, year: p.year, type: p.type, themes: p.themes, places: p.locations ?? [], text: searchText(p),
    node: <PubItem p={p} showYear={false} />,
  }));
  return (
    <>
      <Masthead
        n="02" label="Publications" path="/publications"
        title={<>The scholarly <em>record.</em></>}
        lead="Every output in the research dossier, with full author lists and publisher metadata. DOI links are included where documented; no citation metrics are shown."
        stats={[
          { label: "Outputs", value: publications.length },
          { label: "Journal articles", value: typeCounts.journal },
          { label: "Book chapters", value: typeCounts.chapter ?? 0 },
          { label: "Years", value: `${firstYear}–${lastYear}` },
        ]}
      />
      <section className="section" aria-label="Outputs over time" style={{ paddingBottom: 0 }}>
        <div className="wrap"><Reveal><OutputChart compact /></Reveal></div>
      </section>
      <section className="section" aria-label="Publication archive">
        <div className="wrap">
          <Suspense>
            <PubExplorer
              entries={entries}
              types={TYPES.map((t) => ({ value: t, label: typeLabelPlural[t] }))}
              themes={themes.map((t) => ({ value: t.id, label: t.title }))}
              places={places.map((p) => ({ value: p.id, label: p.name }))}
            />
          </Suspense>
        </div>
      </section>
    </>
  );
}
