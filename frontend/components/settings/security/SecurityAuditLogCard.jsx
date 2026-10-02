"use client";

import { History, Shield, Clock, CheckCircle2 } from "lucide-react";

export default function SecurityAuditLogCard({ auditLogs }) {
  return (
    <div className="rounded-2xl border border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#06241F] p-5 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
            <History className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm sm:text-[15px] font-bold text-[#0B3024] dark:text-[#F1FAF6] leading-tight">
              Security Activity &amp; Audit Trail
            </h2>
            <p className="text-[11px] text-[#658278] dark:text-[#789991]">
              Recent demo security events in this browser session.
            </p>
          </div>
        </div>

        <span className="text-[10px] font-semibold bg-gray-100 dark:bg-[#0A2A24] text-[#658278] dark:text-[#789991] px-2 py-0.5 rounded-full border border-[#D8E8E2] dark:border-[#16463D]">
          Simulated Trail
        </span>
      </div>

      {/* Logs Table / List */}
      <div className="space-y-2 pt-1">
        {auditLogs.map((log) => (
          <div
            key={log.id}
            className="p-3 rounded-xl border border-[#D8E8E2]/70 dark:border-[#16463D]/70 bg-[#F7FBF9] dark:bg-[#0A2A24] flex items-center justify-between gap-3 text-xs"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
              <div className="min-w-0">
                <div className="font-semibold text-[#0B3024] dark:text-[#F1FAF6] truncate">
                  {log.action}
                </div>
                <div className="text-[10.5px] text-[#658278] dark:text-[#789991]">
                  {log.category} • {log.device}
                </div>
              </div>
            </div>

            <div className="text-right shrink-0">
              <span className="text-[10px] font-medium text-[#658278] dark:text-[#789991]">
                {log.timestamp}
              </span>
              <div className="text-[9.5px] font-semibold text-emerald-700 dark:text-emerald-400">
                {log.status}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
