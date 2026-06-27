import { createClient } from "@/utils/supabase/server";
import { 
  ClipboardCheck, 
  Search, 
  Filter, 
  Award,
  BookOpen,
  User,
  ChevronRight,
  Plus
} from "lucide-react";
import { cn } from "@/lib/utils";
import MarkEntryClient from "./MarkEntryClient";

/**
 * Renders the teacher-facing "Assessment Hub" dashboard for viewing courses, student enrollments, and viva marks.
 *
 * The page displays a searchable, course-filterable table of students with current status, viva scores, and actions to enter or edit marks. If no authenticated user is present, the component returns `null`.
 *
 * @returns A React element for the teacher assessments dashboard, or `null` when there is no authenticated user.
 */
export default async function TeacherAssessmentsPage() {
  const supabase = await createClient();
  const { data: { user: authUser } } = await supabase.auth.getUser();

  if (!authUser) return null;

  // Fetch courses taught by this teacher to populate the filter
  const { data: courses } = await supabase
    .from("courses")
    .select("id, title")
    .eq("teacher_id", authUser.id);

  // Fetch enrollments with existing viva marks
  const { data: students } = await supabase
    .from("enrollments")
    .select(`
      *,
      student:profiles!student_id(id, full_name, roll_number, avatar_url),
      course:courses!inner(id, title, teacher_id),
      viva_marks:viva_marks(marks, feedback)
    `)
    .eq("course.teacher_id", authUser.id);

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm relative overflow-hidden group">
        <div className="relative z-10">
          <h1 className="text-3xl font-black text-[#171b26] tracking-tight">Assessment Hub</h1>
          <p className="text-sm text-gray-500 font-medium mt-1">Manage examinations, enter viva marks, and publish student performance reports.</p>
        </div>
        
        <div className="flex items-center gap-4 relative z-10">
           <div className="bg-[#171b26] text-white px-6 py-3 rounded-2xl flex items-center gap-3 shadow-xl shadow-black/20">
              <ClipboardCheck size={20} />
              <span className="text-xs font-black uppercase tracking-widest">Mark Entry Open</span>
           </div>
        </div>

        <div className="absolute top-[-50%] right-[-10%] w-64 h-64 bg-emerald-50 rounded-full blur-[80px] opacity-50 group-hover:opacity-80 transition-opacity" />
      </div>

      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/20">
           <div className="flex items-center gap-4 flex-1 max-w-xl">
              <div className="relative group flex-1">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={16} />
                 <input 
                   type="text" 
                   placeholder="Search students..." 
                   className="bg-white border border-gray-200 focus:border-blue-600/20 rounded-xl py-2.5 pl-10 pr-6 text-xs font-bold outline-none transition-all w-full shadow-sm"
                 />
              </div>
              <select className="bg-white border border-gray-200 rounded-xl py-2.5 px-4 text-[10px] font-black uppercase tracking-widest outline-none transition-all shadow-sm cursor-pointer min-w-[200px]">
                 <option value="">All My Courses</option>
                 {courses?.map(c => (
                    <option key={c.id} value={c.id}>{c.title}</option>
                 ))}
              </select>
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/30">
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Student Information</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Course</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Current Status</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Viva Marks</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {students?.map((item: any) => {
                const mark = item.viva_marks?.[0];
                return (
                  <tr key={`${item.student.id}-${item.course.id}`} className="group hover:bg-gray-50/50 transition-colors">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-gray-100 border border-gray-200 overflow-hidden flex items-center justify-center shrink-0">
                           {item.student.avatar_url ? (
                             <img src={item.student.avatar_url} className="w-full h-full object-cover" />
                           ) : (
                             <User className="text-gray-300" size={20} />
                           )}
                        </div>
                        <div>
                          <p className="text-sm font-black text-[#171b26] uppercase tracking-tight">
                            {item.student.full_name}
                          </p>
                          <p className="text-[9px] font-black text-gray-400 tracking-[0.1em] mt-0.5 uppercase">
                            {item.student.roll_number}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2">
                         <BookOpen size={14} className="text-gray-400" />
                         <span className="text-[11px] font-bold text-gray-700 uppercase line-clamp-1 max-w-[200px]">{item.course.title}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-center">
                      <span className={cn(
                        "px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest",
                        mark ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-orange-50 text-orange-600 border border-orange-100"
                      )}>
                        {mark ? "Completed" : "Pending"}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-center">
                      <div className="flex items-center justify-center gap-2">
                         {mark ? (
                            <span className="text-lg font-black text-[#171b26]">{mark.marks}<span className="text-[10px] text-gray-400 ml-0.5">/100</span></span>
                         ) : (
                            <span className="text-lg font-black text-gray-300">--</span>
                         )}
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                       <MarkEntryClient 
                         studentId={item.student.id} 
                         courseId={item.course.id}
                         studentName={item.student.full_name}
                         courseName={item.course.title}
                         existingMark={mark}
                       />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
