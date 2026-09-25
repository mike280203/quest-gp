# Quest GP Auth v1

## Goal

Phase 1 uses Supabase Auth with email and password. A user signs in once on a personal device and stays signed in until they log out, their session is revoked, or the local app data is removed.

## Responsibilities

### Supabase Auth

- registers users and verifies email/password credentials
- issues access and refresh tokens
- refreshes authenticated sessions
- exposes trusted JWT claims to the API

### Mobile App

- signs users up and in through the Supabase client
- persists the Supabase session on the device
- refreshes access tokens automatically
- sends the current access token to the Quest GP API as `Authorization: Bearer <token>`
- never contains a Supabase secret or service-role key

### Hono API

- validates the bearer token with Supabase before trusting its claims
- uses the verified JWT `sub` claim as the Supabase Auth user ID
- loads or creates the local Prisma `User` through the service and repository layers
- authorizes access to user-owned Quest GP data

## Identity Mapping

Supabase owns the login identity. Quest GP owns the application profile and user data.

```text
Supabase Auth user.id
-> verified JWT sub claim
-> User.authUserId
-> Quest GP profile, series, bucket list, and visited events
```

The API never accepts a client-provided user ID as proof of identity.

## Session Persistence

The Expo app uses the Supabase JavaScript client with:

- `persistSession: true`
- `autoRefreshToken: true`
- Expo SQLite's `localStorage` adapter
- `detectSessionInUrl: false` for the native app flow

The stored refresh token allows Supabase to issue fresh short-lived access tokens without requiring the user to enter their password whenever the app opens.

## Environment Variables

Mobile development uses a local `apps/mobile/.env.local` file:

```text
EXPO_PUBLIC_SUPABASE_URL
EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY
```

The `EXPO_PUBLIC_` prefix makes these values available in the app bundle. Only the public project URL and publishable key belong there.

The API uses its existing local `apps/api/.env` file:

```text
DATABASE_URL
SUPABASE_URL
SUPABASE_PUBLISHABLE_KEY
```

Never place the database password, a Supabase secret key, or a service-role key in the mobile environment.

## Initial Protected Flow

The first protected endpoint will be:

```http
GET /me
Authorization: Bearer <supabase-access-token>
```

Its implementation follows:

```text
Route
-> Auth middleware validates token
-> User service loads or creates local user
-> User repository accesses Prisma
-> Route returns { data: user }
```
