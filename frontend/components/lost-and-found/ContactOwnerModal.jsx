"use client";

import { useState, useEffect } from "react";
import { X, Send, ShieldCheck } from "lucide-react";

export default function ContactOwnerModal({
  isOpen,
  onClose,
  item,
  onSubmitContact,
}) {
  const [formData, setFormData] = useState({
    name: "Hamid Rza",
    contact: "hamid.rza@college.edu",
    proof: "",
    message: "",
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !item) return null;

  const isFound = item.status.toLowerCase() === "found";

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitContact({
      itemId: item.id,
      itemTitle: item.title,
      ...formData,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-2xl p-5 sm:p-6 overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-[#D8E8E2] dark:border-[#16463D]">
          <div>
            <h3 className="text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
              {isFound ? "Claim Found Item" : "Contact Owner"}
            </h3>
            <p className="text-xs text-[#55786B] dark:text-[#9FB7AD] mt-0.5 truncate max-w-sm">
              Regarding: <strong>{item.title}</strong>
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-[#082A24] text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto py-4 space-y-3.5 text-xs">
          <div>
            <label className="block font-bold text-[#0B3024] dark:text-[#F1FAF6] mb-1">
              Your Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#D8E8E2] dark:border-[#16463D] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-hidden focus:border-[#159B72]"
            />
          </div>

          <div>
            <label className="block font-bold text-[#0B3024] dark:text-[#F1FAF6] mb-1">
              Contact Email / Phone
            </label>
            <input
              type="text"
              required
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#D8E8E2] dark:border-[#16463D] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-hidden focus:border-[#159B72]"
            />
          </div>

          {isFound && (
            <div>
              <label className="block font-bold text-[#0B3024] dark:text-[#F1FAF6] mb-1">
                Proof of Ownership / Identifying Details
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Serial number, wallpaper, scratches, specific stickers"
                value={formData.proof}
                onChange={(e) => setFormData({ ...formData, proof: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#D8E8E2] dark:border-[#16463D] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-hidden focus:border-[#159B72]"
              />
            </div>
          )}

          <div>
            <label className="block font-bold text-[#0B3024] dark:text-[#F1FAF6] mb-1">
              Message to {isFound ? "Finder" : "Owner"}
            </label>
            <textarea
              rows={3}
              required
              placeholder="Write a message explaining when and where you can meet to verify or hand over the item..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#D8E8E2] dark:border-[#16463D] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-hidden focus:border-[#159B72]"
            />
          </div>

          {/* Security Note */}
          <div className="p-3 rounded-xl bg-[#ECF9F4] dark:bg-[#082A24] border border-[#D8E8E2] dark:border-[#16463D] flex items-start gap-2.5 text-[11.5px] text-[#36594C] dark:text-[#9FB7AD]">
            <ShieldCheck className="w-4 h-4 text-[#159B72] dark:text-[#20D39B] shrink-0 mt-0.5" />
            <span>
              All lost and found inquiries are logged for student safety and campus verification. Always verify ownership in public campus areas.
            </span>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#D8E8E2] dark:border-[#16463D]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl font-semibold text-[#55786B] dark:text-[#9FB7AD] hover:bg-gray-100 dark:hover:bg-[#082A24] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl font-bold bg-[#159B72] hover:bg-[#0E825E] text-white transition-all cursor-pointer shadow-xs flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isFound ? "Send Claim Request" : "Send Message"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
