# M1-T9 local RLS probe report — 2026-10-21

## Scope and execution

Executed against isolated local PostgreSQL 18.3 with the committed M1 migration. Tests set actual SQL roles (`anon`, `authenticated`, `service_role`) and JWT claim settings; the local harness uses an `auth.uid()` shim rather than signed Supabase JWTs. SELECT fixture rows cover every table. Client write probes use the 15 A26 tables and all five roles. Every cell below is observed output, compared to the expected PostgreSQL outcome.

Outcome counts: SELECT **155** cells — `77` allow, `40` deny_perm, `0` deny_rls, `38` empty_result, `0` n/a, `0` FAIL. Client writes **125** cells — `62` allow, `24` deny_perm, `16` deny_rls, `23` empty_result, `0` n/a, `0` FAIL. The six separate service-role grant probes were `2` allow and `4` deny_perm, with no other outcomes. `deny_perm` is SQLSTATE 42501 with permission-denied text; `deny_rls` is SQLSTATE 42501 with RLS-policy violation text; `empty_result` is SQLSTATE 00000 and zero affected/returned rows.

No `n/a` cells occur in the displayed matrix because it contains only A26's required operations on the 15 enumerated client-write tables. Operations outside that scope are omitted as instructed (their reason is “no client write policy”).

## SELECT matrix

Role columns are ordered anon, free, paid_active, paid_expired, service_role.

| table | anon | free | paid_active | paid_expired | service_role |
|---|---|---|---|---|---|
| profiles | deny_perm | allow | allow | allow | allow |
| subscriptions | deny_perm | allow | allow | allow | allow |
| payments | deny_perm | allow | allow | allow | allow |
| refunds | deny_perm | allow | allow | allow | allow |
| invoices | deny_perm | allow | allow | allow | allow |
| webhook_events | deny_perm | deny_perm | deny_perm | deny_perm | allow |
| properties | deny_perm | deny_perm | deny_perm | deny_perm | allow |
| property_photos | deny_perm | deny_perm | deny_perm | deny_perm | allow |
| property_documents | deny_perm | deny_perm | deny_perm | deny_perm | allow |
| property_status_history | deny_perm | empty_result | empty_result | empty_result | allow |
| property_risk_indicators | deny_perm | empty_result | allow | empty_result | allow |
| property_enquiries | deny_perm | empty_result | allow | empty_result | allow |
| property_enquiry_messages | deny_perm | empty_result | allow | empty_result | allow |
| forum_posts | deny_perm | empty_result | allow | empty_result | allow |
| forum_votes | deny_perm | empty_result | allow | empty_result | allow |
| forum_follows | deny_perm | empty_result | allow | empty_result | allow |
| forum_reports | deny_perm | empty_result | allow | empty_result | allow |
| watchlists | deny_perm | empty_result | allow | empty_result | allow |
| inspections | deny_perm | empty_result | allow | empty_result | allow |
| advocate_enquiries | deny_perm | empty_result | allow | empty_result | allow |
| notifications | deny_perm | empty_result | allow | empty_result | allow |
| simulation_sessions | deny_perm | empty_result | allow | empty_result | allow |
| cost_calculations | deny_perm | empty_result | allow | empty_result | allow |
| articles | allow | allow | allow | allow | allow |
| quizzes | allow | allow | allow | allow | allow |
| quiz_questions | allow | allow | allow | allow | allow |
| quiz_attempts | deny_perm | empty_result | allow | empty_result | allow |
| badges | allow | allow | allow | allow | allow |
| user_badges | deny_perm | empty_result | allow | empty_result | allow |
| learning_progress | deny_perm | empty_result | allow | empty_result | allow |
| audit_logs | deny_perm | empty_result | empty_result | empty_result | deny_perm |

Authenticated admin supplemental read probes: `property_status_history` = allow; `audit_logs` = allow. Admin is not one of the five A26 matrix roles.

## Client write matrix

Role columns use the same order as above. Each operation row has all five outcomes. `deny_perm` means grant-level denial; `deny_rls` means an INSERT passed SQL privileges but failed its row policy; updates/deletes filtered by RLS produce `empty_result`.

| table | operation | anon | free | paid_active | paid_expired | service_role |
|---|---|---|---|---|---|---|
| profiles | UPDATE | deny_perm | allow | allow | allow | allow |
| forum_posts | INSERT | deny_perm | deny_rls | allow | deny_rls | allow |
| forum_posts | UPDATE | deny_perm | empty_result | allow | empty_result | allow |
| forum_posts | DELETE | deny_perm | empty_result | empty_result | empty_result | allow |
| forum_votes | INSERT | deny_perm | deny_rls | allow | deny_rls | allow |
| forum_votes | DELETE | deny_perm | empty_result | allow | empty_result | allow |
| forum_follows | INSERT | deny_perm | allow | allow | allow | allow |
| forum_follows | DELETE | deny_perm | empty_result | allow | empty_result | allow |
| forum_reports | INSERT | deny_perm | deny_rls | allow | deny_rls | allow |
| watchlists | INSERT | deny_perm | deny_rls | allow | deny_rls | allow |
| watchlists | DELETE | deny_perm | empty_result | allow | empty_result | allow |
| inspections | INSERT | deny_perm | deny_rls | allow | deny_rls | allow |
| advocate_enquiries | INSERT | deny_perm | deny_rls | allow | deny_rls | allow |
| property_enquiries | INSERT | deny_perm | deny_rls | allow | deny_rls | allow |
| property_enquiry_messages | INSERT | deny_perm | deny_rls | allow | deny_rls | allow |
| simulation_sessions | INSERT | allow | allow | allow | allow | allow |
| simulation_sessions | UPDATE | deny_perm | empty_result | allow | empty_result | allow |
| simulation_sessions | DELETE | deny_perm | empty_result | allow | empty_result | allow |
| cost_calculations | INSERT | deny_perm | allow | allow | allow | allow |
| cost_calculations | UPDATE | deny_perm | empty_result | allow | empty_result | allow |
| cost_calculations | DELETE | deny_perm | empty_result | allow | empty_result | allow |
| quiz_attempts | INSERT | allow | allow | allow | allow | allow |
| learning_progress | INSERT | deny_perm | allow | allow | allow | allow |
| learning_progress | UPDATE | deny_perm | empty_result | allow | empty_result | allow |
| notifications | UPDATE | deny_perm | empty_result | allow | empty_result | deny_perm |

## Service-role grant probes

| Table | Operation | Expected | Observed | SQLSTATE |
|---|---|---|---|---|
| audit_logs | INSERT | allow | allow | 00000 |
| audit_logs | UPDATE | deny_perm | deny_perm | 42501 |
| audit_logs | DELETE | deny_perm | deny_perm | 42501 |
| notifications | INSERT | allow | allow | 00000 |
| notifications | UPDATE | deny_perm | deny_perm | 42501 |
| notifications | DELETE | deny_perm | deny_perm | 42501 |

The six probes run in `tests/rls.integration.test.ts`; the migration revokes audit SELECT/UPDATE/DELETE and notification UPDATE/DELETE from `service_role`, then grants the permitted INSERT operations.

## CHECK constraint evidence (unchanged)

The committed migration contains `learning_progress_exactly_one_target_check` with `CHECK ((article_id IS NOT NULL) <> (quiz_id IS NOT NULL))`. `pg_constraint` returned that named constraint. Both-null and both-set inserts fail at the database with SQLSTATE 23514; article-only and quiz-only succeed. The accepted Prisma 7.8 diff limitation remains; this prompt did not reopen or change the CHECK.

## Other verification

- `pnpm run test:coverage` — **7 test files passed, 40 tests passed, 0 failed**. Coverage: `lib/auth`, `lib/entitlements`, `lib/projections` each **100% statements, branches, functions, and lines**.
- `pnpm lint` — passed.
- `pnpm typecheck` — passed after build completed. A concurrent typecheck/build attempt initially failed because Next generated `.next/types` files were being replaced; sequential rerun passed.
- `pnpm build` — passed with Webpack (A21).
- `pnpm prisma:validate` — passed.
- L1 and L1b — passed; nested `Object.keys` assertions confirm restricted keys are absent from anon and free `/api/properties` responses.
- L5 and L6 — passed; scan built `.next/server/app` HTML, sitemap, robots, metadata, JSON-LD, Open Graph, and meta tags.

## Result

All 280 A26 SELECT/client-write cells and all six service-role grant probes passed. No failed cells remain. No M2 work was started.
