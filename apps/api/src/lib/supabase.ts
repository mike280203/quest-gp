import { createClient } from "@supabase/supabase-js";

/**
 * Liest die Supabase-Konfiguration aus den Umgebungsvariablen.
 * **Fehlende Werte** verhindern die Initialisierung des API-Clients.
 */
const supabaseUrl = process.env.SUPABASE_URL;
const supabasePublishableKey = process.env.SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabasePublishableKey) {
  throw new Error("SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY are required.");
}

/**
 * Konfiguriert `auth` für die serverseitige Prüfung mitgeschickter Tokens.
 * - `persistSession`: Speichert keine Benutzersitzung dauerhaft.
 * - `autoRefreshToken`: Verlängert keine Benutzersitzung automatisch.
 * - `detectSessionInUrl`: Wertet keine Login-Rückleitung aus einer Browser-URL aus.
 *
 * **Die Anmeldung und Sitzungserneuerung übernimmt die Mobile-App.**
 */
const options = {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
  },
};

/**
 * Erstellt den Supabase-Client für die API.
 * **Sitzungsspeicherung und automatische Token-Erneuerung** sind deaktiviert.
 */
export const supabase = createClient(supabaseUrl, supabasePublishableKey, options);
