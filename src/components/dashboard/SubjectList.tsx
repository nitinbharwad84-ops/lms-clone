"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface SubjectListProps {
  courses: any[];
}

/**
 * Render a card with a semester selector and a list of courses showing status, progress, and an action link.
 *
 * @param courses - Array of course objects. Each course is expected to have `id`, `title`, `status` (e.g. `"NOT STARTED"`), and numeric `progress` (0–100).
 * @returns A React element containing the subject list card with per-course rows, progress bars, and navigation links.
 */
export default function SubjectList({ courses }: SubjectListProps) {
  const [sem, setSem] = useState(2);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex items-center justify-between">
        <div className="flex gap-2">
          <button 
            onClick={() => setSem(1)}
            className={cn(
              "px-4 py-1.5 rounded-full text-xs font-bold transition-all",
              sem === 1 ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30" : "text-gray-500 hover:bg-gray-100"
            )}
          >
            Sem 1
          </button>
          <button 
            onClick={() => setSem(2)}
            className={cn(
              "px-4 py-1.5 rounded-full text-xs font-bold transition-all",
              sem === 2 ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30" : "text-gray-500 hover:bg-gray-100"
            )}
          >
            Sem 2
          </button>
        </div>
      </div>

      <div className="divide-y divide-gray-50">
        {courses.length === 0 ? (
          <div className="p-12 text-center text-gray-400 font-bold">No courses enrolled yet.</div>
        ) : (
          courses.map((course) => (
            <div key={course.id} className="p-6 flex items-center justify-between group hover:bg-gray-50/50 transition-colors">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-sm font-black text-gray-900 uppercase tracking-tight">{course.title}</h3>
                  <span className={cn(
                    "px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest",
                    course.status === "NOT STARTED" ? "bg-gray-100 text-gray-500" : "bg-blue-50 text-blue-600"
                  )}>
                    {course.status}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-48 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 transition-all duration-1000" 
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                  <span className="text-[11px] font-black text-blue-600">{course.progress}%</span>
                </div>
              </div>
              
              <Link 
                href={`/courses/${course.id}`}
                className={cn(
                  "px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
                  course.progress > 0 
                    ? "bg-blue-600 text-white shadow-xl shadow-blue-600/20 hover:scale-105 active:scale-95" 
                    : "bg-blue-50 text-blue-600 hover:bg-blue-100"
                )}
              >
                {course.progress > 0 ? "Continue" : "Start"}
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
