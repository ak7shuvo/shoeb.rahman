const LS = new RegExp(String.fromCharCode(0x2028), "g");
const PS = new RegExp(String.fromCharCode(0x2029), "g");

/** Serialises structured data exactly as supplied; `<` and JS line separators are escaped. */
export default function JsonLd({ data }: { data: unknown }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c").replace(LS, "\\u2028").replace(PS, "\\u2029");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
