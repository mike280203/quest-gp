/**
 * Liest den Token aus einem Authorization-Header wie "Bearer <token>" aus.
 * Gibt null zurück, wenn der Header fehlt oder nicht den erwarteten Aufbau hat.
 * Der Token ist noch nicht vertrauenswürdig: Die Authentifizierung muss ihn separat prüfen.
 */
export function readBearerToken(authorization: string | undefined): string | null {
  if (authorization === undefined) {
    return null;
  }

  // Erlaubt äußere Leerzeichen und mehrere Leerraumzeichen zwischen den Bestandteilen.
  const parts = authorization.trim().split(/\s+/);

  // Erwartet genau ein Schema und einen Token; weist fehlende oder zusätzliche Teile zurück.
  if (parts.length !== 2) {
    return null;
  }

  const scheme = parts[0];
  const token = parts[1];

  // Schließt leere Werte aus und grenzt die Array-Zugriffe für TypeScript auf Strings ein.
  if (!scheme || !token) {
    return null;
  }

  // Ignoriert Groß-/Kleinschreibung beim Schema; der Token bleibt unverändert.
  if (scheme.toLowerCase() !== "bearer") {
    return null;
  }

  return token;
}
