# AuctionIQ

The M0 repository skeleton for AuctionIQ. No application features or Prisma models are implemented yet.

## Local setup

```sh
pnpm install
cp .env.example .env
pnpm dev
```

The values in `.env.example` are placeholders. Provision provider accounts and replace them in local or hosted secret stores before connecting services.

## Quality checks

```sh
pnpm lint
pnpm typecheck
pnpm prisma validate
pnpm build
```

See `docs/BuildState.md` for milestone status and `docs/EnvRegister.md` for environment ownership and provider setup steps.

## Local RLS testing

The RLS integration tests use PostgreSQL roles and a local `auth.uid()` shim. No Supabase account is needed.

```sh
docker run --rm -d --name auctioniq-rls \
  -e POSTGRES_PASSWORD=localdev \
  -e POSTGRES_DB=auctioniq_test \
  -p 5433:5432 postgres:16

export RLS_TEST_DATABASE_URL=postgresql://postgres:localdev@localhost:5433/auctioniq_test
psql "$RLS_TEST_DATABASE_URL" -v ON_ERROR_STOP=1 -f scripts/local-rls-bootstrap.sql
DATABASE_URL="$RLS_TEST_DATABASE_URL" pnpm prisma migrate deploy
RLS_TEST_DATABASE_URL="$RLS_TEST_DATABASE_URL" pnpm test:coverage
docker stop auctioniq-rls
```

For a local Postgres installation, set `RLS_TEST_DATABASE_URL` in `.env.local` to that database and run the bootstrap, migration, and test commands above with the corresponding `DATABASE_URL`.
