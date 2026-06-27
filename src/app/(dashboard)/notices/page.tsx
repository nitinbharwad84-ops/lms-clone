import { 
  Megaphone, 
  Search, 
  Calendar, 
  ChevronRight, 
  FileText,
  Download,
  ExternalLink,
  Tag
} from "lucide-react";
import { cn } from "@/lib/utils";

const notices = [
  {
    id: 1,
    title: "University Convocation 2026 - Registration Open",
    date: "April 28, 2026",
    category: "Event",
    description: "All graduating students are invited to register for the upcoming convocation ceremony. Registration closes on May 15th.",
    priority: "High"
  },
  {
    id: 2,
    title: "Semester Break & Summer Internship Guidelines",
    date: "April 25, 2026",
    category: "Academic",
    description: "Please find the updated guidelines for summer internships and the semester break schedule in the attached PDF.",
    priority: "Normal"
  },
  {
    id: 3,
    title: "New Research Grant Opportunities for Faculty",
    date: "April 20, 2026",
    category: "Research",
    description: "Applications are now open for the Annual Research Excellence Grant. Interested faculty members can apply online.",
    priority: "Normal"
  },
  {
    id: 4,
    title: "Campus-wide Wi-Fi Maintenance Schedule",
    date: "April 15, 2026",
    category: "IT Support",
    description: "Planned maintenance for the campus Wi-Fi network will occur this Saturday between 10:00 PM and 4:00 AM.",
    priority: "Low"
  }
];

/**
 * Render the University Notices page with a searchable header and a list of notice cards.
 *
 * Displays a title row with a megaphone icon, a subtitle, a search input, and a decorative background.
 * Renders a grid of notice cards derived from the module's `notices` array; each card shows parsed date parts,
 * a category badge (with color variants), an optional "Urgent" badge for high-priority items, the title,
 * description, and action buttons for downloading or learning more.
 *
 * @returns The page's rendered JSX element containing the notices list and header
 */
export default function NoticesPage() {
  return (
    <div className="space-y-10 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm relative overflow-hidden group">
        <div className="relative z-10">
          <h1 className="text-4xl font-black text-[#171b26] tracking-tight flex items-center gap-4">
             <Megaphone className="text-blue-600" size={36} />
             University Notices
          </h1>
          <p className="text-sm text-gray-500 font-medium mt-2 ml-1">Official announcements, event alerts, and administrative updates from the institution.</p>
        </div>
        
        <div className="relative z-10 w-full md:w-80 group/search">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within/search:text-blue-600 transition-colors" size={18} />
           <input 
             type="text" 
             placeholder="Search notices..." 
             className="w-full bg-gray-50 border-2 border-transparent focus:bg-white focus:border-blue-600/20 rounded-[20px] py-3.5 pl-12 pr-6 text-xs font-black uppercase tracking-widest outline-none transition-all shadow-sm"
           />
        </div>

        <div className="absolute top-[-50%] left-[-10%] w-96 h-96 bg-blue-50 rounded-full blur-[100px] opacity-40 group-hover:opacity-60 transition-opacity" />
      </div>

      <div className="grid grid-cols-1 gap-6">
        {notices.map((notice) => (
          <div 
            key={notice.id} 
            className="bg-white rounded-[36px] border border-gray-100 p-8 shadow-sm hover:shadow-xl hover:translate-x-2 transition-all group flex flex-col md:flex-row gap-8 items-start relative"
          >
             <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-[24px] border border-gray-100 min-w-[100px] shrink-0">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                   {notice.date.split(' ')[0]}
                </span>
                <span className="text-2xl font-black text-[#171b26] leading-none mb-1">
                   {notice.date.split(' ')[1].replace(',', '')}
                </span>
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">
                   {notice.date.split(' ')[2]}
                </span>
             </div>

             <div className="flex-1 space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                   <div className={cn(
                      "px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest flex items-center gap-2",
                      notice.category === 'Academic' ? "bg-blue-50 text-blue-600 border border-blue-100" :
                      notice.category === 'Event' ? "bg-purple-50 text-purple-600 border border-purple-100" :
                      notice.category === 'Research' ? "bg-emerald-50 text-emerald-600 border border-emerald-100" :
                      "bg-gray-50 text-gray-500 border border-gray-100"
                   )}>
                      <Tag size={10} />
                      {notice.category}
                   </div>
                   {notice.priority === 'High' && (
                      <div className="px-3 py-1 rounded-lg bg-red-50 text-red-600 border border-red-100 text-[9px] font-black uppercase tracking-widest">
                         Urgent
                      </div>
                   )}
                </div>

                <div>
                   <h2 className="text-xl font-black text-[#171b26] tracking-tight group-hover:text-blue-600 transition-colors uppercase">
                      {notice.title}
                   </h2>
                   <p className="text-sm text-gray-500 font-medium leading-relaxed mt-2 max-w-4xl">
                      {notice.description}
                   </p>
                </div>

                <div className="flex items-center gap-4 pt-2">
                   <button className="flex items-center gap-2 px-5 py-2.5 bg-gray-50 text-gray-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-100 transition-all border border-gray-100">
                      <Download size={14} />
                      Download PDF
                   </button>
                   <button className="flex items-center gap-2 px-5 py-2.5 bg-white text-blue-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-50 transition-all border border-blue-100">
                      <ExternalLink size={14} />
                      Learn More
                   </button>
                </div>
             </div>

             <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                <ChevronRight size={32} className="text-blue-600/20" />
             </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center pt-6">
         <button className="px-10 py-4 bg-white border border-gray-100 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] rounded-[24px] hover:text-[#171b26] hover:border-[#171b26] transition-all shadow-sm">
            Explore Notice Archives
         </button>
      </div>
    </div>
  );
}
