import Link from "next/link";
import {
  ShieldCheck,
  TrendingUp,
  Scale,
  Users,
  Search,
  KeyRound,
  FileCheck2,
  Coins,
  Landmark,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Gavel,
} from "lucide-react";

export const metadata = {
  title: "How It Works | AuctionIQ",
  description:
    "From statutory notice to possession with clarity. Understand the 6-step bank auction process, tools, and pricing plans.",
};

export default function HowItWorksPage() {
  return (
    <div>
      {/* 1. BESPOKE HERO BANNER WITH SIGNATURE MESH GRADIENT */}
      <section className="relative overflow-hidden bg-[#06101E] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(197,160,89,0.18),rgba(255,255,255,0))] bg-gradient-to-br from-[#06101E] via-[#0B1E38] to-[#040913] py-16 text-white sm:py-20">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#C5A059]/30 bg-[#C5A059]/10 px-3.5 py-1 text-xs font-semibold tracking-wider uppercase text-[#D4AF37] backdrop-blur-sm">
              <Gavel className="h-3.5 w-3.5 text-[#D4AF37]" />
              <span>STATUTORY ACQUISITION ROADMAP</span>
            </div>

            <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-white leading-[1.08]">
              From Statutory Notice to Possession — With{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E5C17B] via-[#F5E6B8] to-[#C5A059]">
                Institutional Clarity.
              </span>
            </h1>

            <p className="text-base sm:text-lg leading-relaxed text-white/80 font-normal">
              A rigorous, empirical methodology designed to eliminate legal ambiguities, audit unrecorded society maintenance encumbrances, and secure 15-day balance settlement bridge capital across Indian bank auctions.
            </p>

            {/* Feature Badges Strip with Lucide Icons */}
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-semibold text-white/90">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 backdrop-blur-sm shadow-xs">
                <ShieldCheck className="h-3.5 w-3.5 text-[#D4AF37]" />
                <span>Verified SARFAESI Filings</span>
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 backdrop-blur-sm shadow-xs">
                <TrendingUp className="h-3.5 w-3.5 text-[#D4AF37]" />
                <span>Circle Rate Spreads</span>
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 backdrop-blur-sm shadow-xs">
                <Scale className="h-3.5 w-3.5 text-[#D4AF37]" />
                <span>Title &amp; CERSAI Diligence</span>
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 backdrop-blur-sm shadow-xs">
                <Users className="h-3.5 w-3.5 text-[#D4AF37]" />
                <span>Dedicated Capital Desk</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. A SIMPLE 6-STEP PROCESS */}
      <section className="py-16 border-b border-charcoal/10 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#C5A059]">
                DISCIPLINED METHODOLOGY
              </span>
              <h2 className="mt-1 font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl">
                The 6-Step Bank Auction Protocol
              </h2>
              <p className="mt-1.5 text-xs sm:text-sm text-charcoal/70 max-w-2xl">
                Go from identifying distressed assets to debt-free ownership with complete statutory compliance at each stage.
              </p>
            </div>
            <Link
              className="inline-flex items-center gap-1.5 rounded-xl border border-navy/30 bg-white px-4 py-2 text-xs font-bold text-navy shadow-xs transition-all duration-200 hover:bg-navy/5 active:scale-[0.98]"
              href="/explore"
            >
              <span>Explore Active Inventory</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                step: "01",
                icon: Search,
                title: "Statutory Opportunity Discovery",
                desc: "Filter through verified public notices issued under SARFAESI Section 13(4) and DRT recovery proclamations across 25+ public and private banks.",
              },
              {
                step: "02",
                icon: TrendingUp,
                title: "Circle Rate & Valuation Modeling",
                desc: "Benchmark auction reserve limits against IGR Maharashtra Ready Reckoner circle rates and recent sub-registrar registered transaction deeds.",
              },
              {
                step: "03",
                icon: KeyRound,
                title: "SmartDoor Physical Inspection",
                desc: "Book physical property inspections with biometric eKYC digital access passes and authorized recovery officer escort coordination.",
              },
              {
                step: "04",
                icon: FileCheck2,
                title: "Title & Society Arrears Audit",
                desc: "Examine CERSAI security charge filings, court lis pendens, unrecorded society maintenance arrears, and statutory municipal dues.",
              },
              {
                step: "05",
                icon: Coins,
                title: "Pre-Auction Capital Structuring",
                desc: "Confirm borrowing capacity and secure pre-auction bridge financing to meet the mandatory 15-day balance payment deadline.",
              },
              {
                step: "06",
                icon: Landmark,
                title: "Statutory Bidding & Handover",
                desc: "Bid with pre-planned ceiling discipline on official e-auction portals, receive the registered Sale Certificate, and take peaceful possession.",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  className="relative flex flex-col justify-between rounded-2xl border border-charcoal/10 bg-white p-6 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.06)] transition-all duration-200 hover:border-[#C5A059] hover:shadow-[0_20px_35px_-5px_rgba(15,23,42,0.12)] hover:-translate-y-1"
                  key={item.step}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-black text-[#C5A059] tracking-wider">{item.step}</span>
                      <div className="grid h-9 w-9 place-items-center rounded-lg border border-charcoal/10 bg-navy/5 text-[#C5A059] shadow-2xs">
                        <Icon className="h-4 w-4" />
                      </div>
                    </div>
                    <h3 className="mt-4 font-display text-base font-bold text-navy tracking-tight">{item.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-charcoal/70">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. TRANSPARENT MEMBERSHIP TIERS */}
      <section className="py-16 bg-[#f8fafc]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#C5A059]">
              SUBSCRIPTION INTELLIGENCE
            </span>
            <h2 className="mt-1 font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              Choose Your Intelligence Tier
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-charcoal/70">
              Institutional pricing built for first-time retail bidders, active capital allocators, and multi-family offices.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Plan 1: Free Explorer */}
            <div className="flex flex-col justify-between rounded-2xl border border-charcoal/10 bg-white p-7 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.06)] transition-all duration-200 hover:shadow-md">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-charcoal/60">Free Tier</span>
                <h3 className="mt-2 font-display text-xl font-bold text-navy">Free Explorer</h3>
                <div className="my-4">
                  <span className="font-display text-4xl font-extrabold text-navy">₹0</span>
                  <span className="text-xs text-charcoal/50"> / forever</span>
                </div>
                <p className="text-xs text-charcoal/65">For education, practice bidding, and general market discovery.</p>

                <ul className="mt-6 space-y-3 text-xs text-charcoal/75">
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-navy shrink-0" /> Browse statutory auction listings (summary)</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-navy shrink-0" /> Basic Ready Reckoner spread indicators</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-navy shrink-0" /> Interactive auction simulator sandbox</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-navy shrink-0" /> Educational auction legal handbook</li>
                  <li className="flex items-center gap-2 text-charcoal/40"><XCircle className="h-4 w-4 text-charcoal/30 shrink-0" /> Complete title search &amp; CERSAI reports</li>
                  <li className="flex items-center gap-2 text-charcoal/40"><XCircle className="h-4 w-4 text-charcoal/30 shrink-0" /> SmartDoor physical inspection pass</li>
                </ul>
              </div>

              <Link
                className="mt-8 inline-flex w-full min-h-11 items-center justify-center rounded-xl border border-navy/30 bg-white px-4 text-xs font-bold text-navy shadow-xs transition-all duration-200 hover:bg-navy/5 active:scale-[0.98]"
                href="/auth/signup"
              >
                Get Started
              </Link>
            </div>

            {/* Plan 2: Essential */}
            <div className="flex flex-col justify-between rounded-2xl border border-charcoal/15 bg-white p-7 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.06)] transition-all duration-200 hover:border-[#C5A059] hover:shadow-md">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#C5A059]">Active Buyers</span>
                <h3 className="mt-2 font-display text-xl font-bold text-navy">Essential</h3>
                <div className="my-4">
                  <span className="font-display text-4xl font-extrabold text-navy">₹850</span>
                  <span className="text-xs text-charcoal/50"> / month + GST</span>
                </div>
                <p className="text-xs text-charcoal/65">For individual buyers actively evaluating live bank auctions.</p>

                <ul className="mt-6 space-y-3 text-xs text-charcoal/80">
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#C5A059] shrink-0" /> Complete auction listings database</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#C5A059] shrink-0" /> <strong>5 SmartDoor inspection passes / mo</strong></li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#C5A059] shrink-0" /> Circle rate comparables &amp; cost calculator</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#C5A059] shrink-0" /> Auction bridge loan eligibility check</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#C5A059] shrink-0" /> Standard customer support desk</li>
                </ul>
              </div>

              <Link
                className="mt-8 inline-flex w-full min-h-11 items-center justify-center rounded-xl bg-[#C5A059] px-4 text-xs font-bold text-white shadow-sm transition-all duration-200 hover:bg-[#b08e4c] hover:shadow-md active:scale-[0.98]"
                href="/auth/signup"
              >
                Choose Essential
              </Link>
            </div>

            {/* Plan 3: Premium (Most Popular) */}
            <div className="relative flex flex-col justify-between rounded-2xl border-2 border-[#C5A059] bg-white p-7 shadow-[0_20px_40px_-10px_rgba(197,160,89,0.3)]">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-[#C5A059] px-3.5 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider shadow-sm">
                Most Popular
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#C5A059]">High Conviction</span>
                <h3 className="mt-2 font-display text-xl font-bold text-navy">Premium</h3>
                <div className="my-4">
                  <span className="font-display text-4xl font-extrabold text-navy">₹1,250</span>
                  <span className="text-xs text-charcoal/50"> / month + GST</span>
                </div>
                <p className="text-xs text-charcoal/65">For serious investors requiring comprehensive title clarity.</p>

                <ul className="mt-6 space-y-3 text-xs text-charcoal/80">
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" /> Everything in Essential</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" /> <strong>Unlimited SmartDoor inspection passes</strong></li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" /> Advanced market yield modeling</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" /> All-in acquisition cost audit engine</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" /> Full title search &amp; filing review</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" /> Priority 15-day bridge financing desk</li>
                </ul>
              </div>

              <Link
                className="mt-8 inline-flex w-full min-h-11 items-center justify-center rounded-xl bg-navy px-4 text-xs font-bold text-white shadow-md transition-all duration-200 hover:bg-navy/90 hover:shadow-lg active:scale-[0.98]"
                href="/auth/signup"
              >
                Choose Premium
              </Link>
            </div>

            {/* Plan 4: HNI / Investor Desk */}
            <div className="flex flex-col justify-between rounded-2xl border border-charcoal/10 bg-white p-7 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.06)] transition-all duration-200 hover:border-navy hover:shadow-md">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-charcoal/60">Institutional</span>
                <h3 className="mt-2 font-display text-xl font-bold text-navy">HNI Desk</h3>
                <div className="my-4">
                  <span className="font-display text-3xl font-bold text-navy">Bespoke</span>
                  <span className="text-xs text-charcoal/50"> / mandate basis</span>
                </div>
                <p className="text-xs text-charcoal/65">For HNIs, family offices, and institutions managing ₹10 Cr+ capital.</p>

                <ul className="mt-6 space-y-3 text-xs text-charcoal/80">
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#C5A059] shrink-0" /> Curated off-market distress deal flow</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#C5A059] shrink-0" /> In-depth DRT special situations analysis</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#C5A059] shrink-0" /> Dedicated Senior Mandate Partner</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#C5A059] shrink-0" /> Complete cross-collateral asset structuring</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#C5A059] shrink-0" /> Direct Recovery Officer representation</li>
                </ul>
              </div>

              <Link
                className="mt-8 inline-flex w-full min-h-11 items-center justify-center rounded-xl border border-navy/30 bg-white px-4 text-xs font-bold text-navy shadow-xs transition-all duration-200 hover:bg-navy/5 active:scale-[0.98]"
                href="/hni"
              >
                Request a Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
