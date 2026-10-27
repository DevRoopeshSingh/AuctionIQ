"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  MapPin,
  Building,
  Building2,
  Compass,
  Landmark,
  ShieldCheck,
  TrendingUp,
  Calculator,
  KeyRound,
  Coins,
  Crown,
  ArrowRight,
  CheckCircle2,
  Shield,
  Percent,
} from "lucide-react";
import { ExplorePropertiesSection } from "@/components/inspections/explore-properties-section";

export default function Home() {
  const router = useRouter();
  const [heroSearch, setHeroSearch] = useState("");

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      router.push(`/explore?q=${encodeURIComponent(heroSearch.trim())}`);
    } else {
      router.push("/explore");
    }
  };

  return (
    <div>
      {/* 1. BESPOKE HERO SECTION: Refined mesh gradient, elevated typography & authoritative copy */}
      <section className="relative overflow-hidden bg-[#06101E] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(197,160,89,0.18),rgba(255,255,255,0))] bg-gradient-to-br from-[#06101E] via-[#0B1E38] to-[#040913] text-white">
        {/* Background Panoramic Sea Link Image with Rich Gradient Tint */}
        <div className="absolute inset-0 z-0">
          <Image
            alt="Mumbai Bandra-Worli Sea Link cable-stayed bridge at golden sunset dusk"
            className="object-cover object-center opacity-30 mix-blend-luminosity"
            fill
            priority
            sizes="100vw"
            src="/images/sealink_skyline_hero.jpg"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#06101E] via-[#06101E]/90 to-[#06101E]/60" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[1.25fr_0.95fr] lg:items-center">
            {/* Left Hero Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#C5A059]/30 bg-[#C5A059]/10 px-3.5 py-1 text-xs font-semibold tracking-wider uppercase text-[#D4AF37] backdrop-blur-sm">
                <ShieldCheck className="h-3.5 w-3.5 text-[#D4AF37]" />
                <span>SARFAESI &amp; DRT AUCTION INTELLIGENCE</span>
              </div>

              <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-white leading-[1.08] sm:leading-[1.06]">
                Acquire Bank-Auction Assets with{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E5C17B] via-[#F5E6B8] to-[#C5A059]">
                  Institutional Clarity.
                </span>
              </h1>

              <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-white/80 font-normal">
                Independent intelligence mapping verified SARFAESI statutory notices, DRT public auctions, and Ready Reckoner circle rates. We uncover the true acquisition cost—factoring unpaid society maintenance, physical possession status, and stamp duties—before you commit capital.
              </p>

              {/* Search Bar with Sophisticated Depth & Lucide Icon */}
              <form
                className="max-w-2xl rounded-2xl bg-white/95 p-2 shadow-[0_20px_50px_rgba(0,0,0,0.35)] backdrop-blur-sm ring-1 ring-black/5 hover:ring-black/15 focus-within:ring-2 focus-within:ring-[#C5A059] flex flex-col sm:flex-row gap-2 transition-all duration-200"
                onSubmit={handleHeroSearch}
              >
                <div className="relative flex-1 flex items-center pl-3">
                  <Search className="h-4 w-4 text-charcoal/45 mr-2.5 shrink-0" />
                  <input
                    aria-label="Search auctions by micro-market, bank, or notice"
                    className="w-full text-xs sm:text-sm text-navy placeholder:text-charcoal/50 focus:outline-none bg-transparent"
                    onChange={(e) => setHeroSearch(e.target.value)}
                    placeholder="Search by micro-market, bank (e.g., SBI, BOB), or asset type..."
                    type="text"
                    value={heroSearch}
                  />
                </div>
                <button
                  className="rounded-xl bg-[#C5A059] px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-md transition-all duration-200 hover:bg-[#b08e4c] hover:shadow-lg active:scale-[0.98]"
                  type="submit"
                >
                  Search Auctions
                </button>
              </form>

              {/* Locality & Asset Type Chips with Lucide Icons */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                {[
                  { label: "Mumbai", icon: MapPin, href: "/explore?city=Mumbai" },
                  { label: "Navi Mumbai", icon: MapPin, href: "/explore?city=Navi Mumbai" },
                  { label: "Thane", icon: MapPin, href: "/explore?q=Thane" },
                  { label: "Residential", icon: Building, href: "/explore?type=Residential" },
                  { label: "Commercial", icon: Building2, href: "/explore?type=Commercial" },
                  { label: "Land / Plot", icon: Compass, href: "/explore?type=Land" },
                  { label: "All Scheduled Banks", icon: Landmark, href: "/explore" },
                ].map(({ label, icon: Icon, href }) => (
                  <Link
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 font-medium text-white/90 backdrop-blur-sm shadow-xs transition-all duration-200 hover:bg-white/20 hover:text-white hover:border-white/30 active:scale-95"
                    href={href}
                    key={label}
                  >
                    <Icon className="h-3 w-3 text-[#D4AF37]" />
                    <span>{label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Right Feature Card: Elevated Breathing Room, Padding & High-Trust Tone */}
            <div className="rounded-2xl border border-white/15 bg-[#071324]/85 p-8 sm:p-9 lg:p-10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] backdrop-blur-xl ring-1 ring-white/10 text-white">
              <div className="border-b border-white/10 pb-4">
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#D4AF37]">
                  INSTITUTIONAL TRUST BENCHMARK
                </span>
                <h2 className="mt-1 font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Why Seasoned Investors Rely on AuctionIQ
                </h2>
                <p className="mt-1 text-xs text-white/65 leading-relaxed font-normal">
                  Proprietary due diligence and regulatory clarity for Indian distressed bank assets.
                </p>
              </div>

              <div className="mt-6 space-y-5 sm:space-y-6 text-xs">
                <div className="flex items-start gap-4">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/5 text-[#D4AF37] shadow-xs">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white/95">Verified SARFAESI &amp; DRT Notices</h3>
                    <p className="text-white/65 mt-0.5 leading-relaxed font-normal">
                      Authenticated directly against official bank recovery officer proclamations and statutory DRT registries.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/5 text-[#D4AF37] shadow-xs">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white/95">Market Intelligence &amp; Circle Rates</h3>
                    <p className="text-white/65 mt-0.5 leading-relaxed font-normal">
                      Compare reserve prices against prevailing Ready Reckoner circle rates and recent sub-registrar registered deeds.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/5 text-[#D4AF37] shadow-xs">
                    <Calculator className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white/95">True Acquisition Cost Accounting</h3>
                    <p className="text-white/65 mt-0.5 leading-relaxed font-normal">
                      Audit unrecorded society maintenance dues, municipal tax arrears, and stamp duty obligations before bidding.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/5 text-[#D4AF37] shadow-xs">
                    <KeyRound className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white/95">SmartDoor Physical Inspection</h3>
                    <p className="text-white/65 mt-0.5 leading-relaxed font-normal">
                      Direct on-site walkthroughs scheduled with biometric eKYC digital access passes and authorized officer escorts.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/5 text-[#D4AF37] shadow-xs">
                    <Coins className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white/95">15-Day Balance Settlement Capital</h3>
                    <p className="text-white/65 mt-0.5 leading-relaxed font-normal">
                      Pre-auction underwriting and bridge funding to fulfill strict 15-day statutory bank payment windows.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/5 text-[#D4AF37] shadow-xs">
                    <Crown className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white/95">Private Family Office &amp; HNI Desk</h3>
                    <p className="text-white/65 mt-0.5 leading-relaxed font-normal">
                      Curated distress portfolios, cross-collateral structuring, and dedicated legal representation for family offices.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST METRICS & FEATURED BANKS STRIP */}
      <section className="border-y border-charcoal/10 bg-white py-7 shadow-xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-6 md:grid-cols-[1.25fr_1fr] md:items-center">
            {/* 4 Trust Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center sm:text-left">
              <div>
                <span className="font-display text-2xl font-black text-navy sm:text-3xl tracking-tight">5,000+</span>
                <p className="text-[11px] font-semibold text-charcoal/60 uppercase tracking-wider mt-0.5">Verified Filings</p>
              </div>
              <div>
                <span className="font-display text-2xl font-black text-navy sm:text-3xl tracking-tight">25+</span>
                <p className="text-[11px] font-semibold text-charcoal/60 uppercase tracking-wider mt-0.5">Scheduled Banks</p>
              </div>
              <div>
                <span className="font-display text-2xl font-black text-navy sm:text-3xl tracking-tight">₹1,000 Cr+</span>
                <p className="text-[11px] font-semibold text-charcoal/60 uppercase tracking-wider mt-0.5">Asset Book Value</p>
              </div>
              <div>
                <span className="font-display text-2xl font-black text-navy sm:text-3xl tracking-tight">3,200+</span>
                <p className="text-[11px] font-semibold text-charcoal/60 uppercase tracking-wider mt-0.5">Active Investors</p>
              </div>
            </div>

            {/* Featured Banks strip */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t md:border-t-0 md:border-l border-charcoal/10 pt-4 md:pt-0 md:pl-8 text-xs">
              <span className="font-bold text-charcoal/60 uppercase text-[10px] tracking-wider">
                Partner Portals &amp; Banks:
              </span>
              <div className="flex flex-wrap items-center gap-2 font-semibold text-navy">
                <span className="rounded-md border border-charcoal/10 bg-navy/5 px-2.5 py-1">SBI</span>
                <span className="rounded-md border border-charcoal/10 bg-navy/5 px-2.5 py-1">HDFC Bank</span>
                <span className="rounded-md border border-charcoal/10 bg-navy/5 px-2.5 py-1">ICICI Bank</span>
                <span className="rounded-md border border-charcoal/10 bg-navy/5 px-2.5 py-1">Bank of Baroda</span>
                <span className="rounded-md border border-charcoal/10 bg-navy/5 px-2.5 py-1">Union Bank</span>
              </div>
              <Link className="inline-flex items-center gap-1 font-bold text-[#C5A059] transition-colors duration-200 hover:text-[#b08e4c]" href="/explore">
                <span>View All Banks</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THREE FEATURE/AUDIENCE SHOWCASE CARDS: Depth, subtle shadows, authoritative copy */}
      <section className="py-16 mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#C5A059]">
            BESPOKE INVESTOR SOLUTIONS
          </span>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight text-navy">
            Engineered for Retail Bidders and Family Offices Alike
          </h2>
          <p className="mt-2 text-sm text-charcoal/70">
            Select your investment profile to access tailored due diligence reports, physical inspections, and capital structures.
          </p>
        </div>

        <div className="grid gap-7 lg:grid-cols-3">
          {/* Card 1: For Individual Buyers */}
          <div className="flex flex-col justify-between rounded-2xl border border-charcoal/10 bg-white p-7 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.06)] transition-all duration-200 hover:border-[#C5A059] hover:shadow-[0_20px_35px_-5px_rgba(15,23,42,0.12)] hover:-translate-y-1">
            <div>
              <span className="inline-block rounded-full bg-navy/10 px-3 py-1 text-xs font-bold text-navy">
                Retail &amp; First-Time Bidders
              </span>
              <h3 className="mt-4 font-display text-xl font-bold text-navy">Individual Buyer Desk</h3>
              <p className="mt-2 text-xs leading-relaxed text-charcoal/70">
                Access curated bank-auction homes, compare reserve pricing against sub-registrar deeds, and navigate statutory legal steps with zero confusion.
              </p>

              <div className="my-6 rounded-xl border border-charcoal/10 bg-[#f8fafc] p-4 text-xs grid grid-cols-2 gap-2.5">
                <span className="flex items-center gap-1.5 text-charcoal/80 font-medium">
                  <CheckCircle2 className="h-3.5 w-3.5 text-navy shrink-0" /> Verified Notices
                </span>
                <span className="flex items-center gap-1.5 text-charcoal/80 font-medium">
                  <CheckCircle2 className="h-3.5 w-3.5 text-navy shrink-0" /> Market Spreads
                </span>
                <span className="flex items-center gap-1.5 text-charcoal/80 font-medium">
                  <CheckCircle2 className="h-3.5 w-3.5 text-navy shrink-0" /> All-In Cost Audit
                </span>
                <span className="flex items-center gap-1.5 text-charcoal/80 font-medium">
                  <CheckCircle2 className="h-3.5 w-3.5 text-navy shrink-0" /> SmartDoor Visits
                </span>
              </div>
            </div>

            <Link
              className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl bg-[#C5A059] px-4 text-xs font-bold text-white shadow-sm transition-all duration-200 hover:bg-[#b08e4c] hover:shadow-md active:scale-[0.98]"
              href="/explore?type=Residential"
            >
              <span>Explore Residential Auctions</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Card 2: For Investors & HNIs */}
          <div className="flex flex-col justify-between rounded-2xl border border-charcoal/10 bg-white p-7 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.06)] transition-all duration-200 hover:border-[#C5A059] hover:shadow-[0_20px_35px_-5px_rgba(15,23,42,0.12)] hover:-translate-y-1">
            <div>
              <span className="inline-block rounded-full bg-gold/20 px-3 py-1 text-xs font-bold text-navy">
                Family Offices &amp; HNIs
              </span>
              <h3 className="mt-4 font-display text-xl font-bold text-navy">Private Wealth &amp; HNI Desk</h3>
              <p className="mt-2 text-xs leading-relaxed text-charcoal/70">
                Curated high-value distress situations, commercial yielding real estate, and DRT special situations with dedicated transaction mandates.
              </p>

              <div className="my-6 rounded-xl border border-charcoal/10 bg-[#f8fafc] p-4 text-xs grid grid-cols-2 gap-2.5">
                <span className="flex items-center gap-1.5 text-charcoal/80 font-medium">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#C5A059] shrink-0" /> Curated Deal Flow
                </span>
                <span className="flex items-center gap-1.5 text-charcoal/80 font-medium">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#C5A059] shrink-0" /> Title &amp; DRT Audits
                </span>
                <span className="flex items-center gap-1.5 text-charcoal/80 font-medium">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#C5A059] shrink-0" /> Off-Market Portfolios
                </span>
                <span className="flex items-center gap-1.5 text-charcoal/80 font-medium">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#C5A059] shrink-0" /> Mandate Execution
                </span>
              </div>
            </div>

            <Link
              className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl bg-navy px-4 text-xs font-bold text-white shadow-sm transition-all duration-200 hover:bg-navy/90 hover:shadow-md active:scale-[0.98]"
              href="/hni"
            >
              <span>Explore HNI Advisory Desk</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Card 3: Market Intelligence Graphic Card */}
          <div className="flex flex-col justify-between rounded-2xl border-2 border-[#C5A059]/80 bg-gradient-to-br from-white via-white to-gold/10 p-7 shadow-[0_8px_25px_-5px_rgba(197,160,89,0.2)] transition-all duration-200 hover:shadow-[0_20px_35px_-5px_rgba(197,160,89,0.3)] hover:-translate-y-1">
            <div>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-bold text-emerald-800">
                  <TrendingUp className="h-3.5 w-3.5 text-emerald-700" />
                  <span>Market Valuation Engine</span>
                </span>
                <span className="text-xs font-extrabold text-emerald-700">23% Discount Spread</span>
              </div>

              <h3 className="mt-4 font-display text-xl font-bold text-navy">Empirical Pricing Spread</h3>
              <p className="mt-2 text-xs leading-relaxed text-charcoal/70">
                Contrast auction reserve limits directly with IGR Maharashtra Ready Reckoner circle rates and secondary transaction registries.
              </p>

              {/* Live Metric Box with Depth */}
              <div className="my-6 rounded-xl border border-charcoal/15 bg-white p-4 shadow-sm text-xs space-y-2.5">
                <div className="flex justify-between items-center text-charcoal/65">
                  <span className="font-medium">Prevailing Market Valuation:</span>
                  <span className="font-mono text-sm font-semibold text-charcoal/50 line-through">₹1.95 Cr</span>
                </div>
                <div className="flex justify-between items-center font-bold text-navy">
                  <span>Auction Reserve Benchmark:</span>
                  <span className="font-mono text-base font-extrabold text-navy">₹1.50 Cr</span>
                </div>
                <div className="flex justify-between items-center text-[11px] border-t border-charcoal/10 pt-2 text-emerald-700 font-semibold">
                  <span className="flex items-center gap-1">
                    <Percent className="h-3 w-3" />
                    <span>Calculated Acquisition Spread:</span>
                  </span>
                  <span>-23% (₹45 Lakhs Under Market)</span>
                </div>
              </div>
            </div>

            <Link
              className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl border border-navy/30 bg-white px-4 text-xs font-bold text-navy shadow-xs transition-all duration-200 hover:bg-navy/5 active:scale-[0.98]"
              href="/how-it-works"
            >
              <span>Examine Valuation Methodology</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. FEATURED BANK AUCTION PROPERTIES (Interactive Explore Section) */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <ExplorePropertiesSection />
      </div>

      {/* 5. VIRTUAL SIMULATOR BANNER */}
      <section className="border-t border-charcoal/10 bg-gradient-to-b from-[#f8fafc] to-[#edf2f7] py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-navy/10 px-3.5 py-1 text-xs font-bold text-navy">
            <Shield className="h-3.5 w-3.5 text-navy" />
            <span>Zero Financial Risk Sandbox</span>
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-navy sm:text-4xl tracking-tight">
            Simulate Live Bidding Before Entering Bank Auctions
          </h2>
          <p className="mt-3 text-sm text-charcoal/75 max-w-2xl mx-auto leading-relaxed">
            Experience realistic bid increment timers, counter-bid pressure, and reserve price dynamics in our algorithmic auction simulator before participating in statutory e-auctions.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3.5">
            <Link
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-navy px-6 text-xs font-bold text-white shadow-md transition-all duration-200 hover:bg-navy/90 hover:shadow-lg active:scale-[0.98]"
              href="/simulator"
            >
              <span>Launch Auction Simulator</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-navy/30 bg-white px-6 text-xs font-bold text-navy shadow-xs transition-all duration-200 hover:bg-navy/5 active:scale-[0.98]"
              href="/how-it-works"
            >
              <span>Review the 6-Step Acquisition Protocol</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
