"use client";

import { useEffect } from "react";
import { Badge, Button } from "@/components/ui/primitives";
import type { PropertyListing } from "@/lib/properties/data";
import { X, CheckCircle2, KeyRound, Coins } from "lucide-react";

interface DueDiligenceModalProps {
  property: PropertyListing;
  isOpen: boolean;
  onClose: () => void;
  onArrangeInspection?: () => void;
  onApplyFinance?: () => void;
}

export function DueDiligenceModal({
  property,
  isOpen,
  onClose,
  onArrangeInspection,
  onApplyFinance,
}: DueDiligenceModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const { dueDiligence } = property;

  return (
    <div
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-charcoal/75 p-4 backdrop-blur-md"
      role="dialog"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative my-8 w-full max-w-4xl rounded-2xl border border-gold/40 bg-white shadow-2xl transition-all">
        {/* Header */}
        <div className="border-b border-charcoal/10 bg-navy px-6 py-5 text-white">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/15 px-2.5 py-0.5 text-xs font-semibold text-gold">
                  Property Legal &amp; Value Report
                </span>
                <span className="text-xs text-white/60">Notice Ref: {property.ref}</span>
              </div>
              <h2 className="mt-1 font-display text-xl font-bold text-white sm:text-2xl">
                {property.title}
              </h2>
              <p className="text-xs text-white/80">
                {property.subLocality} · {property.city} · Bank: {property.bankName}
              </p>
            </div>
            <button
              aria-label="Close modal"
              className="rounded-full p-2 text-white/70 hover:bg-white/10 hover:text-white transition-colors duration-200"
              onClick={onClose}
              type="button"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Quick Stats Bar */}
          <div className="mt-4 grid grid-cols-2 gap-2 rounded-xl bg-white/10 p-3 sm:grid-cols-4 text-xs">
            <div>
              <span className="text-white/60">Starting Price (Reserve):</span>
              <p className="font-bold text-white text-sm">{property.reservePriceDisplay}</p>
            </div>
            <div>
              <span className="text-white/60">Safety Rating:</span>
              <p className="font-bold text-emerald-400 text-sm">
                {dueDiligence.riskScore}/100 ({dueDiligence.overallRiskLevel.toUpperCase()} RISK)
              </p>
            </div>
            <div>
              <span className="text-white/60">Price Discount:</span>
              <p className="font-bold text-gold text-sm">
                {dueDiligence.marketComparison.discountToMarketPercent}% below market price
              </p>
            </div>
            <div>
              <span className="text-white/60">Expected Rental Return:</span>
              <p className="font-bold text-white text-sm">
                {dueDiligence.marketComparison.grossRentalYieldPercent}% Annual Yield
              </p>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="max-h-[75vh] overflow-y-auto p-6 space-y-6 text-sm">
          {/* SECTION 1: VERIFIED LEGAL TITLE & DOCUMENTATION */}
          <section className="rounded-xl border border-charcoal/15 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between border-b border-charcoal/10 pb-3">
              <div>
                <h3 className="font-display text-base font-bold text-navy">
                  1. Title &amp; Ownership Check (Due Diligence)
                </h3>
                <p className="text-xs text-charcoal/65">
                  Verified against CERSAI central loan registry, court records, and local sub-registrar office.
                </p>
              </div>
              <Badge tone="success">100% Clear Title</Badge>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2 text-xs">
              <div className="rounded-lg bg-ivory/60 p-3">
                <span className="text-charcoal/60">Central Loan Registry (CERSAI):</span>
                <p className="flex items-center gap-1 font-semibold text-navy mt-0.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span>Registered ({dueDiligence.titleVerification.cersaiRef})</span>
                </p>
                <p className="text-[11px] text-charcoal/60 mt-1">
                  Verified: No hidden mortgages or unpaid loans from other banks or NBFCs.
                </p>
              </div>

              <div className="rounded-lg bg-ivory/60 p-3">
                <span className="text-charcoal/60">Bank Legal Process (SARFAESI):</span>
                <p className="flex items-center gap-1 font-semibold text-navy mt-0.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span>{dueDiligence.titleVerification.sarfaesiNoticeStatus}</span>
                </p>
                <p className="text-[11px] text-charcoal/60 mt-1">
                  The bank served the required 60-day borrower notice and took legal possession.
                </p>
              </div>

              <div className="rounded-lg bg-ivory/60 p-3">
                <span className="text-charcoal/60">Sub-Registrar Ownership Search:</span>
                <p className="flex items-center gap-1 font-semibold text-navy mt-0.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span>{dueDiligence.titleVerification.encumbranceCertificateYears}-Year Clear Ownership Record</span>
                </p>
                <p className="text-[11px] text-charcoal/60 mt-1">
                  No active court stays, family property disputes, or third-party claims.
                </p>
              </div>

              <div className="rounded-lg bg-ivory/60 p-3">
                <span className="text-charcoal/60">Society NOC &amp; Property Tax:</span>
                <p className="font-semibold text-navy mt-0.5">
                  {dueDiligence.titleVerification.societyNocStatus} · Municipal Tax Paid
                </p>
                <p className="text-[11px] text-charcoal/60 mt-1">
                  Pending society maintenance: ₹{(dueDiligence.titleVerification.pendingSocietyDuesInr).toLocaleString("en-IN")} (factored into your bidding budget).
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 2: MARKET COMPARISONS & RENTAL VALUATION */}
          <section className="rounded-xl border border-charcoal/15 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between border-b border-charcoal/10 pb-3">
              <div>
                <h3 className="font-display text-base font-bold text-navy">
                  2. Real Market Value &amp; Rental Potential
                </h3>
                <p className="text-xs text-charcoal/65">
                  Comparing the bank's starting price with official government circle rates and recent neighbor sales.
                </p>
              </div>
              <span className="font-mono text-xs font-bold text-navy bg-gold/20 px-2.5 py-1 rounded">
                ₹{dueDiligence.marketComparison.auctionReserveRatePerSqFt.toLocaleString("en-IN")}/sq.ft Starting Rate
              </span>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3 text-xs">
              <div className="rounded-lg border border-charcoal/10 p-3">
                <span className="text-charcoal/60">Govt Circle Rate (Ready Reckoner):</span>
                <p className="font-bold text-navy text-sm mt-0.5">
                  ₹{dueDiligence.marketComparison.circleRatePerSqFt.toLocaleString("en-IN")}/sq.ft
                </p>
              </div>
              <div className="rounded-lg border border-charcoal/10 p-3">
                <span className="text-charcoal/60">Typical Market Selling Rate:</span>
                <p className="font-bold text-navy text-sm mt-0.5">
                  ₹{dueDiligence.marketComparison.prevailingMarketRatePerSqFt.toLocaleString("en-IN")}/sq.ft
                </p>
              </div>
              <div className="rounded-lg border border-charcoal/10 p-3">
                <span className="text-charcoal/60">Expected Monthly Rent:</span>
                <p className="font-bold text-emerald-700 text-sm mt-0.5">
                  ₹{dueDiligence.marketComparison.expectedMonthlyRentInr.toLocaleString("en-IN")}/month
                </p>
              </div>
            </div>

            {/* Registry Comparables Table */}
            <div className="mt-4">
              <p className="text-xs font-semibold text-charcoal/70 mb-2 uppercase tracking-wider">
                Recent Real Transactions Registered in This Exact Neighborhood
              </p>
              <div className="overflow-x-auto rounded-lg border border-charcoal/15">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#f1f5f9] text-charcoal/75">
                    <tr>
                      <th className="p-2.5">Building / Street</th>
                      <th className="p-2.5">Flat Configuration</th>
                      <th className="p-2.5">Registered Sale Rate</th>
                      <th className="p-2.5">Registration Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-charcoal/10">
                    {dueDiligence.marketComparison.recentRegistryComparables.map((comp, idx) => (
                      <tr key={idx}>
                        <td className="p-2.5 font-medium text-navy">{comp.buildingOrRoad}</td>
                        <td className="p-2.5 text-charcoal/70">{comp.unitType}</td>
                        <td className="p-2.5 font-bold text-navy">
                          ₹{comp.registeredRatePerSqFt.toLocaleString("en-IN")}/sq.ft
                        </td>
                        <td className="p-2.5 text-charcoal/60">{comp.saleDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* SECTION 3: MAX BIDDING LIMIT PLANNER */}
          <section className="rounded-xl border border-charcoal/15 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between border-b border-charcoal/10 pb-3">
              <div>
                <h3 className="font-display text-base font-bold text-navy">
                  3. Safe Bidding Price Planner
                </h3>
                <p className="text-xs text-charcoal/65">
                  Pre-calculated bidding ceilings so you never overbid or compromise your profit margin.
                </p>
              </div>
              <Badge tone="warning">Bidding Budget</Badge>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border-2 border-emerald-500/30 bg-emerald-50/50 p-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
                  Recommended Safe Bidding Limit
                </span>
                <p className="mt-1 font-display text-2xl font-extrabold text-navy">
                  ₹{(dueDiligence.maxBiddingPlanner.conservativeCeilingInr).toLocaleString("en-IN")}
                </p>
                <p className="mt-1 text-xs text-charcoal/70">
                  Guarantees at least a 25% profit margin after paying all taxes, repairs, and fees.
                </p>
              </div>

              <div className="rounded-xl border border-gold/50 bg-gold/10 p-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-charcoal/70">
                  Maximum Hard Ceiling
                </span>
                <p className="mt-1 font-display text-2xl font-bold text-navy">
                  ₹{(dueDiligence.maxBiddingPlanner.aggressiveCeilingInr).toLocaleString("en-IN")}
                </p>
                <p className="mt-1 text-xs text-charcoal/70">
                  Absolute maximum price. Never bid above this amount under any circumstances.
                </p>
              </div>
            </div>

            {/* Cost Breakdown */}
            <div className="mt-4 rounded-lg bg-ivory/60 p-3.5 text-xs">
              <span className="font-semibold text-navy">Extra Costs Already Factored into These Limits:</span>
              <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4 text-charcoal/80">
                <div>
                  <span className="text-charcoal/50">Renovation &amp; Paint:</span>
                  <p className="font-semibold">
                    ₹{(dueDiligence.maxBiddingPlanner.costBreakdown.expectedRenovationInr).toLocaleString("en-IN")}
                  </p>
                </div>
                <div>
                  <span className="text-charcoal/50">Unpaid Society Dues:</span>
                  <p className="font-semibold">
                    ₹{(dueDiligence.maxBiddingPlanner.costBreakdown.unpaidDuesProvisionInr).toLocaleString("en-IN")}
                  </p>
                </div>
                <div>
                  <span className="text-charcoal/50">Stamp Duty &amp; Registry:</span>
                  <p className="font-semibold">
                    ₹{(dueDiligence.maxBiddingPlanner.costBreakdown.stampDutyAndRegistrationInr).toLocaleString("en-IN")}
                  </p>
                </div>
                <div>
                  <span className="text-charcoal/50">Loan &amp; Interest Cost:</span>
                  <p className="font-semibold">
                    ₹{(dueDiligence.maxBiddingPlanner.costBreakdown.costOfCapitalInr).toLocaleString("en-IN")}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 4: IDENTIFIED RISKS & MITIGATION STRATEGY */}
          <section className="rounded-xl border border-charcoal/15 bg-white p-5 shadow-sm">
            <h3 className="font-display text-base font-bold text-navy border-b border-charcoal/10 pb-3">
              4. Property Checks &amp; How We Protect You
            </h3>

            <div className="mt-4 space-y-3">
              {dueDiligence.identifiedIssuesAndRisks.map((issue, idx) => (
                <div
                  className="rounded-lg border border-charcoal/15 bg-white p-3.5 text-xs shadow-xs"
                  key={idx}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-navy">
                      Check: {issue.category}
                    </span>
                    <Badge tone={issue.severity === "low" ? "success" : "warning"}>
                      {issue.severity.toUpperCase()} RISK
                    </Badge>
                  </div>
                  <p className="mt-1.5 text-charcoal/80">{issue.summary}</p>
                  <div className="mt-2 rounded bg-emerald-50/70 p-2 text-emerald-900 border-l-2 border-emerald-600">
                    <span className="font-semibold">How AuctionIQ Solves This: </span>
                    <span>{issue.mitigationStrategy}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Modal Actions Footer */}
        <div className="border-t border-charcoal/10 bg-ivory/50 px-6 py-4 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-charcoal/60">
            Report authenticated by AuctionIQ. All property records verified with CERSAI and Sub-Registrar.
          </div>
          <div className="flex flex-wrap gap-2">
            {onArrangeInspection && (
              <Button
                onClick={() => {
                  onClose();
                  onArrangeInspection();
                }}
                tone="primary"
              >
                <KeyRound className="h-4 w-4 inline mr-1.5" />
                <span>Book Property Visit (SmartDoor)</span>
              </Button>
            )}
            {onApplyFinance && (
              <Button
                onClick={() => {
                  onClose();
                  onApplyFinance();
                }}
                tone="accent"
              >
                <Coins className="h-4 w-4 inline mr-1.5" />
                <span>Apply for Fast 15-Day Loan</span>
              </Button>
            )}
            <Button onClick={onClose} tone="secondary">
              Close Report
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
