import type { Context } from "hono";

export function notFound(c: Context, resource: string) {
  return c.json(
    {
      error: {
        code: "NOT_FOUND",
        message: `${resource} not found.`,
      },
    },
    404,
  );
}

export function badRequest(c: Context, message: string, issues?: unknown) {
  return c.json(
    {
      error: {
        code: "BAD_REQUEST",
        message,
        issues,
      },
    },
    400,
  );
}

/** Erstellt eine einheitliche Fehlerantwort bei fehlender Authentifizierung. */
export function unauthorized(c: Context) {
  return c.json(
    {
      error: {
        code: "UNAUTHORIZED",
        message: "Authentication required.",
      },
    },
    401,
  );
}

/**
 * Erstellt eine Fehlerantwort bei vorübergehender Nichtverfügbarkeit eines Dienstes.
 *
 * @remarks
 * Die Nachricht beschreibt das Problem, ohne interne Fehlerdetails offenzulegen.
 */
export function serviceUnavailable(c: Context, message: string) {
  return c.json(
    {
      error: {
        code: "SERVICE_UNAVAILABLE",
        message,
      },
    },
    503,
  );
}
