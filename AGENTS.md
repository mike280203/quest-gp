# Quest GP Codex Guide

## Product

Quest GP is a Motorsport Travel Companion. It helps motorsport fans discover events, plan race trips, track attended races, build a bucket list, maintain a motorsport resume, and grow a personal Racing Passport.

Quest GP is not a motorsport news app. Keep the product focused on experiences, tracks, events, and personal fan history.

## MVP Scope

Build only Phase 1 MVP features unless the user explicitly asks for more:

- Authentication
- User profile
- Favorite racing series
- Racing calendar
- Event details
- Bucket list
- Racing map
- Motorsport resume

Do not add these before they are requested:

- AI features
- Community features
- Affiliate integrations
- Payments
- Hotel booking
- Flight booking
- User-created events

## Stack

- Expo
- React Native
- TypeScript
- Hono
- Bun
- Prisma
- PostgreSQL
- Supabase

Architecture:

```text
Mobile App
-> Hono API
-> Prisma ORM
-> PostgreSQL on Supabase
```

## Development Rules

- Keep the MVP simple and incremental.
- Prefer clarity over cleverness.
- Keep files small and focused.
- Use TypeScript everywhere.
- Explain important architecture decisions briefly.
- Avoid unnecessary dependencies.
- Use Prisma for database access from the API.
- Keep database access out of the mobile app.
- Build through the Hono API instead of coupling screens directly to Supabase tables.
- Comment only important or non-obvious code.
- Keep documentation excellent and update docs whenever architecture, setup, API behavior, or project workflow changes.
- After completing a meaningful change, remind the user to commit the work to GitHub.

## Mentoring Style

The user wants to understand the work, not only receive code. When introducing a new pattern, library, or architecture choice:

- Explain the concept briefly.
- Name the trade-off.
- Mention a reasonable alternative when it matters.
- Summarize changed files after edits.
- Include the key learning points at the end of substantial tasks.
- Mention whether documentation was updated or whether no documentation update was needed.
- Remind the user when the completed work should be committed and pushed to GitHub.

## Mobile Preview Workflow

For mobile work, prefer running the Expo dev server and previewing through:

- Expo Go on a physical iPhone or Android device, or
- iOS Simulator on macOS, or
- Android Emulator on Windows, or
- Expo web preview when native device preview is not required.

On this Windows workspace, an actual iPhone simulator is not available locally. Use Expo Go on a real iPhone for the closest live-preview workflow.
