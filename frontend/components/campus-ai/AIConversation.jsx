"use client";

import { useState, useEffect, useRef } from "react";
import {
  Bot,
  Database,
  FileText,
  Sparkles,
  Layers,
  AlertCircle,
  HelpCircle,
  RotateCcw,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Check,
  ArrowDown,
  Square,
  ShieldAlert,
  Zap,
  ArrowRight,
  Calendar,
  CalendarDays,
  Briefcase,
} from "lucide-react";
import {
  INITIAL_ASSISTANT_GREETING,
  QUICK_PROMPTS,
} from "./campusAIData";

// Simple robust markdown parser for assistant text (paragraphs, bold, bullet/numbered lists, inline code, code blocks)
function FormattedAssistantMessage({ text }) {
  if (!text) return null;

  // Split by code blocks first
  const parts = text.split(/(```[\s\S]*?```)/g);

  return (
    <div className="space-y-2 text-[13.5px] leading-relaxed text-[#0B3024] dark:text-[#F1FAF6]">
      {parts.map((part, index) => {
        if (part.startsWith("```") && part.endsWith("```")) {
          const rawCode = part.slice(3, -3).trim();
          // Extract language if specified on first line
          const firstLineBreak = rawCode.indexOf("\n");
          let code = rawCode;
          let lang = "";
          if (firstLineBreak !== -1) {
            const firstLine = rawCode.slice(0, firstLineBreak).trim();
            if (/^[a-zA-Z0-9_-]+$/.test(firstLine)) {
              lang = firstLine;
              code = rawCode.slice(firstLineBreak + 1);
            }
          }

          return <CodeBlock key={index} code={code} language={lang} />;
        }

        // Render normal text with bullet points, numbered lists, and bold text
        const lines = part.split("\n");
        return (
          <div key={index} className="space-y-1.5">
            {lines.map((line, lIdx) => {
              const trimmed = line.trim();
              if (!trimmed) return <div key={lIdx} className="h-1.5" />;

              // Bullet list item
              if (trimmed.startsWith("• ") || trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
                const bulletText = trimmed.replace(/^[•\-*]\s+/, "");
                return (
                  <div key={lIdx} className="flex items-start gap-2 pl-2">
                    <span className="text-emerald-600 dark:text-emerald-400 mt-1 select-none">•</span>
                    <span className="flex-1">{renderInlineStyles(bulletText)}</span>
                  </div>
                );
              }

              // Numbered list item
              if (/^\d+\.\s+/.test(trimmed)) {
                const match = trimmed.match(/^(\d+\.)\s+(.*)/);
                if (match) {
                  return (
                    <div key={lIdx} className="flex items-start gap-2 pl-2">
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold select-none text-xs mt-0.5 min-w-[18px]">
                        {match[1]}
                      </span>
                      <span className="flex-1">{renderInlineStyles(match[2])}</span>
                    </div>
                  );
                }
              }

              return <p key={lIdx}>{renderInlineStyles(line)}</p>;
            })}
          </div>
        );
      })}
    </div>
  );
}

// Inline formatting: **bold** and `code`
function renderInlineStyles(text) {
  // Regex to match **bold** or `code`
  const regex = /(\*\*.*?\*\*|`.*?`)/g;
  const tokens = text.split(regex);

  return tokens.map((token, i) => {
    if (token.startsWith("**") && token.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-emerald-950 dark:text-white">
          {token.slice(2, -2)}
        </strong>
      );
    }
    if (token.startsWith("`") && token.endsWith("`")) {
      return (
        <code
          key={i}
          className="px-1.5 py-0.5 rounded-md text-xs font-mono bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20"
        >
          {token.slice(1, -1)}
        </code>
      );
    }
    return token;
  });
}

// Code Block with Copy Button and horizontal scroll confined to block
function CodeBlock({ code, language }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative my-2 rounded-xl overflow-hidden border border-[#D8E8E2] dark:border-[#16463D] bg-gray-900 text-gray-100 text-xs font-mono shadow-xs">
      <div className="flex items-center justify-between px-3 py-1.5 bg-gray-800 border-b border-gray-700/60 text-[11px] text-gray-400 select-none">
        <span>{language || "code"}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1 px-2 py-0.5 rounded hover:bg-gray-700 text-gray-300 transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-400" />
              <span className="text-emerald-400 text-[10px]">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span className="text-[10px]">Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-3 overflow-x-auto scrollbar-thin text-xs leading-relaxed max-w-full">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export default function AIConversation({
  messages,
  isThinking,
  onSelectPrompt,
  onSwitchTab,
  onRetry,
  onStopThinking,
  onViewAllQueries,
}) {
  const scrollRef = useRef(null);
  const [showJumpToLatest, setShowJumpToLatest] = useState(false);
  const [copiedMsgId, setCopiedMsgId] = useState(null);
  const [feedbackState, setFeedbackState] = useState({}); // { [msgId]: 'up' | 'down' }
  const isNearBottomRef = useRef(true);

  // Monitor scroll position
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    const distanceToBottom = scrollHeight - scrollTop - clientHeight;
    const isNear = distanceToBottom < 90;
    isNearBottomRef.current = isNear;
    setShowJumpToLatest(!isNear && messages.length > 0);
  };

  // Auto-scroll when new messages arrive or when thinking state changes
  useEffect(() => {
    if (scrollRef.current && isNearBottomRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isThinking]);

  // Jump to latest message
  const handleJumpToLatest = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
      setShowJumpToLatest(false);
    }
  };

  // Copy assistant response
  const handleCopyMessage = (msgId, text) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedMsgId(msgId);
      setTimeout(() => setCopiedMsgId(null), 2000);
    }
  };

  // Feedback thumb click
  const handleFeedback = (msgId, type) => {
    setFeedbackState((prev) => ({
      ...prev,
      [msgId]: prev[msgId] === type ? null : type,
    }));
  };

  // Helper for quick prompt icon
  const renderPromptIcon = (type) => {
    switch (type) {
      case "calendar":
        return <Calendar className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
      case "document":
        return <FileText className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
      case "events":
        return <CalendarDays className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
      case "briefcase":
        return <Briefcase className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
      default:
        return <Calendar className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
    }
  };

  const hasMessages = messages.length > 0;

  return (
    <div className="relative flex-1 min-h-0 flex flex-col">
      {/* Scrollable Message Container */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex-1 min-h-0 overflow-y-auto p-3.5 sm:p-4 md:p-5 space-y-4 scroll-smooth scrollbar-thin"
      >
        {/* ================================================================= */}
        {/* INITIAL EMPTY STATE: Greeting Card + Embedded Quick Prompts      */}
        {/* ================================================================= */}
        {!hasMessages && (
          <div className="space-y-4 animate-in fade-in duration-200">
            {/* 1. Assistant Greeting Card */}
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#159B72] text-white flex items-center justify-center shrink-0 shadow-xs ring-2 ring-emerald-500/20">
                <Bot className="w-5 h-5" />
              </div>

              <div className="flex-1 bg-white dark:bg-[#06241F] rounded-2xl p-4 sm:p-5 border border-[#D8E8E2] dark:border-[#16463D] shadow-xs text-sm text-[#0B3024] dark:text-[#F1FAF6] leading-relaxed">
                <div className="font-bold text-base mb-1 text-[#0B3024] dark:text-white flex items-center gap-1.5">
                  <span>{INITIAL_ASSISTANT_GREETING.content.salutation}</span>
                </div>

                <p className="text-[13px] text-[#36594C] dark:text-[#B5CCC5] mb-3">
                  {INITIAL_ASSISTANT_GREETING.content.intro}
                </p>

                <div className="text-[11px] font-semibold text-[#658278] dark:text-[#789991] mb-2 uppercase tracking-wider">
                  {INITIAL_ASSISTANT_GREETING.content.promptHelp}
                </div>

                {/* Interactive Topic Chips */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {INITIAL_ASSISTANT_GREETING.content.chips.map((chip, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => onSelectPrompt(chip.query)}
                      className="px-2.5 py-1 rounded-full text-xs font-medium bg-[#ECF9F4] dark:bg-[#123F35] text-[#159B72] dark:text-[#20D39B] border border-emerald-500/20 hover:border-emerald-500/50 hover:bg-emerald-100/60 dark:hover:bg-emerald-900/40 transition-all cursor-pointer shadow-2xs"
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>

                <p className="text-xs text-[#658278] dark:text-[#789991] mb-2">
                  {INITIAL_ASSISTANT_GREETING.content.generalNote}
                </p>

                <div className="font-semibold text-xs sm:text-[13px] text-emerald-700 dark:text-emerald-300">
                  {INITIAL_ASSISTANT_GREETING.content.closing}
                </div>
              </div>
            </div>

            {/* 2. Embedded Quick Prompts Cards (Inside Empty State) */}
            <div className="pt-1 space-y-2.5">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6]">
                  <Zap className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 fill-emerald-500/20" />
                  <span>Quick Prompts</span>
                </div>
                {onViewAllQueries && (
                  <button
                    type="button"
                    onClick={onViewAllQueries}
                    className="text-[11px] font-medium text-emerald-700 dark:text-emerald-300 hover:text-emerald-800 dark:hover:text-emerald-200 flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>View All</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {QUICK_PROMPTS.map((prompt) => (
                  <button
                    key={prompt.id}
                    type="button"
                    onClick={() => onSelectPrompt(prompt.query)}
                    className="flex items-center gap-3 p-3 rounded-xl border border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#06241F] text-left hover:border-emerald-500/50 hover:bg-emerald-50/40 dark:hover:bg-emerald-950/20 transition-all shadow-2xs group cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-500/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      {renderPromptIcon(prompt.iconType)}
                    </div>
                    <span className="text-xs font-medium text-[#0B3024] dark:text-[#F1FAF6] group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors line-clamp-1">
                      {prompt.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* ACTIVE CONVERSATION THREAD                                        */}
        {/* ================================================================= */}
        {messages.map((msg) => {
          const isUser = msg.sender === "user";

          if (isUser) {
            return (
              <div key={msg.id} className="flex justify-end items-start gap-2.5 pl-6 sm:pl-16">
                <div className="bg-[#159B72] text-white rounded-2xl rounded-tr-xs px-4 py-2.5 shadow-xs text-[13.5px] max-w-[85%] sm:max-w-xl">
                  <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                  {msg.attachment && (
                    <div className="mt-2 pt-1.5 border-t border-white/20 flex items-center gap-1.5 text-xs text-emerald-100">
                      <FileText className="w-3.5 h-3.5" />
                      <span className="truncate">{msg.attachment.name}</span>
                    </div>
                  )}
                  <div className="text-[10px] text-emerald-100/80 text-right mt-1 font-mono">
                    {msg.timestamp || "Just now"}
                  </div>
                </div>
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-emerald-800 text-white flex items-center justify-center shrink-0 text-xs font-bold shadow-2xs">
                  HR
                </div>
              </div>
            );
          }

          // Assistant Message
          return (
            <div key={msg.id} className="flex items-start gap-2.5 sm:gap-3 pr-2 sm:pr-8">
              <div className="w-8 h-8 rounded-xl bg-[#159B72] text-white flex items-center justify-center shrink-0 shadow-xs ring-2 ring-emerald-500/20">
                <Bot className="w-4.5 h-4.5" />
              </div>

              <div className="flex-1 bg-white dark:bg-[#06241F] rounded-2xl rounded-tl-xs p-3.5 sm:p-4 md:p-5 border border-[#D8E8E2] dark:border-[#16463D] shadow-xs text-sm text-[#0B3024] dark:text-[#F1FAF6] max-w-2xl">
                {/* 1. Unavailable Information State */}
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
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 hover:border-emerald-500/50 cursor-pointer"
                      >
                        Ask another question
                      </button>
                      <button
                        type="button"
                        onClick={() => onSwitchTab?.("knowledge")}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#F1F8F5] dark:bg-[#0A2A24] text-[#0B3024] dark:text-[#F1FAF6] border border-[#D8E8E2] dark:border-[#16463D] hover:border-emerald-500/40 cursor-pointer"
                      >
                        Browse College Knowledge
                      </button>
                    </div>
                  </div>
                ) : msg.type === "security" ? (
                  /* 2. Security Guardrail UI */
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
                  /* 3. Error UI with Retry */
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2 text-rose-500 font-medium text-sm">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>Campus AI couldn&apos;t complete that request right now.</span>
                    </div>
                    <p className="text-xs text-[#658278] dark:text-[#789991]">
                      {msg.text}
                    </p>
                    <button
                      type="button"
                      onClick={() => onRetry?.(msg.originalQuery)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-600 text-white hover:bg-emerald-700 transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Try Again</span>
                    </button>
                  </div>
                ) : (
                  /* 4. Rich Formatted Markdown Response */
                  <div className="space-y-2.5">
                    <FormattedAssistantMessage text={msg.text} />

                    {/* Follow-up question chips */}
                    {msg.chips && msg.chips.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {msg.chips.map((chip, cIdx) => (
                          <button
                            key={cIdx}
                            type="button"
                            onClick={() => onSelectPrompt(chip)}
                            className="px-2.5 py-1 rounded-md text-xs font-medium bg-[#F1F8F5] dark:bg-[#0A2A24] text-[#159B72] dark:text-[#20D39B] border border-[#D8E8E2] dark:border-[#16463D] hover:border-emerald-500/40 transition-colors cursor-pointer"
                          >
                            {chip} →
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Source & Actions Bar */}
                <div className="mt-3 pt-2.5 border-t border-[#D8E8E2]/60 dark:border-[#16463D]/60 flex items-center justify-between text-[11px] text-[#658278] dark:text-[#789991] flex-wrap gap-2">
                  {/* Left: Source Badge */}
                  <div className="flex items-center gap-1.5">
                    {msg.type === "mongodb" && (
                      <>
                        <Database className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                        <span>Source: <strong className="text-emerald-700 dark:text-emerald-300 font-semibold">College Data (MongoDB)</strong></span>
                      </>
                    )}
                    {msg.type === "rag" && (
                      <>
                        <FileText className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                        <span>Source: <strong className="text-emerald-700 dark:text-emerald-300 font-semibold">College Policy • RAG</strong></span>
                      </>
                    )}
                    {msg.type === "hybrid" && (
                      <>
                        <Layers className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                        <span>Source: <strong className="text-emerald-700 dark:text-emerald-300 font-semibold">College Data + Policy</strong></span>
                      </>
                    )}
                    {msg.type === "general" && (
                      <>
                        <Sparkles className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                        <span>Source: <strong className="text-emerald-700 dark:text-emerald-300 font-semibold">General AI</strong></span>
                      </>
                    )}
                    {msg.type === "unavailable" && (
                      <>
                        <HelpCircle className="w-3 h-3 text-amber-500" />
                        <span>Source: <strong className="text-amber-600 dark:text-amber-400 font-semibold">Verified Knowledge Boundary</strong></span>
                      </>
                    )}
                    {msg.type === "security" && (
                      <>
                        <ShieldAlert className="w-3 h-3 text-rose-500" />
                        <span>Source: <strong className="text-rose-600 dark:text-rose-400 font-semibold">Security Protocol</strong></span>
                      </>
                    )}
                  </div>

                  {/* Right: Message Actions (Copy, Regenerate, Thumbs) */}
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleCopyMessage(msg.id, msg.text)}
                      title="Copy response"
                      className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-[#082A24] text-[#658278] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] transition-colors cursor-pointer"
                    >
                      {copiedMsgId === msg.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>

                    {msg.originalQuery && onRetry && (
                      <button
                        type="button"
                        onClick={() => onRetry(msg.originalQuery)}
                        title="Regenerate response"
                        className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-[#082A24] text-[#658278] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] transition-colors cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => handleFeedback(msg.id, "up")}
                      title="Helpful response"
                      className={`p-1 rounded-md transition-colors cursor-pointer ${
                        feedbackState[msg.id] === "up"
                          ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60"
                          : "hover:bg-gray-100 dark:hover:bg-[#082A24] text-[#658278]"
                      }`}
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleFeedback(msg.id, "down")}
                      title="Not helpful"
                      className={`p-1 rounded-md transition-colors cursor-pointer ${
                        feedbackState[msg.id] === "down"
                          ? "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60"
                          : "hover:bg-gray-100 dark:hover:bg-[#082A24] text-[#658278]"
                      }`}
                    >
                      <ThumbsDown className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* 3. Typing / Thinking Indicator */}
        {isThinking && (
          <div className="flex items-start gap-2.5 sm:gap-3 animate-in fade-in duration-150">
            <div className="w-8 h-8 rounded-xl bg-[#159B72] text-white flex items-center justify-center shrink-0 shadow-xs ring-2 ring-emerald-500/20">
              <Bot className="w-4.5 h-4.5" />
            </div>
            <div className="bg-white dark:bg-[#06241F] rounded-2xl rounded-tl-xs px-4 py-2.5 border border-[#D8E8E2] dark:border-[#16463D] shadow-xs flex items-center gap-3 text-xs text-[#36594C] dark:text-[#B5CCC5]">
              <span className="font-medium text-emerald-700 dark:text-emerald-300">
                Campus AI is thinking...
              </span>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
              {onStopThinking && (
                <button
                  type="button"
                  onClick={onStopThinking}
                  className="ml-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                  title="Stop generating"
                >
                  <Square className="w-2.5 h-2.5 fill-current" />
                  <span>Stop</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Floating Jump to Latest Button */}
      {showJumpToLatest && (
        <button
          type="button"
          onClick={handleJumpToLatest}
          className="absolute bottom-3 right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-[#041D18] border border-[#D8E8E2] dark:border-[#16463D] text-xs font-semibold text-emerald-700 dark:text-emerald-400 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer animate-in fade-in slide-in-from-bottom-2"
        >
          <ArrowDown className="w-3.5 h-3.5" />
          <span>Jump to latest</span>
        </button>
      )}
    </div>
  );
}
