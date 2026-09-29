import type { MiddlewareHandler } from "hono";
import type { AuthEnv } from "../lib/auth";

import { readBearerToken } from "../lib/auth";
import { unauthorized } from "../lib/http";
import { supabase } from "../lib/supabase";

/**
 * Liest den Bearer-Token der Anfrage aus und lässt ihn von Supabase prüfen.
 *
 * @remarks
 * Ohne auslesbaren Token erfolgt kein Aufruf von Supabase.
 * Meldet Supabase einen Fehler oder liefert keinen Benutzer, antwortet die
 * Middleware mit HTTP `401`.
 *
 * Nach erfolgreicher Prüfung wird die bestätigte Benutzer-ID im Anfragekontext
 * hinterlegt und die nächste Middleware beziehungsweise der Route-Handler aufgerufen.
 * Die gesonderte Behandlung von Auth-Dienst-Ausfällen fehlt noch.
 * Die Middleware ist noch nicht registriert.
 */
export const requireAuth: MiddlewareHandler<AuthEnv> = async (c, next) => {
  const authorization = c.req.header("Authorization");
  const token = readBearerToken(authorization);

  if (!token) {
    return unauthorized(c);
  }

  const result = await supabase.auth.getUser(token);

  if (result.error || !result.data.user) {
    return unauthorized(c);
  }

  /**
   * Hinterlegt die bestätigte Supabase-Benutzer-ID für diese Anfrage.
   *
   * @remarks
   * `authUserId` ist der in `AuthEnv` definierte Schlüssel im Kontext.
   * Der Wert stammt ausschließlich aus der erfolgreichen Supabase-Prüfung.
   * Nachgelagerte Handler können ihn später mit `c.get("authUserId")` auslesen.
   */
  c.set("authUserId", result.data.user.id);

  /**
   * Führt die nachgelagerte Verarbeitung für die authentifizierte Anfrage aus.
   *
   * @remarks
   * `next()` ruft die nächste Middleware beziehungsweise den Route-Handler auf.
   * `await` wartet auf deren Abschluss, bevor diese Middleware fortgesetzt wird.
   * Die frühen Fehlerantworten verhindern, dass abgelehnte Anfragen hier ankommen.
   */
  await next();
};
