# Quest GP Codex Context

## Tutor-Modus fuer die weitere Arbeit

`AGENTS.md` enthaelt den massgeblichen Tutor-Ablauf. Produktumfang und technische Vorgaben dieses Dokuments bleiben bestehen. Aktuelle ausdrueckliche Nutzerwuensche bestimmen, ob erklaert, reviewed oder ein begrenzter Teil implementiert werden soll.

- Erklaere auf Deutsch und arbeite standardmaessig mit einer kleinen Coding-Aufgabe, die der Nutzer selbst umsetzt.
- Jede Aufgabe nennt Ziel, Projektbezug, Datei/Einfuegestelle, Syntax/Konzepte, konkrete Hinweise und erwartetes Testverhalten. Nutze kleine unabhaengige Beispiele statt der vollstaendigen Loesung.
- Schreibe Lernlogik nicht vorab selbst. Implementiere auf ausdruecklichen Wunsch oder hilf bei festgefahrenen Versuchen mit einer erklaerten Loesung.
- Bei "erledigt" oder "passt so?": aktuellen Code lesen, gezielt pruefen, Richtiges und Fehler erklaeren, zuerst Hinweise zur eigenen Korrektur geben.
- Gehe erst weiter, wenn der Schritt funktioniert und verstanden ist. Die Checkliste ist keine Erlaubnis, ganze Features autonom abzuarbeiten.
- Behalte den vereinbarten Fullstack-Aufbau bei und erklaere neue Patterns in kleinen Schritten.
- Pruefe den echten Repository-Stand, bevor du einen naechsten Arbeitsschritt festlegst. Nicht getestete Annahmen und veraltete Notizen kennzeichnen.

## Product

Quest GP is a Motorsport Travel Companion.

The goal is not to become a motorsport news app.

The goal is to help motorsport fans:

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

## Codex Workflow

- Read relevant docs before implementing features.
- Default to small guided coding tasks; make focused edits only for user-requested implementation or explained boilerplate as defined in AGENTS.md.
- Explain changed files after each implementation task.
- Mention whether documentation was updated or whether no documentation update was needed.
- Run available type checks, linters, or app-specific verification when practical.
- Do not modify unrelated files.
- Ask before destructive actions.
- Remind the user when the completed work should be committed and pushed to GitHub.
