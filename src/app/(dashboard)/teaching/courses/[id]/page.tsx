"use client";

import { useState, useEffect } from "react";
import { 
  Plus, 
  ChevronLeft, 
  MoreVertical, 
  Trash2, 
  BookOpen, 
  X, 
  Check, 
  Layout,
  Video,
  FileText,
  FileBox,
  Presentation,
  Clock,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createModule, deleteModule, createLesson, deleteLesson } from "@/lib/content-actions";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useParams } from "next/navigation";

/**
 * Render a course content management interface for viewing and editing a course's modules and lessons.
 *
 * Fetches course, module, and lesson data when mounted and whenever the route `id` changes, and exposes UI controls
 * to add modules and lessons (via modals), delete modules and lessons (with confirmation), and expand/collapse modules.
 *
 * @returns The JSX element containing the header, module/lesson summary counts, an expandable syllabus list, and modals for creating modules and lessons.
 */
export default function CourseContentManagement() {
  const { id } = useParams();
  const [course, setCourse] = useState<any>(null);
  const [modules, setModules] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModuleModalOpen, setIsModuleModalOpen] = useState(false);
  const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [expandedModules, setExpandedModules] = useState<string[]>([]);
  
  const supabase = createClient();

  const fetchData = async () => {
    setIsLoading(true);
    // Fetch course details
    const { data: courseData } = await supabase
      .from("courses")
      .select("*")
      .eq("id", id)
      .single();

    // Fetch modules with lessons
    const { data: modulesData } = await supabase
      .from("modules")
      .select("*, lessons(*)")
      .eq("course_id", id)
      .order("order", { ascending: true });

    if (courseData) setCourse(courseData);
    if (modulesData) {
      // Sort lessons within modules
      const sortedModules = modulesData.map(m => ({
        ...m,
        lessons: m.lessons.sort((a: any, b: any) => a.order - b.order)
      }));
      setModules(sortedModules);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => 
      prev.includes(moduleId) ? prev.filter(m => m !== moduleId) : [...prev, moduleId]
    );
  };

  async function handleCreateModule(formData: FormData) {
    const result = await createModule(id as string, formData);
    if (!result.error) {
      setIsModuleModalOpen(false);
      fetchData();
    }
  }

  async function handleCreateLesson(formData: FormData) {
    if (!selectedModuleId) return;
    const result = await createLesson(id as string, selectedModuleId, formData);
    if (!result.error) {
      setIsLessonModalOpen(false);
      setSelectedModuleId(null);
      fetchData();
    }
  }

  async function handleDeleteModule(moduleId: string) {
    if (confirm("Delete this module and all its lessons?")) {
      await deleteModule(id as string, moduleId);
      fetchData();
    }
  }

  async function handleDeleteLesson(lessonId: string) {
    if (confirm("Delete this lesson?")) {
      await deleteLesson(id as string, lessonId);
      fetchData();
    }
  }

  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'VIDEO': return Video;
      case 'PDF': return FileText;
      case 'PPT': return Presentation;
      default: return FileBox;
    }
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="flex items-center gap-4">
        <Link href="/teaching/courses" className="p-2 bg-white rounded-xl shadow-sm hover:bg-gray-50 transition-colors border border-gray-100">
           <ChevronLeft size={20} className="text-gray-500" />
        </Link>
        <div>
          <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest leading-none mb-1">Content Manager</p>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight uppercase">{course?.title}</h1>
        </div>
      </div>

      <div className="flex items-end justify-between">
        <div className="flex items-center gap-8">
           <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest">{modules.length} Modules</p>
           </div>
           <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest">
                {modules.reduce((acc, m) => acc + m.lessons.length, 0)} Lessons
              </p>
           </div>
        </div>
        <button 
          onClick={() => setIsModuleModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3.5 rounded-2xl font-black shadow-xl shadow-blue-600/20 flex items-center gap-2 transition-all hover:scale-105"
        >
          <Layout size={20} />
          Add New Module
        </button>
      </div>

      <div className="space-y-6">
        {isLoading ? (
          <div className="py-20 text-center text-gray-400 font-bold">Loading syllabus...</div>
        ) : modules.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-[40px] border border-dashed border-gray-200">
             <BookOpen className="mx-auto text-gray-200 mb-4" size={48} />
             <p className="text-gray-400 font-black uppercase tracking-widest text-sm">Your course is empty</p>
             <p className="text-xs text-gray-400 mt-1 font-medium">Start by adding your first module.</p>
          </div>
        ) : (
          modules.map((module) => {
            const isExpanded = expandedModules.includes(module.id);
            return (
              <div key={module.id} className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden group">
                <div 
                  className={cn(
                    "p-6 flex items-center justify-between cursor-pointer hover:bg-gray-50/50 transition-colors",
                    isExpanded && "bg-gray-50/50 border-b border-gray-50"
                  )}
                  onClick={() => toggleModule(module.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 font-black text-sm">
                      {module.order}
                    </div>
                    <div>
                      <h3 className="text-base font-black text-gray-900 uppercase tracking-tight">{module.title}</h3>
                      <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{module.lessons.length} Lessons</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedModuleId(module.id);
                        setIsLessonModalOpen(true);
                      }}
                      className="p-2.5 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-600/10 hover:bg-blue-700 transition-all"
                    >
                      <Plus size={16} />
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteModule(module.id);
                      }}
                      className="p-2.5 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                    <div className="p-2 text-gray-300">
                      {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                  </div>
                </div>

                {isExpanded && (
                  <div className="p-4 bg-white divide-y divide-gray-50">
                    {module.lessons.length === 0 ? (
                      <p className="py-8 text-center text-xs text-gray-400 font-bold uppercase tracking-widest">No lessons in this module</p>
                    ) : (
                      module.lessons.map((lesson: any) => {
                        const Icon = getLessonIcon(lesson.type);
                        return (
                          <div key={lesson.id} className="p-4 flex items-center justify-between hover:bg-gray-50/30 rounded-2xl transition-colors group/lesson">
                            <div className="flex items-center gap-4">
                              <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 group-hover/lesson:bg-blue-50 group-hover/lesson:text-blue-600 transition-colors">
                                <Icon size={16} />
                              </div>
                              <div>
                                <h4 className="text-sm font-bold text-gray-800">{lesson.title}</h4>
                                <div className="flex items-center gap-3 mt-0.5">
                                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{lesson.type}</span>
                                  <span className="w-1 h-1 rounded-full bg-gray-200" />
                                  <div className="flex items-center gap-1 text-[10px] text-gray-400 font-black uppercase tracking-widest">
                                    <Clock size={10} />
                                    {lesson.duration || "N/A"}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <button 
                              onClick={() => handleDeleteLesson(lesson.id)}
                              className="p-2 text-gray-300 hover:text-red-500 opacity-0 group-hover/lesson:opacity-100 transition-all"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        );
                      })
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Module Modal */}
      {isModuleModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-lg rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <h2 className="text-xl font-black text-gray-900">Add New Module</h2>
              <button onClick={() => setIsModuleModalOpen(false)} className="p-2 text-gray-400 hover:text-gray-900 rounded-xl hover:bg-white transition-all shadow-sm">
                <X size={24} />
              </button>
            </div>
            <form action={handleCreateModule} className="p-10 space-y-6">
               <div className="space-y-2">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Module Title</label>
                 <input name="title" required className="w-full bg-gray-50 border-2 border-transparent focus:bg-white focus:border-blue-600/20 rounded-2xl py-4 px-6 text-sm font-bold outline-none transition-all" placeholder="e.g. Introduction to Java" />
               </div>
               <div className="space-y-2">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Display Order</label>
                 <input name="order" type="number" required defaultValue={modules.length + 1} className="w-full bg-gray-50 border-2 border-transparent focus:bg-white focus:border-blue-600/20 rounded-2xl py-4 px-6 text-sm font-bold outline-none transition-all" />
               </div>
               <div className="flex gap-4 pt-4">
                  <button type="button" onClick={() => setIsModuleModalOpen(false)} className="flex-1 bg-gray-100 text-gray-500 font-black py-4 rounded-2xl">Cancel</button>
                  <button type="submit" className="flex-[2] bg-blue-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-blue-600/20">Create Module</button>
               </div>
            </form>
          </div>
        </div>
      )}

      {/* Lesson Modal */}
      {isLessonModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-lg rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <h2 className="text-xl font-black text-gray-900">Add New Lesson</h2>
              <button onClick={() => setIsLessonModalOpen(false)} className="p-2 text-gray-400 hover:text-gray-900 rounded-xl hover:bg-white transition-all shadow-sm">
                <X size={24} />
              </button>
            </div>
            <form action={handleCreateLesson} className="p-10 space-y-6">
               <div className="space-y-2">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Lesson Title</label>
                 <input name="title" required className="w-full bg-gray-50 border-2 border-transparent focus:bg-white focus:border-blue-600/20 rounded-2xl py-4 px-6 text-sm font-bold outline-none transition-all" placeholder="e.g. JVM vs JRE vs JDK" />
               </div>
               <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Type</label>
                    <select name="type" className="w-full bg-gray-50 border-2 border-transparent focus:bg-white focus:border-blue-600/20 rounded-2xl py-4 px-6 text-sm font-bold outline-none transition-all appearance-none">
                      <option value="VIDEO">Video</option>
                      <option value="PDF">PDF</option>
                      <option value="PPT">PPT</option>
                      <option value="QUIZ">Quiz</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Duration</label>
                    <input name="duration" className="w-full bg-gray-50 border-2 border-transparent focus:bg-white focus:border-blue-600/20 rounded-2xl py-4 px-6 text-sm font-bold outline-none transition-all" placeholder="e.g. 15 mins" />
                  </div>
               </div>
               <div className="space-y-2">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Content URL</label>
                 <input name="content_url" className="w-full bg-gray-50 border-2 border-transparent focus:bg-white focus:border-blue-600/20 rounded-2xl py-4 px-6 text-sm font-bold outline-none transition-all" placeholder="Link to video, pdf or slide..." />
               </div>
               <div className="space-y-2">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Display Order</label>
                 <input name="order" type="number" required defaultValue={1} className="w-full bg-gray-50 border-2 border-transparent focus:bg-white focus:border-blue-600/20 rounded-2xl py-4 px-6 text-sm font-bold outline-none transition-all" />
               </div>
               <div className="flex gap-4 pt-4">
                  <button type="button" onClick={() => setIsLessonModalOpen(false)} className="flex-1 bg-gray-100 text-gray-500 font-black py-4 rounded-2xl">Cancel</button>
                  <button type="submit" className="flex-[2] bg-blue-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-blue-600/20">Create Lesson</button>
               </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
