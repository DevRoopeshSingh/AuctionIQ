"use client";

import { useState, type FormEvent } from "react";
import { authClient, AuthNotProvisionedError } from "@/lib/auth/client";
import { Mail, Lock, ArrowRight, ShieldCheck, AlertCircle } from "lucide-react";

type AuthAction = "signIn" | "signUp" | "resetPassword";

export function AuthForm({ action }: { action: AuthAction }) {
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isReset = action === "resetPassword";

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setMessage(null);
    setIsError(false);

    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "");
    try {
      if (action === "resetPassword") {
        await authClient.resetPassword(email);
        setMessage("Password reset protocol initiated. Please check your secure inbox.");
      } else if (action === "signIn") {
        await authClient.signIn({ email, password: String(data.get("password") ?? "") });
        setMessage("Authentication verified. Redirecting to your investor portfolio...");
      } else {
        await authClient.signUp({ email, password: String(data.get("password") ?? "") });
        setMessage("Account created. Please complete statutory KYC identity verification.");
      }
    } catch (error) {
      setIsError(true);
      setMessage(
        error instanceof AuthNotProvisionedError
          ? error.message
          : "Authentication service is currently restricted during sandbox demonstration."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form className="space-y-4" onSubmit={submit}>
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-charcoal/70 mb-1.5" htmlFor="auth-email">
          Registered Email Address
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-charcoal/40">
            <Mail className="h-4 w-4" />
          </div>
          <input
            id="auth-email"
            className="min-h-12 w-full rounded-xl border border-charcoal/20 bg-white pl-10 pr-4 text-sm text-navy placeholder:text-charcoal/40 transition-colors focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/10"
            autoComplete="email"
            name="email"
            placeholder="investor@familyoffice.in"
            required
            type="email"
          />
        </div>
      </div>

      {!isReset && (
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-charcoal/70 mb-1.5" htmlFor="auth-password">
            Access Security Password
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-charcoal/40">
              <Lock className="h-4 w-4" />
            </div>
            <input
              id="auth-password"
              className="min-h-12 w-full rounded-xl border border-charcoal/20 bg-white pl-10 pr-4 text-sm text-navy placeholder:text-charcoal/40 transition-colors focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/10"
              autoComplete={action === "signUp" ? "new-password" : "current-password"}
              minLength={8}
              name="password"
              placeholder="••••••••••••"
              required
              type="password"
            />
          </div>
          {action === "signUp" && (
            <p className="mt-1.5 text-[11px] text-charcoal/50">
              Minimum 8 characters with alphanumeric credentials.
            </p>
          )}
        </div>
      )}

      <button
        className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-navy px-5 font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#0a182c] active:scale-[0.98] disabled:opacity-60"
        disabled={isLoading}
        type="submit"
      >
        <span>
          {isLoading
            ? "Verifying Credentials..."
            : action === "signUp"
            ? "Establish Institutional Account"
            : action === "signIn"
            ? "Authenticate & Access Terminal"
            : "Send Password Reset Link"}
        </span>
        <ArrowRight className="h-4 w-4" />
      </button>

      {message && (
        <div
          role="status"
          aria-live="polite"
          className={`flex items-start gap-2.5 rounded-xl border p-3.5 text-xs font-medium ${
            isError
              ? "border-amber-200 bg-amber-50/80 text-amber-900"
              : "border-emerald-200 bg-emerald-50/80 text-emerald-900"
          }`}
        >
          {isError ? (
            <AlertCircle className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />
          ) : (
            <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
          )}
          <span>{message}</span>
        </div>
      )}
    </form>
  );
}
