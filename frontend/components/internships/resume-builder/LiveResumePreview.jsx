"use client";

import React, { useState } from "react";
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  Printer,
  Globe,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
} from "lucide-react";

function GithubIcon({ className = "w-3 h-3" }) {
  return (
    <svg className={`${className} fill-current`} viewBox="0 0 24 24">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon({ className = "w-3 h-3" }) {
  return (
    <svg className={`${className} fill-current`} viewBox="0 0 24 24">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

export default function LiveResumePreview({
  resume,
  onPrint,
}) {
  const [zoom, setZoom] = useState(100);

  const {
    template = "modern",
    header = {},
    summary = "",
    skills = [],
    experience = [],
    projects = [],
    education = {},
    achievements = [],
    certifications = [],
    contributions = [],
    sectionOrder = [],
    visibleSections = {},
  } = resume;

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 10, 140));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 10, 70));
  const handleZoomReset = () => setZoom(100);

  const activeSkills = skills.filter((s) => s.included);
  const activeProjects = projects.filter((p) => p.included);
  const activeExperience = experience.filter((e) => e.included);
  const activeAchievements = achievements.filter((a) => a.included);
  const activeCertifications = certifications.filter((c) => c.included);
  const activeContributions = contributions.filter((ct) => ct.included);

  // Template typography & styling rules
  const getTemplateClass = () => {
    switch (template) {
      case "classic":
        return "font-serif text-gray-900";
      case "minimal":
        return "font-mono text-gray-900 leading-snug";
      case "compact":
        return "font-sans text-gray-900 text-[11px] leading-tight";
      case "modern":
      default:
        return "font-sans text-gray-900 leading-normal";
    }
  };

  const getHeaderStyle = () => {
    switch (template) {
      case "classic":
        return "text-center pb-4 border-b border-gray-300";
      case "minimal":
        return "text-left pb-3 border-b-2 border-black";
      case "compact":
        return "text-left pb-2 border-b border-gray-200";
      case "modern":
      default:
        return "text-left pb-4 border-b border-emerald-600/30";
    }
  };

  const getSectionTitleClass = () => {
    switch (template) {
      case "classic":
        return "text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-gray-400 pb-0.5 mb-2 mt-4";
      case "minimal":
        return "text-xs font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-2 mt-3";
      case "compact":
        return "text-[11px] font-bold uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-0.5 mb-1.5 mt-2.5";
      case "modern":
      default:
        return "text-xs font-extrabold uppercase tracking-wider text-emerald-800 border-b border-emerald-500/20 pb-1 mb-2 mt-4 flex items-center justify-between";
    }
  };

  return (
    <div className="space-y-3">
      {/* Preview Action Strip */}
      <div className="flex items-center justify-between px-2 py-1.5 bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] rounded-2xl text-xs print:hidden">
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-[#0B3024] dark:text-[#F1FAF6] capitalize">
            {template} Template
          </span>
          <span className="text-[11px] text-[#658278] dark:text-[#789991]">
            ({zoom}%)
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handleZoomOut}
            title="Zoom Out"
            className="p-1 rounded-lg text-[#658278] hover:text-[#0B3024] dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#082A24] cursor-pointer"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={handleZoomReset}
            title="Fit to Screen"
            className="px-2 py-0.5 text-[11px] font-semibold text-[#658278] hover:text-[#0B3024] dark:hover:text-white rounded hover:bg-gray-100 dark:hover:bg-[#082A24] cursor-pointer"
          >
            100%
          </button>
          <button
            type="button"
            onClick={handleZoomIn}
            title="Zoom In"
            className="p-1 rounded-lg text-[#658278] hover:text-[#0B3024] dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#082A24] cursor-pointer"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <div className="h-4 w-px bg-gray-200 dark:bg-gray-700 mx-1" />
          <button
            type="button"
            onClick={onPrint}
            title="Print / Save as PDF"
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg font-bold bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] transition-colors cursor-pointer"
          >
            <Printer className="w-3 h-3" />
            <span>Print</span>
          </button>
        </div>
      </div>

      {/* A4 Document Paper Container */}
      <div className="overflow-x-auto p-1 sm:p-2 bg-gray-100/80 dark:bg-black/40 rounded-3xl border border-[#D8E8E2] dark:border-[#16463D]/60 flex justify-center">
        <div
          id="college-os-resume-document"
          style={{ transform: `scale(${zoom / 100})`, transformOrigin: "top center" }}
          className={`w-[210mm] min-h-[297mm] p-[16mm] bg-white text-gray-900 shadow-2xl rounded-sm transition-transform duration-150 ${getTemplateClass()}`}
        >
          {/* Section: Header */}
          {visibleSections.header !== false && (
            <header className={getHeaderStyle()}>
              <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                {header.name || "Student Name"}
              </h1>
              {header.headline && (
                <p className="text-xs font-semibold text-gray-700 mt-1">
                  {header.headline}
                </p>
              )}

              {/* Contact & Links Strip */}
              <div
                className={`flex items-center flex-wrap gap-x-3 gap-y-1 text-[11px] text-gray-600 mt-2.5 ${
                  template === "classic" ? "justify-center" : "justify-start"
                }`}
              >
                {header.includeEmail !== false && header.email && (
                  <span className="inline-flex items-center gap-1">
                    <Mail className="w-3 h-3 text-gray-500" />
                    <span>{header.email}</span>
                  </span>
                )}
                {header.includePhone !== false && header.phone && (
                  <span className="inline-flex items-center gap-1">
                    <Phone className="w-3 h-3 text-gray-500" />
                    <span>{header.phone}</span>
                  </span>
                )}
                {header.includeLocation !== false && header.location && (
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-gray-500" />
                    <span>{header.location}</span>
                  </span>
                )}
                {header.includeGithub !== false && header.github && (
                  <a
                    href={header.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-gray-800 hover:underline font-medium"
                  >
                    <GithubIcon className="w-3 h-3" />
                    <span>{header.github.replace("https://github.com/", "github.com/")}</span>
                  </a>
                )}
                {header.includeLinkedin !== false && header.linkedin && (
                  <a
                    href={header.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-gray-800 hover:underline font-medium"
                  >
                    <LinkedinIcon className="w-3 h-3 text-blue-700" />
                    <span>{header.linkedin.replace("https://linkedin.com/in/", "linkedin.com/in/")}</span>
                  </a>
                )}
                {header.includePortfolio !== false && header.portfolio && (
                  <a
                    href={header.portfolio}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-gray-800 hover:underline font-medium"
                  >
                    <Globe className="w-3 h-3 text-emerald-600" />
                    <span>{header.portfolio.replace("https://", "")}</span>
                  </a>
                )}
              </div>
            </header>
          )}

          {/* Dynamic Section Ordering */}
          {sectionOrder.map((sectionId) => {
            if (visibleSections[sectionId] === false) return null;

            // Summary
            if (sectionId === "summary" && summary) {
              return (
                <section key="summary" className="space-y-1">
                  <h2 className={getSectionTitleClass()}>Professional Summary</h2>
                  <p className="text-xs text-gray-800 leading-relaxed text-justify">
                    {summary}
                  </p>
                </section>
              );
            }

            // Technical Skills
            if (sectionId === "skills" && activeSkills.length > 0) {
              const langs = activeSkills.filter((s) => (s.category || "").includes("Languages"));
              const tools = activeSkills.filter((s) => (s.category || "").includes("Tools"));
              const other = activeSkills.filter(
                (s) => !langs.includes(s) && !tools.includes(s)
              );

              return (
                <section key="skills" className="space-y-1">
                  <h2 className={getSectionTitleClass()}>Technical Skills</h2>
                  <div className="space-y-1 text-xs text-gray-800">
                    {langs.length > 0 && (
                      <div>
                        <strong className="font-semibold text-gray-900">Languages &amp; Frameworks: </strong>
                        <span>{langs.map((s) => s.name).join(", ")}</span>
                      </div>
                    )}
                    {tools.length > 0 && (
                      <div>
                        <strong className="font-semibold text-gray-900">Tools, Databases &amp; Cloud: </strong>
                        <span>{tools.map((s) => s.name).join(", ")}</span>
                      </div>
                    )}
                    {other.length > 0 && (
                      <div>
                        <strong className="font-semibold text-gray-900">Architecture &amp; Practices: </strong>
                        <span>{other.map((s) => s.name).join(", ")}</span>
                      </div>
                    )}
                  </div>
                </section>
              );
            }

            // Experience
            if (sectionId === "experience" && activeExperience.length > 0) {
              return (
                <section key="experience" className="space-y-2">
                  <h2 className={getSectionTitleClass()}>Experience</h2>
                  {activeExperience.map((exp) => (
                    <div key={exp.id} className="space-y-0.5 text-xs">
                      <div className="flex items-center justify-between font-bold text-gray-900">
                        <span>{exp.role} &bull; {exp.organization}</span>
                        <span className="text-[11px] font-medium text-gray-600">
                          {exp.startDate} – {exp.isCurrent ? "Present" : exp.endDate} &bull; {exp.location}
                        </span>
                      </div>
                      <ul className="list-disc pl-4 space-y-0.5 text-gray-800 mt-1">
                        {(exp.bullets || []).map((bullet, idx) => (
                          <li key={idx} className="leading-snug">
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>
              );
            }

            // Key Projects
            if (sectionId === "projects" && activeProjects.length > 0) {
              return (
                <section key="projects" className="space-y-2.5">
                  <h2 className={getSectionTitleClass()}>Key Projects</h2>
                  {activeProjects.map((proj) => (
                    <div key={proj.id} className="space-y-1 text-xs">
                      <div className="flex items-center justify-between">
                        <div className="font-bold text-gray-900 flex items-center gap-1.5 flex-wrap">
                          <span>{proj.title}</span>
                          {proj.tags && proj.tags.length > 0 && (
                            <span className="text-[10px] font-normal text-gray-600">
                              | {proj.tags.join(", ")}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-gray-600 shrink-0">
                          {proj.githubUrl && (
                            <a
                              href={proj.githubUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-gray-700 hover:underline"
                            >
                              Code &rarr;
                            </a>
                          )}
                          {proj.liveUrl && (
                            <a
                              href={proj.liveUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-emerald-700 hover:underline font-semibold"
                            >
                              Demo &rarr;
                            </a>
                          )}
                        </div>
                      </div>
                      <ul className="list-disc pl-4 space-y-0.5 text-gray-800">
                        {(proj.bullets || []).map((bullet, bIdx) => (
                          <li key={bIdx} className="leading-snug">
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>
              );
            }

            // Education
            if (sectionId === "education" && education.degree) {
              return (
                <section key="education" className="space-y-1">
                  <h2 className={getSectionTitleClass()}>Education</h2>
                  <div className="text-xs text-gray-900 space-y-0.5">
                    <div className="flex items-center justify-between font-bold">
                      <span>{education.degree} &bull; {education.department}</span>
                      <span className="text-[11px] font-medium text-gray-600">
                        {education.batch}
                      </span>
                    </div>
                    <div className="text-gray-700 flex items-center justify-between">
                      <span>{education.college}</span>
                      {education.includeCgpa !== false && education.cgpa && (
                        <span className="font-semibold text-gray-900">
                          CGPA: {education.cgpa}
                        </span>
                      )}
                    </div>
                    {education.includeCoursework !== false &&
                      education.coursework &&
                      education.coursework.length > 0 && (
                        <p className="text-[11px] text-gray-600 pt-0.5">
                          <strong className="text-gray-800">Relevant Coursework: </strong>
                          {education.coursework.join(", ")}
                        </p>
                      )}
                  </div>
                </section>
              );
            }

            // Achievements
            if (sectionId === "achievements" && activeAchievements.length > 0) {
              return (
                <section key="achievements" className="space-y-1">
                  <h2 className={getSectionTitleClass()}>Achievements &amp; Awards</h2>
                  <ul className="list-disc pl-4 space-y-1 text-xs text-gray-800">
                    {activeAchievements.map((ach) => (
                      <li key={ach.id} className="leading-snug">
                        <strong className="font-semibold text-gray-900">{ach.title}</strong>
                        {ach.issuer && <span> — {ach.issuer}</span>}
                        {ach.date && <span className="text-gray-600"> ({ach.date})</span>}
                      </li>
                    ))}
                  </ul>
                </section>
              );
            }

            // Certifications
            if (sectionId === "certifications" && activeCertifications.length > 0) {
              return (
                <section key="certifications" className="space-y-1">
                  <h2 className={getSectionTitleClass()}>Certifications</h2>
                  <ul className="list-disc pl-4 space-y-1 text-xs text-gray-800">
                    {activeCertifications.map((cert) => (
                      <li key={cert.id} className="leading-snug">
                        <strong className="font-semibold text-gray-900">{cert.title}</strong>
                        {cert.issuer && <span> — {cert.issuer}</span>}
                        {cert.date && <span className="text-gray-600"> ({cert.date})</span>}
                      </li>
                    ))}
                  </ul>
                </section>
              );
            }

            // Campus Contributions
            if (sectionId === "contributions" && activeContributions.length > 0) {
              return (
                <section key="contributions" className="space-y-1">
                  <h2 className={getSectionTitleClass()}>Campus Leadership &amp; Roles</h2>
                  <ul className="list-disc pl-4 space-y-1 text-xs text-gray-800">
                    {activeContributions.map((ct) => (
                      <li key={ct.id} className="leading-snug">
                        <strong className="font-semibold text-gray-900">{ct.title}</strong>
                        {ct.organization && <span>, {ct.organization}</span>}
                        {ct.period && <span className="text-gray-600"> ({ct.period})</span>}
                      </li>
                    ))}
                  </ul>
                </section>
              );
            }

            return null;
          })}
        </div>
      </div>
    </div>
  );
}
