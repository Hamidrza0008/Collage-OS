import { INITIAL_PROJECTS } from "../projectsData";

/**
 * Rich detailed data for canonical showcase projects.
 */
export const DETAILED_PROJECTS = {
  "proj-1": {
    id: "proj-1",
    slug: "college-os",
    title: "College OS — Campus Platform",
    tagline:
      "A digital campus platform connecting students, faculty, academics and campus life in one unified student-first workspace.",
    category: "Web Development",
    type: "Team Project",
    status: "In Development",
    updatedAt: "2 days ago",
    createdDate: "August 2025",
    branch: "Computer Science & Engineering",
    semester: "7th Sem",
    visibility: "Public",
    views: 1420,
    likes: 124,
    commentsCount: 18,
    isLiked: true,
    isBookmarked: true,
    githubUrl: "https://github.com/Hamidrza0008/Collage-OS",
    demoUrl: "https://college-os.dev",
    docUrl: "https://docs.college-os.dev",
    portfolioUrl: "https://hamidrza.dev",
    bannerLight: "/assets/projects/light/hero-banner.jpg",
    bannerDark: "/assets/projects/dark/hero-banner.jpg",
    githubStats: {
      repoName: "Hamidrza0008/Collage-OS",
      stars: 124,
      forks: 38,
      openIssues: 4,
      commits: 186,
      branch: "main",
      language: "JavaScript / TypeScript",
    },
    overview: {
      problem:
        "College information and daily student life are fragmented across clunky legacy ERP systems, unstructured WhatsApp groups, emailed PDF notices, and disconnected third-party tools. Students struggle to track academic deadlines, collaborate on tech projects, and discover campus opportunities in one clean interface.",
      solution:
        "College OS brings relevant academic, social, career, and administrative workflows into one modern, student-first platform. Built with high visual polish, real-time updates, role-tailored dashboards, and an AI assistant designed specifically for university life.",
      highlights: [
        "Unified Academic Dashboard with live attendance tracking & grade evaluation",
        "Interactive Student Profiles highlighting projects, verified badges, and skill sets",
        "Campus Tech Projects Showcase supporting peer reviews and team recruitment",
        "Real-time Campus Feed for announcements, discussions, and event tracking",
        "Internship & Hackathon discovery hub tailored to undergraduate degrees",
        "Campus AI Assistant built on university-specific context retrieval",
        "Lost & Found registry connecting students with resolved case tracking",
      ],
    },
    documentation: [
      {
        id: "overview",
        title: "Project Overview",
        content: `College OS is an open-source campus workspace platform designed for engineering and degree colleges. It replaces traditional departmental noticeboards and disparate portals with a modern web application built on Next.js App Router and Node.js micro-services.

The system emphasizes high aesthetic polish, zero visual friction, dark/light theme consistency, and complete student autonomy over their portfolios and team projects.`,
      },
      {
        id: "problem-statement",
        title: "Problem Statement",
        content: `Traditional college management systems suffer from severe UX degradation:
- Disconnected information silos: Attendance is in ERP-A, marks in ERP-B, circulars in WhatsApp groups.
- Poor mobile responsiveness leading to missed assignment submission windows.
- Lack of peer discovery: Students working on innovative hackathon projects have no verified campus platform to showcase their repositories or recruit teammates.`,
      },
      {
        id: "key-features",
        title: "Key Features & Capabilities",
        content: `### 1. Role-Tailored Portals
Dedicated views for undergraduate students and faculty mentors with automated permission scopes.

### 2. Live Academic Analytics
Real-time semester calculation, attendance shortage warnings, and interactive subject completion metrics.

### 3. Integrated Project Showcase
Rich student portfolio pages featuring live demo embeds, GitHub statistics, and structured contribution breakdowns.

### 4. Campus AI Engine
University-aware chat assistant that answers queries regarding exam timetables, campus regulations, and library hours.`,
      },
      {
        id: "architecture-spec",
        title: "Architecture & Data Pipeline",
        content: `The platform is structured as a client-first Single Page Experience powered by Next.js and Tailwind CSS on the frontend, interfacing with a RESTful Express/MongoDB backend:

\`\`\`
Client (Next.js 16 + React 19)
    │   ├── App Router Layouts & Server Components
    │   ├── Client State Assemblers & Modals
    │   └── Tailwind CSS Design System + Theme Provider
    ▼
API Gateway / Express Server
    │   ├── JWT Authentication & Role Authorization
    │   ├── Academic Records & Projects Controller
    │   └── Real-time WebSocket Event Dispatcher
    ▼
Database Layer
    │   ├── MongoDB Collections (Students, Projects, Feed)
    │   └── Campus AI Vector Embeddings Index
\`\`\``,
      },
      {
        id: "tech-stack-details",
        title: "Tech Stack & Libraries",
        content: `- **Framework**: Next.js 16 (App Router + Turbopack)
- **Frontend Logic**: React 19, Lucide React Icons
- **Styling**: Tailwind CSS + Custom CSS Variables Design Tokens
- **State Management**: React Context, Optimistic Local State
- **Backend API**: Node.js, Express.js REST Controllers
- **Database**: MongoDB Atlas with Mongoose ODM
- **Security**: HttpOnly Cookie Session Tokens & Helmet.js headers`,
      },
      {
        id: "future-scope",
        title: "Future Scope & Milestones",
        content: `1. **Phase 2**: Complete Academic Grade Card Portal and dynamic syllabus downloader.
2. **Phase 3**: Automated GitHub webhook integration for live commit telemetry on student project cards.
3. **Phase 4**: RAG vector database indexing for past exam question papers and AI answers.
4. **Phase 5**: Progressive Web App (PWA) offline sync for student class schedules.`,
      },
    ],
    techStack: [
      { name: "Next.js", category: "Frontend Framework", type: "framework", badge: "Next.js 16" },
      { name: "React", category: "UI Library", type: "library", badge: "React 19" },
      { name: "Tailwind CSS", category: "Design System", type: "css", badge: "Tailwind 3" },
      { name: "Node.js", category: "Runtime Environment", type: "runtime", badge: "Node 20" },
      { name: "Express.js", category: "API Backend", type: "backend", badge: "Express 4" },
      { name: "MongoDB", category: "NoSQL Database", type: "database", badge: "Atlas Cloud" },
      { name: "Mongoose", category: "Object Modeling", type: "database", badge: "ODM" },
      { name: "Lucide Icons", category: "Iconography", type: "design", badge: "Icons" },
      { name: "JWT", category: "Authentication", type: "security", badge: "Secure Tokens" },
      { name: "REST API", category: "Architecture", type: "network", badge: "RESTful" },
    ],
    architecture: {
      layers: [
        {
          id: "frontend",
          name: "Frontend Client",
          subtitle: "Next.js App Router + React 19",
          description: "Responsive student & faculty portal with dark/light themes and instant page navigations.",
          badge: "Client Layer",
          items: ["App Router", "Tailwind CSS", "Lucide Icons", "Theme Provider"],
        },
        {
          id: "api",
          name: "API Service Layer",
          subtitle: "Node.js + Express REST API",
          description: "Micro-controllers handling project CRUD, campus feed updates, student authentication, and validations.",
          badge: "Backend Layer",
          items: ["Auth Middleware", "Project Controller", "Feed Service", "Security Headers"],
        },
        {
          id: "database",
          name: "Persistence & Cache",
          subtitle: "MongoDB Atlas + Mongoose",
          description: "Normalized collections for student profiles, academic grade books, notices, and project repositories.",
          badge: "Data Layer",
          items: ["Student Schemas", "Projects Index", "Notice Archive", "Session Store"],
        },
        {
          id: "ai",
          name: "Campus AI Pipeline",
          subtitle: "Structured Context Retrieval + RAG",
          description: "University syllabus and FAQ indexing for context-grounded AI recommendations and instant answers.",
          badge: "AI Layer",
          items: ["Vector Embeddings", "Context Injection", "Query Rewriter", "LLM Stream"],
        },
      ],
    },
    previews: [
      {
        id: "p1",
        title: "Campus Overview & Dashboard",
        caption: "Main student dashboard highlighting academic timetable, quick stats, and announcements.",
        src: "/assets/projects/light/hero-banner.jpg",
        isHero: true,
      },
      {
        id: "p2",
        title: "Student Projects & Collaboration",
        caption: "Projects gallery where students showcase repositories and recruit peers for hackathons.",
        src: "/assets/projects/collaboration-students.png",
        isHero: false,
      },
      {
        id: "p3",
        title: "Dark Mode Product Experience",
        caption: "Emerald dark mode interface with refined contrast and high visual clarity.",
        src: "/assets/projects/dark/hero-banner.jpg",
        isHero: false,
      },
    ],
    team: [
      {
        id: "student-hamid",
        name: "Hamid Rza",
        role: "Lead Full-Stack Developer",
        branch: "CSE",
        semester: "7th Sem",
        avatar: "/assets/layout/profile-avatar.jpg",
        contribution: 45,
        tasks: "App Router architecture, API controllers, database schemas, and Campus AI integration.",
        isLead: true,
      },
      {
        id: "student-priya",
        name: "Priya Patel",
        role: "UI/UX & Design System Lead",
        branch: "CSE",
        semester: "7th Sem",
        avatar: "/assets/events/avatars/avatar-1.jpg",
        contribution: 30,
        tasks: "Component design system, dark/light color tokens, responsiveness, and interaction polish.",
        isLead: false,
      },
      {
        id: "student-aryan",
        name: "Aryan Verma",
        role: "Backend & Cloud Engineer",
        branch: "CSE",
        semester: "7th Sem",
        avatar: "/assets/events/avatars/avatar-2.jpg",
        contribution: 25,
        tasks: "MongoDB schemas, query performance optimization, security headers, and mock datasets.",
        isLead: false,
      },
    ],
    contributionsBreakdown: [
      { label: "Frontend & Architecture", percentage: 40, color: "bg-emerald-500" },
      { label: "Backend & Database", percentage: 30, color: "bg-teal-500" },
      { label: "UI/UX & Interaction", percentage: 20, color: "bg-emerald-400" },
      { label: "Campus AI Pipeline", percentage: 10, color: "bg-sky-500" },
    ],
    roadmap: [
      {
        phase: "Phase 1",
        title: "Foundation & Authentication",
        status: "Completed",
        date: "July 2025",
        description: "Core Next.js architecture, role-based layout shells, and theme provider system.",
      },
      {
        phase: "Phase 2",
        title: "Student Dashboard & Academics",
        status: "Completed",
        date: "August 2025",
        description: "Unified overview, attendance trackers, timetable cards, and quick actions.",
      },
      {
        phase: "Phase 3",
        title: "Campus Modules & Showcase",
        status: "In Progress",
        date: "September 2025",
        description: "Projects portfolio gallery, Campus Feed with media attachments, and Lost & Found registry.",
      },
      {
        phase: "Phase 4",
        title: "Campus AI Chat Workspace",
        status: "In Progress",
        date: "October 2025",
        description: "Grounding LLM on university circulars and automated doubt-clearing sessions.",
      },
      {
        phase: "Phase 5",
        title: "Production Deployment & PWA",
        status: "Upcoming",
        date: "November 2025",
        description: "Campus-wide beta rollout, push notification service worker, and mobile installation.",
      },
    ],
    links: [
      {
        label: "GitHub Repository",
        url: "https://github.com/Hamidrza0008/Collage-OS",
        type: "github",
        description: "Public source repository, issues, and pull requests",
      },
      {
        label: "Live Demo Platform",
        url: "https://college-os.dev",
        type: "live",
        description: "Production demo sandbox for students & faculty",
      },
      {
        label: "Project Documentation",
        url: "https://docs.college-os.dev",
        type: "docs",
        description: "Architecture blueprints, schema guides, and setup manual",
      },
      {
        label: "Lead Developer Portfolio",
        url: "https://hamidrza.dev",
        type: "portfolio",
        description: "Personal engineering showcase & contact",
      },
    ],
    discussion: [
      {
        id: "c-1",
        author: {
          name: "Dr. Sharma",
          avatar: "/assets/events/avatars/avatar-2.jpg",
          role: "Faculty Mentor • CSE Dept",
        },
        time: "1 day ago",
        text: "Outstanding architecture and clean design tokens! The unified 2/3 + 1/3 layout feels like an actual commercial product. When is the faculty attendance approval workflow planned?",
        likes: 14,
        isLiked: false,
        replies: [
          {
            id: "r-1",
            author: {
              name: "Hamid Rza",
              avatar: "/assets/layout/profile-avatar.jpg",
              role: "Lead Developer",
            },
            time: "18 hours ago",
            text: "Thank you Dr. Sharma! The faculty portal for approval queues is part of Phase 2 in the roadmap.",
            likes: 6,
          },
        ],
      },
      {
        id: "c-2",
        author: {
          name: "Rohan Gupta",
          avatar: "/assets/events/avatars/avatar-3.jpg",
          role: "Mobile App Lead • 7th Sem",
        },
        time: "2 days ago",
        text: "Super responsive and the dark mode contrast is spot on. Looking forward to integrating Eventify API hooks into the Campus Feed.",
        likes: 8,
        isLiked: true,
        replies: [],
      },
      {
        id: "c-3",
        author: {
          name: "Aisha Siddiqui",
          avatar: "/assets/events/avatars/avatar-1.jpg",
          role: "UI/UX Enthusiast • 5th Sem",
        },
        time: "3 days ago",
        text: "The Projects section looks really useful for students looking for hackathon teammates. The contributor contribution bars are a nice touch!",
        likes: 5,
        isLiked: false,
        replies: [],
      },
    ],
  },
};

/**
 * Normalizes input ID or slug to find project in DETAILED_PROJECTS or INITIAL_PROJECTS.
 */
export function getProjectDetails(idOrSlug) {
  if (!idOrSlug) return null;
  const query = String(idOrSlug).toLowerCase().trim();

  // 1. Direct key match in DETAILED_PROJECTS
  if (DETAILED_PROJECTS[query]) {
    return DETAILED_PROJECTS[query];
  }

  // 2. Slug match in DETAILED_PROJECTS
  const detailedMatch = Object.values(DETAILED_PROJECTS).find(
    (p) => p.slug === query || p.id.toLowerCase() === query
  );
  if (detailedMatch) return detailedMatch;

  // 3. Fallback search in INITIAL_PROJECTS
  const initialMatch = INITIAL_PROJECTS.find(
    (p) =>
      p.id.toLowerCase() === query ||
      p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") === query
  );

  if (!initialMatch) {
    // If query is 'college-os', return proj-1
    if (query === "college-os") return DETAILED_PROJECTS["proj-1"];
    return null;
  }

  // Synthesize rich detailed format from INITIAL_PROJECTS item
  const slug = initialMatch.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  return {
    id: initialMatch.id,
    slug,
    title: initialMatch.title,
    tagline: initialMatch.description,
    category: initialMatch.category || "Web Development",
    type: initialMatch.type || "Team Project",
    status: "Active Project",
    updatedAt: initialMatch.updatedAt || "3 days ago",
    createdDate: "2025",
    branch: initialMatch.branch || "CSE",
    semester: "7th Sem",
    visibility: "Public",
    views: initialMatch.likes * 11 + 45,
    likes: initialMatch.likes || 42,
    commentsCount: initialMatch.commentsCount || 4,
    isLiked: Boolean(initialMatch.isLiked),
    isBookmarked: Boolean(initialMatch.isBookmarked),
    githubUrl: initialMatch.githubUrl || "https://github.com/Hamidrza0008/Collage-OS",
    demoUrl: initialMatch.demoUrl || "https://college-os.dev",
    docUrl: "https://docs.college-os.dev",
    portfolioUrl: "https://github.com",
    bannerLight: "/assets/projects/light/hero-banner.jpg",
    bannerDark: "/assets/projects/dark/hero-banner.jpg",
    githubStats: {
      repoName: initialMatch.githubUrl
        ? initialMatch.githubUrl.replace("https://github.com/", "")
        : "campus-projects/" + slug,
      stars: initialMatch.likes,
      forks: Math.floor(initialMatch.likes * 0.3),
      openIssues: 2,
      commits: 64,
      branch: "main",
      language: initialMatch.tech?.[0] || "JavaScript",
    },
    overview: {
      problem: `Students and departments need dedicated software solutions for ${initialMatch.category.toLowerCase()} that integrate seamlessly with campus systems.`,
      solution: initialMatch.description,
      highlights:
        initialMatch.highlights || [
          "Interactive dashboard with role-based access",
          "Automated notification triggers and alerts",
          "Clean responsive UI tested on desktop and mobile",
        ],
    },
    documentation: [
      {
        id: "overview",
        title: "Project Overview",
        content: initialMatch.description,
      },
      {
        id: "tech-stack",
        title: "Technologies Used",
        content: `Built with modern web technologies: ${initialMatch.tech?.join(", ") || "Next.js, Tailwind CSS"}.`,
      },
      {
        id: "architecture",
        title: "System Design",
        content: `Standard 3-tier architecture with React frontend client, RESTful Express application layer, and MongoDB database persistence.`,
      },
    ],
    techStack: (initialMatch.tech || ["Next.js", "React", "Node.js", "Tailwind CSS"]).map(
      (t) => ({
        name: t,
        category: "Core Technology",
        type: "tech",
        badge: t,
      })
    ),
    architecture: {
      layers: [
        {
          id: "frontend",
          name: "User Interface",
          subtitle: "React & Next.js",
          description: "Responsive student application with component modularity.",
          badge: "Client Layer",
          items: ["React Components", "Tailwind CSS"],
        },
        {
          id: "backend",
          name: "Application Server",
          subtitle: "Node.js REST Services",
          description: "Data controllers and business logic validation.",
          badge: "API Layer",
          items: ["Express REST", "JSON Payloads"],
        },
        {
          id: "database",
          name: "Data Store",
          subtitle: "MongoDB Cloud",
          description: "Persistent records and user settings storage.",
          badge: "Database Layer",
          items: ["NoSQL Schemas", "Mongoose"],
        },
      ],
    },
    previews: [
      {
        id: "p1",
        title: initialMatch.title + " Banner",
        caption: initialMatch.description,
        src: "/assets/projects/light/hero-banner.jpg",
        isHero: true,
      },
      {
        id: "p2",
        title: "Collaboration & Team",
        caption: "Active development showcase and contribution breakdown.",
        src: "/assets/projects/collaboration-students.png",
        isHero: false,
      },
    ],
    team: initialMatch.members || [
      {
        name: initialMatch.author || "Hamid Rza",
        role: "Project Author",
        branch: initialMatch.branch || "CSE",
        semester: "7th Sem",
        avatar: "/assets/layout/profile-avatar.jpg",
        contribution: 100,
      },
    ],
    contributionsBreakdown: [
      { label: "Engineering & Logic", percentage: 60, color: "bg-emerald-500" },
      { label: "Design & UX", percentage: 40, color: "bg-teal-500" },
    ],
    roadmap: [
      {
        phase: "Phase 1",
        title: "Initial Prototype",
        status: "Completed",
        date: "2025",
        description: "Core concept and interface wireframes.",
      },
      {
        phase: "Phase 2",
        title: "Feature Implementation",
        status: "In Progress",
        date: "Active",
        description: "Integrating APIs and real-time state.",
      },
      {
        phase: "Phase 3",
        title: "Campus Testing",
        status: "Upcoming",
        date: "Next",
        description: "Gathering peer feedback and usability fixes.",
      },
    ],
    links: [
      {
        label: "GitHub Repository",
        url: initialMatch.githubUrl || "https://github.com/Hamidrza0008/Collage-OS",
        type: "github",
        description: "Source code repository",
      },
      {
        label: "Live Demo",
        url: initialMatch.demoUrl || "https://college-os.dev",
        type: "live",
        description: "Interactive preview",
      },
    ],
    discussion: (initialMatch.comments || []).map((c, idx) => ({
      id: "c-" + idx,
      author: {
        name: c.author,
        avatar: "/assets/events/avatars/avatar-1.jpg",
        role: "Student Peer",
      },
      time: c.time || "Recently",
      text: c.text,
      likes: 2,
      isLiked: false,
      replies: [],
    })),
  };
}

/**
 * Returns 3 related projects excluding current project.
 */
export function getRelatedProjects(currentProjectId) {
  return INITIAL_PROJECTS.filter((p) => p.id !== currentProjectId).slice(0, 3);
}
