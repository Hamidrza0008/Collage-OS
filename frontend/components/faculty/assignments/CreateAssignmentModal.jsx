"use client";

import React, { useState } from "react";
import { X, PlusCircle, Calendar, UploadCloud, Check } from "lucide-react";

export default function CreateAssignmentModal({ isOpen, onClose, onCreated }) {
  const [title, setTitle] = useState("");
  const [course, setCourse] = useState("DSA (CSE-301)");
  const [dueDate, setDueDate] = useState("2025-10-15");
  const [maxMarks, setMaxMarks] = useState("25");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      if (onCreated) {
        onCreated(`Assignment "${title}" created successfully for ${course}!`);
      }
      onClose();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#F0F5F2] dark:border-[#0E352E] flex items-center justify-between bg-[#F7FBF9] dark:bg-[#082A24]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#E6F7F0] dark:bg-[#073629] text-[#159B72] dark:text-[#20D39B] flex items-center justify-center font-bold">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0B3024] dark:text-[#F1FAF6] leading-tight">
                Create New Assignment
              </h3>
              <p className="text-xs text-[#658278] dark:text-[#789991] mt-0.5">
                Publish a coursework task to your assigned students.
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-5 space-y-4 text-xs">
          <div>
            <label className="block font-bold text-[#0B3024] dark:text-[#F1FAF6] mb-1">
              Assignment Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Graph Algorithms - Breadth First Search"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full h-9 px-3 rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#D8E8E2] dark:border-[#10372F] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-hidden focus:border-[#159B72]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-[#0B3024] dark:text-[#F1FAF6] mb-1">
                Target Class
              </label>
              <select
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                className="w-full h-9 px-3 rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#D8E8E2] dark:border-[#10372F] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-hidden focus:border-[#159B72]"
              >
                <option value="DSA (CSE-301)">DSA (CSE-301)</option>
                <option value="Web Dev (CSE-302)">Web Dev (CSE-302)</option>
                <option value="DBMS (CSE-303)">DBMS (CSE-303)</option>
                <option value="CN (CSE-304)">CN (CSE-304)</option>
                <option value="OS (CSE-305)">OS (CSE-305)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-[#0B3024] dark:text-[#F1FAF6] mb-1">
                Maximum Score
              </label>
              <input
                type="number"
                min="5"
                max="100"
                value={maxMarks}
                onChange={(e) => setMaxMarks(e.target.value)}
                className="w-full h-9 px-3 rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#D8E8E2] dark:border-[#10372F] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-hidden focus:border-[#159B72]"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-[#0B3024] dark:text-[#F1FAF6] mb-1">
              Due Date &amp; Deadline
            </label>
            <div className="relative">
              <input
                type="date"
                required
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full h-9 px-3 rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#D8E8E2] dark:border-[#10372F] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-hidden focus:border-[#159B72]"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-[#0B3024] dark:text-[#F1FAF6] mb-1">
              Instructions &amp; Problem Statement
            </label>
            <textarea
              rows="3"
              placeholder="Outline specific objectives, constraints, submission file format (PDF/Zip), and grading criteria..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#D8E8E2] dark:border-[#10372F] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-hidden focus:border-[#159B72] resize-none"
            />
          </div>

          {/* Footer */}
          <div className="pt-3 border-t border-[#F0F5F2] dark:border-[#0E352E] flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[#658278] hover:text-[#0B3024] dark:hover:text-[#F1FAF6]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 rounded-xl bg-[#159B72] hover:bg-[#0E8561] text-white text-xs font-bold transition-all shadow-md shadow-[#159B72]/20 flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Publishing Assignment...</span>
              ) : (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Publish Assignment</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
