"use client";

import { Sparkles, Zap, Users, Briefcase, Trophy, Code2, Award } from "lucide-react";

export default function EventHighlights({ highlights }) {
  if (!highlights || highlights.length === 0) return null;

  const getHighlightIcon = (iconName) => {
    switch (iconName) {
      case "Zap":
        return <Zap className="w-4 h-4 text-amber-500" />;
      case "Users":
        return <Users className="w-4 h-4 text-emerald-500" />;
      case "Briefcase":
        return <Briefcase className="w-4 h-4 text-blue-500" />;
      case "Trophy":
        return <Trophy className="w-4 h-4 text-yellow-500" />;
      case "Code2":
        return <Code2 className="w-4 h-4 text-teal-500" />;
      case "Award":
        return <Award className="w-4 h-4 text-purple-500" />;
      default:
        return <Sparkles className="w-4 h-4 text-emerald-500" />;
    }
  };

  return (
    <div className="w-full bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl shadow-xs p-5 sm:p-6 transition-all space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2 pb-3 border-b border-[#E8F1ED] dark:border-[#10372F]">
        <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-[#20D39B] flex items-center justify-center shrink-0">
          <Sparkles className="w-4 h-4" />
        </div>
        <div>
          <h2 className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
            Why Attend?
          </h2>
          <p className="text-[11px] text-[#5C786E] dark:text-[#8AA89F]">
            Key benefits, outcomes, and value for student participants
          </p>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {highlights.map((item, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-xl bg-[#F8FAF9] dark:bg-[#041D18] border border-[#E8F1ED] dark:border-[#10372F] hover:border-emerald-300 dark:hover:border-emerald-800 transition-all space-y-2 group"
          >
            <div className="w-8 h-8 rounded-lg bg-white dark:bg-[#06241F] border border-gray-100 dark:border-[#10372F] flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
              {getHighlightIcon(item.icon)}
            </div>
            <div>
              <h3 className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] leading-snug">
                {item.title}
              </h3>
              <p className="text-[11px] text-[#55786B] dark:text-[#8FAFA4] leading-relaxed mt-0.5">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
