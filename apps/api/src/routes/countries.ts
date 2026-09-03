import { Hono } from "hono";

import { listCountries } from "../services/country-service";

export const countryRoutes = new Hono();

countryRoutes.get("/", async (c) => {
  const countries = await listCountries();

  return c.json({ data: countries });
});
