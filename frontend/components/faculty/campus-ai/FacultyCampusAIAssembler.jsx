"use client";

import React, { useState, useRef, useEffect } from "react";
import FacultyCampusAIHero from "./FacultyCampusAIHero";
import FacultyAIModeBar from "./FacultyAIModeBar";
import FacultyAIChatArea from "./FacultyAIChatArea";
import FacultyAISidebarQuickActions from "./FacultyAISidebarQuickActions";
import FacultyAIRecentQueries from "./FacultyAIRecentQueries";
import FacultyAIDataGuarantee from "./FacultyAIDataGuarantee";
import {
  FACULTY_RECENT_QUERIES,
  getFacultyAIResponse,
} from "./facultyCampusAIData";
import { CheckCircle2 } from "lucide-react";

export default function FacultyCampusAIAssembler() {
  const [mode, setMode] = useState("college"); // 'college' | 'general'
  const [messages, setMessages] = useState([]);
  const [isThinking, setIsThinking] = useState(false);
  const [recentQueries, setRecentQueries] = useState(FACULTY_RECENT_QUERIES);
  const [toastMessage, setToastMessage] = useState(null);
  const timeoutRef = useRef(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleSendMessage = (text) => {
    if (!text?.trim() || isThinking) return;

    const userMsg = {
      id: `usr_${Date.now()}`,
      sender: "user",
      text: text.trim(),
      timestamp: "Just now",
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsThinking(true);

    // Update recent queries
    setRecentQueries((prev) => [
      {
        id: `rq_${Date.now()}`,
        query: text.trim(),
        timeAgo: "Just now",
        iconColor: "green",
        iconType: "document",
      },
      ...prev.filter(
        (q) => q.query.toLowerCase() !== text.trim().toLowerCase()
      ).slice(0, 4),
    ]);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      const resp = getFacultyAIResponse(text.trim(), mode);
      const assistantMsg = {
        id: `ai_${Date.now()}`,
        sender: "assistant",
        text: resp.text,
        source: resp.source,
        timestamp: "Just now",
      };

      setMessages((prev) => [...prev, assistantMsg]);
      setIsThinking(false);
    }, 600);
  };

  const handleResetChat = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsThinking(false);
    setMessages([]);
    showToast("Started a new consultation session.");
  };

  return (
    <div className="space-y-5 sm:space-y-6 max-w-[1600px] mx-auto pb-10">
      {/* 1. Hero Banner */}
      <FacultyCampusAIHero />

      {/* 2. Mode Switcher & Privacy Bar */}
      <FacultyAIModeBar mode={mode} onModeChange={setMode} />

      {/* 3. Main 2-Column Grid matching Screenshot */}
      <div className="flex flex-col xl:flex-row gap-5 sm:gap-6 items-start">
        {/* Left Column: Chat Area (approx 70% width on xl) */}
        <div className="flex-1 w-full min-w-0">
          <FacultyAIChatArea
            messages={messages}
            isThinking={isThinking}
            onSendMessage={handleSendMessage}
            onResetChat={handleResetChat}
          />
        </div>

        {/* Right Column: Sidebar (Quick Actions, Recent Queries, Data Guarantee) (approx 30% width on xl) */}
        <div className="w-full xl:w-[330px] 2xl:w-[360px] shrink-0 space-y-5">
          {/* Quick Actions (2x2 grid) */}
          <FacultyAISidebarQuickActions
            onTriggerAction={(query) => handleSendMessage(query)}
          />

          {/* Recent Queries Widget */}
          <FacultyAIRecentQueries
            queries={recentQueries}
            onSelectQuery={(q) => handleSendMessage(q)}
            onViewAll={() =>
              showToast("Showing complete consultation history...")
            }
          />

          {/* Data Guarantee Card */}
          <FacultyAIDataGuarantee />
        </div>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#063327] text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 text-xs font-semibold border border-emerald-500/40 animate-in slide-in-from-bottom-3 duration-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
