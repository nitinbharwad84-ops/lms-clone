import { createClient } from "@/utils/supabase/server";
import { 
  ChevronLeft, 
  ChevronRight, 
  Search,
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Filter,
  Check
} from "lucide-react";
import { cn } from "@/lib/utils";

export default async function TimetablePage() {
  const supabase = await createClient();
  
  const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const currentMonth = "APR 2026";
  
  // Sample calendar dates for APR 2026 (starting from 29th March)
  const calendarDates = [
    { day: 29, currentMonth: false }, { day: 30, currentMonth: false }, { day: 31, currentMonth: false },
    { day: 1, currentMonth: true, sessions: [{ time: "2:45 PM", title: "Live Session - 3 Se Sem 2 July", type: "LIVE" }] },
    { day: 2, currentMonth: true, sessions: [{ time: "5:05 PM", title: "Practical Session - 2", type: "PRACTICAL" }] },
    { day: 3, currentMonth: true, sessions: [{ time: "3:55 PM", title: "Live Session - 3 Dbms Sem 2", type: "LIVE" }] },
    { day: 4, currentMonth: true },
    { day: 5, currentMonth: true },
    { day: 6, currentMonth: true, sessions: [{ time: "3:55 PM", title: "Live Session - 5 Pcs Sem 2 July", type: "LIVE" }] },
    { day: 7, currentMonth: true, sessions: [{ time: "6:15 PM", title: "Live Session - 4 Iks - Sem 2", type: "LIVE" }] },
    { day: 8, currentMonth: true, sessions: [{ time: "2:45 PM", title: "Practical Session - 3 Se", type: "PRACTICAL" }] },
    { day: 9, currentMonth: true, sessions: [{ time: "5:05 PM", title: "Practical Session - 3", type: "PRACTICAL" }] },
    { day: 10, currentMonth: true, sessions: [
      { time: "6:15 PM", title: "Revision Session Iks - Sem 2 - July 2025 Batch", type: "REVISION" },
      { time: "2:45 PM", title: "Doubt Solving Session - 4 Pom Sem 2 July 2025 Batch", type: "DOUBT" }
    ] },
    { day: 11, currentMonth: true },
    { day: 12, currentMonth: true },
    { day: 13, currentMonth: true, sessions: [{ time: "6:15 PM", title: "Live Session - 5 Iks - Sem 2 -", type: "LIVE" }] },
    { day: 14, currentMonth: true },
    { day: 15, currentMonth: true, sessions: [{ time: "6:15 PM", title: "Live Session - 6 Pcs Sem 2 July", type: "LIVE" }] },
    { day: 16, currentMonth: true, sessions: [{ time: "6:15 PM", title: "Live Session 4 Php July 2025", type: "LIVE" }] },
    { day: 17, currentMonth: true, sessions: [{ time: "2:45 PM", title: "Live Session - 5 Pom Sem 2", type: "LIVE" }] },
    { day: 18, currentMonth: true },
    { day: 19, currentMonth: true },
    { day: 20, currentMonth: true, sessions: [{ time: "6:15 PM", title: "Doubt Solving Session - 5", type: "DOUBT" }] },
    { day: 21, currentMonth: true, sessions: [{ time: "5:05 PM", title: "Live Session - 6 Pom Sem 2", type: "LIVE" }] },
    { day: 22, currentMonth: true, sessions: [{ time: "3:55 PM", title: "Doubt Solving Session 2 - Eis", type: "DOUBT" }] },
    { day: 23, currentMonth: true },
    { day: 24, currentMonth: true, sessions: [{ time: "3:55 PM", title: "Doubt Solving Session - 1 Pcs", type: "DOUBT" }] },
    { day: 25, currentMonth: true },
  ];

  return (
    <div className="flex h-[calc(100vh-120px)] gap-8">
      {/* Sidebar Calendar */}
      <div className="w-80 flex flex-col gap-8">
        <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
           <div className="flex items-center justify-between mb-6">
              <button className="text-sm font-black text-gray-900 flex items-center gap-2">
                 {currentMonth}
                 <ChevronDownIcon size={16} />
              </button>
              <div className="flex items-center gap-1">
                 <button className="p-2 hover:bg-gray-50 rounded-xl transition-colors">
                    <ChevronLeft size={16} className="text-gray-400" />
                 </button>
                 <button className="p-2 hover:bg-gray-50 rounded-xl transition-colors">
                    <ChevronRight size={16} className="text-gray-400" />
                 </button>
              </div>
           </div>
           
           <div className="grid grid-cols-7 gap-y-4 text-center">
              {days.map(d => (
                 <span key={d} className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{d}</span>
              ))}
              {/* Simple grid for demo */}
              {Array.from({ length: 30 }).map((_, i) => (
                 <button 
                   key={i} 
                   className={cn(
                     "w-8 h-8 mx-auto flex items-center justify-center text-xs font-bold rounded-full transition-all",
                     i + 1 === 20 ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" : "text-gray-600 hover:bg-gray-50"
                   )}
                 >
                    {i + 1}
                 </button>
              ))}
           </div>
        </div>

        <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex flex-col gap-4">
           <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Filters</h4>
           {[
             { label: "Assignments", color: "bg-purple-500", checked: true },
             { label: "Exams", color: "bg-red-500", checked: true },
             { label: "Sessions", color: "bg-blue-500", checked: true }
           ].map((filter) => (
              <label key={filter.label} className="flex items-center gap-3 cursor-pointer group">
                 <div className={cn(
                   "w-5 h-5 rounded-md flex items-center justify-center transition-all border-2",
                   filter.checked ? "bg-blue-600 border-blue-600" : "bg-white border-gray-200"
                 )}>
                    {filter.checked && <Check size={12} className="text-white" />}
                 </div>
                 <span className="text-sm font-bold text-gray-700 group-hover:text-blue-600 transition-colors">{filter.label}</span>
                 <div className={cn("ml-auto w-2 h-2 rounded-full", filter.color)} />
              </label>
           ))}
        </div>
      </div>

      {/* Main Grid */}
      <div className="flex-1 flex flex-col bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
         {/* Header */}
         <div className="px-10 py-6 border-b border-gray-50 flex items-center justify-between">
            <div>
               <h1 className="text-2xl font-black text-gray-900 tracking-tight">Time Table</h1>
               <p className="text-xs text-gray-500 font-medium mt-1">See what's upcoming or completed</p>
            </div>
            
            <div className="flex items-center gap-4">
               <div className="flex items-center bg-gray-50 p-1 rounded-2xl border border-gray-100">
                  <select className="bg-transparent text-[11px] font-black uppercase tracking-widest px-4 py-2 outline-none cursor-pointer">
                     <option>2026</option>
                     <option>2025</option>
                  </select>
                  <div className="w-px h-4 bg-gray-200" />
                  <select className="bg-transparent text-[11px] font-black uppercase tracking-widest px-4 py-2 outline-none cursor-pointer">
                     <option>Apr</option>
                     <option>May</option>
                  </select>
               </div>
               
               <div className="relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input 
                    type="text" 
                    placeholder="Search class, exam..." 
                    className="bg-gray-50 border-2 border-transparent focus:bg-white focus:border-blue-600/20 rounded-xl py-2.5 pl-10 pr-4 text-xs font-bold outline-none transition-all w-64 shadow-sm"
                  />
               </div>
            </div>
         </div>

         {/* Calendar Grid */}
         <div className="flex-1 overflow-y-auto no-scrollbar">
            <div className="grid grid-cols-7 h-full">
               {days.map(d => (
                  <div key={d} className="px-6 py-4 bg-gray-50/50 border-b border-r border-gray-100 last:border-r-0 text-center">
                     <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{d}</span>
                  </div>
               ))}
               
               {calendarDates.map((date, i) => (
                  <div 
                    key={i} 
                    className={cn(
                      "min-h-[160px] p-4 border-r border-b border-gray-100 last:border-r-0 transition-colors hover:bg-gray-50/30 flex flex-col gap-3",
                      !date.currentMonth && "bg-gray-50/20"
                    )}
                  >
                     <span className={cn(
                       "text-xs font-black",
                       date.currentMonth ? "text-gray-400" : "text-gray-200"
                     )}>
                        {date.day}
                     </span>
                     
                     <div className="space-y-2">
                        {date.sessions?.map((session, j) => (
                           <div 
                             key={j} 
                             className={cn(
                               "p-3 rounded-xl border flex flex-col gap-2 transition-all hover:scale-[1.02] cursor-pointer shadow-sm",
                               session.type === 'LIVE' && "bg-emerald-50 border-emerald-100 text-emerald-700",
                               session.type === 'PRACTICAL' && "bg-blue-50 border-blue-100 text-blue-700",
                               session.type === 'REVISION' && "bg-orange-50 border-orange-100 text-orange-700",
                               session.type === 'DOUBT' && "bg-purple-50 border-purple-100 text-purple-700",
                             )}
                           >
                              <div className="flex items-center gap-1.5">
                                 <div className="w-1.5 h-1.5 rounded-full bg-current" />
                                 <span className="text-[9px] font-black uppercase tracking-widest">{session.time}</span>
                              </div>
                              <p className="text-[10px] font-bold leading-tight line-clamp-3 uppercase">{session.title}</p>
                           </div>
                        ))}
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
}

function ChevronDownIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
