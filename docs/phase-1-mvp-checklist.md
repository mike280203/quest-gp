# Quest GP Phase 1 MVP Checklist

Diese Datei ist unser Arbeitsboard fuer Phase 1. Hake erledigte Punkte ab, damit jederzeit klar ist, wo wir stehen.

## 0. Projektbasis

- [ ] Repo-Struktur pruefen und Zielstruktur festlegen
- [ ] Root-Scripts fuer API und Mobile vereinheitlichen
- [ ] Env-Dateien und Beispiel-Env dokumentieren
- [ ] Lokalen Entwicklungsworkflow dokumentieren
- [ ] Expo Preview Workflow festlegen
- [x] Oxlint und Oxfmt fuer das Monorepo einrichten
- [x] GitHub Actions CI fuer Qualitaetschecks einrichten

## 1. Prisma Setup

- [x] Prisma in `apps/api` installieren
- [x] Prisma initialisieren
- [x] `DATABASE_URL` fuer lokale Entwicklung vorbereiten
- [x] Datenmodelle aus `docs/database-v1.md` in `schema.prisma` umsetzen
- [x] Enum `BucketListStatus` anlegen
- [x] Unique Constraints und Relationen definieren
- [x] Prisma Client Helper fuer die API anlegen
- [x] Erste Migration erstellen
- [x] Prisma Setup in der Doku ergaenzen

## 2. Supabase Setup

- [x] Supabase Projekt erstellen
- [x] Supabase Postgres Connection String eintragen
- [x] Prisma Migration gegen Supabase ausfuehren
- [ ] Supabase Auth fuer Email/Password vorbereiten
- [ ] API Auth Strategie dokumentieren
- [ ] Mobile Auth Strategie dokumentieren
- [ ] Supabase Setup in der Doku ergaenzen

## 3. Seed-Daten

- [x] Seed-Struktur fuer Prisma anlegen
- [x] Erste Rennserien anlegen
- [x] Erste Strecken anlegen
- [x] Erste Events anlegen
- [x] Seed Script in `package.json` verfuegbar machen
- [x] Seed-Daten pruefen

## 4. API Foundation

- [x] API Ordnerstruktur festlegen
- [x] Health Route pruefen
- [x] CORS fuer lokale Mobile/Web Entwicklung einrichten
- [x] Einheitliches Fehlerformat festlegen
- [x] Request Validation Strategie festlegen
- [x] Route-Service-Repository-Struktur fuer API Features einfuehren
- [x] Public Routes bei Bedarf auf Services/Repositories vorbereiten
- [ ] GraphQL-ready Service-Grenzen dokumentieren
- [x] Pagination Pattern fuer wachsende Listen definieren
- [ ] Rate-Limit Strategie fuer Production Hardening dokumentieren
- [ ] Lost-Update Strategie fuer user-owned PATCH Routes dokumentieren
- [ ] Env Validation einrichten
- [x] API README aktualisieren

## 5. Public API

- [x] `GET /series`
- [x] `GET /series/:id`
- [x] `GET /tracks`
- [x] `GET /tracks/:id`
- [x] `GET /events`
- [x] Event Filter: `seriesId`
- [x] Event Filter: `country`
- [x] Event Filter: `from`
- [x] Event Filter: `to`
- [ ] Event Search: `search`
- [x] Pagination fuer `GET /events`
- [x] `GET /events/:id`
- [x] Public API manuell testen
- [x] `docs/api-v1.md` bei Bedarf aktualisieren

## 6. Auth API

- [ ] Supabase Bearer Token in Hono lesen
- [ ] Supabase User validieren
- [ ] Lokalen `User` laden oder erstellen
- [ ] Geschuetzte Route Middleware anlegen
- [ ] `GET /me`
- [ ] `PATCH /me`
- [ ] Auth Flow manuell testen

## 7. User Series API

- [ ] `GET /me/series`
- [ ] `POST /me/series`
- [ ] `DELETE /me/series/:seriesId`
- [ ] Duplicate Follow verhindern
- [ ] User Series Flow manuell testen

## 8. Bucket List API

- [ ] `GET /me/bucket-list`
- [ ] `POST /me/bucket-list`
- [ ] Event- oder Track-Ziel validieren
- [ ] `PATCH /me/bucket-list/:id`
- [ ] `DELETE /me/bucket-list/:id`
- [ ] Bucket List Flow manuell testen

## 9. Motorsport Resume API

- [ ] `GET /me/visited-events`
- [ ] `POST /me/visited-events`
- [ ] `PATCH /me/visited-events/:id`
- [ ] `DELETE /me/visited-events/:id`
- [ ] Visited Events Flow manuell testen

## 10. Mobile Foundation

- [x] Mobile App Struktur pruefen
- [x] Navigation fuer MVP Screens festlegen
- [x] API Client Helper anlegen
- [x] Loading State Pattern festlegen
- [x] Error State Pattern festlegen
- [x] Empty State Pattern festlegen
- [x] Expo Preview starten und pruefen
- [x] Expo Starter Demo-Code entfernen

## 11. Mobile Auth

- [ ] Supabase Client in Mobile App einrichten
- [ ] React Hook Form und Schema-Validation Strategie fuer Auth Forms einrichten
- [ ] Login Screen
- [ ] Register Screen
- [ ] Session Handling
- [ ] Logout
- [ ] Authenticated Navigation
- [ ] Auth Flow auf Preview testen

## 12. Mobile MVP Screens

- [ ] Home Dashboard
- [ ] Racing Calendar
- [x] Event Detail Screen
- [ ] Favorite Series Screen
- [ ] Bucket List Screen
- [ ] Motorsport Resume Screen
- [ ] Racing Map MVP
- [ ] Profile Screen

## 13. End-to-End MVP Flow

- [ ] User registriert sich
- [ ] User bearbeitet Profil
- [ ] User folgt Rennserien
- [ ] User sieht Events
- [ ] User filtert Events
- [ ] User oeffnet Eventdetails
- [ ] User fuegt Event zur Bucket List hinzu
- [ ] User markiert Event als besucht
- [ ] Motorsport Resume zeigt besuchte Events
- [ ] Racing Map zeigt relevante Strecken

## 14. Qualitaet und Dokumentation

- [ ] Type Checks ausfuehren
- [x] Linting/Formatting Tooling einrichten
- [x] GitHub Actions Checks einrichten
- [ ] Linting ausfuehren
- [ ] API manuell testen
- [ ] Mobile Preview testen
- [ ] Setup-Doku aktualisieren
- [ ] API-Doku aktualisieren
- [ ] MVP-Fortschritt dokumentieren
- [ ] Git Status pruefen
- [ ] Aenderungen committen
- [ ] Aenderungen nach GitHub pushen

## Aktueller Fokus

- [ ] Naechster Schritt: API Architektur auf Route -> Service -> Repository -> Prisma vorbereiten
- [ ] Danach: Auth Foundation bauen
- [ ] Danach: Bucket List Datenlogik starten
