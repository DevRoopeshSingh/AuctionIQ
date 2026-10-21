# Functional Specification

## 2.1 Listing Visibility Rules

| Field | Public teaser | Member | Admin |
|---|---|---|---|
| Property photos (public set) | Yes | Yes | Yes |
| Reserve price | Yes | Yes | Yes |
| Broad category | Yes | Yes | Yes |
| General area (“Mumbai”, non-identifying) | Yes | Yes | Yes |
| Generic reference | Yes | Yes | Yes |
| Auction date | Yes if source-confirmed public-safe | Yes | Yes |
| Exact location | No | Yes | Yes |
| Building/society name | No | Yes | Yes |
| EMD amount/deadline | No | Yes | Yes |
| Auction authority/source ref | No | Yes | Yes |
| Possession info + source | No | Yes | Yes |
| Documents | No | Yes (authorised) | Yes |
| Reported dues + verification | No | Yes | Yes |
| Sale notice | Never public | Private, authorised only | Yes |
| Internal notes | No | No | Yes |

**Hard rules.**
- Public API responses must not include restricted keys at all (not null-masked with real values in source).
- Server-side field projection per role; no client-side filtering of a full payload.
- Member routes and document URLs excluded from sitemap and set `noindex`.

## 2.2 Listing Status Workflow

| Transition | Actor | Preconditions | Side effects |
|---|---|---|---|
| Draft → Pending verification | Admin | Mandatory fields present | — |
| Pending verification → Teaser | Admin | Public fields + ≥1 public photo | Published timestamp; appears publicly |
| Teaser → Member available | Admin | Exact location, building, member docs, dues fields | Member alert (matching watchlists) |
| Member available → Auction approaching | System/Admin | Auction date ≤ 14 days | Alert (auction date) |
| Any → Withdrawn/Postponed | Admin | Reason required | Members notified; removed from active lists |
| Withdrawn → Recheck required | Admin | — | Flag visible to members as “requires recheck” |
| Recheck → Pending verification | Admin | — | — |
| Auction approaching → Completed | Admin/System | Date passed + confirmed | Read-only; retained for history |

Every transition writes `property_status_history`.

## 2.3 Simulator Rules

- Session: select fictional property, difficulty, budget.
- Bid increments fixed per difficulty; timer configurable (default 120s beginner, 90s intermediate, 60s advanced).
- Bid rejected if `bid > budget` or `bid <= current_highest`; message explains rule.
- Competing bidders are deterministic pseudo-agents with difficulty-scaled aggressiveness.
- Outcome: win/lose; report includes virtual acquisition cost breakdown (bid, stamp duty estimate, fees, dues estimate, repairs, buffer), decision notes, and “educational only” banner.
- No real payment, deposit, or external call.

## 2.4 Calculator Rules

Inputs: bid amount, stamp duty %, registration, legal/professional fees, society dues, municipal dues, repairs, financing cost, possession costs, other costs.

- Unknown inputs must be flagged “Unknown”; totals show “Total known costs” and “Unknown items: n” separately.
- Assumption panel lists every rate and source (e.g. “Stamp duty 5% + 1% registration — Maharashtra default, editable”).
- Outputs: estimated total acquisition cost, cost/sqft (if area present), optimistic/expected/high scenarios, cash required, rental yield (if rent input), resale scenario (if value input).
- Maximum-bid planner (Phase 2, Premium): ceiling from budget, costs, renovation, target return, expected rent/resale, financing; warning when bid exceeds budget or target return.

## 2.5 Forum Rules

- One thread page per `property_id`; posts grouped by contribution type filter.
- Contribution types: inspection experience, document question, reported dues, building condition, valuation/comparables, auction process, advocate question, other.
- Upvote once per user per post; author cannot mark own reply as helpful answer (admin can override).
- Edit window: 15 minutes, then edit recorded in history (visible).
- Report reasons: misinformation, personal data, impersonation, spam, unauthorised document sharing, other.
- Moderation actions: dismiss, remove (soft), warn, suspend (admin), record reason.
- Badges: Active Member, Helpful Contributor, Inspection Contributor, Verified Professional (only after credential record exists).

## 2.6 Inspection Request Rules (MVP — logged)

- Essential: max 5 requests per calendar month; counter shown; server-enforced.
- Premium: unlimited with fair-use flag at >10/month for admin review (no hard block).
- Fields: property, preferred dates (1–3), full name, phone, consent checkbox (inspection consent), notes.
- Statuses: requested → confirmed / declined → completed / cancelled.
- Notifications: request received, status change, reminder 24h before confirmed date (email + in-app).

## 2.7 Advocate Coordination (MVP — enquiry only)

- Premium members submit an enquiry: property, document types available, question, preferred contact, consent.
- Admin records status: received → information requested → assigned → closed.
- Fee disclosure shown: platform coordination fee and separate advocate fees (advocates bill directly unless stated).
- `advocate_reviewed` evidence label can only be set when a review record exists with advocate, date, and scope.

## 2.8 Subscription and Entitlement Rules

- States: `pending → active → past_due → cancelled → expired`.
- Active if `current_period_end > now` and status active; 3-day grace for `past_due`, then downgrade.
- Webhooks: `subscription.activated`, `subscription.charged`, `subscription.cancelled`, `subscription.halted`, `payment.captured`, `payment.failed`, `refund.created`.
- Idempotency by event id; webhook signature verified.
- Expiry job runs hourly; on expiry: downgrade role to free, disable paid features, preserve own records.
- Manual admin grant: audited, does not silently modify Razorpay subscription.

## 2.9 Notification Catalogue

| Event | Channel | Recipients |
|---|---|---|
| Welcome / verify email | Email | User |
| Payment success / invoice | Email + in-app | User |
| Payment failed | Email + in-app | User |
| Subscription expiring in 3 days | Email + in-app | User |
| Subscription expired | Email + in-app | User |
| New matching listing (watchlist) | Email + in-app | Members |
| Auction date changed (confirmed) | Email + in-app | Followers |
| EMD/payment deadline approaching | Email + in-app | Members |
| New document available | Email + in-app | Members with access |
| Forum reply / followed thread | In-app + email digest | Members |
| Inspection status change | Email + in-app | Requesting member |
| Advocate enquiry status | Email + in-app | Premium member |
| Report outcome | In-app | Reporter |

## 2.10 Field Validation (selected)

| Field | Rule |
|---|---|
| Email | RFC-ish, normalised lowercase, unique |
| Password | Min 10 chars, check against breach list (Supabase) |
| Phone | E.164-ish Indian format, optional OTP later |
| Reserve price | Positive integer, INR, ≤ ₹100 crore |
| Carpet area | Positive decimal, ≤ 100,000 sqft |
| Auction date | Future or recent past (≤ 90 days) for completion |
| Preferred inspection dates | 1–3 dates, each ≥ tomorrow, ≤ 60 days |
| Forum post body | 10–10,000 chars, sanitised, no `<script>` |
| Contribution type | Enum only |
| GSTIN | 15-char pattern, optional |
| Property reference | Immutable, unique, system-generated |

## 2.11 States (UI)

For each list/table: loading skeleton, empty state with next action, error with retry, permission-denied state (membership CTA or access message), expired state.

---
