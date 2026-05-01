"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function signIn(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const role = formData.get("role") as string;

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  // Fetch profile to verify role
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", data.user.id)
    .single();

  if (!profile || profile.role !== role) {
    // If roles don't match, sign out and error
    await supabase.auth.signOut();
    return { error: "Unauthorized access for this role." };
  }

  // Redirect based on role
  if (profile.role === "ADMIN") {
    redirect("/admin/dashboard");
  } else if (profile.role === "TEACHER") {
    redirect("/teaching/courses");
  } else {
    redirect("/dashboard");
  }
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
