"use client";

import { useState } from "react";
import { BookOpen, Copy, Check, ChevronDown, ChevronUp } from "lucide-react";

export default function ProjectDocumentation({ documentation = [] }) {
  const [copiedId, setCopiedId] = useState(null);
  const [collapsed, setCollapsed] = useState({});

  const handleCopyCode = (id, text) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleSection = (id) => {
    setCollapsed((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (!documentation || documentation.length === 0) return null;

  return (
    <section
      aria-label="Project Documentation"
      className="p-5 sm:p-6 md:p-7 rounded-2xl md:rounded-3xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-xs space-y-5"
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#E8F3EE] dark:border-[#10372F]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#E8F7F1] dark:bg-[#0A2E27] text-[#159B72] dark:text-[#20D39B] flex items-center justify-center shrink-0">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
              Project Documentation
            </h2>
            <p className="text-xs text-[#658278] dark:text-[#8BAEA3]">
              Technical README and implementation specifications
            </p>
          </div>
        </div>

        <span className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-[#F0F8F5] dark:bg-[#082A24] text-[#159B72] dark:text-[#20D39B] border border-[#159B72]/20">
          README.md
        </span>
      </div>

      {/* Structured Document Content */}
      <div className="space-y-4 text-xs sm:text-[13px] leading-relaxed text-[#355248] dark:text-[#CBD5E1]">
        {documentation.map((doc, idx) => {
          const isCollapsed = collapsed[doc.id];
          const hasCodeBlock = doc.content.includes("```");

          return (
            <div
              key={doc.id || idx}
              className="rounded-2xl border border-[#E8F3EE] dark:border-[#10372F] bg-[#F7FBF9]/60 dark:bg-[#082A24]/40 overflow-hidden"
            >
              {/* Section Header */}
              <button
                type="button"
                onClick={() => toggleSection(doc.id)}
                className="w-full flex items-center justify-between p-3.5 sm:p-4 bg-white/70 dark:bg-[#06241F]/80 hover:bg-[#F0F8F5] dark:hover:bg-[#0A2E27] text-left transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold text-xs">
                    0{idx + 1}.
                  </span>
                  <h3 className="text-xs sm:text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                    {doc.title}
                  </h3>
                </div>
                {isCollapsed ? (
                  <ChevronDown className="w-4 h-4 text-[#658278]" />
                ) : (
                  <ChevronUp className="w-4 h-4 text-[#658278]" />
                )}
              </button>

              {/* Section Body */}
              {!isCollapsed && (
                <div className="p-4 sm:p-5 border-t border-[#E8F3EE] dark:border-[#10372F] space-y-3">
                  {hasCodeBlock ? (
                    renderWithCodeBlocks(doc.content, doc.id, copiedId, handleCopyCode)
                  ) : (
                    <div className="whitespace-pre-line leading-relaxed">
                      {renderFormattedText(doc.content)}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

/**
 * Parses markdown-like text with code blocks.
 */
function renderWithCodeBlocks(content, sectionId, copiedId, onCopy) {
  const parts = content.split(/(```[\s\S]*?```)/g);

  return parts.map((part, pIdx) => {
    if (part.startsWith("```") && part.endsWith("```")) {
      const lines = part.slice(3, -3).trim().split("\n");
      const code = lines.join("\n");
      const isCopied = copiedId === `${sectionId}-${pIdx}`;

      return (
        <div
          key={pIdx}
          className="relative my-3 rounded-xl overflow-hidden bg-[#021512] text-[#E6F4EE] border border-[#10372F] text-xs font-mono"
        >
          <div className="flex items-center justify-between px-3 py-1.5 bg-[#03201A] border-b border-[#10372F] text-[11px] text-[#7A9C91]">
            <span>Code / Architecture Spec</span>
            <button
              type="button"
              onClick={() => onCopy(`${sectionId}-${pIdx}`, code)}
              className="inline-flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
            >
              {isCopied ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
          <pre className="p-3.5 overflow-x-auto leading-relaxed">
            <code>{code}</code>
          </pre>
        </div>
      );
    }

    return (
      <div key={pIdx} className="whitespace-pre-line leading-relaxed">
        {renderFormattedText(part)}
      </div>
    );
  });
}

/**
 * Basic markdown headings & bold text parsing.
 */
function renderFormattedText(text) {
  return text.split("\n").map((line, idx) => {
    if (line.startsWith("### ")) {
      return (
        <h4
          key={idx}
          className="font-bold text-[#0B3024] dark:text-[#F1FAF6] text-xs sm:text-[13px] mt-3 mb-1"
        >
          {line.replace("### ", "")}
        </h4>
      );
    }
    if (line.startsWith("## ")) {
      return (
        <h3
          key={idx}
          className="font-bold text-[#0B3024] dark:text-[#F1FAF6] text-sm mt-3 mb-1"
        >
          {line.replace("## ", "")}
        </h3>
      );
    }
    if (line.startsWith("- ")) {
      return (
        <div key={idx} className="flex items-start gap-2 pl-2 my-1">
          <span className="text-[#159B72] dark:text-[#20D39B] font-bold">•</span>
          <span>{line.replace("- ", "")}</span>
        </div>
      );
    }
    if (line.match(/^\d+\.\s/)) {
      return (
        <div key={idx} className="flex items-start gap-2 pl-2 my-1">
          <span className="text-emerald-600 dark:text-emerald-400 font-semibold font-mono">
            {line.match(/^\d+\./)[0]}
          </span>
          <span>{line.replace(/^\d+\.\s/, "")}</span>
        </div>
      );
    }
    return line ? (
      <p key={idx} className="my-1.5 leading-relaxed">
        {line}
      </p>
    ) : (
      <div key={idx} className="h-1.5" />
    );
  });
}
