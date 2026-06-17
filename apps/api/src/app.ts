import { Hono } from "hono";
import { cors } from "hono/cors";

import { logger } from "./lib/logger";
import { requestLogger } from "./middleware/request-logger";
import { eventRoutes } from "./routes/events";
import { seriesRoutes } from "./routes/series";
import { trackRoutes } from "./routes/tracks";

export const app = new Hono();

app.use("*", requestLogger);

app.use(
  "*",
  cors({
    origin: (origin) => origin,
    allowMethods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
  }),
);

app.get("/", (c) => {
  return c.json({
    name: "Quest GP API",
    status: "running",
  });
});

app.route("/series", seriesRoutes);
app.route("/tracks", trackRoutes);
app.route("/events", eventRoutes);

app.notFound((c) => {
  return c.json(
    {
      error: {
        code: "NOT_FOUND",
        message: "Route not found.",
      },
    },
    404,
  );
});

app.onError((error, c) => {
  logger.error({ error }, "unhandled api error");

  return c.json(
    {
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong.",
      },
    },
    500,
  );
});
