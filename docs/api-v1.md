# Quest GP API v1

## Health

### GET /

Returns API status.

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

Returns one racing series.

---

## Tracks

### GET /tracks

Returns all tracks.

### GET /tracks/:id

Returns one track.

---

## Events

### GET /events

Returns all racing events.

Filters:

- seriesId

- country

- from

- to

### GET /events/:id

Returns one event.

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
