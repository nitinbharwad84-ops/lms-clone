import { createClient } from "@/utils/supabase/server";
import { 
  Search, 
  Filter, 
  UserPlus, 
  MoreVertical,
  Mail,
  Shield,
  Trash2,
  Edit2,
  ChevronRight,
  GraduationCap,
  Users
} from "lucide-react";
import { cn } from "@/lib/utils";
import UserManagementClient from "./UserManagementClient";

export default async function UserManagementPage() {
  const supabase = await createClient();

  const { data: users, error } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-3xl font-black text-[#171b26] tracking-tight">User Management</h1>
          <p className="text-sm text-gray-500 font-medium mt-1">Control access levels and manage all student and faculty profiles.</p>
        </div>
        
        <UserManagementClient />
      </div>

      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/20">
           <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-blue-100">
                 <GraduationCap size={14} />
                 Students: {users?.filter(u => u.role === 'STUDENT').length || 0}
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-purple-100">
                 <Users size={14} />
                 Teachers: {users?.filter(u => u.role === 'TEACHER').length || 0}
              </div>
           </div>
           
           <div className="flex items-center gap-4">
              <div className="relative group">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={16} />
                 <input 
                   type="text" 
                   placeholder="Search users..." 
                   className="bg-white border border-gray-200 focus:border-blue-600/20 rounded-xl py-2.5 pl-10 pr-6 text-xs font-bold outline-none transition-all w-64 shadow-sm"
                 />
              </div>
              <button className="p-3 bg-white border border-gray-200 text-gray-400 hover:bg-gray-50 rounded-xl transition-all shadow-sm">
                 <Filter size={16} />
              </button>
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/30">
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">User Details</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Roll Number</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Role</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {users?.map((user) => (
                <tr key={user.id} className="group hover:bg-gray-50/50 transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-gray-100 border border-gray-200 overflow-hidden flex items-center justify-center shrink-0">
                         {user.avatar_url ? (
                           <img src={user.avatar_url} className="w-full h-full object-cover" />
                         ) : (
                           <UserPlus className="text-gray-300" size={24} />
                         )}
                      </div>
                      <div>
                        <p className="text-sm font-black text-[#171b26] uppercase tracking-tight group-hover:text-blue-600 transition-colors">
                          {user.full_name}
                        </p>
                        <p className="text-[10px] font-bold text-gray-400 flex items-center gap-1.5 mt-0.5">
                          <Mail size={10} />
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-xs font-black text-[#171b26] tracking-widest">{user.roll_number || "N/A"}</span>
                  </td>
                  <td className="px-8 py-5">
                    <div className={cn(
                      "inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest border",
                      user.role === 'TEACHER' ? "bg-purple-50 text-purple-600 border-purple-100" : "bg-blue-50 text-blue-600 border-blue-100"
                    )}>
                      <Shield size={10} />
                      {user.role}
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                       <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                       <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Active</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center justify-end gap-2">
                       <button className="p-2.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                          <Edit2 size={16} />
                       </button>
                       <button className="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all">
                          <Trash2 size={16} />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
