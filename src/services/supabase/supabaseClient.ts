// src/services/supabase/supabaseClient.ts

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://xapjsphmzmuqwxjvmirn.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhhcGpzcGhtem11cXd4anZtaXJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ5NzgyOTgsImV4cCI6MjA1MDU1NDI5OH0.w8z_6W_GsmP9CtoEkJVgZTzD4TDlYsLGsFsS4JBaJiI";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
