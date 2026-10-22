import { Badge } from "@/components/ui/primitives";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <section className="grid gap-10 py-16 md:grid-cols-[1.2fr_0.8fr] md:items-center md:py-24">
        <div>
          <Badge>South Mumbai · Navi Mumbai</Badge>
          <h1 className="mt-5 max-w-3xl font-display text-4xl leading-tight text-navy sm:text-6xl">
            Make your next auction decision with better information.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-charcoal/75">
            AuctionIQ is building a clearer way to understand bank-auction properties, key dates, and due diligence.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              className="inline-flex min-h-12 items-center justify-center rounded-md bg-navy px-5 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-navy/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              href="#how-it-helps"
            >
              How AuctionIQ plans to help
            </Link>
            <Link
              className="inline-flex min-h-12 items-center justify-center rounded-md border border-navy px-4 py-3 text-sm font-semibold text-navy transition-colors hover:bg-navy/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              href="#pre-auction-checklist"
            >
              View the due-diligence checklist
            </Link>
          </div>
          <p className="mt-6 text-sm text-charcoal/70">The platform is in foundations setup. Property intelligence features are not live yet.</p>
        </div>
        <div className="overflow-hidden rounded-2xl border border-gold/40 bg-white shadow-xl transition-all hover:shadow-2xl">
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-navy/5">
            <Image
              src="/images/mumbai-property.jpg"
              alt="Prime South Mumbai and coastal waterfront real estate architecture along Marine Drive"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent" />
            <div className="absolute top-3.5 left-3.5">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-navy/80 px-3 py-1 text-xs font-semibold text-ivory backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-gold" />
                South Mumbai Focus Area
              </span>
            </div>
            <div className="absolute bottom-3.5 left-4 right-4 text-white">
              <p className="font-display text-lg font-bold text-white drop-shadow-sm">Bank-Auction Intelligence</p>
              <p className="text-xs text-white/80">Structured research across prime residential &amp; commercial assets</p>
            </div>
          </div>
          <div className="p-6">
            <p className="font-display text-xl font-semibold text-navy">A more informed starting point</p>
            <p className="mt-2 text-sm leading-6 text-charcoal/75">
              Clear property facts, source context, and practical learning resources are planned for upcoming releases.
            </p>
            <div className="mt-4 flex items-center justify-between border-t border-charcoal/10 pt-4 text-xs font-semibold">
              <span className="text-warning">Listings and member tools are coming soon.</span>
              <span className="text-charcoal/50">SARFAESI · DRT Research</span>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="explore-title" className="border-t border-charcoal/10 py-14" id="explore">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <Badge tone="warning">Property Discovery</Badge>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl" id="explore-title">
              Explore curated bank auctions
            </h2>
            <p className="mt-3 leading-7 text-charcoal/75">
              Preview active bank auction notices across South Mumbai and Navi Mumbai. Public previews show verified reserve prices, general localities, and key dates. Detailed legal records, verified encumbrances, and exact unit data are unlocked for members.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-xs font-semibold">
            <span className="rounded-full bg-navy px-3.5 py-1.5 text-white">All Areas (14)</span>
            <span className="rounded-full border border-charcoal/20 bg-white px-3.5 py-1.5 text-charcoal/80">South Mumbai (8)</span>
            <span className="rounded-full border border-charcoal/20 bg-white px-3.5 py-1.5 text-charcoal/80">Navi Mumbai (6)</span>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              ref: "BOM-WOR-042",
              type: "Residential · 3 BHK",
              title: "Sea-Facing Residence · Worli Sea Face",
              area: "South Mumbai",
              reserve: "₹4,85,00,000",
              emd: "₹48,50,000 (10%)",
              carpet: "1,620 sq.ft",
              date: "18 Nov 2026",
              possession: "Physical Possession Pending",
              noticeType: "SARFAESI Statutory Notice",
              lockedItems: ["Exact unit & building details", "Title search report summary"],
            },
            {
              ref: "BOM-NP-019",
              type: "Commercial Office Suite",
              title: "Prime Commercial Floor · Nariman Point",
              area: "South Mumbai",
              reserve: "₹3,20,00,000",
              emd: "₹32,00,000 (10%)",
              carpet: "1,150 sq.ft built-up",
              date: "25 Nov 2026",
              possession: "Symbolic Possession",
              noticeType: "DRT Public Auction",
              lockedItems: ["Full auction notice PDF", "Encumbrance certificate"],
            },
            {
              ref: "NAV-PBR-108",
              type: "Residential · 4 BHK Penthouse",
              title: "Waterfront Tower · Palm Beach Road",
              area: "Navi Mumbai",
              reserve: "₹2,45,00,000",
              emd: "₹24,50,000 (10%)",
              carpet: "2,380 sq.ft",
              date: "04 Dec 2026",
              possession: "Inspection Window Scheduled",
              noticeType: "SARFAESI Auction",
              lockedItems: ["Housing society NOC status", "Acquisition cost breakdown"],
            },
          ].map((item) => (
            <div className="flex flex-col justify-between overflow-hidden rounded-xl border border-charcoal/15 bg-white shadow-sm transition-all hover:border-gold/60 hover:shadow-md" key={item.ref}>
              <div className="p-5">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="rounded bg-navy/10 px-2 py-0.5 text-navy">{item.area}</span>
                  <span className="font-mono text-charcoal/50">{item.ref}</span>
                </div>
                <h3 className="mt-3 font-display text-lg font-bold text-navy">{item.title}</h3>
                <p className="text-xs font-medium text-charcoal/60">{item.type} · {item.noticeType}</p>

                <div className="mt-4 rounded-lg bg-[#f1f5f9] p-3 text-xs">
                  <div className="flex justify-between">
                    <span className="text-charcoal/65">Reserve Price:</span>
                    <span className="font-bold text-navy">{item.reserve}</span>
                  </div>
                  <div className="mt-1 flex justify-between">
                    <span className="text-charcoal/65">Earnest Money (EMD):</span>
                    <span className="font-semibold text-charcoal/85">{item.emd}</span>
                  </div>
                  <div className="mt-1 flex justify-between">
                    <span className="text-charcoal/65">Auction Date:</span>
                    <span className="font-semibold text-charcoal/85">{item.date}</span>
                  </div>
                </div>

                <div className="mt-4 space-y-1.5 border-t border-charcoal/10 pt-3">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-charcoal/55">Member Tier Preview</p>
                  {item.lockedItems.map((locked) => (
                    <div className="flex items-center gap-2 text-xs text-charcoal/70" key={locked}>
                      <span aria-hidden="true" className="text-gold">🔒</span>
                      <span>{locked}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-charcoal/10 bg-ivory/50 p-4">
                <Link
                  className="inline-flex w-full min-h-10 items-center justify-center rounded-md border border-navy/80 bg-white px-3 py-2 text-xs font-semibold text-navy transition-colors hover:bg-navy hover:text-white"
                  href="/auth/signup"
                >
                  Join member waitlist to unlock
                </Link>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-5 text-center text-xs text-charcoal/60">
          Public teasers show general areas only. Sample previews for interface demonstration during platform setup.
        </p>
      </section>

      <section className="border-t border-charcoal/10 py-14" aria-labelledby="simulator-title"><div className="mx-auto max-w-3xl text-center"><Badge tone="warning">Zero Financial Risk</Badge><h2 className="mt-3 font-display text-3xl font-bold text-navy">Practice before the auction</h2><p className="mt-3 text-charcoal/75">Learn bidding flow in a fictional, zero-risk training environment.</p><Link className="mt-6 inline-flex min-h-12 items-center justify-center rounded-md bg-navy px-6 font-semibold text-white" href="/simulator">Open the simulator</Link></div></section>

      <section aria-labelledby="academy-title" className="border-t border-charcoal/10 py-14" id="academy">
        <div className="max-w-3xl">
          <Badge tone="warning">Education &amp; Methodology</Badge>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl" id="academy-title">
            AuctionIQ Learning Academy
          </h2>
          <p className="mt-3 leading-7 text-charcoal/75">
            Master the legal frameworks, statutory risks, and due-diligence protocols governing Indian bank auctions under SARFAESI and DRT procedures.
          </p>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "SARFAESI Act & Section 13(4) Explained",
              readTime: "6 min read",
              level: "Core Legal",
              summary: "How banks enforce security interest without court orders, statutory 30-day notice windows, and buyer rights.",
            },
            {
              title: "Physical vs Symbolic Possession",
              readTime: "8 min read",
              level: "Risk Due Diligence",
              summary: "Why symbolic possession doesn't guarantee vacant keys, and how Section 14 magistrate orders work in Mumbai.",
            },
            {
              title: "Uncovering Hidden Arrears & Liabilities",
              readTime: "7 min read",
              level: "Financial Audit",
              summary: "How municipal property taxes, cooperative society maintenance dues, and unpaid builder charges attach to properties.",
            },
            {
              title: "The True Net Acquisition Cost Formula",
              readTime: "5 min read",
              level: "Financial Planning",
              summary: "Calculating costs beyond the hammer price: 10% EMD, 15% next-day, 6% Maharashtra stamp duty, and 1% TDS.",
            },
          ].map((item) => (
            <div className="flex flex-col justify-between rounded-xl border border-charcoal/10 bg-white p-5 shadow-sm transition-all hover:border-gold/50 hover:shadow-md" key={item.title}>
              <div>
                <div className="flex items-center justify-between text-[11px] font-semibold text-charcoal/60">
                  <span className="rounded bg-navy/10 px-2 py-0.5 text-navy">{item.level}</span>
                  <span>{item.readTime}</span>
                </div>
                <h3 className="mt-3 font-display text-base font-bold text-navy">{item.title}</h3>
                <p className="mt-2 text-xs leading-5 text-charcoal/70">{item.summary}</p>
              </div>
              <div className="mt-4 border-t border-charcoal/10 pt-3">
                <Link className="text-xs font-semibold text-navy hover:underline" href="#auction-process">
                  Read guide outline →
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-xl border border-gold/40 bg-gradient-to-r from-navy to-[#18385c] p-6 text-white shadow-md sm:p-8">
          <div className="grid gap-6 md:grid-cols-[1.3fr_0.7fr] md:items-center">
            <div>
              <span className="rounded-full bg-gold/20 px-3 py-1 text-xs font-semibold text-gold">Self-Assessment</span>
              <h3 className="mt-2 font-display text-2xl font-bold text-white">Test your auction readiness in 5 minutes</h3>
              <p className="mt-2 text-sm leading-6 text-white/80">
                Answer scenario-based questions to evaluate your understanding of possession status, title verification, and statutory deadlines before participating in real auctions.
              </p>
            </div>
            <div className="text-left md:text-right">
              <Link
                className="inline-flex min-h-11 items-center justify-center rounded-md bg-gold px-5 py-2.5 text-sm font-bold text-charcoal shadow transition-colors hover:bg-gold/90"
                href="#pre-auction-checklist"
              >
                Review Due-Diligence Checklist
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section aria-labelledby="how-it-helps-title" className="border-t border-charcoal/10 py-12" id="how-it-helps">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <Badge tone="warning">Planned for upcoming releases</Badge>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-navy" id="how-it-helps-title">
              A clearer way to prepare
            </h2>
            <p className="mt-3 max-w-2xl leading-7 text-charcoal/75">
              AuctionIQ is being built to help people approach bank-auction research with a more structured set of questions.
            </p>
            <ol className="mt-6 grid gap-4 sm:grid-cols-3">
              {[
                ["01", "Understand the notice", "Get familiar with auction terms, dates, and the information provided."],
                ["02", "Review the available facts", "Bring property details and source context together for easier review."],
                ["03", "Plan your due diligence", "Identify questions to resolve before deciding whether to proceed."],
              ].map(([number, title, description]) => (
                <li className="rounded-lg border border-charcoal/10 bg-white p-4" key={number}>
                  <span aria-hidden="true" className="font-display text-sm font-bold text-warning">{number}</span>
                  <h3 className="mt-2 font-semibold text-navy">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-charcoal/70">{description}</p>
                </li>
              ))}
            </ol>
          </div>
          <div aria-label="Illustration of AuctionIQ's focus areas" className="overflow-hidden rounded-xl border border-gold/40 bg-white shadow-md">
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-navy/5">
              <Image
                src="/images/navi-mumbai.jpg"
                alt="Modern planned skyline and waterfront along Palm Beach Road in Navi Mumbai"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/20 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4">
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gold">Geographic Focus</span>
                <p className="font-display text-sm font-bold text-white">Navi Mumbai &amp; South Mumbai Corridors</p>
              </div>
            </div>
            <div className="p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-charcoal/65">Area focus</p>
              <div className="mt-3 grid grid-cols-2 gap-3 text-center">
                <div className="rounded-md border border-charcoal/10 bg-[#f1f5f9] px-2 py-2.5">
                  <p className="text-xs font-bold text-navy">South Mumbai</p>
                  <p className="mt-0.5 text-[11px] text-charcoal/60">Colaba to Worli</p>
                </div>
                <div className="rounded-md border border-charcoal/10 bg-[#f1f5f9] px-2 py-2.5">
                  <p className="text-xs font-bold text-navy">Navi Mumbai</p>
                  <p className="mt-0.5 text-[11px] text-charcoal/60">Vashi to Panvel</p>
                </div>
              </div>
              <p className="mt-3 text-center text-xs text-charcoal/60">Regional focus · no live property locations yet</p>
            </div>
          </div>
        </div>
      </section>
      <section aria-labelledby="auction-process-title" className="border-t border-charcoal/10 py-12" id="auction-process">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-warning">Educational overview</p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-navy" id="auction-process-title">
            How a bank auction generally works
          </h2>
          <p className="mt-3 leading-7 text-charcoal/75">
            The sale notice and applicable rules set the terms. Use this as a starting point for reading the notice, not as a guide to any specific property or auction.
          </p>
        </div>
        <ol className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["01", "Read the sale notice", "Look for the property description, reserve price, deposit requirements, inspection details, deadlines, and sale conditions."],
            ["02", "Review and verify", "Check the records and information relevant to the property. Arrange an inspection if the notice permits one."],
            ["03", "Prepare as required", "Follow the notice for bidder registration, submission paperwork, deposits, and the auction platform or process."],
            ["04", "Follow the stated terms", "If you participate, use the notice and authorised officer's instructions for bidding and any later steps."],
          ].map(([number, title, description]) => (
            <li className="rounded-lg border border-charcoal/10 bg-white p-5" key={number}>
              <span aria-hidden="true" className="font-display text-sm font-bold text-warning">{number}</span>
              <h3 className="mt-2 font-semibold text-navy">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-charcoal/70">{description}</p>
            </li>
          ))}
        </ol>
        <p className="mt-5 text-sm leading-6 text-charcoal/65">
          For reference, see the official text of the <a className="font-semibold text-navy underline decoration-gold underline-offset-4" href="https://upload.indiacode.nic.in/showfile?actid=AC_CEN_2_11_00037_200254_1517807324604&filename=security_interest_%28enforcement%29_rules%2C_2002.pdf&type=rule" rel="noreferrer" target="_blank">Security Interest (Enforcement) Rules, 2002</a>, any applicable amendments, and the specific sale notice issued for an auction.
        </p>
      </section>
      <section aria-labelledby="pre-auction-checklist-title" className="border-t border-charcoal/10 py-12" id="pre-auction-checklist">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-warning">Before you decide</p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-navy" id="pre-auction-checklist-title">
              A due-diligence question list
            </h2>
            <p className="mt-3 leading-7 text-charcoal/75">
              Use these prompts to organise your review. What applies and what can be verified will vary by property and sale notice.
            </p>
            <p className="mt-4 text-sm leading-6 text-charcoal/65">
              This is general educational information, not legal, tax, or investment advice. Consider getting advice from qualified professionals before making a decision.
            </p>
          </div>
          <ul className="grid content-start gap-3 sm:grid-cols-2">
            {[
              "Is this the latest sale notice, including any corrigenda or updates?",
              "Do the property description and available records match what is being offered?",
              "What is known about title, encumbrances, dues, and possession?",
              "Can the property be inspected, and what can you verify about its condition and access?",
              "What costs and obligations may apply beyond the bid amount?",
              "What registration, deposit, payment, and post-sale deadlines does the notice specify?",
            ].map((question) => (
              <li className="flex gap-3 rounded-lg border border-charcoal/10 bg-white p-4 text-sm leading-6 text-charcoal/80" key={question}>
                <span aria-hidden="true" className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-navy/10 text-xs font-bold text-navy">?</span>
                {question}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section aria-labelledby="auction-glossary-title" className="border-t border-charcoal/10 py-12" id="auction-glossary">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-warning">Auction terms</p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-navy" id="auction-glossary-title">
            A quick glossary
          </h2>
          <p className="mt-3 leading-7 text-charcoal/75">
            Sale notices may use these terms. Their implications depend on the specific notice, records, and applicable rules.
          </p>
        </div>
        <dl className="mt-6 grid gap-4 sm:grid-cols-2">
          {[
            ["Reserve price", "The reserve amount stated for the property in the sale notice. It is not a promise of market value."],
            ["Earnest Money Deposit (EMD)", "A deposit amount and deadline stated in the notice for prospective bidders. The notice and applicable rules explain payment, refund, and other conditions."],
            ["Possession status", "A notice may describe possession as physical or symbolic. That label alone should not be treated as confirmation of occupancy, access, or vacant possession."],
            ["Encumbrance", "A claim, right, or other burden that may affect a property. Check relevant records and get qualified advice; a notice may not resolve every question."],
          ].map(([term, definition]) => (
            <div className="rounded-lg border border-charcoal/10 bg-white p-5" key={term}>
              <dt className="font-display text-lg font-semibold text-navy">{term}</dt>
              <dd className="mt-2 text-sm leading-6 text-charcoal/75">{definition}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-5 text-sm text-charcoal/65">
          For an example of how sale notices present EMD, reserve price, and possession information, see this <a className="font-semibold text-navy underline decoration-gold underline-offset-4" href="https://ibbi.gov.in/uploads/auction_notice_liquidation/7fc8166edb1356037f3f5ff83d38e618.pdf" rel="noreferrer" target="_blank">public bank sale notice</a>.
        </p>
      </section>
      <section aria-labelledby="plans-title" className="border-t border-charcoal/10 py-14" id="plans">
        <div className="max-w-3xl">
          <Badge tone="warning">Predictable &amp; Transparent</Badge>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl" id="plans-title">
            Transparent membership plans
          </h2>
          <p className="mt-3 leading-7 text-charcoal/75">
            Choose the level of intelligence and coordination that matches your investment journey. No hidden commissions, cancel anytime with zero exit penalties.
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="flex flex-col justify-between rounded-xl border border-charcoal/15 bg-white p-6 shadow-sm">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-charcoal/60">Free Tier</span>
              <h3 className="mt-2 font-display text-2xl font-bold text-navy">Visitor</h3>
              <p className="mt-1 text-xs text-charcoal/65">For education, simulator practice, and basic research</p>
              <div className="mt-4 border-b border-charcoal/10 pb-4">
                <span className="font-display text-4xl font-bold text-navy">₹0</span>
                <span className="text-xs text-charcoal/60"> / forever free</span>
              </div>
              <ul className="mt-5 space-y-2.5 text-xs text-charcoal/75">
                <li className="flex items-center gap-2">✓ Unlimited Virtual Auction Simulator</li>
                <li className="flex items-center gap-2">✓ All Learning Academy articles &amp; checklists</li>
                <li className="flex items-center gap-2">✓ Public property teaser summaries</li>
                <li className="flex items-center gap-2">✓ Basic acquisition cost calculator</li>
                <li className="flex items-center gap-2 text-charcoal/45">✗ Unlocked exact premises details</li>
                <li className="flex items-center gap-2 text-charcoal/45">✗ Physical inspection coordination</li>
                <li className="flex items-center gap-2 text-charcoal/45">✗ Advocate legal review coordination</li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-charcoal/10">
              <Link
                className="inline-flex w-full min-h-11 items-center justify-center rounded-md border border-navy px-4 py-2 text-sm font-semibold text-navy transition-colors hover:bg-navy/5"
                href="/auth/signup"
              >
                Start Free
              </Link>
            </div>
          </div>

          <div className="relative flex flex-col justify-between rounded-xl border-2 border-gold bg-white p-6 shadow-lg">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold px-3 py-0.5 text-[11px] font-bold text-charcoal uppercase tracking-wider">
              Most Popular
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-warning">Active Investors</span>
              <h3 className="mt-2 font-display text-2xl font-bold text-navy">Essential</h3>
              <p className="mt-1 text-xs text-charcoal/65">For serious property seekers evaluating live bank auctions</p>
              <div className="mt-4 border-b border-charcoal/10 pb-4">
                <span className="font-display text-4xl font-bold text-navy">₹850</span>
                <span className="text-xs text-charcoal/60"> / month + GST</span>
              </div>
              <ul className="mt-5 space-y-2.5 text-xs text-charcoal/80">
                <li className="flex items-center gap-2 font-medium text-navy">✓ Everything in Visitor, plus:</li>
                <li className="flex items-center gap-2">✓ <strong>Unlocked exact location previews</strong></li>
                <li className="flex items-center gap-2">✓ <strong>Verified bank notice source links</strong></li>
                <li className="flex items-center gap-2">✓ <strong>5 physical property inspection requests / mo</strong></li>
                <li className="flex items-center gap-2">✓ Full Investor Community discussion forum</li>
                <li className="flex items-center gap-2">✓ Standard EMD deadlines &amp; date alerts</li>
                <li className="flex items-center gap-2">✓ Acquisition cost calculator (standard mode)</li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-charcoal/10">
              <Link
                className="inline-flex w-full min-h-11 items-center justify-center rounded-md bg-navy px-4 py-2 text-sm font-semibold text-white shadow transition-colors hover:bg-navy/90"
                href="/auth/signup"
              >
                Choose Essential
              </Link>
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-xl border border-charcoal/15 bg-white p-6 shadow-sm">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-charcoal/60">HNIs &amp; Family Offices</span>
              <h3 className="mt-2 font-display text-2xl font-bold text-navy">Premium</h3>
              <p className="mt-1 text-xs text-charcoal/65">For high-conviction bidders needing deep legal coordination</p>
              <div className="mt-4 border-b border-charcoal/10 pb-4">
                <span className="font-display text-4xl font-bold text-navy">₹1,250</span>
                <span className="text-xs text-charcoal/60"> / month + GST</span>
              </div>
              <ul className="mt-5 space-y-2.5 text-xs text-charcoal/80">
                <li className="flex items-center gap-2 font-medium text-navy">✓ Everything in Essential, plus:</li>
                <li className="flex items-center gap-2">✓ <strong>Unlimited fair-use inspection requests</strong></li>
                <li className="flex items-center gap-2">✓ <strong>Advocate coordination enquiry workflow</strong></li>
                <li className="flex items-center gap-2">✓ Maximum-Bid Planner with yield &amp; return models</li>
                <li className="flex items-center gap-2">✓ DRT case tracking &amp; litigation alerts</li>
                <li className="flex items-center gap-2">✓ Priority auction notice updates</li>
                <li className="flex items-center gap-2">✓ Dedicated member concierge assistance</li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-charcoal/10">
              <Link
                className="inline-flex w-full min-h-11 items-center justify-center rounded-md border border-navy px-4 py-2 text-sm font-semibold text-navy transition-colors hover:bg-navy/5"
                href="/auth/signup"
              >
                Choose Premium
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-lg bg-[#f1f5f9] p-4 text-xs leading-5 text-charcoal/70">
          <p>
            <strong>Subscription &amp; fee disclosures:</strong> Subscriptions are managed on a month-to-month basis via Razorpay auto-renewal with no annual lock-in. Advocate legal reviews are conducted by independent empanelled advocates whose fee schedules are disclosed transparently before any request is placed.
          </p>
        </div>
      </section>

      <section aria-labelledby="about-title" className="border-t border-charcoal/10 py-14" id="about">
        <div className="max-w-3xl">
          <Badge tone="warning">Our Mission</Badge>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl" id="about-title">
            About AuctionIQ
          </h2>
          <p className="mt-3 text-lg leading-8 text-charcoal/80">
            AuctionIQ is being developed as a specialised property intelligence platform focused exclusively on bank auctions in South Mumbai and Navi Mumbai.
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-charcoal/10 bg-white p-5 shadow-sm">
            <span aria-hidden="true" className="font-display text-xl font-bold text-gold">01</span>
            <h3 className="mt-2 font-display text-lg font-bold text-navy">Radical Independence</h3>
            <p className="mt-2 text-sm leading-6 text-charcoal/70">
              We never take broker commissions, buyer finder fees, or developer listing charges. Our objective is singular: giving you the unvarnished facts to protect your capital.
            </p>
          </div>
          <div className="rounded-xl border border-charcoal/10 bg-white p-5 shadow-sm">
            <span aria-hidden="true" className="font-display text-xl font-bold text-gold">02</span>
            <h3 className="mt-2 font-display text-lg font-bold text-navy">Dual-Corridor Focus</h3>
            <p className="mt-2 text-sm leading-6 text-charcoal/70">
              We focus on South Mumbai&apos;s heritage island city assets and Navi Mumbai&apos;s planned coastal growth corridors—two distinct markets requiring specialized diligence.
            </p>
          </div>
          <div className="rounded-xl border border-charcoal/10 bg-white p-5 shadow-sm">
            <span aria-hidden="true" className="font-display text-xl font-bold text-gold">03</span>
            <h3 className="mt-2 font-display text-lg font-bold text-navy">Education Before Capital</h3>
            <p className="mt-2 text-sm leading-6 text-charcoal/70">
              We believe every investor should practise in a simulator and understand SARFAESI legal nuances before committing earnest money to any real auction.
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-lg border border-charcoal/15 bg-white p-5 text-xs leading-6 text-charcoal/70">
          <strong className="text-navy">Operational &amp; Regulatory Statement:</strong> AuctionIQ is an independent information and software platform. We are not an auction house, bank, recovery agent, or legal counsel. We do not accept bids or process property payments. All property notices featured are drawn from public statutory sources.
        </div>
      </section>
      <section aria-labelledby="faq-title" className="border-t border-charcoal/10 py-12" id="faq">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-warning">Frequently asked questions</p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-navy" id="faq-title">A few useful basics</h2>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {[
            ["What is AuctionIQ?", "AuctionIQ is being developed to make bank-auction property research clearer and more structured."],
            ["Which areas will it focus on?", "The initial focus is South Mumbai and Navi Mumbai."],
            ["Are listings or member tools available now?", "No. Property listings and member tools are not live yet; the platform is still in foundations setup."],
            ["Does AuctionIQ conduct auctions or accept bids?", "No. AuctionIQ is an information platform. It does not conduct auctions or handle bids, deposits, or property transactions."],
          ].map(([question, answer]) => (
            <details className="group rounded-lg border border-charcoal/10 bg-white p-4 open:border-gold/40" key={question}>
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 font-semibold text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold [&::-webkit-details-marker]:hidden">
                {question}
                <span aria-hidden="true" className="shrink-0 text-xl font-normal text-warning transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="pt-2 pr-6 text-sm leading-6 text-charcoal/75">{answer}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
