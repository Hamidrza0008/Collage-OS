"use client";

import React from "react";
import {
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  GripVertical,
  CheckCircle2,
} from "lucide-react";
import { ALL_SECTION_DEFS } from "./resumeBuilderData";

export default function SectionManager({
  resume,
  onChangeResume,
  activeSectionId,
  onSelectSection,
}) {
  const { sectionOrder = [], visibleSections = {} } = resume;

  const handleMove = (index, direction) => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= sectionOrder.length) return;

    const newOrder = [...sectionOrder];
    const temp = newOrder[index];
    newOrder[index] = newOrder[targetIndex];
    newOrder[targetIndex] = temp;

    onChangeResume({ ...resume, sectionOrder: newOrder });
  };

  const handleToggleVisibility = (sectionId) => {
    const isVisible = visibleSections[sectionId] !== false;
    onChangeResume({
      ...resume,
      visibleSections: {
        ...visibleSections,
        [sectionId]: !isVisible,
      },
    });
  };

  return (
    <div className="bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[#E8F1ED] dark:border-[#10372F]">
        <h3 className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
          Resume Section Layout &amp; Order
        </h3>
        <span className="text-[11px] text-[#658278] dark:text-[#8AA89F]">
          Reorder or hide sections
        </span>
      </div>

      <div className="space-y-2">
        {sectionOrder.map((sectionId, idx) => {
          const def = ALL_SECTION_DEFS.find((d) => d.id === sectionId) || {
            id: sectionId,
            name: sectionId.charAt(0).toUpperCase() + sectionId.slice(1),
          };
          const isVisible = visibleSections[sectionId] !== false;
          const isActive = activeSectionId === sectionId;

          return (
            <div
              key={sectionId}
              className={`flex items-center justify-between p-2.5 rounded-2xl border text-xs transition-all ${
                isActive
                  ? "bg-emerald-500/10 border-emerald-500/40 font-bold text-emerald-950 dark:text-emerald-50"
                  : "bg-[#F7FBF9] dark:bg-[#031A16] border-[#D8E8E2] dark:border-[#16463D] text-[#0B3024] dark:text-[#F1FAF6]"
              } ${!isVisible ? "opacity-50" : ""}`}
            >
              <button
                type="button"
                onClick={() => onSelectSection(sectionId)}
                className="flex items-center gap-2.5 flex-1 text-left cursor-pointer"
              >
                <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-[10px] font-bold flex items-center justify-center text-emerald-800 dark:text-emerald-300">
                  {idx + 1}
                </span>
                <span className="truncate">{def.name}</span>
                {def.required && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-gray-100 dark:bg-gray-800 text-[#658278] font-normal">
                    Core
                  </span>
                )}
              </button>

              <div className="flex items-center gap-1">
                {/* Move Up */}
                <button
                  type="button"
                  disabled={idx === 0}
                  onClick={() => handleMove(idx, "up")}
                  title="Move section up"
                  className="p-1.5 rounded-lg text-[#658278] hover:text-[#0B3024] dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30 cursor-pointer"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>

                {/* Move Down */}
                <button
                  type="button"
                  disabled={idx === sectionOrder.length - 1}
                  onClick={() => handleMove(idx, "down")}
                  title="Move section down"
                  className="p-1.5 rounded-lg text-[#658278] hover:text-[#0B3024] dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30 cursor-pointer"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>

                {/* Toggle Show/Hide */}
                {!def.required && (
                  <button
                    type="button"
                    onClick={() => handleToggleVisibility(sectionId)}
                    title={isVisible ? "Hide on resume" : "Show on resume"}
                    className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                      isVisible
                        ? "text-emerald-600 hover:bg-emerald-500/10"
                        : "text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    {isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
