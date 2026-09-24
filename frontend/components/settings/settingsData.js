/**
 * Settings Initial Data & Configuration
 */

export const INITIAL_USER_PROFILE = {
  name: "Hamid Rza",
  role: "Student",
  branch: "Computer Science & Engineering",
  semester: "7th Semester",
  rollNumber: "22CS087",
  email: "hamidrza0008@gmail.com",
  phone: "+91 98765 43210",
  verified: true,
  avatar: "/assets/layout/profile-avatar.jpg",
};

export const INITIAL_NOTIFICATIONS = [
  {
    id: "academic",
    title: "Academic Updates",
    description: "Timetable, attendance, marks, results",
    enabled: true,
    icon: "calendar",
  },
  {
    id: "notices",
    title: "Notices & Announcements",
    description: "College notices, important updates",
    enabled: true,
    icon: "bell",
  },
  {
    id: "events",
    title: "Events & Activities",
    description: "Events, workshops, competitions",
    enabled: true,
    icon: "events",
  },
  {
    id: "assignments",
    title: "Assignments",
    description: "New assignments, submission reminders",
    enabled: true,
    icon: "assignments",
  },
  {
    id: "internships",
    title: "Internships & Hackathons",
    description: "New opportunities, application updates",
    enabled: true,
    icon: "briefcase",
  },
  {
    id: "feed",
    title: "Campus Feed",
    description: "Important posts, mentions, replies",
    enabled: true,
    icon: "feed",
  },
];

export const ACCENT_COLORS = [
  { id: "emerald", label: "Emerald Green", hex: "#159B72", bgClass: "bg-[#159B72]" },
  { id: "blue", label: "Ocean Blue", hex: "#3B82F6", bgClass: "bg-[#3B82F6]" },
  { id: "indigo", label: "Royal Indigo", hex: "#6366F1", bgClass: "bg-[#6366F1]" },
  { id: "purple", label: "Deep Purple", hex: "#A855F7", bgClass: "bg-[#A855F7]" },
  { id: "orange", label: "Sunset Orange", hex: "#F97316", bgClass: "bg-[#F97316]" },
  { id: "pink", label: "Rose Pink", hex: "#EC4899", bgClass: "bg-[#EC4899]" },
];

export const ACCOUNT_PROGRESS_ITEMS = [
  { id: "profile", label: "Profile Information", completed: true },
  { id: "academic", label: "Academic Details", completed: true },
  { id: "skills", label: "Skills & Interests", completed: true },
  { id: "social", label: "Social Links", completed: false },
  { id: "projects", label: "Projects", completed: false },
];

export const LOGIN_SESSIONS = [
  {
    id: "sess-1",
    device: "Windows 11 PC (Chrome 128)",
    location: "Campus Wi-Fi • New Delhi, IN",
    time: "Active now",
    current: true,
  },
  {
    id: "sess-2",
    device: "iPhone 15 (Safari Mobile)",
    location: "Cellular • New Delhi, IN",
    time: "2 hours ago",
    current: false,
  },
  {
    id: "sess-3",
    device: "MacBook Air (Firefox)",
    location: "Hostel Wi-Fi • New Delhi, IN",
    time: "Yesterday at 9:42 PM",
    current: false,
  },
];

export const FAQS = [
  {
    question: "How do I update my registered college email or phone number?",
    answer: "Personal details can be edited from the Account Settings tab. Changes to official student roll numbers or university registration IDs require approval from the Academic Registrar.",
  },
  {
    question: "Where can I download my semester marksheets and transcripts?",
    answer: "Visit the Academics > Marks & Grades section in your sidebar to view detailed grade reports and download official digital transcripts.",
  },
  {
    question: "How does College OS handle student privacy and data security?",
    answer: "College OS operates under strict institutional security standards. Your credentials, passwords, and private identifiers are encrypted and never shared with third parties or external AI models.",
  },
];
