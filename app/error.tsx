"use client";

import { useEffect } from "react";
import { reportSentryException } from "@/lib/observability/sentry";

export default function ErrorBoundary({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    reportSentryException(error);
  }, [error]);

  return (
    <main className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="font-display text-2xl font-semibold text-navy">Something went wrong</h1>
      <p className="mt-3 text-charcoal/70">Please try again. If the problem continues, come back later.</p>
      <button className="mt-6 rounded-lg bg-navy px-4 py-2 font-semibold text-white" onClick={reset} type="button">
        Try again
      </button>
    </main>
  );
}
