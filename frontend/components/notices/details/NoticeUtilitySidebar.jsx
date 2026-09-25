"use client";

import {
  FileCheck2,
  CheckCircle2,
  Clock,
  Building2,
  Calendar,
  ShieldCheck,
  Users,
  AlertTriangle,
  Info,
  ExternalLink,
} from "lucide-react";
import NoticeAuthorityCard from "./NoticeAuthorityCard";
import RelatedNotices from "./RelatedNotices";

export default function NoticeUtilitySidebar({
  notice,
  isRead,
  isAcknowledged,
  acknowledgementData,
  onOpenAcknowledgeModal,
  onContactDepartment,
  relatedNotices,
}) {
  return (
    <aside className="space-y-4">
      {/* 1. Status & Compliance Card */}
      <div className="rounded-2xl bg-[#FFFFFF] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-xs p-5 transition-all">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E8F1ED] dark:border-[#10372F]">
          <h3 className="text-xs sm:text-[13px] font-bold text-[#0B3024] dark:text-[#F1FAF6]">
            Document Status
          </h3>
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
              notice.status === "Active"
                ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {notice.status || "Active"}
          </span>
        </div>

        {/* Dynamic Status Blocks */}
        <div className="space-y-2.5">
          {/* Read State */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#F7FBF9] dark:bg-[#031A16] border border-[#E8F1ED] dark:border-[#10372F] text-xs">
            <span className="text-[#658278] dark:text-[#789991]">Student Reading:</span>
            <span
              className={`font-bold flex items-center gap-1 ${
                isRead
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-amber-600 dark:text-amber-400"
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{isRead ? "Read" : "Unread"}</span>
            </span>
          </div>

          {/* Acknowledgement Status */}
          {notice.requiresAcknowledgement ? (
            <div
              className={`p-3 rounded-xl border text-xs ${
                isAcknowledged
                  ? "bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200"
                  : "bg-orange-50/80 dark:bg-orange-950/40 border-orange-300 dark:border-orange-800 text-orange-900 dark:text-orange-200"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold flex items-center gap-1.5">
                  <FileCheck2 className="w-4 h-4" />
                  <span>Acknowledgement:</span>
                </span>
                <span className="font-extrabold uppercase text-[10.5px]">
                  {isAcknowledged ? "Completed" : "Action Required"}
                </span>
              </div>

              {isAcknowledged ? (
                <div className="mt-1.5 text-[11px] text-emerald-800 dark:text-emerald-300">
                  Confirmed by you on {acknowledgementData?.timestamp || "today"}. Verified in Student ERP.
                </div>
              ) : (
                <div className="mt-2">
                  <p className="text-[11px] text-orange-800 dark:text-orange-300 leading-snug">
                    You must submit an electronic receipt acknowledgement for this circular.
                  </p>
                  <button
                    type="button"
                    onClick={onOpenAcknowledgeModal}
                    className="w-full mt-2 py-1.5 px-3 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-2xs transition-all cursor-pointer"
                  >
                    Acknowledge Notice Now →
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#F7FBF9] dark:bg-[#031A16] border border-[#E8F1ED] dark:border-[#10372F] text-xs">
              <span className="text-[#658278] dark:text-[#789991]">Acknowledgement:</span>
              <span className="text-[#36594C] dark:text-[#B5CCC5] font-medium">Not Required</span>
            </div>
          )}
        </div>
      </div>

      {/* 2. Notice Metadata Factsheet Card */}
      <div className="rounded-2xl bg-[#FFFFFF] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-xs p-5 transition-all">
        <h3 className="text-xs sm:text-[13px] font-bold text-[#0B3024] dark:text-[#F1FAF6] pb-3 mb-3 border-b border-[#E8F1ED] dark:border-[#10372F]">
          Notice Specifications
        </h3>

        <div className="space-y-3 text-xs">
          <div className="flex justify-between items-start gap-2">
            <span className="text-[#658278] dark:text-[#789991]">Reference:</span>
            <span className="font-mono font-bold text-[#0B3024] dark:text-[#F1FAF6] text-right">
              {notice.referenceNumber}
            </span>
          </div>

          <div className="flex justify-between items-start gap-2">
            <span className="text-[#658278] dark:text-[#789991]">Notice Type:</span>
            <span className="font-semibold text-[#0B3024] dark:text-[#F1FAF6] text-right">
              {notice.type || "Circular"}
            </span>
          </div>

          <div className="flex justify-between items-start gap-2">
            <span className="text-[#658278] dark:text-[#789991]">Issuing Office:</span>
            <span className="font-semibold text-[#0B3024] dark:text-[#F1FAF6] text-right">
              {notice.department}
            </span>
          </div>

          <div className="flex justify-between items-start gap-2">
            <span className="text-[#658278] dark:text-[#789991]">Published:</span>
            <span className="font-semibold text-[#0B3024] dark:text-[#F1FAF6] text-right">
              {notice.publishedAt}
            </span>
          </div>

          {notice.effectiveFrom && (
            <div className="flex justify-between items-start gap-2">
              <span className="text-[#658278] dark:text-[#789991]">Effective From:</span>
              <span className="font-semibold text-[#0B3024] dark:text-[#F1FAF6] text-right">
                {notice.effectiveFrom}
              </span>
            </div>
          )}

          {notice.deadline && (
            <div className="flex justify-between items-start gap-2 text-rose-700 dark:text-rose-400">
              <span className="font-semibold">Action Deadline:</span>
              <span className="font-bold text-right">{notice.deadline}</span>
            </div>
          )}

          <div className="flex justify-between items-start gap-2">
            <span className="text-[#658278] dark:text-[#789991]">Audience:</span>
            <span className="font-semibold text-[#0B3024] dark:text-[#F1FAF6] text-right line-clamp-2">
              {notice.audience}
            </span>
          </div>

          <div className="flex justify-between items-start gap-2">
            <span className="text-[#658278] dark:text-[#789991]">Classification:</span>
            <span className="font-bold text-[#159B72] dark:text-[#20D39B] text-right">
              {notice.priority || "Normal"} Priority
            </span>
          </div>
        </div>
      </div>

      {/* 3. Issuing Authority Card */}
      <NoticeAuthorityCard
        author={notice.author}
        department={notice.department}
        onContactDepartment={onContactDepartment}
      />

      {/* 4. Related Notices Card */}
      <RelatedNotices relatedNotices={relatedNotices} />
    </aside>
  );
}
