import { createClient } from "@/utils/supabase/server";
import { 
  Download, 
  Printer, 
  QrCode, 
  User, 
  FileText, 
  GraduationCap,
  MapPin,
  Calendar,
  Clock,
  ShieldCheck
} from "lucide-react";
import { format } from "date-fns";
import { redirect } from "next/navigation";

/**
 * Renders the examination admit card page for the current authenticated user.
 *
 * Fetches the signed-in user's profile and redirects to `/login` when no user is present.
 * The rendered UI displays the user's avatar (or a fallback), name, roll number, program and exam details,
 * and static important instructions along with print and download actions.
 *
 * @returns The React element for the admit card UI for the authenticated user.
 */
export default async function AdmitCardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Examination Admit Card</h1>
          <p className="text-sm text-gray-500 font-medium mt-1">Download or print your official admit card for the upcoming examination cycle.</p>
        </div>
        <div className="flex items-center gap-3">
           <button className="flex items-center gap-2 px-6 py-3.5 bg-white border border-gray-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-600 hover:bg-gray-50 transition-all shadow-sm">
              <Printer size={16} />
              Print
           </button>
           <button className="flex items-center gap-2 px-6 py-3.5 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20">
              <Download size={16} />
              Download PDF
           </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
         <div className="bg-white rounded-[40px] shadow-2xl border border-gray-100 overflow-hidden relative group">
            {/* Header / Hero */}
            <div className="h-48 relative overflow-hidden">
               <img 
                 src="https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80&w=2070&auto=format&fit=crop" 
                 alt="University Gate" 
                 className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-[#171b26]/90 via-[#171b26]/40 to-transparent" />
               
               <div className="absolute top-8 left-8 flex items-center gap-4">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center p-2 shadow-2xl">
                     <div className="w-full h-full bg-blue-50 rounded-xl flex items-center justify-center text-center">
                        <span className="text-[#171b26] font-black text-[12px] leading-none">PARUL</span>
                     </div>
                  </div>
                  <div>
                     <h2 className="text-xl font-black text-white tracking-tight uppercase">Parul University</h2>
                     <p className="text-[10px] font-black text-yellow-400 uppercase tracking-widest mt-1">NAAC A++ Accredited</p>
                  </div>
               </div>

               <div className="absolute top-8 right-8">
                  <div className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-[10px] font-black text-white uppercase tracking-widest">
                     Exam Cycle: July 2025
                  </div>
               </div>
            </div>

            {/* Profile Section */}
            <div className="px-12 -mt-12 relative z-10 flex items-end justify-between">
               <div className="flex items-end gap-6">
                  <div className="w-32 h-32 rounded-[32px] border-[6px] border-white bg-gray-100 shadow-2xl overflow-hidden">
                     {profile?.avatar_url ? (
                        <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                     ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                           <User size={48} />
                        </div>
                     )}
                  </div>
                  <div className="pb-4">
                     <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight">{profile?.full_name || "STUDENT NAME"}</h3>
                     <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mt-1">{profile?.roll_number || "2301010101"}</p>
                  </div>
               </div>

               <div className="pb-4">
                  <div className="p-4 bg-white rounded-3xl border border-gray-100 shadow-xl flex flex-col items-center gap-2">
                     <QrCode size={64} className="text-[#171b26]" />
                     <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Verify Identity</p>
                  </div>
               </div>
            </div>

            {/* Details Grid */}
            <div className="p-12 pt-16 grid grid-cols-2 gap-x-12 gap-y-10">
               <div className="space-y-6">
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100 pb-3">Personal Information</h4>
                  <div className="grid grid-cols-2 gap-6">
                     <div>
                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Gender</p>
                        <p className="text-sm font-bold text-gray-800">Male</p>
                     </div>
                     <div>
                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Admission Year</p>
                        <p className="text-sm font-bold text-gray-800">2023-24</p>
                     </div>
                     <div>
                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">D.O.B</p>
                        <p className="text-sm font-bold text-gray-800">15 Aug 2002</p>
                     </div>
                     <div>
                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Blood Group</p>
                        <p className="text-sm font-bold text-gray-800">O+</p>
                     </div>
                  </div>
               </div>

               <div className="space-y-6">
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100 pb-3">Program Details</h4>
                  <div className="space-y-4">
                     <div>
                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Degree Program</p>
                        <p className="text-sm font-bold text-gray-800 uppercase">Bachelor of Computer Applications (BCA)</p>
                     </div>
                     <div>
                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Semester / Year</p>
                        <p className="text-sm font-bold text-gray-800">Semester 4 / Year 2</p>
                     </div>
                  </div>
               </div>

               <div className="col-span-full space-y-6 pt-4">
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100 pb-3">Examination Center</h4>
                  <div className="flex items-start gap-4 p-6 bg-blue-50/50 rounded-3xl border border-blue-100/50">
                     <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm shrink-0">
                        <MapPin size={24} />
                     </div>
                     <div>
                        <p className="text-sm font-black text-[#171b26] uppercase tracking-tight">Main Campus Examination Hall-B</p>
                        <p className="text-xs font-medium text-gray-500 mt-1">Parul University Campus, Post Limda, Waghodia, Gujarat 391760</p>
                     </div>
                  </div>
               </div>

               <div className="col-span-full bg-gray-50 p-8 rounded-[32px] border border-gray-100 mt-4">
                  <div className="flex items-center gap-3 text-blue-600 mb-4">
                     <ShieldCheck size={20} />
                     <p className="text-xs font-black uppercase tracking-widest">Important Instructions</p>
                  </div>
                  <ul className="space-y-3">
                     {[
                        "Candidate must carry this Admit Card with a valid Photo ID proof.",
                        "Reach the examination center at least 45 minutes before the start time.",
                        "Calculators, mobile phones, or any electronic devices are strictly prohibited.",
                        "Follow all instructions provided by the invigilator during the exam."
                     ].map((text, i) => (
                        <li key={i} className="flex items-start gap-3">
                           <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                           <p className="text-[11px] text-gray-600 font-medium leading-relaxed">{text}</p>
                        </li>
                     ))}
                  </ul>
               </div>
            </div>

            <div className="bg-[#171b26] p-8 text-center border-t border-white/5">
               <p className="text-[9px] font-black text-gray-500 uppercase tracking-[0.3em]">Computer Generated Document - Official Digital Admit Card</p>
            </div>
         </div>
      </div>
    </div>
  );
}
