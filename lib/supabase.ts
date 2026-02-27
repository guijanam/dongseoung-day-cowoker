import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://srsyxsddjbojnwvjoera.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNyc3l4c2RkamJvam53dmpvZXJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3NjY4NTEsImV4cCI6MjA3NDM0Mjg1MX0.wmTrMzDqBs10qL_wBeJJQTjQMuCuvfAmY6_eW2brqT8";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
