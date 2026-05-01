"use client";

import { 
  BookOpen, 
  Layout, 
  Video, 
  BarChart3, 
  CreditCard, 
  Headphones, 
  Library 
} from "lucide-react";

const actions = [
  { name: "Continue Learning", icon: BookOpen, color: "bg-blue-50 text-blue-600" },
  { name: "Courses", icon: Layout, color: "bg-green-50 text-green-600" },
  { name: "Join Live Session", icon: Video, color: "bg-red-50 text-red-600" },
  { name: "View Results", icon: BarChart3, color: "bg-purple-50 text-purple-600" },
  { name: "Fee Payment", icon: CreditCard, color: "bg-amber-50 text-amber-600" },
  { name: "Help & Support", icon: Headphones, color: "bg-teal-50 text-teal-600" },
  { name: "Classrooms", icon: Library, color: "bg-indigo-50 text-indigo-600" }
];

export default function QuickActions() {
  return (
    <div className="grid grid-cols-7 gap-4 mb-8">
      {actions.map((action) => (
        <button 
          key={action.name}
          className="flex flex-col items-center gap-3 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group"
        >
          <div className={`w-12 h-12 rounded-xl ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
            <action.icon size={20} />
          </div>
          <span className="text-[11px] font-semibold text-gray-700 text-center leading-tight">
            {action.name}
          </span>
        </button>
      ))}
    </div>
  );
}
