"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function createCourse(formData: FormData) {
  const supabase = await createClient();

  const title = formData.get("title") as string;
  const teacher_id = formData.get("teacher_id") as string;
  const thumbnail_url = formData.get("thumbnail_url") as string;
  const description = formData.get("description") as string;

  try {
    const { data, error } = await supabase
      .from("courses")
      .insert([
        { 
          title, 
          teacher_id: teacher_id || null, 
          thumbnail_url: thumbnail_url || null, 
          description 
        }
      ])
      .select()
      .single();

    if (error) throw error;

    revalidatePath("/admin/courses");
    return { success: true, data };
  } catch (error: any) {
    console.error("Error creating course:", error);
    return { error: error.message || "Failed to create course" };
  }
}
