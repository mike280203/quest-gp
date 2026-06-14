# Quest GP Database v1

## Core Models

## ID Strategy

All primary IDs use PostgreSQL UUIDs.

Reason:

- UUIDs are not sequential and are harder to guess than auto-incrementing integers.
- UUID format is easy to validate at API boundaries.
- Supabase Auth user IDs are UUIDs, so `User.authUserId` can map cleanly to Supabase.
- IDs stay stable and API-friendly across mobile, backend, and database layers.

### User

Represents an app user.

Fields:

- id

- authUserId

- email

- username

- displayName

- homeCity

- homeCountry

- createdAt

- updatedAt

Notes:

- `authUserId` stores the Supabase Auth user id and links authentication to the local app profile.
- `id` and `authUserId` are PostgreSQL UUID values.

Relations:

- has many userSeries

- has many bucketListItems

- has many visitedEvents

---

### Series

Represents a racing series.

Examples:

- Formula 1

- WEC

- IMSA

- DTM

- MotoGP

- GT World Challenge

Fields:

- id

- name

- slug

- description

- logoUrl

Relations:

- has many events

- has many userSeries

---

### Driver

Represents a racing driver.

Fields:

- id

- name

- slug

- nationality

- imageUrl

---

### Team

Represents a racing team.

Fields:

- id

- name

- slug

- country

- logoUrl

---

### Track

Represents a racing track.

Examples:

- Circuit de la Sarthe

- Nürburgring

- Spa-Francorchamps

- Monaco

- Daytona

Fields:

- id

- name

- slug

- city

- country

- latitude

- longitude

- imageUrl

- description

Relations:

- has many events

---

### Event

Represents a racing event.

Examples:

- Le Mans 24h 2027

- Nürburgring 24h 2027

- Monaco GP 2027

Fields:

- id

- name

- slug

- description

- startDate

- endDate

- seriesId

- trackId

- ticketUrl

- officialUrl

- imageUrl

Relations:

- belongs to Series

- belongs to Track

- has many bucketListItems

- has many visitedEvents

---

### UserSeries

Represents which racing series a user follows.

Fields:

- id

- userId

- seriesId

- createdAt

Relations:

- belongs to User

- belongs to Series

---

### BucketListItem

Represents an event or track a user wants to visit.

Status:

- WISHLIST

- PLANNED

- VISITED

Fields:

- id

- userId

- eventId

- trackId

- status

- notes

- createdAt

- updatedAt

Relations:

- belongs to User

- optionally belongs to Event

- optionally belongs to Track

---

### VisitedEvent

Represents an event the user has attended.

Fields:

- id

- userId

- eventId

- visitedAt

- rating

- notes

- photosUrl

- createdAt

Relations:

- belongs to User

- belongs to Event

---

## Future Models

Not part of MVP:

- Trip

- TripPlan

- Meetup

- UserEvent

- Community

- XTrend

- AffiliateBooking
