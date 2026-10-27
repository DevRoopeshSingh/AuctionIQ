"use client";

import type {
  ButtonHTMLAttributes,
  HTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
} from "react";
import { X } from "lucide-react";

type Tone = "primary" | "secondary" | "accent";

export function Button({
  tone = "primary",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { tone?: Tone }) {
  return (
    <button
      className={`inline-flex min-h-11 items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 ${
        tone === "primary"
          ? "bg-navy text-white hover:bg-[#0a182c] shadow-sm"
          : tone === "accent"
            ? "bg-[#D4AF37] text-navy font-bold hover:bg-[#c5a033] shadow-sm"
            : "border border-navy/20 bg-white text-navy hover:bg-slate-50 shadow-sm"
      } ${className}`}
      {...props}
    />
  );
}

export function Input({ className = "", ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`min-h-11 w-full rounded-xl border border-charcoal/20 bg-white px-3.5 text-sm text-navy placeholder:text-charcoal/45 transition-colors focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/10 ${className}`}
      {...props}
    />
  );
}

export function Card({ className = "", ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <section
      className={`rounded-2xl border border-charcoal/10 bg-white p-6 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.06)] ${className}`}
      {...props}
    />
  );
}

export function Badge({
  tone = "neutral",
  children,
}: {
  tone?: "neutral" | "success" | "warning" | "error";
  children: ReactNode;
}) {
  const colors = {
    neutral: "bg-navy/10 text-navy border-navy/15",
    success: "bg-emerald-50 text-emerald-800 border-emerald-200",
    warning: "bg-amber-50 text-amber-900 border-amber-200",
    error: "bg-rose-50 text-rose-800 border-rose-200",
  };
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${colors[tone]}`}>
      {children}
    </span>
  );
}

export function Table({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-charcoal/15 bg-white shadow-sm">
      <table className="w-full border-collapse text-left text-sm">{children}</table>
    </div>
  );
}

export function Modal({
  title,
  children,
  onClose,
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-[#06101E]/70 backdrop-blur-sm p-4 overflow-y-auto"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        aria-labelledby="modal-title"
        aria-modal="true"
        className="w-full max-w-lg rounded-2xl border border-charcoal/10 bg-[#FAF9F6] p-6 sm:p-7 shadow-2xl transition-all"
        role="dialog"
      >
        <div className="mb-4 flex items-center justify-between gap-4 border-b border-charcoal/10 pb-4">
          <h2 className="font-display text-xl font-bold text-navy" id="modal-title">
            {title}
          </h2>
          <button
            aria-label="Close dialog"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-charcoal/60 transition-colors hover:bg-charcoal/10 hover:text-navy"
            onClick={onClose}
            type="button"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        {children}
      </section>
    </div>
  );
}

export function Toast({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "success" | "warning" | "error";
}) {
  return (
    <div
      aria-live={tone === "error" ? "assertive" : "polite"}
      className={`rounded-xl border bg-white px-4 py-3 text-sm shadow-[0_4px_20px_-2px_rgba(15,23,42,0.08)] ${
        tone === "error" ? "border-rose-300 text-rose-900" : "border-charcoal/15 text-charcoal"
      }`}
      role="status"
    >
      {children}
    </div>
  );
}
