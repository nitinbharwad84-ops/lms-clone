"use client";

import { Construction, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface ConstructionPageProps {
  title: string;
}

export default function ConstructionPage({ title }: ConstructionPageProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
      <div className="w-24 h-24 bg-blue-50 rounded-3xl flex items-center justify-center mb-8 animate-bounce">
         <Construction size={48} className="text-blue-600" />
      </div>
      <h1 className="text-3xl font-black text-gray-900 mb-4">{title}</h1>
      <p className="text-gray-500 max-w-md font-medium mb-10">
        We are working hard to bring this feature to life. This page is currently under development to match the Parul University LMS design.
      </p>
      <Link 
        href="/dashboard"
        className="flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-2xl font-black shadow-xl shadow-blue-600/20 hover:scale-105 transition-all"
      >
        <ArrowLeft size={20} />
        Back to Dashboard
      </Link>
    </div>
  );
}
