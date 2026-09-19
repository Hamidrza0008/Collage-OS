"use client";

import Image from "next/image";
import { Sparkles, Send, Bot, RefreshCw } from "lucide-react";
import { useState } from "react";
import { useTheme } from "../providers/ThemeProvider";

const PRESET_QUESTIONS = [
  "What’s my attendance percentage?",
  "When is the next assignment due?",
  "Tell me about upcoming events",
];

const PRESET_ANSWERS = {
  "What’s my attendance percentage?":
    "Your overall attendance is 78% (16/21 classes). You are above the 75% threshold! 🎉",
  "When is the next assignment due?":
    "Next assignment: 'Web Development' is due in 2 days (18 Aug 2025).",
  "Tell me about upcoming events":
    "AI Tech Talk (20 Aug, 11 AM) and Coding Competition (24 Aug, 10 AM) in Lab-1!",
};

export default function CampusAICard() {
  const { isDark } = useTheme();
  const [inputQuestion, setInputQuestion] = useState("");
  const [conversation, setConversation] = useState(null);
  const [isThinking, setIsThinking] = useState(false);

  const handleAsk = (query) => {
    const q = (query || inputQuestion).trim();
    if (!q) return;

    setIsThinking(true);
    setInputQuestion("");

    setTimeout(() => {
      let answer = PRESET_ANSWERS[q];
      if (!answer) {
        if (q.toLowerCase().includes("attendance")) {
          answer = "Your overall attendance is 78%. You're in good standing!";
        } else if (q.toLowerCase().includes("assignment") || q.toLowerCase().includes("due")) {
          answer = "Web Development is due on 18 Aug, followed by DBMS on 20 Aug.";
        } else if (q.toLowerCase().includes("event") || q.toLowerCase().includes("fest")) {
          answer = "College Fest 'Aarohan 2025' is scheduled for 28 Aug.";
        } else {
          answer = `Campus AI: Query received. Hamid, your record shows 7th Sem CSE with 8.24 CGPA.`;
        }
      }
      setConversation({ question: q, answer });
      setIsThinking(false);
    }, 400);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAsk();
    }
  };

  return (
    <div className="p-3.5 rounded-xl bg-[#FFFFFF] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-2xs space-y-2.5">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-[#E8F1ED] dark:border-[#10372F]">
        <div className="flex items-center gap-1.5">
          <div className="p-1 rounded-md bg-[#DDF3EB] dark:bg-[#123F35] text-[#159B72] dark:text-[#20D39B]">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs sm:text-[13px] font-bold text-[#0B3024] dark:text-[#F1FAF6]">
            Campus AI
          </span>
          <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-[#159B72] text-white">
            New
          </span>
        </div>

        {conversation && (
          <button
            type="button"
            onClick={() => setConversation(null)}
            className="text-[10px] text-[#658278] dark:text-[#789991] hover:text-[#159B72] dark:hover:text-[#20D39B] flex items-center gap-1 transition-colors"
          >
            <RefreshCw className="w-2.5 h-2.5" />
            Reset
          </button>
        )}
      </div>

      {/* Greeting with Robot Avatar */}
      <div className="flex items-center justify-between gap-2">
        <div className="min-w-0">
          <h3 className="text-xs sm:text-[12.5px] font-bold text-[#0B3024] dark:text-[#F1FAF6]">
            Hi Hamid! 👋
          </h3>
          <p className="text-[10.5px] text-[#658278] dark:text-[#789991] truncate">
            Ask me anything about your college...
          </p>
        </div>

        <div className="relative w-11 h-11 shrink-0 rounded-lg overflow-hidden border border-[#D8E8E2]/60 dark:border-[#16463D]/60 shadow-2xs">
          <Image
            src={isDark ? "/assets/dashboard/campus-ai-dark.jpg" : "/assets/dashboard/campus-ai-light.jpg"}
            alt="Campus AI Mascot"
            fill
            className="object-cover transition-opacity duration-300"
          />
        </div>
      </div>

      {/* Conversation or Suggested Pills */}
      {conversation ? (
        <div className="space-y-1.5 text-xs">
          <div className="p-2 rounded-lg bg-[#F7FBF9] dark:bg-[#031A16] border border-[#E8F1ED] dark:border-[#10372F] text-[11px] text-[#36594C] dark:text-[#B5CCC5]">
            <span className="font-semibold text-[#0B3024] dark:text-[#F1FAF6] block mb-0.5">
              You asked:
            </span>
            &ldquo;{conversation.question}&rdquo;
          </div>
          <div className="p-2 rounded-lg bg-[#DDF3EB]/60 dark:bg-[#123F35]/70 border border-[#159B72]/30 dark:border-[#20D39B]/30 text-[11px] text-[#0B3024] dark:text-[#F1FAF6] leading-relaxed">
            <span className="font-semibold text-[#159B72] dark:text-[#20D39B] block mb-0.5 flex items-center gap-1">
              <Bot className="w-3 h-3" />
              Campus AI:
            </span>
            {conversation.answer}
          </div>
        </div>
      ) : isThinking ? (
        <div className="p-2 rounded-lg bg-[#DDF3EB]/40 dark:bg-[#123F35]/40 text-[11px] text-[#159B72] dark:text-[#20D39B] flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#159B72] dark:bg-[#20D39B] animate-ping" />
          Campus AI is checking records...
        </div>
      ) : (
        <div className="space-y-1">
          {PRESET_QUESTIONS.map((q, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleAsk(q)}
              className="w-full text-left px-2.5 py-1.5 rounded-lg bg-[#F7FBF9] dark:bg-[#031A16] hover:bg-[#DDF3EB] dark:hover:bg-[#123F35] border border-[#E8F1ED] dark:border-[#10372F] hover:border-[#159B72]/30 dark:hover:border-[#20D39B]/30 text-[11px] font-medium text-[#36594C] dark:text-[#B5CCC5] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] transition-all flex items-center justify-between group"
            >
              <span className="truncate">&ldquo;{q}&rdquo;</span>
              <span className="text-[#159B72] dark:text-[#20D39B] opacity-0 group-hover:opacity-100 transition-opacity">
                &rarr;
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Input Field */}
      <div className="relative flex items-center gap-1.5 pt-0.5">
        <input
          type="text"
          value={inputQuestion}
          onChange={(e) => setInputQuestion(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your question..."
          className="flex-1 h-8 pl-2.5 pr-2 rounded-lg bg-[#F7FBF9] dark:bg-[#0A2A24] border border-[#D8E8E2] dark:border-[#16463D] text-[11px] text-[#0B3024] dark:text-[#F1FAF6] placeholder-[#658278] dark:placeholder-[#789991] focus:outline-none focus:border-[#159B72] dark:focus:border-[#20D39B] transition-all"
        />
        <button
          type="button"
          onClick={() => handleAsk()}
          disabled={!inputQuestion.trim() || isThinking}
          className="w-8 h-8 rounded-lg bg-[#159B72] hover:bg-[#087A5B] dark:bg-[#20D39B] dark:hover:bg-[#18B887] disabled:opacity-40 disabled:cursor-not-allowed text-white dark:text-[#021512] flex items-center justify-center transition-all shrink-0 active:scale-95"
          aria-label="Send query"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
