"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import {
  X,
  FileText,
  Download,
  Calendar,
  Users,
  HardDrive,
  Copy,
  Tag,
  ArrowDownToLine,
  Info,
} from "lucide-react";

export default function ResourceDetailsModal({
  isOpen,
  resource,
  onClose,
  onDownload,
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !resource) return null;

  const authorName =
    typeof resource.author === "string"
      ? resource.author
      : resource.author?.name || "Dr. Arjun Mehta";

  const authorAvatar =
    typeof resource.author === "string"
      ? "/assets/profile/dr-arjun-mehta.jpg"
      : resource.author?.avatar || "/assets/profile/dr-arjun-mehta.jpg";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-white dark:bg-[#06241F] rounded-2xl border border-[#D8E8E2] dark:border-[#10372F] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4.5 border-b border-[#D8E8E2] dark:border-[#10372F] bg-[#F7FBF9] dark:bg-[#04241C]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#EBF6F1] dark:bg-[#0F4A3B] text-[#159B72] dark:text-[#20D39B] border border-[#D8E8E2]/60 dark:border-[#16463D] flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-[#159B72] dark:text-[#20D39B] uppercase tracking-wide">
                Resource Details
              </span>
              <p className="text-xs text-[#658278] dark:text-[#789991]">
                College OS Academic Repository
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#658278] hover:text-[#0B3024] dark:text-[#789991] dark:hover:text-[#F1FAF6] hover:bg-[#F1F8F5] dark:hover:bg-[#082A24] transition-colors cursor-pointer"
            aria-label="Close resource details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4 overflow-y-auto flex-1">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-[#E8F6EF] text-[#159B72] dark:bg-[#0F4A3B] dark:text-[#20D39B] border border-[#D8E8E2]/60 dark:border-[#16463D] uppercase">
                {resource.format} File
              </span>
              {resource.downloadsCount && (
                <span className="text-xs font-medium text-[#658278] dark:text-[#789991] flex items-center gap-1">
                  <ArrowDownToLine className="w-3.5 h-3.5" />
                  {resource.downloadsCount} downloads
                </span>
              )}
            </div>

            <h3 className="text-lg font-bold text-[#0B3024] dark:text-[#F1FAF6] leading-snug">
              {resource.title}
            </h3>
            {resource.subtitle && (
              <p className="text-xs text-[#658278] dark:text-[#789991] mt-0.5">
                {resource.subtitle}
              </p>
            )}
          </div>

          {resource.description && (
            <p className="text-xs text-[#36594C] dark:text-[#B5CCC5] leading-relaxed bg-[#F7FBF9] dark:bg-[#082A24]/50 p-3 rounded-xl border border-[#D8E8E2]/60 dark:border-[#10372F]">
              {resource.description}
            </p>
          )}

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-[#F7FBF9] dark:bg-[#082A24]/40 border border-[#D8E8E2] dark:border-[#10372F] text-xs">
            <div>
              <span className="text-[#658278] dark:text-[#789991] text-[11px] block">
                File Size
              </span>
              <span className="font-semibold text-[#0B3024] dark:text-[#F1FAF6] flex items-center gap-1.5 mt-0.5">
                <HardDrive className="w-3.5 h-3.5 text-[#159B72]" />
                {resource.size}
              </span>
            </div>
            <div>
              <span className="text-[#658278] dark:text-[#789991] text-[11px] block">
                Semester Target
              </span>
              <span className="font-semibold text-[#0B3024] dark:text-[#F1FAF6] flex items-center gap-1.5 mt-0.5">
                <Tag className="w-3.5 h-3.5 text-[#159B72]" />
                {resource.semester || "All Sem"}
              </span>
            </div>
            <div>
              <span className="text-[#658278] dark:text-[#789991] text-[11px] block">
                Uploaded By
              </span>
              <span className="font-semibold text-[#0B3024] dark:text-[#F1FAF6] flex items-center gap-1.5 mt-0.5">
                <div className="relative w-4 h-4 rounded-full overflow-hidden shrink-0">
                  <Image src={authorAvatar} alt={authorName} fill className="object-cover" />
                </div>
                {authorName}
              </span>
            </div>
            <div>
              <span className="text-[#658278] dark:text-[#789991] text-[11px] block">
                Uploaded Date
              </span>
              <span className="font-semibold text-[#0B3024] dark:text-[#F1FAF6] flex items-center gap-1.5 mt-0.5">
                <Calendar className="w-3.5 h-3.5 text-[#159B72]" />
                {resource.uploadedTime || "Recent"}
              </span>
            </div>
          </div>

          {/* Honest Notice */}
          <div className="flex items-start gap-2 p-2.5 rounded-xl bg-[#E8F6EF]/50 dark:bg-[#0F4A3B]/20 border border-[#D8E8E2]/60 dark:border-[#16463D] text-[11px] text-[#36594C] dark:text-[#B5CCC5]">
            <Info className="w-4 h-4 text-[#159B72] dark:text-[#20D39B] shrink-0 mt-0.5" />
            <span>
              Demonstration record for College OS Faculty Portal. Click Download below to test simulated download tracking.
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-[#D8E8E2] dark:border-[#10372F] bg-[#F7FBF9] dark:bg-[#04241C] flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              if (typeof window !== "undefined") {
                navigator.clipboard.writeText(
                  `${window.location.origin}/faculty/resources#${resource.id}`
                );
              }
            }}
            className="p-2 rounded-lg border border-[#D8E8E2] dark:border-[#16463D] text-[#658278] dark:text-[#789991] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] hover:border-[#159B72]/50 transition-colors cursor-pointer"
            title="Copy Link Reference"
          >
            <Copy className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-[#D8E8E2] dark:border-[#16463D] text-xs font-semibold text-[#658278] dark:text-[#789991] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] hover:bg-white dark:hover:bg-[#082A24] transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                onDownload(resource);
                onClose();
              }}
              className="px-5 py-2 rounded-xl bg-[#159B72] hover:bg-[#118360] dark:bg-[#18B887] dark:hover:bg-[#0F8F6B] text-white text-xs font-semibold shadow-xs flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              Download File
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
