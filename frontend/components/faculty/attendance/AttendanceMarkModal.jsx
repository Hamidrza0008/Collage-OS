"use client";

import React, { useState } from "react";
import { X, Check, Search, CheckCircle2, UserCheck, AlertCircle } from "lucide-react";

const DEMO_ROSTER = [
  { roll: "22CS001", name: "Aarav Sharma", status: "P" },
  { roll: "22CS002", name: "Ananya Verma", status: "P" },
  { roll: "22CS003", name: "Arjun Reddy", status: "P" },
  { roll: "22CS004", name: "Bhavya Nair", status: "A" },
  { roll: "22CS005", name: "Chetan Gupta", status: "P" },
  { roll: "22CS006", name: "Dev Patel", status: "P" },
  { roll: "22CS007", name: "Divya Kapoor", status: "P" },
  { roll: "22CS008", name: "Farhan Ali", status: "A" },
  { roll: "22CS009", name: "Gayatri Joshi", status: "P" },
  { roll: "22CS010", name: "Hamid Rza", status: "P" },
  { roll: "22CS011", name: "Ishaan Malhotra", status: "L" },
  { roll: "22CS012", name: "Jaya Mishra", status: "P" },
  { roll: "22CS013", name: "Kunal Bansal", status: "P" },
  { roll: "22CS014", name: "Lavanya Rao", status: "A" },
  { roll: "22CS015", name: "Manish Tiwari", status: "P" },
];

export default function AttendanceMarkModal({ activeClass, onClose, onSaveSuccess }) {
  const [students, setStudents] = useState(DEMO_ROSTER);
  const [search, setSearch] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  if (!activeClass) return null;

  const toggleStatus = (roll, newStatus) => {
    setStudents((prev) =>
      prev.map((s) => (s.roll === roll ? { ...s, status: newStatus } : s))
    );
  };

  const markAll = (status) => {
    setStudents((prev) => prev.map((s) => ({ ...s, status })));
  };

  const presentCount = students.filter((s) => s.status === "P").length;
  const absentCount = students.filter((s) => s.status === "A").length;
  const lateCount = students.filter((s) => s.status === "L").length;

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.roll.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      if (onSaveSuccess) {
        onSaveSuccess(`Attendance for ${activeClass.fullName} marked: ${presentCount} Present, ${absentCount} Absent.`);
      }
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-2xl rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#F0F5F2] dark:border-[#0E352E] flex items-center justify-between bg-[#F7FBF9] dark:bg-[#082A24]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E6F7F0] dark:bg-[#073629] text-[#159B72] dark:text-[#20D39B] flex items-center justify-center font-bold">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6] leading-tight">
                Roll-Call Attendance: {activeClass.fullName}
              </h3>
              <p className="text-xs text-[#658278] dark:text-[#789991] mt-0.5">
                {activeClass.code} • {activeClass.batch} • Today&apos;s Lecture
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#658278] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar: Stats & Bulk Actions */}
        <div className="p-3 sm:p-4 border-b border-[#F0F5F2] dark:border-[#0E352E] bg-white dark:bg-[#06241F] flex flex-wrap items-center justify-between gap-3">
          {/* Real-time counters */}
          <div className="flex items-center gap-3 text-xs">
            <span className="font-bold text-[#0B3024] dark:text-[#F1FAF6]">
              Total: {students.length}
            </span>
            <span className="font-bold text-[#159B72] dark:text-[#20D39B] px-2 py-0.5 rounded-md bg-[#E6F7F0] dark:bg-[#073629]">
              Present: {presentCount}
            </span>
            <span className="font-bold text-[#DC2626] dark:text-[#F87171] px-2 py-0.5 rounded-md bg-[#FEE2E2] dark:bg-[#450A0A]">
              Absent: {absentCount}
            </span>
            {lateCount > 0 && (
              <span className="font-bold text-[#EA580C] px-2 py-0.5 rounded-md bg-[#FFF4E5] dark:bg-[#3D2509]">
                Late: {lateCount}
              </span>
            )}
          </div>

          {/* Quick Mark All Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => markAll("P")}
              className="px-2.5 py-1 text-xs font-bold rounded-lg bg-[#E6F7F0] text-[#159B72] dark:bg-[#073629] dark:text-[#20D39B] hover:opacity-80 transition-opacity"
            >
              All Present
            </button>
            <button
              type="button"
              onClick={() => markAll("A")}
              className="px-2.5 py-1 text-xs font-bold rounded-lg bg-[#FEE2E2] text-[#DC2626] dark:bg-[#450A0A] dark:text-[#F87171] hover:opacity-80 transition-opacity"
            >
              All Absent
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="px-4 py-2 border-b border-[#F0F5F2] dark:border-[#0E352E]">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#658278]" />
            <input
              type="text"
              placeholder="Filter by roll number or student name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-8.5 pl-8 pr-3 text-xs rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#D8E8E2] dark:border-[#10372F] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-hidden focus:border-[#159B72]"
            />
          </div>
        </div>

        {/* Student Roster List */}
        <div className="flex-1 overflow-y-auto divide-y divide-[#F0F5F2] dark:divide-[#0E352E] px-4 py-1">
          {filteredStudents.map((student) => (
            <div
              key={student.roll}
              className="py-2.5 flex items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="font-mono font-semibold text-[#658278] dark:text-[#789991] min-w-[70px]">
                  {student.roll}
                </span>
                <span className="font-bold text-[#0B3024] dark:text-[#F1FAF6] truncate">
                  {student.name}
                </span>
              </div>

              {/* Status Selector */}
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => toggleStatus(student.roll, "P")}
                  className={`w-7 h-7 rounded-lg font-bold text-xs flex items-center justify-center transition-all ${
                    student.status === "P"
                      ? "bg-[#159B72] text-white shadow-xs"
                      : "bg-[#F7FBF9] dark:bg-[#082A24] text-[#658278] hover:bg-[#E6F7F0]"
                  }`}
                  title="Present"
                >
                  P
                </button>
                <button
                  type="button"
                  onClick={() => toggleStatus(student.roll, "A")}
                  className={`w-7 h-7 rounded-lg font-bold text-xs flex items-center justify-center transition-all ${
                    student.status === "A"
                      ? "bg-[#DC2626] text-white shadow-xs"
                      : "bg-[#F7FBF9] dark:bg-[#082A24] text-[#658278] hover:bg-[#FEE2E2]"
                  }`}
                  title="Absent"
                >
                  A
                </button>
                <button
                  type="button"
                  onClick={() => toggleStatus(student.roll, "L")}
                  className={`w-7 h-7 rounded-lg font-bold text-xs flex items-center justify-center transition-all ${
                    student.status === "L"
                      ? "bg-[#EA580C] text-white shadow-xs"
                      : "bg-[#F7FBF9] dark:bg-[#082A24] text-[#658278] hover:bg-[#FFF4E5]"
                  }`}
                  title="Late"
                >
                  L
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-[#F0F5F2] dark:border-[#0E352E] bg-[#F7FBF9] dark:bg-[#082A24] flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-[#658278] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={isSaving}
            onClick={handleSave}
            className="px-5 py-2 rounded-xl bg-[#159B72] hover:bg-[#0E8561] text-white text-xs font-bold transition-all shadow-md shadow-[#159B72]/20 flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            {isSaving ? (
              <span>Saving Attendance...</span>
            ) : (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Save &amp; Submit Attendance</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
