# Quest GP Development Setup

## API

The API lives in `apps/api` and uses:

- Bun for runtime and scripts
- Hono for HTTP routing
- Prisma for database access
- `@prisma/adapter-pg` as the Prisma PostgreSQL driver adapter
- PostgreSQL hosted on Supabase

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

Useful commands from `apps/api`:

```bash
bun run prisma:generate
bun run prisma:migrate
bun run prisma:studio
bun run seed
```

During development, `bun run prisma:migrate` creates and applies a migration against the configured `DATABASE_URL`.

`bun run seed` inserts MVP sample data for racing series, tracks, and events. The seed script is idempotent and can be run multiple times.

## Environment Variables

Create `apps/api/.env` from `apps/api/.env.example` and set `DATABASE_URL` to the Supabase Postgres connection string.

Do not commit real `.env` files.

## Linting and Formatting

Quest GP uses Oxlint and Oxfmt from the repository root.

Useful commands:

```bash
bun run lint
bun run lint:fix
bun run format
bun run format:check
bun run typecheck
bun run check
```

Generated Prisma client files and migration SQL are ignored by the lint and format tools.

## Continuous Integration

GitHub Actions runs the quality checks on pushes to `main` and on pull requests.

The workflow lives in `.github/workflows/ci.yml` and runs:

- `bun install --frozen-lockfile`
- `bun run prisma:generate`
- `bun run lint`
- `bun run format:check`
- `bun run typecheck`

CI uses a dummy `DATABASE_URL` because Prisma client generation only needs the schema and does not connect to the database.

The workflow opts JavaScript actions into Node.js 24 with `FORCE_JAVASCRIPT_ACTIONS_TO_NODE24` and pins Bun to the local development version.

## Supabase

For Phase 1, Supabase should provide:

- PostgreSQL database hosting
- Email/password authentication

The mobile app should authenticate with Supabase Auth. The API should validate the Supabase user and map it to the local `User.authUserId` field.
