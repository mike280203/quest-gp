import { Hono } from "hono";

import { notFound } from "../lib/http";
import { uuidSchema } from "../lib/validation";
import { getSeriesById, listSeries } from "../services/series-service";

export const seriesRoutes = new Hono();

seriesRoutes.get("/", async (c) => {
  const series = await listSeries();

  return c.json({ data: series });
});

seriesRoutes.get("/:id", async (c) => {
  const id = c.req.param("id");
  const parsedId = uuidSchema.safeParse(id);

  if (!parsedId.success) {
    return notFound(c, "Series");
  }

  const series = await getSeriesById(parsedId.data);

  if (!series) {
    return notFound(c, "Series");
  }

  return c.json({ data: series });
});
