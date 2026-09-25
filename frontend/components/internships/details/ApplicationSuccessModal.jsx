"use client";

import { CheckCircle2, X, ArrowRight, Calendar, ShieldCheck, FileText } from "lucide-react";

export default function ApplicationSuccessModal({ applicationData, isOpen, onClose }) {
  if (!isOpen || !applicationData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md bg-[#FFFFFF] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] rounded-3xl shadow-2xl p-6 sm:p-7 text-center overflow-hidden transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Success Icon */}
        <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center mb-4">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <h3 className="text-lg font-black text-[#0B3024] dark:text-[#F1FAF6]">
          {applicationData.status === "Registration Confirmed"
            ? "You're Registered! 🎉"
            : "Application Submitted! 🎉"}
        </h3>

        <p className="text-xs text-[#55786B] dark:text-[#8FAFA4] mt-1.5 leading-relaxed">
          Your submission for <strong className="text-[#0B3024] dark:text-[#F1FAF6]">{applicationData.opportunityTitle}</strong> at <strong className="text-[#0B3024] dark:text-[#F1FAF6]">{applicationData.company}</strong> has been received successfully.
        </p>

        {/* Application Details Summary */}
        <div className="my-5 p-3.5 rounded-2xl bg-[#F7FBF9] dark:bg-[#031A16] border border-[#E8F1ED] dark:border-[#10372F] text-left text-xs space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-[#658278] dark:text-[#789991]">Reference ID:</span>
            <span className="font-mono font-bold text-[#159B72] dark:text-[#20D39B]">
              {applicationData.applicationId}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-[#658278] dark:text-[#789991]">Submitted Date:</span>
            <span className="font-semibold text-[#0B3024] dark:text-[#F1FAF6]">
              {applicationData.submittedAt}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-[#658278] dark:text-[#789991]">Next Step:</span>
            <span className="font-semibold text-[#0B3024] dark:text-[#F1FAF6] text-right">
              {applicationData.nextStep || "Review by Hiring Team"}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full py-2.5 px-4 rounded-xl bg-[#159B72] hover:bg-[#0F805D] text-white text-xs font-bold shadow-xs transition-all cursor-pointer flex items-center justify-center gap-1.5"
        >
          <span>Done</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
