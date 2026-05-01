"use client";

interface DashboardHeaderProps {
  user: any;
}

export default function DashboardHeader({ user }: DashboardHeaderProps) {
  const date = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="mb-8 p-8 bg-white rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden">
      <div className="relative z-10">
        <p className="text-xs font-black text-gray-400 mb-2 flex items-center gap-2 uppercase tracking-widest">
          {greeting} <span className="w-1.5 h-1.5 rounded-full bg-blue-200" /> {date}
        </p>
        <h1 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">
          Welcome back, {user?.full_name?.toUpperCase() || "USER"}
        </h1>
        <p className="text-sm text-blue-600 font-bold italic">
          {user?.role === 'ADMIN' ? 'System Administrator' : 'Bachelor of Computer Application - Online'}
        </p>
        <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest font-black">Parul University</p>
      </div>

      <div className="absolute right-8 top-1/2 -translate-y-1/2 flex items-center gap-12 border-l pl-12 border-gray-100">
         <div className="text-center">
            <p className="text-2xl font-black text-blue-600">1%</p>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Avg Progress</p>
         </div>
         <div className="text-center">
            <p className="text-2xl font-black text-green-600">7</p>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Courses</p>
         </div>
         <div className="text-center">
            <p className="text-2xl font-black text-purple-600">75</p>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Exams Taken</p>
         </div>
      </div>
      
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-50/50 to-transparent pointer-events-none" />
    </div>
  );
}
