# Decision Log

**Purpose:** Record decisions that govern AuctionIQ scope and implementation. Do not implement entries marked PENDING.

## Entry template

| Field | Value |
|---|---|
| ID | D## |
| Decision | Short title |
| Status | APPROVED / PENDING / SUPERSEDED |
| Date | YYYY-MM-DD |
| Context | Why this decision is needed |
| Decision | Exact approved outcome or pending question |
| Consequences | Scope, implementation, or follow-up effects |
| Source/approver | Document section and approval source |

## Approved decisions

| ID | Decision | Status | Decision and consequences | Source/approver |
|---|---|---|---|---|
| D1 | Working title and brand placeholder | APPROVED | AuctionIQ is the working title; use provided brand assets or an approved placeholder. | ApprovalRegister.md §7; A11–A16 approved by user instruction; A1–A10 per approved pack status in archive/source-plans/implementation-plan-m0-m8.md §0. |
| D2 | Technology stack | APPROVED | Next.js App Router, TypeScript, Tailwind, Supabase Postgres/Auth/Storage, Prisma, Razorpay, Resend, and Vercel. | ApprovalRegister.md §7; A11–A16 approved by user instruction; A1–A10 per approved pack status in archive/source-plans/implementation-plan-m0-m8.md §0. |
| D3 | Launch tiers and MVP boundaries | APPROVED | Essential and Premium launch together; inspections are logged requests; advocate coordination is enquiry-only; DRT workspace is Phase 2. | ApprovalRegister.md §7; A11–A16 approved by user instruction; A1–A10 per approved pack status in archive/source-plans/implementation-plan-m0-m8.md §0. |
| D4 | Billing and tax presentation | APPROVED | Auto-renewal mandates, no trial, no partial-month refunds; prices are exclusive of 18% GST and GST is shown at checkout. | ApprovalRegister.md §7; A11–A16 approved by user instruction; A1–A10 per approved pack status in archive/source-plans/implementation-plan-m0-m8.md §0. |
| D5 | Seed content | APPROVED | Eight demo listings, six fictional simulator properties, ten Academy articles, and two quizzes. | ApprovalRegister.md §7; A11–A16 approved by user instruction; A1–A10 per approved pack status in archive/source-plans/implementation-plan-m0-m8.md §0. |
| D6 | Notifications | APPROVED | Email and in-platform notifications only for MVP. | ApprovalRegister.md §7; A11–A16 approved by user instruction; A1–A10 per approved pack status in archive/source-plans/implementation-plan-m0-m8.md §0. |
| D7 | Access boundaries | APPROVED | No public property enquiry/contact route; restricted property data is available only to entitled members and administrators. | ApprovalRegister.md §7; A11–A16 approved by user instruction; A1–A10 per approved pack status in archive/source-plans/implementation-plan-m0-m8.md §0. |
| D8 | Schema and API security rules | APPROVED | Per-role projections; restricted keys absent from free/public responses; server-side entitlement checks. | ApprovalRegister.md §7; A11–A16 approved by user instruction; A1–A10 per approved pack status in archive/source-plans/implementation-plan-m0-m8.md §0. |
| D9 | Deferred scope | APPROVED | Phase 2/3 features remain deferred and must not be represented as live. | ApprovalRegister.md §7; A11–A16 approved by user instruction; A1–A10 per approved pack status in archive/source-plans/implementation-plan-m0-m8.md §0. |
| D10 | Milestone gates | APPROVED | Milestones use demonstrable exit criteria and payment gates; full launch acceptance is required before production. | ApprovalRegister.md §7; A11–A16 approved by user instruction; A1–A10 per approved pack status in archive/source-plans/implementation-plan-m0-m8.md §0. |
| D11 | Delivery schedule and ownership | APPROVED | Use the M0–M8 work breakdown, task owners, dependencies, exit criteria, and critical path in ProjectPlan.md. | ApprovalRegister.md §7; A11–A16 approved by user instruction; A1–A10 per approved pack status in archive/source-plans/implementation-plan-m0-m8.md §0. |
| D12 | Inspection request semantics | APPROVED | MVP inspection is a logged request only. Admin status updates record request handling and do not imply that an inspection has been arranged or completed by AuctionIQ. | ApprovalRegister.md §7; A11–A16 approved by user instruction; A1–A10 per approved pack status in archive/source-plans/implementation-plan-m0-m8.md §0. |
| D13 | Member property contact | APPROVED | Paid-member property contact is a request to AuctionIQ support only; it must not expose bank/seller contact details or create a direct contact route. | ApprovalRegister.md §7; A11–A16 approved by user instruction; A1–A10 per approved pack status in archive/source-plans/implementation-plan-m0-m8.md §0. |
| D14 | Cancellation and refund handling | APPROVED | Cancellation takes effect at the end of the paid period; access remains through that period. No partial-month refunds; any other refund follows the published Refund Policy and is audited. | ApprovalRegister.md §7; A11–A16 approved by user instruction; A1–A10 per approved pack status in archive/source-plans/implementation-plan-m0-m8.md §0. |
| D15 | Listing source and verification | APPROVED | A listing must have a recorded source and verification timestamp before publication. Admins recheck when auction details change and record status transitions; no unapproved automated ingestion. | ApprovalRegister.md §7; A11–A16 approved by user instruction; A1–A10 per approved pack status in archive/source-plans/implementation-plan-m0-m8.md §0. |
| D16 | RLS and payment event records | APPROVED | Every user-accessible table has an explicit RLS policy. Payment processing stores webhook event IDs for idempotency and records invoice data; service-role access remains server-only. | ApprovalRegister.md §7; A11–A16 approved by user instruction; A1–A10 per approved pack status in archive/source-plans/implementation-plan-m0-m8.md §0. |
| A17 | Supabase provisioning | PENDING | Founder-owned; blocks T3 and T4. | Founder-owned; approval follows provisioning and verification of dev, staging, and production projects. |
| A18 | Vercel + DNS provisioning | PENDING | Founder-owned; blocks T10. | Founder-owned; approval follows staging and production project/domain setup and staging deploy verification. |
| A19 | Resend provisioning | PENDING | Founder-owned; blocks M4. | Founder-owned; approval follows verified sender setup and delivered test email. |
| A20 | Sentry provisioning | PENDING | Founder-owned; blocks T12. | Founder-owned; approval follows staging/production projects, captured test event, and received alert email. |
| A21 | Build bundler | APPROVED | Use Webpack for `pnpm build` because Turbopack fails in this environment; revisit the bundler choice at M8. | User instruction, 2026-10-21. |
| A22 | Public property projection | APPROVED | Public and free-tier property reads use Next.js API routes with explicit column allowlists; no PostgREST/views for public data at MVP. | User approval, 2026-10-21. |
| A23 | Public property views | APPROVED | `public_properties` and `public_property_photos` views are out of M1 scope and may be reconsidered at M7 for defense-in-depth. | User approval, 2026-10-21. |
| A25 | §6.1 table classes and DB outcomes | APPROVED | Add classes R/P/S/U/A/X with explicit per-role PostgreSQL semantics; distinguish `deny_perm` (42501 permission denied) from `empty_result` (00000, zero rows). | User approval, pasted instruction, 2026-10-21. |
| A26 | M1-T9 RLS probe matrix scope | APPROVED | Require 155 SELECT cells (31 tables × 5 roles), client write probes only for the 15 tables with client write policies, plus six service-role grant probes. | User approval, pasted instruction, 2026-10-21. |

## Pending decisions and inputs

| ID | Decision/input | Status | What remains | Source |
|---|---|---|---|---|
| P1 | Razorpay onboarding | PENDING | Founder to complete KYC and confirm subscription capability before live checkout. | ProjectPlan.md §1, M0-T2 |
| P2 | Legal/business details | PENDING | Supply legal entity details, GSTIN, registered address, and grievance officer; counsel reviews policy drafts. | ProjectPlan.md §1, M0-T1/T8 |
| P3 | Brand/content ownership | PENDING | Supply brand assets or approve placeholders; name a content owner and approve content briefs. | ProjectPlan.md §1, M0-T9/T10 |
| P4 | Vendor and budget selection | PENDING | Decide in-house/agency/freelancer and select a budget path before signing a development contract. | ProjectPlan.md §6 and §10 |
| P5 | Contract and milestone payment schedule | PENDING | Sign the development contract and confirm milestone payment schedule. | ProjectPlan.md §1, M0-T12 |
| P6 | Implementation authorization | APPROVED | User explicitly authorized M1 — Foundations on 2026-10-21. Authorization is limited to the tasks in that milestone prompt; subsequent milestones still require authorization. | User instruction: “Execute M1 (Foundations) from /docs/ProjectPlan.md §1.” |

## Change history

| Date | Change |
|---|---|
| 2026-10-21 | Created from the available documentation pack and implementation plan. A11–A16 recorded as approved per user instruction. |
| 2026-10-21 | M1 implementation authorization recorded; limited to M1 scope. |
| 2026-10-21 | A21 recorded: use Webpack for builds in this environment and revisit at M8. |
| 2026-10-21 | A22–A23 recorded: public property data is served through allowlisted API projections; public views are deferred to M7 evaluation. |
| 2026-10-21 | A25–A26 recorded: §6.1 adds table classes and exact DB outcome semantics; M1-T9 probe scope is reduced to all SELECT cells, applicable client writes, and service-role grant probes. |
