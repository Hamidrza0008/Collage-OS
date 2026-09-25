"use client";

import { FileText, Presentation, Archive, Download, Users } from "lucide-react";

const typeConfig = {
  PDF: { icon: FileText, cls: "bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400", label: "PDF" },
  PPT: { icon: Presentation, cls: "bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400", label: "PPT" },
  ZIP: { icon: Archive, cls: "bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400", label: "ZIP" },
};

export default function CourseResources({ resources, onDownload }) {
  return (
    <div className="w-full bg-white dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl shadow-xs p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-base font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
            Lecture Notes & Materials
          </h2>
          <p className="text-xs text-[#5C786E] dark:text-[#8AA89F] mt-0.5">
            {resources.length} resources uploaded by faculty
          </p>
        </div>
      </div>

      <div className="space-y-2.5">
        {resources.map((res) => {
          const cfg = typeConfig[res.type] || typeConfig.PDF;
          const Icon = cfg.icon;
          return (
            <div
              key={res.id}
              className="flex items-center gap-3 p-3.5 rounded-xl border border-[#D8E8E2] dark:border-[#10372F] bg-gray-50/50 dark:bg-[#041D18]/60 hover:bg-gray-100/60 dark:hover:bg-[#041D18] group transition-colors"
            >
              <div className={"w-9 h-9 rounded-xl flex items-center justify-center shrink-0 " + cfg.cls}>
                <Icon className="w-4 h-4" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] line-clamp-1">
                  {res.title}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10.5px] text-[#5C786E] dark:text-[#8AA89F]">{res.unit}</span>
                  <span className="text-[10.5px] text-[#8AA89F] dark:text-[#5C786E]">·</span>
                  <span className="text-[10.5px] text-[#5C786E] dark:text-[#8AA89F]">{res.size}</span>
                  <span className="text-[10.5px] text-[#8AA89F] dark:text-[#5C786E]">·</span>
                  <span className="flex items-center gap-0.5 text-[10.5px] text-[#5C786E] dark:text-[#8AA89F]">
                    <Users className="w-3 h-3" /> {res.downloads}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onDownload(res.title)}
                className="w-8 h-8 rounded-lg flex items-center justify-center bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] text-[#5C786E] dark:text-[#8AA89F] hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:border-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all cursor-pointer shrink-0"
              >
                <Download className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
