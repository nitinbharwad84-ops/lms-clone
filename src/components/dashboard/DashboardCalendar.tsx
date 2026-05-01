"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Render a compact dashboard calendar widget with tabs for Live Sessions and Exams.
 *
 * Displays a static May 2026 month view with weekday headers, day grid (including accented days and indicators),
 * tab controls for toggling between "Live Sessions" and "Exams", month navigation UI (visual only), and a "Quick Info" panel.
 *
 * @returns A React element containing the calendar UI and quick info section.
 */
export default function DashboardCalendar() {
  const [tab, setTab] = useState<"SESSIONS" | "EXAMS">("SESSIONS");

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const startDay = 2; // Offset for May 2026

  return (
    <div className="w-80 flex flex-col gap-6">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-sm font-bold text-gray-900 mb-1">Calendar</h2>
        <p className="text-[10px] text-gray-500 mb-6">All your upcoming lectures and exams.</p>

        <div className="flex bg-gray-100 p-1 rounded-xl mb-6">
          <button 
            onClick={() => setTab("SESSIONS")}
            className={cn(
              "flex-1 py-2 text-[11px] font-bold rounded-lg transition-all",
              tab === "SESSIONS" ? "bg-blue-600 text-white shadow-sm" : "text-gray-500"
            )}
          >
            Live Sessions
          </button>
          <button 
            onClick={() => setTab("EXAMS")}
            className={cn(
              "flex-1 py-2 text-[11px] font-bold rounded-lg transition-all",
              tab === "EXAMS" ? "bg-blue-600 text-white shadow-sm" : "text-gray-500"
            )}
          >
            Exams
          </button>
        </div>

        <div className="flex items-center justify-between mb-4">
          <button className="p-1 hover:bg-gray-100 rounded text-gray-400"><ChevronLeft size={16} /></button>
          <span className="text-xs font-bold text-gray-700 uppercase tracking-widest">2026 May</span>
          <button className="p-1 hover:bg-gray-100 rounded text-gray-400"><ChevronRight size={16} /></button>
        </div>

        <div className="grid grid-cols-7 text-center mb-2">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(day => (
            <span key={day} className="text-[10px] font-bold text-gray-400 uppercase">{day}</span>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-y-2 text-center">
          {Array.from({ length: startDay }).map((_, i) => <div key={`empty-${i}`} />)}
          {days.map(day => (
            <button 
              key={day}
              className={cn(
                "h-8 w-8 text-xs font-bold rounded-full flex items-center justify-center transition-colors relative mx-auto",
                day === 29 ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100",
                [29, 30].includes(day) && "after:content-[''] after:absolute after:-bottom-0.5 after:w-1 after:h-1 after:bg-blue-500 after:rounded-full"
              )}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="text-xs font-bold text-gray-900 mb-4 uppercase tracking-wider">Quick Info</h3>
        <div className="space-y-4">
          <div className="flex gap-3">
            <div className="w-1 h-8 bg-blue-500 rounded-full" />
            <div>
              <p className="text-[11px] font-bold text-gray-800">DBMS Live Session</p>
              <p className="text-[10px] text-gray-500">Starts in 45 mins</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="w-1 h-8 bg-purple-500 rounded-full" />
            <div>
              <p className="text-[11px] font-bold text-gray-800">Quiz Submission</p>
              <p className="text-[10px] text-gray-500">Due today, 11:59 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
