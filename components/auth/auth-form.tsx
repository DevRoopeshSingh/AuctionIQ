"use client";

import { useState, type FormEvent } from "react";
import { authClient, AuthNotProvisionedError } from "@/lib/auth/client";

type AuthAction = "signIn" | "signUp" | "resetPassword";

export function AuthForm({ action }: { action: AuthAction }) {
  const [message, setMessage] = useState("Authentication is unavailable until A17 is provisioned.");
  const isReset = action === "resetPassword";

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "");
    try {
      if (action === "resetPassword") await authClient.resetPassword(email);
      else if (action === "signIn") await authClient.signIn({ email, password: String(data.get("password") ?? "") });
      else await authClient.signUp({ email, password: String(data.get("password") ?? "") });
    } catch (error) {
      setMessage(error instanceof AuthNotProvisionedError ? error.message : "Authentication is not available yet.");
    }
  }

  return (
    <form className="grid gap-4" onSubmit={submit}>
      <label className="grid gap-1 text-sm font-medium text-charcoal">
        Email
        <input className="rounded-lg border border-charcoal/20 px-3 py-2" autoComplete="email" name="email" required type="email" />
      </label>
      {!isReset && (
        <label className="grid gap-1 text-sm font-medium text-charcoal">
          Password
          <input className="rounded-lg border border-charcoal/20 px-3 py-2" autoComplete={action === "signUp" ? "new-password" : "current-password"} minLength={8} name="password" required type="password" />
        </label>
      )}
      <button className="rounded-lg bg-navy px-4 py-2 font-semibold text-white" type="submit">
        {action === "signUp" ? "Create account" : action === "signIn" ? "Sign in" : "Send reset link"}
      </button>
      <p aria-live="polite" className="text-sm text-charcoal/70">{message}</p>
    </form>
  );
}
