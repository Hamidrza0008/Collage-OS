"use client";

import { useEffect } from "react";
import {
  X,
  ClipboardList,
  FileText,
  GraduationCap,
  CheckCircle2,
  ExternalLink,
  Download,
  BookOpen,
  Sparkles,
} from "lucide-react";
import CompanyLogo from "./CompanyLogo";

export default function QuickActionModals({
  activeModal,
  onClose,
  appliedOpportunities = [],
  onSelectOpportunity,
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (activeModal) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeModal, onClose]);

  if (!activeModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg rounded-3xl bg-[#FFFFFF] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ================================================================= */}
        {/* 1. MY APPLICATIONS MODAL                                          */}
        {/* ================================================================= */}
        {activeModal === "my-applications" && (
          <div>
            <div className="px-5 py-4 border-b border-[#E8F1ED] dark:border-[#10372F] flex items-center justify-between bg-[#F7FBF9] dark:bg-[#082A24]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-[#159B72] dark:text-[#20D39B] flex items-center justify-center">
                  <ClipboardList className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                    My Applications &amp; Registrations
                  </h3>
                  <p className="text-[11px] text-[#658278] dark:text-[#789991]">
                    Track your current status across submitted opportunities
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-xl text-[#658278] hover:text-[#0B3024] dark:hover:text-[#F1FAF6]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 max-h-[70vh] overflow-y-auto space-y-2.5">
              {appliedOpportunities.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-800/40 flex items-center justify-center mx-auto text-[#159B72] mb-2">
                    <ClipboardList className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                    No applications submitted yet
                  </h4>
                  <p className="text-xs text-[#55786B] dark:text-[#8FAFA4] mt-1 max-w-xs mx-auto">
                    Browse internships and hackathons in the gallery to submit your first application.
                  </p>
                </div>
              ) : (
                appliedOpportunities.map((opp) => (
                  <div
                    key={opp.id}
                    onClick={() => {
                      onSelectOpportunity(opp.id);
                      onClose();
                    }}
                    className="group p-3 rounded-2xl border border-[#D8E8E2] dark:border-[#16463D] bg-[#F7FBF9] dark:bg-[#082A24] flex items-center justify-between gap-3 hover:border-[#159B72] cursor-pointer transition-all"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <CompanyLogo logoType={opp.logoType} className="w-8 h-8 shrink-0" />
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] group-hover:text-[#159B72] truncate">
                          {opp.title}
                        </h4>
                        <p className="text-[10.5px] text-[#658278] dark:text-[#789991] truncate">
                          {opp.company} &bull; {opp.duration || opp.date}
                        </p>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10.5px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-[#087A5B] dark:text-[#20D39B] shrink-0">
                      <CheckCircle2 className="w-3 h-3 text-[#159B72]" />
                      <span>{opp.type === "hackathon" ? "Registered" : "Applied"}</span>
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* 2. RESUME BUILDER MODAL                                           */}
        {/* ================================================================= */}
        {activeModal === "resume-builder" && (
          <div>
            <div className="px-5 py-4 border-b border-[#E8F1ED] dark:border-[#10372F] flex items-center justify-between bg-[#F7FBF9] dark:bg-[#082A24]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-[#159B72] dark:text-[#20D39B] flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                    College OS Resume Builder
                  </h3>
                  <p className="text-[11px] text-[#658278] dark:text-[#789991]">
                    Export your verified coursework, GPA, and projects into ATS formats
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-xl text-[#658278] hover:text-[#0B3024] dark:hover:text-[#F1FAF6]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs">
              <div className="p-3.5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40 space-y-1.5">
                <span className="font-bold text-[#0B3024] dark:text-[#F1FAF6] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Auto-populated from Hamid Rza&apos;s Profile
                </span>
                <p className="text-[11px] text-[#55786B] dark:text-[#8FAFA4] leading-relaxed">
                  Your B.Tech 7th Semester coursework, verified 8.24 CGPA, College OS project, and technical skill tags are automatically linked.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                  Available Formats
                </h4>
                <div className="p-3 rounded-xl border border-[#D8E8E2] dark:border-[#16463D] bg-[#F7FBF9] dark:bg-[#082A24] flex items-center justify-between">
                  <div>
                    <h5 className="font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                      Standard Single-Column ATS Template
                    </h5>
                    <p className="text-[10.5px] text-[#658278] dark:text-[#789991]">
                      Optimized for Google, Microsoft, and FAANG recruitment systems
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => alert("Downloading College_OS_Resume_Hamid_Rza.pdf")}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#159B72] hover:bg-[#087A5B] text-white font-bold transition-all shadow-xs cursor-pointer"
                  >
                    <Download className="w-3 h-3" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* 3. CAREER RESOURCES MODAL                                         */}
        {/* ================================================================= */}
        {activeModal === "career-resources" && (
          <div>
            <div className="px-5 py-4 border-b border-[#E8F1ED] dark:border-[#10372F] flex items-center justify-between bg-[#F7FBF9] dark:bg-[#082A24]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-[#159B72] dark:text-[#20D39B] flex items-center justify-center">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                    Campus Career Resources
                  </h3>
                  <p className="text-[11px] text-[#658278] dark:text-[#789991]">
                    Curated guides for coding interviews, hackathons, and placement prep
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-xl text-[#658278] hover:text-[#0B3024] dark:hover:text-[#F1FAF6]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-2.5 text-xs max-h-[70vh] overflow-y-auto">
              {[
                {
                  title: "Top 75 LeetCode & Striver DSA Sheet",
                  desc: "Comprehensive roadmap with pattern-based solutions in C++, Java, and Python.",
                  tag: "Algorithms",
                },
                {
                  title: "How to Win National Hackathons",
                  desc: "Ideation frameworks, pitch deck secrets, and prototype design strategies.",
                  tag: "Hackathons",
                },
                {
                  title: "System Design for College Undergrads",
                  desc: "Load balancers, caching, microservices, and database indexing demystified.",
                  tag: "System Design",
                },
              ].map((res, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-2xl border border-[#D8E8E2] dark:border-[#16463D] bg-[#F7FBF9] dark:bg-[#082A24] flex items-center justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="px-1.5 py-0.2 rounded text-[9.5px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-[#087A5B] dark:text-[#20D39B]">
                        {res.tag}
                      </span>
                    </div>
                    <h4 className="font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                      {res.title}
                    </h4>
                    <p className="text-[10.5px] text-[#658278] dark:text-[#789991] mt-0.5">
                      {res.desc}
                    </p>
                  </div>
                  <BookOpen className="w-4 h-4 text-[#159B72] shrink-0" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
