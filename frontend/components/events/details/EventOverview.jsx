"use client";

import { Info, Calendar, Clock, MapPin, Users, GraduationCap, Building2 } from "lucide-react";

export default function EventOverview({ overview }) {
  if (!overview) return null;

  const getFactIcon = (label) => {
    switch (label.toLowerCase()) {
      case "date":
        return <Calendar className="w-4 h-4 text-emerald-600 dark:text-[#20D39B]" />;
      case "time":
        return <Clock className="w-4 h-4 text-emerald-600 dark:text-[#20D39B]" />;
      case "venue":
        return <MapPin className="w-4 h-4 text-emerald-600 dark:text-[#20D39B]" />;
      case "participation":
        return <Users className="w-4 h-4 text-emerald-600 dark:text-[#20D39B]" />;
      case "eligibility":
        return <GraduationCap className="w-4 h-4 text-emerald-600 dark:text-[#20D39B]" />;
      default:
        return <Building2 className="w-4 h-4 text-emerald-600 dark:text-[#20D39B]" />;
    }
  };

  return (
    <div className="w-full bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl shadow-xs p-5 sm:p-6 transition-all space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2 pb-3 border-b border-[#E8F1ED] dark:border-[#10372F]">
        <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-[#20D39B] flex items-center justify-center shrink-0">
          <Info className="w-4 h-4" />
        </div>
        <div>
          <h2 className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
            About This Event
          </h2>
          <p className="text-[11px] text-[#5C786E] dark:text-[#8AA89F]">
            Overview, rules, and core participation details
          </p>
        </div>
      </div>

      {/* Description Text */}
      <p className="text-xs sm:text-sm text-[#35574C] dark:text-[#C5DCD4] leading-relaxed">
        {overview.about}
      </p>

      {/* Compact Facts Grid */}
      {overview.facts && overview.facts.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
          {overview.facts.map((fact, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-[#F8FAF9] dark:bg-[#041D18] border border-[#E8F1ED] dark:border-[#10372F] space-y-1"
            >
              <div className="flex items-center gap-1.5">
                {getFactIcon(fact.label)}
                <span className="text-[11px] font-bold text-[#658278] dark:text-[#789991] uppercase tracking-wider">
                  {fact.label}
                </span>
              </div>
              <p className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] truncate">
                {fact.value}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
