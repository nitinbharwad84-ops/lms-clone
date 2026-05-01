"use client";

import { useState } from "react";
import { 
  UserPlus, 
  X, 
  User, 
  Mail, 
  Lock, 
  Shield, 
  AlertCircle,
  Loader2,
  CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createUser } from "@/lib/user-actions";
import { useRouter } from "next/navigation";

/**
 * Renders an "Add New User" control and modal form for creating user profiles.
 *
 * The component manages modal visibility, displays a form with full name, role,
 * email, and password fields, and handles submission to create a user. It shows
 * loading, error, and success states, prevents closing while a submission is in
 * progress, and refreshes the parent route after a successful creation.
 *
 * @returns The React element tree for the user management UI (button and modal form).
 */
export default function UserManagementClient() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    const result = await createUser(formData);

    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      setSuccess(true);
      setTimeout(() => {
        setIsOpen(false);
        setSuccess(false);
        setLoading(false);
        router.refresh();
      }, 1500);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-[22px] text-xs font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-2xl shadow-blue-600/20"
      >
        <UserPlus size={18} />
        Add New User
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#171b26]/60 backdrop-blur-sm" onClick={() => !loading && setIsOpen(false)} />
          
          <div className="bg-white w-full max-w-xl rounded-[40px] shadow-2xl relative z-10 overflow-hidden animate-in fade-in zoom-in duration-300">
             <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
                <div>
                   <h2 className="text-2xl font-black text-[#171b26] tracking-tight">Onboard New User</h2>
                   <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Fill in the details to create a new profile</p>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-3 text-gray-400 hover:text-[#171b26] hover:bg-white rounded-2xl transition-all"
                >
                   <X size={20} />
                </button>
             </div>

             <form onSubmit={handleSubmit} className="p-8 space-y-6">
                {error && (
                   <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-3 text-red-600">
                      <AlertCircle size={18} className="shrink-0 mt-0.5" />
                      <p className="text-[11px] font-bold uppercase tracking-widest">{error}</p>
                   </div>
                )}

                {success && (
                   <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-start gap-3 text-emerald-600">
                      <CheckCircle2 size={18} className="shrink-0 mt-0.5" />
                      <p className="text-[11px] font-bold uppercase tracking-widest">User created successfully!</p>
                   </div>
                )}

                <div className="grid grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                      <div className="relative group">
                         <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                         <input 
                           required
                           name="full_name"
                           type="text" 
                           placeholder="Enter full name" 
                           className="w-full bg-gray-50 border-2 border-transparent focus:bg-white focus:border-blue-600/20 rounded-2xl py-3.5 pl-12 pr-6 text-sm font-bold outline-none transition-all shadow-sm"
                         />
                      </div>
                   </div>

                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Role</label>
                      <div className="relative group">
                         <Shield className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                         <select 
                           name="role"
                           className="w-full bg-gray-50 border-2 border-transparent focus:bg-white focus:border-blue-600/20 rounded-2xl py-3.5 pl-12 pr-6 text-sm font-bold outline-none transition-all appearance-none shadow-sm cursor-pointer"
                         >
                            <option value="STUDENT">Student</option>
                            <option value="TEACHER">Teacher</option>
                            <option value="ADMIN">Administrator</option>
                         </select>
                      </div>
                   </div>
                </div>

                <div className="space-y-2">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                   <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                      <input 
                        required
                        name="email"
                        type="email" 
                        placeholder="user@paruluniversity.ac.in" 
                        className="w-full bg-gray-50 border-2 border-transparent focus:bg-white focus:border-blue-600/20 rounded-2xl py-3.5 pl-12 pr-6 text-sm font-bold outline-none transition-all shadow-sm"
                      />
                   </div>
                </div>

                <div className="space-y-2">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Password</label>
                   <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                      <input 
                        required
                        name="password"
                        type="password" 
                        placeholder="••••••••" 
                        className="w-full bg-gray-50 border-2 border-transparent focus:bg-white focus:border-blue-600/20 rounded-2xl py-3.5 pl-12 pr-6 text-sm font-bold outline-none transition-all shadow-sm"
                      />
                   </div>
                </div>

                <div className="pt-4 flex items-center gap-4">
                   <button 
                     type="button"
                     onClick={() => setIsOpen(false)}
                     disabled={loading}
                     className="flex-1 px-8 py-4 bg-gray-50 text-gray-400 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-gray-100 transition-all"
                   >
                      Cancel
                   </button>
                   <button 
                     type="submit"
                     disabled={loading}
                     className="flex-[2] flex items-center justify-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-[22px] text-xs font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-2xl shadow-blue-600/20 disabled:opacity-50"
                   >
                      {loading ? (
                         <>
                            <Loader2 size={18} className="animate-spin" />
                            Processing...
                         </>
                      ) : (
                         <>
                            <UserPlus size={18} />
                            Create Profile
                         </>
                      )}
                   </button>
                </div>
             </form>
          </div>
        </div>
      )}
    </>
  );
}
