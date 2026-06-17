import { Hono } from "hono";

import { notFound } from "../lib/http";
import { prisma } from "../lib/prisma";
import { uuidSchema } from "../lib/validation";

export const trackRoutes = new Hono();

trackRoutes.get("/", async (c) => {
  const tracks = await prisma.track.findMany({
    orderBy: [{ country: "asc" }, { name: "asc" }],
  });

  return c.json({ data: tracks });
});

trackRoutes.get("/:id", async (c) => {
  const id = c.req.param("id");
  const parsedId = uuidSchema.safeParse(id);

  if (!parsedId.success) {
    return notFound(c, "Track");
  }

  const track = await prisma.track.findUnique({
    where: { id: parsedId.data },
    include: {
      events: {
        orderBy: { startDate: "asc" },
        include: { series: true },
      },
    },
  });

  if (!track) {
    return notFound(c, "Track");
  }

  return c.json({ data: track });
});
