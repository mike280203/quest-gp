import { createClient } from "@supabase/supabase-js";

/**
 * Projekt-URL aus der Umgebungsvariable `SUPABASE_URL`.
 *
 * @remarks
 * Fehlt die URL oder der Publishable Key, bricht die Modulinitialisierung
 * mit einem Fehler ab.
 */
const supabaseUrl = process.env.SUPABASE_URL;
/** Publishable Key aus der Umgebungsvariable `SUPABASE_PUBLISHABLE_KEY`. */
const supabasePublishableKey = process.env.SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabasePublishableKey) {
  throw new Error("SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY are required.");
}

/**
 * Konfiguriert `auth` für die serverseitige Prüfung mitgeschickter Tokens.
 *
 * @remarks
 * - `persistSession`: Speichert keine Benutzersitzung dauerhaft.
 * - `autoRefreshToken`: Verlängert keine Benutzersitzung automatisch.
 * - `detectSessionInUrl`: Wertet keine Login-Rückleitung aus einer Browser-URL aus.
 *
 * Die Anmeldung und Sitzungserneuerung übernimmt die Mobile-App.
 */
const options = {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
  },
};

/**
 * Supabase-Client der API zur Prüfung von Benutzer-Tokens.
 *
 * @remarks
 * Sitzungsspeicherung und automatische Token-Erneuerung sind deaktiviert.
 * Der Token der jeweiligen Anfrage wird später ausdrücklich an
 * `supabase.auth.getUser(token)` übergeben.
 */
export const supabase = createClient(supabaseUrl, supabasePublishableKey, options);
