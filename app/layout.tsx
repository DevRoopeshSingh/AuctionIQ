import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { siteMetadata } from "@/lib/site-metadata";
import { SiteHeader } from "@/components/navigation/site-header";
import { Users, Mail, Building2 } from "lucide-react";

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

        {/* Global Navigation Header (Active State Highlight, No Down Arrows) */}
        <SiteHeader />

        <main id="main-content">{children}</main>

        {/* Global Footer (Exact Match to User's Uploaded Mockup) */}
        <footer className="mt-20 border-t border-charcoal/10 bg-navy text-white">
          {/* Bottom Journey Banner with Panoramic Skyline Overlay */}
          <div className="relative overflow-hidden border-b border-white/10 bg-gradient-to-r from-[#06101E] via-[#0B1E38] to-[#040913]">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
              <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-center">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#C5A059]">
                    JOIN THOUSANDS OF INDIAN HOME BUYERS
                  </span>
                  <h3 className="mt-2 font-display text-2xl font-bold sm:text-3xl text-white">
                    Find, Inspect & Win Bank Auction Homes Safely.
                  </h3>
                  <p className="mt-2 text-xs leading-6 text-white/70 max-w-xl">
                    Get 30-year legal reports, schedule in-person SmartDoor visits, and secure fast 15-day bank auction loans.
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
            <p>© {new Date().getFullYear()} AuctionIQ. Making bank property auctions safe, simple, and transparent across India.</p>
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
