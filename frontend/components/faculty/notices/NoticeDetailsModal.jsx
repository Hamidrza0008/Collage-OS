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
  Paperclip,
  Download,
  Edit3,
  Trash2,
  CheckCircle2,
} from "lucide-react";

export default function NoticeDetailsModal({
  isOpen,
  notice,
  onClose,
  onEditNotice,
  onDeleteNotice,
}) {
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

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        `${window.location.origin}/faculty/notices#${notice.id}`
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-white dark:bg-[#031C16] rounded-2xl border border-border-light dark:border-border-dark shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4.5 border-b border-border-light dark:border-border-dark bg-gray-50/50 dark:bg-surface-dark/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 flex items-center justify-center shrink-0">
              {renderIcon(notice.iconType)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">
                  {notice.type}
                </span>
                <span className="text-border-light dark:text-border-dark">•</span>
                <span className="text-[11px] text-text-secondary dark:text-text-secondary-dark font-medium">
                  ID: {notice.id}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-text-primary dark:text-text-primary-dark truncate max-w-md">
                Official Campus Communication
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePrint}
              title="Print Notice"
              className="p-1.5 rounded-lg text-text-secondary hover:text-text-primary dark:text-text-secondary-dark dark:hover:text-text-primary-dark hover:bg-gray-100 dark:hover:bg-surface-dark transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={handleShare}
              title="Copy Link"
              className="p-1.5 rounded-lg text-text-secondary hover:text-text-primary dark:text-text-secondary-dark dark:hover:text-text-primary-dark hover:bg-gray-100 dark:hover:bg-surface-dark transition-colors cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-text-secondary hover:text-text-primary dark:text-text-secondary-dark dark:hover:text-text-primary-dark hover:bg-gray-100 dark:hover:bg-surface-dark transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs">
          {/* Status and Category Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                notice.status === "Active"
                  ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border-emerald-200/60 dark:border-emerald-800/40"
                  : notice.status === "Draft"
                  ? "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border-amber-200/60 dark:border-amber-800/40"
                  : "bg-gray-100 text-gray-700 dark:bg-surface-dark dark:text-gray-300 border-gray-200 dark:border-gray-700"
              }`}
            >
              {notice.status}
            </span>

            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 dark:bg-surface-dark dark:text-gray-300 border border-border-light dark:border-border-dark">
              {notice.category}
            </span>

            {notice.urgent && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 border border-rose-200/60 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                Priority Notice
              </span>
            )}

            {notice.pinned && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border border-blue-200/60">
                Pinned Bulletin
              </span>
            )}
          </div>

          {/* Title */}
          <h2 className="text-xl sm:text-2xl font-bold text-text-primary dark:text-text-primary-dark leading-snug">
            {notice.title}
          </h2>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-xl bg-gray-50/70 dark:bg-surface-dark/60 border border-border-light dark:border-border-dark text-xs">
            <div>
              <span className="text-text-secondary/70 dark:text-text-secondary-dark/70 text-[11px] block">
                Target Audience
              </span>
              <span className="font-semibold text-text-primary dark:text-text-primary-dark flex items-center gap-1 mt-0.5">
                <Users className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                {notice.targetAudience}
              </span>
            </div>

            <div>
              <span className="text-text-secondary/70 dark:text-text-secondary-dark/70 text-[11px] block">
                Category
              </span>
              <span className="font-semibold text-text-primary dark:text-text-primary-dark flex items-center gap-1 mt-0.5">
                <Tag className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                {notice.category}
              </span>
            </div>

            <div>
              <span className="text-text-secondary/70 dark:text-text-secondary-dark/70 text-[11px] block">
                Published On
              </span>
              <span className="font-semibold text-text-primary dark:text-text-primary-dark flex items-center gap-1 mt-0.5">
                <Calendar className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                {notice.date}
              </span>
            </div>

            <div>
              <span className="text-text-secondary/70 dark:text-text-secondary-dark/70 text-[11px] block">
                Time
              </span>
              <span className="font-semibold text-text-primary dark:text-text-primary-dark flex items-center gap-1 mt-0.5">
                <Clock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                {notice.time}
              </span>
            </div>
          </div>

          {/* Description & Full Content */}
          <div className="space-y-3 pt-1">
            <div className="text-xs sm:text-[13px] text-text-secondary dark:text-text-secondary-dark leading-relaxed font-medium bg-emerald-50/40 dark:bg-[#072B21]/30 p-3.5 rounded-xl border border-emerald-100/80 dark:border-emerald-900/40">
              {notice.description}
            </div>

            {notice.content && notice.content !== notice.description && (
              <div className="text-xs sm:text-[13px] text-text-primary dark:text-text-primary-dark leading-relaxed whitespace-pre-line pt-2">
                {notice.content}
              </div>
            )}
          </div>

          {/* Author info */}
          <div className="pt-2 flex items-center justify-between text-xs text-text-secondary dark:text-text-secondary-dark border-t border-border-light dark:border-border-dark">
            <div>
              <span className="text-[11px] text-text-secondary/70 dark:text-text-secondary-dark/70 block">
                Issued By
              </span>
              <span className="font-medium text-text-primary dark:text-text-primary-dark">
                {notice.author || "Faculty Dean / Admin Office"}
              </span>
            </div>

            {notice.expiryDate && (
              <div className="text-right">
                <span className="text-[11px] text-text-secondary/70 dark:text-text-secondary-dark/70 block">
                  Expires On
                </span>
                <span className="font-medium text-text-primary dark:text-text-primary-dark">
                  {notice.expiryDate}
                </span>
              </div>
            )}
          </div>

          {/* Attachment Box if any */}
          {notice.attachment && (
            <div className="flex items-center justify-between p-3.5 rounded-xl border border-emerald-200/70 dark:border-emerald-800/40 bg-emerald-50/40 dark:bg-emerald-950/20">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 flex items-center justify-center">
                  <Paperclip className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-text-primary dark:text-text-primary-dark">
                    {notice.attachment.name}
                  </h4>
                  <span className="text-[11px] text-text-secondary dark:text-text-secondary-dark">
                    Size: {notice.attachment.size} • PDF Document
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => alert(`Simulated download for: ${notice.attachment.name}`)}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                Download
              </button>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 border-t border-border-light dark:border-border-dark bg-gray-50/50 dark:bg-surface-dark/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                onClose();
                onEditNotice(notice);
              }}
              className="px-3.5 py-1.5 rounded-xl border border-border-light dark:border-border-dark hover:bg-emerald-50 dark:hover:bg-emerald-950/30 text-text-primary dark:text-text-primary-dark text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              Edit Record
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                onDeleteNotice(notice);
              }}
              className="px-3.5 py-1.5 rounded-xl border border-border-light dark:border-border-dark hover:bg-rose-50 dark:hover:bg-rose-950/30 text-rose-600 dark:text-rose-400 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Delete
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-gray-200 dark:bg-surface-dark hover:bg-gray-300 dark:hover:bg-surface-dark/80 text-text-primary dark:text-text-primary-dark text-xs font-semibold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
