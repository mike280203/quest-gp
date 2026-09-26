import type { MiddlewareHandler } from "hono";

import { readBearerToken } from "../lib/auth";
import { unauthorized } from "../lib/http";

/** Prüft die Authentifizierung vor dem Zugriff auf geschützte Routen. */
export const requireAuth: MiddlewareHandler = async (c) => {
  const authorization = c.req.header("Authorization");
  const token = readBearerToken(authorization);

  if (!token) {
    return unauthorized(c);
  }
  // TODO: Den Token verifizieren, bevor die Anfrage weiterlaufen darf.
  return unauthorized(c);
};
