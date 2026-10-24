"use client";

import React from "react";
import { Check } from "lucide-react";

const STEPS = [
  { step: 1, label: "Verify Identity" },
  { step: 2, label: "Confirm Details" },
  { step: 3, label: "Set Password" },
];

export default function AuthStepper({ currentStep = 1, steps = STEPS }) {
  return (
    <div className="w-full py-1">
      <div className="flex items-center justify-between relative">
        {steps.map((item, index) => {
          const isCompleted = currentStep > item.step;
          const isActive = currentStep === item.step;

          return (
            <React.Fragment key={item.step}>
              {/* Step Item */}
              <div className="flex items-center gap-1.5 sm:gap-2 relative z-10 shrink-0">
                <div
                  className={`w-6 h-6 sm:w-6.5 sm:h-6.5 rounded-full flex items-center justify-center text-[11px] sm:text-xs font-bold transition-all duration-300 ${
                    isCompleted
                      ? "bg-[#159B72] text-white shadow-2xs"
                      : isActive
                      ? "bg-[#159B72] text-white ring-2 sm:ring-3 ring-[#DDF4EB] dark:ring-[#075A43]/50 shadow-2xs"
                      : "bg-[#E6EFEA] dark:bg-[#0A2A24] text-[#658278] dark:text-[#789991]"
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2.5]" />
                  ) : (
                    item.step
                  )}
                </div>
                <span
                  className={`text-[11px] sm:text-xs font-semibold tracking-tight transition-colors duration-200 whitespace-nowrap ${
                    isActive
                      ? "text-[#0B3024] dark:text-[#F1FAF6]"
                      : isCompleted
                      ? "text-[#159B72] dark:text-[#20D39B]"
                      : "text-[#658278] dark:text-[#789991]"
                  }`}
                >
                  {isCompleted && item.step === 2 && item.label === "Confirm Details"
                    ? "✓ Confirm Details"
                    : isCompleted
                    ? `✓ ${item.label}`
                    : item.label}
                </span>
              </div>

              {/* Connector line between steps */}
              {index < steps.length - 1 && (
                <div className="flex-1 mx-1.5 sm:mx-2.5 h-[2px] bg-[#E2EBE7] dark:bg-[#16463D] relative overflow-hidden">
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
