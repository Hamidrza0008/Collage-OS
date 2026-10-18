"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Bot,
  Sparkles,
  Send,
  Mic,
  Copy,
  Check,
  FileText,
  Users,
  Calendar,
  Archive,
  GraduationCap,
  ArrowRight,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";
import {
  FACULTY_AI_QUICK_PROMPTS,
  FACULTY_AI_EXAMPLES,
} from "./facultyCampusAIData";

export default function FacultyAIChatArea({
  messages,
  isThinking,
  onSendMessage,
  onResetChat,
}) {
  const [inputText, setInputText] = useState("");
  const [copiedId, setCopiedId] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

  const handleSend = (e) => {
    e?.preventDefault();
    if (!inputText.trim() || isThinking) return;
    onSendMessage(inputText.trim());
    setInputText("");
  };

  const handlePromptClick = (text) => {
    onSendMessage(text);
  };

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const renderPromptIcon = (icon) => {
    const className = "w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0";
    switch (icon) {
      case "arrow":
        return <ArrowRight className={className} />;
      case "document":
        return <FileText className={className} />;
      case "users":
        return <Users className={className} />;
      case "archive":
        return <Archive className={className} />;
      case "graduation":
        return <GraduationCap className={className} />;
      default:
        return <FileText className={className} />;
    }
  };

  return (
    <div className="bg-white dark:bg-card-bg rounded-2xl border border-border-light dark:border-border-dark p-5 sm:p-6 min-h-[540px] flex flex-col justify-between shadow-2xs space-y-6">
      {/* Top Conversation or Initial State */}
      <div className="flex-1 overflow-y-auto space-y-5 pr-1 scrollbar-thin">
        {messages.length === 0 ? (
          /* Empty / Initial State matching reference screenshot */
          <div className="space-y-6 pt-2">
            {/* Greeting Header */}
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-full bg-[#083327] dark:bg-[#159B72] text-white flex items-center justify-center shrink-0 shadow-xs">
                <Bot className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h2 className="text-base sm:text-lg font-bold text-text-primary dark:text-text-primary-dark">
                  Hello, Dr. Arjun Mehta! 👋
                </h2>
                <p className="text-xs sm:text-[13px] text-text-secondary dark:text-text-secondary-dark leading-relaxed max-w-xl">
                  I&apos;m your Campus AI assistant. Ask me anything about your college — from policies and guidelines to student information, timetables, notices and more.
                </p>
              </div>
            </div>

            {/* Quick Prompts 2-Row Pill Buttons */}
            <div className="space-y-2.5 pt-2">
              {/* Row 1 */}
              <div className="flex flex-wrap items-center gap-2.5">
                {FACULTY_AI_QUICK_PROMPTS.slice(0, 3).map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => handlePromptClick(p.text)}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-full border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark text-xs font-medium text-text-primary dark:text-text-primary-dark hover:border-emerald-500 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 transition-all cursor-pointer shadow-2xs group"
                  >
                    {renderPromptIcon(p.icon)}
                    <span className="group-hover:text-emerald-700 dark:group-hover:text-emerald-300">
                      {p.text}
                    </span>
                  </button>
                ))}
              </div>

              {/* Row 2 */}
              <div className="flex flex-wrap items-center gap-2.5">
                {FACULTY_AI_QUICK_PROMPTS.slice(3, 6).map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => handlePromptClick(p.text)}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-full border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark text-xs font-medium text-text-primary dark:text-text-primary-dark hover:border-emerald-500 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 transition-all cursor-pointer shadow-2xs group"
                  >
                    {renderPromptIcon(p.icon)}
                    <span className="group-hover:text-emerald-700 dark:group-hover:text-emerald-300">
                      {p.text}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Active Chat Stream */
          <div className="space-y-4 pt-1">
            <div className="flex items-center justify-between pb-2 border-b border-border-light/60 dark:border-border-dark/60 text-xs text-text-secondary">
              <span>Active Consultation</span>
              <button
                type="button"
                onClick={onResetChat}
                className="flex items-center gap-1 text-emerald-600 hover:text-emerald-700 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>New Session</span>
              </button>
            </div>

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender === "assistant" && (
                  <div className="w-8 h-8 rounded-full bg-[#083327] dark:bg-[#159B72] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs sm:text-[13px] ${
                    msg.sender === "user"
                      ? "bg-[#159B72] text-white rounded-br-xs shadow-xs"
                      : "bg-gray-50/90 dark:bg-surface-dark/80 text-text-primary dark:text-text-primary-dark border border-border-light dark:border-border-dark rounded-bl-xs space-y-2 shadow-2xs"
                  }`}
                >
                  <div className="whitespace-pre-line leading-relaxed font-normal">
                    {msg.text}
                  </div>

                  {msg.source && (
                    <div className="pt-2 border-t border-border-light/60 dark:border-border-dark/60 flex items-center justify-between gap-3 text-[11px] text-text-secondary">
                      <span className="flex items-center gap-1 font-medium text-emerald-700 dark:text-emerald-400">
                        <ShieldCheck className="w-3 h-3" />
                        {msg.source}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopy(msg.id, msg.text)}
                        className="hover:text-text-primary transition-colors cursor-pointer"
                      >
                        {copiedId === msg.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isThinking && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#083327] dark:bg-[#159B72] text-white flex items-center justify-center shrink-0 shadow-2xs animate-pulse">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="px-4 py-3 rounded-2xl bg-gray-50 dark:bg-surface-dark border border-border-light dark:border-border-dark text-xs text-text-secondary flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.4s]" />
                  <span className="ml-1 font-medium">Querying College RAG & MongoDB...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Bottom Sticky Input Bar & Examples */}
      <div className="space-y-3 pt-3 border-t border-border-light/70 dark:border-border-dark/70">
        <form
          onSubmit={handleSend}
          className="flex items-center gap-2.5 px-3.5 py-2 rounded-2xl border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all shadow-2xs"
        >
          <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask a question about your college..."
            className="flex-1 bg-transparent text-xs sm:text-[13px] text-text-primary dark:text-text-primary-dark placeholder:text-text-secondary/60 focus:outline-none"
          />
          <button
            type="button"
            title="Voice input"
            className="p-1.5 rounded-lg text-text-secondary hover:text-emerald-600 transition-colors cursor-pointer shrink-0"
          >
            <Mic className="w-4 h-4" />
          </button>
          <button
            type="submit"
            disabled={!inputText.trim() || isThinking}
            title="Send query"
            className="w-8 h-8 rounded-xl bg-[#159B72] hover:bg-[#128360] disabled:opacity-40 text-white flex items-center justify-center transition-all cursor-pointer shrink-0 shadow-xs"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        {/* Examples row */}
        <div className="flex items-center flex-wrap gap-2 text-xs text-text-secondary dark:text-text-secondary-dark">
          <span className="font-semibold text-text-primary dark:text-text-primary-dark">
            Examples:
          </span>
          {FACULTY_AI_EXAMPLES.map((ex, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handlePromptClick(ex)}
              className="text-[11px] px-2.5 py-1 rounded-full border border-border-light dark:border-border-dark bg-gray-50/70 dark:bg-surface-dark hover:border-emerald-500 hover:text-emerald-700 dark:hover:text-emerald-300 transition-all cursor-pointer"
            >
              {ex}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
