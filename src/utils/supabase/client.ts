import { createBrowserClient } from '@supabase/ssr'

/**
 * Creates a Supabase browser client configured from public environment variables.
 *
 * @returns A Supabase browser client instance configured with
 * `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
