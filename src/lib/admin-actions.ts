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

export async function deleteUser(userId: string) {
  const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);
  
  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/users");
  return { success: true };
}
