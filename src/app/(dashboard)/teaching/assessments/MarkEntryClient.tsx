"use client";

import { useState } from "react";
import { 
  Plus, 
  X, 
  Award, 
  AlignLeft, 
  AlertCircle,
  Loader2,
  CheckCircle2,
  Edit3,
  ClipboardCheck
} from "lucide-react";
import { cn } from "@/lib/utils";
import { saveVivaMarks } from "@/lib/assessment-actions";
import { useRouter } from "next/navigation";

interface MarkEntryClientProps {
  studentId: string;
  courseId: string;
  studentName: string;
  courseName: string;
  existingMark?: {
    marks: number;
    feedback: string;
  };
}

/**
 * Renders an action button and modal for entering or updating a student's viva marks and feedback.
 *
 * @param studentId - The student's identifier included in the submission payload.
 * @param courseId - The course identifier included in the submission payload.
 * @param studentName - Display name of the student shown in the modal header.
 * @param courseName - Display name of the course shown in the modal.
 * @param existingMark - Optional existing assessment used to prefill `marks` and `feedback`; when present the trigger shows an edit state.
 * @returns A React element containing the trigger button and the viva mark entry modal.
 */
export default function MarkEntryClient({ 
  studentId, 
  courseId, 
  studentName, 
  courseName,
  existingMark 
}: MarkEntryClientProps) {
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
    formData.append("student_id", studentId);
    formData.append("course_id", courseId);

    const result = await saveVivaMarks(formData);

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
        className={cn(
          "p-2.5 rounded-xl transition-all shadow-sm",
          existingMark 
            ? "bg-gray-50 text-gray-400 hover:text-blue-600 hover:bg-blue-50" 
            : "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-600/20"
        )}
      >
        {existingMark ? <Edit3 size={18} /> : <Plus size={18} />}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 text-left">
          <div className="absolute inset-0 bg-[#171b26]/60 backdrop-blur-sm" onClick={() => !loading && setIsOpen(false)} />
          
          <div className="bg-white w-full max-w-xl rounded-[40px] shadow-2xl relative z-10 overflow-hidden animate-in fade-in zoom-in duration-300">
             <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
                <div>
                   <h2 className="text-2xl font-black text-[#171b26] tracking-tight">Viva Mark Entry</h2>
                   <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1">Evaluating: {studentName}</p>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-3 text-gray-400 hover:text-[#171b26] hover:bg-white rounded-2xl transition-all"
                >
                   <X size={20} />
                </button>
             </div>

             <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl">
                   <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest mb-1">Subject / Course</p>
                   <p className="text-sm font-bold text-[#171b26] uppercase">{courseName}</p>
                </div>

                {error && (
                   <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-3 text-red-600">
                      <AlertCircle size={18} className="shrink-0 mt-0.5" />
                      <p className="text-[11px] font-bold uppercase tracking-widest">{error}</p>
                   </div>
                )}

                {success && (
                   <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-start gap-3 text-emerald-600">
                      <CheckCircle2 size={18} className="shrink-0 mt-0.5" />
                      <p className="text-[11px] font-bold uppercase tracking-widest">Marks updated successfully!</p>
                   </div>
                )}

                <div className="space-y-2">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Assessment Score (0-100)</label>
                   <div className="relative group">
                      <Award className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                      <input 
                        required
                        name="marks"
                        type="number" 
                        min="0"
                        max="100"
                        defaultValue={existingMark?.marks}
                        placeholder="Enter score" 
                        className="w-full bg-gray-50 border-2 border-transparent focus:bg-white focus:border-blue-600/20 rounded-2xl py-3.5 pl-12 pr-6 text-lg font-black outline-none transition-all shadow-sm"
                      />
                   </div>
                </div>

                <div className="space-y-2">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Faculty Feedback</label>
                   <div className="relative group">
                      <AlignLeft className="absolute left-4 top-4 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                      <textarea 
                        name="feedback"
                        rows={4}
                        defaultValue={existingMark?.feedback}
                        placeholder="Provide observations on student's conceptual clarity, communication, and subject knowledge..." 
                        className="w-full bg-gray-50 border-2 border-transparent focus:bg-white focus:border-blue-600/20 rounded-2xl py-3.5 pl-12 pr-6 text-sm font-bold outline-none transition-all shadow-sm resize-none"
                      />
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
                     className="flex-[2] flex items-center justify-center gap-3 px-8 py-4 bg-[#171b26] text-white rounded-[22px] text-xs font-black uppercase tracking-widest hover:bg-black transition-all shadow-2xl shadow-black/20 disabled:opacity-50"
                   >
                      {loading ? (
                         <>
                            <Loader2 size={18} className="animate-spin" />
                            Saving...
                         </>
                      ) : (
                         <>
                            <ClipboardCheck size={18} />
                            {existingMark ? "Update Marks" : "Save Assessment"}
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
