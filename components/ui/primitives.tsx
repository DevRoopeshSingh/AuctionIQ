"use client";

import type {
  ButtonHTMLAttributes,
  HTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
} from "react";

type Tone = "primary" | "secondary" | "accent";

export function Button({
  tone = "primary",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { tone?: Tone }) {
  return (
    <button
      className={`inline-flex min-h-11 items-center justify-center rounded-md px-4 py-2 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
        tone === "primary"
          ? "bg-navy text-white hover:bg-navy/90"
          : tone === "accent"
            ? "bg-gold text-charcoal hover:bg-gold/90"
            : "border border-navy bg-transparent text-navy hover:bg-navy/5"
      } ${className}`}
      {...props}
    />
  );
}

export function Input({ className = "", ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`min-h-11 w-full rounded-md border border-charcoal/25 bg-white px-3 text-charcoal placeholder:text-charcoal/55 ${className}`}
      {...props}
    />
  );
}

export function Card({ className = "", ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <section
      className={`rounded-lg border border-charcoal/10 bg-white p-5 shadow-sm ${className}`}
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
    neutral: "bg-navy/10 text-navy",
    success: "bg-success/10 text-success",
    warning: "bg-warning/10 text-warning",
    error: "bg-error/10 text-error",
  };
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${colors[tone]}`}>
      {children}
    </span>
  );
}

export function Table({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-charcoal/15">
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
      className="fixed inset-0 z-50 grid place-items-center bg-charcoal/60 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        aria-labelledby="modal-title"
        aria-modal="true"
        className="w-full max-w-lg rounded-lg bg-ivory p-6 shadow-xl"
        role="dialog"
      >
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="font-display text-xl" id="modal-title">{title}</h2>
          <button aria-label="Close dialog" className="rounded p-2" onClick={onClose} type="button">
            ×
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
      className={`rounded-md border bg-white px-4 py-3 text-sm shadow ${
        tone === "error" ? "border-error/40" : "border-charcoal/15"
      }`}
      role="status"
    >
      {children}
    </div>
  );
}
