"use client";

import { Sun, Moon, Check, Columns, Sparkles, Palette } from "lucide-react";
import { useTheme } from "../providers/ThemeProvider";
import { ACCENT_COLORS } from "./settingsData";

export default function AppearanceCard({
  accentColor,
  onSelectAccentColor,
  sidebarCollapsed,
  onToggleSidebarCollapsed,
  animationsEnabled,
  onToggleAnimations,
}) {
  const { theme, setTheme } = useTheme();

  return (
    <div className="rounded-2xl border border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#06241F] p-4 sm:p-5 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
          <Palette className="w-4 h-4" />
        </div>
        <div>
          <h2 className="text-sm sm:text-[15px] font-bold text-[#0B3024] dark:text-[#F1FAF6] leading-tight">
            Appearance
          </h2>
          <p className="text-[11px] sm:text-xs text-[#658278] dark:text-[#789991] mt-0.5">
            Customize how College OS looks for you.
          </p>
        </div>
      </div>

      {/* Theme Selection Section */}
      <div className="space-y-2">
        <div className="text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6]">
          Theme
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* Light Theme Card */}
          <button
            type="button"
            onClick={() => setTheme("light")}
            className={`relative p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
              theme === "light"
                ? "border-[#159B72] bg-[#F1F8F5] ring-2 ring-[#159B72]/20 shadow-2xs"
                : "border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#0A2A24] hover:border-emerald-500/40"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-600 flex items-center justify-center shrink-0">
                <Sun className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                  Light
                </div>
                <div className="text-[10.5px] text-[#658278] dark:text-[#789991]">
                  Clean &amp; fresh
                </div>
              </div>
            </div>

            {theme === "light" && (
              <div className="w-5 h-5 rounded-full bg-[#159B72] text-white flex items-center justify-center shrink-0 shadow-2xs">
                <Check className="w-3 h-3 stroke-[3]" />
              </div>
            )}
          </button>

          {/* Dark Theme Card */}
          <button
            type="button"
            onClick={() => setTheme("dark")}
            className={`relative p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
              theme === "dark"
                ? "border-[#18B887] bg-[#0C3029] ring-2 ring-[#18B887]/20 shadow-2xs"
                : "border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#021512] hover:border-emerald-500/40"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-950/60 text-indigo-400 flex items-center justify-center shrink-0">
                <Moon className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                  Dark
                </div>
                <div className="text-[10.5px] text-[#658278] dark:text-[#789991]">
                  Easy on eyes
                </div>
              </div>
            </div>

            {theme === "dark" && (
              <div className="w-5 h-5 rounded-full bg-[#18B887] text-white flex items-center justify-center shrink-0 shadow-2xs">
                <Check className="w-3 h-3 stroke-[3]" />
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Accent Color Section */}
      <div className="space-y-2 pt-1">
        <div className="text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6]">
          Accent Color
        </div>

        <div className="flex items-center gap-2.5">
          {ACCENT_COLORS.map((color) => {
            const isSelected = accentColor === color.id;
            return (
              <button
                key={color.id}
                type="button"
                onClick={() => onSelectAccentColor(color.id)}
                title={color.label}
                className={`w-6 h-6 rounded-full transition-transform cursor-pointer relative flex items-center justify-center ${color.bgClass} ${
                  isSelected ? "scale-115 ring-2 ring-offset-2 ring-emerald-500 dark:ring-offset-[#06241F]" : "hover:scale-110"
                }`}
              >
                {isSelected && <Check className="w-3 h-3 text-white stroke-[3]" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Switch Toggles Section */}
      <div className="space-y-2.5 pt-2 border-t border-[#D8E8E2]/60 dark:border-[#16463D]/60">
        {/* Sidebar Collapse Toggle */}
        <div className="flex items-center justify-between py-1">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
              <Columns className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="text-xs font-medium text-[#0B3024] dark:text-[#F1FAF6]">
                Sidebar Collapse
              </div>
              <div className="text-[10.5px] text-[#658278] dark:text-[#789991]">
                Show sidebar in collapsed mode by default
              </div>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer select-none">
            <input
              type="checkbox"
              checked={sidebarCollapsed}
              onChange={(e) => onToggleSidebarCollapsed(e.target.checked)}
              className="sr-only"
            />
            <div
              className={`w-8 h-4.5 flex items-center rounded-full p-0.5 transition-colors ${
                sidebarCollapsed ? "bg-[#159B72]" : "bg-gray-300 dark:bg-gray-700"
              }`}
            >
              <div
                className={`bg-white w-3.5 h-3.5 rounded-full shadow-xs transform transition-transform ${
                  sidebarCollapsed ? "translate-x-3.5" : "translate-x-0"
                }`}
              />
            </div>
          </label>
        </div>

        {/* Animations Toggle */}
        <div className="flex items-center justify-between py-1">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="text-xs font-medium text-[#0B3024] dark:text-[#F1FAF6]">
                Animations
              </div>
              <div className="text-[10.5px] text-[#658278] dark:text-[#789991]">
                Enable smooth animations and transitions
              </div>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer select-none">
            <input
              type="checkbox"
              checked={animationsEnabled}
              onChange={(e) => onToggleAnimations(e.target.checked)}
              className="sr-only"
            />
            <div
              className={`w-8 h-4.5 flex items-center rounded-full p-0.5 transition-colors ${
                animationsEnabled ? "bg-[#159B72]" : "bg-gray-300 dark:bg-gray-700"
              }`}
            >
              <div
                className={`bg-white w-3.5 h-3.5 rounded-full shadow-xs transform transition-transform ${
                  animationsEnabled ? "translate-x-3.5" : "translate-x-0"
                }`}
              />
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}
