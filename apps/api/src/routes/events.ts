import { Hono } from "hono";
import { z } from "zod";

import { badRequest, notFound } from "../lib/http";
import { prisma } from "../lib/prisma";
import { dateStringSchema, uuidSchema } from "../lib/validation";

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

  const events = await prisma.event.findMany({
    where: {
      seriesId,
      startDate: from ? { gte: new Date(from) } : undefined,
      endDate: to ? { lte: new Date(to) } : undefined,
      track: country
        ? {
            country: {
              equals: country,
              mode: "insensitive",
            },
          }
        : undefined,
    },
    include: {
      series: true,
      track: true,
    },
    orderBy: { startDate: "asc" },
  });

  return c.json({ data: events });
});

eventRoutes.get("/:id", async (c) => {
  const id = c.req.param("id");
  const parsedId = uuidSchema.safeParse(id);

  if (!parsedId.success) {
    return notFound(c, "Event");
  }

  const event = await prisma.event.findUnique({
    where: { id: parsedId.data },
    include: {
      series: true,
      track: true,
    },
  });

  if (!event) {
    return notFound(c, "Event");
  }

  return c.json({ data: event });
});
