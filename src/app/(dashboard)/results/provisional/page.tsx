import { createClient } from "@/utils/supabase/server";
import { 
  Search, 
  Filter, 
  Calendar, 
  ChevronDown,
  FileSearch,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Renders the Provisional Result page and ensures the current authenticated user is retrieved.
 *
 * The page displays filter controls (date range and status), a search input, and a results table.
 * When no provisional results are available the table shows an empty-state message.
 *
 * @returns The React element for the Provisional Result dashboard page.
 */
export default async function ProvisionalResultsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const results: any[] = []; 

  return (
    <div className="space-y-8 pb-10">
      <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Provisional Result</h1>
        <p className="text-sm text-gray-500 font-medium mt-1">View all the provisional results and make changes according to your use</p>
      </div>

      <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-8">
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
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
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Status</label>
              <div className="relative group">
                 <select className="w-full bg-gray-50 border-2 border-transparent focus:bg-white focus:border-blue-600/20 rounded-2xl py-3.5 px-6 text-sm font-bold outline-none transition-all appearance-none shadow-sm cursor-pointer">
                    <option>Select published status</option>
                    <option>Published</option>
                    <option>Pending</option>
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
             placeholder="Search here..." 
             className="w-full bg-gray-50 border-2 border-transparent focus:bg-white focus:border-blue-600/20 rounded-2xl py-4 pl-12 pr-6 text-sm font-bold outline-none transition-all shadow-sm"
           />
        </div>

        {/* Table */}
        <div className="bg-white rounded-[32px] border border-gray-100 overflow-hidden">
           <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                 <thead>
                    <tr className="bg-gray-50/50 border-b border-gray-50">
                       <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Student Email</th>
                       <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Roll Number</th>
                       <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Program</th>
                       <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Result (CGPA)</th>
                       <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">DMC Issued Date</th>
                       <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">DMC</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-50">
                    {results.length === 0 ? (
                       <tr>
                          <td colSpan={6} className="px-8 py-32 text-center">
                             <div className="flex flex-col items-center gap-6">
                                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center">
                                   <FileSearch className="text-gray-200" size={48} />
                                </div>
                                <div>
                                   <p className="text-gray-400 font-black uppercase tracking-widest text-sm">No provisional results found</p>
                                </div>
                             </div>
                          </td>
                       </tr>
                    ) : (
                       <tr>
                          {/* map rows */}
                       </tr>
                    )}
                 </tbody>
              </table>
           </div>
        </div>
      </div>
    </div>
  );
}
