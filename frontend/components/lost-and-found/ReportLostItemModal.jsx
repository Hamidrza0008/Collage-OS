"use client";

import { useState, useEffect } from "react";
import { X, UploadCloud, AlertCircle } from "lucide-react";
import { LOST_FOUND_CATEGORIES, LOCATIONS_LIST } from "./lostFoundData";

export default function ReportLostItemModal({
  isOpen,
  onClose,
  onSubmitReport,
}) {
  const [formData, setFormData] = useState({
    title: "",
    category: "Electronics",
    description: "",
    location: "Library",
    date: new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }) + ", " + new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    tags: "",
    contactPhone: "+91 98765 43210",
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

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const tagsArray = formData.tags
      ? formData.tags.split(",").map((t) => t.trim()).filter(Boolean)
      : [formData.category, "Lost"];

    // Select suitable default image based on category
    let defaultImg = "/assets/lost-and-found/items/macbook-air.jpg";
    if (formData.category === "Clothing") {
      defaultImg = "/assets/lost-and-found/items/white-hoodie.jpg";
    } else if (formData.category === "Bags") {
      defaultImg = "/assets/lost-and-found/items/blue-backpack.jpg";
    } else if (formData.category === "Accessories") {
      defaultImg = "/assets/lost-and-found/items/black-wallet.jpg";
    } else if (formData.category === "Documents") {
      defaultImg = "/assets/lost-and-found/items/id-card.jpg";
    } else if (formData.category === "Others") {
      defaultImg = "/assets/lost-and-found/items/water-bottle.jpg";
    }

    const newItem = {
      id: `item-${Date.now()}`,
      status: "Lost",
      title: formData.title,
      description: formData.description,
      category: formData.category,
      tags: tagsArray,
      location: formData.location,
      locationCategory: formData.location,
      date: formData.date,
      rawDate: new Date().toISOString(),
      reportedBy: "Hamid Rza",
      contactEmail: "hamid.rza@college.edu",
      contactPhone: formData.contactPhone,
      views: 1,
      commentsCount: 0,
      image: defaultImg,
      actionLabel: "View Details →",
      isCurrentUser: true,
    };

    onSubmitReport(newItem);
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
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 flex items-center justify-center">
              <AlertCircle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                Report a Lost Item
              </h3>
              <p className="text-xs text-[#55786B] dark:text-[#9FB7AD] mt-0.5">
                Fill in the details to publish your missing item listing
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-[#082A24] text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto py-4 space-y-3.5 text-xs pr-1">
          {/* Title */}
          <div>
            <label className="block font-bold text-[#0B3024] dark:text-[#F1FAF6] mb-1">
              Item Name &amp; Model *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. MacBook Air M2 Space Grey or Silver Keys"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#D8E8E2] dark:border-[#16463D] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-hidden focus:border-[#159B72]"
            />
          </div>

          {/* Category & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-[#0B3024] dark:text-[#F1FAF6] mb-1">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#D8E8E2] dark:border-[#16463D] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-hidden focus:border-[#159B72]"
              >
                {LOST_FOUND_CATEGORIES.filter((c) => c.id !== "all").map((c) => (
                  <option key={c.id} value={c.label}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-[#0B3024] dark:text-[#F1FAF6] mb-1">
                Last Seen Location *
              </label>
              <select
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#D8E8E2] dark:border-[#16463D] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-hidden focus:border-[#159B72]"
              >
                {LOCATIONS_LIST.filter((l) => l !== "All").map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block font-bold text-[#0B3024] dark:text-[#F1FAF6] mb-1">
              Description &amp; Identifying Details *
            </label>
            <textarea
              rows={3}
              required
              placeholder="Describe color, size, unique marks, case, stickers, exact time..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#D8E8E2] dark:border-[#16463D] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-hidden focus:border-[#159B72]"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block font-bold text-[#0B3024] dark:text-[#F1FAF6] mb-1">
              Tags (comma separated)
            </label>
            <input
              type="text"
              placeholder="e.g. Laptop, Apple, SpaceGrey"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#D8E8E2] dark:border-[#16463D] text-[#0B3024] dark:text-[#F1FAF6] focus:outline-hidden focus:border-[#159B72]"
            />
          </div>

          {/* Image Upload Area */}
          <div>
            <label className="block font-bold text-[#0B3024] dark:text-[#F1FAF6] mb-1">
              Item Photo (Optional)
            </label>
            <div className="border-2 border-dashed border-[#D8E8E2] dark:border-[#16463D] rounded-xl p-4 text-center hover:bg-gray-50 dark:hover:bg-[#082A24] transition-colors cursor-pointer">
              <UploadCloud className="w-6 h-6 mx-auto text-[#159B72] dark:text-[#20D39B] mb-1" />
              <p className="text-xs text-[#55786B] dark:text-[#9FB7AD]">
                Click or drag &amp; drop reference photo
              </p>
              <p className="text-[10px] text-[#85A297] dark:text-[#65857B] mt-0.5">
                PNG, JPG or WEBP up to 5MB
              </p>
            </div>
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
              className="px-5 py-2 rounded-xl font-bold bg-[#159B72] hover:bg-[#0E825E] text-white transition-all cursor-pointer shadow-xs"
            >
              Post Lost Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
