import { createClient } from "@/utils/supabase/server";
import { BookOpen, User, ExternalLink, Settings2 } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function TeachingCoursesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // Fetch courses assigned to this teacher
  const { data: courses, error } = await supabase
    .from("courses")
    .select("*")
    .eq("teacher_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Teaching Dashboard</h1>
        <p className="text-sm text-gray-500 font-medium mt-1">Manage your assigned courses, create modules, and upload lessons.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {!courses || courses.length === 0 ? (
          <div className="col-span-full py-20 text-center bg-white rounded-[40px] border border-gray-100 shadow-sm">
             <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="text-gray-300" size={32} />
             </div>
             <p className="text-gray-400 font-black uppercase tracking-widest text-sm">No courses assigned to you yet.</p>
             <p className="text-xs text-gray-400 mt-2">Contact the administrator if you believe this is an error.</p>
          </div>
        ) : (
          courses.map((course) => (
            <div key={course.id} className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden group hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500 flex flex-col">
              <div className="h-48 bg-gray-100 relative overflow-hidden">
                {course.thumbnail_url ? (
                  <img src={course.thumbnail_url} alt={course.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-blue-50 text-blue-200">
                    <BookOpen size={48} />
                  </div>
                )}
                <div className="absolute top-4 right-4">
                   <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl text-[10px] font-black text-blue-600 uppercase tracking-widest shadow-sm flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                      Live
                   </div>
                </div>
              </div>

              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-lg font-black text-gray-900 mb-2 leading-tight uppercase tracking-tight group-hover:text-blue-600 transition-colors">
                  {course.title}
                </h3>
                <p className="text-sm text-gray-500 font-medium line-clamp-2 mb-8">
                  {course.description || "No description provided."}
                </p>

                <div className="mt-auto flex items-center gap-3">
                   <Link 
                    href={`/teaching/courses/${course.id}`}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-4 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-blue-600/20 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
                   >
                     <Settings2 size={16} />
                     Manage Content
                   </Link>
                   <button className="p-4 bg-gray-50 hover:bg-gray-100 text-gray-400 hover:text-gray-900 rounded-2xl transition-colors">
                      <ExternalLink size={18} />
                   </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
