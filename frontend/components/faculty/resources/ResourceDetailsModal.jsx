"use client";

import React from "react";
import {
  X,
  FileText,
  Download,
  Share2,
  Calendar,
  Users,
  HardDrive,
  Copy,
  Tag,
} from "lucide-react";

export default function ResourceDetailsModal({
  isOpen,
  resource,
  onClose,
  onDownload,
}) {
  if (!isOpen || !resource) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-white dark:bg-card-bg rounded-2xl border border-border-light dark:border-border-dark shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4.5 border-b border-border-light dark:border-border-dark bg-gray-50/50 dark:bg-surface-dark/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-wide">
                Resource Details
              </span>
              <p className="text-xs text-text-secondary dark:text-text-secondary-dark">
                College OS Academic Repository
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-text-secondary hover:text-text-primary dark:text-text-secondary-dark dark:hover:text-text-primary-dark hover:bg-gray-100 dark:hover:bg-surface-dark transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4">
          <div>
            <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200/60 uppercase">
              {resource.format} File
            </span>
            <h3 className="text-lg font-bold text-text-primary dark:text-text-primary-dark mt-2 leading-snug">
              {resource.title}
            </h3>
            {resource.subtitle && (
              <p className="text-xs text-text-secondary dark:text-text-secondary-dark mt-0.5">
                {resource.subtitle}
              </p>
            )}
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-gray-50 dark:bg-surface-dark border border-border-light dark:border-border-dark text-xs">
            <div>
              <span className="text-text-secondary/70 dark:text-text-secondary-dark/70 text-[11px] block">
                File Size
              </span>
              <span className="font-semibold text-text-primary dark:text-text-primary-dark flex items-center gap-1.5 mt-0.5">
                <HardDrive className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                {resource.size}
              </span>
            </div>
            <div>
              <span className="text-text-secondary/70 dark:text-text-secondary-dark/70 text-[11px] block">
                Semester Target
              </span>
              <span className="font-semibold text-text-primary dark:text-text-primary-dark flex items-center gap-1.5 mt-0.5">
                <Tag className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                {resource.semester || "All Sem"}
              </span>
            </div>
            <div>
              <span className="text-text-secondary/70 dark:text-text-secondary-dark/70 text-[11px] block">
                Uploaded By
              </span>
              <span className="font-semibold text-text-primary dark:text-text-primary-dark flex items-center gap-1.5 mt-0.5">
                <Users className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                {typeof resource.author === "string"
                  ? resource.author
                  : resource.author?.name || "Dr. Arjun Mehta"}
              </span>
            </div>
            <div>
              <span className="text-text-secondary/70 dark:text-text-secondary-dark/70 text-[11px] block">
                Uploaded Date
              </span>
              <span className="font-semibold text-text-primary dark:text-text-primary-dark flex items-center gap-1.5 mt-0.5">
                <Calendar className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                {resource.uploadedTime || "Recent"}
              </span>
            </div>
          </div>

          <div className="text-xs text-text-secondary dark:text-text-secondary-dark leading-relaxed">
            This educational resource is verified by department faculty for academic coursework and reference material.
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-border-light dark:border-border-dark bg-gray-50/50 dark:bg-surface-dark/50 flex items-center justify-between">
          <button
            onClick={() => {
              navigator.clipboard.writeText(
                `${window.location.origin}/faculty/resources#${resource.id}`
              );
            }}
            className="p-2 rounded-lg border border-border-light dark:border-border-dark text-text-secondary dark:text-text-secondary-dark hover:text-text-primary hover:border-emerald-500/40 transition-colors"
            title="Copy Link"
          >
            <Copy className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-border-light dark:border-border-dark text-xs font-semibold text-text-secondary hover:text-text-primary hover:bg-gray-50 dark:hover:bg-surface-dark transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onDownload(resource);
                onClose();
              }}
              className="px-5 py-2 rounded-xl bg-[#159B72] hover:bg-[#128360] text-white text-xs font-semibold shadow-xs flex items-center gap-2 transition-colors cursor-pointer"
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
