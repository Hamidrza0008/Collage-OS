// Canonical initial profile state and persistence helper for the Student Profile Editor

export const PROFILE_STORAGE_KEY = "collegeos_student_profile_edit";

export const DEFAULT_EDIT_PROFILE_DATA = {
  id: "student-1",
  name: "Hamid Rza",
  username: "@hamidrza",
  avatar: "/assets/profile/avatar.jpg",
  headline: "Full Stack Engineer & Open Source Builder",
  quote: "Building digital campus infrastructure, one component at a time.",
  bio: "Undergraduate CSE student passionate about distributed systems, modern frontend architecture, and developer tooling. Currently architecting core workspaces for College OS and experimenting with generative AI in academic workflows. Always eager to collaborate with fellow student builders.",
  careerFocus: "Full-Stack Software Engineering • Systems Architecture",
  currentFocus: "College OS Workspace Architecture & GenAI Integration",
  interests: [
    "Full-Stack Web Development",
    "Distributed Systems",
    "Open Source",
    "Developer Tools",
    "Generative AI",
    "Clean Code Architecture",
  ],
  skills: {
    primary: [
      { name: "JavaScript / TypeScript", level: "Advanced" },
      { name: "React & Next.js", level: "Advanced" },
      { name: "Node.js & Express", level: "Advanced" },
      { name: "Python", level: "Intermediate" },
    ],
    tools: [
      { name: "Tailwind CSS", level: "Advanced" },
      { name: "MongoDB & PostgreSQL", level: "Intermediate" },
      { name: "Docker", level: "Intermediate" },
      { name: "Git & GitHub Actions", level: "Advanced" },
      { name: "REST & GraphQL", level: "Advanced" },
    ],
    other: [
      { name: "Framer Motion", level: "Intermediate" },
      { name: "System Design", level: "Intermediate" },
      { name: "Agile Sprints", level: "Advanced" },
      { name: "Technical Writing", level: "Intermediate" },
    ],
  },
  socialLinks: {
    github: "https://github.com/hamidrza0008",
    linkedin: "https://linkedin.com/in/hamidrza",
    portfolio: "https://hamid.dev",
    twitter: "https://x.com/hamidrza",
  },
  projects: [
    {
      id: "1",
      title: "College OS",
      tagline: "Modern digital campus operating system for student academics, projects, and events.",
      description: "Comprehensive role-based digital operating system streamlining student workflows, submissions, hackathons, and circular notices with high-fidelity interactions.",
      isFeatured: true,
      visibility: "Public", // Public | Campus Only | Hidden
      tags: ["Next.js", "React", "Tailwind CSS", "Node.js"],
      githubUrl: "https://github.com/hamidrza0008/collage-os",
      liveUrl: "https://college-os.dev",
      image: "/assets/profile/light/hero-campus.jpg",
    },
    {
      id: "2",
      title: "Campus AI Assistant",
      tagline: "Academic intelligence bot leveraging vector search and curriculum database retrieval.",
      description: "Context-aware AI student copilot offering course note syntheses, timetable assistance, and assignment reminders.",
      isFeatured: false,
      visibility: "Public",
      tags: ["Python", "FastAPI", "MongoDB", "LangChain"],
      githubUrl: "https://github.com/hamidrza0008/campus-ai",
      liveUrl: "https://campus-ai.college-os.dev",
      image: null,
    },
    {
      id: "3",
      title: "Smart Attendance Tracker",
      tagline: "Real-time attendance analytics with threshold warnings and subject breakdown.",
      description: "Automated student attendance tracking with predictive analytics and instant absence notifications for faculty.",
      isFeatured: false,
      visibility: "Campus Only",
      tags: ["React", "Express", "Node.js", "Chart.js"],
      githubUrl: "https://github.com/hamidrza0008/attendance-tracker",
      liveUrl: null,
      image: null,
    },
  ],
  achievements: [
    {
      id: "ach-1",
      title: "1st Place Winner — Smart India Hackathon 2024",
      issuer: "Ministry of Education & AICTE",
      date: "Dec 2024",
      category: "Hackathon",
      description: "Built an offline-first emergency campus dispatch platform connecting student health services with university ambulances.",
      url: "https://sih.gov.in",
    },
    {
      id: "ach-2",
      title: "Finalist — Google GenAI Campus Challenge",
      issuer: "Google Developers Group",
      date: "Oct 2024",
      category: "Competition",
      description: "Architected a multimodal study assistant parsing handwritten lecture board snapshots into structured flashcards.",
      url: "",
    },
    {
      id: "ach-3",
      title: "AWS Certified Solutions Architect – Associate",
      issuer: "Amazon Web Services",
      date: "Jul 2024",
      category: "Certification",
      description: "Validated proficiency in scalable cloud architecture, IAM security, and serverless compute deployment.",
      url: "https://aws.amazon.com/certification",
    },
    {
      id: "ach-4",
      title: "Open Source Contributor of the Month",
      issuer: "Campus Open Source Guild",
      date: "Mar 2024",
      category: "Open Source",
      description: "Authored 18 PRs enhancing accessibility and dark theme tokens across university student portal tools.",
      url: "",
    },
  ],
  campusContributions: [
    {
      id: "contrib-1",
      title: "Technical Lead",
      organization: "Computer Society of India (CSI) Campus Chapter",
      period: "2023 – Present",
      description: "Organized 8 technical workshops on Next.js, Git, and Docker for 450+ junior undergraduate developers.",
    },
    {
      id: "contrib-2",
      title: "Peer Mentor",
      organization: "First Year Induction Mentorship Program",
      period: "Aug 2024 – Nov 2024",
      description: "Guided 25 incoming first-year students on engineering course planning, lab setups, and team project dynamics.",
    },
  ],
  visibility: {
    profile: "Public", // Public | Campus Only | Private
    projects: "Public",
    achievements: "Public",
    activity: "Public",
    socialLinks: "Visible", // Visible | Hidden
  },
  academic: {
    degree: "Bachelor of Technology (B.Tech)",
    department: "Computer Science & Engineering",
    branch: "CSE",
    semester: "7th Semester",
    batch: "2022 - 2026",
    college: "XYZ College of Engineering, Mumbai",
    rollNo: "CSE-302",
  },
};

export const SKILL_CATEGORIES = [
  { key: "primary", label: "Languages & Frameworks" },
  { key: "tools", label: "Developer Tools & Cloud" },
  { key: "other", label: "Methodologies & Architecture" },
];

export const SKILL_LEVELS = ["Advanced", "Intermediate", "Familiar"];

export const SUGGESTED_SKILLS = [
  "TypeScript",
  "React.js",
  "Next.js",
  "Node.js",
  "Python",
  "Tailwind CSS",
  "Docker",
  "PostgreSQL",
  "MongoDB",
  "GraphQL",
  "AWS",
  "Figma",
  "Linux",
  "Redis",
  "Kubernetes",
  "System Design",
];

export const SUGGESTED_INTERESTS = [
  "Full-Stack Web Development",
  "Distributed Systems",
  "Generative AI",
  "Open Source",
  "Cloud Computing",
  "UI/UX Design",
  "Cybersecurity",
  "Competitive Programming",
  "DevOps & CI/CD",
  "Mobile App Development",
  "Robotics & IoT",
  "Data Science",
];

/**
 * Load student edit profile state from localStorage or fall back to default
 */
export function loadProfileEditState() {
  if (typeof window === "undefined") {
    return DEFAULT_EDIT_PROFILE_DATA;
  }
  try {
    const raw = localStorage.getItem(PROFILE_STORAGE_KEY);
    if (!raw) return DEFAULT_EDIT_PROFILE_DATA;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_EDIT_PROFILE_DATA,
      ...parsed,
      skills: {
        primary: parsed.skills?.primary || DEFAULT_EDIT_PROFILE_DATA.skills.primary,
        tools: parsed.skills?.tools || DEFAULT_EDIT_PROFILE_DATA.skills.tools,
        other: parsed.skills?.other || DEFAULT_EDIT_PROFILE_DATA.skills.other,
      },
      socialLinks: {
        ...DEFAULT_EDIT_PROFILE_DATA.socialLinks,
        ...(parsed.socialLinks || {}),
      },
      visibility: {
        ...DEFAULT_EDIT_PROFILE_DATA.visibility,
        ...(parsed.visibility || {}),
      },
      academic: DEFAULT_EDIT_PROFILE_DATA.academic, // Academic identity strictly immutable
    };
  } catch {
    return DEFAULT_EDIT_PROFILE_DATA;
  }
}

/**
 * Persist student edit profile state to localStorage
 */
export function saveProfileEditState(state) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error("Failed to save profile state to localStorage", err);
  }
}

/**
 * Calculate dynamic profile completion percentage and checklist
 */
export function calculateProfileCompletion(profile) {
  if (!profile) return { percentage: 0, items: [] };

  const checks = [
    {
      id: "avatar",
      label: "Profile photo uploaded",
      completed: Boolean(profile.avatar && !profile.avatar.includes("default")),
    },
    {
      id: "headline",
      label: "Professional headline set",
      completed: Boolean(profile.headline && profile.headline.trim().length >= 10),
    },
    {
      id: "quote",
      label: "Motivational quote added",
      completed: Boolean(profile.quote && profile.quote.trim().length >= 5),
    },
    {
      id: "bio",
      label: "About bio & focus written",
      completed: Boolean(profile.bio && profile.bio.trim().length >= 40),
    },
    {
      id: "interests",
      label: "At least 3 campus interests",
      completed: Boolean(profile.interests && profile.interests.length >= 3),
    },
    {
      id: "skills",
      label: "At least 5 verified skills",
      completed: Boolean(
        (profile.skills?.primary?.length || 0) +
        (profile.skills?.tools?.length || 0) +
        (profile.skills?.other?.length || 0) >= 5
      ),
    },
    {
      id: "links",
      label: "GitHub or LinkedIn connected",
      completed: Boolean(
        (profile.socialLinks?.github && profile.socialLinks.github.trim()) ||
        (profile.socialLinks?.linkedin && profile.socialLinks.linkedin.trim())
      ),
    },
    {
      id: "portfolio",
      label: "Personal portfolio / website link",
      completed: Boolean(profile.socialLinks?.portfolio && profile.socialLinks.portfolio.trim()),
    },
    {
      id: "projects",
      label: "At least 1 showcase project",
      completed: Boolean(profile.projects && profile.projects.length >= 1),
    },
    {
      id: "featured",
      label: "Featured project selected",
      completed: Boolean(profile.projects && profile.projects.some((p) => p.isFeatured)),
    },
    {
      id: "achievements",
      label: "Achievements or recognitions",
      completed: Boolean(profile.achievements && profile.achievements.length >= 1),
    },
  ];

  const completedCount = checks.filter((c) => c.completed).length;
  const percentage = Math.round((completedCount / checks.length) * 100);

  return {
    percentage,
    completedCount,
    totalCount: checks.length,
    items: checks,
  };
}

/**
 * Validate profile data before saving
 */
export function validateProfile(profile) {
  const errors = {};

  if (!profile.name || profile.name.trim().length < 2) {
    errors.name = "Full display name must be at least 2 characters.";
  }

  if (profile.headline && profile.headline.length > 120) {
    errors.headline = "Headline cannot exceed 120 characters.";
  }

  if (profile.quote && profile.quote.length > 150) {
    errors.quote = "Quote cannot exceed 150 characters.";
  }

  if (profile.bio && profile.bio.length > 600) {
    errors.bio = "Bio cannot exceed 600 characters.";
  }

  // URL checks
  const validateUrl = (url, name) => {
    if (!url || !url.trim()) return null;
    const clean = url.trim();
    if (!clean.startsWith("http://") && !clean.startsWith("https://")) {
      return `${name} URL must begin with http:// or https://`;
    }
    return null;
  };

  const ghErr = validateUrl(profile.socialLinks?.github, "GitHub");
  if (ghErr) errors.github = ghErr;

  const liErr = validateUrl(profile.socialLinks?.linkedin, "LinkedIn");
  if (liErr) errors.linkedin = liErr;

  const portErr = validateUrl(profile.socialLinks?.portfolio, "Portfolio");
  if (portErr) errors.portfolio = portErr;

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
