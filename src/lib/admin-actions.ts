"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

/**
 * Create a new Supabase auth user and (optionally) set their profile roll number.
 *
 * Creates an auth user with the provided email, password, full_name, and role, marks the email confirmed, and stores full_name and role in user metadata. If `roll_number` is present in `formData`, updates the `profiles.roll_number` for the created user. Revalidates the "/admin/users" path on success.
 *
 * @param formData - FormData containing "email", "password", "full_name", "role" ('STUDENT' | 'TEACHER' | 'ADMIN'), and optional "roll_number"
 * @returns `{ success: true }` on success, or `{ error: string }` with an error message when user creation fails.
 */
export async function createUser(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const full_name = formData.get("full_name") as string;
  const role = formData.get("role") as 'STUDENT' | 'TEACHER' | 'ADMIN';
  const roll_number = formData.get("roll_number") as string;

  // 1. Create user in auth.users
  const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { full_name, role }
  });

  if (authError) {
    return { error: authError.message };
  }

  // 2. Profile creation is handled by DB trigger, 
  // but we might want to update additional fields like roll_number
  if (roll_number) {
    const { error: profileError } = await supabaseAdmin
      .from("profiles")
      .update({ roll_number })
      .eq("id", authUser.user.id);

    if (profileError) {
      console.error("Error updating profile roll number:", profileError);
    }
  }

  revalidatePath("/admin/users");
  return { success: true };
}

/**
 * Delete a Supabase auth user by ID and revalidate the admin users page.
 *
 * This removes the user from Supabase Auth and, on success, calls revalidatePath("/admin/users")
 * to refresh the admin users listing.
 *
 * @param userId - The Supabase auth user's `id` to delete
 * @returns `{ error: string }` if deletion failed, `{ success: true }` on success
 */
export async function deleteUser(userId: string) {
  const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);
  
  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/users");
  return { success: true };
}
