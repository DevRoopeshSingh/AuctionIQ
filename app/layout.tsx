import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { siteMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = siteMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-ivory text-charcoal antialiased">
        <a className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-white focus:p-3" href="#main-content">
          Skip to content
        </a>
        <header className="border-b border-charcoal/10 bg-ivory">
          <div className="mx-auto flex min-h-16 max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
            <Link aria-label="AuctionIQ home" className="font-display text-xl font-bold text-navy" href="/">
              AuctionIQ
            </Link>
            <nav aria-label="Main navigation" className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
              <Link href="/#explore">Explore Auctions</Link>
              <Link href="/#simulator">Simulator</Link>
              <Link href="/#academy">Academy</Link>
              <Link href="/#plans">Plans</Link>
              <Link href="/#about">About</Link>
              <Link href="/login">Log in</Link>
              <Link className="rounded-md bg-navy px-3 py-2 font-semibold text-white" href="/signup">Sign up</Link>
            </nav>
          </div>
        </header>
        <main id="main-content">{children}</main>
        <footer className="mt-16 border-t border-charcoal/10 bg-white">
          <div className="mx-auto grid max-w-7xl gap-5 px-4 py-8 text-sm sm:grid-cols-2 sm:px-6">
            <div>
              <p className="font-display text-lg font-semibold text-navy">AuctionIQ</p>
              <p className="mt-2 max-w-md text-charcoal/75">Independent intelligence for informed bank-auction property decisions.</p>
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-2 sm:justify-end">
              <Link href="/legal/terms">Terms</Link>
              <Link href="/legal/privacy">Privacy</Link>
              <Link href="/legal/refund">Refund</Link>
              <Link href="/legal/community-guidelines">Community Guidelines</Link>
              <Link href="/legal/contact">Grievance &amp; support</Link>
            </div>
            <p className="text-xs text-charcoal/60 sm:col-span-2">Legal and company details will be published after review.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
