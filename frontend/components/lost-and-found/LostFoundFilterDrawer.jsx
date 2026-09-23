/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { X, Check, RotateCcw } from "lucide-react";
import { LOST_FOUND_CATEGORIES, LOCATIONS_LIST } from "./lostFoundData";

export default function LostFoundFilterDrawer({
  isOpen,
  onClose,
  filters,
  onApplyFilters,
  onClearFilters,
}) {
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters, isOpen]);

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

  const handleApply = () => {
    onApplyFilters(localFilters);
    onClose();
  };

  const handleReset = () => {
    onClearFilters();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-2xl p-5 sm:p-6 overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-[#D8E8E2] dark:border-[#16463D]">
          <div>
            <h3 className="text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
              Filter Lost &amp; Found Items
            </h3>
            <p className="text-xs text-[#55786B] dark:text-[#9FB7AD] mt-0.5">
              Refine listings by item status, location, category, or reporter
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-[#082A24] text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Filter Fields */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4 text-xs pr-1">
          {/* 1. Item Type */}
          <div>
            <label className="block font-bold text-[#0B3024] dark:text-[#F1FAF6] mb-2">
              Item Type
            </label>
            <div className="grid grid-cols-3 gap-2">
              {["All", "Lost", "Found"].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setLocalFilters({ ...localFilters, type })}
                  className={`py-2 px-3 rounded-xl font-semibold border text-center transition-all cursor-pointer ${
                    (localFilters.type || "All") === type
                      ? "bg-[#159B72] text-white border-[#159B72]"
                      : "bg-[#F7FBF9] dark:bg-[#082A24] text-[#36594C] dark:text-[#B5CCC5] border-[#D8E8E2] dark:border-[#16463D] hover:border-[#159B72]/50"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Category */}
          <div>
            <label className="block font-bold text-[#0B3024] dark:text-[#F1FAF6] mb-2">
              Category
            </label>
            <select
              value={localFilters.category || "All"}
              onChange={(e) =>
                setLocalFilters({ ...localFilters, category: e.target.value })
              }
              className="w-full p-2.5 rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#D8E8E2] dark:border-[#16463D] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-hidden focus:border-[#159B72] dark:focus:border-[#20D39B]"
            >
              {LOST_FOUND_CATEGORIES.map((c) => (
                <option key={c.id} value={c.label}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          {/* 3. Location */}
          <div>
            <label className="block font-bold text-[#0B3024] dark:text-[#F1FAF6] mb-2">
              Campus Location
            </label>
            <select
              value={localFilters.location || "All"}
              onChange={(e) =>
                setLocalFilters({ ...localFilters, location: e.target.value })
              }
              className="w-full p-2.5 rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#D8E8E2] dark:border-[#16463D] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-hidden focus:border-[#159B72] dark:focus:border-[#20D39B]"
            >
              {LOCATIONS_LIST.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {/* 4. Status */}
          <div>
            <label className="block font-bold text-[#0B3024] dark:text-[#F1FAF6] mb-2">
              Resolution Status
            </label>
            <div className="grid grid-cols-4 gap-2">
              {["All", "Lost", "Found", "Resolved"].map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setLocalFilters({ ...localFilters, status })}
                  className={`py-1.5 px-2 rounded-xl font-semibold border text-center transition-all cursor-pointer ${
                    (localFilters.status || "All") === status
                      ? "bg-[#159B72] text-white border-[#159B72]"
                      : "bg-[#F7FBF9] dark:bg-[#082A24] text-[#36594C] dark:text-[#B5CCC5] border-[#D8E8E2] dark:border-[#16463D] hover:border-[#159B72]/50"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* 5. Reported By */}
          <div>
            <label className="block font-bold text-[#0B3024] dark:text-[#F1FAF6] mb-2">
              Reported By
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: "All", label: "Everyone" },
                { id: "Me", label: "My Reports (Hamid Rza)" },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() =>
                    setLocalFilters({ ...localFilters, reportedBy: opt.id })
                  }
                  className={`py-2 px-3 rounded-xl font-semibold border text-center transition-all cursor-pointer ${
                    (localFilters.reportedBy || "All") === opt.id
                      ? "bg-[#159B72] text-white border-[#159B72]"
                      : "bg-[#F7FBF9] dark:bg-[#082A24] text-[#36594C] dark:text-[#B5CCC5] border-[#D8E8E2] dark:border-[#16463D] hover:border-[#159B72]/50"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between gap-3 pt-3.5 border-t border-[#D8E8E2] dark:border-[#16463D]">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-[#55786B] dark:text-[#9FB7AD] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] hover:bg-gray-100 dark:hover:bg-[#082A24] transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear Filters</span>
          </button>

          <button
            type="button"
            onClick={handleApply}
            className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold bg-[#159B72] hover:bg-[#0E825E] text-white transition-all cursor-pointer shadow-xs"
          >
            <Check className="w-4 h-4" />
            <span>Apply Filters</span>
          </button>
        </div>
      </div>
    </div>
  );
}
