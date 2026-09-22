/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { X, Check, RotateCcw } from "lucide-react";
import {
  WORK_MODES,
  LOCATIONS,
  DURATIONS,
  ELIGIBILITIES,
  TOP_SKILLS,
} from "./internshipsData";

export default function OpportunityFilterDrawer({
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

  const toggleSkill = (skill) => {
    setLocalFilters((prev) => {
      const skills = prev.skills || [];
      if (skills.includes(skill)) {
        return { ...prev, skills: skills.filter((s) => s !== skill) };
      } else {
        return { ...prev, skills: [...skills, skill] };
      }
    });
  };

  const handleApply = () => {
    onApplyFilters(localFilters);
    onClose();
  };

  const handleReset = () => {
    onClearFilters();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg rounded-3xl bg-[#FFFFFF] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#E8F1ED] dark:border-[#10372F] flex items-center justify-between bg-[#F7FBF9] dark:bg-[#082A24]">
          <div>
            <h3 className="text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
              Filter Opportunities
            </h3>
            <p className="text-[11px] text-[#658278] dark:text-[#789991]">
              Refine internships and hackathons matching your preferences
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-[#658278] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] hover:bg-gray-100 dark:hover:bg-[#082A24]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Filter Options */}
        <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
          {/* Work Mode */}
          <div>
            <label className="block font-bold text-[#0B3024] dark:text-[#F1FAF6] mb-1.5">
              Work Mode
            </label>
            <div className="flex flex-wrap gap-1.5">
              {WORK_MODES.map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setLocalFilters({ ...localFilters, workMode: mode })}
                  className={`px-3 py-1 rounded-xl font-medium transition-all ${
                    localFilters.workMode === mode
                      ? "bg-[#159B72] text-white"
                      : "bg-[#F7FBF9] dark:bg-[#082A24] text-[#36594C] dark:text-[#B5CCC5] border border-[#D8E8E2] dark:border-[#16463D]"
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block font-bold text-[#0B3024] dark:text-[#F1FAF6] mb-1.5">
              Location
            </label>
            <div className="flex flex-wrap gap-1.5">
              {LOCATIONS.map((loc) => (
                <button
                  key={loc}
                  type="button"
                  onClick={() => setLocalFilters({ ...localFilters, location: loc })}
                  className={`px-3 py-1 rounded-xl font-medium transition-all ${
                    localFilters.location === loc
                      ? "bg-[#159B72] text-white"
                      : "bg-[#F7FBF9] dark:bg-[#082A24] text-[#36594C] dark:text-[#B5CCC5] border border-[#D8E8E2] dark:border-[#16463D]"
                  }`}
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>

          {/* Duration */}
          <div>
            <label className="block font-bold text-[#0B3024] dark:text-[#F1FAF6] mb-1.5">
              Duration
            </label>
            <div className="flex flex-wrap gap-1.5">
              {DURATIONS.map((dur) => (
                <button
                  key={dur}
                  type="button"
                  onClick={() => setLocalFilters({ ...localFilters, duration: dur })}
                  className={`px-3 py-1 rounded-xl font-medium transition-all ${
                    localFilters.duration === dur
                      ? "bg-[#159B72] text-white"
                      : "bg-[#F7FBF9] dark:bg-[#082A24] text-[#36594C] dark:text-[#B5CCC5] border border-[#D8E8E2] dark:border-[#16463D]"
                  }`}
                >
                  {dur}
                </button>
              ))}
            </div>
          </div>

          {/* Eligibility */}
          <div>
            <label className="block font-bold text-[#0B3024] dark:text-[#F1FAF6] mb-1.5">
              Eligibility / Open To
            </label>
            <div className="flex flex-wrap gap-1.5">
              {ELIGIBILITIES.map((elig) => (
                <button
                  key={elig}
                  type="button"
                  onClick={() => setLocalFilters({ ...localFilters, eligibility: elig })}
                  className={`px-3 py-1 rounded-xl font-medium transition-all ${
                    localFilters.eligibility === elig
                      ? "bg-[#159B72] text-white"
                      : "bg-[#F7FBF9] dark:bg-[#082A24] text-[#36594C] dark:text-[#B5CCC5] border border-[#D8E8E2] dark:border-[#16463D]"
                  }`}
                >
                  {elig}
                </button>
              ))}
            </div>
          </div>

          {/* Skills Multi-select */}
          <div>
            <label className="block font-bold text-[#0B3024] dark:text-[#F1FAF6] mb-1.5">
              Required Skills
            </label>
            <div className="flex flex-wrap gap-1.5">
              {TOP_SKILLS.map((sk) => {
                const isSelected = (localFilters.skills || []).includes(sk);
                return (
                  <button
                    key={sk}
                    type="button"
                    onClick={() => toggleSkill(sk)}
                    className={`px-2.5 py-1 rounded-xl font-medium transition-all flex items-center gap-1 ${
                      isSelected
                        ? "bg-[#159B72] text-white"
                        : "bg-[#F7FBF9] dark:bg-[#082A24] text-[#36594C] dark:text-[#B5CCC5] border border-[#D8E8E2] dark:border-[#16463D]"
                    }`}
                  >
                    <span>{sk}</span>
                    {isSelected && <Check className="w-3 h-3" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-[#E8F1ED] dark:border-[#10372F] flex items-center justify-between bg-[#F7FBF9] dark:bg-[#082A24]">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-[#658278] hover:text-[#0B3024] dark:hover:text-[#F1FAF6]"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear Filters</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-[#55786B] dark:text-[#8FAFA4] hover:bg-gray-100 dark:hover:bg-[#082A24]"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleApply}
              className="px-4 py-1.5 rounded-xl text-xs font-bold bg-[#159B72] hover:bg-[#087A5B] text-white shadow-xs cursor-pointer"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
