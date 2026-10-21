# Test Plan and Acceptance Criteria

## 8.1 Functional Tests (per feature)

Simulator (budget enforcement, outcomes, report), Academy (progress, quiz scoring), teaser (projection), checkout (success/failure), forum (post/reply/vote/helpful/report), calculator (known/unknown handling), watchlist alerts, inspection quota, advocate enquiry, dashboard, notifications.

## 8.2 Permission and Leak Tests (must pass)

| # | Test | Expected |
|---|---|---|
| L1 | Free user GET `/api/properties/[ref]` | Restricted keys absent |
| L2 | Free user direct document URL | 403 |
| L3 | Free user forum route | 403 |
| L4 | Expired member document access | 403 |
| L5 | Public page source / JSON-LD / sitemap | No restricted data |
| L6 | Cached/OG metadata | No restricted data |
| L7 | IDOR: another user’s inspection/report | 403 |
| L8 | Admin route as member | 403 |
| L9 | Contact endpoint with property_id as free user | 403 |
| L10 | Signed URL after expiry | 403 |

## 8.3 Payments and Subscription Tests

- Successful mandate → tier active; invoice with GST.
- Failed payment → no entitlement; retry path.
- Cancellation at period end → access until end; then expired.
- Webhook replay idempotent.
- Manual admin grant audited; revoke restores.
- Refund recorded; access adjusted per policy.
- Expiry job downgrades correctly and preserves own records.

## 8.4 Admin Tests

Listing CRUD; status transitions and history; publish validation; moderation actions + audit; inspection status; advocate enquiry; subscription view; audit log writes.

## 8.5 Non-Functional Tests

Mobile at 360/390/768/1024/1440; Chrome/Safari/Firefox/Edge current; Lighthouse ≥ 85 perf/SEO on public pages; accessibility audit; load test teaser list; security headers; dependency audit; backup restore drill.

## 8.6 Definition of Done (each feature)

Coded · unit + integration tests · permission test where relevant · staging demo · documentation updated · accessibility checked · no restricted data leak · acceptance criteria met · approved by you.

## 8.7 Launch Acceptance (from spec §18)

All 15 criteria must pass, including free simulator access, teaser-only public view, no restricted data via URL/API, correct tier unlock, expiry handling, forum participation, moderation, consistent calculator, admin listing lifecycle, private documents, verification indicators, responsive layouts, tested privacy/security/backup, documentation + credentials delivered, no mock presented as live.

---
