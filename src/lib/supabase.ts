import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://olwpervlxnqsfqewcazp.supabase.co"

const supabaseKey =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9sd3BlcnZseG5xc2ZxZXdjYXpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5MjA3NDQsImV4cCI6MjA4ODQ5Njc0NH0.96CsXrOJx75f1g3BKNMv4wOREoL2pamadVBTKnoz0V0"

export const supabase = createClient(supabaseUrl, supabaseKey)