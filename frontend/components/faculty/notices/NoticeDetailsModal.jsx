"use client";

import React from "react";
import {
  X,
  Megaphone,
  FileText,
  Calendar,
  AlertTriangle,
  Briefcase,
  Users,
  Tag,
  Clock,
  Printer,
  Share2,
  Bookmark,
} from "lucide-react";

export default function NoticeDetailsModal({ isOpen, notice, onClose }) {
  if (!isOpen || !notice) return null;

  const renderIcon = (iconType) => {
    const className = "w-5 h-5";
    switch (iconType) {
      case "megaphone":
        return <Megaphone className={className} />;
      case "document":
        return <FileText className={className} />;
      case "calendar":
        return <Calendar className={className} />;
      case "alert":
        return <AlertTriangle className={className} />;
      case "briefcase":
        return <Briefcase className={className} />;
      default:
        return <FileText className={className} />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-white dark:bg-card-bg rounded-2xl border border-border-light dark:border-border-dark shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4.5 border-b border-border-light dark:border-border-dark bg-gray-50/50 dark:bg-surface-dark/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 flex items-center justify-center">
              {renderIcon(notice.iconType)}
            </div>
            <div>
              <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-wide">
                {notice.type} Details
              </span>
              <p className="text-xs text-text-secondary dark:text-text-secondary-dark">
                Official College OS Bulletin
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
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Status and Category Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200/60">
              {notice.status}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 dark:bg-surface-dark dark:text-gray-300">
              {notice.category}
            </span>
            {notice.urgent && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 border border-rose-200/60">
                Priority Alert
              </span>
            )}
          </div>

          {/* Title */}
          <h2 className="text-xl sm:text-2xl font-bold text-text-primary dark:text-text-primary-dark leading-snug">
            {notice.title}
          </h2>

          {/* Metadata Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-xl bg-gray-50 dark:bg-surface-dark border border-border-light dark:border-border-dark text-xs">
            <div>
              <span className="text-text-secondary/70 dark:text-text-secondary-dark/70 text-[11px] block">
                Target Audience
              </span>
              <span className="font-semibold text-text-primary dark:text-text-primary-dark flex items-center gap-1 mt-0.5">
                <Users className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                {notice.targetAudience}
              </span>
            </div>
            <div>
              <span className="text-text-secondary/70 dark:text-text-secondary-dark/70 text-[11px] block">
                Published On
              </span>
              <span className="font-semibold text-text-primary dark:text-text-primary-dark flex items-center gap-1 mt-0.5">
                <Calendar className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                {notice.date}
              </span>
            </div>
            <div>
              <span className="text-text-secondary/70 dark:text-text-secondary-dark/70 text-[11px] block">
                Time
              </span>
              <span className="font-semibold text-text-primary dark:text-text-primary-dark flex items-center gap-1 mt-0.5">
                <Clock className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                {notice.time}
              </span>
            </div>
            <div>
              <span className="text-text-secondary/70 dark:text-text-secondary-dark/70 text-[11px] block">
                Issuer Authority
              </span>
              <span className="font-semibold text-text-primary dark:text-text-primary-dark truncate block mt-0.5" title={notice.author}>
                {notice.author || "Department Office"}
              </span>
            </div>
          </div>

          {/* Full description */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-semibold text-text-secondary dark:text-text-secondary-dark uppercase tracking-wider">
              Communication Content
            </h4>
            <div className="text-sm text-text-primary dark:text-text-primary-dark leading-relaxed space-y-3 font-normal">
              <p>{notice.description}</p>
              <p className="text-xs text-text-secondary dark:text-text-secondary-dark">
                Students and concerned faculty are advised to note down these instructions and follow the guidelines issued by the respective committee. For any inquiries, reach out to the department helpdesk.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="px-6 py-3.5 border-t border-border-light dark:border-border-dark bg-gray-50/50 dark:bg-surface-dark/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="p-2 rounded-lg border border-border-light dark:border-border-dark text-text-secondary dark:text-text-secondary-dark hover:text-text-primary hover:border-emerald-500/40 transition-colors"
              title="Print Notice"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                navigator.clipboard.writeText(
                  `${window.location.origin}/faculty/notices#${notice.id}`
                );
              }}
              className="p-2 rounded-lg border border-border-light dark:border-border-dark text-text-secondary dark:text-text-secondary-dark hover:text-text-primary hover:border-emerald-500/40 transition-colors"
              title="Share Link"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#159B72] hover:bg-[#128360] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
