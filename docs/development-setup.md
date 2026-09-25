# Quest GP Development Setup

## API

The API lives in `apps/api` and uses:

- Bun for the local API runtime
- pnpm for dependency management and workspace scripts
- Hono for HTTP routing
- Prisma for database access
- `@prisma/adapter-pg` as the Prisma PostgreSQL driver adapter
- PostgreSQL hosted on Supabase
- Zod for request validation
- Pino for structured API logging

Start the local API from the repository root:

```bash
corepack pnpm dev:api
```

The API runs at `http://localhost:3001`.

The `dev:api` script requires Bun on `PATH`. If Bun is unavailable in the current shell, a pinned temporary runtime can be used from the repository root:

```powershell
corepack pnpm -C apps/api dlx bun@1.4.2 --watch index.ts
```

This downloads Bun into the pnpm tool cache and does not install it globally. Keep the terminal open while using the API.

API logs are printed with Pino. During development, logs are pretty-printed in PowerShell and include request method, path, status, and duration.

## Mobile

The Expo starter has been trimmed down to the Quest GP MVP foundation. The mobile app keeps:

- Expo SDK 57 with its matching React Native and Expo package versions
- Expo Router screens in `apps/mobile/src/app`
- shared themed primitives in `apps/mobile/src/components`
- API client code in `apps/mobile/src/lib`
- theme constants and hooks in `apps/mobile/src/constants` and `apps/mobile/src/hooks`

Start the Expo app from the repository root:

```bash
corepack pnpm dev:mobile
```

Start the Expo web preview:

```bash
corepack pnpm dev:mobile:web
```

For Expo Go on a physical iPhone, set `EXPO_PUBLIC_API_URL` to the LAN URL of the API server before starting Expo. `localhost` points to the phone itself, not to this development machine.

Example:

```bash
$env:EXPO_PUBLIC_API_URL="http://192.168.178.20:3001"
corepack pnpm dev:mobile
```

The API must be running at the same time:

```bash
corepack pnpm dev:api
```

## Prisma

Prisma is configured inside `apps/api`.

Important files:

- `apps/api/prisma/schema.prisma`
- `apps/api/prisma.config.ts`
- `apps/api/.env.example`
- `apps/api/src/lib/prisma.ts`

The generated Prisma client is written to `apps/api/src/generated/prisma` and is ignored by Git.

Prisma 7 uses a driver adapter. Quest GP uses `@prisma/adapter-pg` with the `DATABASE_URL` connection string from the API environment.

All model primary keys use PostgreSQL UUIDv7 values instead of auto-incrementing integers. This keeps public API IDs non-sequential, improves index locality compared with random UUIDv4 values, and aligns the local `User.authUserId` field with Supabase Auth user IDs.

PostgreSQL 17 does not include a native UUIDv7 generator, so the API migration history defines `public.uuid_v7()` and uses it as the database default for primary IDs.

Useful commands from the repository root:

```bash
corepack pnpm -C apps/api prisma:generate
corepack pnpm -C apps/api prisma:migrate
corepack pnpm -C apps/api prisma:studio
corepack pnpm -C apps/api seed
```

During development, `corepack pnpm -C apps/api prisma:migrate` creates and applies a migration against the configured `DATABASE_URL`.

`corepack pnpm -C apps/api seed` inserts MVP sample data for racing series, tracks, and events. The seed script is idempotent and can be run multiple times.

## Environment Variables

Create `apps/api/.env` from `apps/api/.env.example` and set `DATABASE_URL` to the Supabase Postgres connection string.

For authentication, also set `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY` in the API environment.

Create `apps/mobile/.env.local` from `apps/mobile/.env.example` and set the public Supabase project URL and publishable key. Expo only exposes variables prefixed with `EXPO_PUBLIC_` to application code.

Do not commit real `.env` files.

See `docs/auth-v1.md` for the Phase 1 authentication and persistent-session strategy.

## Linting and Formatting

Quest GP uses Oxlint and Oxfmt from the repository root.

Useful commands:

```bash
corepack pnpm lint
corepack pnpm lint:fix
corepack pnpm format
corepack pnpm format:check
corepack pnpm typecheck
corepack pnpm check
```

Generated Prisma client files and migration SQL are ignored by the lint and format tools.

## Continuous Integration

GitHub Actions runs the quality checks on pushes to `main` and on pull requests.

The workflow lives in `.github/workflows/ci.yml` and runs:

- `corepack pnpm install --frozen-lockfile`
- `corepack pnpm prisma:generate`
- `corepack pnpm lint`
- `corepack pnpm format:check`
- `corepack pnpm typecheck`

CI uses a dummy `DATABASE_URL` because Prisma client generation only needs the schema and does not connect to the database.

The workflow opts JavaScript actions into Node.js 24 with `FORCE_JAVASCRIPT_ACTIONS_TO_NODE24` and uses pnpm through Corepack.

## Dependency Maintenance

Use pnpm from the repository root:

```bash
corepack pnpm audit
corepack pnpm audit:high
corepack pnpm deps:outdated
corepack pnpm deps:update
corepack pnpm deps:update:interactive
```

Use `corepack pnpm deps:update:latest` only when intentionally accepting possible major-version upgrades. Always run `corepack pnpm check` after dependency updates.

The root `pnpm-workspace.yaml` may use `overrides` for selected transitive security patches. Avoid broad dependency overrides for Expo packages unless the Expo compatibility matrix is checked first.

## Supabase

For Phase 1, Supabase should provide:

- PostgreSQL database hosting
- Email/password authentication

The mobile app should authenticate with Supabase Auth. The API should validate the Supabase user and map it to the local `User.authUserId` field.

## Public API Routes

The first public MVP routes are:

- `GET /series`
- `GET /series/:id`
- `GET /tracks`
- `GET /tracks/:id`
- `GET /events`
- `GET /events/:id`
- `GET /countries`

Event list filters:

- `seriesId`
- `country`
- `from`
- `to`

`GET /countries` provides the distinct track countries used to populate the Racing Calendar country filter.
