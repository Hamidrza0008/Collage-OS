import { INITIAL_INTERNSHIPS, INITIAL_HACKATHONS } from "../internshipsData";

export const DETAILED_OPPORTUNITIES = {
  "intern-1": {
    id: "intern-1",
    type: "internship",
    opportunityTypeLabel: "Software Engineering Internship",
    title: "Google STEP Internship – Summer 2026",
    tagline: "Student Training in Engineering Program for early undergraduate developers.",
    company: "Google",
    companyType: "Product Tech Giant",
    companyCategory: "Cloud & Internet Services",
    companyWebsite: "https://careers.google.com/students",
    companyLinkedIn: "https://linkedin.com/company/google",
    logoType: "google",
    verified: true,
    badge: "Featured",
    status: "Application Open",
    openToAll: true,
    featured: true,
    location: "Bangalore / Hyderabad / Remote",
    workMode: "Hybrid / Remote",
    duration: "12 Weeks (Dec 2025 – Feb 2026)",
    startDate: "01 Dec 2025",
    endDate: "28 Feb 2026",
    deadline: "15 Oct 2025",
    deadlineStatus: "Open",
    applicationsCount: "2.4k applied",
    openings: "45 Positions",
    stipend: "₹65,000 / month",
    compensationType: "stipend",
    perks: [
      "Monthly Housing & Travel Allowance",
      "Full Mentorship from Google Staff Engineers",
      "Pre-Placement Interview (PPI) for 2027 FTE",
      "Workstation hardware provided (MacBook Pro)",
      "Certificate of Internship Excellence",
    ],
    aboutRole:
      "The Student Training in Engineering Program (STEP) is a 12-week development internship for undergraduate students with a passion for computer science. STEP interns work on real software projects alongside full-time Google engineers and receive structured coaching, technical skill development, and executive leadership exposure.",
    aboutCompany:
      "Google’s mission is to organize the world’s information and make it universally accessible and useful. From Search and Android to Cloud and AI, Google engineers build products that impact billions of people globally every single day.",
    responsibilities: [
      "Collaborate with assigned mentor pods to design, develop, test, and deploy features on Google Cloud or internal engineering platforms.",
      "Write clean, maintainable, and well-tested code using C++, Java, Python, or Go.",
      "Participate in code reviews, technical architecture discussions, and agile sprint planning.",
      "Deliver an end-of-internship capstone presentation showcasing project impact to engineering leaders.",
    ],
    eligibility: {
      degree: "B.Tech / B.E / Dual Degree in Computer Science, IT, or related STEM disciplines",
      eligibleYears: "1st & 2nd Year Undergraduates (Graduation Batch 2027 or 2028)",
      minCgpa: "7.5 CGPA or equivalent aggregate",
      backlogs: "No active backlogs allowed",
      studentMatch: "eligible",
      studentMatchReason: "You match degree (B.Tech CSE), academic criteria (8.4 CGPA), and eligible graduation year.",
    },
    skills: ["Data Structures & Algorithms", "Python", "Java", "C++", "Web Development", "Git"],
    preferredSkills: ["Google Cloud Platform", "Machine Learning Basics", "Distributed Systems", "Docker"],
    skillMatch: {
      score: 84,
      matched: ["Data Structures & Algorithms", "Python", "Web Development", "Git"],
      missing: ["C++", "Google Cloud Platform", "Docker"],
      relevantProjects: [
        "Distributed File Storage System (Cloud)",
        "Student Attendance Biometric Portal",
      ],
    },
    selectionProcess: [
      { step: 1, name: "Application & Resume Screen", date: "15 Oct 2025", status: "upcoming" },
      { step: 2, name: "Online Coding Assessment (2 Problems)", date: "22 Oct 2025", status: "upcoming" },
      { step: 3, name: "Technical Interview Round 1 (DSA)", date: "05 Nov 2025", status: "upcoming" },
      { step: 4, name: "Technical Interview Round 2 (System Design Basics)", date: "12 Nov 2025", status: "upcoming" },
      { step: 5, name: "Final Offer Rollout", date: "20 Nov 2025", status: "upcoming" },
    ],
    importantDates: [
      { label: "Application Opens", date: "01 Sep 2025" },
      { label: "Submission Deadline", date: "15 Oct 2025", isDeadline: true },
      { label: "Online Assessment", date: "22 Oct 2025" },
      { label: "Interviews", date: "Nov 2025" },
      { label: "Internship Commences", date: "01 Dec 2025" },
    ],
    documents: [
      {
        id: "doc-1",
        name: "Google_STEP_Internship_Brochure_2026.pdf",
        size: "1.8 MB",
        type: "PDF Document",
        description: "Official program syllabus, eligibility standards, and project tracks.",
      },
      {
        id: "doc-2",
        name: "Campus_Code_Of_Conduct_Guidelines.pdf",
        size: "650 KB",
        type: "PDF Document",
        description: "Google university hiring interview prep and behavioral guidelines.",
      },
    ],
    relatedIds: ["intern-2", "intern-4", "hack-1"],
  },

  "intern-2": {
    id: "intern-2",
    type: "internship",
    opportunityTypeLabel: "Rotational Engineering Internship",
    title: "Microsoft Explore Internship Program",
    tagline: "16-week rotational experience across Software Engineering and Product Management.",
    company: "Microsoft",
    companyType: "Cloud & Enterprise Computing",
    companyCategory: "AI, Azure & Productivity Software",
    companyWebsite: "https://careers.microsoft.com/students",
    companyLinkedIn: "https://linkedin.com/company/microsoft",
    logoType: "microsoft",
    verified: true,
    badge: "High Demand",
    status: "Application Open",
    openToAll: true,
    featured: true,
    location: "Hyderabad / Bangalore / Hybrid",
    workMode: "Hybrid",
    duration: "16 Weeks (Jan 2026 – Apr 2026)",
    startDate: "05 Jan 2026",
    endDate: "24 Apr 2026",
    deadline: "30 Oct 2025",
    deadlineStatus: "Open",
    applicationsCount: "3.8k applied",
    openings: "30 Positions",
    stipend: "₹80,000 / month",
    compensationType: "stipend",
    perks: [
      "Company Leased Accommodation in Bangalore/Hyderabad",
      "Executive 1-on-1 Mentorship from Azure Principal Leads",
      "Fast-track PPO evaluation for Microsoft SWE II",
      "High-end Surface Laptop Studio workstation",
      "Full access to Microsoft Learn certifications",
    ],
    aboutRole:
      "Explore Microsoft is a 16-week rotational internship program specifically designed for early-career students. It allows interns to rotate between Software Engineering (SWE) and Program Management (PM), gaining end-to-end exposure from user research to backend cloud implementation.",
    aboutCompany:
      "Microsoft enables digital transformation for the era of an intelligent cloud and an intelligent edge. Its mission is to empower every person and every organization on the planet to achieve more.",
    responsibilities: [
      "Work within cross-functional teams to ideate, prototype, and build features for Microsoft 365, Azure, or GitHub.",
      "Conduct user problem validation, author Product Requirement Documents (PRDs), and define functional specs.",
      "Implement responsive frontend components in React/TypeScript and scalable C# / .NET / Python microservices.",
      "Present project prototypes to engineering directors during the Microsoft Intern Demo Fair.",
    ],
    eligibility: {
      degree: "B.Tech / B.E / M.Tech in CS, IT, ECE, or Mathematics & Computing",
      eligibleYears: "2nd & 3rd Year Students",
      minCgpa: "7.0 CGPA",
      backlogs: "Allowed max 1 cleared backlog",
      studentMatch: "eligible",
      studentMatchReason: "Your academic profile meets all branch, semester, and CGPA requirements.",
    },
    skills: ["Full Stack", "TypeScript", "React", "Cloud Architecture", "Object Oriented Design"],
    preferredSkills: ["Azure Services", "C#", ".NET Core", "REST APIs", "AI Copilot Integration"],
    skillMatch: {
      score: 80,
      matched: ["React", "TypeScript", "REST APIs", "Object Oriented Design"],
      missing: ["Azure Services", "C#", ".NET Core"],
      relevantProjects: [
        "AI Campus Course Assistant",
        "React Collaborative Canvas",
      ],
    },
    selectionProcess: [
      { step: 1, name: "Application Screening", date: "30 Oct 2025", status: "upcoming" },
      { step: 2, name: "Online Coding & Aptitude Test", date: "07 Nov 2025", status: "upcoming" },
      { step: 3, name: "Technical Round (Algorithms & Data Structures)", date: "18 Nov 2025", status: "upcoming" },
      { step: 4, name: "Product Sense & Culture Interview", date: "24 Nov 2025", status: "upcoming" },
      { step: 5, name: "Final Selection & Onboarding Call", date: "05 Dec 2025", status: "upcoming" },
    ],
    importantDates: [
      { label: "Applications Open", date: "15 Sep 2025" },
      { label: "Application Deadline", date: "30 Oct 2025", isDeadline: true },
      { label: "Assessments", date: "Early Nov 2025" },
      { label: "Interviews", date: "Late Nov 2025" },
      { label: "Joining Date", date: "05 Jan 2026" },
    ],
    documents: [
      {
        id: "doc-201",
        name: "Microsoft_Explore_Internship_Job_Description.pdf",
        size: "1.2 MB",
        type: "PDF Document",
        description: "Detailed job specifications, rotational tracks, and compensation package breakdown.",
      },
    ],
    relatedIds: ["intern-1", "intern-4", "hack-2"],
  },

  "hack-1": {
    id: "hack-1",
    type: "hackathon",
    opportunityTypeLabel: "Global 48-Hour Hackathon",
    title: "Google GenAI Hackathon 2025",
    tagline: "Build innovative multi-modal AI agents and real-world tools using Gemini API.",
    company: "Google Developers",
    companyType: "Developer Ecosystem",
    companyCategory: "Artificial Intelligence & Developer Tools",
    companyWebsite: "https://developers.google.com",
    companyLinkedIn: "https://linkedin.com/company/google",
    logoType: "google-dev",
    verified: true,
    badge: "Prize Pool",
    status: "Application Open",
    openToAll: true,
    featured: true,
    location: "Online / Global",
    workMode: "Online / Remote",
    duration: "48 Hours (10 Oct – 12 Oct 2025)",
    startDate: "10 Oct 2025, 06:00 PM",
    endDate: "12 Oct 2025, 06:00 PM",
    deadline: "08 Oct 2025",
    deadlineStatus: "Closing Soon",
    applicationsCount: "5.2k registered",
    openings: "Top 50 Finalist Teams",
    prizePool: "₹5,00,000 Cash Prize Pool",
    stipend: "₹5,00,000 Prize Pool",
    compensationType: "prize",
    perks: [
      "1st Prize: ₹2,50,000 Cash + Google Cloud Credits ($5,000)",
      "2nd Prize: ₹1,50,000 Cash + Google Cloud Credits ($2,500)",
      "3rd Prize: ₹1,00,000 Cash + Swag Kits",
      "Direct fast-track interview referrals for all Top 10 Teams",
      "Exclusive Gemini Ultra API compute access during hackathon",
    ],
    aboutRole:
      "The Google GenAI Hackathon invites university developers and innovators to build production-ready applications powered by Gemini models, LangChain, and Firebase cloud services. Whether you're building automated accessibility tools, intelligent agents, or developer productivity extensions, this hackathon is your launchpad.",
    aboutCompany:
      "Google Developers represents Google's global community of engineers, researchers, and creators. We provide tools, SDKs, and platform APIs to help developers build the next generation of scalable applications.",
    responsibilities: [
      "Form a team of 1 to 4 members and submit project idea before the kickoff bell.",
      "Build a functional software prototype leveraging Google Gemini API or Gemma open weights.",
      "Provide a public GitHub repository with comprehensive README and deployment instructions.",
      "Submit a 3-minute video demonstration showcasing the problem, architecture, and live application.",
    ],
    eligibility: {
      degree: "Open to all enrolled university undergraduate and postgraduate students",
      eligibleYears: "All Academic Years (1st to 4th Year)",
      minCgpa: "No CGPA restrictions",
      backlogs: "No restrictions",
      studentMatch: "eligible",
      studentMatchReason: "You are fully eligible to participate individually or as a team leader.",
    },
    skills: ["Generative AI", "Gemini API", "Python", "React", "LangChain", "Firebase"],
    preferredSkills: ["Vector Databases", "Prompt Engineering", "Full Stack Deployment", "Docker"],
    skillMatch: {
      score: 90,
      matched: ["Generative AI", "Python", "React", "Firebase"],
      missing: ["LangChain", "Vector Databases"],
      relevantProjects: [
        "AI Campus Course Assistant",
        "Full-Stack Study Room Platform",
      ],
    },
    selectionProcess: [
      { step: 1, name: "Registration & Team Verification", date: "08 Oct 2025", status: "upcoming" },
      { step: 2, name: "Hacking Starts & API Keys Released", date: "10 Oct 2025, 6 PM", status: "upcoming" },
      { step: 3, name: "Mentor Review & Mid-Hack Checkpoint", date: "11 Oct 2025, 2 PM", status: "upcoming" },
      { step: 4, name: "Code Freeze & Video Submission", date: "12 Oct 2025, 6 PM", status: "upcoming" },
      { step: 5, name: "Top 10 Demo Day & Winners Announcement", date: "15 Oct 2025", status: "upcoming" },
    ],
    importantDates: [
      { label: "Registrations Close", date: "08 Oct 2025, 11:59 PM", isDeadline: true },
      { label: "Hackathon Begins", date: "10 Oct 2025, 06:00 PM" },
      { label: "Submission Deadline", date: "12 Oct 2025, 06:00 PM" },
      { label: "Winner Ceremony", date: "15 Oct 2025" },
    ],
    documents: [
      {
        id: "doc-h1",
        name: "Google_GenAI_Hackathon_Rulebook_2025.pdf",
        size: "2.1 MB",
        type: "PDF Document",
        description: "Official judging rubrics, permitted APIs, submission guidelines, and code of conduct.",
      },
    ],
    relatedIds: ["hack-2", "intern-1", "intern-4"],
  },

  "hack-2": {
    id: "hack-2",
    type: "hackathon",
    opportunityTypeLabel: "Global Student Technology Challenge",
    title: "Microsoft Imagine Cup 2026",
    tagline: "Dream it. Build it. Live it. Compete for $100,000 USD and global mentorship.",
    company: "Microsoft",
    companyType: "Global Innovation Challenge",
    companyCategory: "Cloud, AI & Social Impact",
    companyWebsite: "https://imaginecup.microsoft.com",
    companyLinkedIn: "https://linkedin.com/company/microsoft",
    logoType: "microsoft",
    verified: true,
    badge: "Popular",
    status: "Application Open",
    openToAll: true,
    featured: true,
    location: "Online / Hybrid",
    workMode: "Hybrid",
    duration: "3 Days Finals (15 Nov – 17 Nov 2025)",
    startDate: "15 Nov 2025",
    endDate: "17 Nov 2025",
    deadline: "01 Nov 2025",
    deadlineStatus: "Open",
    applicationsCount: "8.7k registered",
    openings: "Top 3 World Finalist Teams",
    prizePool: "$100,000 USD Global Grand Prize",
    stipend: "$100,000 USD Prize Pool",
    compensationType: "prize",
    perks: [
      "Global Grand Prize: $100,000 USD + Mentorship session with Microsoft CEO Satya Nadella",
      "Category Winners: $20,000 USD + Azure sponsorship",
      "All Regional Semifinalists receive $1,000 Azure AI Credits",
      "Opportunity to pitch to Silicon Valley angel investors",
    ],
    aboutRole:
      "For over two decades, the Imagine Cup has been Microsoft’s premier global student technology competition. Students team up to bring innovative solutions to life that tackle urgent global challenges in health, education, climate, and enterprise productivity.",
    aboutCompany:
      "Microsoft Imagine Cup empowers student founders to turn groundbreaking ideas into viable startups with enterprise-grade cloud architecture and AI infrastructure.",
    responsibilities: [
      "Form a team of up to 4 students and identify a meaningful societal or enterprise challenge.",
      "Architect a cloud solution built on Microsoft Azure and OpenAI/Copilot frameworks.",
      "Submit a working proof of concept, business model pitch deck, and architecture diagram.",
      "Present to international panels of technology executives and venture capitalists.",
    ],
    eligibility: {
      degree: "Open to all actively enrolled university students (Undergraduate & Postgraduate)",
      eligibleYears: "All Batches",
      minCgpa: "No minimum CGPA",
      backlogs: "No restrictions",
      studentMatch: "eligible",
      studentMatchReason: "You meet all international collegiate eligibility guidelines.",
    },
    skills: ["Cloud Architecture", "Azure AI", "Social Impact", "Full Stack", "System Design"],
    preferredSkills: ["OpenAI API", "Business Modeling", "UI/UX Prototyping", "Pitch Presentation"],
    skillMatch: {
      score: 75,
      matched: ["Cloud Architecture", "Full Stack", "UI/UX Prototyping"],
      missing: ["Azure AI", "Business Modeling"],
      relevantProjects: ["React Collaborative Canvas"],
    },
    selectionProcess: [
      { step: 1, name: "Project Pitch & Proposal Submission", date: "01 Nov 2025", status: "upcoming" },
      { step: 2, name: "National Semifinals Review", date: "10 Nov 2025", status: "upcoming" },
      { step: 3, name: "Regional Finals (Asia Pacific)", date: "15 Nov 2025", status: "upcoming" },
      { step: 4, name: "World Championship Showcase", date: "Jan 2026", status: "upcoming" },
    ],
    importantDates: [
      { label: "Proposal Submissions Close", date: "01 Nov 2025", isDeadline: true },
      { label: "Semifinalist Notification", date: "10 Nov 2025" },
      { label: "Regional Finals", date: "15 Nov 2025" },
    ],
    documents: [
      {
        id: "doc-h2",
        name: "Imagine_Cup_2026_Official_Rules.pdf",
        size: "3.4 MB",
        type: "PDF Document",
        description: "Complete competition rules, IP ownership protection, and judging criteria.",
      },
    ],
    relatedIds: ["hack-1", "intern-2", "intern-1"],
  },

  "intern-4": {
    id: "intern-4",
    type: "internship",
    opportunityTypeLabel: "Frontend Engineering Internship",
    title: "Zomato Core Frontend Internship",
    tagline: "Build high-throughput consumer web apps and instant delivery rider dashboards.",
    company: "Zomato",
    companyType: "Fast-Growing Tech Enterprise",
    companyCategory: "E-Commerce & Food Delivery",
    companyWebsite: "https://zomato.com/careers",
    companyLinkedIn: "https://linkedin.com/company/zomato",
    logoType: "zomato",
    verified: true,
    badge: "Limited Seats",
    status: "Application Open",
    openToAll: true,
    featured: true,
    location: "Gurgaon / Remote",
    workMode: "Remote",
    duration: "4 Months (Dec 2025 – Mar 2026)",
    startDate: "01 Dec 2025",
    endDate: "31 Mar 2026",
    deadline: "10 Nov 2025",
    deadlineStatus: "Open",
    applicationsCount: "1.2k applied",
    openings: "12 Positions",
    stipend: "₹50,000 / month",
    compensationType: "stipend",
    perks: [
      "₹50,000 Monthly Fixed Stipend",
      "Zomato Gold & Food Delivery credits (₹5,000/mo)",
      "High performance PPO conversion rate (>60%)",
      "Direct pairing with Senior Staff Engineers",
      "Flexible work-from-anywhere policy",
    ],
    aboutRole:
      "Join Zomato’s consumer frontend engineering team. You will work on cutting-edge responsive web apps, live order tracking, menu recommendation microservices, and gamified delivery tracking animations that serve millions of diners daily.",
    aboutCompany:
      "Zomato is India's leading food delivery and dining technology platform, connecting customers, restaurant partners, and delivery personnel across 500+ cities.",
    responsibilities: [
      "Develop responsive, pixel-perfect user interfaces using React, Next.js, and modern CSS frameworks.",
      "Optimize client-side web vital metrics (LCP, FID, CLS) for high network latency environments.",
      "Integrate WebSockets and real-time polling for live GPS delivery tracking updates.",
      "Participate in daily standups and engineering design reviews.",
    ],
    eligibility: {
      degree: "B.Tech / B.E / BCA in any engineering stream",
      eligibleYears: "3rd & 4th Year Students (Batches 2025 & 2026)",
      minCgpa: "7.0 CGPA",
      backlogs: "Max 1 backlog allowed",
      studentMatch: "eligible",
      studentMatchReason: "You match branch, graduation year, and technical skill requirements.",
    },
    skills: ["React", "JavaScript", "TypeScript", "Next.js", "Tailwind CSS", "REST APIs"],
    preferredSkills: ["Redux Toolkit", "WebSockets", "Performance Profiling", "Testing (Jest)"],
    skillMatch: {
      score: 92,
      matched: ["React", "JavaScript", "Next.js", "Tailwind CSS", "REST APIs"],
      missing: ["Redux Toolkit", "WebSockets"],
      relevantProjects: [
        "React Collaborative Canvas",
        "Full-Stack Study Room Platform",
      ],
    },
    selectionProcess: [
      { step: 1, name: "Resume & Portfolio Screening", date: "10 Nov 2025", status: "upcoming" },
      { step: 2, name: "Frontend Machine Coding Round (React)", date: "16 Nov 2025", status: "upcoming" },
      { step: 3, name: "Technical Architecture & JS Core Interview", date: "22 Nov 2025", status: "upcoming" },
      { step: 4, name: "Cultural Fit & Engineering Manager Call", date: "28 Nov 2025", status: "upcoming" },
    ],
    importantDates: [
      { label: "Application Deadline", date: "10 Nov 2025", isDeadline: true },
      { label: "Machine Coding Round", date: "16 Nov 2025" },
      { label: "Offer Letters", date: "28 Nov 2025" },
    ],
    documents: [
      {
        id: "doc-z1",
        name: "Zomato_Frontend_Internship_Specification.pdf",
        size: "980 KB",
        type: "PDF Document",
        description: "Engineering requirements, project teams, and technology stack breakdown.",
      },
    ],
    relatedIds: ["intern-1", "intern-2", "hack-1"],
  },
};

/**
 * Resolves an opportunity by ID or slug.
 * Supports: "intern-1", "internship-1", "1", "hack-1", "hackathon-1", etc.
 */
export function getOpportunityDetails(idOrSlug) {
  if (!idOrSlug) return null;

  const rawId = String(idOrSlug).trim().toLowerCase();

  // 1. Direct match in DETAILED_OPPORTUNITIES
  if (DETAILED_OPPORTUNITIES[rawId]) {
    return DETAILED_OPPORTUNITIES[rawId];
  }

  // 2. "internship-1" -> "intern-1"
  if (rawId.startsWith("internship-")) {
    const num = rawId.replace("internship-", "");
    const alias = `intern-${num}`;
    if (DETAILED_OPPORTUNITIES[alias]) return DETAILED_OPPORTUNITIES[alias];
  }

  // 3. "hackathon-1" -> "hack-1"
  if (rawId.startsWith("hackathon-")) {
    const num = rawId.replace("hackathon-", "");
    const alias = `hack-${num}`;
    if (DETAILED_OPPORTUNITIES[alias]) return DETAILED_OPPORTUNITIES[alias];
  }

  // 4. Pure digit "1" -> "intern-1" or "hack-1"
  if (/^\d+$/.test(rawId)) {
    const aliasIntern = `intern-${rawId}`;
    if (DETAILED_OPPORTUNITIES[aliasIntern]) return DETAILED_OPPORTUNITIES[aliasIntern];
    const aliasHack = `hack-${rawId}`;
    if (DETAILED_OPPORTUNITIES[aliasHack]) return DETAILED_OPPORTUNITIES[aliasHack];
  }

  // 5. Look in INITIAL_INTERNSHIPS or INITIAL_HACKATHONS
  const allKnown = [...INITIAL_INTERNSHIPS, ...INITIAL_HACKATHONS];
  const found = allKnown.find(
    (item) =>
      item.id.toLowerCase() === rawId ||
      item.id.toLowerCase() === `intern-${rawId}` ||
      item.id.toLowerCase() === `hack-${rawId}` ||
      (rawId.startsWith("internship-") && item.id.toLowerCase() === `intern-${rawId.replace("internship-", "")}`) ||
      (rawId.startsWith("hackathon-") && item.id.toLowerCase() === `hack-${rawId.replace("hackathon-", "")}`)
  );

  if (found) {
    return synthesizeOpportunity(found);
  }

  return null;
}

/**
 * Fallback synthesizer for any item from INITIAL_INTERNSHIPS or INITIAL_HACKATHONS
 */
function synthesizeOpportunity(base) {
  const isHackathon = base.type === "hackathon";

  return {
    id: base.id,
    type: base.type || "internship",
    opportunityTypeLabel: isHackathon ? "Hackathon Challenge" : "Engineering Internship",
    title: base.title,
    tagline: base.description?.slice(0, 100) || "Explore exciting industry challenges and level up your skills.",
    company: base.company,
    companyType: isHackathon ? "Innovation Host" : "Hiring Company",
    companyCategory: "Technology & Software",
    companyWebsite: "https://careers.example.com",
    companyLinkedIn: "https://linkedin.com/company",
    logoType: base.logoType || "google",
    verified: true,
    badge: base.badge || "Open",
    status: "Application Open",
    openToAll: Boolean(base.openToAll),
    featured: Boolean(base.featured),
    location: base.location || "Remote",
    workMode: base.workMode || base.mode || "Remote",
    duration: base.duration || "3 Months",
    startDate: "01 Dec 2025",
    endDate: "28 Feb 2026",
    deadline: base.deadline || "30 Oct 2025",
    deadlineStatus: "Open",
    applicationsCount: base.applications || "1.2k applied",
    openings: isHackathon ? "Open Registration" : "20 Positions",
    stipend: base.stipend || (isHackathon ? base.prize || "₹1,00,000 Prize Pool" : "₹40,000 / month"),
    prizePool: base.prize || (isHackathon ? "₹1,00,000 Prize Pool" : null),
    compensationType: isHackathon ? "prize" : "stipend",
    perks: [
      "Industry Verified Experience Certificate",
      "Executive 1-on-1 Mentorship",
      "Flexible schedule with university exam adjustments",
      "Opportunity for Full-Time Conversion (PPO)",
    ],
    aboutRole: base.description || "Exciting opportunity to gain real-world project experience.",
    aboutCompany: `${base.company} is a leading organization creating transformative digital experiences worldwide.`,
    responsibilities: [
      "Collaborate with engineering teams to design, build, and test software solutions.",
      "Write clean, modular, and maintainable code adhering to best industry standards.",
      "Participate in design reviews, standup meetings, and deliver milestone demos.",
    ],
    eligibility: {
      degree: "B.Tech / B.E / MCA / M.Tech in CS, IT, or related streams",
      eligibleYears: base.eligibility || "All Students",
      minCgpa: "7.0 CGPA",
      backlogs: "Allowed max 1 backlog",
      studentMatch: "eligible",
      studentMatchReason: "You match the standard university placement and internship criteria.",
    },
    skills: base.skills || ["React", "JavaScript", "Problem Solving"],
    preferredSkills: ["Git", "REST APIs", "Cloud Services"],
    skillMatch: {
      score: 82,
      matched: base.skills?.slice(0, 2) || ["React", "JavaScript"],
      missing: ["Cloud Services"],
      relevantProjects: ["React Collaborative Canvas"],
    },
    selectionProcess: [
      { step: 1, name: "Application Screening", date: "15 Oct 2025", status: "upcoming" },
      { step: 2, name: "Technical Assessment", date: "25 Oct 2025", status: "upcoming" },
      { step: 3, name: "Technical Interview", date: "05 Nov 2025", status: "upcoming" },
      { step: 4, name: "Final Selection", date: "15 Nov 2025", status: "upcoming" },
    ],
    importantDates: [
      { label: "Application Deadline", date: base.deadline || "30 Oct 2025", isDeadline: true },
      { label: "Commencement Date", date: "01 Dec 2025" },
    ],
    documents: [
      {
        id: `doc-${base.id}`,
        name: `${base.title.replace(/[^a-zA-Z0-9]/g, "_").slice(0, 25)}_Guidelines.pdf`,
        size: "1.1 MB",
        type: "PDF Document",
        description: "Official circular and opportunity specifications document.",
      },
    ],
    relatedIds: ["intern-1", "intern-2", "hack-1"].filter((id) => id !== base.id),
  };
}

/**
 * Returns related opportunities list
 */
export function getRelatedOpportunities(currentId) {
  const current = getOpportunityDetails(currentId);
  const relatedIds = current?.relatedIds || [];

  const list = [];
  for (const id of relatedIds) {
    const item = getOpportunityDetails(id);
    if (item && item.id !== currentId) {
      list.push(item);
    }
  }

  // Pad to 3 if needed
  if (list.length < 3) {
    const fallbackIds = Object.keys(DETAILED_OPPORTUNITIES);
    for (const key of fallbackIds) {
      if (key !== currentId && !list.find((x) => x.id === key)) {
        list.push(DETAILED_OPPORTUNITIES[key]);
        if (list.length >= 3) break;
      }
    }
  }

  return list.slice(0, 3);
}
