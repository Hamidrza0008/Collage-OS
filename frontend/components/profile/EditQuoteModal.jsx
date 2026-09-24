"use client";

import { useState, useEffect } from "react";
import { X, Quote, Check } from "lucide-react";

export default function EditQuoteModal({ isOpen, onClose, currentQuote, onSaveQuote }) {
  const [quote, setQuote] = useState(currentQuote || "");

  useEffect(() => {
    setQuote(currentQuote || "");
  }, [currentQuote, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (quote.trim()) {
      onSaveQuote(quote.trim());
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#E8F1ED] dark:border-[#10372F] flex items-center justify-between bg-[#F7FBF9] dark:bg-[#082A24]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-[#159B72] dark:text-[#20D39B] flex items-center justify-center">
              <Quote className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                Edit Status Quote
              </h3>
              <p className="text-[11px] text-[#658278] dark:text-[#789991]">
                Share your personal motto on your profile banner
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-[#658278] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] mb-1.5">
              Personal Motto / Quote
            </label>
            <textarea
              rows={3}
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              placeholder="e.g. Always learning, building, and exploring..."
              className="w-full p-3 rounded-xl border border-[#D8E8E2] dark:border-[#16463D] bg-[#F7FBF9] dark:bg-[#082A24] text-xs text-[#0B3024] dark:text-[#F1FAF6] placeholder-[#658278] focus:outline-none focus:border-[#159B72] dark:focus:border-[#20D39B] transition-colors resize-none"
            />
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-[#E8F1ED] dark:border-[#10372F]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[#658278] hover:bg-gray-100 dark:hover:bg-[#082A24] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!quote.trim()}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-[#159B72] hover:bg-[#087A5B] disabled:opacity-50 text-white flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Save Quote</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
