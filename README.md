# Quest GP

Quest GP is a Motorsport Travel Companion for discovering racing events, tracking visited races, building a motorsport bucket list, and growing a personal Racing Passport.

## Stack

- Expo
- React Native
- TypeScript
- Hono
- Bun API runtime
- pnpm package manager
- Prisma
- PostgreSQL on Supabase

## Setup

Install dependencies from the repository root:

```bash
corepack enable
corepack pnpm install
```

Create the API environment file:

```bash
cp apps/api/.env.example apps/api/.env
```

Then set `DATABASE_URL` in `apps/api/.env` to the Supabase Postgres connection string.

## Start The API

From the repository root:

```bash
corepack pnpm dev:api
```

The API runs at:

```text
http://localhost:3001
```

The API prints a startup banner and request logs in the terminal.

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
corepack pnpm dev:mobile:web
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
corepack pnpm dev:mobile
```

Then scan the Expo QR code with Expo Go.

## Prisma

Generate the Prisma client:

```bash
corepack pnpm prisma:generate
```

Run migrations from the API workspace:

```bash
corepack pnpm -C apps/api prisma:migrate
```

Seed MVP sample data:

```bash
corepack pnpm -C apps/api seed
```

## Quality Checks

Run all checks:

```bash
corepack pnpm check
```

Individual commands:

```bash
corepack pnpm lint
corepack pnpm format:check
corepack pnpm typecheck
```

Format files:

```bash
corepack pnpm format
```

## Dependency Checks

Audit installed dependencies:

```bash
corepack pnpm audit
```

Audit only high and critical vulnerabilities:

```bash
corepack pnpm audit:high
```

Show outdated dependencies across workspaces:

```bash
corepack pnpm deps:outdated
```

Update dependencies within the existing version ranges:

```bash
corepack pnpm deps:update
```

Update dependencies to the latest versions, including possible major updates:

```bash
corepack pnpm deps:update:latest
```

For safer manual updates:

```bash
corepack pnpm deps:update:interactive
```

After dependency updates, run:

```bash
corepack pnpm check
```

Notes:

- The project uses pnpm workspace `overrides` for selected transitive security patches.
- Avoid broad `deps:update:latest` runs without reviewing Expo and React Native compatibility.
