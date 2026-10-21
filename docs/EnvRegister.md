# Environment Variable Register

This register follows [Architecture.md §4.6](./Architecture.md#46-secrets-and-environments). Values must be set separately for local, preview, staging, and production as applicable. `.env.example` contains placeholders only; never copy a real secret into that file or commit `.env*` files other than `.env.example`.

Architecture §4.6 lists the required variables but does not define owners or rotation intervals. The owner and cadence below are the M0 operating defaults; rotate immediately after suspected exposure, personnel access changes, or provider reissue.

| Variable | Purpose | Owner | Rotation / update cadence | Exposure |
|---|---|---|---|---|
| `DATABASE_URL` | Prisma PostgreSQL connection URL; separate per environment/project | Dev | Rotate the database credential at least every 90 days and immediately after exposure or credential reissue | Secret; server/CI only |
| `SUPABASE_URL` | Supabase project endpoint; separate per environment | Dev | Not a credential; update when the project or endpoint changes | Public configuration |
| `SUPABASE_ANON_KEY` | Supabase client key; separate per environment | Dev | Not treated as a secret; replace when Supabase reissues the project key or after an incident | Public/client safe; server may also read |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase privileged server-side access | Dev | Rotate at least every 90 days and immediately after exposure or access changes | Secret; server only, never `NEXT_PUBLIC_` |
| `RAZORPAY_KEY_ID` | Razorpay API key identifier | Founder + Dev | Review with each key rotation; update all environments when a key pair changes | Server configuration; no live value during M0 |
| `RAZORPAY_KEY_SECRET` | Razorpay API key secret | Founder + Dev | Rotate at least every 90 days and immediately after exposure or provider reissue | Secret; server only; no live value during M0 |
| `RAZORPAY_WEBHOOK_SECRET` | Razorpay webhook signature verification | Founder + Dev | Rotate at least every 90 days and immediately after exposure; coordinate provider endpoint update | Secret; server only; no live value during M0 |
| `RESEND_API_KEY` | Resend transactional email API access | Dev | Rotate at least every 90 days and immediately after exposure or access changes | Secret; server only; no live value during M0 |
| `NEXT_PUBLIC_APP_URL` | Canonical app URL used by browser-visible links | Dev | Update when local/staging/production domains change; no secret rotation | Public configuration |
| `CRON_SECRET` | Authorizes scheduled-job endpoints | Dev | Rotate at least every 90 days and immediately after exposure | Secret; server/hosting only |
| `SENTRY_DSN` | Optional Sentry event-ingest endpoint for the Next.js project | Dev | Not a credential; replace if the Sentry project/DSN is reissued or abused | Public ingest configuration; no live DSN during M0 |

## Provider provisioning instructions

### Supabase — M0-T3

1. Founder creates/assigns the Supabase organization and grants the Dev owner access needed to create projects.
2. Create three separate projects named `auctioniq-dev`, `auctioniq-staging`, and `auctioniq-prod`, each in `ap-south-1`.
3. Store each project's endpoint and anon key in its matching environment. Keep service-role keys server-only. Put each environment's database connection URL in its corresponding secret store; do not use production credentials in local or preview environments.
4. Record project refs, region, owners, and secret-store locations (never secret values) in the team's private operations register.

**Blocked until:** founder provisions the organization or grants access (A17).

### Vercel — M0-T4

1. Founder provisions the Vercel team and grants Dev access to create projects.
2. Create separate `auctioniq-staging` and `auctioniq-production` projects linked to the repository. Use preview deployments for pull requests; reserve the production project for `main` after production approval.
3. Add the approved staging and production domains in Vercel and complete the DNS changes Vercel displays. The domain names and DNS records are intentionally not guessed here.
4. Set `NEXT_PUBLIC_APP_URL` independently for local, preview, staging, and production. Add server secrets only to the matching Vercel environment.

**Blocked until:** founder provisions the team, repository access, and domain/DNS control (A18).

### Resend — M0-T5

1. Founder provisions the Resend account and confirms control of the sending domain.
2. In Resend, add the approved sending domain and copy the exact verification records shown by its dashboard. Add its SPF TXT and DKIM records at the domain's DNS host; add/maintain a DMARC TXT record for the domain.
3. Wait for DNS propagation, then use Resend's verification action. Send a test email only after the domain is verified.
4. Create an API key with only the permissions needed for transactional sending and store it in the relevant server-side environment. Do not put it in CI logs or client variables.

Record the actual DNS hostnames and values in the private domain register after the account is provisioned; this file contains no provider-generated records or keys.

**Blocked until:** founder provisions the account and DNS access (A19).

### Sentry — M0-T6

1. Founder provisions a Sentry organization/project for the Next.js application and grants Dev access.
2. Configure an alert rule for new/unhandled errors and a separate threshold alert for sustained elevated error volume; route both to the founder-approved operational email/on-call destination.
3. Verify routing with a test event, then record the project slug, alert-rule names, and recipient owner (not the DSN or token) in the private operations register.
4. Add the project DSN to the matching environment only after project creation. No live Sentry key or DSN is configured by this M0 change.

**Blocked until:** founder provisions the project and names the alert recipient (A20).

## Repository and CI notes

- `.env.example` is a placeholder-only inventory. Copy it to an ignored `.env` for local work and replace placeholders only when corresponding accounts are provisioned.
- GitHub Actions receives only values required for a step. The current CI skeleton validates the empty Prisma schema and builds the shell without provider secrets.
- The local branch-protection ruleset is a configuration payload only. It must be applied to the hosted repository by an authorized repository owner after GitHub repo provisioning.
