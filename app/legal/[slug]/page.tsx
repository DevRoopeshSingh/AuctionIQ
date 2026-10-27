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
    title: "Terms of Use & Legal Information",
    subtitle: "Clear, simple explanations of how AuctionIQ works, what bank rules apply, and how we protect you.",
    category: "Legal & Rules",
    sections: [
      {
        heading: "1. What AuctionIQ Does (and Does Not Do)",
        paragraphs: [
          "AuctionIQ is an independent real estate technology platform. We help you find, verify, and bid on bank auction properties safely. We are NOT a bank, an auctioneer, or a property broker. All properties listed on our website are seized banking assets sold by authorized banks under Indian law (the SARFAESI Act, 2002) to recover unpaid loans.",
          "We collect property details directly from official bank notices, government gazettes, and court announcements. We also inspect properties in person and run 30-year title checks. However, bank auctions are legally binding. Before you pay your token deposit (10% EMD), you should always review our detailed Due Diligence report and visit the property in person.",
        ],
      },
      {
        heading: "2. Who Can Bid & What 'As Is Where Is' Means",
        paragraphs: [
          "Any Indian citizen, NRI, company, or authorized entity eligible under Indian law can bid on these properties (as long as you are not a defaulting borrower disqualified under insolvency rules).",
          "Crucial Rule — 'As is where is, whatever there is': Banks sell auction properties in their current state. Any pending society maintenance charges, electricity bills, or municipal property taxes must usually be cleared by the winning buyer, as stated in the bank's sale notice. That is why AuctionIQ calculates all pending bills in advance in our Due Diligence report, so there are no surprise costs after you win.",
        ],
      },
      {
        heading: "3. Court Jurisdiction & Resolving Issues",
        paragraphs: [
          "These terms are governed by the laws of India. If any legal dispute arises regarding our platform services, it will be handled under the jurisdiction of the competent courts in Mumbai, Maharashtra.",
        ],
      },
    ],
  },
  privacy: {
    title: "Privacy Policy & Data Security",
    subtitle: "How we keep your personal details, Aadhaar/PAN checks, and bidding budget 100% private and confidential.",
    category: "Data Privacy",
    sections: [
      {
        heading: "1. What Information We Collect and Why",
        paragraphs: [
          "We collect only the basic information needed to verify property documents, issue in-person SmartDoor visit passes, and help you apply for pre-approved auction loans. This includes your name, phone number, email, and ID proof (such as PAN or Aadhaar verification for visit passes).",
          "100% Confidentiality Guarantee: We will NEVER reveal your identity, your target property, or how much you plan to bid to other bidders, brokers, or third parties. Your bidding strategy remains completely secret.",
        ],
      },
      {
        heading: "2. Bank-Grade Security (256-Bit Protection)",
        paragraphs: [
          "Your data is protected with the same high-level security used by major Indian banks (TLS 1.3 encryption and 256-bit database protection). We keep strict digital logs of property visits to prevent unauthorized access and comply with the Information Technology Act, 2000.",
        ],
      },
      {
        heading: "3. Your Privacy Rights & Data Deletion",
        paragraphs: [
          "You have complete control over your personal data. If you ever want your account data or search history removed from our platform, simply email our Grievance Officer, and we will delete your records (except for records legally required to be maintained under Indian financial regulations).",
        ],
      },
    ],
  },
  refund: {
    title: "Refund Policy & Token Deposit Rules",
    subtitle: "Transparent details on report fees, SmartDoor visits, and how bank EMD deposits are refunded.",
    category: "Payments & Refunds",
    sections: [
      {
        heading: "1. AuctionIQ Report & Visit Pass Fees",
        paragraphs: [
          "When you order an AuctionIQ Due Diligence report or engineer audit, our legal team starts searching government registries and field records immediately. Because we incur direct costs right away, these service fees are non-refundable once verification has started. However, if a visit cannot take place because the bank cancelled or postponed the auction, we give you a 100% full refund or credit within 3 working days.",
        ],
      },
      {
        heading: "2. How Your Bank EMD (10% Token Deposit) Works",
        paragraphs: [
          "Important: AuctionIQ NEVER collects or holds your 10% auction token deposit (EMD). You pay your EMD directly to the bank via RTGS into the bank's official account listed in the auction notice.",
          "If you do not win the auction: The bank automatically refunds 100% of your EMD within 48 to 72 hours directly into your bank account. No fees or deductions are made.",
          "The Strict 15-Day Payment Rule (SARFAESI Rule 9): If you win the auction, you must pay 25% on the auction day (inclusive of your 10% EMD), and the remaining 75% balance strictly within 15 days. If you fail to pay on time, the bank can cancel your purchase and forfeit your 25% deposit under Indian law. AuctionIQ offers fast 7 to 10 day bridge loans so you never miss this deadline.",
        ],
      },
    ],
  },
  "community-guidelines": {
    title: "Code of Conduct & Fair Bidding Rules",
    subtitle: "Ensuring open bidding, honest pricing, and respectful in-person property visits.",
    category: "Fair Bidding Rules",
    sections: [
      {
        heading: "1. Zero Tolerance for Price Fixing & Cartels",
        paragraphs: [
          "We believe in open and honest auctions. We strictly prohibit any attempt by bidders or brokers to form cartels, artificially lower prices, or fix bids. Any user attempting to manipulate bank auctions will be banned permanently and reported to the authorities under the Competition Act, 2002.",
        ],
      },
      {
        heading: "2. Respectful In-Person Property Visits",
        paragraphs: [
          "When visiting properties using SmartDoor passes or during bank inspection days, all visitors must treat existing occupants and bank officials with courtesy and respect. Any harassment or unauthorized entry into locked premises is strictly prohibited.",
        ],
      },
    ],
  },
  contact: {
    title: "Help, Support & Grievance Redressal",
    subtitle: "Get in touch with our team for property reports, site visits, or loan assistance.",
    category: "Customer Support",
    sections: [
      {
        heading: "1. Customer Support & Property Advisory Desk",
        paragraphs: [
          "Have questions about a bank auction property, need help booking an in-person visit, or want to apply for a fast 15-day loan? Our expert support team is available Monday to Saturday from 9:00 AM to 7:00 PM IST.",
        ],
      },
      {
        heading: "2. Official Grievance Officer",
        paragraphs: [
          "As required under the Information Technology Act, 2000, if you have any legal concern, privacy question, or unresolved complaint, you can directly contact our Nodal Grievance Officer:",
          "Nodal Grievance Officer: Legal & Compliance Directorate, AuctionIQ Technologies Private Limited. Express Towers, 14th Floor, Nariman Point, Mumbai, Maharashtra 400021. Email: grievance@auctioniq.in | Phone: +91 22 6982 4400.",
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
              <span>Back to Home</span>
            </Link>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
              <ShieldCheck className="h-3.5 w-3.5 text-[#D4AF37]" />
              <span>Compliant with SARFAESI Act, 2002 & Bank Auction Rules</span>
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
            <span>Last Updated: 2026 Edition</span>
            <span>•</span>
            <span>Legal Jurisdiction: Mumbai, India</span>
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
                <span>Registered Office</span>
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
                  <span>help@auctioniq.in</span>
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-charcoal/10 bg-[#FAF9F6] p-6">
              <h3 className="font-display text-sm font-bold text-navy flex items-center gap-2">
                <Lock className="h-4 w-4 text-[#8A6D3B]" />
                <span>How We Protect You</span>
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-charcoal/70">
                Every bank auction listing is checked for valid SARFAESI legal notices. Our legal team verifies 30-year ownership records, checks for pending court disputes, and calculates all outstanding society dues before you bid.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
