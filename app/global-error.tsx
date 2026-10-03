"use client";

import "./globals.css";

// Replaces the root layout when it fails, so it must render its own <html> and <body>.
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  void error;
  return (
    <html lang="en">
      <body>
        <title>Something went wrong</title>
        <meta name="robots" content="noindex, nofollow" />
        <main id="main" className="nf">
          <div className="wrap stack" style={{ "--gap": "1.5rem" } as React.CSSProperties}>
            <p className="meta">Error</p>
            <h1 className="t-h1">Something went wrong.</h1>
            <p className="t-lead">An unexpected problem stopped the site from loading. You can try again, or return to the home page.</p>
            <div className="btn-row">
              <button type="button" className="btn" onClick={() => reset()}><span>Try again</span></button>
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- the router may be unavailable here */}
              <a className="btn btn-ghost" href="/"><span>Back to home</span></a>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
