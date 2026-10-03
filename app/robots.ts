import type { MetadataRoute } from "next";
import { BASE_URL, SHOULD_INDEX } from "../lib/site";

export default function robots(): MetadataRoute.Robots {
  // Placeholder URL or preview/dev build: block everything, no sitemap.
  if (!SHOULD_INDEX) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
