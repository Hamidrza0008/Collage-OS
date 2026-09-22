// =============================================================================
// College OS - Projects Master Dataset
// Derived for: All Projects, My Projects, Liked Projects, My Team, Search, Filters
// =============================================================================

export const CURRENT_STUDENT = {
  name: "Hamid Rza",
  avatar: "/assets/layout/profile-avatar.jpg",
  branch: "CSE",
  semester: "7th Sem",
};

export const PROJECT_CATEGORIES = [
  "All",
  "Web Development",
  "Mobile App",
  "AI/ML",
  "Data Science",
  "Game Development",
  "Blockchain",
  "Other",
];

export const BRANCH_OPTIONS = [
  { value: "all", label: "All Branches" },
  { value: "CSE", label: "Computer Science (CSE)" },
  { value: "IT", label: "Information Technology (IT)" },
  { value: "ECE", label: "Electronics & Comm (ECE)" },
  { value: "ME", label: "Mechanical Eng (ME)" },
  { value: "DS", label: "Data Science & AI" },
];

export const SORT_OPTIONS = [
  { value: "latest", label: "Latest First" },
  { value: "most-liked", label: "Most Liked" },
  { value: "most-discussed", label: "Most Discussed" },
  { value: "oldest", label: "Oldest First" },
];

export const CATEGORY_THEMES = {
  "Web Development": {
    badgeBg: "bg-emerald-50 dark:bg-emerald-950/40",
    badgeText: "text-emerald-700 dark:text-emerald-300",
    badgeBorder: "border-emerald-200/80 dark:border-emerald-800/40",
    iconBg: "bg-[#0B4D3C] dark:bg-[#073629]",
    iconColor: "text-white",
    type: "web",
  },
  "AI/ML": {
    badgeBg: "bg-purple-50 dark:bg-purple-950/40",
    badgeText: "text-purple-700 dark:text-purple-300",
    badgeBorder: "border-purple-200/80 dark:border-purple-800/40",
    iconBg: "bg-[#7C3AED] dark:bg-[#6D28D9]",
    iconColor: "text-white",
    type: "ai",
  },
  "Mobile App": {
    badgeBg: "bg-amber-50 dark:bg-amber-950/40",
    badgeText: "text-amber-700 dark:text-amber-300",
    badgeBorder: "border-amber-200/80 dark:border-amber-800/40",
    iconBg: "bg-[#F97316] dark:bg-[#EA580C]",
    iconColor: "text-white",
    type: "mobile",
  },
  "Data Science": {
    badgeBg: "bg-sky-50 dark:bg-sky-950/40",
    badgeText: "text-sky-700 dark:text-sky-300",
    badgeBorder: "border-sky-200/80 dark:border-sky-800/40",
    iconBg: "bg-[#0284C7] dark:bg-[#0369A1]",
    iconColor: "text-white",
    type: "chart",
  },
  "Game Development": {
    badgeBg: "bg-pink-50 dark:bg-pink-950/40",
    badgeText: "text-pink-700 dark:text-pink-300",
    badgeBorder: "border-pink-200/80 dark:border-pink-800/40",
    iconBg: "bg-[#EC4899] dark:bg-[#DB2777]",
    iconColor: "text-white",
    type: "gamepad",
  },
  Blockchain: {
    badgeBg: "bg-indigo-50 dark:bg-indigo-950/40",
    badgeText: "text-indigo-700 dark:text-indigo-300",
    badgeBorder: "border-indigo-200/80 dark:border-indigo-800/40",
    iconBg: "bg-[#8B5CF6] dark:bg-[#7C3AED]",
    iconColor: "text-white",
    type: "link",
  },
  Other: {
    badgeBg: "bg-slate-50 dark:bg-slate-900/50",
    badgeText: "text-slate-700 dark:text-slate-300",
    badgeBorder: "border-slate-200/80 dark:border-slate-800/40",
    iconBg: "bg-[#3B82F6] dark:bg-[#2563EB]",
    iconColor: "text-white",
    type: "lightbulb",
  },
};

export const INITIAL_PROJECTS = [
  // ---------------------------------------------------------------------------
  // Project 1 - Core Initial Project (Page 1)
  // ---------------------------------------------------------------------------
  {
    id: "proj-1",
    title: "College OS - Campus Platform",
    category: "Web Development",
    description:
      "A comprehensive digital campus platform with student, faculty and college management features.",
    tech: ["Next.js", "Node.js", "MongoDB", "Express.js", "Tailwind CSS"],
    type: "Team Project",
    membersCount: 3,
    members: [
      { name: "Hamid Rza", avatar: "/assets/layout/profile-avatar.jpg", role: "Lead Developer" },
      { name: "Priya Patel", avatar: "/assets/events/avatars/avatar-1.jpg", role: "UI/UX Designer" },
      { name: "Aryan Verma", avatar: "/assets/events/avatars/avatar-2.jpg", role: "Backend Engineer" },
    ],
    likes: 124,
    commentsCount: 18,
    comments: [
      { id: "c1", author: "Dr. Sharma", text: "Great architecture and clean UI system!", time: "1 day ago" },
      { id: "c2", author: "Rohan", text: "Super responsive, looking forward to deploying it!", time: "2 days ago" },
    ],
    updatedAt: "2 days ago",
    timestamp: Date.now() - 2 * 24 * 60 * 60 * 1000,
    branch: "CSE",
    author: "Hamid Rza",
    isMyProject: true,
    isTeamProject: true,
    isLiked: true,
    isBookmarked: true,
    iconStyle: "leaf",
    githubUrl: "https://github.com/hamidrza0008/collage-os",
    demoUrl: "https://college-os.dev",
    highlights: [
      "Role-based portals for Students & Faculty",
      "Real-time announcements and event notifications",
      "Interactive academic grade calculator & attendance tracker",
    ],
  },

  // ---------------------------------------------------------------------------
  // Project 2 - Core Initial Project (Page 1)
  // ---------------------------------------------------------------------------
  {
    id: "proj-2",
    title: "AI Study Assistant",
    category: "AI/ML",
    description:
      "An AI-powered study assistant that helps students with notes, explanations and doubt solving.",
    tech: ["Next.js", "OpenAI", "Tailwind", "LangChain", "FastAPI"],
    type: "Team Project",
    membersCount: 2,
    members: [
      { name: "Neha Sharma", avatar: "/assets/events/avatars/avatar-2.jpg", role: "ML Engineer" },
      { name: "Hamid Rza", avatar: "/assets/layout/profile-avatar.jpg", role: "Frontend Developer" },
    ],
    likes: 89,
    commentsCount: 12,
    comments: [
      { id: "c3", author: "Aisha", text: "Helped me understand compiler design concepts easily.", time: "1 day ago" },
    ],
    updatedAt: "3 days ago",
    timestamp: Date.now() - 3 * 24 * 60 * 60 * 1000,
    branch: "CSE",
    author: "Neha Sharma",
    isMyProject: false,
    isTeamProject: true,
    isLiked: true,
    isBookmarked: false,
    iconStyle: "ai",
    githubUrl: "https://github.com/campus-ai/study-assistant",
    demoUrl: "https://study-ai.campus.edu",
    highlights: [
      "RAG-based syllabus indexing for rapid retrieval",
      "Flashcard generator and smart practice quizzes",
      "Multi-modal diagram explanation engine",
    ],
  },

  // ---------------------------------------------------------------------------
  // Project 3 - Core Initial Project (Page 1)
  // ---------------------------------------------------------------------------
  {
    id: "proj-3",
    title: "Eventify - College Events App",
    category: "Mobile App",
    description:
      "Discover, join and manage college events, workshops and competitions in one place.",
    tech: ["React Native", "Firebase", "Expo", "Tailwind"],
    type: "Individual",
    membersCount: 1,
    members: [
      { name: "Rohan Gupta", avatar: "/assets/events/avatars/avatar-3.jpg", role: "Mobile Developer" },
    ],
    likes: 67,
    commentsCount: 9,
    comments: [
      { id: "c4", author: "Vikram", text: "Push notifications work smoothly during fest week.", time: "3 days ago" },
    ],
    updatedAt: "4 days ago",
    timestamp: Date.now() - 4 * 24 * 60 * 60 * 1000,
    branch: "IT",
    author: "Rohan Gupta",
    isMyProject: false,
    isTeamProject: false,
    isLiked: false,
    isBookmarked: false,
    iconStyle: "mobile",
    githubUrl: "https://github.com/rohangupta/eventify",
    demoUrl: "https://eventify-app.dev",
    highlights: [
      "QR code check-ins for hackathons and workshops",
      "Offline sync for campus network dead zones",
      "Personalized schedule builder and bookmarking",
    ],
  },

  // ---------------------------------------------------------------------------
  // Project 4 - Core Initial Project (Page 1)
  // ---------------------------------------------------------------------------
  {
    id: "proj-4",
    title: "Campus Placement Predictor",
    category: "Data Science",
    description:
      "Machine learning model to predict placement chances based on student profiles and skills.",
    tech: ["Python", "Pandas", "Scikit-learn", "Streamlit"],
    type: "Team Project",
    membersCount: 4,
    members: [
      { name: "Ananya Roy", avatar: "/assets/events/avatars/avatar-1.jpg", role: "Data Scientist" },
      { name: "Siddharth Sen", avatar: "/assets/events/avatars/avatar-2.jpg", role: "ML Engineer" },
      { name: "Vikram Joshi", avatar: "/assets/events/avatars/avatar-3.jpg", role: "Data Analyst" },
      { name: "Divya Rao", avatar: "/assets/layout/profile-avatar.jpg", role: "Dashboard Dev" },
    ],
    likes: 143,
    commentsCount: 21,
    comments: [
      { id: "c5", author: "Placement Cell", text: "Impressive accuracy on historical 5-year data.", time: "4 days ago" },
    ],
    updatedAt: "1 week ago",
    timestamp: Date.now() - 7 * 24 * 60 * 60 * 1000,
    branch: "CSE",
    author: "Ananya Roy",
    isMyProject: false,
    isTeamProject: false,
    isLiked: true,
    isBookmarked: true,
    iconStyle: "chart",
    githubUrl: "https://github.com/ananya-roy/placement-predictor",
    demoUrl: "https://placement-ml.streamlit.app",
    highlights: [
      "94.2% test accuracy using Random Forest & XGBoost",
      "Skill-gap recommendations for target product companies",
      "Resume scoring breakdown against job descriptions",
    ],
  },

  // ---------------------------------------------------------------------------
  // Project 5 - Core Initial Project (Page 1)
  // ---------------------------------------------------------------------------
  {
    id: "proj-5",
    title: "DevReview",
    category: "Web Development",
    description:
      "A platform to review developers, projects and technical skills with a community-driven approach.",
    tech: ["Next.js", "Express", "MongoDB", "JWT", "TypeScript"],
    type: "Personal",
    membersCount: 1,
    members: [
      { name: "Hamid Rza", avatar: "/assets/layout/profile-avatar.jpg", role: "Full Stack Engineer" },
    ],
    likes: 98,
    commentsCount: 14,
    comments: [
      { id: "c6", author: "Kavita", text: "Code review snippets are very intuitive to read.", time: "2 days ago" },
    ],
    updatedAt: "5 days ago",
    timestamp: Date.now() - 5 * 24 * 60 * 60 * 1000,
    branch: "CSE",
    author: "Hamid Rza",
    isMyProject: true,
    isTeamProject: false,
    isLiked: false,
    isBookmarked: false,
    iconStyle: "globe",
    githubUrl: "https://github.com/hamidrza0008/dev-review",
    demoUrl: "https://devreview.io",
    highlights: [
      "Markdown & diff-highlighting for asynchronous code reviews",
      "Peer badge endorsements tied to GitHub profiles",
      "Searchable repository showcases with live previews",
    ],
  },

  // ---------------------------------------------------------------------------
  // Project 6 - Core Initial Project (Page 1)
  // ---------------------------------------------------------------------------
  {
    id: "proj-6",
    title: "Pixel Quest",
    category: "Game Development",
    description:
      "A 2D platformer game built with modern web technologies and smooth animations.",
    tech: ["Unity", "C#", "Blender", "PixiJS"],
    type: "Team Project",
    membersCount: 3,
    members: [
      { name: "Kavita Nair", avatar: "/assets/events/avatars/avatar-1.jpg", role: "Game Designer" },
      { name: "Devansh Shah", avatar: "/assets/events/avatars/avatar-2.jpg", role: "Gameplay Dev" },
      { name: "Rohit Mehra", avatar: "/assets/events/avatars/avatar-3.jpg", role: "Pixel Artist" },
    ],
    likes: 76,
    commentsCount: 11,
    comments: [
      { id: "c7", author: "Sumeet", text: "The boss fights on level 4 are insanely fun!", time: "5 days ago" },
    ],
    updatedAt: "6 days ago",
    timestamp: Date.now() - 6 * 24 * 60 * 60 * 1000,
    branch: "ECE",
    author: "Kavita Nair",
    isMyProject: false,
    isTeamProject: false,
    isLiked: false,
    isBookmarked: false,
    iconStyle: "gamepad",
    githubUrl: "https://github.com/pixel-quest/game",
    demoUrl: "https://pixelquest.play.io",
    highlights: [
      "Custom 60 FPS physics engine with responsive wall-jumps",
      "Chiptune original soundtrack and retro sound effects",
      "Global leaderboard syncing with campus tournaments",
    ],
  },

  // ---------------------------------------------------------------------------
  // Project 7 - Core Initial Project (Page 1)
  // ---------------------------------------------------------------------------
  {
    id: "proj-7",
    title: "Decentralized Voting System",
    category: "Blockchain",
    description:
      "A secure and transparent voting system using blockchain technology.",
    tech: ["Solidity", "React", "Ethers.js", "IPFS"],
    type: "Team Project",
    membersCount: 2,
    members: [
      { name: "Aditya Kumar", avatar: "/assets/events/avatars/avatar-3.jpg", role: "Smart Contract Dev" },
      { name: "Tanvi Deshmukh", avatar: "/assets/events/avatars/avatar-1.jpg", role: "Frontend Dev" },
    ],
    likes: 58,
    commentsCount: 7,
    comments: [
      { id: "c8", author: "Rahul", text: "Zero-knowledge proofs prevent vote tampering cleanly.", time: "6 days ago" },
    ],
    updatedAt: "1 week ago",
    timestamp: Date.now() - 7 * 24 * 60 * 60 * 1000,
    branch: "IT",
    author: "Aditya Kumar",
    isMyProject: false,
    isTeamProject: false,
    isLiked: false,
    isBookmarked: false,
    iconStyle: "link",
    githubUrl: "https://github.com/aditya-k/eth-vote",
    demoUrl: "https://dec-voting.eth.limo",
    highlights: [
      "Ethereum smart contracts audited for student council elections",
      "IPFS metadata persistence with tamper-evident hashes",
      "Gas-optimized voter verification via Merkle trees",
    ],
  },

  // ---------------------------------------------------------------------------
  // Project 8 - Core Initial Project (Page 1)
  // ---------------------------------------------------------------------------
  {
    id: "proj-8",
    title: "Smart Attendance System",
    category: "Other",
    description:
      "Automated attendance system using face recognition and real-time analytics.",
    tech: ["Python", "OpenCV", "Flask", "MongoDB"],
    type: "Individual",
    membersCount: 1,
    members: [
      { name: "Sameer Khan", avatar: "/assets/events/avatars/avatar-2.jpg", role: "Computer Vision Dev" },
    ],
    likes: 41,
    commentsCount: 6,
    comments: [
      { id: "c9", author: "Prof. Verma", text: "Tested in Lab 3 with 98% detection in seconds.", time: "6 days ago" },
    ],
    updatedAt: "1 week ago",
    timestamp: Date.now() - 8 * 24 * 60 * 60 * 1000,
    branch: "ECE",
    author: "Sameer Khan",
    isMyProject: false,
    isTeamProject: false,
    isLiked: false,
    isBookmarked: false,
    iconStyle: "lightbulb",
    githubUrl: "https://github.com/sameerkhan/smart-attendance",
    demoUrl: "https://smart-attendance.demo.net",
    highlights: [
      "Dual face anti-spoofing algorithm using depth estimation",
      "Instant export to College OS faculty gradebook",
      "Under 200ms recognition latency across 60-student batches",
    ],
  },

  // ---------------------------------------------------------------------------
  // Project 9 - Core Initial Project (Page 1)
  // ---------------------------------------------------------------------------
  {
    id: "proj-9",
    title: "Green Campus Initiative",
    category: "Web Development",
    description:
      "A platform to track and manage eco-friendly campus activities, recycling drives and sustainability efforts.",
    tech: ["Next.js", "Tailwind", "MongoDB", "Postman"],
    type: "Team Project",
    membersCount: 3,
    members: [
      { name: "Hamid Rza", avatar: "/assets/layout/profile-avatar.jpg", role: "Team Lead" },
      { name: "Aisha Siddiqui", avatar: "/assets/events/avatars/avatar-1.jpg", role: "Environmental Coord" },
      { name: "Rahul Bhatia", avatar: "/assets/events/avatars/avatar-3.jpg", role: "Frontend Dev" },
    ],
    likes: 36,
    commentsCount: 5,
    comments: [
      { id: "c10", author: "EcoClub", text: "Solar audit metrics are already tracking accurately!", time: "1 week ago" },
    ],
    updatedAt: "2 weeks ago",
    timestamp: Date.now() - 14 * 24 * 60 * 60 * 1000,
    branch: "ME",
    author: "Hamid Rza",
    isMyProject: true,
    isTeamProject: true,
    isLiked: false,
    isBookmarked: false,
    iconStyle: "sprout",
    githubUrl: "https://github.com/green-campus/initiative",
    demoUrl: "https://greencampus.campus.edu",
    highlights: [
      "Campus energy waste tracking & carbon footprint estimation",
      "Recycling drive leaderboard for student hostels",
      "Integrated tree plantation registry with GPS tags",
    ],
  },

  // ---------------------------------------------------------------------------
  // Additional Projects for Page 2 Pagination Experience
  // ---------------------------------------------------------------------------
  {
    id: "proj-10",
    title: "Campus Lost & Found Portal",
    category: "Web Development",
    description:
      "An intelligent portal to quickly find and report lost belongings with image similarity matching.",
    tech: ["React", "FastAPI", "TensorFlow", "Tailwind"],
    type: "Team Project",
    membersCount: 2,
    members: [
      { name: "Hamid Rza", avatar: "/assets/layout/profile-avatar.jpg", role: "Full Stack Dev" },
      { name: "Meera Nair", avatar: "/assets/events/avatars/avatar-1.jpg", role: "CV Engineer" },
    ],
    likes: 52,
    commentsCount: 8,
    comments: [],
    updatedAt: "2 weeks ago",
    timestamp: Date.now() - 15 * 24 * 60 * 60 * 1000,
    branch: "CSE",
    author: "Hamid Rza",
    isMyProject: true,
    isTeamProject: true,
    isLiked: false,
    isBookmarked: false,
    iconStyle: "leaf",
    githubUrl: "https://github.com/hamidrza0008/lost-and-found",
    demoUrl: "https://lostfound.collegeos.edu",
  },
  {
    id: "proj-11",
    title: "Autonomous Drone Navigator",
    category: "AI/ML",
    description:
      "Computer vision-based indoor navigation system for quadcopters without GPS coverage.",
    tech: ["ROS2", "Python", "YOLOv8", "C++"],
    type: "Team Project",
    membersCount: 4,
    members: [
      { name: "Kunal Shah", avatar: "/assets/events/avatars/avatar-2.jpg", role: "Robotics Lead" },
      { name: "Deepak S", avatar: "/assets/events/avatars/avatar-3.jpg", role: "Embedded Dev" },
    ],
    likes: 83,
    commentsCount: 15,
    comments: [],
    updatedAt: "2 weeks ago",
    timestamp: Date.now() - 16 * 24 * 60 * 60 * 1000,
    branch: "ECE",
    author: "Kunal Shah",
    isMyProject: false,
    isTeamProject: false,
    isLiked: false,
    isBookmarked: false,
    iconStyle: "ai",
    githubUrl: "https://github.com/robotics-lab/drone-nav",
    demoUrl: "https://drone-nav.lab.org",
  },
  {
    id: "proj-12",
    title: "Campus Transit & Bus Tracker",
    category: "Mobile App",
    description:
      "Real-time GPS tracking of college shuttle buses with estimated arrival times and route alerts.",
    tech: ["Flutter", "Dart", "Node.js", "WebSockets"],
    type: "Individual",
    membersCount: 1,
    members: [
      { name: "Zoya Khan", avatar: "/assets/events/avatars/avatar-1.jpg", role: "Mobile Engineer" },
    ],
    likes: 64,
    commentsCount: 10,
    comments: [],
    updatedAt: "3 weeks ago",
    timestamp: Date.now() - 21 * 24 * 60 * 60 * 1000,
    branch: "IT",
    author: "Zoya Khan",
    isMyProject: false,
    isTeamProject: false,
    isLiked: false,
    isBookmarked: false,
    iconStyle: "mobile",
    githubUrl: "https://github.com/zoyakhan/bus-tracker",
    demoUrl: "https://campus-transit.app",
  },
  {
    id: "proj-13",
    title: "Academic Sentiment Analyzer",
    category: "Data Science",
    description:
      "NLP framework evaluating student feedback to highlight departmental strengths and curriculum bottlenecks.",
    tech: ["Python", "HuggingFace", "BERT", "Streamlit"],
    type: "Team Project",
    membersCount: 2,
    members: [
      { name: "Pooja Reddy", avatar: "/assets/events/avatars/avatar-1.jpg", role: "NLP Researcher" },
      { name: "Aryan Verma", avatar: "/assets/events/avatars/avatar-2.jpg", role: "Data Engineer" },
    ],
    likes: 47,
    commentsCount: 7,
    comments: [],
    updatedAt: "3 weeks ago",
    timestamp: Date.now() - 22 * 24 * 60 * 60 * 1000,
    branch: "CSE",
    author: "Pooja Reddy",
    isMyProject: false,
    isTeamProject: false,
    isLiked: false,
    isBookmarked: false,
    iconStyle: "chart",
    githubUrl: "https://github.com/nlp-group/feedback-bert",
    demoUrl: "https://feedback-analyzer.org",
  },
  {
    id: "proj-14",
    title: "Virtual Chemistry Lab VR",
    category: "Game Development",
    description:
      "Interactive 3D virtual reality lab simulation for chemical titration and safe hazardous experiments.",
    tech: ["Unreal Engine 5", "C++", "Oculus SDK", "Blender"],
    type: "Team Project",
    membersCount: 3,
    members: [
      { name: "Rishabh Jain", avatar: "/assets/events/avatars/avatar-3.jpg", role: "VR Architect" },
      { name: "Sonali Rao", avatar: "/assets/events/avatars/avatar-1.jpg", role: "3D Modeler" },
    ],
    likes: 92,
    commentsCount: 16,
    comments: [],
    updatedAt: "1 month ago",
    timestamp: Date.now() - 30 * 24 * 60 * 60 * 1000,
    branch: "ME",
    author: "Rishabh Jain",
    isMyProject: false,
    isTeamProject: false,
    isLiked: false,
    isBookmarked: false,
    iconStyle: "gamepad",
    githubUrl: "https://github.com/vr-chem/lab-simulator",
    demoUrl: "https://vrchem.college.edu",
  },
  {
    id: "proj-15",
    title: "NFT Degree Credential Issuer",
    category: "Blockchain",
    description:
      "Soulbound tokens for verifiable and fraud-proof digital university degrees on Polygon.",
    tech: ["Solidity", "Hardhat", "Polygon", "Next.js"],
    type: "Individual",
    membersCount: 1,
    members: [
      { name: "Hamid Rza", avatar: "/assets/layout/profile-avatar.jpg", role: "Blockchain Dev" },
    ],
    likes: 71,
    commentsCount: 13,
    comments: [],
    updatedAt: "1 month ago",
    timestamp: Date.now() - 32 * 24 * 60 * 60 * 1000,
    branch: "CSE",
    author: "Hamid Rza",
    isMyProject: true,
    isTeamProject: false,
    isLiked: false,
    isBookmarked: false,
    iconStyle: "link",
    githubUrl: "https://github.com/hamidrza0008/soulbound-degrees",
    demoUrl: "https://degree-verify.polygon.id",
  },
];

// =============================================================================
// Top Projects (This Week) Ranking Data
// =============================================================================
export const TOP_PROJECTS_WEEK = [
  {
    rank: 1,
    id: "proj-1",
    title: "College OS - Campus Platform",
    likes: 124,
    comments: 18,
    category: "Web Development",
    iconStyle: "leaf",
    badgeColor: "emerald",
  },
  {
    rank: 2,
    id: "proj-2",
    title: "AI Study Assistant",
    likes: 89,
    comments: 12,
    category: "AI/ML",
    iconStyle: "ai",
    badgeColor: "purple",
  },
  {
    rank: 3,
    id: "proj-3",
    title: "Eventify - College Events App",
    likes: 67,
    comments: 9,
    category: "Mobile App",
    iconStyle: "mobile",
    badgeColor: "amber",
  },
  {
    rank: 4,
    id: "proj-5",
    title: "DevReview",
    likes: 98,
    comments: 14,
    category: "Web Development",
    iconStyle: "globe",
    badgeColor: "neutral",
  },
  {
    rank: 5,
    id: "proj-6",
    title: "Pixel Quest",
    likes: 76,
    comments: 11,
    category: "Game Development",
    iconStyle: "gamepad",
    badgeColor: "neutral",
  },
];
