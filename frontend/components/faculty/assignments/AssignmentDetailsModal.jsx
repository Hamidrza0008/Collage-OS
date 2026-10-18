"use client";

import React, { useState } from "react";
import { X, FileText, Download, CheckCircle2, Clock, Users } from "lucide-react";

const SAMPLE_SUBMISSIONS = [
  { roll: "22CS001", name: "Aarav Sharma", date: "Sep 17, 2025 • 08:30 PM", file: "aarav_dsa_sol.cpp", marks: "24/25", status: "Graded" },
  { roll: "22CS002", name: "Ananya Verma", date: "Sep 17, 2025 • 11:15 PM", file: "ananya_arrays.zip", marks: "25/25", status: "Graded" },
  { roll: "22CS003", name: "Arjun Reddy", date: "Sep 18, 2025 • 09:05 AM", file: "arjun_reddy_ps1.pdf", marks: "--/25", status: "Pending" },
  { roll: "22CS005", name: "Chetan Gupta", date: "Sep 18, 2025 • 10:20 AM", file: "chetan_arrays.cpp", marks: "--/25", status: "Pending" },
  { roll: "22CS006", name: "Dev Patel", date: "Sep 18, 2025 • 11:00 AM", file: "dev_dsa_submission.zip", marks: "--/25", status: "Pending" },
];

export default function AssignmentDetailsModal({ assignment, onClose, onToast }) {
  const [submissions, setSubmissions] = useState(SAMPLE_SUBMISSIONS);

  if (!assignment) return null;

  const handleDownloadAll = () => {
    if (onToast) {
      onToast(`Downloading all submissions for "${assignment.title}" (.zip)`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-2xl rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#F0F5F2] dark:border-[#0E352E] flex items-center justify-between bg-[#F7FBF9] dark:bg-[#082A24]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E6F7F0] dark:bg-[#073629] text-[#159B72] dark:text-[#20D39B] flex items-center justify-center font-bold shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6] leading-tight truncate">
                {assignment.title}
              </h3>
              <p className="text-xs text-[#658278] dark:text-[#789991] mt-0.5 truncate">
                {assignment.course} • Due: {assignment.dueDate} {assignment.dueMeta}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#658278] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 text-xs">
          {/* Summary Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#E2EBE7] dark:border-[#10372F] text-center">
              <span className="text-base sm:text-lg font-black text-[#0B3024] dark:text-[#F1FAF6] block">
                {assignment.submitted} / {assignment.total}
              </span>
              <span className="text-[10.5px] text-[#658278] dark:text-[#789991]">Submissions</span>
            </div>

            <div className="p-3 rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#E2EBE7] dark:border-[#10372F] text-center">
              <span className="text-base sm:text-lg font-black text-[#159B72] dark:text-[#20D39B] block">
                {assignment.total > 0 ? Math.round((assignment.submitted / assignment.total) * 100) : 0}%
              </span>
              <span className="text-[10.5px] text-[#658278] dark:text-[#789991]">Turn-in Rate</span>
            </div>

            <div className="p-3 rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#E2EBE7] dark:border-[#10372F] text-center">
              <span className="text-base sm:text-lg font-black text-[#EA580C] dark:text-[#FB923C] block">
                {assignment.status}
              </span>
              <span className="text-[10.5px] text-[#658278] dark:text-[#789991]">Status</span>
            </div>
          </div>

          {/* Description */}
          <div className="p-3 rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#E2EBE7] dark:border-[#10372F]">
            <span className="font-bold text-[#0B3024] dark:text-[#F1FAF6] block mb-1">
              Problem Description:
            </span>
            <p className="text-[#658278] dark:text-[#789991] leading-relaxed">
              {assignment.description} Ensure code adheres to clean modular function principles with comprehensive test cases covering boundary values.
            </p>
          </div>

          {/* Student Submissions Section */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                Recent Student Submissions ({submissions.length})
              </span>
              <button
                type="button"
                onClick={handleDownloadAll}
                className="text-[11px] font-bold text-[#159B72] dark:text-[#20D39B] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Download className="w-3 h-3" />
                <span>Download All (.zip)</span>
              </button>
            </div>

            <div className="divide-y divide-[#F0F5F2] dark:divide-[#0E352E] border border-[#E2EBE7] dark:border-[#10372F] rounded-xl overflow-hidden bg-white dark:bg-[#06241F]">
              {submissions.map((sub) => (
                <div
                  key={sub.roll}
                  className="p-2.5 flex items-center justify-between gap-3 hover:bg-[#F7FBF9] dark:hover:bg-[#082A24]/60 transition-colors"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-[#658278] text-[11px]">
                        {sub.roll}
                      </span>
                      <span className="font-bold text-[#0B3024] dark:text-[#F1FAF6] truncate">
                        {sub.name}
                      </span>
                    </div>
                    <span className="text-[10.5px] text-[#658278] dark:text-[#789991] block mt-0.5 truncate">
                      {sub.file} • {sub.date}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5 shrink-0">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        sub.status === "Graded"
                          ? "bg-[#E6F7F0] text-[#159B72] dark:bg-[#073629] dark:text-[#20D39B]"
                          : "bg-[#FFF4E5] text-[#EA580C] dark:bg-[#3D2509] dark:text-[#FB923C]"
                      }`}
                    >
                      {sub.status === "Graded" ? `Score: ${sub.marks}` : "Pending Evaluation"}
                    </span>

                    <button
                      type="button"
                      onClick={() => alert(`Opening evaluator for ${sub.name} (${sub.roll})`)}
                      className="px-2.5 py-1 rounded-lg bg-[#159B72] hover:bg-[#0E8561] text-white text-[10.5px] font-bold cursor-pointer"
                    >
                      Evaluate
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#F0F5F2] dark:border-[#0E352E] bg-[#F7FBF9] dark:bg-[#082A24] flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#159B72] hover:bg-[#0E8561] text-white text-xs font-bold transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
