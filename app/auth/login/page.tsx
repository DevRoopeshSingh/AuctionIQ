import Link from "next/link";
import { AuthForm } from "@/components/auth/auth-form";
import { ShieldCheck, Building2, ArrowLeft } from "lucide-react";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#FDFBF7] py-10 sm:py-16 text-charcoal">
      <div className="mx-auto max-w-lg px-4 sm:px-6">
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-charcoal/70 transition-colors hover:text-navy sm:text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Terminal</span>
          </Link>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-600/20 bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-800">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            <span>256-Bit Encrypted</span>
          </div>
        </div>

        {/* Elevated Investor Card */}
        <div className="rounded-2xl border border-charcoal/10 bg-white p-7 sm:p-9 shadow-[0_20px_50px_-10px_rgba(15,23,42,0.08)]">
          <div className="border-b border-charcoal/10 pb-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy text-[#D4AF37]">
              <Building2 className="h-5 w-5" />
            </div>
            <h1 className="mt-3 font-display text-2xl font-bold tracking-tight text-navy sm:text-3xl">
              Investor Terminal Access
            </h1>
            <p className="mt-1 text-xs leading-relaxed text-charcoal/70 sm:text-sm">
              Sign in to unlock verified SARFAESI asset dossiers, smart-door digital access, and auction financing desk.
            </p>
          </div>

          {/* Quick Tab Switcher */}
          <div className="mt-5 grid grid-cols-2 rounded-xl bg-slate-100 p-1 text-xs font-semibold">
            <span className="rounded-lg bg-white py-2 text-center text-navy shadow-sm">
              Sign In
            </span>
            <Link
              href="/auth/signup"
              className="rounded-lg py-2 text-center text-charcoal/70 transition-colors hover:text-navy"
            >
              Create Account
            </Link>
          </div>

          <div className="mt-6">
            <AuthForm action="signIn" />
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-charcoal/10 pt-4 text-xs">
            <Link
              href="/auth/reset"
              className="font-medium text-navy hover:underline"
            >
              Forgot security password?
            </Link>
            <Link
              href="/auth/signup"
              className="font-semibold text-[#8A6D3B] hover:underline"
            >
              New investor? Register
            </Link>
          </div>
        </div>

        {/* Security Reassurance */}
        <p className="mt-6 text-center text-[11px] leading-relaxed text-charcoal/50">
          Access is monitored and audited in accordance with RBI and SARFAESI compliance protocols. Identity credentials are encrypted at rest.
        </p>
      </div>
    </main>
  );
}
