"use client";

import {
  Cpu,
  Layers,
  Code2,
  Database,
  Globe,
  ShieldCheck,
  Server,
  Palette,
  Terminal,
} from "lucide-react";

export default function ProjectTechStack({ techStack = [] }) {
  if (!techStack || techStack.length === 0) return null;

  const getTechIcon = (name, category) => {
    const n = name.toLowerCase();
    if (n.includes("next") || n.includes("react")) {
      return <Code2 className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />;
    }
    if (n.includes("node") || n.includes("express") || n.includes("fastapi")) {
      return <Server className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />;
    }
    if (n.includes("mongo") || n.includes("database") || n.includes("sql")) {
      return <Database className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-300" />;
    }
    if (n.includes("tailwind") || n.includes("css") || n.includes("motion")) {
      return <Palette className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />;
    }
    if (n.includes("jwt") || n.includes("auth") || n.includes("security")) {
      return <ShieldCheck className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />;
    }
    if (n.includes("api") || n.includes("rest") || n.includes("graphql")) {
      return <Globe className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />;
    }
    return <Cpu className="w-3.5 h-3.5 text-[#159B72] dark:text-[#20D39B]" />;
  };

  return (
    <section
      aria-label="Tech Stack"
      className="p-5 sm:p-6 md:p-7 rounded-2xl md:rounded-3xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-xs space-y-5"
    >
      {/* Header */}
      <div className="flex items-center gap-2.5 pb-3 border-b border-[#E8F3EE] dark:border-[#10372F]">
        <div className="w-8 h-8 rounded-xl bg-[#E8F7F1] dark:bg-[#0A2E27] text-[#159B72] dark:text-[#20D39B] flex items-center justify-center shrink-0">
          <Layers className="w-4 h-4" />
        </div>
        <div>
          <h2 className="text-base sm:text-lg font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
            Tech Stack &amp; Libraries
          </h2>
          <p className="text-xs text-[#658278] dark:text-[#8BAEA3]">
            Core frameworks, databases, and architectural building blocks
          </p>
        </div>
      </div>

      {/* Tech Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 sm:gap-3">
        {techStack.map((tech, idx) => (
          <div
            key={idx}
            className="p-3 rounded-2xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#E8F3EE] dark:border-[#10372F] hover:border-[#159B72]/40 dark:hover:border-[#20D39B]/40 transition-all flex flex-col justify-between group shadow-2xs"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-7 h-7 rounded-xl bg-white dark:bg-[#06241F] border border-[#D8E8E2]/60 dark:border-[#16463D]/60 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                {getTechIcon(tech.name, tech.category)}
              </div>
              {tech.badge && (
                <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-md bg-emerald-50 dark:bg-[#0C352C] text-[#159B72] dark:text-[#20D39B] border border-[#159B72]/15">
                  {tech.badge}
                </span>
              )}
            </div>

            <div>
              <h3 className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] leading-tight">
                {tech.name}
              </h3>
              <p className="text-[10px] text-[#658278] dark:text-[#8BAEA3] mt-0.5 truncate">
                {tech.category || "Core Module"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
