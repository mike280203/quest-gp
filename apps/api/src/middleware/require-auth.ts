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
 * Dieser Zwischenstand weist auch erfolgreich geprüfte Anfragen noch ab.
 * Die bestätigte Benutzer-ID wird bereits im Anfragekontext hinterlegt.
 * Die Weiterleitung an die Route fehlt noch. Die Middleware ist noch nicht registriert.
 */
export const requireAuth: MiddlewareHandler<AuthEnv> = async (c) => {
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
   * Verhindert die Weiterleitung, solange die Authentifizierung unvollständig ist.
   *
   * @remarks
   * Noch umzusetzen: Ausfälle des Auth-Dienstes gesondert behandeln
   * und die Route freigeben.
   */
  return unauthorized(c);
};
