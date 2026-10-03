"use client";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return (
    <section className="nf" aria-labelledby="err-t">
      <div className="wrap stack" style={{ "--gap": "1.5rem" } as React.CSSProperties}>
        <p className="sh-k"><span className="n">Error</span><span className="bar" aria-hidden="true" style={{ transform: "none" }} /><span>Unexpected problem</span></p>
        <h1 className="t-h1" id="err-t">Something went wrong.</h1>
        <p className="t-lead">An unexpected problem stopped this page from loading. You can try again, or return to the home page.</p>
        <div className="btn-row"><button type="button" className="btn" onClick={() => reset()}><span>Try again</span></button><Link className="btn btn-ghost" href="/"><span>Back to home</span></Link></div>
      </div>
    </section>
  );
}
