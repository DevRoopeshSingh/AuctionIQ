"use client";

import { useState } from "react";
import Link from "next/link";
import {
  GraduationCap,
  BookOpen,
  ShieldCheck,
  Clock,
  ArrowRight,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { Badge, Button } from "@/components/ui/primitives";
import { FaqSection } from "@/components/faq/faq-section";

interface ArticleItem {
  id: string;
  slug: string;
  category: "SARFAESI & Legal" | "Title & CERSAI" | "Possession & Access" | "Financial & EMD";
  title: string;
  excerpt: string;
  estimatedReadMinutes: number;
  difficulty: "Essential" | "Intermediate" | "Critical";
  topics: string[];
  keyTakeaway: string;
  fullContent: string[];
}

const ACADEMY_ARTICLES: ArticleItem[] = [
  {
    id: "sarfaesi-playbook",
    slug: "sarfaesi-act-statutory-playbook",
    category: "SARFAESI & Legal",
    title: "SARFAESI Act Explained: How Banks Sell Defaulted Properties Without Court Delays",
    excerpt: "Learn how the SARFAESI Act works in India. Understand why the bank gives a 60-day notice, how it takes charge of the house, and why buying through bank auctions is 100% legal.",
    estimatedReadMinutes: 6,
    difficulty: "Essential",
    topics: ["60-Day Notice to Repay", "Bank Takes Charge of Property", "30-Day Public Newspaper Notice", "Online Auction Terms"],
    keyTakeaway: "Banks must give the borrower 60 days to repay, followed by a 30-day public auction notice in local newspapers before selling to a buyer.",
    fullContent: [
      "The SARFAESI Act (passed in 2002) is an Indian law that gives banks the legal power to recover unpaid loans by selling mortgaged properties directly, without waiting years for civil court trials.",
      "The process starts when a borrower stops paying EMIs for more than 90 days. The bank sends an official 60-day notice under Section 13(2). This gives the borrower two full months to clear their loan.",
      "If the borrower cannot repay the loan within 60 days, the bank takes legal control of the property under Section 13(4). The bank can then put the house up for public auction.",
      "Before the auction happens, the bank must give the borrower a 30-day final notice and publish the auction announcement in two local newspapers (one in English and one in the local language, like Marathi in Mumbai).",
      "For buyers, this means bank auctions follow strict legal steps. Once you win and register the Sale Certificate, your ownership is solid and recognized by all authorities."
    ],
  },
  {
    id: "cersai-title-audit",
    slug: "cersai-title-audit-encumbrance-searches",
    category: "Title & CERSAI",
    title: "CERSAI & 30-Year Title Search: How to Ensure No Other Bank Holds a Loan on the House",
    excerpt: "How to check India's central loan registry (CERSAI) and verify 30 years of ownership history at the Sub-Registrar Office so you get completely clean ownership.",
    estimatedReadMinutes: 5,
    difficulty: "Critical",
    topics: ["CERSAI National Loan Registry", "Checking First Charge on Property", "30-Year Ownership Search", "Sub-Registrar Encumbrance Certificate"],
    keyTakeaway: "Always check the CERSAI report. It confirms the selling bank has first right on the property and that no other bank or lender is owed money.",
    fullContent: [
      "CERSAI is an official online registry set up by the Government of India. Whenever any bank or housing finance company in India gives a home loan, they must register that loan on CERSAI.",
      "Under Indian law (Section 26D of the SARFAESI Act), a bank can only auction a property if its loan is registered with CERSAI. This registry stops dishonest borrowers from taking multiple loans on the same house from different banks.",
      "Along with CERSAI, a 30-year title search is done at the local Sub-Registrar Office. This search checks 30 years of past sale deeds, gift deeds, and inheritance papers to make sure no past family disputes or illegal sales exist.",
      "At AuctionIQ, our legal team checks both the CERSAI report and the 30-year deed trail before listing any property, giving you complete peace of mind that the title is 100% clean."
    ],
  },
  {
    id: "possession-types-risks",
    slug: "physical-vs-symbolic-possession-mechanics",
    category: "Possession & Access",
    title: "Physical vs Symbolic Possession: Why You Must Know Who Holds the Keys",
    excerpt: "Understand the huge difference between having the actual keys in hand (Physical Possession) versus paper ownership where someone is still living inside (Symbolic Possession).",
    estimatedReadMinutes: 6,
    difficulty: "Critical",
    topics: ["Physical vs Symbolic Possession", "District Magistrate Eviction Order", "Getting Police Assistance", "Tenant Rights and Protections"],
    keyTakeaway: "Physical Possession means the home is empty and you get the keys immediately. Symbolic Possession requires a court order from the District Magistrate to evict occupants.",
    fullContent: [
      "When looking at bank auction properties, checking the possession status is the most important step before bidding.",
      "Physical Possession means the bank has the actual physical keys, and the property is completely empty. Once you pay the full amount, the bank hands you the keys right away. You can paint, renovate, or move in immediately.",
      "Symbolic Possession means the bank owns the property on paper, but the borrower or a tenant is still living inside. To get them out, the bank must apply to the District Magistrate or Chief Metropolitan Magistrate under Section 14.",
      "The Magistrate orders the local police to help the bank take physical possession. While the bank will eventually get the property vacated, it can take 3 to 6 months of extra time. At AuctionIQ, we clearly mark whether a property has physical keys ready so you can plan accordingly."
    ],
  },
  {
    id: "society-dues-and-taxes",
    slug: "society-dues-municipal-taxes-who-pays",
    category: "Financial & EMD",
    title: "Unpaid Society Maintenance & Property Tax: Who Pays What in a Bank Auction?",
    excerpt: "Banks sell properties 'As Is Where Is'. Learn how to find out if the old owner left behind unpaid building maintenance bills or property tax before you bid.",
    estimatedReadMinutes: 5,
    difficulty: "Essential",
    topics: ["'As Is Where Is' Rule Explained", "Housing Society Maintenance Bills", "Municipal Property Tax Arrears", "Factoring Dues into Your Bid"],
    keyTakeaway: "Always check society maintenance ledgers and house tax bills before bidding. AuctionIQ audits these dues so there are no surprise expenses.",
    fullContent: [
      "Most bank auction notices state that properties are sold on an 'As Is Where Is' basis. This simply means you buy the property in its current condition.",
      "A common trap for beginners is unpaid building society maintenance bills or municipal house taxes left behind by the defaulting borrower. Housing societies in cities like Mumbai often ask the new buyer to clear these pending dues before issuing a No Objection Certificate (NOC) or share certificate.",
      "Indian court rulings state that old statutory dues do not automatically become the buyer's burden unless mentioned in the bank's notice. However, to avoid arguments with the society committee, it is always smart to know the exact pending amount in advance.",
      "AuctionIQ talks directly with the building society committee and checks municipal tax records before the auction. We list the exact pending maintenance amount so you can deduct it from your maximum bidding budget."
    ],
  },
  {
    id: "rule-9-payment-schedule",
    slug: "sarfaesi-rule-9-payment-timeline-bridge-capital",
    category: "Financial & EMD",
    title: "The Strict 15-Day Payment Rule: How to Pay the Balance Without Losing Your Deposit",
    excerpt: "Under Indian bank auction rules, you must pay 25% by the next day and the remaining 75% within 15 days. Learn how fast auction loans prevent deposit forfeiture.",
    estimatedReadMinutes: 6,
    difficulty: "Intermediate",
    topics: ["10% Advance Deposit (EMD)", "25% Payment by Next Day", "Strict 15-Day Balance Deadline", "Avoiding Deposit Forfeiture"],
    keyTakeaway: "You must pay the remaining 75% balance within 15 days of winning. If you miss this deadline, the bank can cancel the sale and keep your deposit.",
    fullContent: [
      "Indian bank auctions follow a strict government payment timeline known as SARFAESI Rule 9. Understanding this timeline is essential for every buyer.",
      "Step 1: Before the auction, you pay a 10% advance deposit called EMD (Earnest Money Deposit) to participate. If you do not win, this 10% is fully refunded within 2 to 3 days.",
      "Step 2: If you win the auction, you must pay an additional 15% immediately or by 5:00 PM on the next working day. This brings your total payment to 25%.",
      "Step 3: The crucial deadline: Rule 9(4) mandates that the remaining 75% balance must be paid within 15 days of sale confirmation. If a buyer fails to pay within 15 days, the bank has the legal right to cancel the sale and forfeit all money paid so far.",
      "Because regular home loans take 30 to 45 days, AuctionIQ arranges pre-approved auction loans and fast bridge finance that disburses in 7 to 10 days, keeping your deposit safe."
    ],
  },
  {
    id: "valuation-circle-rate-spreads",
    slug: "empirical-circle-rate-valuation-spread-analysis",
    category: "Financial & EMD",
    title: "Ready Reckoner Circle Rates & Market Value: How to Spot a Genuine 20% to 35% Discount",
    excerpt: "How to compare the bank's starting price with the government's minimum circle rate and recent neighborhood sales to make sure you get a genuine bargain.",
    estimatedReadMinutes: 5,
    difficulty: "Intermediate",
    topics: ["Ready Reckoner / Circle Rate", "Minimum Government Value", "Calculating Your Real Savings", "Income Tax Rules on Discounts"],
    keyTakeaway: "Bank starting prices (Reserve Prices) are usually set 20% to 30% below market value to ensure a quick sale.",
    fullContent: [
      "When a bank auctions a seized property, an independent government-registered valuer inspects the property and calculates its fair market value. The bank then applies a 15% to 30% discount to arrive at the starting price, called the Reserve Price.",
      "To check whether an auction is a genuine bargain, compare the per-square-foot price with the state government's Ready Reckoner Rate (also known as the Circle Rate or Guidance Value).",
      "The Ready Reckoner rate is the official minimum price set by the government for calculating stamp duty and registration fees in that locality. If the bank's starting price is lower than recent sales in nearby buildings, you have found a great deal.",
      "Always set a maximum budget ceiling before the auction starts. In the excitement of bidding, never bid higher than prevailing market rates."
    ],
  },
];

interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    question: "Under the SARFAESI Act, how many days must a bank give a borrower to clear their loan before taking over the property?",
    options: [
      "15 days",
      "30 days",
      "60 days",
      "90 days",
    ],
    correctIndex: 2,
    explanation: "Under Section 13(2), the bank must give the borrower 60 days to repay their outstanding loan in full before taking any recovery action.",
  },
  {
    question: "When you win a bank auction, within how many days must you pay the remaining 75% purchase balance?",
    options: [
      "Within 7 working days",
      "Within 15 days (or an extension agreed in writing with the bank)",
      "Within 60 calendar days automatically",
      "Only after you move into the property",
    ],
    correctIndex: 1,
    explanation: "SARFAESI Rule 9(4) strictly requires the remaining 75% balance to be paid on or before the 15th day of sale confirmation.",
  },
  {
    question: "What is the main difference between 'Physical Possession' and 'Symbolic Possession' in a bank auction?",
    options: [
      "Symbolic possession means the property cannot be sold legally",
      "Physical possession means the bank has the actual keys and the house is empty; symbolic possession means the bank owns it on paper, but occupants may still be inside",
      "Physical possession requires a High Court order",
      "There is no difference between the two",
    ],
    correctIndex: 1,
    explanation: "With physical possession, the property is empty and you get the keys immediately. With symbolic possession, the bank must get an eviction order from the District Magistrate to get the keys.",
  },
  {
    question: "Which official Indian government registry must banks register home loans with before they can legally auction a mortgaged property?",
    options: [
      "RERA (Real Estate Regulatory Authority)",
      "CERSAI (Central Electronic Registry)",
      "SEBI (Securities & Exchange Board)",
      "NCLT Public Register",
    ],
    correctIndex: 1,
    explanation: "CERSAI registration is mandatory under Section 26D of the SARFAESI Act. It ensures that the selling bank has the legal right to sell the property.",
  },
];

export default function AcademyPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeArticle, setActiveArticle] = useState<ArticleItem | null>(null);

  // Quiz State
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showAnswerFeedback, setShowAnswerFeedback] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  const filteredArticles =
    selectedCategory === "All"
      ? ACADEMY_ARTICLES
      : ACADEMY_ARTICLES.filter((a) => a.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  const handleSelectAnswer = (index: number) => {
    if (showAnswerFeedback) return;
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = index;
    setSelectedAnswers(newAnswers);
    setShowAnswerFeedback(true);
  };

  const handleNextQuestion = () => {
    setShowAnswerFeedback(false);
    if (currentQuestionIndex + 1 < QUIZ_QUESTIONS.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestartQuiz = () => {
    setSelectedAnswers([]);
    setCurrentQuestionIndex(0);
    setShowAnswerFeedback(false);
    setQuizFinished(false);
    setQuizStarted(true);
  };

  const score = selectedAnswers.reduce((acc, ans, idx) => {
    return ans === QUIZ_QUESTIONS[idx].correctIndex ? acc + 1 : acc;
  }, 0);

  return (
    <div className="min-h-screen bg-[#FAF9F6] pb-24 text-charcoal">
      {/* 1. HERO BANNER WITH SIGNATURE NAVY MESH GRADIENT */}
      <section className="relative overflow-hidden bg-[#06101E] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(197,160,89,0.18),rgba(255,255,255,0))] bg-gradient-to-br from-[#06101E] via-[#0B1E38] to-[#040913] py-16 text-white sm:py-20">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#C5A059]/30 bg-[#C5A059]/10 px-3.5 py-1 text-xs font-semibold tracking-wider uppercase text-[#D4AF37] backdrop-blur-sm">
              <GraduationCap className="h-3.5 w-3.5 text-[#D4AF37]" />
              <span>BANK AUCTION LEARNING ACADEMY · EASY GUIDES</span>
            </div>

            <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-white leading-[1.08]">
              Learn How to Buy Bank Auction Properties{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E5C17B] via-[#F5E6B8] to-[#C5A059]">
                Safely &amp; Simply.
              </span>
            </h1>

            <p className="text-base sm:text-lg leading-relaxed text-white/80 font-normal">
              Practical guides written in simple words. Learn how bank notices work, how to check 30 years of property ownership, how to get keys in hand, and how to pay the balance within 15 days without losing your deposit.
            </p>

            {/* Feature Badges Strip */}
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-semibold text-white/90">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 backdrop-blur-sm shadow-xs">
                <BookOpen className="h-3.5 w-3.5 text-[#D4AF37]" />
                <span>6 Easy Guides</span>
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 backdrop-blur-sm shadow-xs">
                <ShieldCheck className="h-3.5 w-3.5 text-[#D4AF37]" />
                <span>Clear Legal Explanations</span>
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 backdrop-blur-sm shadow-xs">
                <Sparkles className="h-3.5 w-3.5 text-[#D4AF37]" />
                <span>Interactive 2-Minute Quiz</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATUTORY KNOWLEDGE SEARCH & CATEGORY FILTER */}
      <section className="border-b border-charcoal/10 bg-white py-5 sticky top-16 z-30 shadow-xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {["All", "SARFAESI & Legal", "Title & CERSAI", "Possession & Access", "Financial & EMD"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 active:scale-[0.98] ${
                  selectedCategory === cat
                    ? "bg-navy text-white shadow-xs"
                    : "border border-charcoal/15 bg-white text-charcoal/70 hover:border-navy/30 hover:text-navy"
                }`}
                type="button"
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs text-charcoal/60">
            <span>Showing <strong>{filteredArticles.length}</strong> guides</span>
          </div>
        </div>
      </section>

      {/* 3. FEATURED MASTERCLASS SPOTLIGHT CARD */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-10">
        <div className="relative overflow-hidden rounded-2xl border-2 border-[#C5A059]/40 bg-gradient-to-br from-white via-white to-[#F5E6B8]/20 p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="flex items-center gap-2">
                <Badge tone="warning">Essential Reading</Badge>
                <span className="text-xs font-semibold text-charcoal/60 flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  <span>6 min read</span>
                </span>
                <span className="text-xs font-bold text-navy/70 uppercase tracking-wider">
                  SARFAESI ACT EXPLAINED
                </span>
              </div>

              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-navy tracking-tight">
                SARFAESI Act Explained: How Banks Sell Defaulted Properties Without Court Delays
              </h2>

              <p className="text-sm leading-relaxed text-charcoal/75">
                Understand how banks legally sell seized properties in India. Learn why the bank gives a 60-day notice, how physical possession works, and how Indian laws protect honest auction buyers.
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                {["60-Day Notice", "Taking Possession", "Magistrate Orders", "Public Auction Rules"].map((t) => (
                  <span key={t} className="rounded-md bg-navy/5 px-2.5 py-1 text-[11px] font-semibold text-navy">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="shrink-0 flex flex-col gap-2.5 sm:w-64">
              <Button
                onClick={() => setActiveArticle(ACADEMY_ARTICLES[0])}
                className="w-full inline-flex items-center justify-center gap-2"
                tone="primary"
              >
                <BookOpen className="h-4 w-4 text-[#D4AF37]" />
                <span>Read Full Guide</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Link
                href="/how-it-works"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-charcoal/20 bg-white px-4 py-2 text-xs font-semibold text-navy hover:bg-slate-50 transition-colors"
              >
                <span>View 6-Step Roadmap</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 4. ARTICLES DIRECTORY GRID */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pt-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-display text-2xl font-bold text-navy tracking-tight">
              Bank Auction Guides &amp; Checklists
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-charcoal/70">
              Clear, practical advice written to help Indian buyers bid safely and avoid costly mistakes.
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              className="group flex flex-col justify-between rounded-2xl border border-charcoal/10 bg-white p-6 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.06)] transition-all duration-300 hover:border-[#C5A059]/70 hover:shadow-[0_15px_30px_-5px_rgba(15,23,42,0.1)] hover:-translate-y-1"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#9A7B38] uppercase tracking-wider text-[11px]">
                    {article.category}
                  </span>
                  <span className="flex items-center gap-1 text-charcoal/50 text-[11px]">
                    <Clock className="h-3 w-3" />
                    <span>{article.estimatedReadMinutes} min</span>
                  </span>
                </div>

                <h3 className="font-display text-lg font-bold text-navy tracking-tight group-hover:text-[#9A7B38] transition-colors line-clamp-2">
                  {article.title}
                </h3>

                <p className="text-xs leading-relaxed text-charcoal/70 line-clamp-3">
                  {article.excerpt}
                </p>

                <div className="rounded-xl border border-charcoal/8 bg-slate-50/80 p-3 text-xs space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal/50 block">
                    Key Rule to Remember
                  </span>
                  <p className="text-[11px] font-medium text-navy/90 leading-snug">
                    {article.keyTakeaway}
                  </p>
                </div>
              </div>

              <div className="pt-5 mt-4 border-t border-charcoal/10 flex items-center justify-between">
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                  article.difficulty === "Critical"
                    ? "bg-rose-50 text-rose-700 border border-rose-200"
                    : article.difficulty === "Essential"
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "bg-amber-50 text-amber-700 border border-amber-200"
                }`}>
                  {article.difficulty}
                </span>

                <button
                  onClick={() => setActiveArticle(article)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-navy hover:text-[#9A7B38] transition-colors"
                  type="button"
                >
                  <span>Read Guide</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. INTERACTIVE BIDDER READINESS QUIZ WIDGET */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pt-16">
        <div className="rounded-2xl border border-navy/20 bg-gradient-to-br from-[#06101E] via-[#0B1E38] to-[#040913] p-7 sm:p-10 text-white shadow-xl">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#C5A059]/30 bg-[#C5A059]/10 px-3 py-1 text-xs font-semibold text-[#D4AF37]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>TEST YOUR KNOWLEDGE</span>
            </div>

            <h2 className="mt-3 font-display text-2xl sm:text-3xl font-extrabold text-white">
              Bank Auction Quick Knowledge Check
            </h2>
            <p className="mt-2 text-sm text-white/75 leading-relaxed">
              Test your understanding of the strict 15-day payment deadline, physical possession keys, and CERSAI checks before placing your first advance deposit.
            </p>

            {!quizStarted && !quizFinished && (
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <Button
                  onClick={() => setQuizStarted(true)}
                  className="inline-flex items-center gap-2 font-bold"
                  tone="accent"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Start 4-Question Quiz</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <span className="text-xs text-white/60">Takes ~2 minutes • Instant answers &amp; explanations</span>
              </div>
            )}

            {/* Quiz In Progress */}
            {quizStarted && !quizFinished && (
              <div className="mt-8 rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm space-y-6">
                <div className="flex items-center justify-between text-xs text-white/70 border-b border-white/10 pb-3">
                  <span>Question {currentQuestionIndex + 1} of {QUIZ_QUESTIONS.length}</span>
                  <span className="font-mono text-gold">Pass Mark: 75%</span>
                </div>

                <h3 className="font-display text-lg font-bold text-white leading-snug">
                  {QUIZ_QUESTIONS[currentQuestionIndex].question}
                </h3>

                <div className="grid gap-3">
                  {QUIZ_QUESTIONS[currentQuestionIndex].options.map((option, idx) => {
                    const isSelected = selectedAnswers[currentQuestionIndex] === idx;
                    const isCorrect = idx === QUIZ_QUESTIONS[currentQuestionIndex].correctIndex;
                    let btnStyle = "border-white/15 bg-white/5 text-white hover:bg-white/10";

                    if (showAnswerFeedback) {
                      if (isCorrect) {
                        btnStyle = "border-emerald-500 bg-emerald-950/50 text-emerald-200";
                      } else if (isSelected) {
                        btnStyle = "border-rose-500 bg-rose-950/50 text-rose-200";
                      } else {
                        btnStyle = "border-white/10 bg-white/5 text-white/40";
                      }
                    } else if (isSelected) {
                      btnStyle = "border-[#C5A059] bg-[#C5A059]/20 text-white";
                    }

                    return (
                      <button
                        key={option}
                        onClick={() => handleSelectAnswer(idx)}
                        disabled={showAnswerFeedback}
                        className={`flex items-center justify-between rounded-xl border p-3.5 text-left text-xs sm:text-sm font-medium transition-all duration-200 ${btnStyle}`}
                        type="button"
                      >
                        <span>{option}</span>
                        {showAnswerFeedback && isCorrect && (
                          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                        )}
                        {showAnswerFeedback && isSelected && !isCorrect && (
                          <XCircle className="h-4 w-4 text-rose-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {showAnswerFeedback && (
                  <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/30 p-4 text-xs space-y-2 text-emerald-200">
                    <span className="font-bold flex items-center gap-1.5 text-emerald-300">
                      <ShieldCheck className="h-4 w-4" />
                      <span>Why This Is Correct:</span>
                    </span>
                    <p className="leading-relaxed">
                      {QUIZ_QUESTIONS[currentQuestionIndex].explanation}
                    </p>
                    <div className="pt-2">
                      <Button
                        onClick={handleNextQuestion}
                        className="inline-flex items-center gap-1.5 text-xs"
                        tone="accent"
                      >
                        <span>{currentQuestionIndex + 1 === QUIZ_QUESTIONS.length ? "View My Score" : "Next Question"}</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Quiz Finished View */}
            {quizFinished && (
              <div className="mt-8 rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm space-y-5 text-center">
                <div className="inline-flex p-3 rounded-full bg-gold/20 text-gold mb-1">
                  <GraduationCap className="h-8 w-8" />
                </div>
                <h3 className="font-display text-2xl font-bold text-white">
                  Quiz Completed!
                </h3>
                <p className="text-sm text-white/80 max-w-md mx-auto">
                  You scored <strong>{score} / {QUIZ_QUESTIONS.length}</strong> ({Math.round((score / QUIZ_QUESTIONS.length) * 100)}%).
                  {score >= 3
                    ? " Great job! You have a solid grasp of how bank auctions and payments work."
                    : " Good attempt! Review our guides on the 15-day payment rule and possession to stay fully prepared."}
                </p>

                <div className="pt-3 flex flex-wrap justify-center gap-3">
                  <Button
                    onClick={handleRestartQuiz}
                    className="inline-flex items-center gap-2"
                    tone="secondary"
                  >
                    <RotateCcw className="h-4 w-4" />
                    <span>Retake Quiz</span>
                  </Button>
                  <Link
                    href="/simulator"
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#D4AF37] px-5 text-xs font-bold text-navy shadow-sm transition-all hover:bg-[#c5a033]"
                  >
                    <span>Practice in Free Simulator</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 6. STATUTORY GLOSSARY CHEAT SHEET */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pt-16">
        <div className="rounded-2xl border border-charcoal/10 bg-white p-7 shadow-sm">
          <div className="mb-6">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#9A7B38]">
              QUICK REFERENCE GLOSSARY
            </span>
            <h2 className="mt-1 font-display text-2xl font-bold text-navy tracking-tight">
              Everyday Meaning of Common Legal Terms
            </h2>
            <p className="text-xs text-charcoal/65 mt-1">
              Simple explanations for the legal words and acronyms you see in bank auction notices.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 text-xs">
            <div className="rounded-xl border border-charcoal/8 bg-slate-50/60 p-4 space-y-1.5">
              <span className="font-bold font-display text-sm text-navy block">SARFAESI Act 2002</span>
              <p className="text-charcoal/70 leading-relaxed">
                The Indian law that allows banks to take over and auction mortgaged properties directly when a borrower fails to repay their loan, without waiting for lengthy court cases.
              </p>
            </div>

            <div className="rounded-xl border border-charcoal/8 bg-slate-50/60 p-4 space-y-1.5">
              <span className="font-bold font-display text-sm text-navy block">CERSAI Portal</span>
              <p className="text-charcoal/70 leading-relaxed">
                India&apos;s central government registry of all property loans. Checking CERSAI guarantees that the selling bank has first right and that no other bank has a loan on the house.
              </p>
            </div>

            <div className="rounded-xl border border-charcoal/8 bg-slate-50/60 p-4 space-y-1.5">
              <span className="font-bold font-display text-sm text-navy block">Section 14 Court Order</span>
              <p className="text-charcoal/70 leading-relaxed">
                An order by the District Magistrate or Chief Metropolitan Magistrate directing local police to assist the bank in taking physical possession and handing over the keys.
              </p>
            </div>

            <div className="rounded-xl border border-charcoal/8 bg-slate-50/60 p-4 space-y-1.5">
              <span className="font-bold font-display text-sm text-navy block">Strict 15-Day Payment Rule (Rule 9)</span>
              <p className="text-charcoal/70 leading-relaxed">
                The rule that requires the winning bidder to pay the remaining 75% balance within 15 days of sale confirmation. AuctionIQ arranges fast loans to ensure you never miss this date.
              </p>
            </div>

            <div className="rounded-xl border border-charcoal/8 bg-slate-50/60 p-4 space-y-1.5">
              <span className="font-bold font-display text-sm text-navy block">DRT (Debt Recovery Tribunal)</span>
              <p className="text-charcoal/70 leading-relaxed">
                A specialized tribunal in India set up to handle bank loan disputes. Borrowers can appeal here, but must deposit 25% to 50% of the loan amount to delay proceedings.
              </p>
            </div>

            <div className="rounded-xl border border-charcoal/8 bg-slate-50/60 p-4 space-y-1.5">
              <span className="font-bold font-display text-sm text-navy block">Ready Reckoner Rate (Circle Rate)</span>
              <p className="text-charcoal/70 leading-relaxed">
                The official minimum property rate published by the state registration department. Used to calculate stamp duty and measure your exact discount below market price.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. STATUTORY & BIDDING FAQ ACCORDION */}
      <FaqSection className="mt-16" />

      {/* 8. FULL ARTICLE READING MODAL */}
      {activeArticle && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-[#06101E]/75 backdrop-blur-sm p-4 overflow-y-auto"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setActiveArticle(null);
          }}
        >
          <div
            aria-labelledby="article-modal-title"
            aria-modal="true"
            className="w-full max-w-3xl rounded-2xl border border-charcoal/10 bg-white p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
            role="dialog"
          >
            <div className="flex items-center justify-between border-b border-charcoal/10 pb-4">
              <div className="flex items-center gap-2 text-xs">
                <span className="font-semibold uppercase tracking-wider text-[#9A7B38]">
                  {activeArticle.category}
                </span>
                <span>•</span>
                <span className="text-charcoal/50 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {activeArticle.estimatedReadMinutes} min read
                </span>
              </div>
              <button
                onClick={() => setActiveArticle(null)}
                className="rounded-lg p-1.5 text-charcoal/50 hover:bg-charcoal/5 hover:text-navy transition-colors"
                type="button"
                aria-label="Close article"
              >
                <XCircle className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 space-y-4">
              <h2
                id="article-modal-title"
                className="font-display text-2xl sm:text-3xl font-extrabold text-navy tracking-tight"
              >
                {activeArticle.title}
              </h2>

              <div className="rounded-xl border border-[#C5A059]/30 bg-[#F5E6B8]/20 p-4 text-xs space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#9A7B38]">
                  Core Statutory Principle
                </span>
                <p className="font-semibold text-navy leading-relaxed">
                  {activeArticle.keyTakeaway}
                </p>
              </div>

              <div className="space-y-4 pt-2 text-sm leading-relaxed text-charcoal/85 font-normal">
                {activeArticle.fullContent.map((paragraph, pIdx) => (
                  <p key={pIdx}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-6 rounded-xl border border-charcoal/10 bg-slate-50 p-4 text-xs">
                <span className="font-bold text-navy block mb-2">Statutory Diligence Checklist Covered:</span>
                <div className="grid sm:grid-cols-2 gap-2">
                  {activeArticle.topics.map((t) => (
                    <span key={t} className="flex items-center gap-1.5 text-charcoal/80">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                      <span>{t}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-between items-center border-t border-charcoal/10 pt-4">
              <Link
                href="/explore"
                className="text-xs font-semibold text-navy hover:text-[#9A7B38] flex items-center gap-1"
              >
                <span>Browse Bank Inventory</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Button onClick={() => setActiveArticle(null)} tone="primary">
                Done Reading
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
