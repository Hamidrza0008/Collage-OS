import {
  Home,
  User,
  Layers,
  ClipboardCheck,
  Bell,
  Calendar,
  LayoutGrid,
  Briefcase,
  ShieldCheck,
  MessageSquare,
  Sparkles,
  BookOpen,
  CheckSquare,
  Award,
  CalendarDays,
} from "lucide-react";

export const STUDENT_NAV_ITEMS = [
  { label: "Home", icon: Home, href: "/student" },
  { label: "Campus AI", icon: Sparkles, href: "/student/campus-ai", badge: "Featured" },
  { label: "Academics", icon: Layers, href: "/student/academics" },
  { label: "Assignments", icon: ClipboardCheck, href: "/student/assignments" },
  { label: "Notices & Announcements", icon: Bell, href: "/student/notices" },
  { label: "Events", icon: Calendar, href: "/student/events" },
  { label: "Projects", icon: LayoutGrid, href: "/student/projects" },
  { label: "Internships & Hackathons", icon: Briefcase, href: "/student/internships" },
  { label: "Lost & Found", icon: ShieldCheck, href: "/student/lost-and-found" },
  { label: "Campus Feed", icon: MessageSquare, href: "/student/feed" },
  { label: "My Profile", icon: User, href: "/student/profile" },
];

export const FACULTY_NAV_ITEMS = [
  { label: "Dashboard", icon: Home, href: "/faculty" },
  { label: "My Classes", icon: BookOpen, href: "/faculty/classes" },
  { label: "Attendance", icon: CheckSquare, href: "/faculty/attendance" },
  { label: "Assignments", icon: ClipboardCheck, href: "/faculty/assignments" },
  { label: "Marks & Results", icon: Award, href: "/faculty/marks" },
  { label: "Notices & Announcements", icon: Bell, href: "/faculty/notices" },
  { label: "Events", icon: CalendarDays, href: "/faculty/events" },
  { label: "Student Profiles", icon: LayoutGrid, href: "/faculty/students" },
  { label: "Resources", icon: Layers, href: "/faculty/resources" },
  { label: "Campus AI", icon: Sparkles, href: "/faculty/campus-ai", badge: "New" },
];

export const STUDENT_USER = {
  name: "Hamid Rza",
  subtitle: "B.Tech • 7th Sem",
  avatar: "/assets/layout/profile-avatar.jpg",
  role: "student",
};

export const FACULTY_USER = {
  name: "Dr. Arjun Mehta",
  subtitle: "Faculty • Computer Science",
  avatar: "/assets/profile/dr-arjun-mehta.jpg",
  role: "faculty",
};

export const STUDENT_QUOTE = {
  line1: "Better Students",
  line2: "Better Tomorrow",
};

export const FACULTY_QUOTE = {
  line1: "Better Education",
  line2: "Builds a Brighter Future",
};
