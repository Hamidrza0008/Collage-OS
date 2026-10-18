"use client";

import React, { useState } from "react";
import { Bot, Send, Sparkles, Lock, CheckCircle2, Loader2, X } from "lucide-react";

export default function FacultyAIAssistant() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const quickPrompts = [
    { label: "Today's classes", query: "What are my scheduled classes for today?" },
    { label: "Class attendance", query: "Show average attendance summary across my 4 assigned courses." },
    { label: "Pending assignments", query: "Which assignments have submissions pending review?" },
    { label: "Class average marks", query: "What is the average internal score for DSA Sem 5?" },
    { label: "Students below 75% attendance", query: "List students with attendance lower than 75% threshold." },
    { label: "Upcoming deadlines", query: "What are the nearest internal marks and assignment deadlines?" },
  ];

  const handleAsk = (text) => {
    const q = text || query;
    if (!q.trim()) return;

    setIsProcessing(true);
    setResponse(null);

    // Simulate smart context-aware faculty response
    setTimeout(() => {
      let reply = "";
      const lower = q.toLowerCase();

      if (lower.includes("today") || lower.includes("classes")) {
        reply = "You have 4 classes today: Data Structures & Algorithms (09:00 - Ongoing), Web Development (11:00), DBMS (14:00), and Computer Networks (16:00). All slots are 60 mins.";
      } else if (lower.includes("attendance") && lower.includes("75")) {
        reply = "Currently, 8 students in DSA (Sem 5) and 4 students in DBMS (Sem 5) have attendance below the 75% institutional threshold. Would you like to send advisory notifications?";
      } else if (lower.includes("attendance")) {
        reply = "Your classes have an average attendance rate of 82%. Highest is Computer Networks (90%) and lowest is DBMS (72%).";
      } else if (lower.includes("assignment") || lower.includes("pending")) {
        reply = "You have 12 pending assignment submissions to review in Data Structures & Algorithms (Sem 5) due for grading today.";
      } else if (lower.includes("marks") || lower.includes("average")) {
        reply = "The average internal score for DSA Sem 5 is 76% across 54 evaluated students. Top percentile is 94%.";
      } else {
        reply = `Analyzing official records for: "${q}". All data is scoped strictly to your verified departmental courses.`;
      }

      setResponse(reply);
      setIsProcessing(false);
      setQuery("");
    }, 450);
  };

  return (
    <div className="rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] p-4 sm:p-5 shadow-xs flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#E6F7F0] dark:bg-[#073629] text-[#159B72] dark:text-[#20D39B] flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <h2 className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
              Faculty AI Assistant
            </h2>
          </div>

          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E6F7F0] text-[#159B72] dark:bg-[#073629] dark:text-[#20D39B] border border-[#159B72]/20">
            New
          </span>
        </div>

        <p className="text-xs text-[#658278] dark:text-[#789991] mt-1 leading-relaxed">
          Ask anything about your classes, students, assignments, marks and more.
        </p>

        {/* AI Response Bubble if active */}
        {response && (
          <div className="mt-3 p-3 rounded-xl bg-[#F0FAF5] dark:bg-[#082A24] border border-[#D8E8E2] dark:border-[#16463D] relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setResponse(null)}
              className="absolute top-2 right-2 text-[#658278] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
            <div className="flex items-start gap-2 pr-4">
              <Sparkles className="w-4 h-4 text-[#159B72] dark:text-[#20D39B] shrink-0 mt-0.5" />
              <p className="text-xs text-[#0B3024] dark:text-[#E8F6F0] leading-relaxed">
                {response}
              </p>
            </div>
          </div>
        )}

        {/* Input Box */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAsk(query);
          }}
          className="mt-3.5 relative flex items-center"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask about your classes, students, assignments, marks..."
            className="w-full h-11 pl-3.5 pr-12 rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#D8E8E2] dark:border-[#10372F] text-xs text-[#0B3024] dark:text-[#F1FAF6] placeholder:text-[#658278] dark:placeholder:text-[#789991] focus:outline-hidden focus:border-[#159B72] dark:focus:border-[#20D39B] transition-all"
          />
          <button
            type="submit"
            disabled={isProcessing}
            className="absolute right-1.5 w-8 h-8 rounded-lg bg-[#159B72] hover:bg-[#0E8561] text-white flex items-center justify-center transition-transform active:scale-95 disabled:opacity-50 cursor-pointer shadow-xs"
            aria-label="Send prompt"
          >
            {isProcessing ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Send className="w-3.5 h-3.5 -ml-0.5" />
            )}
          </button>
        </form>

        {/* Quick Prompts */}
        <div className="mt-4">
          <span className="text-[11px] font-bold text-[#0B3024] dark:text-[#F1FAF6] block mb-2">
            Quick Prompts
          </span>

          <div className="flex flex-wrap gap-1.5">
            {quickPrompts.map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => handleAsk(p.query)}
                className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-[#F1F8F5] dark:bg-[#082A24] hover:bg-[#E6F7F0] dark:hover:bg-[#0C382D] text-[#36594C] dark:text-[#B5CCC5] hover:text-[#159B72] dark:hover:text-[#20D39B] border border-[#D8E8E2] dark:border-[#10372F] transition-colors cursor-pointer select-none"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lock Notice */}
      <div className="mt-5 pt-3 border-t border-[#F0F5F2] dark:border-[#0E352E] flex items-center gap-1.5 text-[10.5px] text-[#658278] dark:text-[#789991]">
        <Lock className="w-3.5 h-3.5 text-[#159B72] dark:text-[#20D39B] shrink-0" />
        <span>Access only to your assigned classes and data</span>
      </div>
    </div>
  );
}
