"use client";

import { useState } from "react";
import { Send, MessageSquare, HelpCircle, BarChart2, FolderOpen, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  user: string;
  text: string;
  time: string;
  isQuestion?: boolean;
}

/**
 * Renders a fixed-width right-side live chat panel with tabbed sections (Chat, Questions, Trivia, Media), a scrollable content area, and a bottom input.
 *
 * Displays mock messages for the "Chat" tab, a highlighted question card and note for "Questions", an active poll for "Trivia", and an empty placeholder for "Media". The input placeholder and small UI controls adapt to the active tab.
 *
 * @returns The React element representing the chat panel UI.
 */
export default function ChatPanel() {
  const [activeTab, setActiveTab] = useState<"CHAT" | "QUESTIONS" | "TRIVIA" | "MEDIA">("CHAT");
  const [message, setMessage] = useState("");

  const tabs = [
    { id: "CHAT", icon: MessageSquare, label: "Chat" },
    { id: "QUESTIONS", icon: HelpCircle, label: "Questions" },
    { id: "TRIVIA", icon: BarChart2, label: "Trivia" },
    { id: "MEDIA", icon: FolderOpen, label: "Media" },
  ] as const;

  const mockMessages: Message[] = [
    { id: "1", user: "System", text: "Welcome to the live session!", time: "02:45 PM" },
    { id: "2", user: "John Doe", text: "Hello everyone!", time: "02:46 PM" },
    { id: "3", user: "Alice Smith", text: "Can you explain the box model again?", time: "02:47 PM", isQuestion: true },
  ];

  return (
    <div className="w-80 h-full flex flex-col bg-white border-l border-gray-200">
      {/* Tabs */}
      <div className="grid grid-cols-4 border-b border-gray-100">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex flex-col items-center gap-1 py-3 border-b-2 transition-all",
              activeTab === tab.id 
                ? "border-blue-600 text-blue-600 bg-blue-50/30" 
                : "border-transparent text-gray-400 hover:text-gray-600 hover:bg-gray-50"
            )}
          >
            <tab.icon size={18} />
            <span className="text-[9px] font-bold uppercase tracking-wider">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {activeTab === "CHAT" && (
          <>
            {mockMessages.map((msg) => (
              <div key={msg.id} className="group">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-black text-gray-900 uppercase tracking-tight">{msg.user}</span>
                  <span className="text-[9px] text-gray-400 font-bold">{msg.time}</span>
                </div>
                <div className={cn(
                  "p-3 rounded-2xl text-[11px] leading-relaxed",
                  msg.user === "System" ? "bg-gray-100 text-gray-500 italic" : "bg-blue-50/50 text-gray-700"
                )}>
                  {msg.text}
                </div>
              </div>
            ))}
          </>
        )}

        {activeTab === "QUESTIONS" && (
          <div className="space-y-4">
             <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-amber-400" />
                <div className="flex justify-between items-start mb-2">
                   <span className="text-[10px] font-black text-amber-800 uppercase tracking-tight">Question by Alice</span>
                   <span className="text-[9px] text-amber-500 font-bold">LIVE</span>
                </div>
                <p className="text-[11px] font-bold text-amber-900 leading-tight">Can you explain the box model again?</p>
             </div>
             <p className="text-[10px] text-gray-400 text-center font-bold uppercase tracking-widest py-4">Only teacher can highlight questions</p>
          </div>
        )}

        {activeTab === "TRIVIA" && (
          <div className="space-y-6">
             <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-2xl">
                <h4 className="text-xs font-black text-indigo-900 mb-4 uppercase tracking-tight">Active Poll</h4>
                <p className="text-[11px] font-bold text-indigo-800 mb-4">Is CSS hard to learn?</p>
                <div className="space-y-3">
                   <button className="w-full py-2 px-4 bg-white border border-indigo-200 rounded-xl text-[11px] font-bold text-indigo-700 hover:bg-indigo-100 transition-all text-left flex items-center justify-between">
                      Yes, very!
                      <span className="text-[10px] text-indigo-400">45%</span>
                   </button>
                   <button className="w-full py-2 px-4 bg-white border border-indigo-200 rounded-xl text-[11px] font-bold text-indigo-700 hover:bg-indigo-100 transition-all text-left flex items-center justify-between">
                      No, it's easy
                      <span className="text-[10px] text-indigo-400">55%</span>
                   </button>
                </div>
             </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-100 bg-gray-50/50">
        <div className="relative flex items-center">
          <input 
            type="text" 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={activeTab === "QUESTIONS" ? "Ask a question..." : "Type your message..."}
            className="w-full bg-white border border-gray-200 rounded-2xl py-3 pl-4 pr-12 text-xs outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all shadow-sm"
          />
          <button className="absolute right-2 p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors">
            <Send size={18} />
          </button>
        </div>
        <div className="flex items-center justify-between mt-3 px-1">
           <div className="flex gap-2">
              <button className="w-6 h-6 rounded-full hover:bg-gray-200 flex items-center justify-center text-gray-400 transition-colors">😊</button>
              <button className="w-6 h-6 rounded-full hover:bg-gray-200 flex items-center justify-center text-gray-400 transition-colors">📎</button>
           </div>
           {activeTab === "CHAT" && (
             <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="hidden" />
                <div className="w-3 h-3 border-2 border-gray-300 rounded group-hover:border-blue-500" />
                <span className="text-[9px] font-bold text-gray-500 uppercase tracking-tighter">Ask as Question</span>
             </label>
           )}
        </div>
      </div>
    </div>
  );
}
