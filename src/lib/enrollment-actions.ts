"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function createEnrollment(formData: FormData) {
  const supabase = await createClient();

  const student_id = formData.get("student_id") as string;
  const course_id = formData.get("course_id") as string;

  try {
    const { data, error } = await supabase
      .from("enrollments")
      .insert([
        { 
          student_id, 
          course_id,
          progress: 0,
          last_accessed_at: new Date().toISOString()
        }
      ])
      .select()
      .single();

    if (error) {
      if (error.code === '23505') {
        return { error: "Student is already enrolled in this course." };
      }
      throw error;
    }

    revalidatePath("/admin/enrollments");
    return { success: true, data };
  } catch (error: any) {
    console.error("Error creating enrollment:", error);
    return { error: error.message || "Failed to complete enrollment" };
  }
}
