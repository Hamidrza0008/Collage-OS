"use client";

import { Download, FileText, Paperclip, FileArchive } from "lucide-react";

export default function AssignmentResources({ resources, onDownload }) {
  if (!resources || resources.length === 0) return null;

  const getFileIcon = (fileName = "") => {
    if (fileName.endsWith(".zip") || fileName.endsWith(".pkt")) {
      return <FileArchive className="w-4 h-4 text-amber-600 dark:text-amber-400" />;
    }
    return <FileText className="w-4 h-4 text-emerald-600 dark:text-[#20D39B]" />;
  };

  return (
    <div className="w-full bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl shadow-xs p-5 sm:p-6 transition-all space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2 pb-3 border-b border-[#E8F1ED] dark:border-[#10372F]">
        <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-[#20D39B] flex items-center justify-center shrink-0">
          <Paperclip className="w-4 h-4" />
        </div>
        <div>
          <h2 className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
            Attached Course Resources
          </h2>
          <p className="text-[11px] text-[#5C786E] dark:text-[#8AA89F]">
            Reference materials, specifications, and design assets provided by faculty
          </p>
        </div>
      </div>

      {/* Resources List */}
      <div className="space-y-2">
        {resources.map((file) => (
          <div
            key={file.id}
            className="flex items-center justify-between p-3 rounded-xl bg-[#F8FAF9] dark:bg-[#041D18] border border-[#E8F1ED] dark:border-[#10372F] hover:border-emerald-300 dark:hover:border-emerald-800 transition-all gap-3 group"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-lg bg-emerald-50/80 dark:bg-[#06241F] border border-emerald-100 dark:border-[#10372F] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                {getFileIcon(file.name)}
              </div>
              <div className="min-w-0">
                <span className="text-xs sm:text-[13px] font-bold text-[#0B3024] dark:text-[#F1FAF6] block truncate">
                  {file.name}
                </span>
                <span className="text-[11px] text-[#658278] dark:text-[#8AA89F]">
                  {file.type} • {file.size}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onDownload(file.name)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-[#082A24] text-emerald-700 dark:text-[#20D39B] border border-[#D8E8E2] dark:border-[#10372F] hover:bg-emerald-50 dark:hover:bg-[#0B352B] transition-colors cursor-pointer shrink-0 shadow-2xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
