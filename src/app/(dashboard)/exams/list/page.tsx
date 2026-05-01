import { createClient } from "@/utils/supabase/server";
import { 
  ClipboardList, 
  Calendar, 
  Clock, 
  HelpCircle, 
  ChevronRight,
  Search,
  Filter,
  CheckCircle2,
  Clock3,
  AlertCircle
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default async function ExamListPage() {
  const supabase = await createClient();
  
  const { data: exams, error } = await supabase
    .from("exams")
    .select("*")
    .order("start_date", { ascending: false });

  const tabs = [
    { name: "All Exams", count: exams?.length || 0, active: true },
    { name: "Past Exams", count: 0 },
    { name: "Upcoming Exams", count: exams?.length || 0 },
    { name: "Exams Completed", count: 0 },
    { name: "Mock Tests", count: 0 }
  ];

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Exams</h1>
          <p className="text-sm text-gray-500 font-medium mt-1">View all the exams and make changes according to your use</p>
        </div>
        
        <div className="flex items-center gap-4">
           <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search exams..." 
                className="bg-gray-50 border-2 border-transparent focus:bg-white focus:border-blue-600/20 rounded-2xl py-3.5 pl-12 pr-6 text-sm font-bold outline-none transition-all w-64 shadow-sm"
              />
           </div>
           <button className="p-4 bg-gray-50 hover:bg-gray-100 text-gray-500 rounded-2xl transition-all shadow-sm border border-transparent hover:border-gray-200">
              <Filter size={18} />
           </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto no-scrollbar bg-white p-2 rounded-[28px] border border-gray-100 shadow-sm">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            className={cn(
              "px-8 py-4 rounded-[22px] text-xs font-black uppercase tracking-widest transition-all flex items-center gap-3 whitespace-nowrap",
              tab.active 
                ? "bg-blue-600 text-white shadow-xl shadow-blue-600/20" 
                : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
            )}
          >
            {tab.name}
            <span className={cn(
              "px-2 py-0.5 rounded-lg text-[10px] font-black",
              tab.active ? "bg-white/20 text-white" : "bg-gray-100 text-gray-400"
            )}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-50 bg-gray-50/30">
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Title</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Start Date</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">End Date</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Duration</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Questions</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {!exams || exams.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center gap-4">
                       <AlertCircle className="text-gray-200" size={48} />
                       <p className="text-gray-400 font-black uppercase tracking-widest text-sm">No exams found</p>
                    </div>
                  </td>
                </tr>
              ) : (
                exams.map((exam) => (
                  <tr key={exam.id} className="group hover:bg-gray-50/50 transition-colors">
                    <td className="px-8 py-6">
                       <div className="flex items-center gap-4">
                          <div className={cn(
                            "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                            exam.type === 'FINAL' ? "bg-blue-50 text-blue-600" : "bg-purple-50 text-purple-600"
                          )}>
                             <ClipboardList size={20} />
                          </div>
                          <div>
                             <p className="text-sm font-black text-gray-900 uppercase tracking-tight leading-tight group-hover:text-blue-600 transition-colors">
                               {exam.title}
                             </p>
                             <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1 inline-block">
                               {exam.type} EXAM
                             </span>
                          </div>
                       </div>
                    </td>
                    <td className="px-8 py-6">
                       <div className="flex flex-col">
                          <span className="text-sm font-bold text-gray-700">{format(new Date(exam.start_date), "MMM d, yyyy")}</span>
                          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-0.5">{format(new Date(exam.start_date), "hh:mm:ss a")}</span>
                       </div>
                    </td>
                    <td className="px-8 py-6">
                       <div className="flex flex-col">
                          <span className="text-sm font-bold text-gray-700">{format(new Date(exam.end_date), "MMM d, yyyy")}</span>
                          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-0.5">{format(new Date(exam.end_date), "hh:mm:ss a")}</span>
                       </div>
                    </td>
                    <td className="px-8 py-6 text-center">
                       <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-lg text-[10px] font-black text-gray-500 uppercase tracking-widest">
                          <Clock3 size={12} />
                          {exam.duration}
                       </div>
                    </td>
                    <td className="px-8 py-6 text-center">
                       <span className="text-sm font-black text-gray-900">{exam.questions_count}</span>
                    </td>
                    <td className="px-8 py-6 text-right">
                       <button className="bg-gray-50 hover:bg-blue-600 text-gray-400 hover:text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all group-hover:shadow-lg group-hover:shadow-blue-600/10">
                          Enter Exam
                       </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
