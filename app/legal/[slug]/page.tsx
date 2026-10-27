import Link from "next/link";
import {
  ArrowLeft,
  ShieldCheck,
  Scale,
  Mail,
  Building2,
  Phone,
  MapPin,
  Lock,
  AlertCircle,
} from "lucide-react";

interface PolicySection {
  heading: string;
  paragraphs: string[];
}

interface PolicyDetail {
  title: string;
  subtitle: string;
  category: string;
  sections: PolicySection[];
}

const policyRegistry: Record<string, PolicyDetail> = {
  terms: {
    title: "Terms of Use & Statutory Disclaimers",
    subtitle: "Regulatory framework, SARFAESI Act 2002 disclaimers, and platform advisory scope.",
    category: "Legal & Regulatory",
    sections: [
      {
        heading: "1. Institutional Advisory Scope & Platform Role",
        paragraphs: [
          "AuctionIQ is an independent real estate intelligence and advisory technology platform. AuctionIQ is neither an auctioneer nor a direct seller of banking assets. All properties cataloged on this terminal are distressed banking assets auctioned by authorized secured creditors under the Securitisation and Reconstruction of Financial Assets and Enforcement of Security Interest Act, 2002 (SARFAESI Act, 2002), the Recovery of Debts and Bankruptcy Act, 1993, or orders of the Debt Recovery Tribunal (DRT).",
          "Information displayed on the platform is collated from statutory public notices published in official gazettes, bank public sale notifications, and sub-registrar transaction filings. While AuctionIQ executes independent title searches and physical inspection audits, prospective bidders are advised to conduct independent legal title verification prior to depositing statutory EMD.",
        ],
      },
      {
        heading: "2. Bidder Representation, KYC, and Due Diligence",
        paragraphs: [
          "By accessing AuctionIQ and utilizing our verified asset dossiers, you warrant that you are legally competent under Indian law to bid at public auctions and are not disqualified under Section 29A of the Insolvency and Bankruptcy Code (IBC), 2016.",
          "Users acknowledge that bank-auction properties are acquired strictly on an 'As is where is', 'As is what is', and 'Whatever there is' basis. Society maintenance dues, municipal property tax arrears, and statutory encumbrances remain the responsibility of the purchaser as defined in the specific bank sale notice.",
        ],
      },
      {
        heading: "3. Jurisdiction & Dispute Resolution",
        paragraphs: [
          "These terms are governed by and construed in accordance with the laws of the Republic of India. Any legal proceedings arising out of or in connection with the platform shall be subject to the exclusive jurisdiction of the competent courts in Mumbai, Maharashtra.",
        ],
      },
    ],
  },
  privacy: {
    title: "Privacy Policy & Information Security",
    subtitle: "Enterprise data encryption, PAN/KYC confidentiality, and investor data governance.",
    category: "Data Governance",
    sections: [
      {
        heading: "1. Collection of Investor & Institutional Data",
        paragraphs: [
          "AuctionIQ collects information strictly required to facilitate verified title reports, smart-door physical inspections, and pre-approved auction financing. This includes verified identity credentials (PAN, Aadhaar e-KYC), contact records, and investor preference parameters.",
          "We maintain a strict zero-leakage guarantee regarding bidder identity, prospective ceiling budgets, and target auction strategies. Your bidding intent is never shared with competing bidders, intermediary brokers, or unauthorized third parties.",
        ],
      },
      {
        heading: "2. Bank-Grade 256-Bit Cryptographic Standards",
        paragraphs: [
          "All communications and digital dossier transfers are secured using TLS 1.3 encryption and AES-256 at-rest database protection. Audit logs of title access and digital property inspections are immutably archived for regulatory auditing under the Information Technology Act, 2000.",
        ],
      },
      {
        heading: "3. Retention & Investor Privacy Rights",
        paragraphs: [
          "Investors may request complete redaction of their personal records and transaction history from our platform upon written notice to our Nodal Grievance Officer, subject to statutory retention obligations under anti-money laundering (PMLA) regulations.",
        ],
      },
    ],
  },
  refund: {
    title: "Refund, Cancellation & Advisory Terms",
    subtitle: "Transparent fee policies, title audit guarantees, and statutory EMD regulations.",
    category: "Financial Compliance",
    sections: [
      {
        heading: "1. Advisory & Due Diligence Report Fee Policies",
        paragraphs: [
          "Fees paid for AuctionIQ Title Verification Dossiers, Structural Engineer Audit Reports, and Society Arrears Certificates are non-refundable once the field verification has been initiated by our legal desk. In the rare event that an inspection cannot be completed due to physical seal cancellation by the bank, a 100% credit or refund is issued within 3 business days.",
        ],
      },
      {
        heading: "2. Bank Earnest Money Deposit (EMD) Statutory Disclaimer",
        paragraphs: [
          "AuctionIQ DOES NOT hold or process statutory Earnest Money Deposits (EMD). EMDs are paid directly to the Authorized Officer / lending institution's designated RTGS account.",
          "Under SARFAESI Security Interest (Enforcement) Rules 2002, Rule 9(4), failure by the successful bidder to remit the remaining 75% of the purchase price within the mandatory 15-day window results in automatic statutory forfeiture of the deposited 25% by the secured creditor. AuctionIQ carries no liability for bank forfeiture resulting from bidder default.",
        ],
      },
    ],
  },
  "community-guidelines": {
    title: "Institutional Code of Conduct & Anti-Collusion",
    subtitle: "Ensuring fair price discovery, anti-bid-rigging protocols, and investor integrity.",
    category: "Market Integrity",
    sections: [
      {
        heading: "1. Strict Anti-Collusion & Anti-Bid-Rigging",
        paragraphs: [
          "AuctionIQ adheres strictly to Section 3 of the Competition Act, 2002. Any attempt by platform users to collude, artificially suppress bidding prices, pool bids to manipulate bank reserves, or engage in bid rotation will result in immediate permanent account termination and referral to regulatory authorities.",
        ],
      },
      {
        heading: "2. Verified HNI & Institutional Desk Standards",
        paragraphs: [
          "Members accessing the AuctionIQ HNI Distressed Asset Desk must maintain professional integrity during physical inspections and bank negotiations. Harassment of existing occupants or interference with bank authorized officers executing Section 14 physical possession is strictly prohibited.",
        ],
      },
    ],
  },
  contact: {
    title: "Grievance Redressal & Institutional Support",
    subtitle: "Official nodal officers, regulatory escalations, and dedicated investor support.",
    category: "Investor Redressal",
    sections: [
      {
        heading: "1. Dedicated Advisory & Due Diligence Desk",
        paragraphs: [
          "For inquiries regarding live auction dossiers, scheduled physical site visits, or SARFAESI bridge financing, reach our institutional desk Monday through Saturday from 9:00 AM to 7:00 PM IST.",
        ],
      },
      {
        heading: "2. Statutory Nodal Grievance Officer",
        paragraphs: [
          "In compliance with the Information Technology Act, 2000, and rules made thereunder, the contact details of the Nodal Grievance Officer for AuctionIQ are as follows:",
          "Nodal Officer: Legal & Compliance Directorate, AuctionIQ Technologies Private Limited. Express Towers, 14th Floor, Nariman Point, Mumbai, Maharashtra 400021. Email: grievance@auctioniq.in.",
        ],
      },
    ],
  },
};

const navigationTabs = [
  { slug: "terms", label: "Terms of Use" },
  { slug: "privacy", label: "Privacy Policy" },
  { slug: "refund", label: "Refund Policy" },
  { slug: "community-guidelines", label: "Code of Conduct" },
  { slug: "contact", label: "Grievance & Support" },
];

export default async function LegalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const policy = policyRegistry[slug];

  if (!policy) {
    return (
      <main className="min-h-screen bg-[#FDFBF7] py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-[#8A6D3B]" />
          <h1 className="mt-4 font-display text-3xl font-bold text-navy">Regulatory Policy Not Found</h1>
          <p className="mt-2 text-sm text-charcoal/70">
            The requested legal filing is not cataloged in our regulatory repository.
          </p>
          <Link
            href="/legal/terms"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-navy px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#0a182c]"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Terms of Use</span>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-charcoal">
      {/* Signature Dark Mesh Header */}
      <section className="relative overflow-hidden bg-[#06101E] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(197,160,89,0.18),rgba(255,255,255,0))] bg-gradient-to-br from-[#06101E] via-[#0B1E38] to-[#040913] text-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-semibold text-white/70 transition-colors hover:text-white sm:text-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home Terminal</span>
            </Link>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
              <ShieldCheck className="h-3.5 w-3.5 text-[#D4AF37]" />
              <span>SARFAESI Act 2002 & DRT Regulatory Compliance</span>
            </div>
          </div>

          <div className="mt-6 max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-md bg-[#D4AF37]/15 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#D4AF37]">
              <Scale className="h-3.5 w-3.5" />
              <span>{policy.category}</span>
            </span>
            <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              {policy.title}
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
              {policy.subtitle}
            </p>
          </div>

          <div className="mt-6 flex items-center gap-4 text-xs text-slate-400">
            <span>Last Updated: Statutory 2026 Revision</span>
            <span>•</span>
            <span>Jurisdiction: High Court of Judicature at Bombay</span>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Navigation Tabs */}
        <nav aria-label="Legal documents" className="mb-8 flex flex-wrap gap-2 border-b border-charcoal/10 pb-4">
          {navigationTabs.map((tab) => {
            const isActive = tab.slug === slug;
            return (
              <Link
                key={tab.slug}
                href={`/legal/${tab.slug}`}
                className={`inline-flex min-h-10 items-center rounded-lg px-4 py-2 text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-navy text-white shadow-sm"
                    : "bg-white text-charcoal/70 hover:bg-slate-100 border border-charcoal/10"
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>

        {/* Policy Content and Sidebar */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Article Content */}
          <article className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl border border-charcoal/10 bg-white p-6 sm:p-8 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.06)]">
              <div className="space-y-8">
                {policy.sections.map((sec, idx) => (
                  <section key={idx} className="space-y-3">
                    <h2 className="font-display text-xl font-bold text-navy sm:text-2xl">
                      {sec.heading}
                    </h2>
                    {sec.paragraphs.map((p, pIdx) => (
                      <p key={pIdx} className="text-sm leading-relaxed text-charcoal/80">
                        {p}
                      </p>
                    ))}
                  </section>
                ))}
              </div>
            </div>
          </article>

          {/* Institutional Advisory Sidebar */}
          <aside className="space-y-6">
            <div className="rounded-2xl border border-charcoal/10 bg-white p-6 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.06)]">
              <h3 className="font-display text-sm font-bold uppercase tracking-wider text-navy flex items-center gap-2">
                <Building2 className="h-4 w-4 text-[#8A6D3B]" />
                <span>Registered Headquarters</span>
              </h3>
              <div className="mt-4 space-y-3 text-xs leading-relaxed text-charcoal/75">
                <p className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 shrink-0 text-navy mt-0.5" />
                  <span>
                    AuctionIQ Technologies Private Limited<br />
                    Express Towers, 14th Floor, Nariman Point<br />
                    Mumbai, Maharashtra 400021, India
                  </span>
                </p>
                <p className="flex items-center gap-2 pt-2 border-t border-charcoal/10">
                  <Phone className="h-4 w-4 shrink-0 text-navy" />
                  <span>+91 22 6982 4400</span>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="h-4 w-4 shrink-0 text-navy" />
                  <span>compliance@auctioniq.in</span>
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-charcoal/10 bg-[#FAF9F6] p-6">
              <h3 className="font-display text-sm font-bold text-navy flex items-center gap-2">
                <Lock className="h-4 w-4 text-[#8A6D3B]" />
                <span>Statutory Compliance Oversight</span>
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-charcoal/70">
                All property dossiers are examined against Section 13(2), 13(4), and Rule 8/9 of SARFAESI Act, 2002. Title investigations verify 30-year sub-registrar encumbrance certificates prior to cataloging.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
