# Quest GP Tech Stack

## Mobile

- Expo
- React Native
- TypeScript
- React Hook Form for mobile forms
- Zod or schema-based validation for form validation

## Backend

- Hono
- Bun
- TypeScript
- REST API for Phase 1 MVP
- GraphQL-ready service layer for a later optional `/graphql` interface

## Database

- PostgreSQL
- Prisma ORM

## Database Hosting

- Supabase Postgres

## Version Control

- Git
- GitHub

## IDE

- Cursor

## Architecture

Mobile App  
↓  
Hono API  
↓  
Route / Resolver  
↓  
Service  
↓  
Repository  
↓  
Prisma ORM  
↓  
PostgreSQL (Supabase)

## Principles

- TypeScript everywhere
- Mobile-first
- API-first
- Keep MVP simple
- Build features incrementally
- Avoid premature optimization
- Prefer clarity over cleverness
- Keep REST as the MVP API surface
- Do not add GraphQL until composed screen data makes it worth the extra complexity
- Build new authenticated/user-owned features with Route -> Service -> Repository -> Prisma
- Keep services reusable from REST routes and future GraphQL resolvers
- Validate forms in the mobile app for UX, and validate again in the API for security
