import type { MiddlewareHandler } from "hono";

import { logger } from "../lib/logger";

export const requestLogger: MiddlewareHandler = async (c, next) => {
  const startedAt = performance.now();

  await next();

  const durationMs = Math.round(performance.now() - startedAt);

  logger.info(
    {
      method: c.req.method,
      path: new URL(c.req.url).pathname,
      status: c.res.status,
      durationMs,
    },
    "request completed",
  );
};
