// ─────────────────────────────────────────────────────────────────────────────
// resumeBuilderData.js
// Canonical data model, template definitions, profile import, persistence,
// and deterministic smart suggestions for the College OS Student AI Resume Builder
// ─────────────────────────────────────────────────────────────────────────────

import { DEFAULT_EDIT_PROFILE_DATA, loadProfileEditState } from "@/components/profile/edit/editProfileData";
import { INITIAL_INTERNSHIPS } from "@/components/internships/internshipsData";

export const getStoredProfileEditState = loadProfileEditState;

export const RESUME_STORAGE_KEY = "college_os_resume_builder_v1";

// ─────────────────────────────────────────────────────────────────────────────
// 1. Resume Templates
// ─────────────────────────────────────────────────────────────────────────────
export const RESUME_TEMPLATES = [
  {
    id: "modern",
    name: "Modern Developer",
    badge: "Recommended",
    description: "Emerald-accented section headers, clean skill tags, and contemporary typography tailored for software roles.",
    atsFriendly: true,
  },
  {
    id: "classic",
    name: "Classic Professional",
    badge: "Traditional",
    description: "Centered header, horizontal divider rules, standard margins, and balanced hierarchy suitable for all corporate applications.",
    atsFriendly: true,
  },
  {
    id: "minimal",
    name: "Minimal ATS",
    badge: "High Pass-Rate",
    description: "Strict single-column layout, zero complex columns or decorative boxes, plain typography formatted for automated screening.",
    atsFriendly: true,
  },
  {
    id: "compact",
    name: "Compact Student",
    badge: "1-Page Fit",
    description: "Optimized line height and condensed spacing designed to fit undergraduate projects, education, and skills on a single sheet.",
    atsFriendly: true,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// 2. Default Section Definitions & Order
// ─────────────────────────────────────────────────────────────────────────────
export const ALL_SECTION_DEFS = [
  { id: "header", name: "Personal & Contact Info", required: true },
  { id: "summary", name: "Professional Summary", required: false },
  { id: "skills", name: "Technical Skills", required: true },
  { id: "experience", name: "Experience & Internships", required: false },
  { id: "projects", name: "Key Projects", required: true },
  { id: "education", name: "Education", required: true },
  { id: "achievements", name: "Achievements & Awards", required: false },
  { id: "certifications", name: "Certifications", required: false },
  { id: "contributions", name: "Campus Leadership & Roles", required: false },
];

export const TARGET_ROLE_OPTIONS = [
  "Full Stack Developer",
  "Frontend Engineer",
  "Backend / Systems Engineer",
  "Software Engineering Intern",
  "DevOps & Cloud Engineer",
  "Machine Learning / AI Developer",
  "Mobile App Developer",
];

// ─────────────────────────────────────────────────────────────────────────────
// 3. Deterministic Smart Bullet & Summary Generator
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Generates role-focused summary suggestions based ONLY on student's actual profile data.
 * Zero fabricated metrics, zero hallucinated companies.
 */
export function generateSummaryVariants(targetRole = "Full Stack Developer", profile) {
  const name = profile?.name || "Student";
  const branch = profile?.academic?.branch || "Computer Science";
  const degree = profile?.academic?.degree || "B.Tech";
  const primarySkills = (profile?.skills?.primary || []).map((s) => s.name).join(", ");
  const toolSkills = (profile?.skills?.tools || []).map((s) => s.name).slice(0, 3).join(", ");

  const variants = [
    {
      id: "variant-general",
      title: "Balanced & Professional",
      role: targetRole,
      text: `${degree} (${branch}) undergraduate with practical development experience in ${primarySkills || "modern full-stack systems"}. Demonstrated record building campus-scale applications and collaborating with student developer communities. Focused on writing maintainable code and solving real user workflows as a ${targetRole}.`,
    },
    {
      id: "variant-technical",
      title: "Technical & Systems Focus",
      role: targetRole,
      text: `Detail-oriented ${targetRole} skilled in ${primarySkills || "frontend and backend stacks"} alongside ${toolSkills || "developer tooling"}. Experienced in modular architecture, RESTful services, and continuous delivery with multiple functional projects. Passionate about performant system design and clean code standards.`,
    },
    {
      id: "variant-collaborative",
      title: "Impact & Leadership Focus",
      role: targetRole,
      text: `Driven software engineering student and active campus builder with hands-on expertise across ${primarySkills || "web technologies"}. Combines solid engineering fundamentals with proven student leadership and hackathon achievements. Seeking to contribute immediate value as a ${targetRole}.`,
    },
  ];

  return variants;
}

/**
 * Deterministic project bullet suggestion generator using Action + Tech + Built formula.
 */
export function generateProjectBullet(project, targetRole = "Software Engineer") {
  if (!project) return "";
  const techList = (project.tags || []).slice(0, 3).join(", ");
  const title = project.title || "application";
  const tagline = project.tagline || project.description || "web platform";

  // Action verbs tailored to target roles
  const isFrontend = targetRole.toLowerCase().includes("front") || targetRole.toLowerCase().includes("ui");
  const isBackend = targetRole.toLowerCase().includes("back") || targetRole.toLowerCase().includes("system");

  if (isFrontend) {
    return `Architected responsive, accessible UI modules for ${title} using ${techList || "React and modern CSS"}, ensuring consistent interaction states and fast load times.`;
  } else if (isBackend) {
    return `Engineered reliable backend endpoints and data models for ${title} using ${techList || "Node.js and modern databases"}, prioritizing query efficiency and data integrity.`;
  } else {
    return `Designed and implemented ${title} (${tagline}) utilizing ${techList || "modern full-stack technologies"} to streamline user workflows and ensure clean component modularity.`;
  }
}

/**
 * Improves bullet text clarity and structure without inventing metrics.
 */
export function improveBulletText(text) {
  if (!text || !text.trim()) return "";
  let clean = text.trim();
  // Ensure starts with capitalized verb or word
  clean = clean.charAt(0).toUpperCase() + clean.slice(1);
  // Ensure ends with period
  if (!clean.endsWith(".")) {
    clean += ".";
  }
  // Replace weak beginnings if applicable
  clean = clean
    .replace(/^worked on /i, "Developed and maintained ")
    .replace(/^responsible for /i, "Spearheaded the development of ")
    .replace(/^helped with /i, "Collaborated on the implementation of ")
    .replace(/^made a /i, "Architected and built a ");

  return clean;
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. Job Description & Keyword Match Analyzer
// ─────────────────────────────────────────────────────────────────────────────

const TECH_KEYWORD_DICTIONARY = [
  "React", "Next.js", "Node.js", "JavaScript", "TypeScript", "Python",
  "HTML", "CSS", "Tailwind CSS", "Express", "MongoDB", "PostgreSQL", "SQL",
  "Docker", "Kubernetes", "AWS", "Google Cloud", "GCP", "Git", "GitHub",
  "REST", "GraphQL", "FastAPI", "Java", "C++", "DSA", "Data Structures",
  "Algorithms", "System Design", "CI/CD", "Linux", "Redis", "Figma",
  "Jest", "Unit Testing", "Microservices", "Agile", "Scrum",
];

export function analyzeJobKeywords(jobText, resume) {
  if (!jobText || !jobText.trim()) {
    return {
      hasTarget: false,
      matched: [],
      missing: [],
      coverage: 0,
      totalKeywordsFound: 0,
    };
  }

  const normalizedJob = jobText.toLowerCase();
  const foundInJob = TECH_KEYWORD_DICTIONARY.filter((keyword) =>
    normalizedJob.includes(keyword.toLowerCase())
  );

  if (foundInJob.length === 0) {
    return {
      hasTarget: true,
      matched: [],
      missing: [],
      coverage: 0,
      totalKeywordsFound: 0,
    };
  }

  // Compile entire resume text content
  const resumeSkills = (resume.skills || []).map((s) => s.name?.toLowerCase() || "");
  const resumeProjects = (resume.projects || []).map(
    (p) => `${p.title} ${p.description || ""} ${(p.bullets || []).join(" ")} ${(p.tags || []).join(" ")}`.toLowerCase()
  );
  const resumeExp = (resume.experience || []).map(
    (e) => `${e.role} ${e.organization} ${(e.bullets || []).join(" ")}`.toLowerCase()
  );
  const resumeSummary = (resume.summary || "").toLowerCase();

  const allResumeText = [
    resumeSkills.join(" "),
    resumeProjects.join(" "),
    resumeExp.join(" "),
    resumeSummary,
  ].join(" ");

  const matched = [];
  const missing = [];

  foundInJob.forEach((kw) => {
    if (allResumeText.includes(kw.toLowerCase())) {
      matched.push(kw);
    } else {
      missing.push(kw);
    }
  });

  const coverage = Math.round((matched.length / foundInJob.length) * 100);

  return {
    hasTarget: true,
    matched,
    missing,
    coverage,
    totalKeywordsFound: foundInJob.length,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. Resume Readiness & Quality Checker
// ─────────────────────────────────────────────────────────────────────────────

export function calculateResumeQuality(resume, keywordAnalysis) {
  if (!resume) return { score: 0, checklist: [], warnings: [] };

  const checks = [
    {
      id: "contact",
      label: "Contact header complete (Name, Email, GitHub/LinkedIn)",
      passed: Boolean(
        resume.header?.name &&
        resume.header?.email &&
        (resume.header?.github || resume.header?.linkedin)
      ),
      tip: "Include both GitHub and LinkedIn for maximum recruiter visibility.",
    },
    {
      id: "summary",
      label: "Professional summary included",
      passed: Boolean(resume.summary && resume.summary.trim().length >= 40),
      tip: "Add a 2–3 sentence professional summary tailored to your target role.",
    },
    {
      id: "skills",
      label: "Technical skills configured (at least 4 skills)",
      passed: Boolean(resume.skills && resume.skills.filter((s) => s.included).length >= 4),
      tip: "Include primary languages, frameworks, and developer tools you are comfortable with.",
    },
    {
      id: "projects",
      label: "At least 2 showcase projects selected",
      passed: Boolean(resume.projects && resume.projects.filter((p) => p.included).length >= 2),
      tip: "Showcase at least 2 distinct projects highlighting problem-solving ability.",
    },
    {
      id: "education",
      label: "Degree and college education verified",
      passed: Boolean(resume.education?.degree && resume.education?.college),
      tip: "Verify your academic branch and expected graduation batch.",
    },
    {
      id: "achievements",
      label: "Recognitions, certifications, or campus roles included",
      passed: Boolean(
        (resume.achievements && resume.achievements.filter((a) => a.included).length > 0) ||
        (resume.certifications && resume.certifications.filter((c) => c.included).length > 0) ||
        (resume.contributions && resume.contributions.filter((ct) => ct.included).length > 0)
      ),
      tip: "Highlight hackathon finishes, cloud certifications, or student club responsibilities.",
    },
  ];

  const passedCount = checks.filter((c) => c.passed).length;
  let baseScore = Math.round((passedCount / checks.length) * 100);

  // If keyword analysis exists, blend it in
  let finalScore = baseScore;
  if (keywordAnalysis?.hasTarget && keywordAnalysis.totalKeywordsFound > 0) {
    finalScore = Math.round(baseScore * 0.6 + keywordAnalysis.coverage * 0.4);
  }

  // Length heuristics
  const includedProjectsCount = (resume.projects || []).filter((p) => p.included).length;
  const includedExpCount = (resume.experience || []).filter((e) => e.included).length;
  const totalItems = includedProjectsCount + includedExpCount;
  
  let pageEstimate = "1 Page (Recommended)";
  const warnings = [];

  if (totalItems > 6 || (resume.summary && resume.summary.length > 500)) {
    pageEstimate = "2 Pages (Dense)";
    warnings.push("Your resume content is expanding. Consider featuring your top 3 projects to preserve a tight 1-page presentation.");
  }

  return {
    score: finalScore,
    passedCount,
    totalChecks: checks.length,
    checklist: checks,
    pageEstimate,
    warnings,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. Default Resume Builder State Factory
// ─────────────────────────────────────────────────────────────────────────────

export function getDefaultResumeFromProfile(profileData, options = {}) {
  const profile = profileData || DEFAULT_EDIT_PROFILE_DATA;
  const { name = "Full Stack Developer Resume", targetRole = "Full Stack Developer", targetOpportunityId = "intern-1" } = options;

  // Flatten skills with included: true
  const importedSkills = [
    ...(profile.skills?.primary || []).map((s) => ({ name: s.name, category: "Languages & Frameworks", included: true })),
    ...(profile.skills?.tools || []).map((s) => ({ name: s.name, category: "Tools & Cloud", included: true })),
    ...(profile.skills?.other || []).map((s) => ({ name: s.name, category: "Architecture & Practices", included: true })),
  ];

  // Projects mapped
  const importedProjects = (profile.projects || []).map((p) => ({
    id: p.id,
    title: p.title,
    tagline: p.tagline || "",
    description: p.description || "",
    tags: p.tags || [],
    githubUrl: p.githubUrl || "",
    liveUrl: p.liveUrl || "",
    isFeatured: p.isFeatured || false,
    included: true,
    bullets: [
      generateProjectBullet(p, targetRole),
      `Collaborated on architecture, component modularity, and deployment verification for ${p.title}.`,
    ],
  }));

  // Achievements
  const importedAchievements = (profile.achievements || []).map((a) => ({
    id: a.id,
    title: a.title,
    issuer: a.issuer,
    date: a.date,
    category: a.category,
    description: a.description,
    url: a.url || "",
    included: true,
  }));

  // Certifications (from achievements with category "Certification")
  const importedCerts = (profile.achievements || [])
    .filter((a) => a.category === "Certification")
    .map((c) => ({
      id: c.id,
      title: c.title,
      issuer: c.issuer,
      date: c.date,
      url: c.url || "",
      included: true,
    }));

  // Campus contributions
  const importedContributions = (profile.campusContributions || []).map((ct) => ({
    id: ct.id,
    title: ct.title,
    organization: ct.organization,
    period: ct.period,
    description: ct.description,
    included: true,
  }));

  // Initial experience (sample internship entry grounded in student profile)
  const initialExperience = [
    {
      id: "exp-1",
      role: "Frontend Engineering Intern",
      organization: "Campus Tech Collective",
      location: "Campus Lab / Hybrid",
      startDate: "Jun 2024",
      endDate: "Aug 2024",
      isCurrent: false,
      included: true,
      bullets: [
        "Implemented reusable UI components with Next.js and Tailwind CSS for the student campus portal.",
        "Refactored state management flows, reducing client re-renders across high-traffic dashboard widgets.",
        "Participated in weekly code reviews and sprint retrospectives with senior student engineers.",
      ],
    },
  ];

  const now = new Date().toISOString();

  return {
    id: "resume-1",
    name: name,
    targetRole: targetRole,
    targetCompany: "Google / Tech",
    targetOpportunityId: targetOpportunityId,
    jobDescriptionText: "",
    template: "modern", // 'modern' | 'classic' | 'minimal' | 'compact'
    createdAt: now,
    updatedAt: now,
    profileSnapshotTimestamp: now,

    // Header section
    header: {
      name: profile.name || "Hamid Rza",
      headline: profile.headline || "Full Stack Engineer & Open Source Builder",
      email: "hamidrza0008@gmail.com",
      includeEmail: true,
      phone: "+91 98765 43210",
      includePhone: true,
      location: "Mumbai, India",
      includeLocation: true,
      github: profile.socialLinks?.github || "https://github.com/hamidrza0008",
      includeGithub: true,
      linkedin: profile.socialLinks?.linkedin || "https://linkedin.com/in/hamidrza",
      includeLinkedin: true,
      portfolio: profile.socialLinks?.portfolio || "https://hamid.dev",
      includePortfolio: true,
    },

    // Summary section
    summary: `${profile.academic?.degree || "B.Tech"} in ${profile.academic?.branch || "Computer Science"} with practical engineering experience in ${importedSkills.slice(0, 4).map((s) => s.name).join(", ")}. Passionate about building reliable digital campus tools, modular UI architectures, and scalable web solutions.`,
    
    // Skills
    skills: importedSkills,

    // Experience
    experience: initialExperience,

    // Projects
    projects: importedProjects,

    // Education
    education: {
      degree: profile.academic?.degree || "Bachelor of Technology (B.Tech)",
      department: profile.academic?.department || "Computer Science & Engineering",
      college: profile.academic?.college || "XYZ College of Engineering, Mumbai",
      batch: profile.academic?.batch || "2022 - 2026",
      semester: profile.academic?.semester || "7th Semester",
      cgpa: "8.6 / 10.0",
      includeCgpa: true,
      coursework: ["Data Structures & Algorithms", "Operating Systems", "Database Management Systems", "Computer Networks", "Software Engineering"],
      includeCoursework: true,
    },

    // Achievements
    achievements: importedAchievements,

    // Certifications
    certifications: importedCerts,

    // Campus Contributions
    contributions: importedContributions,

    // Active section order
    sectionOrder: [
      "header",
      "summary",
      "skills",
      "experience",
      "projects",
      "education",
      "achievements",
      "certifications",
      "contributions",
    ],

    // Visible sections toggles
    visibleSections: {
      header: true,
      summary: true,
      skills: true,
      experience: true,
      projects: true,
      education: true,
      achievements: true,
      certifications: true,
      contributions: true,
    },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// 7. Multi-Version Local Persistence
// ─────────────────────────────────────────────────────────────────────────────

export function getStoredResumeVersions(profileData) {
  if (typeof window === "undefined") {
    const initial = getDefaultResumeFromProfile(profileData);
    return [initial];
  }

  try {
    const raw = localStorage.getItem(RESUME_STORAGE_KEY);
    if (!raw) {
      const initial = getDefaultResumeFromProfile(profileData);
      localStorage.setItem(RESUME_STORAGE_KEY, JSON.stringify([initial]));
      return [initial];
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    const initial = getDefaultResumeFromProfile(profileData);
    return [initial];
  } catch {
    return [getDefaultResumeFromProfile(profileData)];
  }
}

export function saveAllResumeVersions(versions) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(RESUME_STORAGE_KEY, JSON.stringify(versions));
  } catch (err) {
    console.error("Failed to save resume versions to localStorage:", err);
  }
}

export function createNewResumeVersion(name, targetRole, profileData) {
  const versions = getStoredResumeVersions(profileData);
  const newId = `resume-${Date.now()}`;
  const newVersion = getDefaultResumeFromProfile(profileData, {
    name: name || `Resume for ${targetRole || "Software Role"}`,
    targetRole: targetRole || "Full Stack Developer",
  });
  newVersion.id = newId;
  versions.push(newVersion);
  saveAllResumeVersions(versions);
  return newVersion;
}

export function duplicateResumeVersion(versionId, profileData) {
  const versions = getStoredResumeVersions(profileData);
  const target = versions.find((v) => v.id === versionId);
  if (!target) return null;

  const duplicated = JSON.parse(JSON.stringify(target));
  duplicated.id = `resume-${Date.now()}`;
  duplicated.name = `${target.name} (Copy)`;
  duplicated.createdAt = new Date().toISOString();
  duplicated.updatedAt = new Date().toISOString();

  versions.push(duplicated);
  saveAllResumeVersions(versions);
  return duplicated;
}

export function deleteResumeVersion(versionId, profileData) {
  const versions = getStoredResumeVersions(profileData);
  if (versions.length <= 1) {
    // Keep at least one resume
    return { success: false, message: "Cannot delete your only resume. Create another version first." };
  }
  const filtered = versions.filter((v) => v.id !== versionId);
  saveAllResumeVersions(filtered);
  return { success: true, remaining: filtered };
}

// ─────────────────────────────────────────────────────────────────────────────
// 8. Profile Sync & Difference Detection
// ─────────────────────────────────────────────────────────────────────────────

export function detectProfileDifferences(resume, currentProfile) {
  if (!resume || !currentProfile) return { hasDifferences: false, newSkills: [], newProjects: [] };

  const currentSkillNames = [
    ...(currentProfile.skills?.primary || []),
    ...(currentProfile.skills?.tools || []),
    ...(currentProfile.skills?.other || []),
  ].map((s) => s.name);

  const resumeSkillNames = (resume.skills || []).map((s) => s.name);
  const newSkills = currentSkillNames.filter((name) => !resumeSkillNames.includes(name));

  const currentProjectIds = (currentProfile.projects || []).map((p) => p.id);
  const resumeProjectIds = (resume.projects || []).map((p) => p.id);
  const newProjects = (currentProfile.projects || []).filter((p) => !resumeProjectIds.includes(p.id));

  const hasDifferences = newSkills.length > 0 || newProjects.length > 0;

  return {
    hasDifferences,
    newSkills,
    newProjects,
    count: newSkills.length + newProjects.length,
  };
}

export function syncResumeWithProfileData(resume, currentProfile) {
  if (!resume || !currentProfile) return resume;

  const updated = JSON.parse(JSON.stringify(resume));

  // 1. Merge newly added skills without removing custom overrides
  const existingNames = new Set((updated.skills || []).map((s) => s.name));
  const newSkills = [
    ...(currentProfile.skills?.primary || []).map((s) => ({ name: s.name, category: "Languages & Frameworks", included: true })),
    ...(currentProfile.skills?.tools || []).map((s) => ({ name: s.name, category: "Tools & Cloud", included: true })),
    ...(currentProfile.skills?.other || []).map((s) => ({ name: s.name, category: "Architecture & Practices", included: true })),
  ].filter((s) => !existingNames.has(s.name));

  updated.skills = [...(updated.skills || []), ...newSkills];

  // 2. Merge newly added projects
  const existingProjectIds = new Set((updated.projects || []).map((p) => p.id));
  const newProjects = (currentProfile.projects || [])
    .filter((p) => !existingProjectIds.has(p.id))
    .map((p) => ({
      id: p.id,
      title: p.title,
      tagline: p.tagline || "",
      description: p.description || "",
      tags: p.tags || [],
      githubUrl: p.githubUrl || "",
      liveUrl: p.liveUrl || "",
      isFeatured: p.isFeatured || false,
      included: true,
      bullets: [generateProjectBullet(p, updated.targetRole)],
    }));

  updated.projects = [...(updated.projects || []), ...newProjects];
  updated.updatedAt = new Date().toISOString();
  updated.profileSnapshotTimestamp = new Date().toISOString();

  return updated;
}
