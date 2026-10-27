"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  ShieldCheck,
  Gavel,
  Timer,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Building2,
  TrendingUp,
  Banknote,
  FileCheck2,
  ArrowRight,
  Lock,
} from "lucide-react";

interface BidRecord {
  id: string;
  bidder: string;
  amount: number;
  time: string;
  isUser: boolean;
}

export default function SimulatorPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [currentBid, setCurrentBid] = useState(13200000);
  const [statusMessage, setStatusMessage] = useState(
    "Floor bid established. Your turn to submit an increment."
  );
  const [statusTone, setStatusTone] = useState<"neutral" | "success" | "warning">("neutral");
  const [history, setHistory] = useState<BidRecord[]>([
    { id: "b1", bidder: "Bidder #104 (Corporate NBFC)", amount: 12800000, time: "11:42:10 AM", isUser: false },
    { id: "b2", bidder: "Bidder #218 (High Net Worth Desk)", amount: 13000000, time: "11:43:05 AM", isUser: false },
    { id: "b3", bidder: "Bidder #104 (Corporate NBFC)", amount: 13200000, time: "11:43:50 AM", isUser: false },
  ]);

  const reservePrice = 12000000;
  const budgetCeiling = 14500000;
  const standardIncrement = 200000;
  const tacticalIncrement = 500000;

  const ceilingPercentage = Math.min(
    100,
    Math.round(((currentBid - reservePrice) / (budgetCeiling - reservePrice)) * 100)
  );

  const placeIncrement = (inc: number) => {
    const nextAmount = currentBid + inc;
    if (nextAmount > budgetCeiling) {
      setStatusMessage(
        `Bid ₹${(nextAmount / 10000000).toFixed(2)} Cr exceeds your maximum acquisition ceiling of ₹1.45 Cr. Pass or reset.`
      );
      setStatusTone("warning");
      return;
    }

    const now = new Date();
    const timeStr = now.toLocaleTimeString("en-IN", { hour12: true });

    setCurrentBid(nextAmount);
    setHistory((prev) => [
      {
        id: `user-${Date.now()}`,
        bidder: "You (Bidder #302)",
        amount: nextAmount,
        time: timeStr,
        isUser: true,
      },
      ...prev,
    ]);
    setStatusMessage("Increment recorded. You are currently the leading bidder for this lot.");
    setStatusTone("success");
  };

  const handlePass = () => {
    setStatusMessage("You passed this round. Prudent capital protection exercised.");
    setStatusTone("neutral");
  };

  const handleReset = () => {
    setCurrentBid(13200000);
    setStatusMessage("Simulator reset. Initial floor bid restored.");
    setStatusTone("neutral");
    setHistory([
      { id: "b1", bidder: "Bidder #104 (Corporate NBFC)", amount: 12800000, time: "11:42:10 AM", isUser: false },
      { id: "b2", bidder: "Bidder #218 (High Net Worth Desk)", amount: 13000000, time: "11:43:05 AM", isUser: false },
      { id: "b3", bidder: "Bidder #104 (Corporate NBFC)", amount: 13200000, time: "11:43:50 AM", isUser: false },
    ]);
  };

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-charcoal">
      {/* Signature Mesh Header */}
      <section className="relative overflow-hidden bg-[#06101E] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(197,160,89,0.18),rgba(255,255,255,0))] bg-gradient-to-br from-[#06101E] via-[#0B1E38] to-[#040913] text-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-semibold text-white/70 transition-colors hover:text-white sm:text-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Link>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Zero Risk · 100% Free Practice Bidding Simulator</span>
            </div>
          </div>

          <div className="mt-6 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-md bg-[#D4AF37]/15 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#D4AF37]">
              <Gavel className="h-3.5 w-3.5" />
              <span>Practice Before You Bid</span>
            </div>
            <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              Bank Auction Bidding Simulator
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
              Learn how real bank e-auctions work without risking a single rupee. Practice placing bids, understand the 5-minute timer extension rule, and learn to stick to your budget.
            </p>
          </div>

          {/* Quick Stats Bar */}
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 border-t border-white/10 pt-6">
            <div>
              <p className="text-xs text-slate-400">Practice Property</p>
              <p className="mt-1 font-semibold text-white truncate">3 BHK Sea Breeze Enclave</p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Starting Price (Reserve)</p>
              <p className="mt-1 font-semibold text-white">₹1,20,00,000</p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Your Max Budget</p>
              <p className="mt-1 font-semibold text-[#D4AF37]">₹1,45,00,000</p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Auction Framework</p>
              <p className="mt-1 font-semibold text-white">SARFAESI Bank Auction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Workspace */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Step Navigation Tabs */}
        <nav aria-label="Simulator workflow" className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <button
            type="button"
            onClick={() => setStep(1)}
            className={`flex items-center gap-3.5 rounded-xl border p-4 text-left transition-all duration-200 active:scale-[0.98] ${
              step === 1
                ? "border-navy bg-white shadow-md ring-2 ring-navy/10"
                : "border-charcoal/15 bg-white/70 hover:bg-white text-charcoal/70"
            }`}
          >
            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                step === 1 ? "bg-navy text-white" : "bg-charcoal/10 text-charcoal/60"
              }`}
            >
              <Building2 className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-charcoal/50">Step 01</p>
              <p className="text-sm font-bold text-navy">Check Property &amp; Price</p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setStep(2)}
            className={`flex items-center gap-3.5 rounded-xl border p-4 text-left transition-all duration-200 active:scale-[0.98] ${
              step === 2
                ? "border-navy bg-white shadow-md ring-2 ring-navy/10"
                : "border-charcoal/15 bg-white/70 hover:bg-white text-charcoal/70"
            }`}
          >
            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                step === 2 ? "bg-navy text-white" : "bg-charcoal/10 text-charcoal/60"
              }`}
            >
              <Gavel className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-charcoal/50">Step 02</p>
              <p className="text-sm font-bold text-navy">Live Practice Bidding</p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setStep(3)}
            className={`flex items-center gap-3.5 rounded-xl border p-4 text-left transition-all duration-200 active:scale-[0.98] ${
              step === 3
                ? "border-navy bg-white shadow-md ring-2 ring-navy/10"
                : "border-charcoal/15 bg-white/70 hover:bg-white text-charcoal/70"
            }`}
          >
            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                step === 3 ? "bg-navy text-white" : "bg-charcoal/10 text-charcoal/60"
              }`}
            >
              <CheckCircle2 className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-charcoal/50">Step 03</p>
              <p className="text-sm font-bold text-navy">Winning &amp; 15-Day Payment</p>
            </div>
          </button>
        </nav>

        {/* Phase 1: Asset Dossier & Valuation */}
        {step === 1 && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <section className="rounded-2xl border border-charcoal/10 bg-white p-6 sm:p-8 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.06)]">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-charcoal/10 pb-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#8A6D3B]">Practice Property #SIM-04</span>
                    <h2 className="mt-1 font-display text-2xl font-bold text-navy sm:text-3xl">
                      3 BHK Sea Breeze Enclave
                    </h2>
                    <p className="text-sm text-charcoal/70">Sector 17, Vashi, Navi Mumbai · Physical Possession (Keys Ready)</p>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800 border border-emerald-200">
                    Title &amp; Legal Papers Verified
                  </span>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="rounded-xl border border-charcoal/10 bg-[#FAF9F6] p-4 text-center">
                    <p className="text-xs font-medium text-charcoal/60">Starting Price (Reserve)</p>
                    <p className="mt-1 font-display text-xl font-bold text-navy">₹1,20,00,000</p>
                    <p className="mt-1 text-[11px] text-charcoal/50">Lowest price bank will accept</p>
                  </div>
                  <div className="rounded-xl border border-charcoal/10 bg-[#FAF9F6] p-4 text-center">
                    <p className="text-xs font-medium text-charcoal/60">Market Value Nearby</p>
                    <p className="mt-1 font-display text-xl font-bold text-emerald-700">₹1,65,00,000</p>
                    <p className="mt-1 text-[11px] text-charcoal/50">Save ~₹45 Lakhs (27% cheaper)</p>
                  </div>
                  <div className="rounded-xl border border-[#D4AF37]/30 bg-[#FAF7EE] p-4 text-center">
                    <p className="text-xs font-medium text-[#8A6D3B]">Your Maximum Budget</p>
                    <p className="mt-1 font-display text-xl font-bold text-navy">₹1,45,00,000</p>
                    <p className="mt-1 text-[11px] text-[#8A6D3B]">Never bid above this limit</p>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-navy">Verified Property Details</h3>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="flex items-start gap-3 rounded-lg border border-charcoal/10 bg-white p-3.5">
                      <ShieldCheck className="h-5 w-5 shrink-0 text-emerald-600 mt-0.5" />
                      <div>
                        <p className="text-xs font-semibold text-navy">Physical Possession (Keys Ready)</p>
                        <p className="text-xs text-charcoal/70">The bank has empty, locked possession under court order. No occupants to evict.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 rounded-lg border border-charcoal/10 bg-white p-3.5">
                      <FileCheck2 className="h-5 w-5 shrink-0 text-emerald-600 mt-0.5" />
                      <div>
                        <p className="text-xs font-semibold text-navy">Clean 30-Year Title Search</p>
                        <p className="text-xs text-charcoal/70">Verified at the registrar office. No other loans, disputes, or court stays.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-t border-charcoal/10 pt-6">
                  <p className="text-xs text-charcoal/60">
                    Ready to practice placing bids and watching the timer?
                  </p>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-navy px-6 font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#0a182c] active:scale-[0.98]"
                  >
                    <span>Start Practice Bidding</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </section>
            </div>

            {/* Sidebar Guidelines */}
            <div className="space-y-6">
              <div className="rounded-2xl border border-charcoal/10 bg-white p-6 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.06)]">
                <h3 className="font-display text-base font-bold text-navy flex items-center gap-2">
                  <Lock className="h-4 w-4 text-[#8A6D3B]" />
                  <span>3 Golden Rules for Bank Auctions</span>
                </h3>
                <ul className="mt-4 space-y-3 text-xs leading-relaxed text-charcoal/75">
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-navy">•</span>
                    <span><strong>Set a Strict Budget:</strong> Decide your maximum price before bidding starts. Never exceed your budget in the heat of the moment.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-navy">•</span>
                    <span><strong>5-Minute Timer Extension:</strong> If any bidder places a bid in the last 5 minutes, the auction timer extends by another 5 minutes. Stay calm and don't panic bid.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-navy">•</span>
                    <span><strong>Real Bids are Legally Binding:</strong> In a real auction, if you win and fail to pay 25% by Day 1, the bank forfeits your 10% EMD token deposit.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Phase 2: Live E-Bidding Arena */}
        {step === 2 && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Main Bidding Controls */}
            <div className="lg:col-span-2 space-y-6">
              <section className="rounded-2xl border border-[#D4AF37]/40 bg-white p-6 sm:p-8 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.06)]">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-charcoal/10 pb-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#8A6D3B]">Live Practice Round</span>
                    <h2 className="mt-1 font-display text-2xl font-bold text-navy">
                      3 BHK Sea Breeze Enclave
                    </h2>
                    <p className="text-xs text-charcoal/60">Navi Mumbai · Simulation Portal #04</p>
                  </div>
                  <div className="flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-3.5 py-1.5 text-xs font-bold text-amber-900 shadow-sm">
                    <Timer className="h-4 w-4 animate-spin text-amber-600" />
                    <span>01:42 Left (Timer Extends on New Bid)</span>
                  </div>
                </div>

                {/* Progress Bar towards Ceiling */}
                <div className="mt-6 space-y-2">
                  <div className="flex justify-between text-xs font-semibold text-charcoal/70">
                    <span>Budget Used</span>
                    <span className={ceilingPercentage > 90 ? "text-red-600 font-bold" : "text-navy"}>
                      ₹{(currentBid / 10000000).toFixed(2)} Cr of ₹{(budgetCeiling / 10000000).toFixed(2)} Cr Max Budget ({ceilingPercentage}%)
                    </span>
                  </div>
                  <div className="h-2.5 w-full rounded-full bg-charcoal/10 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${
                        ceilingPercentage > 85 ? "bg-red-500" : ceilingPercentage > 60 ? "bg-[#D4AF37]" : "bg-navy"
                      }`}
                      style={{ width: `${ceilingPercentage}%` }}
                    />
                  </div>
                </div>

                {/* Status Callout */}
                <div
                  className={`mt-6 rounded-xl border p-4 text-sm font-semibold transition-all ${
                    statusTone === "success"
                      ? "border-emerald-200 bg-emerald-50/80 text-emerald-900"
                      : statusTone === "warning"
                      ? "border-amber-200 bg-amber-50/80 text-amber-900"
                      : "border-charcoal/15 bg-[#FAF9F6] text-navy"
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    {statusTone === "success" ? (
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600 mt-0.5" />
                    ) : statusTone === "warning" ? (
                      <AlertTriangle className="h-5 w-5 shrink-0 text-amber-600 mt-0.5" />
                    ) : (
                      <Gavel className="h-5 w-5 shrink-0 text-navy mt-0.5" />
                    )}
                    <span>{statusMessage}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => placeIncrement(standardIncrement)}
                    disabled={currentBid + standardIncrement > budgetCeiling}
                    className="min-h-12 inline-flex items-center justify-center gap-2 rounded-xl bg-navy px-4 font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#0a182c] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <TrendingUp className="h-4 w-4 text-[#D4AF37]" />
                    <span>Place Next Bid (+₹2.0 Lakhs)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => placeIncrement(tacticalIncrement)}
                    disabled={currentBid + tacticalIncrement > budgetCeiling}
                    className="min-h-12 inline-flex items-center justify-center gap-2 rounded-xl border border-navy/20 bg-white px-4 font-semibold text-navy shadow-sm transition-all duration-200 hover:bg-slate-50 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <Banknote className="h-4 w-4 text-[#8A6D3B]" />
                    <span>Jump Bid (+₹5.0 Lakhs)</span>
                  </button>
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-charcoal/10 pt-4">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handlePass}
                      className="min-h-10 rounded-lg border border-charcoal/20 px-3.5 text-xs font-semibold text-charcoal hover:bg-white active:scale-[0.98]"
                    >
                      Hold / Pass This Round
                    </button>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="inline-flex min-h-10 items-center gap-1.5 rounded-lg px-3 text-xs font-semibold text-navy hover:underline active:scale-[0.98]"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      <span>Reset Practice</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="inline-flex min-h-10 items-center gap-1.5 text-xs font-semibold text-navy hover:underline"
                  >
                    <span>See What Happens After Winning</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </section>
            </div>

            {/* Live Audit Log */}
            <div className="space-y-6">
              <section className="rounded-2xl border border-charcoal/10 bg-white p-6 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.06)]">
                <h3 className="font-display text-sm font-bold uppercase tracking-wider text-navy flex items-center justify-between">
                  <span>Recent Bids</span>
                  <span className="text-[11px] font-normal text-charcoal/50">Live Updates</span>
                </h3>
                <div className="mt-4 space-y-3">
                  {history.map((item) => (
                    <div
                      key={item.id}
                      className={`rounded-xl border p-3 text-xs transition-all ${
                        item.isUser
                          ? "border-emerald-200 bg-emerald-50/60 text-navy font-medium"
                          : "border-charcoal/10 bg-[#FAF9F6] text-charcoal/80"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold">{item.bidder}</span>
                        <span className="text-[10px] text-charcoal/50">{item.time}</span>
                      </div>
                      <p className="mt-1 font-display text-sm font-extrabold text-navy">
                        ₹{item.amount.toLocaleString("en-IN")}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        )}

        {/* Phase 3: Settlement & Possession */}
        {step === 3 && (
          <div className="rounded-2xl border border-charcoal/10 bg-white p-6 sm:p-10 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.06)]">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8A6D3B]">After You Win</span>
              <h2 className="mt-1 font-display text-2xl font-bold text-navy sm:text-3xl">
                What Happens After You Win a Bank Auction?
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-charcoal/70">
                In a real bank auction under Indian law (SARFAESI Rule 9), winning is just step one. Follow these 4 clear deadlines to complete your purchase and get the keys:
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-4">
              <div className="rounded-xl border border-charcoal/10 bg-[#FAF9F6] p-5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy text-white text-xs font-bold">
                  Day 1
                </div>
                <h3 className="mt-3 text-sm font-bold text-navy">Pay 25% Deposit Total</h3>
                <p className="mt-2 text-xs leading-relaxed text-charcoal/70">
                  Your 10% advance deposit is counted, and you must pay the remaining 15% by 5:00 PM the next day. If late, the bank cancels your bid.
                </p>
              </div>

              <div className="rounded-xl border border-amber-300 bg-amber-50/50 p-5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-600 text-white text-xs font-bold">
                  Day 15
                </div>
                <h3 className="mt-3 text-sm font-bold text-amber-950">Pay Remaining 75%</h3>
                <p className="mt-2 text-xs leading-relaxed text-charcoal/70">
                  You must pay the remaining 75% within strictly 15 days. AuctionIQ fast loans disburse in 7 to 10 days to make sure you never miss this deadline.
                </p>
              </div>

              <div className="rounded-xl border border-charcoal/10 bg-[#FAF9F6] p-5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy text-white text-xs font-bold">
                  Day 21
                </div>
                <h3 className="mt-3 text-sm font-bold text-navy">Get Bank Sale Certificate</h3>
                <p className="mt-2 text-xs leading-relaxed text-charcoal/70">
                  The bank's authorized officer issues the official Sale Certificate (Form 8) confirming you are the 100% legal owner of the property.
                </p>
              </div>

              <div className="rounded-xl border border-charcoal/10 bg-[#FAF9F6] p-5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white text-xs font-bold">
                  Day 30
                </div>
                <h3 className="mt-3 text-sm font-bold text-navy">Register &amp; Collect Keys</h3>
                <p className="mt-2 text-xs leading-relaxed text-charcoal/70">
                  Register the Sale Certificate at the local Sub-Registrar Office, transfer society share certificates, and take physical possession of your home.
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-charcoal/10 pt-6">
              <Link
                href="/finance"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-navy px-6 font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#0a182c] active:scale-[0.98]"
              >
                <Banknote className="h-4 w-4 text-[#D4AF37]" />
                <span>Explore Fast 15-Day Loans</span>
              </Link>
              <Link
                href="/explore"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-charcoal/20 bg-white px-6 font-semibold text-navy shadow-sm transition-all duration-200 hover:bg-slate-50 active:scale-[0.98]"
              >
                <span>Browse Real Bank Auction Properties</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
