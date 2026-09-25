# Maintenance 2026-09-25

## Dependency scope

Updated packages within the existing supported version lines, including Prisma 7.10.0, Supabase JS 2.117.1, Hono 4.13.9, Zod 4.6.5 and Expo 57.0.25. React and native packages remain aligned with Expo SDK 57. Major toolchain migrations (including TypeScript 7 and pnpm 12) and Prisma prereleases were not applied.

Added Expo's required `@expo/metro-runtime` peer dependency and deduplicated the lockfile. The exact Expo release-age exceptions in `pnpm-workspace.yaml` were added by pnpm when installing the versions recommended by `expo install --check`.

Scoped Prisma overrides update `deepmerge-ts` to 8.0.2 and `mysql2` to 3.23.1 to address audit findings. Prisma config loading, client generation, schema validation and the live migration-status check succeed with these overrides. Revisit the overrides when upstream dependencies include these fixes.

The updated linter flags the existing web theme hydration effect. A local suppression documents why the first browser render must match static HTML before applying the device theme; runtime behavior is unchanged.

## Verified

- `corepack pnpm check`: lint, formatting and API/mobile TypeScript checks pass.
- `corepack pnpm peers check`: no peer dependency issues.
- `corepack pnpm -C apps/mobile exec expo install --check`: dependencies match Expo's compatibility recommendations.
- Prisma client generation and schema validation pass.
- Expo web export succeeds, including static rendering of seven routes; output is in ignored `.cache/mobile-web-check`.
- Supabase was paused and was reactivated by the project owner.
- Supabase Auth health and settings return HTTP 200; email auth and signup are enabled.
- API health, series, tracks, events and countries return HTTP 200 after reactivation.
- Prisma migration status reports all four migrations applied. No database migrations or seed writes were performed.

## Remaining limits

- Full `pnpm audit` still reports one moderate finding in `decode-uri-component`, pulled in by Expo Router's `query-string`. The advisory names 0.4.3 as fixed, but the registry returned no matching version for that release during this check. Recheck availability during the next maintenance pass.
- No completed registration/login flow exists yet, so no end-to-end user authentication was tested.
- Native device preview remains a manual check.
- Bun was unavailable on the shell PATH; the local API was started using Bun 1.4.2 from the pnpm tool cache. See `development-setup.md` for the restart command.

## Resume learning

Continue with the small `readBearerToken` exercise in `apps/api/src/lib/auth.ts`. Public routes already have service/repository layers; do not rebuild them.
