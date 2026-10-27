import Image from "next/image";
import Link from "next/link";
import {
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
                <span>INDEPENDENT BANK AUCTION ADVISORY</span>
              </div>

              <h1 className="font-display text-4xl font-extrabold sm:text-5xl lg:text-6xl leading-[1.08] text-white">
                Making Bank Property Auctions{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E5C17B] via-[#F5E6B8] to-[#C5A059]">
                  Safe, Simple &amp; Clear.
                </span>
              </h1>

              <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-white/80 font-normal">
                Bank auctions offer 20% to 35% discounts on homes and plots, but finding clean properties used to be difficult. AuctionIQ brings everything together: verified legal checks, digital property visits, and fast 15-day loans.
              </p>

              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <Link
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#C5A059] px-6 text-xs font-bold text-white shadow-md transition-all duration-200 hover:bg-[#b08e4c] hover:shadow-lg active:scale-[0.98]"
                  href="#mission"
                >
                  <span>Our Mission &amp; Values</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 text-xs font-semibold text-white shadow-xs transition-all duration-200 hover:bg-white/20 active:scale-[0.98]"
                  href="#story"
                >
                  <span>Why We Built AuctionIQ</span>
                </Link>
              </div>
            </div>

            {/* Authentic Buyer Protection Standards Card */}
            <div className="rounded-2xl border border-white/15 bg-[#071324]/85 p-8 sm:p-9 lg:p-10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] backdrop-blur-xl ring-1 ring-white/10 text-white">
              <div className="border-b border-white/10 pb-4">
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#D4AF37]">
                  OUR PROMISE
                </span>
                <h2 className="mt-1 font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Transparent Bank Auctions
                </h2>
                <p className="mt-1 text-xs text-white/65 leading-relaxed font-normal">
                  Strict buyer-first checks applied to every bank auction listing.
                </p>
              </div>

              <div className="mt-6 space-y-4 text-xs">
                <div className="flex items-start gap-3.5 border-b border-white/10 pb-3.5">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/5 text-[#D4AF37] shadow-xs">
                    <Scale className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">30-Year Title Searches</p>
                    <p className="text-white/65 text-xs mt-0.5 leading-relaxed">
                      Every property verified with Sub-Registrar records and CERSAI mortgage registry.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 border-b border-white/10 pb-3.5">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/5 text-[#D4AF37] shadow-xs">
                    <ShieldCheck className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">Clear Possession Status</p>
                    <p className="text-white/65 text-xs mt-0.5 leading-relaxed">
                      Immediate clarity on Physical Possession (keys ready) vs. Symbolic Possession (court order needed).
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 border-b border-white/10 pb-3.5">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/5 text-[#D4AF37] shadow-xs">
                    <Eye className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">In-Person SmartDoor Visits</p>
                    <p className="text-white/65 text-xs mt-0.5 leading-relaxed">
                      Digital visit passes to inspect the flat or commercial unit with your own eyes before bidding.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/5 text-[#D4AF37] shadow-xs">
                    <Handshake className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">Fast 15-Day Loan Desk</p>
                    <p className="text-white/65 text-xs mt-0.5 leading-relaxed">
                      7 to 10 day bridge financing support so you never risk losing your 25% deposit to bank deadlines.
                    </p>
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
                OUR STORY
              </span>
              <h2 className="mt-1 font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl">
                Bringing Total Transparency to Bank Property Auctions
              </h2>
              <h3 className="mt-2 font-display text-base font-semibold text-charcoal/80">
                Turning complex newspaper notices into simple, safe property opportunities.
              </h3>

              <p className="mt-5 text-xs sm:text-sm leading-relaxed text-charcoal/75 font-normal">
                Properties sold in bank auctions are typically 20% to 35% cheaper than market prices. But in the past, buying them was confusing and risky: notices were hidden in small newspaper ads, buyers could rarely inspect the house in person, and banks gave only 15 days to pay the remaining 75% balance or lose their deposit.
              </p>
              <p className="mt-3.5 text-xs sm:text-sm leading-relaxed text-charcoal/75 font-normal">
                AuctionIQ was built by real estate professionals and property lawyers to solve these problems. We verify 30-year ownership deeds, check for hidden loans on the government CERSAI registry, arrange digital SmartDoor house visits, and help arrange fast 15-day bank loans so you can buy with complete peace of mind.
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


      {/* 3. MISSION & VISION */}
      <section className="py-16 bg-[#f8fafc] border-b border-charcoal/10" id="mission">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#C5A059]">
                  OUR PURPOSE
                </span>
                <h2 className="mt-1 font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl">
                  Our Mission &amp; Vision
                </h2>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-2xl border border-charcoal/10 bg-white p-7 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.06)] transition-all duration-200 hover:shadow-md">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-navy/5 text-[#C5A059] shadow-2xs">
                    <Target className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold text-navy">Our Mission</h3>
                  <p className="mt-2 text-xs leading-relaxed text-charcoal/70 font-normal">
                    To make buying bank auction homes easy, transparent, and safe for every Indian family and investor by providing clear legal checks, honest prices, and fast funding support.
                  </p>
                </div>

                <div className="rounded-2xl border border-charcoal/10 bg-white p-7 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.06)] transition-all duration-200 hover:shadow-md">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-navy/5 text-[#C5A059] shadow-2xs">
                    <Eye className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold text-navy">Our Vision</h3>
                  <p className="mt-2 text-xs leading-relaxed text-charcoal/70 font-normal">
                    An open, reliable property market where anyone can safely buy seized bank properties at genuine discounts—without middlemen, legal confusion, or unpleasant surprises.
                  </p>
                </div>
              </div>
            </div>

            {/* Dark Quote Card */}
            <div className="rounded-2xl bg-gradient-to-br from-[#06101E] via-[#0B1E38] to-[#040913] p-9 text-white shadow-xl border border-white/15">
              <span className="text-[#C5A059] text-4xl font-serif">“</span>
              <p className="font-display text-2xl font-bold text-white leading-snug mt-1">
                Buying a home shouldn't be a gamble. When legal checks and fair prices are crystal clear, everyone wins.
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
              OUR COMMITMENT
            </span>
            <h2 className="mt-1 font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              Our 5 Core Promises to You
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-charcoal/70">
              Clear principles applied to every property and legal report on our platform.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5 text-xs">
            {[
              {
                title: "Honesty & Clarity",
                desc: "100% verified information with transparent disclosures on society dues and property status.",
                icon: ShieldCheck,
              },
              {
                title: "Real Market Pricing",
                desc: "Clear comparison with official circle rates and neighbor sales so you never overbid.",
                icon: TrendingUp,
              },
              {
                title: "Protecting Your Money",
                desc: "Guidance to help you stick to safe bidding limits and avoid losing deposits under the 15-day rule.",
                icon: Handshake,
              },
              {
                title: "Thorough Legal Checks",
                desc: "Full 30-year deed searches, CERSAI loan checks, and court records verified by property lawyers.",
                icon: Scale,
              },
              {
                title: "SmartDoor Visits",
                desc: "Book direct digital visit passes to inspect properties in person before bidding.",
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
