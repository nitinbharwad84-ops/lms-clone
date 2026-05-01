"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronLeft, ChevronRight, Settings, Maximize2, Share2, Clock, BookOpen } from "lucide-react";
import ModuleAccordion from "@/components/courses/ModuleAccordion";
import { createClient } from "@/utils/supabase/client";
import { useParams } from "next/navigation";

/**
 * Render the course player page for the current course route.
 *
 * Loads the course record and its modules (including lessons) using the route `id`, sets the first lesson
 * of the first module as the default active lesson when available, and renders the player UI: top navbar,
 * lesson viewer, overlay controls, and a module/lesson accordion sidebar. Displays a full-screen loading
 * message while data is being fetched.
 *
 * @returns The JSX element tree for the course player page.
 */
export default function CoursePlayerPage() {
  const { id } = useParams();
  const [course, setCourse] = useState<any>(null);
  const [modules, setModules] = useState<any[]>([]);
  const [activeLesson, setActiveLesson] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const { data: courseData } = await supabase
        .from("courses")
        .select("*")
        .eq("id", id)
        .single();

      const { data: modulesData } = await supabase
        .from("modules")
        .select("*, lessons(*)")
        .eq("course_id", id)
        .order("order", { ascending: true });

      if (courseData) setCourse(courseData);
      if (modulesData) {
        const sorted = modulesData.map(m => ({
          ...m,
          lessons: m.lessons.sort((a: any, b: any) => a.order - b.order)
        }));
        setModules(sorted);
        // Set first lesson as active by default
        if (sorted.length > 0 && sorted[0].lessons.length > 0) {
          setActiveLesson(sorted[0].lessons[0]);
        }
      }
      setIsLoading(false);
    };

    fetchData();
  }, [id]);

  if (isLoading) {
    return <div className="h-screen flex items-center justify-center bg-gray-50 font-black uppercase tracking-widest text-gray-400">Loading your course...</div>;
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-white">
      {/* Top Navbar */}
      <header className="h-16 border-b border-gray-100 flex items-center justify-between px-8 shrink-0 bg-white z-20 shadow-sm">
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="p-2 bg-gray-50 rounded-xl text-gray-400 hover:text-gray-900 transition-all border border-gray-100">
            <ArrowLeft size={20} />
          </Link>
          <div className="w-px h-8 bg-gray-100" />
          <div>
            <p className="text-[9px] font-black text-blue-600 uppercase tracking-[0.2em] leading-none mb-1">{course?.title}</p>
            <h1 className="text-sm font-black text-gray-900 uppercase tracking-tight truncate max-w-xl">
              {activeLesson?.title || "Select a lesson"}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-6">
           <div className="flex flex-col items-end gap-1.5 mr-6">
              <div className="flex items-center justify-between w-40">
                 <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Progress</span>
                 <span className="text-[10px] font-black text-blue-600 tracking-widest">21%</span>
              </div>
              <div className="w-40 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="w-[21%] h-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.4)]" />
              </div>
           </div>
           <div className="flex items-center gap-2">
             <button className="p-3 hover:bg-gray-50 rounded-2xl text-gray-400 hover:text-gray-900 transition-colors border border-transparent hover:border-gray-100"><Share2 size={18} /></button>
             <button className="p-3 hover:bg-gray-50 rounded-2xl text-gray-400 hover:text-gray-900 transition-colors border border-transparent hover:border-gray-100"><Settings size={18} /></button>
           </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Lesson Viewer */}
        <div className="flex-1 bg-gray-50/50 flex flex-col relative group">
          <div className="flex-1 flex items-center justify-center p-12 overflow-y-auto">
             {activeLesson ? (
               <div className="w-full max-w-5xl aspect-video bg-white shadow-2xl rounded-3xl border border-gray-100 p-12 flex flex-col items-center justify-center relative overflow-hidden">
                  {/* Digital Paper Effect */}
                  <div className="absolute top-0 left-0 w-full h-2 bg-blue-600" />
                  
                  <div className="w-full flex justify-between items-start mb-16">
                     <div>
                        <p className="text-2xl font-black text-[#171b26] tracking-tight leading-none">Parul University</p>
                        <p className="text-[10px] font-black text-blue-600/40 uppercase tracking-widest mt-2">Continuing Education Programs</p>
                     </div>
                     <div className="text-right">
                        <span className="px-4 py-1.5 bg-red-50 text-red-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-red-100">
                           Digital Learning Content
                        </span>
                     </div>
                  </div>

                  <div className="w-full max-w-3xl space-y-10 text-center py-10">
                     <div className="space-y-4">
                        <div className="inline-flex items-center gap-3 px-6 py-2 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mx-auto">
                           <BookOpen size={12} />
                           Learning Resource
                        </div>
                        <h2 className="text-4xl font-black text-gray-900 tracking-tight leading-tight uppercase">
                          {activeLesson.title}
                        </h2>
                     </div>

                     <div className="h-px w-32 bg-gray-100 mx-auto" />

                     <div className="flex items-center justify-center gap-8">
                        <div className="text-center">
                           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Format</p>
                           <p className="text-sm font-black text-gray-900 uppercase">{activeLesson.type}</p>
                        </div>
                        <div className="w-px h-8 bg-gray-100" />
                        <div className="text-center">
                           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Duration</p>
                           <p className="text-sm font-black text-gray-900 uppercase">{activeLesson.duration || 'N/A'}</p>
                        </div>
                     </div>

                     <button className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-[24px] font-black uppercase tracking-widest text-xs shadow-2xl shadow-blue-600/30 transition-all hover:scale-105 active:scale-95">
                        Start Learning Now
                     </button>
                  </div>

                  {/* Subtle Background Mark */}
                  <div className="absolute -bottom-20 -right-20 opacity-[0.03] select-none pointer-events-none">
                     <p className="text-[120px] font-black uppercase rotate-12">PARUL</p>
                  </div>
               </div>
             ) : (
               <div className="text-center">
                  <p className="text-gray-400 font-black uppercase tracking-[0.2em]">Select a lesson to begin</p>
               </div>
             )}
          </div>

          {/* Player Controls (Overlay) */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-white/95 backdrop-blur-xl px-8 py-4 rounded-[28px] shadow-2xl border border-white/50 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-95 group-hover:scale-100">
             <button className="p-3 hover:bg-gray-50 rounded-2xl text-gray-400 hover:text-gray-900 transition-all flex items-center gap-3">
                <ChevronLeft size={20} />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Previous</span>
             </button>
             <div className="w-px h-8 bg-gray-100 mx-4" />
             <div className="flex items-center gap-3 px-4">
                <div className="flex -space-x-2">
                   {[1,2,3].map(i => <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-blue-100" />)}
                </div>
                <span className="text-[10px] font-black text-gray-900 uppercase tracking-widest">Active Learners</span>
             </div>
             <div className="w-px h-8 bg-gray-100 mx-4" />
             <button className="p-3 hover:bg-gray-50 rounded-2xl text-gray-900 transition-all flex items-center gap-3">
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Next Lesson</span>
                <ChevronRight size={20} />
             </button>
             <div className="w-px h-8 bg-gray-100 mx-4" />
             <button className="p-3 hover:bg-gray-50 rounded-2xl text-gray-400 hover:text-blue-600 transition-all"><Maximize2 size={18} /></button>
          </div>
        </div>

        {/* Sidebar */}
        <ModuleAccordion 
          modules={modules} 
          activeLessonId={activeLesson?.id} 
          onLessonSelect={(lesson) => setActiveLesson(lesson)} 
        />
      </div>
    </div>
  );
}
