import { Hono } from "hono";

import { notFound } from "../lib/http";
import { prisma } from "../lib/prisma";
import { uuidSchema } from "../lib/validation";

export const seriesRoutes = new Hono();

seriesRoutes.get("/", async (c) => {
  const series = await prisma.series.findMany({
    orderBy: { name: "asc" },
  });

  return c.json({ data: series });
});

seriesRoutes.get("/:id", async (c) => {
  const id = c.req.param("id");
  const parsedId = uuidSchema.safeParse(id);

  if (!parsedId.success) {
    return notFound(c, "Series");
  }

  const series = await prisma.series.findUnique({
    where: { id: parsedId.data },
    include: {
      events: {
        orderBy: { startDate: "asc" },
        include: { track: true },
      },
    },
  });

  if (!series) {
    return notFound(c, "Series");
  }

  return c.json({ data: series });
});
