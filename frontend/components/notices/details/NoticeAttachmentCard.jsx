"use client";

import { FileText, Download, Eye, Paperclip, HardDrive } from "lucide-react";

export default function NoticeAttachmentCard({ files = [], onPreviewFile, onDownloadFile }) {
  if (!files || files.length === 0) return null;

  return (
    <div className="rounded-2xl bg-[#FFFFFF] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-xs p-5 transition-all">
      <div className="flex items-center justify-between pb-3 border-b border-[#E8F1ED] dark:border-[#10372F]">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-[#DDF4EB] dark:bg-[#082A24] text-[#159B72] dark:text-[#20D39B]">
            <Paperclip className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6]">
              Attached Documents & Circulars
            </h3>
            <p className="text-[11px] text-[#658278] dark:text-[#789991]">
              {files.length} official {files.length === 1 ? "document" : "documents"} available for review
            </p>
          </div>
        </div>
      </div>

      <div className="mt-3.5 space-y-2.5">
        {files.map((file) => (
          <div
            key={file.id || file.name}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl bg-[#F7FBF9] dark:bg-[#031A16] border border-[#E8F1ED] dark:border-[#10372F] hover:border-[#159B72]/40 transition-all group"
          >
            {/* File Info */}
            <div className="flex items-start gap-3 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200/60 dark:border-red-900/40 flex items-center justify-center shrink-0 text-red-600 dark:text-red-400">
                <FileText className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] group-hover:text-[#159B72] dark:group-hover:text-[#20D39B] transition-colors truncate block">
                  {file.name}
                </span>
                <div className="flex items-center gap-2 text-[10.5px] text-[#658278] dark:text-[#789991] mt-0.5">
                  <span>{file.type || "PDF Document"}</span>
                  <span>•</span>
                  <span>{file.size}</span>
                  {file.pageCount && (
                    <>
                      <span>•</span>
                      <span>{file.pageCount} pages</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
              <button
                type="button"
                onClick={() => onPreviewFile(file)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] text-[#159B72] dark:text-[#20D39B] hover:bg-[#DDF4EB]/50 transition-all flex items-center gap-1 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Preview</span>
              </button>

              <button
                type="button"
                onClick={() => onDownloadFile(file)}
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
