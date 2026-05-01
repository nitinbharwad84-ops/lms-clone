"use client";

import { signIn } from "@/lib/auth-actions";
import { useState } from "react";
import { ShieldCheck, Lock, Mail, ArrowRight } from "lucide-react";

export default function AdminLoginPage() {
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
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        <div className="p-8 text-center border-b border-white/10">
          <div className="w-16 h-16 bg-blue-500/20 text-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-blue-500/30">
            <ShieldCheck size={32} />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2 uppercase tracking-widest">Admin Portal</h1>
          <p className="text-gray-400 text-sm">System Administration Access</p>
        </div>

        <div className="p-8">
          <form action={handleSubmit} className="space-y-4">
            <input type="hidden" name="role" value="ADMIN" />
            
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1 ml-1 tracking-wider">Admin Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input 
                  name="email"
                  type="email" 
                  required
                  className="w-full bg-white/5 border border-white/10 focus:border-blue-500 focus:bg-white/10 rounded-xl py-3 pl-10 pr-4 text-white text-sm outline-none transition-all"
                  placeholder="admin@system.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1 ml-1 tracking-wider">Secure Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input 
                  name="password"
                  type="password" 
                  required
                  className="w-full bg-white/5 border border-white/10 focus:border-blue-500 focus:bg-white/10 rounded-xl py-3 pl-10 pr-4 text-white text-sm outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 text-red-400 text-[11px] font-bold p-3 rounded-xl border border-red-500/20 text-center uppercase tracking-wider">
                {error}
              </div>
            )}

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-800 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 active:translate-y-0 mt-6"
            >
              {isLoading ? "Verifying..." : "Verify & Enter"}
              {!isLoading && <ArrowRight size={18} />}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-[10px] text-gray-500 uppercase tracking-widest">
              Secured Session • IP Tracked
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
