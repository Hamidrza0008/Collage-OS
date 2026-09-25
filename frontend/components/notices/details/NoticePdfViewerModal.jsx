"use client";

import { useState } from "react";
import {
  X,
  Download,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  ChevronLeft,
  ChevronRight,
  FileText,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export default function NoticePdfViewerModal({ file, notice, onClose, onDownload }) {
  const [zoomLevel, setZoomLevel] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!file) return null;

  const totalPages = file.pageCount || 3;

  const handleZoomIn = () => setZoomLevel((z) => Math.min(z + 15, 160));
  const handleZoomOut = () => setZoomLevel((z) => Math.max(z - 15, 70));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className={`relative w-full bg-[#FFFFFF] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden transition-all duration-200 ${
          isFullscreen ? "h-[98vh] max-w-[98vw]" : "max-w-4xl h-[90vh]"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header & Toolbar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-[#E8F1ED] dark:border-[#10372F] bg-[#F7FBF9] dark:bg-[#031A16] shrink-0">
          {/* File Name & Type */}
          <div className="flex items-center gap-2.5 min-w-0 pr-2">
            <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-950/70 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h3 className="text-xs sm:text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6] truncate">
                {file.name}
              </h3>
              <p className="text-[10.5px] text-[#658278] dark:text-[#789991] truncate">
                {file.size} &bull; Official Authenticated Circular
              </p>
            </div>
          </div>

          {/* Controls: Zoom, Pagination, Fullscreen, Close */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Zoom Controls */}
            <div className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] text-xs">
              <button
                type="button"
                onClick={handleZoomOut}
                disabled={zoomLevel <= 70}
                className="p-1 rounded text-gray-500 hover:text-gray-900 dark:hover:text-white disabled:opacity-40 cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="font-mono text-[11px] w-9 text-center font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                {zoomLevel}%
              </span>
              <button
                type="button"
                onClick={handleZoomIn}
                disabled={zoomLevel >= 160}
                className="p-1 rounded text-gray-500 hover:text-gray-900 dark:hover:text-white disabled:opacity-40 cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Page Navigation */}
            <div className="flex items-center gap-1 px-2 py-1 rounded-xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] text-xs">
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage <= 1}
                className="p-1 rounded text-gray-500 hover:text-gray-900 dark:hover:text-white disabled:opacity-40 cursor-pointer"
                title="Previous Page"
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
                className="p-1 rounded text-gray-500 hover:text-gray-900 dark:hover:text-white disabled:opacity-40 cursor-pointer"
                title="Next Page"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Download */}
            <button
              type="button"
              onClick={() => onDownload(file)}
              className="p-2 rounded-xl bg-[#159B72] hover:bg-[#0F805D] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              title="Download File"
            >
              <Download className="w-4 h-4" />
            </button>

            {/* Fullscreen Toggle */}
            <button
              type="button"
              onClick={() => setIsFullscreen((f) => !f)}
              className="p-2 rounded-xl text-gray-500 hover:text-gray-900 dark:hover:text-white bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] cursor-pointer"
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Close */}
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-gray-500 hover:text-gray-900 dark:hover:text-white bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] cursor-pointer"
              title="Close Preview"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Viewer Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-[#E5EBE8] dark:bg-[#02100E] flex justify-center items-start">
          <div
            style={{ width: `${Math.round(620 * (zoomLevel / 100))}px` }}
            className="bg-white text-[#111827] shadow-2xl rounded-lg p-8 sm:p-12 transition-all duration-150 relative min-h-[780px] flex flex-col justify-between"
          >
            {/* Watermark Seal */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.035]">
              <ShieldCheck className="w-96 h-96 text-emerald-900" />
            </div>

            {/* Document Header / Letterhead */}
            <div>
              <div className="text-center pb-5 border-b-2 border-emerald-900">
                <div className="text-[10px] tracking-widest font-black uppercase text-emerald-800">
                  COLLEGE OS AUTONOMOUS UNIVERSITY
                </div>
                <h2 className="text-base sm:text-lg font-black tracking-tight text-gray-900 mt-1 uppercase">
                  {notice?.department || "Office of Academic Affairs"}
                </h2>
                <div className="text-[10px] text-gray-600 mt-0.5 font-medium">
                  Central University Campus &bull; Accreditation Grade A++ &bull; NIRF Top 50
                </div>
              </div>

              {/* Reference & Date Line */}
              <div className="flex items-center justify-between pt-4 pb-3 text-[11px] font-mono border-b border-gray-200">
                <span>
                  <strong>Ref:</strong> {notice?.referenceNumber || "COS/GEN/2025/001"}
                </span>
                <span>
                  <strong>Date:</strong> {notice?.publishedAt?.split(",")[0] || "18 Aug 2025"}
                </span>
              </div>

              {/* Subject Title */}
              <div className="my-5">
                <span className="text-xs font-bold text-gray-700 uppercase tracking-wide">
                  Subject:
                </span>
                <h3 className="text-sm sm:text-[15px] font-bold text-gray-900 mt-1 leading-snug">
                  {notice?.title}
                </h3>
              </div>

              {/* Page Specific Text Content Simulation */}
              <div className="text-xs text-gray-800 leading-relaxed space-y-3.5">
                {currentPage === 1 && (
                  <>
                    <p className="font-serif leading-relaxed text-justify">
                      This official circular is hereby promulgated for the information and adherence of all concerned
                      students, faculty advisors, and departmental staff. As authorized by the Academic Council in its
                      session convened for the Autumn Term 2025, the following regulations and schedules shall stand in
                      full institutional force.
                    </p>
                    <p className="font-serif leading-relaxed text-justify">
                      All registered scholars are instructed to thoroughly examine their respective department syllabi,
                      timetables, and laboratory slot registries. Strict punctuality and professional academic decorum
                      are mandatory.
                    </p>
                    {notice?.sections?.map((sec, idx) => (
                      <div key={idx} className="mt-3">
                        <div className="font-bold text-gray-900">{sec.heading}</div>
                        <div className="font-serif text-[11.5px] mt-1 text-gray-700 leading-relaxed">
                          {sec.content}
                        </div>
                      </div>
                    ))}
                  </>
                )}

                {currentPage === 2 && (
                  <>
                    <div className="font-bold text-gray-900 border-b pb-1">
                      Section II — Compliance Directives & Specific Provisions
                    </div>
                    <p className="font-serif leading-relaxed text-justify text-[11.5px]">
                      1. Students with special medical exemptions or co-curricular sports duty permissions must file
                      formal authorization letters with the Dean of Student Affairs within three business days of this
                      issuance.
                    </p>
                    <p className="font-serif leading-relaxed text-justify text-[11.5px]">
                      2. Electronic submissions, portal acknowledgements, and examination slot locking mechanisms will
                      shut automatically at 11:59 PM on the declared closing date. No retrospective requests shall be
                      entertained.
                    </p>
                    <div className="p-3 bg-gray-50 border border-gray-200 rounded text-[11px] font-mono">
                      NOTE: Biometric verification remains synchronized with cloud attendance logs. Tampering or proxy
                      check-ins constitutes serious disciplinary misconduct.
                    </div>
                  </>
                )}

                {currentPage >= 3 && (
                  <>
                    <div className="font-bold text-gray-900 border-b pb-1">
                      Section III — Departmental Sign-off & Contact Directory
                    </div>
                    <p className="font-serif leading-relaxed text-justify text-[11.5px]">
                      Queries pertaining to this notification may be routed to the respective departmental grievance
                      cell or directly through the verified College OS Student Portal portal interface.
                    </p>
                    <div className="mt-8 pt-6 flex justify-between items-end">
                      <div className="text-[10.5px] text-gray-500 font-mono">
                        Page {currentPage} of {totalPages}
                        <br />
                        Digitally verified document
                      </div>
                      <div className="text-right">
                        <div className="font-serif italic font-bold text-sm text-emerald-900">
                          {notice?.author?.name || "Dr. Alok Nath Mukherjee"}
                        </div>
                        <div className="text-[11px] font-bold text-gray-800">
                          {notice?.author?.designation || "Principal & Academic Dean"}
                        </div>
                        <div className="text-[10px] text-gray-500">College OS University</div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Document Bottom Seal */}
            <div className="pt-6 mt-8 border-t border-gray-200 flex items-center justify-between text-[10px] text-gray-500 font-mono">
              <span>SECURITY HASH: 7F82A9C3E1B9440D</span>
              <span className="flex items-center gap-1 text-emerald-700 font-bold">
                <CheckCircle2 className="w-3 h-3" />
                OFFICIALLY SEALED
              </span>
              <span>PAGE {currentPage} / {totalPages}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
