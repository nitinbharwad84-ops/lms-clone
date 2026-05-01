import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import JitsiMeetClassroom from "@/components/classroom/JitsiMeetClassroom";
import { ArrowLeft, Clock, Users, BookOpen } from "lucide-react";
import Link from "next/link";

export default async function LiveSessionRoomPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login");
  }

  // Get user profile details
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  // Mock session data (in a real app, you'd fetch this from the database using params.id)
  const sessionData = {
    id: params.id,
    title: "Practical Session - 5 Se Sem 2 July 2025 Batch",
    subject: "Software Engineering-2a-online-bca-july-2025-26",
    teacher: "Dr. Prashant Sahatiya",
    start: "May 2, 2026, 02:45 PM",
    end: "May 2, 2026, 03:45 PM",
    status: "LIVE"
  };

  return (
    <div className="max-w-7xl mx-auto py-6">
      {/* Header Info */}
      <div className="mb-6 flex items-center justify-between bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-4">
          <Link href="/live-sessions" className="p-2 bg-gray-50 text-gray-500 rounded-xl hover:bg-gray-100 transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-[10px] font-bold animate-pulse">
                {sessionData.status}
              </span>
              <h1 className="text-xl font-black text-gray-900">{sessionData.title}</h1>
            </div>
            <div className="flex items-center gap-4 mt-2 text-xs font-bold text-gray-500">
              <div className="flex items-center gap-1.5 text-blue-600">
                <BookOpen size={14} />
                <span>{sessionData.subject}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users size={14} />
                <span>Teacher: {sessionData.teacher}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={14} />
                <span>{sessionData.start} - {sessionData.end}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Classroom Container */}
      <div className="bg-white p-2 rounded-3xl border border-gray-100 shadow-sm">
        <JitsiMeetClassroom
          roomName={`session_${params.id}`}
          userName={profile?.full_name || user.email?.split("@")[0] || "Student"}
          userEmail={user.email || ""}
          userRole={profile?.role || "student"}
        />
      </div>
    </div>
  );
}
