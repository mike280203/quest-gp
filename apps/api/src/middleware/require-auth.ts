import type { MiddlewareHandler } from "hono";

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
 * Die Übergabe der Benutzeridentität an den Anfragekontext und die Weiterleitung
 * an die Route fehlen noch. Die Middleware ist noch nicht registriert.
 */
export const requireAuth: MiddlewareHandler = async (c) => {
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
   * Verhindert die Weiterleitung, solange die Authentifizierung unvollständig ist.
   *
   * @remarks
   * Noch umzusetzen: Den bestätigten Benutzer im Anfragekontext hinterlegen,
   * Ausfälle des Auth-Dienstes gesondert behandeln und die Route freigeben.
   */
  return unauthorized(c);
};
