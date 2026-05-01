"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, Lock, ArrowRight, GraduationCap, UserCircle } from "lucide-react";
import { cn } from "@/lib/utils";

import { signIn } from "@/lib/auth-actions";

/**
 * Render the client login page with a student/teacher role toggle, credential form, and inline error display.
 *
 * The component tracks the selected role (`"STUDENT"` | `"TEACHER"`), an `isLoading` flag for authentication in progress, and an `error` message shown when sign-in fails.
 *
 * @returns The login page's JSX element.
 */
export default function LoginPage() {
  const [role, setRole] = useState<"STUDENT" | "TEACHER">("STUDENT");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    setError(null);
    
    const result = await signIn(formData);
    
    if (result?.error) {
      setError(result.error);
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-[800px] w-full max-w-[1200px] bg-white rounded-[40px] overflow-hidden shadow-2xl shadow-blue-900/10 border border-white">
      {/* ... (left side graphic same) ... */}
      <div className="hidden lg:flex lg:w-1/2 bg-blue-50 relative p-12 flex-col justify-between overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center p-2 shadow-sm">
               <span className="text-[#171b26] font-black text-xs leading-none text-center uppercase">Parul</span>
            </div>
            <div>
              <h2 className="text-xl font-black text-blue-950 tracking-tight leading-none mb-1">Parul University</h2>
              <span className="bg-yellow-400 text-[10px] font-black text-black px-2 py-0.5 rounded-sm uppercase">NAAC A++</span>
            </div>
          </div>
          
          <h3 className="text-4xl font-black text-blue-950 leading-[1.1] mb-6">
            Your gateway to <br />
            <span className="text-blue-600">Advanced Learning.</span>
          </h3>
          <p className="text-blue-900/60 font-medium max-w-sm">
            Empowering students and teachers with a state-of-the-art Learning Management System.
          </p>
        </div>

        <div className="relative z-10 w-full aspect-square max-w-[450px] mx-auto scale-110">
          <Image 
            src="/login-graphic.png" 
            alt="Learning Illustration" 
            fill
            className="object-contain"
          />
        </div>

        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-200/30 rounded-full blur-3xl" />
      </div>

      <div className="w-full lg:w-1/2 p-8 md:p-16 flex flex-col justify-center">
        <div className="max-w-[400px] mx-auto w-full">
          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-3xl font-black text-gray-900 mb-3">Welcome Back</h1>
            <p className="text-gray-500 font-medium">Please enter your credentials to access your account.</p>
          </div>

          {/* Role Toggle */}
          <div className="bg-gray-100 p-1.5 rounded-2xl flex items-center mb-8 relative">
            <button 
              type="button"
              onClick={() => setRole("STUDENT")}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold transition-all relative z-10",
                role === "STUDENT" ? "text-blue-600" : "text-gray-500 hover:text-gray-700"
              )}
            >
              <GraduationCap size={18} />
              Student
            </button>
            <button 
              type="button"
              onClick={() => setRole("TEACHER")}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold transition-all relative z-10",
                role === "TEACHER" ? "text-blue-600" : "text-gray-500 hover:text-gray-700"
              )}
            >
              <UserCircle size={18} />
              Teacher
            </button>
            
            <div className={cn(
              "absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-white rounded-xl shadow-sm transition-all duration-300",
              role === "STUDENT" ? "left-1.5" : "left-[calc(50%+3px)]"
            )} />
          </div>

          <form action={handleSubmit} className="space-y-6">
            <input type="hidden" name="role" value={role} />
            
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                <input 
                  name="email"
                  type="email" 
                  placeholder="name@university.com" 
                  required
                  className="w-full bg-gray-50 border-2 border-transparent focus:bg-white focus:border-blue-600/20 focus:ring-4 focus:ring-blue-600/5 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold transition-all outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Password</label>
                <Link href="#" className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">Forgot Password?</Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                <input 
                  name="password"
                  type="password" 
                  placeholder="••••••••" 
                  required
                  className="w-full bg-gray-50 border-2 border-transparent focus:bg-white focus:border-blue-600/20 focus:ring-4 focus:ring-blue-600/5 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold transition-all outline-none"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 text-xs font-bold p-4 rounded-xl border border-red-100 animate-shake">
                {error}
              </div>
            )}

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-black py-4 rounded-2xl shadow-xl shadow-blue-600/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] mt-4"
            >
              {isLoading ? "Authenticating..." : "Login to Account"}
              {!isLoading && <ArrowRight size={20} />}
            </button>
          </form>

          <p className="mt-8 text-center text-xs font-medium text-gray-400">
            Having trouble logging in? <Link href="#" className="text-blue-600 font-bold hover:underline">Contact Support</Link>
          </p>

          <div className="mt-12 flex items-center justify-center gap-6 group">
             {/* Admin Link */}
             <Link href="/admin/login" className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-blue-600 transition-all flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-blue-600 transition-colors" />
                Admin Portal Access
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
