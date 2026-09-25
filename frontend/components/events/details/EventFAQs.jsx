"use client";

import { useState } from "react";
import { HelpCircle, ChevronDown } from "lucide-react";

export default function EventFAQs({ faqs }) {
  const [openIndexes, setOpenIndexes] = useState({ 0: true });

  if (!faqs || faqs.length === 0) return null;

  const toggleAccordion = (idx) => {
    setOpenIndexes((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  return (
    <div className="w-full bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl shadow-xs p-5 sm:p-6 transition-all space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2 pb-3 border-b border-[#E8F1ED] dark:border-[#10372F]">
        <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-[#20D39B] flex items-center justify-center shrink-0">
          <HelpCircle className="w-4 h-4" />
        </div>
        <div>
          <h2 className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-[11px] text-[#5C786E] dark:text-[#8AA89F]">
            Common queries regarding eligibility, equipment, food, and rules
          </p>
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-2">
        {faqs.map((faq, idx) => {
          const isOpen = Boolean(openIndexes[idx]);

          return (
            <div
              key={idx}
              className="rounded-xl border border-[#E8F1ED] dark:border-[#10372F] bg-[#F8FAF9] dark:bg-[#041D18] overflow-hidden transition-colors"
            >
              <button
                type="button"
                onClick={() => toggleAccordion(idx)}
                className="w-full flex items-center justify-between p-3.5 text-left text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] hover:bg-emerald-50/50 dark:hover:bg-[#082A24] transition-colors cursor-pointer gap-3"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`w-4 h-4 text-emerald-600 dark:text-[#20D39B] shrink-0 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-3.5 pb-3.5 text-xs text-[#55786B] dark:text-[#8AA89F] leading-relaxed border-t border-gray-100 dark:border-[#10372F] pt-2 animate-in fade-in duration-150">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
