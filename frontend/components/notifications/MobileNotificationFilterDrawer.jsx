"use client";

import { useEffect, useState } from "react";
import { X, Check } from "lucide-react";
import { NOTIFICATION_CATEGORIES } from "./notificationData";

export default function MobileNotificationFilterDrawer({
  isOpen,
  onClose,
  activeCategory,
  onApplyCategory,
  sortBy,
  onApplySort,
  onResetFilters,
}) {
  const [localCategory, setLocalCategory] = useState(activeCategory);
  const [localSort, setLocalSort] = useState(sortBy);

  useEffect(() => {
    setLocalCategory(activeCategory);
    setLocalSort(sortBy);
  }, [activeCategory, sortBy, isOpen]);

  // Handle escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleApply = () => {
    onApplyCategory(localCategory);
    onApplySort(localSort);
    onClose();
  };

  const handleClear = () => {
    setLocalCategory("all");
    setLocalSort("newest");
    onResetFilters();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/50 backdrop-blur-xs sm:hidden animate-in fade-in duration-200">
      <div
        className="w-full bg-white dark:bg-[#06241F] rounded-t-3xl border-t border-[#D8E8E2] dark:border-[#10372F] p-5 max-h-[85vh] overflow-y-auto space-y-5 animate-in slide-in-from-bottom duration-200 shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#E8F1ED] dark:border-[#10372F]">
          <h3 className="text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
            Filter Notifications
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-[#658278] dark:text-[#789991] hover:bg-[#E8F1ED] dark:hover:bg-[#10372F] cursor-pointer"
            aria-label="Close filters drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status / Category Section */}
        <div className="space-y-2.5">
          <label className="text-xs font-bold uppercase tracking-wider text-[#658278] dark:text-[#789991] block">
            Category & Status
          </label>
          <div className="grid grid-cols-2 gap-2">
            {NOTIFICATION_CATEGORIES.map((cat) => {
              const isSelected = localCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setLocalCategory(cat.id)}
                  className={`flex items-center justify-between p-2.5 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-[#DDF3EB] dark:bg-[#073327] border-[#159B72] dark:border-[#20D39B] text-[#0B3024] dark:text-[#F1FAF6] font-bold"
                      : "bg-[#F7FBF9] dark:bg-[#082A24] border-[#E8F1ED] dark:border-[#10372F] text-[#4A685D] dark:text-[#8BAAA0]"
                  }`}
                >
                  <span>{cat.label}</span>
                  {isSelected && (
                    <Check className="w-3.5 h-3.5 text-[#159B72] dark:text-[#20D39B]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sort Order Section */}
        <div className="space-y-2.5">
          <label className="text-xs font-bold uppercase tracking-wider text-[#658278] dark:text-[#789991] block">
            Sort Order
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: "newest", label: "Newest" },
              { id: "oldest", label: "Oldest" },
              { id: "priority", label: "Priority" },
            ].map((opt) => {
              const isSelected = localSort === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setLocalSort(opt.id)}
                  className={`p-2.5 rounded-xl text-xs font-medium border text-center transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-[#DDF3EB] dark:bg-[#073327] border-[#159B72] dark:border-[#20D39B] text-[#0B3024] dark:text-[#F1FAF6] font-bold"
                      : "bg-[#F7FBF9] dark:bg-[#082A24] border-[#E8F1ED] dark:border-[#10372F] text-[#4A685D] dark:text-[#8BAAA0]"
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Drawer Actions */}
        <div className="pt-3 border-t border-[#E8F1ED] dark:border-[#10372F] flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleClear}
            className="flex-1 py-2.5 text-xs font-semibold rounded-xl border border-[#D8E8E2] dark:border-[#16463D] text-[#36594C] dark:text-[#A3BFB5] hover:bg-[#F1FAF6] dark:hover:bg-[#082A24] transition-colors cursor-pointer"
          >
            Clear Filters
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="flex-1 py-2.5 text-xs font-bold rounded-xl bg-[#159B72] dark:bg-[#20D39B] text-white dark:text-[#021512] hover:bg-[#0E7A58] dark:hover:bg-[#18B885] transition-colors cursor-pointer shadow-xs active:scale-95"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
