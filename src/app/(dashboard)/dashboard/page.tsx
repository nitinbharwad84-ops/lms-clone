import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatCards from "@/components/dashboard/StatCards";
import QuickActions from "@/components/dashboard/QuickActions";
import SubjectList from "@/components/dashboard/SubjectList";
import DashboardCalendar from "@/components/dashboard/DashboardCalendar";
import { ChevronRight, BookOpen, Calendar as CalendarIcon } from "lucide-react";
import { createClient } from "@/utils/supabase/server";

/**
 * Render the dashboard page for the currently signed-in user by loading their profile and enrolled courses.
 *
 * Loads the authenticated user, fetches the user's profile and enrollments (including related course data),
 * transforms enrollments into a courses array that includes `progress` and a computed `status`, and renders
 * the dashboard layout (header, quick actions, enrolled program banner, subject list, and calendar).
 *
 * @returns The React element for the dashboard page.
 */
export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Fetch profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user?.id)
    .single();

  // Fetch enrollments and courses
  const { data: enrollments } = await supabase
    .from("enrollments")
    .select("*, courses(*)")
    .eq("student_id", user?.id);

  const courses = enrollments?.map(e => ({
    ...e.courses,
    progress: e.progress,
    status: e.progress === 0 ? "NOT STARTED" : e.progress === 100 ? "COMPLETED" : "IN PROGRESS"
  })) || [];

  return (
    <div className="flex gap-8">
      {/* Main Content */}
      <div className="flex-1 min-w-0">
        <DashboardHeader user={profile} />
        <QuickActions />
        
        <div className="mb-8 p-8 bg-[#ebf3ff] rounded-3xl border border-blue-100 relative overflow-hidden flex items-center justify-between group">
          <div className="relative z-10 flex items-center gap-6">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm border border-blue-50">
               <BookOpen size={32} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-blue-600/60 uppercase tracking-widest mb-1">You are currently enrolled in</p>
              <h2 className="text-xl font-black text-blue-900 leading-tight">Bachelor of Computer Application - Online</h2>
              <p className="text-sm text-blue-700/70 font-medium">Parul University</p>
            </div>
          </div>

          <div className="flex items-center gap-4 relative z-10">
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-md px-4 py-2 rounded-xl text-xs font-bold text-blue-700 border border-white/40">
               <CalendarIcon size={14} />
               1st Year
            </div>
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-md px-4 py-2 rounded-xl text-xs font-bold text-blue-700 border border-white/40">
               <BookOpen size={14} />
               2nd Sem
            </div>
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-2.5 rounded-xl text-xs font-bold text-white shadow-xl shadow-blue-600/30 transition-all hover:scale-105 active:scale-95 group">
              <BookOpen size={14} />
              {courses.length} Courses
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-blue-400/10 to-transparent pointer-events-none" />
        </div>

        <SubjectList courses={courses} />
      </div>

      {/* Right Sidebar */}
      <DashboardCalendar />
    </div>
  );
}
