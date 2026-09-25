"use client";

import { Ticket, QrCode, Download, Eye, Wallet } from "lucide-react";

export default function EventTicketCard({
  event,
  registrationId,
  studentName = "Hamid Rza",
  onViewFullPass,
  onDownloadPass,
  onAddToWallet,
}) {
  return (
    <div
      id="event-ticket-pass"
      className="w-full bg-[#FFFFFF] dark:bg-[#021512] border border-emerald-300 dark:border-emerald-800 rounded-2xl shadow-sm p-4 sm:p-5 transition-all space-y-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-2.5 border-b border-[#E8F1ED] dark:border-[#10372F]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-[#20D39B] flex items-center justify-center shrink-0">
            <Ticket className="w-3.5 h-3.5" />
          </div>
          <h3 className="text-xs sm:text-[13px] font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
            Your Digital Event Pass
          </h3>
        </div>

        <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-[#20D39B]">
          Verified
        </span>
      </div>

      {/* Stylized Event Ticket Graphic */}
      <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#06241F] via-[#021512] to-[#041D18] text-white border border-[#16463D] space-y-3 relative overflow-hidden shadow-inner">
        {/* Decorative circle punch holes on ticket sides */}
        <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white dark:bg-[#021512]" />
        <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white dark:bg-[#021512]" />

        {/* Top Info */}
        <div className="flex items-start justify-between gap-2 border-b border-white/10 pb-2.5">
          <div className="min-w-0">
            <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider block">
              Official Entry Pass
            </span>
            <h4 className="text-xs font-bold text-white truncate">{event.title}</h4>
            <p className="text-[10px] text-gray-300">{event.date}</p>
          </div>

          <div className="text-right shrink-0">
            <span className="text-[9px] uppercase font-bold text-gray-400 block">Pass ID</span>
            <span className="text-[10.5px] font-mono font-bold text-emerald-300">
              {registrationId || "EVT-2025-00482"}
            </span>
          </div>
        </div>

        {/* Student & Venue Details */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <span className="text-[9.5px] uppercase font-semibold text-gray-400 block">
              Attendee
            </span>
            <span className="font-bold text-white text-[11px] truncate block">
              {studentName}
            </span>
          </div>
          <div>
            <span className="text-[9.5px] uppercase font-semibold text-gray-400 block">Venue</span>
            <span className="font-bold text-white text-[11px] truncate block">
              {event.venue}
            </span>
          </div>
        </div>

        {/* Mock QR Code Graphic Box */}
        <div className="pt-2 border-t border-dashed border-white/15 flex items-center justify-between gap-3">
          <div className="w-14 h-14 rounded-lg bg-white p-1.5 flex items-center justify-center shrink-0 shadow-sm">
            <QrCode className="w-full h-full text-black stroke-[2]" />
          </div>

          <div className="text-right min-w-0">
            <span className="text-[10px] text-emerald-300 font-semibold block">
              Scan at Venue Turnstile
            </span>
            <span className="text-[9px] text-gray-400 block">Gate 1 • Fast Track Entrance</span>
          </div>
        </div>
      </div>

      {/* Ticket Action Buttons */}
      <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
        <button
          type="button"
          onClick={onViewFullPass}
          className="inline-flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-[#F8FAF9] dark:bg-[#041D18] hover:bg-emerald-50 dark:hover:bg-[#082A24] border border-[#D8E8E2] dark:border-[#10372F] font-semibold text-[#0B3024] dark:text-[#C5DCD4] transition-colors cursor-pointer"
        >
          <Eye className="w-3.5 h-3.5 text-emerald-600 dark:text-[#20D39B]" />
          <span>Full Pass</span>
        </button>

        <button
          type="button"
          onClick={onDownloadPass}
          className="inline-flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-[#F8FAF9] dark:bg-[#041D18] hover:bg-emerald-50 dark:hover:bg-[#082A24] border border-[#D8E8E2] dark:border-[#10372F] font-semibold text-[#0B3024] dark:text-[#C5DCD4] transition-colors cursor-pointer"
        >
          <Download className="w-3.5 h-3.5 text-emerald-600 dark:text-[#20D39B]" />
          <span>Download</span>
        </button>
      </div>

      <button
        type="button"
        onClick={onAddToWallet}
        className="w-full inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl bg-white dark:bg-[#06241F] hover:bg-gray-50 border border-gray-200 dark:border-[#10372F] text-[11px] font-semibold text-[#55786B] dark:text-[#8AA89F] transition-colors cursor-pointer"
      >
        <Wallet className="w-3.5 h-3.5 text-amber-500" />
        <span>Add to Apple / Google Wallet</span>
      </button>
    </div>
  );
}
