"use client";

import { CheckCircle2, Clock, Circle, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

function UnitStatusIcon({ status }) {
  if (status === "completed") return <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0" />;
  if (status === "in-progress") return <Clock className="w-4 h-4 text-amber-500 dark:text-amber-400 shrink-0" />;
  return <Circle className="w-4 h-4 text-gray-300 dark:text-gray-600 shrink-0" />;
}

const statusLabel = {
  completed: { text: "Completed", cls: "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300" },
  "in-progress": { text: "In Progress", cls: "bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300" },
  upcoming: { text: "Upcoming", cls: "bg-gray-100 dark:bg-[#041D18] text-gray-500 dark:text-[#8AA89F]" },
};

function UnitRow({ unit }) {
  const [isOpen, setIsOpen] = useState(unit.status === "in-progress");
  const s = statusLabel[unit.status] || statusLabel.upcoming;

  const progressBarColor = unit.status === "completed"
    ? "bg-emerald-500 dark:bg-emerald-400"
    : "bg-amber-500 dark:bg-amber-400";

  return (
    <div className="border border-[#D8E8E2] dark:border-[#10372F] rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className="w-full flex items-center gap-3 p-4 bg-white dark:bg-[#021512] hover:bg-gray-50/60 dark:hover:bg-[#041D18] transition-colors text-left cursor-pointer"
      >
        <UnitStatusIcon status={unit.status} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-bold text-[#5C786E] dark:text-[#8AA89F]">
              Unit {unit.number}
            </span>
            <span className={"px-2 py-0.5 rounded-full text-[10px] font-bold " + s.cls}>
              {s.text}
            </span>
          </div>
          <h3 className="text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6] leading-snug mt-0.5">
            {unit.title}
          </h3>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          {unit.status !== "upcoming" && (
            <span className="text-xs font-bold text-[#0B3024] dark:text-[#E2F1EC]">
              {unit.progress}%
            </span>
          )}
          {isOpen ? (
            <ChevronUp className="w-4 h-4 text-[#5C786E] dark:text-[#8AA89F]" />
          ) : (
            <ChevronDown className="w-4 h-4 text-[#5C786E] dark:text-[#8AA89F]" />
          )}
        </div>
      </button>

      {/* Progress bar */}
      {unit.status !== "upcoming" && (
        <div className="px-4 pb-0">
          <div className="w-full h-1 bg-gray-100 dark:bg-[#0A2E27] rounded-full overflow-hidden">
            <div
              className={"h-full rounded-full transition-all duration-700 " + progressBarColor}
              style={{ width: unit.progress + "%" }}
            />
          </div>
        </div>
      )}

      {/* Expandable topics */}
      {isOpen && (
        <div className="px-4 py-3 bg-gray-50/60 dark:bg-[#041D18]/80 border-t border-[#D8E8E2] dark:border-[#10372F]">
          <p className="text-[11px] font-bold text-[#5C786E] dark:text-[#8AA89F] mb-2 uppercase tracking-wide">
            Topics Covered
          </p>
          <ul className="space-y-1.5">
            {unit.topics.map((topic, i) => (
              <li key={i} className="flex items-center gap-2 text-xs text-[#3B5E52] dark:text-[#C0D8D0]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 dark:bg-emerald-500 shrink-0" />
                {topic}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function SyllabusBrowser({ units }) {
  const completed = units.filter((u) => u.status === "completed").length;
  const donePct = Math.round((completed / units.length) * 100);

  return (
    <div className="w-full bg-white dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl shadow-xs p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-base font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
            Unit-wise Syllabus
          </h2>
          <p className="text-xs text-[#5C786E] dark:text-[#8AA89F] mt-0.5">
            {completed} of {units.length} units completed
          </p>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60">
          <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300">
            {donePct}% Done
          </span>
        </div>
      </div>

      <div className="space-y-2">
        {units.map((unit) => (
          <UnitRow key={unit.id} unit={unit} />
        ))}
      </div>
    </div>
  );
}
