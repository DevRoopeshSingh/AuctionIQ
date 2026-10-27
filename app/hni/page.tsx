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
                <span>PRIVATE CLIENT GROUP &amp; FAMILY OFFICE DESK</span>
              </div>

              <h1 className="font-display text-4xl font-extrabold sm:text-5xl lg:text-6xl leading-[1.08] text-white">
                Bespoke Distressed Asset Advisory for{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E5C17B] via-[#F5E6B8] to-[#C5A059]">
                  Family Offices &amp; HNIs.
                </span>
              </h1>

              <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-white/80 font-normal">
                Discreet deal flow, cross-collateral asset structuring, and high-yield DRT special situations exceeding ₹5 Cr—backed by institutional title audits, physical possession enforcement, and private mandate representation.
              </p>

              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <a
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#C5A059] px-6 text-xs font-bold text-white shadow-md transition-all duration-200 hover:bg-[#b08e4c] hover:shadow-lg active:scale-[0.98]"
                  href="#consultation"
                >
                  <span>Request a Private Mandate</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
                <button
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 text-xs font-semibold text-white shadow-xs transition-all duration-200 hover:bg-white/20 active:scale-[0.98]"
                  onClick={() => alert("HNI Institutional Portfolio Dossier (Q4 2026) download initialized.")}
                  type="button"
                >
                  <Download className="h-4 w-4 text-[#D4AF37]" />
                  <span>Download Institutional Dossier</span>
                </button>
              </div>
            </div>

            {/* Right Floating Feature Card with Deep Padding & Whitespace */}
            <div className="rounded-2xl border border-white/15 bg-[#071324]/85 p-8 sm:p-9 lg:p-10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] backdrop-blur-xl ring-1 ring-white/10 text-white">
              <div className="border-b border-white/10 pb-4">
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#D4AF37]">
                  DISCREET MANDATE ADVANTAGE
                </span>
                <h2 className="mt-1 font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Institutional Capital Services
                </h2>
                <p className="mt-1 text-xs text-white/65 leading-relaxed font-normal">
                  End-to-end transaction architecture for substantial balance sheets.
                </p>
              </div>

              <div className="mt-6 space-y-5 sm:space-y-6 text-xs">
                <div className="flex items-start gap-4">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/5 text-[#D4AF37] shadow-xs">
                    <Crown className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white/95">Curated Trophy &amp; NPA Deal Flow</h3>
                    <p className="text-white/65 mt-0.5 leading-relaxed font-normal">
                      Prime luxury penthouses, corporate headquarters, and Grade-A industrial parks above ₹5 Cr.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/5 text-[#D4AF37] shadow-xs">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white/95">Empirical Yield &amp; Exit Modeling</h3>
                    <p className="text-white/65 mt-0.5 leading-relaxed font-normal">
                      Sub-registrar circle rate mapping, secondary transaction spreads, and multi-year IRR stress tests.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/5 text-[#D4AF37] shadow-xs">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white/95">Turnkey Acquisition Execution</h3>
                    <p className="text-white/65 mt-0.5 leading-relaxed font-normal">
                      SmartDoor private walkthroughs, 30-year sub-registrar search certificates, and recovery escort.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/5 text-[#D4AF37] shadow-xs">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white/95">Dedicated Senior Mandate Partner</h3>
                    <p className="text-white/65 mt-0.5 leading-relaxed font-normal">
                      Single-point confidential liaison managing advocate coordination, bid execution, and bank escrow.
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
              <span className="font-display text-3xl sm:text-4xl font-extrabold text-navy">₹1,000 Cr+</span>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-charcoal/60">Asset Deal Pool</p>
            </div>
            <div className="border-r border-charcoal/10 last:border-r-0 pr-4">
              <span className="font-display text-3xl sm:text-4xl font-extrabold text-navy">18%–28%</span>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-charcoal/60">Discount to Secondary</p>
            </div>
            <div className="border-r border-charcoal/10 last:border-r-0 pr-4">
              <span className="font-display text-3xl sm:text-4xl font-extrabold text-navy">100%</span>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-charcoal/60">Verified Legal Filings</p>
            </div>
            <div>
              <span className="font-display text-3xl sm:text-4xl font-extrabold text-navy">48 Hours</span>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-charcoal/60">Mandate Response</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FOUR ADVISORY CAPABILITIES */}
      <section className="py-16 bg-[#f8fafc]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#C5A059]">
              CORE COMPETENCIES
            </span>
            <h2 className="mt-1 font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              Engineered for Discerning Balance Sheets
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-charcoal/70">
              Institutional safeguards and valuation accuracy tailored for private family offices.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 text-xs">
            <div className="rounded-2xl border border-charcoal/10 bg-white p-7 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.06)] transition-all duration-200 hover:border-[#C5A059] hover:shadow-lg hover:-translate-y-1">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-navy/5 text-[#C5A059] shadow-2xs">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-display text-base font-bold text-navy">Targeted Deal Allocation</h3>
              <p className="mt-1.5 text-charcoal/70 leading-relaxed font-normal">Off-market and pre-auction notifications aligned specifically with your asset allocation mandate.</p>
            </div>

            <div className="rounded-2xl border border-charcoal/10 bg-white p-7 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.06)] transition-all duration-200 hover:border-[#C5A059] hover:shadow-lg hover:-translate-y-1">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-navy/5 text-[#C5A059] shadow-2xs">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-display text-base font-bold text-navy">Circle Rate Modeling</h3>
              <p className="mt-1.5 text-charcoal/70 leading-relaxed font-normal">Comparative analysis cross-referencing sub-registrar stamped transaction deeds and municipal zoning bylaws.</p>
            </div>

            <div className="rounded-2xl border border-charcoal/10 bg-white p-7 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.06)] transition-all duration-200 hover:border-[#C5A059] hover:shadow-lg hover:-translate-y-1">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-navy/5 text-[#C5A059] shadow-2xs">
                <Scale className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-display text-base font-bold text-navy">Senior Legal Counsel</h3>
              <p className="mt-1.5 text-charcoal/70 leading-relaxed font-normal">Direct engagement with senior DRT advocates, registered government valuers, and high-court title searchers.</p>
            </div>

            <div className="rounded-2xl border border-charcoal/10 bg-white p-7 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.06)] transition-all duration-200 hover:border-[#C5A059] hover:shadow-lg hover:-translate-y-1">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-navy/5 text-[#C5A059] shadow-2xs">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-display text-base font-bold text-navy">Discreet Transaction NDA</h3>
              <p className="mt-1.5 text-charcoal/70 leading-relaxed font-normal">Anonymous bidding structures, proxy bidding services, and private settlement execution.</p>
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
                TARGET PORTFOLIOS
              </span>
              <h2 className="mt-1 font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl">
                Curated Opportunities by Asset Class
              </h2>
            </div>
            <Link className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C5A059] hover:underline" href="/explore">
              <span>View All Inventory</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-charcoal/10 bg-white p-7 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.06)] transition-all duration-200 hover:border-[#C5A059] hover:shadow-lg hover:-translate-y-1 flex flex-col justify-between">
              <div>
                <span className="inline-block rounded-md bg-navy/10 px-2.5 py-1 text-[11px] font-bold text-navy">Residential Trophy</span>
                <h3 className="mt-4 font-display text-lg font-bold text-navy">Luxury Residences</h3>
                <p className="mt-2 text-xs leading-relaxed text-charcoal/70 font-normal">
                  Sea-facing penthouses in South Mumbai, gated villas in Bangalore, and prime builder floors in New Delhi.
                </p>
              </div>
              <Link className="mt-6 inline-flex items-center gap-1 text-xs font-bold text-[#C5A059] transition-colors hover:text-[#b08e4c]" href="/explore?type=Residential">
                <span>View Luxury Filings</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="rounded-2xl border border-charcoal/10 bg-white p-7 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.06)] transition-all duration-200 hover:border-[#C5A059] hover:shadow-lg hover:-translate-y-1 flex flex-col justify-between">
              <div>
                <span className="inline-block rounded-md bg-navy/10 px-2.5 py-1 text-[11px] font-bold text-navy">Commercial Yield</span>
                <h3 className="mt-4 font-display text-lg font-bold text-navy">Grade-A Commercial</h3>
                <p className="mt-2 text-xs leading-relaxed text-charcoal/70 font-normal">
                  Pre-leased office floors, high-street retail stores, and industrial warehouse clusters with verified MNC tenant leases.
                </p>
              </div>
              <Link className="mt-6 inline-flex items-center gap-1 text-xs font-bold text-[#C5A059] transition-colors hover:text-[#b08e4c]" href="/explore?type=Commercial">
                <span>View Commercial Filings</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="rounded-2xl border border-charcoal/10 bg-white p-7 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.06)] transition-all duration-200 hover:border-[#C5A059] hover:shadow-lg hover:-translate-y-1 flex flex-col justify-between">
              <div>
                <span className="inline-block rounded-md bg-navy/10 px-2.5 py-1 text-[11px] font-bold text-navy">Strategic Land</span>
                <h3 className="mt-4 font-display text-lg font-bold text-navy">Development Plots</h3>
                <p className="mt-2 text-xs leading-relaxed text-charcoal/70 font-normal">
                  Clear-title institutional plots suitable for logistics parks, plotted development, and data centers along highway growth corridors.
                </p>
              </div>
              <Link className="mt-6 inline-flex items-center gap-1 text-xs font-bold text-[#C5A059] transition-colors hover:text-[#b08e4c]" href="/explore?type=Land">
                <span>View Land Filings</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="rounded-2xl border border-charcoal/10 bg-white p-7 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.06)] transition-all duration-200 hover:border-[#C5A059] hover:shadow-lg hover:-translate-y-1 flex flex-col justify-between">
              <div>
                <span className="inline-block rounded-md bg-[#C5A059]/20 px-2.5 py-1 text-[11px] font-bold text-navy">Special Situation</span>
                <h3 className="mt-4 font-display text-lg font-bold text-navy">NPA Portfolios</h3>
                <p className="mt-2 text-xs leading-relaxed text-charcoal/70 font-normal">
                  High-yield distressed assets, corporate insolvency auctions (IBC), and SARFAESI debt resolution opportunities.
                </p>
              </div>
              <Link className="mt-6 inline-flex items-center gap-1 text-xs font-bold text-[#C5A059] transition-colors hover:text-[#b08e4c]" href="/explore">
                <span>View Special Situations</span>
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
                MANDATE LIFECYCLE
              </span>
              <h2 className="mt-1 font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl">
                From Mandate to Registered Title
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-charcoal/70 max-w-xl">
                A structured, confidential pipeline designed for family offices and institutional wealth desks.
              </p>

              <div className="mt-8 space-y-4 text-xs">
                {[
                  {
                    step: "01",
                    title: "Mandate Scoping & Yield Modeling",
                    desc: "Define target IRR, asset class parameters, ticket size (₹5 Cr–₹100 Cr+), geographic focus, and tax residency constraints.",
                  },
                  {
                    step: "02",
                    title: "Direct Recovery Officer Sourcing",
                    desc: "Scan internal bank recovery databases, Debts Recovery Tribunal listings, and off-market distress filings ahead of public gazettes.",
                  },
                  {
                    step: "03",
                    title: "Comprehensive Legal & Asset Audit",
                    desc: "Coordinate sub-registrar title searches, physical possession verification, pending society dues audit, and property tax liability clearance.",
                  },
                  {
                    step: "04",
                    title: "Bidding Strategy & Handover Support",
                    desc: "Structured pre-auction ceiling bidding, 15-day balance settlement bridge capital, registered Sale Certificate execution, and physical possession handover.",
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
                PRIVATE CLIENT INTAKE
              </span>
              <h3 className="mt-1 font-display text-2xl font-bold text-navy">Partner With Us</h3>
              <p className="mt-1.5 text-xs text-charcoal/70 leading-relaxed font-normal">
                Receive confidential access to curated distress opportunities and dedicated execution support from our Senior Partners.
              </p>

              {isSubmitted ? (
                <div className="mt-6 rounded-2xl bg-emerald-50 p-7 text-center text-emerald-950 border border-emerald-200 shadow-xs">
                  <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-emerald-600 text-white shadow-sm">
                    <CheckCircle2 className="h-7 w-7" />
                  </div>
                  <h4 className="font-bold text-lg text-navy mt-3">Consultation Mandate Received</h4>
                  <p className="text-xs text-charcoal/75 mt-1.5 leading-relaxed">
                    Thank you, <strong>{name}</strong>. A Senior Partner from our HNI &amp; Institutional Desk will contact you within 2 business hours under formal NDA.
                  </p>
                  <button
                    className="mt-5 rounded-xl bg-navy px-5 py-2.5 text-xs font-bold text-white shadow-sm transition-all duration-200 hover:bg-navy/90 active:scale-[0.98]"
                    onClick={() => setIsSubmitted(false)}
                    type="button"
                  >
                    Submit Another Mandate
                  </button>
                </div>
              ) : (
                <form className="mt-6 space-y-4 text-xs" onSubmit={handleConsultation}>
                  <div>
                    <label className="font-semibold text-charcoal/80">Full Legal Name *</label>
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
                    <label className="font-semibold text-charcoal/80">Corporate / Family Office Email *</label>
                    <input
                      className="mt-1 w-full rounded-xl border border-charcoal/25 bg-white p-2.5 text-xs text-navy font-medium shadow-2xs focus:border-[#C5A059] focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="principal@familyoffice.in"
                      required
                      type="email"
                      value={email}
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-charcoal/80">Direct Mobile Phone *</label>
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
                    <label className="font-semibold text-charcoal/80">Primary Asset Interest</label>
                    <select
                      className="mt-1 w-full rounded-xl border border-charcoal/25 bg-white p-2.5 text-xs text-navy font-medium shadow-2xs focus:border-[#C5A059] focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
                      onChange={(e) => setInterest(e.target.value)}
                      value={interest}
                    >
                      <option>Residential Trophy Assets (₹10 Cr+)</option>
                      <option>Commercial Pre-Leased Real Estate (₹15 Cr+)</option>
                      <option>Industrial &amp; Logistics Parks (₹25 Cr+)</option>
                      <option>Large Land Parcels &amp; Plotted Corridors</option>
                      <option>NPA &amp; Distressed Corporate Debt Portfolios</option>
                    </select>
                  </div>

                  <div className="pt-2">
                    <button
                      className="w-full rounded-xl bg-[#C5A059] py-3 text-xs font-bold text-white shadow-md transition-all duration-200 hover:bg-[#b08e4c] hover:shadow-lg active:scale-[0.98]"
                      type="submit"
                    >
                      Request Confidential Consultation →
                    </button>
                    <p className="mt-2 text-center text-[10px] text-charcoal/50">
                      Strict Non-Disclosure: All communications protected by bilateral confidentiality covenants.
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
