// src/services/supabase/supabaseClient.ts

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jqihkljbodshyxnlepsl.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxaWhrbGpib2RzaHl4bmxlcHNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ5ODY1NzQsImV4cCI6MjA1MDU2MjU3NH0.w9FAYy8aJXeffZfM2vfd3Pj-htfHUxrHBAyEqyD1xuw";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
