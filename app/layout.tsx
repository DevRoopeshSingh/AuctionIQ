import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { siteMetadata } from "@/lib/site-metadata";
import { Search, ChevronDown, Users, Mail, Building2 } from "lucide-react";

export const metadata: Metadata = siteMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-ivory text-charcoal antialiased">
        <a
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-white focus:p-3"
          href="#main-content"
        >
          Skip to content
        </a>

        {/* Global Navigation Header (Clean, Light, Simple & Luxury matching image) */}
        <header className="sticky top-0 z-40 border-b border-charcoal/10 bg-white/95 backdrop-blur-md shadow-xs">
          <div className="mx-auto flex min-h-18 max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6">
            {/* Logo with Subtitle */}
            <Link aria-label="AuctionIQ home" className="group flex flex-col transition-transform duration-200 active:scale-[0.98]" href="/">
              <span className="font-display text-2xl font-black tracking-tight text-navy">
                Auction<span className="text-[#C5A059]">IQ</span>
              </span>
              <span className="text-[8.5px] font-bold tracking-[0.22em] uppercase text-charcoal/60 -mt-1">
                DISCOVER · ANALYSE · INVEST
              </span>
            </Link>

            {/* Navigation Bar */}
            <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-6 text-[13px] font-medium text-charcoal/80">
              <Link className="flex items-center gap-0.5 transition-colors duration-200 hover:text-navy" href="/explore">
                Properties <ChevronDown className="h-3 w-3 opacity-60" />
              </Link>
              <Link className="transition-colors duration-200 hover:text-navy" href="/how-it-works">
                How It Works
              </Link>
              <Link className="transition-colors duration-200 hover:text-navy" href="/finance">
                Auction Loan
              </Link>
              <Link className="flex items-center gap-0.5 transition-colors duration-200 hover:text-navy" href="/simulator">
                Tools <ChevronDown className="h-3 w-3 opacity-60" />
              </Link>
              <Link className="flex items-center gap-0.5 transition-colors duration-200 hover:text-navy" href="/#academy">
                Learn <ChevronDown className="h-3 w-3 opacity-60" />
              </Link>
              <Link className="transition-colors duration-200 hover:text-navy" href="/hni">
                HNI / Investor Desk
              </Link>
              <Link className="transition-colors duration-200 hover:text-navy" href="/about">
                About
              </Link>
            </nav>

            {/* Right Action Buttons */}
            <div className="flex items-center gap-3">
              <Link
                aria-label="Search properties"
                className="grid h-9 w-9 place-items-center rounded-full text-charcoal/70 transition-all duration-200 hover:bg-charcoal/5 hover:text-navy active:scale-95"
                href="/explore"
              >
                <Search className="h-4 w-4" />
              </Link>
              <Link
                className="hidden sm:inline-flex min-h-9 items-center justify-center rounded-md border border-charcoal/25 bg-white px-4 text-xs font-semibold text-navy shadow-xs transition-all duration-200 hover:bg-charcoal/5 active:scale-[0.98]"
                href="/auth/login"
              >
                Login
              </Link>
              <Link
                className="inline-flex min-h-9 items-center justify-center rounded-md bg-[#C5A059] px-4 text-xs font-bold text-white shadow-sm transition-all duration-200 hover:bg-[#b08e4c] hover:shadow-md active:scale-[0.98]"
                href="/auth/signup"
              >
                Get Started
              </Link>
            </div>
          </div>

          {/* Mobile Navigation Sub-Bar */}
          <div className="flex lg:hidden overflow-x-auto border-t border-charcoal/10 px-4 py-2 gap-4 text-xs font-semibold text-charcoal/75 whitespace-nowrap bg-ivory/50">
            <Link className="transition-colors duration-200 hover:text-navy" href="/explore">Properties</Link>
            <Link className="transition-colors duration-200 hover:text-navy" href="/how-it-works">How It Works</Link>
            <Link className="transition-colors duration-200 hover:text-navy" href="/finance">Auction Loan</Link>
            <Link className="transition-colors duration-200 hover:text-navy" href="/hni">HNI Desk</Link>
            <Link className="transition-colors duration-200 hover:text-navy" href="/about">About</Link>
            <Link className="transition-colors duration-200 hover:text-navy" href="/simulator">Simulator</Link>
          </div>
        </header>

        <main id="main-content">{children}</main>

        {/* Global Footer (Exact Match to User's Uploaded Mockup) */}
        <footer className="mt-20 border-t border-charcoal/10 bg-navy text-white">
          {/* Bottom Journey Banner with Panoramic Skyline Overlay */}
          <div className="relative overflow-hidden border-b border-white/10 bg-gradient-to-r from-[#06101E] via-[#0B1E38] to-[#040913]">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
              <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-center">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#C5A059]">
                    BE A PART OF OUR JOURNEY
                  </span>
                  <h3 className="mt-2 font-display text-2xl font-bold sm:text-3xl text-white">
                    Let&apos;s Build a More Transparent Real Estate Market.
                  </h3>
                  <p className="mt-2 text-xs leading-6 text-white/70 max-w-xl">
                    Join thousands of buyers and investors who are discovering opportunities with AuctionIQ.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      className="inline-flex min-h-10 items-center justify-center rounded-md bg-[#C5A059] px-5 text-xs font-bold text-white shadow-sm transition-all duration-200 hover:bg-[#b08e4c] hover:shadow-md active:scale-[0.98]"
                      href="/auth/signup"
                    >
                      Get Started
                    </Link>
                    <Link
                      className="inline-flex min-h-10 items-center justify-center rounded-md border border-white/30 bg-white/10 px-5 text-xs font-semibold text-white shadow-xs transition-all duration-200 hover:bg-white/20 active:scale-[0.98]"
                      href="/legal/contact"
                    >
                      Contact Our Team
                    </Link>
                  </div>
                </div>

                {/* Quick Action Links Card (Matching Image) */}
                <div className="rounded-xl border border-white/15 bg-white/5 p-6 backdrop-blur-sm text-xs space-y-3.5 shadow-sm">
                  <Link className="flex items-center gap-2.5 text-white/90 hover:text-[#C5A059] transition-colors duration-200" href="/auth/signup">
                    <Users className="h-4 w-4 text-[#C5A059] shrink-0" />
                    <span className="font-semibold">Join Our Community</span>
                  </Link>
                  <Link className="flex items-center gap-2.5 text-white/90 hover:text-[#C5A059] transition-colors duration-200" href="/hni">
                    <Mail className="h-4 w-4 text-[#C5A059] shrink-0" />
                    <span className="font-semibold">Partner With Us</span>
                  </Link>
                  <Link className="flex items-center gap-2.5 text-white/90 hover:text-[#C5A059] transition-colors duration-200" href="/legal/contact">
                    <Building2 className="h-4 w-4 text-[#C5A059] shrink-0" />
                    <span className="font-semibold">List With AuctionIQ</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Links & Copyright */}
          <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-between gap-4 px-4 py-6 text-xs text-white/60 sm:px-6">
            <p>© {new Date().getFullYear()} AuctionIQ Platform. Independent intelligence for bank auctions.</p>
            <div className="flex flex-wrap gap-4">
              <Link className="hover:text-white" href="/legal/terms">Terms</Link>
              <Link className="hover:text-white" href="/legal/privacy">Privacy</Link>
              <Link className="hover:text-white" href="/legal/refund">Refund Policy</Link>
              <Link className="hover:text-white" href="/legal/community-guidelines">Community Guidelines</Link>
              <Link className="hover:text-white" href="/legal/contact">Grievance &amp; Support</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
