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
