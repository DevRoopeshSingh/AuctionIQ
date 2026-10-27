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
    "From finding a bank auction to getting your keys. Understand the simple 6-step process, tools, and pricing plans.",
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
              <span>STEP-BY-STEP BUYER GUIDE</span>
            </div>

            <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-white leading-[1.08]">
              From Finding an Auction to Getting Your Keys —{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E5C17B] via-[#F5E6B8] to-[#C5A059]">
                Safe, Simple &amp; Clear.
              </span>
            </h1>

            <p className="text-base sm:text-lg leading-relaxed text-white/80 font-normal">
              Bank auctions let you buy property at 20% to 35% below market price. We make the entire process easy: we check legal ownership, reveal pending society bills, and help you get fast loans so you can buy with total confidence.
            </p>

            {/* Feature Badges Strip with Lucide Icons */}
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-semibold text-white/90">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 backdrop-blur-sm shadow-xs">
                <ShieldCheck className="h-3.5 w-3.5 text-[#D4AF37]" />
                <span>Verified Bank Notices</span>
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 backdrop-blur-sm shadow-xs">
                <TrendingUp className="h-3.5 w-3.5 text-[#D4AF37]" />
                <span>Real Price Comparisons</span>
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 backdrop-blur-sm shadow-xs">
                <Scale className="h-3.5 w-3.5 text-[#D4AF37]" />
                <span>30-Year Title Checks</span>
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 backdrop-blur-sm shadow-xs">
                <Users className="h-3.5 w-3.5 text-[#D4AF37]" />
                <span>Fast 15-Day Loan Help</span>
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
                HOW IT WORKS
              </span>
              <h2 className="mt-1 font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl">
                The 6-Step Bank Auction Guide
              </h2>
              <p className="mt-1.5 text-xs sm:text-sm text-charcoal/70 max-w-2xl">
                Here is exactly how you go from searching for a property to holding the keys in your hand.
              </p>
            </div>
            <Link
              className="inline-flex items-center gap-1.5 rounded-xl border border-navy/30 bg-white px-4 py-2 text-xs font-bold text-navy shadow-xs transition-all duration-200 hover:bg-navy/5 active:scale-[0.98]"
              href="/explore"
            >
              <span>Browse Active Properties</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                step: "01",
                icon: Search,
                title: "1. Discover Verified Properties",
                desc: "Browse authentic auction notices published by 25+ major public and private banks under the SARFAESI Act, updated daily.",
              },
              {
                step: "02",
                icon: TrendingUp,
                title: "2. Compare Market Prices & Savings",
                desc: "Check the bank's starting price (Reserve Price) against government Ready Reckoner circle rates and recent sales in the same building.",
              },
              {
                step: "03",
                icon: KeyRound,
                title: "3. Visit the Property with SmartDoor",
                desc: "Book a physical inspection in person. Get a digital entry pass on your phone and inspect the actual condition of the house before you bid.",
              },
              {
                step: "04",
                icon: FileCheck2,
                title: "4. Full Legal Title & Society Dues Check",
                desc: "We check 30 years of ownership history, CERSAI loan charges, court cases, and pending society maintenance bills so you face no hidden costs.",
              },
              {
                step: "05",
                icon: Coins,
                title: "5. Arrange Your 15-Day Auction Loan",
                desc: "Banks require the remaining 75% balance within 15 days of winning. We arrange fast auction loans so your money is ready on time.",
              },
              {
                step: "06",
                icon: Landmark,
                title: "6. Bid Online & Collect Your Keys",
                desc: "Bid on the official bank portal with a planned budget ceiling. When you win, receive the bank's Sale Certificate and take physical possession.",
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
              CLEAR &amp; TRANSPARENT PLANS
            </span>
            <h2 className="mt-1 font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              Choose the Plan That Fits Your Needs
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-charcoal/70">
              Honest pricing designed for first-time home buyers, active investors, and wealth desks.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Plan 1: Free Explorer */}
            <div className="flex flex-col justify-between rounded-2xl border border-charcoal/10 bg-white p-7 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.06)] transition-all duration-200 hover:shadow-md">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-charcoal/60">Free Plan</span>
                <h3 className="mt-2 font-display text-xl font-bold text-navy">Free Explorer</h3>
                <div className="my-4">
                  <span className="font-display text-4xl font-extrabold text-navy">₹0</span>
                  <span className="text-xs text-charcoal/50"> / forever</span>
                </div>
                <p className="text-xs text-charcoal/65">For learning the basics, searching properties, and practice bidding.</p>

                <ul className="mt-6 space-y-3 text-xs text-charcoal/75">
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-navy shrink-0" /> Browse bank auction property summaries</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-navy shrink-0" /> Basic price comparison indicators</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-navy shrink-0" /> Interactive auction simulator sandbox</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-navy shrink-0" /> Free bank auction learning guides</li>
                  <li className="flex items-center gap-2 text-charcoal/40"><XCircle className="h-4 w-4 text-charcoal/30 shrink-0" /> Detailed 30-year title reports</li>
                  <li className="flex items-center gap-2 text-charcoal/40"><XCircle className="h-4 w-4 text-charcoal/30 shrink-0" /> SmartDoor physical visit pass</li>
                </ul>
              </div>

              <Link
                className="mt-8 inline-flex w-full min-h-11 items-center justify-center rounded-xl border border-navy/30 bg-white px-4 text-xs font-bold text-navy shadow-xs transition-all duration-200 hover:bg-navy/5 active:scale-[0.98]"
                href="/auth/signup"
              >
                Get Started Free
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
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#C5A059] shrink-0" /> Full property details &amp; bank notices</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#C5A059] shrink-0" /> <strong>5 SmartDoor property visit passes / month</strong></li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#C5A059] shrink-0" /> Circle rate comparables &amp; cost calculator</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#C5A059] shrink-0" /> 15-day auction loan eligibility check</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#C5A059] shrink-0" /> Dedicated customer support team</li>
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
                <span className="text-xs font-bold uppercase tracking-wider text-[#C5A059]">Complete Safety</span>
                <h3 className="mt-2 font-display text-xl font-bold text-navy">Premium</h3>
                <div className="my-4">
                  <span className="font-display text-4xl font-extrabold text-navy">₹1,250</span>
                  <span className="text-xs text-charcoal/50"> / month + GST</span>
                </div>
                <p className="text-xs text-charcoal/65">For serious buyers who want complete 30-year legal safety.</p>

                <ul className="mt-6 space-y-3 text-xs text-charcoal/80">
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" /> Everything in Essential</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" /> <strong>Unlimited SmartDoor property visit passes</strong></li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" /> Complete 30-year title &amp; CERSAI legal reports</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" /> Society maintenance &amp; house tax dues audit</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" /> Safe bidding ceiling planner (never overpay)</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" /> Priority 15-day auction loan assistance</li>
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
                <span className="text-xs font-bold uppercase tracking-wider text-charcoal/60">Large Deals</span>
                <h3 className="mt-2 font-display text-xl font-bold text-navy">HNI Desk</h3>
                <div className="my-4">
                  <span className="font-display text-3xl font-bold text-navy">Custom</span>
                  <span className="text-xs text-charcoal/50"> / mandate basis</span>
                </div>
                <p className="text-xs text-charcoal/65">For family offices and high-net-worth investors investing ₹5 Cr+.</p>

                <ul className="mt-6 space-y-3 text-xs text-charcoal/80">
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#C5A059] shrink-0" /> Curated luxury homes, offices &amp; land parcels</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#C5A059] shrink-0" /> Direct coordination with Bank Recovery Officers</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#C5A059] shrink-0" /> Dedicated Senior Relationship Partner</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#C5A059] shrink-0" /> Senior advocate title checks &amp; DRT verification</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#C5A059] shrink-0" /> End-to-end possession &amp; registration support</li>
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
