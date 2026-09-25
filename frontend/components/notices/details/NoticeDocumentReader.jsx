"use client";

import {
  FileText,
  AlertCircle,
  Info,
  CheckCircle2,
  Calendar,
  Building2,
  Download,
  Eye,
  ShieldCheck,
} from "lucide-react";

export default function NoticeDocumentReader({
  notice,
  onPreviewFile,
  onDownloadFile,
}) {
  return (
    <article
      id="printable-notice-document"
      className="relative rounded-2xl bg-[#FFFFFF] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-xs p-6 sm:p-8 lg:p-10 transition-all font-sans"
    >
      {/* Official Header Strip */}
      <div className="text-center pb-6 mb-6 border-b-2 border-[#159B72]/40 dark:border-[#20D39B]/40">
        <div className="text-[11px] font-mono tracking-widest uppercase font-bold text-[#159B72] dark:text-[#20D39B]">
          COLLEGE OS AUTONOMOUS UNIVERSITY
        </div>
        <h2 className="text-base sm:text-lg md:text-xl font-black text-[#0B3024] dark:text-[#F1FAF6] mt-1 uppercase tracking-tight">
          {notice.department || "Academic Directorate"}
        </h2>
        <p className="text-xs text-[#55786B] dark:text-[#8FAFA4] mt-0.5 font-medium">
          Official University Circular & Notification Record
        </p>

        {/* Ref and Date Line */}
        <div className="flex flex-wrap items-center justify-between gap-2 mt-4 pt-3 border-t border-[#E8F1ED] dark:border-[#10372F] text-xs font-mono text-[#36594C] dark:text-[#B5CCC5]">
          <span>
            <strong>Ref No:</strong> {notice.referenceNumber}
          </span>
          <span>
            <strong>Date:</strong> {notice.publishedAt?.split(",")[0] || "18 Aug 2025"}
          </span>
        </div>
      </div>

      {/* Notice Subject Line */}
      <div className="mb-6 p-4 rounded-xl bg-[#F7FBF9] dark:bg-[#031A16] border-l-4 border-[#159B72] dark:border-[#20D39B]">
        <span className="text-[11px] uppercase font-bold text-[#658278] dark:text-[#789991] tracking-wider block">
          SUBJECT:
        </span>
        <h3 className="text-base sm:text-lg font-bold text-[#0B3024] dark:text-[#F1FAF6] mt-0.5 leading-snug">
          {notice.title}
        </h3>
      </div>

      {/* Callout Alert if present */}
      {notice.callout && (
        <div
          className={`mb-6 p-4 rounded-xl border flex items-start gap-3 ${
            notice.callout.type === "urgent"
              ? "bg-rose-50/80 dark:bg-rose-950/40 border-rose-300 dark:border-rose-900/60 text-rose-900 dark:text-rose-200"
              : "bg-amber-50/80 dark:bg-amber-950/40 border-amber-300 dark:border-amber-900/60 text-amber-900 dark:text-amber-200"
          }`}
        >
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-current" />
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider">{notice.callout.title}</h4>
            <p className="text-xs mt-1 leading-relaxed">{notice.callout.text}</p>
          </div>
        </div>
      )}

      {/* Structured Sections */}
      <div className="space-y-6 text-[13.5px] text-[#224438] dark:text-[#D1E5DE] leading-relaxed">
        {notice.sections && notice.sections.length > 0 ? (
          notice.sections.map((section, idx) => (
            <div key={idx} className="space-y-2.5">
              <h4 className="text-sm sm:text-[15px] font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
                {section.heading}
              </h4>
              <p className="leading-relaxed text-justify">{section.content}</p>

              {section.bullets && section.bullets.length > 0 && (
                <ul className="list-disc list-inside space-y-1.5 pl-2 text-xs sm:text-[13px] text-[#36594C] dark:text-[#B5CCC5]">
                  {section.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="leading-relaxed">
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))
        ) : (
          <p className="whitespace-pre-line leading-relaxed text-justify">
            {notice.fullContent || notice.description}
          </p>
        )}
      </div>

      {/* Formatted Table if available (e.g. Exam Timetable or Milestone Dates) */}
      {notice.tableData && (
        <div className="mt-8 mb-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#658278] dark:text-[#789991] mb-2.5 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#159B72] dark:text-[#20D39B]" />
            <span>{notice.tableData.title}</span>
          </h4>

          <div className="overflow-x-auto rounded-xl border border-[#D8E8E2] dark:border-[#16463D]">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#F0F7F4] dark:bg-[#082A24] border-b border-[#D8E8E2] dark:border-[#16463D] text-[#0B3024] dark:text-[#F1FAF6]">
                  {notice.tableData.columns.map((col, idx) => (
                    <th key={idx} className="px-3.5 py-2.5 font-bold whitespace-nowrap">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8F1ED] dark:divide-[#10372F]">
                {notice.tableData.rows.map((row, rIdx) => (
                  <tr
                    key={rIdx}
                    className="hover:bg-[#F7FBF9] dark:hover:bg-[#031A16] transition-colors"
                  >
                    {row.map((cell, cIdx) => (
                      <td
                        key={cIdx}
                        className={`px-3.5 py-2.5 text-[#36594C] dark:text-[#C5DCD4] ${
                          cIdx === 0 ? "font-semibold text-[#0B3024] dark:text-[#F1FAF6]" : ""
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Official Signature Authority Block */}
      <div className="mt-10 pt-8 border-t-2 border-[#E8F1ED] dark:border-[#10372F] flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
        <div className="text-xs text-[#658278] dark:text-[#789991] space-y-1">
          <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>Officially Validated Institutional Record</span>
          </div>
          <p className="text-[11px] font-mono">
            College OS Digital Document Verification Service &bull; ID: {notice.id}
          </p>
          <p className="text-[10px] text-[#8AA89F]">
            This is an authentic digital communication issued under university statutes.
          </p>
        </div>

        {/* Signature Stamp Box */}
        <div className="text-left sm:text-right border-l-2 sm:border-l-0 sm:border-r-2 border-[#159B72] dark:border-[#20D39B] pl-3 sm:pl-0 sm:pr-3 py-1">
          <div className="font-serif italic font-black text-sm text-[#0B3024] dark:text-[#F1FAF6]">
            {notice.author?.name || "Dr. Alok Nath Mukherjee"}
          </div>
          <div className="text-xs font-bold text-[#159B72] dark:text-[#20D39B] mt-0.5">
            {notice.author?.designation || "Principal & Academic Dean"}
          </div>
          <div className="text-[11px] text-[#658278] dark:text-[#789991]">
            {notice.department || "Academic Affairs"}
          </div>
          <div className="text-[10px] text-[#8AA89F] font-mono mt-0.5">
            College OS Autonomous University
          </div>
        </div>
      </div>
    </article>
  );
}
