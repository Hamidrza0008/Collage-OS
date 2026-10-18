"use client";

import React, { useState } from "react";
import { Bot, Send, Sparkles, X, Loader2 } from "lucide-react";

export default function AssignmentsAICard() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const prompts = [
    { label: "Explain this question", text: "How should students structure their solution for DSA Practice Set - Arrays?" },
    { label: "Check my solution", text: "What are the common edge cases to grade in the Web Dev Portfolio project?" },
    { label: "Submission guidelines", text: "What format requirements are set for the DBMS ER Diagram assignment?" },
  ];

  const handleAsk = (text) => {
    const q = text || query;
    if (!q.trim()) return;

    setIsProcessing(true);
    setResponse(null);

    setTimeout(() => {
      let reply = "";
      const lower = q.toLowerCase();

      if (lower.includes("dsa") || lower.includes("array")) {
        reply = "For DSA Practice Set - Arrays: Recommended rubric checks O(N) time complexity, corner cases (empty arrays, duplicate elements), and clean in-place array manipulation.";
      } else if (lower.includes("portfolio") || lower.includes("web")) {
        reply = "Web Dev Portfolio: Verify responsive mobile breakpoints, semantic HTML5, valid Next.js link routing, and absence of hydration errors.";
      } else if (lower.includes("dbms") || lower.includes("guideline")) {
        reply = "DBMS ER Diagram: Students must include cardinality ratios (1:1, 1:N, M:N), primary key underlines, multi-valued attribute double ellipses, and relational schemas.";
      } else {
        reply = `Analyzing assignment criteria for "${q}". Scoped to Dr. Arjun Mehta's course rubrics and institutional standards.`;
      }

      setResponse(reply);
      setIsProcessing(false);
      setQuery("");
    }, 450);
  };

  return (
    <div className="rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] p-4 sm:p-5 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#E6F7F0] dark:bg-[#073629] text-[#159B72] dark:text-[#20D39B] flex items-center justify-center">
            <Bot className="w-5 h-5" />
          </div>
          <h2 className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
            Assignment AI
          </h2>
        </div>

        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E6F7F0] text-[#159B72] dark:bg-[#073629] dark:text-[#20D39B] border border-[#159B72]/20">
          New
        </span>
      </div>

      <p className="text-xs text-[#658278] dark:text-[#789991] mt-1 leading-relaxed">
        Get help with assignment questions, concepts and submission guidelines.
      </p>

      {/* AI Reply Bubble */}
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

      {/* Input */}
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
          placeholder="Ask anything about your assignments..."
          className="w-full h-10 pl-3.5 pr-11 rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#D8E8E2] dark:border-[#10372F] text-xs text-[#0B3024] dark:text-[#F1FAF6] placeholder:text-[#658278] dark:placeholder:text-[#789991] focus:outline-hidden focus:border-[#159B72] dark:focus:border-[#20D39B]"
        />
        <button
          type="submit"
          disabled={isProcessing}
          className="absolute right-1.5 w-7 h-7 rounded-lg bg-[#159B72] hover:bg-[#0E8561] text-white flex items-center justify-center transition-transform active:scale-95 disabled:opacity-50 cursor-pointer shadow-xs"
          aria-label="Send query"
        >
          {isProcessing ? (
            <Loader2 className="w-3 h-3 animate-spin" />
          ) : (
            <Send className="w-3 h-3 -ml-0.5" />
          )}
        </button>
      </form>

      {/* Suggested Prompts */}
      <div className="mt-3.5">
        <span className="text-[11px] font-bold text-[#658278] dark:text-[#789991] block mb-2">
          Suggested prompts:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {prompts.map((p) => (
            <button
              key={p.label}
              type="button"
              onClick={() => handleAsk(p.text)}
              className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-[#F1F8F5] dark:bg-[#082A24] hover:bg-[#E6F7F0] dark:hover:bg-[#0C382D] text-[#36594C] dark:text-[#B5CCC5] hover:text-[#159B72] dark:hover:text-[#20D39B] border border-[#D8E8E2] dark:border-[#10372F] transition-colors cursor-pointer select-none"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
