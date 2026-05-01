import { 
  Bell, 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  Trash2,
  MoreVertical,
  Calendar,
  Clock
} from "lucide-react";
import { cn } from "@/lib/utils";

const notifications = [
  {
    id: 1,
    title: "Course Content Updated",
    message: "New modules have been added to 'Advanced Web Architecture'. Check them out now!",
    type: "info",
    time: "2 hours ago",
    read: false
  },
  {
    id: 2,
    title: "Viva Marks Published",
    message: "Your viva results for 'Database Management Systems' are now available.",
    type: "success",
    time: "5 hours ago",
    read: false
  },
  {
    id: 3,
    title: "Exam Schedule Alert",
    message: "The final examination schedule for Semester 4 has been released. Please download your admit card.",
    type: "warning",
    time: "1 day ago",
    read: true
  },
  {
    id: 4,
    title: "Payment Successful",
    message: "Receipt for Semester Fees (2026-27) has been generated successfully.",
    type: "success",
    time: "2 days ago",
    read: true
  }
];

export default function NotificationsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-3xl font-black text-[#171b26] tracking-tight flex items-center gap-4">
             <Bell className="text-blue-600" size={32} />
             Notifications
          </h1>
          <p className="text-sm text-gray-500 font-medium mt-1 ml-12">Stay updated with the latest academic alerts and system announcements.</p>
        </div>
        
        <div className="flex items-center gap-3">
           <button className="px-6 py-3 bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest rounded-2xl hover:bg-gray-100 transition-all border border-gray-100 shadow-sm">
              Mark all as read
           </button>
        </div>
      </div>

      <div className="space-y-4">
        {notifications.map((notif) => (
          <div 
            key={notif.id} 
            className={cn(
              "group p-6 rounded-[32px] border transition-all relative overflow-hidden flex items-start gap-6 cursor-pointer",
              notif.read ? "bg-white border-gray-100" : "bg-blue-50/30 border-blue-100/50 shadow-sm ring-1 ring-blue-600/5"
            )}
          >
             <div className={cn(
                "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm",
                notif.type === 'info' && "bg-blue-100 text-blue-600",
                notif.type === 'success' && "bg-emerald-100 text-emerald-600",
                notif.type === 'warning' && "bg-orange-100 text-orange-600"
             )}>
                {notif.type === 'info' && <Info size={24} />}
                {notif.type === 'success' && <CheckCircle2 size={24} />}
                {notif.type === 'warning' && <AlertCircle size={24} />}
             </div>

             <div className="flex-1">
                <div className="flex items-center justify-between gap-4 mb-1">
                   <h3 className="text-sm font-black text-[#171b26] uppercase tracking-tight group-hover:text-blue-600 transition-colors">
                      {notif.title}
                   </h3>
                   <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest shrink-0">
                      <Clock size={12} />
                      {notif.time}
                   </div>
                </div>
                <p className="text-xs text-gray-500 font-medium leading-relaxed max-w-2xl">
                   {notif.message}
                </p>
             </div>

             <div className="flex items-center gap-2 self-center opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2.5 bg-gray-50 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all">
                   <Trash2 size={16} />
                </button>
                <button className="p-2.5 bg-gray-50 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                   <MoreVertical size={16} />
                </button>
             </div>

             {!notif.read && (
                <div className="absolute top-0 left-0 w-1 h-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.5)]" />
             )}
          </div>
        ))}
      </div>
      
      <div className="text-center pt-8">
         <button className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-blue-600 transition-colors">
            Load older notifications
         </button>
      </div>
    </div>
  );
}
