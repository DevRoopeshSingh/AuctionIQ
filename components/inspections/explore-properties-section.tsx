"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  CircleDollarSign,
  FileCheck2,
  KeyRound,
  ShieldCheck,
  ArrowRight,
  Landmark,
  MapPin,
} from "lucide-react";
import { Badge } from "@/components/ui/primitives";
import { LISTED_PROPERTIES, type PropertyListing } from "@/lib/properties/data";
import { DueDiligenceModal } from "@/components/properties/due-diligence-modal";
import {
  InspectionArrangementModal,
  type PropertyInspectionDetails,
} from "./inspection-arrangement-modal";

const cardImageThumbnails = [
  { src: "/images/mumbai-property.jpg", alt: "Worli Sea Face residential tower" },
  { src: "/images/navi-mumbai.jpg", alt: "Grade-A IT park corporate tower" },
  { src: "/images/hni_luxury_deal.jpg", alt: "Duplex penthouse & ocean sky deck" },
];

export function ExplorePropertiesSection() {
  const router = useRouter();
  const [activeProperty, setActiveProperty] = useState<PropertyInspectionDetails | null>(null);
  const [activeDueDiligence, setActiveDueDiligence] = useState<PropertyListing | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenInspection = (prop: PropertyListing) => {
    setActiveProperty({
      ref: prop.ref,
      title: prop.title,
      area: prop.area,
      carpet: `${prop.carpetAreaSqFt} sq.ft`,
      reserve: prop.reservePriceDisplay,
      statutoryDate: prop.statutoryInspectionDates,
      possession: prop.possessionStatus,
      smartDoorDevice: prop.smartDoorDevice,
    });
    setIsModalOpen(true);
  };

  return (
    <section aria-labelledby="explore-title" className="border-t border-charcoal/10 py-16" id="explore">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <Badge tone="warning">Verified Bank Properties</Badge>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl" id="explore-title">
            Featured Bank Auction Properties
          </h2>
          <p className="mt-3 leading-relaxed text-sm sm:text-base text-charcoal/75">
            Browse verified bank auction properties in Mumbai and Navi Mumbai. Click on any property to see its <strong>legal check report</strong>, book an in-person <strong>house visit (SmartDoor)</strong>, or check <strong>fast 15-day loan</strong> options.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            className="inline-flex items-center gap-2 rounded-xl bg-navy px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:bg-navy/90 hover:shadow-md active:scale-[0.98]"
            href="/explore"
          >
            <Search className="h-3.5 w-3.5" />
            <span>Search All on Map</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <Link
            className="inline-flex items-center gap-2 rounded-xl border border-[#C5A059] bg-[#C5A059]/15 px-4 py-2.5 text-xs font-bold text-navy shadow-xs transition-all duration-200 hover:bg-[#C5A059]/25 hover:shadow-sm active:scale-[0.98]"
            href="/finance"
          >
            <CircleDollarSign className="h-3.5 w-3.5 text-navy" />
            <span>Auction Loan Help</span>
          </Link>
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {LISTED_PROPERTIES.slice(0, 3).map((item, idx) => {
          const thumb = cardImageThumbnails[idx % cardImageThumbnails.length];
          const bankShort = item.bankName.split("(")[0].trim();
          const isPhysical = item.possessionStatus.toLowerCase().includes("physical");

          return (
            <div
              className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-charcoal/10 bg-white shadow-[0_4px_20px_-2px_rgba(15,23,42,0.06)] transition-all duration-300 hover:border-[#C5A059]/70 hover:shadow-[0_20px_35px_-5px_rgba(15,23,42,0.12)] hover:-translate-y-1"
              key={item.ref}
            >
              {/* Top Photographic Banner */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                <Image
                  src={thumb.src}
                  alt={thumb.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />

                {/* Top Badges: Bank & Possession */}
                <div className="absolute top-3 inset-x-3 flex items-center justify-between text-xs">
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-black/60 px-2.5 py-1 font-semibold text-white backdrop-blur-md text-[11px] border border-white/10">
                    <Landmark className="h-3 w-3 text-[#D4AF37]" />
                    <span>{bankShort}</span>
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-[11px] font-semibold backdrop-blur-md border ${
                      isPhysical
                        ? "bg-emerald-950/70 text-emerald-300 border-emerald-500/30"
                        : "bg-amber-950/70 text-amber-300 border-amber-500/30"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${isPhysical ? "bg-emerald-400" : "bg-amber-400"}`}
                    />
                    <span>{isPhysical ? "Physical Possession (Keys Ready)" : "Symbolic Possession"}</span>
                  </span>
                </div>

                {/* Bottom Overlay: Location and Ref */}
                <div className="absolute bottom-3 inset-x-3 flex items-center justify-between text-white text-xs gap-2">
                  <span className="inline-flex items-center gap-1 font-medium bg-black/60 px-2.5 py-1 rounded-md backdrop-blur-md truncate max-w-[70%]">
                    <MapPin className="h-3 w-3 text-[#D4AF37] shrink-0" />
                    <span className="truncate">{item.subLocality.split(",")[0]}, {item.city}</span>
                  </span>
                  <span className="font-mono text-[10px] text-white/90 bg-black/60 px-2 py-1 rounded-md backdrop-blur-md whitespace-nowrap shrink-0 font-semibold tracking-wider">
                    {item.ref}
                  </span>
                </div>
              </div>

              {/* Card Body with Clear Hierarchy & Breathing Room */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                {/* Title & Configuration */}
                <div>
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="font-semibold text-navy/70 tracking-wide uppercase text-[11px] truncate">
                      {item.unitConfig.replace(/\s*\([^)]*\)/g, "").trim()}
                    </span>
                    <span className="font-medium text-charcoal/50 text-[11px] shrink-0">
                      {item.carpetAreaSqFt.toLocaleString("en-IN")} sq.ft
                    </span>
                  </div>
                  <h3
                    className="mt-1.5 font-display text-base sm:text-lg font-bold text-navy tracking-tight line-clamp-2 min-h-[3.25rem] leading-snug group-hover:text-[#9A7B38] transition-colors"
                    title={item.title}
                  >
                    {item.title}
                  </h3>
                </div>

                {/* Hero Pricing & Market Spread */}
                <div className="flex items-end justify-between rounded-xl bg-slate-50 border border-charcoal/8 px-3.5 py-2.5">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal/50 block">
                      Starting Price (Reserve)
                    </span>
                    <div className="mt-0.5 flex items-baseline gap-2">
                      <span className="font-display text-lg sm:text-xl font-extrabold text-navy tracking-tight">
                        {item.reservePriceDisplay}
                      </span>
                      {item.marketValueDisplay && (
                        <span className="text-xs font-medium text-charcoal/45 line-through">
                          {item.marketValueDisplay}
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700 border border-emerald-200/70 shrink-0">
                    {item.dueDiligence.marketComparison.discountToMarketPercent}% below market
                  </span>
                </div>

                {/* Statutory Terms: EMD & Auction Date */}
                <div className="grid grid-cols-2 gap-2.5 text-xs">
                  <div className="rounded-lg border border-charcoal/8 bg-white p-2.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal/50 block">
                      Token Deposit (10% EMD)
                    </span>
                    <span className="mt-0.5 font-mono text-xs font-bold text-charcoal/90 block">
                      {item.emdDisplay}
                    </span>
                  </div>
                  <div className="rounded-lg border border-charcoal/8 bg-white p-2.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal/50 block">
                      Auction Date
                    </span>
                    <span className="mt-0.5 text-xs font-bold text-charcoal/90 flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                      {item.auctionDate}
                    </span>
                  </div>
                </div>

                {/* Verified Diligence & Inspection Strip */}
                <div className="flex items-center justify-between text-xs pt-1 border-t border-charcoal/10 text-charcoal/75">
                  <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-800">
                    <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Safety Score: {item.dueDiligence.riskScore}/100</span>
                  </span>
                  <span className="inline-flex items-center gap-1 font-medium text-navy/80 text-[11px]">
                    <KeyRound className="h-3.5 w-3.5 text-[#C5A059] shrink-0" />
                    <span>SmartDoor Visit Ready</span>
                  </span>
                </div>
              </div>

              {/* Clean 2-Button Action Bar */}
              <div className="border-t border-charcoal/10 bg-[#fbfcfd] p-4 flex items-center gap-2.5">
                <button
                  className="flex-1 inline-flex min-h-10 items-center justify-center gap-1.5 rounded-xl bg-navy px-3 py-2 text-xs font-semibold text-white shadow-xs transition-all duration-200 hover:bg-navy/90 hover:shadow-sm active:scale-[0.98]"
                  onClick={() => setActiveDueDiligence(item)}
                  type="button"
                >
                  <FileCheck2 className="h-3.5 w-3.5 text-[#D4AF37]" />
                  <span>View Legal Report</span>
                  <ArrowRight className="h-3.5 w-3.5 text-white/70" />
                </button>

                <button
                  className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-xl border border-charcoal/20 bg-white px-3.5 py-2 text-xs font-semibold text-navy shadow-2xs transition-all duration-200 hover:bg-navy/5 active:scale-[0.98]"
                  onClick={() => handleOpenInspection(item)}
                  type="button"
                  title="Schedule SmartDoor physical house visit"
                >
                  <KeyRound className="h-3.5 w-3.5 text-[#C5A059]" />
                  <span>Visit</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-9 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-charcoal/10 bg-white p-5 shadow-sm text-xs">
        <p className="text-charcoal/75 font-medium">
          Looking for more bank auction properties with interactive map and filters?
        </p>
        <Link
          className="inline-flex items-center gap-1.5 rounded-xl bg-navy px-5 py-2.5 text-xs font-semibold text-white shadow-xs transition-all duration-200 hover:bg-navy/90 active:scale-[0.98]"
          href="/explore"
        >
          <span>Search All Properties on Map</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Render the Inspection Arrangement Modal when opened */}
      {activeProperty && (
        <InspectionArrangementModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          property={activeProperty}
        />
      )}

      {/* Render Due Diligence Modal */}
      {activeDueDiligence && (
        <DueDiligenceModal
          isOpen={Boolean(activeDueDiligence)}
          onApplyFinance={() => {
            router.push(`/finance?ref=${activeDueDiligence.ref}`);
          }}
          onArrangeInspection={() => handleOpenInspection(activeDueDiligence)}
          onClose={() => setActiveDueDiligence(null)}
          property={activeDueDiligence}
        />
      )}
    </section>
  );
}
