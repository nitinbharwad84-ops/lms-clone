"use client";

import { useState } from "react";
import { 
  BookPlus, 
  X, 
  BookOpen, 
  User, 
  Image, 
  AlignLeft, 
  AlertCircle,
  Loader2,
  CheckCircle2,
  Upload
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createCourse } from "@/lib/course-actions";
import { useRouter } from "next/navigation";

interface CourseManagementClientProps {
  teachers: { id: string, full_name: string }[];
}

export default function CourseManagementClient({ teachers }: CourseManagementClientProps) {
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
    const result = await createCourse(formData);

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
        <BookPlus size={18} />
        Add New Course
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#171b26]/60 backdrop-blur-sm" onClick={() => !loading && setIsOpen(false)} />
          
          <div className="bg-white w-full max-w-xl rounded-[40px] shadow-2xl relative z-10 overflow-hidden animate-in fade-in zoom-in duration-300">
             <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
                <div>
                   <h2 className="text-2xl font-black text-[#171b26] tracking-tight">Create Curriculum</h2>
                   <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Design a new course and assign a lead instructor</p>
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
                      <p className="text-[11px] font-bold uppercase tracking-widest">Course created successfully!</p>
                   </div>
                )}

                <div className="space-y-2">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Course Title</label>
                   <div className="relative group">
                      <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                      <input 
                        required
                        name="title"
                        type="text" 
                        placeholder="e.g. Advanced Web Architecture" 
                        className="w-full bg-gray-50 border-2 border-transparent focus:bg-white focus:border-blue-600/20 rounded-2xl py-3.5 pl-12 pr-6 text-sm font-bold outline-none transition-all shadow-sm"
                      />
                   </div>
                </div>

                <div className="space-y-2">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Assigned Teacher</label>
                   <div className="relative group">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                      <select 
                        required
                        name="teacher_id"
                        className="w-full bg-gray-50 border-2 border-transparent focus:bg-white focus:border-blue-600/20 rounded-2xl py-3.5 pl-12 pr-6 text-sm font-bold outline-none transition-all appearance-none shadow-sm cursor-pointer"
                      >
                         <option value="">Select an instructor</option>
                         {teachers.map(t => (
                            <option key={t.id} value={t.id}>{t.full_name}</option>
                         ))}
                      </select>
                   </div>
                </div>

                <div className="space-y-2">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Thumbnail URL</label>
                   <div className="relative group">
                      <Image className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                      <input 
                        name="thumbnail_url"
                        type="url" 
                        placeholder="https://images.unsplash.com/..." 
                        className="w-full bg-gray-50 border-2 border-transparent focus:bg-white focus:border-blue-600/20 rounded-2xl py-3.5 pl-12 pr-6 text-sm font-bold outline-none transition-all shadow-sm"
                      />
                   </div>
                </div>

                <div className="space-y-2">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Description</label>
                   <div className="relative group">
                      <AlignLeft className="absolute left-4 top-4 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                      <textarea 
                        name="description"
                        rows={3}
                        placeholder="Provide a brief overview of the course objectives..." 
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
                     className="flex-[2] flex items-center justify-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-[22px] text-xs font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-2xl shadow-blue-600/20 disabled:opacity-50"
                   >
                      {loading ? (
                         <>
                            <Loader2 size={18} className="animate-spin" />
                            Creating...
                         </>
                      ) : (
                         <>
                            <BookPlus size={18} />
                            Publish Course
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
