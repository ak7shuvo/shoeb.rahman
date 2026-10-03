import type { Metadata } from "next";

const PLACEHOLDER_URL = "https://example.com";

function resolveBaseUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const vercelProd = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  let url = explicit || (vercelProd ? `https://${vercelProd}` : PLACEHOLDER_URL);
  if (!/^https?:\/\//i.test(url)) url = `https://${url}`;
  return url.replace(/\/+$/, "");
}

/** Canonical site origin. Set NEXT_PUBLIC_SITE_URL (see .env.example); no code edit needed. */
export const BASE_URL = resolveBaseUrl();

/** True while the site still points at the example.com placeholder. */
export const IS_PLACEHOLDER_URL = BASE_URL === PLACEHOLDER_URL;

/** Vercel production deployment, or a production build on any other Node host. */
export const IS_PRODUCTION = process.env.VERCEL_ENV
  ? process.env.VERCEL_ENV === "production"
  : process.env.NODE_ENV === "production";

/** Search engines may index only real production deployments with a real URL. */
export const SHOULD_INDEX = IS_PRODUCTION && !IS_PLACEHOLDER_URL;

export const SITE_NAME = "Dr. Muhammad Shoeb-Ur-Rahman";

/** Static social card in /public (generated from the design system; see README). */
export const OG_IMAGE = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: `${SITE_NAME} — Associate Professor, Tourism and Hospitality Management, University of Dhaka`,
};

/** Per-route metadata with matching canonical, Open Graph and Twitter (large image card). */
export function pageMetadata(title: string, description: string, path: string): Metadata {
  const full = `${title} | ${SITE_NAME}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title: full, description, type: "website", url: path, siteName: SITE_NAME, images: [OG_IMAGE] },
    twitter: { card: "summary_large_image", title: full, description, images: [OG_IMAGE.url] },
  };
}
