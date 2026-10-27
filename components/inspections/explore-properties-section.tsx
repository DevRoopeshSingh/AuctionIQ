"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  CircleDollarSign,
  Lock,
  FileCheck2,
  KeyRound,
  Coins,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { Badge } from "@/components/ui/primitives";
import { LISTED_PROPERTIES, type PropertyListing } from "@/lib/properties/data";
import { DueDiligenceModal } from "@/components/properties/due-diligence-modal";
import {
  InspectionArrangementModal,
  type PropertyInspectionDetails,
} from "./inspection-arrangement-modal";

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
          <Badge tone="warning">Active Bank Inventory</Badge>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl" id="explore-title">
            Featured Statutory Bank Auctions
          </h2>
          <p className="mt-3 leading-relaxed text-sm sm:text-base text-charcoal/75">
            Preview verified SARFAESI auction notices across South Mumbai and Navi Mumbai. Verified members receive automated <strong>physical inspection passes</strong> via <strong>SmartDoor</strong> digital locks, authenticated <strong>due diligence dossiers</strong>, and structured <strong>auction bridge financing</strong>.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            className="inline-flex items-center gap-2 rounded-xl bg-navy px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:bg-navy/90 hover:shadow-md active:scale-[0.98]"
            href="/explore"
          >
            <Search className="h-3.5 w-3.5" />
            <span>Search &amp; Map Directory</span>
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

      <div className="mt-9 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {LISTED_PROPERTIES.slice(0, 3).map((item) => (
          <div
            className="flex flex-col justify-between overflow-hidden rounded-2xl border border-charcoal/10 bg-white shadow-[0_4px_20px_-2px_rgba(15,23,42,0.06)] transition-all duration-200 hover:border-[#C5A059]/70 hover:shadow-[0_20px_35px_-5px_rgba(15,23,42,0.12)] hover:-translate-y-1"
            key={item.ref}
          >
            <div className="p-6">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="rounded-md bg-navy/10 px-2.5 py-1 text-navy font-bold">{item.area}</span>
                <span className="font-mono text-charcoal/50 text-[11px]">{item.ref}</span>
              </div>
              <h3 className="mt-3 font-display text-lg font-bold text-navy tracking-tight">{item.title}</h3>
              <p className="text-xs font-medium text-charcoal/60 mt-0.5">{item.unitConfig} · {item.noticeType}</p>

              <div className="mt-4 rounded-xl border border-charcoal/10 bg-[#f8fafc] p-3.5 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-charcoal/65 font-medium">Reserve Price:</span>
                  <span className="font-bold text-navy font-mono text-sm">{item.reservePriceDisplay}</span>
                </div>
                <div className="mt-1.5 flex justify-between items-center">
                  <span className="text-charcoal/65">Earnest Deposit (EMD):</span>
                  <span className="font-semibold text-charcoal/85 font-mono">{item.emdDisplay}</span>
                </div>
                <div className="mt-1.5 flex justify-between items-center">
                  <span className="text-charcoal/65">Auction Date:</span>
                  <span className="font-semibold text-charcoal/85">{item.auctionDate}</span>
                </div>
                <div className="mt-2.5 flex items-center justify-between border-t border-charcoal/10 pt-2 text-[11px]">
                  <span className="text-charcoal/65">SmartDoor Lock:</span>
                  <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-700">
                    <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Online · {item.smartDoorDevice}</span>
                  </span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs">
                <span className="inline-flex items-center gap-1 font-bold text-emerald-800">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-700" />
                  <span>Safety Score: {item.dueDiligence.riskScore}/100</span>
                </span>
                <span className="font-bold text-[#C5A059]">
                  {item.dueDiligence.marketComparison.discountToMarketPercent}% Off Market
                </span>
              </div>

              <div className="mt-4 space-y-2 border-t border-charcoal/10 pt-3.5">
                <p className="text-[10px] font-bold uppercase tracking-wider text-charcoal/50">
                  Investor Tier Access
                </p>
                {item.lockedItems.map((locked) => (
                  <div className="flex items-center gap-2 text-xs text-charcoal/70" key={locked}>
                    <Lock className="h-3 w-3 text-[#C5A059] shrink-0" />
                    <span>{locked}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-charcoal/10 bg-ivory/50 p-4 space-y-2">
              <button
                className="inline-flex w-full min-h-10 items-center justify-center gap-2 rounded-xl bg-navy px-3 py-2 text-xs font-semibold text-white shadow-xs transition-all duration-200 hover:bg-navy/90 hover:shadow-sm active:scale-[0.98]"
                onClick={() => setActiveDueDiligence(item)}
                type="button"
              >
                <FileCheck2 className="h-3.5 w-3.5" />
                <span>View Due Diligence Report</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-xl border border-navy/30 bg-white px-2 py-1.5 text-xs font-semibold text-navy shadow-2xs transition-all duration-200 hover:bg-navy/5 active:scale-[0.98]"
                  onClick={() => handleOpenInspection(item)}
                  type="button"
                >
                  <KeyRound className="h-3.5 w-3.5" />
                  <span>Inspection</span>
                </button>

                <Link
                  className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-xl border border-[#C5A059] bg-[#C5A059]/15 px-2 py-1.5 text-xs font-bold text-navy shadow-2xs transition-all duration-200 hover:bg-[#C5A059]/25 active:scale-[0.98]"
                  href={`/finance?ref=${item.ref}`}
                >
                  <Coins className="h-3.5 w-3.5" />
                  <span>Finance Help</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-9 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-charcoal/10 bg-white p-5 shadow-sm text-xs">
        <p className="text-charcoal/75 font-medium">
          Seeking full portfolio search with geospatial coordinates and interactive filters?
        </p>
        <Link
          className="inline-flex items-center gap-1.5 rounded-xl bg-navy px-5 py-2.5 text-xs font-semibold text-white shadow-xs transition-all duration-200 hover:bg-navy/90 active:scale-[0.98]"
          href="/explore"
        >
          <span>Open Full Search Directory &amp; Map</span>
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
