"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Download,
  Crown,
  TrendingUp,
  ShieldCheck,
  Users,
  Target,
  Scale,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export default function HniDeskPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [interest, setInterest] = useState("Residential Luxury (₹10 Cr+)");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleConsultation = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div>
      {/* 1. BESPOKE LUXURY HERO WITH SIGNATURE MESH GRADIENT */}
      <section className="relative overflow-hidden bg-[#06101E] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(197,160,89,0.18),rgba(255,255,255,0))] bg-gradient-to-br from-[#06101E] via-[#0B1E38] to-[#040913] py-16 text-white sm:py-24">
        {/* Penthouse background overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            alt="Luxury modern penthouse terrace overlooking waterfront and skyline"
            className="object-cover object-center opacity-30 mix-blend-luminosity"
            fill
            priority
            sizes="100vw"
            src="/images/hni_luxury_deal.jpg"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#06101E] via-[#06101E]/90 to-[#06101E]/60" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-[1.25fr_0.95fr] lg:items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#C5A059]/30 bg-[#C5A059]/10 px-3.5 py-1 text-xs font-semibold tracking-wider uppercase text-[#D4AF37] backdrop-blur-sm">
                <Crown className="h-3.5 w-3.5 text-[#D4AF37]" />
                <span>PRIVATE CLIENT GROUP &amp; FAMILY OFFICES</span>
              </div>

              <h1 className="font-display text-4xl font-extrabold sm:text-5xl lg:text-6xl leading-[1.08] text-white">
                High-Value Bank Auction Deals for{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E5C17B] via-[#F5E6B8] to-[#C5A059]">
                  Family Offices &amp; HNIs.
                </span>
              </h1>

              <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-white/80 font-normal">
                Handpicked luxury homes, commercial buildings, and industrial plots above ₹5 Cr. We handle the entire process—from 30-year legal title checks to physical key handover and 15-day bank financing.
              </p>

              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <a
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#C5A059] px-6 text-xs font-bold text-white shadow-md transition-all duration-200 hover:bg-[#b08e4c] hover:shadow-lg active:scale-[0.98]"
                  href="#consultation"
                >
                  <span>Speak with a Senior Advisor</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
                <button
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 text-xs font-semibold text-white shadow-xs transition-all duration-200 hover:bg-white/20 active:scale-[0.98]"
                  onClick={() => alert("HNI Portfolio Overview downloaded.")}
                  type="button"
                >
                  <Download className="h-4 w-4 text-[#D4AF37]" />
                  <span>Download Portfolio Overview</span>
                </button>
              </div>
            </div>

            {/* Right Floating Feature Card with Deep Padding & Whitespace */}
            <div className="rounded-2xl border border-white/15 bg-[#071324]/85 p-8 sm:p-9 lg:p-10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] backdrop-blur-xl ring-1 ring-white/10 text-white">
              <div className="border-b border-white/10 pb-4">
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#D4AF37]">
                  EXCLUSIVE ADVISORY
                </span>
                <h2 className="mt-1 font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Services for High-Value Buyers
                </h2>
                <p className="mt-1 text-xs text-white/65 leading-relaxed font-normal">
                  End-to-end support for substantial property acquisitions.
                </p>
              </div>

              <div className="mt-6 space-y-5 sm:space-y-6 text-xs">
                <div className="flex items-start gap-4">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/5 text-[#D4AF37] shadow-xs">
                    <Crown className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white/95">Luxury Deals Above ₹5 Cr</h3>
                    <p className="text-white/65 mt-0.5 leading-relaxed font-normal">
                      Sea-facing penthouses, independent bungalows, office floors, and industrial land parcels.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/5 text-[#D4AF37] shadow-xs">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white/95">Accurate Valuation &amp; Rental Returns</h3>
                    <p className="text-white/65 mt-0.5 leading-relaxed font-normal">
                      We compare government circle rates with actual neighbor sale deeds so you never overpay.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/5 text-[#D4AF37] shadow-xs">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white/95">Complete Legal Verification &amp; Keys</h3>
                    <p className="text-white/65 mt-0.5 leading-relaxed font-normal">
                      Private property walkthroughs, 30-year sub-registrar search reports, and physical key handover.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/5 text-[#D4AF37] shadow-xs">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white/95">Dedicated Senior Relationship Partner</h3>
                    <p className="text-white/65 mt-0.5 leading-relaxed font-normal">
                      One senior advisor handles your lawyer coordination, auction bidding, and bank paperwork.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FOUR KEY METRICS BANNER */}
      <section className="py-10 border-b border-charcoal/10 bg-white shadow-xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-2 gap-6 text-center sm:grid-cols-4 sm:text-left">
            <div className="border-r border-charcoal/10 last:border-r-0 pr-4">
              <span className="font-display text-3xl sm:text-4xl font-extrabold text-navy">₹5 Cr–₹100 Cr</span>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-charcoal/60">Target Ticket Size</p>
            </div>
            <div className="border-r border-charcoal/10 last:border-r-0 pr-4">
              <span className="font-display text-3xl sm:text-4xl font-extrabold text-navy">18%–28%</span>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-charcoal/60">Below Market Value</p>
            </div>
            <div className="border-r border-charcoal/10 last:border-r-0 pr-4">
              <span className="font-display text-3xl sm:text-4xl font-extrabold text-navy">100%</span>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-charcoal/60">Verified Legal Filings</p>
            </div>
            <div>
              <span className="font-display text-3xl sm:text-4xl font-extrabold text-navy">48 Hours</span>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-charcoal/60">Direct Advisor Response</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FOUR ADVISORY CAPABILITIES */}
      <section className="py-16 bg-[#f8fafc]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#C5A059]">
              OUR EXPERTISE
            </span>
            <h2 className="mt-1 font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              Tailored for Serious Investors &amp; Family Offices
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-charcoal/70">
              Clear valuations and institutional safety checks designed for high-value properties.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 text-xs">
            <div className="rounded-2xl border border-charcoal/10 bg-white p-7 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.06)] transition-all duration-200 hover:border-[#C5A059] hover:shadow-lg hover:-translate-y-1">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-navy/5 text-[#C5A059] shadow-2xs">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-display text-base font-bold text-navy">Targeted Deal Alerts</h3>
              <p className="mt-1.5 text-charcoal/70 leading-relaxed font-normal">We alert you first when bank auctions matching your exact budget and location criteria are announced.</p>
            </div>

            <div className="rounded-2xl border border-charcoal/10 bg-white p-7 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.06)] transition-all duration-200 hover:border-[#C5A059] hover:shadow-lg hover:-translate-y-1">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-navy/5 text-[#C5A059] shadow-2xs">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-display text-base font-bold text-navy">Circle Rate &amp; Price Checks</h3>
              <p className="mt-1.5 text-charcoal/70 leading-relaxed font-normal">We verify official circle rates and recent registration deeds so you know the exact real value before bidding.</p>
            </div>

            <div className="rounded-2xl border border-charcoal/10 bg-white p-7 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.06)] transition-all duration-200 hover:border-[#C5A059] hover:shadow-lg hover:-translate-y-1">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-navy/5 text-[#C5A059] shadow-2xs">
                <Scale className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-display text-base font-bold text-navy">Senior Legal Review</h3>
              <p className="mt-1.5 text-charcoal/70 leading-relaxed font-normal">Direct engagement with experienced property advocates and government-approved valuation experts.</p>
            </div>

            <div className="rounded-2xl border border-charcoal/10 bg-white p-7 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.06)] transition-all duration-200 hover:border-[#C5A059] hover:shadow-lg hover:-translate-y-1">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-navy/5 text-[#C5A059] shadow-2xs">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-display text-base font-bold text-navy">100% Confidentiality &amp; NDA</h3>
              <p className="mt-1.5 text-charcoal/70 leading-relaxed font-normal">Discreet bidding options, proxy bidding assistance, and private settlement execution protected by strict NDAs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ASSET CLASSES */}
      <section className="py-16 border-b border-charcoal/10 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#C5A059]">
                OPPORTUNITIES
              </span>
              <h2 className="mt-1 font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl">
                Curated Properties by Category
              </h2>
            </div>
            <Link className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C5A059] hover:underline" href="/explore">
              <span>View All Properties</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-charcoal/10 bg-white p-7 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.06)] transition-all duration-200 hover:border-[#C5A059] hover:shadow-lg hover:-translate-y-1 flex flex-col justify-between">
              <div>
                <span className="inline-block rounded-md bg-navy/10 px-2.5 py-1 text-[11px] font-bold text-navy">Luxury Residential</span>
                <h3 className="mt-4 font-display text-lg font-bold text-navy">Luxury Residences</h3>
                <p className="mt-2 text-xs leading-relaxed text-charcoal/70 font-normal">
                  Sea-facing penthouses in South Mumbai, waterfront homes in Navi Mumbai, and prime villas in Bandra West.
                </p>
              </div>
              <Link className="mt-6 inline-flex items-center gap-1 text-xs font-bold text-[#C5A059] transition-colors hover:text-[#b08e4c]" href="/explore?type=Residential">
                <span>View Luxury Homes</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="rounded-2xl border border-charcoal/10 bg-white p-7 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.06)] transition-all duration-200 hover:border-[#C5A059] hover:shadow-lg hover:-translate-y-1 flex flex-col justify-between">
              <div>
                <span className="inline-block rounded-md bg-navy/10 px-2.5 py-1 text-[11px] font-bold text-navy">Rental Yield</span>
                <h3 className="mt-4 font-display text-lg font-bold text-navy">Grade-A Commercial</h3>
                <p className="mt-2 text-xs leading-relaxed text-charcoal/70 font-normal">
                  Pre-leased office floors, retail showrooms, and modern warehouses with verified corporate tenant rent agreements.
                </p>
              </div>
              <Link className="mt-6 inline-flex items-center gap-1 text-xs font-bold text-[#C5A059] transition-colors hover:text-[#b08e4c]" href="/explore?type=Commercial">
                <span>View Commercial Properties</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="rounded-2xl border border-charcoal/10 bg-white p-7 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.06)] transition-all duration-200 hover:border-[#C5A059] hover:shadow-lg hover:-translate-y-1 flex flex-col justify-between">
              <div>
                <span className="inline-block rounded-md bg-navy/10 px-2.5 py-1 text-[11px] font-bold text-navy">Development Land</span>
                <h3 className="mt-4 font-display text-lg font-bold text-navy">Strategic Plots</h3>
                <p className="mt-2 text-xs leading-relaxed text-charcoal/70 font-normal">
                  Clean-title land plots suitable for warehousing, residential layouts, or commercial development along highway corridors.
                </p>
              </div>
              <Link className="mt-6 inline-flex items-center gap-1 text-xs font-bold text-[#C5A059] transition-colors hover:text-[#b08e4c]" href="/explore?type=Land">
                <span>View Land Plots</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="rounded-2xl border border-charcoal/10 bg-white p-7 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.06)] transition-all duration-200 hover:border-[#C5A059] hover:shadow-lg hover:-translate-y-1 flex flex-col justify-between">
              <div>
                <span className="inline-block rounded-md bg-[#C5A059]/20 px-2.5 py-1 text-[11px] font-bold text-navy">Special Portfolios</span>
                <h3 className="mt-4 font-display text-lg font-bold text-navy">Distressed Assets</h3>
                <p className="mt-2 text-xs leading-relaxed text-charcoal/70 font-normal">
                  High-discount bank NPA properties and corporate insolvency auctions (IBC) with strong turnaround potential.
                </p>
              </div>
              <Link className="mt-6 inline-flex items-center gap-1 text-xs font-bold text-[#C5A059] transition-colors hover:text-[#b08e4c]" href="/explore">
                <span>View Special Opportunities</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PROCESS & PARTNER WITH US FORM */}
      <section className="py-16 bg-[#f8fafc]" id="consultation">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            {/* Left: Our Process */}
            <div>
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#C5A059]">
                HOW IT WORKS
              </span>
              <h2 className="mt-1 font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl">
                From Finding a Property to Key Handover
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-charcoal/70 max-w-xl">
                A structured, confidential process designed for family offices and discerning property investors.
              </p>

              <div className="mt-8 space-y-4 text-xs">
                {[
                  {
                    step: "01",
                    title: "Understand Your Investment Goals",
                    desc: "Define your preferred property type, budget range (₹5 Cr–₹100 Cr+), target cities, and expected rental return.",
                  },
                  {
                    step: "02",
                    title: "Direct Bank & DRT Deal Sourcing",
                    desc: "We scan internal bank recovery databases and court listings to spot great deals before public newspaper ads appear.",
                  },
                  {
                    step: "03",
                    title: "Deep Legal & Ownership Due Diligence",
                    desc: "We complete 30-year sub-registrar deed searches, verify physical possession, and audit society maintenance bills.",
                  },
                  {
                    step: "04",
                    title: "Bidding Strategy & Handover Support",
                    desc: "We guide your bidding limit, arrange 15-day bank balance financing, and help register your official Sale Certificate.",
                  },
                ].map((item) => (
                  <div className="flex gap-4 rounded-2xl border border-charcoal/10 bg-white p-5 shadow-xs transition-all duration-200 hover:shadow-sm" key={item.step}>
                    <span className="font-mono text-sm font-black text-[#C5A059]">{item.step}</span>
                    <div>
                      <h3 className="font-bold text-navy text-sm">{item.title}</h3>
                      <p className="mt-1 text-charcoal/70 leading-relaxed font-normal">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Partner With Us Consultation Form */}
            <div className="rounded-2xl border-2 border-[#C5A059] bg-white p-7 sm:p-9 shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#C5A059]">
                PRIVATE CLIENT DESK
              </span>
              <h3 className="mt-1 font-display text-2xl font-bold text-navy">Talk to a Senior Advisor</h3>
              <p className="mt-1.5 text-xs text-charcoal/70 leading-relaxed font-normal">
                Get confidential access to curated bank auction opportunities and dedicated execution support from our leadership team.
              </p>

              {isSubmitted ? (
                <div className="mt-6 rounded-2xl bg-emerald-50 p-7 text-center text-emerald-950 border border-emerald-200 shadow-xs">
                  <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-emerald-600 text-white shadow-sm">
                    <CheckCircle2 className="h-7 w-7" />
                  </div>
                  <h4 className="font-bold text-lg text-navy mt-3">Inquiry Received</h4>
                  <p className="text-xs text-charcoal/75 mt-1.5 leading-relaxed">
                    Thank you, <strong>{name}</strong>. A Senior Advisor from our HNI Desk will contact you within 2 working hours under strict confidentiality.
                  </p>
                  <button
                    className="mt-5 rounded-xl bg-navy px-5 py-2.5 text-xs font-bold text-white shadow-sm transition-all duration-200 hover:bg-navy/90 active:scale-[0.98]"
                    onClick={() => setIsSubmitted(false)}
                    type="button"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form className="mt-6 space-y-4 text-xs" onSubmit={handleConsultation}>
                  <div>
                    <label className="font-semibold text-charcoal/80">Your Full Name *</label>
                    <input
                      className="mt-1 w-full rounded-xl border border-charcoal/25 bg-white p-2.5 text-xs text-navy font-medium shadow-2xs focus:border-[#C5A059] focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rupesh Singh"
                      required
                      type="text"
                      value={name}
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-charcoal/80">Email Address *</label>
                    <input
                      className="mt-1 w-full rounded-xl border border-charcoal/25 bg-white p-2.5 text-xs text-navy font-medium shadow-2xs focus:border-[#C5A059] focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="rupesh@example.com"
                      required
                      type="email"
                      value={email}
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-charcoal/80">Mobile Number (WhatsApp) *</label>
                    <input
                      className="mt-1 w-full rounded-xl border border-charcoal/25 bg-white p-2.5 text-xs text-navy font-medium shadow-2xs focus:border-[#C5A059] focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98200 45892"
                      required
                      type="tel"
                      value={phone}
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-charcoal/80">Property Type of Interest</label>
                    <select
                      className="mt-1 w-full rounded-xl border border-charcoal/25 bg-white p-2.5 text-xs text-navy font-medium shadow-2xs focus:border-[#C5A059] focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
                      onChange={(e) => setInterest(e.target.value)}
                      value={interest}
                    >
                      <option>Luxury Residential Homes (₹5 Cr+)</option>
                      <option>Commercial Pre-Leased Real Estate (₹10 Cr+)</option>
                      <option>Industrial &amp; Logistics Parks (₹15 Cr+)</option>
                      <option>Large Land Parcels &amp; Plots</option>
                      <option>Distressed Corporate Asset Portfolios</option>
                    </select>
                  </div>

                  <div className="pt-2">
                    <button
                      className="w-full rounded-xl bg-[#C5A059] py-3 text-xs font-bold text-white shadow-md transition-all duration-200 hover:bg-[#b08e4c] hover:shadow-lg active:scale-[0.98]"
                      type="submit"
                    >
                      Request Confidential Call →
                    </button>
                    <p className="mt-2 text-center text-[10px] text-charcoal/50">
                      100% Confidential: All conversations and details are protected under mutual non-disclosure.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
