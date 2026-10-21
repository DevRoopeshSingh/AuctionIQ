# Approval Register

**Source:** ProjectPlan.md v1.2, §7.
**Approval status:** A1–A16 approved. A11–A16 are recorded as approved per the user instruction accompanying this documentation update.

| ID | Decision | Approved outcome | Status |
|---|---|---|---|
| A1 | Working title and brand placeholder | AuctionIQ is the working title; use provided brand assets or an approved placeholder. | Approved |
| A2 | Technology stack | Next.js App Router, TypeScript, Tailwind, Supabase Postgres/Auth/Storage, Prisma, Razorpay, Resend, and Vercel. | Approved |
| A3 | Launch tiers and MVP boundaries | Essential and Premium launch together; inspections are logged requests; advocate coordination is enquiry-only; DRT workspace is Phase 2. | Approved |
| A4 | Billing and tax presentation | Auto-renewal mandates, no trial, no partial-month refunds; prices are exclusive of 18% GST and GST is shown at checkout. | Approved |
| A5 | Seed content | Eight demo listings, six fictional simulator properties, ten Academy articles, and two quizzes. | Approved |
| A6 | Notifications | Email and in-platform notifications only for MVP. | Approved |
| A7 | Access boundaries | No public property enquiry/contact route; restricted property data is available only to entitled members and administrators. | Approved |
| A8 | Schema and API security rules | Per-role projections; restricted keys absent from free/public responses; server-side entitlement checks. | Approved |
| A9 | Deferred scope | Phase 2/3 features remain deferred and must not be represented as live. | Approved |
| A10 | Milestone gates | Milestones use demonstrable exit criteria and payment gates; full launch acceptance is required before production. | Approved |
| A11 | Delivery schedule and ownership | Use the M0–M8 work breakdown, task owners, dependencies, exit criteria, and critical path in ProjectPlan.md. | Approved |
| A12 | Inspection request semantics | MVP inspection is a logged request only. Admin status updates record request handling and do not imply that an inspection has been arranged or completed by AuctionIQ. | Approved |
| A13 | Member property contact | Paid-member property contact is a request to AuctionIQ support only; it must not expose bank/seller contact details or create a direct contact route. | Approved |
| A14 | Cancellation and refund handling | Cancellation takes effect at the end of the paid period; access remains through that period. No partial-month refunds; any other refund follows the published Refund Policy and is audited. | Approved |
| A15 | Listing source and verification | A listing must have a recorded source and verification timestamp before publication. Admins recheck when auction details change and record status transitions; no unapproved automated ingestion. | Approved |
| A16 | RLS and payment event records | Every user-accessible table has an explicit RLS policy. Payment processing stores webhook event IDs for idempotency and records invoice data; service-role access remains server-only. | Approved |
