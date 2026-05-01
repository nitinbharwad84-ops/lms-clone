"use client";

import { useState } from "react";
import { Search, Calendar, Video, ChevronRight, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const liveSessions = [
  { id: "034710", title: "Practical Session - 5 Se Sem 2 July 2025 Batch", subject: "Software Engineering-2a-online-bca-july-2025-26", teacher: "Dr. Prashant Sahatiya", start: "May 2, 2026, 02:45 PM", end: "May 2, 2026, 03:45 PM", status: "UPCOMING" },
  { id: "034772", title: "Live Session - 9 Iks - Sem 2 - July 2025 Batch", subject: "Indian Knowledge System-2a-online-bca-july-2025-26", teacher: "Mukul Gandhi", start: "May 1, 2026, 05:00 PM", end: "May 1, 2026, 06:00 PM", status: "UPCOMING" },
  { id: "034600", title: "Doubt Solving Session - 7 Pom Sem 2 July 2025 Batch", subject: "Principles Of Management-2a-online-bca-july-2025-26", teacher: "Mrs. Preksha Dandvate", start: "May 1, 2026, 02:45 PM", end: "May 1, 2026, 03:45 PM", status: "UPCOMING" },
  { id: "034771", title: "Live Session - 8 Iks - Sem 2 - July 2025 Batch", subject: "Indian Knowledge System-2a-online-bca-july-2025-26", teacher: "Mukul Gandhi", start: "Apr 30, 2026, 05:05 PM", end: "Apr 30, 2026, 06:05 PM", status: "LIVE" },
];

export default function LiveSessionsPage() {
  const [filterStatus, setFilterStatus] = useState("ALL");

  return (
    <div className="max-w-7xl mx-auto py-8">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Live Class Rooms</h1>
          <p className="text-sm text-gray-500 font-medium mt-1">View all the live class rooms and make changes according to your use</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden mb-8">
        <div className="p-6 grid grid-cols-4 gap-4 bg-gray-50/30 border-b border-gray-100">
           <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input type="text" placeholder="Start date" className="w-full bg-white border border-gray-200 rounded-xl py-2 pl-10 pr-4 text-xs outline-none focus:border-blue-500" />
           </div>
           <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input type="text" placeholder="Search class" className="w-full bg-white border border-gray-200 rounded-xl py-2 pl-10 pr-4 text-xs outline-none focus:border-blue-500" />
           </div>
           <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <select className="w-full bg-white border border-gray-200 rounded-xl py-2 pl-10 pr-4 text-xs outline-none appearance-none focus:border-blue-500">
                 <option>Search subject</option>
              </select>
           </div>
           <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-[10px]">STATUS</div>
              <select 
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-xl py-2 pl-14 pr-4 text-xs outline-none appearance-none focus:border-blue-500 font-bold text-gray-700"
              >
                 <option value="ALL">All Status</option>
                 <option value="UPCOMING">Upcoming</option>
                 <option value="LIVE">Live</option>
                 <option value="COMPLETED">Completed</option>
              </select>
           </div>
        </div>

        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
           <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input type="text" placeholder="Search here..." className="w-full bg-white border border-gray-200 rounded-xl py-2 pl-10 pr-4 text-xs outline-none focus:border-blue-500" />
           </div>
           <div className="flex items-center gap-4 text-xs font-bold text-gray-400">
              <span>1-25 of 231</span>
              <div className="flex items-center gap-1">
                 <button className="px-3 py-1 bg-white border border-blue-500 text-blue-600 rounded-lg">1</button>
                 <button className="px-3 py-1 hover:bg-gray-100 rounded-lg">2</button>
                 <ChevronRight size={14} />
              </div>
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Subjects</th>
                <th className="px-6 py-4">Teacher</th>
                <th className="px-6 py-4">Start Date & Time</th>
                <th className="px-6 py-4">End Date & Time</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {liveSessions.map((session) => (
                <tr key={session.id} className="group hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 text-[11px] font-bold text-gray-500">{session.id}</td>
                  <td className="px-6 py-4">
                    <p className="text-[11px] font-bold text-gray-800 leading-tight max-w-[200px]">{session.title}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-[10px] font-medium text-gray-500 leading-tight max-w-[180px]">{session.subject}</p>
                  </td>
                  <td className="px-6 py-4 text-[11px] font-bold text-gray-700">{session.teacher}</td>
                  <td className="px-6 py-4 text-[11px] font-medium text-gray-500">{session.start}</td>
                  <td className="px-6 py-4 text-[11px] font-medium text-gray-500">{session.end}</td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[9px] font-bold",
                      session.status === "LIVE" ? "bg-red-50 text-red-600 animate-pulse" : "bg-orange-50 text-orange-600"
                    )}>
                      {session.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/live-sessions/${session.id}`} className="text-gray-400 hover:text-blue-600 border border-gray-200 px-4 py-1.5 rounded-lg text-[11px] font-bold hover:border-blue-500 transition-all inline-block">
                      View
                    </Link>
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
