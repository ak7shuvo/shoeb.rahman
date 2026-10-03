import type { MetadataRoute } from "next";
import { SITE_NAME } from "../lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — Academic Portfolio`,
    short_name: "Shoeb-Ur-Rahman",
    description: "Tourism governance, sustainable destination development, community wellbeing and resilience in Bangladesh.",
    start_url: "/",
    display: "browser",
    theme_color: "#F2F0E9",
    background_color: "#F2F0E9",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
