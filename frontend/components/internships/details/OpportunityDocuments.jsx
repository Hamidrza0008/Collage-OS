"use client";

import { FileText, Download, Eye, Paperclip } from "lucide-react";

export default function OpportunityDocuments({ documents = [], onPreviewDoc, onDownloadDoc }) {
  if (!documents || documents.length === 0) return null;

  return (
    <div className="rounded-2xl bg-[#FFFFFF] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-xs p-5 sm:p-7 transition-all">
      <h3 className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6] flex items-center gap-2 mb-3.5">
        <Paperclip className="w-4 h-4 text-[#159B72] dark:text-[#20D39B]" />
        <span>Official Guidelines & Documents</span>
      </h3>

      <div className="space-y-2.5">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl bg-[#F7FBF9] dark:bg-[#031A16] border border-[#E8F1ED] dark:border-[#10372F] hover:border-[#159B72]/40 transition-all"
          >
            <div className="flex items-start gap-3 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200/60 dark:border-red-900/40 flex items-center justify-center shrink-0 text-red-600 dark:text-red-400">
                <FileText className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] truncate block">
                  {doc.name}
                </span>
                <p className="text-[10.5px] text-[#658278] dark:text-[#789991] mt-0.5 truncate">
                  {doc.size} &bull; {doc.description || "Official resource"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
              <button
                type="button"
                onClick={() => onPreviewDoc(doc)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] text-[#159B72] dark:text-[#20D39B] hover:bg-[#DDF4EB]/50 transition-all flex items-center gap-1 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Preview</span>
              </button>

              <button
                type="button"
                onClick={() => onDownloadDoc(doc)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#159B72] hover:bg-[#0F805D] text-white shadow-2xs transition-all flex items-center gap-1 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
