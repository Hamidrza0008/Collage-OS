"use client";

import { X, QrCode, Download, Printer, CheckCircle2 } from "lucide-react";

export default function EventTicketModal({
  isOpen,
  onClose,
  event,
  registrationId,
  studentName = "Hamid Rza",
  onDownloadPass,
}) {
  if (!isOpen || !event) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-3xl max-w-sm sm:max-w-md w-full shadow-2xl p-6 my-8 animate-in zoom-in-95 duration-150 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#E8F1ED] dark:border-[#10372F]">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-700 dark:text-[#20D39B]">
              Campus Event Pass
            </span>
            <h3 className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
              Official Entry Credential
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Big Ticket Pass Card */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-[#06241F] via-[#021512] to-[#082A24] text-white border border-[#16463D] space-y-4 shadow-xl relative overflow-hidden">
          {/* Watermark / Badge */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block">
                XYZ College of Engineering
              </span>
              <h4 className="text-base font-extrabold text-white mt-0.5">{event.title}</h4>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Verified
            </span>
          </div>

          {/* Details Table */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-[10px] uppercase font-semibold text-gray-400 block">Attendee</span>
              <span className="font-bold text-white text-xs">{studentName}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-semibold text-gray-400 block">Registration ID</span>
              <span className="font-mono font-bold text-emerald-300 text-xs">
                {registrationId || "EVT-2025-00482"}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-semibold text-gray-400 block">Date & Time</span>
              <span className="font-medium text-gray-200 text-[11px] block">{event.date}</span>
              <span className="text-[10px] text-gray-400">{event.time}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-semibold text-gray-400 block">Venue</span>
              <span className="font-medium text-gray-200 text-[11px] block">{event.venue}</span>
              <span className="text-[10px] text-gray-400">Gate 1 Entrance</span>
            </div>
          </div>

          {/* Big QR Centerpiece */}
          <div className="pt-3 border-t border-dashed border-white/20 text-center space-y-2">
            <div className="w-36 h-36 mx-auto bg-white rounded-2xl p-3 flex items-center justify-center shadow-lg">
              <QrCode className="w-full h-full text-black stroke-[2]" />
            </div>
            <p className="text-[10.5px] text-gray-300 font-medium">
              Present this code at the reception desk for instant badge printing.
            </p>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#E8F1ED] dark:border-[#10372F]">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-[#55786B] dark:text-[#8AA89F] hover:bg-gray-100 dark:hover:bg-[#082A24] transition-colors cursor-pointer"
          >
            Close
          </button>
          <button
            type="button"
            onClick={onDownloadPass}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white dark:bg-[#159B72] dark:hover:bg-[#108360] dark:text-[#021512] text-xs font-bold shadow-xs transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Pass</span>
          </button>
        </div>
      </div>
    </div>
  );
}
