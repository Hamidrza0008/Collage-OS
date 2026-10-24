"use client";

import React, { useState } from "react";
import {
  X,
  CalendarClock,
  UserCheck,
  CheckCircle2,
  Loader2,
  Info,
} from "lucide-react";
import { FACULTY_SUBSTITUTE_CANDIDATES } from "./facultyTimetableData";

export default function ScheduleChangeModal({
  isOpen,
  onClose,
  initialClass,
  availableClasses = [],
  onSubmitRequest,
}) {
  const [selectedClassId, setSelectedClassId] = useState(
    () => initialClass?.id || availableClasses[0]?.id || ""
  );
  const [requestType, setRequestType] = useState("reschedule"); // "reschedule" | "substitute"
  const [proposedDate, setProposedDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  });
  const [proposedTimeSlot, setProposedTimeSlot] = useState("09:00 - 10:00");
  const [proposedRoom, setProposedRoom] = useState("Room 301, A-Block");
  const [substituteFacultyId, setSubstituteFacultyId] = useState(
    () => FACULTY_SUBSTITUTE_CANDIDATES[0]?.id || ""
  );
  const [reasonCategory, setReasonCategory] = useState("academic-meeting");
  const [detailedReason, setDetailedReason] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(null);

  if (!isOpen) return null;

  const currentClass =
    availableClasses.find((c) => c.id === selectedClassId) || initialClass;

  const validate = () => {
    const errs = {};
    if (!selectedClassId) {
      errs.class = "Please select a class to change.";
    }
    if (requestType === "reschedule") {
      if (!proposedDate) {
        errs.date = "Proposed date is required.";
      }
      if (!proposedTimeSlot) {
        errs.timeSlot = "Proposed time slot is required.";
      }
    }
    if (requestType === "substitute") {
      if (!substituteFacultyId) {
        errs.substitute = "Please select a preferred substitute faculty.";
      }
    }
    if (!detailedReason.trim()) {
      errs.reason = "Please state a brief justification for this academic adjustment.";
    } else if (detailedReason.trim().length < 10) {
      errs.reason = "Justification must be at least 10 characters long.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 600));

    const referenceId = `SCH-REQ-${new Date().getFullYear()}-${Math.floor(
      1000 + Math.random() * 9000
    )}`;

    const payload = {
      referenceId,
      classId: selectedClassId,
      classInfo: currentClass,
      requestType,
      proposedDate: requestType === "reschedule" ? proposedDate : null,
      proposedTimeSlot: requestType === "reschedule" ? proposedTimeSlot : null,
      proposedRoom: requestType === "reschedule" ? proposedRoom : null,
      substituteFaculty:
        requestType === "substitute"
          ? FACULTY_SUBSTITUTE_CANDIDATES.find((s) => s.id === substituteFacultyId)
          : null,
      reasonCategory,
      detailedReason,
      status: "Pending HOD / Academic Dean Approval",
      createdAt: new Date().toISOString(),
    };

    setIsSubmitting(false);
    setSubmissionSuccess(payload);
    onSubmitRequest?.(payload);
  };

  const handleResetAndClose = () => {
    setSubmissionSuccess(null);
    setErrors({});
    setDetailedReason("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[92vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="schedule-change-title"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#F0F5F2] dark:border-[#0E352E] flex items-center justify-between bg-[#F7FBF9] dark:bg-[#082A24]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#E6F7F0] dark:bg-[#073629] text-[#159B72] dark:text-[#20D39B] flex items-center justify-center shrink-0">
              <CalendarClock className="w-5 h-5" />
            </div>
            <div>
              <h3
                id="schedule-change-title"
                className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]"
              >
                Request Schedule Adjustment
              </h3>
              <p className="text-[11px] text-[#658278] dark:text-[#789991]">
                Academic Timetable Office • CSMU Faculty Governance
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleResetAndClose}
            className="p-1.5 rounded-lg text-[#658278] hover:text-[#0B3024] dark:text-[#789991] dark:hover:text-[#F1FAF6] hover:bg-[#E8F1ED] dark:hover:bg-[#10372F] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Success View */}
        {submissionSuccess ? (
          <div className="p-6 space-y-4 text-center">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-[#159B72] dark:text-[#20D39B] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h4 className="text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                Schedule Adjustment Request Lodged
              </h4>
              <p className="text-xs text-[#658278] dark:text-[#789991] max-w-sm mx-auto">
                Your request has been routed to the Department Head &amp; Dean of Academic Affairs.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#D8E8E2] dark:border-[#10372F] text-left text-xs space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[#658278] dark:text-[#789991]">Reference Code:</span>
                <span className="font-mono font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                  {submissionSuccess.referenceId}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#658278] dark:text-[#789991]">Type:</span>
                <span className="font-bold text-[#159B72] dark:text-[#20D39B] capitalize">
                  {submissionSuccess.requestType === "reschedule" ? "Reschedule Lecture" : "Substitute Faculty"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#658278] dark:text-[#789991]">Target Class:</span>
                <span className="font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                  {submissionSuccess.classInfo?.courseCode} ({submissionSuccess.classInfo?.batch})
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#658278] dark:text-[#789991]">Status:</span>
                <span className="px-2 py-0.5 rounded-md text-[10.5px] font-bold bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300">
                  Pending HOD Sign-off
                </span>
              </div>
            </div>

            <p className="text-[11px] text-[#658278] dark:text-[#789991]">
              * Note: Enrolled students will be automatically notified via Campus Feed once HOD authorization is logged.
            </p>

            <button
              type="button"
              onClick={handleResetAndClose}
              className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-[#159B72] hover:bg-[#0E8561] transition-all shadow-md shadow-[#159B72]/20 cursor-pointer"
            >
              Done &amp; Return to Timetable
            </button>
          </div>
        ) : (
          /* Structured Form */
          <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
            <div className="p-5 sm:p-6 space-y-4 overflow-y-auto text-xs sm:text-[13px] flex-1">
              {/* Institutional Notice */}
              <div className="p-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/40 text-blue-800 dark:text-blue-300 flex items-start gap-2.5 text-[11.5px]">
                <Info className="w-4 h-4 shrink-0 mt-0.5 text-blue-600 dark:text-blue-400" />
                <span>
                  Schedule changes must be proposed at least 24 hours in advance to ensure classroom conflict checks and student notification broadcasts.
                </span>
              </div>

              {/* Step 1: Select Class */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#658278] dark:text-[#789991] block">
                  Select Teaching Session *
                </label>
                <select
                  value={selectedClassId}
                  onChange={(e) => setSelectedClassId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-xs font-semibold bg-[#F7FBF9] dark:bg-[#082A24] border border-[#D8E8E2] dark:border-[#16463D] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-none focus:ring-2 focus:ring-[#159B72]/30 cursor-pointer"
                >
                  {availableClasses.map((cls) => (
                    <option key={cls.id} value={cls.id}>
                      {cls.day} • {cls.startTime} - {cls.endTime} • {cls.courseCode} ({cls.batch}) - {cls.subjectName}
                    </option>
                  ))}
                </select>
                {errors.class && (
                  <p className="text-[11px] text-rose-500 font-semibold">{errors.class}</p>
                )}
              </div>

              {/* Step 2: Request Type Toggle */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#658278] dark:text-[#789991] block">
                  Adjustment Type *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRequestType("reschedule")}
                    className={`p-2.5 rounded-xl border text-center font-bold text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      requestType === "reschedule"
                        ? "bg-[#159B72] text-white border-[#159B72] shadow-xs"
                        : "bg-[#F7FBF9] dark:bg-[#082A24] text-[#4A6B60] dark:text-[#8AAEA1] border-[#D8E8E2] dark:border-[#10372F]"
                    }`}
                  >
                    <CalendarClock className="w-3.5 h-3.5" />
                    <span>Reschedule Slot</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRequestType("substitute")}
                    className={`p-2.5 rounded-xl border text-center font-bold text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      requestType === "substitute"
                        ? "bg-[#159B72] text-white border-[#159B72] shadow-xs"
                        : "bg-[#F7FBF9] dark:bg-[#082A24] text-[#4A6B60] dark:text-[#8AAEA1] border-[#D8E8E2] dark:border-[#10372F]"
                    }`}
                  >
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>Assign Substitute</span>
                  </button>
                </div>
              </div>

              {/* Step 3A: Reschedule Fields */}
              {requestType === "reschedule" && (
                <div className="space-y-3 p-3.5 rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#D8E8E2] dark:border-[#16463D]">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="text-[10.5px] font-bold text-[#658278] dark:text-[#789991] block mb-1">
                        Proposed New Date *
                      </label>
                      <input
                        type="date"
                        value={proposedDate}
                        onChange={(e) => setProposedDate(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg text-xs bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-none focus:ring-1 focus:ring-[#159B72]"
                      />
                      {errors.date && (
                        <p className="text-[10px] text-rose-500 font-semibold mt-0.5">{errors.date}</p>
                      )}
                    </div>

                    <div>
                      <label className="text-[10.5px] font-bold text-[#658278] dark:text-[#789991] block mb-1">
                        Proposed Time Slot *
                      </label>
                      <select
                        value={proposedTimeSlot}
                        onChange={(e) => setProposedTimeSlot(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg text-xs bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-none focus:ring-1 focus:ring-[#159B72]"
                      >
                        <option value="09:00 - 10:00">09:00 AM - 10:00 AM</option>
                        <option value="10:15 - 11:15">10:15 AM - 11:15 AM</option>
                        <option value="11:30 - 12:30">11:30 AM - 12:30 PM</option>
                        <option value="14:00 - 15:00">02:00 PM - 03:00 PM</option>
                        <option value="15:15 - 16:15">03:15 PM - 04:15 PM</option>
                        <option value="16:00 - 17:00">04:00 PM - 05:00 PM</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10.5px] font-bold text-[#658278] dark:text-[#789991] block mb-1">
                      Target Classroom / Lab
                    </label>
                    <input
                      type="text"
                      value={proposedRoom}
                      onChange={(e) => setProposedRoom(e.target.value)}
                      placeholder="e.g. Room 301 or Lab 2"
                      className="w-full px-3 py-1.5 rounded-lg text-xs bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-none focus:ring-1 focus:ring-[#159B72]"
                    />
                  </div>
                </div>
              )}

              {/* Step 3B: Substitute Faculty Preference */}
              {requestType === "substitute" && (
                <div className="space-y-2 p-3.5 rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#D8E8E2] dark:border-[#16463D]">
                  <label className="text-[10.5px] font-bold text-[#658278] dark:text-[#789991] block mb-1">
                    Nominate Substitute Faculty *
                  </label>
                  <select
                    value={substituteFacultyId}
                    onChange={(e) => setSubstituteFacultyId(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg text-xs bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-none focus:ring-1 focus:ring-[#159B72]"
                  >
                    {FACULTY_SUBSTITUTE_CANDIDATES.map((f) => (
                      <option key={f.id} value={f.id}>
                        {f.name} ({f.department})
                      </option>
                    ))}
                  </select>
                  <p className="text-[10.5px] text-[#658278] dark:text-[#789991]">
                    * The nominated colleague will receive an invitation to accept this substitute duty.
                  </p>
                </div>
              )}

              {/* Step 4: Reason Category */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#658278] dark:text-[#789991] block">
                  Reason Category *
                </label>
                <select
                  value={reasonCategory}
                  onChange={(e) => setReasonCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-xs font-semibold bg-[#F7FBF9] dark:bg-[#082A24] border border-[#D8E8E2] dark:border-[#16463D] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-none focus:ring-2 focus:ring-[#159B72]/30 cursor-pointer"
                >
                  <option value="academic-meeting">Academic / Department Meeting</option>
                  <option value="research-conference">Research Conference / Paper Presentation</option>
                  <option value="university-duty">University / External Exam Evaluation Duty</option>
                  <option value="medical-leave">Medical Emergency / Sick Leave</option>
                  <option value="lab-maintenance">Laboratory Server / Network Maintenance</option>
                  <option value="other">Other Official Reason</option>
                </select>
              </div>

              {/* Step 5: Justification Details */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#658278] dark:text-[#789991] block">
                  Detailed Justification *
                </label>
                <textarea
                  rows={3}
                  value={detailedReason}
                  onChange={(e) => setDetailedReason(e.target.value)}
                  placeholder="Provide context for academic auditing and syllabus completion tracking..."
                  className="w-full px-3 py-2 rounded-xl text-xs bg-[#F7FBF9] dark:bg-[#082A24] border border-[#D8E8E2] dark:border-[#16463D] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-none focus:ring-2 focus:ring-[#159B72]/30"
                />
                {errors.reason && (
                  <p className="text-[11px] text-rose-500 font-semibold">{errors.reason}</p>
                )}
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-4 sm:p-5 border-t border-[#F0F5F2] dark:border-[#0E352E] bg-[#FAFDFB] dark:bg-[#051D18] flex items-center justify-end gap-2.5">
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleResetAndClose}
                className="px-4 py-2 rounded-xl text-xs font-bold text-[#36594C] dark:text-[#A7C8BD] bg-[#F1F8F5] dark:bg-[#082A24] hover:bg-[#E8F1ED] transition-colors cursor-pointer disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#159B72] hover:bg-[#0E8561] active:scale-98 shadow-md shadow-[#159B72]/20 flex items-center gap-2 transition-all cursor-pointer disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Lodge Request...</span>
                  </>
                ) : (
                  <>
                    <CalendarClock className="w-4 h-4" />
                    <span>Submit Schedule Request</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
