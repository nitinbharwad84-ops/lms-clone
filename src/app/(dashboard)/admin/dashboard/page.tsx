import { createClient } from "@/utils/supabase/server";
import { 
  Users, 
  BookOpen, 
  GraduationCap, 
  TrendingUp,
  UserPlus,
  BookPlus,
  ShieldCheck,
  MoreVertical,
  Activity
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default async function AdminDashboard() {
  const supabase = await createClient();

  // Fetch Stats
  const { count: totalStudents } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true })
    .eq("role", "STUDENT");

  const { count: totalTeachers } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true })
    .eq("role", "TEACHER");

  const { count: totalCourses } = await supabase
    .from("courses")
    .select("*", { count: "exact", head: true });

  const { data: recentUsers } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5);

  const stats = [
    { name: "Total Students", value: totalStudents || 0, icon: GraduationCap, color: "text-blue-600", bg: "bg-blue-50" },
    { name: "Total Teachers", value: totalTeachers || 0, icon: Users, color: "text-purple-600", bg: "bg-purple-50" },
    { name: "Active Courses", value: totalCourses || 0, icon: BookOpen, color: "text-emerald-600", bg: "bg-emerald-50" },
    { name: "Global Activity", value: "84%", icon: Activity, color: "text-orange-600", bg: "bg-orange-50" },
  ];

  return (
    <div className="space-y-10 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm relative overflow-hidden group">
        <div className="relative z-10">
          <h1 className="text-4xl font-black text-[#171b26] tracking-tight">Admin Control Center</h1>
          <p className="text-sm text-gray-500 font-medium mt-2 max-w-xl">
            Welcome back, System Admin. Manage your institution's infrastructure, users, and academic content from this central hub.
          </p>
        </div>
        
        <div className="flex items-center gap-4 relative z-10">
           <Link href="/admin/users" className="flex items-center gap-3 px-8 py-4 bg-[#171b26] text-white rounded-[22px] text-xs font-black uppercase tracking-widest hover:bg-black transition-all shadow-2xl shadow-black/20">
              <UserPlus size={18} />
              Add User
           </Link>
           <Link href="/admin/courses" className="flex items-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-[22px] text-xs font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-2xl shadow-blue-600/20">
              <BookPlus size={18} />
              New Course
           </Link>
        </div>

        {/* Abstract Background Decoration */}
        <div className="absolute top-[-50%] right-[-10%] w-96 h-96 bg-blue-50 rounded-full blur-[100px] opacity-50 group-hover:opacity-80 transition-opacity" />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-8 rounded-[36px] border border-gray-100 shadow-sm hover:shadow-xl hover:translate-y-[-4px] transition-all group">
            <div className="flex items-center justify-between mb-6">
               <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110", stat.bg, stat.color)}>
                  <stat.icon size={28} />
               </div>
               <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest bg-gray-50 px-3 py-1 rounded-full">Global</span>
            </div>
            <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.15em] mb-1">{stat.name}</h3>
            <p className="text-3xl font-black text-[#171b26] tracking-tight">{stat.value}</p>
            <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-emerald-600">
               <TrendingUp size={14} />
               <span>+12% from last month</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Users */}
        <div className="lg:col-span-2 bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden flex flex-col">
           <div className="px-10 py-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
              <div>
                 <h2 className="text-xl font-black text-[#171b26] tracking-tight">Recent User Onboarding</h2>
                 <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Latest 5 registrations</p>
              </div>
              <Link href="/admin/users" className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">View All Users</Link>
           </div>
           
           <div className="flex-1">
              <table className="w-full text-left">
                 <thead>
                    <tr className="border-b border-gray-50">
                       <th className="px-10 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">User</th>
                       <th className="px-10 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Role</th>
                       <th className="px-10 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Email</th>
                       <th className="px-10 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Joined</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-50">
                    {recentUsers?.map((user) => (
                       <tr key={user.id} className="group hover:bg-gray-50/50 transition-colors">
                          <td className="px-10 py-5">
                             <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-gray-100 border border-gray-200 overflow-hidden flex items-center justify-center">
                                   {user.avatar_url ? (
                                      <img src={user.avatar_url} className="w-full h-full object-cover" />
                                   ) : (
                                      <ShieldCheck className="text-gray-300" size={20} />
                                   )}
                                </div>
                                <p className="text-sm font-black text-[#171b26] group-hover:text-blue-600 transition-colors uppercase truncate max-w-[150px]">{user.full_name}</p>
                             </div>
                          </td>
                          <td className="px-10 py-5">
                             <span className={cn(
                               "px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest",
                               user.role === 'TEACHER' ? "bg-purple-50 text-purple-600 border border-purple-100" : "bg-blue-50 text-blue-600 border border-blue-100"
                             )}>
                                {user.role}
                             </span>
                          </td>
                          <td className="px-10 py-5">
                             <p className="text-[11px] font-bold text-gray-500">{user.email}</p>
                          </td>
                          <td className="px-10 py-5 text-right">
                             <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                {new Date(user.created_at).toLocaleDateString()}
                             </p>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>

        {/* Quick Actions / Activity */}
        <div className="bg-[#171b26] rounded-[40px] p-10 text-white shadow-2xl relative overflow-hidden flex flex-col justify-between">
           <div className="relative z-10">
              <h2 className="text-2xl font-black tracking-tight mb-2">System Health</h2>
              <div className="flex items-center gap-2 mb-8">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                 <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em]">Operational</span>
              </div>

              <div className="space-y-6">
                 {[
                   { label: "Database Sync", status: "Perfect", value: 100 },
                   { label: "Auth Services", status: "Stable", value: 98 },
                   { label: "Storage API", status: "Active", value: 100 },
                 ].map((item) => (
                    <div key={item.label} className="space-y-2">
                       <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-gray-400">
                          <span>{item.label}</span>
                          <span className="text-white">{item.status}</span>
                       </div>
                       <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: `${item.value}%` }} />
                       </div>
                    </div>
                 ))}
              </div>
           </div>

           <div className="relative z-10 mt-10">
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">Quick Shortcuts</p>
              <div className="grid grid-cols-2 gap-4">
                 <Link href="/admin/users" className="p-4 bg-white/5 border border-white/10 rounded-2xl flex flex-col gap-2 hover:bg-white/10 transition-all">
                    <Users size={20} className="text-blue-400" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Users</span>
                 </Link>
                 <Link href="/admin/courses" className="p-4 bg-white/5 border border-white/10 rounded-2xl flex flex-col gap-2 hover:bg-white/10 transition-all">
                    <BookOpen size={20} className="text-purple-400" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Courses</span>
                 </Link>
              </div>
           </div>

           {/* Abstract Background Decoration */}
           <div className="absolute bottom-[-10%] left-[-20%] w-64 h-64 bg-blue-600 rounded-full blur-[80px] opacity-20" />
        </div>
      </div>
    </div>
  );
}
