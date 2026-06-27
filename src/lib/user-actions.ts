"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// This client uses the service role key to bypass RLS and manage users
const getAdminClient = () => {
  if (!supabaseServiceKey) return null;
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
};

/**
 * Create a new Supabase Auth user using the service-role client and revalidate the admin users page.
 *
 * Extracts `full_name`, `email`, `password`, and `role` from `formData`, creates an authenticated user with
 * `email_confirm` set to true and `user_metadata` populated, then triggers a revalidation of "/admin/users".
 *
 * @param formData - Form data containing the fields:
 *   - `full_name`: user's full name
 *   - `email`: user's email address
 *   - `password`: user's password
 *   - `role`: application role or metadata for the user
 * @returns `{ success: true }` on successful creation; otherwise `{ error: string }` describing the failure.
 */
export async function createUser(formData: FormData) {
  const full_name = formData.get("full_name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const role = formData.get("role") as any;

  const adminClient = getAdminClient();

  if (!adminClient) {
    return { error: "Service role key missing. Administrative actions disabled." };
  }

  try {
    // 1. Create User in Auth
    const { data: authData, error: authError } = await adminClient.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name, role }
    });

    if (authError) throw authError;

    // Note: The 'handle_new_user' trigger in SQL should automatically create the profile.
    // If not, we could manually insert here.

    revalidatePath("/admin/users");
    return { success: true };
  } catch (error: any) {
    console.error("Error creating user:", error);
    return { error: error.message || "Failed to create user" };
  }
}
