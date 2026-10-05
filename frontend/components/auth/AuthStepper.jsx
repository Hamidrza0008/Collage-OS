"use client";

import React from "react";
import { Check } from "lucide-react";

const STEPS = [
  { step: 1, label: "Verify Identity" },
  { step: 2, label: "Confirm Details" },
  { step: 3, label: "Set Password" },
];

export default function AuthStepper({ currentStep = 1 }) {
  return (
    <div className="w-full py-2">
      <div className="flex items-center justify-between relative">
        {STEPS.map((item, index) => {
          const isCompleted = currentStep > item.step;
          const isActive = currentStep === item.step;
          const isPending = currentStep < item.step;

          return (
            <React.Fragment key={item.step}>
              {/* Step Item */}
              <div className="flex items-center gap-2 relative z-10">
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition-all duration-300 ${
                    isCompleted
                      ? "bg-[#159B72] text-white shadow-xs"
                      : isActive
                      ? "bg-[#159B72] text-white ring-4 ring-[#DDF4EB] dark:ring-[#075A43]/50 shadow-xs"
                      : "bg-[#E6EFEA] dark:bg-[#0A2A24] text-[#658278] dark:text-[#789991]"
                  }`}
                >
                  {isCompleted ? <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" /> : item.step}
                </div>
                <span
                  className={`text-xs sm:text-[13px] font-semibold tracking-tight transition-colors duration-200 whitespace-nowrap ${
                    isActive
                      ? "text-[#0B3024] dark:text-[#F1FAF6]"
                      : isCompleted
                      ? "text-[#159B72] dark:text-[#20D39B]"
                      : "text-[#658278] dark:text-[#789991]"
                  }`}
                >
                  {item.label}
                </span>
              </div>

              {/* Connector line between steps */}
              {index < STEPS.length - 1 && (
                <div className="flex-1 mx-2 sm:mx-3 h-[2px] bg-[#E2EBE7] dark:bg-[#16463D] relative overflow-hidden">
                  <div
                    className={`h-full bg-[#159B72] dark:bg-[#20D39B] transition-all duration-500 ease-out ${
                      currentStep > item.step ? "w-full" : "w-0"
                    }`}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
