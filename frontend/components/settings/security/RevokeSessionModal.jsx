"use client";

import { X, AlertTriangle, ShieldOff } from "lucide-react";

export default function RevokeSessionModal({ isOpen, session, onClose, onConfirm }) {
  if (!isOpen || !session) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-md rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-2xl p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/60 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <ShieldOff className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6]">
              Revoke Demo Session
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#658278] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] hover:bg-gray-100 dark:hover:bg-[#10372F] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-3">
          <p className="text-xs text-[#5C786E] dark:text-[#8AA89F] leading-relaxed">
            Are you sure you want to remove <span className="font-semibold text-[#0B3024] dark:text-[#F1FAF6]">{session.title}</span> from this device list?
          </p>

          <div className="p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/40 flex items-start gap-2.5 text-[11.5px] text-amber-900 dark:text-amber-200/90 leading-relaxed">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              <strong>Local Demo Notice:</strong> Revoking a demo session removes it from this local preview only; no server-side session invalidation occurs.
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-xl border border-[#D8E8E2] dark:border-[#16463D] text-xs font-semibold text-[#658278] dark:text-[#8AA89F] hover:bg-gray-50 dark:hover:bg-[#0A2A24] transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm(session.id);
              onClose();
            }}
            className="px-4 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            Revoke Session (Demo)
          </button>
        </div>
      </div>
    </div>
  );
}
