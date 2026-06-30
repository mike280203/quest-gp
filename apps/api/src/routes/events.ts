import { Hono } from "hono";
import { z } from "zod";

import { badRequest, notFound } from "../lib/http";
import { dateStringSchema, uuidSchema } from "../lib/validation";
import { getEventById, listEvents } from "../services/event-service";

const eventQuerySchema = z
  .object({
    seriesId: uuidSchema.optional(),
    country: z.string().trim().min(1).optional(),
    from: dateStringSchema.optional(),
    to: dateStringSchema.optional(),
  })
  .refine(
    (query) => {
      if (!query.from || !query.to) {
        return true;
      }

      return new Date(query.from) <= new Date(query.to);
    },
    {
      message: "`from` must be before or equal to `to`.",
      path: ["from"],
    },
  );

export const eventRoutes = new Hono();

eventRoutes.get("/", async (c) => {
  const parsedQuery = eventQuerySchema.safeParse(c.req.query());

  if (!parsedQuery.success) {
    return badRequest(c, "Invalid event filters.", z.treeifyError(parsedQuery.error));
  }

  const { seriesId, country, from, to } = parsedQuery.data;

  const events = await listEvents({ seriesId, country, from, to });

  return c.json({ data: events });
});

eventRoutes.get("/:id", async (c) => {
  const id = c.req.param("id");
  const parsedId = uuidSchema.safeParse(id);

  if (!parsedId.success) {
    return notFound(c, "Event");
  }

  const event = await getEventById(parsedId.data);

  if (!event) {
    return notFound(c, "Event");
  }

  return c.json({ data: event });
});
