# Quest GP

Quest GP is a Motorsport Travel Companion for discovering racing events, tracking visited races, building a motorsport bucket list, and growing a personal Racing Passport.

## Stack

- Expo
- React Native
- TypeScript
- Hono
- Bun
- Prisma
- PostgreSQL on Supabase

## Setup

Install dependencies from the repository root:

```bash
bun install
```

Create the API environment file:

```bash
cp apps/api/.env.example apps/api/.env
```

Then set `DATABASE_URL` in `apps/api/.env` to the Supabase Postgres connection string.

## Start The API

From the repository root:

```bash
bun run dev:api
```

The API runs at:

```text
http://localhost:3001
```

Useful local API URLs:

```text
http://127.0.0.1:3001/
http://127.0.0.1:3001/events
http://127.0.0.1:3001/series
http://127.0.0.1:3001/tracks
```

Use `127.0.0.1` in Bruno if `localhost` resolves to IPv6 `::1`.

## Start Mobile Web Preview

Keep the API running, then start Expo web:

```bash
bun run dev:mobile:web
```

Open the Expo web URL, usually:

```text
http://localhost:8081
```

For an iPhone-like preview in the browser:

```text
F12 -> Ctrl + Shift + M -> choose an iPhone device
```

## Start Expo Go

Expo Go requires a compatible iOS/Android version. If using a physical phone, the API URL must use the computer's LAN IP, not `localhost`.

PowerShell example:

```powershell
$env:EXPO_PUBLIC_API_URL="http://192.168.1.33:3001"
bun run dev:mobile
```

Then scan the Expo QR code with Expo Go.

## Prisma

Generate the Prisma client:

```bash
bun run prisma:generate
```

Run migrations from the API workspace:

```bash
bun run --cwd apps/api prisma:migrate
```

Seed MVP sample data:

```bash
bun run --cwd apps/api seed
```

## Quality Checks

Run all checks:

```bash
bun run check
```

Individual commands:

```bash
bun run lint
bun run format:check
bun run typecheck
```

Format files:

```bash
bun run format
```
