"use client";

import Link from "next/link";
import {
  Award,
  TrendingUp,
  Download,
  Printer,
  FileText,
  Calendar,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Layers,
} from "lucide-react";

export default function GradeCardRightSidebar({
  student,
  semester,
  metrics,
  onDownloadGradeCard,
  onPrint,
  onOpenTranscript,
}) {
  const isCompleted = semester.status === "Completed";
  const isInProgress = semester.status === "In Progress";

  return (
    <aside className="w-full space-y-4 lg:sticky lg:top-20 print:hidden">
      {/* 1. Academic Performance Summary */}
      <div className="bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl shadow-xs p-4 sm:p-5 transition-colors">
        <div className="flex items-center justify-between pb-3 border-b border-[#E8F1ED] dark:border-[#10372F]">
          <h3 className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] uppercase tracking-wider">
            Academic Performance
          </h3>
          <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800">
            {student.batch}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5 mt-3.5">
          <div className="p-3 rounded-xl bg-[#F7FBF9] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D]">
            <span className="text-[10px] font-bold text-[#5C786E] dark:text-[#8AA89F] uppercase block">
              Cumulative CGPA
            </span>
            <span className="text-xl font-black text-[#0B3024] dark:text-[#F1FAF6] mt-0.5 block">
              {student.cumulativeCGPA.toFixed(2)}
            </span>
            <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold">
              Scale 10.0
            </span>
          </div>

          <div className="p-3 rounded-xl bg-[#F7FBF9] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D]">
            <span className="text-[10px] font-bold text-[#5C786E] dark:text-[#8AA89F] uppercase block">
              Current SGPA
            </span>
            <span className="text-xl font-black text-[#0B3024] dark:text-[#F1FAF6] mt-0.5 block">
              {semester.sgpa !== null ? semester.sgpa.toFixed(2) : "—"}
            </span>
            <span className="text-[10px] text-[#658278] dark:text-[#789991]">
              {semester.shortLabel}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-[#F7FBF9] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D]">
            <span className="text-[10px] font-bold text-[#5C786E] dark:text-[#8AA89F] uppercase block">
              Credits Earned
            </span>
            <span className="text-xl font-black text-emerald-800 dark:text-emerald-300 mt-0.5 block">
              {student.cumulativeCreditsEarned}
            </span>
            <span className="text-[10px] text-[#658278] dark:text-[#789991]">
              Of 160 required
            </span>
          </div>

          <div className="p-3 rounded-xl bg-[#F7FBF9] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D]">
            <span className="text-[10px] font-bold text-[#5C786E] dark:text-[#8AA89F] uppercase block">
              Credits Left
            </span>
            <span className="text-xl font-black text-[#0B3024] dark:text-[#F1FAF6] mt-0.5 block">
              {Math.max(0, student.cumulativeCreditsRequired - student.cumulativeCreditsEarned)}
            </span>
            <span className="text-[10px] text-[#658278] dark:text-[#789991]">
              To graduate
            </span>
          </div>
        </div>
      </div>

      {/* 2. Selected Term Card */}
      <div className="bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl shadow-xs p-4 sm:p-5 transition-colors">
        <div className="flex items-center justify-between pb-2.5 border-b border-[#E8F1ED] dark:border-[#10372F]">
          <h3 className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] uppercase tracking-wider">
            Selected Term Details
          </h3>
          <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
            {semester.shortLabel}
          </span>
        </div>

        <div className="mt-3 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-[#5C786E] dark:text-[#8AA89F]">Session:</span>
            <span className="font-semibold text-[#0B3024] dark:text-[#F1FAF6]">
              {semester.academicYear}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#5C786E] dark:text-[#8AA89F]">Result Status:</span>
            <span className="font-semibold text-[#0B3024] dark:text-[#F1FAF6]">
              {semester.status}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#5C786E] dark:text-[#8AA89F]">Term Credits:</span>
            <span className="font-semibold text-[#0B3024] dark:text-[#F1FAF6]">
              {metrics.creditsEarned} / {metrics.creditsRegistered} Earned
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#5C786E] dark:text-[#8AA89F]">Published On:</span>
            <span className="font-semibold text-[#0B3024] dark:text-[#F1FAF6] text-[11px]">
              {semester.publishedDate || "Pending ratifications"}
            </span>
          </div>
        </div>
      </div>

      {/* 3. Academic Standing Card */}
      <div className="bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl shadow-xs p-4 sm:p-5 transition-colors">
        <div className="flex items-center gap-2 pb-2.5 border-b border-[#E8F1ED] dark:border-[#10372F]">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <h3 className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] uppercase tracking-wider">
            Academic Standing
          </h3>
        </div>

        <div className="mt-3">
          <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800">
            <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400" />
            <span>{student.academicStanding}</span>
          </div>
          <p className="mt-2 text-[11px] text-[#5C786E] dark:text-[#8AA89F] leading-relaxed">
            {student.standingDescription}
          </p>
        </div>
      </div>

      {/* 4. Pending Requirements Checklist */}
      <div className="bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl shadow-xs p-4 sm:p-5 transition-colors">
        <h3 className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] uppercase tracking-wider pb-2.5 border-b border-[#E8F1ED] dark:border-[#10372F]">
          Pending Academic Items
        </h3>

        <div className="mt-3 space-y-2 text-xs">
          <div className="p-2.5 rounded-xl bg-[#F7FBF9] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] flex items-start gap-2">
            <Clock className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-[#0B3024] dark:text-[#F1FAF6] block">
                OEC-101 Term Evaluation
              </span>
              <span className="text-[10.5px] text-[#5C786E] dark:text-[#8AA89F]">
                3 credits pending final viva & presentation
              </span>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-[#F7FBF9] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] flex items-start gap-2">
            <Layers className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-[#0B3024] dark:text-[#F1FAF6] block">
                Semester VIII Capstone Registration
              </span>
              <span className="text-[10.5px] text-[#5C786E] dark:text-[#8AA89F]">
                Final 18 degree credits for Spring 2026
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Quick Actions Suite */}
      <div className="bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl shadow-xs p-4 sm:p-5 transition-colors">
        <h3 className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] uppercase tracking-wider pb-2.5 border-b border-[#E8F1ED] dark:border-[#10372F]">
          Quick Actions & Links
        </h3>

        <div className="mt-3 space-y-2">
          <button
            type="button"
            onClick={onDownloadGradeCard}
            className="w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6] bg-[#F7FBF9] dark:bg-[#06241F] hover:bg-emerald-50 dark:hover:bg-[#0B3024] hover:text-emerald-800 dark:hover:text-emerald-300 border border-[#D8E8E2] dark:border-[#16463D] transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-2">
              <Download className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Download Grade Card</span>
            </div>
            <ArrowRight className="w-3 h-3 text-[#5C786E] dark:text-[#8AA89F] group-hover:translate-x-0.5 transition-transform" />
          </button>

          <button
            type="button"
            onClick={onPrint}
            className="w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6] bg-[#F7FBF9] dark:bg-[#06241F] hover:bg-emerald-50 dark:hover:bg-[#0B3024] hover:text-emerald-800 dark:hover:text-emerald-300 border border-[#D8E8E2] dark:border-[#16463D] transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-2">
              <Printer className="w-3.5 h-3.5 text-[#5C786E] dark:text-[#8AA89F]" />
              <span>Print Academic Summary</span>
            </div>
            <ArrowRight className="w-3 h-3 text-[#5C786E] dark:text-[#8AA89F] group-hover:translate-x-0.5 transition-transform" />
          </button>

          <button
            type="button"
            onClick={onOpenTranscript}
            className="w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6] bg-[#F7FBF9] dark:bg-[#06241F] hover:bg-emerald-50 dark:hover:bg-[#0B3024] hover:text-emerald-800 dark:hover:text-emerald-300 border border-[#D8E8E2] dark:border-[#16463D] transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-2">
              <FileText className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>View Full Transcript</span>
            </div>
            <ArrowRight className="w-3 h-3 text-[#5C786E] dark:text-[#8AA89F] group-hover:translate-x-0.5 transition-transform" />
          </button>

          <Link
            href="/student/academics/timetable"
            className="w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6] bg-[#F7FBF9] dark:bg-[#06241F] hover:bg-emerald-50 dark:hover:bg-[#0B3024] hover:text-emerald-800 dark:hover:text-emerald-300 border border-[#D8E8E2] dark:border-[#16463D] transition-colors group"
          >
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Academic Timetable</span>
            </div>
            <ArrowRight className="w-3 h-3 text-[#5C786E] dark:text-[#8AA89F] group-hover:translate-x-0.5 transition-transform" />
          </Link>

          <Link
            href="/student/academics"
            className="w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6] bg-[#F7FBF9] dark:bg-[#06241F] hover:bg-emerald-50 dark:hover:bg-[#0B3024] hover:text-emerald-800 dark:hover:text-emerald-300 border border-[#D8E8E2] dark:border-[#16463D] transition-colors group"
          >
            <div className="flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5 text-[#5C786E] dark:text-[#8AA89F]" />
              <span>Academics Hub</span>
            </div>
            <ArrowRight className="w-3 h-3 text-[#5C786E] dark:text-[#8AA89F] group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
