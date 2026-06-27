"use client";

import { Search, Bell, User } from "lucide-react";

interface NavbarProps {
  user: any;
}

/**
 * Render the top navigation bar containing search, notifications, and user profile controls.
 *
 * Renders a sticky header with a search input (placeholder: "Search courses, exams, resources..."), a notifications button with a red indicator, and a user area that shows the user's full name (falls back to "GUEST USER"), a secondary line that displays "System Administrator" when `user.role === 'ADMIN'` or the user's `degree` (falls back to "Bachelor of Computer Application"), and an avatar (uses `user.avatar_url` or a fallback icon) with a green status badge.
 *
 * @param user - The current user object. Expected fields (optional): `full_name`, `role`, `degree`, `avatar_url`.
 * @returns The header JSX element for the navigation bar.
 */
export default function Navbar({ user }: NavbarProps) {
  return (
    <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-10 sticky top-0 z-40 ml-64 shadow-sm backdrop-blur-md bg-white/80">
      {/* ... (search section same) ... */}
      <div className="flex-1 max-w-2xl">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-sidebar-active transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search courses, exams, resources..." 
            className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-sidebar-active/30 focus:ring-4 focus:ring-sidebar-active/5 rounded-2xl py-3 pl-12 pr-4 text-sm font-medium transition-all outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-5">
        <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-sidebar-active transition-all relative border border-gray-100">
          <Bell size={20} />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </button>

        <div className="h-10 w-px bg-gray-100 mx-2" />

        <div className="flex items-center gap-4 group cursor-pointer">
          <div className="text-right hidden xl:block">
            <p className="text-[13px] font-black text-gray-900 leading-none mb-1 group-hover:text-sidebar-active transition-colors uppercase">
              {user?.full_name || "GUEST USER"}
            </p>
            <p className="text-[10px] text-gray-500 font-bold leading-none uppercase tracking-wider">
              {user?.role === 'ADMIN' ? 'System Administrator' : (user?.degree || 'Bachelor of Computer Application')}
            </p>
          </div>
          <div className="relative">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-sidebar-active to-blue-400 p-0.5 shadow-lg shadow-sidebar-active/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full rounded-[14px] bg-white flex items-center justify-center overflow-hidden">
                {user?.avatar_url ? (
                  <img src={user.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User size={22} className="text-sidebar-active" />
                )}
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-sm" />
          </div>
        </div>
      </div>
    </header>
  );
}
