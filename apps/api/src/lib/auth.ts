/**
 * Beschreibt die Authentifizierungsdaten im Hono-Anfragekontext.
 *
 * @remarks
 * `authUserId` bezeichnet die bestätigte Supabase-Benutzer-ID.
 * Sie ist nicht die ID des lokalen Quest-GP-Profils.
 * type beschreibt die Form der Daten; es erzeugt noch keinen gespeicherten Wert.
 * Variables ist der von Hono erwartete Name.
 */
export type AuthEnv = {
  Variables: {
    authUserId: string;
  };
};

/**
 * Liest den Token aus einem `Authorization`-Header wie `Bearer <token>` aus.
 *
 * - Gibt `null` zurück, wenn der Header fehlt oder nicht den erwarteten Aufbau hat.
 * - Gibt den extrahierten Token unverändert als `string` zurück.
 *
 * **Wichtig:** Der Token ist noch nicht vertrauenswürdig.
 * Die Authentifizierung muss ihn separat prüfen.
 */
export function readBearerToken(authorization: string | undefined): string | null {
  if (authorization === undefined) {
    return null;
  }

  /**
   * `trim()` entfernt äußere Leerzeichen; `split(/\s+/)` trennt die Bestandteile
   * an einem oder mehreren Leerraumzeichen.
   */
  const parts = authorization.trim().split(/\s+/);

  /**
   * Erwartet genau zwei Bestandteile: **Schema** und **Token**.
   * Fehlende oder zusätzliche Teile führen zu `null`.
   */
  if (parts.length !== 2) {
    return null;
  }

  const scheme = parts[0];
  const token = parts[1];

  /**
   * Schließt leere Werte aus und grenzt `scheme` und `token`
   * für TypeScript von `string | undefined` auf `string` ein.
   */
  if (!scheme || !token) {
    return null;
  }

  /**
   * Vergleicht das Schema mit `bearer`, unabhängig von Groß-/Kleinschreibung.
   * **Der Token bleibt unverändert.**
   */
  if (scheme.toLowerCase() !== "bearer") {
    return null;
  }

  return token;
}
