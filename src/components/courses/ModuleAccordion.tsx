"use client";

import { useState } from "react";
import { 
  ChevronDown, 
  ChevronUp, 
  PlayCircle, 
  FileText, 
  HelpCircle, 
  CheckCircle2,
  Lock,
  Presentation
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Lesson {
  id: string;
  title: string;
  type: "VIDEO" | "PDF" | "QUIZ" | "PPT";
  duration?: string;
  isCompleted?: boolean;
  isLocked?: boolean;
}

interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

interface ModuleAccordionProps {
  modules: Module[];
  activeLessonId?: string;
  onLessonSelect: (lesson: Lesson) => void;
}

/**
 * Renders a left-side sidebar with three tabs ("MODULES", "DISCUSSION", "NOTES") and an accordion list of modules and their lessons.
 *
 * The "MODULES" tab shows expandable modules; expanded modules reveal lessons that reflect completion, lock state, duration, and type. Clicking a lesson invokes the provided selection callback. "DISCUSSION" and "NOTES" tabs show placeholder empty states.
 *
 * @param modules - Array of modules to display; each module must include an `id`, `title`, and `lessons` array.
 * @param activeLessonId - Optional id of the currently active/selected lesson; used to style the active lesson.
 * @param onLessonSelect - Callback invoked with a lesson when the user selects (clicks) a lesson.
 * @returns A sidebar panel element containing the tab header and module/lesson accordion content.
 */
export default function ModuleAccordion({ modules, activeLessonId, onLessonSelect }: ModuleAccordionProps) {
  const [openModules, setOpenModules] = useState<string[]>(modules.length > 0 ? [modules[0].id] : []);
  const [activeTab, setActiveTab] = useState<"MODULES" | "DISCUSSION" | "NOTES">("MODULES");

  const toggleModule = (id: string) => {
    setOpenModules(prev => 
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'VIDEO': return PlayCircle;
      case 'PDF': return FileText;
      case 'PPT': return Presentation;
      case 'QUIZ': return HelpCircle;
      default: return FileText;
    }
  };

  return (
    <div className="w-80 h-full bg-white border-l border-gray-200 flex flex-col">
      {/* Tabs */}
      <div className="flex border-b border-gray-100 bg-gray-50/50">
        {(["MODULES", "DISCUSSION", "NOTES"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "flex-1 py-4 text-[10px] font-black uppercase tracking-widest transition-all relative",
              activeTab === tab ? "text-blue-600" : "text-gray-400 hover:text-gray-600"
            )}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.4)]" />
            )}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto">
        {activeTab === "MODULES" && (
          <div className="divide-y divide-gray-100">
            {modules.map((mod) => (
              <div key={mod.id} className="flex flex-col">
                <button 
                  onClick={() => toggleModule(mod.id)}
                  className="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors border-b border-gray-50/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 text-[10px] font-black">
                      {modules.indexOf(mod) + 1}
                    </div>
                    <span className="text-xs font-black text-gray-700 uppercase tracking-tight">{mod.title}</span>
                  </div>
                  {openModules.includes(mod.id) ? <ChevronUp size={14} className="text-gray-400" /> : <ChevronDown size={14} className="text-gray-400" />}
                </button>

                {openModules.includes(mod.id) && (
                  <div className="bg-gray-50/30">
                    {mod.lessons.map((lesson) => {
                      const isActive = activeLessonId === lesson.id;
                      const Icon = getLessonIcon(lesson.type);
                      return (
                        <button
                          key={lesson.id}
                          disabled={lesson.isLocked}
                          onClick={() => onLessonSelect(lesson)}
                          className={cn(
                            "w-full px-6 py-4 flex items-start gap-3 transition-all border-l-4",
                            isActive ? "bg-white border-blue-600 shadow-sm" : "border-transparent hover:bg-gray-100/50",
                            lesson.isLocked && "opacity-50 cursor-not-allowed"
                          )}
                        >
                          <div className="mt-0.5 shrink-0">
                            {lesson.isCompleted ? (
                              <CheckCircle2 size={16} className="text-green-500 fill-green-50" />
                            ) : lesson.isLocked ? (
                              <Lock size={14} className="text-gray-400" />
                            ) : (
                              <div className={cn("w-4 h-4 rounded-full border-2", isActive ? "border-blue-600" : "border-gray-300")} />
                            )}
                          </div>
                          
                          <div className="flex-1 text-left">
                            <p className={cn(
                              "text-[11px] leading-tight mb-1.5",
                              isActive ? "text-gray-900 font-black" : "text-gray-600 font-bold"
                            )}>
                              {lesson.title}
                            </p>
                            <div className="flex items-center gap-2">
                               <div className="text-[9px] font-black text-gray-400 flex items-center gap-1 uppercase tracking-widest">
                                  <Icon size={12} className={isActive ? "text-blue-600" : ""} />
                                  {lesson.type}
                               </div>
                               {lesson.duration && (
                                 <span className="text-[9px] text-gray-300 font-black uppercase tracking-widest">{lesson.duration}</span>
                               )}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        {activeTab === "DISCUSSION" && (
          <div className="p-8 text-center text-gray-400 text-[10px] font-black uppercase tracking-widest">
             No discussions available for this lesson.
          </div>
        )}
        {activeTab === "NOTES" && (
          <div className="p-8 text-center text-gray-400 text-[10px] font-black uppercase tracking-widest">
             You haven't added any notes yet.
          </div>
        )}
      </div>
    </div>
  );
}
