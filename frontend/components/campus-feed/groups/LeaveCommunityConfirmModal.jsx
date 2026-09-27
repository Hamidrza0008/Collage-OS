"use client";

import React from "react";
import { AlertTriangle, X, ShieldAlert } from "lucide-react";

export default function LeaveCommunityConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  communityName,
  role = "member",
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-white dark:bg-[#021512] border border-emerald-950/20 dark:border-emerald-500/20 rounded-2xl shadow-2xl p-6 relative overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="leave-modal-title"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-emerald-900/40 dark:text-emerald-100/40 hover:text-emerald-900 dark:hover:text-emerald-100 rounded-lg hover:bg-emerald-500/10 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-start gap-4">
          <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-500 flex-shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div className="space-y-1 pr-6">
            <h3
              id="leave-modal-title"
              className="text-lg font-bold text-emerald-950 dark:text-emerald-50"
            >
              Leave {communityName}?
            </h3>
            <p className="text-xs text-emerald-800/70 dark:text-emerald-100/60 leading-relaxed">
              You will no longer receive exclusive community announcements, event invites, or member-only notifications. You can rejoin anytime if membership remains open.
            </p>
          </div>
        </div>

        {role && role.toLowerCase() !== "member" && (
          <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center gap-2.5 text-amber-700 dark:text-amber-400 text-xs">
            <ShieldAlert className="w-4 h-4 flex-shrink-0" />
            <span>
              You currently hold the role of <strong>{role}</strong> in this club. Leaving may require transferring your responsibilities.
            </span>
          </div>
        )}

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-emerald-900 dark:text-emerald-100 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-950/60 rounded-xl transition-colors"
          >
            Keep Membership
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-sm transition-colors"
          >
            Leave Community
          </button>
        </div>
      </div>
    </div>
  );
}
