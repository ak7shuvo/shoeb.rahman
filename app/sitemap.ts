import type { MetadataRoute } from "next";
import { BASE_URL } from "../lib/site";
import { nav } from "../lib/nav";

const builtAt = new Date(); // evaluated at build time

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", ...nav.map((n) => n.href)].map((r) => ({ url: `${BASE_URL}${r}`, lastModified: builtAt, changeFrequency: r === "/publications" || r === "" ? "monthly" : "yearly", priority: r === "" ? 1 : r === "/publications" || r === "/research" ? 0.9 : 0.7 }));
}
