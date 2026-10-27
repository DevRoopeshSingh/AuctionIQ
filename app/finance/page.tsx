"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/primitives";
import { LISTED_PROPERTIES } from "@/lib/properties/data";
import {
  CheckCircle2,
  Zap,
  ShieldCheck,
  Search,
  RefreshCw,
  Clock,
  ShieldAlert,
} from "lucide-react";

function FinanceContent() {
  const searchParams = useSearchParams();
  const propertyRef = searchParams.get("ref");

  const prefilledProperty = LISTED_PROPERTIES.find((p) => p.ref === propertyRef);

  // Form State initialized directly from prefilledProperty
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [assistanceStage, setAssistanceStage] = useState<
    "pre_bidding" | "won_auction_15_days" | "refinance" | "property_eligibility"
  >("won_auction_15_days");
  const [propertyInput, setPropertyInput] = useState(
    prefilledProperty ? `${prefilledProperty.ref} — ${prefilledProperty.title}` : ""
  );
  const [bankName, setBankName] = useState(prefilledProperty ? prefilledProperty.bankName : "");
  const [propertyValue, setPropertyValue] = useState(
    prefilledProperty ? prefilledProperty.reservePriceInr.toString() : "45000000"
  );
  const [loanRequired, setLoanRequired] = useState(
    prefilledProperty ? Math.round(prefilledProperty.reservePriceInr * 0.7).toString() : "30000000"
  );
  const [daysRemaining, setDaysRemaining] = useState("12");
  const [notes, setNotes] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [inquiryRef, setInquiryRef] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setInquiryRef(`FIN_AIQ_${Date.now().toString(36).toUpperCase()}`);
    }, 900);
  };

  return (
    <div>
      {/* 1. BESPOKE HERO BANNER WITH SIGNATURE MESH GRADIENT */}
      <section className="relative overflow-hidden bg-[#06101E] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(197,160,89,0.18),rgba(255,255,255,0))] bg-gradient-to-br from-[#06101E] via-[#0B1E38] to-[#040913] py-16 text-white sm:py-20">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#C5A059]/30 bg-[#C5A059]/10 px-3.5 py-1 text-xs font-semibold tracking-wider uppercase text-[#D4AF37] backdrop-blur-sm">
              <ShieldCheck className="h-3.5 w-3.5 text-[#D4AF37]" />
              <span>15-DAY AUCTION LOAN ASSISTANCE</span>
            </div>

            <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-white leading-[1.08]">
              Fast Loans for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E5C17B] via-[#F5E6B8] to-[#C5A059]">
                Bank Auction Properties.
              </span>
            </h1>

            <p className="text-base sm:text-lg leading-relaxed text-white/80 font-normal">
              When you win a bank auction under Indian law (SARFAESI Rule 9), you must pay the remaining 75% of your bid within strictly <strong>15 days</strong>. Regular bank home loans usually take 30 to 60 days. AuctionIQ helps you get fast short-term funding in <strong>7 to 10 days</strong> so you never risk losing your deposit.
            </p>
          </div>

          {/* 15-Day Critical Alert Banner */}
          <div className="mt-10 rounded-2xl border border-white/15 bg-white/5 p-7 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.35)] text-white">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="border-b md:border-b-0 md:border-r border-white/10 pb-5 md:pb-0 md:pr-6">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="h-4 w-4 text-[#D4AF37]" />
                  <span className="rounded bg-[#C5A059]/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#D4AF37]">
                    The 15-Day Payment Rule
                  </span>
                </div>
                <p className="mt-2.5 text-xs leading-relaxed text-white/75 font-normal">
                  Under Indian banking law (SARFAESI Rule 9), the winning bidder must pay the remaining 75% strictly within 15 calendar days. Regular bank loans take 30 to 60 days, putting your initial deposit at risk of forfeiture if you are late.
                </p>
              </div>

              <div className="border-b md:border-b-0 md:border-r border-white/10 pb-5 md:pb-0 md:pr-6">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-emerald-400" />
                  <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                    AuctionIQ Fast Loan in 7–10 Days
                  </span>
                </div>
                <p className="mt-2.5 text-xs leading-relaxed text-white/75 font-normal">
                  We check your eligibility beforehand and arrange fast auction funding disbursed directly to the bank within 7 to 10 working days, protecting your deposit and securing your property on time.
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <RefreshCw className="h-4 w-4 text-white/90" />
                  <span className="rounded bg-white/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                    Convert to Regular Home Loan
                  </span>
                </div>
                <p className="mt-2.5 text-xs leading-relaxed text-white/75 font-normal">
                  Once the bank hands over your official Sale Certificate and property keys, our team helps you convert the short-term bridge loan into a standard low-interest home loan from top Indian banks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN SECTION: Interactive Form & Institutional Comparison */}
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_0.85fr]">
          {/* LEFT: INTERACTIVE ASSISTANCE FORM */}
          <div className="rounded-2xl border border-charcoal/10 bg-white p-7 sm:p-9 shadow-[0_10px_30px_-5px_rgba(15,23,42,0.08)]">
            <div className="border-b border-charcoal/10 pb-4">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#C5A059]">
                LOAN ASSISTANCE DESK
              </span>
              <h2 className="mt-1 font-display text-2xl font-bold text-navy">
                Apply for Bank Auction Financing
              </h2>
              <p className="mt-1 text-xs text-charcoal/70">
                Tell us about your property and payment deadline. Our auction loan specialist will call you within 4 working hours.
              </p>
            </div>

            {isSubmitted ? (
              <div className="mt-8 rounded-2xl border-2 border-emerald-500 bg-emerald-50/60 p-8 text-center">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-600 text-white shadow-md">
                  <CheckCircle2 className="h-9 w-9" />
                </div>
                <h3 className="mt-4 font-display text-2xl font-bold text-navy">
                  Loan Application Received
                </h3>
                <p className="mt-1 text-xs text-charcoal/70">
                  Your Application Number: <strong className="font-mono text-navy font-bold">{inquiryRef}</strong>
                </p>

                <div className="mx-auto mt-6 max-w-md rounded-xl bg-white p-5 text-left text-xs space-y-2.5 border border-emerald-200 shadow-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-charcoal/60">Applicant Name:</span>
                    <span className="font-semibold text-navy">{fullName || "Verified Buyer"}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-charcoal/60">Mobile Number:</span>
                    <span className="font-semibold text-navy font-mono">{phone || "+91 98200 45892"}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-charcoal/60">Loan Amount Requested:</span>
                    <span className="font-bold text-navy font-mono">₹{Number(loanRequired).toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-charcoal/60">Time Remaining:</span>
                    <span className="font-bold text-[#C5A059] flex items-center gap-1 font-mono">
                      <Clock className="h-3.5 w-3.5" />
                      {daysRemaining} Days left to pay bank
                    </span>
                  </div>
                </div>

                <p className="mt-5 text-xs text-emerald-950 font-medium">
                  Our loan specialist is reviewing your property notice and will contact you directly to guide you through the next steps.
                </p>

                <button
                  className="mt-6 inline-flex items-center justify-center rounded-xl bg-navy px-6 py-3 text-xs font-bold text-white shadow-sm transition-all duration-200 hover:bg-navy/90 hover:shadow-md active:scale-[0.98]"
                  onClick={() => setIsSubmitted(false)}
                  type="button"
                >
                  Submit Another Loan Request
                </button>
              </div>
            ) : (
              <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
                {/* Assistance Stage Radio Selection */}
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-charcoal/70">
                    What Stage of the Auction Are You In?
                  </label>
                  <div className="mt-2.5 grid gap-2.5 sm:grid-cols-2 text-xs">
                    {[
                      {
                        id: "won_auction_15_days",
                        icon: Zap,
                        title: "Won Bid · Need 15-Day Loan",
                        desc: "Declared highest bidder; must pay the remaining 75% within 15 calendar days.",
                      },
                      {
                        id: "pre_bidding",
                        icon: ShieldCheck,
                        title: "Pre-Auction Loan Check",
                        desc: "Planning to bid soon; need pre-approval to know your exact borrowing budget.",
                      },
                      {
                        id: "property_eligibility",
                        icon: Search,
                        title: "Check Property Eligibility",
                        desc: "Want to check if a specific bank auction property qualifies for financing.",
                      },
                      {
                        id: "refinance",
                        icon: RefreshCw,
                        title: "Switch to Regular Home Loan",
                        desc: "Bank Sale Certificate issued; ready to convert to a low-interest home loan.",
                      },
                    ].map((item) => {
                      const Icon = item.icon;
                      return (
                        <label
                          className={`flex cursor-pointer flex-col rounded-xl border p-3.5 transition-all duration-200 ${
                            assistanceStage === item.id
                              ? "border-[#C5A059] bg-[#C5A059]/10 shadow-xs ring-1 ring-[#C5A059]"
                              : "border-charcoal/20 bg-white hover:border-[#C5A059]/60 hover:bg-[#f8fafc]"
                          }`}
                          key={item.id}
                        >
                          <div className="flex items-center gap-2">
                            <input
                              checked={assistanceStage === item.id}
                              className="text-[#C5A059] focus:ring-[#C5A059]"
                              name="stage"
                              onChange={() =>
                                setAssistanceStage(
                                  item.id as "pre_bidding" | "won_auction_15_days" | "refinance" | "property_eligibility"
                                )
                              }
                              type="radio"
                            />
                            <Icon className="h-4 w-4 text-[#C5A059]" />
                            <span className="font-bold text-navy">{item.title}</span>
                          </div>
                          <p className="mt-1.5 pl-6 text-[11px] text-charcoal/65 leading-relaxed">{item.desc}</p>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Personal Details */}
                <div className="grid gap-3.5 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-semibold text-charcoal/80">Your Full Name *</label>
                    <input
                      className="mt-1 w-full rounded-xl border border-charcoal/25 bg-white p-2.5 text-xs text-navy font-medium shadow-2xs focus:border-[#C5A059] focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Rupesh Singh"
                      required
                      type="text"
                      value={fullName}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-charcoal/80">Mobile Number (WhatsApp) *</label>
                    <input
                      className="mt-1 w-full rounded-xl border border-charcoal/25 bg-white p-2.5 text-xs text-navy font-medium shadow-2xs focus:border-[#C5A059] focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98200 45892"
                      required
                      type="tel"
                      value={phone}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-charcoal/80">Email Address *</label>
                  <input
                    className="mt-1 w-full rounded-xl border border-charcoal/25 bg-white p-2.5 text-xs text-navy font-medium shadow-2xs focus:border-[#C5A059] focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="rupesh@example.com"
                    required
                    type="email"
                    value={email}
                  />
                </div>

                {/* Property & Bank Information */}
                <div className="grid gap-3.5 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-semibold text-charcoal/80">Property Name or Auction Notice ID *</label>
                    <input
                      className="mt-1 w-full rounded-xl border border-charcoal/25 bg-white p-2.5 text-xs text-navy font-medium shadow-2xs focus:border-[#C5A059] focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
                      onChange={(e) => setPropertyInput(e.target.value)}
                      placeholder="e.g. BOM-WOR-042 or 2BHK Worli Flat"
                      required
                      type="text"
                      value={propertyInput}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-charcoal/80">Name of Selling Bank *</label>
                    <input
                      className="mt-1 w-full rounded-xl border border-charcoal/25 bg-white p-2.5 text-xs text-navy font-medium shadow-2xs focus:border-[#C5A059] focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
                      onChange={(e) => setBankName(e.target.value)}
                      placeholder="e.g. State Bank of India, Bank of Baroda"
                      required
                      type="text"
                      value={bankName}
                    />
                  </div>
                </div>

                {/* Financial Figures */}
                <div className="grid gap-3.5 sm:grid-cols-3">
                  <div>
                    <label className="text-xs font-semibold text-charcoal/80">Winning Bid / Reserve Price (₹) *</label>
                    <input
                      className="mt-1 w-full rounded-xl border border-charcoal/25 bg-white p-2.5 text-xs font-mono text-navy font-medium shadow-2xs focus:border-[#C5A059] focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
                      onChange={(e) => setPropertyValue(e.target.value)}
                      required
                      type="number"
                      value={propertyValue}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-charcoal/80">Loan Amount Needed (₹) *</label>
                    <input
                      className="mt-1 w-full rounded-xl border border-charcoal/25 bg-white p-2.5 text-xs font-mono text-navy font-medium shadow-2xs focus:border-[#C5A059] focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
                      onChange={(e) => setLoanRequired(e.target.value)}
                      required
                      type="number"
                      value={loanRequired}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-charcoal/80">Days Left to Pay Bank *</label>
                    <input
                      className="mt-1 w-full rounded-xl border border-charcoal/25 bg-white p-2.5 text-xs font-mono text-navy font-medium shadow-2xs focus:border-[#C5A059] focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
                      max={90}
                      min={1}
                      onChange={(e) => setDaysRemaining(e.target.value)}
                      required
                      type="number"
                      value={daysRemaining}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-charcoal/80">
                    Additional Details (Optional)
                  </label>
                  <textarea
                    className="mt-1 w-full rounded-xl border border-charcoal/25 bg-white p-2.5 text-xs text-navy shadow-2xs focus:border-[#C5A059] focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Mention if you already paid the 25% amount on auction day, your employment type, or documents ready..."
                    rows={2}
                    value={notes}
                  />
                </div>

                <div className="pt-2">
                  <Button
                    className="w-full text-sm font-bold shadow-md transition-all duration-200 active:scale-[0.98]"
                    disabled={isSubmitting}
                    tone="accent"
                    type="submit"
                  >
                    {isSubmitting ? "Submitting Application..." : "Submit Loan Request →"}
                  </Button>
                  <p className="mt-2.5 text-center text-[11px] text-charcoal/55">
                    100% Private &amp; Secure: Your financial details are shared strictly with verified lending partners for loan sanction.
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* RIGHT: COMPARISON & ELIGIBILITY CHECKLIST */}
          <div className="space-y-6">
            {/* Comparison Card */}
            <div className="rounded-2xl border border-charcoal/10 bg-white p-7 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.06)]">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#C5A059]">
                HOW IT COMPARES
              </span>
              <h3 className="mt-1 font-display text-xl font-bold text-navy">
                AuctionIQ Loan vs Regular Bank Loan
              </h3>

              <div className="mt-4 overflow-hidden rounded-xl border border-charcoal/15 text-xs shadow-xs">
                <table className="w-full text-left">
                  <thead className="bg-[#f8fafc] text-charcoal/70">
                    <tr>
                      <th className="p-3 font-bold">Feature</th>
                      <th className="p-3 text-emerald-800 font-extrabold">AuctionIQ Desk</th>
                      <th className="p-3 text-charcoal/50 font-normal">Regular Bank Loan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-charcoal/10">
                    <tr>
                      <td className="p-3 font-semibold text-navy">Loan Payout Speed</td>
                      <td className="p-3 text-emerald-700 font-bold">7 to 10 Working Days</td>
                      <td className="p-3 text-charcoal/60">30 to 60 Days (Misses 15-day deadline)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-navy">Pre-Auction Sanction</td>
                      <td className="p-3 text-emerald-700 font-bold">Yes, know your limit before bidding</td>
                      <td className="p-3 text-charcoal/60">Rarely given without property registry</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-navy">Paperwork Needed</td>
                      <td className="p-3 text-emerald-700 font-bold">Auction Notice + Bank possession docs</td>
                      <td className="p-3 text-charcoal/60">Demands registered deed upfront</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-navy">Maximum Loan Amount</td>
                      <td className="p-3 text-emerald-700 font-bold">Up to 75% of your winning bid</td>
                      <td className="p-3 text-charcoal/60">Up to 75% of circle rate only</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-navy">Switch to Regular Home Loan</td>
                      <td className="p-3 text-emerald-700 font-bold">Smooth conversion once keys delivered</td>
                      <td className="p-3 text-charcoal/60">Must re-apply from scratch</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Required Verification Paperwork Checklist */}
            <div className="rounded-2xl border border-[#C5A059]/40 bg-[#C5A059]/10 p-7 shadow-sm">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#C5A059]">
                KEEP DOCUMENTS READY
              </span>
              <h3 className="mt-1 font-display text-lg font-bold text-navy">
                Documents for Fast 48-Hour Loan Approval
              </h3>
              <p className="mt-1 text-xs text-charcoal/75 leading-relaxed">
                Having these 4 simple documents ready helps our lending team approve your loan quickly:
              </p>

              <ul className="mt-4 space-y-2.5 text-xs text-charcoal/80">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#C5A059] shrink-0 mt-0.5" />
                  <span>Copy of the Bank's Auction Notice and your bid submission form.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#C5A059] shrink-0 mt-0.5" />
                  <span>Receipt proving you paid the 10% EMD token deposit.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#C5A059] shrink-0 mt-0.5" />
                  <span>Letter from the bank declaring you as the highest bidder (if auction is completed).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#C5A059] shrink-0 mt-0.5" />
                  <span>Your KYC (PAN &amp; Aadhaar) + last 2 years ITR and 6 months bank statement.</span>
                </li>
              </ul>

              <div className="mt-5 border-t border-[#C5A059]/30 pt-3.5 flex items-center justify-between text-xs font-semibold">
                <span className="text-navy">Need urgent loan advice?</span>
                <span className="font-mono text-emerald-800 font-bold">WhatsApp: +91 98200 45892</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FinancePage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm font-semibold text-navy">Loading Auction Finance Desk...</div>}>
      <FinanceContent />
    </Suspense>
  );
}
