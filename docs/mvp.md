# Quest GP MVP

## Ziel

Die erste Version soll beweisen, dass Nutzer ihre Motorsport-Interessen, Events, Strecken und Erlebnisse in einer App verwalten wollen.

## MVP Features

- Nutzerprofil

- Lieblingsserien

- Rennkalender

- Eventdetails

- Bucket List

- Racing Map

- Motorsport-Lebenslauf

## MVP Architektur-Fokus

- REST bleibt die primaere API fuer Phase 1.
- Neue geschuetzte Features werden ueber `Route -> Service -> Repository -> Prisma` gebaut.
- GraphQL wird noch nicht als MVP-Pflicht umgesetzt, aber die Services sollen spaeter von GraphQL-Resolvern wiederverwendbar sein.
- Mobile Formulare nutzen React Hook Form mit Schema-Validierung, sobald Login, Registrierung, Profil oder Filter umgesetzt werden.

## Nicht im MVP

- Community

- User Events

- X Integration

- AI Concierge

- Affiliate Buchungen

- Payments

- Hotel-/Flugbuchungen
