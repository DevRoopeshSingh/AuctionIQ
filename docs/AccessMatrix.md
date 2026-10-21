# Access Control Matrix

## 3.1 Role Capability Summary

| Capability | Public | Free registered | Essential | Premium | Expired | Admin |
|---|---|---|---|---|---|---|
| View teaser listings | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| View exact location/building | ❌ | ❌ | ✅ | ✅ | ❌ | ✅ |
| View member documents | ❌ | ❌ | ✅ | ✅ | ❌ | ✅ |
| Contact team about a property | ❌ | ❌ | ✅ | ✅ | ❌ | ✅ |
| General support contact | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Forum read | ❌ | ❌ | ✅ | ✅ | Own posts only | ✅ |
| Forum post/reply/vote | ❌ | ❌ | ✅ | ✅ | ❌ | ✅ |
| Simulator | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Academy/quizzes | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Basic calculator | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Standard/advanced calculator | ❌ | ❌ | ✅ | ✅ | ❌ | ✅ |
| Watchlist/alerts | ❌ | ❌ | ✅ | ✅ | Read-only | ✅ |
| Inspection request | ❌ | ❌ | 5/mo | Fair-use | ❌ | Manage |
| Advocate enquiry | ❌ | ❌ | ❌ | ✅ | ❌ | ✅ |
| Risk dashboard / comparison / max-bid / exit planner | ❌ | ❌ | ❌ | Phase 2 | ❌ | ✅ |

## 3.2 Route-Level Rules

| Route | Public | Free | Essential | Premium | Expired | Admin |
|---|---|---|---|---|---|---|
| `/` `/explore` `/simulator` `/academy` `/plans` `/about` `/legal/*` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/properties/[ref]` | teaser projection | teaser | full | full | teaser | full |
| `/properties/[ref]/documents/[id]` | 403 | 403 | signed URL | signed URL | 403 | ✅ |
| `/forum/[propertyRef]` | 403 | 403 | ✅ | ✅ | own posts | ✅ |
| `/dashboard/*` | redirect login | ✅ | ✅ | ✅ | read-only own | ✅ |
| `/admin/*` | 403 | 403 | 403 | 403 | 403 | ✅ |
| `/api/properties` | teaser projection | teaser | full | full | teaser | full |

## 3.3 API Enforcement Rules

1. Every API route resolves session → role → entitlement server-side.
2. Response serialisers are **per-role projections**; restricted keys are absent, not null.
3. Object-level checks: document, forum thread, inspection, legal review bound to `user_id` or property entitlement.
4. Public endpoints never accept `property_id` to return restricted fields; the `contact` endpoint requires paid entitlement and validates property access.
5. Rate limits: auth 5/min/IP; forum 10/min/user; inspection 5/day/user; checkout 5/hour/user.
6. No restricted data in sitemap, JSON-LD, OG tags, `robots`-indexed pages, or error messages.
7. Signed URLs: 5-minute expiry, single-use where practical, no directory listing.
8. Admin routes require role + audit log on every write.

## 3.4 Database-Level Enforcement

- Row-level security on `property_documents`, `forum_posts`, `inspections`, `legal_reviews`, `drt_records`, `payments`, `notifications`.
- Service role only for admin/server jobs; never exposed to client.
- Sensitive columns (`exact_location`, `building_name`, `sale_notice_path`) never selected by public projection functions.

---
