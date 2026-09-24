"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Database, Sparkles, Check, FileText, BookOpen, ShieldCheck } from "lucide-react";

export default function AIModeTabs({
  activeTab,
  onTabChange,
  assistantMode,
  onAssistantModeChange,
  contextScope,
  onContextScopeChange,
}) {
  const [isModeOpen, setIsModeOpen] = useState(false);
  const [isScopeOpen, setIsScopeOpen] = useState(false);

  const modeRef = useRef(null);
  const scopeRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (modeRef.current && !modeRef.current.contains(e.target)) {
        setIsModeOpen(false);
      }
      if (scopeRef.current && !scopeRef.current.contains(e.target)) {
        setIsScopeOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const TABS = [
    { id: "chat", label: "Chat" },
    { id: "knowledge", label: "College Knowledge" },
    { id: "documents", label: "Documents" },
    { id: "guidelines", label: "Guidelines" },
    { id: "policies", label: "Policies" },
  ];

  const ASSISTANT_MODES = [
    { id: "Campus AI", desc: "Default College AI with MongoDB & RAG" },
    { id: "Academic Tutor", desc: "Specialized in syllabus, assignments & exams" },
    { id: "Campus Navigator", desc: "Focuses on events, amenities & locations" },
  ];

  const CONTEXT_SCOPES = [
    { id: "College Data", desc: "Verified Campus MongoDB + RAG Documents" },
    { id: "Department Only", desc: "Computer Science & Engineering Scope" },
    { id: "Hostel & Facilities", desc: "Hostel, Mess & Sports Knowledge Base" },
  ];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
      {/* Left: Mode Tabs Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-all shrink-0 select-none ${
                isActive
                  ? "bg-[#159B72] text-white shadow-xs font-semibold"
                  : "bg-transparent text-[#36594C] dark:text-[#B5CCC5] hover:bg-emerald-500/10 hover:text-[#0B3024] dark:hover:text-[#F1FAF6] border border-transparent hover:border-[#D8E8E2] dark:hover:border-[#16463D]"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Right: Functional Dropdowns */}
      <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
        {/* Assistant Mode Dropdown */}
        <div className="relative" ref={modeRef}>
          <button
            type="button"
            onClick={() => {
              setIsModeOpen(!isModeOpen);
              setIsScopeOpen(false);
            }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#06241F] text-[#0B3024] dark:text-[#F1FAF6] text-xs font-medium hover:border-emerald-500/50 transition-colors shadow-2xs"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 animate-pulse" />
            <span>{assistantMode}</span>
            <ChevronDown className={`w-3.5 h-3.5 text-[#658278] transition-transform duration-200 ${isModeOpen ? "rotate-180" : ""}`} />
          </button>

          {isModeOpen && (
            <div className="absolute right-0 mt-1.5 w-60 rounded-xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-lg z-30 p-1.5 space-y-1">
              <div className="px-2 py-1 text-[11px] font-semibold text-[#658278] uppercase tracking-wider">
                Assistant Mode
              </div>
              {ASSISTANT_MODES.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => {
                    onAssistantModeChange(mode.id);
                    setIsModeOpen(false);
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                    assistantMode === mode.id
                      ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-semibold"
                      : "text-[#0B3024] dark:text-[#F1FAF6] hover:bg-black/5 dark:hover:bg-white/5"
                  }`}
                >
                  <div>
                    <div className="font-medium">{mode.id}</div>
                    <div className="text-[10px] text-[#658278] leading-tight">{mode.desc}</div>
                  </div>
                  {assistantMode === mode.id && <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* College Data Scope Dropdown */}
        <div className="relative" ref={scopeRef}>
          <button
            type="button"
            onClick={() => {
              setIsScopeOpen(!isScopeOpen);
              setIsModeOpen(false);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#06241F] text-[#0B3024] dark:text-[#F1FAF6] text-xs font-medium hover:border-emerald-500/50 transition-colors shadow-2xs"
          >
            <Database className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>{contextScope}</span>
            <ChevronDown className={`w-3.5 h-3.5 text-[#658278] transition-transform duration-200 ${isScopeOpen ? "rotate-180" : ""}`} />
          </button>

          {isScopeOpen && (
            <div className="absolute right-0 mt-1.5 w-64 rounded-xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-lg z-30 p-1.5 space-y-1">
              <div className="px-2 py-1 text-[11px] font-semibold text-[#658278] uppercase tracking-wider">
                Knowledge Context
              </div>
              {CONTEXT_SCOPES.map((scope) => (
                <button
                  key={scope.id}
                  onClick={() => {
                    onContextScopeChange(scope.id);
                    setIsScopeOpen(false);
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                    contextScope === scope.id
                      ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-semibold"
                      : "text-[#0B3024] dark:text-[#F1FAF6] hover:bg-black/5 dark:hover:bg-white/5"
                  }`}
                >
                  <div>
                    <div className="font-medium">{scope.id}</div>
                    <div className="text-[10px] text-[#658278] leading-tight">{scope.desc}</div>
                  </div>
                  {contextScope === scope.id && <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
