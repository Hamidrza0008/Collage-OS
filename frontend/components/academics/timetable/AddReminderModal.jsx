"use client";

import { useState } from "react";
import { X, Clock, Calendar, Check, Trash2 } from "lucide-react";

export default function AddReminderModal({
  isOpen,
  onClose,
  onSaveReminder,
  editingReminder = null,
  onDeleteReminder,
}) {
  const [title, setTitle] = useState(editingReminder?.title || "");
  const [date, setDate] = useState(editingReminder?.date || "2026-09-28");
  const [time, setTime] = useState(editingReminder?.time || "20:00");
  const [note, setNote] = useState(editingReminder?.note || "");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Please enter a reminder title.");
      return;
    }
    if (!date) {
      setError("Please select a date.");
      return;
    }

    // Format time display (e.g. "08:00 PM")
    let timeDisplay = time;
    if (time) {
      const [h, m] = time.split(":").map(Number);
      const ampm = h >= 12 ? "PM" : "AM";
      const formattedH = h % 12 || 12;
      timeDisplay = `${String(formattedH).padStart(2, "0")}:${String(m).padStart(2, "0")} ${ampm}`;
    }

    const payload = {
      id: editingReminder ? editingReminder.id : `rem-${Date.now()}`,
      title: title.trim(),
      date,
      time,
      timeDisplay,
      note: note.trim(),
      completed: editingReminder?.completed || false,
      createdAt: editingReminder?.createdAt || new Date().toISOString(),
    };

    onSaveReminder(payload);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl shadow-xl overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="reminder-modal-title"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 pb-3 border-b border-[#E8F1ED] dark:border-[#10372F] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#159B72] dark:text-[#20D39B]" />
            <h2
              id="reminder-modal-title"
              className="text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]"
            >
              {editingReminder ? "Edit Reminder" : "Add Personal Reminder"}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-[#5C786E] dark:text-[#8AA89F] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-5 space-y-3.5">
          {error && (
            <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs font-medium">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] mb-1">
              Reminder Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (error) setError("");
              }}
              placeholder="e.g. Revise DBMS Unit 3"
              className="w-full px-3 py-2 text-xs rounded-xl border border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#041D18] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-none focus:ring-1 focus:ring-[#159B72]"
              autoFocus
            />
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] mb-1">
                Date *
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#041D18] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-none focus:ring-1 focus:ring-[#159B72]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] mb-1">
                Time
              </label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#041D18] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-none focus:ring-1 focus:ring-[#159B72]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] mb-1">
              Personal Notes (Optional)
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add key revision topics or assignment notes..."
              rows={3}
              className="w-full px-3 py-2 text-xs rounded-xl border border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#041D18] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-none focus:ring-1 focus:ring-[#159B72] resize-none"
            />
          </div>

          {/* Footer buttons */}
          <div className="pt-3 border-t border-[#E8F1ED] dark:border-[#10372F] flex items-center justify-between">
            {editingReminder && onDeleteReminder ? (
              <button
                type="button"
                onClick={() => {
                  onDeleteReminder(editingReminder.id);
                  onClose();
                }}
                className="inline-flex items-center gap-1 text-xs text-rose-600 dark:text-rose-400 hover:underline cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            ) : (
              <span />
            )}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-1.5 rounded-xl border border-[#D8E8E2] dark:border-[#16463D] text-xs font-semibold text-[#5C786E] dark:text-[#8AA89F] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-xl bg-[#159B72] hover:bg-[#128360] text-white text-xs font-semibold shadow-xs cursor-pointer"
              >
                {editingReminder ? "Save Changes" : "Save Reminder"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
