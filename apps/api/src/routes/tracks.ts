import { Hono } from "hono";

import { notFound } from "../lib/http";
import { uuidSchema } from "../lib/validation";
import { getTrackById, listTracks } from "../services/track-service";

export const trackRoutes = new Hono();

trackRoutes.get("/", async (c) => {
  const tracks = await listTracks();

  return c.json({ data: tracks });
});

trackRoutes.get("/:id", async (c) => {
  const id = c.req.param("id");
  const parsedId = uuidSchema.safeParse(id);

  if (!parsedId.success) {
    return notFound(c, "Track");
  }

  const track = await getTrackById(parsedId.data);

  if (!track) {
    return notFound(c, "Track");
  }

  return c.json({ data: track });
});
