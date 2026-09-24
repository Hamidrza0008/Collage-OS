"use client";

import { useState, useRef, useEffect } from "react";
import { Paperclip, Send, X, FileText, Lightbulb, Square } from "lucide-react";

export default function AIComposer({
  onSendMessage,
  isThinking,
  onStopThinking,
  collegeKnowledgeEnabled,
  onToggleCollegeKnowledge,
  generalAIEnabled,
  onToggleGeneralAI,
}) {
  const [inputText, setInputText] = useState("");
  const [attachment, setAttachment] = useState(null);
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  // Auto-resize textarea based on content up to 120px
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const nextHeight = Math.min(textareaRef.current.scrollHeight, 120);
      textareaRef.current.style.height = `${Math.max(nextHeight, 38)}px`;
    }
  }, [inputText]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if ((!inputText.trim() && !attachment) || isThinking) return;
    onSendMessage(inputText.trim(), attachment);
    setInputText("");
    setAttachment(null);
    if (textareaRef.current) {
      textareaRef.current.style.height = "38px";
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachment({
        name: file.name,
        size: (file.size / 1024).toFixed(1) + " KB",
        type: file.type,
      });
    }
  };

  const handleShortcutClick = (tag) => {
    setInputText((prev) => (prev ? `${prev} ${tag} ` : `${tag} `));
    textareaRef.current?.focus();
  };

  const isSendDisabled = (!inputText.trim() && !attachment) || isThinking;

  return (
    <div className="shrink-0 bg-white/95 dark:bg-[#06241F]/95 backdrop-blur-md border-t border-[#D8E8E2]/80 dark:border-[#16463D]/80 p-2.5 sm:p-3 space-y-2 pb-[max(0.65rem,env(safe-area-inset-bottom))]">
      {/* Main Composer Box */}
      <div className="relative rounded-2xl border border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#06241F] shadow-xs focus-within:border-emerald-500/70 focus-within:ring-2 focus-within:ring-emerald-500/15 transition-all p-2 sm:p-2.5">
        {/* Attachment preview chip if a file is attached */}
        {attachment && (
          <div className="mb-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-800 dark:text-emerald-200">
            <FileText className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span className="font-medium truncate max-w-xs">{attachment.name}</span>
            <span className="text-[10px] text-emerald-600/70">({attachment.size})</span>
            <button
              type="button"
              onClick={() => setAttachment(null)}
              className="ml-1 text-emerald-600 hover:text-emerald-800 dark:hover:text-emerald-100 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Input Area + Attachment & Send / Stop Buttons */}
        <div className="flex items-end gap-2">
          {/* File Attachment Hidden Input & Trigger Button */}
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
            className="hidden"
            accept=".pdf,.doc,.docx,.txt"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            title="Attach document or guideline"
            className="w-8 h-8 rounded-xl flex items-center justify-center text-[#658278] hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-emerald-500/10 transition-colors shrink-0 mb-0.5 cursor-pointer"
          >
            <Paperclip className="w-4 h-4 rotate-45" />
          </button>

          {/* Auto-growing Textarea */}
          <textarea
            ref={textareaRef}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything about your college... (Enter to send, Shift+Enter for new line)"
            disabled={isThinking}
            rows={1}
            className="flex-1 bg-transparent border-0 outline-none text-[13.5px] text-[#0B3024] dark:text-[#F1FAF6] placeholder-[#658278] dark:placeholder-[#789991] px-1 py-1.5 resize-none max-h-[120px] scrollbar-thin disabled:opacity-50"
          />

          {/* Send or Stop Button */}
          {isThinking && onStopThinking ? (
            <button
              type="button"
              onClick={onStopThinking}
              title="Stop generating"
              className="w-8 h-8 rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center shrink-0 mb-0.5 shadow-xs cursor-pointer transition-transform active:scale-95"
            >
              <Square className="w-3 h-3 fill-current" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSendDisabled}
              title="Send question"
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mb-0.5 transition-all ${
                isSendDisabled
                  ? "bg-gray-100 dark:bg-emerald-950/40 text-gray-400 dark:text-emerald-900 cursor-not-allowed"
                  : "bg-[#159B72] hover:bg-[#087A5B] text-white shadow-xs cursor-pointer hover:scale-105 active:scale-95"
              }`}
            >
              <Send className="w-3.5 h-3.5 ml-0.5" />
            </button>
          )}
        </div>
      </div>

      {/* Sub-bar: Toggles + Context Prompt Help */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 px-1 text-xs text-[#658278] dark:text-[#789991]">
        {/* Left: Mode Toggles */}
        <div className="flex items-center gap-3">
          {/* College Knowledge Toggle */}
          <label className="flex items-center gap-1.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={collegeKnowledgeEnabled}
              onChange={(e) => onToggleCollegeKnowledge(e.target.checked)}
              className="sr-only"
            />
            <div
              className={`w-6 h-3.5 flex items-center rounded-full p-0.5 transition-colors ${
                collegeKnowledgeEnabled ? "bg-[#159B72]" : "bg-gray-300 dark:bg-gray-700"
              }`}
            >
              <div
                className={`bg-white w-2.5 h-2.5 rounded-full shadow-xs transform transition-transform ${
                  collegeKnowledgeEnabled ? "translate-x-2.5" : "translate-x-0"
                }`}
              />
            </div>
            <span className={`text-[11px] font-medium ${collegeKnowledgeEnabled ? "text-[#0B3024] dark:text-[#F1FAF6]" : ""}`}>
              College Knowledge
            </span>
          </label>

          {/* General AI Toggle */}
          <label className="flex items-center gap-1.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={generalAIEnabled}
              onChange={(e) => onToggleGeneralAI(e.target.checked)}
              className="sr-only"
            />
            <div
              className={`w-6 h-3.5 flex items-center rounded-full p-0.5 transition-colors ${
                generalAIEnabled ? "bg-[#159B72]" : "bg-gray-300 dark:bg-gray-700"
              }`}
            >
              <div
                className={`bg-white w-2.5 h-2.5 rounded-full shadow-xs transform transition-transform ${
                  generalAIEnabled ? "translate-x-2.5" : "translate-x-0"
                }`}
              />
            </div>
            <span className={`text-[11px] font-medium ${generalAIEnabled ? "text-[#0B3024] dark:text-[#F1FAF6]" : ""}`}>
              General AI
            </span>
          </label>
        </div>

        {/* Right: Shortcut Hint with clickable tag */}
        <div className="flex items-center gap-1 text-[11px] self-end sm:self-auto">
          <Lightbulb className="w-3 h-3 text-amber-500 shrink-0" />
          <span>Use <strong className="text-emerald-700 dark:text-emerald-300 font-medium">@</strong>:</span>
          <button
            type="button"
            onClick={() => handleShortcutClick("@timetable")}
            className="hover:underline text-emerald-600 dark:text-emerald-400 font-mono font-medium cursor-pointer"
          >
            @timetable
          </button>
        </div>
      </div>
    </div>
  );
}
