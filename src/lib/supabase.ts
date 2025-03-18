import { createBrowserClient } from "@supabase/ssr"

export function createClient() {
  return createBrowserClient("https://dodassmoqslmrzmvyxcg.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRvZGFzc21vcXNsbXJ6bXZ5eGNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA1MDI1NjgsImV4cCI6MjA1NjA3ODU2OH0.9n_cadkZZCfRfdQQ2qISe-3iujcnYE4ei6TrqpQnwg4")
}
