"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

/**
 * Create a new module associated with a course.
 *
 * Creates a module using `title` and `order` extracted from `formData`, inserts it into the `modules` table, and triggers revalidation for the course page on success.
 *
 * @param courseId - The ID of the course to attach the new module to
 * @param formData - FormData containing:
 *   - `title` (string): the module title
 *   - `order` (string | number): the module order (parsed as integer, defaults to `0` if missing)
 * @returns An object with `{ success: true }` on successful insertion, or `{ error: string }` if the insertion failed
 */
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

/**
 * Deletes a module by ID and revalidates the associated course page on success.
 *
 * @returns `{ success: true }` when the module was deleted and the course path was revalidated, or `{ error: string }` if the deletion failed
 */
export async function deleteModule(courseId: string, moduleId: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("modules").delete().eq("id", moduleId);
  if (error) return { error: error.message };
  revalidatePath(`/teaching/courses/${courseId}`);
  return { success: true };
}

/**
 * Create a lesson record for a module and revalidate the course page.
 *
 * The provided FormData must include the following fields: `title` (string), `type` ('VIDEO' | 'PDF' | 'QUIZ' | 'PPT'), `content_url` (string), `order` (string parseable as an integer, defaults to "0"), and `duration` (string).
 *
 * @param formData - FormData containing `title`, `type`, `content_url`, `order`, and `duration`
 * @returns An object with `{ success: true }` on successful insertion, or `{ error: string }` if the database operation fails
 */
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

/**
 * Delete a lesson record and revalidate the corresponding course page.
 *
 * @param courseId - The course id used to revalidate the course path after deletion
 * @param lessonId - The id of the lesson to delete
 * @returns An object with `{ error: string }` if the deletion failed, or `{ success: true }` on success
 */
export async function deleteLesson(courseId: string, lessonId: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("lessons").delete().eq("id", lessonId);
  if (error) return { error: error.message };
  revalidatePath(`/teaching/courses/${courseId}`);
  return { success: true };
}
