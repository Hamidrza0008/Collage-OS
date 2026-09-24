"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Monitor,
  ExternalLink,
  Maximize2,
  Sparkles,
} from "lucide-react";
import GithubIcon from "./GithubIcon";
import MediaLightboxModal from "./MediaLightboxModal";

export default function ProjectPreview({ previews = [], demoUrl, githubUrl }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activePreviewIndex, setActivePreviewIndex] = useState(0);

  if (!previews || previews.length === 0) return null;

  const currentPreview = previews[activePreviewIndex] || previews[0];

  return (
    <section
      aria-label="Project Preview"
      className="p-5 sm:p-6 md:p-7 rounded-2xl md:rounded-3xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-xs space-y-5"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E8F3EE] dark:border-[#10372F]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#E8F7F1] dark:bg-[#0A2E27] text-[#159B72] dark:text-[#20D39B] flex items-center justify-center shrink-0">
            <Monitor className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
              Project Preview
            </h2>
            <p className="text-xs text-[#658278] dark:text-[#8BAEA3]">
              Visual showcase, interface snapshots, and live sandbox
            </p>
          </div>
        </div>

        {/* Action Buttons in header */}
        <div className="flex items-center gap-2">
          {demoUrl && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#159B72] hover:bg-[#0E825E] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <span>Live Demo</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#D8E8E2] dark:border-[#16463D] text-[#0B3024] dark:text-[#F1FAF6] text-xs font-semibold hover:bg-gray-50 dark:hover:bg-[#082A24] transition-colors cursor-pointer"
            >
              <GithubIcon className="w-3 h-3" />
              <span>GitHub</span>
            </a>
          )}
        </div>
      </div>

      {/* Main Large Showcase Window */}
      <div className="space-y-3">
        <div
          onClick={() => setSelectedImage(currentPreview)}
          className="group relative w-full h-56 sm:h-72 md:h-88 rounded-2xl overflow-hidden border border-[#D8E8E2] dark:border-[#16463D] bg-[#021512] cursor-pointer shadow-inner"
        >
          <Image
            src={currentPreview.src}
            alt={currentPreview.title}
            fill
            priority
            className="object-cover object-top transition-transform duration-500 group-hover:scale-102"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />

          {/* Enlarge Hint Badge */}
          <div className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-xl bg-black/60 backdrop-blur-md text-white text-[11px] font-medium flex items-center gap-1.5 shadow-sm opacity-90 group-hover:opacity-100 transition-all">
            <Maximize2 className="w-3.5 h-3.5 text-[#20D39B]" />
            <span>Click to Enlarge</span>
          </div>

          {/* Caption on Image */}
          <div className="absolute bottom-3.5 left-3.5 right-3.5 sm:bottom-4 sm:left-4 sm:right-4 text-white">
            <h3 className="text-xs sm:text-sm font-bold drop-shadow-sm">
              {currentPreview.title}
            </h3>
            <p className="text-[11px] text-white/80 line-clamp-1 drop-shadow-xs mt-0.5">
              {currentPreview.caption}
            </p>
          </div>
        </div>

        {/* Thumbnails Row if multiple previews */}
        {previews.length > 1 && (
          <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
            {previews.map((preview, idx) => (
              <button
                key={preview.id || idx}
                type="button"
                onClick={() => setActivePreviewIndex(idx)}
                className={`relative h-18 sm:h-22 rounded-xl overflow-hidden border-2 transition-all cursor-pointer text-left ${
                  activePreviewIndex === idx
                    ? "border-[#159B72] dark:border-[#20D39B] ring-2 ring-[#159B72]/20 shadow-xs scale-101"
                    : "border-[#E8F3EE] dark:border-[#10372F] opacity-75 hover:opacity-100"
                }`}
              >
                <Image
                  src={preview.src}
                  alt={preview.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
                <span className="absolute bottom-1 left-1.5 right-1.5 text-[9.5px] sm:text-[10px] text-white font-semibold truncate drop-shadow-xs">
                  {preview.title}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <MediaLightboxModal
        isOpen={Boolean(selectedImage)}
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </section>
  );
}
