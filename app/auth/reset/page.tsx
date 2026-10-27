import Link from "next/link";
import { AuthForm } from "@/components/auth/auth-form";
import { ShieldCheck, KeyRound, ArrowLeft } from "lucide-react";

export default function ResetPage() {
  return (
    <main className="min-h-screen bg-[#FDFBF7] py-10 sm:py-16 text-charcoal">
      <div className="mx-auto max-w-lg px-4 sm:px-6">
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/auth/login"
            className="inline-flex items-center gap-2 text-xs font-semibold text-charcoal/70 transition-colors hover:text-navy sm:text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Sign In</span>
          </Link>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-600/20 bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-800">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            <span>Secure Verification</span>
          </div>
        </div>

        {/* Elevated Investor Card */}
        <div className="rounded-2xl border border-charcoal/10 bg-white p-7 sm:p-9 shadow-[0_20px_50px_-10px_rgba(15,23,42,0.08)]">
          <div className="border-b border-charcoal/10 pb-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy text-[#D4AF37]">
              <KeyRound className="h-5 w-5" />
            </div>
            <h1 className="mt-3 font-display text-2xl font-bold tracking-tight text-navy sm:text-3xl">
              Reset Security Credentials
            </h1>
            <p className="mt-1 text-xs leading-relaxed text-charcoal/70 sm:text-sm">
              Enter your registered investor email to receive an authenticated password reset link.
            </p>
          </div>

          <div className="mt-6">
            <AuthForm action="resetPassword" />
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-charcoal/10 pt-4 text-xs">
            <Link
              href="/auth/login"
              className="font-medium text-navy hover:underline"
            >
              Remember password? Sign in
            </Link>
            <Link
              href="/auth/signup"
              className="text-charcoal/60 hover:text-navy hover:underline"
            >
              Create new account
            </Link>
          </div>
        </div>

        {/* Security Reassurance */}
        <p className="mt-6 text-center text-[11px] leading-relaxed text-charcoal/50">
          Password recovery tokens expire in 15 minutes to preserve institutional portfolio security.
        </p>
      </div>
    </main>
  );
}
