import { createClient } from "@/utils/supabase/server";
import { 
  Search, 
  Filter, 
  BookPlus, 
  MoreVertical,
  User,
  Layers,
  Clock,
  ExternalLink,
  Edit,
  Trash
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import CourseManagementClient from "./CourseManagementClient";

/**
 * Render the Course Management dashboard page.
 *
 * Renders a dashboard UI that lists courses as cards and includes a CourseManagementClient populated with teacher profiles. Each course card shows a thumbnail (or fallback icon), title, module count, instructor avatar/name (or "Unassigned"), and a link to the course teaching route.
 *
 * @returns The page's JSX element representing the Course Management dashboard.
 */
export default async function CourseManagementPage() {
  const supabase = await createClient();

  const { data: courses, error } = await supabase
    .from("courses")
    .select(`
      *,
      teacher:profiles(full_name, avatar_url),
      modules(count)
    `)
    .order("created_at", { ascending: false });

  const { data: teachers } = await supabase
    .from("profiles")
    .select("id, full_name")
    .eq("role", "TEACHER");

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-3xl font-black text-[#171b26] tracking-tight">Course Management</h1>
          <p className="text-sm text-gray-500 font-medium mt-1">Design curricula, assign faculty, and oversee academic content delivery.</p>
        </div>
        
        <CourseManagementClient teachers={teachers || []} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses?.map((course: any) => (
          <div key={course.id} className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden group hover:shadow-2xl hover:translate-y-[-4px] transition-all flex flex-col">
            <div className="aspect-video relative overflow-hidden bg-gray-100">
               {course.thumbnail_url ? (
                 <img src={course.thumbnail_url} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
               ) : (
                 <div className="w-full h-full flex items-center justify-center text-gray-300">
                    <BookPlus size={48} />
                 </div>
               )}
               <div className="absolute top-4 right-4 flex gap-2">
                  <button className="p-2 bg-white/90 backdrop-blur-md rounded-xl text-gray-600 hover:text-blue-600 shadow-lg transition-colors">
                     <Edit size={16} />
                  </button>
                  <button className="p-2 bg-white/90 backdrop-blur-md rounded-xl text-gray-600 hover:text-red-600 shadow-lg transition-colors">
                     <Trash size={16} />
                  </button>
               </div>
            </div>

            <div className="p-8 flex-1 flex flex-col gap-6">
               <div>
                  <h3 className="text-lg font-black text-[#171b26] uppercase tracking-tight leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
                    {course.title}
                  </h3>
                  <div className="flex items-center gap-4 mt-4">
                     <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-blue-100/50">
                        <Layers size={12} />
                        {course.modules?.[0]?.count || 0} Modules
                     </div>
                     <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 text-gray-500 rounded-lg text-[10px] font-black uppercase tracking-widest border border-gray-100">
                        <Clock size={12} />
                        8 Weeks
                     </div>
                  </div>
               </div>

               <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                     <div className="w-9 h-9 rounded-full bg-gray-100 border border-gray-200 overflow-hidden flex items-center justify-center">
                        {course.teacher?.avatar_url ? (
                           <img src={course.teacher.avatar_url} className="w-full h-full object-cover" />
                        ) : (
                           <User className="text-gray-300" size={18} />
                        )}
                     </div>
                     <div>
                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Instructor</p>
                        <p className="text-[11px] font-bold text-[#171b26] uppercase truncate max-w-[120px]">{course.teacher?.full_name || "Unassigned"}</p>
                     </div>
                  </div>
                  
                  <Link href={`/teaching/courses/${course.id}`} className="p-2.5 bg-gray-50 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all shadow-sm">
                     <ExternalLink size={18} />
                  </Link>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
