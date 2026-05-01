import { createClient } from "@/utils/supabase/server";
import { 
  UserCheck, 
  Search, 
  Filter, 
  Trash2,
  Clock,
  BookOpen,
  User,
  GraduationCap
} from "lucide-react";
import { cn } from "@/lib/utils";
import EnrollmentManagementClient from "./EnrollmentManagementClient";

export default async function EnrollmentPage() {
  const supabase = await createClient();

  const { data: enrollments } = await supabase
    .from("enrollments")
    .select(`
      *,
      student:profiles!student_id(full_name, email, roll_number),
      course:courses(title)
    `)
    .order("last_accessed_at", { ascending: false });

  const { data: students } = await supabase
    .from("profiles")
    .select("id, full_name, roll_number")
    .eq("role", "STUDENT");

  const { data: courses } = await supabase
    .from("courses")
    .select("id, title");

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-3xl font-black text-[#171b26] tracking-tight">Enrollment Management</h1>
          <p className="text-sm text-gray-500 font-medium mt-1">Assign students to specific courses and track their academic onboarding.</p>
        </div>
        
        <EnrollmentManagementClient students={students || []} courses={courses || []} />
      </div>

      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/30">
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Student Details</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Enrolled Course</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Progress</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Last Activity</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {enrollments?.map((enrollment: any) => (
                <tr key={enrollment.id} className="group hover:bg-gray-50/50 transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100">
                         <GraduationCap size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-black text-[#171b26] uppercase tracking-tight group-hover:text-blue-600 transition-colors">
                          {enrollment.student?.full_name}
                        </p>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">
                          {enrollment.student?.roll_number}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                       <BookOpen size={16} className="text-gray-400" />
                       <span className="text-xs font-bold text-gray-700 uppercase">{enrollment.course?.title}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                       <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-600 rounded-full" style={{ width: `${enrollment.progress}%` }} />
                       </div>
                       <span className="text-[10px] font-black text-[#171b26]">{enrollment.progress}%</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2 text-gray-400">
                       <Clock size={14} />
                       <span className="text-[10px] font-black uppercase tracking-widest">
                          {new Date(enrollment.last_accessed_at).toLocaleDateString()}
                       </span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all">
                       <Trash2 size={18} />
                    </button>
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
