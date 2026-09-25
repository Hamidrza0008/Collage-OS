"use client";

import { useState } from "react";
import { X, Download, ZoomIn, ZoomOut, Maximize2, Minimize2, ChevronLeft, ChevronRight, FileText, ShieldCheck } from "lucide-react";

export default function OpportunityDocViewerModal({ doc, opportunity, onClose, onDownload }) {
  const [zoomLevel, setZoomLevel] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!doc) return null;

  const totalPages = 3;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className={`relative w-full bg-[#FFFFFF] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden transition-all duration-200 ${
          isFullscreen ? "h-[98vh] max-w-[98vw]" : "max-w-4xl h-[90vh]"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-[#E8F1ED] dark:border-[#10372F] bg-[#F7FBF9] dark:bg-[#031A16] shrink-0">
          <div className="flex items-center gap-2.5 min-w-0 pr-2">
            <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-950/70 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h3 className="text-xs sm:text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6] truncate">
                {doc.name}
              </h3>
              <p className="text-[10.5px] text-[#658278] dark:text-[#789991] truncate">
                {opportunity?.company} &bull; Official Specification
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {/* Zoom Controls */}
            <div className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] text-xs">
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.max(z - 15, 70))}
                disabled={zoomLevel <= 70}
                className="p-1 text-gray-500 hover:text-gray-900 dark:hover:text-white disabled:opacity-40 cursor-pointer"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="font-mono text-[11px] w-9 text-center font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                {zoomLevel}%
              </span>
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.min(z + 15, 160))}
                disabled={zoomLevel >= 160}
                className="p-1 text-gray-500 hover:text-gray-900 dark:hover:text-white disabled:opacity-40 cursor-pointer"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Page Nav */}
            <div className="flex items-center gap-1 px-2 py-1 rounded-xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] text-xs">
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage <= 1}
                className="p-1 text-gray-500 hover:text-gray-900 dark:hover:text-white disabled:opacity-40 cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <span className="text-[11px] font-semibold text-[#0B3024] dark:text-[#F1FAF6] whitespace-nowrap">
                {currentPage} / {totalPages}
              </span>
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage >= totalPages}
                className="p-1 text-gray-500 hover:text-gray-900 dark:hover:text-white disabled:opacity-40 cursor-pointer"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              type="button"
              onClick={() => onDownload(doc)}
              className="p-2 rounded-xl bg-[#159B72] hover:bg-[#0F805D] text-white text-xs font-semibold shadow-xs cursor-pointer"
              title="Download File"
            >
              <Download className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setIsFullscreen((f) => !f)}
              className="p-2 rounded-xl text-gray-500 hover:text-gray-900 dark:hover:text-white bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] cursor-pointer"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-gray-500 hover:text-gray-900 dark:hover:text-white bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Document Simulation */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-[#E5EBE8] dark:bg-[#02100E] flex justify-center items-start">
          <div
            style={{ width: `${Math.round(620 * (zoomLevel / 100))}px` }}
            className="bg-white text-[#111827] shadow-2xl rounded-lg p-8 sm:p-12 transition-all duration-150 min-h-[750px] flex flex-col justify-between"
          >
            <div>
              <div className="text-center pb-4 border-b-2 border-emerald-800">
                <div className="text-[10px] tracking-widest font-black uppercase text-emerald-800">
                  {opportunity?.company?.toUpperCase()} CAREERS PROGRAM
                </div>
                <h2 className="text-base sm:text-lg font-black tracking-tight text-gray-900 mt-1 uppercase">
                  {opportunity?.title}
                </h2>
                <div className="text-[10.5px] text-gray-600 mt-0.5">
                  Official Recruitment & Participation Specification
                </div>
              </div>

              <div className="my-5 text-xs text-gray-800 leading-relaxed space-y-3 font-serif">
                <p className="text-justify font-bold text-gray-900">
                  Document Reference: {doc.name}
                </p>
                <p className="text-justify">
                  This document serves as the official specifications and participant guide for the {opportunity?.title}, hosted by {opportunity?.company}. All candidates must satisfy the eligibility criteria and comply with the hiring guidelines outlined herein.
                </p>
                <div className="p-3 bg-gray-50 border border-gray-200 rounded font-sans text-xs">
                  <strong>Duration:</strong> {opportunity?.duration} &bull; <strong>Location:</strong> {opportunity?.location}
                  <br />
                  <strong>Compensation:</strong> {opportunity?.stipend || opportunity?.prizePool}
                </div>
                <div className="font-sans font-bold text-gray-900 pt-2">
                  Key Directives & Terms:
                </div>
                <ul className="list-disc list-inside space-y-1 font-sans text-[11.5px] text-gray-700">
                  <li>Applications must be completed before {opportunity?.deadline}.</li>
                  <li>Applicants must be enrolled full-time students at an accredited institution.</li>
                  <li>Submission of fabricated resumes or credential fraud will disqualify candidates from all future campus drives.</li>
                </ul>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200 flex items-center justify-between text-[10px] text-gray-500 font-mono">
              <span className="flex items-center gap-1 text-emerald-700 font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                VERIFIED CAREER RECORD
              </span>
              <span>PAGE {currentPage} OF {totalPages}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
