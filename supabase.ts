import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://kxsutwibctfrmltqefvg.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4c3V0d2liY3Rmcm1sdHFlZnZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUzNzM1MjgsImV4cCI6MjA1MDk0OTUyOH0.JC6aNUNz47OMP1D3ugvgOVFYzkUY5GocDho_Q0pY8qI";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
