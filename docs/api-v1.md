# Quest GP API v1

## API Architecture

Phase 1 uses REST as the primary API surface.

New authenticated and user-owned features should be implemented with this internal structure:

```text
Route
-> Service
-> Repository
-> Prisma
```

- Routes handle HTTP details, auth context, request validation, and response formatting.
- Services contain business rules and feature workflows.
- Repositories contain Prisma queries and database persistence.
- Prisma remains the only database access layer.

GraphQL is not part of the initial MVP API surface. The service and repository layers should still be written so a future GraphQL resolver can call the same business logic without duplicating API behavior.

---

## Pagination Strategy

List endpoints that can grow should support pagination before they become large production datasets.

Use cursor-style pagination where practical, because it stays stable when new events or user-owned records are inserted.

Initial candidates:

- `GET /events`
- `GET /tracks`
- `GET /me/bucket-list`
- `GET /me/visited-events`

Preferred request shape:

```text
GET /events?limit=20
GET /events?limit=20&cursor=<cursor>
```

Preferred response shape:

```json
{
  "data": [],
  "pageInfo": {
    "nextCursor": null,
    "hasNextPage": false
  }
}
```

`limit` should be validated by the API and capped to a safe maximum.

---

## Rate Limiting Strategy

Rate limiting is planned as production hardening, not as a blocker for local MVP development.

Use rate limits to protect:

- public read endpoints from accidental loops or scraping
- auth endpoints from brute-force attempts
- user-owned endpoints from excessive per-user traffic

Preferred layers:

- API middleware for app-specific limits
- infrastructure-level protection later, such as a reverse proxy, hosting provider, or edge layer

---

## Health

### GET /

Returns API status.

Response:

```json
{
  "name": "Quest GP API",
  "status": "running"
}
```

---

## Users

### GET /me

Returns current user profile.

### PATCH /me

Updates current user profile.

---

## Series

### GET /series

Returns all racing series.

### GET /series/:id

Returns one racing series with upcoming events and tracks.

---

## Tracks

### GET /tracks

Returns all tracks.

### GET /tracks/:id

Returns one track with upcoming events and series.

---

## Events

### GET /events

Returns all racing events.

Filters:

- seriesId

- country

- from

- to

Notes:

- `seriesId` must be a UUID.
- `from` and `to` accept ISO date or datetime strings.
- `country` is matched case-insensitively against the event track country.

### GET /events/:id

Returns one event with series and track.

---

## Error Format

Errors return:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable message"
  }
}
```

---

## User Series

### GET /me/series

Returns series followed by current user.

### POST /me/series

Adds a followed series.

### DELETE /me/series/:seriesId

Removes a followed series.

---

## Bucket List

### GET /me/bucket-list

Returns current user's bucket list.

### POST /me/bucket-list

Adds event or track to bucket list.

### PATCH /me/bucket-list/:id

Updates bucket list item.

### DELETE /me/bucket-list/:id

Deletes bucket list item.

---

## Motorsport Lebenslauf

### GET /me/visited-events

Returns visited events.

### POST /me/visited-events

Adds visited event.

### PATCH /me/visited-events/:id

Updates visited event.

### DELETE /me/visited-events/:id

Deletes visited event.
