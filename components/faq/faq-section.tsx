"use client";

import { useState } from "react";
import {
  ChevronDown,
  HelpCircle,
  ShieldCheck,
  Scale,
  Coins,
  Sparkles,
} from "lucide-react";

export interface FaqItem {
  id: string;
  category: "General & Bidding" | "Legal & Possession" | "Financing & EMD";
  question: string;
  answer: string;
  highlight?: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "how-bank-auctions-work",
    category: "General & Bidding",
    question: "How do bank property auctions work in India?",
    answer:
      "When someone takes a home loan and stops paying their EMIs, the bank takes charge of the property to get its money back. Under an Indian law called the SARFAESI Act, banks can sell these properties directly without waiting years in court. The bank first gives the borrower 60 days to clear the loan. If unpaid, the bank puts the property up for public auction online with a starting price called the Reserve Price. Anyone can pay a 10% advance deposit (called EMD) and bid online. The highest bidder wins.",
    highlight: "Banks sell through legal notices with a clear starting price (Reserve Price). Anyone can participate by paying a 10% advance deposit.",
  },
  {
    id: "physical-vs-symbolic",
    category: "Legal & Possession",
    question: "What is the difference between Physical Possession and Symbolic Possession?",
    answer:
      "This is the most important thing to check before bidding: Physical Possession means the bank has the actual keys and the property is empty. You get the keys and can move in as soon as full payment is made. Symbolic Possession means the bank has legal ownership on paper, but the old owner or a tenant is still living inside. To get them to vacate, the bank has to get an eviction order from the District Magistrate (under Section 14). At AuctionIQ, we clearly tag which properties have keys in hand so you never face surprises.",
    highlight: "Physical Possession = Empty home with keys ready. Symbolic Possession = Bank owns it on paper, but eviction is needed.",
  },
  {
    id: "emd-refund-policy",
    category: "Financing & EMD",
    question: "What is EMD (Earnest Money Deposit), and do I get it back if I lose?",
    answer:
      "Yes, 100%. EMD is simply token advance money (usually 10% of the reserve price) you deposit to enter the auction. If someone else places a higher bid and you do not win, your entire EMD is automatically refunded to your bank account within 2 to 3 working days. Your money is only at risk if you win the auction and then refuse to pay the remaining amount.",
    highlight: "If you lose the auction, 100% of your EMD is refunded to your bank account within 48 to 72 hours.",
  },
  {
    id: "loan-financing-timeline",
    category: "Financing & EMD",
    question: "Can I get a home loan to buy a bank auction property?",
    answer:
      "Yes, you can! But there is one big rule to remember: once you win an auction, the bank gives you strictly 15 days to pay the remaining 75% balance. Normal home loans take 30 to 45 days, which is too slow. That is why AuctionIQ helps you get pre-approved auction loans and fast bridge finance disbursed within 7 to 10 days, so you can easily meet the bank's 15-day deadline. Once you get your keys, it converts into a regular low-interest home loan.",
    highlight: "You must pay the 75% balance within 15 days. We arrange fast auction loans that disburse in 7–10 days.",
  },
  {
    id: "unpaid-society-dues",
    category: "Financing & EMD",
    question: "Who pays unpaid society maintenance bills and municipal house taxes?",
    answer:
      "Banks sell properties on an 'As Is Where Is' basis, which means you buy the property in its current state. Sometimes, the old borrower may have left unpaid building society maintenance bills or municipal property taxes. While banks are supposed to disclose these, housing societies often demand these arrears before issuing an NOC or transfer papers. AuctionIQ visits the society and checks municipal records beforehand, so you know the exact pending dues before you place a bid.",
    highlight: "We check pending society maintenance and house tax in advance so there are no surprise costs.",
  },
  {
    id: "borrower-court-challenges",
    category: "Legal & Possession",
    question: "Can the old owner go to court to stop or cancel the auction?",
    answer:
      "The borrower has 45 days to file an appeal before a debt court called the Debt Recovery Tribunal (DRT). However, Indian law prevents borrowers from delaying without cause: they must deposit 25% to 50% of the total loan amount in cash before filing higher appeals. As long as the bank followed the proper 30-day notices and newspaper announcements, Indian courts firmly protect honest buyers who bought through the auction.",
    highlight: "Borrowers must deposit 25%–50% of their loan to appeal. Genuine auction buyers are protected by law.",
  },
  {
    id: "post-auction-paperwork",
    category: "Legal & Possession",
    question: "What legal documents do I get after making full payment?",
    answer:
      "Once you pay the full amount (and deduct the standard 1% TDS if the property is ₹50 Lakhs or above), the bank gives you an official ownership document called the Sale Certificate. You take this Sale Certificate to the local Sub-Registrar Office, pay state stamp duty and registration fees, and get it registered in your name. This gives you clear, 100% legal ownership, exactly like buying any regular property.",
    highlight: "The bank issues an official Sale Certificate, which you register at the Sub-Registrar Office for complete ownership.",
  },
];

export function FaqSection({ className = "" }: { className?: string }) {
  const [openId, setOpenId] = useState<string | null>("how-bank-auctions-work");
  const [selectedFilter, setSelectedFilter] = useState<string>("All");

  const filteredFaqs =
    selectedFilter === "All"
      ? FAQ_ITEMS
      : FAQ_ITEMS.filter((item) => item.category === selectedFilter);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      aria-labelledby="faq-heading"
      className={`border-t border-charcoal/10 bg-[#FAF9F6] py-16 sm:py-20 ${className}`}
      id="faq"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#C5A059]/40 bg-[#C5A059]/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#9A7B38]">
            <HelpCircle className="h-3.5 w-3.5" />
            <span>SIMPLE ANSWERS · FREQUENTLY ASKED QUESTIONS</span>
          </div>

          <h2
            className="font-display text-3xl font-extrabold text-navy sm:text-4xl tracking-tight"
            id="faq-heading"
          >
            Frequently Asked Questions
          </h2>

          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-charcoal/70">
            Clear, simple explanations about how bank auctions work, how payments happen, and how to buy safely without legal worries.
          </p>

          {/* Category Filter Pills */}
          <div className="pt-3 flex flex-wrap justify-center gap-2">
            {["All", "General & Bidding", "Legal & Possession", "Financing & EMD"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`rounded-xl px-4 py-1.5 text-xs font-semibold transition-all duration-200 active:scale-[0.98] ${
                  selectedFilter === cat
                    ? "bg-navy text-white shadow-xs"
                    : "border border-charcoal/15 bg-white text-charcoal/70 hover:border-navy/30 hover:text-navy"
                }`}
                type="button"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion List */}
        <div className="mt-10 space-y-3.5">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                className={`overflow-hidden rounded-2xl border transition-all duration-200 ${
                  isOpen
                    ? "border-[#C5A059]/80 bg-white shadow-md ring-1 ring-[#C5A059]/20"
                    : "border-charcoal/10 bg-white shadow-xs hover:border-charcoal/20 hover:shadow-sm"
                }`}
              >
                <button
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left transition-colors"
                  onClick={() => toggleItem(faq.id)}
                  type="button"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg text-xs font-bold transition-colors ${
                        isOpen
                          ? "bg-navy text-white"
                          : "bg-navy/5 text-navy group-hover:bg-navy/10"
                      }`}
                    >
                      {faq.category === "General & Bidding" && <Sparkles className="h-4 w-4" />}
                      {faq.category === "Legal & Possession" && <Scale className="h-4 w-4" />}
                      {faq.category === "Financing & EMD" && <Coins className="h-4 w-4" />}
                    </span>
                    <span className="font-display text-base sm:text-lg font-bold text-navy leading-snug">
                      {faq.question}
                    </span>
                  </div>

                  <span
                    className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-transform duration-300 ${
                      isOpen
                        ? "rotate-180 border-[#C5A059] bg-[#C5A059]/10 text-navy"
                        : "border-charcoal/20 bg-slate-50 text-charcoal/60"
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </span>
                </button>

                {isOpen && (
                  <div className="border-t border-charcoal/8 px-5 pb-6 pt-4 sm:px-6">
                    <p className="text-sm leading-relaxed text-charcoal/80 font-normal">
                      {faq.answer}
                    </p>

                    {faq.highlight && (
                      <div className="mt-3.5 flex items-center gap-2 rounded-xl border border-emerald-200/80 bg-emerald-50/70 p-3 text-xs text-emerald-900 font-medium">
                        <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                        <span>{faq.highlight}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
