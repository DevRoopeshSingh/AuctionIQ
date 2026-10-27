"use client";

import { useState, useEffect } from "react";
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
  ArrowRight,
  CheckCircle2,
  Shield,
  Percent,
} from "lucide-react";
import { ExplorePropertiesSection } from "@/components/inspections/explore-properties-section";
import { FaqSection } from "@/components/faq/faq-section";

const heroBackgrounds = [
  {
    url: "/images/sealink_skyline_hero.jpg",
    alt: "Mumbai Bandra-Worli Sea Link cable-stayed bridge at golden sunset dusk",
    title: "Bandra-Worli Sea Link Corridor",
  },
  {
    url: "/images/mumbai-property.jpg",
    alt: "Luxury high-rise residential tower on Mumbai sea face at sunset",
    title: "Worli Sea Face Luxury High-Rise",
  },
  {
    url: "/images/navi-mumbai.jpg",
    alt: "Modern waterfront commercial highway skyline in Navi Mumbai",
    title: "Navi Mumbai Commercial IT Corridor",
  },
  {
    url: "/images/hni_luxury_deal.jpg",
    alt: "Exclusive duplex penthouse terrace overlooking the Mumbai sea",
    title: "Bandra West Oceanfront Penthouse",
  },
];

export default function Home() {
  const router = useRouter();
  const [heroSearch, setHeroSearch] = useState("");
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  // Automatically cycle the background image every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % heroBackgrounds.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

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
      {/* 1. FULL-WIDTH HERO SECTION WITH 5-SECOND CROSS-FADE BACKGROUND CAROUSEL & CENTERED TEXT */}
      <section className="relative overflow-hidden bg-[#06101E] min-h-[560px] lg:min-h-[600px] flex items-center justify-center text-white">
        {/* Full-width Background Image Cross-Fade Layer */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {heroBackgrounds.map((bg, idx) => {
            const isActive = currentBgIndex === idx;
            return (
              <div
                key={bg.url}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                <Image
                  src={bg.url}
                  alt={bg.alt}
                  fill
                  priority={idx === 0}
                  sizes="100vw"
                  className="object-cover object-center scale-105 transition-transform duration-[6000ms] ease-out"
                />
              </div>
            );
          })}

          {/* Dark Overlay for Text Readability: Multi-stop gradient prevents contrast dropouts */}
          <div className="absolute inset-0 z-20 bg-gradient-to-b from-[#06101E]/90 via-[#06101E]/80 to-[#06101E]/95" />
          <div className="absolute inset-0 z-20 bg-[radial-gradient(ellipse_80%_60%_at_50%_35%,rgba(197,160,89,0.18),transparent_70%)]" />
        </div>

        {/* Centered Text Content */}
        <div className="relative z-30 mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:py-14 text-center flex flex-col items-center">
          {/* Tagline / Category Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#C5A059]/40 bg-[#C5A059]/15 px-4 py-1.5 text-xs font-semibold tracking-wider uppercase text-[#D4AF37] backdrop-blur-md shadow-sm mb-4">
            <ShieldCheck className="h-4 w-4 text-[#D4AF37]" />
            <span>VERIFIED BANK AUCTIONS IN INDIA</span>
          </div>

          {/* Centered Main Headline */}
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-[3.5rem] text-white leading-[1.12] sm:leading-[1.08] max-w-4xl mx-auto">
            Buy Bank Auction Properties at{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E5C17B] via-[#F5E6B8] to-[#C5A059]">
              20% to 35% Below Market Price.
            </span>
          </h1>

          {/* Centered Authoritative Subtitle */}
          <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed text-white/85 font-normal">
            Find verified bank auction homes, commercial spaces, and plots across Mumbai and Navi Mumbai. We check 30 years of legal records, pending society maintenance bills, and key handover status—so you can buy safely with zero confusion.
          </p>

          {/* Centered Search Bar */}
          <form
            onSubmit={handleHeroSearch}
            className="mt-6 w-full max-w-2xl rounded-2xl bg-white/95 p-2 shadow-[0_25px_60px_rgba(0,0,0,0.45)] backdrop-blur-md ring-1 ring-black/10 hover:ring-black/20 focus-within:ring-2 focus-within:ring-[#C5A059] flex flex-col sm:flex-row gap-2 transition-all duration-200"
          >
            <div className="relative flex-1 flex items-center pl-3">
              <Search className="h-4 w-4 text-charcoal/45 mr-2.5 shrink-0" />
              <input
                aria-label="Search auctions by area, city, or bank name"
                className="w-full text-xs sm:text-sm text-navy placeholder:text-charcoal/50 focus:outline-none bg-transparent"
                onChange={(e) => setHeroSearch(e.target.value)}
                placeholder="Search by area or bank (e.g. Worli, Vashi, SBI, HDFC)..."
                type="text"
                value={heroSearch}
              />
            </div>
            <button
              className="rounded-xl bg-[#C5A059] px-7 py-3 text-xs sm:text-sm font-bold text-white shadow-md transition-all duration-200 hover:bg-[#b08e4c] hover:shadow-lg active:scale-[0.98]"
              type="submit"
            >
              Search Properties
            </button>
          </form>

          {/* Centered Locality & Asset Type Chips */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 max-w-2xl text-xs">
            {[
              { label: "Mumbai", icon: MapPin, href: "/explore?city=Mumbai" },
              { label: "Navi Mumbai", icon: MapPin, href: "/explore?city=Navi Mumbai" },
              { label: "Thane", icon: MapPin, href: "/explore?q=Thane" },
              { label: "Homes & Flats", icon: Building, href: "/explore?type=Residential" },
              { label: "Commercial Offices & Shops", icon: Building2, href: "/explore?type=Commercial" },
              { label: "Plots & Land", icon: Compass, href: "/explore?type=Land" },
              { label: "All Banks", icon: Landmark, href: "/explore" },
            ].map(({ label, icon: Icon, href }) => (
              <Link
                className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 font-medium text-white/90 backdrop-blur-md shadow-xs transition-all duration-200 hover:bg-white/20 hover:text-white hover:border-white/30 active:scale-95"
                href={href}
                key={label}
              >
                <Icon className="h-3 w-3 text-[#D4AF37]" />
                <span>{label}</span>
              </Link>
            ))}
          </div>

          {/* Interactive Slide Switcher & Catalog Trust Strip */}
          <div className="mt-7 w-full max-w-3xl pt-5 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3 text-left">
              <div className="flex -space-x-2.5 overflow-hidden">
                <div className="relative h-8 w-8 rounded-full ring-2 ring-[#0B1E38] overflow-hidden">
                  <Image src="/images/mumbai-property.jpg" alt="South Mumbai home" fill className="object-cover" sizes="32px" />
                </div>
                <div className="relative h-8 w-8 rounded-full ring-2 ring-[#0B1E38] overflow-hidden">
                  <Image src="/images/navi-mumbai.jpg" alt="Navi Mumbai home" fill className="object-cover" sizes="32px" />
                </div>
                <div className="relative h-8 w-8 rounded-full ring-2 ring-[#0B1E38] overflow-hidden">
                  <Image src="/images/hni_luxury_deal.jpg" alt="Luxury apartment" fill className="object-cover" sizes="32px" />
                </div>
              </div>
              <div>
                <p className="font-semibold text-white">3,480+ Real Bank Auction Properties Checked</p>
                <p className="text-white/60 text-[11px]">Updated every hour from official bank notices</p>
              </div>
            </div>

            {/* Auto 5s Cycling Dots & Location Label */}
            <div className="flex items-center gap-2">
              {heroBackgrounds.map((bg, idx) => (
                <button
                  key={bg.url}
                  type="button"
                  onClick={() => setCurrentBgIndex(idx)}
                  className={`group flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] transition-all duration-300 ${
                    currentBgIndex === idx
                      ? "bg-white/20 text-white border border-white/30 backdrop-blur-md"
                      : "text-white/50 hover:text-white/80"
                  }`}
                  aria-label={`Jump to background slide ${idx + 1}: ${bg.title}`}
                >
                  <span
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      currentBgIndex === idx ? "w-4 bg-[#C5A059]" : "w-1.5 bg-white/40 group-hover:bg-white/70"
                    }`}
                  />
                  {currentBgIndex === idx && (
                    <span className="font-medium tracking-wide truncate max-w-[140px]">
                      {bg.title}
                    </span>
                  )}
                </button>
              ))}
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
                <span className="font-display text-2xl font-black text-navy sm:text-3xl tracking-tight">20%–35%</span>
                <p className="text-[11px] font-semibold text-charcoal/60 uppercase tracking-wider mt-0.5">Below Market Price</p>
              </div>
              <div>
                <span className="font-display text-2xl font-black text-navy sm:text-3xl tracking-tight">100%</span>
                <p className="text-[11px] font-semibold text-charcoal/60 uppercase tracking-wider mt-0.5">Bank EMD Refundable</p>
              </div>
              <div>
                <span className="font-display text-2xl font-black text-navy sm:text-3xl tracking-tight">30-Year</span>
                <p className="text-[11px] font-semibold text-charcoal/60 uppercase tracking-wider mt-0.5">Legal Title Search</p>
              </div>
              <div>
                <span className="font-display text-2xl font-black text-navy sm:text-3xl tracking-tight">7–10 Days</span>
                <p className="text-[11px] font-semibold text-charcoal/60 uppercase tracking-wider mt-0.5">Fast Auction Loans</p>
              </div>
            </div>

            {/* Featured Banks strip */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t md:border-t-0 md:border-l border-charcoal/10 pt-4 md:pt-0 md:pl-8 text-xs">
              <span className="font-bold text-charcoal/60 uppercase text-[10px] tracking-wider">
                Covering Public &amp; Private Banks:
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

      {/* 3. THREE FEATURE/AUDIENCE SHOWCASE CARDS */}
      <section className="py-16 mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#C5A059]">
            EVERYTHING YOU NEED TO BUY SAFELY
          </span>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight text-navy">
            Built for First-Time Home Buyers and Seasoned Investors Alike
          </h2>
          <p className="mt-2 text-sm text-charcoal/70">
            Choose what fits your needs: buy an affordable home at a discount, invest in high-value commercial properties, or calculate your exact savings.
          </p>
        </div>

        <div className="grid gap-7 lg:grid-cols-3">
          {/* Card 1: For Individual Buyers */}
          <div className="flex flex-col justify-between rounded-2xl border border-charcoal/10 bg-white p-7 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.06)] transition-all duration-200 hover:border-[#C5A059] hover:shadow-[0_20px_35px_-5px_rgba(15,23,42,0.12)] hover:-translate-y-1">
            <div>
              <span className="inline-block rounded-full bg-navy/10 px-3 py-1 text-xs font-bold text-navy">
                For Home Buyers &amp; Beginners
              </span>
              <h3 className="mt-4 font-display text-xl font-bold text-navy">Buy Your Dream Home at a Discount</h3>
              <p className="mt-2 text-xs leading-relaxed text-charcoal/70">
                Explore verified bank auction flats and houses. We compare prices with government circle rates and guide you through every legal step in plain English.
              </p>

              <div className="my-6 rounded-xl border border-charcoal/10 bg-[#f8fafc] p-4 text-xs grid grid-cols-2 gap-2.5">
                <span className="flex items-center gap-1.5 text-charcoal/80 font-medium">
                  <CheckCircle2 className="h-3.5 w-3.5 text-navy shrink-0" /> Verified Bank Notices
                </span>
                <span className="flex items-center gap-1.5 text-charcoal/80 font-medium">
                  <CheckCircle2 className="h-3.5 w-3.5 text-navy shrink-0" /> Market Price Comparison
                </span>
                <span className="flex items-center gap-1.5 text-charcoal/80 font-medium">
                  <CheckCircle2 className="h-3.5 w-3.5 text-navy shrink-0" /> Society Maintenance Check
                </span>
                <span className="flex items-center gap-1.5 text-charcoal/80 font-medium">
                  <CheckCircle2 className="h-3.5 w-3.5 text-navy shrink-0" /> Visit Property in Person
                </span>
              </div>
            </div>

            <Link
              className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl bg-[#C5A059] px-4 text-xs font-bold text-white shadow-sm transition-all duration-200 hover:bg-[#b08e4c] hover:shadow-md active:scale-[0.98]"
              href="/explore?type=Residential"
            >
              <span>Explore Homes for Sale</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Card 2: For Investors & HNIs */}
          <div className="flex flex-col justify-between rounded-2xl border border-charcoal/10 bg-white p-7 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.06)] transition-all duration-200 hover:border-[#C5A059] hover:shadow-[0_20px_35px_-5px_rgba(15,23,42,0.12)] hover:-translate-y-1">
            <div>
              <span className="inline-block rounded-full bg-gold/20 px-3 py-1 text-xs font-bold text-navy">
                For Big Investors &amp; HNIs
              </span>
              <h3 className="mt-4 font-display text-xl font-bold text-navy">High-Value Deals (₹5 Cr+)</h3>
              <p className="mt-2 text-xs leading-relaxed text-charcoal/70">
                Exclusive sea-facing penthouses, pre-leased corporate offices, and land parcels with private legal audits and personal relationship managers.
              </p>

              <div className="my-6 rounded-xl border border-charcoal/10 bg-[#f8fafc] p-4 text-xs grid grid-cols-2 gap-2.5">
                <span className="flex items-center gap-1.5 text-charcoal/80 font-medium">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#C5A059] shrink-0" /> Curated Luxury Deals
                </span>
                <span className="flex items-center gap-1.5 text-charcoal/80 font-medium">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#C5A059] shrink-0" /> 30-Year Title Checks
                </span>
                <span className="flex items-center gap-1.5 text-charcoal/80 font-medium">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#C5A059] shrink-0" /> Commercial Offices
                </span>
                <span className="flex items-center gap-1.5 text-charcoal/80 font-medium">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#C5A059] shrink-0" /> End-to-End Handover
                </span>
              </div>
            </div>

            <Link
              className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl bg-navy px-4 text-xs font-bold text-white shadow-sm transition-all duration-200 hover:bg-navy/90 hover:shadow-md active:scale-[0.98]"
              href="/hni"
            >
              <span>Explore Big Investor Desk</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Card 3: Market Intelligence Graphic Card */}
          <div className="flex flex-col justify-between rounded-2xl border-2 border-[#C5A059]/80 bg-gradient-to-br from-white via-white to-gold/10 p-7 shadow-[0_8px_25px_-5px_rgba(197,160,89,0.2)] transition-all duration-200 hover:shadow-[0_20px_35px_-5px_rgba(197,160,89,0.3)] hover:-translate-y-1">
            <div>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-bold text-emerald-800">
                  <TrendingUp className="h-3.5 w-3.5 text-emerald-700" />
                  <span>Price Comparison Tool</span>
                </span>
                <span className="text-xs font-extrabold text-emerald-700">Save 23%</span>
              </div>

              <h3 className="mt-4 font-display text-xl font-bold text-navy">See Your Exact Savings</h3>
              <p className="mt-2 text-xs leading-relaxed text-charcoal/70">
                Compare the bank&apos;s starting price with government Ready Reckoner circle rates and recent registry sales in the same locality.
              </p>

              {/* Live Metric Box with Depth */}
              <div className="my-6 rounded-xl border border-charcoal/15 bg-white p-4 shadow-sm text-xs space-y-2.5">
                <div className="flex justify-between items-center text-charcoal/65">
                  <span className="font-medium">Normal Market Price:</span>
                  <span className="font-mono text-sm font-semibold text-charcoal/50 line-through">₹1.95 Cr</span>
                </div>
                <div className="flex justify-between items-center font-bold text-navy">
                  <span>Bank Auction Starting Price:</span>
                  <span className="font-mono text-base font-extrabold text-navy">₹1.50 Cr</span>
                </div>
                <div className="flex justify-between items-center text-[11px] border-t border-charcoal/10 pt-2 text-emerald-700 font-semibold">
                  <span className="flex items-center gap-1">
                    <Percent className="h-3 w-3" />
                    <span>Your Direct Savings:</span>
                  </span>
                  <span>-23% (Save ₹45 Lakhs Below Market)</span>
                </div>
              </div>
            </div>

            <Link
              className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl border border-navy/30 bg-white px-4 text-xs font-bold text-navy shadow-xs transition-all duration-200 hover:bg-navy/5 active:scale-[0.98]"
              href="/how-it-works"
            >
              <span>See How the 6-Step Process Works</span>
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
            <span>Practice with Zero Risk</span>
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-navy sm:text-4xl tracking-tight">
            Try Our Free Auction Simulator Before Bidding Real Money
          </h2>
          <p className="mt-3 text-sm text-charcoal/75 max-w-2xl mx-auto leading-relaxed">
            Learn how online bank auctions work without risking a single rupee. Experience real countdown timers, practice staying within your budget, and learn what happens when you win.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3.5">
            <Link
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-navy px-6 text-xs font-bold text-white shadow-md transition-all duration-200 hover:bg-navy/90 hover:shadow-lg active:scale-[0.98]"
              href="/simulator"
            >
              <span>Practice in Free Simulator</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-navy/30 bg-white px-6 text-xs font-bold text-navy shadow-xs transition-all duration-200 hover:bg-navy/5 active:scale-[0.98]"
              href="/how-it-works"
            >
              <span>Read the Simple 6-Step Guide</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. STATUTORY & BIDDING FAQ ACCORDION */}
      <FaqSection />
    </div>
  );
}
