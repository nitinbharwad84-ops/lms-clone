"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

// Modules
export async function createModule(courseId: string, formData: FormData) {
  const supabase = await createClient();
  const title = formData.get("title") as string;
  const order = parseInt(formData.get("order") as string || "0");

  const { error } = await supabase
    .from("modules")
    .insert({ course_id: courseId, title, order });

  if (error) return { error: error.message };
  revalidatePath(`/teaching/courses/${courseId}`);
  return { success: true };
}

export async function deleteModule(courseId: string, moduleId: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("modules").delete().eq("id", moduleId);
  if (error) return { error: error.message };
  revalidatePath(`/teaching/courses/${courseId}`);
  return { success: true };
}

// Lessons
export async function createLesson(courseId: string, moduleId: string, formData: FormData) {
  const supabase = await createClient();
  const title = formData.get("title") as string;
  const type = formData.get("type") as 'VIDEO' | 'PDF' | 'QUIZ' | 'PPT';
  const content_url = formData.get("content_url") as string;
  const order = parseInt(formData.get("order") as string || "0");
  const duration = formData.get("duration") as string;

  const { error } = await supabase
    .from("lessons")
    .insert({ module_id: moduleId, title, type, content_url, "order": order, duration });

  if (error) return { error: error.message };
  revalidatePath(`/teaching/courses/${courseId}`);
  return { success: true };
}

export async function deleteLesson(courseId: string, lessonId: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("lessons").delete().eq("id", lessonId);
  if (error) return { error: error.message };
  revalidatePath(`/teaching/courses/${courseId}`);
  return { success: true };
}
