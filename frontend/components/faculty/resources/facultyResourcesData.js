export const RESOURCE_CATEGORIES = [
  { id: "all", label: "All Resources", count: 248, icon: "folder" },
  { id: "study-material", label: "Study Material", count: 102, icon: "book" },
  { id: "syllabus", label: "Syllabus", count: 18, icon: "file-text" },
  { id: "previous-papers", label: "Previous Papers", count: 56, icon: "archive" },
  { id: "guidelines", label: "Guidelines", count: 24, icon: "shield" },
  { id: "forms-templates", label: "Forms & Templates", count: 12, icon: "layout" },
  { id: "others", label: "Others", count: 36, icon: "more" },
];

export const FEATURED_RESOURCES = [
  {
    id: "feat-1",
    title: "Data Structures & Algorithms",
    subtitle: "Full Course Notes",
    format: "PDF",
    formatColor: "red",
    tags: ["DSA", "Sem 3"],
    size: "2.4 MB",
    category: "study-material",
    semester: "Sem 3",
    subject: "Data Structures & Algorithms (CSE-301)",
    iconType: "document",
    downloadUrl: "#",
    downloadsCount: 1420,
    author: {
      name: "Dr. Arjun Mehta",
      avatar: "/assets/profile/dr-arjun-mehta.jpg",
    },
    uploadedTime: "1 week ago",
    description:
      "Comprehensive handwritten and digitized lecture notes covering arrays, linked lists, trees, graphs, and dynamic programming.",
  },
  {
    id: "feat-2",
    title: "Web Development",
    subtitle: "Syllabus & Scheme",
    format: "PDF",
    formatColor: "blue",
    tags: ["Web Dev", "Sem 4"],
    size: "1.8 MB",
    category: "syllabus",
    semester: "Sem 4",
    subject: "Full-Stack Web Engineering (CSE-402)",
    iconType: "document",
    downloadUrl: "#",
    downloadsCount: 980,
    author: {
      name: "Dr. Arjun Mehta",
      avatar: "/assets/profile/dr-arjun-mehta.jpg",
    },
    uploadedTime: "2 weeks ago",
    description:
      "Official academic syllabus, evaluation scheme, lab assignment breakdown, and recommended textbook references.",
  },
  {
    id: "feat-3",
    title: "Project Templates",
    subtitle: "(Next.js + MongoDB)",
    format: "ZIP",
    formatColor: "green",
    tags: ["Templates", "All Sem"],
    size: "12.6 MB",
    category: "forms-templates",
    semester: "All Sem",
    subject: "Major & Minor Projects",
    iconType: "code",
    downloadUrl: "#",
    downloadsCount: 2310,
    author: {
      name: "Prof. Vikram Sen",
      avatar: "/assets/profile/dr-arjun-mehta.jpg",
    },
    uploadedTime: "3 weeks ago",
    description:
      "Production-ready boilerplate starter kit containing Next.js 15, Tailwind CSS, MongoDB Mongoose schema setup, and authentication flow.",
  },
  {
    id: "feat-4",
    title: "University Question Papers",
    subtitle: "(Last 5 Years)",
    format: "PDF",
    formatColor: "purple",
    tags: ["Previous Papers", "Sem 1-6"],
    size: "5.2 MB",
    category: "previous-papers",
    semester: "Sem 1-6",
    subject: "Computer Science Core Subjects",
    iconType: "document",
    downloadUrl: "#",
    downloadsCount: 3120,
    author: {
      name: "Exam Cell Coordinator",
      avatar: "/assets/profile/dr-arjun-mehta.jpg",
    },
    uploadedTime: "1 month ago",
    description:
      "Consolidated end-semester question papers with solution hints from 2020 through 2025 across university examinations.",
  },
];

export const INITIAL_RECENT_UPLOADS = [
  {
    id: "rec-1",
    title: "Operating System Notes",
    subtitle: "Unit 3 - Process Scheduling & Concurrency",
    tags: [
      { label: "Study Material", color: "blue" },
      { label: "Sem 5", color: "gray" },
    ],
    format: "PDF",
    formatColor: "red",
    author: {
      name: "Dr. Arjun Mehta",
      avatar: "/assets/profile/dr-arjun-mehta.jpg",
    },
    uploadedTime: "2 hours ago",
    size: "3.4 MB",
    category: "study-material",
    semester: "Sem 5",
    subject: "Operating Systems (CSE-501)",
    downloadsCount: 84,
    description:
      "Detailed notes on scheduling algorithms, deadlock handling, semaphore synchronization, and real-time scheduling concepts.",
  },
  {
    id: "rec-2",
    title: "Database Management System (DBMS) Lab Manual",
    subtitle: "Complete SQL & NoSQL Lab Exercises",
    tags: [
      { label: "Lab Manual", color: "teal" },
      { label: "Sem 4", color: "gray" },
    ],
    format: "DOC",
    formatColor: "blue",
    author: {
      name: "Dr. Arjun Mehta",
      avatar: "/assets/profile/dr-arjun-mehta.jpg",
    },
    uploadedTime: "5 hours ago",
    size: "1.2 MB",
    category: "study-material",
    semester: "Sem 4",
    subject: "DBMS Lab (CSE-402L)",
    downloadsCount: 142,
    description:
      "Step-by-step instructions for SQL schema design, normalization, triggers, indexing, and MongoDB aggregation queries.",
  },
  {
    id: "rec-3",
    title: "Machine Learning - Unit 1",
    subtitle: "Foundations of Supervised Learning",
    tags: [
      { label: "Study Material", color: "blue" },
      { label: "Sem 6", color: "gray" },
    ],
    format: "PDF",
    formatColor: "red",
    author: {
      name: "Dr. Neha Sharma",
      avatar: "/assets/profile/dr-arjun-mehta.jpg",
    },
    uploadedTime: "Yesterday",
    size: "4.7 MB",
    category: "study-material",
    semester: "Sem 6",
    subject: "Machine Learning (CSE-601)",
    downloadsCount: 215,
    description:
      "Introduction to regression, classification, bias-variance tradeoff, gradient descent, and model evaluation metrics.",
  },
  {
    id: "rec-4",
    title: "College OS - Project Guidelines",
    subtitle: "Capstone Project Rubric & Milestones",
    tags: [
      { label: "Guidelines", color: "amber" },
      { label: "All Sem", color: "gray" },
    ],
    format: "PPT",
    formatColor: "purple",
    author: {
      name: "HOD (CSE)",
      avatar: "/assets/profile/dr-arjun-mehta.jpg",
    },
    uploadedTime: "2 days ago",
    size: "2.1 MB",
    category: "guidelines",
    semester: "All Sem",
    subject: "Senior Design Project",
    downloadsCount: 520,
    description:
      "Department guidelines for capstone project selection, mentor allocation, synopsis presentation, and final thesis submission standards.",
  },
  {
    id: "rec-5",
    title: "React Components Library",
    subtitle: "Reusable UI Tokens and Starter Kit",
    tags: [
      { label: "Templates", color: "green" },
      { label: "Sem 3", color: "gray" },
    ],
    format: "ZIP",
    formatColor: "green",
    author: {
      name: "Dr. Arjun Mehta",
      avatar: "/assets/profile/dr-arjun-mehta.jpg",
    },
    uploadedTime: "3 days ago",
    size: "8.9 MB",
    category: "forms-templates",
    semester: "Sem 3",
    subject: "Frontend Engineering",
    downloadsCount: 390,
    description:
      "Collection of curated accessible UI widgets, form inputs, modals, and responsive layout shells for student projects.",
  },
  {
    id: "rec-6",
    title: "Computer Networks - Previous Year Paper",
    subtitle: "University Exam Questions & Answer Keys",
    tags: [
      { label: "Previous Papers", color: "purple" },
      { label: "Sem 5", color: "gray" },
    ],
    format: "PDF",
    formatColor: "red",
    author: {
      name: "Dr. Rohan Patel",
      avatar: "/assets/profile/dr-arjun-mehta.jpg",
    },
    uploadedTime: "4 days ago",
    size: "1.6 MB",
    category: "previous-papers",
    semester: "Sem 5",
    subject: "Computer Networks (CSE-502)",
    downloadsCount: 460,
    description:
      "Solved question papers covering OSI layer architecture, TCP/IP protocols, subnetting, routing algorithms, and network security basics.",
  },
];

export const INITIAL_FOLDERS = [
  { id: "f-1", name: "Lecture Slides 2026", category: "study-material", semester: "Sem 5", count: 18 },
  { id: "f-2", name: "Lab Handouts & Rubrics", category: "guidelines", semester: "Sem 4", count: 8 },
  { id: "f-3", name: "Mid-Term Question Banks", category: "previous-papers", semester: "Sem 3", count: 12 },
];

export const MOCK_FACULTY_CLASSES = [
  { id: "cls-1", code: "CSE-301", name: "Data Structures & Algorithms", section: "Section A (Sem 3)", count: 64 },
  { id: "cls-2", code: "CSE-302", name: "Web Development", section: "Section B (Sem 4)", count: 58 },
  { id: "cls-3", code: "CSE-501", name: "Operating Systems", section: "Section A (Sem 5)", count: 62 },
  { id: "cls-4", code: "CSE-402", name: "Database Management Systems", section: "Section C (Sem 4)", count: 60 },
  { id: "cls-5", code: "CSE-601", name: "Machine Learning Elective", section: "Final Year (Sem 6)", count: 45 },
];

export const USEFUL_LINKS = [
  {
    id: "link-1",
    title: "College Library",
    subtitle: "Digital library & ebooks",
    href: "https://library.college.edu",
    icon: "library",
  },
  {
    id: "link-2",
    title: "NPTEL",
    subtitle: "Online courses & lectures",
    href: "https://nptel.ac.in",
    icon: "graduation",
  },
  {
    id: "link-3",
    title: "Coursera",
    subtitle: "Professional certifications",
    href: "https://coursera.org",
    icon: "compass",
  },
  {
    id: "link-4",
    title: "GitHub Student Pack",
    subtitle: "Developer resources",
    href: "https://education.github.com/pack",
    icon: "github",
  },
];
