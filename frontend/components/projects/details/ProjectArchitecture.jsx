"use client";

import {
  GitBranch,
  Layout,
  Server,
  Database,
  BrainCircuit,
  ArrowRight,
  ArrowDown,
  Sparkles,
  Check,
} from "lucide-react";

export default function ProjectArchitecture({ architecture }) {
  const layers = architecture?.layers || [
    {
      id: "client",
      name: "Frontend Layer",
      subtitle: "Next.js App Router + React",
      description: "Modern single-page application with responsive layouts and theme system.",
      badge: "Client UI",
      items: ["Server Components", "Tailwind CSS", "Lucide Icons", "Client Assemblers"],
    },
    {
      id: "api",
      name: "API & Middleware",
      subtitle: "Node.js + Express.js",
      description: "RESTful endpoints managing authentication, CRUD pipelines, and state checks.",
      badge: "API Gateway",
      items: ["JWT Token Auth", "Validation", "CORS Middleware", "Route Handlers"],
    },
    {
      id: "database",
      name: "Data & Storage",
      subtitle: "MongoDB Atlas + Mongoose",
      description: "Document models for user profiles, project records, notices, and activity logs.",
      badge: "Database",
      items: ["Mongoose ODM", "Index Pipelines", "Collections", "Relational Refs"],
    },
    {
      id: "ai",
      name: "Campus AI Engine",
      subtitle: "RAG + Vector Embeddings",
      description: "Retrieval Augmented Generation pipeline answering university-specific queries.",
      badge: "AI Pipeline",
      items: ["Context Retrieval", "Embeddings", "Prompt Engineering", "Streaming Responses"],
    },
  ];

  return (
    <section
      aria-label="Project Architecture"
      className="p-5 sm:p-6 md:p-7 rounded-2xl md:rounded-3xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-xs space-y-6"
    >
      {/* Header */}
      <div className="flex items-center gap-2.5 pb-3 border-b border-[#E8F3EE] dark:border-[#10372F]">
        <div className="w-8 h-8 rounded-xl bg-[#E8F7F1] dark:bg-[#0A2E27] text-[#159B72] dark:text-[#20D39B] flex items-center justify-center shrink-0">
          <GitBranch className="w-4 h-4" />
        </div>
        <div>
          <h2 className="text-base sm:text-lg font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight">
            System Architecture
          </h2>
          <p className="text-xs text-[#658278] dark:text-[#8BAEA3]">
            High-level application pipeline and data synchronization flow
          </p>
        </div>
      </div>

      {/* Visual Pipeline Diagram */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#E8F3EE] dark:border-[#10372F] space-y-4">
        <h3 className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#159B72] dark:text-[#20D39B]" />
          <span>Application Execution Pipeline</span>
        </h3>

        {/* 4 Connected Stages */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 relative">
          {layers.map((layer, idx) => {
            const isLast = idx === layers.length - 1;

            return (
              <div key={layer.id || idx} className="relative flex flex-col justify-between">
                <div className="p-4 rounded-xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-2xs h-full flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-mono">
                        Step 0{idx + 1}
                      </span>
                      <span className="text-[9.5px] px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-[#0C352C] text-[#159B72] dark:text-[#20D39B] font-semibold border border-[#159B72]/15">
                        {layer.badge}
                      </span>
                    </div>

                    <h4 className="text-xs sm:text-[13px] font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                      {layer.name}
                    </h4>
                    <p className="text-[11px] font-medium text-[#159B72] dark:text-[#20D39B] mt-0.5">
                      {layer.subtitle}
                    </p>
                    <p className="text-[10.5px] text-[#658278] dark:text-[#8BAEA3] mt-2 leading-relaxed">
                      {layer.description}
                    </p>
                  </div>

                  {/* Micro tags */}
                  {layer.items && (
                    <div className="flex flex-wrap gap-1 pt-1 border-t border-[#E8F3EE] dark:border-[#10372F]">
                      {layer.items.map((item, iIdx) => (
                        <span
                          key={iIdx}
                          className="px-1.5 py-0.5 rounded text-[9.5px] bg-[#F7FBF9] dark:bg-[#082A24] text-[#4C6B61] dark:text-[#A1C2B7] border border-[#D8E8E2]/60 dark:border-[#16463D]/60"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Arrow indicator between blocks on desktop */}
                {!isLast && (
                  <div className="hidden md:flex absolute -right-2 top-1/2 -translate-y-1/2 z-10 w-4 h-4 rounded-full bg-[#159B72] text-white items-center justify-center shadow-xs">
                    <ArrowRight className="w-2.5 h-2.5" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Campus AI Specialized Vector Flow */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-950/90 to-[#04201A] border border-emerald-800/40 text-white space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <BrainCircuit className="w-4 h-4 text-[#20D39B]" />
            <h4 className="text-xs sm:text-sm font-bold tracking-tight text-white">
              Campus AI — Intelligent Context Retrieval Loop
            </h4>
          </div>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#20D39B]/20 text-[#20D39B] border border-[#20D39B]/30">
            Vector RAG Active
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs text-white/85">
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
            <span className="block font-bold text-white mb-0.5">1. Structured Ingestion</span>
            <p className="text-[11px] text-white/70">
              Scrapes university circulars, academic syllabi, and departmental FAQs into vector chunks.
            </p>
          </div>
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
            <span className="block font-bold text-white mb-0.5">2. Semantic Similarity</span>
            <p className="text-[11px] text-white/70">
              Top-K cosine matching maps student queries to precise faculty instructions and timetable nodes.
            </p>
          </div>
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
            <span className="block font-bold text-white mb-0.5">3. Grounded Stream</span>
            <p className="text-[11px] text-white/70">
              Low-latency streaming response generated with verified campus citations and actionable links.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
