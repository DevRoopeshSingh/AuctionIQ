# API Specification

## 6.1 Conventions

- Base: `/api`. JSON. Auth via Supabase session cookie/Bearer.
- Errors: `400` validation, `401` unauthenticated, `403` forbidden, `404`, `409` conflict, `429` rate limit, `500`.
- Response envelope: `{ data, error: { code, message, fields? } }`.
- **Rule:** restricted fields are never included in any public/free response payload.

## 6.2 Endpoint List (selected)

| Method | Path | Auth | Role | Purpose |
|---|---|---|---|---|
| GET | `/api/properties` | optional | any | List; projection by role |
| GET | `/api/properties/[ref]` | optional | any | Detail; projection by role |
| GET | `/api/properties/[ref]/documents/[id]` | ✅ | paid | Signed URL (short-lived) |
| GET | `/api/properties/[ref]/posts` | ✅ | paid | Forum posts |
| POST | `/api/properties/[ref]/posts` | ✅ | paid | Create post |
| POST | `/api/posts/[id]/vote` | ✅ | paid | Upvote |
| POST | `/api/posts/[id]/helpful` | ✅ | paid | Mark helpful |
| POST | `/api/posts/[id]/report` | ✅ | paid | Report |
| POST | `/api/watchlist` | ✅ | paid | Add |
| DELETE | `/api/watchlist/[propertyId]` | ✅ | paid | Remove |
| POST | `/api/inspections` | ✅ | paid | Request (quota enforced) |
| GET | `/api/inspections` | ✅ | own/admin | List |
| POST | `/api/advocate-enquiries` | ✅ | premium | Enquiry |
| POST | `/api/simulations` | optional | any | Save session |
| POST | `/api/calculations/cost` | optional | any | Compute + save |
| GET | `/api/notifications` | ✅ | own | List |
| POST | `/api/notifications/[id]/read` | ✅ | own | Mark read |
| POST | `/api/checkout/subscription` | ✅ | any | Create Razorpay subscription |
| POST | `/api/webhooks/razorpay` | signature | — | Payment events |
| GET | `/api/me` | ✅ | own | Profile + entitlement |
| Admin | `/api/admin/properties` (CRUD), `/api/admin/properties/[id]/status`, `/api/admin/reports`, `/api/admin/inspections`, `/api/admin/users/[id]/subscription` | ✅ | admin | Management |

## 6.3 Payment Webhook Flow

1. Verify `X-Razorpay-Signature` with webhook secret.
2. Idempotency: store `event.id`; ignore duplicates.
3. Update `subscriptions` / `payments` / invoice in a transaction.
4. Invalidate entitlement cache; enqueue notification.
5. Return `200`; on failure log and return `500` for retry.

## 6.4 Document Access Flow

`GET /api/properties/[ref]/documents/[id]` → verify session → verify paid entitlement → verify property access → check document `is_member_accessible` → generate signed URL (5 min) → log access → return `{ url, expiresAt }`. Direct storage paths never exposed.

## 6.5 Public API Leakage Rules

- `GET /api/properties` and `/api/properties/[ref]` use explicit select lists per role.
- No `include: true` full-model serialisation.
- Tests assert restricted keys are absent (not null) for free/public.
- No property-specific contact endpoint accessible to free users.

---
