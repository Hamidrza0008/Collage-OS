"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X, ExternalLink } from "lucide-react";

export default function MediaLightboxModal({ isOpen, image, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !image) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full rounded-2xl bg-[#06241F] border border-[#16463D] overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-3.5 sm:p-4 border-b border-[#10372F] text-white">
          <div className="min-w-0 pr-4">
            <h3 className="text-xs sm:text-sm font-bold truncate">
              {image.title || "Project Screenshot Preview"}
            </h3>
            {image.caption && (
              <p className="text-[11px] text-white/70 truncate">{image.caption}</p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer shrink-0"
            title="Close preview"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Large Image Canvas */}
        <div className="relative w-full h-64 sm:h-96 md:h-[460px] bg-black/50 select-none">
          <Image
            src={image.src}
            alt={image.title || "Screenshot"}
            fill
            priority
            className="object-contain"
          />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-3 sm:p-3.5 border-t border-[#10372F] bg-[#031A16] text-[11px] text-white/75">
          <span>Click anywhere outside or press Esc to close</span>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
