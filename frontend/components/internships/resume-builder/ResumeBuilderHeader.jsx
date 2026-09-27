"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Printer,
  Copy,
  Plus,
  Trash2,
  RefreshCw,
  FileCheck,
  ChevronDown,
  Sparkles,
  ExternalLink,
  Check,
} from "lucide-react";

export default function ResumeBuilderHeader({
  resume,
  allVersions,
  activeVersionId,
  onSelectVersion,
  onCreateVersion,
  onDuplicateVersion,
  onDeleteVersionClick,
  onSave,
  saveStatus, // 'saved' | 'saving' | 'unsaved'
  profileDiff,
  onSyncProfile,
  onPrint,
  onUseForApplication,
}) {
  const [isVersionDropdownOpen, setIsVersionDropdownOpen] = useState(false);

  return (
    <div className="bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] rounded-3xl p-4 sm:p-6 shadow-sm space-y-4">
      {/* Top Breadcrumb & Status Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <Link
          href="/student/internships"
          className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-900/70 dark:text-emerald-100/70 hover:text-emerald-950 dark:hover:text-emerald-50 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Opportunities</span>
        </Link>

        {/* Sync Profile Badge if differences detected */}
        {profileDiff?.hasDifferences && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs">
            <RefreshCw className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "3s" }} />
            <span>{profileDiff.count} new updates detected in your student profile</span>
            <button
              onClick={onSyncProfile}
              className="ml-1 font-bold underline hover:text-amber-800 dark:hover:text-amber-200 cursor-pointer"
            >
              Sync Now
            </button>
          </div>
        )}
      </div>

      {/* Main Title & Action Row */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-1">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-xl sm:text-2xl font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
              AI Resume Builder
            </h1>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
              <Sparkles className="w-3 h-3 text-emerald-500" />
              Smart Assistant Active
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#658278] dark:text-[#8AA89F]">
            Build a polished, role-focused resume directly from your verified College OS student profile.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Version Selector Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsVersionDropdownOpen(!isVersionDropdownOpen)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#F1F8F5] dark:bg-[#031A16] border border-[#D8E8E2] dark:border-[#16463D] text-[#0B3024] dark:text-[#F1FAF6] hover:border-emerald-500/40 transition-colors cursor-pointer"
            >
              <FileCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span className="max-w-[140px] truncate">{resume.name}</span>
              <ChevronDown className="w-3 h-3 text-[#658278] dark:text-[#789991]" />
            </button>

            {isVersionDropdownOpen && (
              <div className="absolute right-0 mt-1.5 w-64 rounded-2xl bg-white dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#16463D] shadow-xl py-2 z-30 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#658278] dark:text-[#789991]">
                  Resume Versions ({allVersions.length})
                </div>
                <div className="max-h-48 overflow-y-auto divide-y divide-[#E8F1ED] dark:divide-[#10372F]">
                  {allVersions.map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => {
                        onSelectVersion(v.id);
                        setIsVersionDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2.5 text-xs flex items-center justify-between hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors cursor-pointer ${
                        v.id === activeVersionId
                          ? "bg-emerald-50/70 dark:bg-emerald-950/60 font-bold text-emerald-700 dark:text-emerald-300"
                          : "text-[#0B3024] dark:text-[#F1FAF6]"
                      }`}
                    >
                      <span className="truncate pr-2">{v.name}</span>
                      {v.id === activeVersionId && <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                    </button>
                  ))}
                </div>

                <div className="pt-2 px-2 border-t border-[#E8F1ED] dark:border-[#10372F] flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => {
                      setIsVersionDropdownOpen(false);
                      onCreateVersion();
                    }}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/20 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                    New Version
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsVersionDropdownOpen(false);
                      onDuplicateVersion();
                    }}
                    title="Duplicate current resume"
                    className="p-1.5 rounded-lg text-[#658278] hover:text-[#0B3024] dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                  {allVersions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsVersionDropdownOpen(false);
                        onDeleteVersionClick();
                      }}
                      title="Delete this resume version"
                      className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-500/10 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Save Status / Button */}
          <button
            type="button"
            onClick={onSave}
            disabled={saveStatus === "saving"}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              saveStatus === "unsaved"
                ? "bg-amber-500 hover:bg-amber-600 text-white shadow-xs"
                : "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-100 border border-emerald-950/10 dark:border-emerald-500/20 hover:bg-emerald-100"
            }`}
          >
            <Save className="w-3.5 h-3.5" />
            <span>
              {saveStatus === "saving" ? "Saving..." : saveStatus === "unsaved" ? "Save Changes" : "Saved"}
            </span>
          </button>

          {/* Export / Print */}
          <button
            type="button"
            onClick={onPrint}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Export / Print</span>
          </button>

          {/* Use for Application */}
          <button
            type="button"
            onClick={onUseForApplication}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] text-emerald-700 dark:text-emerald-300 hover:border-emerald-500/40 transition-all cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Use in Application</span>
          </button>
        </div>
      </div>
    </div>
  );
}
