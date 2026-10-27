import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  Landmark,
  MapPin,
  Users,
  Target,
  Eye,
  ShieldCheck,
  TrendingUp,
  Handshake,
  Scale,
  Lightbulb,
  ArrowRight,
  Award,
} from "lucide-react";

export const metadata = {
  title: "About Us | AuctionIQ",
  description:
    "Transforming India's distressed bank auction ecosystem through statutory intelligence, transparency, and institutional diligence.",
};

export default function AboutPage() {
  return (
    <div>
      {/* 1. BESPOKE HERO SECTION WITH SIGNATURE MESH GRADIENT */}
      <section className="relative overflow-hidden bg-[#06101E] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(197,160,89,0.18),rgba(255,255,255,0))] bg-gradient-to-br from-[#06101E] via-[#0B1E38] to-[#040913] py-16 text-white sm:py-24">
        <div className="absolute inset-0 z-0">
          <Image
            alt="Mumbai coastal waterfront and skyline dusk view"
            className="object-cover object-center opacity-30 mix-blend-luminosity"
            fill
            priority
            sizes="100vw"
            src="/images/sealink_skyline_hero.jpg"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#06101E] via-[#06101E]/90 to-[#06101E]/60" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-[1.25fr_0.95fr] lg:items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#C5A059]/30 bg-[#C5A059]/10 px-3.5 py-1 text-xs font-semibold tracking-wider uppercase text-[#D4AF37] backdrop-blur-sm">
                <Award className="h-3.5 w-3.5 text-[#D4AF37]" />
                <span>INDEPENDENT PROPTECH INTELLIGENCE</span>
              </div>

              <h1 className="font-display text-4xl font-extrabold sm:text-5xl lg:text-6xl leading-[1.08] text-white">
                Transforming India&apos;s Distressed Bank Asset{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E5C17B] via-[#F5E6B8] to-[#C5A059]">
                  Ecosystem.
                </span>
              </h1>

              <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-white/80 font-normal">
                Bridging the asymmetric information divide between bank recovery officers, scheduled commercial lenders, and serious real estate investors through authenticated statutory due diligence and institutional valuation models.
              </p>

              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <Link
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#C5A059] px-6 text-xs font-bold text-white shadow-md transition-all duration-200 hover:bg-[#b08e4c] hover:shadow-lg active:scale-[0.98]"
                  href="#mission"
                >
                  <span>Our Mission &amp; Vision</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 text-xs font-semibold text-white shadow-xs transition-all duration-200 hover:bg-white/20 active:scale-[0.98]"
                  href="#story"
                >
                  <span>Read Our Genesis Story</span>
                </Link>
              </div>
            </div>

            {/* Floating Metrics Card with Generous Breathing Room */}
            <div className="rounded-2xl border border-white/15 bg-[#071324]/85 p-8 sm:p-9 lg:p-10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] backdrop-blur-xl ring-1 ring-white/10 text-white">
              <div className="border-b border-white/10 pb-4">
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#D4AF37]">
                  SCALE &amp; REACH
                </span>
                <h2 className="mt-1 font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
                  National Footprint
                </h2>
                <p className="mt-1 text-xs text-white/65 leading-relaxed font-normal">
                  Independent research and algorithmic tracking across India.
                </p>
              </div>

              <div className="mt-6 space-y-5 text-xs">
                <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/5 text-[#D4AF37] shadow-xs">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-display text-2xl font-bold text-white font-mono">5,000+</p>
                    <p className="text-white/65 text-xs">Verified Statutory Auction Filings</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/5 text-[#D4AF37] shadow-xs">
                    <Landmark className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-display text-2xl font-bold text-white font-mono">25+</p>
                    <p className="text-white/65 text-xs">Scheduled Banks &amp; ARCs Covered</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/5 text-[#D4AF37] shadow-xs">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-display text-2xl font-bold text-white font-mono">20+</p>
                    <p className="text-white/65 text-xs">Metropolitan Real Estate Markets</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/5 text-[#D4AF37] shadow-xs">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-display text-2xl font-bold text-white font-mono">100,000+</p>
                    <p className="text-white/65 text-xs">Investors &amp; Family Offices Reached</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. OUR STORY */}
      <section className="py-16 border-b border-charcoal/10 bg-white" id="story">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#C5A059]">
                GENESIS &amp; PHILOSOPHY
              </span>
              <h2 className="mt-1 font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl">
                Built to Bring Transparency to an Opacity-Plagued Sector
              </h2>
              <h3 className="mt-2 font-display text-base font-semibold text-charcoal/80">
                Transforming public statutory notices into actionable investment intelligence.
              </h3>

              <p className="mt-5 text-xs sm:text-sm leading-relaxed text-charcoal/75 font-normal">
                Bank auction properties offer unparalleled acquisition discounts—often 20% to 35% below secondary market rates. However, historical access has been monopolized by fragmented newspaper gazettes, unclear possession statuses, hidden society maintenance arrears, and daunting 15-day balance settlement deadlines.
              </p>
              <p className="mt-3.5 text-xs sm:text-sm leading-relaxed text-charcoal/75 font-normal">
                AuctionIQ was built by seasoned proptech engineers and real estate lawyers to dismantle these barriers. By coupling direct SARFAESI Section 13(4) notice aggregation with CERSAI charge verification, IoT SmartDoor physical access passes, and pre-auction bridge financing, we equip every investor with institutional-grade certainty.
              </p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-charcoal/15 bg-white shadow-xl relative aspect-[16/10]">
              <Image
                alt="Laptop displaying AuctionIQ platform in executive office"
                className="object-cover"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                src="/images/laptop_desk_story.jpg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. FOUR METRIC STATS BANNER */}
      <section className="py-12 bg-white border-b border-charcoal/10 shadow-xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center divide-y sm:divide-y-0 sm:divide-x divide-charcoal/10">
            <div className="p-3">
              <span className="font-display text-3xl sm:text-4xl font-extrabold text-navy font-mono">100,000+</span>
              <p className="text-xs font-semibold text-charcoal/60 mt-1 uppercase tracking-wider">Active Searchers</p>
            </div>
            <div className="p-3">
              <span className="font-display text-3xl sm:text-4xl font-extrabold text-navy font-mono">₹1,000 Cr+</span>
              <p className="text-xs font-semibold text-charcoal/60 mt-1 uppercase tracking-wider">Catalogued Valuation</p>
            </div>
            <div className="p-3">
              <span className="font-display text-3xl sm:text-4xl font-extrabold text-navy font-mono">20+</span>
              <p className="text-xs font-semibold text-charcoal/60 mt-1 uppercase tracking-wider">Tier-1 &amp; Tier-2 Hubs</p>
            </div>
            <div className="p-3">
              <span className="font-display text-3xl sm:text-4xl font-extrabold text-navy font-mono">25+</span>
              <p className="text-xs font-semibold text-charcoal/60 mt-1 uppercase tracking-wider">Lending Partners</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. MISSION & VISION */}
      <section className="py-16 bg-[#f8fafc] border-b border-charcoal/10" id="mission">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#C5A059]">
                  PURPOSE &amp; HORIZON
                </span>
                <h2 className="mt-1 font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl">
                  Our Mission &amp; Strategic Vision
                </h2>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-2xl border border-charcoal/10 bg-white p-7 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.06)] transition-all duration-200 hover:shadow-md">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-navy/5 text-[#C5A059] shadow-2xs">
                    <Target className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold text-navy">Our Mission</h3>
                  <p className="mt-2 text-xs leading-relaxed text-charcoal/70 font-normal">
                    To standardize and democratize distressed real estate acquisition across India through transparent empirical data, automated SmartDoor site access, and conflict-free title intelligence.
                  </p>
                </div>

                <div className="rounded-2xl border border-charcoal/10 bg-white p-7 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.06)] transition-all duration-200 hover:shadow-md">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-navy/5 text-[#C5A059] shadow-2xs">
                    <Eye className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold text-navy">Our Vision</h3>
                  <p className="mt-2 text-xs leading-relaxed text-charcoal/70 font-normal">
                    A frictionless, data-transparent distressed asset marketplace where institutional and retail capital seamlessly clears NPA collateral, fostering market liquidity and economic efficiency.
                  </p>
                </div>
              </div>
            </div>

            {/* Dark Quote Card */}
            <div className="rounded-2xl bg-gradient-to-br from-[#06101E] via-[#0B1E38] to-[#040913] p-9 text-white shadow-xl border border-white/15">
              <span className="text-[#C5A059] text-4xl font-serif">“</span>
              <p className="font-display text-2xl font-bold text-white leading-snug mt-1">
                Real estate value is unlocked when opacity is replaced with authenticated data.
              </p>
              <p className="mt-5 text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
                The AuctionIQ Guiding Principle
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. OUR VALUES */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#C5A059]">
              CORE ETHOS
            </span>
            <h2 className="mt-1 font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              Principles That Govern Our Advisory
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-charcoal/70">
              Uncompromising standards applied to every statutory notice and property filing.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5 text-xs">
            {[
              {
                title: "Trust & Transparency",
                desc: "Verified information, authenticated registry searches, and unmasked guidance on statutory dues.",
                icon: ShieldCheck,
              },
              {
                title: "Empirical Pricing",
                desc: "Circle rate comparables and evidence-based decisions powered by recorded sub-registrar deed data.",
                icon: TrendingUp,
              },
              {
                title: "Investor Fiduciary",
                desc: "Independent solutions tailored to protecting the bidder's capital from forfeiture and unrecorded dues.",
                icon: Handshake,
              },
              {
                title: "Legal Rigor",
                desc: "Zero-compromise title audits cross-referencing CERSAI, DRT orders, and municipal arrears.",
                icon: Scale,
              },
              {
                title: "Proptech Innovation",
                desc: "IoT SmartDoor digital locking passes, biometric visitor eKYC, and automated credit bridge underwriting.",
                icon: Lightbulb,
              },
            ].map((val) => {
              const Icon = val.icon;
              return (
                <div
                  className="rounded-2xl border border-charcoal/10 bg-white p-6 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.06)] transition-all duration-200 hover:border-[#C5A059] hover:shadow-md hover:-translate-y-1"
                  key={val.title}
                >
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-navy/5 text-[#C5A059] shadow-2xs">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-sm font-bold text-navy">{val.title}</h3>
                  <p className="mt-1.5 text-charcoal/70 leading-relaxed font-normal">{val.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
