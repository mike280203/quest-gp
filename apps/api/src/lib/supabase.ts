/**
 * Liest die Supabase-Konfiguration aus den Umgebungsvariablen.
 * **Fehlende Werte** verhindern die Initialisierung des API-Clients.
 */
const supabaseUrl = process.env.SUPABASE_URL;
const supabasePublishableKey = process.env.SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabasePublishableKey) {
  throw new Error("SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY are required.");
}
