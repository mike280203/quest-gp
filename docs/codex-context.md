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
-> Route / Resolver
-> Service
-> Repository
-> Prisma ORM
-> PostgreSQL on Supabase
```

## API Architecture Direction

Public read routes may stay simple while they are small. New authenticated and user-owned MVP features should use this structure:

```text
Route / Resolver
-> Service
-> Repository
-> Prisma
```

- Route: handles HTTP, auth context, validation, and response format.
- Resolver: future GraphQL equivalent of a route.
- Service: owns business rules and feature behavior.
- Repository: owns database reads and writes through Prisma.
- Prisma: remains the only database access layer.

REST remains the MVP API surface. GraphQL may be added later as an additional `/graphql` interface when screens need composed data, especially for the Home Dashboard or Racing Passport. Services and repositories should be reusable from both REST routes and future GraphQL resolvers.

## Mobile Form Strategy

Use React Hook Form for non-trivial mobile forms such as login, register, profile editing, event filters, bucket-list notes, and visited-event notes. Prefer schema-based validation, ideally with Zod, so user feedback is fast in the app while the API still performs the authoritative validation.

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
- Keep REST first for MVP, but make API business logic GraphQL-ready by using services and repositories.
- Use React Hook Form for mobile forms once auth/profile/filter flows are implemented.
- Prefer Supabase Auth for authentication and Supabase Postgres for database hosting.
- Use `AGENTS.md` as the main Codex project guide.
- Keep documentation excellent and update docs whenever architecture, setup, API behavior, or project workflow changes.
- After completing a meaningful change, remind the user to commit the work to GitHub.
- Use `docs/phase-1-mvp-checklist.md` as the step-by-step working checklist for Phase 1.
