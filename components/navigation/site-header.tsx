"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";

interface NavItem {
  name: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { name: "Properties", href: "/explore" },
  { name: "How It Works", href: "/how-it-works" },
  { name: "Auction Loan", href: "/finance" },
  { name: "Tools", href: "/simulator" },
  { name: "Learn", href: "/academy" },
  { name: "HNI / Investor Desk", href: "/hni" },
  { name: "About", href: "/about" },
];

export function SiteHeader() {
  const pathname = usePathname();

  const isRouteActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-charcoal/10 bg-white/95 backdrop-blur-md shadow-xs">
      <div className="mx-auto flex min-h-18 max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6">
        {/* Logo with Subtitle */}
        <Link
          aria-label="AuctionIQ home"
          className="group flex flex-col transition-transform duration-200 active:scale-[0.98]"
          href="/"
        >
          <span className="font-display text-2xl font-black tracking-tight text-navy">
            Auction<span className="text-[#C5A059]">IQ</span>
          </span>
          <span className="text-[8.5px] font-bold tracking-[0.22em] uppercase text-charcoal/60 -mt-1">
            DISCOVER · ANALYSE · INVEST
          </span>
        </Link>

        {/* Navigation Bar (No down arrows, with clear active state) */}
        <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-1.5 text-[13px]">
          {NAV_ITEMS.map((item) => {
            const active = isRouteActive(item.href);
            return (
              <Link
                aria-current={active ? "page" : undefined}
                className={`relative px-3.5 py-1.5 rounded-lg transition-all duration-200 ${
                  active
                    ? "bg-navy/10 text-navy font-bold shadow-2xs"
                    : "text-charcoal/75 hover:text-navy hover:bg-charcoal/5 font-medium"
                }`}
                href={item.href}
                key={item.href}
              >
                <span>{item.name}</span>
                {active && (
                  <span className="absolute -bottom-1.5 left-3 right-3 h-[2.5px] rounded-full bg-[#C5A059]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-3">
          <Link
            aria-label="Search properties"
            className={`grid h-9 w-9 place-items-center rounded-full transition-all duration-200 active:scale-95 ${
              pathname === "/explore"
                ? "bg-navy text-white shadow-xs"
                : "text-charcoal/70 hover:bg-charcoal/5 hover:text-navy"
            }`}
            href="/explore"
          >
            <Search className="h-4 w-4" />
          </Link>
          <Link
            className={`hidden sm:inline-flex min-h-9 items-center justify-center rounded-md border px-4 text-xs font-semibold shadow-xs transition-all duration-200 active:scale-[0.98] ${
              pathname === "/auth/login"
                ? "border-navy bg-navy text-white font-bold"
                : "border-charcoal/25 bg-white text-navy hover:bg-charcoal/5"
            }`}
            href="/auth/login"
          >
            Login
          </Link>
          <Link
            className={`inline-flex min-h-9 items-center justify-center rounded-md px-4 text-xs font-bold transition-all duration-200 active:scale-[0.98] ${
              pathname === "/auth/signup"
                ? "bg-navy text-white shadow-md ring-2 ring-[#C5A059]"
                : "bg-[#C5A059] text-white shadow-sm hover:bg-[#b08e4c] hover:shadow-md"
            }`}
            href="/auth/signup"
          >
            Get Started
          </Link>
        </div>
      </div>

      {/* Mobile Navigation Sub-Bar with Active State */}
      <div className="flex lg:hidden overflow-x-auto border-t border-charcoal/10 px-4 py-2 gap-2 text-xs font-semibold whitespace-nowrap bg-ivory/50">
        {NAV_ITEMS.map((item) => {
          const active = isRouteActive(item.href);
          return (
            <Link
              aria-current={active ? "page" : undefined}
              className={`rounded-full px-3.5 py-1 transition-all ${
                active
                  ? "bg-navy text-white font-bold shadow-xs"
                  : "bg-white/80 text-charcoal/75 hover:text-navy border border-charcoal/15"
              }`}
              href={item.href}
              key={item.href}
            >
              {item.name}
            </Link>
          );
        })}
      </div>
    </header>
  );
}
