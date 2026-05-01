"use client";

import { useState } from "react";
import { 
  UserCheck, 
  X, 
  GraduationCap, 
  BookOpen, 
  AlertCircle,
  Loader2,
  CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createEnrollment } from "@/lib/enrollment-actions";
import { useRouter } from "next/navigation";

interface EnrollmentManagementClientProps {
  students: { id: string, full_name: string, roll_number: string }[];
  courses: { id: string, title: string }[];
}

export default function EnrollmentManagementClient({ students, courses }: EnrollmentManagementClientProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    const result = await createEnrollment(formData);

    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      setSuccess(true);
      setTimeout(() => {
        setIsOpen(false);
        setSuccess(false);
        setLoading(false);
        router.refresh();
      }, 1500);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-[22px] text-xs font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-2xl shadow-blue-600/20"
      >
        <UserCheck size={18} />
        New Enrollment
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#171b26]/60 backdrop-blur-sm" onClick={() => !loading && setIsOpen(false)} />
          
          <div className="bg-white w-full max-w-xl rounded-[40px] shadow-2xl relative z-10 overflow-hidden animate-in fade-in zoom-in duration-300">
             <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
                <div>
                   <h2 className="text-2xl font-black text-[#171b26] tracking-tight">Assign Course</h2>
                   <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Enroll a student into a new academic program</p>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-3 text-gray-400 hover:text-[#171b26] hover:bg-white rounded-2xl transition-all"
                >
                   <X size={20} />
                </button>
             </div>

             <form onSubmit={handleSubmit} className="p-8 space-y-6">
                {error && (
                   <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-3 text-red-600">
                      <AlertCircle size={18} className="shrink-0 mt-0.5" />
                      <p className="text-[11px] font-bold uppercase tracking-widest">{error}</p>
                   </div>
                )}

                {success && (
                   <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-start gap-3 text-emerald-600">
                      <CheckCircle2 size={18} className="shrink-0 mt-0.5" />
                      <p className="text-[11px] font-bold uppercase tracking-widest">Enrollment complete!</p>
                   </div>
                )}

                <div className="space-y-2">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Select Student</label>
                   <div className="relative group">
                      <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                      <select 
                        required
                        name="student_id"
                        className="w-full bg-gray-50 border-2 border-transparent focus:bg-white focus:border-blue-600/20 rounded-2xl py-3.5 pl-12 pr-6 text-sm font-bold outline-none transition-all appearance-none shadow-sm cursor-pointer"
                      >
                         <option value="">Choose a student</option>
                         {students.map(s => (
                            <option key={s.id} value={s.id}>{s.full_name} ({s.roll_number})</option>
                         ))}
                      </select>
                   </div>
                </div>

                <div className="space-y-2">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Select Course</label>
                   <div className="relative group">
                      <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                      <select 
                        required
                        name="course_id"
                        className="w-full bg-gray-50 border-2 border-transparent focus:bg-white focus:border-blue-600/20 rounded-2xl py-3.5 pl-12 pr-6 text-sm font-bold outline-none transition-all appearance-none shadow-sm cursor-pointer"
                      >
                         <option value="">Choose a course</option>
                         {courses.map(c => (
                            <option key={c.id} value={c.id}>{c.title}</option>
                         ))}
                      </select>
                   </div>
                </div>

                <div className="pt-4 flex items-center gap-4">
                   <button 
                     type="button"
                     onClick={() => setIsOpen(false)}
                     disabled={loading}
                     className="flex-1 px-8 py-4 bg-gray-50 text-gray-400 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-gray-100 transition-all"
                   >
                      Cancel
                   </button>
                   <button 
                     type="submit"
                     disabled={loading}
                     className="flex-[2] flex items-center justify-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-[22px] text-xs font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-2xl shadow-blue-600/20 disabled:opacity-50"
                   >
                      {loading ? (
                         <>
                            <Loader2 size={18} className="animate-spin" />
                            Enrolling...
                         </>
                      ) : (
                         <>
                            <UserCheck size={18} />
                            Complete Enrollment
                         </>
                      )}
                   </button>
                </div>
             </form>
          </div>
        </div>
      )}
    </>
  );
}
