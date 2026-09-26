"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { CheckCircle2, AlertCircle, Clock, Eye, ExternalLink, Filter, HelpCircle } from "lucide-react";

export default function GradeTable({
  semester,
  subjects = [],
  onInspectSubject,
}) {
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSubjects = useMemo(() => {
    return subjects.filter((sub) => {
      // Status filter
      if (filterStatus === "passed" && sub.status !== "Passed") return false;
      if (filterStatus === "incomplete" && sub.status === "Passed") return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = sub.name.toLowerCase().includes(q);
        const matchesCode = sub.code.toLowerCase().includes(q);
        if (!matchesName && !matchesCode) return false;
      }
      return true;
    });
  }, [subjects, filterStatus, searchQuery]);

  const getGradeBadge = (grade) => {
    switch (grade) {
      case "O":
      case "A+":
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
            {grade}
          </span>
        );
      case "A":
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-teal-100 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 border border-teal-300 dark:border-teal-800">
            {grade}
          </span>
        );
      case "B+":
      case "B":
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
            {grade}
          </span>
        );
      case "C":
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-yellow-100 dark:bg-yellow-950/50 text-yellow-800 dark:text-yellow-300 border border-yellow-300 dark:border-yellow-700">
            {grade}
          </span>
        );
      case "F":
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-100 dark:bg-rose-950/70 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-800">
            {grade}
          </span>
        );
      case "I":
      default:
        return (
          <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-purple-100 dark:bg-purple-950/50 text-purple-800 dark:text-purple-300 border border-purple-300 dark:border-purple-800">
            {grade}
          </span>
        );
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Passed":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Passed</span>
          </span>
        );
      case "Incomplete":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300">
            <Clock className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            <span>Incomplete</span>
          </span>
        );
      case "Pending Result":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300">
            <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>Pending</span>
          </span>
        );
      case "Failed":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300">
            <AlertCircle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
            <span>Failed</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
            <span>{status}</span>
          </span>
        );
    }
  };

  return (
    <div className="w-full bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl shadow-xs p-4 sm:p-5 transition-colors">
      {/* Table Section Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-[#E8F1ED] dark:border-[#10372F]">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
              Course Grade Card & Evaluation Table
            </h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-[#5C786E] dark:text-[#8AA89F] font-semibold">
              {filteredSubjects.length} {filteredSubjects.length === 1 ? "Subject" : "Subjects"}
            </span>
          </div>
          <p className="text-xs text-[#5C786E] dark:text-[#8AA89F] mt-0.5">
            Institutional marks card for {semester.label} ({semester.academicYear})
          </p>
        </div>

        {/* Filter Tabs & Search */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="inline-flex items-center p-0.5 rounded-xl bg-[#F1F8F5] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D]">
            <button
              type="button"
              onClick={() => setFilterStatus("all")}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                filterStatus === "all"
                  ? "bg-white dark:bg-[#0B3024] text-[#0B3024] dark:text-[#F1FAF6] shadow-2xs"
                  : "text-[#5C786E] dark:text-[#8AA89F] hover:text-[#0B3024] dark:hover:text-[#F1FAF6]"
              }`}
            >
              All ({subjects.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterStatus("passed")}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                filterStatus === "passed"
                  ? "bg-white dark:bg-[#0B3024] text-emerald-800 dark:text-emerald-300 shadow-2xs"
                  : "text-[#5C786E] dark:text-[#8AA89F] hover:text-[#0B3024] dark:hover:text-[#F1FAF6]"
              }`}
            >
              Passed
            </button>
            <button
              type="button"
              onClick={() => setFilterStatus("incomplete")}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                filterStatus === "incomplete"
                  ? "bg-white dark:bg-[#0B3024] text-purple-800 dark:text-purple-300 shadow-2xs"
                  : "text-[#5C786E] dark:text-[#8AA89F] hover:text-[#0B3024] dark:hover:text-[#F1FAF6]"
              }`}
            >
              Incomplete / Pending
            </button>
          </div>
        </div>
      </div>

      {/* Main Table: Horizontally scrollable container with NO page overflow */}
      {filteredSubjects.length === 0 ? (
        <div className="py-12 px-4 text-center">
          <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800/80 flex items-center justify-center mx-auto mb-3 text-gray-500">
            <Filter className="w-5 h-5" />
          </div>
          <p className="text-sm font-semibold text-[#0B3024] dark:text-[#F1FAF6]">
            No subjects match the selected criteria.
          </p>
          <p className="text-xs text-[#5C786E] dark:text-[#8AA89F] mt-1">
            Try switching filters or selecting another academic semester above.
          </p>
          {filterStatus !== "all" && (
            <button
              type="button"
              onClick={() => setFilterStatus("all")}
              className="mt-3 inline-flex items-center text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline cursor-pointer"
            >
              Reset filter
            </button>
          )}
        </div>
      ) : (
        <div className="overflow-x-auto w-full mt-3 scrollbar-none">
          <table className="w-full text-left text-xs min-w-[700px]">
            <thead>
              <tr className="border-b border-[#E8F1ED] dark:border-[#10372F] text-[11px] font-bold text-[#658278] dark:text-[#789991] uppercase tracking-wider">
                <th className="py-3 px-2">Code</th>
                <th className="py-3 px-2">Course / Subject Name</th>
                <th className="py-3 px-2 text-center">Credits</th>
                <th className="py-3 px-2 text-center">Internal</th>
                <th className="py-3 px-2 text-center">External</th>
                <th className="py-3 px-2 text-center">Total</th>
                <th className="py-3 px-2 text-center">Grade</th>
                <th className="py-3 px-2 text-center">Grade Point</th>
                <th className="py-3 px-2 text-center">Status</th>
                <th className="py-3 px-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8F1ED] dark:divide-[#10372F]/60">
              {filteredSubjects.map((sub, idx) => {
                const subjectHref = `/student/academics/subjects/${sub.slug || sub.code}`;

                return (
                  <tr
                    key={sub.code + idx}
                    className="hover:bg-[#F7FBF9]/90 dark:hover:bg-[#041D18]/70 transition-colors group"
                  >
                    {/* Course Code */}
                    <td className="py-3 px-2 font-mono font-bold text-emerald-800 dark:text-emerald-300">
                      <Link
                        href={subjectHref}
                        className="hover:underline flex items-center gap-1 group/code"
                        title="Open canonical subject details"
                      >
                        <span>{sub.code}</span>
                        <ExternalLink className="w-2.5 h-2.5 opacity-0 group-hover/code:opacity-100 transition-opacity" />
                      </Link>
                    </td>

                    {/* Course Title */}
                    <td className="py-3 px-2 font-medium text-[#0B3024] dark:text-[#F1FAF6] max-w-[220px]">
                      <div className="flex flex-col">
                        <Link
                          href={subjectHref}
                          className="hover:text-emerald-700 dark:hover:text-emerald-400 font-semibold transition-colors"
                        >
                          {sub.name}
                        </Link>
                        {sub.remarks && (
                          <span className="text-[10px] text-[#658278] dark:text-[#789991] line-clamp-1 mt-0.5">
                            {sub.remarks}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Credits */}
                    <td className="py-3 px-2 text-center font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                      {sub.credits}
                    </td>

                    {/* Internal */}
                    <td className="py-3 px-2 text-center font-medium text-[#5C786E] dark:text-[#8AA89F]">
                      {sub.internal > 0 ? sub.internal : "—"}
                    </td>

                    {/* External */}
                    <td className="py-3 px-2 text-center font-medium text-[#5C786E] dark:text-[#8AA89F]">
                      {sub.external > 0 ? sub.external : "—"}
                    </td>

                    {/* Total */}
                    <td className="py-3 px-2 text-center font-black text-[#0B3024] dark:text-[#F1FAF6]">
                      {sub.total > 0 ? sub.total : "—"}
                    </td>

                    {/* Grade */}
                    <td className="py-3 px-2 text-center">
                      {getGradeBadge(sub.grade)}
                    </td>

                    {/* Grade Point */}
                    <td className="py-3 px-2 text-center font-extrabold text-[#0B3024] dark:text-[#F1FAF6]">
                      {sub.gradePoint !== null ? sub.gradePoint : "—"}
                    </td>

                    {/* Status */}
                    <td className="py-3 px-2 text-center">
                      {getStatusBadge(sub.status)}
                    </td>

                    {/* Action: Inspect Breakdown */}
                    <td className="py-3 px-2 text-right">
                      <button
                        type="button"
                        onClick={() => onInspectSubject(sub)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#F1F8F5] dark:bg-[#06241F] text-emerald-800 dark:text-emerald-300 border border-[#D8E8E2] dark:border-[#16463D] hover:bg-emerald-100 dark:hover:bg-emerald-950/60 transition-colors cursor-pointer"
                        title="Inspect component-wise marks breakdown"
                      >
                        <Eye className="w-3 h-3" />
                        <span>Breakdown</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Result Publication Notice footer */}
      {semester.resultNotice && (
        <div className="mt-4 pt-3 border-t border-[#E8F1ED] dark:border-[#10372F] flex items-start gap-2 text-xs text-[#5C786E] dark:text-[#8AA89F]">
          <HelpCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <span className="font-semibold text-[#0B3024] dark:text-[#F1FAF6]">Official Note: </span>
            {semester.resultNotice}
          </p>
        </div>
      )}
    </div>
  );
}
