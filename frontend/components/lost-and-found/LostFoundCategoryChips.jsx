"use client";

import {
  Inbox,
  Laptop,
  Briefcase,
  FileText,
  Shirt,
  Watch,
  MoreHorizontal,
} from "lucide-react";
import { LOST_FOUND_CATEGORIES } from "./lostFoundData";

const CATEGORY_ICONS = {
  all: Inbox,
  electronics: Laptop,
  bags: Briefcase,
  documents: FileText,
  clothing: Shirt,
  accessories: Watch,
  others: MoreHorizontal,
};

export default function LostFoundCategoryChips({
  selectedCategory,
  onSelectCategory,
}) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1.5 pt-1 scrollbar-none no-scrollbar">
      {LOST_FOUND_CATEGORIES.map((cat) => {
        const isSelected =
          (selectedCategory || "all").toLowerCase() === cat.id.toLowerCase();
        const Icon = CATEGORY_ICONS[cat.id] || Inbox;

        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelectCategory(cat.label)}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all cursor-pointer shadow-2xs ${
              isSelected
                ? "bg-[#159B72] text-white shadow-sm shadow-[#159B72]/20"
                : "bg-white dark:bg-[#06241F] text-[#36594C] dark:text-[#B5CCC5] border border-[#D8E8E2] dark:border-[#16463D] hover:border-[#159B72]/50 hover:bg-[#F1F8F5] dark:hover:bg-[#082A24]"
            }`}
          >
            <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-white" : "text-[#159B72] dark:text-[#20D39B]"}`} />
            <span>{cat.label}</span>
          </button>
        );
      })}
    </div>
  );
}
