"use client";

import { useState } from "react";
import Image from "next/image";
import { Send, Sparkles, MessageSquare, Bot } from "lucide-react";
import { CAMPUS_AI_PROMPTS } from "./academicsData";
import { useTheme } from "../providers/ThemeProvider";

export default function CampusAICard() {
  const { isDark } = useTheme();
  const [inputVal, setInputVal] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (textToSend) => {
    const query = textToSend || inputVal;
    if (!query.trim()) return;

    // Add student message
    const userMsg = { sender: "user", text: query };
    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");
    setIsTyping(true);

    // Simulate intelligent response after short delay
    setTimeout(() => {
      let reply = "I'm checking the college academic records for you.";
      const lower = query.toLowerCase();
      if (lower.includes("attendance")) {
        reply = "The college requires a minimum 75% attendance to sit for end-semester exams. Your current attendance is 78%, which meets the criteria!";
      } else if (lower.includes("assignment")) {
        reply = "Your next assignment 'Data Structures & Algorithms - Assignment 4' is due this Friday, 22 Aug at 11:59 PM.";
      } else if (lower.includes("placement")) {
        reply = "Campus placements for 7th semester begin next month. Top companies include Google, Microsoft, and TCS. 12 on-campus drives are scheduled.";
      } else {
        reply = `Thanks for asking about "${query}". In Semester 7, ensure your internal grades and attendance are maintained above required thresholds.`;
      }

      setMessages((prev) => [...prev, { sender: "ai", text: reply }]);
      setIsTyping(false);
    }, 800);
  };

  const handlePromptClick = (prompt) => {
    setInputVal(prompt);
    handleSend(prompt);
  };

  return (
    <div className="w-full relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#064332] via-[#042F23] to-[#021A14] text-white p-5 shadow-lg border border-emerald-800/40 flex flex-col justify-between min-h-[360px]">
      {/* Background Decorative Foliage */}
      <div className="absolute top-0 right-0 w-36 h-36 opacity-15 pointer-events-none select-none">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-emerald-400">
          <path
            d="M50 0C55 25 75 45 100 50C75 55 55 75 50 100C45 75 25 55 0 50C25 45 45 25 50 0Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-1.5">
                Campus AI
              </h2>
              <p className="text-[11px] text-emerald-200/80 font-normal">
                Ask your college-related questions
              </p>
            </div>
          </div>

          {/* 3D Robot Mascot */}
          <div className="relative w-12 h-12 shrink-0 drop-shadow-md">
            <Image
              src={isDark ? "/assets/academics/dark/campus-ai-robot.png" : "/assets/academics/light/campus-ai-robot.png"}
              alt="Campus AI Mascot"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Dynamic Chat Messages area or Suggested Prompts */}
        <div className="mt-4 space-y-2">
          {messages.length === 0 ? (
            <div className="space-y-1.5">
              <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-300/80">
                Suggested Prompts
              </span>
              {CAMPUS_AI_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handlePromptClick(prompt)}
                  className="w-full text-left p-2 rounded-xl bg-white/10 hover:bg-white/15 border border-emerald-500/20 text-xs text-emerald-100 flex items-center gap-2 transition-all group cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400 shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="line-clamp-1">{prompt}</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="max-h-44 overflow-y-auto space-y-2 pr-1 text-xs">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`p-2.5 rounded-xl ${
                    m.sender === "user"
                      ? "bg-emerald-600/50 ml-6 text-white rounded-br-none border border-emerald-400/30"
                      : "bg-white/10 mr-4 text-emerald-100 rounded-bl-none border border-emerald-500/20"
                  }`}
                >
                  <div className="flex items-center gap-1 text-[9px] font-bold text-emerald-300 uppercase mb-0.5">
                    {m.sender === "user" ? "You" : <span className="flex items-center gap-1"><Bot className="w-2.5 h-2.5" /> Campus AI</span>}
                  </div>
                  <p className="leading-snug text-[11.5px]">{m.text}</p>
                </div>
              ))}
              {isTyping && (
                <div className="p-2 rounded-xl bg-white/10 text-emerald-200 text-[11px] inline-flex items-center gap-1.5 animate-pulse">
                  <Bot className="w-3 h-3" />
                  <span>Thinking...</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Input Row at bottom */}
      <div className="mt-4 pt-3 border-t border-emerald-800/60">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="relative flex items-center"
        >
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type your question..."
            className="w-full py-2 pl-3 pr-10 rounded-xl bg-black/30 border border-emerald-500/30 text-xs text-white placeholder-emerald-200/50 focus:outline-hidden focus:border-emerald-400 transition-colors"
          />
          <button
            type="submit"
            className="absolute right-1.5 p-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-[#021A14] transition-colors cursor-pointer"
            aria-label="Send question"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
