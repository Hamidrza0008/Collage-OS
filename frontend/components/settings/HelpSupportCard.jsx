"use client";

import {
  Headphones,
  HelpCircle,
  MessageCircle,
  AlertTriangle,
  ChevronRight,
} from "lucide-react";

export default function HelpSupportCard({
  onOpenFaq,
  onOpenContact,
  onOpenReportIssue,
}) {
  return (
    <div className="rounded-2xl border border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#06241F] p-4 shadow-xs space-y-3">
      {/* Header */}
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
          <Headphones className="w-3.5 h-3.5" />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-[#0B3024] dark:text-[#F1FAF6]">
            Help &amp; Support
          </h2>
          <p className="text-[10.5px] text-[#658278] dark:text-[#789991]">
            Get help when you need it.
          </p>
        </div>
      </div>

      {/* List Options */}
      <div className="space-y-1.5 pt-1">
        {/* FAQs */}
        <button
          type="button"
          onClick={onOpenFaq}
          className="w-full text-left py-1.5 px-2 rounded-xl flex items-center justify-between hover:bg-[#F1F8F5] dark:hover:bg-[#0A2A24] transition-colors group cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
              <HelpCircle className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6] group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
                FAQs
              </div>
              <div className="text-[10.5px] text-[#658278] dark:text-[#789991]">
                Find answers to common questions
              </div>
            </div>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-[#658278] group-hover:text-emerald-600 dark:group-hover:text-emerald-300 group-hover:translate-x-0.5 transition-all shrink-0" />
        </button>

        {/* Contact Support */}
        <button
          type="button"
          onClick={onOpenContact}
          className="w-full text-left py-1.5 px-2 rounded-xl flex items-center justify-between hover:bg-[#F1F8F5] dark:hover:bg-[#0A2A24] transition-colors group cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
              <MessageCircle className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6] group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
                Contact Support
              </div>
              <div className="text-[10.5px] text-[#658278] dark:text-[#789991]">
                Get in touch with our team
              </div>
            </div>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-[#658278] group-hover:text-emerald-600 dark:group-hover:text-emerald-300 group-hover:translate-x-0.5 transition-all shrink-0" />
        </button>

        {/* Report an Issue */}
        <button
          type="button"
          onClick={onOpenReportIssue}
          className="w-full text-left py-1.5 px-2 rounded-xl flex items-center justify-between hover:bg-[#F1F8F5] dark:hover:bg-[#0A2A24] transition-colors group cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
              <AlertTriangle className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6] group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
                Report an Issue
              </div>
              <div className="text-[10.5px] text-[#658278] dark:text-[#789991]">
                Help us improve College OS
              </div>
            </div>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-[#658278] group-hover:text-emerald-600 dark:group-hover:text-emerald-300 group-hover:translate-x-0.5 transition-all shrink-0" />
        </button>
      </div>
    </div>
  );
}
