# Quest GP Codex Context

## Product

Quest GP is a Motorsport Travel Companion.

The goal is not to become a motorsport news app. The goal is to help motorsport fans:

- discover events
- plan trips
- track attended races
- build a motorsport bucket list
- maintain a motorsport resume
- create a personal Racing Passport

## MVP Scope

Included:

- User profiles
- Favorite racing series
- Racing calendar
- Event details
- Bucket list
- Racing map
- Motorsport resume

Excluded:

- AI features
- Community features
- Affiliate integrations
- Payments
- Hotel booking
- Flight booking

## Stack

- Expo
- React Native
- TypeScript
- Hono
- Bun
- Prisma
- PostgreSQL
- Supabase

## Architecture

```text
Mobile App
-> Hono API
-> Prisma ORM
-> PostgreSQL on Supabase
```

## Development Rules

- Keep code simple.
- Keep files small.
- Explain architectural decisions.
- Prefer readability over clever solutions.
- Follow TypeScript best practices.
- Build only MVP features unless explicitly requested.
- Never introduce unnecessary dependencies.
- Use Prisma only from the API layer.
- Keep the mobile app API-first.
- Prefer Supabase Auth for authentication and Supabase Postgres for database hosting.
- Use `AGENTS.md` as the main Codex project guide.
- Keep documentation excellent and update docs whenever architecture, setup, API behavior, or project workflow changes.
- After completing a meaningful change, remind the user to commit the work to GitHub.
