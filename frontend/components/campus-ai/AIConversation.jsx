"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import {
  Bot,
  Database,
  FileText,
  Sparkles,
  Layers,
  AlertCircle,
  HelpCircle,
  RefreshCw,
  User,
  ShieldAlert,
} from "lucide-react";
import { INITIAL_ASSISTANT_GREETING } from "./campusAIData";

export default function AIConversation({
  messages,
  isThinking,
  onSelectPrompt,
  onSwitchTab,
  onRetry,
}) {
  const scrollRef = useRef(null);

  // Auto-scroll to bottom of conversation when messages update or thinking starts
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isThinking]);

  return (
    <div
      ref={scrollRef}
      className="space-y-4 max-h-[580px] overflow-y-auto pr-1 scrollbar-thin transition-all"
    >
      {/* 1. Initial Greeting Card (Always accessible as base welcome or initial message) */}
      <div className="flex items-start gap-3">
        {/* Robot Avatar */}
        <div className="w-9 h-9 rounded-full bg-[#159B72] text-white flex items-center justify-center shrink-0 shadow-xs ring-2 ring-emerald-500/20">
          <Bot className="w-5 h-5" />
        </div>

        {/* Message Bubble Card */}
        <div className="flex-1 bg-white dark:bg-[#06241F] rounded-2xl p-4 sm:p-5 border border-[#D8E8E2] dark:border-[#16463D] shadow-xs text-sm text-[#0B3024] dark:text-[#F1FAF6] leading-relaxed">
          <div className="font-semibold text-base mb-1.5 text-[#0B3024] dark:text-white">
            {INITIAL_ASSISTANT_GREETING.content.salutation}
          </div>

          <p className="text-[13.5px] text-[#36594C] dark:text-[#B5CCC5] mb-3">
            {INITIAL_ASSISTANT_GREETING.content.intro}
          </p>

          <div className="text-xs font-semibold text-[#658278] dark:text-[#789991] mb-2 uppercase tracking-wide">
            {INITIAL_ASSISTANT_GREETING.content.promptHelp}
          </div>

          {/* Interactive Chips Grid */}
          <div className="flex flex-wrap gap-2 mb-3.5">
            {INITIAL_ASSISTANT_GREETING.content.chips.map((chip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onSelectPrompt(chip.query)}
                className="px-3 py-1 rounded-full text-xs font-medium bg-[#ECF9F4] dark:bg-[#123F35] text-[#159B72] dark:text-[#20D39B] border border-emerald-500/20 hover:border-emerald-500/50 hover:bg-emerald-100/60 dark:hover:bg-emerald-900/40 transition-all cursor-pointer shadow-2xs"
              >
                {chip.label}
              </button>
            ))}
          </div>

          <p className="text-xs text-[#658278] dark:text-[#789991] mb-2">
            {INITIAL_ASSISTANT_GREETING.content.generalNote}
          </p>

          <div className="font-medium text-xs sm:text-[13px] text-emerald-700 dark:text-emerald-300">
            {INITIAL_ASSISTANT_GREETING.content.closing}
          </div>
        </div>
      </div>

      {/* 2. Interactive Message Thread */}
      {messages.map((msg) => {
        const isUser = msg.sender === "user";

        if (isUser) {
          return (
            <div key={msg.id} className="flex justify-end items-start gap-2.5 pl-8 sm:pl-16">
              <div className="bg-[#159B72] text-white rounded-2xl rounded-tr-xs px-4 py-3 shadow-xs text-sm max-w-xl">
                <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                {msg.attachment && (
                  <div className="mt-2 pt-2 border-t border-white/20 flex items-center gap-1.5 text-xs text-emerald-100">
                    <FileText className="w-3.5 h-3.5" />
                    <span>{msg.attachment.name}</span>
                  </div>
                )}
                <div className="text-[10px] text-emerald-100/80 text-right mt-1">
                  {msg.timestamp || "Just now"}
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-emerald-800 text-white flex items-center justify-center shrink-0 text-xs font-semibold">
                HR
              </div>
            </div>
          );
        }

        // Assistant Message
        return (
          <div key={msg.id} className="flex items-start gap-3 pr-2 sm:pr-8">
            <div className="w-9 h-9 rounded-full bg-[#159B72] text-white flex items-center justify-center shrink-0 shadow-xs ring-2 ring-emerald-500/20">
              <Bot className="w-5 h-5" />
            </div>

            <div className="flex-1 bg-white dark:bg-[#06241F] rounded-2xl rounded-tl-xs p-4 sm:p-5 border border-[#D8E8E2] dark:border-[#16463D] shadow-xs text-sm text-[#0B3024] dark:text-[#F1FAF6]">
              {/* Unavailable Information Guardrail UI */}
              {msg.isUnavailable ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-semibold text-sm">
                    <HelpCircle className="w-4 h-4 shrink-0" />
                    <span>Information Unavailable in Campus Records</span>
                  </div>
                  <p className="text-[13.5px] text-[#36594C] dark:text-[#B5CCC5] leading-relaxed">
                    {msg.text}
                  </p>
                  {msg.supportingText && (
                    <p className="text-xs text-[#658278] dark:text-[#789991]">
                      {msg.supportingText}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => onSelectPrompt("What is the attendance policy?")}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 hover:border-emerald-500/50"
                    >
                      Ask another question
                    </button>
                    <button
                      type="button"
                      onClick={() => onSwitchTab("knowledge")}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#F1F8F5] dark:bg-[#0A2A24] text-[#0B3024] dark:text-[#F1FAF6] border border-[#D8E8E2] dark:border-[#16463D] hover:border-emerald-500/40"
                    >
                      Browse College Knowledge
                    </button>
                  </div>
                </div>
              ) : msg.type === "security" ? (
                /* Security / Privacy Guardrail UI */
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-semibold text-sm">
                    <ShieldAlert className="w-4 h-4 shrink-0" />
                    <span>Privacy &amp; Security Protocol Active</span>
                  </div>
                  <p className="text-[13.5px] leading-relaxed text-[#36594C] dark:text-[#B5CCC5]">
                    {msg.text}
                  </p>
                </div>
              ) : msg.type === "error" ? (
                /* Error State with Retry Button */
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 text-rose-500 font-medium text-sm">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>Campus AI couldn't complete that request right now.</span>
                  </div>
                  <p className="text-xs text-[#658278] dark:text-[#789991]">
                    {msg.text}
                  </p>
                  <button
                    type="button"
                    onClick={() => onRetry(msg.originalQuery)}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Try Again</span>
                  </button>
                </div>
              ) : (
                /* Normal Rich Assistant Response */
                <div className="space-y-2.5">
                  <div className="whitespace-pre-line leading-relaxed text-[13.5px] text-[#0B3024] dark:text-[#F1FAF6]">
                    {msg.text}
                  </div>

                  {/* Optional follow-up chips */}
                  {msg.chips && msg.chips.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {msg.chips.map((chip, cIdx) => (
                        <button
                          key={cIdx}
                          type="button"
                          onClick={() => onSelectPrompt(chip)}
                          className="px-2.5 py-1 rounded-md text-xs font-medium bg-[#F1F8F5] dark:bg-[#0A2A24] text-[#159B72] dark:text-[#20D39B] border border-[#D8E8E2] dark:border-[#16463D] hover:border-emerald-500/40 transition-colors"
                        >
                          {chip} →
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Source / Trust UI Indicator */}
              <div className="mt-3 pt-2.5 border-t border-[#D8E8E2]/60 dark:border-[#16463D]/60 flex items-center justify-between text-[11px] text-[#658278] dark:text-[#789991]">
                <div className="flex items-center gap-1.5">
                  {msg.type === "mongodb" && (
                    <>
                      <Database className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                      <span>Source: <strong className="text-emerald-700 dark:text-emerald-300">College Data (MongoDB)</strong></span>
                    </>
                  )}
                  {msg.type === "rag" && (
                    <>
                      <FileText className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                      <span>Source: <strong className="text-emerald-700 dark:text-emerald-300">College Policy • RAG</strong></span>
                    </>
                  )}
                  {msg.type === "hybrid" && (
                    <>
                      <Layers className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                      <span>Source: <strong className="text-emerald-700 dark:text-emerald-300">College Data + Policy</strong></span>
                    </>
                  )}
                  {msg.type === "general" && (
                    <>
                      <Sparkles className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                      <span>Source: <strong className="text-emerald-700 dark:text-emerald-300">General AI</strong></span>
                    </>
                  )}
                  {msg.type === "unavailable" && (
                    <>
                      <HelpCircle className="w-3 h-3 text-amber-500" />
                      <span>Source: <strong className="text-amber-600 dark:text-amber-400">Verified Knowledge Boundary</strong></span>
                    </>
                  )}
                  {msg.type === "security" && (
                    <>
                      <ShieldAlert className="w-3 h-3 text-rose-500" />
                      <span>Source: <strong className="text-rose-600 dark:text-rose-400">Security Guardrail</strong></span>
                    </>
                  )}
                </div>

                <span>{msg.timestamp || "Just now"}</span>
              </div>
            </div>
          </div>
        );
      })}

      {/* 3. Typing / Thinking Indicator */}
      {isThinking && (
        <div className="flex items-start gap-3 animate-fade-in">
          <div className="w-9 h-9 rounded-full bg-[#159B72] text-white flex items-center justify-center shrink-0 shadow-xs ring-2 ring-emerald-500/20">
            <Bot className="w-5 h-5" />
          </div>
          <div className="bg-white dark:bg-[#06241F] rounded-2xl rounded-tl-xs px-4 py-3 border border-[#D8E8E2] dark:border-[#16463D] shadow-xs flex items-center gap-2.5 text-xs text-[#36594C] dark:text-[#B5CCC5]">
            <span className="font-medium text-emerald-700 dark:text-emerald-300">Campus AI is thinking...</span>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
