import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://your-project-id.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdyZ3N2Z3dubmppc3BwcnNvY3lkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIwNjU4NjYsImV4cCI6MjA3NzY0MTg2Nn0.CCn_IsQA-Qf7UVLY3aKZZn-6X-HeGnFDyImp6OMpxxU"; // found in Project Settings → API → anon key

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
