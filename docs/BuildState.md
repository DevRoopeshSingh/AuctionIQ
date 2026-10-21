# AuctionIQ Build State

**Current milestone:** M1 — Foundations (partially accepted 2026-10-21; provider work blocked)

## Operating rules

- Approved documents are the specification; do not invent features or exceed the current milestone scope.
- Never return `exact_location`, `building_name`, `society_name`, documents, or sale notices in public or free-tier responses. Restricted fields must be absent, not null-masked.
- Authorise restricted reads server-side; UI hiding is not authorisation.
- The simulator is educational only; no real bids, deposits, or transactions.
- Do not present Phase 2 or Phase 3 features as live. Any such UI must be gated and visibly labelled “coming soon.”
- Do not implement items marked PENDING in `DecisionLog.md`.
- Every table touched must have explicit RLS enforcement as specified in `Schema.md` §6.1; default deny remains in effect.
- Run tests locally before marking a milestone complete; report exact passed and failed test counts.
- Do not start M2 before M1 verification and staging acceptance.

## M0 status

The repository skeleton, environment register, CI skeleton, and initial documentation work are present. Provider provisioning remains founder-owned: Supabase (A17), Vercel/DNS (A18), Resend/DNS (A19), and Sentry/alert recipient (A20). No live provider credentials are configured. Branch protection enforcement is not confirmed.

## M1 implementation status

**Implemented:** M1-T1 App Router/TypeScript/Tailwind base; M1-T2 Prisma models and the initial PostgreSQL migration for all 31 schema tables and 15 enums; M1-T5 pure entitlement resolver; M1-T6 pure server guard functions; M1-T7 design tokens and requested UI primitives; M1-T8 public shell and legal placeholders; M1-T9 RLS, grants, and policy definitions for the 31-table matrix; M1-T11 SQL audit-log helper. A21 keeps the production build on Webpack. A22/A23 record API projection and the removal of public property views from M1 scope.

**M1 stubs and limits:** `/api/properties` currently returns an empty, allowlisted response; `/api/properties/[ref]` returns 404 until property storage is connected. These are M1 stubs, not live property features. Auth guards are pure functions with unit tests; they are not wired to a live Supabase session because M1-T3 remains provider-blocked. The A25/A26 table-driven tests cover every required SELECT and client-write cell across the five specified SQL roles, admin-only supplemental reads, and all six service-role grant probes. The complete observed grid is in [RLSProbeReport.md](RLSProbeReport.md).

**T2 schema accounting:** `Schema.md` §5.1 contains exactly 20 `notification_type` values. No approved document or exact line specifies a 21st value; no 21st value was added. The Prisma diff generated 31 tables, 294 columns, and 53 indexes/unique indexes, with no missing or extra table/column entries versus §5.2. The migration contains the `learning_progress` exactly-one-target check. Prisma 7.8.0 does not support `@@check`; the check is therefore present in the reviewed/applied migration SQL but not emitted by `migrate diff --from-empty --to-schema prisma/schema.prisma`. This keeps the T2 diff-verification item open.

## Verification results — 2026-10-21

Passed:

- `pnpm lint` — clean.
- `pnpm typecheck` — clean.
- `pnpm prisma validate` — schema valid.
- `pnpm prisma migrate status` against local Postgres — database schema up to date; one migration found.
- `pnpm prisma migrate diff --from-empty --to-schema prisma/schema.prisma --script` — 31 tables; 294/294 columns; 53/53 §5.2 index/unique declarations; `notification_type` has exactly the 20 canonical values. The migration contains the one §5.2 check constraint.
- Local Postgres Vitest run with `RLS_TEST_DATABASE_URL` against a fresh isolated cluster — **6 test files passed, 38 tests passed, 0 failed** on the latest run. The harness uses `SET ROLE` and `request.jwt.claim.sub` with an `auth.uid()` shim, accepted for M1 policy tests. It includes policy/grant inventory, anon/free/paid/expired/admin SELECT probes, direct base-table permission denials, targeted paid/admin property visibility, representative service-role writes, required paid-active inserts, profile/notification column restrictions, forum edit-window behavior, simulator/quiz session-ID behavior, and database CHECK probes.
- `pnpm run test:coverage` with local Postgres — prior run **38 passed, 0 failed**; `lib/auth`, `lib/entitlements`, and `lib/projections` each have 100% statements, branches, functions, and lines.
- Final A25/A26 matrix — **155/155 SELECT cells, 125/125 scoped client-write cells, and 6/6 service-role grant probes passed**. SELECT outcomes: 77 allow, 40 deny_perm, 38 empty_result, 0 deny_rls, 0 n/a, 0 FAIL. Client-write outcomes: 62 allow, 24 deny_perm, 16 deny_rls, 23 empty_result, 0 n/a, 0 FAIL. Service probes: 2 allow, 4 deny_perm. No failed cells.
- Final `pnpm run test:coverage` after A25/A26 — **7 test files passed, 40 tests passed, 0 failed**. `lib/auth`, `lib/entitlements`, and `lib/projections` each have 100% statements, branches, functions, and lines.
- Final post-scaffolding `pnpm test:coverage` with `RLS_TEST_DATABASE_URL` set — **8 test files passed, 2 test files skipped; 41 tests passed, 4 tests skipped, 0 failed**. Coverage remains 100% on `lib/auth`, `lib/entitlements`, and `lib/projections`. The only skips are `lib/__tests__/auth.test.ts` (2, A17 pending), `lib/__tests__/profile-sync.test.ts` (1, A17 pending), and `tests/sentry-scaffold.test.ts` (1, A20 pending real DSN verification).
- **Baseline last refreshed: 2026-10-21; source: `pnpm test:coverage` with `RLS_TEST_DATABASE_URL` set.** The full local Postgres RLS suites executed in this run; no local DB integration tests were skipped.
- **Local verification reproducible:** the Docker Postgres command and bootstrap in README apply the committed Prisma migration and run the RLS matrix. This run used the existing local PostgreSQL 18.3 instance because Docker is unavailable in this environment.
- Leak checks L1, L1b, L5, and L6 passed. L1/L1b assert restricted-key absence; L5/L6 scan generated app HTML and inspect sitemap, robots, metadata, Open Graph, and any JSON-LD blocks.
- `pnpm build` — clean using the A21 Webpack configuration.
- `pg_constraint` query — found `learning_progress_exactly_one_target_check` with definition `CHECK (((article_id IS NOT NULL) <> (quiz_id IS NOT NULL)))`. The test confirms both-null and both-set inserts fail with PostgreSQL SQLSTATE `23514`; article-only and quiz-only inserts succeed. The committed initial migration contains the raw SQL check.
- Schema §5.2 / migration special constructs — one CHECK constraint is specified and present. No partial indexes or triggers are specified in §5.2. The listed indexes and unique constraints are ordinary indexes represented in the migration.
- `pnpm lint` — clean; `pnpm typecheck` — exit 0 after correcting the service-role test identity type; `pnpm prisma validate` — exit 0.
- `notification_type` comparison — §5.1 matches the user’s 20-value list exactly.

Failed attempts, subsequently corrected or documented:

- Leak tests were first run against the deliberate pass-through implementation: **1 file, 3 tests failed** (projection, L1, L1b); after replacing it with an allowlist, the final suite passes.
- Initial RLS test-harness runs failed while recovering transactions after expected permission errors: first **3 tests failed**, then **2 tests failed**. Savepoint handling was corrected; the final local suite passes.
- First `pnpm build` stopped during prerender with `ENOSPC` (no disk space). Generated `.next/cache` was cleared and the retry passed.
- `pnpm test --coverage` is parsed as an unsupported pnpm option in this environment. The equivalent `pnpm run test --coverage` and the `pnpm test:coverage` script are available.
- The requested Prisma flag `--to-schema-datamodel` is removed in Prisma 7.8.0. The supported equivalent `--to-schema` generated the counts reported above.
- An attempted `@@check` annotation failed `pnpm prisma validate` with P1012 (“Attribute not known: @check”) in Prisma 7.8.0; the unsupported annotation was removed. The SQL check remains in the migration.
- During pre-provisioning scaffolding verification, the initial sandboxed coverage run could not connect to local Postgres (`EPERM`); rerunning with authorized local database access passed **41 tests, 4 skipped, 0 failed**.

## Remaining M1 acceptance and blockers

- M1-T9 local verification is complete per A25/A26. Supabase signed-JWT behavior remains untested; local tests use actual SQL roles and the `auth.uid()` claim shim until A17 provisioning.
- Prisma 7.8.0 does not emit the `learning_progress` CHECK in datamodel diff. The check is present in the committed migration and is now verified in local `pg_constraint` and by negative/positive database insert tests; the tooling diff limitation remains documented.
- Wire guards into live authenticated routes after Supabase Auth is provisioned.
- M1-T3 Supabase Auth and M1-T4 profile sync remain blocked on A17.
- M1-T10 staging deploy remains blocked on Vercel staging (A18).
- M1-T12 Sentry integration remains blocked on A20. Resend provisioning remains A19.
- Staging deployment is not live or accepted.

**M1 PARTIAL ACCEPTED — T2, T9, T5, T6, T11 accepted on 2026-10-21**

**T3, T4, T10, T12 NOT started — blocked on A17–A20**

**M1 not fully closed until T3/T4/T10/T12 pass their gates after provisioning.**

**RLS matrix: COMPLETE per A25/A26.** Final local outcome: 155/155 SELECT cells, 125/125 client-write cells, and 6/6 service-role grant probes passed; zero failing cells. The report lists each role outcome and distinguishes SQL permission errors, RLS policy violations, and empty results. Historical failed attempts corrected in this pass: initial SELECT-matrix admin identity setup; initial write-matrix expected outcomes for forum update/delete and watchlist deletion; and a concurrent typecheck/build race on `.next/types`. Final matrix and sequential verification pass.

Provider-owned work remains: T3/T4 require Supabase A17; T10 requires Vercel A18; T12 requires Sentry A20. Resend provisioning remains A19. Staging is not live or accepted.

No M2 work has started.

## Scaffolding (pre-provisioning)

Prepared scaffolding only; none of these items is claimed as accepted or passing provider integration:

- **T3 / A17:** typed Supabase configuration/context helpers for server and browser contexts, using `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_ANON_KEY`, and server-only `SUPABASE_SERVICE_ROLE_KEY`; no Supabase SDK client is instantiated. Auth client interface and signup/login/reset page skeletons call methods that throw `NOT_PROVISIONED`. Interface contract tests: 2 skipped, reason “A17 pending.” The provider-gated `lib/auth/client.ts` scaffold is excluded from the accepted auth-guard coverage denominator until those tests can run after provisioning.
- **T4 / A17:** separate, unapplied SQL migration for the `auth.users` to `profiles` trigger, explicitly marked “applied after A17 provisioning.” The `pg_trigger` verification test is skipped (1), reason “A17 pending.”
- **T10 / A18:** CI staging-deploy job only for `main`, guarded by `VERCEL_STAGING_*` secrets. Manual `workflow_dispatch` includes a dry-run default. The job comments mark the A18 dependency; no production secrets are referenced and no deployment was run.
- **T12 / A20:** Sentry reporting adapter and error-boundary hook read `NEXT_PUBLIC_SENTRY_DSN` and server-only `SENTRY_AUTH_TOKEN`; the SDK is not initialized until provisioned/configured. The no-DSN no-op test passes; the local-adapter capture test is skipped (1) with reason “A20 pending real DSN verification.”

Scaffolding still requires real provider verification after approval/provisioning. T3/T4/T10/T12 remain **blocked — A17/A18/A20**; provider implementations are not started or accepted. Acceptance evidence for the already accepted work remains [RLSProbeReport.md](RLSProbeReport.md).
