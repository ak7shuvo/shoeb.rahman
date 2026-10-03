import "./globals.css";
import type { Metadata, Viewport } from "next";
import SiteHeader from "../components/SiteHeader";
import Footer from "../components/Footer";
import BackToTop from "../components/BackToTop";
import JsonLd from "../components/JsonLd";
import { display, text, mono } from "./fonts";
import { BASE_URL, OG_IMAGE, SHOULD_INDEX, SITE_NAME } from "../lib/site";
import { profile } from "../lib/data";

const title = `${SITE_NAME} — Tourism Governance & Destination Research, University of Dhaka`;
const description = "Academic portfolio of Dr. Muhammad Shoeb-Ur-Rahman, Associate Professor of Tourism and Hospitality Management, University of Dhaka: tourism governance, sustainable destinations, community wellbeing and resilience in Bangladesh.";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: { default: title, template: `%s | ${SITE_NAME}` },
  description,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  keywords: ["Muhammad Shoeb-Ur-Rahman", "tourism governance", "sustainable tourism", "co-management", "community wellbeing", "tourism resilience", "destination development", "Bangladesh tourism", "University of Dhaka", "Tourism and Hospitality Management"],
  alternates: { canonical: "/" },
  openGraph: { title, description, type: "profile", url: "/", siteName: SITE_NAME, locale: "en", images: [OG_IMAGE] },
  twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE.url] },
  formatDetection: { telephone: false, address: false, email: false },
  // Preview deployments and the example.com placeholder are never indexed.
  robots: SHOULD_INDEX ? undefined : { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F2F0E9" },
    { media: "(prefers-color-scheme: dark)", color: "#0D1618" },
  ],
};

// Before first paint: (1) apply a stored theme choice, (2) enable reveal styles only when JS runs, and give up
// after 2.5 s if the motion module never starts so a script failure can never hide content.
const boot = `(function(d){var r=d.documentElement;try{var t=localStorage.getItem('msr-theme');if(t==='light'||t==='dark')r.dataset.theme=t}catch(e){}r.classList.add('js');setTimeout(function(){if(!r.classList.contains('motion-ready'))r.classList.remove('js')},2500)})(document)`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${text.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        {/* Inline and synchronous on purpose: it must run before first paint (next/script defers inline beforeInteractive code). */}
        <script dangerouslySetInnerHTML={{ __html: boot }} />
      </head>
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <JsonLd data={{ "@context": "https://schema.org", "@type": "WebSite", name: SITE_NAME, url: BASE_URL, inLanguage: "en", about: { "@type": "Person", name: profile.name } }} />
        <div className="progress" aria-hidden="true"><span data-scroll-progress="" /></div>
        <SiteHeader />
        <main id="main" tabIndex={-1}>{children}</main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
