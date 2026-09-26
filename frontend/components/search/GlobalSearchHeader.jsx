"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X, Sparkles, ArrowRight, CornerDownLeft } from "lucide-react";
import { getSearchSuggestions } from "./globalSearchData";

export default function GlobalSearchHeader({
  query = "",
  onQueryChange,
  onSearchSubmit,
  totalResults = 0,
}) {
  const [localQuery, setLocalQuery] = useState(query);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef(null);

  // Sync when parent query changes
  useEffect(() => {
    setLocalQuery(query);
  }, [query]);

  // Keyboard shortcut listener (Ctrl + K / Cmd + K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.select();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const suggestions = localQuery.trim().length >= 2 ? getSearchSuggestions(localQuery) : [];

  const handleInputChange = (e) => {
    const val = e.target.value;
    setLocalQuery(val);
    setSelectedIndex(-1);
    onQueryChange(val);
  };

  const handleClear = () => {
    setLocalQuery("");
    setSelectedIndex(-1);
    onQueryChange("");
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setIsFocused(false);
    } else if (e.key === "ArrowDown" && suggestions.length > 0) {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === "ArrowUp" && suggestions.length > 0) {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
        const selected = suggestions[selectedIndex];
        setLocalQuery(selected);
        onQueryChange(selected);
        onSearchSubmit(selected);
      } else {
        onSearchSubmit(localQuery);
      }
      setIsFocused(false);
    }
  };

  const handleSelectSuggestion = (text) => {
    setLocalQuery(text);
    onQueryChange(text);
    onSearchSubmit(text);
    setIsFocused(false);
  };

  return (
    <div className="w-full bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl shadow-xs p-4 sm:p-6 transition-colors relative z-20">
      <div className="max-w-3xl space-y-1 mb-4">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
          Search College OS
        </h1>
        <p className="text-xs sm:text-sm text-[#5C786E] dark:text-[#8AA89F]">
          Find students, projects, opportunities, events, notices, courses, and campus content.
        </p>
      </div>

      {/* Prominent Search Input Box */}
      <div className="relative w-full">
        <div
          className={`relative flex items-center h-12 sm:h-14 px-4 rounded-2xl bg-[#F7FBF9] dark:bg-[#06241F] border transition-all ${
            isFocused
              ? "border-emerald-500 dark:border-emerald-400 ring-2 ring-emerald-500/20 shadow-sm bg-white dark:bg-[#0A2E27]"
              : "border-[#D8E8E2] dark:border-[#16463D] hover:border-emerald-300 dark:hover:border-emerald-700"
          }`}
        >
          <Search className="w-5 h-5 text-emerald-700 dark:text-emerald-400 shrink-0" strokeWidth={2.2} />

          <input
            ref={inputRef}
            type="text"
            value={localQuery}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              // Delay slightly so suggestion clicks register
              setTimeout(() => setIsFocused(false), 200);
            }}
            placeholder="Search everything... (e.g. React, CSE-302, Hackathon, Google, DBMS)"
            className="flex-1 ml-3 text-sm sm:text-base bg-transparent text-[#0B3024] dark:text-[#F1FAF6] placeholder-[#658278] dark:placeholder-[#789991] focus:outline-none"
            aria-label="Search College OS"
            autoComplete="off"
            id="global-search-input"
          />

          {/* Action buttons on right */}
          <div className="flex items-center gap-2 shrink-0">
            {localQuery ? (
              <button
                type="button"
                onClick={handleClear}
                className="p-1.5 rounded-lg text-[#658278] dark:text-[#8AA89F] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
                aria-label="Clear search query"
              >
                <X className="w-4 h-4" />
              </button>
            ) : null}

            <kbd className="hidden md:inline-flex items-center gap-0.5 px-2 py-1 text-[10px] font-bold text-[#658278] dark:text-[#789991] bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] rounded-lg shadow-2xs select-none">
              ⌘ K
            </kbd>

            <button
              type="button"
              onClick={() => onSearchSubmit(localQuery)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-[#159B72] hover:bg-[#087A5B] transition-colors cursor-pointer shadow-2xs"
            >
              <span>Search</span>
              <CornerDownLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Live Autocomplete Suggestions Dropdown */}
        {isFocused && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1.5 rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-xl overflow-hidden z-30 animate-in fade-in zoom-in-95 duration-100">
            <div className="px-3 py-2 text-[10.5px] font-bold text-[#658278] dark:text-[#789991] uppercase tracking-wider border-b border-[#E8F1ED] dark:border-[#10372F] flex items-center justify-between">
              <span>Suggestions & Matching Terms</span>
              <span className="text-[10px]">Use ↑ ↓ to navigate</span>
            </div>

            <div className="p-1.5 space-y-0.5">
              {suggestions.map((suggestion, idx) => {
                const isSelected = idx === selectedIndex;
                return (
                  <button
                    key={suggestion}
                    type="button"
                    onMouseDown={() => handleSelectSuggestion(suggestion)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-[#DDF3EB] dark:bg-[#08352C] text-[#0B3024] dark:text-[#F1FAF6] font-semibold"
                        : "text-[#36594C] dark:text-[#B5CCC5] hover:bg-[#F7FBF9] dark:hover:bg-[#082A24]"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>{suggestion}</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-gray-400 opacity-60" />
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
