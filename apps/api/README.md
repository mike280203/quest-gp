# Quest GP API

Hono REST API running on Bun, with Prisma and PostgreSQL hosted on Supabase.

Run from the repository root:

```powershell
corepack pnpm install
corepack pnpm prisma:generate
corepack pnpm dev:api
```

Configure `apps/api/.env` using `.env.example`. Bun must be available on `PATH`; see [development setup](../../docs/development-setup.md) for the temporary runtime alternative.

The API listens on `http://localhost:3001`. Public routes cover series, tracks, events and countries. Authenticated routes are still planned.

See [API v1](../../docs/api-v1.md), [auth design](../../docs/auth-v1.md) and the [Phase 1 checklist](../../docs/phase-1-mvp-checklist.md).
