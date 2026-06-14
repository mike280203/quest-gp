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

Useful commands from `apps/api`:

```bash
bun run prisma:generate
bun run prisma:migrate
bun run prisma:studio
```

During development, `bun run prisma:migrate` creates and applies a migration against the configured `DATABASE_URL`.

## Environment Variables

Create `apps/api/.env` from `apps/api/.env.example` and set `DATABASE_URL` to the Supabase Postgres connection string.

Do not commit real `.env` files.

## Supabase

For Phase 1, Supabase should provide:

- PostgreSQL database hosting
- Email/password authentication

The mobile app should authenticate with Supabase Auth. The API should validate the Supabase user and map it to the local `User.authUserId` field.
