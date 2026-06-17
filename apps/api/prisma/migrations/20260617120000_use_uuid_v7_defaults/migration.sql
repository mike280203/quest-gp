CREATE EXTENSION IF NOT EXISTS pgcrypto;

SET search_path = public, extensions;

CREATE OR REPLACE FUNCTION public.uuid_v7()
RETURNS uuid
LANGUAGE sql
VOLATILE
AS $$
  SELECT (
    lpad(to_hex(floor(extract(epoch FROM clock_timestamp()) * 1000)::bigint), 12, '0') ||
    '7' ||
    substring(encode(gen_random_bytes(2), 'hex') FROM 1 FOR 3) ||
    to_hex((get_byte(gen_random_bytes(1), 0) & 3) | 8) ||
    substring(encode(gen_random_bytes(2), 'hex') FROM 1 FOR 3) ||
    encode(gen_random_bytes(6), 'hex')
  )::uuid;
$$;

ALTER TABLE "User" ALTER COLUMN "id" SET DEFAULT public.uuid_v7();
ALTER TABLE "Series" ALTER COLUMN "id" SET DEFAULT public.uuid_v7();
ALTER TABLE "Driver" ALTER COLUMN "id" SET DEFAULT public.uuid_v7();
ALTER TABLE "Team" ALTER COLUMN "id" SET DEFAULT public.uuid_v7();
ALTER TABLE "Track" ALTER COLUMN "id" SET DEFAULT public.uuid_v7();
ALTER TABLE "Event" ALTER COLUMN "id" SET DEFAULT public.uuid_v7();
ALTER TABLE "UserSeries" ALTER COLUMN "id" SET DEFAULT public.uuid_v7();
ALTER TABLE "BucketListItem" ALTER COLUMN "id" SET DEFAULT public.uuid_v7();
ALTER TABLE "VisitedEvent" ALTER COLUMN "id" SET DEFAULT public.uuid_v7();
