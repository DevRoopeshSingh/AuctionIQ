"use client";

import { useEffect } from "react";
import Link from "next/link";
import { reportSentryException } from "@/lib/observability/sentry";
import { AlertTriangle, RotateCcw, ArrowLeft, ShieldAlert } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    reportSentryException(error);
  }, [error]);

  return (
    <main className="min-h-[80vh] flex items-center justify-center bg-[#FDFBF7] px-4 py-16 text-charcoal">
      <div className="w-full max-w-lg rounded-2xl border border-charcoal/10 bg-white p-8 sm:p-10 text-center shadow-[0_20px_50px_-10px_rgba(15,23,42,0.08)]">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 border border-amber-200 text-amber-600">
          <AlertTriangle className="h-7 w-7" />
        </div>

        <h1 className="mt-5 font-display text-2xl font-bold tracking-tight text-navy sm:text-3xl">
          Terminal Exception Encountered
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-charcoal/70">
          An unexpected interruption occurred while processing this transaction screen. Our engineering telemetry desk has captured the exception.
        </p>

        {error.digest && (
          <p className="mt-3 rounded-lg bg-slate-50 p-2 font-mono text-[11px] text-charcoal/60">
            Audit Digest Reference: {error.digest}
          </p>
        )}

        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={reset}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-navy px-6 font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#0a182c] active:scale-[0.98]"
          >
            <RotateCcw className="h-4 w-4 text-[#D4AF37]" />
            <span>Retry Operation</span>
          </button>

          <Link
            href="/"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-charcoal/20 bg-white px-6 font-semibold text-navy shadow-sm transition-all duration-200 hover:bg-slate-50 active:scale-[0.98]"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Terminal</span>
          </Link>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 border-t border-charcoal/10 pt-4 text-xs text-charcoal/50">
          <ShieldAlert className="h-4 w-4 text-slate-400" />
          <span>Sentry Automated Observability Active</span>
        </div>
      </div>
    </main>
  );
}
