import { ALL_ASSIGNMENTS, INITIAL_ASSIGNMENTS } from "../assignmentsData";

/**
 * Rich mock assignment data for canonical assignments.
 */
export const DETAILED_ASSIGNMENTS = {
  "asg-1": {
    id: "asg-1",
    subject: "Web Development",
    courseCode: "CSE-101",
    title: "Build a Responsive Portfolio Website",
    description:
      "Create a personal portfolio website using Next.js with responsive design, including a projects section, about section and contact form.",
    tags: ["Next.js", "React", "Tailwind CSS", "Portfolio"],
    status: "pending",
    dueStatus: "Due in 2 days",
    dueDate: "18 Aug 2025, 11:59 PM",
    marks: 10,
    priority: "High Priority",
    priorityType: "high",
    urgency: "urgent",
    isSaved: false,
    currentAttempt: 1,
    maxAttempts: 3,
    resubmissionAllowed: true,
    overview: {
      description:
        "Create a personal portfolio website using Next.js with responsive design, including a projects section, about section and contact form.",
      goal: "Build a production-quality responsive portfolio demonstrating your frontend and full-stack skills.",
      expectedOutcomes: [
        "Responsive layout optimized across desktop, tablet, and mobile screens",
        "Interactive projects showcase with preview cards and repository links",
        "Comprehensive about section highlighting skills, education, and milestones",
        "Functional contact form with client-side validation and feedback states",
        "Fluid mobile drawer navigation with touch-friendly targets",
        "Clean, semantic UI adhering to accessible contrast standards",
      ],
    },
    problemStatement: {
      intro:
        "As modern engineering students preparing for technical internships and campus placements, having an impactful digital portfolio is essential. Your portfolio acts as a live proof-of-work showcasing your engineering abilities, design sensibility, and problem-solving skills to recruiters and peers.",
      objectives: [
        "Design and construct a multi-section web application using Next.js App Router and React components.",
        "Implement responsive layouts using CSS Flexbox and Grid utilities without relying on external UI component kits.",
        "Ensure all interactive sections (projects grid, skills filter, contact form) operate reliably with client-side state handling.",
        "Deploy the completed project to a public cloud platform (Vercel, Netlify, or GitHub Pages) with zero build errors.",
      ],
      technicalConstraints: [
        "Single-page navigation or App Router multi-page routing with smooth scrolling.",
        "Must achieve a Lighthouse score of 90+ for Performance, Accessibility, and Best Practices.",
        "No inline CSS styles; all styling must leverage Tailwind CSS classes or modular CSS.",
        "Forms must prevent empty submissions and validate email formatting using regular expressions.",
      ],
      codeSnippet: {
        title: "Recommended Project Folder Structure",
        language: "bash",
        code: `my-portfolio/
├── app/
│   ├── layout.jsx
│   ├── page.jsx
│   └── globals.css
├── components/
│   ├── Hero.jsx
│   ├── About.jsx
│   ├── Projects.jsx
│   ├── Skills.jsx
│   └── ContactForm.jsx
├── public/
│   └── assets/
└── package.json`,
      },
    },
    requirements: [
      "Responsive desktop layout",
      "Responsive mobile layout",
      "Project showcase",
      "About section",
      "Contact form",
      "Form validation",
      "Clean reusable components",
      "Proper deployment",
    ],
    requiredStack: ["Next.js", "React", "Tailwind CSS"],
    teacherInstructions: [
      "Use semantic HTML5 elements (<header>, <main>, <section>, <article>, <footer>) for layout landmarks.",
      "Keep components reusable, modular, and single-purpose across the directory structure.",
      "Ensure keyboard accessibility — all interactive elements must be focusable with visible focus rings.",
      "Test thoroughly on multiple viewport widths (375px mobile, 768px tablet, 1280px desktop).",
      "Deploy the final project before submission and verify the live URL is publicly reachable.",
      "Submit your GitHub repository URL along with your live deployment link and project archive.",
    ],
    resources: [
      {
        id: "res-1",
        name: "Assignment Brief.pdf",
        type: "PDF Document",
        size: "2.4 MB",
        url: "#",
        updated: "10 Aug 2025",
      },
      {
        id: "res-2",
        name: "UI Reference.pdf",
        type: "PDF Document",
        size: "4.8 MB",
        url: "#",
        updated: "11 Aug 2025",
      },
      {
        id: "res-3",
        name: "Submission Guidelines.pdf",
        type: "PDF Document",
        size: "1.1 MB",
        url: "#",
        updated: "12 Aug 2025",
      },
    ],
    rubric: [
      {
        name: "Responsive Design",
        weight: 20,
        description: "Fluid breakpoints across mobile, tablet, and widescreen monitors.",
        earned: null,
      },
      {
        name: "Functionality",
        weight: 25,
        description: "Interactive components, working contact validation, and smooth routing.",
        earned: null,
      },
      {
        name: "UI / UX",
        weight: 20,
        description: "Visual aesthetics, typography hierarchy, micro-interactions, and contrast.",
        earned: null,
      },
      {
        name: "Code Quality",
        weight: 20,
        description: "Component modularity, semantic markup, clean naming, and zero console warnings.",
        earned: null,
      },
      {
        name: "Deployment",
        weight: 15,
        description: "Publicly accessible deployment URL with optimized production build.",
        earned: null,
      },
    ],
    faculty: {
      name: "Dr. Priya Sharma",
      role: "Web Development Faculty",
      department: "CSE Department",
      office: "Room 204",
      officeHours: "Mon & Wed • 2:00 PM – 4:00 PM",
      email: "priya.sharma@college.edu",
      avatar: "/assets/events/avatars/avatar-1.jpg",
    },
    submission: null,
    submissionHistory: [],
    feedback: null,
  },

  "asg-4": {
    id: "asg-4",
    subject: "Computer Networks Lab",
    courseCode: "CSE-204L",
    title: "Configure and Test Network Connectivity",
    description:
      "Configure a small network topology and demonstrate connectivity using ping and traceroute commands.",
    tags: ["Networking", "Cisco", "Lab", "PacketTracer"],
    status: "submitted",
    dueStatus: "Submitted",
    dueDate: "26 Aug 2025, 11:59 PM",
    marks: 15,
    priority: "Lab",
    priorityType: "lab",
    urgency: "submitted",
    isSaved: false,
    currentAttempt: 1,
    maxAttempts: 3,
    resubmissionAllowed: true,
    overview: {
      description:
        "Configure a multi-subnet network topology with routers, switches, and client hosts, and verify end-to-end packet delivery using standard diagnostic utilities.",
      goal: "Demonstrate practical understanding of IP addressing, subnet masking, default gateways, and ICMP diagnostic tools.",
      expectedOutcomes: [
        "Configured Cisco Packet Tracer topology with 2 subnets and 1 router",
        "Correct static IP, subnet mask, and default gateway assignments",
        "Successful ICMP ping results between inter-subnet workstations",
        "Traceroute path verification displaying gateway hops",
        "Documented lab report with screenshots and configuration commands",
      ],
    },
    problemStatement: {
      intro:
        "Computer networks rely on accurate routing tables, default gateways, and protocol layer handshakes. In this hands-on lab exercise, you must establish an inter-network architecture across two separate broadcast domains connected via a dual-interface router.",
      objectives: [
        "Build a two-network topology in Cisco Packet Tracer with Router 1941 and two 2960 switches.",
        "Assign valid Class C private IP addresses (192.168.1.0/24 and 192.168.2.0/24).",
        "Configure router GigabitEthernet interfaces with appropriate gateway addresses.",
        "Verify complete connectivity using ping and analyze ICMP echo reply headers.",
      ],
      technicalConstraints: [
        "All subnets must use CIDR /24 subnet masks.",
        "Packet Tracer .pkt file must be compatible with version 8.2 or above.",
        "Screenshots must clearly display terminal output with student USN visible.",
      ],
      codeSnippet: {
        title: "Router Interface Configuration Commands",
        language: "bash",
        code: `Router> enable
Router# configure terminal
Router(config)# interface GigabitEthernet0/0
Router(config-if)# ip address 192.168.1.1 255.255.255.0
Router(config-if)# no shutdown
Router(config-if)# exit`,
      },
    },
    requirements: [
      "Network topology (.pkt) configured",
      "Static IP addresses assigned",
      "Router interfaces enabled",
      "Inter-subnet ping verified",
      "Traceroute path documented",
      "Lab report PDF submitted",
    ],
    requiredStack: ["Cisco Packet Tracer", "ICMP", "TCP/IP"],
    teacherInstructions: [
      "Export your topology as a .pkt file.",
      "Include clear terminal output screenshots in your PDF report.",
      "Explain the purpose of ARP table entries observed during the first ping attempt.",
      "Submit before the scheduled lab review session.",
    ],
    resources: [
      {
        id: "res-n1",
        name: "Lab-4-Topology-Brief.pdf",
        type: "PDF Document",
        size: "1.8 MB",
        url: "#",
        updated: "15 Aug 2025",
      },
      {
        id: "res-n2",
        name: "Starter-Template.pkt",
        type: "Packet Tracer File",
        size: "3.2 MB",
        url: "#",
        updated: "15 Aug 2025",
      },
    ],
    rubric: [
      {
        name: "Topology Construction",
        weight: 30,
        description: "Accurate physical and logical network layout in Packet Tracer.",
        earned: null,
      },
      {
        name: "IP Addressing & Subnetting",
        weight: 30,
        description: "Correct address assignments and gateway configurations.",
        earned: null,
      },
      {
        name: "Connectivity & Diagnostics",
        weight: 25,
        description: "Verified ICMP ping and traceroute hop progression.",
        earned: null,
      },
      {
        name: "Documentation & Report",
        weight: 15,
        description: "Thorough lab write-up with observations and conclusions.",
        earned: null,
      },
    ],
    faculty: {
      name: "Prof. Rajesh Verma",
      role: "Networks & Security Lead",
      department: "CSE Department",
      office: "Lab 3B / Room 108",
      officeHours: "Tue & Thu • 11:00 AM – 1:00 PM",
      email: "rajesh.verma@college.edu",
      avatar: "/assets/events/avatars/avatar-2.jpg",
    },
    submission: {
      submittedAt: "16 Aug 2025, 04:30 PM",
      attempt: 1,
      status: "Under Review",
      files: [
        { name: "Network_Connectivity_Lab4_1MS22CS089.zip", size: "4.2 MB", type: "ZIP Archive" },
        { name: "Lab4_Report_Document.pdf", size: "1.6 MB", type: "PDF Document" },
      ],
      githubUrl: "https://github.com/student/cn-lab-assignments",
      demoUrl: "",
      notes: "Configured both subnets and verified 0% packet loss across gateways.",
    },
    submissionHistory: [
      {
        version: "Version 1",
        submittedAt: "16 Aug 2025 • 04:30 PM",
        status: "Submitted",
        reviewState: "Under Review",
        attemptNumber: 1,
        files: [
          { name: "Network_Connectivity_Lab4_1MS22CS089.zip", size: "4.2 MB" },
          { name: "Lab4_Report_Document.pdf", size: "1.6 MB" },
        ],
        marksEarned: null,
      },
    ],
    feedback: null,
  },

  "asg-7": {
    id: "asg-7",
    subject: "Operating Systems",
    courseCode: "CSE-202",
    title: "Process Scheduling Algorithms Simulator",
    description: "Implement FCFS, SJF, and Round Robin scheduling simulation in C.",
    tags: ["OS", "C", "Algorithms", "Concurrency"],
    status: "overdue",
    dueStatus: "Overdue by 3 days",
    dueDate: "14 Aug 2025, 11:59 PM",
    marks: 10,
    priority: "High Priority",
    priorityType: "high",
    urgency: "overdue",
    isSaved: false,
    currentAttempt: 1,
    maxAttempts: 2,
    resubmissionAllowed: true,
    overview: {
      description:
        "Develop an interactive terminal simulator in C that calculates Turnaround Time, Waiting Time, and Average Metrics for FCFS, Shortest Job First (Preemptive & Non-preemptive), and Round Robin scheduling.",
      goal: "Understand CPU scheduling mechanics, context switching overheads, and algorithm trade-offs.",
      expectedOutcomes: [
        "Working C implementation with modular algorithm functions",
        "Support for dynamic process arrival times and burst times",
        "Calculated average turnaround time and average waiting time",
        "ASCII Gantt chart visualization in stdout",
      ],
    },
    problemStatement: {
      intro:
        "The CPU scheduler decides which of the processes in the ready queue is allocated the CPU. Simulating these algorithms deepens comprehension of scheduling trade-offs such as the convoy effect and starvation.",
      objectives: [
        "Implement First-Come, First-Served (FCFS) scheduling.",
        "Implement Shortest Job First (SJF) with arrival time handling.",
        "Implement Round Robin (RR) with configurable time quantum.",
        "Print a visual ASCII Gantt chart and comparative performance summary table.",
      ],
      technicalConstraints: [
        "ANSI C compliant code with zero memory leaks.",
        "Dynamic allocation using malloc/free for process queue arrays.",
        "Must compile with 'gcc -Wall -Wextra -pedantic'.",
      ],
      codeSnippet: {
        title: "Sample Process Structure",
        language: "c",
        code: `typedef struct {
    int pid;
    int arrival_time;
    int burst_time;
    int remaining_time;
    int completion_time;
    int waiting_time;
    int turnaround_time;
} Process;`,
      },
    },
    requirements: [
      "FCFS implementation",
      "SJF implementation",
      "Round Robin with time quantum",
      "ASCII Gantt chart display",
      "Performance summary table",
      "Clean memory management",
    ],
    requiredStack: ["C / C++", "GCC", "Make"],
    teacherInstructions: [
      "Include a Makefile for easy compilation.",
      "Test your code against test cases with non-zero arrival times.",
      "Submit source code files and a brief 2-page documentation PDF.",
    ],
    resources: [
      {
        id: "res-os1",
        name: "Scheduling_Algorithms_Spec.pdf",
        type: "PDF Document",
        size: "1.4 MB",
        url: "#",
        updated: "05 Aug 2025",
      },
    ],
    rubric: [
      {
        name: "Algorithm Correctness",
        weight: 40,
        description: "Accurate waiting time and turnaround time calculations.",
        earned: null,
      },
      {
        name: "Round Robin Quantum Logic",
        weight: 25,
        description: "Proper time-slice slicing and context queue updates.",
        earned: null,
      },
      {
        name: "Gantt Chart Output",
        weight: 20,
        description: "Clear visual representation of CPU occupancy timeline.",
        earned: null,
      },
      {
        name: "Code Quality & Memory",
        weight: 15,
        description: "Zero leaks, well-structured headers, and comments.",
        earned: null,
      },
    ],
    faculty: {
      name: "Dr. K. S. Raman",
      role: "Associate Professor, Systems",
      department: "CSE Department",
      office: "Room 312",
      officeHours: "Daily • 3:00 PM – 4:30 PM",
      email: "raman.ks@college.edu",
      avatar: "/assets/events/avatars/avatar-3.jpg",
    },
    submission: null,
    submissionHistory: [],
    feedback: null,
  },

  "asg-9": {
    id: "asg-9",
    subject: "Web Development",
    courseCode: "CSE-101",
    title: "CSS Grid & Flexbox Masterclass",
    description: "Design 3 responsive layout wireframes without CSS frameworks.",
    tags: ["CSS", "Responsive", "UI", "Flexbox"],
    status: "submitted",
    dueStatus: "Graded",
    dueDate: "08 Aug 2025, 11:59 PM",
    marks: 10,
    priority: "Low Priority",
    priorityType: "low",
    urgency: "submitted",
    isSaved: false,
    currentAttempt: 2,
    maxAttempts: 3,
    resubmissionAllowed: false,
    overview: {
      description:
        "Construct 3 intricate responsive page layouts (Magazine editorial, E-commerce dashboard, and Media gallery) strictly using vanilla CSS Grid and Flexbox.",
      goal: "Master CSS Grid 2D layout semantics, fractional units, auto-fit/auto-fill, and Flexbox axis alignment without relying on bootstrap or utility frameworks.",
      expectedOutcomes: [
        "Pure semantic HTML structure with accessible landmarks",
        "Layout 1: Multi-column magazine with featured hero & sidebar",
        "Layout 2: Analytics dashboard with responsive widget cards",
        "Layout 3: Media masonry grid with aspect-ratio preservation",
        "Zero CSS framework dependencies",
      ],
    },
    problemStatement: {
      intro:
        "Before relying on utility frameworks like Tailwind CSS, front-end engineers must deeply master the underlying W3C layout specifications. This assignment challenges you to construct complex layouts using pure CSS.",
      objectives: [
        "Implement a responsive editorial layout using grid-template-areas.",
        "Implement an analytics dashboard using auto-fit and minmax().",
        "Build a flex-driven navbar and card deck with zero overflow bugs.",
      ],
      technicalConstraints: [
        "No CSS libraries or preprocessors allowed.",
        "Must maintain responsive fluid behavior down to 320px screen width.",
      ],
      codeSnippet: {
        title: "Sample CSS Grid Layout Specification",
        language: "css",
        code: `.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  align-items: start;
}`,
      },
    },
    requirements: [
      "Pure CSS Grid & Flexbox",
      "Magazine editorial wireframe",
      "Dashboard widget wireframe",
      "Responsive navigation bar",
      "No CSS frameworks used",
      "Fluid responsive down to 320px",
    ],
    requiredStack: ["HTML5", "CSS3 Vanilla", "Grid & Flexbox"],
    teacherInstructions: [
      "Submit a live GitHub Pages link and a clean ZIP of your repository.",
      "Document the CSS properties chosen for each layout pattern in your README.",
    ],
    resources: [
      {
        id: "res-css1",
        name: "CSS_Grid_Specs.pdf",
        type: "PDF Document",
        size: "3.1 MB",
        url: "#",
        updated: "01 Aug 2025",
      },
    ],
    rubric: [
      {
        name: "Responsive Design",
        weight: 20,
        description: "Fluid breakpoints across mobile, tablet, and widescreen monitors.",
        earned: 18,
      },
      {
        name: "Functionality",
        weight: 25,
        description: "Interactive components, working contact validation, and smooth routing.",
        earned: 22,
      },
      {
        name: "UI / UX",
        weight: 20,
        description: "Visual aesthetics, typography hierarchy, micro-interactions, and contrast.",
        earned: 18,
      },
      {
        name: "Code Quality",
        weight: 20,
        description: "Component modularity, semantic markup, clean naming, and zero console warnings.",
        earned: 17,
      },
      {
        name: "Deployment",
        weight: 15,
        description: "Publicly accessible deployment URL with optimized production build.",
        earned: 10,
      },
    ],
    faculty: {
      name: "Dr. Priya Sharma",
      role: "Web Development Faculty",
      department: "CSE Department",
      office: "Room 204",
      officeHours: "Mon & Wed • 2:00 PM – 4:00 PM",
      email: "priya.sharma@college.edu",
      avatar: "/assets/events/avatars/avatar-1.jpg",
    },
    submission: {
      submittedAt: "08 Aug 2025, 08:15 PM",
      attempt: 2,
      status: "Graded",
      files: [
        { name: "CSS_Masterclass_Submission_v2.zip", size: "3.4 MB", type: "ZIP Archive" },
        { name: "Layout_Documentation.pdf", size: "1.2 MB", type: "PDF Document" },
      ],
      githubUrl: "https://github.com/student/css-masterclass-wireframes",
      demoUrl: "https://student-css-wireframes.vercel.app",
      notes: "Updated version with fixed mobile flex wrap on the widget cards.",
    },
    submissionHistory: [
      {
        version: "Version 1",
        submittedAt: "06 Aug 2025 • 03:45 PM",
        status: "Submitted",
        reviewState: "Under Review",
        attemptNumber: 1,
        files: [{ name: "CSS_Masterclass_v1.zip", size: "3.1 MB" }],
        marksEarned: null,
      },
      {
        version: "Version 2",
        submittedAt: "08 Aug 2025 • 08:15 PM",
        status: "Resubmitted",
        reviewState: "Graded",
        attemptNumber: 2,
        files: [
          { name: "CSS_Masterclass_Submission_v2.zip", size: "3.4 MB" },
          { name: "Layout_Documentation.pdf", size: "1.2 MB" },
        ],
        marksEarned: "8.5 / 10",
      },
    ],
    feedback: {
      score: 8.5,
      maxScore: 10,
      gradedAt: "10 Aug 2025",
      facultyName: "Dr. Priya Sharma",
      comment:
        "Good implementation and clean component structure. Improve accessibility labels and form validation. The CSS Grid auto-fit behavior on the dashboard cards was executed cleanly with proper fallback properties.",
      rubricBreakdown: [
        { name: "Responsive Design", earned: 18, total: 20 },
        { name: "Functionality", earned: 22, total: 25 },
        { name: "UI / UX", earned: 18, total: 20 },
        { name: "Code Quality", earned: 17, total: 20 },
        { name: "Deployment", earned: 10, total: 15 },
      ],
    },
  },
};

/**
 * Resolves assignment details dynamically for any ID.
 * Supports:
 * - "asg-1", "asg-2", etc.
 * - "assignment-1", "assignment-2", etc.
 * - "1", "2", etc.
 * - titles/slugs
 */
export function getAssignmentDetails(idOrSlug) {
  if (!idOrSlug) return null;
  const query = String(idOrSlug).toLowerCase().trim();

  // 1. Direct match in DETAILED_ASSIGNMENTS
  if (DETAILED_ASSIGNMENTS[query]) {
    return DETAILED_ASSIGNMENTS[query];
  }

  // 2. Normalized aliases: "assignment-1" -> "asg-1", "1" -> "asg-1"
  const normalizedId = query.replace(/^assignment-/, "asg-");
  if (DETAILED_ASSIGNMENTS[normalizedId]) {
    return DETAILED_ASSIGNMENTS[normalizedId];
  }
  const numericId = "asg-" + query.replace(/^asg-/, "").replace(/^assignment-/, "");
  if (DETAILED_ASSIGNMENTS[numericId]) {
    return DETAILED_ASSIGNMENTS[numericId];
  }

  // 3. Search in ALL_ASSIGNMENTS or INITIAL_ASSIGNMENTS
  const pool = ALL_ASSIGNMENTS || INITIAL_ASSIGNMENTS || [];
  const match = pool.find(
    (a) =>
      a.id.toLowerCase() === query ||
      a.id.toLowerCase() === normalizedId ||
      a.id.toLowerCase() === numericId ||
      a.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") === query
  );

  if (!match) {
    // If query is "1" or "assignment-1", default to asg-1
    if (query === "1" || query === "assignment-1") {
      return DETAILED_ASSIGNMENTS["asg-1"];
    }
    return null;
  }

  // 4. Synthesize complete assignment workspace for any other assignment in the dataset
  const isOverdue = match.status === "overdue";
  const isSubmitted = match.status === "submitted";

  return {
    id: match.id,
    subject: match.subject || "Computer Science",
    courseCode: match.courseCode || "CSE-201",
    title: match.title,
    description: match.description,
    tags: match.tags || ["Academics", "Core Course"],
    status: match.status || "pending",
    dueStatus: match.dueStatus || (isOverdue ? "Overdue" : "Due Soon"),
    dueDate: match.dueDate || "28 Aug 2025, 11:59 PM",
    marks: match.marks || 10,
    priority: match.priority || "Medium Priority",
    priorityType: match.priorityType || "medium",
    urgency: match.urgency || (isOverdue ? "overdue" : isSubmitted ? "submitted" : "upcoming"),
    isSaved: false,
    currentAttempt: isSubmitted ? 1 : 1,
    maxAttempts: 3,
    resubmissionAllowed: true,
    overview: {
      description: match.description,
      goal: `Demonstrate mastery in ${match.subject} concepts and deliver production-ready assignments adhering to departmental standards.`,
      expectedOutcomes: [
        `Complete theoretical and practical implementation of ${match.title}`,
        "Adhere to university academic integrity and coding conventions",
        "Include unit tests and execution instructions in repository README",
        "Submit all required code archives and verification documents",
      ],
    },
    problemStatement: {
      intro: `This academic assignment evaluates foundational and applied principles within ${match.subject}. You are expected to design, implement, and document a robust solution.`,
      objectives: [
        `Implement core logic and algorithms required for ${match.title}.`,
        "Handle edge cases, error conditions, and user input validation.",
        "Document architecture, design decisions, and testing steps in a project report.",
      ],
      technicalConstraints: [
        "All work must be original student work with proper citations.",
        "Code must be modular and follow language-specific conventions.",
        "Final submission bundle must not exceed 50 MB.",
      ],
      codeSnippet: {
        title: "Standard Submission Interface Specification",
        language: "text",
        code: `Subject: ${match.subject}
Assignment: ${match.title}
Student USN: 1MS22CS089
Academic Term: Autumn Semester 2025`,
      },
    },
    requirements: [
      "Core functionality completed",
      "Source code archive uploaded",
      "Documentation PDF attached",
      "Clean modular code structure",
      "Tested edge cases",
      "Submitted before deadline",
    ],
    requiredStack: match.tags || ["Algorithms", "Documentation"],
    teacherInstructions: [
      "Ensure all files are properly formatted before submission.",
      "Include student name and USN in the header of all submitted files.",
      "Late submissions may be penalized according to department grading policies.",
      "Reach out during faculty office hours if you have any questions.",
    ],
    resources: [
      {
        id: "res-gen-1",
        name: `${match.title.replace(/[^a-zA-Z0-9 ]/g, "").slice(0, 24)}_Brief.pdf`,
        type: "PDF Document",
        size: "2.1 MB",
        url: "#",
        updated: "12 Aug 2025",
      },
      {
        id: "res-gen-2",
        name: "Submission_Guidelines.pdf",
        type: "PDF Document",
        size: "1.1 MB",
        url: "#",
        updated: "10 Aug 2025",
      },
    ],
    rubric: [
      {
        name: "Problem Understanding & Correctness",
        weight: 35,
        description: "Accurate solution answering all assignment prompts.",
        earned: isSubmitted ? Math.floor(match.marks * 0.9) : null,
      },
      {
        name: "Code Architecture & Quality",
        weight: 35,
        description: "Clean structure, naming conventions, and modularity.",
        earned: isSubmitted ? Math.floor(match.marks * 0.85) : null,
      },
      {
        name: "Documentation & Testing",
        weight: 30,
        description: "Clear report, test coverage, and presentation.",
        earned: isSubmitted ? Math.floor(match.marks * 0.8) : null,
      },
    ],
    faculty: {
      name: "Dr. Priya Sharma",
      role: `${match.subject} Faculty`,
      department: "Computer Science & Engineering",
      office: "Room 204",
      officeHours: "Mon & Wed • 2:00 PM – 4:00 PM",
      email: "priya.sharma@college.edu",
      avatar: "/assets/events/avatars/avatar-1.jpg",
    },
    submission: isSubmitted
      ? {
          submittedAt: "18 Aug 2025, 10:42 PM",
          attempt: 1,
          status: "Under Review",
          files: [
            {
              name: `${match.title.replace(/[^a-zA-Z0-9 ]/g, "").slice(0, 18)}_Submission.zip`,
              size: "4.8 MB",
              type: "ZIP Archive",
            },
          ],
          githubUrl: "https://github.com/student/assignments",
          demoUrl: "",
          notes: "Initial submission completed on time.",
        }
      : null,
    submissionHistory: isSubmitted
      ? [
          {
            version: "Version 1",
            submittedAt: "18 Aug 2025 • 10:42 PM",
            status: "Submitted",
            reviewState: "Under Review",
            attemptNumber: 1,
            files: [
              {
                name: `${match.title.replace(/[^a-zA-Z0-9 ]/g, "").slice(0, 18)}_Submission.zip`,
                size: "4.8 MB",
              },
            ],
            marksEarned: null,
          },
        ]
      : [],
    feedback: null,
  };
}
