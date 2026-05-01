import { createClient } from "@/utils/supabase/server";
import { 
  Search, 
  Filter, 
  Calendar, 
  ChevronDown,
  Download,
  ExternalLink,
  FileText,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Render the Program Results page with filter controls, a search input, and a wide results table.
 *
 * Initializes a Supabase server client and retrieves the current authenticated user before rendering.
 *
 * @returns The JSX element representing the Program Results dashboard UI.
 */
export default async function ProgramResultsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // In a real app, we'd fetch from an 'academic_results' table
  // For now, we'll show an empty state that matches the high-fidelity screenshot
  const results: any[] = []; 

  return (
    <div className="space-y-8 pb-10">
      <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Program Result</h1>
        <p className="text-sm text-gray-500 font-medium mt-1">View all the program results and make changes according to your use</p>
      </div>

      <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-8">
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
           <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Date Range</label>
              <div className="relative group">
                 <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                 <input 
                   type="text" 
                   placeholder="Start date → End date" 
                   className="w-full bg-gray-50 border-2 border-transparent focus:bg-white focus:border-blue-600/20 rounded-2xl py-3.5 pl-12 pr-6 text-sm font-bold outline-none transition-all shadow-sm"
                 />
              </div>
           </div>

           <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Academic Year</label>
              <div className="relative group">
                 <select className="w-full bg-gray-50 border-2 border-transparent focus:bg-white focus:border-blue-600/20 rounded-2xl py-3.5 px-6 text-sm font-bold outline-none transition-all appearance-none shadow-sm cursor-pointer">
                    <option>Select year</option>
                    <option>2023-24</option>
                    <option>2024-25</option>
                 </select>
                 <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
              </div>
           </div>

           <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Semester</label>
              <div className="relative group">
                 <select className="w-full bg-gray-50 border-2 border-transparent focus:bg-white focus:border-blue-600/20 rounded-2xl py-3.5 px-6 text-sm font-bold outline-none transition-all appearance-none shadow-sm cursor-pointer">
                    <option>Select semester</option>
                    <option>Sem 1</option>
                    <option>Sem 2</option>
                    <option>Sem 3</option>
                    <option>Sem 4</option>
                 </select>
                 <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
              </div>
           </div>

           <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Status</label>
              <div className="relative group">
                 <select className="w-full bg-gray-50 border-2 border-transparent focus:bg-white focus:border-blue-600/20 rounded-2xl py-3.5 px-6 text-sm font-bold outline-none transition-all appearance-none shadow-sm cursor-pointer">
                    <option>Select published status</option>
                    <option>Published</option>
                    <option>Draft</option>
                 </select>
                 <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
              </div>
           </div>
        </div>

        {/* Search */}
        <div className="relative group max-w-lg">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={18} />
           <input 
             type="text" 
             placeholder="Search results by roll number or program..." 
             className="w-full bg-gray-50 border-2 border-transparent focus:bg-white focus:border-blue-600/20 rounded-2xl py-4 pl-12 pr-6 text-sm font-bold outline-none transition-all shadow-sm"
           />
        </div>

        {/* Results Table (Wide) */}
        <div className="bg-white rounded-[32px] border border-gray-100 overflow-hidden relative group/table">
           <div className="overflow-x-auto no-scrollbar scroll-smooth">
              <table className="w-full text-left border-collapse min-w-[2000px]">
                 <thead>
                    <tr className="bg-gray-50/50 border-b border-gray-50">
                       <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Student Email</th>
                       <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Roll Number</th>
                       <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Program</th>
                       <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Year</th>
                       <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Semester</th>
                       <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Exam Held Date</th>
                       <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Result (CGPA)</th>
                       <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">DMC Issued Date</th>
                       <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">DMC Status</th>
                       <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Rechecking End Date</th>
                       <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-50">
                    {results.length === 0 ? (
                       <tr>
                          <td colSpan={11} className="px-6 py-32 text-center">
                             <div className="flex flex-col items-center gap-6">
                                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center">
                                   <FileText className="text-gray-200" size={48} />
                                </div>
                                <div>
                                   <p className="text-gray-400 font-black uppercase tracking-widest text-sm">No program results found</p>
                                   <p className="text-xs text-gray-400 mt-1 font-medium">Your academic results will appear here once published.</p>
                                </div>
                             </div>
                          </td>
                       </tr>
                    ) : (
                       // Sample row if we had data
                       <tr className="hover:bg-gray-50/50 transition-colors">
                          {/* ... map results ... */}
                       </tr>
                    )}
                 </tbody>
              </table>
           </div>
           
           {/* Horizontal Scroll Indicator */}
           <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-black/5 backdrop-blur-md rounded-full text-[8px] font-black text-gray-400 uppercase tracking-[0.2em] opacity-0 group-hover/table:opacity-100 transition-opacity pointer-events-none">
              Scroll horizontally to view all columns
           </div>
        </div>
      </div>
    </div>
  );
}
