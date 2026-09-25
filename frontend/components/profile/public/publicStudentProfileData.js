// Comprehensive public student profile data model & resolvers for College OS

export const PUBLIC_STUDENT_PROFILES = {
  "student-1": {
    id: "student-1",
    slug: "hamid-rza",
    name: "Hamid Rza",
    username: "@hamidrza",
    avatar: "/assets/profile/avatar.jpg",
    isVerified: true,
    headline: "Full Stack Engineer & Open Source Builder",
    department: "Computer Science & Engineering",
    branch: "CSE",
    semester: "7th Semester",
    batch: "2022 - 2026",
    college: "XYZ College of Engineering, Mumbai",
    quote: "Building digital campus infrastructure, one component at a time.",
    bio: "Undergraduate CSE student passionate about distributed systems, modern frontend architecture, and developer tooling. Currently architecting core workspaces for College OS and experimenting with generative AI in academic workflows. Always eager to collaborate with fellow student builders.",
    careerFocus: "Full-Stack Software Engineering • Systems Architecture",
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
    education: {
      degree: "Bachelor of Technology (B.Tech)",
      branch: "Computer Science & Engineering",
      currentSemester: "7th Semester",
      batch: "2022 - 2026",
      college: "XYZ College of Engineering, Mumbai",
      specialization: "Full Stack & Cloud Systems",
    },
    stats: {
      projects: 6,
      achievements: 4,
      events: 12,
      followers: 128,
      following: 45,
    },
    socialLinks: [
      {
        platform: "GitHub",
        handle: "github.com/hamidrza0008",
        url: "https://github.com/hamidrza0008",
        type: "github",
      },
      {
        platform: "LinkedIn",
        handle: "linkedin.com/in/hamidrza",
        url: "https://linkedin.com/in/hamidrza",
        type: "linkedin",
      },
      {
        platform: "Portfolio",
        handle: "hamid.dev",
        url: "https://hamid.dev",
        type: "portfolio",
      },
    ],
    projects: [
      {
        id: "1",
        title: "College OS",
        tagline: "Modern digital campus operating system for student academics, projects, and events.",
        description: "Comprehensive role-based digital operating system streamlining student workflows, submissions, hackathons, and circular notices with high-fidelity interactions.",
        isFeatured: true,
        image: "/assets/profile/light/hero-campus.jpg",
        status: "Active",
        likes: 142,
        tags: ["Next.js", "React", "Tailwind CSS", "Node.js"],
        githubUrl: "https://github.com/hamidrza0008/collage-os",
        liveUrl: "https://college-os.dev",
        contributors: [
          { id: "student-1", name: "Hamid Rza", role: "Lead Architect", avatar: "/assets/profile/avatar.jpg" },
          { id: "student-2", name: "Priya Nair", role: "UI/UX Designer", avatar: "/assets/events/avatars/avatar-1.jpg" },
          { id: "student-3", name: "Vikram Joshi", role: "Backend Engineer", avatar: "/assets/events/avatars/avatar-3.jpg" },
        ],
      },
      {
        id: "2",
        title: "Campus AI Assistant",
        tagline: "Academic intelligence bot leveraging vector search and curriculum database retrieval.",
        description: "Context-aware AI student copilot offering course note syntheses, timetable assistance, and assignment reminders.",
        isFeatured: false,
        image: null,
        status: "Completed",
        likes: 89,
        tags: ["Python", "FastAPI", "MongoDB", "LangChain"],
        githubUrl: "https://github.com/hamidrza0008/campus-ai",
        liveUrl: "https://campus-ai.college-os.dev",
        contributors: [
          { id: "student-1", name: "Hamid Rza", role: "Creator", avatar: "/assets/profile/avatar.jpg" },
          { id: "student-3", name: "Vikram Joshi", role: "ML Engineer", avatar: "/assets/events/avatars/avatar-3.jpg" },
        ],
      },
      {
        id: "3",
        title: "Smart Attendance Tracker",
        tagline: "Real-time attendance analytics with threshold warnings and subject breakdown.",
        description: "Automated student attendance tracking with predictive analytics and instant absence notifications for faculty.",
        isFeatured: false,
        image: null,
        status: "Completed",
        likes: 64,
        tags: ["React", "Express", "Node.js", "Chart.js"],
        githubUrl: "https://github.com/hamidrza0008/attendance-tracker",
        liveUrl: null,
        contributors: [
          { id: "student-1", name: "Hamid Rza", role: "Full Stack Dev", avatar: "/assets/profile/avatar.jpg" },
        ],
      },
    ],
    achievements: [
      {
        id: "ach-1",
        title: "1st Place Winner — Smart India Hackathon 2024",
        issuer: "Ministry of Education & AICTE",
        date: "Dec 2024",
        category: "Hackathon",
        description: "Built an offline-first emergency campus dispatch dispatch platform connecting student health services with university ambulances.",
      },
      {
        id: "ach-2",
        title: "Finalist — Google GenAI Campus Challenge",
        issuer: "Google Developers Group",
        date: "Oct 2024",
        category: "Competition",
        description: "Architected a multimodal study assistant parsing handwritten lecture board snapshots into structured flashcards.",
      },
      {
        id: "ach-3",
        title: "AWS Certified Solutions Architect – Associate",
        issuer: "Amazon Web Services",
        date: "Jul 2024",
        category: "Certification",
        description: "Validated proficiency in scalable cloud architecture, IAM security, and serverless compute deployment.",
      },
      {
        id: "ach-4",
        title: "Open Source Contributor of the Month",
        issuer: "Campus Open Source Guild",
        date: "Mar 2024",
        category: "Open Source",
        description: "Authored 18 PRs enhancing accessibility and dark theme tokens across university student portal tools.",
      },
    ],
    campusContributions: [
      {
        title: "Technical Lead",
        organization: "Computer Society of India (CSI) Campus Chapter",
        period: "2023 – Present",
        description: "Organized 8 technical workshops on Next.js, Git, and Docker for 450+ junior undergraduate developers.",
      },
      {
        title: "Peer Mentor",
        organization: "First Year Induction Mentorship Program",
        period: "Aug 2024 – Nov 2024",
        description: "Guided 25 incoming first-year students on engineering course planning, lab setups, and team project dynamics.",
      },
    ],
    activity: [
      {
        id: "act-1",
        title: "Updated project College OS to version 1.4",
        type: "project",
        time: "Yesterday",
        detail: "Implemented Notice Reader & Opportunity Details canonical pages.",
      },
      {
        id: "act-2",
        title: "Won 1st Runner Up at Mumbai Inter-College Hackathon",
        type: "achievement",
        time: "1 week ago",
        detail: "Led team 'BinaryBuilders' building campus peer assistance bot.",
      },
      {
        id: "act-3",
        title: "Published open-source library 'tailwind-campus-palette'",
        type: "open-source",
        time: "3 weeks ago",
        detail: "Curated HSL-tuned tokens for modern education web apps.",
      },
    ],
    relatedStudents: [
      {
        id: "student-2",
        name: "Priya Nair",
        branch: "IT • 5th Sem",
        avatar: "/assets/events/avatars/avatar-1.jpg",
        headline: "UI/UX Designer & Frontend Dev",
        sharedSkills: ["React", "Tailwind CSS", "Figma"],
      },
      {
        id: "student-3",
        name: "Vikram Joshi",
        branch: "CSE • 7th Sem",
        avatar: "/assets/events/avatars/avatar-3.jpg",
        headline: "Backend & Cloud Engineer",
        sharedSkills: ["Node.js", "Docker", "Python"],
      },
      {
        id: "student-4",
        name: "Aditya Singh",
        branch: "ECE • 7th Sem",
        avatar: "/assets/events/avatars/avatar-2.jpg",
        headline: "Embedded Systems & IoT Enthusiast",
        sharedSkills: ["Python", "C++", "Systems"],
      },
    ],
  },

  "student-2": {
    id: "student-2",
    slug: "priya-nair",
    name: "Priya Nair",
    username: "@priyanair",
    avatar: "/assets/events/avatars/avatar-1.jpg",
    isVerified: true,
    headline: "UI/UX Designer & Design Systems Engineer",
    department: "Information Technology",
    branch: "IT",
    semester: "5th Semester",
    batch: "2023 - 2027",
    college: "XYZ College of Engineering, Mumbai",
    quote: "Designing interfaces that feel invisible, intuitive, and delight students.",
    bio: "Passionate product designer and frontend developer creating human-centered campus tools. Dedicated to typography, micro-interactions, WCAG accessibility, and scalable UI systems.",
    careerFocus: "Product Design (UI/UX) • Design Systems Engineering",
    interests: [
      "User Experience Research",
      "Design Systems",
      "Motion Design",
      "Accessibility (a11y)",
      "Design Thinking",
      "Creative Coding",
    ],
    skills: {
      primary: [
        { name: "Figma & FigJam", level: "Advanced" },
        { name: "UI/UX & Prototyping", level: "Advanced" },
        { name: "Tailwind CSS", level: "Advanced" },
        { name: "React.js", level: "Intermediate" },
      ],
      tools: [
        { name: "Design Tokens", level: "Advanced" },
        { name: "Storybook", level: "Intermediate" },
        { name: "Framer Motion", level: "Intermediate" },
        { name: "Adobe Creative Suite", level: "Advanced" },
      ],
      other: [
        { name: "User Research", level: "Advanced" },
        { name: "Wireframing & IA", level: "Advanced" },
        { name: "Usability Audits", level: "Advanced" },
      ],
    },
    education: {
      degree: "Bachelor of Technology (B.Tech)",
      branch: "Information Technology",
      currentSemester: "5th Semester",
      batch: "2023 - 2027",
      college: "XYZ College of Engineering, Mumbai",
      specialization: "Human-Computer Interaction & Web Systems",
    },
    stats: {
      projects: 5,
      achievements: 3,
      events: 10,
      followers: 94,
      following: 62,
    },
    socialLinks: [
      {
        platform: "GitHub",
        handle: "github.com/priyanair",
        url: "https://github.com",
        type: "github",
      },
      {
        platform: "LinkedIn",
        handle: "linkedin.com/in/priyanair",
        url: "https://linkedin.com",
        type: "linkedin",
      },
      {
        platform: "Portfolio",
        handle: "priyanair.design",
        url: "https://dribbble.com",
        type: "portfolio",
      },
    ],
    projects: [
      {
        id: "1",
        title: "College OS Design System",
        tagline: "Unified aesthetic and token architecture powering student portal screens.",
        description: "Created 80+ reusable UI components, color palettes, and glassmorphic micro-interactions tailored for high contrast readability in student environments.",
        isFeatured: true,
        image: "/assets/profile/light/hero-campus.jpg",
        status: "Active",
        likes: 112,
        tags: ["Figma", "Tailwind CSS", "React", "a11y"],
        githubUrl: "https://github.com/hamidrza0008/collage-os",
        liveUrl: "https://college-os.dev",
        contributors: [
          { id: "student-2", name: "Priya Nair", role: "Design Lead", avatar: "/assets/events/avatars/avatar-1.jpg" },
          { id: "student-1", name: "Hamid Rza", role: "Tech Lead", avatar: "/assets/profile/avatar.jpg" },
        ],
      },
      {
        id: "4",
        title: "EcoTrack Campus App",
        tagline: "Gamified campus recycling and energy conservation mobile concept.",
        description: "Designed end-to-end interactive mobile flows incentivizing dorm energy conservation through student leaderboards.",
        isFeatured: false,
        image: null,
        status: "Completed",
        likes: 54,
        tags: ["Figma", "Mobile UI", "User Research"],
        githubUrl: null,
        liveUrl: "https://figma.com",
        contributors: [
          { id: "student-2", name: "Priya Nair", role: "Lead Designer", avatar: "/assets/events/avatars/avatar-1.jpg" },
        ],
      },
    ],
    achievements: [
      {
        id: "ach-21",
        title: "Best UI/UX Award — TechFest Designathon 2024",
        issuer: "IIT Bombay Techfest",
        date: "Jan 2024",
        category: "Competition",
        description: "Recognized for intuitive accessibility design in educational disability assistive tools.",
      },
      {
        id: "ach-22",
        title: "Google UX Design Professional Certificate",
        issuer: "Google Career Certificates",
        date: "Sep 2023",
        category: "Certification",
        description: "Completed 7-course rigorous specialization covering user journey maps, wireframes, and high-fidelity usability test runs.",
      },
    ],
    campusContributions: [
      {
        title: "Design Head",
        organization: "Campus Cultural & Arts Committee",
        period: "2023 – Present",
        description: "Branded campus cultural fest, producing social campaigns, badges, and digital ticketing passes for 3,000 attendees.",
      },
    ],
    activity: [
      {
        id: "act-21",
        title: "Released Figma Community file: College OS Icon Pack",
        type: "design",
        time: "4 days ago",
        detail: "120+ custom vector icons calibrated for dark theme interfaces.",
      },
      {
        id: "act-22",
        title: "Conducted Figma 101 workshop for first year design cohort",
        type: "workshop",
        time: "2 weeks ago",
        detail: "Hands-on auto-layout and prototyping session for 60 students.",
      },
    ],
    relatedStudents: [
      {
        id: "student-1",
        name: "Hamid Rza",
        branch: "CSE • 7th Sem",
        avatar: "/assets/profile/avatar.jpg",
        headline: "Full Stack Engineer & Builder",
        sharedSkills: ["React", "Tailwind CSS", "Design Systems"],
      },
      {
        id: "student-3",
        name: "Vikram Joshi",
        branch: "CSE • 7th Sem",
        avatar: "/assets/events/avatars/avatar-3.jpg",
        headline: "Cloud & Backend Architect",
        sharedSkills: ["Next.js", "System Architecture"],
      },
    ],
  },

  "student-3": {
    id: "student-3",
    slug: "vikram-joshi",
    name: "Vikram Joshi",
    username: "@vikram_j",
    avatar: "/assets/events/avatars/avatar-3.jpg",
    isVerified: true,
    headline: "Cloud Infrastructure & Backend Engineer",
    department: "Computer Science & Engineering",
    branch: "CSE",
    semester: "7th Semester",
    batch: "2022 - 2026",
    college: "XYZ College of Engineering, Mumbai",
    quote: "Building reliable, scalable backend systems and container pipelines.",
    bio: "Backend specialist focused on microservices, database performance tuning, distributed consensus, and Kubernetes clusters. Competitive programmer with high rating across campus coding contests.",
    careerFocus: "Backend Engineering • Cloud Operations & SRE",
    interests: [
      "Distributed Storage",
      "Microservices",
      "Kubernetes & Docker",
      "Go & C++",
      "Database Internals",
      "Competitive Coding",
    ],
    skills: {
      primary: [
        { name: "Node.js & Go", level: "Advanced" },
        { name: "PostgreSQL & Redis", level: "Advanced" },
        { name: "Docker & Kubernetes", level: "Intermediate" },
        { name: "C++ & Data Structures", level: "Advanced" },
      ],
      tools: [
        { name: "Kafka & RabbitMQ", level: "Intermediate" },
        { name: "Linux Administration", level: "Advanced" },
        { name: "Nginx & Reverse Proxies", level: "Advanced" },
        { name: "Prometheus & Grafana", level: "Intermediate" },
      ],
      other: [
        { name: "REST & gRPC APIs", level: "Advanced" },
        { name: "Database Indexing", level: "Advanced" },
        { name: "CI/CD Pipelines", level: "Intermediate" },
      ],
    },
    education: {
      degree: "Bachelor of Technology (B.Tech)",
      branch: "Computer Science & Engineering",
      currentSemester: "7th Semester",
      batch: "2022 - 2026",
      college: "XYZ College of Engineering, Mumbai",
      specialization: "Cloud Computing & Networks",
    },
    stats: {
      projects: 7,
      achievements: 6,
      events: 15,
      followers: 110,
      following: 58,
    },
    socialLinks: [
      {
        platform: "GitHub",
        handle: "github.com/vikramjoshi",
        url: "https://github.com",
        type: "github",
      },
      {
        platform: "LinkedIn",
        handle: "linkedin.com/in/vikramjoshi",
        url: "https://linkedin.com",
        type: "linkedin",
      },
    ],
    projects: [
      {
        id: "2",
        title: "Distributed Query Engine",
        tagline: "Lightweight vectorized SQL engine written in Go for distributed log analysis.",
        description: "High-throughput query engine capable of parsing 2M log lines/second across partitioned cluster nodes.",
        isFeatured: true,
        image: null,
        status: "Active",
        likes: 98,
        tags: ["Go", "Distributed Systems", "gRPC", "Docker"],
        githubUrl: "https://github.com",
        liveUrl: null,
        contributors: [
          { id: "student-3", name: "Vikram Joshi", role: "Creator", avatar: "/assets/events/avatars/avatar-3.jpg" },
        ],
      },
      {
        id: "1",
        title: "College OS Backend Core",
        tagline: "Role-based API gateway and real-time socket broadcaster for student feeds.",
        description: "Engineered scalable REST routes, authentication token verification, and real-time submission handlers.",
        isFeatured: false,
        image: null,
        status: "Active",
        likes: 142,
        tags: ["Node.js", "Express", "PostgreSQL", "Redis"],
        githubUrl: "https://github.com/hamidrza0008/collage-os",
        liveUrl: "https://college-os.dev",
        contributors: [
          { id: "student-1", name: "Hamid Rza", role: "Lead Architect", avatar: "/assets/profile/avatar.jpg" },
          { id: "student-3", name: "Vikram Joshi", role: "Backend Engineer", avatar: "/assets/events/avatars/avatar-3.jpg" },
        ],
      },
    ],
    achievements: [
      {
        id: "ach-31",
        title: "Winner — Inter-University Algorithmic Challenge 2024",
        issuer: "ACM Student Chapter",
        date: "Nov 2024",
        category: "Competition",
        description: "Solved 7 complex algorithmic graph and DP problems in under 3 hours, ranking 1st among 120 teams.",
      },
      {
        id: "ach-32",
        title: "Certified Kubernetes Administrator (CKA)",
        issuer: "Cloud Native Computing Foundation (CNCF)",
        date: "Aug 2024",
        category: "Certification",
        description: "Demonstrated skills in cluster architecture, storage configuration, networking, and security troubleshooting.",
      },
    ],
    campusContributions: [
      {
        title: "Server Administrator",
        organization: "College Computer Center Labs",
        period: "2023 – Present",
        description: "Maintained local Debian Linux servers and Git repository mirrors for 1,200 department students.",
      },
    ],
    activity: [
      {
        id: "act-31",
        title: "Deployed automated container sandbox for student code evaluation",
        type: "project",
        time: "5 days ago",
        detail: "Hardened Docker isolation runner with memory/CPU limits.",
      },
    ],
    relatedStudents: [
      {
        id: "student-1",
        name: "Hamid Rza",
        branch: "CSE • 7th Sem",
        avatar: "/assets/profile/avatar.jpg",
        headline: "Full Stack Engineer & Builder",
        sharedSkills: ["Node.js", "Docker", "PostgreSQL"],
      },
      {
        id: "student-2",
        name: "Priya Nair",
        branch: "IT • 5th Sem",
        avatar: "/assets/events/avatars/avatar-1.jpg",
        headline: "UI/UX & Design Systems Engineer",
        sharedSkills: ["Product Architecture", "Design Systems"],
      },
    ],
  },
};

// Aliases mapping for interoperability across modules (Feed, Followers, Projects)
export const STUDENT_ALIASES = {
  // Followers modal IDs
  "st-1": "student-3", // Vikram Joshi
  "st-2": "student-2", // Priya Nair
  "st-3": "student-1", // Hamid Rza (or Karan Singh alias)
  "st-4": "student-2", // Ananya Roy -> maps to student-2 style
  "st-5": "student-3", // Rohit Verma -> maps to student-3 style

  // Feed people you may know
  "user-1": "student-3", // Rohan Mehta
  "user-2": "student-2", // Priya Nair
  "user-3": "student-1", // Aditya Singh
  "user-4": "student-2", // Muskan Khan

  // Name slug aliases
  "hamid-rza": "student-1",
  "hamid": "student-1",
  "priya-nair": "student-2",
  "priya": "student-2",
  "vikram-joshi": "student-3",
  "vikram": "student-3",
  "aarav-sharma": "student-1",
  "sneha-patel": "student-2",
  "rohan-mehta": "student-3",
  "karan-singh": "student-1",
};

/**
 * Resolver function to fetch a public student profile by ID or slug.
 * Returns null if specifically an invalid slug (e.g. invalid-student-xyz).
 * Synthesizes a realistic profile if given a recognized generic student format.
 */
export function getPublicStudentProfile(idOrSlug) {
  if (!idOrSlug) return null;

  const normalized = String(idOrSlug).trim().toLowerCase();

  // Explicit check for invalid/test 404 targets
  if (
    normalized.startsWith("invalid") ||
    normalized.includes("not-found") ||
    normalized === "null" ||
    normalized === "undefined"
  ) {
    return null;
  }

  // Direct lookup
  if (PUBLIC_STUDENT_PROFILES[normalized]) {
    return PUBLIC_STUDENT_PROFILES[normalized];
  }

  // Alias lookup
  const targetId = STUDENT_ALIASES[normalized];
  if (targetId && PUBLIC_STUDENT_PROFILES[targetId]) {
    return PUBLIC_STUDENT_PROFILES[targetId];
  }

  // Number alias (e.g. "1" -> "student-1")
  if (/^\d+$/.test(normalized)) {
    const candidate = `student-${normalized}`;
    if (PUBLIC_STUDENT_PROFILES[candidate]) {
      return PUBLIC_STUDENT_PROFILES[candidate];
    }
  }

  // Dynamic synthesizer for other student IDs (e.g. "student-4", "student-5")
  if (normalized.startsWith("student-") || normalized.startsWith("st-") || normalized.startsWith("user-")) {
    const rawNum = normalized.replace(/[^0-9]/g, "") || "4";
    const baseStudent = PUBLIC_STUDENT_PROFILES["student-1"];

    return {
      ...baseStudent,
      id: normalized,
      slug: `student-${rawNum}`,
      name: `Student ${rawNum}`,
      username: `@student_${rawNum}`,
      headline: "Computer Science Undergraduate & Builder",
      quote: "Learning, collaborating, and shipping projects at College OS.",
      bio: "Undergraduate engineering student actively exploring software development, campus hackathons, and technology clubs.",
      stats: {
        projects: 3,
        achievements: 2,
        events: 8,
        followers: 45,
        following: 30,
      },
    };
  }

  // If unrecognized, return null to show friendly Not Found state
  return null;
}

/**
 * Helper to get related students for a given student ID
 */
export function getRelatedStudents(studentId) {
  const profile = getPublicStudentProfile(studentId);
  if (profile && profile.relatedStudents && profile.relatedStudents.length > 0) {
    return profile.relatedStudents;
  }
  return [
    {
      id: "student-2",
      name: "Priya Nair",
      branch: "IT • 5th Sem",
      avatar: "/assets/events/avatars/avatar-1.jpg",
      headline: "UI/UX & Design Systems Engineer",
      sharedSkills: ["React", "Tailwind CSS"],
    },
    {
      id: "student-3",
      name: "Vikram Joshi",
      branch: "CSE • 7th Sem",
      avatar: "/assets/events/avatars/avatar-3.jpg",
      headline: "Backend & Cloud Engineer",
      sharedSkills: ["Node.js", "Docker"],
    },
  ];
}
