"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function saveVivaMarks(formData: FormData) {
  const supabase = await createClient();
  const { data: { user: authUser } } = await supabase.auth.getUser();

  if (!authUser) return { error: "Unauthorized" };

  const student_id = formData.get("student_id") as string;
  const course_id = formData.get("course_id") as string;
  const marks = parseInt(formData.get("marks") as string);
  const feedback = formData.get("feedback") as string;

  try {
    const { data, error } = await supabase
      .from("viva_marks")
      .upsert({ 
        student_id, 
        course_id, 
        teacher_id: authUser.id,
        marks,
        feedback,
        created_at: new Date().toISOString()
      }, {
        onConflict: 'student_id, course_id'
      })
      .select()
      .single();

    if (error) throw error;

    revalidatePath("/teaching/assessments");
    return { success: true, data };
  } catch (error: any) {
    console.error("Error saving marks:", error);
    return { error: error.message || "Failed to save marks" };
  }
}
