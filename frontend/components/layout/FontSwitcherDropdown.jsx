"use client";

import { useState, useRef, useEffect } from "react";
import { useFont } from "../providers/FontProvider";
import {
  Type,
  Check,
  ChevronDown,
  Lock,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export default function FontSwitcherDropdown() {
  const { selectedFont, setFont, lockedFont, lockFont, fonts } = useFont();
  const [isOpen, setIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (font) => {
    setFont(font);
  };

  const handleLock = () => {
    lockFont(selectedFont.name);
    setIsOpen(false);
    setToastMessage(`"${selectedFont.name}" font locked for your entire workspace!`);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Navbar Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((p) => !p)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-[#D8E8E2] dark:border-[#16463D] bg-[#F1F8F5]/70 dark:bg-[#0A2A24]/70 hover:bg-[#DDF3EB] dark:hover:bg-[#082A24] text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6] transition-all cursor-pointer shadow-2xs"
        title="Customize Interface Typography"
        aria-label="Customize interface font"
      >
        <div className="w-5 h-5 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 flex items-center justify-center text-emerald-700 dark:text-emerald-400 shrink-0">
          <Type className="w-3.5 h-3.5" />
        </div>
        <span className="text-[11px] text-[#5C786E] dark:text-[#8AA89F] hidden md:inline">
          Font:
        </span>
        <span className="font-bold text-emerald-700 dark:text-emerald-400 max-w-[95px] truncate">
          {selectedFont.name}
        </span>
        <ChevronDown
          className={`w-3 h-3 text-gray-400 dark:text-gray-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full mt-2 right-0 w-72 max-h-[470px] rounded-2xl bg-white dark:bg-[#041D18] border border-[#D8E8E2] dark:border-[#10372F] shadow-2xl z-50 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-150">
          {/* Header */}
          <div className="p-3 bg-gray-50/90 dark:bg-[#021512] border-b border-gray-100 dark:border-[#10372F] flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] block leading-tight flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                Typography Preferences
              </span>
              <span className="text-[10px] text-[#5C786E] dark:text-[#8AA89F]">
                Changes the entire UI font in real-time
              </span>
            </div>
            {lockedFont && (
              <span className="px-2 py-0.5 rounded-md text-[9.5px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                Locked: {lockedFont}
              </span>
            )}
          </div>

          {/* 12 Candidate Fonts List */}
          <div className="overflow-y-auto py-1.5 px-1.5 flex-1 max-h-72">
            {fonts.map((font) => {
              const isSelected = font.name === selectedFont.name;
              return (
                <button
                  key={font.id}
                  type="button"
                  onClick={() => handleSelect(font)}
                  className={`w-full text-left px-3 py-2 rounded-xl transition-all flex items-center justify-between gap-2 cursor-pointer ${
                    isSelected
                      ? "bg-emerald-50 dark:bg-[#082A24] text-emerald-800 dark:text-emerald-300 font-bold shadow-xs"
                      : "text-[#0B3024] dark:text-[#C5DCD4] hover:bg-gray-50 dark:hover:bg-[#0A3029]/80"
                  }`}
                >
                  <div className="min-w-0" style={{ fontFamily: font.family }}>
                    <span className="text-xs sm:text-[13px] block leading-tight truncate">
                      {font.name}
                    </span>
                    <span className="text-[10px] text-[#5C786E] dark:text-[#8AA89F] font-normal block truncate">
                      {font.category}
                    </span>
                  </div>

                  {isSelected && (
                    <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Footer: Lock & Save Action */}
          <div className="p-2.5 bg-gray-50/90 dark:bg-[#021512] border-t border-gray-100 dark:border-[#10372F] space-y-1.5">
            <button
              type="button"
              onClick={handleLock}
              className="w-full py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white dark:bg-[#10B981] dark:hover:bg-[#059669] dark:text-[#021512] text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Lock &quot;{selectedFont.name}&quot; for entire UI</span>
            </button>
            <span className="block text-[10px] text-center text-[#5C786E] dark:text-[#8AA89F]">
              Lock your preferred font, then tell the assistant!
            </span>
          </div>
        </div>
      )}

      {/* Global Message Popup / Toast when locked */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0B3024] dark:bg-[#10B981] text-white dark:text-[#021512] px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs font-semibold animate-in fade-in slide-in-from-bottom-5 border border-emerald-500/30">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 dark:text-[#021512] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
