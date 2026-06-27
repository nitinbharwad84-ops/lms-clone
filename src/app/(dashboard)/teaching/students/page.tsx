import { createClient } from "@/utils/supabase/server";
import { 
  Users, 
  Search, 
  Filter, 
  Mail, 
  Phone,
  GraduationCap,
  BookOpen,
  ChevronRight,
  UserCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

/**
 * Render a teacher's student directory page showing unique students enrolled in the teacher's courses.
 *
 * Fetches the current authenticated user, loads enrollments for courses taught by that user, deduplicates students by student id, and renders a table with each student's avatar, name, email, roll number, performance, attendance, and a link to their profile. Returns `null` when no authenticated user is present.
 *
 * @returns A JSX element containing the student directory UI, or `null` if there is no authenticated user.
 */
export default async function TeacherStudentsPage() {
  const supabase = await createClient();
  const { data: { user: authUser } } = await supabase.auth.getUser();

  if (!authUser) return null;

  // Fetch students enrolled in courses taught by this teacher
  const { data: students, error } = await supabase
    .from("enrollments")
    .select(`
      *,
      student:profiles!student_id(*),
      course:courses!inner(title, teacher_id)
    `)
    .eq("course.teacher_id", authUser.id);

  // Group by student to avoid duplicates if they are in multiple courses
  const uniqueStudents = Array.from(new Map(students?.map(s => [s.student.id, s.student])).values());

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm relative overflow-hidden group">
        <div className="relative z-10">
          <h1 className="text-3xl font-black text-[#171b26] tracking-tight">Student Directory</h1>
          <p className="text-sm text-gray-500 font-medium mt-1">Manage and track the progress of students enrolled in your courses.</p>
        </div>
        
        <div className="flex items-center gap-4 relative z-10">
           <div className="bg-blue-600 text-white px-6 py-3 rounded-2xl flex items-center gap-3 shadow-xl shadow-blue-600/20">
              <Users size={20} />
              <span className="text-xs font-black uppercase tracking-widest">{uniqueStudents.length} Active Students</span>
           </div>
        </div>

        <div className="absolute top-[-50%] right-[-10%] w-64 h-64 bg-blue-50 rounded-full blur-[80px] opacity-50 group-hover:opacity-80 transition-opacity" />
      </div>

      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/20">
           <div className="relative group flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={16} />
              <input 
                type="text" 
                placeholder="Search students by name or roll number..." 
                className="bg-white border border-gray-200 focus:border-blue-600/20 rounded-xl py-2.5 pl-10 pr-6 text-xs font-bold outline-none transition-all w-full shadow-sm"
              />
           </div>
           
           <button className="flex items-center gap-2 px-6 py-2.5 bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 rounded-xl transition-all shadow-sm text-[10px] font-black uppercase tracking-widest">
              <Filter size={14} />
              Filter by Course
           </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/30">
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Student Information</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Roll Number</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Performance</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Attendance</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">View Profile</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {uniqueStudents.map((student: any) => (
                <tr key={student.id} className="group hover:bg-gray-50/50 transition-colors cursor-pointer">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-gray-100 border border-gray-200 overflow-hidden flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                         {student.avatar_url ? (
                           <img src={student.avatar_url} className="w-full h-full object-cover" />
                         ) : (
                           <UserCircle className="text-gray-300" size={28} />
                         )}
                      </div>
                      <div>
                        <p className="text-sm font-black text-[#171b26] uppercase tracking-tight group-hover:text-blue-600 transition-colors">
                          {student.full_name}
                        </p>
                        <p className="text-[10px] font-bold text-gray-400 flex items-center gap-1.5 mt-0.5">
                          <Mail size={10} />
                          {student.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-xs font-black text-[#171b26] tracking-widest">{student.roll_number}</span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full bg-emerald-500" />
                       <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Excellent</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                       <span className="text-[10px] font-black text-[#171b26]">92%</span>
                       <div className="w-16 h-1 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full" style={{ width: '92%' }} />
                       </div>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <Link href={`/teaching/students/${student.id}`} className="inline-flex items-center justify-center w-10 h-10 bg-gray-50 text-gray-400 group-hover:text-blue-600 group-hover:bg-blue-50 rounded-xl transition-all">
                       <ChevronRight size={18} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
