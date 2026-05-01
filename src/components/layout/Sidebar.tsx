"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  Bell, 
  BookOpen, 
  Video, 
  Layout, 
  ClipboardCheck, 
  BarChart3, 
  FileText, 
  Library, 
  GraduationCap, 
  CreditCard, 
  Calendar, 
  FileEdit,
  User,
  ChevronDown,
  Award,
  CheckSquare,
  ClipboardList,
  Users,
  LayoutDashboard,
  ShieldCheck,
  Megaphone
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface MenuItem {
  name: string;
  icon: any;
  href: string;
  subItems?: { name: string; href: string }[];
}

interface MenuGroup {
  group: string;
  items: MenuItem[];
}

const getMenuItems = (role: string): MenuGroup[] => {
  const items: MenuGroup[] = [
    { group: "DASHBOARD", items: [
      { name: "Home", icon: Home, href: "/dashboard" },
      { name: "Notices", icon: Megaphone, href: "/notices" },
      { name: "Notifications", icon: Bell, href: "/notifications" },
    ]},
  ];

  if (role === 'TEACHER') {
    items.push({
      group: "TEACHING", items: [
        { name: "My Assigned Courses", icon: BookOpen, href: "/teaching/courses" },
        { name: "Student List", icon: Users, href: "/teaching/students" },
        { name: "Assessments", icon: ClipboardList, href: "/teaching/assessments" },
      ]
    });
  }

  if (role === 'ADMIN') {
    items.push({
      group: "ADMINISTRATION", items: [
        { name: "Admin Dashboard", icon: LayoutDashboard, href: "/admin/dashboard" },
        { name: "User Management", icon: Users, href: "/admin/users" },
        { name: "Course Management", icon: BookOpen, href: "/admin/courses" },
        { name: "Enrollment", icon: ShieldCheck, href: "/admin/enrollments" },
      ]
    });
  }

  items.push(
    { group: "LEARNING", items: [
      { name: "Programs", icon: Layout, href: "/programs" },
      { name: "Courses", icon: BookOpen, href: "/courses" },
      { name: "Live Sessions", icon: Video, href: "/live-sessions" },
      { name: "Classroom", icon: Library, href: "/classroom" },
    ]},
    { group: "ASSESSMENTS", items: [
      { name: "Exam Reports", icon: ClipboardCheck, href: "/exam-reports" },
      { 
        name: "Results", 
        icon: Award, 
        href: "/results",
        subItems: [
          { name: "Program Results", href: "/results/program" },
          { name: "Provisional Results", href: "/results/provisional" }
        ]
      },
      { 
        name: "Exams", 
        icon: FileText, 
        href: "/exams",
        subItems: [
          { name: "Exam List", href: "/exams/list" },
          { name: "Admit Card", href: "/exams/admit-card" }
        ]
      },
    ]},
    { group: "MANAGEMENT", items: [
      { name: "Booksets", icon: Library, href: "/booksets" },
      { name: "Viva Marks", icon: GraduationCap, href: "/viva-marks" },
      { name: "Payments", icon: CreditCard, href: "/payments" },
      { name: "Time Table", icon: Calendar, href: "/timetable" },
      { name: "Dynamic Forms", icon: FileEdit, href: "/forms" },
    ]}
  );

  return items;
};

interface SidebarProps {
  user: any;
}

export default function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>(["Results", "Exams"]);
  const menuItems = getMenuItems(user?.role || 'STUDENT');

  const toggleExpand = (name: string) => {
    setExpandedItems(prev => 
      prev.includes(name) ? prev.filter(i => i !== name) : [...prev, name]
    );
  };

  return (
    <aside className="w-64 bg-sidebar-bg text-sidebar-foreground h-screen flex flex-col fixed left-0 top-0 z-50 shadow-xl border-r border-gray-800">
      <div className="flex flex-col h-full sidebar-scroll overflow-y-auto">
        <div className="p-6">
          {/* ... (logo and nav section same) ... */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center p-1.5 shadow-sm">
              <div className="w-full h-full bg-blue-50 rounded-lg flex items-center justify-center text-center">
                <span className="text-[#171b26] font-black text-[10px] leading-none">PARUL</span>
              </div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-white font-black text-sm tracking-tight leading-none mb-1">Parul University</h1>
              <div className="flex items-center gap-1.5">
                <span className="bg-yellow-400 text-[8px] font-black text-black px-1.5 py-0.5 rounded-sm uppercase tracking-tighter">NAAC A++</span>
              </div>
            </div>
          </div>

          <nav className="space-y-9">
            {menuItems.map((group) => (
              <div key={group.group}>
                <p className="text-[10px] font-black text-gray-500 tracking-[0.15em] mb-4 px-2 uppercase">
                  {group.group}
                </p>
                <ul className="space-y-1">
                  {group.items.map((item) => {
                    const hasSubItems = item.subItems && item.subItems.length > 0;
                    const isExpanded = expandedItems.includes(item.name);
                    const isActive = pathname === item.href || item.subItems?.some(s => s.href === pathname);
                    
                    return (
                      <li key={item.name}>
                        <div 
                          onClick={() => hasSubItems && toggleExpand(item.name)}
                          className={cn(
                            "flex items-center justify-between px-3 py-2.5 rounded-xl transition-all text-[13px] group relative cursor-pointer",
                            isActive && !hasSubItems
                              ? "bg-sidebar-active-bg text-sidebar-active font-bold" 
                              : "hover:bg-white/5 hover:text-white"
                          )}
                        >
                          <Link href={hasSubItems ? "#" : item.href} className="flex items-center gap-3 flex-1">
                            <item.icon size={18} className={cn(
                              "transition-colors",
                              isActive ? "text-sidebar-active" : "text-gray-500 group-hover:text-gray-300"
                            )} />
                            {item.name}
                          </Link>
                          {hasSubItems && (
                            <ChevronDown 
                              size={14} 
                              className={cn("transition-transform duration-300", isExpanded ? "rotate-180" : "")} 
                            />
                          )}
                          {isActive && !hasSubItems && (
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-sidebar-active rounded-l-full shadow-[0_0_10px_rgba(37,99,235,0.5)]" />
                          )}
                        </div>

                        {hasSubItems && isExpanded && (
                          <ul className="mt-1 ml-9 space-y-1">
                            {item.subItems!.map((subItem) => {
                              const isSubActive = pathname === subItem.href;
                              return (
                                <li key={subItem.name}>
                                  <Link
                                    href={subItem.href}
                                    className={cn(
                                      "block py-2 text-[12px] transition-all",
                                      isSubActive ? "text-sidebar-active font-bold" : "text-gray-500 hover:text-white"
                                    )}
                                  >
                                    {subItem.name}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-4 bg-black/20 backdrop-blur-sm border-t border-gray-800/50">
          <div className="flex items-center gap-3 px-3 py-3 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
            <div className="w-9 h-9 rounded-full bg-sidebar-active/20 flex items-center justify-center border border-sidebar-active/30 overflow-hidden">
              {user?.avatar_url ? (
                <img src={user.avatar_url} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User className="w-5 h-5 text-sidebar-active" />
              )}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-xs font-bold text-white truncate group-hover:text-sidebar-active transition-colors uppercase">
                {user?.full_name || "GUEST USER"}
              </p>
              <p className="text-[10px] text-gray-500 font-medium truncate">
                {user?.roll_number || "2301010101"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
