# AuctionIQ Build State

**Current milestone:** M0 — awaiting account provisioning by founder for T1, T2, T8–T10, T12

## Operating rules acknowledged

- Treat the approved documents as the specification; do not invent features or exceed the current milestone scope.
- Never return `exact_location`, `building_name`, `society_name`, documents, or sale notices in public or free-tier responses. Restricted fields must be absent, not null-masked.
- Authorise restricted reads server-side; UI hiding is not authorisation.
- The simulator is educational only; no real bids, deposits, or transactions.
- Do not present Phase 2 or Phase 3 features as live. Any such UI must be gated and visibly labelled “coming soon.”
- Do not implement items marked PENDING in `DecisionLog.md`.
- Every table touched must have an explicit RLS policy, as specified in `Schema.md` §6.1.
- Run tests locally before marking a milestone complete; report every test that passed or failed.
- At milestone completion, update this file with completed work, stubs, and remaining work, then stop without starting another milestone.

## M0 progress

M0-T7 local setup is complete: the repository is initialized on `main` with a Next.js, TypeScript, Tailwind, and model-free Prisma skeleton, PR template, CI workflow, and a main-branch ruleset payload; the ruleset is not enforceable until a hosted GitHub repository exists. M0-T11 is complete with the environment register. M0-T3 through T6 are prepared but remain blocked on founder provisioning under A17–A20: A17 Supabase organization/project access, A18 Vercel team and domain/DNS access, A19 Resend account and sending-domain DNS access, and A20 Sentry project access plus an alert recipient. No live provider keys were configured. T1, T2, T8–T10, and T12 remain with the founder as reflected in the current milestone status.

## Stubs and remaining work

- Supabase dev/staging/prod projects in `ap-south-1`, Vercel staging/production projects and domains, Resend account/domain verification, and Sentry project/alert routing still require provider access; setup instructions are in `EnvRegister.md`.
- GitHub branch protection is represented by `.github/rulesets/main.json` but has not been applied to a remote repository.
- `.env.example` contains placeholders only. No production or provider credentials are present.
- Prisma contains no models, by design. The approved source `Schema.md` still lacks the referenced §6.1 RLS policy section; no database table may be added until that specification gap is resolved.
- No application features or M1 work were started.

## Verification results

Passed:

- `pnpm install`.
- `pnpm install && pnpm build` (Next.js production build completed).
- `npx prisma validate`.
- `pnpm prisma validate`.
- `pnpm lint`.
- `pnpm typecheck`.
- CI workflow YAML parsed and required quality job/steps were present.
- `.github/rulesets/main.json` parsed as valid JSON.

Failed attempts and resolution:

- Initial sandboxed `pnpm install && pnpm build` failed because Turbopack could not spawn a subprocess (`Operation not permitted`); the requested command passed when rerun with the required process permissions.
- Initial sandboxed `npx prisma validate` failed writing Prisma's engine cache outside the workspace (`EPERM`); validation passed when rerun with the required cache access.
- Initial sandboxed `git init -b main` could not write the protected `.git` directory; repository initialization passed after the explicitly requested operation received elevated filesystem access.

No milestone beyond M0 was started.
