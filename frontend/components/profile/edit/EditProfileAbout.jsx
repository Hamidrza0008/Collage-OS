"use client";

import { useState } from "react";
import { Sparkles, Plus, X, Compass, Target, AlertCircle } from "lucide-react";
import { SUGGESTED_INTERESTS } from "./editProfileData";

export default function EditProfileAbout({
  bio,
  careerFocus,
  currentFocus,
  interests = [],
  errors = {},
  onChangeField,
}) {
  const [newInterestInput, setNewInterestInput] = useState("");
  const [interestError, setInterestError] = useState("");

  const handleAddInterest = (interestToAdd) => {
    const trimmed = (interestToAdd || newInterestInput).trim();
    setInterestError("");

    if (!trimmed) return;

    if (interests.some((item) => item.toLowerCase() === trimmed.toLowerCase())) {
      setInterestError(`"${trimmed}" is already added.`);
      return;
    }

    if (interests.length >= 15) {
      setInterestError("Maximum 15 interest tags allowed.");
      return;
    }

    onChangeField("interests", [...interests, trimmed]);
    setNewInterestInput("");
  };

  const handleRemoveInterest = (indexToRemove) => {
    setInterestError("");
    onChangeField(
      "interests",
      interests.filter((_, idx) => idx !== indexToRemove)
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddInterest();
    }
  };

  return (
    <div id="section-about" className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] shadow-sm scroll-mt-28 space-y-6">
      <div className="pb-4 border-b border-[#D8E8E2]/60 dark:border-[#10372F]/60">
        <h2 className="text-base sm:text-lg font-bold text-[#06241F] dark:text-white">
          About & Personal Focus
        </h2>
        <p className="text-xs text-[#06241F]/70 dark:text-[#D8E8E2]/70 mt-0.5">
          Share your journey, learning goals, career aspirations, and domain interests.
        </p>
      </div>

      {/* Bio */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label
            htmlFor="input-bio"
            className="block text-xs font-semibold text-[#06241F] dark:text-[#D8E8E2]"
          >
            Bio & Introduction <span className="text-rose-500">*</span>
          </label>
          <span
            className={`text-[11px] font-mono ${
              (bio?.length || 0) > 600
                ? "text-rose-500 font-semibold"
                : "text-[#06241F]/60 dark:text-[#D8E8E2]/60"
            }`}
          >
            {bio?.length || 0} / 600
          </span>
        </div>
        <textarea
          id="input-bio"
          rows={4}
          value={bio || ""}
          onChange={(e) => onChangeField("bio", e.target.value)}
          placeholder="What are you currently building, exploring, or learning? Outline your technical passions and goals."
          className={`w-full p-3.5 rounded-xl text-xs sm:text-sm bg-[#F8FAFC] dark:bg-[#021512] border text-[#06241F] dark:text-white focus:outline-hidden transition-all resize-y min-h-[90px] leading-relaxed ${
            errors.bio
              ? "border-rose-500 focus:border-rose-500"
              : "border-[#D8E8E2] dark:border-[#10372F] focus:border-[#159B72] dark:focus:border-[#20D39B]"
          }`}
        />
        {errors.bio && (
          <p className="text-[11px] text-rose-500 flex items-center gap-1 font-medium pt-0.5">
            <AlertCircle className="w-3 h-3 shrink-0" />
            {errors.bio}
          </p>
        )}
      </div>

      {/* 2-column: Career Direction & Current Focus */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        <div className="space-y-1.5">
          <label
            htmlFor="input-careerFocus"
            className="block text-xs font-semibold text-[#06241F] dark:text-[#D8E8E2]"
          >
            Career Direction / Target Role
          </label>
          <div className="relative">
            <Compass className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#159B72] dark:text-[#20D39B] pointer-events-none" />
            <input
              id="input-careerFocus"
              type="text"
              value={careerFocus || ""}
              onChange={(e) => onChangeField("careerFocus", e.target.value)}
              placeholder="e.g. Full-Stack Software Engineering • Systems Architecture"
              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-[#F8FAFC] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] text-[#06241F] dark:text-white focus:outline-hidden focus:border-[#159B72] dark:focus:border-[#20D39B] transition-all"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="input-currentFocus"
            className="block text-xs font-semibold text-[#06241F] dark:text-[#D8E8E2]"
          >
            Current Learning Focus
          </label>
          <div className="relative">
            <Target className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#159B72] dark:text-[#20D39B] pointer-events-none" />
            <input
              id="input-currentFocus"
              type="text"
              value={currentFocus || ""}
              onChange={(e) => onChangeField("currentFocus", e.target.value)}
              placeholder="e.g. Distributed Consensus & Vector Databases"
              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-[#F8FAFC] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] text-[#06241F] dark:text-white focus:outline-hidden focus:border-[#159B72] dark:focus:border-[#20D39B] transition-all"
            />
          </div>
        </div>
      </div>

      {/* Interests Tag Editor */}
      <div className="space-y-3 pt-2">
        <div>
          <label className="block text-xs font-semibold text-[#06241F] dark:text-[#D8E8E2]">
            Interests & Domain Topics
          </label>
          <p className="text-xs text-[#06241F]/60 dark:text-[#D8E8E2]/60 mt-0.5">
            Used to match you with campus project teammates and study groups.
          </p>
        </div>

        {/* Input row */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Sparkles className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#159B72] dark:text-[#20D39B] pointer-events-none" />
            <input
              type="text"
              value={newInterestInput}
              onChange={(e) => {
                setNewInterestInput(e.target.value);
                setInterestError("");
              }}
              onKeyDown={handleKeyDown}
              placeholder="Add an interest (e.g. AI, UI/UX, Cloud)..."
              className="w-full pl-10 pr-3.5 py-2 rounded-xl text-xs sm:text-sm bg-[#F8FAFC] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] text-[#06241F] dark:text-white focus:outline-hidden focus:border-[#159B72] dark:focus:border-[#20D39B] transition-all"
            />
          </div>
          <button
            type="button"
            onClick={() => handleAddInterest()}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#159B72] hover:bg-[#128360] dark:bg-[#20D39B] dark:hover:bg-[#1bb886] text-white dark:text-[#021512] transition-colors cursor-pointer shrink-0 shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>

        {interestError && (
          <p className="text-[11px] text-rose-500 flex items-center gap-1 font-medium">
            <AlertCircle className="w-3 h-3 shrink-0" />
            {interestError}
          </p>
        )}

        {/* Active Interest Chips */}
        <div className="flex flex-wrap gap-2 pt-1 min-h-[32px]">
          {interests.length > 0 ? (
            interests.map((interest, idx) => (
              <span
                key={`${interest}-${idx}`}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#159B72]/10 dark:bg-[#20D39B]/10 text-[#06241F] dark:text-[#D8E8E2] border border-[#159B72]/20 dark:border-[#20D39B]/20 group"
              >
                <span>{interest}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveInterest(idx)}
                  className="p-0.5 rounded-full hover:bg-rose-500/20 text-[#06241F]/60 dark:text-[#D8E8E2]/60 hover:text-rose-600 dark:hover:text-rose-400 transition-colors cursor-pointer"
                  title={`Remove ${interest}`}
                  aria-label={`Remove ${interest}`}
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))
          ) : (
            <p className="text-xs text-[#06241F]/50 dark:text-[#D8E8E2]/50 italic">
              No interests added yet. Click suggestions below or type your own.
            </p>
          )}
        </div>

        {/* Suggested Quick Add Chips */}
        <div className="pt-2">
          <p className="text-[11px] font-semibold text-[#06241F]/70 dark:text-[#D8E8E2]/70 mb-2">
            Suggested Topics:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {SUGGESTED_INTERESTS.filter(
              (item) => !interests.some((i) => i.toLowerCase() === item.toLowerCase())
            )
              .slice(0, 8)
              .map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => handleAddInterest(item)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium bg-[#F8FAFC] dark:bg-[#021512] hover:bg-[#159B72]/15 dark:hover:bg-[#20D39B]/15 text-[#06241F]/80 dark:text-[#D8E8E2]/80 hover:text-[#159B72] dark:hover:text-[#20D39B] border border-[#D8E8E2] dark:border-[#10372F] transition-all cursor-pointer"
                >
                  <Plus className="w-2.5 h-2.5" />
                  <span>{item}</span>
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
